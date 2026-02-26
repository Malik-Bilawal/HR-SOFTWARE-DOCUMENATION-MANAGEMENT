from django.contrib import admin
from unfold.admin import ModelAdmin  # Import the Unfold version
from .models import ContactInfo, ContactMessage

@admin.register(ContactInfo)
class ContactInfoAdmin(ModelAdmin): # Changed to Unfold ModelAdmin
    list_display = ['address_line1', 'sales_phone', 'info_email']
    

    def has_add_permission(self, request):
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

@admin.register(ContactMessage)
class ContactMessageAdmin(ModelAdmin): # Changed to Unfold ModelAdmin
    list_display = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject']
    actions = ['mark_as_read']

    # Custom Unfold styling for the action button
    @admin.action(description="Mark selected messages as read")
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)