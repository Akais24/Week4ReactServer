import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Login, Logout, Join, Board, Post, Post_input, Post_modify, Intro, Mypage, Modifyinfo, Passfail } from 'pages';
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
                <Switch>
                    <Route path="/board/:category" component={Board}/>
                    <Route exact path="/board" component={Board}/>
                </Switch>
                <Switch>
                    <Route path="/post/:id/modify" component={Post_modify}/>
                    <Route path="/post/:id" component={Post}/>
                </Switch>
                <Route path="/post_input" component={Post_input}/>
                <Route path="/intro" component={Intro}/>
                <Route path="/mypage" component={Mypage}/>
                <Route path="/modifyinfo" component={Modifyinfo}/>
                <Route path="/passfail" component={Passfail}/>
            </div>
        );
    }
}

export default App;
