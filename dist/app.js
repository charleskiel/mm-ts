"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
//import * as fs from 'fs'
//import request from 'request'
//import * as  _ from 'lodash'
//import os from 'os'
var tda_1 = require("./tda/tda");
var coinbase_1 = require("./coinbase/coinbase");
console.log(moment().format());
tda_1.TDA.init();
coinbase_1.Coinbase.init();
//# sourceMappingURL=app.js.map