"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinbaseSocket = void 0;
var fs = require('fs');
var WebSocket = require('websocket').w3cwebsocket;
var EventEmitter2 = require("eventemitter2");
var CoinbaseSocket = /** @class */ (function () {
    function CoinbaseSocket() {
    }
    CoinbaseSocket.connect = function () {
        var _this = this;
        CoinbaseSocket.socket = new WebSocket("wss://ws-feed.pro.coinbase.com");
        //let keys = JSON.parse(fs.readFileSync('/var/www/charleskiel.dev/mm-ts/auth/coinbase.json'))
        console.log("Connecting Coinbase socket");
        this.socket.onopen = function (ws) {
            console.log("Connected");
            //this.socket.send(JSON.stringify(keys));
            _this.subscribe();
        };
        this.socket.onclose = function (event) {
            console.error("Coinbase socket Error", event);
            setTimeout(function () {
                CoinbaseSocket.connect();
            }, 2000);
        };
        this.socket.addEventListener("message", function (event) {
            var tick = JSON.parse(event.data);
            _this.packetCount += 1;
            _this.event.emit(tick.type, tick);
            switch (tick.type) {
                case "snapshot":
                    //console.log(tick)
                    if (_this.packetCount < 200)
                        console.log(tick);
                    break;
                case "ticker":
                    //this.cryptoTick(tick);
                    break;
                case "hearbeat":
                    //this.cryptoTick(tick);
                    break;
                default:
                    //console.log(tick)
                    break;
            }
        });
    };
    CoinbaseSocket.subscribe = function (product_ids) {
        if (product_ids === void 0) { product_ids = ["BTC-USD", "DASH-USD", "EOS-USD", "XLM-USD", "OMG-USD", "ETH-USD", "LTC-USD", "XRP-USD", "ETC-USD", "BCH-USD"]; }
        this.socket.send(JSON.stringify({
            type: "subscribe",
            product_ids: __spreadArrays(product_ids),
            channels: [
                "heartbeat",
                {
                    name: "ticker",
                    product_ids: __spreadArrays(product_ids)
                }
            ]
        }));
    };
    CoinbaseSocket.unsubscribe = function () {
    };
    CoinbaseSocket.cryptoTick = function (tick) {
        process.stdout.write("" + tick['price']);
    };
    CoinbaseSocket.socket = WebSocket;
    CoinbaseSocket.packetCount = 0;
    CoinbaseSocket.event = new EventEmitter2({
        wildcard: true,
        delimiter: ".",
        newListener: false,
        removeListener: false,
        //maxListeners: 10,
        verboseMemoryLeak: false,
        ignoreErrors: false,
    });
    return CoinbaseSocket;
}());
exports.CoinbaseSocket = CoinbaseSocket;
//# sourceMappingURL=coinbaseSocket.js.map