import {Component} from "react";
import "../style/editor.less";
import Axios from "../common/Axios";
import { Button, notification } from 'antd';
import OSS from "ali-oss";


export default class Index extends Component{
    render(){
        var id = this.props.url.query.id;

        return <div className="c-write-article">
            <input style={{display:"block",height:"0","border":"none"}} type="text"/>
            <div className="article-title">
                <input className="title-input" ref={el=>this.title = el} placeholder="请输入文章标题..." type="text"/>
                <div className="submit" onClick={this.submitArticle}>{id?"修改":"存稿"}</div>&nbsp;&nbsp;
                <div className="submit uploadImg">
                    添加图片
                    <input className="uploadFile" ref={(el)=>{this.uploadFile = el}} onChange={this.uploadImages} type="file"/>
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
                    id:id,
                    filename:this.state.articleInfo.filename
                }
            }).then((data)=>{
                notification.success({
                    message: '提示',
                    description: '修改成功',
                    duration: 1,
                });
                setTimeout(()=>{
                    location.href = "/articleList";
                },1000)
            });

            return;
        }

        //存稿文章
        Axios({
            url:"/api/publishArticle",
            data:{
                title:this.title.value,
                content:this.textarea.value,
            }
        }).then((data)=>{
            notification.success({
                message: '提示',
                description: '保存成功',
                duration: 1,
            });
            setTimeout(()=>{
                location.href = "/articleList";
            },1000)
        });
    }

    uploadImages = (event)=>{
        var self = this;
        const client = new OSS({
            region: 'oss-cn-hangzhou',
            accessKeyId:"LTAIB7RbgKk58uuP",
            accessKeySecret:'HTovUZjnrFi9onWhH4bJnOWTb1DxPP',
            bucket: 'chenze-bloc',
            endpoint: 'https://oss-cn-hangzhou.aliyuncs.com',
            secure: true
        });

        var file = event.target.files[0];
        var arr = file.name.split(".");
        var path = "/articleImage/" + arr[0] + "_" + new Date().getTime() + "." + arr[1];

        client.multipartUpload(path, file, {
            mime: 'image/png'
        }).then(function (result) {
            var imgUrl = result.res.requestUrls[0];
            var INPUT = document.querySelector("input");
            INPUT.value = `![](${imgUrl.replace(/\?.*$/,"")})`;
            INPUT.select();
            var ifcopy = document.execCommand("copy");
            console.log(ifcopy);
            if(ifcopy){
                notification.success({
                    message:"上传成功，路径已复制到粘贴板，按ctrl+v键来粘贴路径即可！",
                    duration: 2,
                });
                self.uploadFile.value = "";
            }else{
                notification.error({
                    message:"上传失败，请重新上传"
                }); 
                self.uploadFile.value = "";
            }
        })
    }
}