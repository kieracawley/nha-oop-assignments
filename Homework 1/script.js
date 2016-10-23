const allProducts = [];
const tagCheckboxes = [$("#dairyTagCheckbox"), $("#wheatTagCheckbox"), $("#coldCutsTagCheckbox"), $("#fruitsAndVegetablesTagCheckbox")];
const storeCheckboxes = [$("#stopAndShopStoreCheckbox"), $("#targetStoreCheckbox"), $("#walmartStoreCheckbox"), $("#keyFoodStoreCheckbox")];

$("#submitButton").click( function (){
	const tags = [];
	const stores = [];
	for(let currentCheckbox of tagCheckboxes){
		if(currentCheckbox.is(":checked")){
			tags.push(currentCheckbox.attr("name"));
		}
	}
	for(let currentCheckbox of storeCheckboxes){
		if(currentCheckbox.is(":checked")){
			stores.push(currentCheckbox.attr("name"));
		}
	}
	if(tags.length > 0 && stores.length > 0){
		const data = {
			"name": $("#nameInput").val(),
			"price": $("#priceInput").val(),
			"tags": tags.join(", "),
			"stores": stores.join(", ")
		};
		parseRawProductData(data);
		postToSparkfun(data);
	}
});

function getInitalProducts(){
	$.ajax({
		type: "GET",
		url: "http://data.sparkfun.com/output/5J4Ejm2yVdCyNOrQVmo2.json",
		success: (response) => {
			for(let product of response){
				parseRawProductData(product);
			}
		}
	})
}

function postToSparkfun(data){
	$.ajax({
		url: "http://data.sparkfun.com/input/5J4Ejm2yVdCyNOrQVmo2",
		headers: {
			"Phant-Private-Key": "7BoVgGw7leSkmr7bnaMy"
		},
		method: "POST",
		dataType: "json",
		data: data,
		success: function(data) {
		}
	})
}

function parseRawProductData(data){
	const newProduct = new Product(data.name, data.price, data.tags.split(", "), data.stores.split(", "));
	allProducts.push(newProduct);
	newProduct.addToTable();
}

getInitalProducts();
