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
                    <label>环境：</label>
                    <div className="input-box">
                        <Select defaultValue="expectant" onChange={this.handleChange} style={{ width: "100%" }}>
                            <Option value="expectant">预发</Option>
                            <Option value="production">生产</Option>
                        </Select>
                    </div>
                </div>
                <div className="item-group">
                    <label>订单类型：</label>
                    <div className="input-box">
                        <Select defaultValue="all" onChange={this.changeType} style={{ width: "100%" }}>
                            <Option value="all">全部</Option>
                            <Option value="PHOTO_TEXT">专家问诊</Option>
                            <Option value="TRIAGE_CONSULT">免费咨询</Option>
                            <Option value="REVISIT">线上复诊</Option>
                            <Option value="OLT">线上诊疗</Option>
                            <Option value="INTERNET_TREATMENT">互联网诊疗</Option>
                            <Option value="INTERPRET_REPORT">报告单解读</Option>
                        </Select>
                    </div>
                </div>
                {/* <div className="item-group">
                    <label></label>
                    <div className="input-box">
                        <Button type="primary">查询</Button>
                    </div>
                </div> */}
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
        this.searchData = {}
    }

    componentDidMount(){
        this.myEchart = echarts.init(this.echartInit);
        this.initEchartFn();
    }

    handleChange = (e)=>{
        this.searchData.environment = e;

        var option = this.resetData(this.searchData);
        this.myEchart.setOption(option);
    }

    changeType = (consType)=>{
        this.searchData.consType = consType;

        var option = this.resetData(this.searchData);
        this.myEchart.setOption(option);
    }

    //初始化图标
    initEchartFn = ()=>{
        var option = this.resetData({});
        this.myEchart.setOption(option);
    }

    resetData = (searchData)=>{
        //im相关订单数据统计
        var im_chat_data = this.props.reportData.data.data.filter((item)=>{
            var ENV = searchData.environment || "expectant";
            var consType = searchData.consType;
            if(!consType||consType==="all"){
                return item.environment===ENV;
            }else{
                return item.environment===ENV&&item.conType===consType;
            }
        });
        var month = new Date().getMonth()+1;
        var seriesData = [];
        seriesData.length = month;
        
        for(let i = 0;i<12;i++){
            seriesData[i] = 0;
        }

        im_chat_data.forEach((item)=>{

            var index = new Date(item.reportTime).getMonth();
            seriesData[index] = seriesData[index]+1;
        });

        var option = {
            legend: {
                data: ['im所有问诊下单次数'],
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
                name: 'im所有问诊下单次数',
                symbolSize: 6,
                type: 'line',
                data: seriesData
            }]
        };

        return option;
    }
    
}