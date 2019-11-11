import {Component} from "react";
import Axios from "../../common/Axios";
import axios from "axios";
import { Input,Button,Select  } from 'antd';
import "./report.less";
const { Option } = Select;
import * as echarts from 'echarts';

export default class Index extends Component{
    render(){
        return <div className="reportLog">
            <div className="form">
                <div className="item-group">
                    <label>选择月份：</label>
                    <div className="input-box">
                        <Select defaultValue="1" onChange={this.handleChange} style={{ width: "100%" }}>
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
                            <Option value="6">6</Option>
                            <Option value="7">7</Option>
                            <Option value="8">8</Option>
                            <Option value="9">9</Option>
                            <Option value="10">10</Option>
                            <Option value="11">11</Option>
                            <Option value="12">12</Option>
                        </Select>
                    </div>
                </div>
                <div className="item-group">
                    <label></label>
                    <div className="input-box">
                        <Button type="primary">查询</Button>
                    </div>
                    
                </div>
            </div>
            <div className="echart" id="echart" ref={(el)=>{this.echartInit = el}}></div>
        </div>
    }
    static async getInitialProps({ req }) {
        var reportData =  await axios.post("/api/getReportData",{},{
            headers:{
                "Content-Type":"text/plain; charset=utf-8",
                "cookie":req.headers.cookie || ""
            }
        });
        var returnData = {
            reportData:reportData.data
        }

        return returnData
    }
    constructor(){
        super();
        this.myEchart = "";
    }

    componentDidMount(){
        console.log(this.props.reportData.data.data);
        this.initEchartFn();
    }

    handleChange = (e)=>{
        console.log(e)
    }

    //初始化图标
    initEchartFn = ()=>{
        //im相关订单数据统计
        var im_chat_data = this.props.reportData.data.data.filter((item)=>{
            return item.environment==="expectant"
        });
        var month = new Date().getMonth()+1;
        var seriesData = [];
        seriesData.length = month;
        
        for(let i = 0;i<month;i++){
            seriesData[i] = 0;
        }

        im_chat_data.forEach((item)=>{

            var index = new Date(item.reportTime).getMonth();
            seriesData[index] = seriesData[index]+1;
        });

        this.myEchart = echarts.init(this.echartInit);
        
        
        var option = {
            legend: {
                data: ['下单次数'],
                align: 'left'
            },
            tooltip: {},
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
                type: 'category',
                name:"月份"
            },
            yAxis: {
                name:"数量"
            },
            series: [{
                name: '下单次数',
                symbolSize: 6,
                type: 'line',
                data: seriesData
            }]
        };

        this.myEchart.setOption(option);
    }
    
}