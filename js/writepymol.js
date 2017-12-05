
function generatePymolText() {

	var residueIndexSplom = new Array;
	for (var i = 0; i < json_splom.nodes.length; i++){
			residueIndexSplom[json_splom.nodes[i].residueNum] = i;
	}


	 //HERE WE SCALE THE NUMBER OF INTERACTIONS BETWEEN 1-10 WHICH IS MAXIMUM IN PYMOL FOR DASH WIDTH
	  var values = new Array();
	  var valuesnorm = new Array();
	  var c=0;

	  for (var i=0; i < json.links.length; i++){
		  values[c] = json.links[i].value;
		  c++;
	  }

	 var max = Math.max.apply(Math, values);
	 var min = Math.min.apply(Math, values);

	 var a = 1;
	 var b = 10;

	 var t=0;

	 for (var i=0; i < c; i++){
		 valuesnorm[t] = (((b-a)*(values[i]-min))/(max-min))+a;
		 t++;
	 }

	var res1;
	var res2;
  var colortry1 = fill(viewOptions.group1);
	var colortry2 = fill(viewOptions.group2);

	var color1;
	var color2;

	var colorcentric = "0x428bca";

	var group1 = parseInt(viewOptions.group1);
	var group2 = parseInt(viewOptions.group2);

	var filename;

	if(colortry1.indexOf('#') > -1){ color1 = colortry1.replace("#","0x");}
	if(colortry2.indexOf('#') > -1){ color2 = colortry2.replace("#","0x");}

	//var contactString = "load http://localhost:89/structures_database/"+ pdb_name+ "/" +  viewOptions.pdb + ".pdb\n";
	var contactString = "fetch "+ pdb_name+ ", async=0\n";
	contactString += "bg_color white\n";

	if(viewOptions.hasOwnProperty("group1")){
		if(viewOptions.chains[0] == viewOptions.chains[1]){
			contactString += "hide everything\nshow cartoon, chain " +viewOptions.chains[0]+ "\n";
		}
		else{
			contactString += "hide everything\nshow cartoon, chain " +viewOptions.chains[0]+ " AND chain "+viewOptions.chains[1]+"\n";
		}

		if(viewOptions.encode == 1){

			for (var i=0; i < json_splom.nodes.length; i++){
				if(json_splom.nodes[i].value != "no"){
					contactString += "color " + color_conservation(json_splom.nodes[i].value).replace('#', '0x') + ", resi " + json_splom.nodes[i].residueNum +"\n";
				}
				else{
					contactString += "color grey, resi " + json_splom.nodes[i].residueNum +"\n";
				}
			}
		}
		else{
			contactString += "color grey\n";
		}
		//contactString += "color grey\n";

		//when it is chord, there should be group1 and 2 otherwise go to the else case below
		 if(viewOptions.tab=="chord"){
			contactString += "select ss1, chain " + viewOptions.chains[0] + " AND resi " + json.groups[group1].start + "-" + json.groups[group1].end + "\n";
			contactString += "select ss2, chain " + viewOptions.chains[1] + " AND resi " + json.groups[group2].start + "-" + json.groups[group2].end + "\n";
			contactString += "color " +color1+ ", ss1\n";
			contactString += "color " +color2+ ", ss2\n";

			if(viewOptions.highlighted){

				if(viewOptions.displayMode == "structure"){
					filename = viewOptions.pdb + '_' + json.groups[group1].name + '_' +  json.groups[group2].name + ".pml";
				}

				else if(viewOptions.displayMode == "pair"){
					if(viewOptions.chains[0] == viewOptions.chains[1]){
				    for (var i=0; i < viewOptions.highlighted.length; i++){
					    contactString += "show sticks, chain " + viewOptions.chains[0] + " AND resi " + viewOptions.highlighted[i] + "\n";
					    contactString += "show spheres, chain " + viewOptions.chains[0] + " AND resi " + viewOptions.highlighted[i] +"\n";
						}
					}
					else{
						contactString += "show sticks, chain " + viewOptions.chains[0] + " AND resi " + viewOptions.highlighted[0] + "\n";
						contactString += "show spheres, chain " + viewOptions.chains[0] + " AND resi " + viewOptions.highlighted[0] +"\n";
						contactString += "show sticks, chain " + viewOptions.chains[1] + " AND resi " + viewOptions.highlighted[1] + "\n";
						contactString += "show spheres, chain " + viewOptions.chains[1] + " AND resi " + viewOptions.highlighted[1] +"\n";
					}
					contactString += "hide sticks\n";
					filename = viewOptions.pdb + '_' + json.groups[group1].name + '_' +  json.groups[group2].name + "_" + viewOptions.highlighted + "_sphere.pml";
				}

				else if(viewOptions.displayMode == "pairSticks"){

					contactString += "hide spheres\n";
			    for (var i=0; i < viewOptions.highlighted.length; i++){
				    contactString += "show sticks, chain " + viewOptions.chains[0] + " AND resi " + viewOptions.highlighted[i] + "\n";
		    	}
					filename = viewOptions.pdb + '_' + json.groups[group1].name + '_' +  json.groups[group2].name + "_" + viewOptions.highlighted +  "_sticks.pml";
				}

				else if(viewOptions.displayMode == "network"){
					contactString += "hide everything\nshow spheres, chain " + viewOptions.chains[0]+ " AND name CA\n";
					//contactString += "color grey\n";
					contactString += "set sphere_scale, 0.25, (all)\n";
					//contactString += "show ribbon, chain " + viewOptions.chains[0]+ "\n";
					contactString += "cartoon loop\n";
					contactString += "show cartoon, chain " + viewOptions.chains[0]+ "\n";

					for (var i=0; i < json.links.length; i++){

						var res1 = json.nodes[ json.links[i].source ].residueNum;
						var res2 = json.nodes[ json.links[i].target ].residueNum;

						if(viewOptions.highlighted.length == 2){

							if((viewOptions.highlighted[0]==res1 && viewOptions.highlighted[1]==res2) || (viewOptions.highlighted[0]==res2 && viewOptions.highlighted[1]==res1)){

								var dist = "d"+res1+"-"+res2;

								contactString += "distance "+dist+", chain " +viewOptions.chains[0]+ " and resi " + res1 + " and name CA, chain " + viewOptions.chains[1] + " and resi " + res2 + " and name CA\n";
								contactString += "set dash_gap, 0\nset dash_width, "+ valuesnorm[i]  +", " + dist+  "\nset dash_round_ends, 0\n";

								contactString += "set dash_color, "+colorcentric +", "+dist+"\n";
								contactString += "hide labels, "+dist+"\n";

								break;

							}
						}

						//if more than 2 highlighted atoms, which in this case is in the residue matrix, user clicks on the name of the residue on row or col and select more than 1 interaction
						else{
							if(viewOptions.highlighted[0]==res1){
								for (var y=1; y < viewOptions.highlighted.length; y++){

									if(viewOptions.highlighted[y]==res2){
										var dist = "d"+res1+"-"+res2;

										contactString += "distance "+dist+", chain " +viewOptions.chains[0]+ " and resi " + res1 + " and name CA, chain " + viewOptions.chains[1] + " and resi " + res2 + " and name CA\n";
										contactString += "set dash_gap, 0\nset dash_width, "+ valuesnorm[i]  +", " + dist+  "\nset dash_round_ends, 0\n";

										contactString += "set dash_color, "+colorcentric +", "+dist+"\n";
										contactString += "hide labels, "+dist+"\n";

									}
								}
							}
							else if(viewOptions.highlighted[0]==res2){
								for (var y=1; y < viewOptions.highlighted.length; y++){

									if(viewOptions.highlighted[y]==res1){
										var dist = "d"+res1+"-"+res2;

										contactString += "distance "+dist+", chain " +viewOptions.chains[0]+ " and resi " + res1 + " and name CA, chain " + viewOptions.chains[1] + " and resi " + res2 + " and name CA\n";
										contactString += "set dash_gap, 0\nset dash_width, "+ valuesnorm[i]  +", " + dist+  "\nset dash_round_ends, 0\n";

										contactString += "set dash_color, "+colorcentric +", "+dist+"\n";
										contactString += "hide labels, "+dist+"\n";

									}
								}
							}

						}
		    	}
					filename = viewOptions.pdb + '_' + json.groups[group1].name + '_' +  json.groups[group2].name + "_" + viewOptions.highlighted + "_network.pml";
				}
			}
			else{
				filename = viewOptions.pdb + '_' + json.groups[group1].name + '_' +  json.groups[group2].name + ".pml";
			}
		//end of tabs if
		}

		// group1 and group2 are there when user clicks on sequence above when the tab is ligand or scatter(network)
		// this just shows the ss on the structure.
		else if(viewOptions.tab=="ligand" || viewOptions.tab=="network"){

			contactString += "select ss1, chain " + viewOptions.chains[0] + " AND resi " + json.groups[group1].start + "-" + json.groups[group1].end + "\n";
			contactString += "select ss2, chain " + viewOptions.chains[1] + " AND resi " + json.groups[group2].start + "-" + json.groups[group2].end + "\n";
			contactString += "color " +color1+ ", ss1\n";
			contactString += "color " +color2+ ", ss2\n";

			filename = viewOptions.pdb + '_' + json.groups[group1].name + '_' +  json.groups[group2].name + ".pml";

		}

	}

	//when there is no group1 and 2, this means two things. first, it is either chord tab and the first time
	//page is loaded, which means, user did not hover on chord or sequence ss or clicked on the chords.
	//or it is ateroid or scatter tabs open.
	else{

			//by default, first time page loads
			if(viewOptions.tab=="chord"){

				if(viewOptions.displayMode == "network")
				{
					contactString += "hide everything\nshow spheres, chain " + viewOptions.chains[0]+ " AND name CA\n";

					if(viewOptions.encode == 1){

						for (var i=0; i < json_splom.nodes.length; i++){
							if(json_splom.nodes[i].value != "no"){
								contactString += "color " + color_conservation(json_splom.nodes[i].value).replace('#', '0x') + ", resi " + json_splom.nodes[i].residueNum +"\n";
							}
							else{
								contactString += "color grey, resi " + json_splom.nodes[i].residueNum +"\n";
							}
						}
					}
					else{
						contactString += "color grey\n";
					}

					//contactString += "color grey\n";
					contactString += "set sphere_scale, 0.25, (all)\n";
					//contactString += "show ribbon, chain " + viewOptions.chains[0]+ "\n";
					contactString += "cartoon loop\n";
					contactString += "show cartoon, chain " + viewOptions.chains[0]+ "\n";
					if(viewOptions.hideHetatm == "yes"){
						contactString += "hide hetatm\n";
					}

					for (var i=0; i < json.links.length; i++){

						if(viewOptions.hideHetatm == "yes"){

							var type1 = json.nodes[ json.links[i].source ].type;
			        var type2 = json.nodes[ json.links[i].target ].type;

							if(type1 != "HETAT" && type2 != "HETAT"){
								var res1 = json.nodes[ json.links[i].source ].residueNum;
								var res2 = json.nodes[ json.links[i].target ].residueNum;

								var diff_res_num = res1-res2;
								if(diff_res_num > 4 || diff_res_num < -4){

									var dist = "d"+res1+"-"+res2;

									contactString += "distance "+dist+", chain " +viewOptions.chains[0]+ " and resi " + res1 + " and name CA, chain " + viewOptions.chains[1] + " and resi " + res2 + " and name CA\n";
									contactString += "set dash_gap, 0\nset dash_width, "+ valuesnorm[i]  +", " + dist+  "\nset dash_round_ends, 0\n";

									contactString += "set dash_color, grey, "+dist+"\n";
									contactString += "hide labels, "+dist+"\n";
								}
							}
						}

						else{
							var res1 = json.nodes[ json.links[i].source ].residueNum;
			        var res2 = json.nodes[ json.links[i].target ].residueNum;
							var diff_res_num = res1-res2;
							if(diff_res_num > 4 || diff_res_num < -4){

								var dist = "d"+res1+"-"+res2;

								contactString += "distance "+dist+", chain " +viewOptions.chains[0]+ " and resi " + res1 + " and name CA, chain " + viewOptions.chains[1] + " and resi " + res2 + " and name CA\n";
								contactString += "set dash_gap, 0\nset dash_width, "+ valuesnorm[i]  +", " + dist+  "\nset dash_round_ends, 0\n";

								contactString += "set dash_color, grey, "+dist+"\n";
								contactString += "hide labels, "+dist+"\n";
							}
						}
		    	}

					filename = viewOptions.pdb + "_network.pml";
				}
				else{
					contactString += "hide everything\nshow cartoon, chain " +viewOptions.chains[0]+ "\n";

					if(viewOptions.encode == 1){

						for (var i=0; i < json_splom.nodes.length; i++){
							if(json_splom.nodes[i].value != "no"){
								contactString += "color " + color_conservation(json_splom.nodes[i].value).replace('#', '0x') + ", resi " + json_splom.nodes[i].residueNum +"\n";
							}
							else{
								contactString += "color grey, resi " + json_splom.nodes[i].residueNum +"\n";
							}
						}
					}
					else{
						contactString += "color grey\n";
					}
					//contactString += "color grey\n";
					filename = viewOptions.pdb + ".pml";
				}
			}
			//residue centric view and different displays
			else if(viewOptions.tab=="ligand"){

				contactString += "hide everything\nshow cartoon, chain " +viewOptions.chains[0]+ "\n";

				if(viewOptions.encode == 1){

					for (var i=0; i < json_splom.nodes.length; i++){
						if(json_splom.nodes[i].value != "no"){
							contactString += "color " + color_conservation(json_splom.nodes[i].value).replace('#', '0x') + ", resi " + json_splom.nodes[i].residueNum +"\n";
						}
						else{
							contactString += "color grey, resi " + json_splom.nodes[i].residueNum +"\n";
						}
					}
				}
				else{
					contactString += "color grey\n";
				}
				//contactString += "color grey\n";
				contactString += "color " +colorcentric+ ", resi " + viewOptions.highlighted[0] + "\n";

				if(viewOptions.displayMode == "structure"){
					filename = viewOptions.pdb + ".pml";
				}

				else if(viewOptions.displayMode == "pair"){

			    for (var i=0; i < viewOptions.highlighted.length; i++){
				    contactString += "show sticks, chain " + viewOptions.chains[0] + " AND resi " + viewOptions.highlighted[i] + "\n";
				    contactString += "show spheres, chain " + viewOptions.chains[0] + " AND resi " + viewOptions.highlighted[i] +"\n";
		    	}
					contactString += "hide sticks\n";
					filename = viewOptions.pdb + "_" + viewOptions.highlighted + "_ligandcentric_sphere.pml";
				}

				else if(viewOptions.displayMode == "pairSticks"){

					contactString += "hide spheres\n";
			    for (var i=0; i < viewOptions.highlighted.length; i++){
				    contactString += "show sticks, chain " + viewOptions.chains[0] + " AND resi " + viewOptions.highlighted[i] + "\n";
		    	}
					filename = viewOptions.pdb + "_" + viewOptions.highlighted +  "_ligandcentric_sticks.pml";
				}

				else if(viewOptions.displayMode == "network"){

					contactString += "hide everything\nshow spheres, chain " + viewOptions.chains[0]+ " AND name CA\n";
					contactString += "color grey\n";
					contactString += "set sphere_scale, 0.25, (all)\n";
					//contactString += "show ribbon, chain " + viewOptions.chains[0]+ "\n";
					contactString += "cartoon loop\n";
					contactString += "show cartoon, chain " + viewOptions.chains[0]+ "\n";

					for (var i=0; i < json.links.length; i++){

						var res1 = json.nodes[ json.links[i].source ].residueNum;
						var res2 = json.nodes[ json.links[i].target ].residueNum;

							if(viewOptions.highlighted[0]==res1){
								for (var y=1; y < viewOptions.highlighted.length; y++){

									if(viewOptions.highlighted[y]==res2){
										var dist = "d"+res1+"-"+res2;

										contactString += "distance "+dist+", chain " +viewOptions.chains[0]+ " and resi " + res1 + " and name CA, chain " + viewOptions.chains[1] + " and resi " + res2 + " and name CA\n";
										contactString += "set dash_gap, 0\nset dash_width, "+ valuesnorm[i]  +", " + dist+  "\nset dash_round_ends, 0\n";

										contactString += "set dash_color, "+colorcentric +", "+dist+"\n";
										contactString += "hide labels, "+dist+"\n";

									}
								}
							}
							else if(viewOptions.highlighted[0]==res2){
								for (var y=1; y < viewOptions.highlighted.length; y++){

									if(viewOptions.highlighted[y]==res1){
										var dist = "d"+res1+"-"+res2;

										contactString += "distance "+dist+", chain " +viewOptions.chains[0]+ " and resi " + res1 + " and name CA, chain " + viewOptions.chains[1] + " and resi " + res2 + " and name CA\n";
										contactString += "set dash_gap, 0\nset dash_width, "+ valuesnorm[i]  +", " + dist+  "\nset dash_round_ends, 0\n";

										contactString += "set dash_color, "+colorcentric +", "+dist+"\n";
										contactString += "hide labels, "+dist+"\n";

									}
								}
							}

		    	}
					filename = viewOptions.pdb +"_"+ viewOptions.highlighted + "ligandcentric_network.pml";

				}

			}
			//scatter plot tab and different displays
			else if(viewOptions.tab=="network"){

				contactString += "hide everything\nshow cartoon, chain " +viewOptions.chains[0]+ "\n";

				if(viewOptions.encode == 1){

					for (var i=0; i < json_splom.nodes.length; i++){
						if(json_splom.nodes[i].value != "no"){
							contactString += "color " + color_conservation(json_splom.nodes[i].value).replace('#', '0x') + ", resi " + json_splom.nodes[i].residueNum +"\n";
						}
						else{
							contactString += "color grey, resi " + json_splom.nodes[i].residueNum +"\n";
						}
					}
				}
				else{
					contactString += "color grey\n";
				}

				if(viewOptions.displayMode == "structure"){
					filename = viewOptions.pdb + ".pml";
				}

				else if(viewOptions.displayMode == "pair"){

			    for (var i=0; i < viewOptions.highlightedsplom.length; i++){
				    contactString += "show sticks, chain " + viewOptions.chains[0] + " AND resi " + viewOptions.highlightedsplom[i] + "\n";
				    contactString += "show spheres, chain " + viewOptions.chains[0] + " AND resi " + viewOptions.highlightedsplom[i] +"\n";
						contactString += "color " +colorcentric+ ", resi " + viewOptions.highlightedsplom[i] + "\n";

		    	}
					contactString += "hide sticks\n";
					filename = viewOptions.pdb + "_scatter_sphere.pml";
				}

				else if(viewOptions.displayMode == "pairSticks"){

					contactString += "hide spheres\n";
			    for (var i=0; i < viewOptions.highlightedsplom.length; i++){
				    contactString += "show sticks, chain " + viewOptions.chains[0] + " AND resi " + viewOptions.highlightedsplom[i] + "\n";
						contactString += "color " +colorcentric+ ", resi " + viewOptions.highlightedsplom[i] + "\n";

		    	}
					filename = viewOptions.pdb + "_scatter_sticks.pml";
				}

				else if(viewOptions.displayMode == "network"){
					contactString += "hide everything\nshow spheres, chain " + viewOptions.chains[0]+ " AND name CA\n";
					contactString += "color grey\n";
					contactString += "set sphere_scale, 0.25, (all)\n";
					//contactString += "show ribbon, chain " + viewOptions.chains[0]+ "\n";
					contactString += "cartoon loop\n";
					contactString += "show cartoon, chain " + viewOptions.chains[0]+ "\n";


					for (var i=0; i < json.links.length; i++){

						var res1 = json.nodes[ json.links[i].source ].residueNum;
						var res2 = json.nodes[ json.links[i].target ].residueNum;

						for (var y=0; y < viewOptions.highlightedsplom.length; y++){
							if(viewOptions.highlightedsplom[y]==res1 || viewOptions.highlightedsplom[y]==res2){
								var dist = "d"+res1+"-"+res2;

								contactString += "distance "+dist+", chain " +viewOptions.chains[0]+ " and resi " + res1 + " and name CA, chain " + viewOptions.chains[1] + " and resi " + res2 + " and name CA\n";
								contactString += "set dash_gap, 0\nset dash_width, "+ valuesnorm[i]  +", " + dist+  "\nset dash_round_ends, 0\n";

								contactString += "set dash_color, "+colorcentric +", "+dist+"\n";
								contactString += "hide labels, "+dist+"\n";
							}
						}
					}
					filename = viewOptions.pdb + "_scatter_network.pml";
				}
			}
	}

	contactString += "set ray_opaque_background, off\n";
	contactString += "deselect\n";

  var link = document.createElement("a");
  link.download = filename;
  link.href = 'data:application/octet-stream;base64,'+btoa(contactString);
	link.style.display = 'none';
	document.body.appendChild(link);
  link.click();

};
