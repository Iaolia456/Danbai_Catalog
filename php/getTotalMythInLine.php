<?php
$db = mysqli_connect("localhost", "root", "", "danbai_shop");

$sql = "SELECT `danbai_shop`.`cloth_myth`.`line`, count(`danbai_shop`.`cloth_myth`.`line`) AS count
		FROM `danbai_shop`.`cloth_myth`
		GROUP BY `line`
		ORDER BY `line`";

$statement = mysqli_prepare($db, $sql);
echo mysqli_error($db);
mysqli_stmt_execute($statement);
mysqli_stmt_bind_result($statement, $line, $count);

$result = array();
while (mysqli_stmt_fetch($statement)) {
	$result[] = array(
		'line' => $line,
		'count' => $count,
	);
}

header('Content-Type: application/json');
echo json_encode($result);
