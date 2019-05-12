import {Component} from "react";
import Axios from "../common/Axios";
import { Button, notification } from 'antd';
import "../style/article.less";
import {formatDate} from "../common/util";


export default class Index extends Component{
    render(){
        var {articleInfo} = this.state;
        return  <div id="layout" className="c-editor-article">
            <div className="article-title-box">
                <div className="title">
                    {articleInfo.title}
                </div>
                {articleInfo.author?<div className="userInfo">
                    作者：<a href={articleInfo.html_url} target="_blank">{articleInfo.author}</a>&nbsp;&nbsp;&nbsp;&nbsp;时间: {formatDate(articleInfo.createTime)}
                </div>:null}
            </div>
            <div id="test-editormd" >
                <textarea id="atricle-content"></textarea>
            </div>
        </div>
    }
    static async getInitialProps({ req }) {
        return {}
    }
    constructor(props){
        super(props);
        this.state = {
            articleInfo:{}
        }
    }
    
    componentDidMount(){
        //console.log(this)
        var id = this.props.url.query.id;

        Axios({
            url:"/api/readArticle",
            data:{
                id:id
            }
        }).then((data)=>{
            //文章内容
            document.querySelector("#atricle-content").value = data.data.content;
            //编译markdown
            this.initEditor();
            this.setState({
                articleInfo:data.data
            });
        });
        
    }

    //转换文档类型
    initEditor = ()=>{
        editormd.markdownToHTML("test-editormd", {
            htmlDecode      : "style,script,iframe",  // you can filter tags decode
            emoji           : true,
            taskList        : true,
            tex             : true,  // 默认不解析
            flowChart       : true,  // 默认不解析
            sequenceDiagram : true,  // 默认不解析
        });
    }
}