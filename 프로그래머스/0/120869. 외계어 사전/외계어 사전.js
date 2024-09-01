function solution(spell, dic) {
    for(const word of dic){
        let cnt=0
        for(const s of spell){
            if(word.includes(s)){
                cnt++
            }
        }
        if(cnt===spell.length) return 1
    }
    return 2
}