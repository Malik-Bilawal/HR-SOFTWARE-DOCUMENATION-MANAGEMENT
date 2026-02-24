from django.urls import path
from . import views

urlpatterns = [
    path('api/modules/', views.ModuleListView.as_view(), name='module-list'),
    path('api/modules/<slug:slug>/', views.ModuleDetailView.as_view(), name='module-detail'),
]