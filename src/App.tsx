import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Klassen from "./components/Klassen/Klassen";
import Jumbotron from 'react-bootstrap/Jumbotron';
import NavBar from "./components/Layout/NavBar";
import Schulen from "./components/Schulen/Schulen";


function App() {
    return (
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
    );
}

export default App;
