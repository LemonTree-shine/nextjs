import {Component} from "react";
import axios from "axios";
import Link from 'next/link';
import Nav from "../component/nav/nav";
import dynamic from 'next/dynamic';
import "../style/index.less";

// const Nav = dynamic(import('../component/nav/nav'),{
//     ssr:false
// })

export default class Index extends Component{
    render(){
        // console.log(this.props.pathname);
        return <div>
            {/* 导航部分内容 */}
            <Nav pathname={this.props.pathname}/>
            <div className="common-content-box">
                <div className="common-main-content radio5">
                    {/* <i className="fa fa-car" style={{"color":"red"}}></i> */}
                    <div className="list-title">文章列表</div>
                    <div className="list-box">
                        <div className="content-list">
                            <div className="share-info"><span className="share-title-color">分享</span> · 西瓜太郎 · 4小时前 / javascript · node</div>
                            <div className="content-list-f">
                                <h3 className="title pt-5">Node.js开发微信公众号</h3>
                                <div className="describe">但是很多年轻人还是选择去相亲。 今天我就参与了一场相亲活动，怎么说呢？还是蛮有意思的，两个陌生人一上来就聊些我们做了很...</div>
                            </div>
                            <div className="content-list-img">
                                <img src="/static/image/github.png" alt=""/>
                            </div>
                            <div className="action-list">
                                <div className="fa fa-heart fa-icon"> 10</div>
                                <div className="fa fa-comments fa-icon"> 10</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="common-main-tool">
                    {/* <a href="/api/getGithubCode">点我</a> */}
                    {this.state.ifLogin?<div className="user-info radio5">
                        <img className="head-img" src="https://avatars1.githubusercontent.com/u/20238337?v=4"></img>
                        <div className="github-name">
                            <a href=""><strong>陈泽</strong>(LemonTree-shine)</a>
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
                            <a className="list" title="浏览器渲染机制" href="https://www.jianshu.com/p/b22ff1771225">浏览器渲染机制</a>
                            <a className="list" title="nodejs开发微信公众号" href="https://juejin.im/post/5be3af8ae51d4554b54b0a0d">nodejs开发微信公众号</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    //异步获取数据，在服务端执行
    static async getInitialProps({ req }) {
        
        return {
            pathname:req.url  //获取当前路径用于选中菜单
        }
    }

    constructor(){
        super();
        this.state = {
            ifLogin:false
        }
    }

    componentDidMount(){
        axios.post("/api/getUserInfo",{name:"chenze"},{
            headers:{
                "Content-Type":"text/plain; charset=utf-8"
            }
        });
        window.onscroll = debounce();

        //防抖函数
        function debounce(){
            var time;
            return function(){
                if(time) clearTimeout(time);

                time = setTimeout(function(){
                    var st = document.documentElement.scrollTop;
                    var ch = document.documentElement.clientHeight;
                    var bh = document.body.clientHeight;
                    //判断滚动条是否滚动到底
                    if(st+ch===bh){
                        console.log("到底了");
                    }
                },100)
            }
        }
    }
    login = ()=>{
        axios.post("/api/getGithubCode")
    }
}