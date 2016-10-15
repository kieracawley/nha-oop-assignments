CB.CloudApp.init("lfrsdnhmwmef", "409ca5bb-9dd7-40c9-a578-799793fc03b7");
const allStores = [];
const productManager = new CloudObjectManager()
var query = new CB.CloudQuery("Store");
query.find({
	success: function(list){
		for(let store of list){
		 const newStore = new Store(store);
		 allStores.push(newStore);
		}
		addStoresToList();
	},
	error: function(err) {
		console.log(err);
	}
});

function addStoresToList(){
	for(let store in allStores){
		$("#stores").append(allStores[store].getListItem());
	}
}

function submitNewProduct(){
	productManager.createProduct($("#newProductName").val(), parseInt($("#newProductCost").val()), $("#newProductUrl").val());
}
