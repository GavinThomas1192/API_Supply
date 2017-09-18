# API_Supply
Your one stop API resource!


# *SeveringUpSomeAuthpresso*
# Servering the best Authpresso Experience around.

# Username login information encoding demonstration using Express, node.js, and MongoDB.
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

## Project Description
Using node.js, HTTP, superagent, Express, MongoDB, and Mongoose I have created a Server that responds to different GET, POST, PUT, and DELETE responses from a developer position. The requests can interact with a local Database managed with MongoDB. We can create relationships between two schema's. In this example I use toys and children. A toy MUST belong to a child, but a child can NOT have a toy. This project represents what is possible with a few simple tools. We can create a Database from POST requests with the information provided by the dev. Then we can interact with the database with GET, PUT, and DELETE.

## Table of Contents
+ [Installation](#installation)
+ [Usage](#Usage)
+ [About](#About)

### Installation:
+ Fork this repository and clone the forked repository anywhere you'd like on your computer.
<!-- hope this works -->
+ Open your terminal
  + Navigate to the folder where you did your git clone with your newly forked repository.
  + Make sure you are in the root directory IE. lab-gavin.;
  + Type `npm i` into your terminal.
+ Open *Four* terminal windows.
+ In the first terminal type
  + `npm run start:watch`

  + This creates a local server which should log to the console
    + `server up:: xxxx`

+ In the second terminal window type
  + `brew install httpie`

  + This installs httpie which is a package that allows you to make calls to our local server.

+ In the third terminal window type
    + `mongod --dbpath ./data/db`

+ In the Fourth terminal window type
  + `mongo` then

  + From the second terminal window you can signin/signup (GET /POST).
  ### User POST/signup requests
  + Example ==>`http POST localhost:3000/api/signup username=name password=password email=test@test.com`
  + Example w/ Mock info ==> `http POST localhost:3000/api/signup username=Gavinator password=35353 email=email@test.com`

  ### User GET/signin requests
  + Example.==>`http GET localhost:3000/api/signin username:password`
  + Example w/ Mock ID ==> `http GET localhost:3000/api/signin/gavinator:35353`



  + Also from the the second terminal window you can make a series of GET, POST, PUT, and DELETE requests for your Gallery.
  ### Gallery POST
  + Example ==>`http POST localhost:3000/api/gallery name=name desc=password`
  + Example w/ Mock info ==> `http POST localhost:3000/api/gallery name=Gavinator desc=35353`

  ### Gallery GET
  + Example.==>`http GET localhost:3000/api/gallery/_id:`
  + Example w/ Mock ID ==> `http GET localhost:3000/api/gallery/377448883737262`

  ### Gallery GETALL
  + Example.==>`http GET localhost:3000/api/gallery`
  + Example w/ Mock ID ==> `http GET localhost:3000/api/gallery`

  ### Gallery PUT
  + Example.==>`http GET localhost:3000/api/gallery/_id: name:name desc=desc`
  + Example w/ Mock ID ==> `http PUT localhost:3000/api/gallery/3384748484 name:Moana desc=pilot`

  ### Gallery DELETE
  + Example.==>`http GET localhost:3000/api/gallery/_id:`
  + Example w/ Mock ID ==> `http GET localhost:3000/api/gallery/484747483`


  <!-- ## Example Requests
  * **POST /api/toy** (requires bearer auth token)
  `https://localhost:8080/api/toy`
  ```js
  <!-- Example Body -->
  <!-- {
    "name": "barney,
    "desc": "purple dino"
  } -->

  + Also from the the second terminal window you can make a series of GET, POST, PUT, and DELETE requests to upload a photo.

  ## All routes require an AUTH token which you recieve on signup/signin
  ### Photo POST
  + Example ==>`http POST localhost:3000/api/photo image name desc galleryId`
  + Example w/ Mock info ==> `http POST localhost:3000/api/photo image=directPathToImage.png name=TestImage desc=TestImageDesc galleryId=3766474738822`

  ### Photo GET
  + Example.==>`http GET localhost:3000/api/photo/_id:`
  + Example w/ Mock ID ==> `http GET localhost:3000/api/photo/377448883737262`

  ### Photo GETALL
  + Example.==>`http GET localhost:3000/api/photo`
  + Example w/ Mock ID ==> `http GET localhost:3000/api/photo`

  ### Photo PUT
  + Example.==>`http GET localhost:3000/api/photo/_id: image= name= desc= galleryId=`
  + Example w/ Mock ID ==> `http PUT localhost:3000/api/photo/3384748484 image=directPathToImage.png name=TestImage desc=TestImageDesc galleryId=3766474738822`

  ### Photo DELETE
  + Example.==>`http GET localhost:3000/api/photo/_id:`
  + Example w/ Mock ID ==> `http GET localhost:3000/api/photo/484747483 objectKey=23452345fsdg userId=afdgsfdg3454`



<!-- ```
for code blocks
``` -->

+ If you want to interact with your database through mongo and mongoose...
  + In your fourth terminal window you can use the following commands.

  + `show collections`
    + This shows all your collections that are in the database

  + `use toy-dev`
    + This will switch to the collection you want, allowing you to manipulate the data inside. In this example I used toy-dev which will also be the name of the collection for you, if installed correctly.

  + `db.galleries.find()`
  + `db.users.find()`
    + This will return all the documents or items in the database under the collection you used.

  + `db.galleries.find()`
  + `db.users.find()``
    + This will delete all the documents or items in the database under the collections you used.

### Usage
This app is completely free to be used however you'd like!


### About
I am currently a Full Stack Web Developer with focus in UX. If you are interested in using me for any of your projects please feel free to reach out to me!
