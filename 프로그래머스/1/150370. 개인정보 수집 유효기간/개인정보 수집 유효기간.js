
function solution(today, terms, privacies) {
    const [tYY,tMM,tDD]=today.split('.').map(v=>Number(v))
    const answer=[]
    
    for(const [idx,privacy] of privacies.entries()){
        // 1. 약관 찾는다
        // 2. date+약관을 한다
        // 3. 오늘 날짜보다 작은것을 고른다
        const [date,p]=privacy.split(' ')
        const term=terms.find(term=>{
            const [t,month]=term.split(' ')
            if(t===p) return term
        })
        const month=Number(term.split(' ')[1])
        
        const [yy,mm,dd]=date.split('.').map(v=>Number(v))
        let newMM=mm;
        let newYY=yy;
        let newDD=dd+(28*(month-1)+27);
        if(newDD>28){
            newMM+=Math.floor(newDD/28)
            newDD%=28
            if(newDD===0){
                newMM-=1
                newDD+=28
            }
        }
        if(newMM>12){
            newYY+=Math.floor(newMM/12)
            newMM%=12
            if(newMM===0){
                newYY-=1
                newMM+=12
            }
        }
        console.log(`${newYY}.${newMM}.${newDD}`)

        if(tYY>newYY){
            answer.push(idx+1)
        }else if(tYY<newYY){
            continue;
        }else{
            if(tMM>newMM){
                answer.push(idx+1)
            }else if(tMM<newMM){
                continue;
            }else{
                if(tDD>newDD){
                    answer.push(idx+1)
                }else {
                    continue
                }
            }
        }
    }
    return answer
}