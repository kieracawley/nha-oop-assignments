class Product{
	constructor(params) {
		this._cloudBoostObject = params
		this._name = params.document.name;
		this.id = params.id;
		this._costInCents = params.document.cost_in_cents;
	}
	getListItem() {
		let cost = (this._costInCents / 100).toString();
		if (this._costInCents % 100 == 0) {
			cost += ".0";
		}
		if (this._costInCents % 10 == 0) {
			cost += "0";
		}
		return `<li>${this._name}: $${cost} <button class='deleteButton' id='${this.id}'>Delete</button></li>`
	}
}
