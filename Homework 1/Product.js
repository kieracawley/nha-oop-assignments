class Product{
	constructor(name, price, tags, stores) {
		this.name = name;
		this.price = price;
		this.tags = tags;
		this.stores = stores;
	}
	addToTable(){
		const name = this.name;
		const price = this.price;
		const tags = this.tags.join(', ');
		const stores = this.stores.join(', ');
		var tableString = `<tr><td> ${name} </td><td> ${price} </td><td> ${tags} </td><td> ${stores} </td></tr>`;
		$("#productTable").append(tableString);
	}
}
