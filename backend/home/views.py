from django.http import JsonResponse
from django.views import View
from .models import (
    HeroSection, WhyChooseFeature, AppFeature,
    Stat, Testimonial, Certification, Award
)
from clients.models import Client  # reuse client logos for the strip

class HomePageView(View):
    def get(self, request):
        # Hero section (singleton)
        hero = HeroSection.load()
        hero_data = {
            'heading': hero.heading,
            'description': hero.description,
            'primary_button_text': hero.primary_button_text,
            'primary_button_link': hero.primary_button_link,
            'secondary_button_text': hero.secondary_button_text,
            'secondary_button_link': hero.secondary_button_link,
            'background_image': hero.background_image.url if hero.background_image else None,
        }

        # Why choose features
        why_choose = list(WhyChooseFeature.objects.filter(is_active=True)
                          .order_by('order').values_list('title', flat=True))

        # App features
        app_features = list(AppFeature.objects.filter(is_active=True)
                            .order_by('order').values_list('description', flat=True))

        # Stats
        stats = list(Stat.objects.filter(is_active=True)
                     .order_by('order').values('value', 'label'))

        # Testimonials
        testimonials = []
        for t in Testimonial.objects.filter(is_active=True).order_by('order'):
            testimonials.append({
                'quote': t.quote,
                'author_name': t.author_name,
                'author_title': t.author_title,
                'author_image': t.author_image.url if t.author_image else None,
            })

        # Certifications
        certifications = []
        for c in Certification.objects.filter(is_active=True).order_by('order'):
            certifications.append({
                'name': c.name,
                'image': c.image.url,
            })

        # Awards
        awards = []
        for a in Award.objects.filter(is_active=True).order_by('order'):
            awards.append({
                'name': a.name,
                'image': a.image.url,
            })

        clients = []
        for client in Client.objects.filter(is_active=True).order_by('?')[:6]:
            clients.append({
                'name': client.name,
                'logo': client.logo.url if client.logo else None,
            })

        data = {
            'hero': hero_data,
            'why_choose_features': why_choose,
            'app_features': app_features,
            'stats': stats,
            'testimonials': testimonials,
            'certifications': certifications,
            'awards': awards,
            'clients': clients,
        }
        return JsonResponse(data)


def dashboard_callback(request, context):
    """
    Unfold dashboard callback.
    This function can add extra context to the admin dashboard.
    """
    # Add any custom data you want for the admin dashboard
    context['custom_message'] = "Welcome to the Admin Dashboard 🚀"
    return context