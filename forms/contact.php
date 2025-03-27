<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "hr@tycheteks.com"; // ✅ Recipient Email
    $subject = trim($_POST["subject"]);
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $message = trim($_POST["message"]);

    // ✅ Validate Fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo "❌ All fields are required!";
        exit;
    }

    // ✅ Validate Email Format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "❌ Invalid email format!";
        exit;
    }

    // ✅ Email Headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // ✅ Email Body
    $body = "You have received a new message from your website contact form:\n\n";
    $body .= "👤 Name: $name\n";
    $body .= "📧 Email: $email\n";
    $body .= "📌 Subject: $subject\n\n";
    $body .= "💬 Message:\n$message\n";

    // ✅ Send Email
    if (mail($to, $subject, $body, $headers)) {
        echo "✅ Your message has been sent successfully!";
    } else {
        echo "❌ Error sending your message!";
    }
} else {
    echo "❌ Invalid request.";
}
?>
