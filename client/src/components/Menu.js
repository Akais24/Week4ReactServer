import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './bootstrap.css';

class Menu extends Component {
  constructor(){
    super();
    this.state = {
      show: "navbar-collapse collapse",
      board1: "nav-item dropdown",
      board2: "false",
      board3: "dropdown-menu"
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
  }

  handleClick(){
      var css = (this.state.show === "navbar-collapse collapse") ? "navbar-collapse collapse show" : "navbar-collapse collapse";
      this.setState({show: css});
  }

  handleClick2(){
    var css1 = (this.state.board1 === "nav-item dropdown") ? "nav-item dropdown show" : "nav-item dropdown";
    var css2 = (this.state.board2 === "false") ? "true" : "false";
    var css3 = (this.state.board3 === "dropdown-menu") ? "dropdown-menu show" : "dropdown-menu";
    this.setState({board1: css1, board2: css2, board3: css3});
  }

  closedropdow(){
    this.setState({board1: "nav-item dropdown", board2: "false", board3: "dropdown-menu"});
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <NavLink to="/" className="navbar-brand">MAD Camp</NavLink>
          <button onClick={() => this.handleClick()} className="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" style={{}}>
            <span className="navbar-toggler-icon" />
          </button>
          <div id="butt" className= {this.state.show} style={{}}>
            <ul className="navbar-nav mr-auto">

              <li className="nav-item"><NavLink to="/intro" className="nav-link" onClick={this.closedropdow.bind(this)}>소개</NavLink></li>
              <li className="nav-item"><NavLink to="/mypage" className="nav-link" onClick={this.closedropdow.bind(this)}>마이페이지</NavLink></li>

              <li className={this.state.board1}>
                <a className="nav-link dropdown-toggle" onClick={() => this.handleClick2()} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded={this.state.board2}>게시판</a>
                <div className={this.state.board3} x-placement="bottom-start" style={{position: 'absolute', willChange: 'transform', top: 0, left: 0, transform: 'translate3d(0px, 37px, 0px)'}}>
                  <h6 className="dropdown-item"><NavLink to="/board/all" onClick={this.closedropdow.bind(this)}>전체 글 보기</NavLink></h6>
                  <h6 className="dropdown-item"><NavLink to="/board/0" onClick={this.closedropdow.bind(this)}>공지사항</NavLink></h6>
                  <h6 className="dropdown-item"><NavLink to="/board/1" onClick={this.closedropdow.bind(this)}>스크럼</NavLink></h6>
                  <h6 className="dropdown-item"><NavLink to="/board/2" onClick={this.closedropdow.bind(this)}>프로젝트</NavLink></h6>
                  <h6 className="dropdown-item"><NavLink to="/board/3" onClick={this.closedropdow.bind(this)}>세미나</NavLink></h6>
                  <h6 className="dropdown-item"><NavLink to="/board/4" onClick={this.closedropdow.bind(this)}>추억</NavLink></h6>
                </div>
              </li>

              <li className="nav-item"><NavLink to="/photos" className="nav-link" onClick={this.closedropdow.bind(this)}>사진첩</NavLink></li>
              <li className="nav-item"><NavLink to="/" className="nav-link" onClick={this.closedropdow.bind(this)}>신청</NavLink></li>
              {(!sessionStorage.getItem('login_state')) && <li className="nav-item"><NavLink to="/login" className="nav-link" onClick={this.closedropdow.bind(this)}>로그인</NavLink></li>}
              {sessionStorage.getItem('login_state') && <li className="nav-item"><NavLink to="/logout" className="nav-link" onClick={this.closedropdow.bind(this)}>로그아웃</NavLink></li>}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Menu;
