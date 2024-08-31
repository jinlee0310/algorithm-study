function solution(array, commands) {
    const answer=[]
    commands.forEach((command)=>{
        const [s,e,t]=command
        const arr=array.slice(s-1,e)
        // console.log(arr)
        arr.sort((a,b)=>a-b)
        answer.push(arr[t-1])
    })
    return answer
}