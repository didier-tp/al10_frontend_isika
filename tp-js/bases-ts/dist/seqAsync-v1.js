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
    MyAsyncSequence.getAccountByNumAfterDelayWithCb = function (num, delay, cbWithAccount, cbWithError) {
        var _this = this;
        if (num > 0)
            setTimeout(function () { cbWithAccount(_this.getAccountByNum(num)); }, delay);
        else
            setTimeout(function () { cbWithError("invalid account number : " + num); }, delay);
    };
    MyAsyncSequence.getUserByIdAfterDelayWithCb = function (id, delay, cbWithUser, cbWithError) {
        var _this = this;
        if (id > 0)
            setTimeout(function () { cbWithUser(_this.getUserById(id)); }, delay);
        else
            setTimeout(function () { cbWithError("invalid user id : " + id); }, delay);
    };
    MyAsyncSequence.retreive_account_and_owner = function (accountNumber) {
        var delay = 5000; //ms
        //utilisation chaînée avec callbacks imbriquées:
        MyAsyncSequence.getAccountByNumAfterDelayWithCb(accountNumber, delay, function (account) {
            console.log("account:" + JSON.stringify(account));
            MyAsyncSequence.getUserByIdAfterDelayWithCb(account.ownerId, delay, function (user) { console.log("user (owner of account):" + JSON.stringify(user)); }, function (errUser) { console.log(errUser); });
        }, function (errAccount) { console.log(errAccount); });
    };
    return MyAsyncSequence;
}());
exports.MyAsyncSequence = MyAsyncSequence;
//petit test:
MyAsyncSequence.retreive_account_and_owner(0);
MyAsyncSequence.retreive_account_and_owner(8);
//# sourceMappingURL=seqAsync-v1.js.map