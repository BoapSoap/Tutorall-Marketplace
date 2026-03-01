from rest_framework import serializers
from contributors.models import Contributors

class ContributorsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Contributors
        fields = ('id','name','role','image','bio','links')