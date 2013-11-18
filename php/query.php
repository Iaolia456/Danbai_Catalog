<?php
$db = mysqli_connect("localhost", "zp3097_aiolia", "Seiya456", "zp3097_rainfall");
$table_name = $_GET['region'];

$statement = mysqli_prepare($db, "SELECT `stn_name`, `stncode`, `year`, `month`, `dday`, `maxtmp`, `mintmp`, `meantemp`, `rain`, `datetime` FROM {$table_name}
									WHERE `stn_name` = ?
										AND `datetime` >= ?
										AND `datetime` <= ?
									ORDER BY `datetime` ASC");

echo mysqli_error($db);

// i = int
// s = string
// d = double
mysqli_stmt_bind_param($statement, 'sii', $_GET['stn_name'], $_GET['from'], $_GET['to']);
mysqli_stmt_execute($statement);
mysqli_stmt_bind_result($statement, $stn_name, $stncode, $year, $month, $dday, $maxtmp, $mintmp, $meantemp, $rain, $datetime);

$result = array();

while (mysqli_stmt_fetch($statement)) {
	$result[] = array(
		'stn_name' => $stn_name,
		'stncode' => $stncode,
		'year' => $year,
		'month' => $month,
		'dday' => $dday,
		'maxtmp' => $maxtmp,
		'mintmp' => $mintmp,
		'meantemp' => $meantemp,
		'rain' => $rain
	);
}

header('Content-Type: application/json');
echo json_encode($result);
