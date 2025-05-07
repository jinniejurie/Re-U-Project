FROM python:3.11
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install python-decouple dj-database-url
COPY . .

EXPOSE 8889

CMD ["python", "manage.py", "runserver", "0.0.0.0:8889"]
