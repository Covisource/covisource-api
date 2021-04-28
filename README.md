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
   - `DB_URL` - e.g https://{project_id}-default-rtdb.firebaseio.com (copy this from the service account settings on your firebase project)
