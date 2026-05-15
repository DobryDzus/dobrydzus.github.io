<?php
header("Content-Type: application/json; charset=UTF-8");

$file_path = "data/exhibitions.csv";
$exhibitions = [];

if (file_exists($file_path)) {
    if (($handle = fopen($file_path, "r")) !== false) {
        $header = fgetcsv($handle, 1000, ",");
        while (($data = fgetcsv($handle, 1000, ",")) !== false) {
            if (count($data) >= 5) {
                $exhibitions[] = [
                    "title" => $data[0],
                    "description" => $data[1],
                    "category" => $data[2],
                    "price" => $data[3],
                    "image" => $data[4]
                ];
            }
        }
        fclose($handle);
    }
}

echo json_encode(["ok" => true, "data" => $exhibitions]);
