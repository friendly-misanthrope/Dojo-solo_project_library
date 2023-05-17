# My Favorite Books
## A full-stack MERN app for keeping track of your favorite books and related notes.

## IMPORTANT:
### You must change the IP in all React Axios calls to whichever computer is running your Express server.
### This is usually localhost, but may be different if your Express server is running on a VM or another physical computer.

### To run the application:

Before getting started, you will need to be running an instance of MongoDB on your local computer. Make sure that the IP address and port are correct in server/config/mongoose.config.js.

  - Open 2 separate bash terminals in your IDE. Navigate to the 'server' folder in the first terminal, and the 'react-client' folder in the second terminal.

      ### react-client:
        - In the react-client terminal, run 'npm i' to install dependencies.
        - Run 'npm start' to spin up the development server. A new browser window will open up to localhost:3000.

      ### server:
        - In the server terminal, run 'npm i' to install dependencies.
        - Run either 'nodemon server.js' or 'node server.js'.
        - You should see 2 messages in the server terminal's console: "Server is listening on port 8000", and "Database connection established".
    
## You are now all set to create, read, update, and delete books and their related notes and cover photos!

Constructive criticism and ideas are always welcome. This application is a WIP and new features will be added in the coming weeks/months. User registration/login is coming soon.

Thanks for checking out my project!
~Nick