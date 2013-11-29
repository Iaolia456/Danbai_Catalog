function query(option) {
	return $.ajax({
		url: 'php/query.php',
		data: { prod_name: option.prod_name, price_from: option.price_from, price_to: option.price_to, grade: option.grade, series: series, brand: brand }
	})
}

$(function() {
	$('#search').click(function() {
		var prod_name = $('#search_name').val();
		
		var price = $('#price_select').find(":selected").val().split('-');
		var price_from = price[0];
		var price_to = price[1];

		var grade_arr = $('.grade:checked');
		var appearance_arr = $('.ep:checked');
		var brand_arr = $('.brand:checked');

		var grade = "";
		for(i=0; i<grade_arr.length; i++)
		{
			grade += "'" + grade_arr[i].val() + "'" + ",";
		}
		grade = grade.substring(0, grade.length-1);

		var appearance = "";
		for(i=0; i<appearance_arr.length; i++)
		{
			appearance += "'" + appearance_arr[i].val() + "'" + ",";
		}
		appearance = appearance.substring(0, grade.length-1);

		var brand = "";
		for(i=0; i<brand_arr.length; i++)
		{
			brand += "'" + brand_arr[i].val() + "'" + ",";
		}
		brand = brand.substring(0, brand.length-1);

		var promise = query({ prod_name: prod_name, price_from: price_from, 
			price_to: price_to, grade: grade, series: series, brand: brand });

		promise.then(function(data)
		{
			var rows = "";
			$.each(data, function(){
    		rows += "<tr><td>" + "asdasdq" + "<tr><td>" + this.prod_name + "</td><td>" + this.grade + 
    		"</td><td>" + this.appearance + "</td><td>" + this.brand + "</td></tr>";
			});

			$( rows ).appendTo( "#result" );
		}
	})
})
