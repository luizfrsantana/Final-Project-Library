<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST["action"];

    if ($action == 'delete'){
        $existingData = array();
        $rowIndex = $_POST["rowIndex"];
        
    
        if (file_exists('data/readerData.json')) {
            $existingData = json_decode(file_get_contents('data/readerData.json'), true);
    
            if (array_key_exists($rowIndex, $existingData)) {
                
                unset($existingData[$rowIndex]);
    
                $existingData = array_values($existingData);
    
                file_put_contents('data/readerData.json', json_encode($existingData));
    
                header("Location: /forms/readers_form.html");
                exit();
            }
        }

    }elseif($action == 'edit'){
        $rowIndex = $_POST["rowIndex"];
        $existingData = array();

        if (file_exists('data\readerData.json')) {
            $existingData = json_decode(file_get_contents('data\readerData.json'), true);
        
            if (array_key_exists($rowIndex, $existingData)){
                $existingData[$rowIndex]["name"] = $_POST["name"];
                $existingData[$rowIndex]["dob"] = $_POST["dob"];
                $existingData[$rowIndex]["registration_code"] = $_POST["registration_code"];
                $existingData[$rowIndex]["phone"] = $_POST["phone"];
                $existingData[$rowIndex]["email"] = $_POST["email"];
                $existingData[$rowIndex]["address"] = $_POST["address"];

                file_put_contents('data\readerData.json', json_encode($existingData));

                header("Location: /forms/readers_form.html");
                exit();
            }
        }
    }elseif($action == 'add'){
        $formData = array(
            "name" => $_POST["name"],
            "dob" => $_POST["dob"],
            "registration_code" => $_POST["registration_code"],
            "phone" => $_POST["phone"],
            "email" => $_POST["email"],
            "address" => $_POST["address"],
        );
    
        $existingData = array();
        if (file_exists('data\readerData.json')) {
            $existingData = json_decode(file_get_contents('data\readerData.json'), true);
        }
    
        $existingData[] = $formData;
    
        file_put_contents('data\readerData.json', json_encode($existingData));
    
        header("Location: /forms/readers_form.html");
        exit();
    }
}
?>