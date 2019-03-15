import {Component} from "react";
import axios from "axios";
import Link from 'next/link';
import Nav from "../component/nav/nav";
import dynamic from 'next/dynamic';
import "../style/index.less";

// const Nav = dynamic(import('../component/nav/nav'),{
//     ssr:false
// })

export default class Index extends Component{
    render(){
        console.log(this.props.pathname);
        return <div>
            {/* 导航部分内容 */}
            <Nav pathname={this.props.pathname}/>
            <div className="common-content-box">
                <div className="common-main-content">
                    <i className="fa fa-car" style={{"color":"red"}}></i>
                </div>
                <div className="common-main-tool"></div>
            </div>
        </div>
    }

    //异步获取数据，在服务端执行
    static async getInitialProps({ req }) {
        
        return {
            pathname:req.url  //获取当前路径用于选中菜单
        }
    }

    componentDidMount(){
        // axios.post("/api/common/12",{name:"chenze"},{
        //     headers:{
        //         "Content-Type":"text/plain; charset=utf-8"
        //     }
        // }).then(function(res){
        //     console.log(res.data.message)
        // })
    }
}