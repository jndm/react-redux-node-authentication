# Authentication with React, Redux and NodeJS

This project was created to test out and learn how to create authentication from scratch in React with help of Redux. Idea of this project is that there is a route '/feature' in which users cannot go unless they are logged in. Frontend communicates with NodeJS backend that was also created from scratch for this project.

Example of used techniques 
  * Frontend
    * React
    * Redux
    * HOC
    * axios
    * redux-form v7
    * react-router v4
    * Local storage

  * Backend
    * NodeJS v8
    * JWT
    * passport.js
    * bcrypt
    * MongoBD
    * mongoose

Backend uses MongoDB as a database to save users. Login tokens are not saved into database so there is a little flaw in authentication but otherwise it should be pretty much production ready.

This project was created as a part of "Advanced React and Redux" by Stephen Grider but modified to make use of currently newest versions of npm packages eg. react-router v4, redux-form v6 and Node 8 (eg. async/await).