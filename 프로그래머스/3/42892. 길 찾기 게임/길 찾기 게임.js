class BinaryTree{
    constructor(value,xPos){
        this.value=value;
        this.xPos=xPos;
        this.left=null;
        this.right=null;
    }
    
    insert(value,xPos){
        xPos<=this.xPos? this._toLeft(value,xPos):this._toRight(value,xPos)
    }
    
    _toLeft(value,xPos){
        this.left? this.left.insert(value,xPos):this.left=new BinaryTree(value,xPos)
    }
    
    _toRight(value,xPos){
        this.right? this.right.insert(value,xPos):this.right=new BinaryTree(value,xPos)
    }
}

const preorder=(bTree,arr)=>{
    if(bTree!==null){
        arr.push(bTree.value)
        preorder(bTree.left,arr)
        preorder(bTree.right,arr)
    }
}

const postorder=(bTree,arr)=>{
    if(bTree!==null){
        postorder(bTree.left,arr)
        postorder(bTree.right,arr)
        arr.push(bTree.value)
        
    }
}

function solution(nodeinfo) {
    const nodes=nodeinfo.map((node,idx)=>[idx+1,node[0],node[1]]).sort((a,b)=>b[2]-a[2])
    const bTree=new BinaryTree(nodes[0][0],nodes[0][1])
    for(let i=1;i<nodes.length;i++){
        bTree.insert(nodes[i][0],nodes[i][1])
    }
    const preorderArr=[]
    const postorderArr=[]
    preorder(bTree,preorderArr)
    postorder(bTree,postorderArr)
    return [preorderArr,postorderArr]
}