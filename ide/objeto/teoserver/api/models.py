from django.db import models

# Create your models here.

class Params(models.Model):
    MAXLINEA = models.TextField()
    MAXDIGIT = models.TextField()
    MAXID = models.TextField()
    