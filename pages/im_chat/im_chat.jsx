import React,{ Component } from 'react';
import {connentIm} from "../../common/util";
import "./index.less";

export default class Index extends Component{
    render(){
        return <div className="c-chat-page">
            <div className="msgList">
                {this.state.msgList.sort(function(a,b){
                    return a.time-b.time
                }).map((item)=>{
                    if(item.flow==="out"){
                        return <div className="msg-item msg-out" key={item.idClient}>
                            <div className="text-pop">{item.text}</div>
                            <div className="msg-head"></div>
                        </div>
                    }else{
                        return <div className="msg-item msg-in" key={item.idClient}>
                            <div className="msg-head"></div>
                            <div className="text-pop">{item.text}</div>
                        </div>
                    }
                    
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
        //alert(this.Input.value)
        var self = this;
        if(!self.Input.value) return;
        
        this.nim.sendText({
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
