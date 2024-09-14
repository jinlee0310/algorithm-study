function solution(s) {
    const numArr=s.split(' ').map(v=>Number(v))
    const maxNumber=Math.max(...numArr)
    const minNumber=Math.min(...numArr)
    return `${minNumber} ${maxNumber}`
}