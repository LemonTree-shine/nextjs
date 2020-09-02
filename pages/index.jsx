import {Component} from "react";
import axios from "axios";
import Link from 'next/link';
import Nav from "../component/nav/nav";
import dynamic from 'next/dynamic';
import "../style/index.less";
import {timeStr,ifOpenByPhone} from "../common/util";
import Axios from "../common/Axios";
import { notification,Modal, Button } from 'antd';

// const Nav = dynamic(import('../component/nav/nav'),{
//     ssr:false
// })

export default class Index extends Component{
    render(){
        // console.log(this.props.pathname);
        var {articleList,openByPhone} = this.state;
        return <div>
            {/* 导航部分内容 */}
            <Nav 
                pathname={this.props.pathname} 
                longinUserInfo={this.state.longinUserInfo} 
                menu={this.state.menu}
                openByPhone={openByPhone}
            />
            <div className={openByPhone?"common-content-box common-content-box-mobile":"common-content-box"}>
                <div className="common-main-content radio5">
                    {/* <i className="fa fa-car" style={{"color":"red"}}></i> */}
                    <div className="list-title">文章列表</div>
                    <div className="list-box">
                        {articleList&&articleList.sort((a,b)=>{return b.createTime-a.createTime}).map(list=>{
                            return <div className="content-list" key={list.id} onClick={()=>{this.toArticlePage(list.id)}}>
                                <div className="share-info"><span className="share-title-color">分享</span> · {list.author} · {timeStr(list.createTime)} / javascript · node</div>
                                <div className="content-list-f">
                                    <h3 className="title pt-5">{list.title}</h3>
                                    {/* <div className="describe">但是很多年轻人还是选择去相亲。 今天我就参与了一场相亲活动，怎么说呢？还是蛮有意思的，两个陌生人一上来就聊些我们做了很...</div> */}
                                </div>
                                {/* <div className="content-list-img">
                                    <img src="/static/image/github.png" alt=""/>
                                </div> */}
                                <div className="action-list">
                                    <div className="fa fa-heart fa-icon" onClick={(e)=>{this.handleSuppert(e,list.id)}}> {list.support||"0"}</div>
                                    <div className="fa fa-comments fa-icon"> {list.commentNum||"0"}</div>
                                    {/* <div className="fa fa-comments fa-icon"> 10</div> */}
                                </div>
                            </div>
                        })}
                        
                    </div>
                    
                </div>
                <div className={openByPhone?"common-main-tool none":"common-main-tool"}>
                    {/* <a href="/api/getGithubCode">点我</a> */}
                    {this.state.ifLogin?<div className="user-info radio5">
                        <img className="head-img" src={this.state.longinUserInfo.avatar_url}></img>
                        <div className="github-name">
                            <a href={this.state.longinUserInfo.html_url}><strong>{this.state.longinUserInfo.login_name}</strong>({this.state.longinUserInfo.name})</a>
                        </div>
                        <div className="t-l-c">
                            <i className="fa fa-smile-o"></i>&nbsp;&nbsp;<span>Welcome to here.</span>
                        </div>
                    </div>:<div className="login radio5">
                        <a href="/api/getGithubCode"><i className="fa fa-github"></i></a>
                    </div>}
                    <div className="common-part radio5">
                        <div className="title">
                            学习网站
                        </div>
                        <div className="learn-tool-box">
                            <a className="list" href="http://nodejs.cn/">Node</a>
                            <a className="list" href="https://www.webpackjs.com/">webpack</a>
                            <a className="list" href="https://reactjs.org/">react</a>
                            <a className="list" href="https://cn.vuejs.org/">vue</a>
                            <a className="list" href="https://juejin.im/">掘金</a>
                            <a className="list" href="https://www.jianshu.com/">简书</a>
                            <a className="list" href="http://nextjs.frontendx.cn/">next.js</a>
                        </div>
                    </div>

                    <div className="common-part radio5">
                        <div className="title">
                            推荐文章
                        </div>
                        <div className="article-tool-box">
                            {this.state.recommendMenu.map((item,index)=>{
                                return <a 
                                    className="list" 
                                    key={item.id} 
                                    title={item.name} 
                                    href={item.linkUrl}
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        this.onPage(item);
                                    }}
                                >{item.name}</a>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        
        
            <Modal
                title="提示"
                visible={this.state.showMask}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确认"
                cancelText="取消"
            >
                <p>由于您的登录信息中没有邮箱地址，为防止在留言或发送IM消息时无法通知到您，请在下方填写您的邮箱，并点击确定更新信息！</p>
                <input ref={(el)=>{this.oinput = el}} className="pop-conform-input"/>
            </Modal>
        </div>
    }

    //异步获取数据，在服务端执行
    static async getInitialProps({ req }) {
        console.log(ifOpenByPhone(req.headers["user-agent"]));
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

        //获取菜单列表
        var menu =  await axios.post("/api/manage/getMenu",{
            admin:info.data.data.admin
        },{
            headers:{
                "Content-Type":"text/plain; charset=utf-8",
                "cookie":req.headers.cookie || ""
            }
        });

        //获取推荐文章列表
        var recommendMenu =  await axios.post("/api/manage/getManageMenu",{
            type:"recommend"
        },{
            headers:{
                "Content-Type":"text/plain; charset=utf-8",
            }
        });

        var returnData = {
            pathname:req.url,  //获取当前路径用于选中菜单
            userInfo:info.data.data,
            articleList:articleList.data.data.data.filter((article)=>{
                return article.type==="1"
            }),
            menu:menu.data.data,
            openByPhone:ifOpenByPhone(req.headers["user-agent"]),
            recommendMenu:recommendMenu.data.data
        };

        if(info.data.code=="0"){
            returnData.ifLogin = true;
        }else if(info.data.code=="10001"){
            returnData.ifLogin = false;
        }
        return returnData;
    }

    constructor(props){
        super(props);
        
        this.state = {
            ifLogin:props.ifLogin,
            longinUserInfo:props.userInfo,
            articleList:props.articleList,
            menu:props.menu,
            openByPhone:props.openByPhone,
            recommendMenu:props.recommendMenu,
            showMask:false
        }
        console.log(props);
    }

    closePop = ()=>{
        this.setState({
            showMask:false
        });
    }

    showPop = ()=>{
        this.setState({
            showMask:true
        });
    }

    handleOk = ()=>{
        var {longinUserInfo} = this.state;
        if(/.+@.+/.test(this.oinput.value)){
            Axios({
                url:"/api/updateEmail",
                data:{
                    email:this.oinput.value
                }
            }).then((result)=>{
                notification.success({
                    message: '提示',
                    description: "邮箱更新成功^_^",
                    duration: 1,
                });
                this.closePop();
            });
            
        }else{
            notification.error({
                message: '提示',
                description: "邮箱格式不正确！",
                duration: 1,
            });
        }
        //this.closePop();
    }

    handleCancel = ()=>{
        this.closePop();
    }

    componentDidMount(){
        //默认创建im聊天用户信息
        if(this.state.ifLogin){
            Axios({
                url:"/api/im/createUser",
                data:{}
            }).then((result)=>{
                console.log(result.data);
                this.setState({
                    imInfo:result.data
                },()=>{
                    localStorage.setItem("userImInfo",JSON.stringify(result.data));
                });
            });

            var {longinUserInfo} = this.state;
            if(!(longinUserInfo.email&&/.+@.+/.test(longinUserInfo.email))){
                this.showPop();
            }
        }
    }

    //查询文章列表
    reqArticleList = ()=>{
        Axios({
            url:"/api/getArticleList"
        }).then((res)=>{
            this.setState({
                articleList:res.data.data.filter((article)=>{
                    return article.type==="1"
                })
            })
        })
    }

    login = ()=>{
        axios.post("/api/getGithubCode")
    }

    //点赞
    handleSuppert = (e,id)=>{
        e.stopPropagation()
        Axios({
            url:"/api/supportArticle",
            data:{
                id:id
            }
        }).then((data)=>{
            notification.success({
                message: '提示',
                description: data.message,
                duration: 2,
            });

            //status==1说明已经点过赞了，不用重新加载
            if(data.data.status=="1"){
                return;
            }

            //点赞后重新加载数据
            this.reqArticleList();
            
        });
    }

    //跳转到阅读文章页面
    toArticlePage = (id)=>{
        window.location = "/article/"+id
    }

    //点击推荐文章跳转
    onPage = (item)=>{
        Axios({
            url:"/api/addReadNum",
            data:{
                id:item.id
            }
        });

        window.location.href = item.linkUrl;
    }
}