from django.http import JsonResponse
from django.views import View
from .models import Category, Client

class CategoryListView(View):
    def get(self, request):
        categories = Category.objects.filter(is_active=True).order_by('order', 'name')
        data = [{'id': cat.id, 'name': cat.name} for cat in categories]
        return JsonResponse(data, safe=False)

class ClientListView(View):
    def get(self, request):
        category_id = request.GET.get('category')
        clients = Client.objects.filter(is_active=True).order_by('order', 'name')
        if category_id:
            clients = clients.filter(category_id=category_id)
        data = []
        for client in clients:
            data.append({
                'id': client.id,
                'name': client.name,
                'logo': client.logo.url if client.logo else None,
                'category_id': client.category.id if client.category else None,
            })
        return JsonResponse(data, safe=False)


        # myapp/views.py

def dashboard_callback(request, context):
    context.update({
        "navigation": [
            {
                "title": "Quick Stats",
                "items": [
                    {
                        "title": "Total Clients",
                        "link": "/admin/myapp/client/",
                        "description": f"{Client.objects.count()} Registered",
                        "icon": "group", # Uses Google Material Icons
                    },
                    {
                        "title": "Active Categories",
                        "link": "/admin/myapp/category/",
                        "description": f"{Category.objects.filter(is_active=True).count()} Active",
                        "icon": "category",
                    },
                ],
            },
        ],
    })
    return context