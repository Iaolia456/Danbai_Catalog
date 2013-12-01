function query(option) {
	return $.ajax({
		url: 'php/gunpla_query.php',
		data: { prod_name: option.prod_name, price_from: option.price_from, price_to: option.price_to, grade: option.grade, series: option.series, brand: option.brand }
	})
}

function getTotalGunplaInEpisode() {
	return $.ajax({
		url: 'php/getTotalGunplaInEpisode.php'
	})
}

function getTotalGunplaInGrade() {
	return $.ajax({
		url: 'php/getTotalGunplaInGrade.php'
	})
}

function getTotalGunplaInBrand() {
	return $.ajax({
		url: 'php/getTotalGunplaInBrand.php'
	})
}


function checkAppear(appearance_arr) {
	var appearance = "";
	if (appearance_arr.length == 0) {
		appearance = "'Mobile Suit Gundam', 'Mobile Suit Zeta Gundam', 'Mobile Suit Gundam ZZ', 'Mobile Suit Gundam: Chars Counterattack','Mobile Suit Gundam Unicorn', 'New Mobile Report Gundam Wing', 'Mobile Suit Gundam Wing: Endless Waltz', 'After War Gundam X','Gundam SEED', 'Mobile Suit Gundam SEED Destiny', 'Mobile Suit Gundam OO'"
	}
	else {
		for(i=0; i<appearance_arr.length; i++) {
			appearance += "'" + appearance_arr[i].value + "'" + ",";
		}
		appearance = appearance.substring(0, appearance.length-1);
	}

	return appearance;
}

function checkGrade(grade_arr) {
	var grade = "";
	if (grade_arr.length == 0) grade = "'HG','RG','MG','PG'";
	else {
		
		for(i=0; i<grade_arr.length; i++) {
			grade += "'" + grade_arr[i].value + "'" + ",";
		}
		grade = grade.substring(0, grade.length-1);
	}
	
	return grade;
}

function checkBrand(brand_arr) {
	var brand = "";
	if (brand_arr.length == 0) brand = "'Bandai','Daban','TT Hongli','MC Model'"
	else {
		for(i=0; i<brand_arr.length; i++) {
			brand += "'" + brand_arr[i].value + "'" + ",";
		}
		brand = brand.substring(0, brand.length-1);
	}

	return brand;
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
	var grade_span_arr = $('.grade_span')
	var promise_grade = getTotalGunplaInGrade()
	promise_grade.then(function(data) {
		addCountNumberToSpan(grade_span_arr, data)
	})

	var ep_span_arr = $('.ep_span');
	var promise_ep = getTotalGunplaInEpisode()
	promise_ep.then(function(data) {
		addCountNumberToSpan(ep_span_arr, data)
	})

	var brand_span_arr = $('.brand_span');
	var promise_brand = getTotalGunplaInBrand()
	promise_brand.then(function(data) {
		addCountNumberToSpan(brand_span_arr, data)
	})


	$('#search_button').click(function() {
		var prod_name = $('#search_name').val();
		
		var price = $('#price_select').find(":selected").val()
		if (price == 0) {
			console.log('if')
			price_from = 1;
			price_to = 100000
		}
		else if (price == -1) {
			console.log('elseif')
			price_from = 18000
			price_to = 100000
		}
		else {
			console.log('else')
			price = $('#price_select').find(":selected").val().split('-');
			var price_from = price[0];
			var price_to = price[1];
		}

		var grade_arr = $('.grade:checked');
		var appearance_arr = $('.ep:checked');
		var brand_arr = $('.brand:checked');
		
		var grade = checkGrade(grade_arr);
		var appearance = checkAppear(appearance_arr);
		var brand = checkBrand(brand_arr);

		//query
		var promise = query({ prod_name: prod_name, price_from: price_from, 
			price_to: price_to, grade: grade, series: appearance, brand: brand });
		//append result to table
		var i = 0;
		promise.then(function(data)
		{
			var rows = "";
			var table = document.getElementById("result");
			deleteAllFromResultTable(table);
			
			$.each(data, function(){
    		rows += "<tr><td>" + "<div class=\"thumb_img_container\"><img class=\"thumb_img\" src=\"res/gunpla/product/" + data[i]['prod_id'] + "/thumb.jpg\"></img></div>" + "</td><td>" +
    		this.prod_name + "</td><td>" +
    		this.grade + "</td><td>" +
    		this.appear + "</td><td>" +
    		this.brand_name + "</td><td>" +
    		this.price + "</td></tr>";
    		i++;
			});

			$( rows ).appendTo( "#result" );
		});
	});
});
