<?php
$db = mysqli_connect("localhost", "root", "", "danbai_shop");

$sql = "SELECT `danbai_shop`.`saint_class`.`class_name`, count(`danbai_shop`.`saint_class`.`class_id`) AS count
		FROM `danbai_shop`.`cloth_myth`
			INNER JOIN `danbai_shop`.`saint_class`
			ON `danbai_shop`.`saint_class`.`class_id` = `danbai_shop`.`cloth_myth`.`class_id`
		GROUP BY `danbai_shop`.`cloth_myth`.`class_id`
		ORDER BY `danbai_shop`.`saint_class`.`class_id`";

$statement = mysqli_prepare($db, $sql);
echo mysqli_error($db);
mysqli_stmt_execute($statement);
mysqli_stmt_bind_result($statement, $class_name, $count);

$result = array();
while (mysqli_stmt_fetch($statement)) {
	$result[] = array(
		'class_name' => $class_name,
		'count' => $count,
	);
}

header('Content-Type: application/json');
echo json_encode($result);
