function solution(answers) {
    const student1=[1,2,3,4,5]
    const student2=[2,1,2,3,2,4,2,5]
    const student3=[3,3,1,1,2,2,4,4,5,5]
    const corrects=[{id:1,cnt:0},{id:2,cnt:0},{id:3,cnt:0}]
    for(let i=0;i<answers.length;i++){
        if(answers[i]===student1[i%5]){
            corrects[0].cnt++
        }
        if(answers[i]===student2[i%8]){
            corrects[1].cnt++
        }
        if(answers[i]===student3[i%10]){
            corrects[2].cnt++
        }
    }
    // console.log(corrects)
    const max=Math.max(...corrects.map(v=>v.cnt))
    return corrects.filter(v=>v.cnt===max).map(v=>v.id)
    
}