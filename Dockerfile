# Use the official Node.js 18 LTS base image for a stable and secure runtime environment
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only the package manager files first to leverage Docker's caching mechanism
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally and install project dependencies
# Using `pnpm` ensures efficient dependency management with a smaller disk footprint
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application code into the container
COPY . .

# Expose the port the application will run on (default: 3000)
EXPOSE 3000

# Define the default command to run the application
CMD ["pnpm", "start"]
