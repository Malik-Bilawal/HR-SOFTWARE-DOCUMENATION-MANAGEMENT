from django.db import models
from django.utils.text import slugify

class Module(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    hero_heading = models.CharField(max_length=200)
    hero_description = models.TextField()
    content = models.TextField(help_text="Full page content (HTML allowed)")
    featured_image = models.ImageField(upload_to='modules/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order', 'name']