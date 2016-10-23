class User{
	constructor(params){
		this.cloudboostObject = params;
		this._id = params.id;
		this._user_name = params.document.username;
		this.email = params.document.email;
	}
}
