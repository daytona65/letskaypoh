from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes") # If user is deleted, due to one-to-many with notes all notes under User will be deleted (cascade)
    # related_name means User.notes can access all note objects linked to the User
    def __str__(self):
        return self.title
    
class Senior(models.Model):
    name = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=6)
    languages = models.TextField() # CSV
    gender = models.TextField()
    age = models.IntegerField()
    address = models.TextField()
    notes = models.TextField() # Add medical conditions, likes/dislikes, more background
    
    last_visited = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    # related_name means User.notes can access all note objects linked to the User
    def __str__(self):
        return self.title