const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim();

if(Number(input)===0){
    console.log('YONSEI')
}else{
    console.log('Leading the Way to the Future')
}