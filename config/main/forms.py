
from django import forms

from .models import Flagship, MidnightSales, Product, Trending


class UploadProduct(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'
        
class Flagship_(forms.ModelForm):
    class Meta:
        model = Flagship
        fields = '__all__'
        
class MidnightSales_(forms.ModelForm):
    class Meta:
        model = MidnightSales
        fields = '__all__'
        
        
class Trending_(forms.ModelForm):
    class Meta:
        model = Trending
        fields = '__all__'
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-upload','Placeholder': 'Enter Product Name'}),
            'price': forms.NumberInput(attrs={'class': 'form-upload','Placeholder': 'Enter Product Price'}),
            'image': forms.FileInput(attrs={'class': 'form-upload','Placeholder': 'Upload Product Image'}),
        }

    