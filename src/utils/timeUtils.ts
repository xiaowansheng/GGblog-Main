/**
 * 计算两个日期的间隔
 * @param start 
 * @param end 
 * @returns 
 */
export function intervalTime(start:Date,end:Date) {
    let startTime=Math.floor(start.getTime()/1000)
    let endTime=Math.floor(end.getTime()/1000)
    if(startTime>endTime){
        let temp=startTime
        startTime=endTime
        endTime=temp
    }
    let days=0,hours=0,minutes=0,seconds=0
    let interval=endTime-startTime //时间间隔，单位秒
    days=Math.floor(interval/(24*60*60))
    interval=interval-days*24*60*60
    hours=Math.floor(interval/(60*60))
    interval=interval-hours*60*60
    minutes=Math.floor(interval/60)
    interval=interval-minutes*60
    seconds=Math.floor(interval)
    return   days + "天 " + hours + "小时 "+minutes+"分钟"+seconds+"秒"
}
/**
 * 把毫秒数转换为时间间隔格式
 * @param interval
 * @returns 
 */
export function convertIntervalTime(interval:number) {
    interval=Math.floor(interval/1000)
    if(interval<0){
        interval=-interval
    }
    let days=0,hours=0,minutes=0,seconds=0
    days=Math.floor(interval/(24*60*60))
    interval=interval-days*24*60*60
    hours=Math.floor(interval/(60*60))
    interval=interval-hours*60*60
    minutes=Math.floor(interval/60)
    interval=interval-minutes*60
    seconds=Math.floor(interval)
    return   days + "天" + hours + "小时"+minutes+"分钟"+seconds+"秒"
}