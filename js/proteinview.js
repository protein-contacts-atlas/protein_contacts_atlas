var viewOptions = getviewOptions();

// var glmol01_load = new GLmol('glmol01_load', true);
var glmol01 = new GLmol('glmol01', true);
var glmol01_load;

var chain = "A";
//var json;
var filename = document.location.href;

var chains = new Array;
var highlightedAtoms;

//NOT NEEDED FOR NOW
var aminoacids = new Array;
aminoacids[0] = "ALA";
aminoacids[1] = "PHE";
aminoacids[2] = "LEU";
aminoacids[3] = "ILE";
aminoacids[4] = "MET";
aminoacids[5] = "VAL";
aminoacids[6] = "SER";
aminoacids[7] = "PRO";
aminoacids[8] = "THR";
aminoacids[9] = "TYR";
aminoacids[10] = "HIS";
aminoacids[11] = "GLN";
aminoacids[12] = "ASN";
aminoacids[13] = "LYS";
aminoacids[14] = "ASP";
aminoacids[15] = "GLU";
aminoacids[16] = "CYS";
aminoacids[17] = "TRP";
aminoacids[18] = "ARG";
aminoacids[19] = "GLY";

var pdb_name;
var pathname_database;
var pathname_uploaded;
var cutoff;
var filter_contacttype;
var filter_norm_abs;
var filter_chain;
var ligandcutoff;



// Asynchronously download the specified PDB file, and save into a newly created textarea
// If the load argument is 1, also load into the viewer
function getPDB (pdb, load, firstload,colors){

	cutoff = viewOptions.cutoff;

	if(cutoff=="0.5"){
		pathname_database = "../structures_database";
		pathname_uploaded = "../structures_uploaded";
	}
	else{
		pathname_database = "../structures_database_"+cutoff;
		pathname_uploaded = "../structures_uploaded_"+cutoff;
	}

	if (viewOptions.filter_contacttype) {
		filter_contacttype = viewOptions.filter_contacttype;
		pathname_database = "../structures_database-filter_by_contact_type/"+filter_contacttype;
		pathname_uploaded = "../structures_database-filter_by_contact_type/"+filter_contacttype;
	}

	if (viewOptions.filter_chain) {
		filter_chain = viewOptions.filter_chain;
		pathname_database = "../structures_database-filter_by_chain/"+filter_chain;
		pathname_uploaded = "../structures_database-filter_by_chain/"+filter_chain;
	}

	if (viewOptions.filter_norm_abs) {
		filter_norm_abs = viewOptions.filter_norm_abs;
		pathname_database = "../structures_database-filter_by_weight/"+filter_norm_abs+"/"+viewOptions.filter_weight;
		pathname_uploaded = "../structures_database-filter_by_weight/"+filter_norm_abs+"/"+viewOptions.filter_weight;
	}

	if (viewOptions.ligandcutoff) {
		ligandcutoff = viewOptions.ligandcutoff;
		pathname_database = "../structures_database-ligand-cutoff/";
		pathname_uploaded = "../structures_database-ligand-cutoff/";
	}

	var b=viewOptions.pdb.indexOf("_");
	pdb_name = pdb.substring(0, b);
	 //var pdb_name = "2HPV_A";

	//if( viewOptions.pdb.indexOf('-') > -1 ){
	if( firstload === 1 ){

      	 var temp_chains = viewOptions.pdb.slice(b+1);
      	 chains = temp_chains.split('-');

 		var tit;

		var title;
		var titleStr;

	    d3.select("#glmol01_load").append("textarea")
	    .attr("id", "a" + pdb_name + "_src")
	    .style("display", "none");

		if(filename.indexOf("matrix.html")>-1){

		      $.get("../XRAY_INPUT/" + pdb_name + ".pdb", function(ret) {
		          $("#" + "a" + pdb_name + "_src").val(ret);

		          if (load === 1) {

					  //settimeout was used because somehow the initialization of glmol was done even before the div it is in is created therefore, it messed up the initialization, for now it is fine (after we handle the creation of tables but if settimeout is called, first div is created that glmol is called)
					 //setTimeout(function() {
						  //THIS INITIALIZATION IS DONE HERE, BECAUSE OTHERWISE 100% FOR WIDTH AND HEIGHT DID NOT WORK, THE PANELS WIDTH AND HEIGHT WERE NOT SET TO PROPER SIZES BEFORE THIS IS CALLED IN THE BEGINNING. NOW, THEY ARE ALREADY SET TO PROPER SIZES SO THE GLMOL01_LOAD CAN BE INITIALIZED.
						  glmol01_load = new GLmol('glmol01_load', true);
			        glmol01_load.loadMoleculeStr(null, $('#' + "a" + pdb_name + '_src').val(), colors, chains);

						  reDrawProteinAllChains([], []);
						 // alert($('#glmol01_load').width()+"\t"+$('#glmol01_load').height()+"\t"+$('.modal-body').width()+"\t"+$('.col-md-6').width()+"\t"+$('#interactionGraph').width());
				 	// }, 500);

     		      tit=parsePDBTitle($('#' + "a" + pdb_name + '_src').val());

     				tit = tit.toLowerCase().replace(/\b[a-z]/g, function(letter) {
     				    return letter.toUpperCase();
     				});

     			    title = $('#glmol01_pdbTitle2');

     			    titleStr = '';
     		    	//titleStr +="Protein ID: ";
     				titleStr += '<h3>' + tit ;

						// <a class='pdb-links' pdb-id='1cbs' href='javascript:void(0);'>1cbs</a>
     			  //  if (tit != '') titleStr +=  '(<a href="http://www.rcsb.org/pdb/explore/explore.do?structureId=' + pdb_name + '"target="_blank" style="color: #A0A1A2">' + pdb_name + '</a> <a href="http://www.ebi.ac.uk/pdbe/entry/pdb/' + pdb_name + '" target="_blank"><img src="../img/pdbelogo.png" width="25" height="25" title="Click to go to the PDBe entry"></a>) <h3> <br>';
						if (tit != '') titleStr +=  '<a class=\'pdb-links\' pdb-id=\'' + pdb_name + '\' href=\'javascript:void(0);\' style="color: #A0A1A2">(' + pdb_name + ')</a> <a href="http://www.ebi.ac.uk/pdbe/pisa/cgi-bin/piserver?qa=' + pdb_name + '"target="_blank" style="color: #A0A1A2"> (PDBePISA)</a><h3> <br>';
							title.html(titleStr);

		         }


		      });
	  	}
		else{

	      $.get("../XRAY_INPUT_UPLOADED/" + pdb_name + ".pdb", function(ret) {
	          $("#" + "a" + pdb_name + "_src").val(ret);

	          if (load === 1) {
				//  setTimeout(function() {
  				  	glmol01_load = new GLmol('glmol01_load', true);
  	          glmol01_load.loadMoleculeStr(null, $('#' + "a" + pdb_name + '_src').val(), colors, chains);

					reDrawProteinAllChains([], []);
				//  }, 500);

	         }

	        tit=parsePDBTitle($('#' + "a" + pdb_name + '_src').val());

			tit = tit.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			    return letter.toUpperCase();
			});

		    title = $('#glmol01_pdbTitle2');

		    titleStr = '';
	    	//titleStr +="Protein ID: ";
			titleStr += '<h3>' + tit ;
		    if (tit != '') titleStr +=  '<a>(' + pdb_name + ')</a> <h3><br>';
		    title.html(titleStr);
	      });
		}



         if(filename.indexOf("matrix")>-1){
            $.get("../XRAY_INPUT/" + pdb_name + ".pdb", function(ret) {
                 $("#" + "a" + pdb2 + "_src").val(ret);

                tit=parsePDBTitle($('#' + "a" + pdb_name + '_src').val());

                tit = tit.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase();
                });

                title = $('#glmol01_pdbTitle');

                titleStr = '';
                //titleStr +="Protein ID: ";
                titleStr += '<h3>' + tit ;

								if (tit != '') titleStr +=  '<a class=\'pdb-links\' pdb-id=\'' + pdb_name + '\' href=\'javascript:void(0);\' style="color: #A0A1A2">(' + pdb_name + ')</a> <a href="http://www.ebi.ac.uk/pdbe/pisa/cgi-bin/piserver?qa=' + pdb_name + '"target="_blank" style="color: #A0A1A2"> (PDBePISA)</a> <h3> <br>';
                //if (tit != '') titleStr +=  '(<a href="http://www.rcsb.org/pdb/explore/explore.do?structureId=' + pdb2 + '"target="_blank" style="color: #A0A1A2">' + pdb_name + '</a> <a href="http://www.ebi.ac.uk/pdbe/entry/pdb/' + pdb_name + '" target="_blank"><img src="../img/pdbelogo.png" width="25" height="25" title="Click to go to the PDBe entry"></a>) <h3> <br>';
							  title.html(titleStr);


            });
        }
        else{
            $.get("../XRAY_INPUT_UPLOADED/" + pdb_name + ".pdb", function(ret) {
                 $("#" + "a" + pdb_name + "_src").val(ret);

                tit=parsePDBTitle($('#' + "a" + pdb_name + '_src').val());

                tit = tit.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase();
                });

                title = $('#glmol01_pdbTitle');

                titleStr = '';
                //titleStr +="Protein ID: ";
                titleStr += '<h3>' + tit ;
                if (tit != '') titleStr +=  '<a>(' + pdb_name + ')</a> <h3><br>';
                title.html(titleStr);

            });
        }


  }

  else{

    d3.select("#glmol01").append("textarea")
    .attr("id", "a" + pdb + "_src")
    .style("display", "none");

	if(filename.indexOf("matrix")>-1){

		  //$.get("../XRAY_INPUT/" + pdb_name + ".pdb", function(ret) {
	     $.get(pathname_database + "/" +pdb_name+"/" + pdb + ".pdb", function(ret) {
	        $("#" + "a" + pdb + "_src").val(ret);

	        if (load === 1) {

	           // glmol01.loadMoleculeStr(null, $('#' + "a" + pdb + '_src').val(), [], chains);
						 glmol01.loadMoleculeStr(null, $('#' + "a" + pdb + '_src').val());

	        }
	    });
	}

	else{
	    $.get(pathname_uploaded + "/" +pdb_name+"/" + pdb + ".pdb", function(ret) {
	        $("#" + "a" + pdb + "_src").val(ret);

	        if (load === 1) {

	           // glmol01.loadMoleculeStr(null, $('#' + "a" + pdb + '_src').val(), [], chains);
				glmol01.loadMoleculeStr(null, $('#' + "a" + pdb + '_src').val());

	        }
	    });
	}

	var tit;

	 var pdb2 = pdb.substring(0, b);

    d3.select("#glmol01").append("textarea")
    .attr("id", "a" + pdb2 + "_src")
    .style("display", "none");

	var title;
	var titleStr;

	 if(filename.indexOf("matrix")>-1){
	    $.get("../XRAY_INPUT/" + pdb2 + ".pdb", function(ret) {
	         $("#" + "a" + pdb2 + "_src").val(ret);

	        tit=parsePDBTitle($('#' + "a" + pdb2 + '_src').val());

			tit = tit.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			    return letter.toUpperCase();
			});

		    title = $('#glmol01_pdbTitle');

		    titleStr = '';
	    	//titleStr +="Protein ID: ";
			titleStr += '<h3>' + tit ;

			if (tit != '') titleStr +=  '<a class=\'pdb-links\' pdb-id=\'' + pdb_name + '\' href=\'javascript:void(0);\' style="color: #A0A1A2">(' + pdb_name + ')</a><a href="http://www.ebi.ac.uk/pdbe/pisa/cgi-bin/piserver?qa=' + pdb_name + '"target="_blank" style="color: #A0A1A2"> (PDBePISA)</a> <h3> <br>';
		    //if (tit != '') titleStr +=  '(<a href="http://www.rcsb.org/pdb/explore/explore.do?structureId=' + pdb2 + '"target="_blank" style="color: #A0A1A2">' + pdb2 + '</a> <a href="http://www.ebi.ac.uk/pdbe/entry/pdb/' + pdb_name + '" target="_blank"><img src="../img/pdbelogo.png" width="25" height="25" title="Click to go to the PDBe entry"></a>) <h3> <br>';
				title.html(titleStr);

	    });
	}
	else{
	    $.get("../XRAY_INPUT_UPLOADED/" + pdb2 + ".pdb", function(ret) {
	         $("#" + "a" + pdb2 + "_src").val(ret);

	        tit=parsePDBTitle($('#' + "a" + pdb2 + '_src').val());

			tit = tit.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			    return letter.toUpperCase();
			});

		    title = $('#glmol01_pdbTitle');

		    titleStr = '';
	    	//titleStr +="Protein ID: ";
			titleStr += '<h3>' + tit ;
		    if (tit != '') titleStr +=  '<a>(' + pdb2 + ')</a> <h3><br>';
		    title.html(titleStr);

	    });
	}
  }
}

