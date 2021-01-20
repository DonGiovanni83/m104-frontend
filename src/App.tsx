import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Klassen from "./components/Klassen/Klassen";
import Jumbotron from 'react-bootstrap/Jumbotron';
import NavBar from "./components/Layout/NavBar";
import Schulen from "./components/Schulen/Schulen";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const apiUrl = process.env.REACT_APP_BACKEND_API_URL!.concat(`/graphql`);

const client = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <div className="App-header App-NavBar">
                    <NavBar/>
                </div>
                <Jumbotron className="App-body">
                    <BrowserRouter>
                        <Switch>
                            <Route path="/klassen">
                                <Klassen/>
                            </Route>
                            <Route path="/schulen">
                                <Schulen/>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </Jumbotron>
            </div>
        </ApolloProvider>
    );
}

export default App;

// enable cors
var corsOptions = {
    origin: '<insert uri of front-end domain>',
    credentials: true // <-- REQUIRED backend setting
};
