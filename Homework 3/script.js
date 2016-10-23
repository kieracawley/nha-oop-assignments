CB.CloudApp.init("lfrsdnhmwmef", "409ca5bb-9dd7-40c9-a578-799793fc03b7");
const productManager = new CloudObjectManager();
var user = "";
loadMallPage();
window.location.href = "signIn.html";
function logIn(){

}
function signUp(){
	$("#signUpErrorMessage").empty();
	if($("#signUpPasswordInput").val() == $("#signUpPasswordConfirmInput").val()){
		var isAdministrator = false;
		if($('input[name="accountType"]:checked').val() == "administrator"){
			isAdministrator = true;
		}
		productManager.createUser($("#signUpUsernameInput").val(), $("#signUpPasswordInput").val(), $("#signUp").val(), isAdministrator, function(succeeded, errorMessage, newUser){
				if!(succeeded){
					$("#signUpErrorMessage").append(errorMessage);
				}
				else{
					user = newUser;
					window.location.href = "index.html";
					loadMallPage();
				}
		});
	}
	else{
		$("#signUpErrorMessage").append("* Your password and password confirmation don't match.");
	}
}
function loadMallPage(){
	if(user == ""){
		window.location.href = "signIn.html";
	}
	else{
		const allStores = [];
		productManager.getStores(function(stores){
			for(let store in stores){
				productManager.getProductsOfStore(stores[store], function(products){
					const storeObj = new Store(stores[store], products);
					allStores.push(storeObj);
					$("#stores").append(storeObj.getListItem());
				});
			}
		});
	}
}
