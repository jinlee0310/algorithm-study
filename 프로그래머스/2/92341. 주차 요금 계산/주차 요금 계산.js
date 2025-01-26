function solution(fees, records) {
  const [defaultTime, defaultFee, unitTime, unitFee] = fees;
  const s = {};
  const times = {};
  for (let record of records) {
    const [time, number, op] = record.split(" ");
    if (op === "OUT") {
      const [startH, startM] = s[number].split(":").map(Number);
      const [endH, endM] = time.split(":").map(Number);

      let hh, mm;

      if (startM > endM) {
        mm = endM - startM + 60;
        hh = endH - startH - 1;
      } else {
        mm = endM - startM;
        hh = endH - startH;
      }
      delete s[number];

      const totalMM = hh * 60 + mm;
      if (times[number]) {
        times[number] += totalMM;
      } else {
        times[number] = totalMM;
      }
    } else {
      s[number] = time;
    }
  }
  if (Object.keys(s).length > 0) {
    for (let key of Object.keys(s)) {
      const [startH, startM] = s[key].split(":").map(Number);

      const mm = 59 - startM;
      const hh = 23 - startH;

      const totalMM = hh * 60 + mm;
      if (times[key]) {
        times[key] += totalMM;
      } else {
        times[key] = totalMM;
      }
    }
  }

  const answer = [];
  for (let [number, totalMM] of Object.entries(times)) {
    let fee;
    if (defaultTime >= totalMM) fee = defaultFee;
    else {
      fee =
        defaultFee + Math.ceil((totalMM - defaultTime) / unitTime) * unitFee;
    }
    answer.push({ number, fee });
  }
  return answer.sort((a, b) => a.number - b.number).map((v) => v.fee);
}