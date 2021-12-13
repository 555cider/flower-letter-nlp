To run server, run docker file:
```bash
# /model-api
$ docker-compose build
$ docker-compose up -d
```
Check service running at `localhost:8008`


Use different docker files depending on your env or need:
- Dockerfile (basic uvicorn)
- Dockerfile.comb (gunicorn + uvicorn) - currently for production
- Dockerfile.transformer (huggingface transformer + pytorch + GPU) - NOTE: comment out transformer & pytorch from requirements.txt

