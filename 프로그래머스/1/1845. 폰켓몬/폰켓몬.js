function solution(nums) {
    const s=new Set(nums)
    if(s.size<=nums.length/2) return s.size
    return nums.length/2
}