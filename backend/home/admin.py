from django.contrib import admin
from .models import (
    HeroSection, WhyChooseFeature, AppFeature,
    Stat, Testimonial, Certification, Award
)

@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ['heading', 'updated_at']

@admin.register(WhyChooseFeature)
class WhyChooseFeatureAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_active']
    list_editable = ['order', 'is_active']

@admin.register(AppFeature)
class AppFeatureAdmin(admin.ModelAdmin):
    list_display = ['description', 'order', 'is_active']
    list_editable = ['order', 'is_active']

@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ['value', 'label', 'order', 'is_active']
    list_editable = ['order', 'is_active']

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'order', 'is_active']
    list_editable = ['order', 'is_active']

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'is_active']
    list_editable = ['order', 'is_active']

@admin.register(Award)
class AwardAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'is_active']
    list_editable = ['order', 'is_active']