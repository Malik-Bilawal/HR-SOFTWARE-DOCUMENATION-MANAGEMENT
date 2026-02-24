from django.urls import path
from . import views

urlpatterns = [
    path('api/categories/', views.CategoryListView.as_view(), name='category-list'),
    path('api/clients/', views.ClientListView.as_view(), name='client-list'),
]