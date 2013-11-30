<?php
function prepareQuery($sql, $params) {
	for ($i=0; $i<count($params); $i++) {
		$sql = preg_replace('/\!/', $params[$i], $sql, 1);
	}
	return $sql;
}


$db = mysqli_connect("localhost", "root", "", "danbai_shop");
$prod_name_string = '%'.$_GET['prod_name'].'%';

$sql = "SELECT `prod_id`, `prod_name`, `line`, `class_name`, `price`
    	FROM
		`danbai_shop`.`cloth_myth`
        	INNER JOIN `danbai_shop`.`saint_class`
        	ON `danbai_shop`.`cloth_myth`.`class_id` = `danbai_shop`.`saint_class`.`class_id`
    	WHERE `danbai_shop`.`cloth_myth`.`prod_name` LIKE (?)
    	AND `danbai_shop`.`cloth_myth`.`line` IN (!)
		AND `danbai_shop`.`cloth_myth`.`price` BETWEEN ? AND ?
    	AND `danbai_shop`.`saint_class`.`class_name` IN (!)
		ORDER BY `danbai_shop`.`cloth_myth`.`line`, `danbai_shop`.`saint_class`.`class_name`, `danbai_shop`.`cloth_myth`.`price`
";

$param = array($_GET['line'], $_GET['saint_class']);
$sql = prepareQuery($sql, $param);
$statement = mysqli_prepare($db, $sql);

echo mysqli_error($db);

// i = int
// s = string
// d = double
mysqli_stmt_bind_param($statement, 'sii', $prod_name_string, $_GET['price_from'], $_GET['price_to']);
mysqli_stmt_execute($statement);
mysqli_stmt_bind_result($statement, $prod_id, $prod_name, $line, $class_name, $price);

$product = array();
while (mysqli_stmt_fetch($statement)) {
	$product[] = array(
		'prod_id' => $prod_id,
		'prod_name' => $prod_name,
		'line' => $line,
		'class_name' => $class_name,
		'price' => $price
	);
}

header('Content-Type: application/json');
echo json_encode($product);
