class Store{
	constructor(storeName) {
		this._name = storeName;
		this._products = [];
	}
	listAllProducts() {
		return this._products;
	}
	addProduct(product) {
		this._products.push(product);
	}
	updateList() {
		$(`#${this._name}List`).empty();
		for(const product of this._products) {
			$(`#${this._name}List`).append(product.getListItem());
			setupClicks();
		}
	}
}