function initializeProteinView(highlighted, colors, load){

	//alert(viewOptions.pdb.length);
	//alert(viewOptions.pdb[0]);

	if(load===1){

	    if( Object.prototype.toString.call( viewOptions.pdb ) === '[object Array]' ) {

	        // For each pdb in the URL, add the PDB ID to the 'structureList' menu
	        // Then call getPDB() to download and load
	        for (var i=0; i < viewOptions.pdb.length; i++){
	            var pdb = viewOptions.pdb[i];


	            d3.select("#structureList").append("option").attr("value", pdb).text(pdb);
				d3.select("#structureList2").append("option").attr("value", pdb).text(pdb);
				d3.select("#structureList3").append("option").attr("value", pdb).text(pdb);

	            if (viewOptions.structure && pdb === viewOptions.structure ){
	                getPDB(pdb, 1, 1,colors);
	            }else if (!viewOptions.structure && i === 0){
	                getPDB(pdb, 1, 1,colors);
	            } else {
	                getPDB(pdb, 0, 1,colors);
	            }
	        }

	    } else {

	       	 getPDB(viewOptions.pdb, 1, 1,colors);

	    }

	}

	else{

	    if( Object.prototype.toString.call( viewOptions.pdb ) === '[object Array]' ) {

	        // For each pdb in the URL, add the PDB ID to the 'structureList' menu
	        // Then call getPDB() to download and load
	        for (var i=0; i < viewOptions.pdb.length; i++){
	            var pdb = viewOptions.pdb[i];


	            d3.select("#structureList").append("option").attr("value", pdb).text(pdb);
				d3.select("#structureList2").append("option").attr("value", pdb).text(pdb);
				d3.select("#structureList3").append("option").attr("value", pdb).text(pdb);

	            if (viewOptions.structure && pdb === viewOptions.structure ){

	                getPDB(pdb, 1, 0);
	            }else if (!viewOptions.structure && i === 0){

	                getPDB(pdb, 1, 0);
	            } else {

	                getPDB(pdb, 0, 0);
	            }
	        }

	    } else {
	       	 	getPDB(viewOptions.pdb, 1, 0);
	    }
	}

    // Apply highlighting
	//reDrawProteinAll(highlighted, colors);
}

function changeDisplayMode(type){
	viewOptions.displayMode=type;
	updateURL(viewOptions);
}

function switchProtein(pdb, highlighted, colors){
    viewOptions.structure = pdb;
    updateURL(viewOptions);

	getPDB(pdb, 1, 0);

    //glmol01.loadMoleculeStr(null, $('#' + "a" + pdb + '_src').val());
    //reDrawProtein(highlighted, colors);
}

function reDrawProtein(highlighted, colors){

	viewOptions.resetview=0;
	updateURL(viewOptions);

    // glmol01.defineRepresentation = defineRepFromOptions;

    if (!highlighted){ highlighted=[];}
    if (!colors){ colors=[];}

    // if the array of colors is shorter than the list of atoms to be colored, color the rest blue
    var toColor = (highlighted && highlighted.length) ? highlighted.length : 1;
    while (colors.length < toColor){
        //colors[colors.length] = 0x5FDA99;
		colors[colors.length] = 0xD4D4D4;
    }

    updateURL(viewOptions);

    glmol01.defineRepresentation = partial(defineRepFromOptions, highlighted, colors);

    glmol01.rebuildScene();

    if(highlighted.length!=0){
        selection = glmol01.getResiduesById(glmol01.getAllAtoms(), highlighted);
    	//console.log(selection);
    	glmol01.zoomInto(selection,true);
    }

    glmol01.show();
}

function reDrawProtein_V2(highlighted, colors){
    // glmol01.defineRepresentation = defineRepFromOptions;

	viewOptions.resetview=0;
	updateURL(viewOptions);

    if (!highlighted){ highlighted=[];}
    if (!colors){ colors=[];}

    // if the array of colors is shorter than the list of atoms to be colored, color the rest blue
    var toColor = (highlighted && highlighted.length) ? highlighted.length : 1;
    while (colors.length < toColor){
			colors[colors.length] = 0xD4D4D4;
    }

    glmol01.defineRepresentation = partial(defineRepFromOptions, highlighted, colors);
    glmol01.rebuildScene();
    glmol01.show();

}


