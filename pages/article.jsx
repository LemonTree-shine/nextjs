import {Component} from "react";
import Axios from "../common/Axios";
import { Button, notification } from 'antd';
import "../style/article.less";
import {formatDate} from "../common/util";
import Commit from "../component/commit/commit";


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
            <Commit submit = {this.submitComment}/>
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

    //评论功能
    submitComment = (content)=>{
        var Aid = this.props.url.query.id;

        if(!content){
            notification.error({
                message: '提示',
                description: '评论内容不能为空！',
                duration: 1,
            })
            return 
        }

        Axios({
            url:"/api/comment",
            data:{
                Aid:Aid,
                content:content,
                //rootLoginName:rootLoginName
            }
        }).then((data)=>{
            notification.success({
                message: '提示',
                description: '评论成功！',
                duration: 1,
            });
        });
    }
}