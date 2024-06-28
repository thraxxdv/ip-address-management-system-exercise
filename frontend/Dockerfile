# Matched my local machine
FROM --platform=linux/amd64 node:20.2.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (or the port your Next.js app uses)
EXPOSE 3000

# Command to run the Next.js development server
CMD ["npm", "run", "dev"]