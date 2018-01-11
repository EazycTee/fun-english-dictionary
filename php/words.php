<?php
require_once 'vendor/autoload.php';

// To use the WordsAPI, we need to get an application key from: https://www.wordsapi.com/
// you should create this file yourself, and clarify $X_Mashape_Key & $X_Mashape_Host
require_once './wordsapi-keys.php';

if(!isset($_SERVER['HTTP_REFERER']) || !strstr($_SERVER['HTTP_REFERER'], 'http://dict.eazyc.info/')){
    echo "error";
    die();
}

$kw = rawurlencode($_GET['keyword']);
$response = Unirest\Request::get("https://wordsapiv1.p.mashape.com/words/" . $kw,
  array(
    "X-Mashape-Key" => $X_Mashape_Key,
    "X-Mashape-Host" => $X_Mashape_Host
  )
);
$result = $response->raw_body;

echo($result);