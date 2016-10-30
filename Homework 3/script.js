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

	function setUpOnClicks(){
		$(".postComment").click(function(){
			const productId = this.id.split("-")[1];
			if(!($(`#inputComment-${productId}`).val() == "")){
				var query = new CB.CloudQuery("Product");
				query.equalTo('id', productId);
				query.find({
					success: function(list){
						user.createComment(list[0], $(`#inputComment-${productId}`).val());
					},
					error: function(err) {
					}
				});
			}
		});
	}

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
					let numberOfStoresAdded = 0;
					for(let store in stores){
						productManager.getProductsOfStore(stores[store], function(products){
							const storeObj = new Store(stores[store], products);
							allStores.push(storeObj);
							storeObj.getListItem(function(storeVisual){
								$("#stores").append(storeVisual);
								numberOfStoresAdded = numberOfStoresAdded + 1;
								if (numberOfStoresAdded == stores.length){
									setUpOnClicks();
								}
							});
						});
					}
				});
			}
		}
	}
});
