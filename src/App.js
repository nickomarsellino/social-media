import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

//load another component
import Navbar from "./Component/Navigation__bar/Navigation__bar";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar/>
            </div>
        );
    }
}

export default App;
