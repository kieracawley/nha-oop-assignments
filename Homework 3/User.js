class User{
	constructor(params){
		this.cloudboostObject = params;
		this._id = params.id;
		this._userName = params.document.username;
		this._email = params.document.email;
		this._isStoreOwner = params.document.is_store_owner;
	}
}
