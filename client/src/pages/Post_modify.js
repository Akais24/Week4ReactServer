import React from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
// import queryString from 'query-string';
import img from './mainimg.jpg';

class Post_modify extends React.Component{
  state={
    redirect: false,
  }

  constructor(props){
      super(props);
      this.state = {
        title:'',
        content:'',
        category:'',
        user_id : sessionStorage.getItem('user_id'),
        post_id : props.match.params.id,
        post:'',
        img:''
      };
    }

    handleTitleChange(e){
        this.setState({title:e.target.value})
    }
    handleContentChange(e){
        this.setState({content:e.target.value})
    }
    handleCategoryChange(e){
        this.setState({category:e.target.value})
    }

    componentDidMount() {
      fetch('/post/' + this.state.post_id)
        .then((response)=> response.json())
        .then((responseData)=>{
          var resdata = responseData.result;
          if(resdata === "Success"){
            var data = responseData.data;
            //alert(data[0].date);
            this.setState({post:data});
          }
        });
    }

    modifypost(){
      if(this.state.title === ''){
        alert("제목을 입력해주시길 바랍니다");
        return;
      }else if(this.state.category === ''){
        alert("카테고리를 선택해주시길 바랍니다");
        return;
      }else if(this.state.content === ''){
        alert("내용을 입력해주시길 틀렸습니다");
        return;
      }
      var today = new Date();
        let postInfo={
    			'title':this.state.title,
          'category':this.state.category,
          'content':this.state.content,
          'date':today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
      		'author': this.state.user_id,
          'picture':null
    		};
        fetch('/post/' + this.state.post_id,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postInfo)
        }).then((response)=> response.json())
        .then((responseData)=>{
          //alert(responseData.result);
          var resdata = responseData.result;
          if(resdata === "Success"){
            alert("게시물이 성공적으로 수정되었습니다");
            this.setState({redirect:true});
          }else{
            alert("게시물 수정에 실패하였습니다");
          }
        });
    }

    render(){
      console.log(this.state.post_id);
      if(!this.state.user_id){
        alert("작성자만 편집할 수 있습니다")
        return <Redirect push to="/board/all"/>;
      }

      const {redirect} = this.state;
      if(redirect) return <Redirect push to={"/post/" + this.state.post_id}/>;

      return (
        <div className="container fullwidth">
        <br /><br /><h1>Edit Post</h1><br />
          <table className="table table-striped table-bordered" width={440} border={1}>
            <tbody>
            <tr><td width={50} style={{textAlign: 'center'}}>카테고리</td>
              <td width={300}><select class='form-control' onChagne={this.handleCategoryChange.bind(this)}>
                <option>없음</option>
                <option value="0">공지사항</option>
                <option value="1">스크럼</option>
                <option value="2">프로젝트</option>
                <option value="3">세미나</option>
                <option value="4">추억</option>
              </select></td></tr>
              <tr><td width={50} style={{textAlign: 'center'}}>제목</td>
                <td width={300}><input type="text" defaultValue={this.state.post.title} onChange={this.handleTitleChange.bind(this)} /></td></tr>
              <tr><td width={50} style={{textAlign: 'center'}}>사진</td>
                  <td><img src={this.state.img} alt="" width="100%" />
                  <input type="hidden" name="MAX_FILE_SIZE" value="134217728"/>
                    <input type="file" name="p_image" /></td></tr>
              <tr><td width={50} style={{textAlign: 'center'}}>내용</td>
                <td width={300}><input type="text" defaultValue={this.state.post.content} onChange={this.handleContentChange.bind(this)} rows={10}/></td></tr>
            </tbody>
            </table>

            <br /><p align="center"><button type="button" className="btn btn-primary" onClick={this.modifypost.bind(this)}>저장</button>
            <NavLink to="/board/all"><button type="button" className="btn btn-danger">취소</button></NavLink></p>
        </div>
      );
    }
}

export default Post_modify;
