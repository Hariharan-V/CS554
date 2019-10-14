import React from "react";
import Htmlpreview from "./Htmlpreview";
import Markdown from "./Markdown";
import "../css/custom.css"
import Template from "../static/template";
class App extends React.Component {

	state = {markdown:'', htmlName: 'HTMLFile.html',markdownName:'markdown.md' };
	
	change = (event)=>{

		this.setState({markdown:event.target.value});

	}
	markdownDownload = ()=>{
		const blob = new Blob([this.state.markdown],{type : "text/plain;charset=utf-8"});
		const url = URL.createObjectURL(blob);
		this.setState({markdownURL: url });
	}
	htmlDownload = ()=>{
		const blob = new Blob([Template.constructHTML(this.state.htmlName,Htmlpreview.converter.makeHtml(this.state.markdown))],{type : "text/plain;charset=utf-8"});
		const url = URL.createObjectURL(blob);
		this.setState({htmlURL: url });
	}
	setMarkdownName = (event)=>{
		this.setState({markdownName:event.target.value+".md"});
	}
	setHTMLName = (event)=>{
		this.setState({htmlName:event.target.value+".html"});
	}
	render(){
		return (
	    <table>
	    	<tbody >
				<tr>
					<th>Set name for md file:<input type="text" name="markdown"  onChange = {this.setMarkdownName}></input></th>
					<th>Set name for html file:<input type="text" name="HTMLFile" onChange = {this.setHTMLName}></input></th>
				</tr>
				<tr>
					<th><a href={this.state.markdownURL} download = {this.state.markdownName} onClick = {this.markdownDownload}>Click to Download Markdown</a> </th>
					<th><a href={this.state.htmlURL} download = {this.state.htmlName} onClick = {this.htmlDownload}>Click to Download HTML</a></th>
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
