from django.contrib import admin
from .models import Feature, Device, DistributorInfo, OfficeAddress

@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_active']
    list_editable = ['order', 'is_active']

@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'is_active']
    list_editable = ['order', 'is_active']

@admin.register(DistributorInfo)
class DistributorInfoAdmin(admin.ModelAdmin):
    list_display = ['heading', 'updated_at']

@admin.register(OfficeAddress)
class OfficeAddressAdmin(admin.ModelAdmin):
    list_display = ['location_name', 'order', 'is_active']
    list_editable = ['order', 'is_active']