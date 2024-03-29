from django.urls import path
from .views import *

urlpatterns = [
    path('workouts/create/', WorkoutCreate.as_view(), name='workout-create'),
    path('workouts/account/<int:user>/', WorkoutListByAccount.as_view(), name='workout-list-by-account'),
    path('workouts/<int:workout_id>/exercises/<int:user>/', ExerciseListByWorkout.as_view(), name='exercise-list-by-workout'),
    path('workouts/<int:workout_id>/exercises/<int:user>/add/', AddExerciseToWorkout.as_view(), name='add-exercise-to-workout'),
    path('user/register/', UserRegistration.as_view(), name='api-register'),
    path('user/login/', UserLogin.as_view(), name='api-login'),
    path('user/logout/', UserLogout.as_view(), name='api-logout'),

]