"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TDA = void 0;
var api_1 = require("./api");
var TDA = /** @class */ (function () {
    function TDA() {
    }
    TDA.init = function () {
        console.log("Loading TDA");
        console.log("Authorising");
        api_1.Api.init();
    };
    return TDA;
}());
exports.TDA = TDA;
//# sourceMappingURL=tda.js.map