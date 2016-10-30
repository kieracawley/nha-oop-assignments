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
	getConfinedProductDiv(product, storeId, callBack){
		this.getComments(product, function(allComments){
			console.log(storeId);
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
