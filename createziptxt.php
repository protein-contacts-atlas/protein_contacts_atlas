<?php

$pfam = $_POST['pfam'];
$pdbs = $_POST['pdbs'];

$pfamfile = "pfam_mapping/" . $pfam . ".zip";

if ( !file_exists($pfamfile)){

  $command = "zip -j pfam_mapping/" . $pfam . ".zip ";

  for ($x = 0; $x < count($pdbs); $x++) {
      $command .= "structures_database/" . $pdbs[$x] . "/" . $pdbs[$x] . "_txt.zip ";
  }

  $status = system($command);
  // $status = system("chmod 777 " . $pfam . ".zip");
}

?>
