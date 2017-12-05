<?php

//echo "<script type='text/javascript'>alert('lalalal');</script>";
// error_reporting(E_ALL);
// error_reporting(-1);
// ini_set('display_errors', 'On');

include('./libpdb.php');

$f = fopen("X_RAY_WHOLE_PDBS_CHAINS.txt", "r");

if(isset($_POST["PDB"]) && $_POST["PDB"] !="")
{
	$pdb   = strtoupper($_POST["PDB"]);
}
else if( $_GET["PDB"] !=""){
	$pdb = strtoupper($_GET["PDB"]);
}

else if(isset($_POST["PDB2"]) && $_POST["PDB2"] !="")
{
	$pdb   = strtoupper($_POST["PDB2"]);
}

else if( $_GET["PDB2"] !=""){
	$pdb = strtoupper($_GET["PDB2"]);
}
//echo $pdb;
if( $_POST["cutoff"] !=""){
	$cutoff = $_POST["cutoff"];
}
else{
	$cutoff = "0.5";
}

if( $_POST["filter_chain"] !=""){
	$filter_chain = $_POST["filter_chain"];
}
else{
	$filter_chain = "";
}

if( $_POST["filter_norm_abs"] !=""){
	$filter_norm_abs = $_POST["filter_norm_abs"];
	$filter_weight = $_POST["filter_weight"];
}
else{
	$filter_norm_abs = "";
	$filter_weight = "";
}

// if( $_POST["ligandcutoff"] !=""){
// 	$ligandcutoff = $_POST["ligandcutoff"];
// }
// else{
	$ligandcutoff = "4";
// }
//PARSE THE PDB NOW!!!

$pdbpath = "./XRAY_INPUT/" . $pdb . ".pdb";

if ( !file_exists($pdbpath)){

	// $status = system("cd ../structures_database/; mkdir ". $pdb );

	//&compression=NO deleted below as curl does not work
	 $status = system("cd ./XRAY_INPUT; curl -o " . $pdb . ".pdb ". ' "http://www.rcsb.org/pdb/download/downloadFile.do?fileFormat=pdb&structureId=' . $pdb . '" >/dev/null');
	 //ADDITIONAL CODE TO COPY WHICHEVER STRUCTURE IS REQUESTED INTO INPUT FOLDER
	 //THIS IS DONE TO KEEP TRACK OF THE NEW STRUCTURES ENTERED BY THE USERS
	 // SO it IS THE SAME EXCEPT THAT THE INPUT STRUCTURE IS READ FROM "INPUT" FOLDER AND THE JSON OUTPUTS ARE WRITTEN TO "STRUCTURES" FOLDER
	 //I THEN COPY THE OUTPUTS TO OUR NEW FOLDER "STRUCTURE_DATABASE" IN THEIR STRUCTURE FOLDERS
	 $status = system("cp ./XRAY_INPUT/" . $pdb . ".pdb ./input/");

	 $pdbpath_input_beforeddsp = "./input/" . $pdb . "_beforedssp.pdb";
	 $pdbpath_input = "./input/" . $pdb . ".pdb";

	 $status = system("cp " . $pdbpath_input . " " . $pdbpath_input_beforeddsp);

}

$newpdb = new PDBFile($pdbpath);

//echo $pdbpath;

//echo $newpdb->type;

