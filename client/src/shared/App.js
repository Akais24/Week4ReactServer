import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Login, Logout, Join } from 'pages';
import Menu from 'components/Menu';

class App extends Component {
    render() {
      console.log("App.js render");
        return (
            <div>
                <Menu/>
                <Route exact path="/" component={Home}/>
                <Switch>
                    <Route path="/about/:name" component={About}/>
                    <Route path="/about" component={About}/>
                </Switch>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/join" component={Join}/>
            </div>
        );
    }
}

export default App;
