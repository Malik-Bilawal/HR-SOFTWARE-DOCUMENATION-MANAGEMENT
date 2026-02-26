from django.contrib import admin
from unfold.admin import ModelAdmin  # Correct Unfold import
from .models import Feature, Device, DistributorInfo, OfficeAddress

@admin.register(Feature)
class FeatureAdmin(ModelAdmin):
    list_display = ['title', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    search_fields = ['title']

@admin.register(Device)
class DeviceAdmin(ModelAdmin): 
    list_display = ['name', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    search_fields = ['name']

@admin.register(DistributorInfo)
class DistributorInfoAdmin(ModelAdmin): 
    list_display = ['heading', 'updated_at']
    readonly_fields = ['updated_at']

@admin.register(OfficeAddress)
class OfficeAddressAdmin(ModelAdmin):
    list_display = ['location_name', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    search_fields = ['location_name']