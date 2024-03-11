from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Exercise(models.Model):
    class Meta:
        app_label = 'workout'
    name = models.CharField(max_length=100)
    reps = models.IntegerField()
    sets = models.IntegerField()
    weight = models.FloatField()

    def __str__(self):
        return self.name

class Workout(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercises = models.ManyToManyField(Exercise)

    def __str__(self):
        return self.name
    
