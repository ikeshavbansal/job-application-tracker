# Job Application Tracker

A Kanban-style job application tracker built to manage my own job search — track applications through Wishlist → Applied → Interviewing → Offer → Rejected, with automated email reminders for follow-ups.

## Features

-   Drag-and-drop Kanban board (persists to the database)
-   Create, edit, and delete applications
-   Search/filter by company or role
-   Automated daily email reminders for follow-ups (Celery Beat)
-   Toast-based error handling on form validation

## Tech Stack

**Backend:** Django, Django REST Framework, Celery, Celery Beat, Redis, django-filter
**Frontend:** React, Redux Toolkit, RTK Query, Tailwind CSS, @hello-pangea/dnd, react-hot-toast

## Architecture

-   `core/` — Django project settings, URL routing, Celery config
-   `tracker/` — Django app: model, serializer, viewset, Celery task
-   `frontend/` — React app (Vite), with RTK Query talking to the DRF API

## Running locally

### Backend

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Celery (requires Redis running on localhost:6379)

```bash
celery -A core worker --loglevel=info
celery -A core beat --loglevel=info --scheduler django_celery_beat.schedulers:DatabaseScheduler
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`.

## Screenshots

_(add a screenshot of the board here)_
