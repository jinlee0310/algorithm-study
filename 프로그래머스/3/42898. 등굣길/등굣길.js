function solution(m, n, puddles) {
    const dp=Array.from({length:n+1},()=>new Array(m+1).fill(1))
    puddles.forEach(puddle=>{
        const [x,y]=puddle
        dp[y][x]=0
        // puddle이 가장자리면 뒤에 전부 0으로 처리
        if(x===1){
            for(let i=y;i<=n;i++){
                dp[i][1]=0
            }
        }
        if(y===1){
            for(let j=x;j<=m;j++){
                dp[1][j]=0
            }
        }

    })
    // console.log(dp)
    for(let i=2;i<=n;i++){
        for(let j=2;j<=m;j++){
            if(dp[i][j]!==0){
                dp[i][j]=(dp[i-1][j]%1000000007)+(dp[i][j-1]%1000000007)
            }
        }
    }
    return dp[n][m]%1000000007
}