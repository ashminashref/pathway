from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, EventListCreateView, EventDetailView, RegisterForEventView, MyRegistrationsView

urlpatterns = [
    # Auth
    path('register', RegisterView.as_view(), name='auth_register'),
    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Events - Added optional trailing slash formatting support
    path('events', EventListCreateView.as_view(), name='event_list'),
    path('events/', EventListCreateView.as_view()), 
    path('events/<int:id>', EventDetailView.as_view(), name='event_detail'),
    path('events/<int:id>/', EventDetailView.as_view()),
    path('events/<int:id>/register', RegisterForEventView.as_view(), name='event_register'),
    path('events/<int:id>/register/', RegisterForEventView.as_view()),
    
    # User Profile Data
    path('my-registrations', MyRegistrationsView.as_view(), name='my_registrations'),
    path('my-registrations/', MyRegistrationsView.as_view()),
]