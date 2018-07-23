import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import './bootstrap.css';

const CheckJoin = ({location, match}) => {


    return (
      <div className="container">
      // <br /><h1>LogIn</h1><br />
      // <p>
      //   <font color="#888" size={2}>ID: </font>
      //   <input type="form-control" name="txt_ID" size={16} />
      // </p>
      // <p>
      //   <font color="#888" size={2}>PW: </font>
      //   <input name="passwd" type="password" className="marg" size={15} />
      // </p>
      // <p>
      //   <input className="btn btn-primary" type="submit" name="button" defaultValue="로그인" />
      //   <NavLink to="/join" className="btn btn-primary">회원가입</NavLink>
      // </p>
      <p>회원가입을 성공했습니다 메인페이지로 돌아가주시길 바랍니다</p>
      <p>회원가입에 실패했습니다 다시 시도해주시길 바랍니다</p>
    </div>
    );
};

export default CheckJoin;
