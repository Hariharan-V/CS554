import React from "react";
import Htmlpreview from "./Htmlpreview";
import Markdown from "./Markdown";
import "../css/custom.css"
import Template from "../static/template";
class App extends React.Component {

	state = {markdown:'', htmlName: '',markdownName:'' };
	
	change = (event)=>{

		this.setState({markdown:event.target.value});

	}
	markdownDownload = ()=>{
		if(this.state.markdownName==null||this.state.markdownName==NaN  || this.state.markdownName.length==0){
			alert("No file name entered");
			
			return;
		}

		const blob = new Blob([this.state.markdown],{type : "text/plain;charset=utf-8"});
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.setAttribute("download",this.state.markdownName+".md");
		anchor.click();
	}
	htmlDownload = ()=>{
		if(this.state.htmlName==null||this.state.htmlName==NaN  || this.state.htmlName.length==0){
			alert("No file name entered");
			return;
		}
		const blob = new Blob([Template.constructHTML(this.state.htmlName,Htmlpreview.converter.makeHtml(this.state.markdown))],{type : "text/plain;charset=utf-8"});
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.setAttribute("download",this.state.htmlName+".html");
		anchor.click();
	
	}
	setMarkdownName = (event)=>{

		this.setState({markdownName:event.target.value});
	}
	setHTMLName = (event)=>{
		this.setState({htmlName:event.target.value});
	}
	shouldComponentUpdate = (nextProps, nextState)=>{
		if (this.state.markdownName!=nextState.markdownName || this.state.htmlName!= nextState.htmlName){
			return false;
		}

		return true;
	}
	render(){
		return (
	    <table>
	    	<tbody >
				<tr>
					<th>Hello:<input type="text" name="markdown"  onChange = {this.setMarkdownName}></input></th>
					<th>Set name for html file:<input type="text" name="HTMLFile" onChange = {this.setHTMLName}></input></th>
				</tr>
				<tr>
					<th><button onClick = {this.markdownDownload}>Click to Download Markdown</button> </th>
					<th><button onClick = {this.htmlDownload}>Click to Download HTML</button></th>
				</tr>
	    		<tr>
	        		<td><Markdown change = {this.change}/></td>
	        		<td><Htmlpreview html={this.state.markdown}/></td>
	      		</tr>
	    	</tbody>
	    </table>
  		);
	}
};
export default App;