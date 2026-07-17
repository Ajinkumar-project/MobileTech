import re

from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.core.mail import EmailMessage
from django.contrib.auth.decorators import login_required
from .models import Flagship, Product, Trending

from .forms import Flagship_, Trending_, UploadProduct

# Create your views here.
@login_required
def update(request , id):
    obj = Trending.objects.get(id = id)
    if request.method == 'POST':
        form = Trending_(request.POST , request.FILES ,instance=obj)
        if form.is_valid():
            form.save()
            return redirect('success')
    else:
        form = Trending_(instance=obj)
    return render(request , 'upload.html', {'form':form ,})
@login_required
def delete(request , id):
    obj = Trending.objects.get(id = id)
    if request.method == 'POST':
        obj.delete()
        return redirect('upload')
    return render(request , 'delete.html', {'obj':obj ,})
@login_required
def contactform(request):
        name = request.POST.get("full_name")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        message = request.POST.get("message")
        if name and email and message:
            email = EmailMessage(
                subject= subject,
                body=message,
                from_email='ajinkumar.s2004@gmail.com',
                to=[email]
            )
            email.send()
        html_content = f"""
            <!DOCTYPE html>
                <html>
                <head>
                    <title>Contact Form Submitted</title>
                    <!-- Bootstrap CSS -->
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                </head>
                <body class="bg-light">
                    <div class="container mt-5">
                        <div class="card shadow-sm">
                            <div class="card-header bg-primary text-white">
                                <h4 class="mb-0">Contact Form Submitted</h4>
                            </div>
                            <div class="card-body">
                                <p class="mb-2"><strong>Name:</strong> {name}</p>
                                <p class="mb-2"><strong>Email:</strong> {email}</p>
                                <p class="mb-2"><strong>Subject:</strong> {subject}</p>
                                <p class="mb-2"><strong>Message:</strong> {message}</p>
                            </div>
                            <div class="card-footer text-center">
                                <a href="/" class="btn btn-secondary">Go Back</a>
                            </div>
                        </div>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
                </body>
                </html>
                """

        return HttpResponse(html_content)
@login_required
def upload(request):
    if request.method == 'POST':
        form = Trending_(request.POST , request.FILES)
        if form.is_valid():
            form.save()
            return redirect( 'success')
    else:
        form = Trending_()
    data = Trending.objects.all()
    return render(request , 'upload.html', {'form':form , 'data':data})


@login_required
def home(request):
    if request.method == "POST":
        if "contact_submit" in request.POST:
            return contactform(request)
    Flagshipdata = Trending.objects.filter(category='flagship')
    iphone = Trending.objects.filter(category='iPhone')
    google = Trending.objects.filter(category='google')
    samsung = Trending.objects.filter(category='samsung')
    oneplus = Trending.objects.filter(category='onePlus')
    xiaomi = Trending.objects.filter(category='xiaomi') 
    asus = Trending.objects.filter(category='asus')
    flagship = Trending.objects.filter(category='flagship')
    gaming = Trending.objects.filter(category='gaming')
    budget = Trending.objects.filter(category='budget')
    foldable = Trending.objects.filter(category='foldable')
    return render(request , 'home.html' ,
                  {'Flagshipdata': Flagshipdata , 
                   'iphone': iphone, 
                   'google': google, 
                   'samsung': samsung, 
                   'oneplus': oneplus, 
                   'xiaomi': xiaomi, 
                   'asus': asus,
                   'flagship': flagship,
                    'gaming': gaming,
                    'budget': budget,
                    'foldable': foldable
                   })

def success(request):
    return render(request , 'success.html')


def cart_detail(request , id):
    product = Trending.objects.get(id = id)
    
    return JsonResponse({
        'name':product.name,
        'image':product.image.url,
        'price':product.price
    })
    
    
    
from django.http import JsonResponse
from .models import Trending

def live_search(request):
    query = request.GET.get('q', '')
    results = []
    if query:
        items = Trending.objects.filter(name__icontains=query)[:5]  
        results = [
            {
                'name': item.name,
                'price': item.price,
                'category': item.category.capitalize(),
                'image': item.image.url if item.image else '',
            }
            for item in items
        ]
    return JsonResponse({'results': results})


from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages

def login_view(request):

    if request.user.is_authenticated:
        return redirect("home")

    if request.method == "POST":

        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:
            login(request, user)
            return redirect("home")

        messages.error(request, "Invalid username or password")

    return render(request, "login.html")






from django.contrib.auth.models import User

def register_view(request):

    if request.method == "POST":

        username = request.POST["username"]
        email = request.POST["email"]
        password1 = request.POST["password1"]
        password2 = request.POST["password2"]

        if password1 != password2:
            messages.error(request, "Passwords do not match.")
            return redirect("login")

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return redirect("login")

        User.objects.create_user(
            username=username,
            email=email,
            password=password1
        )

        messages.success(request, "Account created successfully. Please log in.")
        return redirect("login")

    return redirect("login")




from django.contrib.auth import logout



def logout_view(request):
    logout(request)
    return redirect("login")