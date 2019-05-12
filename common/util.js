/**
 *  时间格式化
 * @param date
 * 
 * */
export function formatDate(date){
    var DATE = new Date(date);
    var year = DATE.getFullYear();
    var month = DATE.getMonth()+1;
    var day = DATE.getDate();
    var hour = DATE.getHours();
    var min = DATE.getMinutes();
    var seconds = DATE.getSeconds();

    return `${year}/${month}/${day} ${hour<10?"0"+hour:hour}:${min<10?"0"+min:min}:${seconds<10?"0"+seconds:seconds}`
}

/**
 * 时间转化成几分钟前，几小时前，几天前
 * @param date
 */

export function timeStr(date){
    var timeGoOn = new Date().getTime() - date;

    var min = timeGoOn/(1000*60);
    var hours = min/60;

    if(min<5){
        return "刚刚";
    }

    if(min<60){
        return parseInt(min)+"分钟前";
    }

    if(min>=60&&hours<24){
        return parseInt(hours)+"小时前";
    }

    if(hours>=24){
        return parseInt(hours/24)+"天前";
    }
}