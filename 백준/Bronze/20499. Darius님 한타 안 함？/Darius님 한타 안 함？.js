const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim()

const [k,d,a]=input.split('/').map(Number)

if(k+a<d||d===0) console.log('hasu')
else console.log('gosu')