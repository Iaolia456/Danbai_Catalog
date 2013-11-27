$(function() {
	$('#search').click(function() {

		var name = $('#search_name').val();
		var grade = $('#select_grade').find(":selected").val();
		var appearance = $('#appear_in').find(":selected").val();
		var price = $('#price_range').find(":selected").val();

		var promise = query({ name: name, grade: grade, appearance: appearance, price: price });
	})
})