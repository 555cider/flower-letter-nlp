# Dockerfile for local development

# pull official base image
FROM python:3.9.6-slim-buster

# set work directory
WORKDIR /app

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install system dependencies
RUN apt-get update \
  && apt-get -y install netcat gcc \
  && apt-get clean

# install dependencies
RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . . 

ENV FLASK_APP=main.py

ENV FLASK_ENV=development

ENTRYPOINT ["python"]
CMD ["app/main.py"]


# # add entrypoint.sh
# COPY ./entrypoint.sh .
# RUN chmod +x /usr/src/app/entrypoint.sh

# # run entrypoint.sh
# ENTRYPOINT ["/usr/src/app/entrypoint.sh"]