<?php

include('../libpdb.php');

$f = fopen("../X_RAY_WHOLE_PDBS_CHAINS.txt", "r");

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

if ( strlen($pdb) > 0 && !is_numeric($pdb[0]) ) {

	$message = "Please enter a PDB id. Thank you.";
  $message = json_encode($message);

  echo "alert({$message});";
	echo "window.location='../index.html'";
 }
//PARSE THE PDB NOW!!!

$pdbpath = "../XRAY_INPUT/" . $pdb . ".pdb";

//echo "<script type='text/javascript'>alert({$pdbpath1});</script>";
//print("<script type='text/javascript'>alert({$pdbpath});</script>");

if ( !file_exists($pdbpath)){

	// $status = system("cd ../structures_database/; mkdir ". $pdb );

	//&compression=NO deleted below as curl does not work
	 $status = system("cd ../XRAY_INPUT; curl -o " . $pdb . ".pdb ". ' "http://www.rcsb.org/pdb/download/downloadFile.do?fileFormat=pdb&structureId=' . $pdb . '" >/dev/null');
	 //ADDITIONAL CODE TO COPY WHICHEVER STRUCTURE IS REQUESTED INTO INPUT FOLDER
	 //THIS IS DONE TO KEEP TRACK OF THE NEW STRUCTURES ENTERED BY THE USERS
	 // SO it IS THE SAME EXCEPT THAT THE INPUT STRUCTURE IS READ FROM "INPUT" FOLDER AND THE JSON OUTPUTS ARE WRITTEN TO "STRUCTURES" FOLDER
	 //I THEN COPY THE OUTPUTS TO OUR NEW FOLDER "STRUCTURE_DATABASE" IN THEIR STRUCTURE FOLDERS
	 $status = system("cp ../XRAY_INPUT/" . $pdb . ".pdb ../input/");

	 $pdbpath_input_beforeddsp = "../input/" . $pdb . "_beforedssp.pdb";
	 $pdbpath_input = "../input/" . $pdb . ".pdb";

	 $status = system("cp " . $pdbpath_input . " " . $pdbpath_input_beforeddsp);

}

$newpdb = new PDBFile($pdbpath);

