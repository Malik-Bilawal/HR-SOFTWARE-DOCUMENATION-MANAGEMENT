from django.contrib import admin
from unfold.admin import ModelAdmin  # <--- This is what was missing!
from .models import Category, Client

@admin.register(Category)
class CategoryAdmin(ModelAdmin): # Using Unfold's ModelAdmin
    list_display = ('name', 'order', 'is_active')
    list_editable = ('order', 'is_active')

@admin.register(Client)
class ClientAdmin(ModelAdmin):
    # 1. List View Settings (The Table)
    list_display = ('name', 'category', 'order', 'is_active')
    list_filter = ('category', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('name',)

    fieldsets = (
        ("Main Info", {
            "fields": ("name", "logo", "category"),
        }),
        ("Status & Rank", {
            "classes": ("tab",), # Unfold magic: Turns this into a tab
            "fields": ("order", "is_active"),
        }),
    )