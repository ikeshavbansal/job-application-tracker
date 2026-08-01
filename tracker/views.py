from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import JobApplication
from .serializers import JobApplicationSerializer


@api_view(["GET"])
def health_check(request):
    return Response({"status": "ok", "message": "Job Tracker API is running"})


class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    filterset_fields = ["status"]
    search_fields = ["company", "role", "notes"]