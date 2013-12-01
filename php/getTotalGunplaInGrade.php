<?php
$db = mysqli_connect("localhost", "root", "", "danbai_shop");

$sql = "SELECT `danbai_shop`.`gunpla`.`grade`, count(`danbai_shop`.`gunpla`.`grade`) AS count
		FROM `danbai_shop`.`gunpla`
		GROUP BY `grade`
		ORDER BY `grade`";

$statement = mysqli_prepare($db, $sql);
echo mysqli_error($db);
mysqli_stmt_execute($statement);
mysqli_stmt_bind_result($statement, $grade, $count);

$result = array();
while (mysqli_stmt_fetch($statement)) {
	$result[] = array(
		'grade' => $grade,
		'count' => $count,
	);
}

header('Content-Type: application/json');
echo json_encode($result);
