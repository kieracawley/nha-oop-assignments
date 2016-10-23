class ObjectVisualManager{
	constructor(){
	}
	centsToDollars(costInCents){
		const value = costInCents/100;
		if(value % 1 == 0){
			return String(value) + ".00"
		}
		else if(value % .1 == 0){
			return String(value) + "0"
		}
		else{
			return String(value)
		}
	}
	getConfinedProductDiv(product){
		return `<div class='itemDiv'><center> <b>${product._name}: </b>$${this.centsToDollars(product._cost_in_cents)}<br><br><img class='productImage' src='${product._image_url}'></center></div>`;
	}
	getStoreSummary(name, image, status){
		const trueFalseToWords = {true: "Open", false: "Closed"};
		const headerImage = `<img src='${image}'>`;
		const information = `<span style='font-size:30px;'><b>Store Name: </b>${name}</span><br><br> <span style='font-size:30px;'><b>Store Status: </b>${trueFalseToWords[status]}</span>`;
		return `<div class='storeInfo'>${headerImage}<br><br><br>${information}</div>`;
	}
}
