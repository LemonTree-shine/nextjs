import React,{ Component } from 'react';
import "./iconList.less"

export default class Index extends Component{
    render(){
        return <div className={this.props.showFlag?"c-icon-font-face c-icon-font-face-expend":"c-icon-font-face"}>
            <div className="icon-content">
                {this.props.iconList.map((link)=>{
                    return <div className="icon-item" onClick={()=>{this.clickIconFont(link)}}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={"#"+link}></use>
                        </svg>
                    </div>
                    
                })}
            </div>
        </div>
    }

    clickIconFont = (link)=>{
        this.props.clickIconFont&&this.props.clickIconFont(link);
    }
}