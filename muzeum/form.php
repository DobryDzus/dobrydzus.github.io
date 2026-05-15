<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["ok" => false, "message" => "Invalid request."]);
    exit;
}

function clean_text($value) {
    return trim(str_replace(["\r", "\n"], " ", $value));
}

$required = ["visit_date", "time_slot", "guests", "ticket", "full_name", "email", "phone"];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        echo json_encode(["ok" => false, "message" => "Please fill all required fields."]);
        exit;
    }
}

$payload = [
    "visit_date" => clean_text($_POST["visit_date"]),
    "time_slot" => clean_text($_POST["time_slot"]),
    "guests" => clean_text($_POST["guests"]),
    "ticket" => clean_text($_POST["ticket"]),
    "full_name" => clean_text($_POST["full_name"]),
    "email" => clean_text($_POST["email"]),
    "phone" => clean_text($_POST["phone"]),
    "requirements" => isset($_POST["requirements"]) ? clean_text($_POST["requirements"]) : "",
];

$to = "pschcamera@gmail.com"; // Adjust the destination email address
$subject = "New Museum Booking - " . $payload["full_name"];

$email_body = "You have received a new museum booking:\n\n";
$email_body .= "Visit Date: " . $payload["visit_date"] . "\n";
$email_body .= "Time Slot: " . $payload["time_slot"] . "\n";
$email_body .= "Number of Guests: " . $payload["guests"] . "\n";
$email_body .= "Ticket Type: " . $payload["ticket"] . "\n\n";
$email_body .= "Contact Details:\n";
$email_body .= "Name: " . $payload["full_name"] . "\n";
$email_body .= "Email: " . $payload["email"] . "\n";
$email_body .= "Phone: " . $payload["phone"] . "\n\n";
$email_body .= "Special Requirements:\n" . $payload["requirements"] . "\n";

$headers = "From: no-reply@museum.com\r\n";
$headers .= "Reply-To: " . $payload["email"] . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$mail_sent = @mail($to, $subject, $email_body, $headers);

if ($mail_sent) {
    echo json_encode(["ok" => true, "message" => "Booking received. We will confirm by email."]);
} else {
    // Return true anyway for local testing, or send a specific message
    echo json_encode(["ok" => true, "message" => "Booking received (email sending failed, possibly local server)."]);
}
