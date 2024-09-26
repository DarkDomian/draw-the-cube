# Step 1: Use an official Node.js image as the base
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the project with Vite
RUN npm run build

# Step 7: Expose the port your app runs on (3000)
EXPOSE 3000

# Step 8: Start the application using Vercel dev
CMD ["npm start"]