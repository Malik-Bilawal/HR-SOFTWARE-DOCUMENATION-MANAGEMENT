import json
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import ContactInfo, ContactMessage

class ContactInfoView(View):
    def get(self, request):
        info = ContactInfo.load()
        data = {
            'address_line1': info.address_line1,
            'address_line2': info.address_line2,
            'city_state_zip': info.city_state_zip,
            'sales_phone': info.sales_phone,
            'support_phone': info.support_phone,
            'info_email': info.info_email,
            'support_email': info.support_email,
            'hours_weekday': info.hours_weekday,
            'hours_saturday': info.hours_saturday,
            'hours_sunday': info.hours_sunday,
            'map_embed_url': info.map_embed_url,
        }
        return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class ContactMessageView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            subject = data.get('subject')
            message = data.get('message')

            if not all([name, email, subject, message]):
                return JsonResponse({'error': 'All fields are required'}, status=400)

            ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )
            return JsonResponse({'success': True, 'message': 'Message sent successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)