import { tick, TimeAndSales,Spark} from './interface';
import DateTimeFormat = Intl.DateTimeFormat;
import moment = require('moment');
import {Product} from "./Product";


export class Stock extends Product{



    tick(tick: tick) {
        this.spark.add(tick);
    }

}




