<?php

$data = $_POST['base64data'];
$pdbname = $_POST['structure'];
$splomdata = $_POST['splom'];
$chain = $_POST['chain'];
$latexcode = $_POST['latexcode'];

list($type, $data) = explode(';', $data);
list(, $data)      = explode(',', $data);
$data = base64_decode($data);

$status = system("cd ../pdftex-files/; mkdir " . $pdbname . "_" . $chain . "; chmod 777 ". $pdbname . "_" . $chain);

$name_of_texfile = "../pdftex-files/" . $pdbname . "_" . $chain . "/" . $pdbname . "_" . $chain .  ".tex";

file_put_contents($name_of_texfile, $latexcode);

$name_of_image = "../pdftex-files/" . $pdbname . "_" . $chain .  "/" . $pdbname . "_" . $chain .  ".png";

file_put_contents($name_of_image, $data);

list($type, $splomdata) = explode(';', $splomdata);
list(, $splomdata)      = explode(',', $splomdata);
$splomdata = base64_decode($splomdata);

$name_of_image_splom = "../pdftex-files/" . $pdbname . "_" . $chain .  "/" .  $pdbname . "_" . $chain .  "_splom.png";

file_put_contents($name_of_image_splom, $splomdata);

$status = system("/usr/texbin/pdflatex --output-directory=\"../pdftex-files/" . $pdbname . "_" . $chain .  "/\" " . $name_of_texfile);
//$status = system("/usr/texbin/pdflatex --help");
//$status = system("pwd");

// $message = json_encode($status);
//
// echo $message;

//chmod($name_of_image_splom, 0644);
//chmod($name_of_image, 0644);

?>