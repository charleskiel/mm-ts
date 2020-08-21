import {CoinbaseSocket} from './coinbaseSocket'
import {Api} from './coinbaseapi'
import { throws } from 'assert'


interface product {
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

export class Coinbase {
	static products = new Map<string,product>()

	
	static init = () => {
		console.log("Init Coinbase")
		Api.products().then(products => {
			//Coinbase.products = products

			for (let index = 0; index < products.length; index++) {
				const element = products[index];
				//console.log(element)
				Coinbase.products.set(products[index].id,products[index])
				
			}

			
			console.log(Coinbase.products)

			CoinbaseSocket.connect()
			CoinbaseSocket.event.on("*", function (eventData: any) {
				//console.log(eventData)
				switch(eventData.type){
					case "heartbeat":
						Coinbase.doHeartbeat(eventData)
						break;
					case "ticker":
						Coinbase.doTicker(eventData)
						break;
					default:
						console.log("message", eventData)
						break;
				}

			})
			
		})

	}

	static status = () => ({
		products: Coinbase.products
	})

	static doHeartbeat(data : any) {
		// Coinbase.products[data.product_id] = {...Coinbase.products[data.product_id], ...data}
		console.log("heartbeat", data)
		
	}

	static doTicker(data : any) {
		Coinbase.products.set(data.product_id, {...Coinbase.products.get(data.product_id), ...data})
		console.log("ticker", data)
		//console.log(Coinbase.products.get(data.product_id))
		
	}




}