import {Component} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Link from 'next/link';
import {formatDate,resetArr,timeStr} from "../../common/util";
import { Button, notification } from 'antd';
import "./commit.less";

export default class Commit extends Component{
    render(){
        var {commitList} = this.state;
        var newCommitList = resetArr(commitList);
        //resetArr(commitList);
        return <div className="c-commit-box">
            <div className="title">评论</div>
            <div className="commit-list-box">
                {newCommitList.map((list,index)=>{
                    return <div className="list clearBoth" key={index}>
                        <div className="title">
                            <img src={list.header_url} alt=""/>
                        </div>
                        <div className="info">
                            <div className="name">
                                {list.login_name}
                            </div>
                            <div className="content">{list.content}</div>
                            <div className="replay-answer">
                                <span style={{float:"left"}}>{timeStr(list.time)}&nbsp;&nbsp;&nbsp;</span>
                                <div className="replay-btn">
                                    <i className="fa fa-clone"></i>&nbsp;<span className="default-font-color" onClick={(e)=>{this.replay(list,e,list.id)}}>回复</span>
                                </div>
                            </div>
                            {list.childList&&list.childList.map((child,cindex)=>{
                                return <div className="list commit-child clearBoth" key={cindex}>
                                    <div className="title">
                                        <img src={child.header_url} alt=""/>
                                    </div>
                                    <div className="info">
                                        <div className="name">{child.login_name}</div>
                                        <div className="content"><span>回复了</span><span className="default-font-color">{child.Plogin_name}：</span>{child.content}</div>
                                        <div className="replay-answer">
                                            <span style={{float:"left"}}>{timeStr(child.time)}&nbsp;&nbsp;&nbsp;</span>
                                            <div className="replay-btn">
                                                <i className="fa fa-clone"></i>&nbsp;<span className="default-font-color" onClick={(e)=>{this.replay(child,e,list.id)}}>回复</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                            
                        </div>
                    </div>
                })} 
            </div>
            <div className="textArea-box clearBoth">
                <textarea className="textarea" ref={(el)=>{this.textarea = el}}></textarea>
                <button className="default-btn submit-btn" onClick={this.submit}>提交</button>
            </div>
        </div>
    }
    constructor(props){
        super(props);
        this.state = {
            commitList:props.commitList||[],  //评论的列表
        }

        this.currentReplyData = {};   //获取当前选中的评论
        this.pid = "";
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            commitList:nextProps.commitList||[]
        });
    }

    replay = (list,e,pid)=>{
        var replyBox = document.querySelector(".c-create-replt-box");

        //判断回复框是否存在
        if(replyBox){
            replyBox.remove();
        }

        var parentNode = e.target.parentNode.parentNode;
        var dom = document.createElement('div');

        dom.className = "c-create-replt-box";

        ReactDOM.render(<ReplyBox sureReply={this.sureReply}/>,dom);
        parentNode.appendChild(dom);

        //点击回复的时候存储这条评论，做关联
        this.currentReplyData = list;
        this.pid = pid;
    }
    submit = ()=>{
        var content = this.textarea.value;
        this.props.submit&&this.props.submit(content,this);
    }

    sureReply = (value)=>{
        if(!value){
            notification.error({
                message: '提示',
                description: '回复内容不能为空！',
                duration: 1,
            });
            return;
        }

        var replyBox = document.querySelector(".c-create-replt-box");

        //判断回复框是否存在
        if(replyBox){
            replyBox.remove();
        }

        this.props.replyComment&&this.props.replyComment(this.currentReplyData,value,this.pid);
    }
}  


export class ReplyBox extends Component{
    render(){
        return <div className="c-ReplyBox clearBoth">
            <textarea className="textarea" ref={(el)=>{this.textarea = el}}></textarea>
            <button className="default-btn submit-btn" onClick={this.sureReply}>确认回复</button>
            <button className="default-btn cancle-btn submit-btn mr10" onClick={this.cancleReply}>取消回复</button>
        </div>
    }
    sureReply = ()=>{
        //return
        var VALUE = this.textarea.value;
        this.props.sureReply&&this.props.sureReply(VALUE)
    }
    componentDidMount(){
        setTimeout(()=>{
            this.textarea.focus();
        },0)
    }
    cancleReply = ()=>{
        var replyBox = document.querySelector(".c-create-replt-box");

        //判断回复框是否存在
        if(replyBox){
            replyBox.remove();
        }
    }
}
