import {Stock} from "./stock";
import {Spark, TimeAndSales} from "./interface";

export class Product {

    best_ask: number;
    best_bid: number;
    high_24h: number;
    low_24h: number;
    last_size: number;
    open: number;
    close: number;
    mark: number;
    symbol: String;
    type: String;
    volumeDay: number;
    volume30Day: number;
    spark : Spark;
    timeAndSales : TimeAndSales;

    constructor(symbol: String, type : String) {
        //super();
        this.best_ask = 0;
        this.best_bid = 0;
        this.high_24h = 0;
        this.low_24h = 0;
        this.last_size = 0;
        this.open = 0;
        this.close = 0;
        this.mark = 0;
        this.symbol = symbol;
        this.type = type;
        this.volumeDay = 0;
        this.volume30Day = 0;
        this.timeAndSales = [];

        this.spark = new Spark();
    }

}