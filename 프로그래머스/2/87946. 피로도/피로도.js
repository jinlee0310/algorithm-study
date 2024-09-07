const permutation=(arr,n)=>{
    if(n===1) return arr.map(v=>[v])
    const answer=[]
    
    arr.forEach((v,idx,arr)=>{
        const rest=[...arr.slice(0,idx),...arr.slice(idx+1)]
        const permutations=permutation(rest,n-1)
        const attach=permutations.map(permutation=>([...permutation,v]))
        answer.push(...attach)
    })
    return answer
}

function solution(k, dungeons) {
    const permutations=permutation(dungeons,dungeons.length)
    // console.log(permutations)
    const answer=[]
    permutations.forEach(permutation=>{
        let cnt=0
        let fatigue=k
        for(const p of permutation){
            const [minimal,consumption]=p
            if(fatigue>=minimal){
                fatigue-=consumption
                cnt++
            }else break;
        }
        answer.push(cnt)
    })
    return Math.max(...answer)
}