function mrpt(n, k) {

    if (typeof n === 'object') {
        if (!n.eq(n.round(0, 2)) || k !== Math.floor(k) || n.lte(1)) return '오류';
        if (n.eq(2) || n.eq(3) || n.eq(5) || n.eq(7)) return '아마 소수일 것임.';
        if (n.mod(2).eq(0) || n.mod(3).eq(0) || n.mod(5).eq(0) || n.mod(7).eq(0)) return '합성수';

        var m = n.minus(1);
        var s = new Big(0);
        var i;
        var r;
        var a;
        var x;
        var y;

        while (m.mod(2).eq(0)) {
            m = m.div(2);
            s = s.plus(1);
        }

        WitnessLoop: for (i = 0; i < k; i++) {
            a = new Big(Math.random()).times(n - 3).plus(2).round(0, 2);
            if (n.mod(a).eq(0)) return '합성수';

            x = bigexpmod(a, m, n);

            if (x.eq(1) || x.eq(n.minus(1))) continue;

            for (r = new Big(0); r.lt(s); r = r.plus(1)) {
                x = x.times(x).mod(n);
                if (x.eq(1)) return '합성수';
                if (x.eq(n.minus(1))) continue WitnessLoop;
            }

            return '합성수';
        }

        return '아마 소수일 것임.';
    }

    if (n !== Math.floor(n) || k !== Math.floor(k) || n <= 1) return '오류';
    if (n === 2 || n === 3) return '아마 소수일 것임.';
    if (n % 2 === 0 || n % 3 === 0) return '합성수';

    var m = n - 1;
    var s = 0;
    var i;
    var r;
    var a;
    var x;
    var y;

    while (m % 2 === 0) {
        m /= 2;
        s++;
    }

    WitnessLoop: for (i = 0; i < k; i++) {
        a = Math.floor(Math.random() * (n - 3) + 2);
        if (n % a === 0) return '합성수';

        x = expmod(a, m, n);
        if (x === 1 || x === n - 1) continue;

        for (r = 0; r < s; r++) {
            x = x * x % n;
            if (x === 1) return '합성수';
            if (x === n - 1) continue WitnessLoop;
        }

        return '합성수';
    }

    return '아마 소수일 것임.';
}

function expmod(base, exp, mod) {
    if (exp === 0) return 1;
    if (exp % 2 === 0) return Math.pow(expmod(base, (exp / 2), mod), 2) % mod;
    else return (base * expmod(base, (exp - 1), mod)) % mod;
}

function bigexpmod(base, exp, mod) {
    if (exp.eq(0)) return new Big(1);
    if (exp.mod(2).eq(0)) return bigexpmod(base, (exp.div(2)), mod).pow(2).mod(mod);
    else return (base.times(bigexpmod(base, (exp.minus(1)), mod))).mod(mod);
}
