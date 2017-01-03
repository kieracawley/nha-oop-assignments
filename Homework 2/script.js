CB.CloudApp.init("hbyttcwntugz", "e4e91c52-fd9d-4ab0-9d44-3659c5ccbf0f");

const stores = {};
const storeNames = ["Walmart", "Target", "Staples"];

for(const name of storeNames) {
	const store = new Store(name);
	stores[name] = store;
}

function createNewProduct() {
	if (getCheckedStores().length != 0) {
		const newProduct = new CB.CloudObject("Product");
		newProduct.set("name", $("#name-input").val());
		newProduct.set("cost_in_cents", parseFloat($("#price-input").val()));
		newProduct.set("stores", getCheckedStores());
		newProduct.save({
			success: function(newProduct) {
				const myProduct = new Product(newProduct);
				for(const storeName of newProduct.document.stores) {
					stores[storeName].addProduct(myProduct);
					stores[storeName].updateList();
				}
			},
			error: function(err) {
			}
		});
	}
}

function getData() {
	const query = new CB.CloudQuery("Product");
	query.find({
		success: function(list) {
			for(const product of list) {
				const newProduct = new Product(product);
				for(const storeName in product.document.stores) {
					stores[product.document.stores[storeName]].addProduct(newProduct);
				}
			}
			for(const storeName of storeNames) {
				stores[storeName].updateList();
			}
		},
		error: function(err) {
		}
	});
}

function getCheckedStores() {
	const checkedStores = [];
	for(const storeName of storeNames) {
		if ($(`#${storeName}`).is(":checked")) {
			checkedStores.push(storeName);
		}
	}
	return checkedStores;
}
getData();

function setupClicks() {
	$(".deleteButton").click(function() {
		const id = this.id;
		const query = new CB.CloudQuery("Product");
		query.equalTo('id', id);
		query.find({
			success: function(list) {
				for(const item of list) {
					item.delete({
						success: function(obj) {
							location.reload();
						},
						error: function(err) {
						}
					});
				}
			},
			error: function(err) {
			}
		});
	});
}
