![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67)
<!-- Donate Button -->
### Welcome to API_Supply!
#### The API of APIs designed with code school students in mind.

This RESTful Application Program Interface(API) is a collection of useful APIs meant for Code Fellows 301 students to reference in order to help brainstorm final project ideas. It's an API of APIs!

This portion of the project is only the back-end infrastructure and functionality to create, read, update and delete data from a user and superuser standpoint. These two types of users can create an authenticated account to search through our small database of popular APIs by category, vet each API to ensure it will be useful, then add them to a list of favorites. Only the superuser has API update and delete privileges.


[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
### Project description
Using node.js, HTTP, Express, MongoDB, and Mongoose we have created a Server that responds to different GET, POST, PUT, and DELETE responses from a developer, backend position. The requests to our live server can interact with a remote Database created through Mlabs. In this example we use two schemas- Users and APIs. There are two types of Users, SuperUser and User. Only the SuperUser can POST, PUT, and DELETE. This project represents what is possible with a few simple tools.

### About the Team
* [Isaiah Walker](https://github.com/Lonewalker72)
* [Madeline Stevens](https://github.com/madhubs)
* [Gavin Thomas](https://github.com/GavinThomas1192)

### Table of Contents
+ [Flowchart](#flowchart)
+ [Installation](#installation)
+ [Routes](#routes)
+ [Resources](#resources)

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
##### First you must Sign Up for an account with a POST request to receive an authentication token associated with your account.



##### Example route
      https://api-supply.herokuapp.com/api/signup
##### Example request body
      {
      "username": "Gavin",
      "name": "Thomas",
      "password": "1234",
      "email": "test@test.com",
      "subscribedToEmail": "true",
      "isAdmin": "true"
      }
      NOTE: You can create a SuperUser, who has access to all CRUD operations by assigning a key/value "isAdmin": true; vs every other user who should be "isAdmin": false;.

##### Example response body
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyYzNjMTM2ODVkMzNiNDZmM2Y2xxxxN2U4MTYxNDAxNGNhYjRlYzEzMjQ0ZmYxMzE4ZTk0NjAzZDgyNDQxNDMiLCJpYXQiOjE1MDU5NDEwMzl9.SBU98dd7efiTcb0cZb2YNsn8CRH06YkQA41IsK2IrZU
_________________

### SignIn
#### GET
##### In addition to signing up, you can make a GET request to sign in for returning users. This will generate a new Authorization Token to be used during that User's session.  


##### Example route
      https://api-supply.herokuapp.com/api/signin
##### Example Basic Auth
      {
      "username": "Gavin",
      "password": "1234",
      }

##### Example response Body
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyYzNjMTM2ODVkMzNiNDZmM2Y2xxxxN2U4MTYxNDAxNGNhYjRlYzEzMjQ0ZmYxMzE4ZTk0NjAzZDgyNDQxNDMiLCJpYXQiOjE1MDU5NDEwMzl9.SBU98dd7efiTcb0cZb2YNsn8CRH06YkQA41IsK2IrZU

_______________

### POST
##### The SuperUser only can make POST requests to store API objects into the Mlabs Database.  


##### Example route
      https://api-supply.herokuapp.com/api/newapi
##### Example auth headers
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyYzNjMTM2ODVkMzNiNDZmM2Y2xxxxN2U4MTYxNDAxNGNhYjRlYzEzMjQ0ZmYxMzE4ZTk0NjAzZDgyNDQxNDMiLCJpYXQiOjE1MDU5NDEwMzl9.SBU98dd7efiTcb0cZb2YNsn8CRH06YkQA41IsK2IrZU

##### Example request body
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
        "_category": "photo"
      }


##### Example response Body
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
          "_category": "photo",
          "userId": "59c2a7653e80cc0012de07d7",
          "_id": "59c2c85098d3000012c9f0b6"
      }
_______________

### GET
##### All Users can make GET requests. The 3 GET endpoints are:
+ Get all
+ Get all by category
+ Get by Id


##### Format of getAll route
      https://api-supply.herokuapp.com/api/newapi/getall
##### Example auth headers
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyYzNjMTM2ODVkMzNiNDZmM2Y2xxxxN2U4MTYxNDAxNGNhYjRlYzEzMjQ0ZmYxMzE4ZTk0NjAzZDgyNDQxNDMiLCJpYXQiOjE1MDU5NDEwMzl9.SBU98dd7efiTcb0cZb2YNsn8CRH06YkQA41IsK2IrZU

##### Example response body
      [
      {
          "name": "last.fm",
          "_id": "59c2c7e398d3000012c9f0b1"
      },
      {
          "name": "OMDb",
          "_id": "59c2c80598d3000012c9f0b2"
      },
      {
          "name": "Fitbit",
          "_id": "59c2c80998d3000012c9f0b3"
      },
      {
          "name": "The Movie DB",
          "_id": "59c2c83598d3000012c9f0b4"
      },
      ]

_______________
##### Format Of getAllById route
      https://api-supply.herokuapp.com/api/newapi/getallbyid/:_id

##### Example route getAllById with :\_id sent as a PARAMETER
      https://api-supply.herokuapp.com/api/newapi/getallbyid/59c2c80598d3000012c9f0b2
##### Example auth headers
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyYzNjMTM2ODVkMzNiNDZmM2Y2xxxxN2U4MTYxNDAxNGNhYjRlYzEzMjQ0ZmYxMzE4ZTk0NjAzZDgyNDQxNDMiLCJpYXQiOjE1MDU5NDEwMzl9.SBU98dd7efiTcb0cZb2YNsn8CRH06YkQA41IsK2IrZU

##### Example response body
      {
      "_id": "59c2c80598d3000012c9f0b2",
      "updatedAt": "2017-09-20T19:56:53.941Z",
      "createdAt": "2017-09-20T19:56:53.941Z",
      "name": "OMDb",
      "url": "http://www.omdbapi.com/",
      "desc": "The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users. ",
      "examplesOfUse": "Random Movie Generator, Movie Tinder, Personality test based on favorite movies",
      "examplesInUse": "https://github.com/Omertron/api-omdb, https://github.com/misterhat/omdb",
      "rating": "Average",
      "tokenRequired": true,
      "tokenAccessWaitTime": "You must submit your email to recieve a key within 5 hours.",
      "maxReqMin": "Unknown",
      "numUsersFav": "0",
      "_category": "Film",
      "userId": "59c2a7653e80cc0012de07d7",
      "__v": 0
      }


_______________

##### Format of getAllByCategory route
      https://api-supply.herokuapp.com/api/newapi/getallbycategory/:_category

##### Example route getAllByCategory with :\_category as a PARAMETER
      https://api-supply.herokuapp.com/api/newapi/getallbycategory/sports
##### Example auth headers
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyYzNjMTM2ODVkMzNiNDZmM2Y2xxxxN2U4MTYxNDAxNGNhYjRlYzEzMjQ0ZmYxMzE4ZTk0NjAzZDgyNDQxNDMiLCJpYXQiOjE1MDU5NDEwMzl9.SBU98dd7efiTcb0cZb2YNsn8CRH06YkQA41IsK2IrZU

##### Example response body
      [
      {
        "_id": "59c2c80998d3000012c9f0b3",
        "updatedAt": "2017-09-20T19:56:57.611Z",
        "createdAt": "2017-09-20T19:56:57.611Z",
        "name": "Fitbit",
        "url": "https://dev.fitbit.com/",
        "desc": "As describe, \"The Fitbit Web API enables third-party applications to access and write data on behalf of users.\" Requires the use of fitbit studio.",
        "examplesOfUse": "personalized fitness apps",
        "examplesInUse": "https://github.com/pugwonk/FitbitAndroidSample",
        "rating": "mvp",
        "tokenRequired": false,
        "tokenAccessWaitTime": "Instant via OAuth",
        "maxReqMin": "150/hour w/o token || 150/hour for each user that has authorized your application for their data via token",
        "numUsersFav": "0",
        "_category": "sports",
        "userId": "59c2aaa33e80cc0012de07da",
        "__v": 0
      },
      {
        "_id": "59c2c84898d3000012c9f0b5",
        "updatedAt": "2017-09-20T19:58:00.213Z",
        "createdAt": "2017-09-20T19:58:00.213Z",
        "name": "Sportradar",
        "url": "https://developer.sportradar.us/",
        "desc": "Provides real time sports data.",
        "examplesOfUse": "Real time sports analytics",
        "examplesInUse": "sportxts",
        "rating": "Awesome",
        "tokenRequired": true,
        "tokenAccessWaitTime": "Upon application review",
        "maxReqMin": "1000 per 30days || token expires after 90 days",
        "numUsersFav": "0",
        "_category": "sports",
        "userId": "59c2aaa33e80cc0012de07da",
        "__v": 0
      },
      {
        "_id": "59c2c86e98d3000012c9f0b7",
        "updatedAt": "2017-09-20T19:58:38.117Z",
        "createdAt": "2017-09-20T19:58:38.117Z",
        "name": "ESPN",
        "url": "http://www.espn.com/apis/devcenter/",
        "desc": "Provide a variety of API data to choose from. Well worth checking out.",
        "examplesOfUse": "Real time sports analytics",
        "examplesInUse": "Sports game or sports analytics app",
        "rating": "Awesome",
        "tokenRequired": true,
        "tokenAccessWaitTime": "Upon registering",
        "maxReqMin": "It Depends on consumer tier",
        "numUsersFav": "0",
        "_category": "sports",
        "userId": "59c2aaa33e80cc0012de07da",
        "__v": 0
      },
      {
        "_id": "59c2c8a098d3000012c9f0b8",
        "updatedAt": "2017-09-20T19:59:28.390Z",
        "createdAt": "2017-09-20T19:59:28.390Z",
        "name": "Nike Plus API",
        "url": "https://developer.nike.com",
        "desc": "Developers can use the API to access the raw data of their workout. It uses RESTful calls and responses are formatted in XML.",
        "examplesOfUse": "Personal fitness app",
        "examplesInUse": "https://github.com/mnmly/nike-plus-api",
        "rating": "Awesome",
        "tokenRequired": true,
        "tokenAccessWaitTime": "You recieve one on signup",
        "maxReqMin": "unknown",
        "numUsersFav": "0",
        "_category": "sports",
        "userId": "59c2aaa33e80cc0012de07da",
        "__v": 0
      },
      {
        "_id": "59c2c8b698d3000012c9f0b9",
        "updatedAt": "2017-09-20T19:59:50.958Z",
        "createdAt": "2017-09-20T19:59:50.958Z",
        "name": "Yahoo Fantasy Sports",
        "url": "https://developer.yahoo.com/fantasysports/",
        "desc": "Sports data that, can be used to build non-commercial tools and applications that help analyze draft results, review free agents, optimize current rosters, or other apps The Yahoo Fantasy Sports API utilizes the Yahoo Query Language (YQL) as a mechanism to access Yahoo Fantasy Sports data, returning data in XML and JSON formats.",
        "examplesOfUse": "sports data analytics",
        "examplesInUse": "https://github.com/philip/YahooFantasySportsAPI",
        "rating": "Awesome",
        "tokenRequired": true,
        "tokenAccessWaitTime": "upon application review",
        "maxReqMin": "3333",
        "numUsersFav": "0",
        "_category": "sports",
        "userId": "59c2aaa33e80cc0012de07da",
        "__v": 0
      }
      ]
_______________
### PUT
##### The SuperUser only can make PUT requests to store API objects into the Mlabs Database.  


##### Format of PUT route
      https://api-supply.herokuapp.com/api/newapi/:_id
      NOTE: The _id refers to the _id in the api object and NOT the userId.
##### Example route with :\_id as a PARAMETER
      https://api-supply.herokuapp.com/api/newapi/59c2c8b698d3000012c9f0b9
##### Example auth headers
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyYzNjMTM2ODVkMzNiNDZmM2Y2xxxxN2U4MTYxNDAxNGNhYjRlYzEzMjQ0ZmYxMzE4ZTk0NjAzZDgyNDQxNDMiLCJpYXQiOjE1MDU5NDEwMzl9.SBU98dd7efiTcb0cZb2YNsn8CRH06YkQA41IsK2IrZU

##### Example request body
      {
        "name": "Different Title",
        "url": "https://unsplash.com/developers",
        "desc": "Build powerful photo apps with free high definition images from Unsplash",
        "examplesOfUse": "Random background image change, Memory game with random images",
        "examplesInUse": "https://crew.co/blog/unsplash-api/, https://www.programmableweb.com/api/unsplash",
        "rating": "Average",
        "tokenRequired": "True",
        "tokenAccessWaitTime": "Initially, your application will be in development mode and will be rate-limited to 50 requests per hour. When ready for production, upload screenshots of your application (focusing on the proper attribution and use of Unsplash photos in your app), then click the “Request Approval” button. If approved, your rate limit will be increased to the full amount.",
        "maxReqMin": "50 requests per hour",
        "numUsersFav": "0",
        "_category": "photo"
      }


##### Example response Body
      {
          "__v": 0,
          "updatedAt": "2017-09-20T19:58:08.343Z",
          "createdAt": "2017-09-20T19:58:08.343Z",
          "name": "Different Title",
          "url": "https://unsplash.com/developers",
          "desc": "Build powerful photo apps with free high definition images from Unsplash",
          "examplesOfUse": "Random background image change, Memory game with random images",
          "examplesInUse": "https://crew.co/blog/unsplash-api/, https://www.programmableweb.com/api/unsplash",
          "rating": "Average",
          "tokenRequired": true,
          "tokenAccessWaitTime": "Initially, your application will be in development mode and will be rate-limited to 50 requests per hour. When ready for production, upload screenshots of your application (focusing on the proper attribution and use of Unsplash photos in your app), then click the “Request Approval” button. If approved, your rate limit will be increased to the full amount.",
          "maxReqMin": "50 requests per hour",
          "numUsersFav": "0",
          "_category": "photo",
          "userId": "59c2a7653e80cc0012de07d7",
          "_id": "59c2c85098d3000012c9f0b6"
      }
_______________
### DELETE
##### The SuperUser only can make DELETE requests to remove API objects into the Mlabs Database.  


##### Format of DELETE route
      https://api-supply.herokuapp.com/api/newapi/:_id
      NOTE: The _id refers to the _id in the api object and NOT the userId.
##### Example route with :\_id as a PARAMETER
      https://api-supply.herokuapp.com/api/newapi/59c2c8b698d3000012c9f0b9
##### Example auth headers
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyYzNjMTM2ODVkMzNiNDZmM2Y2xxxxN2U4MTYxNDAxNGNhYjRlYzEzMjQ0ZmYxMzE4ZTk0NjAzZDgyNDQxNDMiLCJpYXQiOjE1MDU5NDEwMzl9.SBU98dd7efiTcb0cZb2YNsn8CRH06YkQA41IsK2IrZU

```NOTE: Upon successful request expect a 204```
_______________


#### Resources
* [TheseHillsHaveAPIs](https://github.com/kdwinck/TheHillsHaveAPIs/blob/master/README.md)
* [Shooters](https://github.com/gsmatth/shooters-log/blob/staging/README.md)
* [Programmable Web](https://www.programmableweb.com/category/accounting/apis?category=19967)
* [Postman](https://www.getpostman.com)
