import React,{ Component } from 'react';
import Axios from "../../common/Axios";
import axios from "axios";
import Nav from "../../component/nav/nav";
import {timeStr,ifOpenByPhone} from "../../common/util";
import "./list.less";

export default class Index extends Component{
    render(){
        var {openByPhone} = this.state;
        return <div className="im-chat-user-list">
            <Nav 
                pathname={this.props.pathname} 
                longinUserInfo={this.state.longinUserInfo} 
                menu={this.state.menu}
                openByPhone={openByPhone}
            />
            <div className="user-list-box">
                <div className="user-list">
                    {this.state.userList.map((item,index)=>{
                        return <div 
                            className="item" 
                            key={item.id}
                            onClick={()=>{this.toChatPage(item)}}
                        >
                            {`${item.login_name}${item.name?"("+item.name+")":""}`}
                        </div>
                    })}
                </div>
            </div>
        </div>
    }
    static async getInitialProps({ req }) {
        //获取用户列表
        var userList =  await axios.post("/api/getUserList",{},{
            headers:{
                "Content-Type":"text/plain; charset=utf-8",
                "cookie":req.headers.cookie || ""
            }
        });

        //获取用户信息
        var info =  await axios.post("/api/getUserInfo",{},{
            headers:{
                "Content-Type":"text/plain; charset=utf-8",
                "cookie":req.headers.cookie || ""
            }
        });

        //获取菜单列表
        var menu =  await axios.post("/api/manage/getMenu",{
            admin:info.data.data.admin
        },{
            headers:{
                "Content-Type":"text/plain; charset=utf-8",
                "cookie":req.headers.cookie || ""
            }
        });

        var returnData = {
            pathname:req.url,  //获取当前路径用于选中菜单
            userInfo:info.data.data,
            menu:menu.data.data,
            userList:userList.data.data.data,
            openByPhone:ifOpenByPhone(req.headers["user-agent"])
        }

        if(info.data.code=="0"){
            returnData.ifLogin = true;
        }else if(info.data.code=="10001"){
            returnData.ifLogin = false;
        }

        return returnData
    }

    constructor(props){
        super(props);
        
        this.state = {
            ifLogin:props.ifLogin,
            longinUserInfo:props.userInfo,
            userList:props.userList,
            menu:props.menu,
            openByPhone:props.openByPhone
        }
    }

    componentDidMount(){
        console.log(this.state.userList)
    }

    toChatPage = (item)=>{
        console.log(item);
        window.location.href = `/im_chat/im_chat?toAccount=${item.accid}&loginName=${item.login_name}`
    }
}