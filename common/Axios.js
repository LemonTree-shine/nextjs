import axios from "axios";
import {notification } from 'antd';

export default function Axios(option){
    return new Promise(function(resolve){
        axios.post(option.url,option.data,{
            headers:{
                "Content-Type":"text/plain; charset=utf-8",
                "withCredentials":true
            }
        }).then((res)=>{
            if(res.data.code!=="0"){
                notification.error({
                    message: '提示',
                    description: res.data.message,
                    duration: 1,
                });
            }else{
                resolve(res.data)
            }
            
        });
    });
}

