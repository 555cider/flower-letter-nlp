# pull the official docker image
FROM python:3.8

# set work directory
WORKDIR /app

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN apt-get update && apt-get install -y build-essential git && apt-get -y install gcc \
  && apt-get install -y libssl-dev libffi-dev musl-dev
# RUN curl --proto '=https' --tlsv1.2 -sSf -y https://sh.rustup.rs | sh
# RUN curl --insecure https://sh.rustup.rs -sSf > /usr/bin/rustup-init  && chmod +x /usr/bin/rustup-init 
# RUN rustup-init -y
# RUN rustup update stable
# Get Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
# RUN echo 'source $HOME/.cargo/env' >> $HOME/.bashrc
RUN pip install --upgrade pip



COPY requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .