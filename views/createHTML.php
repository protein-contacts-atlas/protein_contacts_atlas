<?php

$pdbname = $_POST['structure'];
$chain = $_POST['chain'];
$htmlcode = $_POST['code'];
//$htmlfile = $_POST['htmlfile'];

$status = system("cd ../pdftex-files/; mkdir " . $pdbname . "_" . $chain . "; chmod 777 ". $pdbname . "_" . $chain);

// $name_of_pdffile = "../pdftex-files/" . $pdbname . "_" . $chain . "/" . $pdbname . "_" . $chain .  ".pdf";
// $status = system("/opt/X11/bin/xvfb -a /usr/local/bin/wkhtmltopdf ../index.html ../index.pdf");

$name_of_htmlfile = "../pdftex-files/" . $pdbname . "_" . $chain . "/" . $pdbname . "_" . $chain .  ".html";
file_put_contents($name_of_htmlfile, $htmlcode);

?>