"use strict";
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
        var delay = 3000; //ms
        //avec enchainement de "Promise":
        MyAsyncSequence.getAccountByNumAfterDelay(accountNumber, delay)
            .then(function (account) {
            console.log("account:" + JSON.stringify(account));
            return MyAsyncSequence.getUserByIdAfterDelay(account.ownerId, delay);
        }, function (err) { console.log("aff err account:" + err); })
            .then(function (user) { console.log("user (owner of account):" + JSON.stringify(user)); })
            .catch(function (err) { console.log("aff commun:" + err); });
    };
    return MyAsyncSequence;
}());
exports.MyAsyncSequence = MyAsyncSequence;
//petit test:
MyAsyncSequence.retreive_account_and_owner(0);
MyAsyncSequence.retreive_account_and_owner(8);
//# sourceMappingURL=seqAsync-promise.js.map