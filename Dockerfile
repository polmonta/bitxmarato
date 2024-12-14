# Use an official Python image as the base
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies
RUN apt update && apt install -y \
    curl \
    iputils-ping \
    dnsutils \
    postgresql-client \
    python3-pip \
    libpq-dev

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt --break-system-packages

# Expose Flask's default port
EXPOSE 5000

# Command to run the Flask app
CMD ["python3", "app.py"]