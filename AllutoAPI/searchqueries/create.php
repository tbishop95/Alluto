<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once '../config/Database.php';
include_once '../class/SearchQuery.php';
 
$database = new Database();
$db = $database->getConnection();
 
$searchqueries = new SearchQuery($db);
 
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->where) && !empty($data->what) &&
!empty($data->created)){    

    $searchqueries->where = $data->where;
    $searchqueries->what = $data->what;   
    $searchqueries->created = date('Y-m-d H:i:s'); 
    
    if($searchqueries->create()){         
        http_response_code(201);         
        echo json_encode(array("message" => "Search Query Logged"));
    } else{         
        http_response_code(503);        
        echo json_encode(array("message" => "Unable to log search query."));
    }
}else{    
    http_response_code(400);    
    echo json_encode(array("message" => "Unable to log search query. Data is incomplete."));
}
