"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleAsync = void 0;
var SimpleAsync = /** @class */ (function () {
    function SimpleAsync() {
    }
    SimpleAsync.prototype.getUppercaseDataAfterDelay = function (data, delay) {
        return new Promise(function (resolve) {
            setTimeout(function () { resolve(data.toUpperCase()); }, delay);
        });
    };
    return SimpleAsync;
}());
exports.SimpleAsync = SimpleAsync;
//# sourceMappingURL=simpleAsync.js.map