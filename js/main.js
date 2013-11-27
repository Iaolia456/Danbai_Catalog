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

		var grade = $('#grade').val();
		var appearance = $('#ep').val();
		var brand = $('#brand').val();

		var promise = query({ prod_name: prod_name, price_from: price_from, price_to: price_to, grade: grade, series: series, brand: brand });
	})
})
