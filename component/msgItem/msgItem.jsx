import React,{ Component } from 'react';
import {formatDate} from "../../common/util";

export default class MsgItem extends Component{
    render(){
        var item = this.props.item;
        var custom = JSON.parse(item.custom);
        var userInfo = this.props.userInfo || {};
        var accountInfo = this.props.accountInfo || {};
        if(item.flow==="out"&&!custom.type){
            return <div className="msg-item msg-out" key={item.idClient}>
                <div className="text-pop">{item.text}</div>
                <div className="msg-head">
                    <img className="user-header" src={userInfo.avatar_url} alt=""/>
                </div>
            </div>
        }
        if(item.flow==="in"&&!custom.type){
            return <div className="msg-item msg-in" key={item.idClient}>
                <div className="msg-head">
                    <img className="user-header" src={accountInfo.avatar_url} alt=""/>
                </div>
                <div className="text-pop">{item.text}</div>
            </div>
        }
        if(custom.type==="time"&&custom.time){
            return <div className="msg-item msg-time">
                {formatDate(custom.time)}
            </div>
        }

        if(custom.type==="system"){
            return <div className="msg-item msg-system">
                {custom.data.content}
            </div>
        }

        if(item.flow==="out"&&custom.type==="icon"){
            return <div className="msg-item msg-out" key={item.idClient}>
                <div className="text-pop">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={"#"+custom.data.content}></use>
                    </svg>
                </div>
                <div className="msg-head">
                    <img className="user-header" src={userInfo.avatar_url} alt=""/>
                </div>
            </div>
        }
        if(item.flow==="in"&&custom.type==="icon"){
            return <div className="msg-item msg-in" key={item.idClient}>
                <div className="msg-head">
                    <img className="user-header" src={accountInfo.avatar_url} alt=""/>
                </div>
                <div className="text-pop">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={"#"+custom.data.content}></use>
                    </svg>
                </div>
            </div>
        }

        return null
    }
}