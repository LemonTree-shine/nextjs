import {Component} from "react";
import "./socket.less";
import io from 'socket.io-client';

export default class Index extends Component{
    render(){
        return <div className="socket_page">
            <button onClick={this.runCode}>运行</button>
            <div className="layout_page">
                <pre 
                    className="code_wrap" 
                    contentEditable={true}
                    ref={(el)=>{this.editWrap = el}}
                    onInput={()=>{
                        this.socket.emit('message',{
                            type:"codeContent",
                            content:this.editWrap.innerText
                        });
                    }}
                ></pre>
                <div 
                    className="code_wrap"
                    ref={(el)=>{
                        this.resultWrap = el;
                    }}
                ></div>
            </div>
            
        </div>
    }

    socket = null;
    
    componentDidMount(){
        this.initTab();
        this.initSocket();
    }

    //运行代码
    runCode = ()=>{
        let self = this;
        let resultStr = "";
        let runCode = `function main(){
            try{
                ${this.editWrap.innerText}
            }catch(err){
                self.resultWrap.innerHTML=err.message;
                resultStr = err.message;
            }
        };
        let returnValue = main();
        //如果有错误信息了就停止执行
        if(!resultStr){
            if(returnValue){
                resultStr = self.objFunction(returnValue);
                self.resultWrap.innerHTML=self.objFunction(returnValue);
            }else{
                resultStr = "缺少return的值";
                self.resultWrap.innerHTML="缺少return的值";
            }
        }
        `;
        try{
            eval(runCode);
        }catch(err){
            resultStr=err.message;
            self.resultWrap.innerHTML=err.message;
            console.error(err);
        } 
        this.socket.emit('message',{
            type:"result",
            content:resultStr
        });
    }

    //处理数据类型
    objFunction = (obj)=>{
        if(typeof obj === "object"){
            return JSON.stringify(obj);
        }else{
            return obj;
        }
    }

    //处理tab按键问题
    initTab = ()=>{
        document.addEventListener("keydown",(e)=>{
            if(e.keyCode===9){
                e.preventDefault();
                let range = e.view.getSelection().getRangeAt(0);
                let offset = range.startOffset;

                //判断range的类型
                if(range.commonAncestorContainer.localName==="pre" || range.commonAncestorContainer.localName==="div"){
                    let innerText = range.commonAncestorContainer.innerText;
                    let before = "";
                    let after = "";
                    if(innerText){
                        before = innerText.substr(0,offset);
                        after = innerText.substr(offset);
                    }
                    range.commonAncestorContainer.innerText = before+"    "+after
                    range.setStart(range.startContainer.childNodes[0], offset+4);
                }else{
                    let nodeValue = range.commonAncestorContainer.nodeValue;
                    let before = " ";
                    let after = " ";
                    if(nodeValue){
                        before = nodeValue.substr(0,offset);
                        after = nodeValue.substr(offset);
                    }
                    range.commonAncestorContainer.nodeValue = before+"    "+after
                    range.setStart(range.startContainer, offset+4);
                }
            }
        },false)
    }
    //初始化socket
    initSocket = ()=>{
        this.socket = io();
        //连接成功时触发
        this.socket.on('connect', function () {
            //console.log('连接成功');
        });
    
        //连接断开时触发
        this.socket.on('disconnect', function () {
            //console.log('连接断开');
        });
    
        //收到消息时触发
        this.socket.on('message',(data)=>{
            this.socketEventFn(data);
        });
    }

    //处理广播消息
    socketEventFn = (data)=>{
        switch(data.type){
            case "codeContent":
                //发送的输入框的类型
                this.editWrap.innerHTML=this.objFunction(data.content);
                break;
            case "result":
                console.log(data);
                this.resultWrap.innerHTML=this.objFunction(data.content);
                break;
            default:
                break;
        }
    }

}