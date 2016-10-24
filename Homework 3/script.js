$( document ).ready(function() {

	CB.CloudApp.init("lfrsdnhmwmef", "409ca5bb-9dd7-40c9-a578-799793fc03b7");
	const productManager = new CloudObjectManager();
	var user = "";

	loadMallPage();

	$("#signUpStoreForm").hide();
	$("#signUpErrorMessage").hide();
	$("#logInErrorMessage").hide();

	$("input[name='accountType']").change(function(e){
    if($(this).val() == 'storeOwner') {
			$("#signUpStoreForm").show();
    } else {
			$("#signUpStoreForm").hide();
    }
	});

	$("#logInButton").click(function() {
		$("#logInErrorMessage").hide();
		$("#logInErrorMessage").empty();
		if($("#logInUsernameInput").val() == "" || $("#logInPasswordInput").val() == ""){
			$("#logInErrorMessage").show();
			$("#logInErrorMessage").append("* You must fill in all of the fields.");
			return "";
		}
		productManager.isValidUser($("#logInUsernameInput").val(), $("#logInPasswordInput").val(), function(errorMessage, isValid, validUser){
			if(isValid){
				user = validUser;
				loadMallPage();
			}
			else{
				$("#logInErrorMessage").show();
				$("#logInErrorMessage").append(errorMessage);
			}
		});
	});

	$("#signUpButton").click(function() {
	});

	$("#signOutButton").click(function() {
		location.reload();
	});

	function loadMallPage(){
		if(user == ""){
			$("#mainCustomerPage").hide();
			$("#mainStoreOwnerPage").hide();
			$("#signInPage").show();
		}
		else{
			if(user._isStoreOwner){

			} else {
				$("#mainCustomerPage").show();
				$("#mainStoreOwnerPage").hide();
				$("#signInPage").hide();
				$("#usernameDisplay").empty();
				$("#usernameDisplay").append(user._userName);
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
	}
});
