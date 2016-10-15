class Product{
	constructor(params){
		this.id = params.document.id;
		this._name = params.name;
		this._cost_in_cents = params.document.cost_in_cents;
		this._image_url = params.document.image_url;
		this.cloudboost_object = params;
	}

	save(){
		this._cloudboost_object.save({
			success: function(product) {
      },
      error: function(err) {
      }
		});
	}

	get name(){
		return this._name;
	}
	set name(newName){
		if(newName){
			this._name = newName;
			cloudboost_object.set("name", newName);
			this.save();
		}
	}

	get cost_in_cents(){
		return this._cost_in_cents;
	}
	set cost_in_cents(newCostInCents){
		if(newCostInCents){
			this._cost_in_cents = newCostInCents;
			cloudboost_object.set("cost_in_cents", newCostInCents);
			this.save();
		}
	}

	get image_url(){
		return this._image_url;
	}
	set image_url(newImageUrl){
		if(newImageUrl){
			this._image_url = newImageUrl;
			cloudboost_object.set("image_url", newImageUrl);
			this.save();
		}
	}

}
