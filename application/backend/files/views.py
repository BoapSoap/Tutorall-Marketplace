from rest_framework import generics
from rest_framework.response import Response
from files.models import Files
from users.models import Users
from files.serializers import FilesSerializers, FileForm
from rest_framework.permissions import AllowAny

# Create your views here.
class FilesList(generics.ListAPIView):
    queryset = Files.objects.all()
    serializer_class = FilesSerializers
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        file = FileForm(request.POST, request.FILES)
        if file.is_valid():
            instance = Files(
            name=request.POST["name"],
            file_type=request.FILES["file_type"],
            uploader=Users.objects.get(id=request.POST["uploader"])
            )
            instance.save()
            return Response(self.serializer_class(instance).data)

        else:
            return Response("File could not be saved.")


class FilesDetail(generics.RetrieveAPIView):
    queryset = Files.objects.all()
    serializer_class = FilesSerializers
    permission_classes = [AllowAny]
