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