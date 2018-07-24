import React from 'react';
import { Redirect } from 'react-router';
import './bootstrap.css';

class Modifyinfo extends React.Component{
  state={
    checked: false,
    redirect: false
  }

  constructor(props){
    super(props);
    this.state = {
        id:sessionStorage.getItem('user_id'),
        password:'',
        passwordcheck:'',
        name:sessionStorage.getItem('name'),
        number:sessionStorage.getItem('number'),
        address:sessionStorage.getItem('address')
    };
  }

    handleIdChange(e){
        this.setState({id:e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }
    handlePasswordcheckChange(e){
        this.setState({passwordcheck:e.target.value})
    }
    handleNameChange(e){
        this.setState({name:e.target.value})
    }
    handleNumberChange(e){
        this.setState({number:e.target.value})
    }
    handleAddressChange(e){
        this.setState({address:e.target.value})
    }

    modify(){
      if(this.state.password === ''){
        alert("비밀번호를 입력해주시길 바랍니다");
        return;
      }else if(this.state.password !== this.state.passwordcheck){
        alert("비밀번호 확인이 틀렸습니다");
        return;
      }else if(this.state.number === ''){
        alert("번호를 입력해주시길 바랍니다");
        return;
      }else if(this.state.address === ''){
        alert("주소를 입력해주시길 바랍니다");
        return;
      }
        let userInfo={
    			'id':this.state.id,
    			'password':this.state.password,
          'name':this.state.name,
          'number':this.state.number,
          'address':this.state.address
    		};
        fetch('/join/modify',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userInfo)
        }).then((response)=> response.json())
        .then((responseData)=>{
          console.log(responseData);
          var resdata = responseData.result;
          if(resdata === "Success"){
            alert("회원정보 수정에 성공했습니다");
            this.setState({redirect:true});
          }else{
            alert("서버에 문제가 있습니다");
          }
        });
    }

  render(){
    if(this.state.redirect){
      return(<Redirect to="/"/>)
    }
    return(
      <div className="container">
          <br /><br /><h1>Edit my info</h1><br />
          <table className="table table-striped table-bordered" width={440} border={1}>
            <tbody>
              <tr><td width={92}>ID</td>
                <td width={300}><input type="text" onChange={this.handleIdChange.bind(this)} id="txt_ID" name="txt_ID" defaultValue={this.state.id}/></td></tr>
              <tr><td>PASSWORD</td>
                <td><input type="password" onChange={this.handlePasswordChange.bind(this)} id="passwd" name="passwd" /></td></tr>
              <tr><td>PASSWORD 확인</td>
                <td><input type="password" onChange={this.handlePasswordcheckChange.bind(this)} id="c_passwd" name="c_passwd" /></td></tr>
              <tr><td>이름</td>
                <td><input type="text" onChange={this.handleNameChange.bind(this)} id="txt_name" name="txt_name" defaultValue={this.state.name}/></td></tr>
              <tr><td>전화번호</td>
                <td><input type="text" onChange={this.handleNumberChange.bind(this)} id="txt_phone" name="txt_phone" defaultValue={this.state.number}/></td></tr>
              <tr><td>주소</td>
                <td><textarea id="txt_add" onChange={this.handleAddressChange.bind(this)} name="txt_add" cols={40} defaultValue={this.state.address} /></td></tr>
            </tbody></table>
          <p align="center"><button className="btn btn-primary" onClick={this.modify.bind(this)}>수정하기</button></p>
      </div>
    )
  }
}

export default Modifyinfo;
