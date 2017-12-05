<?php

error_reporting(E_ALL ^ E_NOTICE);

$pdb=$_POST["pdb"];

if ($_FILES['uploadedfile']['name']){

 	   $allowedExts = array("csv", "txt");
 	   $temp = explode(".", $_FILES["uploadedfile"]["name"]);
 	   $extension = end($temp);
 	   if ((($_FILES["uploadedfile"]["type"] == "text/csv") || ($_FILES["uploadedfile"]["type"] == "text/plain")) && ($_FILES["uploadedfile"]["size"] < 20000000) && in_array($extension, $allowedExts))
 	     {
		 	  if ($_FILES["uploadedfile"]["error"] > 0)
		 	   {
		 	   echo "Return Code: " . $_FILES["uploadedfile"]["error"] . "<br>";
		 	   }
		 	     else
		 	   {
		 	   // echo "Upload: " . $_FILES["uploadedfile"]["name"] . "<br>";
// 		 	   echo "Type: " . $_FILES["uploadedfile"]["type"] . "<br>";
// 		 	   echo "Size: " . ($_FILES["uploadedfile"]["size"] / 1024) . " kB<br>";
// 		 	   echo "Temp file: " . $_FILES["uploadedfile"]["tmp_name"] . "<br>";


				$uploaddir = "../structures/";
				$filename = basename($_FILES['uploadedfile']['name'], ".csv");
				$timeNow = time();
			  $uploadfile = $uploaddir . $filename . "_" . $timeNow . ".csv";

				if (! move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $uploadfile)) {
				        print "Uploading file failed";
				        exit();
				}


			    // echo 'File is uploaded successfully.';
				$residues=array();
				$residuenums=array();
				$chains=array();
				$values=array();

				$letter=array();
				$combine=array();

				$arr = array();

				$i=0;
				$y=0;

        if ($_FILES["uploadedfile"]["type"] == "text/plain"){
          $f = fopen($uploadfile, "r");

  				while(!feof($f)) {

  				    $arrM = explode("\t",fgets($f));

  					if ( $i >= 0 ) {

  							$chains[$y]=$arrM[0];
  							$chains[$y] = trim($chains[$y], " \t");
  							$residuenums[$y]=$arrM[1];
  							$values[$y]=$arrM[2];
  							$values[$y] = trim($values[$y], " \n");

  							//$arr[] = array('combine' => $combine[$y], 'name' => $residues[$y], 'number' => $residuenums[$y] , 'chain' => $chains[$y] , 'value' => $values[$y]);
  							$arr[] = array('number' => $residuenums[$y] , 'chain' => $chains[$y] , 'value' => $values[$y]);

  							$y++;
  					}
  		 			   $i++;
  						// print("<script>window.location='" . "index_single_chains_upload.html?pdb=" . $rest . "&" . $chains . "';</script>");
  				}
        }

        else if ($_FILES["uploadedfile"]["type"] == "text/csv"){

				$f = fopen($uploadfile, "r");

				while(!feof($f)) {
				   // echo fgets($f) . "<br />";

				    $arrM = explode(",",fgets($f));

					if ( $i >= 0 ) {

						 //echo sizeof($arrM) . "<br />";
						 //echo $arrM[1] . "<br />";

						 	// $residues[$y]=$arrM[0];
 							//$residues[$y] = trim($residues[$y], " \t");

							$chains[$y]=$arrM[0];
							$chains[$y] = trim($chains[$y], " ,");
							$residuenums[$y]=$arrM[1];
              $residuenums[$y] = trim($residuenums[$y], " \n");
							$values[$y]=$arrM[2];
							$values[$y] = trim($values[$y], " \n");

							//$arr[] = array('combine' => $combine[$y], 'name' => $residues[$y], 'number' => $residuenums[$y] , 'chain' => $chains[$y] , 'value' => $values[$y]);
							$arr[] = array('number' => $residuenums[$y] , 'chain' => $chains[$y] , 'value' => $values[$y]);

							$y++;
					}
		 			   $i++;
						// print("<script>window.location='" . "index_single_chains_upload.html?pdb=" . $rest . "&" . $chains . "';</script>");
				}
      }

				$json=json_encode($arr);
				$name=$uploadfile.".json";

				$fp = fopen($name, 'w');
				fwrite($fp, $json);
				fclose($fp);

				echo $name;

				//print("<script>window.location='" .  $pdb . "&encode=1" . "&json=" .$name .  "';</script>");


		   }
	   }
}



?>
