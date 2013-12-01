<?php
$db = mysqli_connect("localhost", "root", "", "danbai_shop");

$prod_id_arr = explode(",", $_GET['prod_id']);
$result = new array()
for ($i=0; $i < count($prod_id_arr); $i++) {
	$sql = "SELECT url
			FROM `danbai_shop`.`gunpla` INNER JOIN `danbai_shop`.`gunpla_imageurl`
			ON `danbai_shop`.`gunpla`.`prod_id` = `danbai_shop`.`gunpla_imageurl`.`prod_id`
			WHERE `danbai_shop`.`clothmyth_imageurl`.`prod_id` = ?";

	$statement = mysqli_prepare($db, $sql);
	echo mysqli_error($db);

	// i = int
	// s = string
	// d = double
	mysqli_stmt_bind_param($statement, 'i', $prod_id_arr[$i]);
	mysqli_stmt_execute($statement);
	mysqli_stmt_bind_result($statement, $image_url);

	array_push($result, $image_url)
}

header('Content-Type: application/json');
echo json_encode($result);