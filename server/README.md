# README
## Introduction to server
- Based on Docker
- Consists of three images: web, postgres_db, mongo_db. See `docker-compose.yml`
- Traefik serves as reverse proxy that routes `fastapi.local` to the API server

## Running on local
- Install Docker if it's not already
- Run following command:
```bash
$ chmod +x project/entrypoint.sh
```
- Run docker container with following command:
```bash
$ docker-compose up -d --build
```
- TIP: To view logs for a container:
```bash
docker-compose logs web # view logs for web service
```
- Alembic migration for postgresDB will automatically be applied at this point. (Check by viewing web logs)
- Seed DB with following command:
```bash
$ docker-compose exec postgres_db psql --username=flower_letter

# psql
\c flower_letter_db
\i /util_script/seed.sql

# check seeded data
select * from order_status;
```
- Check API is running on `http://fastapi.localhost:8008/docs`
- Can view Traefik dashboard at `http://localhost:8081`

### Bring down containers
- Bring containers down with:
```bash
$ docker-compose down
```
- To reset database as well (remove volumes):
```bash
$ docker-compose down -v
```
NOTE: If you remove database volumes, you will need to seed database again on restart.