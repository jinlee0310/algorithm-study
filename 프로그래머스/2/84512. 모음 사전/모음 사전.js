const permutation=(arr,n)=>{
    if(n===1) return arr.map(v=>[v])
    
    const answer=[]
    arr.forEach((v,idx,arr)=>{
        const permutations=permutation(arr,n-1)
        const attach=permutations.map(permutation=>([...permutation,v]))
        answer.push(...attach)
    })
    
    return answer
}

function solution(word) {
    let answer = 0;
    // 순서 있는 중복 순열
    const wordArr=[]
    for(let i=1;i<=5;i++){
        const permutations=permutation(['A','E','I','O','U'],i)
        wordArr.push(...permutations.map(v=>v.join('')))
    }
    wordArr.sort()
    return wordArr.findIndex(v=>v===word)+1;
}