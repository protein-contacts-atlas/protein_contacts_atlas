<?php

include('./libpdb.php');

//PARSE THE PDB NOW!!!

// $cutoff = 0.5;

if ($_FILES['uploadedfile']['name']){

	if (isset($_POST["options"]))
	{
		$cutoff = $_POST["options"];
	}
	if (isset($_POST["options_chain_upload"]))
	{
		$filter_chain = $_POST["options_chain_upload"];
	}
	else {
		$filter_chain = "";
	}

	if (isset($_POST["options_norm_abs_upload"]))
	{
		$filter_norm_abs = $_POST["options_norm_abs_upload"];
		$filter_weight = $_POST["options_weight_upload"];
	}
	else {
		$filter_norm_abs = "";
		$filter_weight = "";
	}

	if( $_POST["options_ligandcutoff_upload"] !=""){
		$ligandcutoff = $_POST["options_ligandcutoff_upload"];
	}
	else{
		$ligandcutoff = "4";
	}

	//echo $cutoff;

        $uploaddir = "./XRAY_INPUT/";
        $filename = basename($_FILES['uploadedfile']['name'], ".pdb");
        $timeNow = time();

		if (strpos($filename, '-') !== FALSE){
			$filename = str_replace('-', '', $filename);
		}

		if (strpos($filename, '_') !== FALSE){
			$filename = str_replace('_', '', $filename);
		}

		$pdb = strtoupper($filename) . "" . $timeNow;

    $uploadfile = $uploaddir . $pdb . ".pdb";
		$uploadfile_beforedssp = $uploaddir . $pdb . "_beforedssp.pdb";

        if (! move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $uploadfile_beforedssp)) {
                print "Uploading file failed";
                exit();
        }

        chmod($uploadfile_beforedssp, 0644);

		$status = system("cp " . $uploadfile_beforedssp . " " . $uploadfile);

		 chmod($uploadfile, 0644);

	$newpdb = new PDBFile($uploadfile_beforedssp);

	 $checkxray = 0;

  //IF HEADER IS PRESENT IN THE FILE, LOOK AT EXPDTA
 	if($newpdb->checkType == -1){
 		if($newpdb->type == "X-RAY"){
 			if($newpdb->checkSS != -1){
 				//APPLY DSSP AND DSSP2PDB

 				$status = system("bin/dssp -i " . $uploadfile_beforedssp . " -o " . $uploaddir . $pdb . ".dssp");
 				$status = system("bin/dssp2pdb " . $uploaddir . $pdb . ".dssp " . $uploadfile_beforedssp . " > " . $uploadfile);

				//$status = system("mv " . $uploaddir . $pdb . ".dssp ./XRAY_INPUT_UPLOADED/");
 			}
 		}
 		else{
 		  //give warning saying this is NMR or MD
  		  $message = "Please upload an X-RAY structure. Thank you.";
 		  $message = json_encode($message);

 		  $checkxray = -1;

			$status = system("rm -f " . $uploadfile_beforedssp);
			$status = system("rm -f " . $uploadfile);

      	 echo "<script type='text/javascript'>alert({$message});</script>";
      	 print("<script>window.location='index.html';</script>");
 		}
 	}
 	//IF HEADER IS NOT PRESENT IN THE FILE, LOOK AT MODEL (IF MODEL PRESENT, IT IS EITHER NMR OR MD)
 	else{
 		if($newpdb->checkNMR == -1){
 			//give warning saying this is NMR or MD
    		$message = "Please upload an X-RAY structure. Thank you.";
  		    $message = json_encode($message);

 			 $checkxray = -1;

			 $status = system("rm -f " . $uploadfile_beforedssp);
			 $status = system("rm -f " . $uploadfile);

        	echo "<script type='text/javascript'>alert({$message});</script>";
        	print("<script>window.location='index.html';</script>");
 		}
 		else{
 			//THIS IS X-RAY OR EM SO CONTINUE
 			if($newpdb->checkSS != -1){
 				//APPLY DSSP AND DSSP2PDB

 				$status = system("bin/dssp -i " . $uploadfile_beforedssp . " -o " . $uploaddir . $pdb . ".dssp");
 				$status = system("bin/dssp2pdb " . $uploaddir . $pdb . ".dssp " . $uploadfile_beforedssp . " > " . $uploadfile);

				//$status = system("mv " . $uploaddir . $pdb . ".dssp ./XRAY_INPUT_UPLOADED/");

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

 		 $i=sizeof($chainsarray);

 		 $chain = $chains;

 		 $chainstr=$chains . "-";

 		 $path = "./";

		 ////////////////////////////

		 $variant = "no";

		 ////////////////////////////

	 		 	 if ($pdb && !preg_match('/[^A-Za-z0-9_]/', $pdb) ){

					 if($cutoff == "0.5" && $filter_chain == "" && $filter_norm_abs == "" && $_POST["options_ligandcutoff_upload"] ==""){

	            if ( system("cd " . $path . "bin; ./constructnetwork_v9.out " . $pdb . " 0.5 ") == 1){

	                    print "Processing file failed";
	                    exit();
	            }

	 		 			 //MOVE EVERY OUTPUT CREATED TO THEIR RESPECTED FOLDERS
	 		 			 $status = system("mv ./structures/" . $pdb . "/ ./structures_uploaded/");
						 $status = system("cd " . $path . "structures_uploaded/; chmod 777 ". $pdb);

						 $pathforfilter = "./structures_uploaded";
					 }

			 		 //if cutoff not 0.5, then change the script to rerun with new cut off
			 		 else if ($cutoff != "0.5" && $filter_chain == "" && $filter_norm_abs == "" && $_POST["ligandcutoff"] ==""){

	 		            if ( system("cd " . $path . "bin; ./constructnetwork_v9.out " . $pdb . " " . $cutoff . " ") == 1){

	 		                print "Processing file failed";
	 		                exit();
	 		            }

	 	 		 			 //MOVE EVERY OUTPUT CREATED TO THEIR RESPECTED FOLDERS
	 	 		 			 $status = system("mv ./structures/" . $pdb . "/ ./structures_uploaded_". $cutoff ."/");
	 						 $status = system("cd " . $path . "/structures_uploaded_". $cutoff ."/; chmod 777 ". $pdb);

							 $pathforfilter = "./structures_uploaded_" . $cutoff;
			 		}

					else if ( $filter_chain != ""){

								if ( system("cd " . $path . "bin; ./constructnetwork_v10.out " . $pdb . " " . $cutoff . " ligand=" . $ligandcutoff . " ". $filter_chain) == 1){
												print "Processing file failed";
												exit();
								}

							$status = system("cd ./structures_database-filter_by_chain/" . $filter_chain . "/; chmod 777 ". $pdb);

							$pathforfilter = "./structures_database-filter_by_chain/" . $filter_chain;
					}

					else if ( $filter_norm_abs != ""){

								if ( system("cd " . $path . "bin; ./constructnetwork_v10.out " . $pdb . " " . $cutoff . " ligand=" . $ligandcutoff . " ". $filter_norm_abs . " ". $filter_weight) == 1){
												print "Processing file failed";
												exit();
								}
								$status = system("mkdir ./structures_database-filter_by_weight/" . $filter_norm_abs . "/" . $filter_weight ."/; chmod 777 ". $filter_weight);
								$status = system("mv ./structures_database-filter_by_weight/" . $filter_norm_abs . "/" . $pdb . " ./structures_database-filter_by_weight/" . $filter_norm_abs . "/" . $filter_weight ."/;");
								$status = system("cd ./structures_database-filter_by_weight/" . $filter_norm_abs . "/" . $filter_weight ."/; chmod 777 ". $pdb);

								$pathforfilter = "./structures_database-filter_by_weight/" . $filter_norm_abs . "/" . $filter_weight;
					}

					else if( $_POST["options_ligandcutoff_upload"] !=""){
						if ( system("cd " . $path . "bin; ./constructnetwork_v10.out " . $pdb . " " . $cutoff . " ligand=" . $ligandcutoff) == 1){
										print "Processing file failed";
										exit();
						}
					 $status = system("cd ./structures_database-ligand-cutoff/; chmod 777 ". $pdb);

					 $pathforfilter = "./structures_database-ligand-cutoff";

					}

					// the aromatic or noncovalent contact types selected
				  if(!empty($_POST['contact_type_array'])) {

						//try arpeggio seperately
						 $status = exec("/www/users/rajini/miniconda2/bin/python arpeggio/arpeggio.py " . $uploadfile);

						 foreach($_POST["contact_type_array"] as $key){
	        		// echo $key;
							 //add commas and put into string
							$contact_types .= $key . ",";
	      		 }
						 rtrim($contact_types,',');
						 //specify path of files
						 $status = exec("/www/users/rajini/miniconda2/bin/python filter_contacts/main.py " . $pdb . " " . $contact_types . " " . $pathforfilter);
				 }

					$status = system("mv " . $uploadfile ." ./XRAY_INPUT_UPLOADED/");
					$status = system("mv " . $uploadfile_beforedssp ." ./XRAY_INPUT_UPLOADED/");

 					/* AJAX check, if the request is sent from ajax, aka from index.html  */
 					if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
 						/* special ajax here */
						if(!empty($_POST['contact_type_array'])) {
							echo "window.location='" . "views/results_uploaded.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&filter_contacttype=". $contact_types . "&cutoff=". $cutoff . "';";
						}
						if ( $filter_chain != ""){
							echo "window.location='" . "views/results_uploaded.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&filter_chain=". $filter_chain . "&cutoff=". $cutoff . "';";
						}
						else if ( $filter_norm_abs != ""){
							echo "window.location='" . "views/results_uploaded.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&filter_norm_abs=". $filter_norm_abs . "&filter_weight=". $filter_weight . "&cutoff=". $cutoff . "';";
						}
						else if ( $_POST["options_ligandcutoff_upload"] !=""){
							echo "window.location='" . "views/results_uploaded.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&ligandcutoff=". $ligandcutoff . "&cutoff=". $cutoff . "';";
						}
						else{
							echo "window.location='" . "views/results_uploaded.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&cutoff=". $cutoff . "';";
						}
 					}

 					//else if the request is sent directly from a link which is from the advanced search when the keyword is entered and a pdb id is clicked
 					else{
						if(!empty($_POST['contact_type_array'])) {
							print("<script>window.location='" . "views/results_uploaded.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&filter_contacttype=". $contact_types . "&cutoff=". $cutoff . "';</script>");
						}
						else if ( $filter_chain != ""){
							print("<script>window.location='" . "views/results_uploaded.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&filter_chain=". $filter_chain . "&cutoff=". $cutoff . "';</script>");
						}
						else if ( $filter_norm_abs != ""){
							print("<script>window.location='" . "views/results_uploaded.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&filter_norm_abs=". $filter_norm_abs . "&filter_weight=". $filter_weight . "&cutoff=". $cutoff . "';</script>");
						}
						else if ( $_POST["options_ligandcutoff_upload"] !=""){
							print("<script>window.location='" . "views/results_uploaded.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&ligandcutoff=". $ligandcutoff . "&cutoff=". $cutoff . "';</script>");
						}
						else{
 							print("<script>window.location='" . "views/results_uploaded.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&cutoff=". $cutoff . "';</script>");
						}
 					}

		 }
 	}
}
?>
