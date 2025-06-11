# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install any needed Python packages
RUN pip install flask requests

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable (optional)
ENV FLASK_ENV=production

# Run the app
CMD ["python", "app.py"]