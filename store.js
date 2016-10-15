class Store{
  constructor(params){
	  this.id = params.id;
	  this._name = params.document.name;
	  this._image_url = params.document.image_url;
	  this._is_open = params.document.is_opened
	  this.cloudboost_object = params;
  }

	save(){
		this._cloudboost_object.save({
			success: function(store) {
      },
      error: function(err) {
      }
		});
	}

	get products(){
		var query = new CB.CloudQuery("ProductStore");
		query.equalTo('store_id', this.cloudboost_object);
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
		const trueFalseToWords = {true: "Open", false: "Closed"}
		const headerImage = "<img src='" + this._image_url + "'>";
		const information = "<span style='font-size:30px;'><b>Store Name: </b>" + this._name + "</span><br><br> <span style='font-size:30px;'><b>Store Status: </b>" + trueFalseToWords[this._is_open] + "</span>"
		const section1 = "<div class='storeInfo'>"  + headerImage + "<br><br><br>" + information + "</div>"
    let cloudObjectManager = new CloudObjectManager();
    let products = cloudObjectManager.findProductsInStore(this.cloudboost_object);
    console.log(products);
    return "<div class='jumbotron store-jumbotron'>" + section1 + "</div></div>";
	}
}
