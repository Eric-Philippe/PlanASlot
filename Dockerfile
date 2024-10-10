FROM node:20

# Copy the frontend/ folder and the server/ folder
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install --silent

COPY server/package*.json ./server/
RUN cd server && npm install --silent

# Copy the rest of the files
COPY frontend ./frontend
COPY server ./server

# Build the frontend and the server
RUN cd frontend && npm run build
RUN cd server && npm run build

EXPOSE 3000

CMD ["node", "server/dist/server.js"]
