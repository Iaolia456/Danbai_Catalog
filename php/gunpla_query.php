<?php
function prepareQuery($sql, $params) {
	for ($i=0; $i<count($params); $i++) {
		$sql = preg_replace('/\!/', $params[$i], $sql, 1);
	}
	return $sql;
}


$db = mysqli_connect("localhost", "root", "", "danbai_shop");
$prod_name_string = '%'.$_GET['prod_name'].'%';

$sql = "SELECT `danbai_shop`.`gunpla`.`prod_id`, `danbai_shop`.`gunpla`.`prod_name`, `danbai_shop`.`gunpla`.`grade`,
				`danbai_shop`.`gunpla`.`brand_id`, `danbai_shop`.`gunpla`.`price`
	FROM `danbai_shop`.`gunpla`
	WHERE `danbai_shop`.`gunpla`.`price` BETWEEN ? AND ?
	AND `danbai_shop`.`gunpla`.`prod_name` LIKE (?)
	AND `danbai_shop`.`gunpla`.`grade` IN (!)
	AND `danbai_shop`.`gunpla`.`prod_id`
	IN (
    	SELECT `gunpla`.`prod_id`
    	FROM
    	`danbai_shop`.`series` 
    	INNER JOIN `danbai_shop`.`appeared_in`
    	ON `danbai_shop`.`series`.`series_id` = `danbai_shop`.`appeared_in`.`series_id`
        	INNER JOIN `danbai_shop`.`gunpla`
        	ON `danbai_shop`.`appeared_in`.`prod_id` = `danbai_shop`.`gunpla`.`prod_id`
            	INNER JOIN `danbai_shop`.`brand`
            	ON `danbai_shop`.`brand`.`brand_id` = `danbai_shop`.`gunpla`.`brand_id`
    	WHERE `series_name` IN (!)
    	AND `brand_name` IN (!)
	)
	ORDER BY `danbai_shop`.`gunpla`.`brand_id`, 
       `danbai_shop`.`gunpla`.`grade`, `danbai_shop`.`gunpla`.`price`";

$param = array($_GET['grade'], $_GET['series'], $_GET['brand']);
$sql = prepareQuery($sql, $param);
$statement = mysqli_prepare($db, $sql);

echo mysqli_error($db);

// i = int
// s = string
// d = double
mysqli_stmt_bind_param($statement, 'iis', $_GET['price_from'], $_GET['price_to'], $prod_name_string);
mysqli_stmt_execute($statement);
mysqli_stmt_bind_result($statement, $prod_id, $prod_name, $grade, $brand_name, $price);

$product = array();
while (mysqli_stmt_fetch($statement)) {
	$product[] = array(
		'prod_id' => $prod_id,
		'prod_name' => $prod_name,
		'grade' => $grade,
		'appear' => '',
		'brand_name' => $brand_name,
		'price' => $price
	);
}

for ($i=0; $i < count($product); $i++) {
    $statement = mysqli_prepare($db,
	"SELECT `series_name`
	FROM
	`danbai_shop`.`series` 
    	INNER JOIN `danbai_shop`.`appeared_in`
    	ON `danbai_shop`.`series`.`series_id` = `danbai_shop`.`appeared_in`.`series_id`
        	INNER JOIN `danbai_shop`.`gunpla`
        	ON `danbai_shop`.`appeared_in`.`prod_id` = `danbai_shop`.`gunpla`.`prod_id`
	WHERE `gunpla`.`prod_id` = ?");

	mysqli_stmt_bind_param($statement, 'i', $product[$i]['prod_id']);
	mysqli_stmt_execute($statement);
	mysqli_stmt_bind_result($statement, $series_name);

	$series_string = '';
	while (mysqli_stmt_fetch($statement)) {
		$series_string = $series_string.$series_name.', ';
	}
	$series_string = substr($series_string, 0, -2);

	$product[$i]['appear'] = $series_string;
}

for ($i=0; $i < count($product); $i++) {
    $statement = mysqli_prepare($db,
	"SELECT `brand`.`brand_name`
	FROM 
	`danbai_shop`.`gunpla`
		INNER JOIN `danbai_shop`.`brand`
		ON `danbai_shop`.`gunpla`.`brand_id` = `danbai_shop`.`brand`.`brand_id`
	WHERE `danbai_shop`.`gunpla`.`prod_id` = ?");

	mysqli_stmt_bind_param($statement, 'i', $product[$i]['prod_id']);
	mysqli_stmt_execute($statement);
	mysqli_stmt_bind_result($statement, $brand_name);

	$brand_string = '';
	while (mysqli_stmt_fetch($statement)) {
		$brand_string = $brand_string.$brand_name.', ';
	}
	$brand_string = substr($brand_string, 0, -2);

	$product[$i]['brand_name'] = $brand_name;
}

header('Content-Type: application/json');
echo json_encode($product);
