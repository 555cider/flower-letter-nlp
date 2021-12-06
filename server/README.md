# README
## Introduction to server
- Based on Docker
- Consists of three images: web, postgres_db, mongo_db. See `docker-compose.yml`
- Traefik serves as reverse proxy that routes `fastapi.local` to the API server

## Running on local
### Related files:
- `project/Dockerfile`
- `project/db`
- `project/entrypoint.sh`
- `docker-compose.yml`
- `traefik.dev.toml`
### Steps
- Install Docker if it's not already
- Check you are at `/server`
- Run following command:
```bash
$ chmod +x project/entrypoint.sh
```
- Create an environment variable file `.env`. Copy contents from `.env.example`
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

## Production environment
### Related files:
- `project/Dockerfile.prod`
- `project/db` // this may change to use managed database service
- `project/prestart.sh` // this may change
- `docker-compose.prod.yml`
- `Dockerfile.traefik`
- `traefik.prod.toml`
  
### About production env
- Production environment utilizes `Let's Encrypt` to automatically acquire certificates via Traefik. This enables secure `https` connection.
- Domain name is required for this, which are outlined in `docker-compose.prod.yml`
- Requests to HTTP are automatically routed to HTTPS. `traefik.prod.toml` 
- certificate will be stored at `/traefik-public-certificates`

### Access
- API server can be accessed at `https://api.flowerletter.co.kr/docs`

## Todo:
- After development finishes, change CORS settings in production env file.
- Maybe better to run a separate container for dev purposes:
  - separate CORS
  - separate DB
  - separate public address e.g. `http://test.flowerletter.co.kr`