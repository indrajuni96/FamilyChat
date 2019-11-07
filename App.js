import React, { Component } from 'react';
import MainNavigation from './src/Navigation';
import * as firebase from "firebase"
import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    STORAGE_BUCKET
} from 'react-native-dotenv'

const config = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    storageBucket: STORAGE_BUCKET
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

class App extends Component {
    render() {
        return <MainNavigation />;
    }
}

export default App;