#!/bin/sh

# Migration
alembic upgrade head

exec "$@"