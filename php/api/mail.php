<?php declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once '../tersus_config.php';
require './lib/Exception.php';
require './lib/PHPMailer.php';
require './lib/SMTP.php';

$mail = new PHPMailer();
$mail->IsSMTP(); // Send via SMTP
$mail->Host = SMTP_HOST;
$mail->SMTPAuth = true;

$mail->Username = SMTP_USERNAME;
$mail->Password = SMTP_PASSWORD;

$mail->From = SMTP_FROM;
$mail->FromName = SMTP_FROM_NAME;
$mail->AddAddress('peter.gigler@gmail.com'); // To
$mail->AddReplyTo('info@tersus.hu');

$mail->WordWrap = 80; // Word wrap
// $mail->AddAttachment('/var/tmp/file.tar.gz');
$mail->IsHTML(true);

$mail->Subject = 'Here is the subject';
$mail->Body = 'This is the <b>HTML body</b>';
$mail->AltBody = 'This is the text-only body';

if (!$mail->Send()) {
	echo 'Email not sent';
	echo 'Error occured: ' . $mail->ErrorInfo;
	exit();
}

echo 'Email sent successfully';
?>
