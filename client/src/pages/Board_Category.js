import React from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
// import queryString from 'query-string';
import './bootstrap.css';

class Board_Category extends React.Component{
  state={
    redirect: false,
    posts:[],
  }

  componentDidMount() {
    fetch('/board')
      .then((response)=> response.json())
      .then((responseData)=>{
        var resdata = responseData.result;
        if(resdata === "Success"){
          var data = responseData.data;
          //alert(data[0].date);
          this.setState({posts:data});
        }
      });
  }

  redirectTopost(){
    var user_id = sessionStorage.getItem('user_id');

    if(!user_id) alert("로그인 한 후 이용할 수 있습니다")
    else this.setState({redirect:true});
  }

    render(){
      console.log(this.state.posts.length);
      const {redirect} = this.state;
      if(redirect) return <Redirect push to="/post_input"/>;

      return (
        <div className="container">
        <br /><br /><h1>BOARD</h1><br />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th width={20} style={{textAlign: 'center'}}>DATE</th>
              <th width={400} style={{textAlign: 'center'}}>제목</th>
              <th width={70} style={{textAlign: 'center'}}>작성자</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post =>
              <tr><td style={{textAlign: 'center'}}>{post.date}</td>
                <td><NavLink to={"/post/" + post.id}>{post.title}</NavLink></td>
                <td style={{textAlign: 'center'}}>{post.author}</td>
              </tr>
            )}
          </tbody>
        </table>
        <p align="right"><button type="button" className="btn btn-primary btn-sm" onClick={this.redirectTopost.bind(this)}>글쓰기</button></p>
        </div>
      );
    }
}

export default Board_Category;
