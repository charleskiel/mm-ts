

export class Spark {
	private sparks : Array<tick>;

	public constructor() {
		this.sparks = new Array<tick>()
	}

	public add(tick : tick){
		this.sparks.push(tick);
		while ( this.sparks.length > 0 && this.sparks[0].time > Date.now() - (24*60*60*1000) ){
			this.sparks.pop();
		}
	}
}

export class TimeAndSale {
	private price : number;
	private time : Date;

	constructor(price : number, time :number) {
		this.price = price;
		this.time = new Date(time);
	}
}

export interface product {
	best_ask: number;
	best_bid: number;
	high_24h: number;
	last_size: number;
	low_24h: number;
	open_24h: number;
	price: number;
	product_id: string;
	sequence: number;
	side: string;
	time: any;
	trade_id: number;
	type: string;
	volume_24h: number;
	volume_30d: number;
}

export interface tick {
	h: number;
	l: number;
	o: number;
	c: number;
	time: any;
	volume: number;
}

export interface monitor extends Array<product>{}
export interface TimeAndSales  extends Array <TimeAndSale>{}
