"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var e_1, _a;
var tabVals = [1, -2, 3, -4, 5, -6];
console.log("tabVals=" + tabVals);
var tabValsPositives = [];
tabVals.forEach(function (v) { if (v >= 0)
    tabValsPositives.push(v); });
console.log("tabValsPositives=" + tabValsPositives);
var mapCarres = new Map();
for (var i = 0; i <= 5; i++) {
    mapCarres.set(i, i * i);
}
console.log("4 au carré vaut " + mapCarres.get(4));
try {
    for (var _b = __values(mapCarres.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
        console.log("le carre de " + k + " est " + v);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    }
    finally { if (e_1) throw e_1.error; }
}
//# sourceMappingURL=f3.js.map