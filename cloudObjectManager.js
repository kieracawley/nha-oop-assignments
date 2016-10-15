class CloudObjectManager{
	constructor(){
	}
	createProduct(name, cost, imageUrl){
		const newProduct = new CB.CloudObject("Product");
		newProduct.set("name", name);
		newProduct.set("cost_in_cents", cost);
		newProduct.set("image_url", imageUrl);
		newProduct.save({
			success: function(data) {
				console.log(data);
			},
			error: function(err) {
				if(err == "Unique constraint violated."){
					console.log("This product already exists.");
				}
			}
		});
	}
	findProductsInStore(store){
		const finalList = [];
		var query = new CB.CloudQuery("ProductStore");
    query.equalTo("store_id", store);
	  query.find({
	    success: function(list){
				for(let relationship of list){
					const productId = relationship.document.product_id.document._id;
					let findProduct = new CB.CloudQuery("Product");
					findProduct.equalTo("_id", productId);
					findProduct.find({
				    success: function(products){
							const product = new Product(products[0]);
							finalList.push(product);
						},
						error: function(err){
						}
					});
				}
	    },
	    error: function(err) {
	    }
	  });
		return finalList;
	}
}
