from django.db import models

class ContactInfo(models.Model):
    """Singleton model for global contact information"""
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True)
    city_state_zip = models.CharField(max_length=255)
    sales_phone = models.CharField(max_length=50)
    support_phone = models.CharField(max_length=50)
    info_email = models.EmailField()
    support_email = models.EmailField()
    hours_weekday = models.CharField(max_length=100, default="9:00 AM - 6:00 PM")
    hours_saturday = models.CharField(max_length=100, default="10:00 AM - 2:00 PM")
    hours_sunday = models.CharField(max_length=100, default="Closed")
    map_embed_url = models.URLField(blank=True, help_text="Google Maps embed URL")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Contact Info"

    def save(self, *args, **kwargs):
        # Ensure only one record exists
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "Contact Information"

class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=300)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.subject[:30]}"