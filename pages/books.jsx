import {Component} from "react";
// import * as editormd from "../static/editorMd/editormd.min.js"
export default class Index extends Component{
    render(){
        return <div id="editor">
            <textarea ></textarea>
        </div>
    }
    componentDidMount(){
       
        editormd("editor", {
            placeholder:'',
            //width   : "90%",
            height  : 640,
            syncScrolling : "single",
            path    : "/static/editorMd/lib/",
            toolbarIcons:function(){
                return ["undo","redo","|","bold","del","italic","quote","ucwords","uppercase","lowercase","|","h1","h2","h3","h4","h5","h6","|","list-ul","list-ol","hr","|","link","image","code","preformatted-text","code-block","table","datetime","html-entities","|","clear"]
            }
        });


    }
}