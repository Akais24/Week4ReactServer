import React from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';

class Post_input extends React.Component{
  state={
    redirect: false,
  }

  constructor(props){
      super(props);
      this.handleFileChosen = this.handleFileChosen.bind(this);
      this.state = {
        title:'',
        content:'',
        category:'',
        user_id : sessionStorage.getItem('user_id'),
        picture : '',
        picture_name : '',
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

    handleFileChosen = (file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      const scope = this;
      reader.onload = function () {
          scope.setState({picture : reader.result})
          scope.setState({picture_name : file.name})
      };
      reader.onerror = function (error) {
          console.log('Error: ', error);
      };
    }

    postArticle(){
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
          'content':this.state.content,
          'category':this.state.category,
          'date':today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
      		'author': this.state.user_id,
          'picture': this.state.picture,
          'picture_name': this.state.picture_name,
    		};
        console.log("post_input before fetch");
        console.log(this.state.picture);
        fetch('/post_input',{
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
            alert("게시물이 성공적으로 저장되었습니다");
            this.setState({redirect:true});
          }else{
            alert(responseData.result);
          }
        });
    }


    render(){
      const {redirect} = this.state;
      if(redirect) return <Redirect to="/board/all"/>;

      return (
        <div className="container fullwidth">
        <br /><br /><h1>write Post</h1><br />
          <table className="table table-striped table-bordered" width={440} border={1}>
            <tbody>
              <tr><td width={50} style={{textAlign: 'center'}}>카테고리</td>
                <td width={300}><select className='form-control' onChange={this.handleCategoryChange.bind(this)}>
                  <option>없음</option>
                  <option value="0">공지사항</option>
                  <option value="1">스크럼</option>
                  <option value="2">프로젝트</option>
                  <option value="3">세미나</option>
                  <option value="4">추억</option>
                </select></td></tr>
              <tr><td width={50} style={{textAlign: 'center'}}>제목</td>
                <td width={300}><input type="text" style={{width:"100%"}} placeholder="제목을 입력해주세요." onChange={this.handleTitleChange.bind(this)} /></td></tr>
              <tr><td width={50} style={{textAlign: 'center'}}>사진</td>
                  <td><img src={this.state.picture} alt="" width="100%" />
                  <input type="hidden" name="MAX_FILE_SIZE" value="134217728"/>
                    <input type="file" name="p_image" onChange={e => this.handleFileChosen(e.target.files[0])} /></td></tr>
              <tr><td width={50} style={{textAlign: 'center'}}>내용</td>
                <td width={300}><textarea placeholder="내용을 입력해주세요." style={{width:"100%"}} onChange={this.handleContentChange.bind(this)} rows={10}/></td></tr>
            </tbody>
            </table>
            <br /><p align="center"><button type="button" className="btn btn-primary" onClick={this.postArticle.bind(this)}>저장</button>
            <NavLink to="/board/all"><button type="button" className="btn btn-danger">취소</button></NavLink></p>
        </div>
      );
    }
}

export default Post_input;
