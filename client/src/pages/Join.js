import React, { Component } from 'react';
import './bootstrap.css';

class Join extends Component {
  render() {
    return (
        <div className="container">
            <br /><br /><h1>Join</h1><br />
            <table className="table table-striped table-bordered" width={440} border={1}>
              <tbody><tr><td width={92} scope="row">ID</td>
                  <td width={300}><input type="text" id="txt_ID" name="txt_ID" /></td></tr>
                <tr><td scope="row">PASSWORD</td>
                  <td><input type="password" id="passwd" name="passwd" /></td></tr>
                <tr><td scope="row">PASSWORD 확인</td>
                  <td><input type="password" id="c_passwd" name="c_passwd" /></td></tr>
                <tr><td scope="row">이름</td>
                  <td><input type="text" id="txt_name" name="txt_name" /></td></tr>
                <tr><td scope="row">전화번호</td>
                  <td><input type="text" id="txt_phone" name="txt_phone" /></td></tr>
                <tr><td scope="row">주소</td>
                  <td><textarea id="txt_add" name="txt_add" cols={40} defaultValue={""} /></td></tr>
              </tbody></table>
            <p align="center"><button className="btn btn-primary" onclick="javascript:return validate();">가입하기</button></p>
        </div>
    );
  }
}

export default Join;
