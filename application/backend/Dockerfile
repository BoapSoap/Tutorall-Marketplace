# Stage 1: Base build stage
FROM python:3.13-slim AS builder

# Create the app directory
RUN mkdir /app

# Set the working directory
WORKDIR /app

# Set environment variables to optimize Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Upgrade pip and install dependencies
RUN pip install --upgrade pip

# Copy the requirements file first (better caching)
COPY requirements.txt /app/

# Installing base packages
RUN apt-get update && apt-get install -y default-libmysqlclient-dev build-essential pkg-config gcc python3-dev && apt-get clean


# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Production stage
FROM python:3.13-slim

RUN apt-get update && \
    apt-get install -y libmariadb-dev libmariadb-dev-compat && \
    apt-get clean
RUN apt-get install -y dos2unix
RUN useradd -m -r appuser && \
   mkdir /app && \
   chown -R appuser /app

# Copy the Python dependencies from the builder stage
COPY --from=builder /usr/local/lib/python3.13/site-packages/ /usr/local/lib/python3.13/site-packages/
COPY --from=builder /usr/local/bin/ /usr/local/bin/

# Set the working directory
WORKDIR /app

# Copy application code
COPY --chown=appuser:appuser . .

# Set environment variables to optimize Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Switch to non-root user
USER appuser

# Expose the application port
EXPOSE 8080

# Copies the files to Docker
COPY media/ /app/media/

COPY ./entrypoint.sh /usr/local/bin/entrypoint.sh 
#ensure entrypoint.sh local is LF file not CRLF.

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# Start the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "3", "tutorall.wsgi:application"]
