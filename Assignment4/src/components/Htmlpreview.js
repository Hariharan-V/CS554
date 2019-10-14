import React from "react";
import Showdown from "showdown";
import "../css/Htmlpreview.css";
class Htmlpreview extends React.Component{
	static converter =  new Showdown.Converter();
	render() {
  		return (
  			<div style = {{width:"100%", height:"1000px"}} dangerouslySetInnerHTML={ { __html: Htmlpreview.converter.makeHtml(this.props.html) } }>
  			
			</div>
  		);
	}

};

export default Htmlpreview;