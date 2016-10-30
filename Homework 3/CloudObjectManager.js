class CloudObjectManager{
	constructor(){
	}
	isValidUser(username, password, callBack){
		const findUser = new CB.CloudQuery("User");
		findUser.equalTo('username', username);
		findUser.equalTo('password', password);
		findUser.find({
			success: function(list){
				if(list.length >= 1){
					if(list[0].document.is_store_owner){
						const newUser = new StoreOwner(list[0]);
						callBack("", true, newUser);
					} else {
						const newUser = new Customer(list[0]);
						callBack("", true, newUser);
					}
				}
				else{
					callBack("* Invalid username or password", false, "");
				}
			},
			error: function(err) {
			}
		});
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
	getStores(callBack){
		var query = new CB.CloudQuery("Store");
		query.find({
			success: function(list){
				callBack(list);
			},
			error: function(err) {
			}
		});
	}
	getProductsOfStore(store, callBack){
		var query = new CB.CloudQuery("ProductStore");
		query.equalTo('store_id', store);
		query.find({
			success: function(list){
				let finalProductsList = [];
				for(let relationship of list){
					const productId = relationship.document.product_id.document._id;
					var productQuery = new CB.CloudQuery("Product");
					productQuery.equalTo('id', productId);
					productQuery.find({
						success: function(products){
							for(let product of products){
								let newProduct = new Product(product);
								finalProductsList.push(newProduct);
							}
							if(finalProductsList.length == list.length){
								callBack(finalProductsList);
							}
						},
						error: function(err){

						}
					});
				}
			},
			error: function(err) {
			}
		});
	}
	
	createUser(username, email, password, callBack){
	}
}
