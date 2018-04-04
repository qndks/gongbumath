function isPrime(num, result) {
     if (num % 1 !== 0 || 0 === num) return !1;
     var s = Math.sqrt(num);
     var k;
     for (k = 0; result[k] <= s; k++) if (num % result[k] === 0) return !1;
     return k !== num;
}
