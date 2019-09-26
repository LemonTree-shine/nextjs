import React,{ Component } from 'react';
import {formatDate} from "../../common/util";

export default class MsgItem extends Component{
    render(){
        var item = this.props.item;
        var custom = JSON.parse(item.custom);
        if(item.flow==="out"&&!custom.type){
            return <div className="msg-item msg-out" key={item.idClient}>
                <div className="text-pop">{item.text}</div>
                <div className="msg-head"></div>
            </div>
        }
        if(item.flow==="in"&&!custom.type){
            return <div className="msg-item msg-in" key={item.idClient}>
                <div className="msg-head"></div>
                <div className="text-pop">{item.text}</div>
            </div>
        }
        if(custom.type==="time"&&custom.time){
            return <div className="msg-item msg-time">
                {formatDate(custom.time)}
            </div>
        }

        return null
    }
}