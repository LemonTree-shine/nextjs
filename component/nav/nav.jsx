import {Component} from "react";
import axios from "axios";
import Link from 'next/link';
import "./nav.less"


export default class Nav extends Component{
    render(){
        var path = "";
        path = this.props.pathname
        return <div className="common-nav">
            <div className="nav-content">
                <div className="nav-logo"></div>
                <div className="nav-list">
                    <ul>
                        {this.menu.map((list)=>{
                            var CLASS = "";
                            if(path===list.url){
                                CLASS = "active";
                            }
                            return <li key={list.url}>
                                <a className={CLASS} href={list.url}>{list.value}</a>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    }
    constructor(){
        super();
        this.state = {
            pathname:""
        }
        this.menu = [{
            value:"首页",
            url:"/"
        },{
            value:"动态",
            url:"/activities"
        },{
            value:"话题",
            url:"/topics"
        },{
            value:"小册",
            url:"/books"
        },{
            value:"活动",
            url:"/events"
        }];

    }

    componentDidMount(){
        
    }
}