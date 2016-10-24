class Store{
  constructor(params, products){
	  this.id = params.id;
	  this._name = params.document.name;
	  this._imageUrl = params.document.image_url;
	  this._isOpen = params.document.is_opened
	  this.cloudboostObject = params;
    this._products = products;
  }
	getListItem(){
    const visualManager = new ObjectVisualManager();
    const section1 = visualManager.getStoreSummary(this._name, this._imageUrl, this._isOpen);
    var section2 = "<div class='storeItems'>"
    for(let product of this._products){
      section2 = section2 + visualManager.getConfinedProductDiv(product);
    }
    return "<div class='jumbotron store-jumbotron'>" + section1 + section2 + "</div></div>";
	}
}
