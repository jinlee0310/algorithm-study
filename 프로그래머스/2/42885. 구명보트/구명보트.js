function solution(people, limit) {
  people.sort((a,b)=>b-a)
  let cnt=0;
  let sIdx=0;
  let lIdx=people.length-1
  while(sIdx<=lIdx){
      if(people[sIdx]+people[lIdx]>limit){
          sIdx++
      }else{
          sIdx++
          lIdx--
      }
      cnt++
  }
  return cnt
}