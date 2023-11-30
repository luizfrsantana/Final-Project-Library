<?php

$registrationCode = $_POST['registrationCodeBorrowing'];
$isbn = $_POST['isbn'];

$jsonFile = file_get_contents("data/borrowingData.json");
$data = json_decode($jsonFile, true);

$newData = array(
    "registration_code" => $registrationCode,
    "isbn" => $isbn
);

$data[] = $newData;

$jsonData = json_encode($data);
file_put_contents("data/borrowingData.json", $jsonData);

$bookJsonFile = file_get_contents("data/bookData.json");
$books = json_decode($bookJsonFile, true);

foreach ($books as &$book) {
    if ($book['isbn'] == $isbn) {
        $newAvailables = strval(intval($book['availables']) - 1);
        $book['availables'] = $newAvailables;
        break;
    }
}

$bookJsonData = json_encode($books);
file_put_contents("data/bookData.json", $bookJsonData);

header('Location: /index.html');
exit;
?>
