class Product{
	constructor(params){
		this.id = params.id;
		this._name = params.document.name;
		this._costInCents = params.document.cost_in_cents;
		this._imageUrl = params.document.image_url;
		this.cloudboostObject = params;
	}
}