function reDrawProteinAllChains(highlighted, colors){


    if (!highlighted){ highlighted=[];}
    if (!colors){ colors=[];}

    // // if the array of colors is shorter than the list of atoms to be colored, color the rest blue
 //    var toColor = (highlighted && highlighted.length) ? highlighted.length : 1;
 //    while (colors.length < toColor){
 //        colors[colors.length] = 0x5FDA99;
 //    }
 //
 //    updateURL(viewOptions);

    glmol01_load.defineRepresentation = partial(defineRepFromOptionsAllChains, highlighted, colors);
    glmol01_load.rebuildScene();
    glmol01_load.show();

}


// Function that allows reDrawProtein to use partial functions
function partial(func /*, 0..n args */) {

    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        var allArguments = args.concat(Array.prototype.slice.call(arguments));
        return func.apply(this, allArguments);
    };
}

//Function to take a screenshot, copied directly from the exmaple viewer.html
function saveImage() {
    glmol01.show();
    var imageURI = glmol01.renderer.domElement.toDataURL("image/png");
    window.open(imageURI);
}

defineRepFromOptionsAllChains = function(highlighted, colors, highlightMode) {

	highlightedAtomsChains = new Array;

	if (viewOptions.hasOwnProperty("hoverchain")){

		if(viewOptions.hoverchain.length == 1){
	        for (var i=1; i < glmol01_load.atoms.length; i++ ){

	            if (glmol01_load.atoms[i]){

					if( glmol01_load.atoms[i].chain == viewOptions.hoverchain){

	                	glmol01_load.atoms[i].color = "0x3182bd";
						highlightedAtomsChains.push(i);

					}
					else{
						glmol01_load.atoms[i].color = "0x999999";
					}

	            }

	        }
		}

		else{

			//alert(viewOptions.hoverchain[0]+"lala"+viewOptions.hoverchain[1]);
	        for (var i=1; i < glmol01_load.atoms.length; i++ ){

	            if (glmol01_load.atoms[i]){

					if( glmol01_load.atoms[i].chain == viewOptions.hoverchain[0]){

	                	glmol01_load.atoms[i].color = "0x3182bd";

					}
					else if( glmol01_load.atoms[i].chain == viewOptions.hoverchain[1]){

	                	glmol01_load.atoms[i].color = "0x9ecae1";

					}
					else{
						glmol01_load.atoms[i].color = "0x999999";
					}

	            }

	        }
		}


		//return;
	}

	else{
        for (var i=1; i < glmol01_load.atoms.length; i++ ){

            if (glmol01_load.atoms[i]){

                glmol01_load.atoms[i].color = "0x999999";

            }

        }
	}

    var all = this.getAllAtoms();
    var hetatm = this.removeSolvents(this.getHetatms(all));
    var asu = new THREE.Object3D();


    this.drawCartoon(asu, all, this.curveWidth, this.thickness, 1.0);
	this.drawCartoonNucleicAcid(asu, all, this.curveWidth, this.thickness, 1.0);


    this.modelGroup.add(asu);

	//console.log("annen "+highlightedAtomsChains.length);


};


// Function that determines how to format display
// a reference to it is processed by reDrawProtein
// higlighted is array of residue numbers
// colors is array of colors
// highlightmode is either  // "allAtoms" or"carbonOnly";

