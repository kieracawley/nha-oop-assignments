class Store{
  constructor(params, products){
	  this.id = params.id;
	  this._name = params.document.name;
	  this._image_url = params.document.image_url;
	  this._is_open = params.document.is_opened
	  this.cloudboost_object = params;
    this._products = products;
  }
	save(){
		this._cloudboost_object.save({
			success: function(store) {
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

	get is_open(){
		return this._is_open;
	}
	set is_open(newIsOpen){
		if(newIsOpen){
			this._is_open = newIsOpen;
			cloudboost_object.set("is_open", newIsOpen);
			this.save();
		}
	}
	getListItem(){
    const visualManager = new ObjectVisualManager();
    const section1 = visualManager.getStoreSummary(this._name, this._image_url, this._is_open);
    var section2 = "<div class='storeItems'>"
    for(let product of this._products){
      section2 = section2 + visualManager.getConfinedProductDiv(product);
    }
    return "<div class='jumbotron store-jumbotron'>" + section1 + section2 + "</div></div>";
	}
}
