# Music Bracket

This project is a web app can construct a tournament bracket of tracks from the spotify api.

This project is not meant to be a functional product, it is meant more as a playground where I can test out various libraries and patterns.

A deployed version of this application can be found at [https://music-bracket.herokuapp.com/](https://music-bracket.herokuapp.com/)

## Project Structure

The project is split into two main parts: The server and the client. The server is located in the root directory and client within the client directory.

### Client

The client is an app bootstrapped with Create React App.

More information on how to use it can be found in the README file located in `client`

### Server

The server consists of an express app running on Node. Run `yarn start` to start the app.

#### Database

When running locally a sql database is expected to be running. This app uses sequelize as an ORM.

More info on how to create and seed the database can be found on the [sequelize documentation page](https://sequelize.org/v5/manual/migrations.html)
