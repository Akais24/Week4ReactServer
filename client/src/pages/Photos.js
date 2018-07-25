import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Redirect } from 'react-router';
import Gallery from 'react-grid-gallery';
import './bootstrap.css';

class Photos extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
        category:props.match.params.category,
        images: []
    };
  }

  componentDidMount() {
    var server_url = "http://52.231.68.151:3001/image/";
    fetch('photos')
      .then((response)=> response.json())
      .then((responseData)=>{
        var resdata = responseData.result;
        if(resdata === "Success"){
          var data = responseData.data;
          var array = []
          for(var i=0; i<data.length; i++){
            array.push({src:server_url+data[i].data, thumbnail:server_url+data[i].data, caption:data[i].name});
          }
          this.setState({images:array});
          this.forceUpdate();
        }
      });
  }

  render(){
    return (
      <div className="container" style={{
          display: "block",
          minHeight: "1px",
          width: "100%",
          overflow: "auto",
          textAlign: "center",
          background: "white"
      }}>
          <br /><br /><h1>gallery</h1><br />
         <Gallery
              images={this.state.images}
              enableImageSelection={false}
          />
      </div>
    );
  }

}

export default Photos;
