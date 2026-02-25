from django.urls import path
from . import views

urlpatterns = [
    path('api/home/', views.HomePageView.as_view(), name='home'),
]