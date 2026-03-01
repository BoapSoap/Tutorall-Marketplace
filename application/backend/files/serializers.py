from rest_framework import serializers
from files.models import Files
from users.serializers import UsersSerializers
from django import forms

class DynamicFileSerializer(serializers.ModelSerializer):
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

class FilesSerializers(DynamicFileSerializer):
    uploader = UsersSerializers(read_only=True, fields={'name'})
    class Meta:
        model = Files
        fields = ('id','name','file_type','uploader','upload_date')

class FileForm(forms.Form):
    class Meta:
        model = Files
