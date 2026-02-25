from django.db import models

class Feature(models.Model):
    icon_choices = [
        ('DevicePhoneMobileIcon', 'DevicePhoneMobileIcon'),
        ('ChartBarIcon', 'ChartBarIcon'),
        ('ShieldCheckIcon', 'ShieldCheckIcon'),
        # add more as needed
    ]
    icon = models.CharField(max_length=50, choices=icon_choices, default='DevicePhoneMobileIcon')
    title = models.CharField(max_length=100)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class Device(models.Model):
    icon_choices = [
        ('CameraIcon', 'CameraIcon'),
        ('FingerPrintIcon', 'FingerPrintIcon'),
        ('BoltIcon', 'BoltIcon'),
        ('ShieldCheckIcon', 'ShieldCheckIcon'),
    ]
    name = models.CharField(max_length=100)
    tagline = models.CharField(max_length=200)
    image = models.ImageField(upload_to='devices/', blank=True, null=True)
    specs = models.TextField(help_text="One per line")  # will split by newline
    icon = models.CharField(max_length=50, choices=icon_choices, default='CameraIcon')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

    def get_specs_list(self):
        return [s.strip() for s in self.specs.split('\n') if s.strip()]

class DistributorInfo(models.Model):
    heading = models.CharField(max_length=200, default="Sole Distributor of ZK biometric devices in Pakistan")
    description = models.TextField()
    button_text = models.CharField(max_length=50, default="Contact Us for Bulk Orders")
    button_link = models.CharField(max_length=200, default="/contact")
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Distributor Info"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

class OfficeAddress(models.Model):
    location_name = models.CharField(max_length=100)  # e.g., "United States"
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True)
    city_state_zip = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']
        verbose_name_plural = "Office Addresses"

    def __str__(self):
        return self.location_name