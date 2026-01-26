FROM nginx:1.27.0-alpine

# Create a non-root user and group
RUN addgroup -S gruveuser && adduser -S gruveuser -G gruveuser

# Set working directory (optional for consistency)
WORKDIR /app

# Copy built gruveuser files
COPY dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Make all required directories and assign correct permissions
RUN mkdir -p /tmp/nginx /var/cache/nginx /var/log/nginx && \
    chown -R gruveuser:gruveuser /usr/share/nginx/html /etc/nginx /tmp/nginx /var/cache/nginx /var/log/nginx

# Run as non-root user
USER gruveuser

# Expose non-privileged port
EXPOSE 8080

# Start Nginx without root privileges, using custom pid file
CMD ["nginx", "-g", "daemon off;"]
