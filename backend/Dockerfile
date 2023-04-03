# syntax=docker/dockerfile:1
FROM python:3-alpine
WORKDIR /app
COPY requirements.txt  requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD flask --app server run -h 0.0.0.0 -p 5000