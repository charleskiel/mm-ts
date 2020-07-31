"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
var moment = require("moment");
var Account = /** @class */ (function () {
    function Account() {
    }
    //static products = new Map<string,product>()
    Account.init = function () {
        console.log("Init Account");
    };
    Account.refresh = function () {
        console.log(moment(Date.now()).format() + ": Validating credientials");
        //validatetoken()
        //validateprincipals()
        //refreshAccessToken()
    };
    return Account;
}());
exports.Account = Account;
//# sourceMappingURL=account.js.map