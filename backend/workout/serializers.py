from rest_framework import serializers
from .models import Workout, Exercise
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('name', 'reps', 'sets', 'weight')

class WorkoutSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True)

    class Meta:
        model = Workout
        fields = ('name', 'accountId', 'exercises')

    def create(self, validated_data):
        exercises_data = validated_data.pop('exercises')
        workout = Workout.objects.create(**validated_data)
        for exercise_data in exercises_data:
            Exercise.objects.create(workout=workout, **exercise_data)
        return workout
    
class WorkoutNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ('name', 'id')

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                data['user'] = user
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'username' and 'password' fields.")
        
        return data

