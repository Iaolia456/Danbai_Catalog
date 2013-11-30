function query(option) {
	return $.ajax({
		url: 'php/gunpla_query.php',
		data: { prod_name: option.prod_name, price_from: option.price_from, price_to: option.price_to, grade: option.grade, series: option.series, brand: option.brand }
	})
}

function checkAppear(appearance_arr) {
	var appearance = "";
	if (appearance_arr.length == 0) {
		appearance = "'Mobile Suit Gundam', 'Mobile Suit Zeta Gundam', 'Mobile Suit Gundam ZZ', 'Mobile Suit Gundam: Char's Counterattack','Mobile Suit Gundam Unicorn', 'New Mobile Report Gundam Wing', 'Mobile Suit Gundam Wing: Endless Waltz', 'New Mobile Report Gundam Wing: Endless Waltz', 'After War Gundam X','Mobile Suit Gundam SEED', 'Mobile Suit Gundam SEED Destiny', 'Mobile Suit Gundam OO', 'Mobile Suit Gundam Wing'"
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
	if (brand_arr.length == 0) brand = "'Bandai','Daban','TT Hongli','Momoko'"
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
		promise.then(function(data)
		{
			var rows = "";
			var table = document.getElementById("result");
			deleteAllFromResultTable(table);
			
			$.each(data, function(){
    		rows += "<tr><td>" + this.PIC + "</td><td>" + this.prod_name + "</td><td>" + this.grade + 
    		"</td><td>" + this.appear + "</td><td>" + this.brand_name + "</td><td>" 
    		+ this.price + "</td></tr>";
			});

			$( rows ).appendTo( "#result" );
		});
	});
});
