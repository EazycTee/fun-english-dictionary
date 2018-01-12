<?php
require_once 'vendor/autoload.php';

// To use the WordsAPI, we need to get an application key from: https://www.wordsapi.com/
// you should create this file yourself, and clarify $X_Mashape_Key & $X_Mashape_Host
// 为了使用 WordsAPI，需要在 https://www.wordsapi.com/ 申请一个账号，声明 $X_Mashape_Key 和 $X_Mashape_Host 变量，保存到以下文件：
require_once './wordsapi-keys.php';

if(!isset($_SERVER['HTTP_REFERER']) || !strstr($_SERVER['HTTP_REFERER'], 'http://dict.eazyc.info/')){
  echo "error";
  die();
}

$kw = rawurlencode($_GET['keyword']);
$page = rawurlencode($_GET['page']);
$response = Unirest\Request::get("https://wordsapiv1.p.mashape.com/words/?hasDetails=definitions&letterPattern=" . $kw . "&page=" . $page,
  array(
    "X-Mashape-Key" => $X_Mashape_Key,
    "X-Mashape-Host" => $X_Mashape_Host
  )
);
$result = $response->raw_body;

echo($result);
