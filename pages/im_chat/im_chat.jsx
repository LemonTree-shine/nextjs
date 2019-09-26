import React,{ Component } from 'react';
import {connentIm,getUrlParams,formatDate} from "../../common/util";
import MsgItem from "../../component/msgItem/msgItem";
import "./index.less";

export default class Index extends Component{
    render(){
        return <div className="c-chat-page">
            <div className="msgList">
                {this.state.msgList.sort(function(a,b){
                    return a.time-b.time
                }).map((item)=>{
                    return <MsgItem item={item}/>
                })}
            </div>
            <div className="bottom-input-box">
                <input 
                    ref={(el)=>{this.Input = el}} 
                    type="text"
                    onKeyUp={(e)=>{this.handleKeyUp(e)}}
                />
                <button onClick={this.sendText}>发送</button>
            </div>
            
        </div>
    }
    account = "chenzeddd";
    token = "cadcf0ca4063a20fb6af5e5b64f88944";
    toAccount = "chenzeabc";
    scrollMax = 1000000;  //设置一个足够大的值，用于每次发送接收消息的时候，都滚动到底部；

    
    constructor(){
        super();
        this.state = {
            msgList:[]
        }
        
    }

    componentDidMount(){
        var self = this;
        var urlparams = getUrlParams();
        self.account = urlparams.account;
        self.token = urlparams.token;
        self.toAccount = urlparams.toAccount;

        //适配手机
        document.documentElement.style.fontSize = 50*window.devicePixelRatio+"px";

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
                        self.scrollToBottom();
                    });
                }
            })
        });
    }

    sendText = ()=>{
        var self = this;
        if(!self.Input.value) return;
        //判断距离最后一条消息的记录是否超过5分钟，如果超过5分钟，则推一条时间
        var sortMsgList = this.state.msgList.sort(function(a,b){
            return a.time-b.time
        });

        if(Date.now()-sortMsgList[sortMsgList.length-1].time>60*5*1000){
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
                        self.Input.value = "";
                        self.scrollToBottom();
                    });
                }
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
}
