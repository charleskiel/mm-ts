
import  {product}  from '../interface'
import moment = require('moment');

export class Account {
	//static products = new Map<string,product>()

	
	static init = () => {
		console.log("Init Account")
		
	}
	
	static refresh = () => {
	console.log(moment(Date.now()).format() + ": Validating credientials")
		//validatetoken()
		//validateprincipals()
		//refreshAccessToken()
	}

}