from django.contrib import admin
from .models import Module
from unfold.admin import ModelAdmin  # <--- This is what was missing!


@admin.register(Module)
class ModuleAdmin(ModelAdmin):
    list_display = ('name', 'slug', 'order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

    fieldsets = (
        ("Main Info", {
            "fields": ("name", "content", "slug" , "hero_heading", "hero_description", 'featured_image' ),
        }),
        ("Status & Rank", {
            "classes": ("tab",), # Unfold magic: Turns this into a tab
            "fields": ("order", "is_active"),
        }),
    )

    # 2. Detail View Settings (The "Next Level" Form)

    # 2. Detail View Settings (The "Next Level" Form)
