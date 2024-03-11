from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Workout, Exercise
from django.contrib.auth import logout, login
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import ExerciseSerializer, WorkoutNameSerializer, WorkoutSerializer, UserSerializer, LoginSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class WorkoutCreate(generics.CreateAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

    def perform_create(self, serializer):
        exercises_data = self.request.data.pop('exercises', [])
        workout = serializer.save()
        for exercise_data in exercises_data:
            exercise = Exercise.objects.create(**exercise_data)
            workout.exercises.add(exercise)

class WorkoutListByAccount(generics.ListAPIView):
    serializer_class = WorkoutNameSerializer

    def get_queryset(self):
        account_id = self.kwargs['account_id']  # Get account ID from URL
        return Workout.objects.filter(accountId=account_id)
    
class ExerciseListByWorkout(generics.ListAPIView):
    serializer_class = ExerciseSerializer

    def get_queryset(self):
        workout_id = self.kwargs['workout_id']
        account_id = self.kwargs['account_id']
        return Exercise.objects.filter(workout__id=workout_id, workout__accountId=account_id)

class AddExerciseToWorkout(generics.UpdateAPIView):
    serializer_class = ExerciseSerializer

    def update(self, request, *args, **kwargs):
        workout_id = kwargs['workout_id']
        account_id = kwargs['account_id']
        exercise_data = request.data

        try:
            workout = Workout.objects.get(id=workout_id, accountId=account_id)
        except Workout.DoesNotExist:
            return Response({'error': 'Workout not found'}, status=status.HTTP_404_NOT_FOUND)

        exercise_serializer = self.get_serializer(data=exercise_data)
        if exercise_serializer.is_valid():
            exercise = exercise_serializer.save()
            workout.exercises.add(exercise)
            return Response({'success': 'Exercise added to workout'}, status=status.HTTP_200_OK)
        else:
            return Response(exercise_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserRegistration(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            login(request, user)
            return Response({
                "message": "Login successful",
                "refresh": str(refresh),
                "access": str(refresh.access_token)
                }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogout(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)