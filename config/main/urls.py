from . import views
from django.urls import path 
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.login_view, name="login"),
    path("register/", views.register_view, name="register"),
    path("logout/", views.logout_view, name="logout"),
    path('upload/',views.upload,name='upload'),
    path('home/',views.home, name='home'),
    path('success', views.success, name='success'),
    path('update/<int:id>',views.update,name='update'),
    path('delete/<int:id>',views.delete,name='delete'),
    path("cart_details/<int:id>", views.cart_detail,),
    path('live-search/', views.live_search, name='live_search'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)