function solution(n, s, a, b, fares) {
    const board=Array.from({length:n},()=>new Array(n).fill(Infinity))
    
    for(let i=0;i<board.length;i++){
        board[i][i]=0
    }
    
    for(const fare of fares){
        const [s,e,f]=fare
        board[s-1][e-1]=f
        board[e-1][s-1]=f
    }
    
    for(let k = 0; k < n; k++) {
      for(let i = 0; i < n; i++) { // start
        for(let j = 0; j < n; j++) { // end
            board[i][j]=Math.min(board[i][j],board[i][k]+board[k][j])
        }
      }
    }
    let answer = board[s-1][a-1] + board[s-1][b-1]; // 처음부터 나눠서 출발

    for(let i = 0; i < n; i++) {
      const shortest = board[s-1][i] + board[i][a-1] + board[i][b-1]; //합승
      answer = Math.min(answer, shortest);
    }
    
    return answer
}
