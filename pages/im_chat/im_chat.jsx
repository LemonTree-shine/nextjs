import React,{ Component } from 'react';
import {connentIm,getUrlParams,formatDate,inChatRoomWarning,iconFaceArr} from "../../common/util";
import MsgItem from "../../component/msgItem/msgItem";
import Axios from "../../common/Axios";
import {notification } from 'antd';
import axios from "axios";
import "./index.less";
import IconList from "../../component/iconList/iconList"

export default class Index extends Component{
    render(){
        return <div className="c-chat-page">
            <div className="msgList">
                {this.state.msgList.sort(function(a,b){
                    return a.time-b.time
                }).map((item,index)=>{
                    return <MsgItem 
                        item={item}
                        userInfo = {this.state.userInfo}
                        accountInfo = {this.state.accountInfo}
                        key = {index}
                    />
                })}
            </div>
            <div className="bottom-input-box">
                <input 
                    ref={(el)=>{this.Input = el}} 
                    type="text"
                    onKeyUp={(e)=>{this.handleKeyUp(e)}}
                />
                <button onClick={this.sendText}>发送</button>
                <div onClick={this.showIcon} style={{marginTop:"0.1rem",marginLeft: "0.12rem"}}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={"#icon-shimo"}></use>
                    </svg>
                </div>
                <IconList 
                    iconList={iconFaceArr} 
                    showFlag = {this.state.showFlag}
                    clickIconFont = {this.clickIconFont}
                />
            </div>
            
        </div>
    }
    account = "";
    token = "";
    toAccount = "";
    scrollMax = 1000000;  //设置一个足够大的值，用于每次发送接收消息的时候，都滚动到底部；

    static async getInitialProps({ req }) {
        var info =  await axios.post("/api/getUserInfo",{},{
            headers:{
                "Content-Type":"text/plain; charset=utf-8",
                "cookie":req.headers.cookie || ""
            }
        });

        var resultData = {
            userInfo:info.data.data
        }

        return resultData
    }
    
    
    constructor(props){
        super(props);
        this.state = {
            msgList:[], //消息列表
            userInfo:props.userInfo,  //登录的用户信息
            accountInfo:{},   //对方的用户信息
            showFlag:false
        }
        console.log(props);
    }

    componentDidMount(){
        var self = this;
        // var urlparams = getUrlParams();
        // self.account = urlparams.account;
        // self.token = urlparams.token;
        // self.toAccount = urlparams.toAccount;

        //获取用户im信息
        console.log(JSON.parse(localStorage.getItem("userImInfo")));
        var userInfo = JSON.parse(localStorage.getItem("userImInfo"));
        self.account = userInfo.accid;
        self.token = userInfo.token;

        //判断是不是博主
        if(userInfo.name==="LemonTree-shine"){
            var urlparams = getUrlParams();
            //设置对方用户
            self.toAccount = urlparams.toAccount;

            //获取对方信息
            this.getAccountInfo(urlparams.loginName);
        }else{
            // accid: "9jrgxa53yqi"
            //博主的账户信息
            var info = {
                name:"LemonTree-shine",
                accid:"9jrgxa53yqi"
            }
            //获取博主信息
            this.getAccountInfo(info.name);

            //设置所要发送的人
            self.toAccount = info.accid
        }

        //适配手机
        var htmlPx = 50*window.devicePixelRatio<100?100:50*window.devicePixelRatio;
        document.documentElement.style.fontSize = htmlPx+"px";

        connentIm.call(this).then(function(){
            self.nim.getHistoryMsgs({
                scene: 'p2p',
                endTime:Date.now(),
                reverse:false,
                to: self.toAccount,
                done: function(error,obj){
                    console.log(obj.msgs);
                    self.setState({
                        msgList:obj.msgs
                    },()=>{
                        if(obj.msgs.length===0){
                            var custom = {
                                type:"system",
                                data:{
                                    content:inChatRoomWarning
                                }
                            }
                            self.sendCustomInfo(custom);
                        }
                        self.scrollToBottom();
                    });
                }
            })
        });
    }

    getAccountInfo = (loginName)=>{
        Axios({
            url:"/api/getUserInfo",
            data:{
                loginName:loginName
            }
        }).then((result)=>{
            this.setState({
                accountInfo:result.data
            });
        });
    }

    sendText = ()=>{
        var self = this;
        if(!self.Input.value) return;
        
        //判断距离最后一条消息的记录是否超过5分钟，如果超过5分钟，则推一条时间
        var sortMsgList = this.state.msgList.sort(function(a,b){
            return a.time-b.time
        });
        if(!sortMsgList.length||Date.now()-sortMsgList[sortMsgList.length-1].time>60*5*1000){
            var custom = {
                type:"time",
                time:Date.now()
            }
            self.sendCustomInfo(custom).then(()=>{
                send();
            });
            return;
        }
        send();

        function send(){
            self.nim.sendText({
                scene: 'p2p',
                to: self.toAccount,
                text: self.Input.value||'hello',
                custom: '{}',
                done:function(err,msg){
                    console.log(msg);
                    var {msgList} = self.state;
                    msgList.push(msg);
                    self.setState({
                        msgList:msgList
                    },()=>{
                        if(!sessionStorage.getItem("send_email")){
                            self.sendEmail();
                        }
                        self.Input.value = "";
                        self.scrollToBottom();
                    });
                }
            });
        } 
    }

    sendEmail = ()=>{
        var {accountInfo} = this.state;
        if(accountInfo.email&&/.+@.+/.test(accountInfo.email)){
            Axios({
                url:"/api/im/sendEmail",
                data:{
                    email:accountInfo.email
                }
            }).then((result)=>{
                sessionStorage.setItem("send_email","1")
                notification.success({
                    message: '提示',
                    description: "对方已收到邮件消息，看到邮件会及时回复的哦！",
                    duration: 2,
                });
            });
        }else{
            sessionStorage.setItem("send_email","1")
            notification.error({
                message: '提示',
                description: "对方并没有邮箱，你发的消息对方无法接收到通知！",
                duration: 2,
            });
        }
        
    }

    sendCustomInfo = (custom)=>{
        var self = this;
        return new Promise(function(resolve){
            self.nim.sendText({
                scene: 'p2p',
                to: self.toAccount,
                text: "custom",
                custom: JSON.stringify(custom),
                done:function(err,msg){
                    console.log(msg);
                    var {msgList} = self.state;
                    msgList.push(msg);
                    self.setState({
                        msgList:msgList
                    },()=>{
                        resolve()
                    });
                }
            });
        })
        
    }

    handleKeyUp = (e)=>{
        if(e.keyCode!==13){
            return
        }
        this.sendText();
    }

    scrollToBottom = ()=>{
        var self = this;
        document.body.scrollTop=self.scrollMax;
    }

    //发送表情
    clickIconFont = (link)=>{
        console.log(link)
        var custom = {
            type:"icon",
            data:{
                content:link
            }
        }

        this.sendCustomInfo(custom).then(()=>{
            if(!sessionStorage.getItem("send_email")){
                this.sendEmail();
            }
            this.scrollToBottom();
        });

        this.setState({
            showFlag:false
        });
    }

    showIcon = ()=>{
        var {showFlag} = this.state;
        this.setState({
            showFlag:!showFlag
        });
    }
}
