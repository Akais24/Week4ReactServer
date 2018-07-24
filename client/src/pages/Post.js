import React from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import './bootstrap.css';
import img from './mainimg.jpg';

class Post extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        instructors: [],
        user_id : sessionStorage.getItem('user_id'),
        post_id : props.match.params.id,
        post : '',
        category: '',
        picture: '',
        redirect: false
    };
  }

  componentDidMount() {
    fetch('/post/' + this.state.post_id)
      .then((response)=> response.json())
      .then((responseData)=>{
        var resdata = responseData.result;
        if(resdata === "Success"){
          var data = responseData.data;
          switch (data.category) {
            case "0":
              this.setState({category:'공지사항'});
              break;
            case "1":
              this.setState({category:'스크럼'});
              break;
            case "2":
              this.setState({category:'프로젝트'});
              break;
            case "3":
              this.setState({category:'세미나'});
              break;
            case "4":
              this.setState({category:'추억'});
              break;
            default:
              break;
          }
          this.setState({post:data});
          if(data.picture_name !== ''){
            var pic = responseData.picture;
            this.setState({picture:pic});
          }
        }
      });
  }



  deletepost(){
    fetch('/post/' + this.state.post_id, {method: 'DELETE'})
      .then((response)=> response.json())
      .then((responseData)=>{
        var resdata = responseData.result;
        if(resdata === "Success"){
          alert("성공적으로 삭제했습니다");
          this.setState({redirect:true});
        }else{
          alert("삭제에 실패했습니다");
        }
      });
  }

    render(){
      const {redirect} = this.state;
      if(redirect) return <Redirect to="/board"/>;
      var change = '';
      if(this.state.user_id === this.state.post.author){
        change = <p align="center"><NavLink to={"/post/" + this.state.post_id + "/modify"}><button type="button" className="btn btn-primary">수정</button></NavLink>
          <button type="button" className="btn btn-danger" onClick= {() => { if (window.confirm('정말 삭제하시겠습니까')) this.deletepost() } }>삭제</button></p>
      }
      return (
        <div className="container fullwidth">
          <h1>Post</h1>
          <table className="table table-striped table-bordered" width={440} border={1}>
            <tbody>
              <tr><td width = {50} style={{textAlign: 'center'}}>카테고리</td>
                <td width={300}>{this.state.category}</td></tr>
              <tr><td width={50} style={{textAlign: 'center'}}>제목</td>
                <td width={300}>{this.state.post.title}</td></tr>
              <tr><td width={50} style={{textAlign: 'center'}}>작성자</td>
                <td width={300}>{this.state.post.author}</td></tr>
              <tr><td width={50} style={{textAlign: 'center'}}>작성 날짜</td>
                <td width={300}>{this.state.post.date}</td></tr>
              <tr><td width={50} style={{textAlign: 'center'}}>사진</td>
                <td width={300}><img src={this.state.picture} alt="" width="100%" /></td></tr>
              <tr><td width={50} style={{textAlign: 'center'}}>내용</td>
                <td width={300}>{this.state.post.content}</td></tr>
            </tbody>
          </table>
          {change}
          <p align="right"><NavLink to="/board/all"><button type="button" className="btn btn-primary btn-sm">목록</button></NavLink></p>
        </div>
      );
    }
}

export default Post;
