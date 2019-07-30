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
                {this.props.openByPhone?null:<div className="nav-logo">
                    <img src="/static/image/logo5.png" alt=""/>
                </div>}
                <div className="nav-list">
                    <ul>
                        {this.menu.map((list)=>{
                            var CLASS = "";
                            if(path===list.url){
                                CLASS = "active";
                            }
                            return <li key={list.url}>
                                <a className={CLASS} href={list.url}>{list.name}</a>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="login-info">
                    {this.props.longinUserInfo.login_name?<a href="javascript:;">{this.props.longinUserInfo.login_name}</a>:<a href="/api/getGithubCode">登录</a>}
                    
                </div>
            </div>
        </div>
    }
    constructor(props){
        super(props);

        this.state = {
            pathname:""
        }

        this.menu = props.menu || [];

    }

    componentDidMount(){
        
    }
}