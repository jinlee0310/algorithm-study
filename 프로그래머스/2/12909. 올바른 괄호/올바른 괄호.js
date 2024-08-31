function solution(s){
    const stack=[]
    for(let i=0;i<s.length;i++){
        if(stack.length===0){
            if(s[i]==='('){
                stack.push('(')
            }else{
                return false
            }
        }else{
            if(s[i]==='('){
                stack.push('(')
            }else{
                if(stack[stack.length-1]==='('){
                    stack.pop()
                }else{
                    return false
                }
            }
        }
    }
    if(stack.length!==0) return false
    
    return true;
}