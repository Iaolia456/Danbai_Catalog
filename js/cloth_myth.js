function query(option) {
	return $.ajax({
		url: 'php/myth_query.php',
		data: { prod_name: option.prod_name, price_from: option.price_from, price_to: option.price_to, line: option.line, saint_class: option.saint_class }
	})
}

function getAllImageOfProdID(option) {
	return $.ajax({
		url: 'php/myth_query_image.php',
		data: { prod_id: option.prod_id }
	})
}

function getTotalMythInLine() {
	return $.ajax({
		url: 'php/getTotalMythInLine.php'
	})
}

function getTotalMythInClass() {
	return $.ajax({
		url: 'php/getTotalMythInClass.php'
	})
}

function checkLine(line_arr) {
	var grade = "";
	if (line_arr.length == 0) grade = "'EX','Original'";
	else {
		
		for(i=0; i<line_arr.length; i++) {
			grade += "'" + line_arr[i].value + "'" + ",";
		}
		grade = grade.substring(0, grade.length-1);
	}
	
	return grade;
}

function checkClass(class_arr) {
	var saint_class = "";
	if (class_arr.length == 0) saint_class = "'Bronze Saint','Silver Saint','Gold Saint','God Warrior','Mariner','Specter'"
	else {
		for(i=0; i<class_arr.length; i++) {
			saint_class += "'" + class_arr[i].value + "'" + ",";
		}
		saint_class = saint_class.substring(0, saint_class.length-1);
	}

	return saint_class;
}

function deleteAllFromResultTable(table) {
	for(var i = table.rows.length-1; i > 0; i--)
		table.deleteRow(i);
}

function addCountNumberToSpan(span_arr, data) {
	for (var i=0; i<span_arr.length; i++) {
			span_arr[i].innerHTML = span_arr[i].innerHTML + " (" + data[i]['count'] + ")";
		}
}

$(function() {
	var line_arr = $('.line_span')
	var promise_line = getTotalMythInLine()
	promise_line.then(function(data) {
		addCountNumberToSpan(line_arr, data)
	})

	var class_span_arr = $('.class_span');
	var promise_class = getTotalMythInClass()
	promise_class.then(function(data) {
		addCountNumberToSpan(class_span_arr, data)
	})

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
		
		var line_arr = $('.line:checked');
		var class_arr = $('.saint_class:checked');
		
		var line = checkLine(line_arr);
		var saint_class = checkClass(class_arr);

		//query
		var promise = query({ prod_name: prod_name, price_from: price_from, 
			price_to: price_to, line: line, saint_class: saint_class });
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
    					this.line +	"</td><td>" + 
    					this.class_name + "</td><td>" + 
    					this.price + "</td></tr>";
    			i++;
			});

			$( rows ).appendTo( "#result" );
		});
	});
});
