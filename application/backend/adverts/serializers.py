from rest_framework import serializers
from adverts.models import Adverts
from users.serializers import UsersSerializers
from courses.serializers import CoursesSerializers
from files.serializers import FilesSerializers
from catagories.serializers import CatagoriesSerializers
from users.models import Users
from django.contrib.auth.models import User as AuthUser
from courses.models import Courses
from catagories.models import Catagories

class DynamicAdvertsSerializer(serializers.ModelSerializer):
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

class AdvertsSerializers(DynamicAdvertsSerializer):
    users = UsersSerializers(read_only=True,fields={'name','account','bio',
                                                    'education','location','profile_picture'})
    courses = CoursesSerializers(read_only=False, fields={'name','professor'},many=True)
    files = FilesSerializers(read_only=False,fields={'name','file_type','uploader','upload_date'},required=False, many=True)
    catagories = CatagoriesSerializers(read_only=False, fields={'name'}, many=True)
    class Meta:
        model = Adverts
        fields = ('id','users','description','courses','catagories','location','price_range','files','verified')
