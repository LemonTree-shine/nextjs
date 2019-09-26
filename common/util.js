/**
 *  时间格式化
 * @param date
 * 
 * */
export function formatDate(date) {
    var DATE = new Date(date);
    var year = DATE.getFullYear();
    var month = DATE.getMonth() + 1;
    var day = DATE.getDate();
    var hour = DATE.getHours();
    var min = DATE.getMinutes();
    var seconds = DATE.getSeconds();

    return `${year}/${month}/${day} ${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min}:${seconds < 10 ? "0" + seconds : seconds}`
}

/**
 * 时间转化成几分钟前，几小时前，几天前
 * @param date
 */

export function timeStr(date) {
    var timeGoOn = new Date().getTime() - new Date(date).getTime();

    var min = timeGoOn / (1000 * 60);
    var hours = min / 60;

    if (min < 5) {
        return "刚刚";
    }

    if (min < 60) {
        return parseInt(min) + "分钟前";
    }

    if (min >= 60 && hours < 24) {
        return parseInt(hours) + "小时前";
    }

    if (hours >= 24) {
        return parseInt(hours / 24) + "天前";
    }
}

/**
 * 重组数组
 * @param array
 */

export function resetArr(arr) {
    var ARR = arr || [];

    var rootReplyList = [];
    //找出所有根留言
    rootReplyList = ARR.filter((list) => {
        return list.Pid == false;
    });

    //循环所有数组
    ARR.forEach((list, index) => {
        if (list.Pid) {
            rootReplyList.forEach((rList) => {
                if (rList.id == list.Pid) {
                    if (!rList.childList) {
                        rList.childList = [];
                    }
                    rList.childList.push(list);
                }
            })
        }
    });
    return rootReplyList;
}


/**
 * 判断是否实在手机上打开的地址
 * @param url
 */

export function ifOpenByPhone(ua) {
    var UA = ua || navigator.userAgent;
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(UA)) {
        return true;
    }
    return false;
}

/*
*创建im实例
*/
export function connentIm() {
    var self = this;
    return new Promise(function (resolve) {
        self.nim = SDK.NIM.getInstance({
            appKey: "fd0a8cee8e5f33678eb327a7d592cfe7",
            account: self.account,
            token: self.token,
            onconnect: function () {
                console.log('SDK 连接成功');
                resolve();
            },
            ondisconnect: function (obj) {
                console.log('SDK 连接断开', obj)
            },
            onerror: function (error) {
                console.log('SDK 连接失败', error)
            },
            onmsg: function (msg) {
                console.log(msg);
                var { msgList } = self.state;
                msgList.push(msg);

                self.setState({
                    msgList: msgList
                }, () => {
                    self.scrollToBottom();
                });
            },
            onofflinemsgs: function (obj) {
                console.log(obj)
            },
            onroamingmsgs: function (obj) {
                console.log(obj)
            },
        })
    });
}
/**
 * 
 * @param {String} href url地址
 */
export function getUrlParams(href){
    var search = window.location.href.split("?")[1];
    var urlParams = {};
    if(href){
        search = href.split("?")[1];
    }

    if(search){
        var arr = search.split("&");
        arr.forEach(function(item){
            var curArr = item.split("=");
            urlParams[curArr[0]] = curArr[1];
        })
    }

    return urlParams;
}

