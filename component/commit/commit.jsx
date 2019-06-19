import {Component} from "react";
import axios from "axios";
import Link from 'next/link';
import {formatDate} from "../../common/util";
import "./commit.less";

export default class Commit extends Component{
    render(){
        var {commitList} = this.state;
        return <div className="c-commit-box">
            <div className="title">评论</div>
            <div className="commit-list-box">
                {commitList.map((list,index)=>{
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
                                <span>{formatDate(list.time)}&nbsp;&nbsp;&nbsp;</span>
                                <div className="replay-btn" onClick={()=>{this.replay(list)}}>
                                    <i className="fa fa-clone"></i>&nbsp;回复
                                </div>
                            </div>
                            {/* <div className="list commit-child clearBoth">
                                <div className="title"></div>
                                <div className="info">
                                    <div className="name">西瓜太郎</div>
                                    <div className="content">西瓜太郎西瓜太郎西瓜太郎西瓜太郎西瓜太郎西瓜太郎西瓜太郎西瓜太郎西瓜太郎西瓜太郎西瓜太郎西瓜太郎西瓜太郎西瓜太郎西瓜太郎西瓜太郎</div>
                                    <div className="replay-answer">
                                        <div className="replay-btn" onClick={()=>{this.replay(list)}}>
                                            <i className="fa fa-clone"></i>&nbsp;回复
                                        </div>
                                    </div>
                                </div>
                            </div> */}
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
            commitList:props.commitList||[],
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            commitList:nextProps.commitList||[]
        });
    }

    replay = (list)=>{
        alert(list.id)
    }
    submit = ()=>{
        var content = this.textarea.value;
        this.props.submit&&this.props.submit(content,this);
    }
}   
