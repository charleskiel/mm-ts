//
 
const axios = require('axios')
const moment = require('moment');
const WebSocket = require('websocket').w3cwebsocket;


export class Api {
	
	static endpoint : string = "https://api.pro.coinbase.com/products"

	private static socket = new WebSocket("wss://ws-feed.pro.coinbase.com");
	static packetCount : number = 0

	static  products  () {
		return new Promise<any>  ((result, fail) => {

			console.log("Getting Products")
			axios.get(Api.endpoint)
			.then( (response: any ) => {
				result(response.data);
			})
			.catch(function (error: any) {
				console.log(error);
				fail(error);
			})
			.then(function () {
				// always executed
			});
		}
	)}
	
}