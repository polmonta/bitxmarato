# Use a base image (assuming Python)
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /app

# Copy application files into the container
COPY . /app

# Install system dependencies and Python libraries
RUN apt-get update && apt-get install -y \
    curl \
    iputils-ping \
    postgresql-client \
    && pip install --no-cache-dir -r requirements.txt

# Ensure the container doesn't execute the Flask app by default
# (No CMD or ENTRYPOINT here to prevent immediate execution)

# Expose the port for Flask
EXPOSE 5000