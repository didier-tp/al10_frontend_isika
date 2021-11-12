"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractiveComputer = void 0;
//NB:  process.stdin n'est reconnu ici par typescript 
//que si dépendance "@types/node": "^14.11.2" dans package.json
var stdin = process.stdin;
var stdout = process.stdout;
var InteractiveComputer = /** @class */ (function () {
    function InteractiveComputer() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    InteractiveComputer.ask_ = function (question) {
        return new Promise(function (resolve, reject) {
            stdin.resume();
            stdout.write(question + ": ");
            stdin.once('data', function (data) {
                var dataAsString = data.toString().trim();
                if (dataAsString == "fin")
                    reject("end/reject");
                else
                    resolve(dataAsString);
            });
        });
    };
    InteractiveComputer.prototype.ask_and_compute_x_plus_y_fois_z = function () {
        var _this = this;
        //avec enchainement de "Promise":
        InteractiveComputer.ask_("x")
            .then(function (valX) { _this.x = Number(valX); return InteractiveComputer.ask_("y"); })
            .then(function (valY) {
            _this.y = Number(valY);
            var res = _this.x + _this.y;
            console.log("(x+y)=" + res);
            return InteractiveComputer.ask_("z");
        })
            .then(function (valZ) {
            _this.z = Number(valZ);
            var res = (_this.x + _this.y) * _this.z;
            console.log("(x+y)*z=" + res);
            process.exit();
        })
            .catch(function (err) { console.log(err); process.exit(); });
    };
    return InteractiveComputer;
}());
exports.InteractiveComputer = InteractiveComputer;
//petit test:
var interactiveComputer = new InteractiveComputer();
interactiveComputer.ask_and_compute_x_plus_y_fois_z();
//# sourceMappingURL=interactive-promise.js.map