function solution(arr){
    const stack=[]
    for(let n of arr){
        if(stack.length===0){
            stack.push(n)
        }else{
            if(stack[stack.length-1]!==n){
                stack.push(n)
            }
        }
    }
    return stack
}