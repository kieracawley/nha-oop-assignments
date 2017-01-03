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

	$("#createProductButton").click(function(){
		if($("#productNameInput").val() == "" || $("#productImageInput").val() == "" || $("#productCostInput").val() == ""){
			$("#logInErrorMessage").append("* You must fill in all of the fields.");
		}
		else{
			productManager.createProduct($("#productNameInput").val(), parseInt($("#productCostInput").val()), $("#productImageInput").val(), user._store);
			$("#productNameInput").value='';
			$("#productCostInput").value='';
			$("#productImageInput").value='';
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
		$("#signUpErrorMessage").hide();
		$("#signUpErrorMessage").empty();
		if(($('#signUpPasswordInput').val() != '') && ($('#signUpPasswordConfirmInput').val() != '') && ($('#signUpEmailInput').val() != '') && ($('#signUpUsernameInput').val() != '')){
			if($('#signUpPasswordInput').val() == $('#signUpPasswordConfirmInput').val()){
				if($('input[name=accountType]:checked').val() == "storeOwner"){
					if(($('#signUpStoreNameInput').val() != '') && ($('#signUpStoreImageUrlInput').val() != '')){
						productManager.createUser($('#signUpUsernameInput').val(), $('#signUpEmailInput').val(), $('#signUpPasswordInput').val(), true, function(success, createdUser){
							if(success){
								productManager.createStore($('#signUpStoreNameInput').val(), $('#signUpStoreImageUrlInput').val(), ($('input[name=isOpen]:checked').val() == "true"), function(store){
									user = new StoreOwner(createdUser, store);
									productManager.createStoreUserRelation(store.cloudboostObject, createdUser, function(){
										loadMallPage();
									})
								});
							}
						});
					}
					else{
						$("#signUpErrorMessage").show();
						$("#signUpErrorMessage").append("* You must fill in all of the fields.");
					}
				}
				else{
					productManager.createUser($('#signUpUsernameInput').val(), $('#signUpEmailInput').val(), $('#signUpPasswordInput').val(), false, function(success, createdUser){
						if(success){
							user = createdUser;
							loadMallPage();
						}
					});
				}
			}
			else{
				$("#signUpErrorMessage").show();
				$("#signUpErrorMessage").append("* Password and password confirm do not match.");
			}
		}
		else{
			$("#signUpErrorMessage").show();
			$("#signUpErrorMessage").append("* You must fill in all of the fields.");
		}
	});

	$("#signOutButton").click(function() {
		location.reload();
	});

	$("#ownerSignOutButton").click(function() {
		location.reload();
	});

	function setUpOnClicks(){
		$(".postComment").click(function(){
			const storeId = $(this).attr("class").split(' ')[1].split('-')[1];
			const productId = $(this).attr("class").split(' ')[0].split('-')[1];
			const comment = $(`#inputComment-${storeId}-${productId}`).val();
			if(!(comment == "")){
				var query = new CB.CloudQuery("Product");
				query.equalTo('id', productId);
				query.find({
					success: function(list){
						user.createComment(list[0], storeId, comment);
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
			if(user instanceof StoreOwner){
				$("#mainCustomerPage").hide();
				$("#mainStoreOwnerPage").show();
				$("#signInPage").hide();
				$("#ownerUsernameDisplay").empty();
				$("#ownerUsernameDisplay").append(user._userName);
				$("#ownerStoreTitle").append(user._store._name);
				$('#ownerStoreImage').attr("src", user._store._imageUrl);
				productManager.getProductsNotInStore(user._store, function(store, nonStoreProducts){
					const visualManager = new ObjectVisualManager();
					for(let storeProduct of store._products){
						console.log(store._products);
						visualManager.getRemovableProduct(storeProduct, store);
					}
					for(let nonStoreProduct of nonStoreProducts){
						visualManager.getAddableProduct(nonStoreProduct, store);
					}
				});
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
