import {Component} from "react";
import "../style/editor.less";
import Axios from "../common/Axios";
import { Button, notification } from 'antd';


export default class Index extends Component{
    render(){
        return <div className="c-write-article">
            <div className="article-title">
                <input className="title-input" ref={el=>this.title = el} placeholder="请输入文章标题..." type="text"/>
                <div className="submit" onClick={this.submitArticle}>发布</div>&nbsp;&nbsp;
                <div className="submit uploadImg">
                    添加图片
                    <input className="uploadFile" onChange={this.uploadImages} type="file"/>
                </div>
                
            </div>
            <div className="box">
                <div id="editor">
                    <textarea ref={el=>this.textarea = el} style={{"display":"none"}}></textarea>
                </div>
            </div>
            
        </div> 
    }
    constructor(){
        super();
        this.state = {
            articleInfo:{}
        }
    }

    //初始化markdown
    initEditor = ()=>{
        editormd("editor", {
            htmlDecode      : "style,script,iframe",
            placeholder:'',
            width   : "90%",
            height  :"100%",
            syncScrolling : "single",
            path    : "/static/editorMd/lib/",
            toolbarIcons:function(){
                return ["undo","redo","|","bold","del","italic","quote","ucwords","uppercase","lowercase","|","h1","h2","h3","h4","h5","h6","|","list-ul","list-ol","hr","|","link","image","code","preformatted-text","code-block","table","datetime","html-entities","|","clear"]
            },
        });

    }
    componentDidMount(){
        var id = this.props.url.query.id;
        //判断是否有id
        if(id){
            Axios({
                url:"/api/readArticle",
                data:{
                    id:id
                }
            }).then((data)=>{

                this.title.value = data.data.title;
                this.textarea.value = data.data.content;

                this.initEditor();

                this.setState({
                    articleInfo:data.data
                });
                
            });
        }else{
            this.initEditor();
        }

    }
    submitArticle = ()=>{
        if(!this.title.value){
            notification.open({
                message: '提示',
                description: '文章标题不能为空',
                duration: 1,
            });
            return;
        }
        if(!this.textarea.value){
            notification.open({
                message: '提示',
                description: '文章内容不能为空！',
                duration: 1,
            });
            return;
        }

        var id = this.props.url.query.id;
        if(id){
            //更新文章
            Axios({
                url:"/api/uploadArticle",
                data:{
                    title:this.title.value,
                    content:this.textarea.value,
                    id:this.state.articleInfo.id,
                    filename:this.state.articleInfo.filename
                }
            }).then((data)=>{
                notification.success({
                    message: '提示',
                    description: '更新成功',
                    duration: 1,
                });
                setTimeout(()=>{
                    location.href = "/articleList";
                },1000)
            });

            return;
        }

        //发布新的文章
        Axios({
            url:"/api/publishArticle",
            data:{
                title:this.title.value,
                content:this.textarea.value
            }
        }).then((data)=>{
            notification.success({
                message: '提示',
                description: '发布成功',
                duration: 1,
            });
            setTimeout(()=>{
                location.href = "/articleList";
            },1000)
        });
    }

    uploadImages = (event)=>{
        console.log(event.target.files[0])
    }
}