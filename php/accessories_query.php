<?php
function prepareQuery($sql, $params) {
	for ($i=0; $i<count($params); $i++) {
		$sql = preg_replace('/\!/', $params[$i], $sql, 1);
	}
	return $sql;
}


$db = mysqli_connect("localhost", "root", "", "danbai_shop");

$sql = "SELECT `prod_id`, `prod_name`, `acc_type`, `acc_size`, `price`
    	FROM
		`danbai_shop`.`accessory`
        	INNER JOIN `danbai_shop`.`acc_size`
        	ON `danbai_shop`.`accessory`.`acc_size_id` = `danbai_shop`.`acc_size`.`acc_size_id`
    	WHERE `danbai_shop`.`accessory`.`acc_type` IN (!)
    	AND `danbai_shop`.`acc_size`.`acc_size` IN (!)
		ORDER BY `danbai_shop`.`accessory`.`acc_type`, `danbai_shop`.`acc_size`.`acc_size`, `danbai_shop`.`accessory`.`price`
";

$param = array($_GET['acc_type'], $_GET['acc_size']);
$sql = prepareQuery($sql, $param);
$statement = mysqli_prepare($db, $sql);

echo mysqli_error($db);

// i = int
// s = string
// d = double
mysqli_stmt_execute($statement);
mysqli_stmt_bind_result($statement, $prod_id, $prod_name, $acc_type, $acc_size, $price);

$product = array();
while (mysqli_stmt_fetch($statement)) {
	$product[] = array(
		'prod_id' => $prod_id,
		'prod_name' => $prod_name,
		'acc_type' => $acc_type,
		'acc_size' => $acc_size,
		'price' => $price
	);
}

header('Content-Type: application/json');
echo json_encode($product);