$checkxray = 0;

  //IF HEADER IS PRESENT IN THE FILE, LOOK AT EXPDTA
 	if($newpdb->checkType == -1){

 		if($newpdb->type == "X-RAY"){
 			if($newpdb->checkSS != -1){
 				//APPLY DSSP AND DSSP2PDB
 				$status = system("../bin/dssp -i " . $pdbpath_input_beforeddsp . " -o ../input/" . $pdb . ".dssp");

          if ( file_exists( "../input/" . $pdb . ".dssp" )){
     				$status = system("../bin/dssp2pdb ../input/" . $pdb . ".dssp " . $pdbpath_input_beforeddsp . " > " . $pdbpath_input);
    				$status = system("cp -f ../input/" . $pdb . ".pdb ../XRAY_INPUT/");
          }

 			}
 		}
 		else{
 		  //give warning saying this is NMR or MD
  		$message = "Please upload an X-RAY structure. Thank you.";
 		  $message = json_encode($message);

 		  $checkxray = -1;

	 		echo "alert({$message});";
	 		echo "window.location='../index.html'";
 		}
 	}
 	//IF HEADER IS NOT PRESENT IN THE FILE, LOOK AT MODEL (IF MODEL PRESENT, IT IS EITHER NMR OR MD)
 	else{
 		if($newpdb->checkNMR == -1){
 			//give warning saying this is NMR or MD
    		$message = "Please upload an X-RAY structure. Thank you.";
  		    $message = json_encode($message);

 			 $checkxray = -1;

			echo "alert({$message});";
			echo "window.location='../index.html'";
 		}
 		else{
 			//THIS IS X-RAY OR EM SO CONTINUE
 			if($newpdb->checkSS != -1){
 				//APPLY DSSP AND DSSP2PDB
 				$status = system("../bin/dssp -i " . $pdbpath_input_beforeddsp . " -o ../input/" . $pdb . ".dssp");

                if ( file_exists( "../input/" . $pdb . ".dssp" )){
 				    $status = system("../bin/dssp2pdb ../input/" . $pdb . ".dssp " . $pdbpath_input_beforeddsp . " > " . $pdbpath_input);
				    $status = system("cp -f ../input/" . $pdb . ".pdb ../XRAY_INPUT/");
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

		 $i=sizeof($chainsarray);

		 $chain = $chains;

		 $chainstr=$chains . "-";

		$path = "../";

		// ///////////////////////////////////////

		$variant = "";
		$status = exec("python uniprot_api_inviews.py " . $pdb);
		if($status=="-"){
			$variant = "no";
		}
		else{
			$variant = $status;
		}
		// print $variant;
		// exit();



		//////////////////////////////////////////

		if($cutoff == "0.5"){

   		 if($i>1){

   			 if ($pdb && !preg_match('/[^A-Za-z0-9_]/', $pdb) ){

   					if ( ! file_exists( $path . "structures_database/". $pdb )){

	                if ( system("cd " . $path . "bin; ./constructnetwork_v9.out " . $pdb . " 0.5 ") == 1){
	                        print "Processing file failed";
	                        exit();
	                }

   							 //MOVE EVERY OUTPUT CREATED TO THEIR RESPECTED FOLDERS
								// $status = system("mv ./structures/" . $pdb . "* ./structures_database/" . $pdb . "/");
   							 $status = system("mv ../structures/" . $pdb . " ../structures_database/");
								 $status = system("cd " . $path . "structures_database/; chmod 777 ". $pdb);
   							 //$status = system("mv ./structures/pops.out ./structures_database/" . $pdb . "/; mv ./structures/sigma.out ./structures_database/" . $pdb . "/");
   	 		        }

   					/* AJAX check, if the request is sent from ajax, aka from index.html  */
   					if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
   						/* special ajax here */
   						echo "window.location='" . "matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&cutoff=". $cutoff . "';";
   					}

   					//else if the request is sent directly from a link which is from the advanced search when the keyword is entered and a pdb id is clicked
   					else{
   						print("<script>window.location='" . "matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&cutoff=". $cutoff . "';</script>");
   					}

   			 	}
   		 }

   		 else{

   			if ($pdb && !preg_match('/[^A-Za-z0-9_]/', $pdb) && $chain && !preg_match('/[^A-Za-z0-9]/', $chain) ){


   					if ( ! file_exists( $path . "structures_database/". $pdb )){
   						//$status = system("cd ./structures_database/; mkdir ". $pdb . "; chmod 777 ". $pdb);
   				//if ( ! file_exists( $path . "structures_database/". $pdb . "/" . $pdb . "_" . $chain . ".json")){

                if ( system("cd " . $path . "bin; ./constructnetwork_v9.out " . $pdb . " 0.5 ") == 1){

                        print "Processing file failed";
                        exit();
                }
   						 $status = system("mv ../structures/" . $pdb . " ../structures_database/");
							 $status = system("cd " . $path . "structures_database/; chmod 777 ". $pdb);
   						 }

   				/* AJAX check, if the request is sent from ajax, aka from index.html  */
   				if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
   					/* special ajax here */
   					echo "window.location='" . "matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&cutoff=". $cutoff . "';";
   				}

   				//else if the request is sent directly from a link which is from the advanced search when the keyword is entered and a pdb id is clicked
   				else{
   					print("<script>window.location='" . "matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&cutoff=". $cutoff . "';</script>");
   				}
   			}
   		 }
		}

		else{//if cutoff not 0.5, then change the script to rerun with new cut off

   		 if($i>1){

   			 if ($pdb && !preg_match('/[^A-Za-z0-9_]/', $pdb) ){

   					if ( ! file_exists( $path . "structures_database_" . $cutoff . "/". $pdb )){
   						//$status = system("cd " . $path . "structures_database_" . $cutoff . "/; mkdir " . $pdb . "; chmod 777 ". $pdb);
   					//if ( ! file_exists( $path . "structures_database_" . $cutoff . "/". $pdb . "/" . $pdb . ".json")){

   	 		                if ( system("cd " . $path . "bin; ./constructnetwork_v9.out " . $pdb . " " . $cutoff . " ") == 1){
   	 		                        print "Processing file failed";
   	 		                        exit();
   	 		                }

   							 //MOVE EVERY OUTPUT CREATED TO THEIR RESPECTED FOLDERS
   							 $status = system("mv ../structures/" . $pdb . "/ ../structures_database_" . $cutoff . "/");
								 $status = system("cd " . $path . "structures_database_" . $cutoff . "/; chmod 777 ". $pdb);
								 //$status = system("mv ./structures/pops.out ./structures_database_" . $cutoff . "/" . $pdb . "/; mv ./structures/sigma.out ./structures_database_" . $cutoff . "/" . $pdb . "/");
   	 		        }

   					/* AJAX check, if the request is sent from ajax, aka from index.html  */
   					if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
   						/* special ajax here */
   						echo "window.location='" . "matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&cutoff=". $cutoff . "';";
   					}

   					//else if the request is sent directly from a link which is from the advanced search when the keyword is entered and a pdb id is clicked
   					else{
   						print("<script>window.location='" . "matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&cutoff=". $cutoff . "';</script>");
   					}

   			 	}
   		 }

   		 else{

   			if ($pdb && !preg_match('/[^A-Za-z0-9_]/', $pdb) && $chain && !preg_match('/[^A-Za-z0-9]/', $chain) ){


   					if ( ! file_exists( $path . "structures_database_" . $cutoff . "/". $pdb )){
   						//$status = system("cd ./structures_database_" . $cutoff . "/; mkdir ". $pdb . "; chmod 777 ". $pdb);
   					//if ( ! file_exists( $path . "structures_database_" . $cutoff . "/". $pdb . "/" . $pdb . "_" . $chain . ".json")){

   		                if ( system("cd " . $path . "bin; ./constructnetwork_v9.out " . $pdb . " " . $cutoff . " ") == 1){

   		                        print "Processing file failed";
   		                        exit();
   		                }
   						 $status = system("mv ../structures/" . $pdb . "/ ../structures_database_" . $cutoff . "/");
							 $status = system("cd " . $path . "structures_database_" . $cutoff . "/; chmod 777 ". $pdb);
   						// $status = system("mv ./structures/pops.out ./structures_database_" . $cutoff . "/" . $pdb . "/; mv ./structures/sigma.out ./structures_database_" . $cutoff . "/" . $pdb . "/");
   		        	}

   				/* AJAX check, if the request is sent from ajax, aka from index.html  */
   				if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
   					/* special ajax here */
   					echo "window.location='" . "matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&cutoff=". $cutoff . "';";
   				}

   				//else if the request is sent directly from a link which is from the advanced search when the keyword is entered and a pdb id is clicked
   				else{
   					print("<script>window.location='" . "matrix.html?allchains=" . $pdb . '_' .  $chainstr  . "&variant=". $variant . "&cutoff=". $cutoff ."';</script>");
   				}
   			}
   		 }
		}


}

fclose($f);

?>
