![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67)
<!-- Donate Button -->
### Welcome to API_Supply!
#### The API of APIs designed with code school students in mind.

This RESTful Application Program Interface(API) is a collection of useful APIs meant for Code Fellows 301 students to reference in order to help brainstorm final project ideas. It's an API of APIs!

This portion of the project is only the back-end infrastructure and functionality to create, read, update and delete data from a user and superuser standpoint. These two types of users can create an authenticated account to search through our small database of popular APIs by category, vet each API to ensure it will be useful, then add them to a list of favorites. Only the superuser has API update and delete privileges.


[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
### Project Description
Using node.js, HTTP, Express, MongoDB, and Mongoose we have created a Server that responds to different GET, POST, PUT, and DELETE responses from a developer, backend position. The requests to our live server can interact with a remote Database created through Mlabs. In this example we use two schemas- Users and APIs. There are two types of Users, SuperUser and User. Only the SuperUser can POST, PUT, and DELETE. This project represents what is possible with a few simple tools.

### About the Team
* [Isaiah Walker](https://github.com/Lonewalker72)
* [Madeline Stevens](https://github.com/madhubs)
* [Gavin Thomas](https://github.com/GavinThomas1192)

### Table of Contents
+ [Flowchart](#Flowchart)
+ [Installation](#Installation)
+ [Routes](#Routes)
+ [Resources](#Resources)

### Flowchart
This flowchart will help visualize our requests, our routes and our endpoints.
![flowchart]()

https://api-supply.herokuapp.com/
https://api-supply-staging.herokuapp.com/
### Installation:
+ If you'd like, fork this repository and clone it anywhere you'd like on your computer.
+ There is no installation to use our API. It simply requires a way to make API calls.
  <!-- + In this README we are using POSTMAN. You can download it here.
    + `https://www.getpostman.com/`
  + Optionally you can use CURL or HTTPie in your terminal, but our examples will be in POSTMAN. -->
_________________
## Routes

### SignUp
#### POST
##### First you must Sign Up for an account with a POST request to receive an authentication token associated with your account. You can create a SuperUser, who has access to all CRUD operations by assigning a key/value `"isAdmin": true;` vs every other user who should be `"isAdmin": false;`.



##### Example Route
      https://api-supply.herokuapp.com/api/signup
##### Example Request Body
      {
      "username": "Gavin",
      "name": "Thomas",
      "password": "1234",
      "email": "test@test.com",
      "subscribedToEmail": "true",
      "isAdmin": "true"
      }

##### Example Response Body
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyYzNjMTM2ODVkMzNiNDZmM2Y2xxxxN2U4MTYxNDAxNGNhYjRlYzEzMjQ0ZmYxMzE4ZTk0NjAzZDgyNDQxNDMiLCJpYXQiOjE1MDU5NDEwMzl9.SBU98dd7efiTcb0cZb2YNsn8CRH06YkQA41IsK2IrZU
_________________

### SignIn
#### GET
##### In addition to signing up, you can make a GET request to sign in for returning users. This will generate a new Authorization Token to be used during that User's session.  


##### Example Route
      https://api-supply.herokuapp.com/api/signin
##### Example Basic Auth
      {
      "username": "Gavin",
      "password": "1234",
      }

##### Example Response Body
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyYzNjMTM2ODVkMzNiNDZmM2Y2xxxxN2U4MTYxNDAxNGNhYjRlYzEzMjQ0ZmYxMzE4ZTk0NjAzZDgyNDQxNDMiLCJpYXQiOjE1MDU5NDEwMzl9.SBU98dd7efiTcb0cZb2YNsn8CRH06YkQA41IsK2IrZU

_______________

### POST
##### The SuperUser only can make POST requests to store API objects into the Mlabs Database.  


##### Example Route
      https://api-supply.herokuapp.com/api/newapi
##### Example Auth Headers
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyYzNjMTM2ODVkMzNiNDZmM2Y2xxxxN2U4MTYxNDAxNGNhYjRlYzEzMjQ0ZmYxMzE4ZTk0NjAzZDgyNDQxNDMiLCJpYXQiOjE1MDU5NDEwMzl9.SBU98dd7efiTcb0cZb2YNsn8CRH06YkQA41IsK2IrZU

##### Example Request Body
      {
        "name": "Unsplash",
        "url": "https://unsplash.com/developers",
        "desc": "Build powerful photo apps with free high definition images from Unsplash",
        "examplesOfUse": "Random background image change, Memory game with random images",
        "examplesInUse": "https://crew.co/blog/unsplash-api/, https://www.programmableweb.com/api/unsplash",
        "rating": "Average",
        "tokenRequired": "True",
        "tokenAccessWaitTime": "Initially, your application will be in development mode and will be rate-limited to 50 requests per hour. When ready for production, upload screenshots of your application (focusing on the proper attribution and use of Unsplash photos in your app), then click the “Request Approval” button. If approved, your rate limit will be increased to the full amount.",
        "maxReqMin": "50 requests per hour",
        "numUsersFav": "0",
        "_category": "Photo"
      }


##### Example Response Body
      {
          "__v": 0,
          "updatedAt": "2017-09-20T19:58:08.343Z",
          "createdAt": "2017-09-20T19:58:08.343Z",
          "name": "Unsplash",
          "url": "https://unsplash.com/developers",
          "desc": "Build powerful photo apps with free high definition images from Unsplash",
          "examplesOfUse": "Random background image change, Memory game with random images",
          "examplesInUse": "https://crew.co/blog/unsplash-api/, https://www.programmableweb.com/api/unsplash",
          "rating": "Average",
          "tokenRequired": true,
          "tokenAccessWaitTime": "Initially, your application will be in development mode and will be rate-limited to 50 requests per hour. When ready for production, upload screenshots of your application (focusing on the proper attribution and use of Unsplash photos in your app), then click the “Request Approval” button. If approved, your rate limit will be increased to the full amount.",
          "maxReqMin": "50 requests per hour",
          "numUsersFav": "0",
          "_category": "Photo",
          "userId": "59c2a7653e80cc0012de07d7",
          "_id": "59c2c85098d3000012c9f0b6"
      }
_______________

### GET
##### All Users can make GET requests. The 3 GET endpoints are:
+ Get all
+ Get all by category
+ Get by Id


##### Example Route for GetAll
      https://api-supply.herokuapp.com/api/newapi/getall
##### Example Auth Headers
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyYzNjMTM2ODVkMzNiNDZmM2Y2xxxxN2U4MTYxNDAxNGNhYjRlYzEzMjQ0ZmYxMzE4ZTk0NjAzZDgyNDQxNDMiLCJpYXQiOjE1MDU5NDEwMzl9.SBU98dd7efiTcb0cZb2YNsn8CRH06YkQA41IsK2IrZU

##### Example Response Body
      [
      "59c2a7cf3e80cc0012de07d8",
      "59c2c78798d3000012c9f0b0",
      "59c2c7e398d3000012c9f0b1",
      "59c2c80598d3000012c9f0b2",
      "59c2c80998d3000012c9f0b3",
      "59c2c83598d3000012c9f0b4",
      "59c2c84898d3000012c9f0b5",
      "59c2c85098d3000012c9f0b6",
      "59c2c86e98d3000012c9f0b7",
      "59c2c8a098d3000012c9f0b8",
      "59c2c8b698d3000012c9f0b9"
      ]


_______________

##### Example Route GetAllByCategory format
      https://api-supply.herokuapp.com/api/newapi/getallbycategory/:_category

##### Example Route GetAllByCategory with example category
      https://api-supply.herokuapp.com/api/newapi/getallbycategory/sports
##### Example Auth Headers
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyYzNjMTM2ODVkMzNiNDZmM2Y2xxxxN2U4MTYxNDAxNGNhYjRlYzEzMjQ0ZmYxMzE4ZTk0NjAzZDgyNDQxNDMiLCJpYXQiOjE1MDU5NDEwMzl9.SBU98dd7efiTcb0cZb2YNsn8CRH06YkQA41IsK2IrZU

##### Example Request Body
      {
        "name": "Unsplash",
        "url": "https://unsplash.com/developers",
        "desc": "Build powerful photo apps with free high definition images from Unsplash",
        "examplesOfUse": "Random background image change, Memory game with random images",
        "examplesInUse": "https://crew.co/blog/unsplash-api/, https://www.programmableweb.com/api/unsplash",
        "rating": "Average",
        "tokenRequired": "True",
        "tokenAccessWaitTime": "Initially, your application will be in development mode and will be rate-limited to 50 requests per hour. When ready for production, upload screenshots of your application (focusing on the proper attribution and use of Unsplash photos in your app), then click the “Request Approval” button. If approved, your rate limit will be increased to the full amount.",
        "maxReqMin": "50 requests per hour",
        "numUsersFav": "0",
        "_category": "Photo"
      }


##### Example Response Body
      {
          "__v": 0,
          "updatedAt": "2017-09-20T19:58:08.343Z",
          "createdAt": "2017-09-20T19:58:08.343Z",
          "name": "Unsplash",
          "url": "https://unsplash.com/developers",
          "desc": "Build powerful photo apps with free high definition images from Unsplash",
          "examplesOfUse": "Random background image change, Memory game with random images",
          "examplesInUse": "https://crew.co/blog/unsplash-api/, https://www.programmableweb.com/api/unsplash",
          "rating": "Average",
          "tokenRequired": true,
          "tokenAccessWaitTime": "Initially, your application will be in development mode and will be rate-limited to 50 requests per hour. When ready for production, upload screenshots of your application (focusing on the proper attribution and use of Unsplash photos in your app), then click the “Request Approval” button. If approved, your rate limit will be increased to the full amount.",
          "maxReqMin": "50 requests per hour",
          "numUsersFav": "0",
          "_category": "Photo",
          "userId": "59c2a7653e80cc0012de07d7",
          "_id": "59c2c85098d3000012c9f0b6"
      }
_______________
#### User GET/signin requests
+ Example.==>`http GET localhost:3000/api/signin username:password`
+ Example w/ Mock ID ==> `http GET localhost:3000/api/signin/gavinator:35353`
+ Also from the the second terminal window you can make a series of GET, POST, PUT, and DELETE requests for database APIs.
#### API POST
+ Example ==>`http POST localhost:3000/api/gallery name=name desc=password`
+ Example w/ Mock info ==> `http POST localhost:3000/api/gallery name=Gavinator desc=35353`
#### API GET
+ Example.==>`http GET localhost:3000/api/gallery/_id:`
+ Example w/ Mock ID ==> `http GET localhost:3000/api/gallery/377448883737262`
#### Gallery GETALL
+ Example.==>`http GET localhost:3000/api/gallery`
+ Example w/ Mock ID ==> `http GET localhost:3000/api/gallery`
#### Gallery PUT
+ Example.==>`http GET localhost:3000/api/gallery/_id: name:name desc=desc`
+ Example w/ Mock ID ==> `http PUT localhost:3000/api/gallery/3384748484 name:Moana desc=pilot`
#### Gallery DELETE
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
### All routes require an AUTH token which you recieve on signup/signin
#### Photo POST
+ Example ==>`http POST localhost:3000/api/photo image name desc galleryId`
+ Example w/ Mock info ==> `http POST localhost:3000/api/photo image=directPathToImage.png name=TestImage desc=TestImageDesc galleryId=3766474738822`
#### Photo GET
+ Example.==>`http GET localhost:3000/api/photo/_id:`
+ Example w/ Mock ID ==> `http GET localhost:3000/api/photo/377448883737262`
#### Photo GETALL
+ Example.==>`http GET localhost:3000/api/photo`
+ Example w/ Mock ID ==> `http GET localhost:3000/api/photo`
#### Photo PUT
+ Example.==>`http GET localhost:3000/api/photo/_id: image= name= desc= galleryId=`
+ Example w/ Mock ID ==> `http PUT localhost:3000/api/photo/3384748484 image=directPathToImage.png name=TestImage desc=TestImageDesc galleryId=3766474738822`
#### Photo DELETE
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
    This app is completely free to be used however you'd like!
#### Resources
* [TheseHillsHaveAPIs](https://github.com/kdwinck/TheHillsHaveAPIs/blob/master/README.md)
* [Shooters](https://github.com/gsmatth/shooters-log/blob/staging/README.md)
* [Programmable Web](https://www.programmableweb.com/category/accounting/apis?category=19967)
* [Postman](https://www.getpostman.com)
