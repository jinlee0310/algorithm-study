
function solution(arr) {
    let i=1
    while(true){
        const remain=arr.reduce((acc,cur)=>acc+(i%cur),0)
        if(remain===0) return i
        else{
            i++
        }
    }
}