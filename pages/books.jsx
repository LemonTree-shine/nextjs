import {Component} from "react";
import "../style/article.less"
export default class Index extends Component{
    render(){
        return <div className="c-write-article">
            <div className="article-title">
                <input className="title-input" placeholder="请输入文章标题..." type="text"/>
                <div className="submit">发布</div>
            </div>
            <div className="box">
                <div id="editor">
                    <textarea style={{"display":"none"}}></textarea>
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
}