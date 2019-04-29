import {Component} from "react";
import Axios from "../common/Axios";
import { Button, notification } from 'antd';
import "../style/article.less";


export default class Index extends Component{
    render(){
        return  <div id="layout" className="c-editor-article">
            <div>{this.state.articleInfo.title}</div>
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