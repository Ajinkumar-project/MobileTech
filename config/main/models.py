from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100)
    price= models.DecimalField(max_digits=10,decimal_places=2)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    
class Flagship(models.Model):
    name = models.CharField(max_length=100)
    price= models.DecimalField(max_digits=10,decimal_places=2)
    image = models.ImageField(upload_to='products/', blank=True, null=True)

class MidnightSales(models.Model):
    name = models.CharField(max_length=100)
    price= models.DecimalField(max_digits=10,decimal_places=2)
    image = models.ImageField(upload_to='products/', blank=True, null=True)


class Trending(models.Model):
    CATEGORY = [
        ('flagship', 'Flagship'),
        ('gaming', 'Gaming'),
        ('budget', 'Budget'),
        ('foldable','Foldable'),
        ('iPhone','IPhone'),
        ('samsung','Samsung'),
        ('onePlus','OnePlus'),
        ('google','Google'),
        ('xiaomi','Xiaomi'),
        ('asus','Asus')
        
    ]
    name = models.CharField(max_length=100)
    price= models.DecimalField(max_digits=10,decimal_places=2)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY, default='flagship')

class cart(models.Model):
    pending = models.IntegerField()
    delivered = models.IntegerField()