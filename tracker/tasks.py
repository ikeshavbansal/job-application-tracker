from datetime import date
from django.core.mail import send_mail
from django.conf import settings
from celery import shared_task
from .models import JobApplication


@shared_task
def send_followup_reminders():
    today = date.today()
    due = JobApplication.objects.filter(
        follow_up_date=today,
        reminder_sent=False,
    )

    count = 0
    for application in due:
        send_mail(
            subject=f"Follow up: {application.role} at {application.company}",
            message=(
                f"Reminder to follow up on your application for "
                f"{application.role} at {application.company}.\n\n"
                f"Notes: {application.notes or '(none)'}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.NOTIFY_EMAIL],
        )
        application.reminder_sent = True
        application.save(update_fields=["reminder_sent"])
        count += 1

    return f"Sent {count} reminder(s)"