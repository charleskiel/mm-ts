const fs = require('fs')
const FormData = require('form-data');
import axios from 'axios';
import moment = require('moment');

export class Api {
	
	//let refreshTokenInfo =  JSON.parse(fs.readFileSync('/var/www/charleskiel.dev/mm-ts/auth/refresh_token.json'))
	//let access_token =  JSON.parse(fs.readFileSync('/var/www/charleskiel.dev/mm-ts/auth/access_token.json'))
	//let accountInfo =  JSON.parse(fs.readFileSync('/var/www/charleskiel.dev/mm-ts/auth/account_info.json'))
	//let principals = JSON.parse(fs.readFileSync('/var/www/charleskiel.dev/mm-ts/auth/user_principals.json'))
	
	
	
	static init() {
		console.log("Connecting TDA socket")
		//this.refresh()
		this.validatetoken()
		this.validateprincipals()
		//this.refreshAccessToken()
		//module.exports.getWatchlists().then(data => {console.log(data);})
	}

	static refresh(){
		this.validatetoken().then
	}

	static validatetoken(){
		var promoise = new Promise((resolve,reject) => {
			console.log(moment(Date.now()).format() + ": Validating Token")

			const access_token = JSON.parse(fs.readFileSync('./auth/access_token.json'))
			const refreshTokenInfo = JSON.parse(fs.readFileSync('./auth/refresh_token.json'))
						
			if (Date.now() >= access_token.created_on + (access_token.expires_in *1000)) {
			    console.log(moment(Date.now()).format() + ": Token appears to be expired... Refreshing");
			    this.refreshAccessToken()
			}
			else {
			    console.log(moment(Date.now()).format() + `: Access Token OK updated ${moment(access_token.created_on).fromNow()}, expires ${moment(refreshTokenInfo.expires_on).add(90, 'days').fromNow()}.`)
			}
			
		})
		return promoise
	}

	static validateprincipals() {

	}



	static refreshAccessToken() {
		console.log("Refreshing Access Token")
		
		const refreshTokenInfo = JSON.parse(fs.readFileSync('./auth/refresh_token.json'))
		const accountInfo = JSON.parse(fs.readFileSync('./auth/account_info.json'))
		const form  = new FormData()
		form.append('grant_type' , 'refresh_token')
		form.append('access_type' , '')
		form.append('refresh_token' , (refreshTokenInfo.refresh_token))
		form.append('client_id' , (accountInfo.client_id))
	
		console.log(moment(Date.now()).format(), form)
		
		return new Promise<any> ((result,fail) => {
			axios.post('https://api.tdameritrade.com/v1/oauth2/token',
				form,
				{
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}
			).then( (response: any ) => {
				console.log(response)
				console.log(response.data)

				debugger
				result(response.data);
			})
			.catch(function (error: any) {
				console.log(error);
				fail(error);
			})
			.then(function () {
				// always executed
			});
		})





	
		// let data = JSON.parse(body);
		// console.log(data)
		// if (data.error == "Invalid ApiKey"){
		// 	//debugger
		// } else if (data.error == "Invalid ApiKey"){
		// 	//debugger
		// } else if (data.error == "invalid_grant"){
		// 	//debugger
		// } else
		// {
		// 	data.created_on = Date.now();
		// 	data.expires_on = Date.now() + data.expires_in
			
		// 	fs.writeFileSync("./auth/access_token.json", JSON.stringify(data, undefined, 4), (err) => { if (err) throw err; })
			
		// 	console.log(moment(Date.now()).format() + ": Access Token updated. Expires in " + data.expires_in + " seconds");
		// 	//debugger
		// }
		// });
	
	}
	
}