const getMeasure=(n)=>{
    const measure=[]
    for(let i=1;i<=n;i++){
        if(n%i===0) measure.push(i)
    }
    return measure.length>=3
}

function solution(n) {
    let cnt=0
    for(let i=1;i<=n;i++){
        if(getMeasure(i)) cnt++
    }
    return cnt
}