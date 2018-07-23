import React from 'react';
import { Redirect } from 'react-router';
// import queryString from 'query-string';
import './bootstrap.css';

class Logout extends React.Component{
    render(){
      sessionStorage.removeItem('login_state');
      sessionStorage.removeItem('user_id');
      alert("로그아웃하셨습니다");
      return <Redirect to="/"/>;
    }
}
export default Logout;
