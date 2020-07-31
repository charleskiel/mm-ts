import { Console } from "console";
import { Account } from "./account";

const fs = require('fs');

const WebSocket = require('websocket').w3cwebsocket;
const EventEmitter2 = require("eventemitter2");

export class CoinbaseSocket {
	private static socket = WebSocket;
	static packetCount : number = 0

	static event = new EventEmitter2({
		wildcard: true,
		delimiter: ".",
		newListener: false,
		removeListener: false,
		//maxListeners: 10,
		verboseMemoryLeak: false,
		ignoreErrors: false,
	});
	
	static connect() {
		CoinbaseSocket.socket = new WebSocket("wss://ws-feed.pro.coinbase.com");

		let keys = JSON.parse(fs.readFileSync('/var/www/charleskiel.dev/mm-ts/auth/coinbase.json'))
		
		console.log("Connecting Coinbase socket")
		this.socket.onopen = (ws: any) => {
			console.log("Connected");
			this.socket.send(JSON.stringify(keys));
			this.subscribe()

		}

		
		this.socket.onclose = (event: any) => {
			console.error("Coinbase socket Error", event)
			setTimeout(() => {
				CoinbaseSocket.connect()
			},2000)
		}

		this.socket.addEventListener("message",(event: any) => {
			let tick = JSON.parse(event.data);
			this.packetCount += 1;
			this.event.emit(tick.type,tick)

			switch (tick.type) {
				case "snapshot":
					//console.log(tick)
					if (this.packetCount < 200) console.log(tick)
					break;
				case "ticker":
					//this.cryptoTick(tick);
					break;
				default:
					console.log(tick)
					break
			}
			


		})
	}

	static subscribe(product_ids = ["BTC-USD","DASH-USD","EOS-USD","XLM-USD","OMG-USD","ETH-USD","LTC-USD","XRP-USD","ETC-USD","BCH-USD"]) {
		this.socket.send(
			JSON.stringify({
				type: "subscribe",
				product_ids: [...product_ids],

				channels: [
				    "heartbeat",
				    {
					   name: "ticker",
					   product_ids: [...product_ids]
				    }
				]
			 })
		);
	}

	static unsubscribe(){

	}

	static cryptoTick(tick: any){
		process.stdout.write(`${tick['price']}`)

	}
	

	


}