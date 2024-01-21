from django.db import models

# Create your models here.
class Student(models.Model):
    name = models.CharField("Name", max_length=240)
    email = models.EmailField()
    document = models.CharField("Document", max_length=20)
    phone = models.CharField(max_length=20)
    registrationDate = models.DateField("Registration Date", auto_now_add=True)

    def __str__(self):
        return self.name


#after writing out what your model is supposed to look  lke ^^:
    # create sql commant to create the table, this generates the migrations file & changes the database 
        # : Python manage.py makemigrations
    #