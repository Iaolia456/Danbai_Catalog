function query(option) {
	return $.ajax({
		url: 'php/gunpla_query.php',
		data: { prod_name: option.prod_name, price_from: option.price_from, price_to: option.price_to, grade: option.grade, series: option.series, brand: option.brand }
	})
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

		var grade = "";
		for(i=0; i<grade_arr.length; i++)
		{
			grade += "'" + grade_arr[i].value + "'" + ",";
		}
		grade = grade.substring(0, grade.length-1);

		var appearance = "";
		for(i=0; i<appearance_arr.length; i++)
		{
			appearance += "'" + appearance_arr[i].value + "'" + ",";
		}
		appearance = appearance.substring(0, appearance.length-1);

		var brand = "";
		for(i=0; i<brand_arr.length; i++)
		{
			brand += "'" + brand_arr[i].value + "'" + ",";
		}
		brand = brand.substring(0, brand.length-1);

		var promise = query({ prod_name: prod_name, price_from: price_from, 
			price_to: price_to, grade: grade, series: appearance, brand: brand });

		promise.then(function(data)
		{
			var rows = "";
			var table = document.getElementById("result");
			for(var i = table.rows.length-1; i > 0; i--)
			{
				table.deleteRow(i);
			}
			$.each(data, function(){
    		rows += "<tr><td>" + this.PIC + "</td><td>" + this.prod_name + "</td><td>" + this.grade + 
    		"</td><td>" + this.appear + "</td><td>" + this.brand_name + "</td><td>" 
    		+ this.price + "</td></tr>";
			});

			$( rows ).appendTo( "#result" );
		});
	});
});
