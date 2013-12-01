<?php
$db = mysqli_connect("localhost", "root", "", "danbai_shop");

$sql = "SELECT `danbai_shop`.`brand`.`brand_name`, count(`danbai_shop`.`brand`.`brand_id`) AS count
		FROM `danbai_shop`.`gunpla`
			INNER JOIN `danbai_shop`.`brand`
			ON `danbai_shop`.`brand`.`brand_id` = `danbai_shop`.`gunpla`.`brand_id`
		GROUP BY `danbai_shop`.`gunpla`.`brand_id`
		ORDER BY `danbai_shop`.`brand`.`brand_name`";

$statement = mysqli_prepare($db, $sql);
echo mysqli_error($db);
mysqli_stmt_execute($statement);
mysqli_stmt_bind_result($statement, $brand_name, $count);

$result = array();
while (mysqli_stmt_fetch($statement)) {
	$result[] = array(
		'brand_name' => $brand_name,
		'count' => $count,
	);
}

header('Content-Type: application/json');
echo json_encode($result);
