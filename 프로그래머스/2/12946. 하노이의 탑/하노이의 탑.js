function solution(n) {
    const answer=[]
    
    const hanoi=(start,end,mid,n)=>{
        if(n===1) {
            answer.push([start,end])
            return
        }
        hanoi(start,mid,end,n-1)
        answer.push([start,end])
        hanoi(mid,end,start,n-1)
    }
    hanoi(1,3,2,n)
    
    return answer;
}