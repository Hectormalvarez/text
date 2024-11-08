FROM python:3.12-alpine

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt && \
    pip install pytest pytest-flask

COPY . .

CMD ["flask", "run", "--host=0.0.0.0"]
