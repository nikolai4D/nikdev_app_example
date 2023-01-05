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


Without the contechOS instance running alongside, you will be able to run the project and display the first view ```localhost:3001/vehicles```. Accessing the following views will require to run the contechOS with a specific db folder that you can currently find //Todo -> find a way to share this folder.

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

### Anatomy of the project:

#### Folders:

- api: manages the requests received by the server, from the client or other servers.
- bin: contains the server set up logic (ports etc...).
- dist: the bundled files. These are the script acessible to the client. Most of it is generated by bundling files from src. There should be no confidential data in the dist folder. It is the folder that express consider as static.
- mockDB is specific to the needs of this example project.
- src: contains scripts that will be bundled. The bundled output is stored in the the dist folder.

#### Files:
 - app.js is the top level router. Request received by the server are matched with its routes. It may send the orginal html file or call the api subrouter.
 - .env holds confidential data. Should never be committed or sent to the client.
 - index.html the basic html code that will be initially be sent to the client. It needs to be at the root of the project for vite.js to bundle it.
 - vite.config.js configuration for vite, the bundler tool. It needs to be at the root of the project for vite.js to consider it.
