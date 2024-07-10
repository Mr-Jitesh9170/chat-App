export const getTime = (timeStamp) => {
    let currentDate = new Date(timeStamp)
    let minutes = currentDate.getMinutes();
    let hours = currentDate.getHours();
    if (hours > 12) {
        hours = hours % 12;
    }
    minutes = minutes < 10 ? `0${minutes}` : minutes
    let time = hours < 10 ? `0${hours}:${minutes}` : `${hours}:${minutes}`
    time = currentDate.getHours() > 12 ? time + ' PM' : time + ' AM'
    return time
}
