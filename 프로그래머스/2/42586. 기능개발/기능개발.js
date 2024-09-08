function solution(progresses, speeds) {
    const days=[]
    for(let i=0;i<progresses.length;i++){
        const day=Math.ceil((100-progresses[i])/speeds[i])
        days.push(day)
    }
    // console.log(days)
    const answer=[]
    while(days.length){
        let cnt=1
        let day=days.shift()
        while(days[0]<=day){
            cnt++
            days.shift()
        }
        answer.push(cnt)
    }
    return answer
}