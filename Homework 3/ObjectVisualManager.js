class ObjectVisualManager{
	constructor(){
	}
	centsToDollars(costInCents){
		return String((costInCents/100).toFixed(2));
	}
	getRemovableProduct(product, store){
		let finalElement = `<div id="${product.id}" class="removableProduct">`;
		finalElement = `${finalElement}<button class="deleteButton btn btn-default" id="delete-${product.id}"><b class="buttonText"> - </b></button><br>`;
		finalElement = `${finalElement}<center><b>${product._name}</b></center><br>`;
		finalElement = `${finalElement}<center><img style="height:50px;" src="${product._imageUrl}"></center><br>`;
		const manager = new ObjectVisualManager();
		const costInDollars = manager.centsToDollars(product._costInCents);
		finalElement = `${finalElement}<center><b>$${costInDollars}</b></center><br></div>`;
		$("#ownerStoreProducts").append(finalElement);
		$(`#delete-${product.id}`).click(function(){
			var query = new CB.CloudQuery("ProductStore");
			query.equalTo('product_id', product.cloudboostObject);
			query.equalTo('store_id', store.cloudboostObject);
			query.find({
				success: function(list){
					list[0].delete({
						success: function(obj) {
							$(`#${product.id}`).remove();
							const manager2 = new ObjectVisualManager();
							manager2.getAddableProduct(product, store);
						},
						error: function(err) {
						}
					});
				},
				error: function(err) {
				}
			});
		});
	}
	getAddableProduct(product, store){
		let finalElement = `<div id="${product.id}" class="addableProduct">`;
		finalElement = `${finalElement}<button class="addButton btn btn-default" id="add-${product.id}"><b class="buttonText"> + </b></button><br>`;
		finalElement = `${finalElement}<center><b>${product._name}</b></center><br>`;
		finalElement = `${finalElement}<center><img style="height:50px;" src="${product._imageUrl}"></center><br>`;
		const manager = new ObjectVisualManager();
		const costInDollars = manager.centsToDollars(product._costInCents);
		finalElement = `${finalElement}<center><b>$${costInDollars}</b></center><br></div>`;
		$("#ownerAllProducts").append(finalElement);
		$(`#add-${product.id}`).click(function(){
			var newRelation = new CB.CloudObject('ProductStore');
			newRelation.set('product_id', product.cloudboostObject);
			newRelation.set('store_id', store.cloudboostObject);
			newRelation.save({
				success: function(obj){
					$(`#${product.id}`).remove();
					const manager2 = new ObjectVisualManager();
					manager2.getRemovableProduct(product, store);
				},
				error: function(err){
				}
			});
		});
	}
	getConfinedProductDiv(product, storeId, callBack){
		this.getComments(product, function(allComments){
			const manager = new ObjectVisualManager();
			const costInDollars = manager.centsToDollars(product._costInCents);
			callBack(`<div class='itemDiv' id='${product.id}'><center> <b>${product._name}: </b>$${costInDollars}<br><br><img class='productImage' src='${product._imageUrl}'></center><br><div id="${product.id}comments-${storeId}comments" class='${product.id}comments ${storeId}comments' style='width:270px; height:175px; overflow-y: auto;'>${allComments}</div><div style="height:20px;"></div><textarea id="inputComment-${storeId}-${product.id}" style='width:270px; height:50px; resize: none; margin-right:20px;'></textarea><br><button class='postComment-${product.id} postComment-${storeId} btn btn-default postComment'>Post</button><br></div>`);
		});
	}
	getStoreSummary(name, image, status){
		const trueFalseToWords = {true: "Open", false: "Closed"};
		const headerImage = `<img src='${image}'>`;
		const information = `<span style='font-size:30px;'><b>Store Name: </b>${name}</span><br><br> <span style='font-size:30px;'><b>Store Status: </b>${trueFalseToWords[status]}</span>`;
		return `<div class='storeInfo'>${headerImage}<br><br><br>${information}</div>`;
	}
	getComments(product, callBack){
		let allComments = "";
		var query = new CB.CloudQuery("Comment");
		query.equalTo('product_id', product.cloudboostObject);
		query.find({
			success: function(list){
				for(const comment of list){
					allComments = allComments + `<div style="width:250px;"class="individualCommentDisplay"> <b>${comment.document.user_name}:</b> <br> <span style="width:250px; font-size:13px;" class="wrapword">${comment.document.comment}</span> </div><br>`;
				}
				callBack(allComments);
			}, error: function(err){
			}
		});
	}
}
