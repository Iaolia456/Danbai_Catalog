<?php
$db = mysqli_connect("localhost", "root", "", "danbai_shop");

$sql = "SELECT `danbai_shop`.`acc_size`.`acc_size`, count(`danbai_shop`.`acc_size`.`acc_size_id`) AS count
		FROM `danbai_shop`.`accessory`
			INNER JOIN `danbai_shop`.`acc_size`
			ON `danbai_shop`.`acc_size`.`acc_size_id` = `danbai_shop`.`accessory`.`acc_size_id`
		GROUP BY `danbai_shop`.`accessory`.`acc_size_id`
		ORDER BY `danbai_shop`.`acc_size`.`acc_size_id` DESC";

$statement = mysqli_prepare($db, $sql);
echo mysqli_error($db);
mysqli_stmt_execute($statement);
mysqli_stmt_bind_result($statement, $acc_size, $count);

$result = array();
while (mysqli_stmt_fetch($statement)) {
	$result[] = array(
		'acc_size' => $acc_size,
		'count' => $count,
	);
}

header('Content-Type: application/json');
echo json_encode($result);
