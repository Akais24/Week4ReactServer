import React from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
// import queryString from 'query-string';
import './bootstrap.css';

class Login extends React.Component{
  state={
    redirect: false
  }

  constructor(props){
    super(props);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.signIn = this.signIn.bind(this);
    this.state = {
      email:'',
      password:''
    };
  }

    handleIdChange(e){
        this.setState({id:e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }

    signIn(){
        // alert('Email address is ' + this.state.id + ' Password is ' + this.state.password);
        let userInfo={
    			'id':this.state.id,
    			'password':this.state.password
    		};
        fetch('/login',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userInfo)
        }).then((response)=> response.json())
        .then((responseData)=>{
          //alert(responseData.result);
          var resdata = responseData.result;
          if(resdata === "Success"){
            let loginData = {
              isLoggedIn: true,
              username: this.state.id};
              document.cookie = 'key=' + btoa(JSON.stringify(loginData));
              alert('Welcome, ' + this.state.id + '!', 2000);
              sessionStorage.setItem('login_state', true);
              sessionStorage.setItem('user_id', this.state.id);
              this.setState({redirect:true});
          }else{
            alert(responseData.result);
          }
        });
    }

    render(){
      const {redirect} = this.state;

      if(redirect) return <Redirect push to="/"/>;

      return (
        <div className="container">
        <br /><h1>LogIn</h1><br />
        <p>
          <font color="#888" size={2}>ID: </font>
          <input type="form-control" onChange={this.handleIdChange} name="txt_ID" size={16} />
        </p>
        <p>
          <font color="#888" size={2}>PW: </font>
          <input name="passwd" onChange={this.handlePasswordChange} type="password" className="marg" size={15} />
        </p>
        <p>
          <input className="btn btn-primary" onClick={this.signIn} type="submit" name="button" defaultValue="로그인" />
          <NavLink to="/join" className="btn btn-primary">회원가입</NavLink>
        </p>
      </div>
      );
    }
}
//
// const Login = ({location, match}) => {
//   constructor(props){
//     super(props);
//     this.handleEmailChange = this.handleEmailChange.bind(this);
//     this.handlePasswordChange = this.handlePasswordChange.bind(this);
//     this.state = {
//       email:'',
//       password:''
//     };
//   }
//
//     handleIdChange(e){
//         this.setState({id:e.target.value})
//     }
//     handlePasswordChange(e){
//         this.setState({password:e.target.value})
//     }
//
//     signIn(){
//         alert('Email address is ' + this.state.email + ' Password is ' + this.state.password);
//     }
//
//     return (
//       <div className="container">
//       <br /><h1>LogIn</h1><br />
//       <p>
//         <font color="#888" size={2}>ID: </font>
//         <input type="form-control" onChange={this.handleIdChange} name="txt_ID" size={16} />
//       </p>
//       <p>
//         <font color="#888" size={2}>PW: </font>
//         <input name="passwd" onChange={this.handlePasswordChange} type="password" className="marg" size={15} />
//       </p>
//       <p>
//         <input className="btn btn-primary" onClick={this.signIn} type="submit" name="button" defaultValue="로그인" />
//         <NavLink to="/join" className="btn btn-primary">회원가입</NavLink>
//       </p>
//     </div>
//     );
// };

export default Login;