$checkxray = 0;

  //IF HEADER IS PRESENT IN THE FILE, LOOK AT EXPDTA
 	if($newpdb->checkType == -1){

 		if($newpdb->type == "X-RAY"){
 			if($newpdb->checkSS != -1){
 				//APPLY DSSP AND DSSP2PDB
 				$status = system("bin/dssp -i " . $pdbpath_input_beforeddsp . " -o ./input/" . $pdb . ".dssp");

          if ( file_exists( "./input/" . $pdb . ".dssp" )){
     				$status = system("bin/dssp2pdb ./input/" . $pdb . ".dssp " . $pdbpath_input_beforeddsp . " > " . $pdbpath_input);
    				$status = system("cp -f ./input/" . $pdb . ".pdb ./XRAY_INPUT/");
          }

 			}
 		}
 		else{
 		  //give warning saying this is NMR or MD
  		$message = "Please upload an X-RAY structure. Thank you.";
 		  $message = json_encode($message);

 		  $checkxray = -1;

  		//$status = system("rm -f " . $uploadfile_beforedssp);
  		//$status = system("rm -f " . $uploadfile);

	 		echo "alert({$message});";
	 		echo "window.location='index.html'";
 		}
 	}
 	//IF HEADER IS NOT PRESENT IN THE FILE, LOOK AT MODEL (IF MODEL PRESENT, IT IS EITHER NMR OR MD)
 	else{
 		if($newpdb->checkNMR == -1){
 			//give warning saying this is NMR or MD
    		$message = "Please upload an X-RAY structure. Thank you.";
  		    $message = json_encode($message);

 			 $checkxray = -1;

	   		//$status = system("rm -f " . $uploadfile_beforedssp);
	   		//$status = system("rm -f " . $uploadfile);

			echo "alert({$message});";
			echo "window.location='index.html'";
 		}
 		else{
 			//THIS IS X-RAY OR EM SO CONTINUE
 			if($newpdb->checkSS != -1){
 				//APPLY DSSP AND DSSP2PDB
 				$status = system("bin/dssp -i " . $pdbpath_input_beforeddsp . " -o ./input/" . $pdb . ".dssp");

          if ( file_exists( "./input/" . $pdb . ".dssp" )){
 				    $status = system("bin/dssp2pdb ./input/" . $pdb . ".dssp " . $pdbpath_input_beforeddsp . " > " . $pdbpath_input);
				    $status = system("cp -f ./input/" . $pdb . ".pdb ./XRAY_INPUT/");
          }

 			}
 		}
 	}

	if( $checkxray == 0){

		$chainsarray = $newpdb->chains;

		$im = 0;

		while($im<sizeof($chainsarray)){

			if($im==0 && sizeof($chainsarray)!=1 ){

				$chains = $chainsarray[$im] . "-";
			}

			else if($im==0 && sizeof($chainsarray)==1 ){

				$chains = $chainsarray[$im];
			}

			else if($im==sizeof($chainsarray)-1){

				$chains .= $chainsarray[$im];
			}

			else{
				$chains .= $chainsarray[$im] . "-";
			}

			$im++;
		}
		//echo $chains;
		//print("<script>window.location='" . "index_single_chains.html?pdb=" . $pdb . "&" . $chains . "';</script>");

		 $i=sizeof($chainsarray);

		 $chain = $chains;

		 $chainstr=$chains . "-";

		$path = "./";


		// ///////////////////////////////////////

		$variant = "";
		$status = exec("python uniprot_api.py " . $pdb);
		if($status=="-"){
			$variant = "no";
		}
		else{
			$variant = $status;
		}

		// print $variant;
		// exit();

//////////////////////////////////////////

 	// 	 if($i>1){

 			 if ($pdb && !preg_match('/[^A-Za-z0-9_]/', $pdb) ){

				 if ( $cutoff == "0.5" && ! file_exists( $path . "structures_database/". $pdb )){

               if ( system("cd " . $path . "bin; ./constructnetwork_v9.out " . $pdb . " 0.5 ") == 1){
                       print "Processing file failed";
                       exit();
               }

              //MOVE EVERY OUTPUT CREATED TO THEIR RESPECTED FOLDERS
             // $status = system("mv ./structures/" . $pdb . "* ./structures_database/" . $pdb . "/");
              $status = system("mv ./structures/" . $pdb . " ./structures_database/");
              $status = system("cd " . $path . "structures_database/; chmod 777 ". $pdb);
              //$status = system("mv ./structures/pops.out ./structures_database/" . $pdb . "/; mv ./structures/sigma.out ./structures_database/" . $pdb . "/");
         }

 					else if ( $cutoff != "0.5" && ! file_exists( $path . "structures_database_" . $cutoff . "/". $pdb ) && $filter_chain == "" && $filter_norm_abs == "" && $_POST["ligandcutoff"] ==""){

                if ( system("cd " . $path . "bin; ./constructnetwork_v9.out " . $pdb . " " . $cutoff . " ") == 1){
                        print "Processing file failed";
                        exit();
                }

 							 //MOVE EVERY OUTPUT CREATED TO THEIR RESPECTED FOLDERS
 							 $status = system("mv ./structures/" . $pdb . "/ ./structures_database_" . $cutoff . "/");
							 $status = system("cd " . $path . "structures_database_" . $cutoff . "/; chmod 777 ". $pdb);
 							 //$status = system("mv ./structures/pops.out ./structures_database_" . $cutoff . "/" . $pdb . "/; mv ./structures/sigma.out ./structures_database_" . $cutoff . "/" . $pdb . "/");
 	 		     }

					 else if ( $filter_chain != ""){

						 //  ./constructnetwork_v10.out 2HPY 0.5 none not needed
 						//  ./constructnetwork_v10.out 2HPY 0.5 absolute 20
 						//  ./constructnetwork_v10.out 2HPY 0.5 ligand=8 normalized 4
 						//  ./constructnetwork_v10.out 2HPY 0.5 ligand=3
 						//  ./constructnetwork_v10.out 2HPY 0.5 main-main not working
						//  ./constructnetwork_v10.out 2HPY 0.5 ligand=4 main-main

								 if ( system("cd " . $path . "bin; ./constructnetwork_v10.out " . $pdb . " " . $cutoff . " ligand=" . $ligandcutoff . " ". $filter_chain) == 1){
												 print "Processing file failed";
												 exit();
								 }

								$status = system("cd ./structures_database-filter_by_chain/" . $filter_chain . "/; chmod 777 ". $pdb);
					 }

					 else if ( $filter_norm_abs != ""){

								 if ( system("cd " . $path . "bin; ./constructnetwork_v10.out " . $pdb . " " . $cutoff . " ligand=" . $ligandcutoff . " ". $filter_norm_abs . " ". $filter_weight) == 1){
												 print "Processing file failed";
												 exit();
								 }
								 $status = system("mkdir ./structures_database-filter_by_weight/" . $filter_norm_abs . "/" . $filter_weight ."/; chmod 777 ". $filter_weight);
								 $status = system("mv ./structures_database-filter_by_weight/" . $filter_norm_abs . "/" . $pdb . " ./structures_database-filter_by_weight/" . $filter_norm_abs . "/" . $filter_weight ."/;");
								 $status = system("cd ./structures_database-filter_by_weight/" . $filter_norm_abs . "/" . $filter_weight ."/; chmod 777 ". $pdb);
					 }
					 //
					//  else if( $_POST["ligandcutoff"] !=""){
					// 	 if ( system("cd " . $path . "bin; ./constructnetwork_v10.out " . $pdb . " " . $cutoff . " ligand=" . $ligandcutoff) == 1){
					// 					 print "Processing file failed";
					// 					 exit();
					// 	 }
					// 	$status = system("cd ./structures_database-ligand-cutoff/; chmod 777 ". $pdb);
					//  }

					 // the aromatic or noncovalent contact types selected
			 		else if(!empty($_POST['filter'])) {

						// $status = exec("rm -rf structures_database-filter_by_contact_type/");

						if(! file_exists( $path . "XRAY_INPUT/". $pdb . ".contacts")){
							$status = exec("/www/users/rajini/miniconda2/bin/python arpeggio/arpeggio.py " . $pdbpath);
							// $status = shell_exec("/www/users/rajini/miniconda2/bin/python -V 2>&1");
							// echo $status;
						}

							$contact_types = $_POST['filter'];
							$status = exec("/www/users/rajini/miniconda2/bin/python filter_contacts/main.py " . $pdb . " " . $contact_types . " ./");
			 		}

 					/* AJAX check, if the request is sent from ajax, aka from index.html  */
					if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
						if(!empty($_POST['filter'])) {
							echo "window.location='" . "views/matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&filter_contacttype=". $contact_types . "&cutoff=". $cutoff . "';";
						}
						else if ( $filter_chain != ""){
							echo "window.location='" . "views/matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&filter_chain=". $filter_chain . "&cutoff=". $cutoff . "';";
						}
						else if ( $filter_norm_abs != ""){
							echo "window.location='" . "views/matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&filter_norm_abs=". $filter_norm_abs . "&filter_weight=". $filter_weight . "&cutoff=". $cutoff . "';";
						}
						// else if ( $ligandcutoff != ""){
						// 	echo "window.location='" . "views/matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&ligandcutoff=". $ligandcutoff . "&cutoff=". $cutoff . "';";
						// }
						else{
							echo "window.location='" . "views/matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&cutoff=". $cutoff . "';";
						}
 					}

 					//else if the request is sent directly from a link which is from the advanced search when the keyword is entered and a pdb id is clicked
 					else{
						if(!empty($_POST['filter'])) {
							print("<script>window.location='" . "views/matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&filter_contacttype=". $contact_types . "&cutoff=". $cutoff . "';</script>");
						}
						else if ( $filter_chain != ""){
							print("<script>window.location='" . "views/matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&filter_chain=". $filter_chain . "&cutoff=". $cutoff . "';</script>");
						}
						else if ( $filter_norm_abs != ""){
							print("<script>window.location='" . "views/matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&filter_norm_abs=". $filter_norm_abs . "&filter_weight=". $filter_weight . "&cutoff=". $cutoff . "';</script>");
						}
						// else if ( $ligandcutoff != ""){
						// 	print("<script>window.location='" . "views/matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&ligandcutoff=". $ligandcutoff . "&cutoff=". $cutoff . "';</script>");
						// }
						else{
							print("<script>window.location='" . "views/matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&cutoff=". $cutoff . "';</script>");
						}

 					}

 			 	}
 	// 	 }

 	// 	 else{
		 //
 	// 		if ($pdb && !preg_match('/[^A-Za-z0-9_]/', $pdb) && $chain && !preg_match('/[^A-Za-z0-9]/', $chain) ){
 	// 				if ( ! file_exists( $path . "structures_database_" . $cutoff . "/". $pdb )){
		 //
    //           if ( system("cd " . $path . "bin; ./constructnetwork_v9.out " . $pdb . " " . $cutoff . " ") == 1){
    //               print "Processing file failed";
    //               exit();
    //           }
 	// 					 $status = system("mv ./structures/" . $pdb . "/ ./structures_database_" . $cutoff . "/");
		// 				 $status = system("cd " . $path . "structures_database_" . $cutoff . "/; chmod 777 ". $pdb);
		 //
 	// 	       }
		 //
		// 				if(!empty($_POST['filter'])) {
		// 				$status = exec("/www/users/rajini/miniconda2/bin/python arpeggio/arpeggio.py " . $pdbpath);
		// 				$contact_types = $_POST['filter'];
		// 				$status = exec("/www/users/rajini/miniconda2/bin/python filter_contacts/main.py " . $pdb . " " . $contact_types . " ./");
		// 				}
		 //
 	// 			/* AJAX check, if the request is sent from ajax, aka from index.html  */
		// 		if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
		// 			if(!empty($_POST['filter'])) {
		// 				echo "window.location='" . "views/matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&filter_contacttype=". $contact_types . "&cutoff=". $cutoff . "';";
		// 			}
		// 			else{
		// 				echo "window.location='" . "views/matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&cutoff=". $cutoff . "';";
		// 			}
		// 		}
		 //
		// 		//else if the request is sent directly from a link which is from the advanced search when the keyword is entered and a pdb id is clicked
		// 		else{
		// 			print("<script>window.location='" . "views/matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&cutoff=". $cutoff . "';</script>");
		// 		}
 	// 		}
 	// 	 }

}

fclose($f);

?>
