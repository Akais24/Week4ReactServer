import React from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import './bootstrap.css';

class Mypage extends React.Component{
  state={
    checked: false
  }

  constructor(props){
    super(props);
    this.state = {
      id: sessionStorage.getItem('user_id'),
      password:''
    };
  }

  handlePasswordChange(e){
      this.setState({password:e.target.value})
  }

  checkpass(){
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
          var userdata = responseData.data;
          sessionStorage.setItem('login_state', true);
          sessionStorage.setItem('user_id', this.state.id);
          sessionStorage.setItem('name', userdata.name);
          sessionStorage.setItem('number', userdata.number);
          sessionStorage.setItem('address', userdata.address);
          this.setState({checked:true});
        }else{
          alert("비밀번호가 틀렸습니다");
        }
      });
  }

  render(){
    if(this.state.id === null){
      alert("로그인 후 이용하실 수 있습니다");
      return(<Redirect to="/"/>);
    }

    if(!this.state.checked){
      return(
        <div className="container" style={{textAlign: 'center'}}>
          <br /><br /><h5>비밀번호를 입력해주세요.</h5><br />
          <font color="#888" size={2}>Passwd: </font>
          <input name="passwd" type="password" className="marg" size={15} onChange={this.handlePasswordChange.bind(this)}  />
          <input className="btn btn-primary btn-sm" type="submit" name="button2" defaultValue="확인" onClick={this.checkpass.bind(this)} />
        </div>
      )
    }else{
      return(
        <div className="container">
          <br /><br /><h1>My Page</h1><br />
          <table className="table table-striped table-bordered">
            <tbody><tr><td width={92}><NavLink to="/modifyinfo">회원 정보 수정</NavLink></td></tr>
            <tr><td width={92}><NavLink to={"/passfail/" + this.state.id}>합격 여부 확인</NavLink></td></tr>
              <tr><td width={92}>회원 탈퇴</td></tr>
            </tbody></table>
        </div>
      )
    }
  }
}

export default Mypage;
