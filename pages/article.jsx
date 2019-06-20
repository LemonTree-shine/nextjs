import {Component} from "react";
import Axios from "../common/Axios";
import { Button, notification } from 'antd';
import "../style/article.less";
import {formatDate} from "../common/util";
import Commit from "../component/commit/commit";


export default class Index extends Component{
    render(){
        var {articleInfo,commitList} = this.state;
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
            <Commit 
                submit = {this.submitComment} 
                commitList={commitList}
                replyComment={this.replyComment}
            />
        </div>
    }
    static async getInitialProps({ req }) {
        return {}
    }
    constructor(props){
        super(props);
        this.state = {
            articleInfo:{},
            commitList:[]
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

        this.getCommentList(id);
        
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
    submitComment = (content,commit)=>{
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
            //评论成功后刷新数据
            this.getCommentList(Aid);

            commit.textarea.value = "";
            
            notification.success({
                message: '提示',
                description: '评论成功！',
                duration: 1,
            });
        });
    }

    //回复功能
    replyComment = (replyItem,content,pid)=>{
        var Aid = this.props.url.query.id;
        console.log(replyItem,content);

        Axios({
            url:"/api/comment",
            data:{
                Aid:replyItem.Aid,
                content:content,
                Pid:pid,
                PloginName:replyItem.login_name,
                Puid:replyItem.Uid,
                Pheader_url:replyItem.header_url
            }
        }).then((data)=>{
            //评论成功后刷新数据
            this.getCommentList(Aid);
            
            notification.success({
                message: '提示',
                description: '评论成功！',
                duration: 1,
            });
        });
    }

    //获取留言列表
    getCommentList = (Aid)=>{
        Axios({
            url:"/api/getCommentList",
            data:{
                Aid:Aid
            }
        }).then((data)=>{
            this.setState({
                commitList:data.data.data
            });
        });
    }
}