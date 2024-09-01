const getMeasureCnt=(n)=>{
    let cnt=0
    for(let i=1;i<=n;i++){
        if(n%i===0) cnt++
    }
    return cnt
}

function solution(left, right) {
    let num=0;
    for(let i=left;i<=right;i++){
        if(getMeasureCnt(i)%2===0){
            num+=i
        }else{
            num-=i
        }
    }
    return num
}