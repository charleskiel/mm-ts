"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coinbase = void 0;
var coinbaseSocket_1 = require("./coinbaseSocket");
var coinbaseapi_1 = require("./coinbaseapi");
var Coinbase = /** @class */ (function () {
    function Coinbase() {
    }
    Coinbase.doHeartbeat = function (data) {
        // Coinbase.products[data.product_id] = {...Coinbase.products[data.product_id], ...data}
        //console.log("heartbeat", data)
        // console.log("heartbeat", Coinbase.products)
    };
    Coinbase.doTicker = function (data) {
        Coinbase.products.set(data.product_id, __assign(__assign({}, Coinbase.products.get(data.product_id)), data));
        //console.log("ticker", data)
        //console.log(Coinbase.products.get(data.product_id))
    };
    Coinbase.products = new Map();
    Coinbase.init = function () {
        console.log("Init Coinbase");
        coinbaseapi_1.Api.products().then(function (products) {
            //Coinbase.products = products
            for (var index = 0; index < products.length; index++) {
                var element = products[index];
                //console.log(element)
                Coinbase.products.set(products[index].id, products[index]);
            }
            console.log(Coinbase.products);
            coinbaseSocket_1.CoinbaseSocket.connect();
            coinbaseSocket_1.CoinbaseSocket.event.on("*", function (eventData) {
                switch (eventData.type) {
                    case "heartbeat":
                        Coinbase.doHeartbeat(eventData);
                        break;
                    case "ticker":
                        Coinbase.doTicker(eventData);
                        break;
                    default:
                        console.log("message", eventData);
                        break;
                }
            });
        });
    };
    Coinbase.status = function () { return ({
        products: Coinbase.products
    }); };
    return Coinbase;
}());
exports.Coinbase = Coinbase;
//# sourceMappingURL=coinbase.js.map