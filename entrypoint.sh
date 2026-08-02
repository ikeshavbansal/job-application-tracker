#!/bin/bash
set -e

echo "Waiting for database..."
while ! python -c "
import socket, os
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.settimeout(1)
try:
    s.connect((os.environ.get('DB_HOST', 'db'), int(os.environ.get('DB_PORT', 5432))))
    s.close()
except Exception:
    exit(1)
" ; do
  sleep 1
done
echo "Database is up."

if [ "$RUN_MIGRATIONS" = "true" ]; then
  python manage.py migrate --noinput
fi

exec "$@"