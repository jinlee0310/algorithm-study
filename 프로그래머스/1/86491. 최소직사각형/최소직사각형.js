function solution(sizes) {
    const widths=[]
    const heights=[]
    sizes.forEach(size=>{
        widths.push(Math.max(...size))
        heights.push(Math.min(...size))
    })
    widths.sort((a,b)=>b-a)
    heights.sort((a,b)=>b-a)
    return widths[0]*heights[0]
}