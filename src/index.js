import "@babel/polyfill";
import bodyParser from 'body-parser';
import express from 'express';
import firebase from "firebase";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDhHOVv0cuU7TvydMsoRvvOtv9tDTaS1zk",
    authDomain: "lavision.firebaseapp.com",
    databaseURL: "https://lavision.firebaseio.com",
    projectId: "lavision",
    storageBucket: "lavision.appspot.com",
    messagingSenderId: "271188764440"
  };

firebase.initializeApp(config);

import * as Routes from './routes';
const app = express();

// Setup parsing for handlers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Initialize all the routes dynamically
Object.keys(Routes).forEach(key => {
  const { path, router } = Routes[key];
  app.use(path, router);
});

app.listen(3000)
// app.listen(process.env.PORT);