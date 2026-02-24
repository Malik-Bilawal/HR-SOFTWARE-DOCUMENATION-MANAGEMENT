import json
from django.http import JsonResponse
from django.views import View
from django.core.serializers import serialize
from .models import Module

class ModuleListView(View):
    def get(self, request):
        modules = Module.objects.filter(is_active=True).order_by('order', 'name')
        # serialize queryset to JSON
        data = []
        for module in modules:
            data.append({
                'id': module.id,
                'name': module.name,
                'slug': module.slug,
                'hero_heading': module.hero_heading,
                'hero_description': module.hero_description,
                'content': module.content,
                'featured_image': module.featured_image.url if module.featured_image else None,
                'order': module.order,
            })
        return JsonResponse(data, safe=False)

class ModuleDetailView(View):
    def get(self, request, slug):
        try:
            module = Module.objects.get(slug=slug, is_active=True)
            data = {
                'id': module.id,
                'name': module.name,
                'slug': module.slug,
                'hero_heading': module.hero_heading,
                'hero_description': module.hero_description,
                'content': module.content,
                'featured_image': module.featured_image.url if module.featured_image else None,
                'order': module.order,
            }
            return JsonResponse(data)
        except Module.DoesNotExist:
            return JsonResponse({'error': 'Module not found'}, status=404)