<?php
$db = mysqli_connect("localhost", "root", "", "danbai_shop");

$sql = "SELECT `danbai_shop`.`series`.`series_id`, count(`danbai_shop`.`gunpla`.`prod_id`) AS count
		FROM `danbai_shop`.`gunpla`
    		INNER JOIN `danbai_shop`.`appeared_in`
    		ON `danbai_shop`.`gunpla`.`prod_id` = `danbai_shop`.`appeared_in`.`prod_id`
        		INNER JOIN `danbai_shop`.`series`
        		ON `danbai_shop`.`appeared_in`.`series_id` = `danbai_shop`.`series`.`series_id`
		GROUP BY `series_name`
		ORDER BY `series_id`";

$statement = mysqli_prepare($db, $sql);
echo mysqli_error($db);
mysqli_stmt_execute($statement);
mysqli_stmt_bind_result($statement, $series_id, $count);

$result = array();
while (mysqli_stmt_fetch($statement)) {
	$result[] = array(
		'series_id' => $series_id,
		'count' => $count,
	);
}

header('Content-Type: application/json');
echo json_encode($result);
