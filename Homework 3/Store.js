class Store{
  constructor(params, products){
	  this.id = params.id;
	  this._name = params.document.name;
	  this._imageUrl = params.document.image_url;
	  this._isOpen = params.document.is_opened
	  this.cloudboostObject = params;
    this._products = products;
  }
	getListItem(callBack){
    const visualManager = new ObjectVisualManager();
    const section1 = visualManager.getStoreSummary(this._name, this._imageUrl, this._isOpen);
    var section2 = "<div class='storeItems'>";
    var x = 0;
    const numberOfProducts = this._products.length;
    let numberOfAddedProducts = 0
    while(x < this._products.length){
      const product = this._products[x];
      x = x + 1;
      visualManager.getConfinedProductDiv(product, this.id, function(result){
        section2 = section2 + result;
        numberOfAddedProducts = numberOfAddedProducts + 1;
        if(numberOfAddedProducts == numberOfProducts){
          callBack("<div class='jumbotron store-jumbotron'>" + section1 + section2 + "</div></div>");
        }
      });
    }
	}
}
