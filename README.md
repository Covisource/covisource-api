## **covisource-api**

The API server for the Covisource platform.

### **Steps to run**

1. Run `yarn` in the root directory
2. Create a
   - `firebaseCredDev.json`
     - The firebase credential for the development project
   - `firebaseCredProd.json`
     - The firebase credential for the production project
3. Create a .env file in the root directory and populate it with:
   - `PORT` - Houses the port to run the server on
   - `REQUEST_ALLOWED_URL` - The url to allow requests from (client)
   - `ENVIRONMENT` - The state of the environment ("DEV" | "PROD")
   - `MONGO_URI` - Mongo DB Connection String
   - `JWT_SECRET` - The Random String used to decode JWT's (This must be the same as the counterpart in the client repository, if you are using it)
