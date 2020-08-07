"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TDA = void 0;
var tdaapi_1 = require("./tdaapi");
var TDA = /** @class */ (function () {
    function TDA() {
    }
    TDA.init = function () {
        console.log("Loading TDA");
        console.log("Authorising");
        tdaapi_1.Api.init();
    };
    return TDA;
}());
exports.TDA = TDA;
//# sourceMappingURL=tda.js.map