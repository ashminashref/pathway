from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, EventListCreateView, EventDetailView, RegisterForEventView, MyRegistrationsView

urlpatterns = [
    # Auth - Added standard trailing slash endpoints ⚡
    path('register', RegisterView.as_view(), name='auth_register'),
    path('register/', RegisterView.as_view()),
    
    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/', TokenObtainPairView.as_view()),
    
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/refresh/', TokenRefreshView.as_view()),
    
    # Events
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