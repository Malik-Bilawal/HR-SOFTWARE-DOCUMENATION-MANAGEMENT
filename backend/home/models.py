from django.db import models

class HeroSection(models.Model):
    heading = models.CharField(max_length=200)
    description = models.TextField()
    primary_button_text = models.CharField(max_length=50, default="Request a Demo")
    primary_button_link = models.CharField(max_length=200, default="/request-demo")
    secondary_button_text = models.CharField(max_length=50, default="Explore Modules")
    secondary_button_link = models.CharField(max_length=200, default="/modules")
    background_image = models.ImageField(upload_to='home/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = "Hero Section"

    def save(self, *args, **kwargs):
        # Ensure only one hero section exists
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

class WhyChooseFeature(models.Model):
    title = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class AppFeature(models.Model):
    description = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.description[:50]

class Stat(models.Model):
    value = models.CharField(max_length=50)  # e.g., "1,300+"
    label = models.CharField(max_length=100) # e.g., "ORGANIZATIONS RELY ON FLOWHCM"
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.value} {self.label}"

class Testimonial(models.Model):
    quote = models.TextField()
    author_name = models.CharField(max_length=100)
    author_title = models.CharField(max_length=100)
    author_image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.author_name

class Certification(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='certifications/')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class Award(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='awards/')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name