class User{
	constructor(params){
		this.cloudboostObject = params;
		this._id = params.id;
		this._userName = params.document.username;
		this._email = params.document.email;
	}
}

class Customer extends User{
	constructor(params){
		super(params);
	}
	createComment(product, storeId, comment){
		var obj = new CB.CloudObject("Comment");
		obj.set("comment", comment);
		obj.set("product_id", product);
		obj.set("user_name", this._userName);
		obj.save({
			success: function(obj) {
				console.log(obj)
				$(`.${obj.document.product_id.document._id}comments`).append(`<div style="width:250px;"class="individualCommentDisplay"> <b>${obj.document.user_name}:</b> <br> <span style="width:250px; font-size:13px;" class="wrapword">${obj.document.comment}</span> </div><br>`);
				$(`#inputComment-${storeId}-${obj.document.product_id.document._id}`).val('');
				$(`#${obj.document.product_id.document._id}comments-${storeId}comments`).scrollTop($(`.${obj.document.product_id.document._id}comments`)[0].scrollHeight);
			},
			error: function(err) {
			}
		});
	}
}

class StoreOwner extends User{
	constructor(params, store){
		super(params);
		this._store = store;
	}

}
