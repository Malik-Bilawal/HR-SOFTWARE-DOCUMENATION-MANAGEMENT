from django.http import JsonResponse
from django.views import View
from .models import Feature, Device, DistributorInfo, OfficeAddress

class HardwareView(View):
    def get(self, request):
        # Features
        features = []
        for f in Feature.objects.filter(is_active=True).order_by('order'):
            features.append({
                'icon': f.icon,
                'title': f.title,
                'desc': f.description,
            })

        # Devices
        devices = []
        for d in Device.objects.filter(is_active=True).order_by('order'):
            devices.append({
                'name': d.name,
                'tagline': d.tagline,
                'image': d.image.url if d.image else None,
                'specs': d.get_specs_list(),
                'icon': d.icon,
            })

        # Distributor info
        dist = DistributorInfo.load()
        distributor = {
            'heading': dist.heading,
            'description': dist.description,
            'button_text': dist.button_text,
            'button_link': dist.button_link,
        }

        # Office addresses
        offices = []
        for o in OfficeAddress.objects.filter(is_active=True).order_by('order'):
            offices.append({
                'location_name': o.location_name,
                'address_line1': o.address_line1,
                'address_line2': o.address_line2,
                'city_state_zip': o.city_state_zip,
            })

        data = {
            'features': features,
            'devices': devices,
            'distributor': distributor,
            'offices': offices,
        }
        return JsonResponse(data)