 	//FOR PYMOL SCRIPT CREATION for one single chain for just secondary structures

    // d3.select("#pymoltext").selectAll(".pymol-download").remove();

     var colortry1 = fill(viewOptions.group1);
 	var colortry2 = fill(viewOptions.group2);
 	var color1;
 	var color2;
	
 	var group1 = parseInt(viewOptions.group1);
 	var group2 = parseInt(viewOptions.group2);
	
 	if(colortry1.indexOf('#') > -1){ color1 = colortry1.replace("#","0x");}
 	if(colortry2.indexOf('#') > -1){ color2 = colortry2.replace("#","0x");}
	
	
 	var contactString = "load ./" +  viewOptions.pdb + ".pdb\n";
 	contactString += "hide everything\nshow cartoon\ncolor grey\n";
 	contactString += "select ss1, resi " + json.groups[group1].start + "-" + json.groups[group1].end + "\n";
 	contactString += "select ss2, resi " + json.groups[group2].start + "-" + json.groups[group2].end + "\n";
	 
 	contactString += "color " +color1+ ", ss1\n";
 	contactString += "color " +color2+ ", ss2\n";
 	contactString += "set ray_opaque_background, off\n";
	
 	   var htmlstr='<a download="'+viewOptions.pdb + '_' + json.groups[group1].name + '_' +  json.groups[group2].name + '.pml"';
 	   	htmlstr+= 'href="data:application/octet-stream;base64,'+btoa(contactString) + '"><img src="../img/Pymol_logo.png" width="30" height="30" title="Save as pymol file!" onmouseover="this.src="\'../img/Pymol_logo_dark.png\'" onmouseout="this.src="\'../img/Pymol_logo.png\'"></a>';
	
 	d3.select("#pymoltext").html(htmlstr);
	
 	$('#pymoltext').click(function() {
 	    window.open("http://www.mrc-lmb.cam.ac.uk/RAJINI/structures/"+  viewOptions.pdb + ".pdb", viewOptions.pdb + ".pdb");
	   
 	});
	
 	//FOR PYMOL SCRIPT CREATION for two chains between secondary structures
		
        if ( !(viewOptions.group1 && viewOptions.group2) ) {
			
		    viewOptions.group1 = 0;
		    viewOptions.group2 = 0;
	
			
            updateURL(viewOptions);
        }        

		 	 d3.select("#pymoltext").selectAll(".pymol-download").remove();
	 
			 group1 = viewOptions.group1;
			 group2 = viewOptions.group2;

		 	var colortry1 = fill(group1);
		 	var colortry2 = fill(group2);
		 	var color1;
		 	var color2;

		 	if(colortry1.indexOf('#') > -1){ color1 = colortry1.replace("#","0x");}
		 	if(colortry2.indexOf('#') > -1){ color2 = colortry2.replace("#","0x");}


		 	var contactString = "load ./" + pdb_name+ "_" + sfile + ".pdb\n";
			contactString += "hide everything\nshow cartoon\ncolor grey\n";
			contactString += "select ss1, resi " + jsonSour.groups[group1].start + "-" + jsonSour.groups[group1].end + "\n";
			contactString += "select ss2, resi " + jsonSour.groups[group2].start + "-" + jsonSour.groups[group2].end + "\n";

			contactString += "color " +color1+ ", ss1\n";
			contactString += "color " +color2+ ", ss2\n";
			contactString += "set ray_opaque_background, off\n";

			   var htmlstr='<a download="'+ pdb_name+ "_" + sfile + '_' + jsonSour.groups[group1].name + '_' +  jsonSour.groups[group2].name + '.pml"';
			   	htmlstr+= 'href="data:application/octet-stream;base64,'+btoa(contactString) + '"><img src="../img/Pymol_logo.png" width="30" height="30" title="Save as pymol file!" onmouseover="this.src="\'../img/Pymol_logo_dark.png\'" onmouseout="this.src="\'../img/Pymol_logo.png\'"></a>';

			d3.select("#pymoltext").html(htmlstr);

			$('#pymoltext').click(function() {
			    window.open("http://www.mrc-lmb.cam.ac.uk/RAJINI/structures/"+ pdb_name + "_" + sfile + ".pdb", pdb_name+ "_" + sfile + ".pdb");

			});
			
			
			
			//FOR PYMOL SCRIPT CREATION  check this, in two chains function for SS
	
			    d3.select("#pymoltext").selectAll(".pymol-download").remove();
	 
			    var colortry1 = fill(group1);
			var colortry2 = fill(group2);
			var color1;
			var color2;
	
			if(colortry1.indexOf('#') > -1){ color1 = colortry1.replace("#","0x");}
			if(colortry2.indexOf('#') > -1){ color2 = colortry2.replace("#","0x");}
	
	
			var contactString = "load ./" +  viewOptions.pdb + ".pdb\n";
			contactString += "hide everything\nshow cartoon\ncolor grey\n";
			contactString += "select ss1, chain " + sourceChain + " AND resi " + json.groups[group1].start + "-" + json.groups[group1].end + "\n";
			contactString += "select ss2, chain " + targetChain + " AND resi " + json.groups[group2].start + "-" + json.groups[group2].end + "\n";
	 
			contactString += "color " +color1+ ", ss1\n";
			contactString += "color " +color2+ ", ss2\n";
			contactString += "set ray_opaque_background, off\n";
			//contactString += "show sticks, resi " + nodes[p.y].residueNum + "+" + nodes[p.x + (group2_length) ].residueNum +"\n";
			//contactString += "show spheres, resi " + nodes[p.y].residueNum + "+" + nodes[p.x + (group2_length) ].residueNum +"\n";
			//contactString += "hide sticks\nhide residues\n";
			//contactString += "zoom resi " + nodes[p.y].residueNum + "+" + nodes[p.x + (group2_length) ].residueNum +"\n";
			//contactString += "ray 500, 500\n";
	
	
			   var htmlstr='<a download="'+viewOptions.pdb + '_' + json.groups[group1].name + '_' +  json.groups[group2].name + '.pml"';
			   	htmlstr+= 'href="data:application/octet-stream;base64,'+btoa(contactString) + '"><img src="../img/Pymol_logo.png" width="30" height="30" title="Save as pymol file!" onmouseover="this.src="\'../img/Pymol_logo_dark.png\'" onmouseout="this.src="\'../img/Pymol_logo.png\'"></a>';
	
			d3.select("#pymoltext").html(htmlstr);
			$('#pymoltext').click(function() {
			    window.open("http://www.mrc-lmb.cam.ac.uk/RAJINI/structures/"+  viewOptions.pdb + ".pdb", viewOptions.pdb + ".pdb");
	   
			});
			
	 		//////////////////
			
	 		//FOR PYMOL SCRIPT CREATION in two chains for residues clicked
	 		//viewOptions.displayMode=document.getElementById('displayMode').value;

	 		// window.alert(viewOptions.displayMode);
	
	 	    d3.select("#pymoltext").selectAll(".pymol-download").remove();
 
	 	    // Construct a CSV string of pymol
	 	   // var contactString = 'Residue1, Residue2, Number of atomic contacts';
	 	    // for (var i = 0; i < json.links.length; i++){
	 // 	        contactString = contactString + "\n" + json.nodes[json.links[i].source].name + ", " + json.nodes[json.links[i].target].name + ", " + json.links[i].value;
	 // 	    }


	        var colortry1 = fill(group1);
	 		var colortry2 = fill(group2);
	 		var color1;
	 		var color2;
	
	 		if(colortry1.indexOf('#') > -1){ color1 = colortry1.replace("#","0x");}
	 		if(colortry2.indexOf('#') > -1){ color2 = colortry2.replace("#","0x");}
	

	 		var contactString = "load ./" +  viewOptions.pdb + ".pdb\n";
	 		contactString += "hide everything\nshow cartoon\ncolor grey\n";
			contactString += "select ss1, chain " + sourceChain + " AND resi " + json.groups[group1].start + "-" + json.groups[group1].end + "\n";
			contactString += "select ss2, chain " + targetChain + " AND resi " + json.groups[group2].start + "-" + json.groups[group2].end + "\n";
 
	 		
	 		contactString += "color " +color1+ ", ss1\n";
	 		contactString += "color " +color2+ ", ss2\n";
			
	
			//console.log(viewOptions.displayMode);
	
	
	 		if(viewOptions.displayMode == "pair"){
	 			contactString += "show sticks, resi " + nodes1resNum[datum.y] + "+" + nodes2resNum[datum.x] +"\n";
	 			contactString += "show spheres, resi " + nodes1resNum[datum.y] + "+" + nodes2resNum[datum.x] +"\n";
	 			contactString += "hide sticks\n";
	 		}
	
	 		else if(viewOptions.displayMode == "pairSticks"){ 
	 			contactString += "hide spheres\n";
	 			contactString += "show sticks, resi " + nodes1resNum[datum.y] + "+" + nodes2resNum[datum.x] +"\n";
	
	 		}
	
	 		contactString += "set ray_opaque_background, off\n";
	
	 		//contactString += "zoom resi " + nodes[p.y].residueNum + "+" + nodes[p.x + (group2_length) ].residueNum +"\n";
	 		//contactString += "ray 500, 500\n";
	
	 	   var htmlstr='<a download="'+viewOptions.pdb + '_' + json.groups[group1].name + '_' +  json.groups[group2].name + '_' + nodes1name[datum.y] + '_' + nodes2name[datum.x] + '.pml"';
	 	   	htmlstr+= 'href="data:application/octet-stream;base64,'+btoa(contactString) + '"><img src="../img/Pymol_logo.png" width="30" height="30" title="Save as pymol file!" onmouseover="this.src="\'../img/Pymol_logo_dark.png\'" onmouseout="this.src="\'../img/Pymol_logo.png\'"></a>';
	
	 		d3.select("#pymoltext").html(htmlstr);
	
			$('#pymoltext').click(function() {
			    window.open("http://www.mrc-lmb.cam.ac.uk/RAJINI/structures/"+  viewOptions.pdb + ".pdb", viewOptions.pdb + ".pdb");
   
			});
			
			
			//////////////////
			//FOR PYMOL SCRIPT CREATION  for one chain SS and selected residues
			
			
			//viewOptions.displayMode=document.getElementById('displayMode').value;

			// window.alert(viewOptions.displayMode);
	
		    d3.select("#pymoltext").selectAll(".pymol-download").remove();
 
		    // Construct a CSV string of pymol
		   // var contactString = 'Residue1, Residue2, Number of atomic contacts';
		    // for (var i = 0; i < json.links.length; i++){
	 // 	        contactString = contactString + "\n" + json.nodes[json.links[i].source].name + ", " + json.nodes[json.links[i].target].name + ", " + json.links[i].value;
	 // 	    }


	        var colortry1 = fill(viewOptions.group1);
			var colortry2 = fill(viewOptions.group2);
			var color1;
			var color2;
	
			if(colortry1.indexOf('#') > -1){ color1 = colortry1.replace("#","0x");}
			if(colortry2.indexOf('#') > -1){ color2 = colortry2.replace("#","0x");}
	

	 		var contactString = "load ./" +  viewOptions.pdb + ".pdb\n";
			contactString += "hide everything\nshow cartoon\ncolor grey\n";
			contactString += "select ss1, resi " + json.groups[group1].start + "-" + json.groups[group1].end + "\n";
			contactString += "select ss2, resi " + json.groups[group2].start + "-" + json.groups[group2].end + "\n";
	 
			contactString += "color " +color1+ ", ss1\n";
			contactString += "color " +color2+ ", ss2\n";
			
			//console.log("jjhjhjk "+viewOptions.displayMode);
	
			if(viewOptions.displayMode == "pair"){
				contactString += "show sticks, resi " + nodes[datum.y].residueNum + "+" + nodes[datum.x + (group2_length) ].residueNum +"\n";
				contactString += "show spheres, resi " + nodes[datum.y].residueNum + "+" + nodes[datum.x + (group2_length) ].residueNum +"\n";
				contactString += "hide sticks\n";
				
				
			}
	
			else if(viewOptions.displayMode == "pairSticks"){ 
				contactString += "hide spheres\n";
				contactString += "show sticks, resi " + nodes[datum.y].residueNum + "+" + nodes[datum.x + (group2_length) ].residueNum +"\n";
	
			}
	
			//console.log("LALALLALA");
	
			contactString += "set ray_opaque_background, off\n";
	
			//contactString += "zoom resi " + nodes[p.y].residueNum + "+" + nodes[p.x + (group2_length) ].residueNum +"\n";
			//contactString += "ray 500, 500\n";
			
			
	
		   var htmlstr='<a download="'+viewOptions.pdb + '_' + json.groups[group1].name + '_' +  json.groups[group2].name + '_' + nodes[datum.y].name + '_' + nodes[datum.x + (group2_length) ].name + '.pml"';
		   	htmlstr+= 'href="data:application/octet-stream;base64,'+btoa(contactString) + '"><img src="../img/Pymol_logo.png" width="30" height="30" title="Save as pymol file!"></a>';
	
			d3.select("#pymoltext").html(htmlstr);
			$('#pymoltext').click(function() {
			    window.open("http://www.mrc-lmb.cam.ac.uk/RAJINI/structures/"+  viewOptions.pdb + ".pdb", viewOptions.pdb + ".pdb");
   
			});
	