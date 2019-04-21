import {Component} from "react";
import "../style/article.less";
import axios from "axios";
export default class Index extends Component{
    render(){
        return <div className="c-write-article">
            <div className="article-title">
                <input className="title-input" ref={el=>this.title = el} placeholder="请输入文章标题..." type="text"/>
                <div className="submit" onClick={this.submitArticle}>发布</div>
            </div>
            <div className="box">
                <div id="editor">
                    <textarea ref={el=>this.textarea = el} style={{"display":"none"}}></textarea>
                </div>
            </div>
            
        </div>
        
    }
    componentDidMount(){
        editormd("editor", {
            htmlDecode      : "style,script,iframe",
            placeholder:'',
            width   : "90%",
            height  :"100%",
            syncScrolling : "single",
            path    : "/static/editorMd/lib/",
            toolbarIcons:function(){
                return ["undo","redo","|","bold","del","italic","quote","ucwords","uppercase","lowercase","|","h1","h2","h3","h4","h5","h6","|","list-ul","list-ol","hr","|","link","image","code","preformatted-text","code-block","table","datetime","html-entities","|","clear"]
            }
        });
    }
    submitArticle = ()=>{
        if(!this.title.value){
            alert('标题不能为空！');
            return;
        }
        if(!this.textarea.value){
            alert('文章内容不能不能为空！');
            return;
        }

        axios.post("/api/publishArticle",{
            title:this.title.value,
            content:this.textarea.value
        },{
            headers:{
                "Content-Type":"text/plain; charset=utf-8",
                "withCredentials":true
            }
        },(data)=>{
            console.log(data)
        });

        
    }
}