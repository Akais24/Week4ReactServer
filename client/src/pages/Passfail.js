import React from 'react';
import './bootstrap.css';

class Passfail extends React.Component{
  state={
    pass : false
  }

  componentDidMount() {
    fetch('/passfail/' + sessionStorage.getItem('user_id'))
      .then((response)=> response.json())
      .then((responseData)=>{
        console.log(responseData);
        var resdata = responseData.result;
        if(resdata === "Success"){
          this.setState({pass:true})
        }
      });
  }

    render(){
      if(!this.state.pass){
        return(
          <div className="container fullwidth" style={{textAlign: 'center'}}>
            <br /><br /><h3> 2018년 KAIST MAD Camp에 관심을 갖고 지원해주셔서 진심으로 감사 드립니다. </h3><br /><br />
            <p>안녕하세요. MAD Camp입니다.</p>
            <p>귀하의 뛰어난 역량과 잠재력에도 불구하고 안타깝게도 서류 심사 과정에서 귀하의 합격 소식을 전해드리지 못하게 되었습니다.</p>
            <p>비록 이번에는 좋은 만남을 이어갈 수 없게 되었지만, 이후 더욱 성장한 모습으로 다시금 만날 수 있기를 진심으로 바랍니다.</p><br />
            <p>감사합니다.</p>
          </div>
        )
      }else{
        return(
          <div className="container fullwidth" style={{textAlign: 'center'}}>
            <br /><br /><h3> 2018년 KAIST MAD Camp와 함께 하시게 된 것을 축하드립니다 </h3><br /><br />
            <p>안녕하세요. MAD Camp입니다.</p>
            <p>축하드립니다. 귀하는 최종 합격하셨습니다.</p>
            <p>수강신청 등 자세한 사항은 개별 이메일을 확인하여 주시길 바랍니다.</p><br />
            <p>감사합니다.</p>
          </div>
        )
      }
    }
}

export default Passfail;