defineRepFromOptions = function(highlighted, colors, highlightMode) {

    var all = this.getAllAtoms();
    var hetatm = this.removeSolvents(this.getHetatms(all));
    var asu = new THREE.Object3D();


	//THIS PART IS ADDED FOR INITIALIZING THE PROTEIN VIEW AFTER SOME CHORD OR MATRIX RESIDUES OF ANOTHER CHAIN IS CLICKED PREVIOUSLY.
	//WHENEVER A NEW CHAIN IS CLICKED, COME HERE TO RESET THE STRUCTURE VIEW.
	//BEFORE, MAKE SURE THE RESETVIEW IN THE URL IS 1 FOR THESE CASES
	if (viewOptions.resetview == 1){

	 if(viewOptions.displayMode!="network"){
 	    this.colorByAtom(all, {});

 	    this.colorByChain(all);
 	  //  this.drawAtomsAsSphere(this.modelGroup, [], this.sphereRadius);
			this.drawBondsAsLine(this.modelGroup, [], this.lineWidth*5);

 	    this.drawCartoonNucleicAcid(this.modelGroup, all, this.curveWidth);
 	    this.drawCartoon(this.modelGroup, all, this.curveWidth);

		 return;
	 }

	}

    // Remember which residue number is where in the json.nodes array

	//ATTENTION: TODO: CHANGE THESE TWO ARRAYS ACCORDING TO CHAINS! NOW ONLY ONE CHAIN
    var residueIndex = new Array;
    for (var i = 0; i < json.nodes.length; i++){
        residueIndex[json.nodes[i].residueNum] = i;
    }

    var residueIndexSplom = new Array;
    for (var i = 0; i < json_splom.nodes.length; i++){
        residueIndexSplom[json_splom.nodes[i].residueNum] = i;
    }

    // Determine which highlighting mode and coloring options are selected:
    // TODO: move these from form to viewOptions object

	//the next two lines are commented out because on matrix.html , the buttons to select these are not needed and eliminated
   // var highlightMode = document.getElementById("highlightModeSelector").value
   // colorMode = document.getElementById("proteinColor").value;

    var highlightMode = "carbonOnly";

  	var url = document.location.href;

	if(url.indexOf("splom.html") > -1){
		colorMode = document.getElementById("proteinColor").value;
	}
	else{
		colorMode = "none";
	}


    // 1) Color the atoms based on chosen property
    if (json.nodes[1].hasOwnProperty(colorMode)){
        // If the nodes have the property specified, color residues based on its value

        // Find max/min, and set color scale accordingly
        var min=0, max=0;
        for (var i=0; i < json.nodes.length; i++ ){
            if (json.nodes[i][colorMode] > max){
                max = json.nodes[i][colorMode];
            } else if (json.nodes[i][colorMode] < min){
                min = json.nodes[i][colorMode];
            }
        }

        var color = d3.scale.linear()
            .domain([min, max])
            .range(["blue", "red"]);

        // Apply the color scale to every atom
        for (var i=1; i < glmol01.atoms.length; i++ ){
            if (glmol01.atoms[i]){
                var resi = glmol01.atoms[i].resi;
                var node = json.nodes[ residueIndex[resi] ];
                if (node){ glmol01.atoms[i].color = parseInt( color(node[colorMode]).replace('#', ''), 16); }
            }
        }


    }
    else if (viewOptions.encode==1 || viewOptions.colorbyproperty==1){

        // Apply the color scale to every atom
        for (var i=1; i < glmol01.atoms.length; i++ ){
            if (glmol01.atoms[i]){
                var resi = glmol01.atoms[i].resi;
                var node = json_splom.nodes[ residueIndexSplom[resi] ];
                if (node){ glmol01.atoms[i].color = parseInt( color_conservation(json_splom.nodes[ residueIndexSplom[resi] ].value).replace('#', ''), 16); }
            }
        }

    }
	else {
        // Can't color by selected property, so color all atoms grey instead

		if (viewOptions.hasOwnProperty("chains")){

			chains[0] = viewOptions.chains[0];
			chains[1] = viewOptions.chains[1];


	        for (var i=1; i < glmol01.atoms.length; i++ ){

	            if (glmol01.atoms[i]){

					if( glmol01.atoms[i].chain == chains[0] ){

                        //console.log("annen")
	                	glmol01.atoms[i].color = "0x999999"; //LIGHT GREY

					}

					else if( glmol01.atoms[i].chain == chains[1] ){


                        glmol01.atoms[i].color = "0x666666"; //DARK GREY

					}
	            }


	        }
		}

		else{

	        for (var i=1; i < glmol01.atoms.length; i++ ){

	            if (glmol01.atoms[i]){

                    // glmol01.atoms[i].color = "0x666666"; //DARK GREY
                    glmol01.atoms[i].color = "0x999999"; //LIGHT GREY
	            }
	        }

		}
    }

    // 2) Recolor the atoms of two secondary structural elements specified in the URL (as group1 & group2)
    // Color them either as specified in the fill variable (for matrix.html), or in two default colors

	var group1array = [];
	var che = 0;
	var check = 0;

	if (viewOptions.hasOwnProperty("chains") && viewOptions.chains[0] != viewOptions.chains[1]){

		chains[0] = viewOptions.chains[0];
		chains[1] = viewOptions.chains[1];

		var group1;
		var group2;
		var chain1;
		var chain2;

        if (viewOptions.hasOwnProperty("group1") && viewOptions.hasOwnProperty("group2")){

					//console.log(json.groupsloops[viewOptions.group1].name+"\t"+json.groups[viewOptions.group1].name)
			//if(viewOptions.group1 == viewOptions.group2){
						group1 = json.groupsloops[viewOptions.group1];
						group2 = json.groupsloops[viewOptions.group2];
			// 	if(viewOptions.tab=="chord"){
	    //          	group1 = json.groupsloops[viewOptions.group1];
			// 	 	group2 = json.groupsloops[viewOptions.group2];
			// 	}
			//
			// 	else{
			// 		if(viewOptions.mychain == viewOptions.chains[0]){
		  //            	group1 = jsonSour.groupsloops[viewOptions.group1];
			// 		 	group2 = jsonSour.groupsloops[viewOptions.group2];
			// 	 	}
			//
			// 		else if(viewOptions.mychain == viewOptions.chains[1]){
		  //            	group1 = jsonTarg.groupsloops[viewOptions.group1];
			// 		 	group2 = jsonTarg.groupsloops[viewOptions.group2];
			// 		}
			// 	}
			//
			// }
			//
			// else{
      //     group1 = json.groupsloops[viewOptions.group1];
			//  		group2 = json.groupsloops[viewOptions.group2];
			//
			//  }

			if(viewOptions.group1==viewOptions.group2){
		  		if (group1.name[0] ==  chains[0]){
		  			chain1=chains[0];
		  			chain2=chains[1];
		  		}

		  		else if (group1.name[0] ==  chains[1]){
		  			chain1=chains[1];
		  			chain2=chains[0];
		  		}
			}

			else{
		  		if (group1.name[0] ==  chains[0] && group2.name[0] ==  chains[1]){
		  			chain1=chains[0];
		  			chain2=chains[1];
		  		}

		  		else if (group1.name[0] ==  chains[1] && group2.name[0] ==  chains[0]){
		  			chain1=chains[1];
		  			chain2=chains[0];
		  		}
			}
		}

		    for (var i=1; i< glmol01.atoms.length; i++){
		        if (glmol01.atoms[i]){

		            if (viewOptions.hasOwnProperty("group1")){

								var group1 = json.groupsloops[viewOptions.group1];


		        if (glmol01.atoms[i].resi && glmol01.atoms[i].resi >= group1.start && glmol01.atoms[i].resi <= group1.end  && glmol01.atoms[i].chain == group1.name[0] ){

							group1array[che] = glmol01.atoms[i].resi;
							che++;

		          if (fill){ //console.log(glmol01.atoms[i].chain +" first "+ chains[0]);

		   			 			    	   if(json.groupsloops[viewOptions.group1].name[2]=="L"){
		   									   glmol01.atoms[i].color = "0xC1BFBF";//GREY
		   			 			    	   }
		   			 			    	   else {
		   							  	 	   	for(var z=0;z<json_pymolseq1.length;z++){
		   							  	 	   		if(json_pymolseq1[z].name==json.groupsloops[viewOptions.group1].name){
		   							  	 	   			glmol01.atoms[i].color = parseInt( fill(z).substr(1), 16);
		   							  	 	   		}
		   							  	 	   	}
		  										}




		                    } else {
		                       // glmol01.atoms[i].color = "0x5FDA99";
													 glmol01.atoms[i].color = "0xD4D4D4";
		                    }
		                }

		            }

		            if (viewOptions.hasOwnProperty("group2")){

								var group2 = json.groupsloops[viewOptions.group2];

						//console.log("In atoms 2\t" + group2.name);

		                if (glmol01.atoms[i].resi && glmol01.atoms[i].resi >= group2.start && glmol01.atoms[i].resi <= group2.end && glmol01.atoms[i].chain == group2.name[0]){

		                    if (fill){

		  	 		 			    	   if(json.groupsloops[viewOptions.group2].name[2]=="L"){
		  	 								   glmol01.atoms[i].color = "0xC1BFBF";//GREY
		  	 		 			    	   }
		  	 		 			    	   else {
		  	 						  	 	   	for(var z=0;z<json_pymolseq2.length;z++){
		  	 						  	 	   		if(json_pymolseq2[z].name==json.groupsloops[viewOptions.group2].name){
		  	 						  	 	   			glmol01.atoms[i].color = parseInt( fill2(z).substr(1), 16);
		  	 						  	 	   		}
		  	 						  	 	   	}
		  	 									}

		                    } else {
		                        glmol01.atoms[i].color = "0xA9AAFE";
								//glmol01.atoms[i].check = -1;
		                    }

		                }


		            }
		        }

		    }

	}

	else{

		    for (var i=1; i< glmol01.atoms.length; i++){
		        if (glmol01.atoms[i]){

		            if (viewOptions.hasOwnProperty("group1")){
						if(viewOptions.type==0){

		                	var group1 = json.groups[viewOptions.group1];

						}
						else{
							var group1 = json.groupsloops[viewOptions.group1];
						}

		                if (glmol01.atoms[i].resi && glmol01.atoms[i].resi >= group1.start && glmol01.atoms[i].resi <= group1.end ){

							group1array[che] = glmol01.atoms[i].resi;
							che++;

		                    if (fill){
		                        //glmol01.atoms[i].color = parseInt( fill(viewOptions.group1).substr(1), 16);
								if(viewOptions.type==0){
		                        	glmol01.atoms[i].color = parseInt( fill(viewOptions.group1).substr(1), 16);
								}
								else{
 			 			    	   if(json.groupsloops[viewOptions.group1].name[2]=="L"){
 									   glmol01.atoms[i].color = "0xC1BFBF";//GREY
 			 			    	   }
 			 			    	   else {
 							  	 	   	for(var z=0;z<json.groups.length;z++){
 							  	 	   		if(json.groups[z].name==json.groupsloops[viewOptions.group1].name){
 							  	 	   			glmol01.atoms[i].color = parseInt( fill(z).substr(1), 16);
 							  	 	   		}
 							  	 	   	}
									}
								}


		                    } else {
		                        //glmol01.atoms[i].color = "0x5FDA99";
								glmol01.atoms[i].color = "0xD4D4D4";
		                    }
		                }


		            }

		            if (viewOptions.hasOwnProperty("group2")){
						if(viewOptions.type==0){

		                	var group2 = json.groups[viewOptions.group2];

						}
						else{
							var group2 = json.groupsloops[viewOptions.group2];
						}

		                if (glmol01.atoms[i].resi && glmol01.atoms[i].resi >= group2.start && glmol01.atoms[i].resi <= group2.end){

		                    if (fill){
		                        //glmol01.atoms[i].color = parseInt( fill(viewOptions.group2).substr(1), 16);
								if(viewOptions.type==0){
		                        	glmol01.atoms[i].color = parseInt( fill(viewOptions.group2).substr(1), 16);
								}
								else{
			 			    	   if(json.groupsloops[viewOptions.group2].name[2]=="L"){
									   glmol01.atoms[i].color = "0xC1BFBF";//GREY
			 			    	   }
			 			    	   else {
 							  	 	   	for(var z=0;z<json.groups.length;z++){
 							  	 	   		if(json.groups[z].name==json.groupsloops[viewOptions.group2].name){
 							  	 	   			glmol01.atoms[i].color = parseInt( fill(z).substr(1), 16);
 							  	 	   		}
 							  	 	   	}
									}
								}

		                    } else {
		                        glmol01.atoms[i].color = "0xA9AAFE";
								//glmol01.atoms[i].check = -1;
		                    }

		                }

		            }
		        }

		    }
	}



    // 3) Recolor atoms of 'highlighted' residues individually specified in argument to this function
    // If in 'carbonOnly' highlighting mode, highlight the non-carbon atoms in the standard color for their element

	//alert(viewOptions.chains[0]+"\t"+viewOptions.chains[1]);

	highlightedAtoms = new Array;

	if (viewOptions.hasOwnProperty("asteroid") && viewOptions.hasOwnProperty("chains")){


		chains[0] = viewOptions.chains[0];
		chains[1] = viewOptions.chains[1];

		//if(viewOptions.mychain != "one"){
		if(chains[0]!=chains[1]){

			for (i=0; i < highlighted.length; i ++){

		        for (var j=1; j < glmol01.atoms.length; j++){

		            if (glmol01.atoms[j] && glmol01.atoms[j].resi === highlighted[i] && glmol01.atoms[j].chain === viewOptions.highlightedchains_inner[i]){

						//console.log(viewOptions.highlightedchains_inner[i]+"\t"+highlighted[i]);

		                if (highlightMode === "carbonOnly" && glmol01.atoms[j].elem != "C"){
		                    this.colorByAtom([j], []);
		                } else {
		                    glmol01.atoms[j].color = colors[i];
							//console.log("highlightedAtoms");
		                }

		                highlightedAtoms.push(j);
						//console.log(highlightedAtoms.length);

		            }
		        }
			}


		}

		else{

			for (z=0; z < 2; z ++){

				chain = chains[z];

			    for (i=0; i < highlighted.length; i ++){

					//if(i == z){

				        for (var j=1; j < glmol01.atoms.length; j++){

				            if (glmol01.atoms[j] && glmol01.atoms[j].resi === highlighted[i] && glmol01.atoms[j].chain === chain){
				                if (highlightMode === "carbonOnly" && glmol01.atoms[j].elem != "C"){
				                    this.colorByAtom([j], []);
				                } else {
				                    glmol01.atoms[j].color = colors[i];
									//console.log("highlightedAtoms");
				                }

				                highlightedAtoms.push(j);

				            }
				        }
						//}
			    }

			}
		}

	}
	else if (viewOptions.hasOwnProperty("splom")&& viewOptions.hasOwnProperty("chains")){

		chains[0] = viewOptions.chains[0];
		chains[1] = viewOptions.chains[1];


		for (z=0; z < 2; z ++){

			chain = chains[z];

		    for (i=0; i < highlighted.length; i ++){

				//if(i == z){

			        for (var j=1; j < glmol01.atoms.length; j++){

			            if (glmol01.atoms[j] && glmol01.atoms[j].resi === highlighted[i] && glmol01.atoms[j].chain === chain){
			                if (highlightMode === "carbonOnly" && glmol01.atoms[j].elem != "C"){
			                    this.colorByAtom([j], []);
			                } else {
			                    glmol01.atoms[j].color = colors[i];
								//console.log("highlightedAtoms");
			                }

			                highlightedAtoms.push(j);

			            }
			        }
					//}
		    }

		}

	}
	else if (viewOptions.hasOwnProperty("chains") && viewOptions.chains[0] == viewOptions.chains[1]){

	    for (i=0; i < highlighted.length; i ++){
		//console.log(highlighted[i]);

		        for (var j=1; j < glmol01.atoms.length; j++){

		            if (glmol01.atoms[j] && glmol01.atoms[j].resi === highlighted[i] /* && glmol01.atoms[j].chain === chain*/){

		                if (highlightMode === "carbonOnly" && glmol01.atoms[j].elem != "C"){
		                    this.colorByAtom([j], []);
		                } else {
		                    glmol01.atoms[j].color = colors[i];
		                }

		                highlightedAtoms.push(j);
		            }
		        }
	    }
	}
	else if (viewOptions.hasOwnProperty("chains")){

		chains[0] = viewOptions.chains[0];
		chains[1] = viewOptions.chains[1];

		for (z=0; z < 2; z ++){

			chain = chains[z];

			if(viewOptions.mychain!="both"){

				if(highlighted.length == 2 && highlighted[0] == highlighted[1]){
					//alert(highlighted[0]);
					if(chain == viewOptions.mychain){

				        for (var j=1; j < glmol01.atoms.length; j++){

				            if (glmol01.atoms[j] && glmol01.atoms[j].resi === highlighted[0] && glmol01.atoms[j].chain === chain){

				                if (highlightMode === "carbonOnly" && glmol01.atoms[j].elem != "C"){
				                    this.colorByAtom([j], []);
				                } else {
				                    glmol01.atoms[j].color = colors[z];
									//console.log("highlightedAtoms");
				                }

				                highlightedAtoms.push(j);

				            }
				        }
					}
				}

				else{

				    for (i=0; i < highlighted.length; i ++){

						if(i == 0 && z == 0 && chain == viewOptions.mychain){

					        for (var j=1; j < glmol01.atoms.length; j++){

					            if (glmol01.atoms[j] && glmol01.atoms[j].resi === highlighted[i] && glmol01.atoms[j].chain === chain){
					                if (highlightMode === "carbonOnly" && glmol01.atoms[j].elem != "C"){
					                    this.colorByAtom([j], []);
					                } else {
					                    glmol01.atoms[j].color = colors[i];
										//console.log("highlightedAtoms");
					                }

					                highlightedAtoms.push(j);

					            }
					        }
						}
						else if(i>0 && z==1 && chain != viewOptions.mychain){
					        for (var j=1; j < glmol01.atoms.length; j++){

					            if (glmol01.atoms[j] && glmol01.atoms[j].resi === highlighted[i] && glmol01.atoms[j].chain === chain){
					                if (highlightMode === "carbonOnly" && glmol01.atoms[j].elem != "C"){
					                    this.colorByAtom([j], []);
					                } else {
					                    glmol01.atoms[j].color = colors[i];
										//console.log("highlightedAtoms");
					                }

					                highlightedAtoms.push(j);

					            }
					        }
						}

						else if(i==0 && z==1 && chain == viewOptions.mychain){
					        for (var j=1; j < glmol01.atoms.length; j++){

					            if (glmol01.atoms[j] && glmol01.atoms[j].resi === highlighted[i] && glmol01.atoms[j].chain === chain){
					                if (highlightMode === "carbonOnly" && glmol01.atoms[j].elem != "C"){
					                    this.colorByAtom([j], []);
					                } else {
					                    glmol01.atoms[j].color = colors[i];
										//console.log("highlightedAtoms");
					                }

					                highlightedAtoms.push(j);

					            }
					        }
						}

						else if(i>0 && z==0 && chain != viewOptions.mychain){
					        for (var j=1; j < glmol01.atoms.length; j++){

					            if (glmol01.atoms[j] && glmol01.atoms[j].resi === highlighted[i] && glmol01.atoms[j].chain === chain){
					                if (highlightMode === "carbonOnly" && glmol01.atoms[j].elem != "C"){
					                    this.colorByAtom([j], []);
					                } else {
					                    glmol01.atoms[j].color = colors[i];
										//console.log("highlightedAtoms");
					                }

					                highlightedAtoms.push(j);

					            }
					        }
						}

				    }
				}
			}

			//if mychain==both
			else{
			    for (i=0; i < highlighted.length; i ++){

					if(i == z){

				        for (var j=1; j < glmol01.atoms.length; j++){

				            if (glmol01.atoms[j] && glmol01.atoms[j].resi === highlighted[i] && glmol01.atoms[j].chain === chain){
				                if (highlightMode === "carbonOnly" && glmol01.atoms[j].elem != "C"){
				                    this.colorByAtom([j], []);
				                } else {
				                    glmol01.atoms[j].color = colors[i];
									//console.log("highlightedAtoms");
				                }

				                highlightedAtoms.push(j);

				            }
				        }
					}
			    }
			}

		}

	}
	else{

		    for (i=0; i < highlighted.length; i ++){

			        for (var j=1; j < glmol01.atoms.length; j++){

						//console.log("atoms "+ glmol01.atoms[j].resi);

			            if (glmol01.atoms[j] && glmol01.atoms[j].resi == highlighted[i] /* && glmol01.atoms[j].chain === chain*/){
			                if (highlightMode === "carbonOnly" && glmol01.atoms[j].elem != "C"){
			                    this.colorByAtom([j], []);
			                } else {
			                    glmol01.atoms[j].color = colors[i];
			                }
			                highlightedAtoms.push(j);
			            }
			        }
		    }
	}

    // 4) Render appropriately
   // if (document.getElementById("displayMode").value == "structure"){
	if (viewOptions.displayMode == "structure"){

        // Draw ribbon
    this.drawCartoon(asu, all, this.curveWidth, this.thickness, 1.0);
		this.drawCartoonNucleicAcid(asu, all, this.curveWidth, this.thickness, 1.0);

	//}else if (document.getElementById("displayMode").value == "pair"){
	}else if (viewOptions.displayMode == "pair"){

        // Draw highlighted atoms as spheres, on top of ribbon struture
        this.drawAtomsAsSphere(asu, highlightedAtoms, 1.0, true);
        this.drawCartoon(asu, all, this.curveWidth, this.thickness, 1.0);
		this.drawCartoonNucleicAcid(asu, all, this.curveWidth, this.thickness, 1.0);

    //}else if (document.getElementById("displayMode").value == "pairSticks"){
	}else if (viewOptions.displayMode == "pairSticks"){

        // Draw highlighted atoms as lines, on top of ribbon struture
        this.drawBondsAsLine(asu, highlightedAtoms, this.lineWidth*5);
        this.drawCartoon(asu, all, this.curveWidth, this.thickness, 1.0);
		this.drawCartoonNucleicAcid(asu, all, this.curveWidth, this.thickness, 1.0);

  	}else if (viewOptions.displayMode == "network"){

    //    this.drawBondsAsLine(asu, highlightedAtoms, this.lineWidth*5);
        // this.drawCartoon(asu, all, this.curveWidth, this.thickness, 1.0);
// 		this.drawCartoonNucleicAcid(asu, all, this.curveWidth, this.thickness, 1.0);

		//IF NETWORK IS SELECTED AND IT IS BETWEEN CHAINS:
		if(viewOptions.chains[0]!=viewOptions.chains[1]){

		        // Find the alpha-carbon atoms
		    var alphaCarbons1 = new Array;
				var alphaCarbons2 = new Array;

				var alphaCarbonschain1 = new Array;
				var alphaCarbonschain2 = new Array;

				var alphaCarbons = new Array;

		    for (var i=0; i < glmol01.atoms.length; i++ ){

					//CHANGED BY MELIS: HERE WE ADDED THE HETATM AS WELL FOR LIGANDS, BECAUSE THEY NORMALLY DON'T HAVE CA ATOMS SO WE NEED TO TAKE ALL ATOMS IF THESE ARE HETATMS
		      if (glmol01.atoms[i] && glmol01.atoms[i].chain === viewOptions.chains[0] ){
						if (glmol01.atoms[i].recordName == "HETATM") {
		          	alphaCarbons1[ glmol01.atoms[i].resi ] = i;

						 		//alphaCarbons[ glmol01.atoms[i].resi ] = i;
						 		alphaCarbonschain1[ glmol01.atoms[i].resi ] = viewOptions.chains[0];
						}
						else if (glmol01.atoms[i].atom === "CA" || glmol01.atoms[i].atom === "P"){
							 alphaCarbons1[ glmol01.atoms[i].resi ] = i;

							 //alphaCarbons[ glmol01.atoms[i].resi ] = i;
							 alphaCarbonschain1[ glmol01.atoms[i].resi ] = viewOptions.chains[0];
						}
		      }

		      else if (glmol01.atoms[i] && glmol01.atoms[i].chain === viewOptions.chains[1] ){
							if (glmol01.atoms[i].recordName == "HETATM") {
               	 	alphaCarbons2[ glmol01.atoms[i].resi ] = i;

				 					//alphaCarbons[ glmol01.atoms[i].resi ] = i;
				 				alphaCarbonschain2[ glmol01.atoms[i].resi ] = viewOptions.chains[1];
							}
							else if (glmol01.atoms[i].atom === "CA" || glmol01.atoms[i].atom === "P"){
								alphaCarbons2[ glmol01.atoms[i].resi ] = i;

							 	//alphaCarbons[ glmol01.atoms[i].resi ] = i;
							 	alphaCarbonschain2[ glmol01.atoms[i].resi ] = viewOptions.chains[1];
							}
		        }
		      }

		        // Draw the alpha-carbons as spheres
		        this.drawAtomsAsSphere(asu, alphaCarbons1, 0.5, true);
						this.drawAtomsAsSphere(asu, alphaCarbons2, 0.5, true);

						//Draw the alpha-carbons as sticks
						// this.drawBondsAsLine(asu, alphaCarbons1, this.lineWidth*5);
						// this.drawBondsAsLine(asu, alphaCarbons2, this.lineWidth*5);

				if(viewOptions.hasOwnProperty("splom")){

			        // Now draw a cyclinder for each interaction between residues
			        for (var i=0; i < json.links.length; i++){
			            var res1 = json.nodes[ json.links[i].source ].residueNum;
			            var res2 = json.nodes[ json.links[i].target ].residueNum;

			            var atom1 = glmol01.atoms[ alphaCarbons1[res1] ];
			            var atom2 = glmol01.atoms[ alphaCarbons2[res2] ];

			            if (atom1 && atom2){
			                // if ((highlightedAtoms.indexOf(alphaCarbons1[res1]) != -1) && (highlightedAtoms.indexOf(alphaCarbons2[res2]) != -1) ){
 // 			                    this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, atom1.color, true);
 // 			                }

							if(highlightedAtoms.length == 0){
                  if(atom1.resi-atom2.resi>4 || atom2.resi-atom1.resi>4){
								    this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, atom1.color, true);
                  }
							}

							else{

								//console.log(atom1.color);
							     if ((highlightedAtoms.indexOf(alphaCarbons1[res1]) != -1) && (highlightedAtoms.indexOf(alphaCarbons2[res2]) != -1) ){
							         this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true); //DARK RAJINI BLUE
							     }
							}

			            }
			        }
				}

				else if(viewOptions.hasOwnProperty("asteroid")){

					var center;
					var string = viewOptions.center.toString();

					if(string.match(/[A-E]/gi)){
						center = parseInt(string.match(/\d+/g));
					}
					else{
						center = viewOptions.center;
					}

			        // Now draw a cyclinder for each interaction between residues
			        for (var i=0; i < jsonall.links.length; i++){

						if(jsonall.nodes[ jsonall.links[i].source ].chain == viewOptions.chains[0] || jsonall.nodes[ jsonall.links[i].source ].chain == viewOptions.chains[1]){

							 var res1 = jsonall.nodes[ jsonall.links[i].source ].residueNum;
							 var chain1 = jsonall.nodes[ jsonall.links[i].source ].chain;

						}
			           if(jsonall.nodes[ jsonall.links[i].target ].chain == viewOptions.chains[0] || jsonall.nodes[ jsonall.links[i].target ].chain == viewOptions.chains[1]){
			           	 	var res2 = jsonall.nodes[ jsonall.links[i].target ].residueNum;
							var chain2 = jsonall.nodes[ jsonall.links[i].target ].chain;

			           }

					   if(viewOptions.mychain==viewOptions.chains[0])
					   {
						  if(res1 == center && viewOptions.mychain==chain1){

		  			            var atom1 = glmol01.atoms[ alphaCarbons1[res1] ];

		  						if(chain2==viewOptions.chains[0]){
		  							 var atom2 = glmol01.atoms[ alphaCarbons1[res2] ];

	 							  	this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), jsonall.links[i].value/25, "0x1977C9 ", true);

		  						}

	    			           if(chain2==viewOptions.chains[1]){
	    			           		var atom3 = glmol01.atoms[ alphaCarbons2[res2] ];
	 							    this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom3.x, atom3.y, atom3.z), jsonall.links[i].value/25, "0x1977C9 ", true);
	    			           }


						  }

						  else if(res2 == center && viewOptions.mychain==chain2){

							  var atom2 = glmol01.atoms[ alphaCarbons1[res2] ];

						 	 if(chain1==viewOptions.chains[0]){
	  			            	var atom1 = glmol01.atoms[ alphaCarbons1[res1] ];
								this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), jsonall.links[i].value/25, "0x1977C9 ", true);
							 }

						 	 if(chain1==viewOptions.chains[1]){
	  			            	var atom4 = glmol01.atoms[ alphaCarbons2[res1] ];
								this.drawCylinder(asu, new TV3(atom4.x, atom4.y, atom4.z), new TV3(atom2.x, atom2.y, atom2.z), jsonall.links[i].value/25, "0x1977C9 ", true);
							 }

 						  }
					  }
					  else{//if viewOptions.mychain==viewOptions.chains[1]

						  if(res1 == center && viewOptions.mychain==chain1){

		  			            var atom1 = glmol01.atoms[ alphaCarbons2[res1] ];

		  						if(chain2==viewOptions.chains[1]){
		  							 var atom2 = glmol01.atoms[ alphaCarbons2[res2] ];

	 							  	this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), jsonall.links[i].value/25, "0x1977C9 ", true);

		  						}

	    			           if(chain2==viewOptions.chains[0]){
	    			           		var atom3 = glmol01.atoms[ alphaCarbons1[res2] ];
	 							    this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom3.x, atom3.y, atom3.z), jsonall.links[i].value/25, "0x1977C9 ", true);
	    			           }


						  }

						  else if(res2 == center && viewOptions.mychain==chain2){

							  var atom2 = glmol01.atoms[ alphaCarbons2[res2] ];

						 	 if(chain1==viewOptions.chains[1]){
	  			            	var atom1 = glmol01.atoms[ alphaCarbons2[res1] ];
								this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), jsonall.links[i].value/25, "0x1977C9 ", true);
							 }

						 	 if(chain1==viewOptions.chains[0]){
	  			            	var atom4 = glmol01.atoms[ alphaCarbons1[res1] ];
								this.drawCylinder(asu, new TV3(atom4.x, atom4.y, atom4.z), new TV3(atom2.x, atom2.y, atom2.z), jsonall.links[i].value/25, "0x1977C9 ", true);
							 }

 						  }
					  }

			        }
				}

				else{

			        // Now draw a cyclinder for each interaction between residues
			        for (var i=0; i < json.links.length; i++){
			            var res1 = json.nodes[ json.links[i].source ].residueNum;
			            var res2 = json.nodes[ json.links[i].target ].residueNum;

						var chain1 = json.nodes[ json.links[i].source ].chain;
						var chain2 = json.nodes[ json.links[i].target ].chain;

			            var atom1 = glmol01.atoms[ alphaCarbons1[res1] ];
			            var atom2 = glmol01.atoms[ alphaCarbons2[res2] ];

			            //var atom1a = glmol01.atoms[ alphaCarbons[res1] ];
			            //var atom2a = glmol01.atoms[ alphaCarbons[res2] ];

			        if (atom1 && atom2){

							if(!viewOptions.hasOwnProperty("highlighted")){
                  if(atom1.resi-atom2.resi>4 || atom2.resi-atom1.resi>4){
								    this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, atom1.color, true);
                  }
							}

							else{

								// //console.log(atom1.color);
// 							     if ((highlightedAtoms.indexOf(alphaCarbons1[res1]) != -1) && (highlightedAtoms.indexOf(alphaCarbons2[res2]) != -1) ){
// 							         this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x000000", true);
// 							     }

								if(highlighted.length == 2){

									if(highlighted[0]==highlighted[1]){
										if(res1 == highlighted[0] && chain1 == viewOptions.chains[0]){

											//console.log(res1+"\t"+res2);

								          //  if ((highlightedAtoms.indexOf(alphaCarbons[res1]) != -1) && (highlightedAtoms.indexOf(alphaCarbons[res2]) != -1) ){
								                this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);
								          //  }
										}

										else if(res2 == highlighted[0] && chain2 == viewOptions.chains[1]){
								            //if ((highlightedAtoms.indexOf(alphaCarbons[res1]) != -1) && (highlightedAtoms.indexOf(alphaCarbons[res2]) != -1) ){
								                this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);
												//}
										}
									}

									else{

								        if ((highlightedAtoms.indexOf(alphaCarbons1[res1]) != -1) && (highlightedAtoms.indexOf(alphaCarbons2[res2]) != -1) ){
								            this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);
								        }
									}
								}

								//in structure view, network for when user clicks on one residue in the matrix, all interactions are highlighted
								else if(highlighted.length > 2){

									 	//console.log(highlighted.length +"\t"+ highlighted[0] +"\t"+highlighted[1]);

									 if ((highlightedAtoms.indexOf(alphaCarbons1[res1]) != -1) && (highlightedAtoms.indexOf(alphaCarbons2[res2]) != -1) ){
											if(res1 == highlighted[0] && chain1 == viewOptions.chains[0]){

												for (var j=1; j < highlighted.length; j++){

													if(res2==highlighted[j] && chain2 == viewOptions.chains[1]){
														this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);
													}
												}
											}
											else if(res2 == highlighted[0] && chain2 == viewOptions.chains[1]){
												for (var j=1; j < highlighted.length; j++){
													if(res1==highlighted[j] && chain1 == viewOptions.chains[0]){
														this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);
													}
												}
											}
									}
								}

							}

			      }
			  	}
				}
		}

		//IF NETWORK IS SELECTED AND IT IS WITHIN ONE CHAIN:
		else {

	        // Find the alpha-carbon atoms
	        var alphaCarbons = new Array;
					var alphaCarbonscheck = new Array;

					//if user selects to hide heteroatoms in network view, than hide all hetatm
					if(viewOptions.hideHetatm == "yes"){
						for (var i=0; i < glmol01.atoms.length; i++ ){
							if (glmol01.atoms[i] && glmol01.atoms[i].recordName != "HETATM" && (glmol01.atoms[i].atom === "CA"|| glmol01.atoms[i].atom === "P") && glmol01.atoms[i].chain === viewOptions.chains[0] ){
		                alphaCarbons[ glmol01.atoms[i].resi ] = i;
										//console.log(glmol01.atoms[i].resi)
		          }
		        }
		        // Draw the alpha-carbons as spheres
		        this.drawAtomsAsSphere(asu, alphaCarbons, 0.5, true);
						//this.drawBondsAsLine(asu, alphaCarbons, this.lineWidth*5);
					}

					//if user selects to see all (this is default)
					else{
						for (var i=0; i < glmol01.atoms.length; i++ ){
							//CHANGED BY MELIS: HERE WE ADDED THE HETATM AS WELL FOR LIGANDS, BECAUSE THEY NORMALLY DON'T HAVE CA ATOMS SO WE NEED TO TAKE ALL ATOMS IF THESE ARE HETATMS
							//but some ligands have CA so I added that condition as well.

		            if (glmol01.atoms[i] && glmol01.atoms[i].recordName == "HETATM" && (glmol01.atoms[i].atom === "CA"|| glmol01.atoms[i].atom === "P") && glmol01.atoms[i].chain === viewOptions.chains[0] ){
		              alphaCarbons[ glmol01.atoms[i].resi ] = i;
									//if the ligand has CA than only do this if , don't go into the second else statement
									alphaCarbonscheck[ glmol01.atoms[i].resi ] = 1;
									//console.log("first "+glmol01.atoms[i].resi)
		            }

								else if (glmol01.atoms[i] && alphaCarbonscheck[ glmol01.atoms[i].resi ] != 1 && glmol01.atoms[i].recordName == "HETATM" && glmol01.atoms[i].chain === viewOptions.chains[0] ){
									//WHEN THERE ARE HETEROATOMS, it goes in the loop for all of them but only stores one of them per residue (last one of each heteroatom in the residue)
		              alphaCarbons[ glmol01.atoms[i].resi ] = i;
									alphaCarbonscheck[ glmol01.atoms[i].resi ] = -1;
									//console.log("second "+glmol01.atoms[i].resi)
		            }
		            else if (glmol01.atoms[i] && (glmol01.atoms[i].atom === "CA"|| glmol01.atoms[i].atom === "P") && glmol01.atoms[i].chain === viewOptions.chains[0] ){
		              alphaCarbons[ glmol01.atoms[i].resi ] = i;
									//console.log("third "+glmol01.atoms[i].resi)
		            }
		        }
		        // Draw the alpha-carbons as spheres
		        this.drawAtomsAsSphere(asu, alphaCarbons, 0.5, true);
						//this.drawBondsAsLine(asu, alphaCarbons, this.lineWidth*5);
					}

			if(viewOptions.hasOwnProperty("splom")){
	        // Now draw a cyclinder for each interaction between residues
	        for (var i=0; i < json.links.length; i++){
	            var res1 = json.nodes[ json.links[i].source ].residueNum;
	            var res2 = json.nodes[ json.links[i].target ].residueNum;

	            var atom1 = glmol01.atoms[ alphaCarbons[res1] ];
	            var atom2 = glmol01.atoms[ alphaCarbons[res2] ];

	            if (atom1 && atom2){

								if(highlightedAtoms.length == 0){
		                if(atom1.resi-atom2.resi>4 || atom2.resi-atom1.resi>4){
									    this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, atom1.color, true);
		                }
								}
								else{

									//updated on 20.10.16
									for(var y=0; y<viewOptions.highlightedsplom.length; y++){
											//	if ((highlightedAtoms.indexOf(alphaCarbons[res1]) != -1) && (highlightedAtoms.indexOf(alphaCarbons[res2]) != -1) ){
										if(res1 == viewOptions.highlightedsplom[y] || res2 == viewOptions.highlightedsplom[y]){
		                  this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);
											//console.log(highlightedAtoms.indexOf(alphaCarbons[res1]) +"\t"+res1+"\t"+ alphaCarbons[res1] +"\t"+ highlightedAtoms.indexOf(alphaCarbons[res2])+"\t"+res2+"\t"+ alphaCarbons[res2])
										}
									}
	            }
						}
	        }
			}

			else if(viewOptions.hasOwnProperty("asteroid")){

				var center;
				var string = viewOptions.center.toString();

				if(string.match(/[A-E]/gi)){
					center = parseInt(string.match(/\d+/g));
				}
				else{
					center = viewOptions.center;
				}
				//
		        // Now draw a cyclinder for each interaction between residues
		        for (var i=0; i < json.links.length; i++){
		            var res1 = json.nodes[ json.links[i].source ].residueNum;
		            var res2 = json.nodes[ json.links[i].target ].residueNum;

		            var atom1 = glmol01.atoms[ alphaCarbons[res1] ];
		            var atom2 = glmol01.atoms[ alphaCarbons[res2] ];

		            if (atom1 && atom2){

									if(res1 == center){

				          //  if ((highlightedAtoms.indexOf(alphaCarbons[res1]) != -1) && (highlightedAtoms.indexOf(alphaCarbons[res2]) != -1) ){
				                this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);
				          //  }
									}

									else if(res2 == center){

				            //if ((highlightedAtoms.indexOf(alphaCarbons[res1]) != -1) && (highlightedAtoms.indexOf(alphaCarbons[res2]) != -1) ){
				                this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);
								//}
									}

		            }

		        }
			}

			else{

		        // Now draw a cyclinder for each interaction between residues
		        for (var i=0; i < json.links.length; i++){
		            var res1 = json.nodes[ json.links[i].source ].residueNum;
		            var res2 = json.nodes[ json.links[i].target ].residueNum;

		            var atom1 = glmol01.atoms[ alphaCarbons[res1] ];
		            var atom2 = glmol01.atoms[ alphaCarbons[res2] ];

		            if (atom1 && atom2){

                        //FOR ONLY SHOWING THE CONTACTS BETWEEN THE SELECTED SECONDARY STRUCTURES IN NETWORK VIEW
						if(!viewOptions.hasOwnProperty("highlighted") && viewOptions.hasOwnProperty("group1") && viewOptions.hasOwnProperty("group2")){

                            if(json.groups[viewOptions.group1].start<=res1 && res1<=json.groups[viewOptions.group1].end && json.groups[viewOptions.group2].start<=res2 && res2<=json.groups[viewOptions.group2].end){
                                 //console.log(viewOptions.group1+"\t"+json.groups[viewOptions.group1].start+"\t"+json.groups[viewOptions.group1].end+"\t"+res1+"\t"+viewOptions.group2+"\t"+json.groups[viewOptions.group2].start+"\t"+json.groups[viewOptions.group2].end+"\t"+res2);
                                  this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);

							    //this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, atom1.color, true);
                            }

                            else if(json.groups[viewOptions.group1].start<=res2 && res2<=json.groups[viewOptions.group1].end && json.groups[viewOptions.group2].start<=res1 && res1<=json.groups[viewOptions.group2].end){
							    this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);
                            }
						}

						else if(!viewOptions.hasOwnProperty("group1") && !viewOptions.hasOwnProperty("group2")){
                            if(atom1.resi-atom2.resi>4 || atom2.resi-atom1.resi>4){
                                this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, atom1.color, true);
                            }
                        }

						else{

							if(highlighted.length == 2){

								if(highlighted[0]==highlighted[1]){
									if(res1 == highlighted[0]){

										//console.log(res1+"\t"+res2);

						              //  if ((highlightedAtoms.indexOf(alphaCarbons[res1]) != -1) && (highlightedAtoms.indexOf(alphaCarbons[res2]) != -1) ){
				 		                    this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);
				 		              //  }
									}

									else if(res2 == highlighted[0]){
						                //if ((highlightedAtoms.indexOf(alphaCarbons[res1]) != -1) && (highlightedAtoms.indexOf(alphaCarbons[res2]) != -1) ){
				 		                    this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);
											//}
									}
								}

								else{

					                if ((highlightedAtoms.indexOf(alphaCarbons[res1]) != -1) && (highlightedAtoms.indexOf(alphaCarbons[res2]) != -1) ){
			 		                    this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);
			 		                }
								}
							}

							//in structure view, network for when user clicks on one residue in the matrix, all interactions are highlighted
							else if(highlighted.length > 2){

 								 	//console.log(highlighted.length +"\t"+ highlighted[0] +"\t"+highlighted[1]);

 								 if ((highlightedAtoms.indexOf(alphaCarbons[res1]) != -1) && (highlightedAtoms.indexOf(alphaCarbons[res2]) != -1) ){
										if(res1 == highlighted[0]){

											for (var j=1; j < highlighted.length; j++){

												if(res2==highlighted[j]){
													this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);
												}
											}
										}
										else if(res2 == highlighted[0]){
											for (var j=1; j < highlighted.length; j++){
												if(res1==highlighted[j]){
													this.drawCylinder(asu, new TV3(atom1.x, atom1.y, atom1.z), new TV3(atom2.x, atom2.y, atom2.z), json.links[i].value/25, "0x1977C9 ", true);
												}
											}
										}
								}
							}



						}

		            }

		        }
			}
		}

		//THIS PART IS ADDED FROM ORIGINAL WEBGLMOL HTML (ON THEIR WEBSITE) TO GET THE C ALPHA TRACE VIEW (LIKE LOOP) AND THE ABOVE ELSE PART WAS COMMENTED OUT TO PREVENT SEEING ALL INTERACTIONS IN GREY, ONLY THE ONES CLICKED ARE HIGHLIGHTED IN THEIR COLOR

		//this.drawMainchainCurve(asu, all, this.curveWidth, 'CA', 1);
		//this.drawMainchainCurve(asu, all, this.curveWidth, 'O3\'', 1);

		//this one is suggested by Takenori to draw cartoon loop (the network view we have has this represenation now)
		this.drawMainchainTube(asu, all, "CA", 0.3);
    }

    this.modelGroup.add(asu);

   // selection = this.getResiduesById(this.getAllAtoms(), [150,151]);
   // console.log(highlightedAtoms);
   // this.zoomInto(highlightedAtoms,true);
   // this.show();

};

