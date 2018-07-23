import React from 'react';
import { NavLink } from 'react-router-dom';
import './bootstrap.css';


const Menu = () => {
  var isLogin = false;
  if(sessionStorage.getItem('login_state')) isLogin = true;

    return (
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
        <link rel="stylesheet" href="bootstrap.css" />
        <title>MAD Camp</title>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand">MAD Camp</a>
          <button /*onClick="javascript:extendMenu()"*/ className="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" style={{}}>
            <span className="navbar-toggler-icon" />
          </button>
          <div id="butt" className="navbar-collapse collapse" style={{}}>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><NavLink to="/"><a className="nav-link">소개</a></NavLink></li>
              <li className="nav-item"><NavLink to="/"><a className="nav-link">게시판</a></NavLink></li>
              <li className="nav-item"><NavLink to="/"><a className="nav-link">사진첩</a></NavLink></li>
              <li className="nav-item"><NavLink to="/"><a className="nav-link">신청</a></NavLink></li>
              {(!isLogin) && <li className="nav-item"><NavLink to="/login" className="nav-link">로그인</NavLink></li>}
              {isLogin && <li className="nav-item"><NavLink to="/logout" className="nav-link">로그아웃</NavLink></li>}
            </ul>
          </div>
        </nav>
      </div>
    );
};

export default Menu;
