import React from "react";
import Htmlpreview from "./Htmlpreview";
import Markdown from "./Markdown";
import "../css/custom.css"
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
		const blob = new Blob([Htmlpreview.converter.makeHtml(this.state.markdown)],{type : "text/plain;charset=utf-8"});
		const url = URL.createObjectURL(blob);
		this.setState({htmlURL: url });
	}
	render(){
		return (
	    <table>
	    	<tbody >
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
