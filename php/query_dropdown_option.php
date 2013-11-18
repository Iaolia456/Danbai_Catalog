<?php
$db = mysqli_connect("localhost", "zp3097_aiolia", "Seiya456", "zp3097_rainfall");

$table_name = $_GET['region'];
$statement = mysqli_prepare($db, "SELECT DISTINCT `stn_name` FROM {$table_name}
									ORDER BY `stn_name` ASC");

echo mysqli_error($db);

mysqli_stmt_execute($statement);
mysqli_stmt_bind_result($statement, $stn_name);

$result = array();

while (mysqli_stmt_fetch($statement)) {
	$result[] = array(
		'stn_name' => $stn_name
	);
}

header('Content-Type: application/json');
echo json_encode($result);
