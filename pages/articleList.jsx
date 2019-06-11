import {Component} from "react";
import Router from 'next/router'
import axios from "axios";
import Link from 'next/link';
import Nav from "../component/nav/nav";
import dynamic from 'next/dynamic';
import "../style/articleList.less";
import {formatDate} from "../common/util";
import Axios from "../common/Axios";
import { Modal,notification } from 'antd';

export default class Index extends Component{
    render(){
        var {articleList} = this.state;
        console.log(articleList);
        return <div className="c-article-list">
            {/* 导航部分内容 */}
            <Nav pathname={this.props.pathname} longinUserInfo={this.state.longinUserInfo}/>
            <div className="common-content-box">
                <div className="c-content-list radio5">
                    {/* 文章列表排序 */}
                    {articleList.length?articleList.sort((a,b)=>{return b.createTime-a.createTime}).map(list=>{
                        return <div className="article-item" key={list.id} onClick={()=>{this.toArticlePage(list)}}>
                            <div className="share-info"><span className="share-title-color">作者</span> · {list.author} · {formatDate(list.createTime)}</div>
                            <div className="content-list-f">
                                <h3 className="title pt-5">{list.title}</h3>
                            </div>
                            <div className="action-list">
                                <div className="fa fa-trash fa-icon" title="删除" onClick={(e)=>{this.deleteArticle(e,list)}}></div>
                            </div>
                            {
                                list.type==="1"?
                                    <div className="publishBtn readyPublish" onClick={(e)=>{this.publish(e,list)}}>已发布</div>:<div className="publishBtn" onClick={(e)=>{this.publish(e,list)}}>未发布</div>
                            }
                            
                        </div>
                    }):<div className="empty-list">暂无文章</div>}
                </div>
            </div>
        </div>
    }
    //异步获取数据，在服务端执行
    static async getInitialProps({ req }) {

        //获取用户信息
        var info =  await axios.post("/api/getUserInfo",{},{
            headers:{
                "Content-Type":"text/plain; charset=utf-8",
                "cookie":req.headers.cookie || ""
            }
        });

        //获取文章列表
        var articleList =  await axios.post("/api/getArticleList",{},{
            headers:{
                "Content-Type":"text/plain; charset=utf-8",
            }
        });
        console.log(articleList);

        var returnData = {};

        if(info.data.code=="0"){
            returnData = {
                pathname:req.url,  //获取当前路径用于选中菜单
                userInfo:info.data.data,
                ifLogin:true,
                articleList:articleList.data.data.data,
            }
        }else if(info.data.code=="10001"){
            returnData = {
                pathname:req.url,  //获取当前路径用于选中菜单
                userInfo:info.data.data,
                ifLogin:false,
                articleList:articleList.data.data.data,
            }
        }
        return returnData;
    }

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            ifLogin:props.ifLogin,
            longinUserInfo:props.userInfo,
            articleList:props.articleList
        }
    }

    //跳转到编辑文章页面
    toArticlePage = (list)=>{
        //Router.push();
        location.href = "/editor/"+list.id
    }

    //删除文章入口
    deleteArticle = (e,list)=>{
        var _self = this;
        e.stopPropagation();
        Modal.confirm({
            title: '提示',
            content: '确定要删除该文章？',
            okText: '确认',
            cancelText: '取消',
            onOk:()=>{
                //alert(list.id);
                return new Promise(function(resolve){
                    Axios({
                        url:"/api/deleteArticle",
                        data:list
                    }).then(()=>{
                        notification.success({
                            message: '提示',
                            description: '删除成功',
                            duration: 1,
                        });
                        _self.getArticalList();
                        resolve();
                    });
                });
            }
          });
    }

    //删除后重新获取文章列表
    getArticalList = ()=>{
        Axios({
            url:"/api/getArticleList",
        }).then((res)=>{
            this.setState({
                articleList:res.data.data
            });
        });
    }

    //发布
    publish = (e,list)=>{
        var _self = this;
        e.stopPropagation();
        Axios({
            url:"/api/publishUnpublishArticle",
            data:{
                id:list.id,
                type:list.type==="0"?"1":"0"
            }
        }).then(()=>{
            notification.success({
                message: '提示',
                description: '操作成功',
                duration: 1,
            });
            _self.getArticalList();
        });
    }
}