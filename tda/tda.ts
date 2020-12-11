import { Api } from './tdaapi'
import {Stock} from '../stock'

export class TDA {
	private static amd: Stock;

	static init() {
		this.amd = new Stock("AMD", "equity");
		console.log("Loading TDA");
		console.log("Authorising");
		Api.init();


	}
}