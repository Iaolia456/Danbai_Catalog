function query(option) {
	return $.ajax({
		url: 'php/accessories_query.php',
		data: { prod_name: option.prod_name, price_from: option.price_from, price_to: option.price_to, type: option.acc_type, size: option.acc_size }
	})
}

function checkType(type_arr) {
	var type = "";
	if (type_arr.length == 0) type = "'Stand','Detailing Kits'";
	else {
		
		for(i=0; i<type_arr.length; i++) {
			type += "'" + type_arr[i].value + "'" + ",";
		}
		type = type.substring(0, type.length-1);
	}
	
	return type;
}

function checkSize(size_arr) {
	var size = "";
	if (size_arr.length == 0) size = "'1/144','1/100','1/60'"
	else {
		for(i=0; i<size_arr.length; i++) {
			size += "'" + size_arr[i].value + "'" + ",";
		}
		size = size.substring(0, size.length-1);
	}

	return size;
}

$(function() {
	$('#search_button').click(function() {
		var prod_name = $('#search_name').val();
		
		var price = $('#price_select').find(":selected").val().split('-');
		var price_from = price[0];
		var price_to = price[1];
		if (price == 0) {
			price_from = 1;
			price_to = 100000
		}
		else if (price == -1) {
			price_form = 9000
			proce_too = 100000
		}
		
		var type_arr = $('.acc_type:checked');
		var size_arr = $('.acc_size:checked');
		
		var type_check = checkLine(type_arr);
		var size_check = checkClass(size_arr);

		//query
		var promise = query({ prod_name: prod_name, price_from: price_from, 
			price_to: price_to, type: type_check, size: size_check });
		//append result to table
		promise.then(function(data)
		{
			var rows = "";
			var table = document.getElementById("result");
			deleteAllFromResultTable(table);

			var i = 0;
			$.each(data, function(){
    			rows += "<tr><td>" + "<div class=\"thumb_img_container\"><img class=\"thumb_img\" src=\"res/cloth_myth/product/" + data[i]['prod_id'] + "/thumb.jpg\"></img></div>" + "</td><td>" + 
    					this.prod_name + "</td><td>" + 
    					this.acc_type +	"</td><td>" + 
    					this.acc_size + "</td><td>" + 
    					this.price + "</td></tr>";
    			i++;
			});
			console.log(rows)

			$( rows ).appendTo( "#result" );


		});
	});
});
