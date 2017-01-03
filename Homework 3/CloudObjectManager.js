class CloudObjectManager{
	constructor(){
	}
	getProductsOfStore(store, callBack){
		console.log(store);
		var query = new CB.CloudQuery("ProductStore");
		query.equalTo('store_id', store);
		query.find({
			success: function(list){
				let finalProductsList = [];
				if(list.length == 0){
					callBack(finalProductsList);
				}
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
					})
				}
			},
			error: function(err) {
			}
		});
	}
	isValidUser(username, password, callBack){
		const findUser = new CB.CloudQuery("User");
		findUser.equalTo('username', username);
		findUser.equalTo('password', password);
		findUser.find({
			success: function(list){
				if(list.length >= 1){
					if(list[0].document.is_store_owner){
						const findRelation = new CB.CloudQuery("StoreUser");
						findRelation.equalTo('user_id', list[0]);
						findRelation.find({
							success: function(list2){
								const storeId = list2[0].document.store_id.document._id;
								const findStore = new CB.CloudQuery("Store");
								findStore.equalTo('id', storeId);
								findStore.find({
									success: function(list3){
										const findAllProducts = new CB.CloudQuery("ProductStore");
										findAllProducts.equalTo('store_id', list3[0]);
										findAllProducts.find({
											success: function(list4){
												let allProducts = [];
												if(list4.length == 0){
													const userStore = new Store(list3[0], allProducts);
													const newUser = new StoreOwner(list[0], userStore);
													callBack("", true, newUser);
												}
												for(let relation of list4){
													const findProduct = new CB.CloudQuery("Product");
													findProduct.equalTo('id', relation.document.product_id.document._id);
													findProduct.find({
														success: function(list5){
															let newProduct = new Product(list5[0]);
															allProducts.push(newProduct);
															if(allProducts.length == list4.length){
																const userStore = new Store(list3[0], allProducts);
																const newUser = new StoreOwner(list[0], userStore);
																callBack("", true, newUser);
															}
														},
														error: function(err){
														}
													})
												}
											},
											error: function(err){
											}
										})
									},
									error: function(err){
									}
								})
							},
							error: function(err){
							}
						});
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
	createProduct(name, cost, imageUrl, store){
		const newProduct = new CB.CloudObject("Product");
		newProduct.set("name", name);
		newProduct.set("cost_in_cents", cost);
		newProduct.set("image_url", imageUrl);
		newProduct.save({
			success: function(data) {
				const newRelation = new CB.CloudObject("ProductStore");
				newRelation.set("product_id", data);
				newRelation.set("store_id", store.cloudboostObject);
				newRelation.save({
					success: function(data2) {
						const product = new Product(data);
						const visuals = new ObjectVisualManager();
						visuals.getRemovableProduct(product, store);
					},
					error: function(err) {
					}
				});
			},
			error: function(err) {
				if(err == "Unique constraint violated."){
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
	createStoreUserRelation(store, user, callBack){
		var newRelation = new CB.CloudObject('StoreUser');
		newRelation.set('user_id', user);
		newRelation.set('store_id', store);
		newRelation.save({
			success: function(obj){
				callBack();
			},
			error: function(err){
			}
		});
	}
	createStore(name, imageUrl, isOpen, callBack){
		var newStore = new CB.CloudObject('Store');
		newStore.set('name', name);
		newStore.set('image_url', imageUrl);
		newStore.set('is_opened', isOpen);
		newStore.save({
			success: function(obj){
				const createdStore = new Store(obj, []);
				callBack(createdStore);
			},
			error: function(err){
			}
		});
	}
	getProductsNotInStore(store, callBack){
		var getProducts = new CB.CloudQuery('Product');
		getProducts.find({
			success: function(list){
				let finalList = [];
				for(let item of list){
					let newItem = new Product(item);
					finalList.push(newItem);
					for(let product of store._products){
						if(product.id == newItem.id){
							finalList.splice(finalList.indexOf(newItem), 1);
						}
					}
				}
				callBack(store, finalList);
			},
			error: function(err) {
			}
		});
	}
	createUser(username, email, password, isStoreOwner, callBack){
		var newUser = new CB.CloudObject('User');
		newUser.set('username', username);
		newUser.set('email', email);
		newUser.set('password', password);
		newUser.set('verified', true);
		newUser.set('is_store_owner', isStoreOwner);
		newUser.save({
			success: function(obj) {
				if(isStoreOwner){
					callBack(true, obj);
				}
				else{
					const createdUser = new Customer(obj);
					callBack(true, createdUser);
				}
			},
			error: function(err) {
			}
		});
	}
}
