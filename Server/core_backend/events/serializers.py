from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Event, Registration
import re


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def validate_password(self, value):
        # 1. Length Check
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        
        # 2. Number Check
        if not re.search(r'[0-9]', value):
            raise serializers.ValidationError("Password must contain at least one number.")
            
        # 3. Capital Letter Check
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
            
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class EventSerializer(serializers.ModelSerializer):
    total_registrations = serializers.SerializerMethodField()
    seats_left = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'location', 'max_seats', 'total_registrations', 'seats_left', 'created_at']

    def get_total_registrations(self, obj):
        return obj.attendees.count()

    def get_seats_left(self, obj):
        return max(0, obj.max_seats - obj.attendees.count())

class RegistrationSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only=True)
    event_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Registration
        fields = ['id', 'event', 'event_id', 'registered_at']

    def validate(self, data):
        user = self.context['request'].user
        event_id = data['event_id']
        
        if Registration.objects.filter(user=user, event_id=event_id).exists():
            raise serializers.ValidationError("You are already registered for this event.")
        return data

    def create(self, validated_data):
        user = self.context['request'].user
        event = Event.objects.get(id=validated_data['event_id'])
        return Registration.objects.create(user=user, event=event)