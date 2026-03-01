from rest_framework import serializers
from users.models import Users
from django.contrib.auth.models import User as AuthUser

class DynamicUserSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

class AuthUserSerializer(DynamicUserSerializer):

    class Meta:
        model = AuthUser
        fields = ('first_name','last_name','email','password','is_active')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        auth_user = AuthUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        auth_user.is_active = True
        auth_user.set_password(validated_data['password'])
        auth_user.save()
        return auth_user

class UsersSerializers(DynamicUserSerializer):
    account = AuthUserSerializer(read_only=True,fields={'email','first_name','last_name','is_active'})
 
    class Meta:
        model = Users
        fields = ('id','account','bio','education','location','profile_picture','links')

    def create(self, validated_data):
        account_user = self.context['request'].user
        auth_user = AuthUser.objects.get(username=account_user)
        profile = Users.objects.create(
            account=auth_user,
            bio=validated_data['bio'],
            education=validated_data['education'],
            location=validated_data['location'],
            profile_picture=validated_data['profile_picture'],
            links=validated_data['links'],
        )
        profile.save()
        return profile