import React from "react";

class Markdown extends React.Component {

render(){
  return (
  	<textarea  onChange = {this.props.change}></textarea>
  );
}
};

export default Markdown;