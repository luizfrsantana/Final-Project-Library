<?php

$registrationCode = $_POST['registrationCodeBorrowing'];
$isbn = $_POST['isbn'];

$BorrowingJsonFile = file_get_contents("../data/borrowingData.json");
$data = json_decode($BorrowingJsonFile, true);

$newData = array(
    "registration_code" => $registrationCode,
    "isbn" => $isbn
);

$data[] = $newData;

$jsonData = json_encode($data);
file_put_contents("../data/borrowingData.json", $jsonData);

// Access bookData.json
$bookJsonFile = file_get_contents("../data/bookData.json");
$books = json_decode($bookJsonFile, true);

// Search for the book with matching ISBN
foreach ($books as &$book) {
    if ($book['isbn'] == $isbn) {
        // Subtract 1 from the availables value
        $newAvailables = strval(intval($book['availables']) - 1);
        $book['availables'] = $newAvailables;
        break;
    }
}

// Save the updated bookData.json
$bookJsonData = json_encode($books);
file_put_contents("../data/bookData.json", $bookJsonData);

// Redirect back to index page
header('Location: ../index.html');
exit;
?>
