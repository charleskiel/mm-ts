import { Api } from './tdaapi'

export class TDA {
	static init() {
		console.log("Loading TDA")
		console.log("Authorising")
		Api.init()
	}
}