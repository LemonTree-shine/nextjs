import React,{ Component } from 'react';
import "./index.less";

export default class Index extends Component{
    render(){
        return <div className="electr-signatre">
            <div className="btn-box">
                <div className="sub-btn" onClick={this.cancleStep}>撤回上一步</div>
                <div className="sub-btn" onClick={this.clearCanvas}>清空</div>
                <div>
                    {this.colorArr.map((color,index)=>{
                        return <div 
                            className="color-box" 
                            key={index} 
                            style={{
                                backgroundColor:color
                            }}
                            onClick={()=>{
                                this.color = color
                            }}
                        ></div>
                    })}
                </div>
            </div>
            <div className="canvas-box" ref = {(el)=>{this.canvasBox = el}}>
                <canvas id="canvas" ref = {(el)=>{this.canvas = el}}></canvas>
            </div>
        </div>
    }

    constructor(){
        super();
        this.state = {
            
        }

        this.colorArr = ['red','green','blue','black']

        this.color = "black";

        this.imgArr = [];
    }

    componentDidMount(){
        this.initCanvas(); 
    }

    initCanvas = ()=>{
        this.canvas.width = this.canvasBox.offsetWidth;
        this.canvas.height = this.canvasBox.offsetHeight;
        var canvaxOffsetX = this.canvas.offsetLeft;
        var canvaxOffsetY = this.canvas.offsetTop;
        var ctx=this.canvas.getContext("2d");
        
        this.ctx = ctx;

        this.canvas.addEventListener("touchstart",(e)=>{
            var touchX = e.touches[0].pageX;
            var touchY = e.touches[0].pageY;
             ctx.strokeStyle = this.color;
             ctx.beginPath(); 
             ctx.lineWidth=5;
            //画笔起始点  
            ctx.moveTo(touchX-canvaxOffsetX, touchY-canvaxOffsetY); 
        });

        this.canvas.addEventListener("touchmove",(e)=>{
            var touchX = e.touches[0].pageX;
            var touchY = e.touches[0].pageY;
            //根据鼠标路径绘画  
            ctx.lineTo(touchX-canvaxOffsetX, touchY-canvaxOffsetY);
            //立即渲染  
            ctx.stroke();
        });

        this.canvas.addEventListener("touchend",(e)=>{
            let imgData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            this.imgArr.push(imgData);
            ctx.closePath();
        });
    }

    clearCanvas = ()=>{
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    cancleStep = ()=>{
        var ctx=this.canvas.getContext("2d");
        this.imgArr.pop();
        if(this.imgArr.length){
            ctx.putImageData(this.imgArr[this.imgArr.length-1],0,0);
        }else{
            this.clearCanvas();
        }
        
    }
    
}