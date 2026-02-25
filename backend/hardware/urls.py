from django.urls import path
from . import views

urlpatterns = [
    path('api/hardware/', views.HardwareView.as_view(), name='hardware'),
]