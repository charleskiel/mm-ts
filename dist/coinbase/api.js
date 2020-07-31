"use strict";
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
var axios = require('axios');
var moment = require('moment');
var WebSocket = require('websocket').w3cwebsocket;
var Api = /** @class */ (function () {
    function Api() {
    }
    Api.products = function () {
        return new Promise(function (result, fail) {
            console.log("Getting Products");
            axios.get(Api.endpoint)
                .then(function (response) {
                result(response.data);
            })
                .catch(function (error) {
                console.log(error);
                fail(error);
            })
                .then(function () {
                // always executed
            });
        });
    };
    Api.endpoint = "https://api.pro.coinbase.com/products";
    Api.socket = new WebSocket("wss://ws-feed.pro.coinbase.com");
    Api.packetCount = 0;
    return Api;
}());
exports.Api = Api;
//# sourceMappingURL=api.js.map