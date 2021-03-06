const convertToDate = (unixTime) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(unixTime * 1000)
    const year = date.getFullYear()
    const month = months[date.getMonth()];
    const dayOfWeek = date.getDate()
    const hours = date.getHours()
    const minutes = "0" + date.getMinutes();
    const formattedTime = Math.floor((year / 100) + 1) + ':' + month + ':' + dayOfWeek + ':' + hours + ':' + minutes.substr(-2)
    return formattedTime;
}

export default convertToDate;