function generatePML(){
    var colorNames = [];
    var colorString = "";

    // if the array of colors is shorter than the list of atoms to be colored, color the rest blue
    var toColor = (viewOptions.highlighted && viewOptions.highlighted.length) ? viewOptions.highlighted.length : 1;
    var colors = viewOptions.colors ? viewOptions.colors : [];
    while (colors.length < toColor){
        //colors[colors.length] = 0x5FDA99;
		colors[colors.length] = 0xD4D4D4;
    }

    // generate string defining each color
    for (var i=0; i < colors.length; i++){
        if (colorNames.indexOf(colors[i]) === -1){
            colorNames.push(colors[i]);

            //var hex = colors[i].toString(16);
            //var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            //parseInt(result[1], 16)

            colorString = colorString + "set_color col" + (colorNames.length - 1) + ", [" + ( Math.floor(colors[1]/65536) % 256) + ", " + (Math.floor(colors[1]/256) % 256) + ", " + (colors[1] % 256) + "]\n"
        }
    }

    // determine which command to use for highlighting
    if (viewOptions.displayMode === "pair"){
        var command = "spheres";
    }else if (viewOptions.displayMode === "pairSticks"){
        var command = "sticks";
    }

    // actually construct the pml string
    var pml = "hide\n" + "show cartoon\n" + colorString;

    for (var i=0; i < viewOptions.highlighted.length; i++){
        pml = pml + "show " + command + ", resi " + viewOptions.highlighted[i] + "\n";
        pml = pml + "color col" + colorNames.indexOf(colors[i]) +", resi " + viewOptions.highlighted[i] + "\n\n";
    }

   return pml;
    // export helix coloring . . .
}


//GLmol.prototype.parsePDB2 = function(str)
//GOT IT FROM GLMOL.js WHERE IT CALLS parsePDB2 for the title

function parsePDBTitle(str) {

   //window.alert(str);
   var check=0;
   var title;
   var lines = str.split("\n");
   for (var i = 0; i < lines.length; i++) {
      var line = lines[i].replace(/^\s*/, ''); // remove indent

      var recordName = line.substr(0, 6);
      if (recordName == 'TITLE ') {

         if (title == undefined) title = "";
            title += line.substr(10, 70) + "\n"; // CHECK: why 60 is not enough???

			check=-1;
      }
   }

	if (check==0) title = "";

   return title;
};
