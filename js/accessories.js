function query(option) {
	return $.ajax({
		url: 'php/accessories_query.php',
		data: {acc_type: option.acc_type, acc_size: option.acc_size }
	})
}

function checkType(type_arr) {
	var type = "";
	if (type_arr.length == 0) type = "'Action Base','Detailing Kits'";
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

function deleteAllFromResultTable(table) {
 for(var i = table.rows.length-1; i > 0; i--)
  table.deleteRow(i);
}

$(function() {
	$('#search_button').click(function() {
		
		var type_arr = $('.acc_type:checked');
		var size_arr = $('.acc_size:checked');
		
		var type_check = checkType(type_arr);
		var size_check = checkSize(size_arr);

		//query
		var promise = query({ acc_type: type_check, acc_size: size_check });
		//append result to table
		promise.then(function(data)
		{
			var rows = "";
			var table = document.getElementById("result");
			deleteAllFromResultTable(table);

			var i = 0;
			$.each(data, function(){
    			rows += "<tr><td>" + "<div class=\"thumb_img_container\"><img class=\"thumb_img\" src=\"res/accessories/product/" + data[i]['prod_id'] + "/thumb.jpg\"></img></div>" + "</td><td>" + 
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
