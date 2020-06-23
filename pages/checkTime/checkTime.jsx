import React,{ Component } from 'react';
import "./checkTime.less";

export default class ChecTime extends Component{
    render(){
        let {holidayList,nowTime} = this.state;

        return <div className="check-time-page">
            {this.getCurrentTime().map((item,index)=>{
                let times = new Date(item.time).getTime()-nowTime;
                if(times<0){
                    return null
                }
                let hours = parseInt(times/1000/60/60);
                let minites = parseInt((times-hours*60*60*1000)/1000/60);
                let seconds = parseInt((times-hours*60*60*1000-minites*60*1000)/1000);
                let minSeconds = times-hours*60*60*1000-minites*60*1000-seconds*1000
                return <div className="litm-list" key={index}>
                    <div>{item.name}倒计时</div>
                    <div>
                        <div className="time-box">{hours}</div>:<div className="time-box">{minites}</div>:<div className="time-box">{seconds}</div>:<div className="time-box">{minSeconds}</div>
                    </div>
                </div>
            })}
        </div>
    }
    constructor(){
        super();
        this.state = {
            holidayList:[{
                name:"清明",
                time:"2020-04-04 00:00:00"
            },{
                name:"五一",
                time:"2020-04-30 17:30:00"
            },{
                name:"青年",
                time:"2020-05-04 00:00:00"
            },{
                name:"端午节",
                time:"2020-06-24 15:30:00"
            },{
                name:"八一建军节",
                time:"2020-08-01 00:00:00"
            },{
                name:"七夕",
                time:"2020-08-25 00:00:00"
            },{
                name:"抗日战争纪念日",
                time:"2020-09-03 00:00:00"
            },{
                name:"国庆·中秋",
                time:"2020-10-01 00:00:00"
            },{
                name:"重阳节",
                time:"2020-10-25 00:00:00"
            },{
                name:"冬至",
                time:"2020-12-21 00:00:00"
            },{
                name:"圣诞",
                time:"2020-12-25 00:00:00"
            },{
                name:"元旦",
                time:"2021-01-01 00:00:00"
            },{
                name:"除夕",
                time:"2021-02-11 00:00:00"
            }],
            nowTime:Date.now()
        }
    }

    componentDidMount(){
        this.cicle();
    }
    cicle = ()=>{
        setTimeout(()=>{
            this.setState({
                nowTime:Date.now()
            },()=>{
                this.cicle()
            });
        },10)
    }

    getCurrentTime = ()=>{
        let {holidayList,nowTime} = this.state;
        let currentTime = [];
        holidayList.forEach((item)=>{
            if(new Date(item.time).getTime()-nowTime>0&&currentTime.length===0){
                currentTime = [item]
            }
        });

        return currentTime;
    }
}