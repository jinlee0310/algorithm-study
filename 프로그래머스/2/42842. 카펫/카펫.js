const getMeasure=(number)=>{
    const temp=[]
    const measure=[]
    for(let i=1;i<=number;i++){
        if(number%i===0) temp.push(i)
    }
    for(let i=0;i<Math.ceil(temp.length/2);i++){
        measure.push([temp[temp.length-1-i],temp[i]])
    }
    return measure
}

function solution(brown, yellow) {
    // 1. 약수 찾아서
    // 2. brown 개수랑 맞는지 확인
    const measures=getMeasure(yellow)
    // console.log(measures)
    let answer
    measures.forEach(measure=>{
        const[w,h]=measure
        if(brown===(w+2)*2+h*2){
            answer=[w+2,h+2]
        }
    })
    return answer
}