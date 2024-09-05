const isPrime=(number)=>{
    if(number===1||number===0) return false
    for(let i=2;i<number;i++){
        if(number%i===0) return false
    }
    return true
}

const permutation=(arr,n)=>{
    if(n===1) return arr.map(v=>[v])
    
    const answer=[]
    
    arr.forEach((v,idx,arr)=>{
        const rest=[...arr.slice(0,idx),...arr.slice(idx+1)]
        const permutations=permutation(rest,n-1)
        const attach=permutations.map(permutation=>[...permutation,v])
        answer.push(...attach)
    })
    return answer
}

function solution(numbers) {
   const cnt=new Set()
    for(let i=1;i<=numbers.length;i++){
        const filteredNumber=permutation(numbers.split(''),i).map(v=>Number(v.join(''))).filter(v=>isPrime(v)).forEach(v=>cnt.add(v))
    }
    return cnt.size
}