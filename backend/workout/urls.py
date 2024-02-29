from django.urls import path
from .views import AddExerciseToWorkout, ExerciseListByWorkout, WorkoutCreate
from .views import WorkoutListByAccount

urlpatterns = [
    path('workouts/create/', WorkoutCreate.as_view(), name='workout-create'),
    path('workouts/account/<int:account_id>/', WorkoutListByAccount.as_view(), name='workout-list-by-account'),
    path('workouts/<int:workout_id>/exercises/<int:account_id>/', ExerciseListByWorkout.as_view(), name='exercise-list-by-workout'),
    path('workouts/<int:workout_id>/exercises/<int:account_id>/add/', AddExerciseToWorkout.as_view(), name='add-exercise-to-workout'),
]