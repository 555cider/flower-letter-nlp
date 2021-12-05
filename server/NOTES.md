## Useful commands
### alembic:
```bash
alembic init -t async migrations # init alembic

alembic revision --autogenerate -m "init" # generate migration

alembic upgrade head # apply migration
```
NOTE: if for some reason generating migration doesn't work, try opening new shell.

### docker:
```bash
$ docker-compose down -v
$ docker-compose up -d --build

docker-compose logs web # see logs
```

entrypoint chmod:
```bash
$ chmod +x project/entrypoint.sh
```

Copy & run db script
```bash
docker-compose cp ./project/util/seed.sql postgres_db:/seed.sql

$ docker-compose exec postgres_db psql --username=flower_letter --dbname=flower_letter

\i seed.sql
```

### Tests
Run test:
```bash
$ docker-compose exec web pytest .
```