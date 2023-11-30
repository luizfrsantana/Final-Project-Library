<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST["action"];

    if ($action == 'delete'){
        $existingData = array();
        $rowIndex = $_POST["rowIndex"];
        
    
        if (file_exists('../data/bookData.json')) {
            $existingData = json_decode(file_get_contents('../data/bookData.json'), true);
    
            if (array_key_exists($rowIndex, $existingData)) {
                
                unset($existingData[$rowIndex]);
    
                $existingData = array_values($existingData);
    
                file_put_contents('../data/bookData.json', json_encode($existingData));
    
                header("Location: /forms/books_form.html");
                exit();
            }
        }

    }elseif($action == 'edit'){
        $rowIndex = $_POST["rowIndex"];
        $existingData = array();

        if (file_exists('../data/bookData.json')) {
            $existingData = json_decode(file_get_contents('../data/bookData.json'), true);
        
            if (array_key_exists($rowIndex, $existingData)){
                $existingData[$rowIndex]["title"] = $_POST["title"];
                $existingData[$rowIndex]["author"] = $_POST["author"];
                $existingData[$rowIndex]["edition"] = $_POST["edition"];
                $existingData[$rowIndex]["year"] = $_POST["year"];
                $existingData[$rowIndex]["genre"] = $_POST["genre"];
                $existingData[$rowIndex]["publisher"] = $_POST["publisher"];
                $existingData[$rowIndex]["pages"] = $_POST["pages"];
                $existingData[$rowIndex]["isbn"] = $_POST["isbn"];
                $existingData[$rowIndex]["total"] = $_POST["total"];
                $existingData[$rowIndex]["availables"] = $_POST["availables"];

                file_put_contents('../data/bookData.json', json_encode($existingData));

                header("Location: /forms/books_form.html");
                exit();
            }
        }
    }elseif($action == 'add'){
        $formData = array(
            "title" => $_POST["title"],
            "author" => $_POST["author"],
            "edition" => $_POST["edition"],
            "year" => $_POST["year"],
            "genre" => $_POST["genre"],
            "publisher" => $_POST["publisher"],
            "pages" => $_POST["pages"],
            "isbn" => $_POST["isbn"],
            "total" => $_POST["total"],
            "availables" => $_POST["availables"]
        );
    
        $existingData = array();
        if (file_exists('../data/bookData.json')) {
            $existingData = json_decode(file_get_contents('../data/bookData.json'), true);
        }
    
        $existingData[] = $formData;
    
        file_put_contents('../data/bookData.json', json_encode($existingData));
    
        header("Location: ../forms/books_form.html");
        exit();
    }
}
?>