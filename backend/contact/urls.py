from django.urls import path
from . import views

urlpatterns = [
    path('api/contact-info/', views.ContactInfoView.as_view(), name='contact-info'),
    path('api/contact-message/', views.ContactMessageView.as_view(), name='contact-message'),
]