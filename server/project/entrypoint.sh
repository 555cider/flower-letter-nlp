#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z postgres_db 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

while ! nc -z mongo_db 27017; do
  sleep 0.1
done

echo "MongoDB started"

# Migration
alembic upgrade head

exec "$@"