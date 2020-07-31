import moment = require('moment');
//import * as fs from 'fs'
//import request from 'request'
//import * as  _ from 'lodash'
//import os from 'os'
import {TDA} from './tda/tda'
import {Coinbase} from './coinbase/coinbase'

console.log(moment().format())
TDA.init()
Coinbase.init()