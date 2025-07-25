# Use NGINX as the base image
FROM nginx:1.23.0

# Update and upgrade the system
RUN apt-get update && apt-get upgrade -y

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Install dependencies for building and running the app
RUN apt-get install -y \
  libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 \
  libxss1 libasound2 libxtst6 xauth xvfb g++ make

# Set the working directory
WORKDIR /src/build-your-own-radar

# Copy package files for Node.js dependencies
COPY package.json ./
COPY package-lock.json ./

# Install Node.js dependencies
RUN npm ci

# Copy the rest of the application files
COPY . ./

# Copy the CSV file into the container
COPY ./techradar-data.csv /opt/build-your-own-radar/files/techradar-data.csv

# Override the parent image's entrypoint
ENTRYPOINT []

# Start the NGINX server with the application
CMD ["./build_and_start_nginx.sh"]
