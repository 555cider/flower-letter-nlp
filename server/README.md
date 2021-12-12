# README
## Introduction to server
- Based on Docker
- Consists of three images: web, postgres_db, mongo_db. See `docker-compose.yml`

## Running on local
### Related files:
- `project/Dockerfile`
- `project/db`
- `project/entrypoint.sh`
- `docker-compose.yml`
- (`traefik.dev.toml`) # not used
### Steps
- Install Docker if it's not already
- Check you are at `/server`
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
- Check API is running on `localhost:8000`
- postgresdb is accessible at port `5432`
- mongodb is accessible form port `27018`

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
- Currently the production environment docker compose includes:
  - a production web server
  - a test web server
  - db images (for test web server)
  - traefik for routing & encrypting
### Related files:
- `docker-compose.prod.yml`
- `Dockerfile.traefik`
- `project/Dockerfile.prod`
- `project/prestart.sh` // any startup scripts
- `traefik.prod.toml`
- `project/db` // db for test web service
  
### About production env
- Production environment utilizes `Let's Encrypt` to automatically acquire certificates via Traefik. This enables secure `https` connection.
- https is enabled for both `web_prod` and `web_test`
- Domain name is required for this. Domain for each environment is outlined in `.env`, which is used in creating `docker-compose.prod.yml`. Create .env if it's not there.
```sh
PROD_DOMAIN = api.flowerletter.co.kr
TEST_DOMAIN = testapi.flowerletter.co.kr
```
- Requests to HTTP are automatically routed to HTTPS. `traefik.prod.toml` 
- certificate will be stored at `/traefik-public-certificates`

### Composing production containers
```bash
$ docker-compose up -f docker-compose.prod.yml -d --build
```

### Access
- Production API server can be accessed at `https://api.flowerletter.co.kr/docs`
- Test API server can be accessed at `https://testapi.flowerletter.co.kr/docs`

## Todo:
- After deploying frontend, change CORS settings in production env file.