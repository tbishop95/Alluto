<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../class/SearchQuery.php';

$database = new Database();
$db = $database->getConnection();
 
$searchqueries = new SearchQuery($db);

$searchqueries->id = (isset($_GET['id']) && $_GET['id']) ? $_GET['id'] : '0';

$result = $searchqueries->read();

if($result->num_rows > 0){    
    $itemRecords=array();
    $itemRecords["items"]=array(); 
	while ($searchqueries = $result->fetch_assoc()) { 	
        extract($searchqueries); 
        $itemDetails=array(
            "id" => $id,
            "where" => $where,
            "what" => $what,  
			"created" => $created,
        ); 
       array_push($itemRecords["items"], $itemDetails);
    }    
    http_response_code(200);     
    echo json_encode($itemRecords);
}else{     
    http_response_code(404);     
    echo json_encode(
        array("message" => "No search query found.")
    );
}
