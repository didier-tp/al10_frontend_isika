"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyAsyncSequence = exports.User = exports.Account = void 0;
var Account = /** @class */ (function () {
    function Account(num, balance, ownerId) {
        if (num === void 0) { num = 0; }
        if (balance === void 0) { balance = 0; }
        if (ownerId === void 0) { ownerId = 0; }
        this.num = num;
        this.balance = balance;
        this.ownerId = ownerId;
    }
    return Account;
}());
exports.Account = Account;
;
var User = /** @class */ (function () {
    function User(userId, firstName, lastName) {
        if (userId === void 0) { userId = 0; }
        if (firstName === void 0) { firstName = "?"; }
        if (lastName === void 0) { lastName = "?"; }
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return User;
}());
exports.User = User;
;
var MyAsyncSequence = /** @class */ (function () {
    function MyAsyncSequence() {
    }
    MyAsyncSequence.getAccountByNum = function (num) {
        //simulation (no database , no dataset):
        return new Account(num, Math.random() * 1000 /* balance/solde*/, Math.round(Math.random() * 100) /* owerId / userId */);
    };
    MyAsyncSequence.getUserById = function (id) {
        //simulation (no database , no dataset)
        return new User(id, "firstName_" + id, "lastname" + id);
    };
    MyAsyncSequence.getAccountByNumAfterDelay = function (num, delay) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (num > 0)
                setTimeout(function () { resolve(_this.getAccountByNum(num)); }, delay);
            else
                setTimeout(function () { reject("invalid account number : " + num); }, delay);
        });
    };
    MyAsyncSequence.getUserByIdAfterDelay = function (id, delay) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (id > 0)
                setTimeout(function () { resolve(_this.getUserById(id)); }, delay);
            else
                setTimeout(function () { reject("invalid user id : " + id); }, delay);
        });
    };
    MyAsyncSequence.retreive_account_and_owner = function (accountNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var delay, account, user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delay = 1500;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, MyAsyncSequence.getAccountByNumAfterDelay(accountNumber, delay)];
                    case 2:
                        account = _a.sent();
                        console.log("account:" + JSON.stringify(account));
                        return [4 /*yield*/, MyAsyncSequence.getUserByIdAfterDelay(account.ownerId, delay)];
                    case 3:
                        user = _a.sent();
                        console.log("user (owner of account):" + JSON.stringify(user));
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.log("apres try/catch: " + err_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return MyAsyncSequence;
}());
exports.MyAsyncSequence = MyAsyncSequence;
//petit test:
MyAsyncSequence.retreive_account_and_owner(0);
MyAsyncSequence.retreive_account_and_owner(8);
console.log("suite immédiate sans attente...");
//# sourceMappingURL=seqAsync-await.js.map