This is a demo project to learn the way Nikdev build its apps.

The stack is:
- node.js
- npm
- node >= v14
- express.js
- vite (might change)
- ContechOS as an external database.

- nd_frontend_framework -> nikdev frontend framework
- more nikdev packages to come.


Without the contechOS instance running alongside, you will be able to run the project and display the first view (Vehicles". Accessing the following views will require to run the contechOS with a specific db folder that you can currently find //Todo -> find a way to share this folder.

### Quick set up:

#### Setting up the basics:

- Clone this project.
- rename the ```.env.example``` folder to ```.env```
- Run the start npm command.
- Open the browser and check the ```localhost:3001``` url
- You see a page about vehicles -> Good.

#### Setting up the external database:

 - Set up a contechOS instance (repo: https://github.com/nikolai4D/ContechOS.git)
 - Along side the root project, copy the following db folder: // TOBEPROVIDEDSOON.
 - run the instance with ```npm run start```
 
 - Go to ```localhost:3001/login```, enter the credentials ```john``` ```123```.
 - You are redirected to John checklist page -> good.
