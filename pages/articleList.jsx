import {Component} from "react";
import Router from 'next/router'
import axios from "axios";
import Link from 'next/link';
import Nav from "../component/nav/nav";
import dynamic from 'next/dynamic';
import "../style/articleList.less";
import {formatDate} from "../common/util";
import { Modal } from 'antd';

export default class Index extends Component{
    render(){
        var {articleList} = this.state;
        console.log(articleList);
        return <div>
            {/* 导航部分内容 */}
            <Nav pathname={this.props.pathname} longinUserInfo={this.state.longinUserInfo}/>
            <div className="common-content-box">
                <div className="c-content-list radio5">
                    {/* 文章列表排序 */}
                    {articleList.sort((a,b)=>{return b.createTime-a.createTime}).map(list=>{
                        return <div className="article-item" key={list.id} onClick={()=>{this.toArticlePage(list)}}>
                            <div className="share-info"><span className="share-title-color">作者</span> · {list.author} · {formatDate(list.createTime)}</div>
                            <div className="content-list-f">
                                <h3 className="title pt-5">{list.title}</h3>
                            </div>
                            <div className="action-list">
                                <div className="fa fa-trash fa-icon" title="删除" onClick={(e)=>{this.deleteArticle(e,list)}}></div>
                            </div>
                        </div>
                    })}
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
        location.href = "/article?id="+list.id
    }

    //删除文章入口
    deleteArticle = (e,list)=>{
        e.stopPropagation();
        Modal.confirm({
            title: '提示',
            content: '确定要删除该文章？',
            okText: '确认',
            cancelText: '取消',
            onOk:()=>{
                //alert(list.id);
                return new Promise(function(resolve){
                    setTimeout(function(){
                        console.log(list.id);
                        resolve();
                        
                    },1000)
                });
            }
          });
    }
}