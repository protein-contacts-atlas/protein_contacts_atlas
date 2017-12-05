<?php

error_reporting(E_ALL ^ E_NOTICE);

$pdb=$_POST["comment"];

 // echo "Type: " . $pdb . "<br>";

 	   // $allowedExts = array("csv", "txt");
  //  	   $temp = explode(".", $_FILES["uploadedfile"]["name"]);
  //  	   $extension = end($temp);
 	 
		 	   // echo "Upload: " . $_FILES["uploadedfile"]["name"] . "<br>";
// 		 	   echo "Type: " . $_FILES["uploadedfile"]["type"] . "<br>";
// 		 	   echo "Size: " . ($_FILES["uploadedfile"]["size"] / 1024) . " kB<br>";
// 		 	   echo "Temp file: " . $_FILES["uploadedfile"]["tmp_name"] . "<br>";


				// $uploaddir = "../structures/";
	// 			$filename = basename($_FILES['uploadedfile']['name'], ".txt");
	// 			$timeNow = time();
	// 		    $uploadfile = $uploaddir . $filename . "_" . $timeNow . ".txt";
	//
	// 			if (! move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $uploadfile)) {
	// 			        print "Uploading file failed";
	// 			        exit();
	// 			}
	//
	//
	// 		    // echo 'File is uploaded successfully.';
	// 			$residues=array();
	// 			$residuenums=array();
	// 			$chains=array();
	// 			$values=array();
	//
	// 			$letter=array();
	// 			$combine=array();
	//
	// 			$arr = array();
	//
	// 			$i=0;
	// 			$y=0;
	//
	// 			$f = fopen($uploadfile, "r");
	//
	// 			while(!feof($f)) {
	// 			   // echo fgets($f) . "<br />";
	//
	// 			    $arrM = explode("\t",fgets($f));
	//
	// 				if ( $i > 0 ) {
	//
	// 					 //echo sizeof($arrM) . "<br />";
	// 					 //echo $arrM[1] . "<br />";
	//
	// 					 	$residues[$y]=$arrM[0];
	// 						$residues[$y] = trim($residues[$y], " \t");
	// 						$residuenums[$y]=$arrM[1];
	// 						$chains[$y]=$arrM[2];
	// 						$chains[$y] = trim($chains[$y], " \t");
	// 						$values[$y]=$arrM[3];
	// 						$values[$y] = trim($values[$y], " \n");
	//
	// 						//echo $residues[$y] . "\t". $residuenums[$y] . "\t" . $chains[$y] . "\t" . $values[$y] . "<br />";
	//
	//
	//
	// 						if($residues[$y]=="ALA"){
	// 							$letter[$y]="A";
	// 						}
	// 						else if($residues[$y]=="PHE"){
	// 							$letter[$y]="F";
	// 						}
	// 						else if($residues[$y]=="LEU"){
	// 							$letter[$y]="L";
	// 						}
	// 						else if($residues[$y]=="ILE"){
	// 							$letter[$y]="I";
	// 						}
	// 						else if($residues[$y]=="MET"){
	// 							$letter[$y]="M";
	// 						}
	// 						else if($residues[$y]=="VAL"){
	// 							$letter[$y]="V";
	// 						}
	// 						else if($residues[$y]=="SER"){
	// 							$letter[$y]="S";
	// 						}
	// 						else if($residues[$y]=="PRO"){
	// 							$letter[$y]="P";
	// 						}
	// 						else if($residues[$y]=="THR"){
	// 							$letter[$y]="T";
	// 						}
	// 						else if($residues[$y]=="TYR"){
	// 							$letter[$y]="Y";
	// 						}
	// 						else if($residues[$y]=="HIS"){
	// 							$letter[$y]="H";
	// 						}
	// 						else if($residues[$y]=="GLN"){
	// 							$letter[$y]="Q";
	// 						}
	// 						else if($residues[$y]=="ASN"){
	// 							$letter[$y]="N";
	// 						}
	// 						else if($residues[$y]=="LYS"){
	// 							$letter[$y]="K";
	// 						}
	// 						else if($residues[$y]=="ASP"){
	// 							$letter[$y]="D";
	// 						}
	// 						else if($residues[$y]=="GLU"){
	// 							$letter[$y]="E";
	// 						}
	// 						else if($residues[$y]=="CYS"){
	// 							$letter[$y]="C";
	// 						}
	// 						else if($residues[$y]=="TRP"){
	// 							$letter[$y]="W";
	// 						}
	// 						else if($residues[$y]=="ARG"){
	// 							$letter[$y]="R";
	// 						}
	// 						else if($residues[$y]=="GLY"){
	// 							$letter[$y]="G";
	// 						}
	//
	// 						else if($residues[$y]=="DG"){
	// 							$letter[$y]="DG";
	// 						}
	// 						else if($residues[$y]=="DC"){
	// 							$letter[$y]="DC";
	// 						}
	// 						else if($residues[$y]=="DA"){
	// 							$letter[$y]="DA";
	// 						}
	// 						else if($residues[$y]=="DU"){
	// 							$letter[$y]="DU";
	// 						}
	// 						else if($residues[$y]=="DT"){
	// 							$letter[$y]="DT";
	// 						}
	// 						else if($residues[$y]=="HET"){
	// 							$letter[$y]="HET";
	// 						}
	//
	//
	// 						$combine[$y]= $letter[$y].$residuenums[$y];
	//
	//
	// 						$arr[] = array('combine' => $combine[$y], 'name' => $residues[$y], 'number' => $residuenums[$y] , 'chain' => $chains[$y] , 'value' => $values[$y]);
	//
	// 						$y++;
	//
	//
	// 				}
	//
	// 	 			   $i++;
	//
	//
	// 					// print("<script>window.location='" . "index_single_chains_upload.html?pdb=" . $rest . "&" . $chains . "';</script>");
	//
	// 			}
	//
	// 			//echo json_encode($arr);
	//
	// 			//echo $pdb;
	//
	// 			$json=json_encode($arr);
	// 			$name=$uploadfile.".json";
	//
	// 			$fp = fopen($name, 'w');
	// 			fwrite($fp, $json);
	// 			fclose($fp);
	//
	// 			//print("annen" .  $pdb . "&encode=1" . "&json=" .$name .  "';</script>");
	// 			print("<script>window.location='" .  $pdb . "&encode=1" . "&json=" .$name .  "';</script>");

?>