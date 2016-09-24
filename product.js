class Product{
	constructor(params){
		this._id = params.document.id;
		this._name = params.name;
		this._cost_in_cents = params.document.cost_in_cents;
		this._cloudboost_object = params;
	}
	delete(){

	}
	save(){
		this._cloudboost_object.save({
			success: function(newProduct) {
      },
      error: function(err) {
      }
		});
	}
}
