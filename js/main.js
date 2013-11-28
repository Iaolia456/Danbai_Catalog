function query(option) {
	return $.ajax({
		url: 'php/query.php',
		data: { name: option.name, grade: option.grade, appearance: option.appearance, price: option.price }
	})
}

$(function() {
	$('#search').click(function() {

		var name = $('#search_name').val();
		var grade = $('#grade').val();
		var appearance = $('#ep').val();
		var brand = $('#brand').val();
		var price = $('#price_select').find(":selected").val();

		var promise = query({ name: name, grade: grade, appearance: appearance, price: price });
	})
})
