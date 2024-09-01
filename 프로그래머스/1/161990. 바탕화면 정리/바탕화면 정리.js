function solution(wallpaper) {
    // x값중 최소, 최대, y중 최소 최대 구하면 됨
    const graph=wallpaper.map(v=>v.split(''))
    const xCoords=[]
    const yCoords=[]
    for(let j=0;j<graph.length;j++){
        for(let i=0;i<graph[0].length;i++){
            if(graph[j][i]==='#'){
                xCoords.push(i)
                yCoords.push(j)
            }
        }
    }
    const xMin=Math.min(...xCoords)
    const xMax=Math.max(...xCoords)
    const yMin=Math.min(...yCoords)
    const yMax=Math.max(...yCoords)
    return [yMin,xMin,yMax+1,xMax+1]
}