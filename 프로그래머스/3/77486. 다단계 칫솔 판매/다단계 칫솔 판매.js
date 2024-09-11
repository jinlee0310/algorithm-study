function solution(enroll, referral, seller, amount) {
    const namesTable={}
    enroll.forEach((name,idx)=>{
        namesTable[name]=idx+1
    })
    
    const root={}
    for(let i=0;i<enroll.length+1;i++){
        root[i]=i
    }
    referral.forEach((el,idx)=>{
        if(el==='-'){
            root[idx+1]=0
        }else{
            root[idx+1]=namesTable[el]
        }
    })
    
    const total=new Array(enroll.length+1).fill(0)
    
    const DFS=(node,money)=>{
        const nextMoney=Math.floor(money/10)
        total[node]+=(money-nextMoney)
        
        if(!node||!nextMoney) return;
        
        const nextNode=root[node]
        DFS(nextNode,nextMoney)
    }
    
    seller.forEach((node,idx)=>{
        const money=amount[idx]
        DFS(namesTable[node],money*100)
    })
    
    return total.slice(1)
}