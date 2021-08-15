const getMax = (arrTimesMinutes) => {
    const max = Math.max(...arrTimesMinutes);
    const index = arrTimesMinutes.indexOf(max)
    const filterMax = arrTimesMinutes.filter((_, i) => i === index);
    let restPercent = (filterMax / 100) * 103

    if (max < 2) {
        restPercent = (filterMax / 100) * 101
        return parseFloat(restPercent.toFixed(9))
    }
    return parseFloat(restPercent.toFixed(1))
}

export const getMin = (arrTimesMinutes) => {
    const smallest = Math.min(...arrTimesMinutes);
    const index = arrTimesMinutes.indexOf(smallest)
    const filterMin = arrTimesMinutes.filter((_, i) => i === index);
    let restPercent = (filterMin / 100) * 98
    if (smallest < 2) {
        restPercent = (filterMin / 100) * 101
        return parseFloat(restPercent.toFixed(9))
    }

    return parseFloat(restPercent.toFixed(1))
}

export default getMax;