from rest_framework import serializers
from .models import JobApplication


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = [
            "id",
            "company",
            "role",
            "status",
            "job_url",
            "notes",
            "applied_date",
            "follow_up_date",
            "reminder_sent",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "reminder_sent", "created_at", "updated_at"]