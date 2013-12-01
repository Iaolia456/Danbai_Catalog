<?php
$db = mysqli_connect("localhost", "root", "", "danbai_shop");

$sql = "SELECT `danbai_shop`.`accessory`.`acc_type`, count(`danbai_shop`.`accessory`.`acc_type`) AS count
		FROM `danbai_shop`.`accessory`
		GROUP BY `acc_type`
		ORDER BY `acc_type`";

$statement = mysqli_prepare($db, $sql);
echo mysqli_error($db);
mysqli_stmt_execute($statement);
mysqli_stmt_bind_result($statement, $type, $count);

$result = array();
while (mysqli_stmt_fetch($statement)) {
	$result[] = array(
		'type' => $type,
		'count' => $count,
	);
}

header('Content-Type: application/json');
echo json_encode($result);
