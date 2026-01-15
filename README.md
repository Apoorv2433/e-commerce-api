Project Setup
1. Clone the repository
git clone <your-repo-url>
cd ecommerce-api

2. Install dependencies
npm install

3. Environment variables

PORT=3000

MONGO_URI=mongodb://localhost:27017/ecommerce

JWT_SECRET=supersecret

4. Start the server
For development (with auto-reload):
npm run dev

For production:
npm start

Swagger UI is available at:
http://localhost:<PORT>/api/docs