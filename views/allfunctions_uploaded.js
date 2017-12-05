var json;
var viewOptions;

var json_chains;


//WITH 14 COLORS FROM category20c() WITHOUT GREY COLORS and light colors
//var fill = d3.scale.ordinal().domain(d3.range(16)).range(["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#e7ba52", "#31a354", "#74c476", "#a1d99b", "#756bb1", "#9467bd", "#9e9ac8", "#bcbddc", "#d62728", "#ff9896"]);
var fill = d3.scale.ordinal().domain(d3.range(16)).range(["#c6dbef", "#6baed6", "#3182bd", "#d62728", "#e6550d", "#fd8d3c", "#fdae6b", "#e7ba52", "#31a354", "#74c476", "#a1d99b", "#756bb1", "#9467bd", "#9e9ac8", "#bcbddc", "#d62728", "#ff9896"]);

//var fill_chains = d3.scale.ordinal().domain(d3.range(2)).range(["#636363", "#969696"]);
var fill_chains = d3.scale.ordinal().domain(d3.range(2)).range(["#999999", "#666666"]);

var fill2 = d3.scale.category20b();

var width = 450;
var height = 450;

/////////////////////////////////////// FOR ASTEORID PLOT
// we store the residue numbers and colors here for later use in coloring the protein view
var asteroidAtoms = new Array();
var asteroidColors = new Array();

var asteroidAtoms_inner = new Array();
var asteroidColors_inner = new Array();
var asteroidChains_inner = new Array();

var asteroidAtoms_outer = new Array();
var asteroidColors_outer = new Array();
var asteroidChains_outer = new Array();

var jsongroupsnew = new Array();
var json_pymolseq = new Array();
var json_pymolseq1 = new Array();
var json_pymolseq2 = new Array();


var defaultColor = "blue";
var color = d3.scale.linear()
	.domain([0, 1]).range([defaultColor, defaultColor]);

// var fisheye = d3.fisheye.circular()
// 	.radius(120);
var maxConnectivity;

// ////////////////////////////////////////////////////////////////////////////

var pdb_name;
//var temp_chains;
var chains = new Array();


var jsonResNumsS = [];
var jsonNamesS = [];

var jsonResNumsT = [];
var jsonNamesT = [];
var jsonchain;

var allchains;
var temp_chains;

var chains_for_screenshot;

var first;
var second;

var suffix_pdb = "one";

var array_for_pymolseq_name = [];
var array_for_pymolseq_name_first = [];
var array_for_pymolseq_name_second = [];

//to be used for the scroll function
var array_for_pymolseq_start = [];
var array_for_pymolseq_start_first = [];
var array_for_pymolseq_start_second = [];

//var array_for_pymolseq_name = new Array();
var array_for_pymolseq_color = [];
var c_for_pymolseq = 0;
var c_for_pymolseq1 = 0;
var c_for_pymolseq2 = 0;

var suffix_forward;
var suffix_forwardinter;

var jsonall;

var svgline;
var svgline1;
var svgline2;

var r1, r0;

var pathname;
var cutoff;
var filter_contacttype; // non-covalent, aromatic etc
var filter_chain; // M-S, S-S etc
var filter_weight; // real weight
var filter_norm_abs;
var ligandcutoff;

var ligandarray = [];

var tooltip;

function load() {

	//console.log(document.body.style.zoom+"\t"+$(window).width()+"\t"+$(window).height());

	//LATER, THIS CAN BE DONE FOR EACH SCREENSIZE PLUS ZOOM LEVEL (BY CHECKING THE ZOOM LEVEL OF INDEX PAGE FIRST), IF IT IS BIGGER THAN 70% THEN MAKE IT 67%, IF SMALLER, DON'T TOUCH
	// if ($(window).width() <= 1500 && $(window).height() <= 850) {
// 		//document.body.style.zoom="67%";
// 		if (navigator.userAgent.indexOf('Firefox') != -1 ) {
//
// 			$('body').css({'-moz-transform': 'scale(0.67)', '-moz-transform-origin': 'center top'});
// 		}
// 		else{
// 			$('body').css({'zoom': '67%'});
// 		}
//
// 	}

	viewOptions = getviewOptions();

	var b = viewOptions.allchains.indexOf("_");

	pdb_name = viewOptions.allchains.slice(0, b);
	temp_chains = viewOptions.allchains.slice(b + 1, viewOptions.allchains.length);

	chains = temp_chains.split('-');

	//console.log(chains.length);
	//to show the popup modal on page load
	$(window).load(function() {

		if(chains.length>2){
			$('#myModal').modal('show');
		}
		else{
			$('#screenshot_chains').css('display', 'none');
			$('#show').addClass('disabled');
		}

		$('#disease').css('display', 'none');

	});

	//required for the screenshot function for interactiongraph
	chains_for_screenshot = temp_chains.split('-');

	viewOptions.tab = "chord";

	var jsonSour;
	var jsonTarg;

	viewOptions.type = 0;

	//viewOptions.displayMode = "pair";
	viewOptions.displayMode = "pairSticks";

	//viewOptions.selected = "";

	updateURL(viewOptions);

	if (viewOptions.encode == 1) {

		$('#secondpanel').css('display', 'block');
		$('#firstpanel').css('display', 'none');
		$('#thirdpanel').css('display', 'none');

		$('#tab1').removeClass('active');
		$('#tab2').addClass('active');
		$('#tab3').removeClass('active');

		switchTabs("network");
		event.preventDefault();

	}

	document.getElementById('PDBin').value = pdb_name;

	cutoff = viewOptions.cutoff;

	if(cutoff == "0.5"){
		pathname = "../structures_uploaded";
	}
	else if(cutoff != "0.5"){
		pathname = "../structures_uploaded_"+cutoff;
	}

	if (viewOptions.filter_contacttype) {
		filter_contacttype = viewOptions.filter_contacttype;
		pathname = "../structures_database-filter_by_contact_type/"+filter_contacttype;
		$('.savearpeggio').css('display', 'block');
	}

	if (viewOptions.filter_chain) {
		filter_chain = viewOptions.filter_chain;
		pathname = "../structures_database-filter_by_chain/"+filter_chain;
	}

	if (viewOptions.filter_norm_abs) {
		filter_norm_abs = viewOptions.filter_norm_abs;
		filter_weight = viewOptions.filter_weight;
		pathname = "../structures_database-filter_by_weight/"+filter_norm_abs+"/"+filter_weight;
	}
	if (viewOptions.ligandcutoff) {
		ligandcutoff = viewOptions.ligandcutoff;
		pathname = "../structures_database-ligand-cutoff/";
	}

	d3.json(pathname + "/" + pdb_name + "/" + pdb_name + ".json", function(data) {

		jsonall = data;

		reassignIndexes();

		drawChainNetwork();

		// <a href="data:application/octet-stream,field1%2Cfield2%0Afoo%2Cbar%0Agoo%2Cgai%0A">CSV</a>

		if (viewOptions.show == "yes") {
			$("#interactions").slideToggle("fast");
		}

	});

	first = chains[0];
	second = chains[0];

	viewOptions.chains = [first, second];

	//switchTabs("chord");

	viewOptions.pdb = pdb_name + "_" + chains[0];

	viewOptions.mychain = chains[0];

	updateURL(viewOptions);

	// console.log(chains+"ja");

	d3.json(pathname +"/" + pdb_name + "/" + pdb_name + "_" + chains[0] + ".json", function(data) {
		json = data;
		if (!json) {
			redirectHome();
		}

		for (var y=0; y < json.nodes.length; y++) {
			json.nodes[y].variant = []
			json.nodes[y].info = []
		}


		//if there are mutations in the structure
		if(viewOptions.variant!="no"){

			console.log(viewOptions.variant)
			variantchains =  viewOptions.variant.split('-');
			console.log(variantchains)
			for(var o=0; o<variantchains.length-1; o++){

				 if(variantchains[o]==viewOptions.chains[0]){

					$('#disease').css('display', 'inline-block');

					$.ajax({
						dataType: "json",
						url: "../mutationjsons/" + pdb_name + "_variants.json" ,
						async: false,
						success: function(data){

							for(var i=0; i<data.length; i++){

								for(var p=0; p<data[i].CHAINS.length; p++){
									if(variantchains[o]==data[i].CHAINS[p]){

										var disease = data[i].DISEASE;

										if(disease != "-"){

											preString = "PubMed:";
											searchStringComma = ",";
											searchStringP = "}";

											var times = 0, index = null;

											 while (index !== -1) {
												 //times++;

													index = disease.indexOf(preString, index+1);

													if(index!=-1){

														var numberPattern = /\d+/g;

														//'something102asdfkj1948948'.match( numberPattern )
														var pubmedlink = disease.substring(index+7).match( numberPattern )[0];
														var newlink = '<a href="http://www.ncbi.nlm.nih.gov/pubmed/' + pubmedlink + '" target="_blank">'+pubmedlink+'</a>';

														s = index + 7 + pubmedlink.length;
														disease = disease.substring(0, index+7) + newlink + disease.substring(s, disease.length);

														//console.log(f+"\tindex is\t"+index+"\ts is\t"+s+ "\tpubmedlink is\t"+ pubmedlink +"\tpreString is\t"+preString+"\tscomma is\t"+scomma+"\tsparan is\t"+sparan)
														//console.log(disease)

													}
											 }
											 //times--;

											d3.select("#mutation").html(disease);
											break;
										}
									}
								}
							}

							for (var y=0; y < json.nodes.length; y++) {
								 for(var i=0; i<data.length; i++){
									 for(var p=0; p<data[i].CHAINS.length; p++){

											if(variantchains[o]==data[i].CHAINS[p]){
												json.nodes[y].uniprot=data[i].ACC +","+ data[i].ID;

												json.nodes[y].disease=data[i].DISEASE;

												var v=0;
												for(var z=0; z<data[i].VARIANTS.length; z++){
													if(json.nodes[y].residueNum==data[i].VARIANTS[z].residuenumber){
														json.nodes[y].variant.push(data[i].VARIANTS[z].variant);
														json.nodes[y].info.push(data[i].VARIANTS[z].info);
														v++;
													}
												}
												break;
											}
									}
								 }
							}
						}
					});
					break;
				}
			}
		}


    var mut=0;
		for(var i=0;i<json.nodes.length;i++){
      if(json.nodes[i].uniprot!="" && json.nodes[i].uniprot !=undefined){
         // alert("Mutations detected");
         if(mut==0){
              $('#mutations').show();
         }
          mut++;
          break;
      }
    }


		//NEW FUNCTION TO CHECK IF GROUPS IS EMPTY IN JSON, IF IT IS, CHECK IF THIS IS BECAUSE OF RNA CHAIN (U, ..) etc
		if(json.groups.length==0){
			fillgroups();
		}

		checkValidSSonLoad();
		removeDuplicatesLoops();

		var checkNA=0;
		for(var i=0;i<json.groups.length;i++){
			if(json.groups[i].name[2]=="N"){
				checkNA = -1;
				break;
			}
		}
		if(checkNA==-1){
			//addLoopsNucleicAcids();
		}
		else{
			addLastLoop();
		}

		removeHOH();

		var svgStyle = ".background {\
	 	      fill: none;\
	 	    }\
	 	    \
	 	    line {\
	 	      stroke: #BDBDBD;\
	 	    }\
	 	    \
	 	    text.active {\
	 	      fill: red;\
	 	      font-size: 15;\
	 	      font-weight: bold;\
	 	    }";

		addChainName(first, second);

		///////READ IT FROM SPLOM.JS
		loadSplom();


		///////////////////////

		//FOR ONE CHAIN PYMOL SEQ

		function mouseout_text(fi, f) {
			return function(){

				if(json.nodes[fi].variant[0] != "" && json.nodes[fi].variant[0]!= undefined){
			  }
			  else{
			      tooltip.style("visibility", "hidden");
			  }

			 };
		}
		function mouseover_text_custom(fi, f) {
			return function() {
			var matrix = this.getScreenCTM().translate( this.getAttribute("cx"), this.getAttribute("cy"));

			var lastScrolledLeft = 0;
			var xPos = d3.event.pageX;

			//http://stackoverflow.com/questions/6519043/get-mouse-position-on-scroll
			if(lastScrolledLeft != $("#pymolseqs").scrollLeft()){
					xPos -= lastScrolledLeft;
					lastScrolledLeft = $("#pymolseqs").scrollLeft();
					xPos -= lastScrolledLeft;
					//console.log("xPos\t"+xPos +"\tlastScrolledLeft\t"+ lastScrolledLeft)
			}

      tooltip
          .style("left", (xPos-matrix.e) + "px")
          .style("top", (d3.event.pageY-matrix.f+120) + "px");

				//http://jsfiddle.net/WLYUY/7/
				//http://stackoverflow.com/questions/16256454/d3-js-position-tooltips-using-element-position-not-mouse-position
				// tooltip.style("left", (parseFloat(d3.select(this).attr("x")) + document.getElementById("pymolseqs1").offsetLeft) + "px")
      	// .style("top", (parseFloat(d3.select(this).attr("y")) + document.getElementById("pymolseqs1").offsetTop + 20) + "px");

			  if(json.nodes[fi].variant[0] != "" && json.nodes[fi].variant[0]!= undefined){
					var uniprot = json.nodes[fi].uniprot;
					var info = "";
					for(var v = 0; v<json.nodes[fi].info.length; v++){
						info += json.nodes[fi].info[v] + "\n";
					}

					//LATER CHECK THIS TO SEE IF YOU CAN ADD A NEWLINE AT EVERY MUTATION
					// var str1 = "/FTId=VAR";
					// var searchStringSemiColon= ";";
					// var index1=null;
					//
					// while (index1 !== -1) {
					//
					// 	 index1 = info.indexOf(str1, index1+1);
					//
					// 	 if(index1!=-1){
					// 		 scolon = info.indexOf(searchStringSemiColon, index1+1);
					// 		 info = info.substring(0, scolon) + "\n" + info.substring(scolon+1, info.length);
					//
					// 		 console.log(info)
					//  	}
					//  }

					//////////////////////////////////////

					preString = "PubMed:";
					searchStringComma = ",";
					searchStringP = "}";

					var times = 0, index = null;

					 while (index !== -1) {
						 	times++;

							index = info.indexOf(preString, index+1);

							if(index!=-1){

								//OLD WAY OF EXTRACTING PUBMED IDS, KEEP FOR NOW, DELETE LATER
								//WORKS IF PUBMED ID FINISHES WITH } OR , HOWEVER IF IT HAS "AND" OR ) OR ANY OTHER, IT WOULD NOT WORK
								// scomma = info.indexOf(searchStringComma, index+1);
								// sparan = info.indexOf(searchStringP, index+1);
								//
								// s = 0;
								//
								// if((scomma<sparan && scomma!=-1 && sparan!=-1) || sparan==-1 && scomma!=-1){s = scomma}
								// else if((sparan<scomma && sparan!=-1 && scomma!=-1) || sparan!=-1 && scomma==-1){s = sparan}
								//
								// var pubmedlink = info.substring(index+7, s);
								// var newlink = '<a href="http://www.ncbi.nlm.nih.gov/pubmed/' + pubmedlink + '" target="_blank">'+pubmedlink+'</a>';
								//
								// //info=info.replace(pubmedlink, newlink);
								//
								// //http://stackoverflow.com/questions/2236235/how-to-replace-a-string-at-a-particular-position
								// //myString = myString.substring(0, 13) + "12" + myString.substring(15, myString.length);
								// info = info.substring(0, index+7) + newlink + info.substring(s, info.length);

								//GET THE SUBSTRING AFTER "Pubmed:" and get it until all numbers are taken and take only the first
								//as this is the first id after that pubmed in the loop
 								var numberPattern = /\d+/g;
								//http://stackoverflow.com/questions/1183903/regex-using-javascript-to-return-just-numbers
								//'something102asdfkj1948948'.match( numberPattern )
								var pubmedlink = info.substring(index+7).match( numberPattern )[0];
								var newlink = '<a href="http://www.ncbi.nlm.nih.gov/pubmed/' + pubmedlink + '" target="_blank">'+pubmedlink+'</a>';

								s = index + 7 + pubmedlink.length;
								info = info.substring(0, index+7) + newlink + info.substring(s, info.length);


								//console.log(f+"\tindex is\t"+index+"\ts is\t"+s+ "\tpubmedlink is\t"+ pubmedlink +"\tpreString is\t"+preString+"\tscomma is\t"+scomma+"\tsparan is\t"+sparan)
								//console.log(f+"\t"+info)

							}
					 }

					 times--;

					//return uniprot+"\n"+info;
					tooltip.html(uniprot+"\n"+info);
			  }

			  else{
			      //return json.nodes[i].name;
						tooltip.text(f);
			  }
				//tooltip.text(f);
				return tooltip.style("visibility", "visible");
				//return false;
			};
		}

		function makeOnClickCallback(fi, f) {
			return function() {
				viewOptions.highlighted = [f, f];
				viewOptions.highlightedsplom = [f, f];

				viewOptions.mychain = viewOptions.chains[0];

				// if(json.nodes[fi].variant != "" && json.nodes[fi].variant!= undefined){
				// 		var uniprot = json.nodes[fi].uniprot;
				// 		var info = json.nodes[fi].info;
				// 		return uniprot+"\n"+info;
				// }

				var group;
				var check = 0;

				for (var i = 0; i < json.groups.length; i++) {

					if (json.groups[i].start <= f && f <= json.groups[i].end) {
						viewOptions.colors = [parseInt(fill(i).substr(1), 16), parseInt(fill(i).substr(1), 16)];
						viewOptions.group1 = i;
						viewOptions.group2 = i;

						group = viewOptions.group1;

						check = -1;
					}

				}
				if (check == 0) {
					viewOptions.colors = [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)];

					group = -1;

				}

				d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "").style("font-weight", "normal");

				if (viewOptions.tab == "chord") {

					reDrawProtein(viewOptions.highlighted, viewOptions.colors);
				} else if (viewOptions.tab == "network") {

					updateAsteroidPymol(f);
					updateSplomPymol(f, group);
					drawTable(viewOptions.highlightedsplom);
				} else if (viewOptions.tab == "ligand") {

					updateSplomPymol(f, group);
					drawTable(viewOptions.highlightedsplom);
					updateAsteroidPymol(f);

				}

				if(document.getElementById("ligandList").length!=0){
					$("#ligandList").val(json.nodes[fi].name);
				}

				updateURL(viewOptions);

				d3.select("#pymolseqs1").selectAll(".mytxt").filter(function(d, index) {
					if (fi === index) {
						return true;
					}
				}).style("fill", "red").style("font-weight", "bold");

				d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");

				d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
						if (viewOptions.group1 === index) {
							return true;
						}
					}).transition().style("stroke", "black").attr("stroke-width", 2)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				svgline.selectAll(".rectcell").filter(function(d) {
						return d.index == viewOptions.group1;
					}).transition().style("stroke", "black").attr("stroke-width", 2)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				svgline.selectAll(".rectcell").filter(function(d) {
						return d.index != viewOptions.group1;
					}).transition().style("stroke", function(d) {
						return d3.rgb(fill(d.index));
					})
					.each("end", partial(addDownloadLink, 'chordGraph_real'));


				return false;
			};
		}

		d3.select("#pymolseqs1").select("svg").remove();

		svgline1 = d3.select("#pymolseqs1").append("svg")
			.attr("width", json.nodes.length * 9)
			.attr("height", 40)
			.append("g")
			.attr("transform", "translate(" + 0 + "," + -10 + ")");

		tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d) {
				var str = json.groups[d].name;
				if (str.indexOf('HELIX') > -1) {
					var str2 = str.replace("HELIX", "H");
				} else if (str.indexOf('SHEET') > -1) {
					var str2 = str.replace("SHEET", "S");
				} else if (str.indexOf('NucleicAcid') > -1) {
					var str2 = str.replace("NucleicAcid", "NA");
				}
				else{
					var str2 = str;
				}

				var strchain = str[0] + ":";
				str2 = str2.replace(strchain, "");
				//str2 = str2 + "(" + json.groups[d.index].start +"-"+ json.groups[d.index].end+")";

				return str2;
				//return "<strong>Frequency:</strong> <span style='color:red'>" + json.groups[d.index].name + "</span>";
			})

		svgline1.call(tip);


		//////////////////////////

		//START OF START AND END RESIDUE NUMBERS ON SSLINE


		var numberstext = d3.select("#pymolseqs1").append("svg")
			.attr("width", json.nodes.length * 9)
			.attr("height", 20)
			.style("margin-top", "-25px")
			.append("g")
			.attr("transform", "translate(" + 0 + "," + -10 + ")");
		// .attr("transform", "rotate(-90)");

		var textnum = numberstext.append("text");

		for (var im = 0; im < json.nodes.length; im++) {

			for (var yam = 0; yam < json.groups.length; yam++) {
				if ((json.nodes[im].residueNum == json.groups[yam].start || json.nodes[im].residueNum == json.groups[yam].end) && im == 0) {
					textnum.append("tspan")
						.attr("x",
							function(d) {

								if (json.nodes[im].name[0] == "D" && (json.nodes[im].name[1] == "A" || json.nodes[im].name[1] == "G" || json.nodes[im].name[1] == "C" || json.nodes[im].name[1] == "T" || json.nodes[im].name[1] == "U")) {
									return im * 21;
								} else return im * 9;
							})
						.attr("y", 20)
						.attr("dy", ".32em")
						.attr("class", "mytxtnum")
						// .attr("text-anchor", "end")
						.text(function(d) {
							// var str=json.nodes[im].name;
							//  		 	  	   	  		var strres = str[0];
							//  		 	  	   	  		var str2 = str2.replace(strres,"");
							return json.nodes[im].residueNum;
						})

					.attr("font-size", "10px")
						.attr("font-style", "normal")
						.attr("font-weight", "normal")
						.attr("font-family", "Courier")
						.attr("fill", "black");
					// .style("cursor", "pointer")
				} else if ((json.nodes[im].residueNum == json.groups[yam].start || json.nodes[im].residueNum == json.groups[yam].end) && yam != json.groups.length - 1 && (json.groups[yam].end - json.groups[yam + 1].start >= 5)) {


					//console.log(json.groups[yam].end +"\t"+ json.groups[yam+1].start);

					textnum.append("tspan")
						.attr("x",
							function(d) {

								if (json.nodes[im].name[0] == "D" && (json.nodes[im].name[1] == "A" || json.nodes[im].name[1] == "G" || json.nodes[im].name[1] == "C" || json.nodes[im].name[1] == "T" || json.nodes[im].name[1] == "U")) {
									return im * 21;
								} else return im * 9;
							})
						.attr("y", 20)
						.attr("dy", ".32em")
						.attr("class", "mytxtnum")
						// .attr("text-anchor", "end")
						.text(function(d) {
							// var str=json.nodes[im].name;
							//  		 	  	   	  		var strres = str[0];
							//  		 	  	   	  		var str2 = str2.replace(strres,"");
							return json.nodes[im].residueNum;
						})

					.attr("font-size", "10px")
						.attr("font-style", "normal")
						.attr("font-weight", "normal")
						.attr("font-family", "Courier")
						.attr("fill", "black");
					// .style("cursor", "pointer")

				} else if ((json.nodes[im].residueNum == json.groups[yam].start || json.nodes[im].residueNum == json.groups[yam].end) && (json.groups[yam].end - json.groups[yam].start >= 5)) {

					textnum.append("tspan")
						.attr("x",
							function(d) {

								if (json.nodes[im].name[0] == "D" && (json.nodes[im].name[1] == "A" || json.nodes[im].name[1] == "G" || json.nodes[im].name[1] == "C" || json.nodes[im].name[1] == "T" || json.nodes[im].name[1] == "U")) {
									return im * 21;
								} else return im * 9;
							})
						.attr("y", 20)
						.attr("dy", ".32em")
						.attr("class", "mytxtnum")
						// .attr("text-anchor", "end")
						.text(function(d) {
							// var str=json.nodes[im].name;
							//  		 	  	   	  		var strres = str[0];
							//  		 	  	   	  		var str2 = str2.replace(strres,"");
							return json.nodes[im].residueNum;
						})

					.attr("font-size", "10px")
					.attr("font-style", "normal")
					.attr("font-weight", "normal")
					.attr("font-family", "Courier")
					.attr("fill", "black");
					// .style("cursor", "pointer")

				}
			}

		}

		//END OF START AND END RESIDUE NUMBERS ON SSLINE
		///////////////////////////

		//PYMOL TEXT RESIDUE LETTERS START

		var svgtext2 = d3.select("#pymolseqs1").append("svg")
			.attr("width", json.nodes.length * 9)
			.attr("height", 20)
			.style("margin-top", "-10px")
			//.attr("class", "mytxt")
			.append("g")
			.attr("transform", "translate(" + 0 + "," + -10 + ")");


		//WORKED! CUSTOM MADE TOOLTIP DIV
		tooltip = d3.select("#pymolseqs1")
    .append("div")
		.attr("class", "tooltip_custom")
    .text("");

		// Apply the CSS styling
		d3.select("#pymolseqs1").select("svg").append("style").attr("type", "text/css").text(svgStyle);
		var text = svgtext2.append("text");

		for (var i = 0; i < json.nodes.length; i++) {
			text.append("tspan")
				.attr("x",
					function(d) {
						if (json.nodes[i].name[0] == "D" && (json.nodes[i].name[1] == "A" || json.nodes[i].name[1] == "G" || json.nodes[i].name[1] == "C" || json.nodes[i].name[1] == "T" || json.nodes[i].name[1] == "U")) {
							return i * 21;
						} else return i * 9;
					}
				)
				.attr("y", 20)
				.attr("dy", ".32em")
				.attr("class", "mytxt")
				// .attr("text-anchor", "end")
				.text(function(d) {
					if (json.nodes[i].name[0] == "D" && (json.nodes[i].name[1] == "A" || json.nodes[i].name[1] == "G" || json.nodes[i].name[1] == "C" || json.nodes[i].name[1] == "T" || json.nodes[i].name[1] == "U")) {
						return json.nodes[i].name[0] + json.nodes[i].name[1] + " ";
					} else if (json.groups[0].name[2] == "N" && json.nodes[i].name[0] == "H" && json.nodes[i].name[1] == "O" && json.nodes[i].name[2] == "H") {} else return json.nodes[i].name[0];
				})
        .attr("font-size", function(d) {
           return "13px";
        })
				.attr("font-style", "normal")
        .attr("text-decoration", function(d){
            if(json.nodes[i].variant[0] != "" && json.nodes[i].variant[0]!= undefined){
               return "overline";
            }
            else{
                return "normal";
            }
        })
				.attr("font-family", "Courier")
				.attr("fill",function(d) {
          return "black";
				})
        .style("stroke", function(d){
            if(json.nodes[i].variant[0] != "" && json.nodes[i].variant[0]!=undefined){
               return "black";
            }
            else{
                return "";
            }
        })
				.style("cursor", "pointer")
				.on("click", makeOnClickCallback(i, json.nodes[i].residueNum))
				//https://chartio.com/resources/tutorials/how-to-show-data-on-mouseover-in-d3js
				.on("mouseover", mouseover_text_custom(i,json.nodes[i].name))
				.on("mouseout", mouseout_text(i,json.nodes[i].name));
				//function(){return tooltip.style("visibility", "hidden");});
				//ORIGINAL
				// .append("title")
        // .text(function(d) {
				//
        //     if(json.nodes[i].variant[0] != "" && json.nodes[i].variant[0]!= undefined){
				// 			var uniprot = json.nodes[i].uniprot;
				// 			var info = "";
				// 			for(var v = 0; v<json.nodes[i].info.length; v++){
				// 				info += json.nodes[i].info[v] + "\n";
				// 			}
				//
				// 			return uniprot+"\n"+info;
        //     }
				//
        //     else{
        //         return json.nodes[i].name;
        //     }
				//
        //   });

			}

		//bootstrap tooltip, DID NOT WORK
			// $(".mytxt").tooltip({
			// 		'container': 'body',
			// 		'placement': 'right'
			// });

		//END OF MYTEXT CLASS OF PYMOL RESIDUES

		// DRAW SEQUENCE LINE RECTANGLES
		drawRectangleswithLoops();

		////////////////////////////////////////////

		drawChord("null");
		colorChordNames(viewOptions.group1, viewOptions.group2);

		////////////////////////////////////

		// Display the PDB ID, extracted from the JSON, as a link

		var titleStr = '';
		titleStr += "Protein ID: ";
		titleStr += '<a href="http://www.rcsb.org/pdb/explore/explore.do?structureId=' + json.name + '">' + json.name + '</a>';

		var title = $('#navtext');
		title.html(titleStr);

		var group1 = parseInt(viewOptions.group1);
		var group2 = parseInt(viewOptions.group2);


		//////////////////////

		//ADD NAMES ON PROTEIN VIEW CONTENT LAST COLUMN

		d3.select("#contenttext2").select("svg").remove();
		var svgtext2 = d3.select("#contenttext2").append("svg")
			.attr("width", 500)
			.attr("height", 30)
			.append("g");
		// .style("display","block")//to place svg centered
		//  	.style("margin","auto");//to place svg centered
		//
		// Apply the CSS styling
		//d3.select("#contenttext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

		var text = svgtext2.append("text");

		initializeProteinView([], [], 0);

		///////////////////// THE LOADING OF ASTEROID PLOT FOR THE FIRST TIME:

		ligandarray = [];

		/////////////////////
		var check = 0;

		for (var i = 0; i < json.nodes.length; i++) {

			//if (json.nodes[i].name.substring(0, 1).match(/[a-z]/i) && json.nodes[i].name.substring(1, 2).match(/[a-z]/i) && json.nodes[i].name.substring(0, 3) != "HOH") {
			if (json.nodes[i].type == "HETAT" && json.nodes[i].name.substring(0, 3) != "HOH") {

				var x = document.getElementById("ligandList");
				var option = document.createElement("option");
				option.text = json.nodes[i].name;
				x.add(option);
				ligandarray.push(json.nodes[i].name);

				if (check == 0) {
					if (!viewOptions.center) {
						viewOptions.center = json.nodes[i].residueNum;
					}
				}

				check++;
			}
		}


		$("#ligandList option").each(function() {

			// if ($(this).text() == viewOptions.pdb[a]) {

			$('#ligandList').prop("selected", true);

		});

		if (check == 0) {
			$("#ligandid").animate({
				"opacity": "0"
			}, "fast");
		}

		/////////////////////

		var svgStyle = ".background {\
	 	      fill: none;\
	 	    }\
	 	    \
	 	    line {\
	 	      stroke: #BDBDBD;\
	 	    }\
	 	    \
	 	    text.active {\
	 	      fill: red;\
	 	      font-size: 15;\
	 	      font-weight: bold;\
	 	    }";

		// Fill the central residue input box from the URL or, failing that, with the first residue listed in JSON
		if (!viewOptions.center) {
			viewOptions.center = json.nodes[0].residueNum;
		}
		document.getElementById("center").value = viewOptions.center;
		document.getElementById("centerchain").value = viewOptions.chains[0];


		if ($("#proteinview").height() > $("#graphview").height()) {
			d3.select("#graphview").style("height", $("#proteinview").height() + "px");
		} else {
			d3.select("#proteinview").style("height", $("#graphview").height() + "px");
		}

		ligandtable();
		drawAsteroidGraph();
		drawMatrixLigand();
		/////////////////////// LOADING OF ASTEROID PLOT

	});
}

//////////////////////////////////

//////////////////////////

function click_group(fi, f) {
	return function() {

		d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");

		d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
				if (fi === index) {
					return true;
				}
			}).transition().style("stroke", "black").attr("stroke-width", 2)
			.each("end", partial(addDownloadLink, 'chordGraph_real'));


		$(".block").css("width", "100%");
		$(".block").css("height", "450px");
		$(".block").css("margin", "0 auto");

		$("#contactmatrix").css("display", "none");
		$("#infobox").css("display", "none");

		//drawChordfromPymol(f);
		if(viewOptions.type==0){
			drawChord(f);
		}
		else{
			drawChordLoops(f);
		}

		d3.select("#ssline").selectAll(".rectcell").filter(function(d) {
				return d.index == fi;
			}).transition().style("stroke", "black").attr("stroke-width", 2)
			.each("end", partial(addDownloadLink, 'chordGraph_real'));

		d3.select("#ssline").selectAll(".rectcell").filter(function(d) {
				return d.index != fi;
			}).transition().style("stroke", "")
			.each("end", partial(addDownloadLink, 'chordGraph_real'));


		if(viewOptions.type==0){
			viewOptions.colors = [parseInt(fill(fi).substr(1), 16), parseInt(fill(fi).substr(1), 16)];
			viewOptions["group1"] = fi;
			viewOptions["group2"] = fi;
		}

		else{
			for(var a=0;a<json.groupsloops.length;a++){
				if(json.groupsloops[a].name==f){
					viewOptions["group1"] = a;
					viewOptions["group2"] = a;
					break;
				}
			}
		}


		viewOptions.mychain = viewOptions.chains[0];

		removeURLpart("highlighted");
		removeURLpart("colors");

		updateURL(viewOptions);

		reDrawProtein(viewOptions.highlighted, viewOptions.colors);

		if (viewOptions.tab == "network") {

			updateSplomSecondaryStructureLine(fi);
		}

		return false;
	};
}


//////////////////////////////////
function mouseover_group(fi) {
	return function() {

		d3.select("#chordGraph_real").selectAll("path.chord").style("opacity", 1.0);
		d3.select("#chordGraph_real").selectAll("path.chord").filter(function(d) {

				if(viewOptions.type==0){
					return d.source.index != fi && d.target.index != fi;
				}
				else{
					return json.groupsloops[d.source.index].name!=json.groups[fi].name && json.groupsloops[d.target.index].name!=json.groups[fi].name;
				}
			}).transition().style("opacity", 0.1)
			.each("end", partial(addDownloadLink, 'chordGraph_real'));


		tip.show(fi);

		return false;
	};
}


function drawRectangleswithLoops(){
	/////////////////////RECTANGLES
	for (var ya = 0; ya < json.groups.length; ya++) {
		if (json.groups[ya].name.indexOf('NucleicAcid') > -1) {}
		else {

			svgline1.append("path")
				.attr("class", "rectcell1")
				.attr("transform", function(d) {

					var x = 0;
					var y = 20;

					return "translate(" + x + "," + y + ")";
				})

			.attr("d", function(d) {

					var x1 = 0;
					var x2;
					for (var i = 0; i < json.nodes.length; i++) {

						if (i == json.nodes.length - 1 && json.nodes[i].residueNum >= json.groups[json.groups.length - 1].end) {
							x2 = i * 9;

						}

					}

					var totalsize = x2 - x1;

					return "M0,12.4L" + totalsize + ",12.4L" + totalsize + ",13.6L0,13.6Z";
					//return "M0,12.4L"+totalsize+",12.4L"+totalsize+",12.6L0,12.6Z";

				})
				.style("cursor", "pointer")
				.style("fill", "black");

		}
	}

	for (var ya = 0; ya < json.groups.length; ya++) {

		if (json.groups[ya].name.indexOf('NucleicAcid') > -1) {} else {

			svgline1.append("path")
				.attr("class", "rectcell")
				.attr("transform", function(d) {


					var x;
					var y;

					for (var i = 0; i < json.nodes.length; i++) {
						if (json.nodes[i].residueNum == json.groups[ya].start) {


							x = i * 9;

							//console.log(" x1 is "+x);

							break;
						}
					}

					y = 20;

					return "translate(" + x + "," + y + ")";
				})


			.attr("d", function(d) {


					var x1;
					var x2;
					for (var i = 0; i < json.nodes.length; i++) {
						if (json.nodes[i].residueNum == json.groups[ya].start) {
							x1 = i * 9;
						} else if (json.nodes[i].residueNum == json.groups[ya].end) {
							x2 = i * 9;
							break;
						}
					}

					var totalsize = x2 - x1;

					if (json.groups[ya].name[2] == "S") {
						return "M0,6.25L" + totalsize / 2 + ",6.25L" + totalsize / 2 + ",0L" + totalsize + ",12.5L" + totalsize / 2 + ",25L" + totalsize / 2 + ",18.75L0,18.75Z";
					} else {
						//new way of drawing helices, added arcs (A10,10 0 0,1)
						return "M0,6.25L" + totalsize + ",6.25 A10,10 0 0,1 " + totalsize + ",18.75L0,18.75 A10,10 0 0,1 0,6.25";
					}
				})
				.style("cursor", "pointer")
				.style("fill", function(d) {
					return fill(ya);
				})
				.on("mouseover", mouseover_group(ya))
				.on("mouseout", tip.hide)
				.on("click", click_group(ya, json.groups[ya].name));
		}
	}
	/////////////////////RECTANGLES
}

///////////////////////////////////////////////////////////////////////

///when we click on one chain or between chains, this should be called so that the page won't be loaded everytime

function loadafterchainsselected() {

	$(".gallery").css("width", "100%");
	$(".gallery").css("height", "450px");
	$(".gallery").css("margin", "0 auto");

	$("#mainligandmatrix").css("display", "none");
	$("#infoboxligand").css("display", "none");

	removeURLpart("ligandmatrixclickedbefore");
	updateURL(viewOptions);

	$('#disease').css('display', 'none');

	viewOptions = getviewOptions();

	var jsonSour;
	var jsonTarg;

	viewOptions.type = 0;

	// viewOptions.displayMode = "pair";

	//BUGFIX: group1 and 2 are reset to 0 for protein initialization , there was a bug but now fixed
	// viewOptions.group1 = 0;
//     viewOptions.group2 = 0;

	removeURLpart('groups');

	updateURL(viewOptions);

	d3.select("#pymolseqs2").select("svg").remove();

	if (viewOptions.chains[0] == viewOptions.chains[1]) {

		$("#matrix_button").css("display", "block");

		$("#fragment-1").css("margin-top", "0px");

		$("#loopDiv").animate({
			"opacity": "1"
		}, "fast");
		$("#selfConnectionsDiv").animate({
			"opacity": "1"
		}, "fast");
		$("#showhide").animate({
			"opacity": "1"
		}, "fast");

		first = viewOptions.chains[0];
		second = viewOptions.chains[0];

		viewOptions.chains = [first, second];

		d3.json(pathname +"/" + pdb_name + "/" + pdb_name + "_" + viewOptions.chains[0] + ".json", function(data) {
			json = data;
			if (!json) {
				redirectHome();
			}

			for (var y=0; y < json.nodes.length; y++) {
				json.nodes[y].variant = []
				json.nodes[y].info = []
			}

			//if there are mutations in the structure
			if(viewOptions.variant!="no"){

				console.log(viewOptions.variant)
				variantchains =  viewOptions.variant.split('-');
				console.log(variantchains)
				for(var o=0; o<variantchains.length-1; o++){

					 if(variantchains[o]==viewOptions.chains[0]){

						$('#disease').css('display', 'inline-block');

						$.ajax({
							dataType: "json",
							url: "../mutationjsons/" + pdb_name + "_variants.json" ,
							async: false,
							success: function(data){

								for(var i=0; i<data.length; i++){

									for(var p=0; p<data[i].CHAINS.length; p++){
										if(variantchains[o]==data[i].CHAINS[p]){

											var disease = data[i].DISEASE;

											if(disease != "-"){

												preString = "PubMed:";
												searchStringComma = ",";
												searchStringP = "}";

												var times = 0, index = null;

												 while (index !== -1) {
													 //times++;

														index = disease.indexOf(preString, index+1);

														if(index!=-1){

															var numberPattern = /\d+/g;

															//'something102asdfkj1948948'.match( numberPattern )
															var pubmedlink = disease.substring(index+7).match( numberPattern )[0];
															var newlink = '<a href="http://www.ncbi.nlm.nih.gov/pubmed/' + pubmedlink + '" target="_blank">'+pubmedlink+'</a>';

															s = index + 7 + pubmedlink.length;
															disease = disease.substring(0, index+7) + newlink + disease.substring(s, disease.length);

															//console.log(f+"\tindex is\t"+index+"\ts is\t"+s+ "\tpubmedlink is\t"+ pubmedlink +"\tpreString is\t"+preString+"\tscomma is\t"+scomma+"\tsparan is\t"+sparan)
															//console.log(disease)

														}
												 }
												 //times--;

												d3.select("#mutation").html(disease);
												break;
											}

										}
									}

								}

								for (var y=0; y < json.nodes.length; y++) {
									 for(var i=0; i<data.length; i++){
										 for(var p=0; p<data[i].CHAINS.length; p++){

												if(variantchains[o]==data[i].CHAINS[p]){
													json.nodes[y].uniprot=data[i].ACC +","+ data[i].ID;

													json.nodes[y].disease=data[i].DISEASE;

													var v=0;
													for(var z=0; z<data[i].VARIANTS.length; z++){
														if(json.nodes[y].residueNum==data[i].VARIANTS[z].residuenumber){
															json.nodes[y].variant.push(data[i].VARIANTS[z].variant);
															json.nodes[y].info.push(data[i].VARIANTS[z].info);
															v++;
														}
													}
													break;
												}
										}
									 }
								}
							}
						});
						break;
					}
				}
			}

			var mut=0;
			for(var i=0;i<json.nodes.length;i++){
	      if(json.nodes[i].uniprot!="" && json.nodes[i].uniprot !=undefined){
	         // alert("Mutations detected");
	         if(mut==0){
	              $('#mutations').show();
	         }
	          mut++;
	          break;
	      }
	    }

			//NEW FUNCTION TO CHECK IF GROUPS IS EMPTY IN JSON, IF IT IS, CHECK IF THIS IS BECAUSE OF RNA CHAIN (U, ..) etc
			if(json.groups.length==0){
				fillgroups();
			}

			checkValidSSonLoad();
			removeDuplicatesLoops();

			var checkNA=0;
			for(var i=0;i<json.groups.length;i++){
				if(json.groups[i].name[2]=="N"){
					checkNA = -1;
					break;
				}
			}
			if(checkNA==-1){
				//addLoopsNucleicAcids();
			}
			else{
				addLastLoop();
			}

			removeHOH();

			var svgStyle = ".background {\
		      fill: none;\
		    }\
		    \
		    line {\
		      stroke: #BDBDBD;\
		    }\
		    \
		    text.active {\
		      fill: red;\
		      font-size: 15;\
		      font-weight: bold;\
		    }";

			addChainName(first, second);

			// Always draw a matrix view, so the user knows it exists
			// Color chord labels appropriately
			// If groups not specified in URL, pick the first two
			// if (!(viewOptions.group1 && viewOptions.group2)) {
//
//                 viewOptions.group1 = 0;
//                 viewOptions.group2 = 0;
//                 updateURL(viewOptions);
//             }

            removeURLpart("group1");
            removeURLpart("group2");
            updateURL(viewOptions);



			///////////////////////

			//FOR ONE CHAIN PYMOL SEQ

			function makeOnClickCallback(fi, f) {
				return function() {
					//alert(f);

					viewOptions.highlighted = [f, f];
					viewOptions.highlightedsplom = [f, f];

					viewOptions.mychain = viewOptions.chains[0];

					var group;
					var check = 0;

					for (var i = 0; i < json.groups.length; i++) {

						if (json.groups[i].start <= f && f <= json.groups[i].end) {
							viewOptions.colors = [parseInt(fill(i).substr(1), 16), parseInt(fill(i).substr(1), 16)];
							viewOptions.group1 = i;
							viewOptions.group2 = i;

							group = viewOptions.group1;

							check = -1;
						}

					}

					if (check == 0) {
						viewOptions.colors = [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)];
						group = -1;
					}

					d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "").style("font-weight", "normal");

					if (viewOptions.tab == "chord") {

						reDrawProtein(viewOptions.highlighted, viewOptions.colors);
					} else if (viewOptions.tab == "network") {

						updateAsteroidPymol(f);
						updateSplomPymol(f, group);
						drawTable(viewOptions.highlightedsplom);
					} else if (viewOptions.tab == "ligand") {

						updateSplomPymol(f, group);
						drawTable(viewOptions.highlightedsplom);
						updateAsteroidPymol(f);

					}

					if(document.getElementById("ligandList").length!=0){

						$("#ligandList").val(json.nodes[fi].name);
					}

					updateURL(viewOptions);

					d3.select("#pymolseqs1").selectAll(".mytxt").filter(function(d, index) {
						if (fi === index) {
							return true;
						}
					}).style("fill", "red").style("font-weight", "bold");

					return false;
				};
			}


			d3.select("#pymolseqs1").select("svg").remove();


			var svgline1 = d3.select("#pymolseqs1").append("svg")
				.attr("width", json.nodes.length * 9)
				.attr("height", 40)
				.append("g")
				.attr("transform", "translate(" + 0 + "," + -10 + ")");

			var tip = d3.tip()
				.attr('class', 'd3-tip')
				.offset([-10, 0])
				.html(function(d) {
					var str = json.groups[d].name;
					if (str.indexOf('HELIX') > -1) {
						var str2 = str.replace("HELIX", "H");
					} else if (str.indexOf('SHEET') > -1) {
						var str2 = str.replace("SHEET", "S");
					} else if (str.indexOf('NucleicAcid') > -1) {
						var str2 = str.replace("NucleicAcid", "NA");
					}
					else{
						var str2 = str;
					}

					var strchain = str[0] + ":";
					str2 = str2.replace(strchain, "");

					return str2;
					//return "<strong>Frequency:</strong> <span style='color:red'>" + json.groups[d.index].name + "</span>";
				})

			svgline1.call(tip);

		//////////////////////////

		//START OF START AND END RESIDUE NUMBERS ON SSLINE

		var numberstext = d3.select("#pymolseqs1").append("svg")
			.attr("width", json.nodes.length * 9)
			.attr("height", 20)
			.style("margin-top", "-25px")
			.append("g")
			.attr("transform", "translate(" + 0 + "," + -10 + ")");
		// .attr("transform", "rotate(-90)");

		var textnum = numberstext.append("text");

		for (var im = 0; im < json.nodes.length; im++) {

			for (var yam = 0; yam < json.groups.length; yam++) {
				if ((json.nodes[im].residueNum == json.groups[yam].start || json.nodes[im].residueNum == json.groups[yam].end) && im == 0) {
					textnum.append("tspan")
						.attr("x",
							function(d) {

								if (json.nodes[im].name[0] == "D" && (json.nodes[im].name[1] == "A" || json.nodes[im].name[1] == "G" || json.nodes[im].name[1] == "C" || json.nodes[im].name[1] == "T" || json.nodes[im].name[1] == "U")) {
									return im * 21;
								} else return im * 9;
							})
						.attr("y", 20)
						.attr("dy", ".32em")
						.attr("class", "mytxtnum")
						// .attr("text-anchor", "end")
						.text(function(d) {
							// var str=json.nodes[im].name;
							//  		 	  	   	  		var strres = str[0];
							//  		 	  	   	  		var str2 = str2.replace(strres,"");
							return json.nodes[im].residueNum;
						})

					.attr("font-size", "10px")
						.attr("font-style", "normal")
						.attr("font-weight", "normal")
						.attr("font-family", "Courier")
						.attr("fill", "black");
					// .style("cursor", "pointer")
				} else if ((json.nodes[im].residueNum == json.groups[yam].start || json.nodes[im].residueNum == json.groups[yam].end) && yam != json.groups.length - 1 && (json.groups[yam].end - json.groups[yam + 1].start >= 5)) {


					//console.log(json.groups[yam].end +"\t"+ json.groups[yam+1].start);

					textnum.append("tspan")
						.attr("x",
							function(d) {

								if (json.nodes[im].name[0] == "D" && (json.nodes[im].name[1] == "A" || json.nodes[im].name[1] == "G" || json.nodes[im].name[1] == "C" || json.nodes[im].name[1] == "T" || json.nodes[im].name[1] == "U")) {
									return im * 21;
								} else return im * 9;
							})
						.attr("y", 20)
						.attr("dy", ".32em")
						.attr("class", "mytxtnum")
						// .attr("text-anchor", "end")
						.text(function(d) {
							// var str=json.nodes[im].name;
							//  		 	  	   	  		var strres = str[0];
							//  		 	  	   	  		var str2 = str2.replace(strres,"");
							return json.nodes[im].residueNum;
						})

					.attr("font-size", "10px")
						.attr("font-style", "normal")
						.attr("font-weight", "normal")
						.attr("font-family", "Courier")
						.attr("fill", "black");
					// .style("cursor", "pointer")

				} else if ((json.nodes[im].residueNum == json.groups[yam].start || json.nodes[im].residueNum == json.groups[yam].end) && (json.groups[yam].end - json.groups[yam].start >= 5)) {

					textnum.append("tspan")
						.attr("x",
							function(d) {

								if (json.nodes[im].name[0] == "D" && (json.nodes[im].name[1] == "A" || json.nodes[im].name[1] == "G" || json.nodes[im].name[1] == "C" || json.nodes[im].name[1] == "T" || json.nodes[im].name[1] == "U")) {
									return im * 21;
								} else return im * 9;
							})
						.attr("y", 20)
						.attr("dy", ".32em")
						.attr("class", "mytxtnum")
						// .attr("text-anchor", "end")
						.text(function(d) {
							// var str=json.nodes[im].name;
							//  		 	  	   	  		var strres = str[0];
							//  		 	  	   	  		var str2 = str2.replace(strres,"");
							return json.nodes[im].residueNum;
						})

					.attr("font-size", "10px")
					.attr("font-style", "normal")
					.attr("font-weight", "normal")
					.attr("font-family", "Courier")
					.attr("fill", "black");
					// .style("cursor", "pointer")

				}
			}

		}

		//END OF START AND END RESIDUE NUMBERS ON SSLINE
		///////////////////////////

		//PYMOL TEXT RESIDUE LETTERS START

			var svgtext2 = d3.select("#pymolseqs1").append("svg")
				.attr("width", json.nodes.length * 9)
				.attr("height", 20)
				//.attr("text-align","left")
				//.attr("class", "mytxt")
				.append("g")
				.attr("transform", "translate(" + 0 + "," + -10 + ")");
			//.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


			// Apply the CSS styling
			d3.select("#pymolseqs1").select("svg").append("style").attr("type", "text/css").text(svgStyle);

			var text = svgtext2.append("text");


			//alert(json.nodes.length);

			var i;
			for (i = 0; i < json.nodes.length; i++) {

				text.append("tspan")
					.attr("x",
						function(d) {

							if (json.nodes[i].name[0] == "D" && (json.nodes[i].name[1] == "A" || json.nodes[i].name[1] == "G" || json.nodes[i].name[1] == "C" || json.nodes[i].name[1] == "T" || json.nodes[i].name[1] == "U")) {
								return i * 21;
							} else return i * 9;
						}
					)
					.attr("y", 20)
					.attr("dy", ".32em")
					.attr("class", "mytxt")
					// .attr("text-anchor", "end")
					.text(function(d) {

						if (json.nodes[i].name[0] == "D" && (json.nodes[i].name[1] == "A" || json.nodes[i].name[1] == "G" || json.nodes[i].name[1] == "C" || json.nodes[i].name[1] == "T" || json.nodes[i].name[1] == "U")) {
							return json.nodes[i].name[0] + json.nodes[i].name[1] + " ";
						} else if (json.groups[0].name[2] == "N" && json.nodes[i].name[0] == "H" && json.nodes[i].name[1] == "O" && json.nodes[i].name[2] == "H") {} else return json.nodes[i].name[0];
					})
				.attr("font-size", "13px")
				.attr("font-style", "normal")
        .attr("text-decoration", function(d){

            if(json.nodes[i].variant != "" && json.nodes[i].variant != undefined){
               return "overline";
            }

            else{
                return "normal";
            }

        })
				.attr("font-family", "Courier")
				.attr("fill",function(d) {
          return "black";
				})
        .style("stroke", function(d){

            if(json.nodes[i].variant != "" && json.nodes[i].variant != undefined){
               return "black";
            }

            else{
                return "";
            }

        })
	     // .attr("font-weight", "normal")
				.style("cursor", "pointer")
				.on("click", makeOnClickCallback(i, json.nodes[i].residueNum))
				.append("title")
	      .text(function(d) {
					if(json.nodes[i].variant != "" && json.nodes[i].variant!= undefined){
								var uniprot = json.nodes[i].uniprot;
								var info = json.nodes[i].info;

								return uniprot+"\n"+info;
						}

	          else{
	              return json.nodes[i].name;
	          }

	          });
			}

			function click_group(fi, f) {
				return function() {

					d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");

					d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
							if (fi === index) {
								return true;
							}
						}).transition().style("stroke", "black").attr("stroke-width", 2)
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					$(".block").css("width", "100%");
					$(".block").css("height", "450px");
					$(".block").css("margin", "0 auto");

					$("#contactmatrix").css("display", "none");
					$("#infobox").css("display", "none");

					if(viewOptions.type==0){
						drawChord(f);
					}
					else{
						drawChordLoops(f);
					}

					d3.select("#ssline").selectAll(".rectcell").filter(function(d) {
							return d.index == fi;
						}).transition().style("stroke", "black").attr("stroke-width", 2)
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					d3.select("#ssline").selectAll(".rectcell").filter(function(d) {
							return d.index != fi;
						}).transition().style("stroke", "")
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					if(viewOptions.type==0){
						viewOptions.colors = [parseInt(fill(fi).substr(1), 16), parseInt(fill(fi).substr(1), 16)];
						viewOptions["group1"] = fi;
						viewOptions["group2"] = fi;
					}

					else{
						for(var a=0;a<json.groupsloops.length;a++){
							if(json.groupsloops[a].name==f){
								viewOptions["group1"] = a;
								viewOptions["group2"] = a;
								break;
							}
						}
					}

					viewOptions.mychain = viewOptions.chains[0];

					removeURLpart("highlighted");
					removeURLpart("colors");

					updateURL(viewOptions);

					reDrawProtein(viewOptions.highlighted, viewOptions.colors);

					if (viewOptions.tab == "network") {
						updateSplomSecondaryStructureLine(fi);
					}

					return false;
				};
			}

			//////////////////////////////////
			function mouseover_group(fi) {
					return function() {

						d3.select("#chordGraph_real").selectAll("path.chord").style("opacity", 1.0);
						d3.select("#chordGraph_real").selectAll("path.chord").filter(function(d) {
							if(viewOptions.type==0){
								return d.source.index != fi && d.target.index != fi;
							}
							else{
								return json.groupsloops[d.source.index].name!=json.groups[fi].name && json.groupsloops[d.target.index].name!=json.groups[fi].name;
							}
							}).transition().style("opacity", 0.1)
							.each("end", partial(addDownloadLink, 'chordGraph_real'));

						tip.show(fi);

						return false;
					};
				}
				/////////////////////RECTANGLES


			// var totalsize = (width-40)/jsonSour.groups.length;

			for (var ya = 0; ya < json.groups.length; ya++) {

				if (json.groups[ya].name.indexOf('NucleicAcid') > -1) {} else {

					svgline1.append("path")
						.attr("class", "rectcell1")
						.attr("transform", function(d) {


							var x = 0;
							var y = 20;


							return "translate(" + x + "," + y + ")";
						})


					.attr("d", function(d) {


							var x1 = 0;
							var x2;
							for (var i = 0; i < json.nodes.length; i++) {

								if (i == json.nodes.length - 1 && json.nodes[i].residueNum >= json.groups[json.groups.length - 1].end) {
									x2 = i * 9;

									//console.log(i +" - "+ json.nodes[i].residueNum);
								}

							}

							var totalsize = x2 - x1;

							return "M0,12.4L" + totalsize + ",12.4L" + totalsize + ",13.6L0,13.6Z";

						})
						.style("cursor", "pointer")
						.style("fill", "black");

				}
			}

			for (var ya = 0; ya < json.groups.length; ya++) {

				if (json.groups[ya].name.indexOf('NucleicAcid') > -1) {} else {

					svgline1.append("path")
						.attr("class", "rectcell")
						.attr("transform", function(d) {


							var x;
							var y;

							for (var i = 0; i < json.nodes.length; i++) {
								if (json.nodes[i].residueNum == json.groups[ya].start) {


									x = i * 9;

									//console.log(" x1 is "+x);

									break;
								}
							}

							y = 20;

							return "translate(" + x + "," + y + ")";
						})


					.attr("d", function(d) {


							var x1;
							var x2;
							for (var i = 0; i < json.nodes.length; i++) {
								if (json.nodes[i].residueNum == json.groups[ya].start) {
									x1 = i * 9;
								} else if (json.nodes[i].residueNum == json.groups[ya].end) {
									x2 = i * 9;
									break;
								}
							}

							var totalsize = x2 - x1;

							if (json.groups[ya].name[2] == "S") {

								return "M0,6.25L" + totalsize / 2 + ",6.25L" + totalsize / 2 + ",0L" + totalsize + ",12.5L" + totalsize / 2 + ",25L" + totalsize / 2 + ",18.75L0,18.75Z";
							} else {

								//return "M0,6.25L" + totalsize + ",6.25L" + totalsize + ",18.75L0,18.75Z";
                                //new way of drawing helices, added arcs (A10,10 0 0,1)
                                return "M0,6.25L" + totalsize + ",6.25 A10,10 0 0,1 " + totalsize + ",18.75L0,18.75 A10,10 0 0,1 0,6.25";
							}
						})
						.style("cursor", "pointer")
						.style("fill", function(d) {
							return fill(ya);
						})
						.on("mouseover", mouseover_group(ya))
						.on("mouseout", tip.hide)
						.on("click", click_group(ya, json.groups[ya].name));

					// .append("title").text( function(d) {
					//
					//  	  	   		var str=json.groups[ya].name;
					//  	  	   		return str + "(" + json.groups[ya].start + "-" + json.groups[ya].end + ")";
					//
					//  	  	  });

				}
			}
			/////////////////////RECTANGLES



			////////////////////////////////////////////

			drawChord("null");
			colorChordNames(viewOptions.group1, viewOptions.group2);

			////////////////////////////////////

			// Display the PDB ID, extracted from the JSON, as a link

			var titleStr = '';
			titleStr += "Protein ID: ";
			titleStr += '<a href="http://www.rcsb.org/pdb/explore/explore.do?structureId=' + json.name + '">' + json.name + '</a>';

			var title = $('#navtext');
			title.html(titleStr);


			// Re-size the protein view before drawing it
			//  d3.select("#glmol01").style("width", width + "px").style("height", height + "px");
			//  d3.select("#proteinview").style("width", width + "px");
			//equaliseDIVs();

			//FOR PYMOL SCRIPT CREATION was here


			var group1 = parseInt(viewOptions.group1);
			var group2 = parseInt(viewOptions.group2);

			//////////////////////

			//ADD NAMES ON PROTEIN VIEW CONTENT LAST COLUMN

			d3.select("#contenttext2").select("svg").remove();
			var svgtext2 = d3.select("#contenttext2").append("svg")
				.attr("width", 500)
				.attr("height", 30)
				.append("g");
			// .style("display","block")//to place svg centered
			//  	.style("margin","auto");//to place svg centered
			//
			// Apply the CSS styling
			//d3.select("#contenttext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

			var text = svgtext2.append("text");

			// text.append("tspan")
//                 .attr("x", 340)
//                 .attr("y", 20)
//                 .attr("dy", ".32em")
//                 .attr("text-anchor", "end")
//                 .text(json.name + " > ")
//                 .style("font-weight", "bold")
//                 .attr("fill", "black");
//
//
//             text.append("tspan")
//                 .attr("dy", ".02em")
//                 .attr("text-anchor", "end")
//                 .text(json.groups[group1].name)
//                 .style("font-weight", "bold")
//                 .attr("fill", fill(viewOptions.group1));
//
//             text.append("tspan")
//                 .attr("dy", ".02em")
//                 .attr("text-anchor", "end")
//                 .text(" - ")
//                 .style("font-weight", "bold")
//                 .attr("fill", "black");
//
//             text.append("tspan")
//                 .attr("dy", ".02em")
//                 .attr("text-anchor", "end")
//                 .text(json.groups[group2].name)
//                 .style("font-weight", "bold")
//                 .attr("fill", fill(viewOptions.group2));


			////////////////////////////

			// Draw the protein; if specified in url, highlight appropriate residues
			// if (viewOptions.highlighted) {
			//              initializeProteinView(viewOptions.highlighted, viewOptions.colors, 0);
			//          } else {
			//              initializeProteinView([], [], 0);
			//          }

			removeURLpart("highlighted");
			removeURLpart("colors");
			viewOptions.resetview = 1;
			updateURL(viewOptions);

			initializeProteinView([], [], 0);

			//////////////////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////////////////

			///////////////////// THE LOADING OF ASTEROID PLOT AFTER CHAIN SELECTED:

			/////////////////////
			ligandarray = [];

			var ligandlist = document.getElementById("ligandList");

			if (ligandlist.options.length > 0) {
				removeOptions(ligandlist);
			}

			var check = 0;

			for (var i = 0; i < json.nodes.length; i++) {

				if (json.nodes[i].type == "HETAT" && json.nodes[i].name.substring(0, 3) != "HOH") {
					var x = document.getElementById("ligandList");
					var option = document.createElement("option");
					option.text = json.nodes[i].name;
					x.add(option);
					ligandarray.push(json.nodes[i].name);

					if (check == 0) {
						//if (!viewOptions.center) {
						viewOptions.center = json.nodes[i].residueNum;
						//}

					}

					check++;
				}
			}


			$("#ligandList option").each(function() {

				// if ($(this).text() == viewOptions.pdb[a]) {

				$('#ligandList').prop("selected", true);

			});

			if (check == 0) {
				$("#ligandid").animate({
					"opacity": "0"
				}, "fast");
				viewOptions.center = json.nodes[0].residueNum;
			}

			/////////////////////

			var svgStyle = ".background {\
 	      fill: none;\
 	    }\
 	    \
 	    line {\
 	      stroke: #BDBDBD;\
 	    }\
 	    \
 	    text.active {\
 	      fill: red;\
 	      font-size: 15;\
 	      font-weight: bold;\
 	    }";

			// Fill the central residue input box from the URL or, failing that, with the first residue listed in JSON
			// if (!viewOptions.center) {viewOptions.center = json.nodes[0].residueNum; }

			document.getElementById("center").value = viewOptions.center;
			document.getElementById("centerchain").value = viewOptions.chains[0];

			drawAsteroidGraph();
			drawMatrixLigand();

			if (viewOptions.tab == "ligand") {
				asteroidColorProtein();
			}

			if ($("#proteinview").height() > $("#graphview").height()) {
				d3.select("#graphview").style("height", $("#proteinview").height() + "px");
			} else {
				d3.select("#proteinview").style("height", $("#graphview").height() + "px");
			}

			ligandtable();

			/////////////////////// LOADING OF ASTEROID PLOT

		});

	}

	//if between chains
	else {
		$("#matrix_button").css("display", "none");

		checkValidSSonLoadBetweenChains();

		$("#fragment-1").css("margin-top", "-70px");

		d3.select("#pymolseqs1").select("svg").remove();
		d3.select("#pymolseqs2").select("svg").remove();

		array_for_pymolseq_name_first = [];
		array_for_pymolseq_name_second = [];
		array_for_pymolseq_start_first = [];
		array_for_pymolseq_start_second = [];

		array_for_pymolseq_color = [];
		array_for_pymolseq_name = [];
		array_for_pymolseq_start = [];

		suffix_pdb = viewOptions.pdb;

		first = viewOptions.chains[0];
		second = viewOptions.chains[1];

		addChainName(first, second);

		viewOptions.chains = [first, second];

		if (viewOptions.tab == "chord") {

			//viewOptions.mychain = "both";
		} else if (viewOptions.tab == "ligand") {
			viewOptions.mychain = viewOptions.chains[0];
		}

		$("#loopDiv").animate({
			"opacity": "0"
		}, "fast");
		$("#selfConnectionsDiv").animate({
			"opacity": "0"
		}, "fast");
		$("#showhide").animate({
			"opacity": "0"
		}, "fast");

		//MAKE SURE TO resetview BEFORE INITIALIZING THE VIEW
		removeURLpart("highlighted");
		removeURLpart("colors");
		viewOptions.resetview = 1;
		updateURL(viewOptions);
		initializeProteinView([], [], 0);

		updateJSON(first, second);

		//THis ajax is done to fill in the array with inerchain json ss information, to be used to only color the ss which are interacting on the right hand panel ssline

		$.ajax({
			dataType: "json",
			url: pathname +"/" + pdb_name + "/" + pdb_name + "_" + first + "-" + second + ".json",
			async: false,
			success: function(data) {

				var jsonpymolseq = data;

				c_for_pymolseq = 0;
				c_for_pymolseq1 = 0;
				c_for_pymolseq2 = 0;

				var check = 0;
				//var c=0;

				for (var y = 0; y < jsonpymolseq.groups.length; y++) {

					check = 0;

					for (var i = 0; i < jsonpymolseq.nodes.length; i++) {

						if (jsonpymolseq.groups[y].start <= jsonpymolseq.nodes[i].residueNum && jsonpymolseq.nodes[i].residueNum <= jsonpymolseq.groups[y].end && check == 0 && jsonpymolseq.nodes[i].chain == jsonpymolseq.groups[y].name[0]) {

							if (jsonpymolseq.nodes[i].chain == first) {
								array_for_pymolseq_name_first[c_for_pymolseq1] = jsonpymolseq.groups[y].name;
								array_for_pymolseq_start_first[c_for_pymolseq1] = jsonpymolseq.groups[y].start;
								c_for_pymolseq1++;
							} else {
								array_for_pymolseq_name_second[c_for_pymolseq2] = jsonpymolseq.groups[y].name;
								array_for_pymolseq_start_second[c_for_pymolseq2] = jsonpymolseq.groups[y].start;
								c_for_pymolseq2++;
							}

							array_for_pymolseq_color[c_for_pymolseq] = fill(c_for_pymolseq);
							//console.log(array_for_pymolseq_name[c_for_pymolseq] +" aa "+ array_for_pymolseq_color[c_for_pymolseq]);

							check = -1;

							c_for_pymolseq++;
						}
					}

				}

				var am = 0;
				for (var i = 0; i < c_for_pymolseq1; i++) {
					array_for_pymolseq_name[am] = array_for_pymolseq_name_first[i];
					array_for_pymolseq_start[am] = array_for_pymolseq_start_first[i];
					am++;
				}
				for (var i = 0; i < c_for_pymolseq2; i++) {
					array_for_pymolseq_name[am] = array_for_pymolseq_name_second[i];
					array_for_pymolseq_start[am] = array_for_pymolseq_start_second[i];
					am++;
				}

			}

		});

		//alert("first "+document.location.href);

		drawChainMatrix(first, second);

		//alert("last "+document.location.href);
	}

}

// resize DIVs so same height:
function equaliseDIVs() {
		var newHeight = Math.max($("#proteinview").height(), $("#chord").height(), $("#matrixContainer").height());
		d3.select("#chord").style("height", newHeight + "px");
		// d3.select("#matrixContainer").style("height", newHeight + "px");
		d3.select("#proteinview").style("height", newHeight + "px");
	}
	///////////////////////////

function drawChainMatrix(chain1, chain2) {

	jsonResNumsS = [];
	jsonNamesS = [];

	jsonResNumsT = [];
	jsonNamesT = [];

	var svgStyle = ".background {\
      fill: none;\
    }\
    \
    line {\
      stroke: #BDBDBD;\
    }\
    \
    text.active {\
      fill: red;\
      font-size: 15;\
      font-weight: bold;\
    }";

	//BUGFIX: commented out this part because it caused an error but come back later if needed
	//	viewOptions.displayMode=document.getElementById('displayMode').value;

	var b = viewOptions.pdb.indexOf("_");

	pdb_name = viewOptions.pdb.slice(0, b);

	var pdb;

	if (chain1 == chain2) {

		pdb = pdb_name.concat("_");
		pdb = pdb.concat(chain1);

	} else {

		pdb = pdb_name.concat("_");
		pdb = pdb.concat(chain1);
		pdb = pdb.concat("-");
		pdb = pdb.concat(chain2);

	}

	switchProtein(pdb, [], []);

	var sfile = chain1;
	var tfile = chain2;


	//alert(sfile+"\t"+tfile);

	d3.json(pathname +"/" + pdb_name + "/" + pdb_name + "_" + sfile + ".json", function(data) {

		// alert("baban");

		jsonSour = data;

		for (var y=0; y < jsonSour.nodes.length; y++) {
			jsonSour.nodes[y].variant = []
			jsonSour.nodes[y].info = []
		}

		//if there are mutations in the structure
		if(viewOptions.variant!="no"){

			console.log(viewOptions.variant)
			variantchains =  viewOptions.variant.split('-');
			console.log(variantchains)
			for(var o=0; o<variantchains.length-1; o++){

				 if(variantchains[o]==sfile){

					$('#disease').css('display', 'inline-block');

					$.ajax({
						dataType: "json",
						url: "../mutationjsons/" + pdb_name + "_variants.json" ,
						async: false,
						success: function(data){

							for(var i=0; i<data.length; i++){

								for(var p=0; p<data[i].CHAINS.length; p++){
									if(variantchains[o]==data[i].CHAINS[p]){

										var disease = data[i].DISEASE;

										if(disease != "-"){

											preString = "PubMed:";
											searchStringComma = ",";
											searchStringP = "}";

											var times = 0, index = null;

											 while (index !== -1) {
												 //times++;

													index = disease.indexOf(preString, index+1);

													if(index!=-1){

														var numberPattern = /\d+/g;

														//'something102asdfkj1948948'.match( numberPattern )
														var pubmedlink = disease.substring(index+7).match( numberPattern )[0];
														var newlink = '<a href="http://www.ncbi.nlm.nih.gov/pubmed/' + pubmedlink + '" target="_blank">'+pubmedlink+'</a>';

														s = index + 7 + pubmedlink.length;
														disease = disease.substring(0, index+7) + newlink + disease.substring(s, disease.length);

														//console.log(f+"\tindex is\t"+index+"\ts is\t"+s+ "\tpubmedlink is\t"+ pubmedlink +"\tpreString is\t"+preString+"\tscomma is\t"+scomma+"\tsparan is\t"+sparan)
														//console.log(disease)

													}
											 }
											 //times--;

											d3.select("#mutation").html(disease);
											break;
										}

									}
								}

							}

							for (var y=0; y < jsonSour.nodes.length; y++) {
								 for(var i=0; i<data.length; i++){
									 for(var p=0; p<data[i].CHAINS.length; p++){

											if(variantchains[o]==data[i].CHAINS[p]){
												jsonSour.nodes[y].uniprot=data[i].ACC +","+ data[i].ID;

												jsonSour.nodes[y].disease=data[i].DISEASE;

												var v = 0;
												for(var z=0; z<data[i].VARIANTS.length; z++){
													if(jsonSour.nodes[y].residueNum==data[i].VARIANTS[z].residuenumber){
														jsonSour.nodes[y].variant.push(data[i].VARIANTS[z].variant);
														jsonSour.nodes[y].info.push(data[i].VARIANTS[z].info);
														v++;
													}
												}
												break;
											}
									}
								 }
							}
						}
					});
					break;
				}
			}
		}

		var mut=0;
		for(var i=0;i<jsonSour.nodes.length;i++){
      if(jsonSour.nodes[i].uniprot!="" && jsonSour.nodes[i].uniprot !=undefined){
         // alert("Mutations detected");
         if(mut==0){
              $('#mutations').show();
         }
          mut++;
          break;
      }
    }


		//NEW FUNCTION TO CHECK IF GROUPS IS EMPTY IN JSON, IF IT IS, CHECK IF THIS IS BECAUSE OF RNA CHAIN (U, ..) etc
		if(jsonSour.groups.length==0){
			fillgroups();
		}


		removeHOHSource();

		var svgline1 = d3.select("#pymolseqs1").append("svg")
			.attr("width", (jsonSour.nodes.length * 9) + 20)
			.attr("height", 30).append("g")
			.attr("transform", "translate(" + 0 + "," + -20 + ")");

		var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d) {
				var str = jsonSour.groups[d].name;
				if (str.indexOf('HELIX') > -1) {
					var str2 = str.replace("HELIX", "H");
				} else if (str.indexOf('SHEET') > -1) {
					var str2 = str.replace("SHEET", "S");
				} else if (str.indexOf('NucleicAcid') > -1) {
					var str2 = str.replace("NucleicAcid", "NA");
				}
				else{
					var str2 = str;
				}

				var strchain = str[0] + ":";
				str2 = str2.replace(strchain, "");
				str2 = str2 + "(" + jsonSour.groups[d].start +"-"+ jsonSour.groups[d].end+")";

				return str2;
				//return "<strong>Frequency:</strong> <span style='color:red'>" + json.groups[d.index].name + "</span>";
			})

		svgline1.call(tip);

		var svgtest1 = d3.select("#pymolseqs1").append("svg")
			.attr("width", (jsonSour.nodes.length * 9) + 20)
			.attr("height", 20);

		svgtest1.append("text").append("tspan")
			.attr("x", 0)
			.attr("y", 10)
			//.attr("dy", ".32em")
			//.attr("text-anchor", "end")
			.text(viewOptions.chains[0] + ":")
			.style("font-weight", "bold")
			.style("font-size", "14px")
			.attr("fill", "black");

		var svgtext2 = svgtest1.append("g")
			.attr("transform", "translate(" + 0 + "," + -15 + ")");
		//.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// Apply the CSS styling
		d3.select("#pymolseqs1").select("svg").append("style").attr("type", "text/css").text(svgStyle);

		var text = svgtext2.append("text");

		function makeOnClickCallback(fi, f) {
			return function() {
				//alert(f);

				viewOptions.highlighted = [f, f];
				viewOptions.highlightedsplom = [f, f];

				viewOptions.mychain = viewOptions.chains[0];
				var group;
				var check = 0;

				for (var py=0; py < json.groupsloops.length; py++) {
					for (var i = 0; i < jsonSour.groups.length; i++) {
						if (json.groupsloops[py].name == jsonSour.groups[i].name && jsonSour.groups[i].start <= f && f <= jsonSour.groups[i].end) {
							viewOptions.colors = [parseInt(fill(i).substr(1), 16), parseInt(fill(i).substr(1), 16)];
							viewOptions.group1 = py;
							viewOptions.group2 = py;

							group = viewOptions.group1;

							check = -1;
						}

					}
				}
				if (check == 0) {
					viewOptions.colors = [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]

					group = -1;
				}

				d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "").style("font-weight", "normal");

				if (viewOptions.tab == "chord") {

					reDrawProtein(viewOptions.highlighted, viewOptions.colors);

				} else if (viewOptions.tab == "network") {

					updateAsteroidPymol(f);
					updateSplomPymol(f, group);
					drawTable(viewOptions.highlightedsplom);
				} else if (viewOptions.tab == "ligand") {

					updateSplomPymol(f, group);
					drawTable(viewOptions.highlightedsplom);
					updateAsteroidPymol(f);

				}

				if(document.getElementById("ligandList").length!=0){
					var name1=jsonSour.nodes[fi].chain+":"+jsonSour.nodes[fi].name;
					$("#ligandList").val(name1);
				}

				updateURL(viewOptions);
				d3.select("#pymolseqs1").selectAll(".mytxt").filter(function(d, index) {
					if (fi === index) {
						return true;
					}
				}).style("fill", "red").style("font-weight", "bold");

				return false;
			};
		}

		function click_group(fi, f) {
				return function() {

          //console.log(fi + "\t" + f)

					d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
					d3.select("#pymolseqs2").selectAll(".rectcell2").style("stroke", "");

					d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
							if (fi === index) {
								return true;
							}
						}).transition().style("stroke", "black").attr("stroke-width", 2)
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					d3.select("#ssline").selectAll(".rectcell").filter(function(d, index) {
							return index == fi;
						}).transition().style("stroke", "black").attr("stroke-width", 2)
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					d3.select("#ssline").selectAll(".rectcell").filter(function(d, index) {
							return index != fi;
						}).transition().style("stroke", "")
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					d3.select("#ssline").selectAll(".rectcell2").style("stroke", "");

					var py = 0;
					var check = 0;

					while (py < json.groupsloops.length) {

						if (json.groupsloops[py].name == jsonSour.groups[fi].name) {

							viewOptions["group1"] = py;
							viewOptions["group2"] = py;

							check = -1;
						}

						py++;
					}

					if (check == -1) {
						check = 0;
					} else {
						viewOptions.resetview = 1;
						updateURL(viewOptions);

						reDrawProtein([], [], 0);

					}

					$(".block").css("width", "100%");
					$(".block").css("height", "450px");
					$(".block").css("margin", "0 auto");

					$("#contactmatrix").css("display", "none");
					$("#infobox").css("display", "none");

					//drawChordfromPymol(f);
					viewOptions.mychain = viewOptions.chains[0];

					removeURLpart("highlighted");
					removeURLpart("colors");


					viewOptions.colorindex1 = fi;
					viewOptions.colorindex2 = fi;

					updateURL(viewOptions);

					reDrawProtein([], []);

					if (viewOptions.tab == "network") {
						updateSplomSecondaryStructureLineBetweenChains(fi,0);
					}
					return false;
				};
			}
			//////////////////////////////////
		function mouseover_group(fi) {
			return function() {

				d3.select("#chordGraph_real").selectAll("path.chord").style("opacity", 1.0);
				d3.select("#chordGraph_real").selectAll("path.chord").filter(function(d) {

					return json.groupsloops[d.source.index].name!=jsonSour.groups[fi].name && json.groupsloops[d.target.index].name!=jsonSour.groups[fi].name;

						//return d.source.index != fi && d.target.index != fi;
					}).transition().style("opacity", 0.1)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				tip.show(fi);

				return false;
			};
		}

		/////////////////////RECTANGLES

		for (var ya = 0; ya < jsonSour.groups.length; ya++) {

			if (jsonSour.groups[ya].name.indexOf('NucleicAcid') > -1) {} else {

				svgline1.append("path")
					.attr("class", "rectcell1")
					.attr("transform", function(d) {

						var x = 0;
						var y = 20;

						return "translate(" + x + "," + y + ")";
					})
					.attr("d", function(d) {
						var x1 = 0;
						var x2;
						for (var i = 0; i < jsonSour.nodes.length; i++) {

							if (i == jsonSour.nodes.length - 1 && jsonSour.nodes[i].residueNum >= jsonSour.groups[jsonSour.groups.length - 1].end) {

								if (i > 0 && tfile != sfile) {
									x2 = (i * 9) + 15;
									//console.log(i +" - "+ jsonSour.nodes[i].residueNum);
								} else {
									x2 = i * 9;
									//console.log(i +" - "+ jsonSour.nodes[i].residueNum);
								}
							}
						}
						var totalsize = x2 - x1;

						return "M0,12.4L" + totalsize + ",12.4L" + totalsize + ",13.6L0,13.6Z";

					})
					.style("cursor", "pointer")
					.style("fill", "black");

			}
		}

		for (var ya = 0; ya < jsonSour.groups.length; ya++) {

			if (jsonSour.groups[ya].name.indexOf('NucleicAcid') > -1) {} else {

				svgline1.append("path")
					.attr("class", "rectcell")
					.attr("transform", function(d) {


						var x;
						var y;

						for (var i = 0; i < jsonSour.nodes.length; i++) {
							if (jsonSour.nodes[i].residueNum == jsonSour.groups[ya].start) {

								if (i > 0 && tfile != sfile) {
									x = (i * 9) + 15;
								} else {
									x = i * 9;
								}


								break;
							}
						}

						y = 20;

						return "translate(" + x + "," + y + ")";
					})


				.attr("d", function(d) {


						var x1;
						var x2;
						for (var i = 0; i < jsonSour.nodes.length; i++) {
							if (jsonSour.nodes[i].residueNum == jsonSour.groups[ya].start) {
								//x1=i*9;
								if (i > 0 && tfile != sfile) {
									x1 = (i * 9) + 15;
								} else {
									x1 = i * 9;
								}

							} else if (jsonSour.nodes[i].residueNum == jsonSour.groups[ya].end) {
								//x2=i*9;
								if (i > 0 && tfile != sfile) {
									x2 = (i * 9) + 15;
								} else {
									x2 = i * 9;
								}

								break;
							}
						}

						var totalsize = x2 - x1;

						if (jsonSour.groups[ya].name[2] == "S") {
							return "M0,6.25L" + totalsize / 2 + ",6.25L" + totalsize / 2 + ",0L" + totalsize + ",12.5L" + totalsize / 2 + ",25L" + totalsize / 2 + ",18.75L0,18.75Z";
						} else {
							//return "M0,6.25L" + totalsize + ",6.25L" + totalsize + ",18.75L0,18.75Z";
                            //new way of drawing helices, added arcs (A10,10 0 0,1)
                            return "M0,6.25L" + totalsize + ",6.25 A10,10 0 0,1 " + totalsize + ",18.75L0,18.75 A10,10 0 0,1 0,6.25";
						}
					})
					//.style("cursor", "pointer")
					.style("cursor", function(d) {

						var pyindex = 0;

						while (pyindex < c_for_pymolseq) {

							if (array_for_pymolseq_name[pyindex] == jsonSour.groups[ya].name) {
								result = "pointer";
								break;

							} else {
								result = null;
							}

							pyindex++;
						}

						return result;

					})
					.style("opacity", function(d, i) {

						var opa;
						var pyindex = 0;

						while (pyindex < c_for_pymolseq) {

							if (array_for_pymolseq_name[pyindex] == jsonSour.groups[ya].name) {
								//color =  array_for_pymolseq_color[pyindex];
								opa = 1;
								break;

							} else {
								opa = 0.2;
							}
							//alert(array_for_pymolseq_name[i] +" aa "+ array_for_pymolseq_color[i]);
							pyindex++;
						}

						return opa;
					})
					.style("fill", function(d) {

						// var color;
						//
						// 				if(tfile != sfile){
						//
						// 					var pyindex=0;
						//
						// 					while(pyindex<c_for_pymolseq){
						//
						// 						if (array_for_pymolseq_name[pyindex]==jsonSour.groups[ya].name) {
						// 							color =  array_for_pymolseq_color[pyindex];
						//
						// 							//console.log(jsonSour.groups[ya].name +" bb "+ array_for_pymolseq_name[pyindex] +" aa "+ array_for_pymolseq_color[pyindex] +" cc "+ color);
						// 							break;
						//
						// 						}
						// 						else{
						// 							color =  "grey";
						// 						}
						// 						//alert(array_for_pymolseq_name[i] +" aa "+ array_for_pymolseq_color[i]);
						// 						pyindex++;
						// 					}
						// 					//return fill(ya);
						//
						// 					return color;
						// 				}
						//
						// 				else{
						return fill(ya);
						//}

					})
					.on("mouseover", mouseover_group(ya))
					.on("mouseout", tip.hide)
					.on("click", click_group(ya, jsonSour.groups[ya].name));
				// .append("title").text( function(d) {
				//
				// 		  	   		var str=jsonSour.groups[ya].name;
				// 		  	   		return str + "(" + jsonSour.groups[ya].start + "-" + jsonSour.groups[ya].end + ")";
				//
				// 		  	       });

			}

		}
		/////////////////////RECTANGLES

		////////////////////////////////////////////////////////////

		for (var i = 0; i < jsonSour.nodes.length; i++) {

			jsonResNumsS[i] = jsonSour.nodes[i].residueNum;
			jsonNamesS[i] = jsonSour.nodes[i].name;

			text.append("tspan")
				.attr("x",
					function(d) {

						if (i == 0 && jsonSour.nodes[i].name[0] == "D" && (jsonSour.nodes[i].name[1] == "A" || jsonSour.nodes[i].name[1] == "G" || jsonSour.nodes[i].name[1] == "C" || jsonSour.nodes[i].name[1] == "T" || jsonSour.nodes[i].name[1] == "U")) {
							return i * 21;
						} else if (i > 0 && jsonSour.nodes[i].name[0] == "D" && (jsonSour.nodes[i].name[1] == "A" || jsonSour.nodes[i].name[1] == "G" || jsonSour.nodes[i].name[1] == "C" || jsonSour.nodes[i].name[1] == "T" || jsonSour.nodes[i].name[1] == "U")) {
							return (i * 21) + 15;
						} else if (i > 0 && tfile != sfile) {
							return (i * 9) + 15;
						} else {
							return i * 9;
						}
					}
				)
				.attr("y", 20)
				.attr("dy", ".32em")
				.attr("class", "mytxt")
				// .attr("text-anchor", "end")
				.text(function(d) {

					if (jsonSour.nodes[i].name[0] == "D" && (jsonSour.nodes[i].name[1] == "A" || jsonSour.nodes[i].name[1] == "G" || jsonSour.nodes[i].name[1] == "C" || jsonSour.nodes[i].name[1] == "T" || jsonSour.nodes[i].name[1] == "U")) {

						if (tfile != sfile) {
							if (i == 0) {
								//return sfile+":"+jsonSour.nodes[i].name[0]+jsonSour.nodes[i].name[1]+" ";
								return ".." + jsonSour.nodes[i].name[0] + jsonSour.nodes[i].name[1] + " ";
							} else {
								return jsonSour.nodes[i].name[0] + jsonSour.nodes[i].name[1] + " ";
							}
						} else {
							return jsonSour.nodes[i].name[0] + jsonSour.nodes[i].name[1] + " ";
						}
					} else if (jsonSour.groups[0].name[2] == "N" && jsonSour.nodes[i].name[0] == "H" && jsonSour.nodes[i].name[1] == "O" && jsonSour.nodes[i].name[2] == "H") {} else {
						if (tfile != sfile) {
							if (i == 0) {
								return ".." + jsonSour.nodes[i].name[0];
							} else {
								return jsonSour.nodes[i].name[0];
							}
						} else {
							return jsonSour.nodes[i].name[0];
						}
					}
				})

        .attr("font-size", "13px")
				.attr("font-style", "normal")
        .attr("text-decoration", function(d){
					if(jsonSour.nodes[i].variant != "" && jsonSour.nodes[i].variant!= undefined){
                 return "overline";
              }

              else{
                  return "normal";
              }

          })
				.attr("font-family", "Courier")

				.attr("fill",function(d) {
                        return "black";
				})
        .style("stroke", function(d){

            if(jsonSour.nodes[i].variant != "" && jsonSour.nodes[i].variant!= undefined){
               return "black";
            }

            else{
                return "";
            }

        })
        //.attr("font-weight", "normal")
				.style("cursor", "pointer")
				.on("click", makeOnClickCallback(i, jsonSour.nodes[i].residueNum))
				.append("title")
        .text(function(d) {
					if(jsonSour.nodes[i].variant != "" && jsonSour.nodes[i].variant!= undefined){
								var uniprot = jsonSour.nodes[i].uniprot;
								var info = jsonSour.nodes[i].info;

								return uniprot+"\n"+info;
						}
            else{
                return jsonSour.nodes[i].name;
            }

        });

		}


		//FOR PYMOL SCRIPT CREATION


	});

	if (tfile != sfile) {


		d3.json(pathname +"/" + pdb_name + "/" + pdb_name + "_" + tfile + ".json", function(data) {

			jsonTarg = data;

			for (var y=0; y < jsonTarg.nodes.length; y++) {
				jsonTarg.nodes[y].variant = []
				jsonTarg.nodes[y].info = []
			}

			//if there are mutations in the structure
			if(viewOptions.variant!="no"){

				console.log(viewOptions.variant)
				variantchains =  viewOptions.variant.split('-');
				console.log(variantchains)
				for(var o=0; o<variantchains.length-1; o++){

					 if(variantchains[o]==tfile){

						$('#disease').css('display', 'inline-block');

						$.ajax({
							dataType: "json",
							url: "../mutationjsons/" + pdb_name + "_variants.json" ,
							async: false,
							success: function(data){

								for(var i=0; i<data.length; i++){

									for(var p=0; p<data[i].CHAINS.length; p++){
										if(variantchains[o]==data[i].CHAINS[p]){

											var disease = data[i].DISEASE;

											if(disease != "-"){

												preString = "PubMed:";
												searchStringComma = ",";
												searchStringP = "}";

												var times = 0, index = null;

												 while (index !== -1) {
													 //times++;

														index = disease.indexOf(preString, index+1);

														if(index!=-1){

															var numberPattern = /\d+/g;

															//'something102asdfkj1948948'.match( numberPattern )
															var pubmedlink = disease.substring(index+7).match( numberPattern )[0];
															var newlink = '<a href="http://www.ncbi.nlm.nih.gov/pubmed/' + pubmedlink + '" target="_blank">'+pubmedlink+'</a>';

															s = index + 7 + pubmedlink.length;
															disease = disease.substring(0, index+7) + newlink + disease.substring(s, disease.length);

															//console.log(f+"\tindex is\t"+index+"\ts is\t"+s+ "\tpubmedlink is\t"+ pubmedlink +"\tpreString is\t"+preString+"\tscomma is\t"+scomma+"\tsparan is\t"+sparan)
															//console.log(disease)

														}
												 }
												 //times--;

												d3.select("#mutation").html(disease);
												break;
											}

										}
									}

								}

								for (var y=0; y < jsonTarg.nodes.length; y++) {
									 for(var i=0; i<data.length; i++){
										 for(var p=0; p<data[i].CHAINS.length; p++){

												if(variantchains[o]==data[i].CHAINS[p]){
													jsonTarg.nodes[y].uniprot=data[i].ACC +","+ data[i].ID;

													jsonTarg.nodes[y].disease=data[i].DISEASE;

													var v = 0;
													for(var z=0; z<data[i].VARIANTS.length; z++){
														if(jsonTarg.nodes[y].residueNum==data[i].VARIANTS[z].residuenumber){
															jsonTarg.nodes[y].variant.push(data[i].VARIANTS[z].variant);
															jsonTarg.nodes[y].info.push(data[i].VARIANTS[z].info);
															v++;
														}
													}
													break;
												}
										}
									 }
								}
							}
						});
						break;
					}
				}
			}

        var mut=0;
    		for(var i=0;i<jsonTarg.nodes.length;i++){
	        if(jsonTarg.nodes[i].uniprot!="" && jsonTarg.nodes[i].uniprot !=undefined){
	           // alert("Mutations detected");
	           if(mut==0){
	                $('#mutations').show();
	           }
	            mut++;
	            break;
	        }
        }


			//NEW FUNCTION TO CHECK IF GROUPS IS EMPTY IN JSON, IF IT IS, CHECK IF THIS IS BECAUSE OF RNA CHAIN (U, ..) etc
			if(jsonTarg.groups.length==0){
				fillgroups();
			}

			removeHOHTarget();

			var svgline2 = d3.select("#pymolseqs2").append("svg")
				.attr("width", (jsonTarg.nodes.length * 9) + 20)
				.attr("height", 30).append("g")
				.attr("transform", "translate(" + 0 + "," + -20 + ")");

			var tip = d3.tip()
				.attr('class', 'd3-tip')
				.offset([-10, 0])
				.html(function(d) {
					var str = jsonTarg.groups[d].name;
					if (str.indexOf('HELIX') > -1) {
						var str2 = str.replace("HELIX", "H");
					} else if (str.indexOf('SHEET') > -1) {
						var str2 = str.replace("SHEET", "S");
					} else if (str.indexOf('NucleicAcid') > -1) {
						var str2 = str.replace("NucleicAcid", "NA");
					}
					else{
						var str2 = str;
					}

					var strchain = str[0] + ":";
					str2 = str2.replace(strchain, "");
					str2 = str2 + "(" + jsonTarg.groups[d].start +"-"+ jsonTarg.groups[d].end+")";

					return str2;
					//return "<strong>Frequency:</strong> <span style='color:red'>" + json.groups[d.index].name + "</span>";
				})

			svgline2.call(tip);

			var svgtest2 = d3.select("#pymolseqs2").append("svg")
				.attr("width", (jsonTarg.nodes.length * 9) + 20)
				.attr("height", 20);

			svgtest2.append("text").append("tspan")
				.attr("x", 0)
				.attr("y", 10)
				//.attr("dy", ".32em")
				//.attr("text-anchor", "end")
				.text(viewOptions.chains[1] + ":")
				.style("font-weight", "bold")
				.style("font-size", "14px")
				.attr("fill", "black");

			var svgtext3 = svgtest2.append("g")
				.attr("transform", "translate(" + 0 + "," + -15 + ")");

			var textchain2 = svgtext3.append("text");

			function makeOnClickCallback(fi, f) {
				return function() {
					//alert(f);

					viewOptions.highlighted = [f, f];
					viewOptions.highlightedsplom = [f, f];

					viewOptions.mychain = viewOptions.chains[1];

					var group;
					var check = 0;

					for (var py=0; py < json.groupsloops.length; py++) {
						for (var i = 0; i < jsonTarg.groups.length; i++) {
							if (json.groupsloops[py].name == jsonTarg.groups[i].name && jsonTarg.groups[i].start <= f && f <= jsonTarg.groups[i].end) {
								viewOptions.colors = [parseInt(fill_chains(0).substr(1), 16), parseInt(fill(i).substr(1), 16)];
								viewOptions.group1 = py;
								viewOptions.group2 = py;

								group = viewOptions.group1;
								check = -1;
							}
						}
					}

					if (check == 0) {
						viewOptions.colors = [parseInt(fill_chains(0).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)];
						group = -1;
					} else {
						check = 0;
					}

					d3.select("#pymolseqs2").selectAll(".mytxt2").style("fill", "").style("font-weight", "normal");

					if (viewOptions.tab == "chord") {

						reDrawProtein(viewOptions.highlighted, viewOptions.colors);
					} else if (viewOptions.tab == "network") {

						updateAsteroidPymol(f);
						updateSplomPymol(f, group);
						drawTable(viewOptions.highlightedsplom);
					} else if (viewOptions.tab == "ligand") {

						updateSplomPymol(f, group);
						drawTable(viewOptions.highlightedsplom);
						updateAsteroidPymol(f);

					}

					if(document.getElementById("ligandList").length!=0){

						var name2=jsonTarg.nodes[fi].chain+":"+jsonTarg.nodes[fi].name;
						$("#ligandList").val(name2);
					}

					updateURL(viewOptions);
					d3.select("#pymolseqs2").selectAll(".mytxt2").filter(function(d, index) {
						if (fi === index) {
							return true;
						}
					}).style("fill", "red").style("font-weight", "bold");

					return false;
				};
			}

			function click_group(fi, f) {
				return function() {

                    console.log(fi +"\t"+ f)
					d3.select("#pymolseqs2").selectAll(".rectcell2").style("stroke", "");
					d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");

					d3.select("#pymolseqs2").selectAll(".rectcell2").filter(function(d, index) {
							if (fi === index) {
								return true;
							}
						}).transition().style("stroke", "black").attr("stroke-width", 2)
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					d3.select("#ssline").selectAll(".rectcell2").filter(function(d, index) {
							return index == fi;
						}).transition().style("stroke", "black").attr("stroke-width", 2)
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					d3.select("#ssline").selectAll(".rectcell2").filter(function(d, index) {
							return index != fi;
						}).transition().style("stroke", "")
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					d3.select("#ssline").selectAll(".rectcell").style("stroke", "");

					var py = 0;
					var check = 0;
					while (py < json.groupsloops.length) {

						if (json.groupsloops[py].name == jsonTarg.groups[fi].name) {

							viewOptions["group1"] = py;
							viewOptions["group2"] = py;

							check = -1;
						}

						py++;
					}

					if (check == -1) {
						check = 0;
					} else {
						viewOptions.resetview = 1;
						updateURL(viewOptions);

						reDrawProtein([], [], 0);

					}

					$(".block").css("width", "100%");
					$(".block").css("height", "450px");
					$(".block").css("margin", "0 auto");

					$("#contactmatrix").css("display", "none");
					$("#infobox").css("display", "none");

					viewOptions.mychain = viewOptions.chains[1];

					removeURLpart("highlighted");
					removeURLpart("colors");

					viewOptions.colorindex1 = fi;
					viewOptions.colorindex2 = fi;

					updateURL(viewOptions);

          reDrawProtein([], []);


					if (viewOptions.tab == "network") {
              updateSplomSecondaryStructureLineBetweenChains(fi,1);
          }
					//drawChordfromPymol(f);

					return false;
				};
			}

			//////////////////////////////////
			function mouseover_group(fi) {
				return function() {

					//THIS PART IS TO HIGLIGHT ON GLMOL STRUCTURE WHICH SS IS HOVERED ON BUT CONTRADICTS WITH WHEN YOU CLICK ON THE CHORD PLOT AND MATRIX . AFTER YOU DO THAT IF YOU HOVER ON SSLINE, THE CLICKED PART DISSAPPEARS AND THIS SHOULD NOT HAPPEN
					// viewOptions.colorindex1 = fi;
					// 					viewOptions.colorindex2 = fi;
					//
					// 					for(var am=0; am<array_for_pymolseq_name.length; am++){
					// 						//console.log(array_for_pymolseq_name[am]+"\t"+d.name+"\t"+i);
					// 						if(array_for_pymolseq_name[am]==jsonTarg.groups[fi].name){
					//
					// 				      		viewOptions["group1"] = am;
					// 				      		viewOptions["group2"] = am;
					//
					// 						}
					// 					}
					//
					// 					updateURL(viewOptions);
					// 					reDrawProtein([], []);

					d3.select("#chordGraph_real").selectAll("path.chord").style("opacity", 1.0);
					d3.select("#chordGraph_real").selectAll("path.chord").filter(function(d) {

							return json.groupsloops[d.source.index].name!=jsonTarg.groups[fi].name && json.groupsloops[d.target.index].name!=jsonTarg.groups[fi].name;

						}).transition().style("opacity", 0.1)
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					tip.show(fi);

					return false;
				};
			}


			/////////////////////RECTANGLES

			for (var ya = 0; ya < jsonTarg.groups.length; ya++) {

				if (jsonTarg.groups[ya].name.indexOf('NucleicAcid') > -1) {} else {

					svgline2.append("path")
						.attr("class", "rectcell1")
						.attr("transform", function(d) {

							var x = 0;
							var y = 20;

							return "translate(" + x + "," + y + ")";
						})


					.attr("d", function(d) {


							var x1 = 0;
							var x2;
							for (var i = 0; i < jsonTarg.nodes.length; i++) {

								if (i == jsonTarg.nodes.length - 1 && jsonTarg.nodes[i].residueNum >= jsonTarg.groups[jsonTarg.groups.length - 1].end) {
									if (i > 0) {
										x2 = (i * 9) + 15;
									} else {
										x2 = i * 9;
									}

								}

							}

							var totalsize = x2 - x1;

							//return "M0,0L20,0L20,20L0,20";
							//return "M0,0L"+totalsize+",0L"+totalsize+",25L0,25Z";
							return "M0,12.4L" + totalsize + ",12.4L" + totalsize + ",13.6L0,13.6Z";

						})
						.style("cursor", "pointer")
						.style("fill", "black");

				}
			}

			for (var ya = 0; ya < jsonTarg.groups.length; ya++) {

				if (jsonTarg.groups[ya].name.indexOf('NucleicAcid') > -1) {} else {

					svgline2.append("path")
						.attr("class", "rectcell2")
						.attr("transform", function(d) {

							var x;
							var y;

							for (var i = 0; i < jsonTarg.nodes.length; i++) {
								if (jsonTarg.nodes[i].residueNum == jsonTarg.groups[ya].start) {


									if (i > 0) {
										x = (i * 9) + 15;
									} else {
										x = i * 9;
									}

									break;
								}
							}

							y = 20;

							return "translate(" + x + "," + y + ")";
						})


					.attr("d", function(d) {


							var x1;
							var x2;
							for (var i = 0; i < jsonTarg.nodes.length; i++) {
								if (jsonTarg.nodes[i].residueNum == jsonTarg.groups[ya].start) {
									if (i > 0) {
										x1 = (i * 9) + 15;
									} else {
										x1 = i * 9;
									}

								} else if (jsonTarg.nodes[i].residueNum == jsonTarg.groups[ya].end) {
									if (i > 0) {
										x2 = (i * 9) + 15;
									} else {
										x2 = i * 9;
									}

									break;
								}
							}

							var totalsize = x2 - x1;

							if (jsonTarg.groups[ya].name[2] == "S") {
								return "M0,6.25L" + totalsize / 2 + ",6.25L" + totalsize / 2 + ",0L" + totalsize + ",12.5L" + totalsize / 2 + ",25L" + totalsize / 2 + ",18.75L0,18.75Z";
							} else {
								//return "M0,6.25L" + totalsize + ",6.25L" + totalsize + ",18.75L0,18.75Z";
                  //new way of drawing helices, added arcs (A10,10 0 0,1)
                  return "M0,6.25L" + totalsize + ",6.25 A10,10 0 0,1 " + totalsize + ",18.75L0,18.75 A10,10 0 0,1 0,6.25";
							}
						})
						//.style("cursor", "pointer")
						.style("cursor", function(d) {

							var pyindex = 0;

							while (pyindex < c_for_pymolseq) {

								if (array_for_pymolseq_name[pyindex] == jsonTarg.groups[ya].name) {
									result = "pointer";
									break;

								} else {
									result = null;
								}

								pyindex++;
							}

							return result;

						})
						.style("opacity", function(d, i) {

							var opa;
							var pyindex = 0;

							while (pyindex < c_for_pymolseq) {

								if (array_for_pymolseq_name[pyindex] == jsonTarg.groups[ya].name) {
									//color =  array_for_pymolseq_color[pyindex];
									opa = 1;
									break;

								} else {
									opa = 0.2;
								}
								//alert(array_for_pymolseq_name[i] +" aa "+ array_for_pymolseq_color[i]);
								pyindex++;
							}

							return opa;
						})
						.style("fill", function(d) {

							// var pyindex=0;
							//
							// 				while(pyindex<c_for_pymolseq){
							//
							// 					if (array_for_pymolseq_name[pyindex]==jsonTarg.groups[ya].name) {
							// 						color =  array_for_pymolseq_color[pyindex];
							//
							// 						//console.log(jsonSour.groups[ya].name +" bb "+ array_for_pymolseq_name[pyindex] +" aa "+ array_for_pymolseq_color[pyindex] +" cc "+ color);
							// 						break;
							//
							// 					}
							// 					else{
							// 						color =  "grey";
							// 					}
							// 					//alert(array_for_pymolseq_name[i] +" aa "+ array_for_pymolseq_color[i]);
							// 					pyindex++;
							// 				}
							return fill2(ya);

							//return color;


						})
						.on("mouseover", mouseover_group(ya))
						.on("mouseout", tip.hide)
						.on("click", click_group(ya, jsonTarg.groups[ya].name));
					// .append("title").text( function(d) {
					//
					//   		  	   		var str=jsonTarg.groups[ya].name;
					//   		  	   		return str + "(" + jsonTarg.groups[ya].start + "-" + jsonTarg.groups[ya].end + ")";
					//
					//   		  	       });

				}

			}
			/////////////////////RECTANGLES

			for (var i = 0; i < jsonTarg.nodes.length; i++) {

				jsonResNumsT[i] = jsonTarg.nodes[i].residueNum;
				jsonNamesT[i] = jsonTarg.nodes[i].name;

				// console.log(jsonTarg.nodes[i].name[0]);

				textchain2.append("tspan")
					.attr("x",
						function(d) {

							if (i == 0 && jsonTarg.nodes[i].name[0] == "D" && (jsonTarg.nodes[i].name[1] == "A" || jsonTarg.nodes[i].name[1] == "G" || jsonTarg.nodes[i].name[1] == "C" || jsonTarg.nodes[i].name[1] == "T" || jsonTarg.nodes[i].name[1] == "U")) {
								return i * 21;
							} else if (i > 0 && jsonTarg.nodes[i].name[0] == "D" && (jsonTarg.nodes[i].name[1] == "A" || jsonTarg.nodes[i].name[1] == "G" || jsonTarg.nodes[i].name[1] == "C" || jsonTarg.nodes[i].name[1] == "T" || jsonTarg.nodes[i].name[1] == "U")) {
								return (i * 21) + 15;
							} else if (i > 0) {
								return (i * 9) + 15;
							} else {
								return i * 9;
							}

						}


					)
					.attr("y", 20)
					.attr("dy", ".32em")
					.attr("class", "mytxt2")
					// .attr("text-anchor", "end")
					.text(function(d) {

						if (jsonTarg.nodes[i].name[0] == "D" && (jsonTarg.nodes[i].name[1] == "A" || jsonTarg.nodes[i].name[1] == "G" || jsonTarg.nodes[i].name[1] == "C" || jsonTarg.nodes[i].name[1] == "T" || jsonTarg.nodes[i].name[1] == "U")) {

							if (i == 0) {
								return ".." + jsonTarg.nodes[i].name[0] + jsonTarg.nodes[i].name[1] + " ";
								//return tfile+":"+jsonTarg.nodes[i].name[0]+jsonTarg.nodes[i].name[1]+" ";
							} else {
								return jsonTarg.nodes[i].name[0] + jsonTarg.nodes[i].name[1] + " ";
							}
						} else if (jsonTarg.groups[0].name[2] == "N" && jsonTarg.nodes[i].name[0] == "H" && jsonTarg.nodes[i].name[1] == "O" && jsonTarg.nodes[i].name[2] == "H") {} else {
							if (i == 0) {
								return ".." + jsonTarg.nodes[i].name[0];
							} else {
								return jsonTarg.nodes[i].name[0];
							}
						}
					})
            .attr("font-size", "13px")
    				.attr("font-style", "normal")
            .attr("text-decoration", function(d){

								if(jsonTarg.nodes[i].variant != "" && jsonTarg.nodes[i].variant!= undefined){
                   return "overline";
                }
                else{
                    return "normal";
                }

            })
    				.attr("font-family", "Courier")

    				.attr("fill",function(d) {
                            return "black";
    				})
            .style("stroke", function(d){

                if(jsonTarg.nodes[i].variant != "" && jsonTarg.nodes[i].variant!= undefined){
                   return "black";
                }

                else{
                    return "";
                }

            })
            //.attr("font-weight", "normal")
    				.style("cursor", "pointer")
    				.on("click", makeOnClickCallback(i, jsonTarg.nodes[i].residueNum))
    				.append("title")
            .text(function(d) {
							if(jsonTarg.nodes[i].variant != "" && jsonTarg.nodes[i].variant!= undefined){
										var uniprot = jsonTarg.nodes[i].uniprot;
										var info = jsonTarg.nodes[i].info;

										return uniprot+"\n"+info;
								}

                else{
                    return jsonTarg.nodes[i].name;
                }

            });

			}

		});

	}

}

///////////////////////////

function drawMatrixIntrachains() {

	var sourceChain = json.links[0].chains[0];
	var targetChain = json.links[0].chains[3];

	var jsonSource;
	var jsonTarget;


	var group1 = parseInt(viewOptions.group1);
	var group2 = parseInt(viewOptions.group2);

	var group1color;
	var group2color;

	var groupsTargetChain = json.groupsloops[group2].name[0];
	var groupsSourceChain = json.groupsloops[group1].name[0];

	if (sourceChain == groupsSourceChain) {
		group1 = parseInt(viewOptions.group1);
		group2 = parseInt(viewOptions.group2);
		group1color = parseInt(viewOptions.colorindex1);
		group2color = parseInt(viewOptions.colorindex2);
	} else {
		group1 = parseInt(viewOptions.group2);
		group2 = parseInt(viewOptions.group1);
		group1color = parseInt(viewOptions.colorindex2);
		group2color = parseInt(viewOptions.colorindex1);
	}

	// TEST: Find the smallest rectangle that includes all of the interactions
	var groupOneStart = parseInt(json.groupsloops[group1].end),
		groupOneEnd = parseInt(json.groupsloops[group1].start),
		groupTwoStart = parseInt(json.groupsloops[group2].end),
		groupTwoEnd = parseInt(json.groupsloops[group2].start);

	//alert("lala " + groupTwoEnd + "\t" +groupTwoStart + "\t" + groupOneEnd + "\t" +groupOneStart);

	for (var i = 0; i < json.links.length; i++) {
		var source = parseInt(json.nodes[json.links[i].source].residueNum);
		var target = parseInt(json.nodes[json.links[i].target].residueNum);


		// test if links starts in first, and goes to second
		if ((source >= json.groupsloops[group1].start) && (source <= json.groupsloops[group1].end) && (target >= json.groupsloops[group2].start) && (target <= json.groupsloops[group2].end)) {

			if (source > groupOneEnd) {
				groupOneEnd = source;
			}
			if (source < groupOneStart) {
				groupOneStart = source;
			}

			if (target > groupTwoEnd) {
				groupTwoEnd = target;
			}
			if (target < groupTwoStart) {
				groupTwoStart = target;
			}
		}

		// test if links starts in second, and goes to first
		if ((source >= json.groupsloops[group2].start) && (source <= json.groupsloops[group2].end) && (target >= json.groupsloops[group1].start) && (target <= json.groupsloops[group1].end)) {

			if (source > groupTwoEnd) {
				groupTwoEnd = source;
			}
			if (source < groupTwoStart) {
				groupTwoStart = source;
			}

			if (target > groupOneEnd) {
				groupOneEnd = target;
			}
			if (target < groupOneStart) {
				groupOneStart = target;
			}
		}

	}

	// extend groups that have bene trimmed too much to draw prettily

	for (var i = 0; i < 3; i++) {
		if ((groupOneEnd - groupOneStart) >= 3) {
			break;
		}
		if (groupOneEnd < json.groupsloops[group1].end) {
			groupOneEnd++;
		}
		if (groupOneStart > json.groupsloops[group1].start) {
			groupOneStart--;
		}
	}

	for (var i = 0; i < 3; i++) {
		if ((groupTwoEnd - groupTwoStart) >= 3) {
			break;
		}
		if (groupTwoEnd < json.groupsloops[group2].end) {
			groupTwoEnd++;
		}
		if (groupTwoStart > json.groupsloops[group2].start) {
			groupTwoStart--;
		}
	}


	if ((groupOneEnd - groupOneStart) < 2) {}

	if ((groupTwoEnd - groupTwoStart) < 2) {}

	var group2_length;
	var group1_length;

	if ((groupOneEnd - groupOneStart) < 2) {
		group1_length = 1;
	} else {
		group1_length = groupOneEnd - groupOneStart;
	}

	if ((groupTwoEnd - groupTwoStart) < 2) {
		group2_length = 1;
	} else {
		group2_length = groupTwoEnd - groupTwoStart;
	}

	// Pick sizes so that everything fits on the screen
	// and cells are square, with sides < 24px
	if ((window.innerWidth - 120) / 3 > window.innerHeight - 120) {
		// constrained by width
		var square = ((window.innerWidth - 120) / 3) / group2_length;
	} else {
		// constrained by height
		var square = (window.innerHeight - 120) / group1_length;
	}
	if (square > 24) {
		square = 24;
	}
	var width = square * group2_length;
	var height = square * group1_length;

	//alert(width + " " +height);

	var svgStyle = ".background {\
      fill: none;\
    }\
    \
    line {\
      stroke: #BDBDBD;\
    }\
    \
    text.active {\
      fill: red;\
      font-size: 15;\
      font-weight: bold;\
    }";

	//d3.select("#matrix").select("svg").remove();

	var margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};

	// Constrains on size:
	// width < (window.innerWidth-120)/3
	// height < window.innerHeight
	// cellWidth = cellHeight <= 24
	//


	var x = d3.scale.ordinal().rangeBands([0, width]),
		y = d3.scale.ordinal().rangeBands([0, height]),
		z = d3.scale.linear().domain([0, 4]).clamp(true),
		c = d3.scale.category10().domain(d3.range(10));

	d3.select("#chordGraph").select("svg").remove();

	//d3.select("#chordGraph").select("svg").remove();

	var svg = d3.select("#chordGraph").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		//.style("margin-left", -margin.left + "px")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Apply the CSS styling
	d3.select("#chordGraph").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var one = 0;
	var two = 0;

	var matrix = [];

	nodes1resNum = [];
	nodes1name = [];

	nodes2resNum = [];
	nodes2name = [];

	//console.log("length is "+jsonResNumsS.length);

	for (var i = 0; i < jsonResNumsS.length; i++) {

		var residueNum = jsonResNumsS[i];

		if (residueNum <= groupOneEnd && residueNum >= groupOneStart) {
			//nodes[ (residueNum - groupOneStart) ] = json.nodes[i];
			nodes1resNum[one] = residueNum;
			nodes1name[one] = jsonNamesS[i];
			one++;
		}

	}

	//alert(jsonResNumsS.length);
	for (var i = 0; i < jsonResNumsT.length; i++) {

		var residueNum = jsonResNumsT[i];

		if (residueNum <= groupTwoEnd && residueNum >= groupTwoStart) {
			//nodes[ (groupTwoEnd - groupTwoStart) + (residueNum - groupTwoStart)  ] = json.nodes[i];
			nodes2resNum[two] = residueNum;
			nodes2name[two] = jsonNamesT[i];
			two++;

		}

	}

	//alert("nodesdeneme " + nodesdeneme);

	var n1 = nodes1resNum.length;

	var n2 = nodes2resNum.length;

	//alert(nodes1name[1] + " " +nodes2name[4]);

	//alert("n1 " + n1 +"  "+ n2);

	for (var i = 0; i <= (groupOneEnd - groupOneStart); i++) {
		matrix[i] = d3.range(group2_length + 1).map(function(j) {
			return {
				x: j,
				y: i,
				z: 0
			};
		}); // DEBUG +1
	}



	// then fill in the matrix[index within group1][index within group 2].z = number of edges between this pair of residues
	var valuesource = 0;
	var valuetarget = 0;
	var sourceResidue;
	var targetResidue;
	var src;
	var trg;
	var deneme;

	for (var i = 0; i < json.links.length; i++) {

		var source = parseInt(json.nodes[json.links[i].source].residueNum);
		var target = parseInt(json.nodes[json.links[i].target].residueNum);


		for (var ya = 0; ya < n1; ya++) {

			if (source == nodes1resNum[ya]) {

				for (var za = 0; za < n2; za++) {

					if (target == nodes2resNum[za]) {

						if (((source <= groupOneEnd && source >= groupOneStart) && (target <= groupTwoEnd && target >= groupTwoStart))) {

							if (!matrix[ya]) {
								matrix[ya] = new Array();
							}

							matrix[ya][za].z = json.links[i].value;

						}

					}
				}
			}
		}

	}

	//alert("matrix " + matrix[0][4].z);


	x.domain(d3.range((groupTwoEnd - groupTwoStart) + 1));
	y.domain(d3.range((groupOneEnd - groupOneStart) + 1));



	var maxMatrixEntry = 0;

	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {

			// store the largest off-diagonal value, for use in setting up the color scale
			if ((matrix[i][j].z > maxMatrixEntry) && (i != j)) {
				maxMatrixEntry = matrix[i][j].z;
			}
		}
	}



	//ORIGINAL AS JAMES DID IT
	//var color = d3.scale.category20();


	//CHANGE AS IN SUBMATRIX
	var color = d3.scale.quantize()
		.domain([0, maxMatrixEntry])
		.range(colorbrewer.Greys[9].slice(2)); // remove the white color from the grey color scale


	svg.append("rect")
		.attr("class", "background")
		.attr("width", width)
		.attr("height", height);

	// Transpose the matrix (data to which rows and columns should be bound to transposes of each other)
	var matrixT = new Array();
	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {
			if (!matrixT[j]) {
				matrixT[j] = new Array();
			}
			matrixT[j][i] = matrix[i][j];
		}
	}


	var color1;
	var color2;

	var color1f;
	var color2f;

	if (json.groupsloops[viewOptions.group1].name[2] == "L") {
		color1f = "#C1BFBF";
		color1 = parseInt("#C1BFBF".substr(1), 16);
	} else {
		for (var i = 0; i < json_pymolseq1.length; i++) {

            //console.log(json_pymolseq1[i].name +"\t"+ json.groupsloops[viewOptions.group1].name +"\t"+ json.groupsloops[viewOptions.group2].name);

			if (json_pymolseq1[i].name == json.groupsloops[viewOptions.group1].name) {
				color1f = fill(i);
				color1 = parseInt(fill(i).substr(1), 16);
			}
		}
	}

	if (json.groupsloops[viewOptions.group2].name[2] == "L") {
		color2f = "#C1BFBF";
		color2 = parseInt("#C1BFBF".substr(1), 16);
	} else {
		for (var i = 0; i < json_pymolseq2.length; i++) {
			if (json_pymolseq2[i].name == json.groupsloops[viewOptions.group2].name) {
				color2f = fill2(i);
				color2 = parseInt(fill2(i).substr(1), 16);
			}
		}
	}
	var row = svg.selectAll(".row")
		.data(matrix)
		.enter().append("g")
		.style("overflow-x", "auto")
		.attr("class", "row")
		.attr("transform", function(d, i) {
			return "translate(0," + y(i) + ")";
		})
		.each(row);

	// Add a line below each row
	row.append("line")
		.attr("x2", width);

	// Add an extra line, below the bottom row
	row.filter(function(d, i) {
			return i == row[0].length - 1;
		})
		.append("line")
		.attr("x2", width)
		.attr("y1", y.rangeBand() - 1)
		.attr("y2", y.rangeBand() - 1)


	//THE NEW WAY OF ADDING THE ROW NAMES TO MAKE THEM STATIC WHILE THE MATRIX CAN BE SCROLLED
	d3.select("#rowtext2").select("svg").remove();
	var svgtext45 = d3.select("#rowtext2").append("svg")
		.attr("width", 100)
		.attr("height", height + 100)
		.append("g");

	// Apply the CSS styling
	d3.select("#rowtext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var row45 = svgtext45.selectAll(".row45")
		.data(matrix)
		.enter().append("g")
		.attr("transform", function(d, i) {
			return "translate(0," + y(i) + ")";
		});

	row45.append("text")
		.attr("x", 50)
		.attr("y", y.rangeBand() / 2)
		.attr("dy", ".32em")
		.attr("text-anchor", "end")
		.attr("class", "row_title")
		.attr("fill", function(d) {

			return color1f;
		})
		.text(function(d, i) {
			if (first != second) {
				if (nodes1name[i] != null) {
					return first + ":" + nodes1name[i];
				}
			} else {
				if (nodes1name[i] != null) {
					return nodes1name[i];
				}
			}
		})

	.style("cursor", "pointer")
		.on("click", function(d, i) {
			//alert(suffix_pdb);

			d3.select("#chordGraph").selectAll(".cell").style("stroke", "");
			d3.select("#chordGraph").selectAll(".cell").filter(function(p, index) {
				if (p.y === i) {
					return true;
				}
			}).style("stroke", "red").style("stroke-width", "2px");

			d3.select("#rowtext2").selectAll(".row_title").style("fill", "");
			d3.select("#coltext2").selectAll(".col_title").style("fill", "");

			d3.select("#rowtext2").selectAll(".row_title").filter(function(p, index) {
				if (i === index) {
					return true;
				}
			}).style("fill", "red").style("font-weight", "bold");


			highlighted = [];
			colors = [];

			//nodes1resNum[datum.y], nodes2resNum[datum.x ]

			highlighted.push(nodes1resNum[i]);

			colors.push(color1);
			viewOptions.chains = [first, second];


			for (var am = 0; am < json.links.length; am++) {
				//console.log(json.links[am].target+"\t"+json.nodes[json.links[am].target].residueNum+ "\t"+ nodes[i].residueNum);
				if (json.nodes[json.links[am].target].residueNum == nodes1resNum[i]) {

					if (json.groupsloops[viewOptions.group2].start <= parseInt(json.nodes[json.links[am].source].residueNum) && parseInt(json.nodes[json.links[am].source].residueNum) <= json.groupsloops[viewOptions.group2].end) {

						highlighted.push(json.nodes[json.links[am].source].residueNum);
						colors.push(color2);
					}
					//break;
				}
				if (json.nodes[json.links[am].source].residueNum == nodes1resNum[i]) {

					if (json.groupsloops[viewOptions.group2].start <= parseInt(json.nodes[json.links[am].target].residueNum) && parseInt(json.nodes[json.links[am].target].residueNum) <= json.groupsloops[viewOptions.group2].end) {

						highlighted.push(json.nodes[json.links[am].target].residueNum);
						colors.push(color2);
					}
				}
			}

			viewOptions.highlighted = highlighted;
			viewOptions.colors = colors;

			viewOptions.mychain = first;

			updateURL(viewOptions);

			reDrawProtein(viewOptions.highlighted, viewOptions.colors);

		});


	var column = svg.selectAll(".column")
		.data(matrixT)
		.enter().append("g")
		.attr("class", "column")
		.attr("transform", function(d, i) {
			return "translate(" + x(i) + ")rotate(-90)";
		});


	// Add a line to the left of each column
	column.append("line")
		.attr("x1", -height);

	// Add an extra line, to the right of the rightmost column
	column.filter(function(d, i) {
			return i == column[0].length - 1;
		})
		.append("line")
		.attr("x1", -height)
		.attr("y1", x.rangeBand() - 1)
		.attr("y2", x.rangeBand() - 1)


	//THE NEW WAY OF ADDING THE COLUMN NAMES TO MAKE THEM STATIC WHILE THE MATRIX CAN BE SCROLLED
	d3.select("#coltext2").select("svg").remove();
	var svgtext45c = d3.select("#coltext2").append("svg")
		.attr("width", width + 100)
		.attr("height", 80)
		.append("g");

	// Apply the CSS styling
	d3.select("#coltext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var col45 = svgtext45c.selectAll(".col45")
		.data(matrixT)
		.enter().append("g")
		.attr("transform", function(d, i) {
			return "translate(" + x(i) + ")rotate(-90)";
		});

	col45.append("text")
		.attr("x", -50)
		.attr("y", x.rangeBand() / 2)
		.attr("dy", ".32em")
		.attr("text-anchor", "start")
		.attr("class", "col_title")
		.attr("fill", function(d) {

			return color2f;
		})
		.text(function(d, i) {
			if (first != second) {
				if (nodes2name[i] != null) {
					return second + ":" + nodes2name[i];
				}
			} else {
				if (nodes2name[i] != null) {
					return nodes2name[i];
				}
			}
		})
		.style("cursor", "pointer")
		.on("click", function(d, i) {

			d3.select("#chordGraph").selectAll(".cell").style("stroke", "");
			d3.select("#chordGraph").selectAll(".cell").filter(function(p, index) {
				if (p.x === i) {
					return true;
				}
			}).style("stroke", "red").style("stroke-width", "2px");

			d3.select("#coltext2").selectAll(".col_title").style("fill", "");
			d3.select("#rowtext2").selectAll(".row_title").style("fill", "");

			d3.select("#coltext2").selectAll(".col_title").filter(function(p, index) { /* console.log(index+"\t"+i); */
				if (i === index) {
					return true;
				}
			}).style("fill", "red").style("font-weight", "bold");


			highlighted = [];
			colors = [];

			highlighted.push(nodes2resNum[i]);

			colors.push(color2);
			viewOptions.chains = [first, second];


			for (var am = 0; am < json.links.length; am++) {
				//console.log(json.links[am].target+"\t"+json.nodes[json.links[am].target].residueNum+ "\t"+ nodes[i].residueNum);
				if (json.nodes[json.links[am].target].residueNum == nodes2resNum[i]) {

					if (json.groupsloops[viewOptions.group1].start <= parseInt(json.nodes[json.links[am].source].residueNum) && parseInt(json.nodes[json.links[am].source].residueNum) <= json.groupsloops[viewOptions.group1].end) {

						highlighted.push(json.nodes[json.links[am].source].residueNum);
						colors.push(color1);
					}
					//break;
				}
				if (json.nodes[json.links[am].source].residueNum == nodes2resNum[i]) {

					if (json.groupsloops[viewOptions.group1].start <= parseInt(json.nodes[json.links[am].target].residueNum) && parseInt(json.nodes[json.links[am].target].residueNum) <= json.groupsloops[viewOptions.group1].end) {

						highlighted.push(json.nodes[json.links[am].target].residueNum);
						colors.push(color1);
					}
				}
			}

			viewOptions.highlighted = highlighted;
			viewOptions.colors = colors;

			viewOptions.mychain = second;

			updateURL(viewOptions);

			reDrawProtein(viewOptions.highlighted, viewOptions.colors);

		});

	//////////////////PROTEIN PROTEIN PROTEIN

	//ADD NAMES ON PROTEIN VIEW CONTENT LAST COLUMN

	d3.select("#contenttext2").select("svg").remove();
	var svgtext2 = d3.select("#contenttext2").append("svg")
		.attr("width", 500)
		.attr("height", 30)
		.append("g");
	// Apply the CSS styling
	d3.select("#contenttext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var text = svgtext2.append("text");

	text.append("tspan")
		.attr("x", 340)
		.attr("y", 20)
		.attr("dy", ".32em")
		.attr("text-anchor", "end")
		.text(json.name + " > ")
		.style("font-weight", "bold")
		.attr("fill", "black");


	text.append("tspan")
		.attr("dy", ".02em")
		.attr("text-anchor", "end")
		.text(json.groupsloops[group1].name)
		.style("font-weight", "bold")
		.attr("fill", function(d) {
			return color1f;
		});

	text.append("tspan")
		.attr("dy", ".02em")
		.attr("text-anchor", "end")
		.text(" - ")
		.style("font-weight", "bold")
		.attr("fill", "black");

	text.append("tspan")
		.attr("dy", ".02em")
		.attr("text-anchor", "end")
		.text(json.groupsloops[group2].name)
		.style("font-weight", "bold")
		.attr("fill", function(d) {
			return color2f;
		});

	//////////////////////////////PROTEIN PROTEIN PROTEIN


	//FOR PYMOL SCRIPT CREATION

	//alert(json.groups[group1].name +"\t"+ json.groups[group2].name +"\t"+ group1 +"\t"+ group2);


	function row(row) {

		var cell = d3.select(this).selectAll(".cell")
			.data(row.filter(function(d) {
				return d.z;
			}))
			.enter().append("rect")
			.attr("class", "cell")
			.attr("id", function(d) {
				return "cell" + d.x + "-" + d.y;
			})
			.attr("x", function(d) {
				return x(d.x);
			})
			.attr("width", x.rangeBand())
			.attr("height", y.rangeBand())
			//.style("fill", "gray")//ORIGINAL
			.style("fill", function(d) {
				return color(matrix[d.y][d.x].z)
			}) //DIFFERENT COLORS THEN BLACK AND WHITE
			.style("opacity", 1.0)
			.style("cursor", "pointer")
			.on("click", click)
			.on("mouseover", mouseover)
			.on("mouseout", mouseout);
		// .append("title")
		//        .text(function(d) {
		//            return matrix[d.y][d.x].z + " atomic contacts between " + nodes1name[d.y] + " and " + nodes2name[d.x];
		//        });

		// Label each cell with the number of contact it represents
		var thisRow = this;
		d3.select(this).selectAll(".cell").each(function(datum) {
			d3.select(thisRow)
				.append("text")
				.text(datum.z)
				.style("fill", "white")
				.style("cursor", "pointer")
				.attr("x", x(datum.x) + x.rangeBand() / 2)
				.attr("y", +y.rangeBand() * 0.6)
				.attr("text-anchor", "middle")
				.on("click", function(p) {

						viewOptions.highlighted = [nodes1resNum[datum.y], nodes2resNum[datum.x]];
						viewOptions.colors = [color1,color2]
						viewOptions.chains = [first, second];

						viewOptions.mychain = "both";
						updateURL(viewOptions);

						// d3.select("#matrix").selectAll(".cell").style("stroke", "");
						// d3.select("#matrix").selectAll(".cell").filter( function(d, index) {if (p.x===d.x && p.y===d.y) {return true; } }).style("stroke", "red").style("stroke-width", "2px");

						d3.select("#chordGraph").selectAll(".cell").style("stroke", "");
						d3.select("#chordGraph").selectAll(".cell").filter(function(d, index) {
							if (datum.x === d.x && datum.y === d.y) {
								return true;
							}
						}).style("stroke", "red").style("stroke-width", "2px");

						d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "");

						d3.select("#pymolseqs1").selectAll(".mytxt").filter(function(d, index) {
							if (nodes1name[datum.y] === jsonNamesS[index]) {
								return true;
							}
						}).style("fill", "red").style("font-weight", "bold");

						d3.select("#pymolseqs2").selectAll(".mytxt2").style("fill", "");

						d3.select("#pymolseqs2").selectAll(".mytxt2").filter(function(d, index) {
							if (nodes2name[datum.x] === jsonNamesT[index]) {
								return true;
							}
						}).style("fill", "red").style("font-weight", "bold");


						reDrawProtein(viewOptions.highlighted, [color1,color2]);

						//ADD NAMES ON PROTEIN VIEW CONTENT LAST COLUMN

						d3.select("#contenttext2").select("svg").remove();
						var svgtext2 = d3.select("#contenttext2").append("svg")
							.attr("width", 500)
							.attr("height", 30)
							.append("g");
						// Apply the CSS styling
						d3.select("#contenttext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

						var text = svgtext2.append("text");

						text.append("tspan")
							.attr("x", 360)
							.attr("y", 20)
							.attr("dy", ".32em")
							.attr("text-anchor", "end")
							.text(json.name + " > ")
							.style("font-weight", "bold")
							.attr("fill", "black");


						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(json.groupsloops[group1].name)
							.style("font-weight", "bold")
							.attr("fill", function(d) {
								return color1f;
							});

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(" - ")
							.style("font-weight", "bold")
							.attr("fill", "black");

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(json.groupsloops[group2].name)
							.style("font-weight", "bold")
							.attr("fill", function(d) {
								return color2f;
							});

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(" > ")
							.style("font-weight", "bold")
							.attr("fill", "black");

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(nodes1name[datum.y])
							.style("font-weight", "bold")
							.attr("fill", function(d) {
								return color1f;
							});

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(" - ")
							.style("font-weight", "bold")
							.attr("fill", "black");

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(nodes2name[datum.x])
							.style("font-weight", "bold")
							.attr("fill", function(d) {
								return color2f;
							});


						//////////////////
						//FOR PYMOL SCRIPT CREATION


					}

				)
				.on("mouseover", function(p) {

						d3.select("#coltext2").selectAll(".col_title").style("fill", "");
						d3.select("#rowtext2").selectAll(".row_title").style("fill", "");

						d3.select("#rowtext2").selectAll(".row_title").classed("active", function(d, i) {
							return i == datum.y;
						});
						d3.select("#coltext2").selectAll(".col_title").classed("active", function(d, i) {
							return i == datum.x;
						});

						////////ADDED TOOLTIP WHEN HOVERED ON THE MATRIX CELLS, FINE WHEN THE MATRIX IS SMALL, BUT WHEN IT IS LARGE AND SCROLLED, THE POSITION OF THE TOOLTIP CHANGES A LOT
						var xPosition = parseFloat(d3.select(this).attr("x"));
						var yPosition = parseFloat(d3.select(this).attr("y")) + 10 * datum.y + 250;

						d3.select("#tooltip")
							.style("left", xPosition + "px")
							.style("top", yPosition + "px")
							.select("#value")
							.text(function(d) {
								return matrix[datum.y][datum.x].z + " atomic contacts between " + nodes1name[datum.y] + " and " + nodes2name[datum.x];
							});


						//Show the tooltip
						d3.select("#tooltip").classed("hidden", false);
					}

				)
				.on("mouseout", mouseout)
				// .append("title")
				// 	        .text(function(d) {
				// 	            return matrix[datum.y][datum.x].z + " atomic contacts between " + nodes1name[datum.y] + " and " + nodes2name[datum.x];
				// 	        })
		});

	}



	function mouseover(p) {
		// d3.select("#rowtext").selectAll(".row_title").classed("active", function(d, i) { return i == p.y;  });
		//d3.select("#matrix").selectAll(".column text").classed("active", function(d, i) { return i == p.x; });

		d3.select("#coltext2").selectAll(".col_title").style("fill", "");
		d3.select("#rowtext2").selectAll(".row_title").style("fill", "");

		d3.select("#rowtext2").selectAll(".row_title").classed("active", function(d, i) {
			return i == p.y;
		});
		d3.select("#coltext2").selectAll(".col_title").classed("active", function(d, i) {
			return i == p.x;
		});


		////////ADDED TOOLTIP WHEN HOVERED ON THE MATRIX CELLS, FINE WHEN THE MATRIX IS SMALL, BUT WHEN IT IS LARGE AND SCROLLED, THE POSITION OF THE TOOLTIP CHANGES A LOT
		var xPosition = parseFloat(d3.select(this).attr("x"));
		var yPosition = parseFloat(d3.select(this).attr("y")) + 10 * p.y + 250;

		d3.select("#tooltip")
			.style("left", xPosition + "px")
			.style("top", yPosition + "px")
			.select("#value")
			.text(function(d) {
				return matrix[p.y][p.x].z + " atomic contacts between " + nodes1name[p.y] + " and " + nodes2name[p.x];
			});


		//Show the tooltip
		d3.select("#tooltip").classed("hidden", false);
	}

	function mouseout() {
		d3.selectAll("text").classed("active", false);
		d3.select("#tooltip").classed("hidden", true);
	}

	function click(p) {

		viewOptions.highlighted = [nodes1resNum[p.y], nodes2resNum[p.x]];
		viewOptions.colors = [color1, color2]
		viewOptions.chains = [first, second];

		viewOptions.mychain = "both";
		updateURL(viewOptions);

		// d3.select("#matrix").selectAll(".cell").style("stroke", "");
		// d3.select("#matrix").selectAll(".cell").filter( function(d, index) {if (p.x===d.x && p.y===d.y) {return true; } }).style("stroke", "red").style("stroke-width", "2px");

		d3.select("#chordGraph").selectAll(".cell").style("stroke", "");
		d3.select("#chordGraph").selectAll(".cell").filter(function(d, index) {
			if (p.x === d.x && p.y === d.y) {
				return true;
			}
		}).style("stroke", "red").style("stroke-width", "2px");

		d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "");

		d3.select("#pymolseqs1").selectAll(".mytxt").filter(function(d, index) {
			if (nodes1name[p.y] === jsonNamesS[index]) {
				return true;
			}
		}).style("fill", "red").style("font-weight", "bold");

		d3.select("#pymolseqs2").selectAll(".mytxt2").style("fill", "");

		d3.select("#pymolseqs2").selectAll(".mytxt2").filter(function(d, index) {
			if (nodes2name[p.x] === jsonNamesT[index]) {
				return true;
			}
		}).style("fill", "red").style("font-weight", "bold");


		reDrawProtein(viewOptions.highlighted, [color1, color2]);

		//ADD NAMES ON PROTEIN VIEW CONTENT LAST COLUMN

		d3.select("#contenttext2").select("svg").remove();
		var svgtext2 = d3.select("#contenttext2").append("svg")
			.attr("width", 500)
			.attr("height", 30)
			.append("g");
		// Apply the CSS styling
		d3.select("#contenttext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

		var text = svgtext2.append("text");

		text.append("tspan")
			.attr("x", 360)
			.attr("y", 20)
			.attr("dy", ".32em")
			.attr("text-anchor", "end")
			.text(json.name + " > ")
			.style("font-weight", "bold")
			.attr("fill", "black");


		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(json.groupsloops[group1].name)
			.style("font-weight", "bold")
			.attr("fill", color1f);

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(" - ")
			.style("font-weight", "bold")
			.attr("fill", "black");

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(json.groupsloops[group2].name)
			.style("font-weight", "bold")
			.attr("fill", color2f);

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(" > ")
			.style("font-weight", "bold")
			.attr("fill", "black");

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(nodes1name[p.y])
			.style("font-weight", "bold")
			.attr("fill", color1f);

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(" - ")
			.style("font-weight", "bold")
			.attr("fill", "black");

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(nodes2name[p.x])
			.style("font-weight", "bold")
			.attr("fill", color2f);


		//////////////////
		//FOR PYMOL SCRIPT CREATION

	}

	// Add downlaod link
	addDownloadLink("chordGraph");

	//alert("LALA");
}

function drawMatrix() {

	var group1 = parseInt(viewOptions.group1);
	var group2 = parseInt(viewOptions.group2);

	// TEST: Find the smallest rectangle that includes all of the interactions
	var groupOneStart = parseInt(json.groups[group1].end),
		groupOneEnd = parseInt(json.groups[group1].start),
		groupTwoStart = parseInt(json.groups[group2].end),
		groupTwoEnd = parseInt(json.groups[group2].start);


	for (var i = 0; i < json.links.length; i++) {
		var source = parseInt(json.nodes[json.links[i].source].residueNum);
		var target = parseInt(json.nodes[json.links[i].target].residueNum);

		// test if links starts in first, and goes to second
		if ((source >= json.groups[group1].start) && (source <= json.groups[group1].end) && (target >= json.groups[group2].start) && (target <= json.groups[group2].end)) {

			if (source > groupOneEnd) {
				groupOneEnd = source;
			}
			if (source < groupOneStart) {
				groupOneStart = source;
			}

			if (target > groupTwoEnd) {
				groupTwoEnd = target;
			}
			if (target < groupTwoStart) {
				groupTwoStart = target;
			}
		}

		// test if links starts in second, and goes to first
		if ((source >= json.groups[group2].start) && (source <= json.groups[group2].end) && (target >= json.groups[group1].start) && (target <= json.groups[group1].end)) {

			if (source > groupTwoEnd) {
				groupTwoEnd = source;
			}
			if (source < groupTwoStart) {
				groupTwoStart = source;
			}

			if (target > groupOneEnd) {
				groupOneEnd = target;
			}
			if (target < groupOneStart) {
				groupOneStart = target;
			}
		}

	}

	//console.log(groupOneStart +"\t"+ groupOneEnd +"\t"+ groupTwoStart +"\t"+ groupTwoEnd);

	// extend groups that have bene trimmed too much to draw prettily
	for (var i = 0; i < 3; i++) {
		if ((groupOneEnd - groupOneStart) >= 3) {
			break;
		}
		if (groupOneEnd < json.groups[group1].end) {
			groupOneEnd++;
		}
		if (groupOneStart > json.groups[group1].start) {
			groupOneStart--;
		}
	}

	for (var i = 0; i < 3; i++) {
		if ((groupTwoEnd - groupTwoStart) >= 3) {
			break;
		}
		if (groupTwoEnd < json.groups[group2].end) {
			groupTwoEnd++;
		}
		if (groupTwoStart > json.groups[group2].start) {
			groupTwoStart--;
		}
	}

	//console.log(groupOneStart +"\t"+ groupOneEnd +"\t"+ groupTwoStart +"\t"+ groupTwoEnd);


	//TEK DEGISTIRDIIM I<3 IDI, 1 OLDU, VE DE COMMENT OUT IF, ROWLARDA BAZEN SON RESIDUE NAME WAS SAME AS THE FIRST RESIDUE NAME IN COLUMN, BU DUZELDI
	// for (var i = 0; i < 1; i++) {
// 		// if ((groupTwoEnd - groupTwoStart) >= 3) { break; }
// 		if (groupTwoEnd <= json.groups[group2].end) {
// 			groupTwoEnd++;
// 		}
// 		if (groupTwoStart >= json.groups[group2].start) {
// 			groupTwoStart--;
// 		}
// 	}

	var group2_length;
	var group1_length;

	if ((groupOneEnd - groupOneStart) < 2) {
		group1_length = 1;
	} else {
		group1_length = groupOneEnd - groupOneStart;
	}

	if ((groupTwoEnd - groupTwoStart) < 2) {
		group2_length = 1;
	} else {
		group2_length = groupTwoEnd - groupTwoStart;
	}

	// check if we need to swap groups in order to avoid confusing up indexing in nodes[]
	// (and hence one set of labels, and the highlighted residues)
	// update the URL too, to avoid swapping highlighting colors for helicies
	if (group1_length > group2_length) {
		group1 = parseInt(viewOptions.group2);
		group2 = parseInt(viewOptions.group1);

		viewOptions.group1 = group1;
		viewOptions.group2 = group2;
		updateURL(viewOptions);

		a = groupOneStart;
		b = groupOneEnd;
		groupOneStart = groupTwoStart;
		groupOneEnd = groupTwoEnd;
		groupTwoStart = a;
		groupTwoEnd = b;

		group2_length = groupTwoEnd - groupTwoStart;
		group1_length = groupOneEnd - groupOneStart;
	}

//console.log(groupOneStart +"\t"+ groupOneEnd +"\t"+ groupTwoStart +"\t"+ groupTwoEnd);

	// Pick sizes so that everything fits on the screen
	// and cells are square, with sides < 24px
	if ((window.innerWidth - 120) / 3 > window.innerHeight - 120) {
		// constrained by width
		var square = ((window.innerWidth - 120) / 3) / group2_length;
	} else {
		// constrained by height
		var square = (window.innerHeight - 120) / group1_length;
	}
	if (square > 24) {
		square = 24;
	}
	var width = square * group2_length;
	var height = square * group1_length;

	var svgStyle = ".background {\
      fill: none;\
    }\
    \
    line {\
      stroke: #BDBDBD;\
    }\
    \
    text.active {\
      fill: red;\
      font-size: 15;\
      font-weight: bold;\
    }";

	//d3.select("#matrix").select("svg").remove();

	//THIS IS FOR WHEN ORIGINAL TEXTS ARE ADDED TO THE CHORDGRAPH IN ONE SVG
	// var margin = {top: 40, right: 0, bottom: 80, left: 40};

	//THIS IS FOR WHEN THREE SEPERATE DIVS ARE GENERATED FOR 1 FOR COLUMN, 1 FOR ROW TEXTS AND 1 FOR THE MATRIX ITSELF
	var margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};

	var x = d3.scale.ordinal().rangeBands([0, width]),
		y = d3.scale.ordinal().rangeBands([0, height]),
		z = d3.scale.linear().domain([0, 4]).clamp(true),
		c = d3.scale.category10().domain(d3.range(10));

	d3.select("#chordGraph").select("svg").remove();

	var svg = d3.select("#chordGraph").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		//.style("margin-left", -margin.left + "px")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Apply the CSS styling
	d3.select("#chordGraph").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var matrix = [];
	nodes = new Array();

	// first, create two arrays of nodes
	for (var i = 0; i < json.nodes.length; i++) {
		var residueNum = json.nodes[i].residueNum;

		if (residueNum <= groupOneEnd && residueNum >= groupOneStart) {
			nodes[(residueNum - groupOneStart)] = json.nodes[i];

			//var annen = (residueNum - groupOneStart);
			//console.log(nodes[(residueNum - groupOneStart)  ].name +"\t"+groupOneEnd+"\t"+groupOneStart+"\t"+residueNum+"\t"+annen);

		}

		// not an else if, as one residue may span two secodnary elements
		// eg. HELIX3 & HELIX4 share resi 9
		if (residueNum <= groupTwoEnd && residueNum >= groupTwoStart) {
			nodes[(groupOneEnd - groupOneStart) + 1 + (residueNum - groupTwoStart) ] = json.nodes[i];

			//var annen = (groupOneEnd - groupOneStart) + 1 + (residueNum - groupTwoStart) ;
			//console.log("in two " + nodes[(groupOneEnd - groupOneStart) + 1 + (residueNum - groupTwoStart)].name +"\t"+groupTwoEnd+"\t"+groupTwoStart+"\t"+residueNum+"\t"+annen);

		}
	}

	nodes.forEach(function(node, i) {
		node.index = i;
		node.count = 0;
	});
	var n = nodes.length;

	for (var i = 0; i <= (groupOneEnd - groupOneStart); i++) {
		matrix[i] = d3.range(group2_length + 1).map(function(j) {
			return {
				x: j,
				y: i,
				z: 0
			};
		}); // DEBUG +1
	}
	// then fill in the matrix[index within group1][index within group 2].z = number of edges between this pair of residues
	count = 0;
	for (var i = 0; i < json.links.length; i++) {
		targetResidue = parseInt(json.nodes[json.links[i].target].residueNum);
		sourceResidue = parseInt(json.nodes[json.links[i].source].residueNum);

		// target in group 1, source in group2
		if (((targetResidue <= groupOneEnd && targetResidue >= groupOneStart) && (sourceResidue <= groupTwoEnd && sourceResidue >= groupTwoStart))) {

			if (!matrix[targetResidue - groupOneStart]) {
				matrix[targetResidue - groupOneStart] = new Array();
			}
			matrix[targetResidue - groupOneStart][sourceResidue - groupTwoStart].z = json.links[i].value;
		}

		// source in group1, target in group2
		if (((sourceResidue <= groupOneEnd && sourceResidue >= groupOneStart) && (targetResidue <= groupTwoEnd && targetResidue >= groupTwoStart))) {
			if (!matrix[sourceResidue - groupOneStart]) {
				matrix[sourceResidue - groupOneStart] = new Array();
			}

			matrix[sourceResidue - groupOneStart][targetResidue - groupTwoStart].z = json.links[i].value;


		}
	}

	x.domain(d3.range((groupTwoEnd - groupTwoStart) + 1));
	y.domain(d3.range((groupOneEnd - groupOneStart) + 1));

	//alert(matrix[5][5].z);

	var maxMatrixEntry = 0;

	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {

			// store the largest off-diagonal value, for use in setting up the color scale
			if ((matrix[i][j].z > maxMatrixEntry) && (i != j)) {
				maxMatrixEntry = matrix[i][j].z;
			}
		}
	}

	//CHANGE AS IN SUBMATRIX
	var color = d3.scale.quantize()
		.domain([0, maxMatrixEntry])
		.range(colorbrewer.Greys[9].slice(2)); // remove the white color from the grey color scale


	svg.append("rect")
		.attr("class", "background")
		.attr("width", width)
		.attr("height", height);

	// Transpose the matrix (data to which rows and columns should be bound to transposes of each other)
	var matrixT = new Array();
	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {
			if (!matrixT[j]) {
				matrixT[j] = new Array();
			}
			matrixT[j][i] = matrix[i][j];
		}
	}


	var row = svg.selectAll(".row")
		.data(matrix)
		.enter().append("g")
		.attr("class", "row")
		.attr("transform", function(d, i) {
			return "translate(0," + y(i) + ")";
		})
		.each(row);

	// Add a line below each row
	row.append("line")
		.attr("x2", width);

	// Add an extra line, below the bottom row
	row.filter(function(d, i) {
			return i == row[0].length - 1;
		})
		.append("line")
		.attr("x2", width)
		.attr("y1", y.rangeBand() - 1)
		.attr("y2", y.rangeBand() - 1)


	//THE NEW WAY OF ADDING THE ROW NAMES TO MAKE THEM STATIC WHILE THE MATRIX CAN BE SCROLLED
	d3.select("#rowtext2").select("svg").remove();
	var svgtext45 = d3.select("#rowtext2").append("svg")
		.attr("width", 100)
		.attr("height", height + 100)
		.append("g");

	// Apply the CSS styling
	d3.select("#rowtext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var row45 = svgtext45.selectAll(".row45")
		.data(matrix)
		.enter().append("g")
		.attr("transform", function(d, i) {
			return "translate(0," + y(i) + ")";
		});

	row45.append("text")
		.attr("x", 40)
		.attr("y", y.rangeBand() / 2)
		.attr("dy", ".32em")
		.attr("text-anchor", "end")
		.attr("class", "row_title")
		.attr("fill", fill(viewOptions.group1))
		.text(function(d, i) {
			if (first != second) {
				if (nodes[i] != null) {
					return first + ":" + nodes[i].name;
				}
			} else {
				if (nodes[i] != null) {
					return nodes[i].name;
				}
			}
		})

	.style("cursor", "pointer")
		// .attr("onclick", function(d, i) {
		.on("click", function(d, i) {

			d3.select("#chordGraph").selectAll(".cell").style("stroke", "");
			d3.select("#chordGraph").selectAll(".cell").filter(function(p, index) {
				if (p.y === i) {
					return true;
				}
			}).style("stroke", "red").style("stroke-width", "2px");

			d3.select("#rowtext2").selectAll(".row_title").style("fill", "");
			d3.select("#coltext2").selectAll(".col_title").style("fill", "");

			d3.select("#rowtext2").selectAll(".row_title").filter(function(p, index) {
				if (i === index) {
					return true;
				}
			}).style("fill", "red").style("font-weight", "bold");


			highlighted = [];
			colors = [];

			highlighted.push(nodes[i].residueNum);

			colors.push(parseInt(fill(viewOptions.group1).substr(1), 16));
			viewOptions.chains = [first, second];


			for (var am = 0; am < json.links.length; am++) {
				//console.log(json.links[am].target+"\t"+json.nodes[json.links[am].target].residueNum+ "\t"+ nodes[i].residueNum);
				if (json.nodes[json.links[am].target].residueNum == nodes[i].residueNum) {

					if (json.groups[viewOptions.group2].start <= parseInt(json.nodes[json.links[am].source].residueNum) && parseInt(json.nodes[json.links[am].source].residueNum) <= json.groups[viewOptions.group2].end) {

						highlighted.push(json.nodes[json.links[am].source].residueNum);
						colors.push(parseInt(fill(viewOptions.group2).substr(1), 16));
					}
					//break;
				}
				if (json.nodes[json.links[am].source].residueNum == nodes[i].residueNum) {

					if (json.groups[viewOptions.group2].start <= parseInt(json.nodes[json.links[am].target].residueNum) && parseInt(json.nodes[json.links[am].target].residueNum) <= json.groups[viewOptions.group2].end) {

						highlighted.push(json.nodes[json.links[am].target].residueNum);
						colors.push(parseInt(fill(viewOptions.group2).substr(1), 16));
					}
				}
			}

			viewOptions.highlighted = highlighted;
			viewOptions.colors = colors;

			updateURL(viewOptions);

			reDrawProtein(viewOptions.highlighted, viewOptions.colors);

		});


	var column = svg.selectAll(".column")
		.data(matrixT)
		.enter().append("g")
		.attr("class", "column")
		.attr("transform", function(d, i) {
			return "translate(" + x(i) + ")rotate(-90)";
		});


	// Add a line to the left of each column
	column.append("line")
		.attr("x1", -height);

	// Add an extra line, to the right of the rightmost column
	column.filter(function(d, i) {
			return i == column[0].length - 1;
		})
		.append("line")
		.attr("x1", -height)
		.attr("y1", x.rangeBand() - 1)
		.attr("y2", x.rangeBand() - 1)

	//THE NEW WAY OF ADDING THE COLUMN NAMES TO MAKE THEM STATIC WHILE THE MATRIX CAN BE SCROLLED
	d3.select("#coltext2").select("svg").remove();
	var svgtext45c = d3.select("#coltext2").append("svg")
		.attr("width", width + 100)
		.attr("height", 80)
		.append("g");

	// Apply the CSS styling
	d3.select("#coltext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var col45 = svgtext45c.selectAll(".col45")
		.data(matrixT)
		.enter().append("g")
		.attr("transform", function(d, i) {
			return "translate(" + x(i) + ")rotate(-90)";
		});

	col45.append("text")
		.attr("x", -40)
		.attr("y", x.rangeBand() / 2)
		.attr("dy", ".32em")
		.attr("text-anchor", "start")
		.attr("class", "col_title")
		.attr("fill", fill(viewOptions.group2))
		.text(function(d, i) {
			if (first != second) {
				if (nodes[i + (group1_length+1)] != null) {
					return second + ":" + nodes[i + (group1_length+1)].name;
				}
			} else {
				if (nodes[i + (group1_length+1)] != null) {
					return nodes[i + (group1_length+1)].name;
				}
			}
		})

	.style("cursor", "pointer")
		.on("click", function(d, i) {

			d3.select("#chordGraph").selectAll(".cell").style("stroke", "");
			d3.select("#chordGraph").selectAll(".cell").filter(function(p, index) {
				if (p.x === i) {
					return true;
				}
			}).style("stroke", "red").style("stroke-width", "2px");

			d3.select("#coltext2").selectAll(".col_title").style("fill", "");
			d3.select("#rowtext2").selectAll(".row_title").style("fill", "");

			d3.select("#coltext2").selectAll(".col_title").filter(function(p, index) { /* console.log(index+"\t"+i); */
				if (i === index) {
					return true;
				}
			}).style("fill", "red").style("font-weight", "bold");


			highlighted = [];
			colors = [];

			highlighted.push(nodes[i + (group1_length+1)].residueNum);

			colors.push(parseInt(fill(viewOptions.group2).substr(1), 16));
			viewOptions.chains = [first, second];


			for (var am = 0; am < json.links.length; am++) {
				//console.log(json.links[am].target+"\t"+json.nodes[json.links[am].target].residueNum+ "\t"+ nodes[i].residueNum);
				if (json.nodes[json.links[am].target].residueNum == nodes[i + (group1_length+1)].residueNum) {

					if (json.groups[viewOptions.group1].start <= parseInt(json.nodes[json.links[am].source].residueNum) && parseInt(json.nodes[json.links[am].source].residueNum) <= json.groups[viewOptions.group1].end) {

						highlighted.push(json.nodes[json.links[am].source].residueNum);
						colors.push(parseInt(fill(viewOptions.group1).substr(1), 16));
					}
					//break;
				}
				if (json.nodes[json.links[am].source].residueNum == nodes[i + (group1_length+1)].residueNum) {

					if (json.groups[viewOptions.group1].start <= parseInt(json.nodes[json.links[am].target].residueNum) && parseInt(json.nodes[json.links[am].target].residueNum) <= json.groups[viewOptions.group1].end) {

						highlighted.push(json.nodes[json.links[am].target].residueNum);
						colors.push(parseInt(fill(viewOptions.group1).substr(1), 16));
					}
				}
			}

			viewOptions.highlighted = highlighted;
			viewOptions.colors = colors;

			updateURL(viewOptions);

			reDrawProtein(viewOptions.highlighted, viewOptions.colors);

		});


	//ADD NAMES ON PROTEIN VIEW CONTENT LAST COLUMN

	d3.select("#contenttext2").select("svg").remove();
	var svgtext2 = d3.select("#contenttext2").append("svg")
		.attr("width", 500)
		.attr("height", 30)
		.append("g");
	// Apply the CSS styling
	d3.select("#contenttext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var text = svgtext2.append("text");

	text.append("tspan")
		.attr("x", 340)
		.attr("y", 20)
		.attr("dy", ".32em")
		.attr("text-anchor", "end")
		.text(json.name + " > ")
		.style("font-weight", "bold")
		.attr("fill", "black");


	text.append("tspan")
		.attr("dy", ".02em")
		.attr("text-anchor", "end")
		.text(json.groups[group1].name)
		.style("font-weight", "bold")
		.attr("fill", fill(viewOptions.group1));

	text.append("tspan")
		.attr("dy", ".02em")
		.attr("text-anchor", "end")
		.text(" - ")
		.style("font-weight", "bold")
		.attr("fill", "black");

	text.append("tspan")
		.attr("dy", ".02em")
		.attr("text-anchor", "end")
		.text(json.groups[group2].name)
		.style("font-weight", "bold")
		.attr("fill", fill(viewOptions.group2));


	//////////////////////////////PROTEIN PROTEIN PROTEIN

	//FOR PYMOL SCRIPT CREATION was here
	function row(row) {

		var cell = d3.select(this).selectAll(".cell")
			.data(row.filter(function(d) {
				return d.z;
			}))
			.enter().append("rect")
			.attr("class", "cell")
			.attr("id", function(d) {
				return "cell" + d.x + "-" + d.y;
			})
			.attr("x", function(d) {
				return x(d.x);
			})
			.attr("width", x.rangeBand())
			.attr("height", y.rangeBand())
			//.style("fill", "gray")//ORIGINAL
			.style("fill", function(d) {
				return color(matrix[d.y][d.x].z)
			}) //DIFFERENT COLORS THEN BLACK AND WHITE
			.style("opacity", 1.0)
			.style("cursor", "pointer")
			.on("click", click)
			.on("mouseover", mouseover)
			.on("mouseout", mouseout);
		// .append("title")
		//         .text(function(d) {
		//             return matrix[d.y][d.x].z + " atomic contacts between " + nodes[d.y].name + " and " + nodes[d.x + (group2_length)].name;
		//         });

		// Label each cell with the number of contact it represents
		var thisRow = this;
		d3.select(this).selectAll(".cell").each(function(datum) {
			d3.select(thisRow)
				.append("text")
				.text(datum.z)
				.style("fill", "white")
				.style("cursor", "pointer")
				//.style("position", "absolute")
				//.style("z-index", -1)
				.attr("x", x(datum.x) + x.rangeBand() / 2)
				.attr("y", +y.rangeBand() * 0.6)
				.attr("text-anchor", "middle")
				.on("click", function(p) {

						viewOptions.highlighted = [nodes[datum.y].residueNum, nodes[datum.x + (group1_length+1)].residueNum];
						viewOptions.colors = [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]
						viewOptions.chains = [first, second];

						updateURL(viewOptions);

						d3.select("#chordGraph").selectAll(".cell").style("stroke", "");
						d3.select("#chordGraph").selectAll(".cell").filter(function(d, index) {
							if (datum.x === d.x && datum.y === d.y) {
								return true;
							}
						}).style("stroke", "red").style("stroke-width", "2px");

						d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "");

						d3.select("#pymolseqs1").selectAll(".mytxt").filter(function(d, index) {
							if (nodes[datum.x + (group1_length+1)].name === json.nodes[index].name || nodes[datum.y].name === json.nodes[index].name) {
								return true;
							}
						}).style("fill", "red").style("font-weight", "bold");

						reDrawProtein(viewOptions.highlighted, [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]);

						//ADD NAMES ON PROTEIN VIEW CONTENT LAST COLUMN

						d3.select("#contenttext2").select("svg").remove();
						var svgtext2 = d3.select("#contenttext2").append("svg")
							.attr("width", 500)
							.attr("height", 30)
							.append("g");
						// Apply the CSS styling
						d3.select("#contenttext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

						var text = svgtext2.append("text");

						text.append("tspan")
							.attr("x", 360)
							.attr("y", 20)
							.attr("dy", ".32em")
							.attr("text-anchor", "end")
							.text(json.name + " > ")
							.style("font-weight", "bold")
							.attr("fill", "black");

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(json.groups[group1].name)
							.style("font-weight", "bold")
							.attr("fill", fill(viewOptions.group1));

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(" - ")
							.style("font-weight", "bold")
							.attr("fill", "black");

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(json.groups[group2].name)
							.style("font-weight", "bold")
							.attr("fill", fill(viewOptions.group2));

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(" > ")
							.style("font-weight", "bold")
							.attr("fill", "black");

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(nodes[datum.y].name)
							.style("font-weight", "bold")
							.attr("fill", fill(viewOptions.group1));

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(" - ")
							.style("font-weight", "bold")
							.attr("fill", "black");

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(nodes[datum.x + (group1_length+1)].name)
							.style("font-weight", "bold")
							.attr("fill", fill(viewOptions.group2));



						//////////////////
						//FOR PYMOL SCRIPT CREATION

					}

				)
				.on("mouseover", function(p) {

						d3.select("#coltext2").selectAll(".col_title").style("fill", "");
						d3.select("#rowtext2").selectAll(".row_title").style("fill", "");

						d3.select("#rowtext2").selectAll(".row_title").classed("active", function(d, i) {
							return i == datum.y;
						});
						d3.select("#coltext2").selectAll(".col_title").classed("active", function(d, i) {
							return i == datum.x;
						});



						////////ADDED TOOLTIP WHEN HOVERED ON THE MATRIX CELLS, FINE WHEN THE MATRIX IS SMALL, BUT WHEN IT IS LARGE AND SCROLLED, THE POSITION OF THE TOOLTIP CHANGES A LOT
						// var xPosition = parseFloat(d3.select(this).attr("x"));
// 						var yPosition = parseFloat(d3.select(this).attr("y")) + 10 * datum.y + 250;
//
//
// 						//console.log(xPosition +" position "+ yPosition);
//
// 						//Update the tooltip position and value
// 						d3.select("#tooltip")
// 							.style("left", xPosition + "px")
// 							.style("top", yPosition + "px")
// 							.select("#value")
// 							.text(function(d) {
// 								return matrix[datum.y][datum.x].z + " atomic contacts between " + nodes[datum.y].name + " and " + nodes[datum.x + (group1_length+1)].name;
// 							});
//
//
// 						//Show the tooltip
// 						d3.select("#tooltip").classed("hidden", false);


					}

				)
				.on("mouseout", mouseout)
				// .append("title")
				// 	        .text(function(d) {
				// 	            return matrix[datum.y][datum.x].z + " atomic contacts between " + nodes[datum.y].name + " and " + nodes[datum.x + (group2_length)].name;
				// 	        })
				//
		});

	}

	function mouseover(p) { //alert("aa");

		d3.select("#coltext2").selectAll(".col_title").style("fill", "");
		d3.select("#rowtext2").selectAll(".row_title").style("fill", "");

		d3.select("#rowtext2").selectAll(".row_title").classed("active", function(d, i) {
			return i == p.y;
		});
		d3.select("#coltext2").selectAll(".col_title").classed("active", function(d, i) {
			return i == p.x;
		});

		////////ADDED TOOLTIP WHEN HOVERED ON THE MATRIX CELLS, FINE WHEN THE MATRIX IS SMALL, BUT WHEN IT IS LARGE AND SCROLLED, THE POSITION OF THE TOOLTIP CHANGES A LOT
		// var xPosition = parseFloat(d3.select(this).attr("x"));
// 		var yPosition = parseFloat(d3.select(this).attr("y")) + 10 * datum.y + 250;

		//Update the tooltip position and value
		// d3.select("#tooltip")
// 			.style("left", xPosition + "px")
// 			.style("top", yPosition + "px")
// 			.select("#value")
// 			.text(function(d) {
// 				return matrix[datum.y][datum.x].z + " atomic contacts between " + nodes[datum.y].name + " and " + nodes[datum.x + (group2_length)].name;
// 			});
//
//
// 		//Show the tooltip
// 		d3.select("#tooltip").classed("hidden", false);
	}

	function mouseout() {
		d3.selectAll("text").classed("active", false);
		//d3.select("#tooltip").classed("hidden", true);

	}

	function click(p) {
		viewOptions.highlighted = [nodes[p.y].residueNum, nodes[p.x + (group1_length+1)].residueNum];
		viewOptions.colors = [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]
		viewOptions.chains = [first, second];

		updateURL(viewOptions);

		d3.select("#chordGraph").selectAll(".cell").style("stroke", "");
		d3.select("#chordGraph").selectAll(".cell").filter(function(d, index) {
			if (p.x === d.x && p.y === d.y) {
				return true;
			}
		}).style("stroke", "red").style("stroke-width", "2px");

		d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "");

		d3.select("#pymolseqs1").selectAll(".mytxt").filter(function(d, index) {
			if (nodes[p.x + (group1_length+1)].name === json.nodes[index].name || nodes[p.y].name === json.nodes[index].name) {
				return true;
			}
		}).style("fill", "red").style("font-weight", "bold");


		reDrawProtein(viewOptions.highlighted, [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]);


		//ADD NAMES ON PROTEIN VIEW CONTENT LAST COLUMN

		d3.select("#contenttext2").select("svg").remove();
		var svgtext2 = d3.select("#contenttext2").append("svg")
			.attr("width", 500)
			.attr("height", 30)
			.append("g");
		// Apply the CSS styling
		d3.select("#contenttext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

		var text = svgtext2.append("text");

		text.append("tspan")
			.attr("x", 360)
			.attr("y", 20)
			.attr("dy", ".32em")
			.attr("text-anchor", "end")
			.text(json.name + " > ")
			.style("font-weight", "bold")
			.attr("fill", "black");


		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(json.groups[group1].name)
			.style("font-weight", "bold")
			.attr("fill", fill(viewOptions.group1));

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(" - ")
			.style("font-weight", "bold")
			.attr("fill", "black");

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(json.groups[group2].name)
			.style("font-weight", "bold")
			.attr("fill", fill(viewOptions.group2));

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(" > ")
			.style("font-weight", "bold")
			.attr("fill", "black");

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(nodes[p.y].name)
			.style("font-weight", "bold")
			.attr("fill", fill(viewOptions.group1));

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(" - ")
			.style("font-weight", "bold")
			.attr("fill", "black");

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(nodes[p.x + (group1_length+1)].name)
			.style("font-weight", "bold")
			.attr("fill", fill(viewOptions.group2));



		//////////////////
		//FOR PYMOL SCRIPT CREATION

	}


	addDownloadLink("chordGraph");

}

//////////////////////////////////////START OF DRAWMATRIXLOOP FUNCTION

function drawMatrixLoop() {

	var group1 = parseInt(viewOptions.group1);
	var group2 = parseInt(viewOptions.group2);

	// TEST: Find the smallest rectangle that includes all of the interactions
	var groupOneStart = parseInt(json.groupsloops[group1].end),
		groupOneEnd = parseInt(json.groupsloops[group1].start),
		groupTwoStart = parseInt(json.groupsloops[group2].end),
		groupTwoEnd = parseInt(json.groupsloops[group2].start);


	for (var i = 0; i < json.links.length; i++) {
		var source = parseInt(json.nodes[json.links[i].source].residueNum);
		var target = parseInt(json.nodes[json.links[i].target].residueNum);

		// test if links starts in first, and goes to second
		if ((source >= json.groupsloops[group1].start) && (source <= json.groupsloops[group1].end) && (target >= json.groupsloops[group2].start) && (target <= json.groupsloops[group2].end)) {

			if (source > groupOneEnd) {
				groupOneEnd = source;
			}
			if (source < groupOneStart) {
				groupOneStart = source;
			}

			if (target > groupTwoEnd) {
				groupTwoEnd = target;
			}
			if (target < groupTwoStart) {
				groupTwoStart = target;
			}
		}

		// test if links starts in second, and goes to first
		if ((source >= json.groupsloops[group2].start) && (source <= json.groupsloops[group2].end) && (target >= json.groupsloops[group1].start) && (target <= json.groupsloops[group1].end)) {

			if (source > groupTwoEnd) {
				groupTwoEnd = source;
			}
			if (source < groupTwoStart) {
				groupTwoStart = source;
			}

			if (target > groupOneEnd) {
				groupOneEnd = target;
			}
			if (target < groupOneStart) {
				groupOneStart = target;
			}
		}
	}
	//	alert(groupOneStart +"\t"+ groupOneEnd +"\t"+ groupTwoStart +"\t"+ groupTwoEnd);

	// extend groups that have bene trimmed too much to draw prettily
	for (var i = 0; i < 3; i++) {
		if ((groupOneEnd - groupOneStart) >= 3) {
			break;
		}
		if (groupOneEnd < json.groupsloops[group1].end) {
			groupOneEnd++;
		}
		if (groupOneStart > json.groupsloops[group1].start) {
			groupOneStart--;
		}
	}

	for (var i = 0; i < 3; i++) {
		if ((groupTwoEnd - groupTwoStart) >= 3) {
			break;
		}
		if (groupTwoEnd < json.groupsloops[group2].end) {
			groupTwoEnd++;
		}
		if (groupTwoStart > json.groupsloops[group2].start) {
			groupTwoStart--;
		}
	}

	groupOneStart = groupOneStart;
	groupOneEnd = groupOneEnd;
	groupTwoStart = groupTwoStart;
	groupTwoEnd = groupTwoEnd;

	var group2_length;
	var group1_length;

	if ((groupOneEnd - groupOneStart) < 2) {
		group1_length = 1;
	} else {
		group1_length = groupOneEnd - groupOneStart;
	}

	if ((groupTwoEnd - groupTwoStart) < 2) {
		group2_length = 1;
	} else {
		group2_length = groupTwoEnd - groupTwoStart;
	}

	// check if we need to swap groups in order to avoid confusing up indexing in nodes[]
	// (and hence one set of labels, and the highlighted residues)
	// update the URL too, to avoid swapping highlighting colors for helicies
	if (group1_length > group2_length) {
		group1 = parseInt(viewOptions.group2);
		group2 = parseInt(viewOptions.group1);

		viewOptions.group1 = group1;
		viewOptions.group2 = group2;
		updateURL(viewOptions);

		a = groupOneStart;
		b = groupOneEnd;
		groupOneStart = groupTwoStart;
		groupOneEnd = groupTwoEnd;
		groupTwoStart = a;
		groupTwoEnd = b;

		group2_length = groupTwoEnd - groupTwoStart;
		group1_length = groupOneEnd - groupOneStart;
	}


	// Pick sizes so that everything fits on the screen
	// and cells are square, with sides < 24px
	if ((window.innerWidth - 120) / 3 > window.innerHeight - 120) {
		// constrained by width
		var square = ((window.innerWidth - 120) / 3) / group2_length;
	} else {
		// constrained by height
		var square = (window.innerHeight - 120) / group1_length;
	}
	if (square > 24) {
		square = 24;
	}
	var width = square * group2_length;
	var height = square * group1_length;

	// var width = 400;
	//  var height = 400;



	var svgStyle = ".background {\
      fill: none;\
    }\
    \
    line {\
      stroke: #BDBDBD;\
    }\
    \
    text.active {\
      fill: red;\
      font-size: 15;\
      font-weight: bold;\
    }";

	//d3.select("#matrix").select("svg").remove();

	//var margin = {top: 80, right: 0, bottom: 0, left: 150};

	var margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};

	var x = d3.scale.ordinal().rangeBands([0, width]),
		y = d3.scale.ordinal().rangeBands([0, height]),
		z = d3.scale.linear().domain([0, 4]).clamp(true),
		c = d3.scale.category10().domain(d3.range(10));

	d3.select("#chordGraph").select("svg").remove();



	var svg = d3.select("#chordGraph").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		//.style("margin-left", -margin.left + "px")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Apply the CSS styling
	d3.select("#chordGraph").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var matrix = [];
	nodes = new Array();
	//n = nodes.length;


	// first, create two arrays of nodes
	for (var i = 0; i < json.nodes.length; i++) {
		var residueNum = json.nodes[i].residueNum;

		if (residueNum <= groupOneEnd && residueNum >= groupOneStart) {
			nodes[(residueNum - groupOneStart)] = json.nodes[i];
		}

		// not an else if, as one residue may span two secodnary elements
		// eg. HELIX3 & HELIX4 share resi 9
		if (residueNum <= groupTwoEnd && residueNum >= groupTwoStart) {
			nodes[(groupOneEnd - groupOneStart) + 1 + (residueNum - groupTwoStart)] = json.nodes[i];

		}
	}


	nodes.forEach(function(node, i) {
		node.index = i;
		node.count = 0;
	});
	var n = nodes.length;

	for (var i = 0; i <= (groupOneEnd - groupOneStart); i++) {
		matrix[i] = d3.range(group2_length + 1).map(function(j) {
			return {
				x: j,
				y: i,
				z: 0
			};
		}); // DEBUG +1
	}

	// then fill in the matrix[index within group1][index within group 2].z = number of edges between this pair of residues
	count = 0;
	for (var i = 0; i < json.links.length; i++) {
		targetResidue = parseInt(json.nodes[json.links[i].target].residueNum);
		sourceResidue = parseInt(json.nodes[json.links[i].source].residueNum);

		// target in group 1, source in group2
		if (((targetResidue <= groupOneEnd && targetResidue >= groupOneStart) && (sourceResidue <= groupTwoEnd && sourceResidue >= groupTwoStart))) {

			if (!matrix[targetResidue - groupOneStart]) {
				matrix[targetResidue - groupOneStart] = new Array();
			}
			matrix[targetResidue - groupOneStart][sourceResidue - groupTwoStart].z = json.links[i].value;

			//console.log("target "+targetResidue+"\t"+groupOneStart+"\t"+sourceResidue+"\t"+groupTwoStart+"\t"+matrix[targetResidue - groupOneStart][sourceResidue - groupTwoStart].z);
		}

		// source in group1, target in group2
		if (((sourceResidue <= groupOneEnd && sourceResidue >= groupOneStart) && (targetResidue <= groupTwoEnd && targetResidue >= groupTwoStart))) {
			if (!matrix[sourceResidue - groupOneStart]) {
				matrix[sourceResidue - groupOneStart] = new Array();
			}

			matrix[sourceResidue - groupOneStart][targetResidue - groupTwoStart].z = json.links[i].value;
			//console.log("source "+targetResidue+"\t"+groupOneStart+"\t"+sourceResidue+"\t"+groupTwoStart+"\t"+matrix[targetResidue - groupOneStart][sourceResidue - groupTwoStart].z);
		}
	}

	//console.log(matrix[12][2].z+"\t"+matrix[12][3].z+"\t"+matrix[12][4].z);

	x.domain(d3.range((groupTwoEnd - groupTwoStart) + 1));
	y.domain(d3.range((groupOneEnd - groupOneStart) + 1));

	//alert(matrix[5][5].z);

	var maxMatrixEntry = 0;

	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {

			// store the largest off-diagonal value, for use in setting up the color scale
			if ((matrix[i][j].z > maxMatrixEntry) && (i != j)) {
				maxMatrixEntry = matrix[i][j].z;
			}
		}
	}

	//CHANGE AS IN SUBMATRIX
	var color = d3.scale.quantize()
		.domain([0, maxMatrixEntry])
		.range(colorbrewer.Greys[9].slice(2)); // remove the white color from the grey color scale


	svg.append("rect")
		.attr("class", "background")
		.attr("width", width)
		.attr("height", height);

	// Transpose the matrix (data to which rows and columns should be bound to transposes of each other)
	var matrixT = new Array();
	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {
			if (!matrixT[j]) {
				matrixT[j] = new Array();
			}
			matrixT[j][i] = matrix[i][j];
		}
	}

	var color1;
	var color2;

	var color1f;
	var color2f;

	if (json.groupsloops[viewOptions.group1].name[2] == "L") {
		color1f = "#C1BFBF";
		color1 = parseInt("#C1BFBF".substr(1), 16);
	} else {
		for (var i = 0; i < json.groups.length; i++) {
			if (json.groups[i].name == json.groupsloops[viewOptions.group1].name) {
				color1f = fill(i);
				color1 = parseInt(fill(i).substr(1), 16);
			}
		}
	}

	if (json.groupsloops[viewOptions.group2].name[2] == "L") {
		color2f = "#C1BFBF";
		color2 = parseInt("#C1BFBF".substr(1), 16);
	} else {
		for (var i = 0; i < json.groups.length; i++) {
			if (json.groups[i].name == json.groupsloops[viewOptions.group2].name) {
				color2f = fill(i);
				color2 = parseInt(fill(i).substr(1), 16);
			}
		}
	}

	var row = svg.selectAll(".row")
		.data(matrix)
		.enter().append("g")
		.attr("class", "row")
		.attr("transform", function(d, i) {
			return "translate(0," + y(i) + ")";
		})
		.each(row);

	// Add a line below each row
	row.append("line")
		.attr("x2", width);

	// Add an extra line, below the bottom row
	row.filter(function(d, i) {
			return i == row[0].length - 1;
		})
		.append("line")
		.attr("x2", width)
		.attr("y1", y.rangeBand() - 1)
		.attr("y2", y.rangeBand() - 1)


	//THE NEW WAY OF ADDING THE ROW NAMES TO MAKE THEM STATIC WHILE THE MATRIX CAN BE SCROLLED
	d3.select("#rowtext2").select("svg").remove();
	var svgtext45 = d3.select("#rowtext2").append("svg")
		.attr("width", 100)
		.attr("height", height + 100)
		.append("g");

	// Apply the CSS styling
	d3.select("#rowtext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var row45 = svgtext45.selectAll(".row45")
		.data(matrix)
		.enter().append("g")
		.attr("transform", function(d, i) {
			return "translate(0," + y(i) + ")";
		});

	row45.append("text")
		.attr("x", 40)
		.attr("y", y.rangeBand() / 2)
		.attr("dy", ".32em")
		.attr("text-anchor", "end")
		.attr("class", "row_title")
		// .attr("fill", fill(viewOptions.group1))
		.attr("fill", function(d) {

			if (json.groupsloops[viewOptions.group1].name[2] == "L") {
				return "#C1BFBF";
			} else {
				for (var i = 0; i < json.groups.length; i++) {
					if (json.groups[i].name == json.groupsloops[viewOptions.group1].name) {
						return fill(i);
					}
				}

			}
			//fill(viewOptions.group1);
		})
		.text(function(d, i) {
			if (first != second) {
				if (nodes[i] != null) {
					return first + ":" + nodes[i].name;
				}
			} else {
				if (nodes[i] != null) {
					return nodes[i].name;
				}
			}
		})

	.style("cursor", "pointer")
		// .attr("onclick", function(d, i) {
		.on("click", function(d, i) {

			d3.select("#chordGraph").selectAll(".cell").style("stroke", "");
			d3.select("#chordGraph").selectAll(".cell").filter(function(p, index) {
				if (p.y === i) {
					return true;
				}
			}).style("stroke", "red").style("stroke-width", "2px");

			d3.select("#rowtext2").selectAll(".row_title").style("fill", "");
			d3.select("#coltext2").selectAll(".col_title").style("fill", "");

			d3.select("#rowtext2").selectAll(".row_title").filter(function(p, index) {
				if (i === index) {
					return true;
				}
			}).style("fill", "red").style("font-weight", "bold");


			highlighted = [];
			colors = [];

			highlighted.push(nodes[i].residueNum);

			colors.push(color1);
			viewOptions.chains = [first, second];


			for (var am = 0; am < json.links.length; am++) {
				//console.log(json.links[am].target+"\t"+json.nodes[json.links[am].target].residueNum+ "\t"+ nodes[i].residueNum);
				if (json.nodes[json.links[am].target].residueNum == nodes[i].residueNum) {

					if (json.groupsloops[viewOptions.group2].start <= parseInt(json.nodes[json.links[am].source].residueNum) && parseInt(json.nodes[json.links[am].source].residueNum) <= json.groupsloops[viewOptions.group2].end) {

						highlighted.push(json.nodes[json.links[am].source].residueNum);
						colors.push(color2);
					}
					//break;
				}
				if (json.nodes[json.links[am].source].residueNum == nodes[i].residueNum) {

					if (json.groupsloops[viewOptions.group2].start <= parseInt(json.nodes[json.links[am].target].residueNum) && parseInt(json.nodes[json.links[am].target].residueNum) <= json.groupsloops[viewOptions.group2].end) {

						highlighted.push(json.nodes[json.links[am].target].residueNum);
						colors.push(color2);
					}
				}
			}

			viewOptions.highlighted = highlighted;
			viewOptions.colors = colors;

			updateURL(viewOptions);

			reDrawProtein(viewOptions.highlighted, viewOptions.colors);

		});


	var column = svg.selectAll(".column")
		.data(matrixT)
		.enter().append("g")
		.attr("class", "column")
		.attr("transform", function(d, i) {
			return "translate(" + x(i) + ")rotate(-90)";
		});


	// Add a line to the left of each column
	column.append("line")
		.attr("x1", -height);

	// Add an extra line, to the right of the rightmost column
	column.filter(function(d, i) {
			return i == column[0].length - 1;
		})
		.append("line")
		.attr("x1", -height)
		.attr("y1", x.rangeBand() - 1)
		.attr("y2", x.rangeBand() - 1)

	//THE NEW WAY OF ADDING THE COLUMN NAMES TO MAKE THEM STATIC WHILE THE MATRIX CAN BE SCROLLED
	d3.select("#coltext2").select("svg").remove();
	var svgtext45c = d3.select("#coltext2").append("svg")
		.attr("width", width + 100)
		.attr("height", 80)
		.append("g");

	// Apply the CSS styling
	d3.select("#coltext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var col45 = svgtext45c.selectAll(".col45")
		.data(matrixT)
		.enter().append("g")
		.attr("transform", function(d, i) {
			return "translate(" + x(i) + ")rotate(-90)";
		});

	col45.append("text")
		.attr("x", -40)
		.attr("y", x.rangeBand() / 2)
		.attr("dy", ".32em")
		.attr("text-anchor", "start")
		.attr("class", "col_title")
		.attr("fill", function(d) {

			if (json.groupsloops[viewOptions.group2].name[2] == "L") {
				return "#C1BFBF";
			} else {
				for (var i = 0; i < json.groups.length; i++) {
					if (json.groups[i].name == json.groupsloops[viewOptions.group2].name) {
						return fill(i);
					}
				}

			}
			//fill(viewOptions.group1);
		})
		//.attr("fill", fill(viewOptions.group2))
		.text(function(d, i) {
			if (first != second) {
				if (nodes[i + (group1_length+1)] != null) {
					return second + ":" + nodes[i + (group1_length+1)].name;
				}
			} else {
				if (nodes[i + (group1_length+1)] != null) {
					return nodes[i + (group1_length+1)].name;
				}
			}
		})
		.style("cursor", "pointer")
		.on("click", function(d, i) {

			d3.select("#chordGraph").selectAll(".cell").style("stroke", "");
			d3.select("#chordGraph").selectAll(".cell").filter(function(p, index) {
				if (p.x === i) {
					return true;
				}
			}).style("stroke", "red").style("stroke-width", "2px");

			d3.select("#coltext2").selectAll(".col_title").style("fill", "");
			d3.select("#rowtext2").selectAll(".row_title").style("fill", "");

			d3.select("#coltext2").selectAll(".col_title").filter(function(p, index) { /* console.log(index+"\t"+i); */
				if (i === index) {
					return true;
				}
			}).style("fill", "red").style("font-weight", "bold");


			highlighted = [];
			colors = [];

			highlighted.push(nodes[i + (group1_length+1)].residueNum);

			colors.push(color2);
			viewOptions.chains = [first, second];


			for (var am = 0; am < json.links.length; am++) {
				//console.log(json.links[am].target+"\t"+json.nodes[json.links[am].target].residueNum+ "\t"+ nodes[i].residueNum);
				if (json.nodes[json.links[am].target].residueNum == nodes[i + (group1_length+1)].residueNum) {

					if (json.groupsloops[viewOptions.group1].start <= parseInt(json.nodes[json.links[am].source].residueNum) && parseInt(json.nodes[json.links[am].source].residueNum) <= json.groupsloops[viewOptions.group1].end) {

						highlighted.push(json.nodes[json.links[am].source].residueNum);
						colors.push(color1);
					}
					//break;
				}
				if (json.nodes[json.links[am].source].residueNum == nodes[i + (group1_length+1)].residueNum) {

					if (json.groupsloops[viewOptions.group1].start <= parseInt(json.nodes[json.links[am].target].residueNum) && parseInt(json.nodes[json.links[am].target].residueNum) <= json.groupsloops[viewOptions.group1].end) {

						highlighted.push(json.nodes[json.links[am].target].residueNum);
						colors.push(color1);
					}
				}
			}

			viewOptions.highlighted = highlighted;
			viewOptions.colors = colors;

			updateURL(viewOptions);

			reDrawProtein(viewOptions.highlighted, viewOptions.colors);

		});

	//////////////////PROTEIN PROTEIN PROTEIN

	//ADD NAMES ON PROTEIN VIEW CONTENT LAST COLUMN

	d3.select("#contenttext2").select("svg").remove();
	var svgtext2 = d3.select("#contenttext2").append("svg")
		.attr("width", 500)
		.attr("height", 30)
		.append("g");
	// Apply the CSS styling
	d3.select("#contenttext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var text = svgtext2.append("text");

	text.append("tspan")
		.attr("x", 340)
		.attr("y", 20)
		.attr("dy", ".32em")
		.attr("text-anchor", "end")
		.text(json.name + " > ")
		.style("font-weight", "bold")
		.attr("fill", "black");


	text.append("tspan")
		.attr("dy", ".02em")
		.attr("text-anchor", "end")
		.text(json.groupsloops[group1].name)
		.style("font-weight", "bold")
		.attr("fill", function(d) {

			if (json.groupsloops[viewOptions.group1].name[2] == "L") {
				return "#C1BFBF";
			} else {
				for (var i = 0; i < json.groups.length; i++) {
					if (json.groups[i].name == json.groupsloops[viewOptions.group1].name) {
						return fill(i);
					}
				}

			}

		});
	// .attr("fill", fill(viewOptions.group1));

	text.append("tspan")
		.attr("dy", ".02em")
		.attr("text-anchor", "end")
		.text(" - ")
		.style("font-weight", "bold")
		.attr("fill", "black");

	text.append("tspan")
		.attr("dy", ".02em")
		.attr("text-anchor", "end")
		.text(json.groupsloops[group2].name)
		.style("font-weight", "bold")
		.attr("fill", function(d) {

			if (json.groupsloops[viewOptions.group2].name[2] == "L") {
				return "#C1BFBF";
			} else {
				for (var i = 0; i < json.groups.length; i++) {
					if (json.groups[i].name == json.groupsloops[viewOptions.group2].name) {
						return fill(i);
					}
				}

			}

		});
	// .attr("fill", fill(viewOptions.group2));

	//////////////////////////////PROTEIN PROTEIN PROTEIN

	//FOR PYMOL SCRIPT CREATION

	function row(row) {

		var cell = d3.select(this).selectAll(".cell")
			.data(row.filter(function(d) {
				return d.z;
			}))
			.enter().append("rect")
			.attr("class", "cell")
			.attr("id", function(d) {
				return "cell" + d.x + "-" + d.y;
			})
			.attr("x", function(d) {
				return x(d.x);
			})
			.attr("width", x.rangeBand())
			.attr("height", y.rangeBand())
			//.style("fill", "gray")//ORIGINAL
			.style("fill", function(d) {
				return color(matrix[d.y][d.x].z)
			}) //DIFFERENT COLORS THEN BLACK AND WHITE
			.style("opacity", 1.0)
			.style("cursor", "pointer")
			.on("click", click)
			.on("mouseover", mouseover)
			.on("mouseout", mouseout);
		// .append("title")
		//        .text(function(d) {
		//            return matrix[d.y][d.x].z + " atomic contacts between " + nodes[d.y].name + " and " + nodes[d.x + (group2_length)].name;
		//        });

		// Label each cell with the number of contact it represents
		var thisRow = this;
		d3.select(this).selectAll(".cell").each(function(datum) {
			d3.select(thisRow)
				.append("text")
				.text(datum.z)
				.style("fill", "white")
				.style("cursor", "pointer")
				//.style("position", "absolute")
				//.style("z-index", -1)
				.attr("x", x(datum.x) + x.rangeBand() / 2)
				.attr("y", +y.rangeBand() * 0.6)
				.attr("text-anchor", "middle")
				.on("click", function(p) {

						viewOptions.highlighted = [nodes[datum.y].residueNum, nodes[datum.x + (group1_length+1)].residueNum];
						viewOptions.colors = [color1,color2]
						viewOptions.chains = [first, second];

						updateURL(viewOptions);

						d3.select("#chordGraph").selectAll(".cell").style("stroke", "");
						d3.select("#chordGraph").selectAll(".cell").filter(function(d, index) {
							if (datum.x === d.x && datum.y === d.y) {
								return true;
							}
						}).style("stroke", "red").style("stroke-width", "2px");

						d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "");

						d3.select("#pymolseqs1").selectAll(".mytxt").filter(function(d, index) {
							if (nodes[datum.x + (group1_length+1)].name === json.nodes[index].name || nodes[datum.y].name === json.nodes[index].name) {
								return true;
							}
						}).style("fill", "red").style("font-weight", "bold");

						reDrawProtein(viewOptions.highlighted, [color1,color2]);

						//ADD NAMES ON PROTEIN VIEW CONTENT LAST COLUMN

						d3.select("#contenttext2").select("svg").remove();
						var svgtext2 = d3.select("#contenttext2").append("svg")
							.attr("width", 500)
							.attr("height", 30)
							.append("g");
						// Apply the CSS styling
						d3.select("#contenttext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

						var text = svgtext2.append("text");

						text.append("tspan")
							.attr("x", 360)
							.attr("y", 20)
							.attr("dy", ".32em")
							.attr("text-anchor", "end")
							.text(json.name + " > ")
							.style("font-weight", "bold")
							.attr("fill", "black");


						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(json.groupsloops[group1].name)
							.style("font-weight", "bold")
							.attr("fill", function(d) {

								if (json.groupsloops[viewOptions.group1].name[2] == "L") {
									return "#C1BFBF";
								} else {
									for (var i = 0; i < json.groups.length; i++) {
										if (json.groups[i].name == json.groupsloops[viewOptions.group1].name) {
											return fill(i);
										}
									}

								}

							});

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(" - ")
							.style("font-weight", "bold")
							.attr("fill", "black");

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(json.groupsloops[group2].name)
							.style("font-weight", "bold")
							.attr("fill", function(d) {

								if (json.groupsloops[viewOptions.group2].name[2] == "L") {
									return "#C1BFBF";
								} else {
									for (var i = 0; i < json.groups.length; i++) {
										if (json.groups[i].name == json.groupsloops[viewOptions.group2].name) {
											return fill(i);
										}
									}

								}

							});

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(" > ")
							.style("font-weight", "bold")
							.attr("fill", "black");

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(nodes[datum.y].name)
							.style("font-weight", "bold")
							.attr("fill", function(d) {

								if (json.groupsloops[viewOptions.group1].name[2] == "L") {
									return "#C1BFBF";
								} else {
									for (var i = 0; i < json.groups.length; i++) {
										if (json.groups[i].name == json.groupsloops[viewOptions.group1].name) {
											return fill(i);
										}
									}

								}

							});

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(" - ")
							.style("font-weight", "bold")
							.attr("fill", "black");

						text.append("tspan")
							.attr("dy", ".02em")
							.attr("text-anchor", "end")
							.text(nodes[datum.x + (group1_length+1)].name)
							.style("font-weight", "bold")
							.attr("fill", function(d) {

								if (json.groupsloops[viewOptions.group2].name[2] == "L") {
									return "#C1BFBF";
								} else {
									for (var i = 0; i < json.groups.length; i++) {
										if (json.groups[i].name == json.groupsloops[viewOptions.group2].name) {
											return fill(i);
										}
									}

								}

							});

						//////////////////
						//FOR PYMOL SCRIPT CREATION


					}

				)
				.on("mouseover", function(p) {
						d3.select("#coltext2").selectAll(".col_title").style("fill", "");
						d3.select("#rowtext2").selectAll(".row_title").style("fill", "");

						d3.select("#rowtext2").selectAll(".row_title").classed("active", function(d, i) {
							return i == datum.y;
						});
						d3.select("#coltext2").selectAll(".col_title").classed("active", function(d, i) {
							return i == datum.x;
						});


						////////ADDED TOOLTIP WHEN HOVERED ON THE MATRIX CELLS, FINE WHEN THE MATRIX IS SMALL, BUT WHEN IT IS LARGE AND SCROLLED, THE POSITION OF THE TOOLTIP CHANGES A LOT
						// var xPosition = parseFloat(d3.select(this).attr("x"));
// 						var yPosition = parseFloat(d3.select(this).attr("y")) + 10 * datum.y + 250;
//
// 						d3.select("#tooltip")
// 							.style("left", xPosition + "px")
// 							.style("top", yPosition + "px")
// 							.select("#value")
// 							.text(function(d) {
// 								return matrix[datum.y][datum.x].z + " atomic contacts between " + nodes[datum.y].name + " and " + nodes[datum.x + (group1_length+1)].name;
// 							});
//
//
// 						//Show the tooltip
// 						d3.select("#tooltip").classed("hidden", false);
					}

				)
				.on("mouseout", mouseout)
				// .append("title")
				// 	        .text(function(d) {
				// 	            return matrix[datum.y][datum.x].z + " atomic contacts between " + nodes[datum.y].name + " and " + nodes[datum.x + (group2_length)].name;
				// 	        })
		});

	}

	function mouseover(p) { //alert("aa");

		d3.select("#coltext2").selectAll(".col_title").style("fill", "");
		d3.select("#rowtext2").selectAll(".row_title").style("fill", "");

		d3.select("#rowtext2").selectAll(".row_title").classed("active", function(d, i) {
			return i == p.y;
		});
		d3.select("#coltext2").selectAll(".col_title").classed("active", function(d, i) {
			return i == p.x;
		});



		////////ADDED TOOLTIP WHEN HOVERED ON THE MATRIX CELLS, FINE WHEN THE MATRIX IS SMALL, BUT WHEN IT IS LARGE AND SCROLLED, THE POSITION OF THE TOOLTIP CHANGES A LOT
		// var xPosition = parseFloat(d3.select(this).attr("x"));
// 		var yPosition = parseFloat(d3.select(this).attr("y")) + 10 * datum.y + 250;

		// d3.select("#tooltip")
// 			.style("left", xPosition + "px")
// 			.style("top", yPosition + "px")
// 			.select("#value")
// 			.text(function(d) {
// 				return matrix[datum.y][datum.x].z + " atomic contacts between " + nodes[datum.y].name + " and " + nodes[datum.x + (group2_length)].name;
// 			});
//
//
// 		//Show the tooltip
// 		d3.select("#tooltip").classed("hidden", false);
	}

	function mouseout() {
		d3.selectAll("text").classed("active", false);
		//d3.select("#tooltip").classed("hidden", true);
	}

	function click(p) {
		viewOptions.highlighted = [nodes[p.y].residueNum, nodes[p.x + (group1_length+1)].residueNum];
		viewOptions.colors = [color1,color2];
		viewOptions.chains = [first, second];

		updateURL(viewOptions);

		d3.select("#chordGraph").selectAll(".cell").style("stroke", "");
		d3.select("#chordGraph").selectAll(".cell").filter(function(d, index) {
			if (p.x === d.x && p.y === d.y) {
				return true;
			}
		}).style("stroke", "red").style("stroke-width", "2px");

		d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "");

		d3.select("#pymolseqs1").selectAll(".mytxt").filter(function(d, index) {
			if (nodes[p.x + (group1_length+1)].name === json.nodes[index].name || nodes[p.y].name === json.nodes[index].name) {
				return true;
			}
		}).style("fill", "red").style("font-weight", "bold");


		reDrawProtein(viewOptions.highlighted, [color1,color2]);


		//ADD NAMES ON PROTEIN VIEW CONTENT LAST COLUMN

		d3.select("#contenttext2").select("svg").remove();
		var svgtext2 = d3.select("#contenttext2").append("svg")
			.attr("width", 500)
			.attr("height", 30)
			.append("g");
		// Apply the CSS styling
		d3.select("#contenttext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);

		var text = svgtext2.append("text");

		text.append("tspan")
			.attr("x", 360)
			.attr("y", 20)
			.attr("dy", ".32em")
			.attr("text-anchor", "end")
			.text(json.name + " > ")
			.style("font-weight", "bold")
			.attr("fill", "black");


		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(json.groupsloops[group1].name)
			.style("font-weight", "bold")
			.attr("fill", color1f);

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(" - ")
			.style("font-weight", "bold")
			.attr("fill", "black");

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(json.groupsloops[group2].name)
			.style("font-weight", "bold")
			.attr("fill", color2f);

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(" > ")
			.style("font-weight", "bold")
			.attr("fill", "black");

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(nodes[p.y].name)
			.style("font-weight", "bold")
			.attr("fill", color1f);

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(" - ")
			.style("font-weight", "bold")
			.attr("fill", "black");

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(nodes[p.x + (group1_length+1)].name)
			.style("font-weight", "bold")
			.attr("fill", color2f);



		//////////////////
		//FOR PYMOL SCRIPT CREATION

	}


	addDownloadLink("chordGraph");

}

///////////////////////////////////END OF DRAWMATRIXLOOP

function drawChord(f) {

	d3.select("#ssline").selectAll("svg").remove();

	//without loops
	viewOptions.type = 0;

	updateURL(viewOptions);

	//addGroupContactLink();
	addAtomicContactLink();
	//addResidueContactLink();

	//addReport();

	d3.select("#rowtext").select("svg").remove();
	d3.select("#contenttext").select("svg").remove();
	d3.select("#matrix").select("svg").remove();

	d3.select("#screenshot2").selectAll(".svg-pic").remove();
	$("#chord_button").css("display", "none");

	// Update subtitle
	d3.select("#chord").selectAll("h3").remove();
	// d3.select("#chord").insert("h3", "#altViews").text("Chord Plot")

	// Show option to show interactions within an element
	d3.select("#selfConnectionsDiv").style("visibility", "visible");

	d3.select("#loopDiv").style("visibility", "visible");

	// //ORIGINAL SIZE
	var r1 = width / 2,
		r0 = r1 - 120;

	var chord = d3.layout.chord()
		.padding(.04)
		.sortSubgroups(d3.descending)
		.sortChords(d3.descending);

	var arc = d3.svg.arc()
		.innerRadius(r0)
		.outerRadius(r0 + 20);

	// Delete old SVG and create a new one
	d3.select("#chordGraph").select("svg").remove();
	d3.select("#chordGraph_real").select("svg").remove();

	var svg = d3.select("#chordGraph_real").append("svg:svg")
		// .attr("width", 450)
		//    .attr("height", 450)
		.attr("id","mysvgID")
		.attr("viewBox", "0 0 450 450")
		.attr("preserveAspectRatio", "xMidYMid meet")
		.append("svg:g")
		.attr("transform", "translate(" + r1 + "," + r1 + ")");

	// if we're passed group data, use that instead of what's in the file
	if (viewOptions.groups) {
		json.groups = JSON.parse(viewOptions.groups);
	}

	if (first == second) {

		var matrixData = getData(json, "secondary_matrix", 1);

	} else {

		var matrixData = getData(json, "secondary_matrix", -1);
	}

	if (matrixData.length == 0) {
		alert("residues are all in loops");
	}

	//alert("matrix data " + matrixData[4][6]);

	// remove connections within domains unless user checks box to see them
	if (!document.getElementById("displaySelfConnections").checked) {
		for (var i = 0; i < matrixData.length; i++) {
			//alert(json.groups[i].name);
			//THIS IF CASE ADDED FOR NUCLEIC ACID WITHIN CHAIN DISPLAY, IF ONE CHAIN SELECTED WHICH IS NA, then display by default within structure interaction
			if (json.groups[i].name.indexOf('NucleicAcid') == -1) {
				matrixData[i][i] = 0;
			}
		}
	}

	chord.matrix(matrixData);

	var g = svg.selectAll("g.group")
		.data(chord.groups)
		.enter().append("svg:g")
		.attr("class", "group");

	// add the circular arcs that represent each node
	g.append("svg:path")
		.style("fill", function(d) {
			return fill(d.index);
		})
		.style("stroke", function(d) {
			return fill(d.index);
		})
		.style("cursor", "pointer")
		.attr("d", arc)
		.attr("class", "arc")
		.on("mouseover", function(d, i) { // d contains datum for moused-over item, d the datum for every arc being compared to it

			if(viewOptions.hasOwnProperty("chordclick")){

			}
			else{
				svg.selectAll("path.chord").style("opacity", 1.0);

				svg.selectAll("path.chord").filter(function(d) {
						return d.source.index != i && d.target.index != i;
					}).transition().style("opacity", 0.1)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				svgline.selectAll(".rectcell").filter(function(d) {
						return d.index == i;
					}).transition().style("stroke", "black").attr("stroke-width", 2)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				svgline.selectAll(".rectcell").filter(function(d) {
						return d.index != i;
					}).transition().style("stroke", function(d) {
						return d3.rgb(fill(d.index));
					})
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
				d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
						if (i === index) {
							return true;
						}
					}).transition().style("stroke", "black").attr("stroke-width", 2)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				for (var y = 0; y < json.nodes.length; y++) {

					if (json.nodes[y].residueNum == json.groups[i].start) {

						//console.log("y and i are "+y+"\t"+i);
						//800 is the speed, first one is the horizontal axis
						$("#pymolseqs").scrollTo((y * 9), 800);
						break;
					}
				}

				updateSplomSecondaryStructureLine(d.index);

				viewOptions["group1"] = d.index;
				viewOptions["group2"] = d.index;
				//viewOptions["check"] = 1;

				updateURL(viewOptions);
				reDrawProtein([], []);

			}

		})
		.on("mouseout", function (d,i) { // d contains datum for moused-over item, d the datum for every arc being compared to it
			if(viewOptions.hasOwnProperty("chordclick")){

			}
			else{
		       svg.selectAll("path.chord").transition().style("opacity", 1).each("end",  partial(addDownloadLink, 'chordGraph_real') );
				//svg.selectAll("path.chord").filter(function(data) { return data.source.index != d.source.index || data.target.index != d.target.index; }).transition().style("opacity", 0.1).each("end");
			}
		   })
		.on("click", function(d, i) {

			//viewOptions.chordclick="yes";

			if(viewOptions.chordclick=="yes"){
					switchView('chord');
			}

			svg.selectAll("path.chord").style("opacity", 1.0);

			svg.selectAll("path.chord").filter(function(d) {
					return d.source.index != i && d.target.index != i;
				}).transition().style("opacity", 0.1)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			svgline.selectAll(".rectcell").filter(function(d) {
					return d.index == i;
				}).transition().style("stroke", "black").attr("stroke-width", 2)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			svgline.selectAll(".rectcell").filter(function(d) {
					return d.index != i;
				}).transition().style("stroke", function(d) {
					return d3.rgb(fill(d.index));
				})
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
			d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
					if (i === index) {
						return true;
					}
				}).transition().style("stroke", "black").attr("stroke-width", 2)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			for (var y = 0; y < json.nodes.length; y++) {

				if (json.nodes[y].residueNum == json.groups[i].start) {

					//console.log("y and i are "+y+"\t"+i);
					//800 is the speed, first one is the horizontal axis
					$("#pymolseqs").scrollTo((y * 9), 800);
					break;
				}
			}

			updateSplomSecondaryStructureLine(d.index);

			viewOptions["group1"] = d.index;
			viewOptions["group2"] = d.index;
			//viewOptions["check"] = 1;

			updateURL(viewOptions);
			reDrawProtein([], []);

		})
		.append("title").text(function(d) { // d contains datum for moused-over item, d the datum for every arc being compared to it
			//svg.selectAll(".arc").filter(function(data) {

			var str = json.groups[d.index].name;

			if (str.indexOf('HELIX') > -1) {
				var str2 = str.replace("HELIX", "H");
			} else if (str.indexOf('SHEET') > -1) {
				var str2 = str.replace("SHEET", "S");
			} else if (str.indexOf('LOOP') > -1) {
				var str2 = str.replace("LOOP", "L");
			} else if (str.indexOf('NucleicAcid') > -1) {
				var str2 = str.replace("NucleicAcid", "NA");
			}
			else{
				var str2 = str;
			}

			if (first == second) {
				var strchain = first + ":";
				str2 = str2.replace(strchain, "");
				//alert(str2);
			}
			//$( "#pdbid" ).animate({ "opacity": "1" }, "fast" );
			return str2 + "(" + json.groups[d.index].start + "-" + json.groups[d.index].end + ")";
			//return data.index == d.index; }).transition().style("opacity", 0.1).each("end");


		});

	// add the labels for each node
	g.append("svg:text")
		.each(function(d) {
			d.angle = (d.startAngle + d.endAngle) / 2;
		})
		.attr("dy", ".35em")
		.attr("text-anchor", function(d) {
			return d.angle > Math.PI ? "end" : null;
		})
		.attr("transform", function(d) {
			return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + (r0 + 26) + ")" + (d.angle > Math.PI ? "rotate(180)" : "");
		})
		.text(function(d) {

			var str = json.groups[d.index].name;

			if (str.indexOf('HELIX') > -1) {
				var str2 = str.replace("HELIX", "H");
			} else if (str.indexOf('SHEET') > -1) {
				var str2 = str.replace("SHEET", "S");
			} else if (str.indexOf('LOOP') > -1) {
				var str2 = str.replace("LOOP", "L");
			} else if (str.indexOf('NucleicAcid') > -1) {
				var str2 = str.replace("NucleicAcid", "NA");
			}
			else{
				var str2 = str;
			}

			if (first == second) {
				var strchain = first + ":";
				str2 = str2.replace(strchain, "");
				//alert(str2);
			}

			//return str2 + "(" + json.groups[d.index].start + "-" + json.groups[d.index].end + ")";
			return str2;

		});

	// add the chords representing each edge
	svg.selectAll("path.chord")
		.data(chord.chords)
		.enter().append("svg:path")
		.attr("class", "chord")
		.style("stroke", function(d) {
			return d3.rgb(fill(d.source.index)).darker();
		})
		.style("fill", function(d) {
			return fill(d.source.index);
		})
		.style("opacity", function(d) {

			if (f == "null") {
				return 1.0;
			} else if (json.groups[d.source.index].name == f) {

				return 1.0;
			} else {
				return 0.1;
			}
		})
		.style("cursor", "pointer")
		.attr("d", d3.svg.chord().radius(r0))
		.on("mouseover", function(d, i) { // d contains datum for moused-over item, d the datum for every arc being compared to it

			if(viewOptions.hasOwnProperty("chordclick")){

			}
			else{
				viewOptions["group1"] = d.source.index;
				viewOptions["group2"] = d.target.index;
				//viewOptions["check"] = 1;

				updateURL(viewOptions);
				reDrawProtein([], []);


				svg.selectAll("path.chord").filter(function(data) {
					return data.source.index != d.source.index || data.target.index != d.target.index;
				}).transition().style("opacity", 0.1).each("end");
				svg.selectAll("path.chord").filter(function(data) {
					return data.source.index == d.source.index && data.target.index == d.target.index;
				}).transition().style("opacity", 1).each("end");

			}

		})
	.on("mouseout", function (d,i) { // d contains datum for moused-over item, d the datum for every arc being compared to it
		if(viewOptions.hasOwnProperty("chordclick")){

		}
		else{
	       svg.selectAll("path.chord").transition().style("opacity", 1).each("end",  partial(addDownloadLink, 'chordGraph_real') );
			//svg.selectAll("path.chord").filter(function(data) { return data.source.index != d.source.index || data.target.index != d.target.index; }).transition().style("opacity", 0.1).each("end");
		}
	   })
	.append("title").text(function(d) {
		var source = d.source.index;
		var target = d.target.index;

		return matrixData[source][target] + " atomic contacts."
	});

	// THIS PART IS ADDED SO THAT THE CHORD PLOT CAN BE SEEN ON RIGHT HAND CORNER EVERYTIME MATRIX SHOWS UP THIS DOESN'T WORK IN FUNCTION BELOW, SO SEPEARETED THEM
	svg.selectAll("path.chord").on("click", function(d, i) {

		if(viewOptions.chordclick=="yes"){
			switchView('chord');
		}

		viewOptions.chordclick="yes";
		updateURL(viewOptions);

		svg.selectAll("path.chord").filter(function(data) {
				return data.source.index != d.source.index || data.target.index != d.target.index;
			}).transition().style("opacity", 0.1)
			.each("end", partial(addDownloadLink, 'chordGraph_real'));

		svg.selectAll("path.chord").filter(function(data) {
				return data.source.index == d.source.index && data.target.index == d.target.index;
			}).transition().style("opacity", 1)
			.each("end", partial(addDownloadLink, 'chordGraph_real'));

		svgline.selectAll(".rectcell").filter(function(data) {
				return data.index == d.source.index || data.index == d.target.index;
			}).transition().style("stroke", "black").attr("stroke-width", 2)
			.each("end", partial(addDownloadLink, 'chordGraph_real'));

		svgline.selectAll(".rectcell").filter(function(data) {
				return data.index != d.source.index && data.index != d.target.index;
			}).transition().style("stroke", function(d) {
				return d3.rgb(fill(d.index));
			})
			.each("end", partial(addDownloadLink, 'chordGraph_real'));


		d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
		d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(data, index) {
				if (d.source.index === index || d.target.index === index) {
					return true;
				}
			}).transition().style("stroke", "black").attr("stroke-width", 2)
			.each("end", partial(addDownloadLink, 'chordGraph_real'));

		for (var y = 0; y < json.nodes.length; y++) {

			if (json.nodes[y].residueNum == json.groups[d.source.index].start) {

				//console.log("y and i are "+y+"\t"+i);
				//800 is the speed, first one is the horizontal axis
				$("#pymolseqs").scrollTo((y * 9), 800);
				break;
			}
		}
		$(".block").css("top", "0");
		$(".block").css("left", "0");
		$(".block").css("width", "200px");
		$(".block").css("height", "200px");
		$("#chord_button").css("display", "inline-block");

		$("#contactmatrix").css("display", "block");

		//////////////////////////////////////////

		$("#infobox").css("display", "block");

		if (d.source.index != d.target.index) {
			var infotext = "There are <b>" + matrixData[d.source.index][d.target.index] + "</b> contacts between <b><font color=\"" + fill(d.source.index) + "\">" + json.groups[d.source.index].name + "</font></b> and <b><font color=\"" + fill(d.target.index) + "\">" + json.groups[d.target.index].name + "</font></b>";
		} else {
			var infotext = "There are <b>" + matrixData[d.source.index][d.target.index] + "</b> contacts within <b><font color=\"" + fill(d.source.index) + "\">" + json.groups[d.source.index].name + "</font></b>";
		}

		$('#contactpanel').html(infotext);

		/////////////////////////////////////
		$("#contenttext2").animate({
			"opacity": "1"
		}, "fast");
		$("#contenttext").animate({
			"opacity": "1"
		}, "fast");
		//$("#contenttext2").css("display","block");

		removeURLpart("highlighted");
		removeURLpart("colors");

		updateViews(d.source.index, d.target.index);

	});

	// add details of the secondary structural elements to the text box
	//document.getElementById("secondary_ranges").value = JSON.stringify(json.groups);
	// d3.select("#secondary_ranges").attr("rows", json.groups.length);


//THIS PART CREATES THE REDEFINE FIELDS AND REMOVE BUTTONS IN CASE USER WANTS TO CHANGE NUMBER OF SSE
	document.getElementById('elements').innerHTML = "";

	for (var i = 0; i < json.groups.length; i++) {

		//document.getElementById('elements').innerHTML = document.getElementById('elements').innerHTML + "Name: <input type='text' size='10' value='" + json.groups[i].name + "' id='name" + i + "' readonly> Start: <input type='text' value='" + json.groups[i].start + "' maxlength='4' size='4' id='start" + i + "'> End: <input type='text' value='" + json.groups[i].end + "' maxlength='4' size='4' id='end" + i + "'> <br>";
		document.getElementById('elements').innerHTML = document.getElementById('elements').innerHTML + "<div id='ss"+i+"'>Name: <input type='text' size='20' value='" + json.groups[i].name + "' id='name" + i + "'> Start: <input type='text' value='" + json.groups[i].start + "' maxlength='4' size='10' id='start" + i + "'> End: <input type='text' value='" + json.groups[i].end + "' maxlength='4' size='10' id='end"
		+ i + "'> <button type=\"button\" class=\"btn btn-default btn-sm\" id='remove" + i + "' onclick=\"$('#ss"+i+"').remove(); \"><span class=\"glyphicon glyphicon-minus\"></span></button></div>";
	}
	// document.getElementById('elements').innerHTML = document.getElementById('elements').innerHTML + "<button type='button' class='btn btn-primary add' id='add'>Add a new field <span class=\"glyphicon glyphicon-plus\"></span></button>";

	// add download link
	addDownloadLink("chordGraph_real");
	//drawRectangles();
	////////////////////RECTANGLES

	svgline = d3.select("#ssline").append("svg:svg")
		.attr("id", "myssline")
		// .attr("width", "100%")
// 		.attr("height", 50)
		.style("display", "block") //to place svg centered
		.style("margin", "auto") //to place svg centered
		.attr("viewBox", "0 0 1000 45")
		.attr("preserveAspectRatio", "xMidYMid meet")
		.append("svg:g")
		.attr("transform", "translate(" + r1 + "," + r1 + ")");


	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			var str = json.groups[d.index].name;
			if (str.indexOf('HELIX') > -1) {
				var str2 = str.replace("HELIX", "H");
			} else if (str.indexOf('SHEET') > -1) {
				var str2 = str.replace("SHEET", "S");
			} else if (str.indexOf('NucleicAcid') > -1) {
				var str2 = str.replace("NucleicAcid", "NA");
			}
			else{
				var str2 = str;
			}

			var strchain = str[0] + ":";
			str2 = str2.replace(strchain, "");
			str2 = str2 + "(" + json.groups[d.index].start +"-"+ json.groups[d.index].end+")";

			return str2;
			//return "<strong>Frequency:</strong> <span style='color:red'>" + json.groups[d.index].name + "</span>";
		})

	svgline.call(tip);

	var totallength = 0;
	var totalsize = (width * 2) / json.groups.length;

	var gline = svgline.selectAll("g.group")
		.data(chord.groups)
		.enter().append("svg:g")
		.attr("class", "group");

	var glinepath = gline.append("path")
		.attr("class", "rectcell")
		.attr("transform", function(d) {

			var x;
			var y;
			if (d.index == 0) {

				totallength = (width * 2) / json.groups.length + 1;

				x = -210;
			} else {
				var length = -210 + totallength;

				totallength += (width * 2) / json.groups.length + 1;

				x = length;

			}

			y = -210;

			return "translate(" + x + "," + y + ")";
		})
		.attr("d", function(d) {

			//console.log("d.index "+d.index);

			if (json.groups[d.index].name[2] == "S") {
                //return "M0,6.25L" + totalsize / 2 + ",6.25L" + totalsize / 2 + ",0L" + totalsize + ",12.5L" + totalsize / 2 + ",25L" + totalsize / 2 + ",18.75L0,18.75Z";
				return "M5,6.25L" + totalsize / 2 + ",6.25L" + totalsize / 2 + ",0L" + totalsize + ",12.5L" + totalsize / 2 + ",25L" + totalsize / 2 + ",18.75L5,18.75Z";
			} else {
                // return "M0,6.25L" + totalsize + ",6.25L" + totalsize + ",18.75L0,18.75Z";
                //new way of drawing helices, added arcs (A10,10 0 0,1)
                return "M5,6.25L" + totalsize + ",6.25 A10,10 0 0,1 " + totalsize + ",18.75L5,18.75 A10,10 0 0,1 5,6.25";
			}
		})
		.style("cursor", "pointer")
		.style("fill", function(d) {
			return fill(d.index);
		})
		.on("mouseover", function(d, i) { // d contains datum for moused-over item, d the datum for every arc being compared to it
			d3.select("#mysvgID").selectAll("path.chord").style("opacity", 1.0);
			d3.select("#mysvgID").selectAll("path.chord").filter(function(d) {

				if(viewOptions.type==0){
					return d.source.index != i && d.target.index != i;
				}
				else{

					return json.groupsloops[d.source.index].name!=json.groups[i].name && json.groupsloops[d.target.index].name!=json.groups[i].name;

				}

				}).transition().style("opacity", 0.1)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			tip.show(d);
		})
		//	.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
		.on("click", function(d, i) {


			d3.select("#mysvgID").selectAll("path.chord").style("opacity", 1.0);
			d3.select("#mysvgID").selectAll("path.chord").filter(function(d) {

				if(viewOptions.type==0){
					return d.source.index != i && d.target.index != i;
				}
				else{

					return json.groupsloops[d.source.index].name!=json.groups[i].name && json.groupsloops[d.target.index].name!=json.groups[i].name;

				}

				}).transition().style("opacity", 0.1)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));


			d3.select("#myssline").selectAll(".rectcell").filter(function(d) {
					return d.index == i;
				}).transition().style("stroke", "black").attr("stroke-width", 2)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			d3.select("#myssline").selectAll(".rectcell").filter(function(d) {
					return d.index != i;
				}).transition().style("stroke", function(d) {
					return d3.rgb(fill(d.index));
				})
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			// svgline.selectAll("#pymolseqs1").filter(function(d) { return d.index == i; }).transition().style("stroke", "black").attr("stroke-width", 2)
			//  .each("end",  partial(addDownloadLink, 'chordGraph_real') );

			d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");

			d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
					if (i === index) {
						return true;
					}
				}).transition().style("stroke", "black").attr("stroke-width", 2)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

				if(viewOptions.type==0){
					viewOptions["group1"] = d.index;
					viewOptions["group2"] = d.index;
				}

				else{
					for(var a=0;a<json.groupsloops.length;a++){
						if(json.groupsloops[a].name==json.groups[d.index].name){
							viewOptions["group1"] = a;
							viewOptions["group2"] = a;
							break;
						}
					}
				}

			$(".block").css("width", "100%");
			$(".block").css("height", "450px");
			$(".block").css("margin", "0 auto");

			$("#contactmatrix").css("display", "none");
			$("#infobox").css("display", "none");

			updateURL(viewOptions);
			reDrawProtein([], []);


			for (var y = 0; y < json.nodes.length; y++) {

				if (json.nodes[y].residueNum == json.groups[i].start) {

					//console.log("y and i are "+y+"\t"+i);
					//800 is the speed, first one is the horizontal axis
					$("#pymolseqs").scrollTo((y * 9), 800);
					break;
				}
			}

			if (viewOptions.tab == "network") {
				updateSplomSecondaryStructureLine(viewOptions.group1);
			}
		});
	/////////////////////RECTANGLES
}

//function drawRectangles(){}

function drawChordLoops(f) {

	removeURLpart("chordclick");
	updateURL(viewOptions);

	// if(viewOptions.chains[0]!=viewOptions.chains[1]){
	//
	// 		drawChordLoopsBetweenChains();
	// 		return;
	// 	}

	$(".block").css("width", "100%");
	$(".block").css("height", "450px");
	$(".block").css("margin", "0 auto");

	$("#contactmatrix").css("display", "none");
	$("#chord_button").css("display", "none");
	$("#infobox").css("display", "none");


	viewOptions.type = 1;

	updateURL(viewOptions);

	// addGroupContactLink();
	addAtomicContactLink();
	//addResidueContactLink();


	//d3.select("#ssline").selectAll("svg").remove();
	d3.select("#rowtext").select("svg").remove();
	d3.select("#contenttext").select("svg").remove();
	d3.select("#matrix").select("svg").remove();

	//d3.select("#ssline").select("svg").remove();

	d3.select("#screenshot2").selectAll(".svg-pic").remove();

	// Update subtitle
	d3.select("#chord").selectAll("h3").remove();
	// d3.select("#chord").insert("h3", "#altViews").text("Chord Plot")

	// Show option to show interactions within an element
	d3.select("#selfConnectionsDiv").style("visibility", "visible");

	d3.select("#loopDiv").style("visibility", "visible");

	//ORIGINAL SIZE
	var r1 = width / 2,
		r0 = r1 - 120;

	//var r1 = width/2.25,
	//r0 = r1-120;

	var chord = d3.layout.chord()
		.padding(.04)
		.sortSubgroups(d3.descending)
		.sortChords(d3.descending);

	var arc = d3.svg.arc()
		.innerRadius(r0)
		.outerRadius(r0 + 20);

	// Delete old SVG and create a new one
	d3.select("#chordGraph").select("svg").remove();
	d3.select("#chordGraph_real").select("svg").remove();

	var svg = d3.select("#chordGraph_real").append("svg:svg")
		.attr("id","mysvgID")
		.attr("viewBox", "0 0 450 450")
		.attr("preserveAspectRatio", "xMidYMid meet")
		// .style("display","block")//to place svg centered
		// 	.style("margin","auto")//to place svg centered
		.append("svg:g")
		.attr("transform", "translate(" + r1 + "," + r1 + ")");

	// if we're passed group data, use that instead of what's in the file
	if (viewOptions.groups) {
		json.groupsloops = JSON.parse(viewOptions.groups);
	}

	// for(am=0;am<json.groupsloops.length;am++){
// 		console.log("in 1 "+json.groupsloops[am].name);
// 	}
//

	// for(am=0;am<json.groupsloops.length;am++){
// 		console.log(json.groupsloops[am].start);
// 	}

	if (first == second) {

		var matrixData = getData(json, "secondary_matrix_loops", 1);

	} else {
		var matrixData = getData(json, "secondary_matrix_loops", -1);
	}

	if (!document.getElementById("loopInclude").checked) {
		$(".block").css("width", "100%");
		$(".block").css("height", "450px");
		$(".block").css("margin", "0 auto");

		$("#contactmatrix").css("display", "none");
		$("#infobox").css("display", "none");

		drawChord("null");
	}

	//if(matrixData.length == 0){ alert("residues are all in loops");}

	//alert("matrix data " + matrixData[4][6]);

	// remove connections within domains unless user checks box to see them
	if (!document.getElementById("displaySelfConnections").checked) {
		for (var i = 0; i < matrixData.length; i++) {
			//alert(json.groups[i].name);
			//THIS IF CASE ADDED FOR NUCLEIC ACID WITHIN CHAIN DISPLAY, IF ONE CHAIN SELECTED WHICH IS NA, then display by default within structure interaction
			if (json.groupsloops[i].name.indexOf('NucleicAcid') == -1) {
				matrixData[i][i] = 0;
			}

		}
	}


	//alert(json.groups[0].name +"lala"+ json.groups[1].name);

	chord.matrix(matrixData);

	var g = svg.selectAll("g.group")
		.data(chord.groups)
		.enter().append("svg:g")
		.attr("class", "group");

	// add the circular arcs that represent each node
	g.append("svg:path")
		.style("fill", function(d) {
			if (json.groupsloops[d.index].name[2] == "L") {
				return "#C1BFBF";
			} else {
				for (var i = 0; i < json.groups.length; i++) {
					if (json.groups[i].name == json.groupsloops[d.index].name) {
						return fill(i);
					}
				}
			}
		})
		//.style("stroke", function(d) { return fill(d.index); })
		.style("cursor", "pointer")
		.attr("d", arc)
		.on("mouseover", function(d, i) { // d contains datum for moused-over item, d the datum for every arc being compared to it

			if(viewOptions.hasOwnProperty("chordclick")){

			}
			else{

				svg.selectAll("path.chord").style("opacity", 1.0);

				svg.selectAll("path.chord").filter(function(d) {
						return d.source.index != i && d.target.index != i;
					}).transition().style("opacity", 0.1)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				svgline.selectAll(".rectcell").filter(function(d) {

						return json.groups[d.index].name==json.groupsloops[i].name;

					}).transition().style("stroke", "black").attr("stroke-width", 2)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				svgline.selectAll(".rectcell").filter(function(d) {

						return json.groups[d.index].name!=json.groupsloops[i].name;

					}).transition().style("stroke", function(d) {
						return d3.rgb(fill(d.index));
					})
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
				d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
						if (json.groups[index].name===json.groupsloops[i].name) {
							return true;
						}
					}).transition().style("stroke", "black").attr("stroke-width", 2)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

					for (var y = 0; y < json.nodes.length; y++) {

						if(i!=0){
							if (json.groupsloops[i].name[2] == "L") {
								if (json.nodes[y].residueNum == json.groupsloops[i-1].start) {
									$("#pymolseqs").scrollTo((y * 9), 800);
									break;
								}
							}
							else if (json.nodes[y].residueNum == json.groupsloops[i].start) {
								$("#pymolseqs").scrollTo((y * 9), 800);
								break;
							}

						}
						else{
							if (json.groupsloops[i].name[2] == "L") {
									$("#pymolseqs").scrollTo(0, 800);
									break;
							}
							else if (json.nodes[y].residueNum == json.groupsloops[i].start) {
									$("#pymolseqs").scrollTo((y * 9), 800);
									break;
							}
						}
					}

					for(var o=0;o<json.groups.length;o++){
						if(json.groups[o].name==json.groupsloops[d.index].name){
							updateSplomSecondaryStructureLine(o);
							break;
						}
					}

				viewOptions["group1"] = d.index;
				viewOptions["group2"] = d.index;
				//viewOptions["check"] = 1;

				updateURL(viewOptions);
				reDrawProtein([], []);

			}

		})
		.on("mouseout", function (d,i) { // d contains datum for moused-over item, d the datum for every arc being compared to it
			if(viewOptions.hasOwnProperty("chordclick")){

			}
			else{
		       svg.selectAll("path.chord").transition().style("opacity", 1).each("end",  partial(addDownloadLink, 'chordGraph_real') );
				//svg.selectAll("path.chord").filter(function(data) { return data.source.index != d.source.index || data.target.index != d.target.index; }).transition().style("opacity", 0.1).each("end");
			}
		   })
		.on("click", function(d, i) {

			svg.selectAll("path.chord").style("opacity", 1.0);

			svg.selectAll("path.chord").filter(function(d) {
					return d.source.index != i && d.target.index != i;
				}).transition().style("opacity", 0.1)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			svgline.selectAll(".rectcell").filter(function(d) {

					return json.groups[d.index].name==json.groupsloops[i].name;

				}).transition().style("stroke", "black").attr("stroke-width", 2)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			svgline.selectAll(".rectcell").filter(function(d) {

					return json.groups[d.index].name!=json.groupsloops[i].name;

				}).transition().style("stroke", function(d) {
					return d3.rgb(fill(d.index));
				})
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
			d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
					if (json.groups[index].name===json.groupsloops[i].name) {
						return true;
					}
				}).transition().style("stroke", "black").attr("stroke-width", 2)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

				for (var y = 0; y < json.nodes.length; y++) {

					if(i!=0){
						if (json.groupsloops[i].name[2] == "L") {
							if (json.nodes[y].residueNum == json.groupsloops[i-1].start) {
								$("#pymolseqs").scrollTo((y * 9), 800);
								break;
							}
						}
						else if (json.nodes[y].residueNum == json.groupsloops[i].start) {
							$("#pymolseqs").scrollTo((y * 9), 800);
							break;
						}

					}
					else{
						if (json.groupsloops[i].name[2] == "L") {
								$("#pymolseqs").scrollTo(0, 800);
								break;
						}
						else if (json.nodes[y].residueNum == json.groupsloops[i].start) {
								$("#pymolseqs").scrollTo((y * 9), 800);
								break;
						}
					}
				}

				for(var o=0;o<json.groups.length;o++){
					if(json.groups[o].name==json.groupsloops[d.index].name){
						updateSplomSecondaryStructureLine(o);
						break;
					}
				}
			viewOptions["group1"] = d.index;
			viewOptions["group2"] = d.index;
			//viewOptions["check"] = 1;

			updateURL(viewOptions);
			reDrawProtein([], []);

		})
		.append("title").text(function(d) { // d contains datum for moused-over item, d the datum for every arc being compared to it
			//svg.selectAll(".arc").filter(function(data) {

			var str = json.groupsloops[d.index].name;

			if (str.indexOf('HELIX') > -1) {
				var str2 = str.replace("HELIX", "H");
			} else if (str.indexOf('SHEET') > -1) {
				var str2 = str.replace("SHEET", "S");
			} else if (str.indexOf('LOOP') > -1) {
				var str2 = str.replace("LOOP", "L");
			} else if (str.indexOf('NucleicAcid') > -1) {
				var str2 = str.replace("NucleicAcid", "NA");
			}
			else{
				var str2 = str;
			}

			if (first == second) {
				var strchain = first + ":";
				str2 = str2.replace(strchain, "");
				//alert(str2);
			}
			//$( "#pdbid" ).animate({ "opacity": "1" }, "fast" );
			return str2 + "(" + json.groupsloops[d.index].start + "-" + json.groupsloops[d.index].end + ")";
			//return data.index == d.index; }).transition().style("opacity", 0.1).each("end");

		});


	// add the labels for each node
	g.append("svg:text")
		.each(function(d) {
			d.angle = (d.startAngle + d.endAngle) / 2;
		})
		.attr("dy", ".35em")
		.attr("text-anchor", function(d) {
			return d.angle > Math.PI ? "end" : null;
		})
		.attr("transform", function(d) {
			return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + (r0 + 26) + ")" + (d.angle > Math.PI ? "rotate(180)" : "");
		})
		.text(function(d) {

			var str = json.groupsloops[d.index].name;

			if (str.indexOf('HELIX') > -1) {
				var str2 = str.replace("HELIX", "H");
			} else if (str.indexOf('SHEET') > -1) {
				var str2 = str.replace("SHEET", "S");
			} else if (str.indexOf('LOOP') > -1) {
				var str2 = str.replace("LOOP", "L");
			} else if (str.indexOf('NucleicAcid') > -1) {
				var str2 = str.replace("NucleicAcid", "NA");
			}
			else{
				var str2 = str;
			}

			if (first == second) {
				var strchain = first + ":";
				str2 = str2.replace(strchain, "");
			}

			return str2;

		});

	// add the chords representing each edge
	svg.selectAll("path.chord")
		.data(chord.chords)
		.enter().append("svg:path")
		.attr("class", "chord")
		.style("stroke", function(d) {

			if (json.groupsloops[d.source.index].name[2] == "L") {
				return d3.rgb("#C1BFBF").darker();
			} else {
				for (var i = 0; i < json.groups.length; i++) {
					if (json.groups[i].name == json.groupsloops[d.source.index].name) {
						return d3.rgb(fill(i)).darker();
					}
				}

			}
		})
		//.style("fill", function(d) { return fill(d.source.index); })
		.style("fill", function(d) {

			if (json.groupsloops[d.source.index].name[2] == "L") {
				return "#C1BFBF";
			} else {
				for (var i = 0; i < json.groups.length; i++) {
					if (json.groups[i].name == json.groupsloops[d.source.index].name) {
						return fill(i);
					}
				}

			}

		})
		.style("opacity", function(d) {

			if (f == "null") {
				return 1.0;
			} else if (json.groupsloops[d.source.index].name == f) {

				return 1.0;
			} else {
				return 0.1;
			}
		})
		.style("cursor", "pointer")
		.attr("d", d3.svg.chord().radius(r0))

	.on("mouseover", function(d, i) { // d contains datum for moused-over item, d the datum for every arc being compared to it

		if(viewOptions.hasOwnProperty("chordclick")){

		}
		else{
			viewOptions["group1"] = d.source.index;
			viewOptions["group2"] = d.target.index;
			//viewOptions["check"] = 1;

			updateURL(viewOptions);
			reDrawProtein([], []);

			// svgline.selectAll(".rectcell").filter(function(data) {
// 					return json.groups[data.index].name==json.groupsloops[d.source.index].name || json.groups[data.index].name==json.groupsloops[d.target.index].name;
// 					//return data.index == d.source.index || data.index == d.target.index;
// 				}).transition().style("stroke", "black").attr("stroke-width", 2)
// 				.each("end", partial(addDownloadLink, 'chordGraph_real'));
//
// 			svgline.selectAll(".rectcell").filter(function(data) {
// 				return json.groups[data.index].name!=json.groupsloops[d.source.index].name && json.groups[data.index].name!=json.groupsloops[d.target.index].name;
// 					//return data.index != d.source.index && data.index != d.target.index;
// 				}).transition().style("stroke", function(d) {
// 					return d3.rgb(fill(d.index));
// 				})
// 				.each("end", partial(addDownloadLink, 'chordGraph_real'));
//
// 			d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
// 			d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(data, index) {
// 					if (json.groupsloops[d.source.index].name === json.groups[index].name || json.groupsloops[d.target.index].name === json.groups[index].name) {
// 						return true;
// 					}
// 				}).transition().style("stroke", "black").attr("stroke-width", 2)
// 				.each("end", partial(addDownloadLink, 'chordGraph_real'));
//
//
// 				for (var y = 0; y < json.nodes.length; y++) {
//
// 					if(d.source.index!=0){
// 						if (json.groupsloops[d.source.index].name[2] == "L") {
// 							if (json.nodes[y].residueNum == json.groupsloops[d.source.index-1].start) {
// 								$("#pymolseqs").scrollTo((y * 9), 800);
// 								break;
// 							}
// 						}
// 						else if (json.nodes[y].residueNum == json.groupsloops[d.source.index].start) {
// 							$("#pymolseqs").scrollTo((y * 9), 800);
// 							break;
// 						}
//
// 					}
// 					else{
// 						if (json.groupsloops[d.source.index].name[2] == "L") {
// 								$("#pymolseqs").scrollTo(0, 800);
// 								break;
// 						}
// 						else if (json.nodes[y].residueNum == json.groupsloops[d.source.index].start) {
// 								$("#pymolseqs").scrollTo((y * 9), 800);
// 								break;
// 						}
// 					}
// 				}

			svg.selectAll("path.chord").filter(function(data) {
				return data.source.index != d.source.index || data.target.index != d.target.index;
			}).transition().style("opacity", 0.1).each("end");
			svg.selectAll("path.chord").filter(function(data) {
				return data.source.index == d.source.index && data.target.index == d.target.index;
			}).transition().style("opacity", 1).each("end");
		}
	})
	.on("mouseout", function (d,i) { // d contains datum for moused-over item, d the datum for every arc being compared to it
		if(viewOptions.hasOwnProperty("chordclick")){

		}
		else{
	       svg.selectAll("path.chord").transition().style("opacity", 1).each("end",  partial(addDownloadLink, 'chordGraph_real') );
			//svg.selectAll("path.chord").filter(function(data) { return data.source.index != d.source.index || data.target.index != d.target.index; }).transition().style("opacity", 0.1).each("end");
		}
	   })
	.append("title").text(function(d) {
		var source = d.source.index;
		var target = d.target.index;

		return matrixData[source][target] + " atomic contacts"
	});



	// THIS PART IS ADDED SO THAT THE CHORD PLOT CAN BE SEEN ON RIGHT HAND CORNER EVERYTIME MATRIX SHOWS UP THIS DOESN'T WORK IN FUNCTION BELOW, SO SEPEARETED THEM
	svg.selectAll("path.chord").on("click", function(d, i) {

		viewOptions.chordclick="yes";
		updateURL(viewOptions);

		svg.selectAll("path.chord").filter(function(data) {
				return data.source.index != d.source.index || data.target.index != d.target.index;
			}).transition().style("opacity", 0.1)
			.each("end", partial(addDownloadLink, 'chordGraph_real'));

		svg.selectAll("path.chord").filter(function(data) {
				return data.source.index == d.source.index && data.target.index == d.target.index;
			}).transition().style("opacity", 1)
			.each("end", partial(addDownloadLink, 'chordGraph_real'));

		svgline.selectAll(".rectcell").filter(function(data) {
				return json.groups[data.index].name==json.groupsloops[d.source.index].name || json.groups[data.index].name==json.groupsloops[d.target.index].name;
				//return data.index == d.source.index || data.index == d.target.index;
			}).transition().style("stroke", "black").attr("stroke-width", 2)
			.each("end", partial(addDownloadLink, 'chordGraph_real'));

		svgline.selectAll(".rectcell").filter(function(data) {
			return json.groups[data.index].name!=json.groupsloops[d.source.index].name && json.groups[data.index].name!=json.groupsloops[d.target.index].name;
				//return data.index != d.source.index && data.index != d.target.index;
			}).transition().style("stroke", function(d) {
				return d3.rgb(fill(d.index));
			})
			.each("end", partial(addDownloadLink, 'chordGraph_real'));

		d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
		d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(data, index) {
				if (json.groupsloops[d.source.index].name === json.groups[index].name || json.groupsloops[d.target.index].name === json.groups[index].name) {
					return true;
				}
			}).transition().style("stroke", "black").attr("stroke-width", 2)
			.each("end", partial(addDownloadLink, 'chordGraph_real'));


			for (var y = 0; y < json.nodes.length; y++) {

				if(d.source.index!=0){
					if (json.groupsloops[d.source.index].name[2] == "L") {
						if (json.nodes[y].residueNum == json.groupsloops[d.source.index-1].start) {
							$("#pymolseqs").scrollTo((y * 9), 800);
							break;
						}
					}
					else if (json.nodes[y].residueNum == json.groupsloops[d.source.index].start) {
						$("#pymolseqs").scrollTo((y * 9), 800);
						break;
					}

				}
				else{
					if (json.groupsloops[d.source.index].name[2] == "L") {
							$("#pymolseqs").scrollTo(0, 800);
							break;
					}
					else if (json.nodes[y].residueNum == json.groupsloops[d.source.index].start) {
							$("#pymolseqs").scrollTo((y * 9), 800);
							break;
					}
				}
			}


		$(".block").css("top", "0");
		$(".block").css("left", "0");
		$(".block").css("width", "200px");
		$(".block").css("height", "200px");
		$("#chord_button").css("display", "inline-block");

		$("#contactmatrix").css("display", "block");
		//////////////////////////////////////////

		$("#infobox").css("display", "block");

		var fillcolorsource;
		if (json.groupsloops[d.source.index].name[2] == "L") {
			fillcolorsource = "#C1BFBF";
		} else {
			for (var i = 0; i < json.groups.length; i++) {
				if (json.groups[i].name == json.groupsloops[d.source.index].name) {
					fillcolorsource = fill(i);
				}
			}

		}
		var fillcolortarget;
		if (json.groupsloops[d.target.index].name[2] == "L") {
			fillcolortarget = "#C1BFBF";
		} else {
			for (var i = 0; i < json.groups.length; i++) {
				if (json.groups[i].name == json.groupsloops[d.target.index].name) {
					fillcolortarget = fill(i);
				}
			}

		}

		if (d.source.index != d.target.index) {
			var infotext = "There are <b>" + matrixData[d.source.index][d.target.index] + "</b> contacts between <b><font color=\"" + fillcolorsource + "\">" + json.groupsloops[d.source.index].name + "</font></b> and <b><font color=\"" + fillcolortarget + "\">" + json.groupsloops[d.target.index].name + "</font></b>";
		} else {
			var infotext = "There are <b>" + matrixData[d.source.index][d.target.index] + "</b> contacts within <b><font color=\"" + fillcolorsource + "\">" + json.groupsloops[d.source.index].name + "</font></b>";
		}

		$('#contactpanel').html(infotext);


		/////////////////////////////////////

		$("#contenttext2").animate({
			"opacity": "1"
		}, "fast");
		$("#contenttext").animate({
			"opacity": "1"
		}, "fast");
		//$("#contenttext2").css("display","block");

		removeURLpart("highlighted");
		removeURLpart("colors");

		updateViews(d.source.index, d.target.index);

	});

	// add details of the secondary structural elements to the text box
	// document.getElementById("secondary_ranges").value = JSON.stringify(json.groupsloops);
	// d3.select("#secondary_ranges").attr("rows", json.groupsloops.length);

	for (var i = 0; i < json.groupsloops.length; i++) {
		document.getElementById('elements').innerHTML = document.getElementById('elements').innerHTML + "Name: <input type='text' size='10' value='" + json.groupsloops[i].name + "' id='name" + i + "' readonly> Start: <input type='text' value='" + json.groupsloops[i].start + "' maxlength='4' size='4' id='start" + i + "'> End: <input type='text' value='" + json.groupsloops[i].end + "' maxlength='4' size='4' id='end" + i + "'> <br>";
	}

	// add download link
	addDownloadLink("chordGraph_real");

}

function interchainsChord3() {

	//alert(suffix_pdb);
	viewOptions.type = 1;
	updateURL(viewOptions);

	d3.select("#rowtext").select("svg").remove();
	d3.select("#contenttext").select("svg").remove();
	d3.select("#matrix").select("svg").remove();

	d3.select("#ssline").selectAll("svg").remove();

	d3.select("#screenshot2").selectAll(".svg-pic").remove();

	// Update subtitle
	d3.select("#chord").selectAll("h3").remove();
	// d3.select("#chord").insert("h3", "#altViews").text("Chord Plot")

	// Show option to show interactions within an element
	d3.select("#selfConnectionsDiv").style("visibility", "visible");

	d3.select("#loopDiv").style("visibility", "visible");

	// Delete old SVG and create a new one
	d3.select("#chordGraph").select("svg").remove();
	d3.select("#chordGraph_real").select("svg").remove();

	//ORIGINAL SIZE
	var r1 = width / 2,
		r0 = r1 - 120;

	//////original

	var chordouter = d3.layout.chord()
		.padding(0.04)
		.sortSubgroups(d3.descending)
		.sortChords(d3.descending);

	var arcout = d3.svg.arc()
		.innerRadius(r0)
		.outerRadius(r0 + 20);

	var chordout = d3.layout.chord()
		.padding(0.04)
		.sortSubgroups(d3.descending)
		.sortChords(d3.descending);

	//FOR ALL THE PRESENT NODES, WE CREATE A MATRIX FOR RESIDUES WITH INTERACTIONS
	var matrixchain = [];

	for (var i = 0; i < 2; i++) {
		matrixchain[i] = [];

		for (var j = 0; j < 2; j++) {
			matrixchain[i][j] = 0;
		}
	}

	matrixchain[0][1] = 1;
	matrixchain[1][0] = 1;

	//matrixchain = getDataChains(json);

	// if we're passed group data, use that instead of what's in the file
	if (viewOptions.groups) {
		json.groupsloops = JSON.parse(viewOptions.groups);
	}

	removeDuplicatesLoops();

	/////////////////////
	// This is the part which we get rid of secondary structures with no interactions!

	var check = 0;
	var c = 0;
	var p = 0;

	//sorted the new groups by name so that A chain will come before B
	//jsongroupsnew.sort(function(a, b) { return 2 * (a.name > b.name) - 1; });

	cmp = function(a, b) {
		if (a > b) return +1;
		if (a < b) return -1;
		return 0;
	}

	jsongroupsnew = new Array();
	json_pymolseq = new Array();
	json_pymolseq1 = new Array();
	json_pymolseq2 = new Array();

	for (var y = 0; y < json.groups.length; y++) {

		//we made a new array to copy all json.groups because later json.groups will be updated with only ss with interactions. we want to use this json_pymolseq later
		json_pymolseq[p] = json.groups[y];
		p++;
	}
	json_pymolseq.sort(function(a, b) {
		return cmp(a.name[0], b.name[0]) || cmp(a.start, b.start)
	});

	var x1 = 0;
	var x2 = 0;

	//json_pymolseq arrays are the ones which keep the original json.groups with all the ss both with interactions of all and between chains
	for (var y = 0; y < json_pymolseq.length; y++) {

		if (json_pymolseq[y].name[0] == first) {
			json_pymolseq1[x1] = json_pymolseq[y];
			x1++;
		} else if (json_pymolseq[y].name[0] == second) {
			json_pymolseq2[x2] = json_pymolseq[y];
			x2++;
		}
	}

	var checkNA=0;
	for(var i=0;i<json.groups.length;i++){
		if(json.groups[i].name[2]=="N"){
			checkNA = -1;
			break;
		}
	}
	if(checkNA==-1){
		//addLoopsNucleicAcids();
	}
	else{
		addLastLoop();
	}

	for (var y = 0; y < json.groupsloops.length; y++) {

		check = 0;

		for (var i = 0; i < json.nodes.length; i++) {

			if (json.groupsloops[y].start <= json.nodes[i].residueNum && json.nodes[i].residueNum <= json.groupsloops[y].end && check == 0 && json.nodes[i].chain == json.groupsloops[y].name[0]) {
				jsongroupsnew[c] = json.groupsloops[y];

				//console.log(jsongroupsnew[c].name +"\t"+ jsongroupsnew[c].start +"\t"+ jsongroupsnew[c].end);

				check = -1;
				c++;
			}
		}
	}

	jsongroupsnew.sort(function(a, b) {
        return cmp(a.name[0], b.name[0]) || cmp(a.start, b.start)
    });


   //everything is sorted above, which means, if NA chain is B then it is the last. But we need to put it to first because in the pdb file, it is the first in some cases (1QRS)
  // SO, CHECK if it is NA, if it is then check the above situation, if not matching then put the NA group on top and delete it from the end of the array.
  //the below condition is done only for NAs. If a structure has chains non alphabetical (usually not common) then there will be error.
    if(checkNA==-1){
        if(jsongroupsnew[0].name[0]!=first){

            //add the NA group in the beginning of the array with unshift and remove from end of the array with pop.
            jsongroupsnew.unshift(jsongroupsnew[jsongroupsnew.length-1]);
            jsongroupsnew.pop(jsongroupsnew[jsongroupsnew.length-1]);

        }
    }

	json.groupsloops = jsongroupsnew;


	////////////////////

	if (first == second) {
		var matrixData = getData(json, "secondary_matrix_loops", 1);
	} else {
		var matrixData = getData(json, "secondary_matrix_loops", -1);
	}

	//if(matrixData.length == 0){ alert("residues are all in loops");}

	// remove connections within domains unless user checks box to see them
	if (!document.getElementById("displaySelfConnections").checked) {
		for (var i = 0; i < matrixData.length; i++) {
			//alert(json.groups[i].name);
			//THIS IF CASE ADDED FOR NUCLEIC ACID WITHIN CHAIN DISPLAY, IF ONE CHAIN SELECTED WHICH IS NA, then display by default within structure interaction
			if (json.groupsloops[i].name.indexOf('NucleicAcid') == -1) {
				matrixData[i][i] = 0;
			}
		}
	}

	//FOR ALL THE PRESENT NODES, WE CREATE A MATRIX FOR RESIDUES WITH INTERACTIONS
	var matrixinner = [];

	for (var i = 0; i < json.nodes.length; i++) {
		matrixinner[i] = [];

		for (var j = 0; j < json.nodes.length; j++) {
			matrixinner[i][j] = 0;
		}
	}

	for (var i = 0; i < json.links.length; i++) {

		var source = parseInt(json.nodes[json.links[i].source].residueNum);
		var target = parseInt(json.nodes[json.links[i].target].residueNum);

		var check1 = 0;
		var check2 = 0;

		var source2;
		var target2;

		for (var y = 0; y < json.groupsloops.length; y++) {

			if (json.groupsloops[y].start <= source && source <= json.groupsloops[y].end && json.nodes[json.links[i].source].chain == json.groupsloops[y].name[0]) {

				check1 = -1;
				//c++;
				source2 = json.links[i].source;
			}

			if (json.groupsloops[y].start <= target && target <= json.groupsloops[y].end && json.nodes[json.links[i].target].chain == json.groupsloops[y].name[0]) {

				target2 = json.links[i].target;
				check2 = -1;
			}
		}

		if (check1 == -1 && check2 == -1) {
			matrixinner[source2][target2] = parseInt(json.links[i].value);
			//console.log(json.links[i].source +"\t"+ json.links[i].target+"\t"+matrixinner[json.links[i].source][json.links[i].target] +"\t"+source +"\t"+target);

		}
		check1 = 0;
		check2 = 0;

	}

	var nodesnew = new Array();
	var check = 0;
	var check2 = 0;
	var x = 0;
	var y = 0;
	var n = 0;

	for (var z = 0; z < json.nodes.length; z++) {

		for (var i = 0; i < matrixinner.length; i++) {

			//check=0;

			for (var j = 0; j < matrixinner[i].length; j++) {
				//console.log(i+"\t"+j+"\t"+matrixinner[i][j]);
				//check2=0;

				if (matrixinner[i][j] != 0 && i == z && check != i) {

					nodesnew[n] = json.nodes[z];
					n++;
					check = i;
				}

				if (matrixinner[i][j] != 0 && j == z && check2 != j && check != j) {

					nodesnew[n] = json.nodes[z];
					n++;
					check2 = j;
				}

			}

		}
	}

	//sort residues by first chain , then residue numbers to display correctly on chord plot
	cmp = function(a, b) {
		if (a > b) return +1;
		if (a < b) return -1;
		return 0;
	}

	nodesnew.sort(function(a, b) {
		return cmp(a.chain, b.chain) || cmp(a.residueNum, b.residueNum)
	});


	check = 0;
	check2 = 0;
	var x = 0;
	var y = 0;
	n = 0;

	var chain1StartAngle;
	var chain1EndAngle;
	var chain2StartAngle;
	var chain2EndAngle;

	var svg = d3.select("#chordGraph_real").append("svg:svg")
		//.attr("id","mysvgID")
		.attr("viewBox", "0 0 450 450")
		.attr("preserveAspectRatio", "xMidYMid meet")
		.append("svg:g")
		.attr("transform", "translate(" + r1 + "," + r1 + ")");

	var angle = d3.scale.ordinal().domain(d3.range(0, nodesnew.length)).rangeBands([0, 2 * Math.PI]);

	svg.each(function(matrix, j) {
		var svg = d3.select(this);
		//chordin.matrix(matrixinnerUPDATE);
		chordout.matrix(matrixData);
		chordouter.matrix(matrixchain);

		// add secondary structure groups
		var areaGroups = svg.selectAll("g.area-group")
			.data(chordout.groups)
			.enter()
			.append("svg:g")
			.attr("class", "area-group");
		// Add the area group arc
		areaGroups.append("svg:path")
			.style("fill", function(d) {

				if (json.groupsloops[d.index].name[2] == "L") {
					return "#C1BFBF";
				} else {
					for (var am = 0; am < json_pymolseq1.length; am++) {
						if (json_pymolseq1[am].name == json.groupsloops[d.index].name) {
							return fill(am);
						}
					}
					for (var am = 0; am < json_pymolseq2.length; am++) {
						if (json_pymolseq2[am].name == json.groupsloops[d.index].name) {
							return fill2(am);
						}
					}
				}
			})
			.style("stroke", function(d) {

				if (json.groupsloops[d.index].name[2] == "L") {
					return "#C1BFBF";
				} else {

					for (var am = 0; am < json_pymolseq1.length; am++) {
						if (json_pymolseq1[am].name == json.groupsloops[d.index].name) {
							return fill(am);
						}
					}
					for (var am = 0; am < json_pymolseq2.length; am++) {
						if (json_pymolseq2[am].name == json.groupsloops[d.index].name) {
							return fill2(am);
						}
					}

				}
			})
			.style("cursor", "pointer")
			.attr("d", arcout)
			.on("mouseover", function(d, i) { // d contains datum for moused-over item, d the datum for every arc being compared to it

				if(viewOptions.hasOwnProperty("chordclick")){

				}
				else{

					svg.selectAll("path.chord").style("opacity", 1.0);

					svg.selectAll("path.chord").filter(function(d) {
							return d.source.index != i && d.target.index != i;
						}).transition().style("opacity", 0.1)
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					svgline.selectAll(".rectcell").filter(function(d,index) {

							return json_pymolseq1[index].name==json.groupsloops[i].name;

						}).transition().style("stroke", "black").attr("stroke-width", 2)
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					svgline.selectAll(".rectcell").filter(function(d,index) {

							return json_pymolseq1[index].name!=json.groupsloops[i].name;

						}).transition().style("stroke", "")
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					svgline2.selectAll(".rectcell2").filter(function(d,index) {

							return json_pymolseq2[index].name==json.groupsloops[i].name;

						}).transition().style("stroke", "black").attr("stroke-width", 2)
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					svgline2.selectAll(".rectcell2").filter(function(d,index) {

							return json_pymolseq2[index].name!=json.groupsloops[i].name;

						}).transition().style("stroke","")
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
					d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
							if (json_pymolseq1[index].name===json.groupsloops[i].name) {
								return true;
							}
						}).transition().style("stroke", "black").attr("stroke-width", 2)
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

					d3.select("#pymolseqs2").selectAll(".rectcell2").style("stroke", "");
					d3.select("#pymolseqs2").selectAll(".rectcell2").filter(function(d, index) {
							if (json_pymolseq2[index].name===json.groupsloops[i].name) {
								return true;
							}
						}).transition().style("stroke", "black").attr("stroke-width", 2)
						.each("end", partial(addDownloadLink, 'chordGraph_real'));

						if(json.groupsloops[i].name[0]==viewOptions.chains[0]){
							for (var y = 0; y < jsonSour.nodes.length; y++) {

								if(i!=0){
									if (json.groupsloops[i].name[2] == "L") {
										if (jsonSour.nodes[y].residueNum == json.groupsloops[i-1].start) {
											$("#pymolseqs").scrollTo((y * 9), 800);
											break;
										}
									}
									else if (jsonSour.nodes[y].residueNum == json.groupsloops[i].start) {
										$("#pymolseqs").scrollTo((y * 9), 800);
										break;
									}

								}
								else{
									if (json.groupsloops[i].name[2] == "L") {
											$("#pymolseqs").scrollTo(0, 800);
											break;
									}
									else if (jsonSour.nodes[y].residueNum == json.groupsloops[i].start) {
											$("#pymolseqs").scrollTo((y * 9), 800);
											break;
									}
								}
							}

							//FOR NOW NOT WORKING , FIX THIS
							// for(var o=0;o<json_pymolseq1.length;o++){
	// 							if(json_pymolseq1[o].name==json.groupsloops[d.index].name){
	// 								updateSplomSecondaryStructureLineBetweenChains(o,0);
	// 								break;
	// 							}
	// 						}

						}
						else{
							for (var y = 0; y < jsonTarg.nodes.length; y++) {

								if(i!=0){
									if (json.groupsloops[i].name[2] == "L") {
										if (jsonTarg.nodes[y].residueNum == json.groupsloops[i-1].start) {
											$("#pymolseqs").scrollTo((y * 9), 800);
											break;
										}
									}
									else if (jsonTarg.nodes[y].residueNum == json.groupsloops[i].start) {
										$("#pymolseqs").scrollTo((y * 9), 800);
										break;
									}

								}
								else{
									if (json.groupsloops[i].name[2] == "L") {
										$("#pymolseqs").scrollTo(0, 800);
										break;
									}
									else if (jsonTarg.nodes[y].residueNum == json.groupsloops[i].start) {
										$("#pymolseqs").scrollTo((y * 9), 800);
										break;
									}
								}
							}
							//FOR NOW NOT WORKING , FIX THIS
							// for(var o=0;o<json_pymolseq2.length;o++){
	// 							if(json_pymolseq2[o].name==json.groupsloops[d.index].name){
	// 								updateSplomSecondaryStructureLineBetweenChains(o,1);
	// 								break;
	// 							}
	// 						}
						}

					viewOptions["group1"] = d.index;
					viewOptions["group2"] = d.index;
					//viewOptions["check"] = 1;
					updateURL(viewOptions);
					reDrawProtein([], []);

				}

			})
			.on("mouseout", function (d,i) { // d contains datum for moused-over item, d the datum for every arc being compared to it
				if(viewOptions.hasOwnProperty("chordclick")){

				}
				else{
			       svg.selectAll("path.chord").transition().style("opacity", 1).each("end",  partial(addDownloadLink, 'chordGraph_real') );
					//svg.selectAll("path.chord").filter(function(data) { return data.source.index != d.source.index || data.target.index != d.target.index; }).transition().style("opacity", 0.1).each("end");
				}
			   })
			.on("click", function(d, i) {

				// if(viewOptions.chordclick=="yes"){
// 						switchView('chord');
// 				}

				svg.selectAll("path.chord").style("opacity", 1.0);

				svg.selectAll("path.chord").filter(function(d) {
						return d.source.index != i && d.target.index != i;
					}).transition().style("opacity", 0.1)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				svgline.selectAll(".rectcell").filter(function(d,index) {

						return json_pymolseq1[index].name==json.groupsloops[i].name;

					}).transition().style("stroke", "black").attr("stroke-width", 2)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				svgline.selectAll(".rectcell").filter(function(d,index) {

						return json_pymolseq1[index].name!=json.groupsloops[i].name;

					}).transition().style("stroke", "")
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				svgline2.selectAll(".rectcell2").filter(function(d,index) {

						return json_pymolseq2[index].name==json.groupsloops[i].name;

					}).transition().style("stroke", "black").attr("stroke-width", 2)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				svgline2.selectAll(".rectcell2").filter(function(d,index) {

						return json_pymolseq2[index].name!=json.groupsloops[i].name;

					}).transition().style("stroke","")
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
				d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
						if (json_pymolseq1[index].name===json.groupsloops[i].name) {
							return true;
						}
					}).transition().style("stroke", "black").attr("stroke-width", 2)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				d3.select("#pymolseqs2").selectAll(".rectcell2").style("stroke", "");
				d3.select("#pymolseqs2").selectAll(".rectcell2").filter(function(d, index) {
						if (json_pymolseq2[index].name===json.groupsloops[i].name) {
							return true;
						}
					}).transition().style("stroke", "black").attr("stroke-width", 2)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

					if(json.groupsloops[i].name[0]==viewOptions.chains[0]){
						for (var y = 0; y < jsonSour.nodes.length; y++) {

							if(i!=0){
								if (json.groupsloops[i].name[2] == "L") {
									if (jsonSour.nodes[y].residueNum == json.groupsloops[i-1].start) {
										$("#pymolseqs").scrollTo((y * 9), 800);
										break;
									}
								}
								else if (jsonSour.nodes[y].residueNum == json.groupsloops[i].start) {
									$("#pymolseqs").scrollTo((y * 9), 800);
									break;
								}

							}
							else{
								if (json.groupsloops[i].name[2] == "L") {
										$("#pymolseqs").scrollTo(0, 800);
										break;
								}
								else if (jsonSour.nodes[y].residueNum == json.groupsloops[i].start) {
										$("#pymolseqs").scrollTo((y * 9), 800);
										break;
								}
							}
						}

						//FOR NOW NOT WORKING , FIX THIS
						// for(var o=0;o<json_pymolseq1.length;o++){
// 							if(json_pymolseq1[o].name==json.groupsloops[d.index].name){
// 								updateSplomSecondaryStructureLineBetweenChains(o,0);
// 								break;
// 							}
// 						}

					}
					else{
						for (var y = 0; y < jsonTarg.nodes.length; y++) {

							if(i!=0){
								if (json.groupsloops[i].name[2] == "L") {
									if (jsonTarg.nodes[y].residueNum == json.groupsloops[i-1].start) {
										$("#pymolseqs").scrollTo((y * 9), 800);
										break;
									}
								}
								else if (jsonTarg.nodes[y].residueNum == json.groupsloops[i].start) {
									$("#pymolseqs").scrollTo((y * 9), 800);
									break;
								}

							}
							else{
								if (json.groupsloops[i].name[2] == "L") {
									$("#pymolseqs").scrollTo(0, 800);
									break;
								}
								else if (jsonTarg.nodes[y].residueNum == json.groupsloops[i].start) {
									$("#pymolseqs").scrollTo((y * 9), 800);
									break;
								}
							}
						}
						//FOR NOW NOT WORKING , FIX THIS
						// for(var o=0;o<json_pymolseq2.length;o++){
// 							if(json_pymolseq2[o].name==json.groupsloops[d.index].name){
// 								updateSplomSecondaryStructureLineBetweenChains(o,1);
// 								break;
// 							}
// 						}
					}

				viewOptions["group1"] = d.index;
				viewOptions["group2"] = d.index;
				//viewOptions["check"] = 1;
				updateURL(viewOptions);
				reDrawProtein([], []);

			})
			.append("title").text(function(d) {

				var str = json.groupsloops[d.index].name;

				if (str.indexOf('HELIX') > -1) {
					var str2 = str.replace("HELIX", "H");
				} else if (str.indexOf('SHEET') > -1) {
					var str2 = str.replace("SHEET", "S");
				} else if (str.indexOf('LOOP') > -1) {
					var str2 = str.replace("LOOP", "L");
				} else if (str.indexOf('NucleicAcid') > -1) {
					var str2 = str.replace("NucleicAcid", "NA");
				}
				else{
					var str2 = str;
				}

				if (first == second) {
					var strchain = first + ":";
					str2 = str2.replace(strchain, "");
					//alert(str2);
				}
				return str2 + "(" + json.groupsloops[d.index].start + "-" + json.groupsloops[d.index].end + ")";
				//return str2;

			});

			// for(var am=0;am<json.groupsloops.length;am++){
// 				console.log(json.groupsloops[am].name);
// 			}

		// add the labels for each node

		areaGroups.append("svg:text")
		.each(function(d) {
				d.angle = (d.startAngle + d.endAngle) / 2;

                var n = json.groupsloops[d.index].name.indexOf("NucleicAcid");
				//DEFINING THE ARC ANGLES FOR CHAINS
				if(json.groupsloops.length > 2 ){
					if(d.index==0){
						chain1StartAngle = d.startAngle;
					}
					else if(d.index!=json.groupsloops.length-1 && json.groupsloops[d.index].name[0]!=json.groupsloops[d.index+1].name[0]){
						chain1EndAngle = d.endAngle;
					}
					else if(d.index!=0 && json.groupsloops[d.index].name[0]!=json.groupsloops[d.index-1].name[0] && json.groupsloops[d.index].name[n]!="N"){
						//console.log("JJJJJ "+json.groupsloops[d.index].name +"\t"+ json.groupsloops[d.index-1].name);
                        //console.log("1 "+d.startAngle)
						chain2StartAngle = d.startAngle;
					}
					else if(d.index!=0 && json.groupsloops[d.index].name[0]!=json.groupsloops[d.index-1].name[0] && json.groupsloops[d.index].name[n]=="N"){

						chain2StartAngle = d.startAngle;
                        chain2EndAngle = d.endAngle;
					}
					else if(d.index==json.groupsloops.length-1){

						chain2EndAngle = d.endAngle;
					}
				}
				else{//IF THERE ARE ONLY TWO, 1 SS FROM CHAIN 1 AND 1 SS FROM THE CHAIN 2
					if(d.index==0){
						chain1StartAngle = d.startAngle;
						chain1EndAngle = d.endAngle;
					}
					else if(d.index==json.groupsloops.length-1){
						chain2StartAngle = d.startAngle;
						chain2EndAngle = d.endAngle;
					}
				}
			})
			.attr("dy", ".35em")
			.attr("text-anchor", function(d) {
				return d.angle > Math.PI ? "end" : null;
			})
			.attr("transform", function(d) {
				return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + (r0 + 50) + ")" + (d.angle > Math.PI ? "rotate(180)" : "");
			})
			.text(function(d) {

				var str = json.groupsloops[d.index].name;

				if (str.indexOf('HELIX') > -1) {
					var str2 = str.replace("HELIX", "H");
				} else if (str.indexOf('SHEET') > -1) {
					var str2 = str.replace("SHEET", "S");
				} else if (str.indexOf('LOOP') > -1) {
					var str2 = str.replace("LOOP", "L");
				} else if (str.indexOf('NucleicAcid') > -1) {
					var str2 = str.replace("NucleicAcid", "NA");
				}
				else{
					var str2 = str;
				}

				if (first == second) {
					var strchain = first + ":";
					str2 = str2.replace(strchain, "");
					//alert(str2);
				}

				//return str2 + "(" + json.groups[d.index].start + "-" + json.groups[d.index].end + ")";
				return str2;

			})
			.style("fill", function(d) {

				if (json.groupsloops[d.index].name[2] == "L") {
					return "#C1BFBF";
				} else {
					for (var am = 0; am < json_pymolseq1.length; am++) {
						if (json_pymolseq1[am].name == json.groupsloops[d.index].name) {
							return fill(am);
						}
					}
					for (var am = 0; am < json_pymolseq2.length; am++) {
						if (json_pymolseq2[am].name == json.groupsloops[d.index].name) {
							return fill2(am);
						}
					}
				}

			})
			.style("font-weight", "bold");


		////////////////////////////////////////////
		//HERE, I DEFINED THE START AND END ANGLE OF THE OUTER ARCS OF CHAINS BY CHECKING THE INNER ARC OF SS (FIRST SS STARTANGLE AND LAST SS END ANGLE ETC)
		//	console.log(chain1StartAngle+"\t"+chain1EndAngle+"\t"+chain2StartAngle+"\t"+chain2EndAngle)

		var arcouter = d3.svg.arc()
			.startAngle(function(d) {

				if(d.index==0){
					d.startAngle = chain1StartAngle;
				}
				else{
					d.startAngle = chain2StartAngle;
				}

				return d.startAngle;
			})
     	 	.endAngle(function(d) {
				if(d.index==1){
					d.endAngle = chain2EndAngle;
				}
				else{
					d.endAngle = chain2StartAngle;
				}
				return d.endAngle;
			})
			.innerRadius(r0 + 24)
			.outerRadius(r0 + 44);


		// add chain outer groups
		var chainGroups = svg.selectAll("g.chain-group")
			.data(chordouter.groups)
			.enter()
			.append("svg:g")
			.attr("class", "chain-group");
		// Add the area group arc
		chainGroups.append("svg:path")
			.style("fill", function(d) {
				return fill_chains(d.index);
			})
			.style("stroke", function(d) {
				return fill_chains(d.index);
			})
			.style("cursor", "pointer")
			.attr("d", arcouter);

		// add the labels for each node
		chainGroups.append("svg:text")
			.each(function(d) {
				d.angle = (d.startAngle + d.endAngle) / 2;
			})
			.attr("dy", ".35em")
			.attr("text-anchor", function(d) {
				return d.angle > Math.PI ? "end" : null;
			})
			.attr("transform", function(d) {
				return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + (r0 + 30) + ")" + (d.angle > Math.PI ? "rotate(180)" : "");
			})
			.text(function(d) {

				if (d.index == 0) {
					return first;
				} else {
					return second;
				}

			})
			// .style("fill", function(d) {return "#FFFFFF";})
			.style("font-weight", "bold");

			////////////////////////////////////////////


		// Add chords between secondary structures
		svg.selectAll("path.chord")
			.data(chordout.chords)
			.enter()
			.append("svg:path")
			.attr("class", "chord")
			.style("stroke", function(d) {

				if (json.groupsloops[d.source.index].name[2] == "L") {
					return d3.rgb("#C1BFBF").darker();
				} else {

					for (var am = 0; am < json_pymolseq1.length; am++) {
						if (json_pymolseq1[am].name == json.groupsloops[d.source.index].name) {
							return d3.rgb(fill(am)).darker();
						}
					}
					for (var am = 0; am < json_pymolseq2.length; am++) {
						if (json_pymolseq2[am].name == json.groupsloops[d.source.index].name) {
							return d3.rgb(fill2(am)).darker();
						}
					}
				}
			})
			.style("fill", function(d) {
				if (json.groupsloops[d.source.index].name[2] == "L") {
					return "#C1BFBF";
				} else {

					for (var am = 0; am < json_pymolseq1.length; am++) {
						if (json_pymolseq1[am].name == json.groupsloops[d.source.index].name) {
							return fill(am);
						}
					}
					for (var am = 0; am < json_pymolseq2.length; am++) {
						if (json_pymolseq2[am].name == json.groupsloops[d.source.index].name) {
							return fill2(am);
						}
					}

				}
			})
			.style("cursor", "pointer")
			.attr("d", d3.svg.chord().radius(r0))

			.on("mouseover", function(d, i) { // d contains datum for moused-over item, d the datum for every arc being compared to it

				if(viewOptions.hasOwnProperty("chordclick")){

				}
				else{

					viewOptions["group1"] = d.source.index;
					viewOptions["group2"] = d.target.index;
					//viewOptions["check"] = 1;

					updateURL(viewOptions);
					reDrawProtein([], []);

					svg.selectAll("path.chord").filter(function(data) {
						return data.source.index != d.source.index || data.target.index != d.target.index;
					}).transition().style("opacity", 0.1).each("end");
					svg.selectAll("path.chord").filter(function(data) {
						return data.source.index == d.source.index && data.target.index == d.target.index;
					}).transition().style("opacity", 1).each("end");
				}

			})
			.on("mouseout", function (d,i) { // d contains datum for moused-over item, d the datum for every arc being compared to it
			if(viewOptions.hasOwnProperty("chordclick")){

			}
			else{
		       svg.selectAll("path.chord").transition().style("opacity", 1).each("end",  partial(addDownloadLink, 'chordGraph_real') );
			}
		   });

		var source_idx;
		var target_idx;

		// THIS PART IS ADDED SO THAT THE CHORD PLOT CAN BE SEEN ON RIGHT HAND CORNER EVERYTIME MATRIX SHOWS UP THIS DOESN'T WORK IN FUNCTION BELOW, SO SEPEARETED THEM
		svg.selectAll("path.chord").on("click", function(d, i) {

			// if(viewOptions.chordclick=="yes"){
// 					switchView('chord');
// 			}

			viewOptions.chordclick="yes";
			updateURL(viewOptions);

			$("#chordGraph").animate({
				"opacity": "1"
			}, "fast");

			svg.selectAll("path.chord").style("opacity", 1.0);

			svg.selectAll("path.chord").filter(function(data) {
					return data.source.index != d.source.index || data.target.index != d.target.index;
				}).transition().style("opacity", 0.1)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			$(".block").css("top", "0");
			$(".block").css("left", "0");
			$(".block").css("width", "200px");
			$(".block").css("height", "200px");

			$("#contactmatrix").css("display", "block");

			$("#contenttext2").animate({
				"opacity": "1"
			}, "fast");
			$("#contenttext").animate({
				"opacity": "1"
			}, "fast");
			$("#chord_button").css("display", "inline-block");
			// $("#contenttext2").css("display","block");

			svgline.selectAll(".rectcell").filter(function(data,index) {
					return json_pymolseq1[index].name==json.groupsloops[d.source.index].name || json_pymolseq1[index].name==json.groupsloops[d.target.index].name;
					//return data.index == d.source.index || data.index == d.target.index;
				}).transition().style("stroke", "black").attr("stroke-width", 2)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			svgline.selectAll(".rectcell").filter(function(data,index) {

				return json_pymolseq1[index].name!=json.groupsloops[d.source.index].name && json_pymolseq1[index].name!=json.groupsloops[d.target.index].name;
					//return data.index != d.source.index && data.index != d.target.index;
				}).transition().style("stroke", "")
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

				svgline2.selectAll(".rectcell2").filter(function(data,index) {
						return json_pymolseq2[index].name==json.groupsloops[d.source.index].name || json_pymolseq2[index].name==json.groupsloops[d.target.index].name;
						//return data.index == d.source.index || data.index == d.target.index;
					}).transition().style("stroke", "black").attr("stroke-width", 2)
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

				svgline2.selectAll(".rectcell2").filter(function(data,index) {
					return json_pymolseq2[index].name!=json.groupsloops[d.source.index].name && json_pymolseq2[index].name!=json.groupsloops[d.target.index].name;
						//return data.index != d.source.index && data.index != d.target.index;
					}).transition().style("stroke", "")
					.each("end", partial(addDownloadLink, 'chordGraph_real'));

					for (var y = 0; y < jsonSour.nodes.length; y++) {

						if (jsonSour.nodes[y].chain == viewOptions.chains[0] && jsonSour.nodes[y].residueNum >= json.groupsloops[d.source.index].start && jsonSour.nodes[y].residueNum <= json.groupsloops[d.source.index].end) {

							$("#pymolseqs").scrollTo((y * 9), 800);
							break;
						}
					}

			d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");

			d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(e, index) {
					if (jsongroupsnew[d.source.index].name === json_pymolseq1[index].name) {
						return true;
					}
				}).transition().style("stroke", "black").attr("stroke-width", 2)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			d3.select("#pymolseqs2").selectAll(".rectcell2").style("stroke", "");

			d3.select("#pymolseqs2").selectAll(".rectcell2").filter(function(e, index) {
					if (jsongroupsnew[d.target.index].name === json_pymolseq2[index].name) {
						return true;
					}
				}).transition().style("stroke", "black").attr("stroke-width", 2)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			removeURLpart("highlighted");
			removeURLpart("colors");

			var fillcolorsource;
			if (json.groupsloops[d.source.index].name[2] == "L") {
				fillcolorsource = "#C1BFBF";
			} else {
				for (var i = 0; i < json_pymolseq1.length; i++) {
					if (json_pymolseq1[i].name == json.groupsloops[d.source.index].name) {
						fillcolorsource = fill(i);
						//viewOptions.colorindex1 = i;
						break;
					}
				}

			}
			var fillcolortarget;
			if (json.groupsloops[d.target.index].name[2] == "L") {
				fillcolortarget = "#C1BFBF";
			} else {
				for (var i = 0; i < json_pymolseq2.length; i++) {
					if (json_pymolseq2[i].name == json.groupsloops[d.target.index].name) {
						fillcolortarget = fill2(i);
						//viewOptions.colorindex2 = i;
						break;
					}
				}
			}

			updateURL(viewOptions);

			//////////////////////////////////////////

			$("#infobox").css("display", "block");

			if (d.source.index != d.target.index) {
				var infotext = "There are <b>" + matrixData[d.source.index][d.target.index] + "</b> contacts between <b><font color=\"" + fillcolorsource + "\">" + json.groupsloops[d.source.index].name + "</font></b> and <b><font color=\"" + fillcolortarget + "\">" + json.groupsloops[d.target.index].name + "</font></b>";
			} else {
				var infotext = "There are <b>" + matrixData[d.source.index][d.target.index] + "</b> contacts within <b><font color=\"" + fillcolorsource + "\">" + json.grogroupsloopsups[d.source.index].name + "</font></b>";
			}

			$('#contactpanel').html(infotext);

			/////////////////////////////////////

			updateViews(d.source.index, d.target.index);
		});
	});

	// add details of the secondary structural elements to the text box
	//document.getElementById("secondary_ranges").value = JSON.stringify(json.groups);
	//d3.select("#secondary_ranges").attr("rows", json.groups.length);

	for (var i = 0; i < json.groupsloops.length; i++) {
		document.getElementById('elements').innerHTML = document.getElementById('elements').innerHTML + "Name: <input type='text' size='10' value='" + json.groupsloops[i].name + "' id='name" + i + "' readonly> Start: <input type='text' value='" + json.groupsloops[i].start + "' maxlength='4' size='4' id='start" + i + "'> End: <input type='text' value='" + json.groupsloops[i].end + "' maxlength='4' size='4' id='end" + i + "'> <br>";
	}

	// add download link
	addDownloadLink("chordGraph_real");

	// d3.select("#ssline").html("<h4>" + viewOptions.chains[0] + "</h4>");

	/////////////////////RECTANGLES

	var svgtest = d3.select("#ssline").append("svg:svg")
		.attr("width", "50%")
		.attr("height", 50);

	svgtest.append("text").append("tspan")
		.attr("x", 0)
		.attr("y", 33)
		//.attr("dy", ".32em")
		//.attr("text-anchor", "end")
		.text(viewOptions.chains[0])
		.style("font-weight", "bold")
		.style("font-size", "15px")
		.attr("fill", "black");

	svgline = svgtest.append("svg:g")
		.attr("transform", "translate(" + r1 + "," + r1 + ")");

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			var str = json_pymolseq1[d].name;
			if (str.indexOf('HELIX') > -1) {
				var str2 = str.replace("HELIX", "H");
			} else if (str.indexOf('SHEET') > -1) {
				var str2 = str.replace("SHEET", "S");
			} else if (str.indexOf('NucleicAcid') > -1) {
				var str2 = str.replace("NucleicAcid", "NA");
			}
			else{
				var str2 = str;
			}

			var strchain = str[0] + ":";
			str2 = str2.replace(strchain, "");
			str2 = str2 + "(" + json_pymolseq1[d].start +"-"+ json_pymolseq1[d].end+")";

			return str2;
			//return "<strong>Frequency:</strong> <span style='color:red'>" + json.groups[d.index].name + "</span>";
		})

	svgline.call(tip);

	var totallength = 0;
	var totalsize = (width) / json_pymolseq1.length;
	var length;

	var gline = svgline.selectAll("g.group")
		.data(json_pymolseq1)
		.enter().append("svg:g")
		.attr("class", "group");

	gline.append("path")
		.attr("class", "rectcell")
		.attr("transform", function(d) {

			//console.log(json_pymolseq1[10].name[2]);

			var x;
			var y;
			if (d.index == 0) {

				totallength = (width) / json_pymolseq1.length;
				x = -210;
			} else {
				length = -210 + totallength;
				totallength += (width) / json_pymolseq1.length;
				x = length;

			}

			y = -210;

			return "translate(" + x + "," + y + ")";
		})
		.attr("d", function(d) {

			//console.log(d.name);

			//chord.groups (drawchord() icinde bu rectangles da .data() ya konan) is generic function which is in d3 and has values index. startAngle, endAngle, value. Normally, d.index would work if you called data with chord.groups. but here we want to call it with our array (json_pymolseq1) to show all the groups in chain A and that has variables of start, end and name as in json file. that is why d.index was undefined but d.name would work
			//if(json_pymolseq1[d.index].name[2]=="S"){
			if (d.name[2] == "S") {
				return "M5,6.25L" + totalsize / 2 + ",6.25L" + totalsize / 2 + ",0L" + totalsize + ",12.5L" + totalsize / 2 + ",25L" + totalsize / 2 + ",18.75L5,18.75Z";
			} else {
				//return "M0,6.25L" + totalsize + ",6.25L" + totalsize + ",18.75L0,18.75Z";
                //new way of drawing helices, added arcs (A10,10 0 0,1)
                return "M5,6.25L" + totalsize + ",6.25 A10,10 0 0,1 " + totalsize + ",18.75L5,18.75 A10,10 0 0,1 5,6.25";
			}
		})
		.style("cursor", function(d) {

			var pyindex = 0;

			while (pyindex < c_for_pymolseq) {

				if (array_for_pymolseq_name[pyindex] == d.name) {
					result = "pointer";
					break;

				} else {
					result = null;
				}

				pyindex++;
			}

			return result;

		})
		.style("fill", function(d, i) {

			// var color;
			// 			var pyindex=0;
			//
			// 				while(pyindex<c_for_pymolseq){
			//
			// 					if (array_for_pymolseq_name[pyindex]==d.name) {
			// 						//color =  array_for_pymolseq_color[pyindex];
			// 						color = fill(i);
			// 						break;
			//
			// 					}
			// 					else{
			// 						//color =  d3.rgb(fill(i)).brighter();
			// 						color =  "grey";
			// 					}
			// 					//alert(array_for_pymolseq_name[i] +" aa "+ array_for_pymolseq_color[i]);
			// 					pyindex++;
			// 				}
			//
			// 				return color;
			//
			return fill(i);
		})
		.style("opacity", function(d, i) {

			var opa;
			var pyindex = 0;

			while (pyindex < c_for_pymolseq) {

				if (array_for_pymolseq_name[pyindex] == d.name) {
					//color =  array_for_pymolseq_color[pyindex];
					opa = 1;
					break;

				} else {
					//color =  d3.rgb(fill(i)).brighter();
					opa = 0.2;
				}
				//alert(array_for_pymolseq_name[i] +" aa "+ array_for_pymolseq_color[i]);
				pyindex++;
			}

			return opa;
		})
		.on("mouseover", function(d, i) { // d contains datum for moused-over item, d the datum for every arc being compared to it

			svg.selectAll("path.chord").style("opacity", 1.0);
			svg.selectAll("path.chord").filter(function(d) {

				 return json.groupsloops[d.source.index].name!=json_pymolseq1[i].name && json.groupsloops[d.target.index].name!=json_pymolseq1[i].name;

				}).transition().style("opacity", 0.1)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			tip.show(i);

		})
		.on("mouseout", tip.hide)
		.on("click", function(d, i) {


			svg.selectAll("path.chord").style("opacity", 1.0);
			svg.selectAll("path.chord").filter(function(d) {

				return json.groupsloops[d.source.index].name!=json_pymolseq1[i].name && json.groupsloops[d.target.index].name!=json_pymolseq1[i].name;

					//return d.source.index != i && d.target.index != i;
				}).transition().style("opacity", 0.1)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));


			svgline.selectAll(".rectcell").filter(function(d, o) {
					return o == i;
				}).transition().style("stroke", "black").attr("stroke-width", 2)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			svgline.selectAll(".rectcell").filter(function(d, o) {
					return o != i;
				}).transition().style("stroke", "")
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			// svgline.selectAll("#pymolseqs1").filter(function(d) { return d.index == i; }).transition().style("stroke", "black").attr("stroke-width", 2)
			//  .each("end",  partial(addDownloadLink, 'chordGraph_real') );

			d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
			d3.select("#pymolseqs2").selectAll(".rectcell2").style("stroke", "");
			svgline2.selectAll(".rectcell2").style("stroke", "");

			d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
					if (i === index) {
						return true;
					}
				}).transition().style("stroke", "black").attr("stroke-width", 2)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));


			viewOptions.colorindex1 = i;
			viewOptions.colorindex2 = i;

			$(".block").css("width", "100%");
			$(".block").css("height", "450px");
			$(".block").css("margin", "0 auto");

			$("#contactmatrix").css("display", "none");
			$("#infobox").css("display", "none");

			for (var am = 0; am < json.groupsloops.length; am++) {
				//console.log(array_for_pymolseq_name[am]+"\t"+d.name+"\t"+i);
				if (json.groupsloops[am].name == d.name) {

					viewOptions["group1"] = am;
					viewOptions["group2"] = am;

				}
			}

			updateURL(viewOptions);
			reDrawProtein([], []);

			// viewOptions["group1"] = i;
			//   		viewOptions["group2"] = i;
			//
			//   		updateURL(viewOptions);
			//   		reDrawProtein([], []);

			//for(var y=0;y<json.nodes.length;y++){

			for (var am = 0; am < array_for_pymolseq_name.length; am++) {
				//console.log(array_for_pymolseq_name[am]+"\t"+d.name+"\t"+i);
				if (array_for_pymolseq_name[am] == d.name) {

					//800 is the speed, first one is the horizontal axis
					$("#pymolseqs").scrollTo((json_pymolseq1[i].start * 7), 800);
					break;
					//}
				}
			}
			//}

			if (viewOptions.tab == "network") {
				updateSplomSecondaryStructureLine(viewOptions.group1);
			}

			//$( "#pymolseqs" ).scrollLeft( 200 );

		});
	// .append("title").text( function(d) {
	//
	//       		var str=d.name;
	//       		return str + "(" + d.start + "-" + d.end + ")";
	//
	//           });


	///////////////////////////////////////////////////////////////////////////

	//SECOND CHAIN SS RECTANGLES:

	var svgtest2 = d3.select("#ssline").append("svg:svg")
		.attr("width", "50%")
		.attr("height", 50);

	svgtest2.append("text").append("tspan")
		.attr("x", 0)
		.attr("y", 33)
		//.attr("dy", ".32em")
		//.attr("text-anchor", "end")
		.text(viewOptions.chains[1])
		.style("font-weight", "bold")
		.style("font-size", "15px")
		.attr("fill", "black");

	svgline2 = svgtest2.append("svg:g")
		.attr("transform", "translate(" + r1 + "," + r1 + ")");

	var tip2 = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			var str = json_pymolseq2[d].name;
			if (str.indexOf('HELIX') > -1) {
				var str2 = str.replace("HELIX", "H");
			} else if (str.indexOf('SHEET') > -1) {
				var str2 = str.replace("SHEET", "S");
			} else if (str.indexOf('NucleicAcid') > -1) {
				var str2 = str.replace("NucleicAcid", "NA");
			}
			else{
				var str2 = str;
			}

			var strchain = str[0] + ":";
			str2 = str2.replace(strchain, "");
			str2 = str2 + "(" + json_pymolseq2[d].start +"-"+ json_pymolseq2[d].end+")";

			return str2;
			//return "<strong>Frequency:</strong> <span style='color:red'>" + json.groups[d.index].name + "</span>";
		})

	svgline2.call(tip2);

	totallength = 0;
	totalsize = (width) / json_pymolseq2.length;

	var gline2 = svgline2.selectAll("g.group")
		.data(json_pymolseq2)
		.enter().append("svg:g")
		.attr("class", "group");

	gline2.append("path")
		.attr("class", "rectcell2")
		.attr("transform", function(d) {

			//console.log(json_pymolseq1[10].name[2]);

			var x;
			var y;
			if (d.index == 0) {

				totallength = (width) / json_pymolseq2.length;

				x = length;
			} else {
				length = -210 + totallength;

				totallength += (width) / json_pymolseq2.length;

				x = length;

			}

			y = -210;

			return "translate(" + x + "," + y + ")";
		})
		.attr("d", function(d) {

			if (d.name[2] == "S") {
				return "M5,6.25L" + totalsize / 2 + ",6.25L" + totalsize / 2 + ",0L" + totalsize + ",12.5L" + totalsize / 2 + ",25L" + totalsize / 2 + ",18.75L5,18.75Z";
			} else {
				//return "M0,6.25L" + totalsize + ",6.25L" + totalsize + ",18.75L0,18.75Z";
                //new way of drawing helices, added arcs (A10,10 0 0,1)
                return "M5,6.25L" + totalsize + ",6.25 A10,10 0 0,1 " + totalsize + ",18.75L5,18.75 A10,10 0 0,1 5,6.25";
			}
		})
		.style("cursor", function(d) {

			var pyindex = 0;

			while (pyindex < c_for_pymolseq) {

				if (array_for_pymolseq_name[pyindex] == d.name) {
					result = "pointer";
					break;

				} else {
					result = null;
				}

				pyindex++;
			}

			return result;

		})
		.style("opacity", function(d, i) {

			var opa;
			var pyindex = 0;

			while (pyindex < c_for_pymolseq) {

				if (array_for_pymolseq_name[pyindex] == d.name) {
					//color =  array_for_pymolseq_color[pyindex];
					opa = 1;
					break;

				} else {
					//color =  d3.rgb(fill(i)).brighter();
					opa = 0.2;
				}
				//alert(array_for_pymolseq_name[i] +" aa "+ array_for_pymolseq_color[i]);
				pyindex++;
			}

			return opa;
		})
		.style("fill", function(d, i) {

			// var color;
			//
			// 	  				var pyindex=0;
			//
			// 	  				while(pyindex<c_for_pymolseq){
			//
			// 	  					if (array_for_pymolseq_name[pyindex]==d.name) {
			// 	  						//color =  array_for_pymolseq_color[pyindex];
			// 							color = fill2(i);
			// 							break;
			//
			// 	  					}
			// 	  					else{
			// 	  						color =  "grey";
			// 							//color = d3.rgb(fill2(i)).brighter();
			// 	  					}
			// 	  					//alert(array_for_pymolseq_name[i] +" aa "+ array_for_pymolseq_color[i]);
			// 	  					pyindex++;
			// 	  				}
			//
			// 	  				return color;

			return fill2(i);
		})
		.on("mouseover", function(d, i) { // d contains datum for moused-over item, d the datum for every arc being compared to it

			svg.selectAll("path.chord").style("opacity", 1.0);
			svg.selectAll("path.chord").filter(function(d) {

					return json.groupsloops[d.source.index].name!=json_pymolseq2[i].name && json.groupsloops[d.target.index].name!=json_pymolseq2[i].name;

				}).transition().style("opacity", 0.1)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			tip2.show(i);

		})
		.on("mouseout", tip2.hide)
		.on("click", function(d, i) {


			svg.selectAll("path.chord").style("opacity", 1.0);
			svg.selectAll("path.chord").filter(function(d) {

					return json.groupsloops[d.source.index].name!=json_pymolseq2[i].name && json.groupsloops[d.target.index].name!=json_pymolseq2[i].name;
					//return d.source.index != i && d.target.index != i;
				}).transition().style("opacity", 0.1)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));


			svgline2.selectAll(".rectcell2").filter(function(d, o) {
					return o == i;
				}).transition().style("stroke", "black").attr("stroke-width", 2)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			svgline2.selectAll(".rectcell2").filter(function(d, o) {
					return o != i;
				}).transition().style("stroke", "")
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			// svgline.selectAll("#pymolseqs1").filter(function(d) { return d.index == i; }).transition().style("stroke", "black").attr("stroke-width", 2)
			//  .each("end",  partial(addDownloadLink, 'chordGraph_real') );


			d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
			d3.select("#pymolseqs2").selectAll(".rectcell2").style("stroke", "");
			svgline.selectAll(".rectcell").style("stroke", "");

			d3.select("#pymolseqs2").selectAll(".rectcell2").filter(function(d, index) {
					if (i === index) {
						return true;
					}
				}).transition().style("stroke", "black").attr("stroke-width", 2)
				.each("end", partial(addDownloadLink, 'chordGraph_real'));

			viewOptions.colorindex1 = i;
			viewOptions.colorindex2 = i;

			$(".block").css("width", "100%");
			$(".block").css("height", "450px");
			$(".block").css("margin", "0 auto");

			$("#contactmatrix").css("display", "none");
			$("#infobox").css("display", "none");

			for (var am = 0; am < json.groupsloops.length; am++) {
				//console.log(array_for_pymolseq_name[am]+"\t"+d.name+"\t"+i);
				if (json.groupsloops[am].name == d.name) {

					viewOptions["group1"] = am;
					viewOptions["group2"] = am;

				}
			}

			updateURL(viewOptions);
			reDrawProtein([], []);


			//for(var y=0;y<json.nodes.length;y++){

			for (var am = 0; am < array_for_pymolseq_name.length; am++) {
				//console.log(array_for_pymolseq_name[am]+"\t"+d.name+"\t"+i);
				if (array_for_pymolseq_name[am] == d.name) {

					//800 is the speed, first one is the horizontal axis
					$("#pymolseqs").scrollTo((json_pymolseq2[i].start * 7), 800);
					break;
					//}
				}
			}
			//}

			if (viewOptions.tab == "network") {
				updateSplomSecondaryStructureLine(viewOptions.group1);
			}

			//$( "#pymolseqs" ).scrollLeft( 200 );

		});
	// .append("title").text( function(d) {
	//
	// 	        		var str=d.name;
	// 	        		return str + "(" + d.start + "-" + d.end + ")";
	//
	// 	            });
	//


	/////////////////////RECTANGLES

}

////////////////////////////END OF INTERCHAINSCHORD3

function updateViews(group1, group2) {

	viewOptions["group1"] = group1;
	viewOptions["group2"] = group2;
	//viewOptions["check"] = 1;

	updateURL(viewOptions);

	var svgStyle = ".background {\
      fill: none;\
    }\
    \
    line {\
      stroke: #BDBDBD;\
    }\
    \
    text.active {\
      fill: red;\
      font-size: 15;\
      font-weight: bold;\
    }";

	//ADD NAMES ON MATRIX CONTENT MIDDLE COLUMN

	d3.select("#contenttext").select("svg").remove();
	var svgtext = d3.select("#contenttext").append("svg")
		.attr("width", 500)
		.attr("height", 30)
		.append("g");

	// Apply the CSS styling
	d3.select("#contenttext").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	if (viewOptions.type == 0 && viewOptions.chains[0]==viewOptions.chains[1]) {

		var text = svgtext.append("text");

		text.append("tspan")
			.attr("x", 340)
			.attr("y", 20)
			.attr("dy", ".32em")
			.attr("text-anchor", "end")
			.text(json.name + " > ")
			.style("font-weight", "bold")
			.attr("fill", "black");


		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(json.groups[group1].name)
			.style("font-weight", "bold")
			.attr("fill", fill(viewOptions.group1));

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(" - ")
			.style("font-weight", "bold")
			.attr("fill", "black");

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(json.groups[group2].name)
			.style("font-weight", "bold")
			.attr("fill", fill(viewOptions.group2));

	} else if (viewOptions.type == 1 && viewOptions.chains[0]==viewOptions.chains[1]) {

		var text = svgtext.append("text");

		text.append("tspan")
			.attr("x", 340)
			.attr("y", 20)
			.attr("dy", ".32em")
			.attr("text-anchor", "end")
			.text(json.name + " > ")
			.style("font-weight", "bold")
			.attr("fill", "black");


		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(json.groupsloops[group1].name)
			.style("font-weight", "bold")
			.attr("fill", function(d) {

				if (json.groupsloops[viewOptions.group1].name[2] == "L") {
					return "#C1BFBF";
				} else {
					for (var i = 0; i < json.groups.length; i++) {
						if (json.groups[i].name == json.groupsloops[viewOptions.group1].name) {
							return fill(i);
						}
					}

				}

			});

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(" - ")
			.style("font-weight", "bold")
			.attr("fill", "black");

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(json.groupsloops[group2].name)
			.style("font-weight", "bold")
			.attr("fill", function(d) {

				if (json.groupsloops[viewOptions.group2].name[2] == "L") {
					return "#C1BFBF";
				} else {
					for (var i = 0; i < json.groups.length; i++) {
						if (json.groups[i].name == json.groupsloops[viewOptions.group2].name) {
							return fill(i);
						}
					}

				}

			});
	}

	 if (viewOptions.pdb.indexOf('-') > -1) {

		var text = svgtext.append("text");

		text.append("tspan")
			.attr("x", 340)
			.attr("y", 20)
			.attr("dy", ".32em")
			.attr("text-anchor", "end")
			.text(json.name + " > ")
			.style("font-weight", "bold")
			.attr("fill", "black");


		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(json.groupsloops[group1].name)
			.style("font-weight", "bold")
			.attr("fill", function(d) {

				if (json.groupsloops[viewOptions.group1].name[2] == "L") {
					return "#C1BFBF";
				} else {
					for (var i = 0; i <json_pymolseq1.length; i++) {
						if (json_pymolseq1[i].name == json.groupsloops[viewOptions.group1].name) {
							return fill(i);
						}
					}

				}

			});

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(" - ")
			.style("font-weight", "bold")
			.attr("fill", "black");

		text.append("tspan")
			.attr("dy", ".02em")
			.attr("text-anchor", "end")
			.text(json.groupsloops[group2].name)
			.style("font-weight", "bold")
			.attr("fill", function(d) {

				if (json.groupsloops[viewOptions.group2].name[2] == "L") {
					return "#C1BFBF";
				} else {
					for (var i = 0; i < json_pymolseq2.length; i++) {
						if (json_pymolseq2[i].name == json.groupsloops[viewOptions.group2].name) {
							return fill2(i);
						}
					}

				}

			});

	//	colorChordNames(group1, group2);

		reDrawProtein([], []);

		drawMatrixIntrachains();

	} else {

		colorChordNames(group1, group2);

		reDrawProtein([], []);

		if (viewOptions.type == 0) {
			drawMatrix();
		} else {
			drawMatrixLoop();
		}

	}

}

function updateJSON(chain1, chain2) {

	if (chain1 == chain2) {

		//d3.json(pathname +"/"+pdb_name+"/"+ pdb_name + "/" + pdb_name + "_" + chains[chain1] + ".json", function(data) {
		d3.json(pathname +"/" + pdb_name + "/" + pdb_name + "_" + chain1 + ".json", function(data) {


			json = data;

			drawChord("null");
			colorChordNames(viewOptions.group1, viewOptions.group2);


		});

	} else if (chain1 != chain2) {

		d3.json(pathname +"/" + pdb_name + "/" + pdb_name + "_" + chain1 + "-" + chain2 + ".json", function(data) {

			json = data;

			removeHOH();

			//drawChord();
			//colorChordNames(viewOptions.group1, viewOptions.group2);

			//interchainsChord2(); //same as normal chord plot function but got rid of the groups which don't have interactions
			interchainsChord3(); // a new approach I found here: http://jsfiddle.net/sxZkK/2/ this has two level chord arcs



			////////////////////////////////////////////////////////
			//////ASTEORID BETWEEN CHAINS STARTS HERE:::::

			// /////////////////////

			ligandarray = [];

			var ligandlist = document.getElementById("ligandList");

			if (ligandlist.options.length > 0) {
				removeOptions(ligandlist);
			}


			var check = 0;
			var checkfirst = 0;

			for (var i = 0; i < jsonall.nodes.length; i++) {

				if (jsonall.nodes[i].chain == viewOptions.chains[0] || jsonall.nodes[i].chain == viewOptions.chains[1]) {

						if (jsonall.nodes[i].type == "HETAT" && jsonall.nodes[i].name.substring(0, 3) != "HOH") {

						var x = document.getElementById("ligandList");
						var option = document.createElement("option");
						option.text = jsonall.nodes[i].chain + ":" + jsonall.nodes[i].name;
						x.add(option);
						ligandarray.push(jsonall.nodes[i].chain + ":" + jsonall.nodes[i].name);

						if (check == 0 && jsonall.nodes[i].chain == viewOptions.mychain) {
							//if (!viewOptions.center) {
							viewOptions.center = jsonall.nodes[i].residueNum;
							//}
						}

						check++;
					}

				}
			}


			$("#ligandList option").each(function() {

				// if ($(this).text() == viewOptions.pdb[a]) {

				$('#ligandList').prop("selected", true);

			});

			if (check == 0) {
				$("#ligandid").animate({
					"opacity": "0"
				}, "fast");

				for (var i = 0; i < jsonall.nodes.length; i++) {

					if (jsonall.nodes[i].chain == viewOptions.mychain && checkfirst == 0) {
						viewOptions.center = jsonall.nodes[i].residueNum;
						checkfirst = -1;
					}
				}

			}


			/////////////////////

			// Fill the central residue input box from the URL or, failing that, with the first residue listed in JSON
			// if (!viewOptions.center) {viewOptions.center = json.nodes[0].residueNum; }

			document.getElementById("center").value = viewOptions.center;
			document.getElementById("centerchain").value = viewOptions.chains[0];


			if ($("#proteinview").height() > $("#graphview").height()) {
				d3.select("#graphview").style("height", $("#proteinview").height() + "px");
			} else {
				d3.select("#proteinview").style("height", $("#graphview").height() + "px");
			}

			// viewOptions.pdb = viewOptions.pdb.slice(0,viewOptions.pdb.indexOf('*'));

			updateURL(viewOptions);

			drawAsteroidGraphBetweenChains();


			ligandtable();

		});


	}

	// viewOptions["group1"] = group1;
	//    viewOptions["group2"] = group2;
	//    updateURL(viewOptions);
	//
	// 	//alert("annen");
	//
	//    colorChordNames(group1, group2);
	//    drawMatrix();
	//    reDrawProtein([], []);
}

function updateViews_network(group1, group2) {
	viewOptions["group1"] = group1;
	viewOptions["group2"] = group2;
	updateURL(viewOptions);

	colorChordNames(group1, group2);
	// drawMatrix3();

	if (jsonResNumsS.length == 0 && jsonResNumsT.length == 0) {

		//alert("annen");
		drawMatrix();

	} else {
		drawMatrixIntrachains();
	}

	reDrawProtein([], []);
}

function colorChordNames(group1, group2) {

	// Revert all labels to the un-highlighted state
	d3.select("#chord").selectAll('.group')
		.attr("fill", "black")
		.style("font-weight", "normal")
		.style("font-size", "9px");

	// Highlight label for group 1
	d3.select("#chord").selectAll('.group')
		.filter(function(d, i) {
			if (i == group1) { //alert(group1+"\t"+group2);
				return true;
			}
		})
		//.attr("fill", "DodgerBlue")
		.attr("fill", fill(viewOptions.group1))
		.style("font-weight", "bold")
		.style("font-size", "12px");

	// Highlight label for group 2
	d3.select("#chord").selectAll('.group')
		.filter(function(d, i) {
			if (i == group2) {
				return true;
			}
		})
		//.attr("fill", " DarkTurquoise")
		.attr("fill", fill(viewOptions.group2))
		.style("font-weight", "bold")
		.style("font-size", "12px");

	// Update download link
	addDownloadLink("chord");


}

function switchView(newView) {
	// if (newView === 'matrix') {
	//      drawDomainMatrix();
	//    }
	if (newView === 'chord') {

		$(".block").css("width", "100%");
		$(".block").css("height", "450px");
		$(".block").css("margin", "0 auto");

		$("#contactmatrix").css("display", "none");
		$("#contenttext2").animate({
			"opacity": "0"
		}, "fast");
		$("#contenttext").animate({
			"opacity": "0"
		}, "fast");
		$("#chord_button").css("display", "none");
		$("#infobox").css("display", "none");

		removeURLpart("chordclick");
		viewOptions["view"] = newView;
		updateURL(viewOptions);

	}
	else if (newView === 'ligand') {

		if(viewOptions.hasOwnProperty("ligandmatrixclickedbefore")){
			$(".gallery").css("width", "100%");
			$(".gallery").css("height", "450px");
			$(".gallery").css("margin", "0 auto");

			$("#mainligandmatrix").css("display", "none");
			$("#infoboxligand").css("display", "none");

			removeURLpart("ligandmatrixclickedbefore");
			updateURL(viewOptions);
		}

		else{
			$(".gallery").css("top", "0");
			$(".gallery").css("left", "0");
			$(".gallery").css("margin-left", "-10px");
			$(".gallery").css("width", "200px");
			$(".gallery").css("height", "200px");

			$("#mainligandmatrix").css("display", "block");
			$("#infoboxligand").css("display", "block");

			drawMatrixLigand();
			viewOptions.ligandmatrixclickedbefore = "yes";
			updateURL(viewOptions);
		}
	}

}

function switchTabs(newTab) {
	if (newTab === 'chord') {

		//addTitle("one");
		d3.select(".selectedchain").selectAll(".selected").remove();

		viewOptions.tab = "chord";
		viewOptions.chord = "1";
		removeURLpart("asteroid");
		removeURLpart("splom");
		removeURLpart("highlighted");
		removeURLpart("colors");

		if (viewOptions.chains[0] == viewOptions.chains[1]) {
			viewOptions.mychain = viewOptions.chains[0];
		} else {
			viewOptions.mychain = "both";
		}

		updateURL(viewOptions);

		//reDrawProtein([], []);
		initializeProteinView([], [], 0);

		$("#contenttext2").animate({
			"opacity": "1"
		}, "fast");
		$("#contenttext").animate({
			"opacity": "1"
		}, "fast");

		d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");

	} else if (newTab === 'network') {

		//addTitle("two");

		d3.select(".selectedchain").selectAll(".selected").remove();
		if (viewOptions.chains[0] != viewOptions.chains[1]) {
			if (viewOptions.selectedchain == viewOptions.chains[0]) {
				d3.select(".selectedchain").append('div').attr('class', 'selected');
				d3.select(".selected").html("<h3>(" + viewOptions.chains[0] + " is selected)</h3>");
			} else {
				d3.select(".selectedchain").append('div').attr('class', 'selected');
				d3.select(".selected").html("<h3>(" + viewOptions.chains[1] + " is selected)</h3>");
			}
		}

		viewOptions.tab = "network";
		viewOptions.splom = "1";
		removeURLpart("group1");
		removeURLpart("group2");
		removeURLpart("chord");
		removeURLpart("asteroid");

		updateURL(viewOptions);

		var colors = [];

		//reDrawProtein([], []);
		// for (var i=0; i<viewOptions.highlightedsplom.length;i++){
		// 	colors[i]="0x428bca";
		// }
		reDrawProtein(viewOptions.highlightedsplom, colors);
		//initializeProteinView([], [], 0);

		$("#contenttext2").animate({
			"opacity": "0"
		}, "fast");
		$("#contenttext").animate({
			"opacity": "0"
		}, "fast");

		d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
		d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "").style("font-weight", "normal");
		d3.select("#pymolseqs2").selectAll(".mytxt2").style("fill", "").style("font-weight", "normal");

	} else if (newTab === 'ligand') {

		//addTitle("three");
		d3.select(".selectedchain").selectAll(".selected").remove();

		viewOptions.tab = "ligand";
		viewOptions.mychain = viewOptions.chains[0];

		removeURLpart("group1");
		removeURLpart("group2");
		removeURLpart("splom");
		removeURLpart("chord");
		removeURLpart("highlighted");
		removeURLpart("colors");

		viewOptions.asteroid = "1";

		viewOptions.highlighted = asteroidAtoms_inner;
		viewOptions.colors = asteroidColors_inner;

		if (viewOptions.chains[0] != viewOptions.chains[1]) {
			viewOptions.highlightedchains_inner = asteroidChains_inner;
			viewOptions.highlightedchains_outer = asteroidChains_outer;
		}

		updateURL(viewOptions);

		asteroidColorProtein();


		$("#contenttext2").animate({
			"opacity": "0"
		}, "fast");
		$("#contenttext").animate({
			"opacity": "0"
		}, "fast");

	}
}

///////////////////////////////////////////////////////////////////////////////////////////////
function drawChainNetwork() {

	var divchain = document.createElement('div');

	//initializeProteinView([], [], 1);

	//alert(chains);

	var svgStyle = ".background {\
	      fill: none;\
	    }\
	    \
	    line {\
	      stroke: #BDBDBD;\
	    }\
	    \
	    text.active {\
	      fill: red;\
	      font-size: 15;\
	      font-weight: bold;\
	    }";

	d3.select("#interactionGraph").select("svg").remove();

	// Update subtitle
	d3.select("#interactionGraph").selectAll("h3").remove();


	var margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};

	// var svg = d3.select("#interactionGraph").append("svg")
	// 			.attr("width", "100%")
	// 	    	.attr("height", "100%")
	//  	   	 	.style("display","block")//to place svg centered
	//  	     	.style("margin","auto");//to place svg centered



	var svg = d3.select("#interactionGraph").append("svg")
		.attr("viewBox", function(d, i) {
			if ($(window).width() >= 1900 && $(window).height() > 1065) {

				return "0 0 500 500";
			} else {

				return "0 0 400 400";
			}
			//return  "0 0 400 400";
		})
		.attr("preserveAspectRatio", "xMidYMid meet");


	d3.select("#interactionGraph").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	chainColors = [];

	var contactsArr = new Array(chains.length - 1);
	for (var i = 0; i < chains.length - 1; i++) {
		contactsArr[i] = new Array((chains.length - 1) * (chains.length - 1));
	}

	var totalresnum= jsonall.nodes.length;

	for (var i = 0; i < chains.length - 1; i++) {
		for (var yi = 0; yi < chains.length - 1; yi++) {

			contactsArr[i][yi] = 0;

			for (var z = 0; z < jsonall.links.length; z++) {

				if (jsonall.links[z].chains[0] == chains[i] && jsonall.links[z].chains[3] == chains[yi]) {
					//alert(chains.length-1);
					contactsArr[i][yi] += 1;
				}

			}

		}

	}


	var matrix = [];

	for (var i = 0; i < chains.length - 1; i++) {
		matrix[i] = d3.range(chains.length - 1).map(function(j) {
			return {
				x: j,
				y: i,
				z: 0
			};
		}); // DEBUG +1
	}



	for (var i = 0; i < chains.length - 1; i++) {
		for (var yi = 0; yi < chains.length - 1; yi++) {

			if (i <= yi) {

				if (!matrix[i]) {
					matrix[i] = new Array();
				}

				//console.log(contactsArr[i][yi] +"\t"+ totalresnum +"\t"+ matrix[i][yi].z)
				//matrix[i][yi].z = contactsArr[i][yi]/totalresnum;
				matrix[i][yi].z = contactsArr[i][yi];

			}

		}

	}

	// construct the array of links
	var links = [];

	var nodes1 = [];

	var maxNodeWeight = 0;
	var maxValue = 0;
	for (var i = 0; i < matrix.length; i++) {

		var newNode = [];
		newNode.name = chains[i];

		for (var j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j].z > 0) {

				if (matrix[i][j].z > maxValue) {
					maxValue = matrix[i][j].z;
					maxNodeWeight = maxValue;
				}

				var newLink = [];
				newLink.source = i;
				newLink.target = j;
				newLink.value = matrix[i][j].z;

				links.push(newLink);

			}

			if (i == j) {

				newNode.value = matrix[i][j].z;
				nodes1.push(newNode);

			}
		}
	}

    for (var i = 0; i < nodes1.length; i++) {
        nodes1[i].x = 2*i;
        nodes1[i].y = 3*i;
    }

	var force = d3.layout.force()
		.gravity(.05)
		.distance(100)
		//negative charge pushes the nodes away, the more the better push
		.charge(-1200)
		//CHANGED:to make the graph smaller we did this, but not needed, we need it in a big screen and if it stays like this, the graph is not centered so changed the width/2 and height/2 to just width and height
		//.size([width/2, height/2]);
		.size([width, height]);
	//
	force.nodes(nodes1).links(links);



	//Run the layout a fixed number of times.
	force.start();
	for (var i = 200; i > 0; --i) force.tick();
	force.stop();

	var n = chains.length - 1;

	// Style links
	var transparencyScale = d3.scale.linear().domain([0, maxValue]).range([0, 1]);
	var link = svg.selectAll(".link")
		.data(links)
		.enter().append("line")
		.attr("class", "link")
		.attr("x1", function(d) {
			return d.source.x;
		})
		.attr("y1", function(d) {
			return d.source.y;
		})
		.attr("x2", function(d) {
			return d.target.x;
		})
		.attr("y2", function(d) {
			return d.target.y;
		})
		//.attr("opacity", function(d) { return transparencyScale(d.value); } )
		.attr("opacity", 1)
		.style("stroke-width", function(d) {
			return Math.sqrt(d.value);
		})
		.style("cursor", "pointer")
		.on('mouseover', function(d, i) {

			viewOptions.click = "no";
			updateURL(viewOptions);

			svg.selectAll(".node").style("fill", "#999");
			svg.selectAll(".link").style("stroke", "#ddd");

			svg.selectAll(".node").filter(function(e) {
				return d.source.index == e.index
			}).transition().style("fill", "#3182bd");
			svg.selectAll(".node").filter(function(e) {
				return d.target.index == e.index
			}).transition().style("fill", "#9ecae1");

			svg.selectAll(".link").filter(function(data) {
				return data.source.index == d.source.index && data.target.index == d.target.index;
			// }).transition().style("stroke", "#ccc");
			}).transition().style("stroke", "grey").attr("stroke-width", 2);

			viewOptions.hoverchain = [d.source.name, d.target.name];

			updateURL(viewOptions);

			reDrawProteinAllChains([], []);

		})
		// Set the stroke width back to normal when mouse leaves the node.
		.on('mouseout', function() {

			if(viewOptions.click == "yes"){}

			else{
				removeURLpart("hoverchain");
				updateURL(viewOptions);
				reDrawProteinAllChains([], []);

				svg.selectAll(".node").style("stroke", "#fff");
				svg.selectAll(".node").style("fill", "#999");
				svg.selectAll(".link").style("stroke", "#ddd");
			}

		})
		.on("click", function(d, i) {

			viewOptions.click = "yes";
			updateURL(viewOptions);

			$("#centerchain").attr("readonly", false);

			d3.select("#chainbuttons").selectAll(".buttons").remove();
			d3.select(".selectedchain").selectAll(".selected").remove();

			divchain.innerHTML = 'Chains <b>' + d.source.name + '</b> and <b>' + d.target.name + '</b> are selected.<a href="#" class="alert-link" data-dismiss="modal" > Click here to view details</a>';

			document.getElementById('notice').appendChild(divchain);

			$('#notice').show();

			d3.select("#pymolseqs").select("svg").remove();
			d3.select("#pymolseqs1").select("svg").remove();
			d3.select("#pymolseqs2").select("svg").remove();

			switchView('chord');

			var b = viewOptions.pdb.indexOf("_");
			pdb_name = viewOptions.pdb.slice(0, b);

			//var allchains = viewOptions.pdb.slice(b+1,viewOptions.pdb.length);
			var allchains = temp_chains;

			var pdb;

			chains = temp_chains.split('-');

			if (d.source.index < d.target.index) {
				pdb = pdb_name.concat("_");
				pdb = pdb.concat(chains[d.source.index]);
				pdb = pdb.concat("-");
				pdb = pdb.concat(chains[d.target.index]);

			} else if (d.source.index > d.target.index) {
				pdb = pdb_name.concat("_");
				pdb = pdb.concat(chains[d.target.index]);
				pdb = pdb.concat("-");
				pdb = pdb.concat(chains[d.source.index]);
			}

			var sfile;
			var tfile;
			var suffix;

			if (d.source.index < d.target.index) {

				sfile = chains[d.source.index];
				tfile = chains[d.target.index];

				suffix = pdb_name.concat("_");
				suffix = suffix.concat(sfile);
				suffix = suffix.concat("-");
				suffix = suffix.concat(tfile);

			} else if (d.source.index > d.target.index) {

				sfile = chains[d.target.index];
				tfile = chains[d.source.index];

				suffix = pdb_name.concat("_");
				suffix = suffix.concat(sfile);
				suffix = suffix.concat("-");
				suffix = suffix.concat(tfile);
			}

			viewOptions.chains[0] = sfile;
			viewOptions.chains[1] = tfile;

			viewOptions.pdb = suffix;
			viewOptions.mychain = sfile;

			//////////////////////////////////
			//when clicked, the div dissappears
			//	$( "#interactions" ).slideToggle("slow");
			//event.stopPropagation();

			viewOptions.show = "no";

			//////////////////////////////////

			// removeURLpart("group1");
//             removeURLpart("group2");

			updateURL(viewOptions);

			// svg.selectAll(".node").filter(function(e) {
// 				return d.source.index != e.index && d.target.index != e.index;
// 			}).transition().style("opacity", 0.2);
// 			svg.selectAll(".node").filter(function(e) {
// 				return d.source.index == e.index || d.target.index == e.index;
// 			}).transition().style("opacity", 1);

			take_screenshot();

			loadafterchainsselected();
			loadSplomafterchainsselected();

			$('#myModal').modal('hide');

		})
		.append("title")
		.text(function(d) {
			return matrix[d.source.index][d.target.index].z + " contacts between " + chains[d.source.index] + " and " + chains[d.target.index];
		});


	//explanation of the method: https://www.dashingd3js.com/d3js-scales
	//the larger the range max, the larger the nodes become
	var nodeSizeScale = d3.scale.linear().domain([0, Math.sqrt(maxNodeWeight)]).range([0, 2000]);
	//original
	//var nodeSizeScale = d3.scale.linear().domain([0, Math.sqrt(maxNodeWeight)]).range([0, 270]);
	//console.log("maxNodeWeight\t"+maxNodeWeight+"\tMath.sqrt(maxNodeWeight)\t"+Math.sqrt(maxNodeWeight)+"\tnodeSizeScale\t"+nodeSizeScale)

	var node = svg.selectAll(".node")
		.data(nodes1)
	.enter().append("g");

	//  .call(force.drag);

	node.append("path")
		.attr("class", "node")
		//.attr("cx", function(d) { return d.x; })
		//.attr("cy", function(d) { return d.y; })
		//.attr("r", function(d) { return nodeSizeScale(Math.sqrt(d.weight))} )
		.attr("transform", function(d) {

			return "translate(" + d.x + "," + d.y + ")";
		})
		.attr("d", d3.svg.symbol().type(function(d) {

				for (var i = 0; i < jsonall.groups.length; i++) {

					if (jsonall.groups[i].name[0] == d.name) {

						if (jsonall.groups[i].name[2] == "N") {

							return "square";
						} else {
							return "circle";
						}
					}

				}


			})
			//bu size attr d nin icinde, symbolun ozel size i
			.size(function(d) {
				//before it was d.weight, but we need d.value which is the number of residue contacts within each chains
				return nodeSizeScale(Math.sqrt(d.value))
				//console.log(d.value +"\t"+ d.weight+"\t"+ Math.pow(d.weight, 3) +"\t"+ nodeSizeScale(Math.pow(d.weight, 3)))
				//return nodeSizeScale(Math.pow(d.weight, 3))
			})
		)
		// .attr("opacity", function(d) {
//
// 			if (chains[d.index] == viewOptions.chains[0] || chains[d.index] == viewOptions.chains[1]) {
// 				return 1;
// 			} else {
// 				return 0.3;
// 			}
// 		})
		.style("cursor", "pointer")
		.style("fill", function(d, i) {

			chainColors.push(fill2(d.index));

			//return "#999";
			if (chains[d.index] == viewOptions.chains[0] || chains[d.index] == viewOptions.chains[1]) {
				return "#3182bd";
			} else {
				return "#999";
			}

		})
		.style("stroke", "#fff")
		.on('mouseover', function(d, index) {

			viewOptions.click = "no";
			updateURL(viewOptions);

			svg.selectAll(".node").style("fill", "#999");

			// svg.selectAll(".link").filter(function(data) {
// 				return data.source == d || data.target == d;
// 				//}).transition().style("opacity", 1);
// 			}).transition().style("stroke", "grey").attr("stroke-width", 2);

			svg.selectAll(".node").filter(function(d,i) {

				if (i == index) {
					return true;
				}
				//return i == index;
			}).transition().style("fill", "#3182bd");
			//.transition().style("stroke", "black").attr("stroke-width", 2)

			viewOptions.hoverchain = d.name;

			updateURL(viewOptions);

			reDrawProteinAllChains([], []);

		})
		// Set the stroke width back to normal when mouse leaves the node.
		.on('mouseout', function() {

			if(viewOptions.click == "yes"){}

			else{
				svg.selectAll(".node").style("stroke", "#fff");
				svg.selectAll(".node").style("fill", "#999");
				removeURLpart("hoverchain");

				updateURL(viewOptions);
				reDrawProteinAllChains([], []);
			}
		})
		.on("click", function(d, index) {

			viewOptions.click = "yes";
			updateURL(viewOptions);

			$("#centerchain").attr("readonly", true);

			d3.select("#chainbuttons").selectAll(".buttons").remove();
			d3.select(".selectedchain").selectAll(".selected").remove();

			//document.getElementById('notice').removeChild(divchain);

			//divchain.innerHTML = '<strong>Attention!</strong> You selected chain: <b>' +d.name+ '</b><a href="#" class="alert-link" data-dismiss="modal" >. Click here to return to main page</a>';
			divchain.innerHTML = 'Chain <b>' + d.name + '</b> is selected.<a href="#" class="alert-link" data-dismiss="modal" > Click here to view details</a>';

			document.getElementById('notice').appendChild(divchain);

			$('#notice').show();

			// if(chains[d.x] == viewOptions.chains[0] || chains[d.x] == viewOptions.chains[1]){
			// 	 $(this).css('opacity','1');
			//  }

			d3.select("#pymolseqs").select("svg").remove();
			d3.select("#pymolseqs1").select("svg").remove();
			d3.select("#pymolseqs2").select("svg").remove();

			if (viewOptions.hasOwnProperty("highlightedchains_inner")) {
				removeURLpart("highlightedchains_inner");
				removeURLpart("highlightedchains_outer");
			}


			switchView('chord');

			var b = viewOptions.pdb.indexOf("_");
			pdb_name = viewOptions.pdb.slice(0, b);

			var pdb;

			pdb = pdb_name.concat("_");
			//	pdb = pdb.concat(chains[d.x]);

			var sfile;
			var tfile;
			var suffix;

			chains = temp_chains.split('-');

			sfile = chains[index];
			tfile = chains[index];

			suffix = pdb_name.concat("_");
			suffix = suffix.concat(sfile);

			// suffix = suffix.concat("*");
			// 	  	 		suffix = suffix.concat(allchains);

			viewOptions.chains[0] = sfile;
			viewOptions.chains[1] = sfile;
			viewOptions.pdb = suffix;

			viewOptions.mychain = sfile;

			//////////////////////////////////
			//$( "#interactions" ).slideToggle("slow");
			//event.stopPropagation();

			////viewOptions.show = "no";

			// removeURLpart("group1");
//             removeURLpart("group2");

			//////////////////////////////////

			updateURL(viewOptions);
			//
			// svg.selectAll(".node").filter(function(d) {
			// 	return d.index == index;
			// }).style("opacity", 1);
			// svg.selectAll(".node").filter(function(d) {
			// 	return d.index != index;
			// }).style("opacity", 0.2);

			// $(this).css('opacity','1');

			take_screenshot();

			loadafterchainsselected();
			loadSplomafterchainsselected();

			$('#myModal').modal('hide');

		})
		//.call(force.drag)
		.append("title").text(function(d) {
			return d.name + " has " + d.value + " contacts"
		});

	node.append("text")
		.attr("dx", function(d) {
			return d.x - 4;
		})
		.attr("dy", function(d) {
			return d.y + 4;
		})
		.attr("class", "nodetext")
		.text(function(d) {
			return d.name
		})
		.style("cursor", "pointer")

	.on('mouseover', function(d, index) {

		viewOptions.click = "no";
		updateURL(viewOptions);

			svg.selectAll(".node").style("fill", "#999");

			// svg.selectAll(".link").filter(function(data) {
// 				return data.source == d || data.target == d;
// 				//}).transition().style("opacity", 1);
// 			}).transition().style("stroke", "grey").attr("stroke-width", 2);

			svg.selectAll(".node").filter(function(d) {
				return d.index == index;
			}).style("fill", "#3182bd");

			viewOptions.hoverchain = d.name;

			updateURL(viewOptions);

			reDrawProteinAllChains([], []);

		})
		.on('mouseout', function() {

			if(viewOptions.click == "yes"){}

			else{
				svg.selectAll(".node").style("stroke", "#fff");
				svg.selectAll(".node").style("fill", "#999");
				removeURLpart("hoverchain");

				updateURL(viewOptions);

			  reDrawProteinAllChains([], []);
			}



		})
		.on("click", function(d, index) {

			viewOptions.click = "yes";
			updateURL(viewOptions);

			$("#centerchain").attr("readonly", true);

			d3.select("#chainbuttons").selectAll(".buttons").remove();
			d3.select(".selectedchain").selectAll(".selected").remove();

			//document.getElementById('notice').removeChild(divchain);
			divchain.innerHTML = 'Chain <b>' + d.name + '</b> is selected.<a href="#" class="alert-link" data-dismiss="modal" > Click here to view details</a>';

			document.getElementById('notice').appendChild(divchain);

			$('#notice').show();

			d3.select("#pymolseqs").select("svg").remove();
			d3.select("#pymolseqs1").select("svg").remove();
			d3.select("#pymolseqs2").select("svg").remove();

			if (viewOptions.hasOwnProperty("highlightedchains_inner")) {
				removeURLpart("highlightedchains_inner");
				removeURLpart("highlightedchains_outer");
			}

			switchView('chord');

			var b = viewOptions.pdb.indexOf("_");
			pdb_name = viewOptions.pdb.slice(0, b);

			//var allchains = viewOptions.pdb.slice(b+1,viewOptions.pdb.length);
			var allchains = temp_chains;

			//alert(allchains);

			var pdb;

			pdb = pdb_name.concat("_");
			pdb = pdb.concat(chains[d.x]);

			var sfile;
			var tfile;
			var suffix;

			chains = temp_chains.split('-');

			sfile = chains[index];
			tfile = chains[index];

			suffix = pdb_name.concat("_");
			suffix = suffix.concat(sfile);

			viewOptions.chains[0] = sfile;
			viewOptions.chains[1] = sfile;
			viewOptions.pdb = suffix;
			viewOptions.mychain = sfile;

			// removeURLpart("group1");
//             removeURLpart("group2");

			updateURL(viewOptions);

			// svg.selectAll(".node").filter(function(d) {
// 				return d.index == index;
// 			}).transition().style("opacity", 1);
// 			svg.selectAll(".node").filter(function(d) {
// 				return d.index != index;
// 			}).transition().style("opacity", 0.2);

			take_screenshot();

			loadafterchainsselected();
			loadSplomafterchainsselected();

			$('#myModal').modal('hide');

		})
		//.call(force.drag)
		.append("title").text(function(d) {
			return d.name + " has " + d.value + " contacts"
		});


		//not needed for now, but for use when nodes overlap, and we dont want that, for now we use charge - value
		// 	function collide(node) {
		//   var r = node.radius + 16,
		//       nx1 = node.x - r,
		//       nx2 = node.x + r,
		//       ny1 = node.y - r,
		//       ny2 = node.y + r;
		//   return function(quad, x1, y1, x2, y2) {
		//     if (quad.point && (quad.point !== node)) {
		//       var x = node.x - quad.point.x,
		//           y = node.y - quad.point.y,
		//           l = Math.sqrt(x * x + y * y),
		//           r = node.radius + quad.point.radius;
		//       if (l < r) {
		//         l = (l - r) / l * .5;
		//         node.x -= x *= l;
		//         node.y -= y *= l;
		//         quad.point.x += x;
		//         quad.point.y += y;
		//       }
		//     }
		//     return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
		//   };
		// }

	force.on("tick", function() {

		//not needed for now
		// var q = d3.geom.quadtree(nodes1),
		// 			i = 0,
		// 			n = nodes1.length;
		//
		// 	while (++i < n) q.visit(collide(nodes1[i]));
		//

		link.attr("x1", function(d) {
				return d.source.x;
			})
			.attr("y1", function(d) {
				return d.source.y;
			})
			.attr("x2", function(d) {
				return d.target.x;
			})
			.attr("y2", function(d) {
				return d.target.y;
			});

		node.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});


	});



	viewOptions.hoverchain = viewOptions.chains[0];
	updateURL(viewOptions);

	initializeProteinView([], [], 1);

	take_screenshot();
}

function take_screenshot() {

	d3.select("#screenshot_chains").selectAll(".svg-main").remove();
	d3.select("#screenshot_chains").selectAll(".svg-pic").remove();

	var html = d3.select("#interactionGraph").select("svg")
		.attr("version", 1.1)
		.attr("xmlns", "http://www.w3.org/2000/svg")
		.node().parentNode.innerHTML;

	// var htmlstr='<a download="'+viewOptions.pdb + '.svg"';
	// 	    	htmlstr+= 'href="data:image/svg+xml;base64,'+btoa(html) + '"><img src="../img/camera-icon.png" width="30" height="30" title="Save the image as svg!"></a>';
	//
	// 	 	d3.select("#screenshot_chains").html(htmlstr);


	var svg_chain = d3.select("#screenshot_chains").append("svg")
		.attr("class", "svg-main")
		//original was 100x100
		.attr("width", "100%")
		.attr("height", 80);

	var g_chain = svg_chain.append("g");

	var img = g_chain.append("svg:image")
		.attr("class", "svg-pic")
		// .attr("xlink:href", "http://www.clker.com/cliparts/1/4/5/a/1331068897296558865Sitting%20Racoon.svg")
		.attr("xlink:href", "data:image/svg+xml;base64,\n" + btoa(html))
		//original was 100x100
		.attr("width", "100%")
		.attr("height", 80)
		.style("cursor", "pointer");
	// .attr("x", -90)
	//.attr("y",-90);

	// d3.select("#screenshot_chains").append("image")
	// 	     .attr("class", "svg-pic")
	// 	     .attr("src", "data:image/svg+xml;base64,\n"+btoa(html))
	// 		 .style("width", "100px" )
	// 		 .style("height", "100px" );
	// 		// .style("margin-top","50px");

}

function updateAsteroid() {
	viewOptions.center = document.getElementById("center").value;
	viewOptions.mychain = document.getElementById("centerchain").value;

	var check = 0;
	var group;

	if (viewOptions.chains[0] != viewOptions.chains[1]) {

		if(viewOptions.mychain==viewOptions.chains[0]){

			for (var i = 0; i < jsonSour.groups.length; i++) {

				if (jsonSour.groups[i].start <= viewOptions.center && viewOptions.center <= jsonSour.groups[i].end) {

					group = i;

					check = -1;
				}

			}
			if (check == 0) {
				group = -1;
			}
		}

		else{
			for (var i = 0; i < jsonTarg.groups.length; i++) {

				if (jsonTarg.groups[i].start <= viewOptions.center && viewOptions.center <= jsonTarg.groups[i].end) {

					group = i;

					check = -1;
				}

			}
			if (check == 0) {
				group = -1;
			}
		}

	}

	else{
		for (var i = 0; i < json.groups.length; i++) {

			if (json.groups[i].start <= viewOptions.center && viewOptions.center <= json.groups[i].end) {

				group = i;

				check = -1;
			}

		}
		if (check == 0) {
			group = -1;
		}
	}


	updateSplomPymol(viewOptions.center, group);
	drawTable(viewOptions.highlightedsplom);

	viewOptions.highlighted = [viewOptions.center, viewOptions.center];
	removeURLpart("group1");
	removeURLpart("group2");
	updateURL(viewOptions);

	if (viewOptions.chains[0] != viewOptions.chains[1]) {
		drawAsteroidGraphBetweenChains();
	} else {
		drawAsteroidGraph();
		drawMatrixLigand();
	}
	asteroidColorProtein();

}

function updateAsteroidPymol(f) {

	viewOptions.center = f;

	document.getElementById("center").value = f;

	removeURLpart("group1");
	removeURLpart("group2");

	updateURL(viewOptions);

	if (viewOptions.chains[0] != viewOptions.chains[1]) {
		drawAsteroidGraphBetweenChains();
	} else {
		drawAsteroidGraph();
		drawMatrixLigand();
	}
	asteroidColorProtein();

}

function asteroidColorProtein() {
	reDrawProtein(asteroidAtoms, asteroidColors);
	addDownloadLink3("asteroidGraph");
  addDownloadLink2("splom");
}

function drawAsteroidGraph() {

	width = height = Math.min(height, width);

	asteroidAtoms = [];
	asteroidColors = [];

	asteroidAtoms_inner = [];
	asteroidColors_inner = [];

	asteroidAtoms_outer = [];
	asteroidColors_outer = [];

	d3.select("#asteroidGraph").select("svg").remove();

	// var svg = d3.select("#asteroidGraph").append("svg")
	// 	.attr("width", width)
	// 	.attr("height", height)
	// 	.style("display", "block") //to place svg centered
	// 	.style("margin", "auto"); //to place svg centered

//CHANGED to have the matrix here, when clicked on matrix button, move the plot to left hand corner.
//this is the only way that the shape of plot changes when moved
		var svg = d3.select("#asteroidGraph").append("svg")
		.attr("id","mysvgID1")
		.attr("viewBox", "0 0 470 470")
		.attr("preserveAspectRatio", "xMidYMid meet")
		.append("svg:g")

	// Draw the dashed inner circle
	d3.select("#asteroidGraph").select("svg")
		.append("circle")
		.attr("cx", width / 2)
		.attr("cy", height / 2)
		.attr("r", 0.2 * width)
		.on("click", click_inner)
		.style("cursor", "pointer")
		.style("fill", "none")
		.style("stroke", "#C1BFBF")
		//below is the previous orange color
		//.style("stroke", "#D1A24E")
		.style("stroke-dasharray", "9, 5")
		.style("stroke-width", "3");

	// Draw the dashed outer circle
	d3.select("#asteroidGraph").select("svg")
		.append("circle")
		.attr("cx", width / 2)
		.attr("cy", height / 2)
		.attr("r", 0.40 * width)
		.on("click", click_outer)
		.style("cursor", "pointer")
		.style("fill", "none")
		.style("stroke", "#C1BFBF")
		//.style("stroke", "#D1A24E")
		.attr("opacity", 0.5)
		.style("stroke-dasharray", "9, 5")
		.style("stroke-width", "3");

	function click_inner(p) {

		viewOptions.ring = "ringone";
		updateURL(viewOptions);

		return reDrawProtein(asteroidAtoms_inner, asteroidColors_inner);
	}

	function click_outer(p) {

		viewOptions.ring = "ringtwo";
		updateURL(viewOptions);
		return reDrawProtein(asteroidAtoms_outer, asteroidColors_outer);
	}

	// find the residue *number* to center the diagram on
	var centername = document.getElementById("center").value;
	var center = parseInt(document.getElementById("center").value.match(/\d+/g));

	// create an invisble circle for every residue
	var node = svg.selectAll("circle.node")
		.data(json.nodes)
		.enter().append("circle")
		.attr("class", "node")
		.attr("r", 10)
		.attr("fill", defaultColor)
		.attr("visibility", "hidden");


	// for the central residue, find the corrsponding index into json
	var index = -100;
	for (var i = 0; i < json.nodes.length; i++) {
		if (json.nodes[i].residueNum === center) {
			index = i;

			// Save the color of each displayed atom, for use in coloring the protein view
			asteroidAtoms[0] = parseInt(center);
			asteroidAtoms_inner[0] = parseInt(center);
			asteroidAtoms_outer[0] = parseInt(center);
		}
		else if(json.nodes[i].name === centername){
			index = i;
			// Save the color of each displayed atom, for use in coloring the protein view
			asteroidAtoms[0] = json.nodes[i].residueNum;
			asteroidAtoms_inner[0] = json.nodes[i].residueNum;
			asteroidAtoms_outer[0] = json.nodes[i].residueNum;
		}
	}

	if (index == -100) {

		$(document).ready(function() {

			$.blockUI({
				timeout: 500,
				message: null,
				onBlock: function() {
					alert(center + " has no interactions! Please enter another residue number!");
					//window.location="matrix.html?pdb=" + viewOptions.pdb;
				}
			});

		});
	}

	// make the central residue visible, and give it hover-text.
	// save the number of residues it contacts as numRingOne
	var numRingOne;
	node.filter(function(d) {
			if (d.residueNum === center || d.name === centername) {
				return 1;
			}
		})
		.each(function(d, i) {
			numRingOne = d.weight;
		})
		.attr("visibility", "visible")
		.attr("cx", width / 2)
		.attr("cy", height / 2)
		.attr("r", 20)
		.attr("fill", "#428bca")
		//.attr("fill", "red")
		.append("title")
		.text(function(d) {
			return d.name + " (" + d.weight + " atomic contacts)";
		});



	// Find all the residues contacting the central residue.
	var ringOne = new Array();
	var weightsOne = new Array();

	for (var i = 0; i < json.nodes.length; i++) {
		weightsOne[i] = 0;
	}

	var j = 0;
	for (var i = 0; i < json.links.length; i++) {
		if (json.links[i].source === index) {
			ringOne.push(json.links[i].target);
			weightsOne[json.links[i].target] += json.links[i].value;
			j++;
		} else if (json.links[i].target === index) {
			ringOne.push(json.links[i].source);
			weightsOne[json.links[i].source] += json.links[i].value;
			j++;
		}
	}

	// Find all the residues contacting residues in the first ring.
	var ringTwo = new Array();
	var weightsTwo = new Array();

	for (var i = 0; i < json.nodes.length; i++) {
		weightsTwo[i] = 0;
	}

	var k = 0;
	for (var i = 0; i < json.links.length; i++) {

		// Find links where node.source is in the first circle, and node.target is neither in the first circle or the centre
		if ((ringOne.indexOf(json.links[i].source) !== -1) && (ringOne.indexOf(json.links[i].target) == -1) && (json.links[i].target != index)) {

			// If the target residue is not on the list, add it
			if (ringTwo.indexOf(json.links[i].target) == -1) {
				ringTwo.push(json.links[i].target);
				k++;
			}
			weightsTwo[json.links[i].target] += json.links[i].value;

			// Find links where node.target is in the first circle, and node.source is neither in the first circle or the centre
		} else if ((ringOne.indexOf(json.links[i].target) !== -1) && (ringOne.indexOf(json.links[i].source) == -1) && (json.links[i].source != index)) {

			// If the source residue is not on the list, add it
			if (ringTwo.indexOf(json.links[i].source) == -1) {
				ringTwo.push(json.links[i].source);
				k++;
			}
			weightsTwo[json.links[i].source] += json.links[i].value;
		}
	}



	// Loop through the array of amino acids in the first ring, selecting the appriate circle, and
	// resizing, coloring, and positioning it on the dashed circle
	var ringOneScale = d3.scale.linear().domain([0, Math.max.apply(Math, weightsOne)]).range([5, 25]);


	for (var i = 0; i < j; i++) {

		node.filter(function(d) {
				if (d.residueNum === json.nodes[ringOne[i]].residueNum) {

					d3.select("#asteroidGraph").select("svg").append("text")
						.text(function(e) {

							if (viewOptions.chains[0] != viewOptions.chains[1])
								return d.chain + ":" + d.name;

							else
								return d.name;
						})
						.on("click", function(e) {

							viewOptions.highlighted = [d.residueNum, d.residueNum];
							viewOptions.colors = [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]

							viewOptions.mychain = d.chain;
							updateURL(viewOptions);

							reDrawProtein(viewOptions.highlighted, [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]);

							updateAsteroidPymol(d.residueNum);

							if(document.getElementById("ligandList").length!=0){
							  $("#ligandList").val(json.nodes[ringOne[i]].name);
							}

							//drawMatrixLigand();

						})
						.style("cursor", "pointer")
						.attr("x", width / 2 + 0.20 * width * Math.sin(2 * Math.PI * i / j))
						.attr("y", height / 2 + 0.20 * width * Math.cos(2 * Math.PI * i / j))
						.attr("font-size", "10px");

					return 1;
				}
			})
			.each(function(d, i) {
				numRingOne = d.weight;
			})
			.attr("visibility", "visible")
			.attr("cx", width / 2 + 0.20 * width * Math.sin(2 * Math.PI * i / j))
			.attr("cy", height / 2 + 0.20 * width * Math.cos(2 * Math.PI * i / j))
			.attr("r", ringOneScale(weightsOne[ringOne[i]]))
			//  .attr("fill", "#D1A24E")
			.style("fill", function(d) {

     			if( viewOptions.encode==1 ){
     				//console.log("lala");
					var checkcolor = 0;
					for (var i = 0; i < json_splom.nodes.length; i++) {
						 if (json_splom.nodes[i].residueNum == d.residueNum) {

							    return color_conservation(json_splom.nodes[i].value);
						  }
					}

     			}

				else if(viewOptions.colorless==1){
					return "#C1BFBF";
				}

				else{
					var checkcolor = 0;
					for (var i = 0; i < json.groups.length; i++) {
						if (json.groups[i].start <= d.residueNum && d.residueNum <= json.groups[i].end) {
							checkcolor = -1;
							return fill(i);
						}
					}
					if (checkcolor == 0) {
						return "#C1BFBF";
					}
				}



			})
			.on("click", function(d) {

				viewOptions.highlighted = [d.residueNum, d.residueNum];
				viewOptions.colors = [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]

				viewOptions.mychain = d.chain;
				updateURL(viewOptions);

				reDrawProtein(viewOptions.highlighted, [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]);

				updateAsteroidPymol(d.residueNum);
				if(document.getElementById("ligandList").length!=0){
					$("#ligandList").val(json.nodes[ringOne[i]].name);
				}

				//drawMatrixLigand();

			})

		.style("cursor", "pointer")
			.append("title")
			.text(function(d) {
				return d.residueNum + " (" + weightsOne[ringOne[i]] + " atomic contacts with centre)";
			});
	}


	// Loop through the array of amino acids in the second ring, selecting the appriate circle, and
	// resizing, coloring, and positioning it on the dashed circle
	var ringTwoScale = d3.scale.linear().domain([0, Math.max.apply(Math, weightsTwo)]).range([5, 25]);
	var xPos, yPos;

	for (var i = 0; i < k; i++) {


		node.filter(function(d) {
				if (d.residueNum === json.nodes[ringTwo[i]].residueNum) {

					xPos = width / 2 + 0.40 * width * Math.sin(2 * Math.PI * i / k);
					yPos = height / 2 + 0.40 * width * Math.cos(2 * Math.PI * i / k);

					d3.select("#asteroidGraph").select("svg").append("text")
						.text(function(e) {

							if (viewOptions.chains[0] != viewOptions.chains[1])
								return d.chain + ":" + d.name;

							else
								return d.name;
						})
						.on("click", function(e) {

							viewOptions.highlighted = [d.residueNum, d.residueNum];
							viewOptions.colors = [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]

							viewOptions.mychain = d.chain;
							updateURL(viewOptions);

							reDrawProtein(viewOptions.highlighted, [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]);

							updateAsteroidPymol(d.residueNum);
							if(document.getElementById("ligandList").length!=0){
							  $("#ligandList").val(json.nodes[ringTwo[i]].name);
							}

							//drawMatrixLigand();

						})

					.style("cursor", "pointer")
						// .attr("x",  width/2 + 0.45*width*Math.sin(2*Math.PI*i/k) )
						// 	              .attr("y",  height/2 + 0.45*width*Math.cos(2*Math.PI*i/k))
						.attr("x", width / 2 + 0.40 * width * Math.sin(2 * Math.PI * i / k))
						.attr("y", height / 2 + 0.40 * width * Math.cos(2 * Math.PI * i / k))
						.attr("font-size", "10px");

					return 1;
				}
			})
			.attr("visibility", "visible")
			.attr("cx", xPos)
			.attr("cy", yPos)
			.attr("r", ringTwoScale(weightsTwo[ringTwo[i]]))
			//.attr("fill", "#D1A24E")
			.style("fill", function(d) {

     			if( viewOptions.encode==1 ){
     				//console.log("lala");
    				var checkcolor = 0;
    				for (var i = 0; i < json_splom.nodes.length; i++) {
    					 if (json_splom.nodes[i].residueNum == d.residueNum) {

    						    return color_conservation(json_splom.nodes[i].value);
    					  }
    				}

     			}

    			else if(viewOptions.colorless==1){
					return "#C1BFBF";
				}
				else{
					var checkcolor = 0;
					for (var i = 0; i < json.groups.length; i++) {
						if (json.groups[i].start <= d.residueNum && d.residueNum <= json.groups[i].end) {
							checkcolor = -1;
							return fill(i);
						}
					}
					if (checkcolor == 0) {
						return "#C1BFBF";
					}

				}

			})
			.attr("opacity", 0.5)
			.on("click", function(d) {

				viewOptions.highlighted = [d.residueNum, d.residueNum];
				viewOptions.colors = [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]
				viewOptions.mychain = d.chain;

				updateURL(viewOptions);

				reDrawProtein(viewOptions.highlighted, [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]);

				updateAsteroidPymol(d.residueNum);
				if(document.getElementById("ligandList").length!=0){
					$("#ligandList").val(json.nodes[ringTwo[i]].name);
				}

				//drawMatrixLigand();

			})

		.style("cursor", "pointer")
			.append("title")
			.text(function(d) {
				return d.name + " (" + weightsTwo[ringTwo[i]] + " atomic contacts with residues in ring 1)";
			});
	}


	//asteroidColors[0] = "0x9BC449";
	asteroidColors[0] = "0X428bca";

	for (var i = 0; i < ringOne.length; i++) {
		asteroidAtoms.push(json.nodes[ringOne[i]].residueNum);

		if(viewOptions.colorless==1){
			asteroidColors.push("0XC1BFBF");
		}
		else{
			var checkcolor = 0;
			for (var u = 0; u < json.groups.length; u++) {
				if (json.groups[u].start <= json.nodes[ringOne[i]].residueNum && json.nodes[ringOne[i]].residueNum <= json.groups[u].end) {
					checkcolor = -1;

					var color = fill(u);
					color = color.replace("#", "0X");
					asteroidColors.push(color);
				}
			}
			if (checkcolor == 0) {
				asteroidColors.push("0XC1BFBF");
			}
		}
	}

	viewOptions.ring = "ringone";

	asteroidColors_inner[0] = "0X428bca";
	asteroidColors_outer[0] = "0X428bca";

	d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
	d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "").style("font-weight", "normal");

	for (var i = 0; i < ringOne.length; i++) {
		asteroidAtoms_inner.push(json.nodes[ringOne[i]].residueNum);

		if(viewOptions.colorless==1){
			asteroidColors_inner.push("0XC1BFBF");
		}

		else{

			//asteroidColors_inner.push("0xD1A24E");
			var checkcolor = 0;
			for (var u = 0; u < json.groups.length; u++) {
				if (json.groups[u].start <= json.nodes[ringOne[i]].residueNum && json.nodes[ringOne[i]].residueNum <= json.groups[u].end) {
					checkcolor = -1;

					var color = fill(u);
					color = color.replace("#", "0X");
					asteroidColors_inner.push(color);

					if (viewOptions.tab == "ligand") {
						d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
							if (u === index) {
								return true;
							}
						}).transition().style("stroke", "black").attr("stroke-width", 2);

						d3.select("#pymolseqs1").selectAll(".mytxt").filter(function(d, index) {
								if (ringOne[i] === index) {
									return true;
								}
							})
							.style("fill", function(d) {
								return fill(u);
							})
							.style("font-weight", "bold");

					}

				}
			}
			if (checkcolor == 0) {
				asteroidColors_inner.push("0XC1BFBF");
			}
		}

	}

	for (var i = 0; i < ringTwo.length; i++) {
		asteroidAtoms_outer.push(json.nodes[ringTwo[i]].residueNum);

		if(viewOptions.colorless==1){

			//light grey for the second ring
			asteroidColors_outer.push("0XE7E6E6");
		}

		else{
			// asteroidColors_outer.push("0xDDB877");
			var checkcolor = 0;
			for (var u = 0; u < json.groups.length; u++) {
				if (json.groups[u].start <= json.nodes[ringTwo[i]].residueNum && json.nodes[ringTwo[i]].residueNum <= json.groups[u].end) {
					checkcolor = -1;

					var color = fill(u);
					color = color.replace("#", "0X");
					asteroidColors_outer.push(color);

					if (viewOptions.tab == "ligand") {
						d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
							if (u === index) {
								return true;
							}
						}).transition().style("stroke", "grey").attr("stroke-width", 2);

						d3.select("#pymolseqs1").selectAll(".mytxt").filter(function(d, index) {
								if (ringTwo[i] === index) {
									return true;
								}
							})
							.style("fill", function(d) {
								return fill(u);
							})
							.style("font-weight", "bold");
					}
				}
			}
			if (checkcolor == 0) {
				asteroidColors_outer.push("0XC1BFBF");
			}
		}


	}

	viewOptions.highlighted = asteroidAtoms_inner;
	viewOptions.colors = asteroidColors_inner;

	updateURL(viewOptions);


	// Display the central residue's name
	d3.select("#asteroidGraph").select("svg")
		.append("text")
		//  .text( json.nodes[index].name )
		.text(function(e) {

			if (viewOptions.chains[0] != viewOptions.chains[1])
				return json.nodes[index].chain + ":" + json.nodes[index].name;

			else
				return json.nodes[index].name;
		})
		.attr("x", width / 2 - 5)
		.attr("y", height / 2 + 5);

	addDownloadLink3("asteroidGraph");
	addDownloadLink4("ligandmatrix");
	addDownloadLink2("splom");

	// Color the approrpiate residues in the protein view, after a time delay

	//for now, for loading, comment it out, we dont need to call redrawprotein function because it causes the chains to be messed up (A,B,G,R,N becomes A,A,B,G,R,N) for some reason, check redrawProtein function
	//setTimeout("asteroidColorProtein()", 0);

}

function drawAsteroidGraphBetweenChains() {

	width = height = Math.min(height, width);

	// The function may have been called before, so clear up before creating SVG
	asteroidAtoms = [];
	asteroidColors = [];

	asteroidAtoms_inner = [];
	asteroidColors_inner = [];
	asteroidChains_inner = [];

	asteroidAtoms_outer = [];
	asteroidColors_outer = [];
	asteroidChains_outer = [];

	selectednodes = [];
	var c = 0;

	for (var i = 0; i < jsonall.nodes.length; i++) {
		if (jsonall.nodes[i].chain == viewOptions.chains[0] || jsonall.nodes[i].chain == viewOptions.chains[1]) {
			selectednodes[c] = jsonall.nodes[i];
			c++;
		}
	}

	d3.select("#asteroidGraph").select("svg").remove();

	var svg = d3.select("#asteroidGraph").append("svg")
		.attr("width", width)
		.attr("height", height)
		.style("display", "block") //to place svg centered
		.style("margin", "auto"); //to place svg centered


	// Draw the dashed inner circle
	d3.select("#asteroidGraph").select("svg")
		.append("circle")
		.attr("cx", width / 2)
		.attr("cy", height / 2)
		.attr("r", 0.2 * width)
		.on("click", click_inner)
		.style("cursor", "pointer")
		.style("fill", "none")
		.style("stroke", "#C1BFBF")
		.style("stroke-dasharray", "9, 5")
		.style("stroke-width", "3");

	// Draw the dashed outer circle
	d3.select("#asteroidGraph").select("svg")
		.append("circle")
		.attr("cx", width / 2)
		.attr("cy", height / 2)
		.attr("r", 0.40 * width)
		.on("click", click_outer)
		.style("cursor", "pointer")
		.style("fill", "none")
		.style("stroke", "#C1BFBF")
		.attr("opacity", 0.5)
		.style("stroke-dasharray", "9, 5")
		.style("stroke-width", "3");

	function click_inner(p) {

		viewOptions.ring = "ringone";
		updateURL(viewOptions);

		return reDrawProtein(asteroidAtoms_inner, asteroidColors_inner);
	}

	function click_outer(p) {

		viewOptions.ring = "ringtwo";
		updateURL(viewOptions);
		return reDrawProtein(asteroidAtoms_outer, asteroidColors_outer);
	}

	// find the residue *number* to center the diagram on
	var centername = document.getElementById("center").value;
	var strchain = centername[0] + ":";
	centername = centername.replace(strchain, "");
	var center = parseInt(document.getElementById("center").value.match(/\d+/g));

	// create an invisble circle for every residue
	var node = svg.selectAll("circle.node")
		.data(selectednodes)
		.enter().append("circle")
		.attr("class", "node")
		.attr("r", 10)
		.attr("fill", defaultColor)
		.attr("visibility", "hidden");


	// for the central residue, find the corrsponding index into jsonall
	var index = -100;

	for (var i = 0; i < jsonall.nodes.length; i++) {
		if (jsonall.nodes[i].residueNum === center && jsonall.nodes[i].chain == viewOptions.mychain) {
			index = i;

			asteroidAtoms[0] = parseInt(center);
			asteroidAtoms_inner[0] = parseInt(center);
			asteroidAtoms_outer[0] = parseInt(center);
		}
		else if(jsonall.nodes[i].name === centername && jsonall.nodes[i].chain == viewOptions.mychain){
			index = i;
			// Save the color of each displayed atom, for use in coloring the protein view
			asteroidAtoms[0] = jsonall.nodes[i].residueNum;
			asteroidAtoms_inner[0] = jsonall.nodes[i].residueNum;
			asteroidAtoms_outer[0] = jsonall.nodes[i].residueNum;
		}
	}

	if (index == -100) {

		$(document).ready(function() {

			$.blockUI({
				timeout: 500,
				message: null,
				onBlock: function() {
					alert(center + " has no interactions! Please enter another residue number!");
					//window.location="matrix.html?pdb=" + viewOptions.pdb;
				}
			});

		});
	}

	// make the central residue visible, and give it hover-text.
	// save the number of residues it contacts as numRingOne
	var numRingOne;
	node.filter(function(d) {
			if ((d.residueNum === center || d.name === centername) && d.chain == viewOptions.mychain) {
				return 1;
			}
		})
		.each(function(d, i) {
			numRingOne = d.weight;
		})
		.attr("visibility", "visible")
		.attr("cx", width / 2)
		.attr("cy", height / 2)
		.attr("r", 20)
		//.attr("fill", "#5FDA99")
		.attr("fill", "#428bca")
		//.attr("fill", "red")
		.append("title")
		.text(function(d) {
			return d.name + " (" + d.weight + " atomic contacts)";
		});



	// Find all the residues contacting the central residue.

	var ringOne = new Array();
	var weightsOne = new Array();

	for (var i = 0; i < jsonall.nodes.length; i++) {
		weightsOne[i] = 0;
	}

	var j = 0;
	for (var i = 0; i < jsonall.links.length; i++) {

		if (jsonall.links[i].source === index && jsonall.links[i].chains[0] == viewOptions.mychain && (jsonall.links[i].chains[3] == viewOptions.chains[0] || jsonall.links[i].chains[3] == viewOptions.chains[1])) {

			if (ringOne.indexOf(jsonall.links[i].target) == -1) {
				ringOne.push(jsonall.links[i].target);
				  //console.log("1 source "+jsonall.links[i].source + " target "+jsonall.links[i].target +" index "+ index + " value " + jsonall.links[i].value);
				j++;
			}
			weightsOne[jsonall.links[i].target] = jsonall.links[i].value;
		} else if (jsonall.links[i].target === index && jsonall.links[i].chains[3] == viewOptions.mychain && (jsonall.links[i].chains[0] == viewOptions.chains[0] || jsonall.links[i].chains[0] == viewOptions.chains[1])) {

			if (ringOne.indexOf(jsonall.links[i].source) == -1) {
				ringOne.push(jsonall.links[i].source);
				  //console.log("2 target "+jsonall.links[i].target + " source "+jsonall.links[i].source+" index "+ index + " value " + jsonall.links[i].value);
				j++;
			}
			weightsOne[jsonall.links[i].source] = jsonall.links[i].value;
		}

	}

	// for(var i=0; i<ringOne.length;i++){
	// 	console.log(ringOne[i] +" "+weightsOne[ringOne[i]]);
	// }

	// Find all the residues contacting residues in the first ring.
	var ringTwo = new Array();
	var weightsTwo = new Array();

	for (var i = 0; i < jsonall.nodes.length; i++) {
		weightsTwo[i] = 0;
	}

	var k = 0;
	for (var i = 0; i < jsonall.links.length; i++) {

		if ((jsonall.links[i].chains[0] == viewOptions.chains[0] || jsonall.links[i].chains[0] == viewOptions.chains[1]) && (jsonall.links[i].chains[3] == viewOptions.chains[0] || jsonall.links[i].chains[3] == viewOptions.chains[1])) {

			// Find links where node.source is in the first circle, and node.target is neither in the first circle or the centre
			if ((ringOne.indexOf(jsonall.links[i].source) !== -1) && (ringOne.indexOf(jsonall.links[i].target) == -1) && (jsonall.links[i].target != index)) {

				// If the target residue is not on the list, add it
				if (ringTwo.indexOf(jsonall.links[i].target) == -1) {
					ringTwo.push(jsonall.links[i].target);
					k++;
				}
				weightsTwo[jsonall.links[i].target] += jsonall.links[i].value;
				//console.log("1 "+weightsTwo[jsonall.links[i].target]+"\t"+jsonall.links[i].name+"\t"+jsonall.links[i].target+"\t"+jsonall.links[i].source+"\t"+jsonall.links[i].value+"\t"+jsonall.nodes[jsonall.links[i].target].name+"\t"+jsonall.nodes[jsonall.links[i].target].chain+"\t"+jsonall.nodes[jsonall.links[i].source].name+"\t"+jsonall.nodes[jsonall.links[i].source].chain);

				// Find links where node.target is in the first circle, and node.source is neither in the first circle or the centre
			} else if ((ringOne.indexOf(jsonall.links[i].target) !== -1) && (ringOne.indexOf(jsonall.links[i].source) == -1) && (jsonall.links[i].source != index)) {

				// If the source residue is not on the list, add it
				if (ringTwo.indexOf(jsonall.links[i].source) == -1) {
					ringTwo.push(jsonall.links[i].source);
					k++;
				}
				weightsTwo[jsonall.links[i].source] += jsonall.links[i].value;

				//console.log("2 "+weightsTwo[jsonall.links[i].source]+"\t"+jsonall.links[i].source);
			}

		}
	}



	// Loop through the array of amino acids in the first ring, selecting the appriate circle, and
	// resizing, coloring, and positioning it on the dashed circle
	var ringOneScale = d3.scale.linear().domain([0, Math.max.apply(Math, weightsOne)]).range([5, 25]);

	//if(jsonall.links[i].chains[0] == viewOptions.chains[0] || jsonall.links[i].chains[0] == viewOptions.chains[1]) && (jsonall.links[i].chains[1] == viewOptions.chains[0] || jsonall.links[i].chains[1] == viewOptions.chains[1]))

	for (var i = 0; i < j; i++) {

		node.filter(function(d) {
				if (d.residueNum === jsonall.nodes[ringOne[i]].residueNum && d.chain == jsonall.nodes[ringOne[i]].chain) {

					d3.select("#asteroidGraph").select("svg").append("text")
						.text(function(e) {

							if (viewOptions.chains[0] != viewOptions.chains[1])
								return d.chain + ":" + d.name;

							else
								return d.name;
						})
						.on("click", function(e) {

							viewOptions.highlighted = [d.residueNum, d.residueNum];
							viewOptions.colors = [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]

							viewOptions.mychain = d.chain;
							updateURL(viewOptions);

							reDrawProtein(viewOptions.highlighted, [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]);

							updateAsteroidPymol(d.residueNum);
							if(document.getElementById("ligandList").length!=0){
							  $("#ligandList").val(jsonall.nodes[ringOne[i]].chain + ":" + jsonall.nodes[ringOne[i]].name);
							}

						})

					.style("cursor", "pointer")
						.attr("x", width / 2 + 0.20 * width * Math.sin(2 * Math.PI * i / j))
						.attr("y", height / 2 + 0.20 * width * Math.cos(2 * Math.PI * i / j))
						.attr("font-size", "10px");

					return 1;
				}
			})
			.each(function(d, i) {
				numRingOne = d.weight;
			})
			.attr("visibility", "visible")
			.attr("cx", width / 2 + 0.20 * width * Math.sin(2 * Math.PI * i / j))
			.attr("cy", height / 2 + 0.20 * width * Math.cos(2 * Math.PI * i / j))
			.attr("r", ringOneScale(weightsOne[ringOne[i]]))
			// .attr("stroke", "#D1A24E")
			.attr("stroke", function(d) {

				if(viewOptions.colorless==0){

					if (d.chain == viewOptions.chains[0]) {
						return fill_chains(0);
					}
					else{
						//return fill_chains(1);
						return "0XE7E6E6";
					}
				}
			})
			.attr("stroke-width",2)
			.style("fill", function(d) {
     			if( viewOptions.encode==1 ){
     				//console.log("lala");
					var checkcolor = 0;
					for (var i = 0; i < json_splom.nodes.length; i++) {
						 if (json_splom.nodes[i].residueNum == d.residueNum && json_splom.nodes[i].chain == d.chain) {

							    return color_conservation(json_splom.nodes[i].value);
						  }
					}

     			}

    			else if(viewOptions.colorless==1){
					return "#C1BFBF";
				}

				else{

					if (d.chain == viewOptions.chains[0]) {
						var checkcolor = 0;
						for (var i = 0; i < json_pymolseq1.length; i++) {

							if (json_pymolseq1[i].start <= d.residueNum && d.residueNum <= json_pymolseq1[i].end) {
								checkcolor = -1;


								return fill(i);
							}
						}
						if (checkcolor == 0) {
							return "#C1BFBF";
						}
					} else {
						var checkcolor = 0;
						for (var i = 0; i < json_pymolseq2.length; i++) {

							if (json_pymolseq2[i].start <= d.residueNum && d.residueNum <= json_pymolseq2[i].end) {
								checkcolor = -1;


								return fill2(i);
							}
						}
						if (checkcolor == 0) {
							return "#C1BFBF";
						}
					}
				}
			})
			.on("click", function(d) {

				viewOptions.highlighted = [d.residueNum, d.residueNum];
				viewOptions.colors = [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]

				// if(viewOptions.chains[0]!=viewOptions.chains[1]){
				//   							viewOptions.mychain = d.chain;
				//   						}
				//   						else{viewOptions.mychain = "one";}
				viewOptions.mychain = d.chain;
				updateURL(viewOptions);

				reDrawProtein(viewOptions.highlighted, [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]);

				updateAsteroidPymol(d.residueNum);
				if(document.getElementById("ligandList").length!=0){
					$("#ligandList").val(jsonall.nodes[ringOne[i]].chain + ":" + jsonall.nodes[ringOne[i]].name);
				}

			})

		.style("cursor", "pointer")
			.append("title")
			.text(function(d) {
				return d.residueNum + " (" + weightsOne[ringOne[i]] + " atomic contacts with centre)";
			});
	}


	// Loop through the array of amino acids in the second ring, selecting the appriate circle, and
	// resizing, coloring, and positioning it on the dashed circle



	var ringTwoScale = d3.scale.linear().domain([0, Math.max.apply(Math, weightsTwo)]).range([5, 25]);

	//console.log(weightsOne+"\t"+weightsTwo);
	//console.log(weightsTwo[ringTwo[0]]+"\t" +weightsOne[ringOne[0]]+"\t"+ringTwoScale(weightsTwo[ringTwo[0]]) +"\t"+ringOneScale(weightsOne[ringOne[0]]));

	var xPos, yPos;

	for (var i = 0; i < k; i++) {


		node.filter(function(d) {
				if (d.residueNum === jsonall.nodes[ringTwo[i]].residueNum && d.chain == jsonall.nodes[ringTwo[i]].chain) {

					xPos = width / 2 + 0.40 * width * Math.sin(2 * Math.PI * i / k);
					yPos = height / 2 + 0.40 * width * Math.cos(2 * Math.PI * i / k);

					d3.select("#asteroidGraph").select("svg").append("text")
						.text(function(e) {

							if (viewOptions.chains[0] != viewOptions.chains[1])
								return d.chain + ":" + d.name;

							else
								return d.name;
						})
						.on("click", function(e) {

							viewOptions.highlighted = [d.residueNum, d.residueNum];
							viewOptions.colors = [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]

							viewOptions.mychain = d.chain;
							updateURL(viewOptions);

							reDrawProtein(viewOptions.highlighted, [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]);

							updateAsteroidPymol(d.residueNum);
							if(document.getElementById("ligandList").length!=0){
							  $("#ligandList").val(jsonall.nodes[ringTwo[i]].chain + ":" + jsonall.nodes[ringTwo[i]].name);
							}

						})
						.style("cursor", "pointer")
						.attr("x", width / 2 + 0.40 * width * Math.sin(2 * Math.PI * i / k))
						.attr("y", height / 2 + 0.40 * width * Math.cos(2 * Math.PI * i / k))
						.attr("font-size", "10px");
					return 1;
				}
			})
			.attr("visibility", "visible")
			.attr("cx", xPos)
			.attr("cy", yPos)
			.attr("r", ringTwoScale(weightsTwo[ringTwo[i]]))
			// .attr("fill", "#D1A24E")
			.attr("stroke", function(d) {

				if(viewOptions.colorless==0){

					if (d.chain == viewOptions.chains[0]) {
						return fill_chains(0);

					}
					else{
						//return fill_chains(1);
						return "0XE7E6E6";
					}
				}
			})
			.attr("stroke-width",2)
			.style("fill", function(d) {

     			if( viewOptions.encode==1 ){
     				//console.log("lala");
					var checkcolor = 0;
					for (var i = 0; i < json_splom.nodes.length; i++) {
						 if (json_splom.nodes[i].residueNum == d.residueNum && json_splom.nodes[i].chain == d.chain) {

							    return color_conservation(json_splom.nodes[i].value);
						  }
					}

     			}

    			else if(viewOptions.colorless==1){
					return "#C1BFBF";
				}

				else{
					if (d.chain == viewOptions.chains[0]) {
						var checkcolor = 0;
						for (var i = 0; i < json_pymolseq1.length; i++) {

							if (json_pymolseq1[i].start <= d.residueNum && d.residueNum <= json_pymolseq1[i].end) {
								checkcolor = -1;


								return fill(i);
							}
						}
						if (checkcolor == 0) {
							return "#C1BFBF";
						}
					} else {
						var checkcolor = 0;
						for (var i = 0; i < json_pymolseq2.length; i++) {

							if (json_pymolseq2[i].start <= d.residueNum && d.residueNum <= json_pymolseq2[i].end) {
								checkcolor = -1;


								return fill2(i);
							}
						}
						if (checkcolor == 0) {
							return "#C1BFBF";
						}
					}
				}
			})
			.attr("opacity", 0.5)
			.on("click", function(d) {

				viewOptions.highlighted = [d.residueNum, d.residueNum];
				viewOptions.colors = [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]

				viewOptions.mychain = d.chain;
				updateURL(viewOptions);

				reDrawProtein(viewOptions.highlighted, [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]);

				updateAsteroidPymol(d.residueNum);
				if(document.getElementById("ligandList").length!=0){
					$("#ligandList").val(jsonall.nodes[ringTwo[i]].chain + ":" + jsonall.nodes[ringTwo[i]].name);
				}

			})
			.style("cursor", "pointer")
			.append("title")
			.text(function(d) {
				return d.name + " (" + weightsTwo[ringTwo[i]] + " atomic contacts with residues in ring 1)";
			});
	}

	// asteroidColors[0] = "0x5FDA99";
	asteroidColors[0] = "0X428bca"; //RAJINI BLUE (SAME AS PRIMARY BUTTON BOOTSTRAP)

	for (var i = 0; i < ringOne.length; i++) {
		asteroidAtoms.push(jsonall.nodes[ringOne[i]].residueNum);

		if(viewOptions.colorless==1){
			asteroidColors.push("0XC1BFBF");
		}
		// asteroidColors.push("0xD1A24E");
		else{
			var checkcolor = 0;
			for (var u = 0; u < jsonall.groups.length; u++) {
				if (jsonall.groups[u].start <= jsonall.nodes[ringOne[i]].residueNum && jsonall.nodes[ringOne[i]].residueNum <= jsonall.groups[u].end) {
					checkcolor = -1;

					if (jsonall.nodes[ringOne[i]].chain == viewOptions.chains[0]) {
						var color = fill(u);
					} else {
						var color = fill2(u);
					}
					color = color.replace("#", "0X");
					asteroidColors.push(color);
				}
			}
			if (checkcolor == 0) {
				asteroidColors.push("0XC1BFBF");
			}
		}

	}

	viewOptions.ring = "ringone";
	updateURL(viewOptions);

	asteroidColors_inner[0] = "0X428bca";
	asteroidChains_inner[0] = viewOptions.mychain;

	asteroidColors_outer[0] = "0X428bca";
	asteroidChains_outer[0] = viewOptions.mychain;

	d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
	d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "").style("font-weight", "normal");
	d3.select("#pymolseqs2").selectAll(".rectcell2").style("stroke", "");
	d3.select("#pymolseqs2").selectAll(".mytxt2").style("fill", "").style("font-weight", "normal");

	for (var i = 0; i < ringOne.length; i++) {
		asteroidAtoms_inner.push(jsonall.nodes[ringOne[i]].residueNum);

		//asteroidColors_inner.push("0xD1A24E");
		asteroidChains_inner.push(jsonall.nodes[ringOne[i]].chain);

		if(viewOptions.colorless==1){
			asteroidColors_inner.push("0XC1BFBF");
		}

		else{
			//asteroidColors_inner.push("0xD1A24E");
			var checkcolor = 0;
			for (var u = 0; u < jsonall.groups.length; u++) {
				if (jsonall.groups[u].start <= jsonall.nodes[ringOne[i]].residueNum && jsonall.nodes[ringOne[i]].residueNum <= jsonall.groups[u].end) {
					checkcolor = -1;

					if (jsonall.nodes[ringOne[i]].chain == viewOptions.chains[0]) {
						var color = fill(u);
					} else {
						var color = fill2(u);
					}
					color = color.replace("#", "0X");
					asteroidColors_inner.push(color);

					if (viewOptions.tab == "ligand") {

						if (jsonall.nodes[ringOne[i]].chain == viewOptions.chains[0]) {
							d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
								if (u === index) {
									return true;
								}
							}).transition().style("stroke", "black").attr("stroke-width", 2);

							d3.select("#pymolseqs1").selectAll(".mytxt").filter(function(d, index) {
									if (ringOne[i] === index) {
										return true;
									}
								})
								.style("fill", function(d) {
									return fill(u);
								})
								.style("font-weight", "bold");
						} else {
							d3.select("#pymolseqs2").selectAll(".rectcell2").filter(function(d, index) {
								if (u === index) {
									return true;
								}
							}).transition().style("stroke", "black").attr("stroke-width", 2);

							d3.select("#pymolseqs2").selectAll(".mytxt2").filter(function(d, index) {
									if (ringOne[i] === index) {
										return true;
									}
								})
								.style("fill", function(d) {
									return fill2(u);
								})
								.style("font-weight", "bold");
						}

					}

				}
			}
			if (checkcolor == 0) {
				asteroidColors_inner.push("0XC1BFBF");
			}
		}

	}

	for (var i = 0; i < ringTwo.length; i++) {
		asteroidAtoms_outer.push(jsonall.nodes[ringTwo[i]].residueNum);

		//asteroidColors_outer.push("0xDDB877");

		if(viewOptions.colorless==1){
			asteroidColors_outer.push("0XE7E6E6");
		}

		else{
			var checkcolor = 0;
			for (var u = 0; u < jsonall.groups.length; u++) {
				if (jsonall.groups[u].start <= jsonall.nodes[ringTwo[i]].residueNum && jsonall.nodes[ringTwo[i]].residueNum <= jsonall.groups[u].end) {
					checkcolor = -1;

					if (jsonall.nodes[ringTwo[i]].chain == viewOptions.chains[0]) {
						var color = fill(u);
					} else {
						var color = fill2(u);
					}
					color = color.replace("#", "0X");
					asteroidColors_outer.push(color);

					if (viewOptions.tab == "ligand") {

						if (jsonall.nodes[ringTwo[i]].chain == viewOptions.chains[0]) {
							d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
								if (u === index) {
									return true;
								}
							}).transition().style("stroke", "grey").attr("stroke-width", 2);

							d3.select("#pymolseqs1").selectAll(".mytxt").filter(function(d, index) {
									if (ringTwo[i] === index) {
										return true;
									}
								})
								.style("fill", function(d) {
									return fill(u);
								})
								.style("font-weight", "bold");
						} else {
							d3.select("#pymolseqs2").selectAll(".rectcell2").filter(function(d, index) {
								if (u === index) {
									return true;
								}
							}).transition().style("stroke", "grey").attr("stroke-width", 2);

							d3.select("#pymolseqs2").selectAll(".mytxt2").filter(function(d, index) {
									if (ringTwo[i] === index) {
										return true;
									}
								})
								.style("fill", function(d) {
									return fill2(u);
								})
								.style("font-weight", "bold");
						}

					}
				}
			}
			if (checkcolor == 0) {
				asteroidColors_outer.push("0XC1BFBF");
			}
		}


		asteroidChains_outer.push(jsonall.nodes[ringTwo[i]].chain);
	}

	viewOptions.highlighted = asteroidAtoms_inner;
	viewOptions.colors = asteroidColors_inner;
	viewOptions.highlightedchains_inner = asteroidChains_inner;
	viewOptions.highlightedchains_outer = asteroidChains_outer;

	updateURL(viewOptions);


	// Display the central residue's name
	d3.select("#asteroidGraph").select("svg")
		.append("text")
		//  .text( jsonall.nodes[index].name )
		.text(function(e) {

			if (viewOptions.chains[0] != viewOptions.chains[1])
				return jsonall.nodes[index].chain + ":" + jsonall.nodes[index].name;

			else
				return jsonall.nodes[index].name;
		})
		.attr("x", width / 2 - 5)
		.attr("y", height / 2 + 5);

	addDownloadLink3("asteroidGraph");
	addDownloadLink2("splom");

}

function switchAsteroidLigand() {

	ligand = document.getElementById("ligandList").value;

	viewOptions.center = ligand;

	document.getElementById("center").value = ligand;

	if (ligand.indexOf(":") > -1) {
		viewOptions.mychain = ligand.substring(0, 1);
	}

	// alert(viewOptions.pdb +"laala2");
	updateURL(viewOptions);

	if (viewOptions.chains[0] != viewOptions.chains[1]) {
		drawAsteroidGraphBetweenChains();
	} else {
		drawAsteroidGraph();
		drawMatrixLigand();
	}
	//asteroidColorProtein();
	reDrawProtein(viewOptions.highlighted, [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]);
	addDownloadLink3("asteroidGraph");
	addDownloadLink2("splom");
}

function clickNodesonAsteroid(f) {


	viewOptions.highlighted = [f, f];
	viewOptions.colors = [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]
	updateURL(viewOptions);

	reDrawProtein(viewOptions.highlighted, [parseInt(fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]);

	updateAsteroidPymol(f);


	//d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "");

	//d3.select("#pymolseqs1").selectAll(".mytxt").filter( function(d,index) { if (fi===index) {return true; } }).style("fill", "red").style("font-weight", "bold");

}

//FUNCTION TO REMOVE FROM LIGAND LIST DROP DOWN WHEN CHAIN CHANGES
function removeOptions(selectbox) {
	var i;
	for (i = selectbox.options.length - 1; i >= 0; i--) {
		selectbox.remove(i);
	}
}

//WE SHOULD DO THIS FOR THE JSONALL FILE WITH ALL CHAINS AND INTERACTIONS BECAUSE ONLY ON THIS FILE, THE INDEXES OF THE LINKS ARE NOT CORRECT, WE REDO THIS.
function reassignIndexes() {

	var str;

	for (var i = 0; i < jsonall.links.length; i++) {

		var strind = jsonall.links[i].name.indexOf("-");
		var strind2 = jsonall.links[i].name.indexOf(",");

		var links_name_source = jsonall.links[i].name.substring(0, strind);
		var links_name_target = jsonall.links[i].name.substring(strind + 2, strind2);
		var int_source = parseInt(links_name_source);
		var int_target = parseInt(links_name_target);

		for (var y = 0; y < jsonall.nodes.length; y++) {

			//console.log("source "+jsonall.nodes[y].residueNum +"\t"+ int_source +"\t"+ jsonall.nodes[y].chain);

			if (jsonall.nodes[y].residueNum == int_source && jsonall.nodes[y].chain == jsonall.links[i].chains[0]) {
				// console.log("source "+jsonall.nodes[y].residueNum +"\t"+ y +"\t"+ jsonall.nodes[y].chain);
				jsonall.links[i].source = y;

			}
			if (jsonall.nodes[y].residueNum == int_target && jsonall.nodes[y].chain == jsonall.links[i].chains[3]) {
				//console.log("target "+jsonall.nodes[y].residueNum +"\t"+ y +"\t"+ jsonall.nodes[y].chain);
				jsonall.links[i].target = y;

			}
		}
		// str+=" name: " + jsonall.links[i].name;
		//    			str+=" source: "+jsonall.links[i].source + " target: "+jsonall.links[i].target +"\t"+ jsonall.links[i].chains+ "\n";
	}

	// for (var i=0; i < jsonall.links.length; i++) {
	// 			//console.log(jsonall.links[i].chains[0] +"\t"+jsonall.links[i].chains[3]);
	// 			str+=" name: " + jsonall.links[i].name;
	// 			str+=" source: "+jsonall.links[i].source + " target: "+jsonall.links[i].target + "\n";
	//
	// 	    }

	//console.log(str);

}

//NEW PDF GENERATOR WITH GENERATING HTML PAGE FIRST
function addPDFreport() {

	callhtml2canvas();

	//settimeout is done here to first let the html2canvas method in sottable to take place, then let the rest execute, otherwise, html2canvas has the async problem and executes first
  setTimeout(function() {

  	var pdbname = pdb_name;

  	var html = d3.select("#splom").select("svg")
  		.attr("version", 1.1)
  		.attr("xmlns", "http://www.w3.org/2000/svg")
  		.node().parentNode.innerHTML;

  	var splomURI = "data:image/svg+xml;base64," + btoa(html);

  	var html2 = d3.select("#chordGraph_real").select("svg")
  		.attr("version", 1.1)
  		.attr("xmlns", "http://www.w3.org/2000/svg")
  		.node().parentNode.innerHTML;

  	var chordURI = "data:image/svg+xml;base64," + btoa(html2);

  	var html3 = d3.select("#asteroidGraph").select("svg")
  		.attr("version", 1.1)
  		.attr("xmlns", "http://www.w3.org/2000/svg")
  		.node().parentNode.innerHTML;

  	var asteroidURI = "data:image/svg+xml;base64," + btoa(html3);


  	var html4 = d3.select("#ssline").select("svg")
  		.attr("version", 1.1)
  		.attr("xmlns", "http://www.w3.org/2000/svg")
  		.node().parentNode.innerHTML;

  	var sslineURI = "data:image/svg+xml;base64," + btoa(html4);

  	//console.log(sslineURI);

  	glmol01.show();
  	var imageURI = glmol01.renderer.domElement.toDataURL("image/png");

  	//var image = "../pdftex-files/" + pdbname + "_" + viewOptions.mychain + "/" + pdbname + "_" + viewOptions.mychain + ".png";
  	//var imagesplom = "../pdftex-files/"  + pdbname + "_" + viewOptions.mychain + "/" + pdbname + "_" + viewOptions.mychain + "_splom.png";

  	var title = parsePDBTitle($('#' + "a" + pdbname + '_src').val());

  	title = title.toLowerCase().replace(/\b[a-z]/g, function(letter) {
  		return letter.toUpperCase();
  	});

  	var stringssline;
  	var chain;

  	if(viewOptions.chains[0]==viewOptions.chains[1]){

  	 	stringssline = "<div class=\"row\">\n" +
  		"<div class=\"col-md-12\">\n" +
  		"<img src='" + sslineURI + "' style='height=50px; width:100%;'  align='middle'>\n" +
  		// "<h4 style='text-align:center;'>Mapping the colors (secondary structure level)</h4>\n" +
  		"</div>\n" +
  		"</div>\n";

  		chain = " Chain " + viewOptions.mychain;
  	}

  	else{
  		stringssline = "";
  		chain = " Chains " + viewOptions.chains[0] + " and " + viewOptions.chains[1];
  	}

  	var html_code = "" +
  		"<!doctype html>\n" +
  		"<html>\n" +
  		"<head>\n" +
  		"<script type='text/javascript' src='http://code.jquery.com/jquery.min.js'></script>\n" +
  		"<link href='../../bootstrap-3.2.0-dist/css/bootstrap.min.css' rel='stylesheet'>\n" +
  		"<link href='../../bootstrap-3.2.0-dist/css/navbar-fixed-top.css' rel='stylesheet'>\n" +
  		"<link href='../../css/fix_bottom_space.css' rel='stylesheet'>\n" +
  		"<link type='text/css' rel='stylesheet' href='../../views/style.css'/>\n" +
  		"<link type='text/css' rel='stylesheet' href='../../css/selection.css'/>\n" +
  		"<script type=\"text/javascript\" src=\"../../DataTables-1.10.3/media/js/jquery.dataTables.js\"></script>\n" +
  		"<link type=\"text/css\" rel=\"stylesheet\" href=\"../../DataTables-1.10.3/media/css/jquery.dataTables.css\"/>\n" +
  		"<script src='../../views/splom.js' type='text/javascript'> </script>\n" +
			"<link rel=\"stylesheet\" href=\"//www.ebi.ac.uk/pdbe/pdb-component-library/v1.0/css/pdb.component.library.min-1.0.0.css\"/>\n" +
			"<script src=\"//www.ebi.ac.uk/pdbe/pdb-component-library/libs/d3.min.js\"></script>\n" +
			"<script src=\"//www.ebi.ac.uk/pdbe/pdb-component-library/libs/angular.1.4.7.min.js\"></script>\n" +
			"<script src=\"//www.ebi.ac.uk/pdbe/pdb-component-library/v1.0/js/pdb.component.library.min-1.0.0.js\"></script>\n" +

			"<script>\n" +

				"(function () {\n" +
				//	"setTimeout(function() {\n" +
					"\'use strict\';\n" +
				  "	angular.element(document).ready(function () {\n" +
				  "  angular.bootstrap(document, [\'pdb.component.library\']);\n" +
				  "	});\n" +
					//"}, 2000);\n" +
				"}());\n" +
			"</script>\n" +
  		"<style>\n" +
  		// "body{ background-color: #F2F2F2; }\n" +
  		"body {\n" +
  		"width: 100%;\n" +
  		"height: 100%;\n" +
  		"margin: 0;\n" +
  		"padding: 0;\n" +

  		"}\n" +
  		"* {\n" +
  		"box-sizing: border-box;\n" +
  		"-moz-box-sizing: border-box;\n" +
  		"}\n" +
  		".container {\n" +
  		"width: 210mm;\n" +
  		"padding: 20mm;\n" +
  		"margin: 5mm auto;\n" +
  		"border: 1px #D3D3D3 solid;\n" +
  		"border-radius: 5px;\n" +
  		"background: white;\n" +
  		"}\n" +
			".container2 {\n" +
  		"width: 210mm;\n" +
  		"padding-left: 20mm;\n" +
			"padding-right: 20mm;\n" +
			"padding-top: 2.5mm;\n" +
  		"margin: 5mm auto;\n" +
  		"border: 1px #D3D3D3 solid;\n" +
  		"border-radius: 5px;\n" +
  		"background: white;\n" +
  		"}\n" +
			".container3 {\n" +
  		"width: 210mm;\n" +
  		"padding-left: 20mm;\n" +
			"padding-right: 20mm;\n" +
			"padding-top: 2.5mm;\n" +
  		"margin: auto;\n" +
  		"border: 1px #D3D3D3 solid;\n" +
  		"border-radius: 5px;\n" +
  		"background: white;\n" +
  		"}\n" +
  		"@page {\n" +
  		"size: A4;\n" +
  		"margin: 0;\n" +
  		"}\n" +
  		"@media print {\n" +
  		"html, body {\n" +
  		"width: 210mm;\n" +
  		"height: 297mm;\n" +
  		"}\n" +
  		".container {\n" +
			"width: 210mm;\n" +
  		"margin: 0;\n" +
  		"border: initial;\n" +
  		"border-radius: initial;\n" +
  		"min-height: initial;\n" +
  		"box-shadow: initial;\n" +
  		"background: initial;\n" +
  		"page-break-after: always;\n" +
  		"}\n" +
			".container2 {\n" +
			"width: 210mm;\n" +
  		"margin: 0;\n" +
  		"border: initial;\n" +
  		"border-radius: initial;\n" +
  		"min-height: initial;\n" +
  		"box-shadow: initial;\n" +
  		"background: initial;\n" +
  		"page-break-after: always;\n" +
  		"}\n" +
			".container3 {\n" +
			"width: 210mm;\n" +
  		"margin: 0;\n" +
  		"border: initial;\n" +
  		"border-radius: initial;\n" +
  		"min-height: initial;\n" +
  		"box-shadow: initial;\n" +
  		"background: initial;\n" +
  		"page-break-after: always;\n" +
  		"}\n" +
  		"}\n" +
  		"</style>\n" +
  		"</head>\n" +
  		"<body>\n" +
  		"<div class='container' style=\"background-color: #F2F2F2\">\n" +
  		"<h3 style='text-align:center;'>Report for <a class=\'pdb-links\' pdb-id=\'" + pdbname + "\' href=\'javascript:void(0);\' style=\"color: #A0A1A2\">" + pdbname + "</a> : " + title + "" + chain + "<h3>\n" +
			"<h4 style='text-align:center;'><a href='../"+pathname+"/" + pdbname + "/" + pdbname + "_txt.zip'>List of all contacts can be downloaded here</a></h4>\n" +
			"<h4 style='text-align:center;' id='date'></h4>\n" +
		// "<h5 style='text-align:center;'>Cutoff for calculating distances used is " + cutoff + "<h5>\n" +
  		"<script>\n" +
  		"var d = new Date();\n" +
  		"document.getElementById('date').innerHTML = d.toDateString();\n" +
  		"</script>\n" +

  		stringssline +

			"<div class=\"row\">\n" +
  		"<div class=\"col-xs-6\">\n" +
  		"<img src='" + chordURI + "' width='300' height='300' align='middle'>\n" +
  		"<h5 style='text-align:center;'>Figure 1: Chord plot showing secondary structure elements</h5>\n" +
  		"</div>\n" +
  		"<div class=\"col-xs-6\">\n" +
  		"<img src='" + asteroidURI + "' width='300' height='300' align='middle'>\n" +
  		"<h5 style='text-align:center;'>Figure 2: Asteroid Plot for selected residue " + viewOptions.center + "</h5>\n" +
  		"</div>\n" +
  		"</div>\n" +
  		"<div class=\"row\">\n" +
  		"<div class=\"col-xs-6\">\n" +
  		"<img src='" + splomURI + "' width='350' height='350' align='middle'>\n" +
  		"<h5 style='text-align:center;'>Figure 3: Network statistics</h5>\n" +
  		"</div>\n" +
  		"<div class=\"col-xs-6\">\n" +
			"<div style=\"padding-top:30px; padding-bottom:15px;\">\n" +
  		"<img src='" + imageURI + "' width='350' height='100%' align='middle'>\n" +
			"</div>\n" +
  		"<h5 style='text-align:center;'>Figure 4: The 3D structure view of " + pdbname + " " + viewOptions.mychain + "</h5>\n" +
			"</div>\n" +
  		"</div>\n" +
  		"</div>\n" +
  		"<div class='container2' style=\"background-color: #F2F2F2\">\n" +
  		"<div class=\"row\">\n" +
  		"<div class=\"col-xs-6\">\n" +
  		"<img src='" + tableURI[0] + "' width='270' height='auto' align='middle'>\n" +
  		"<h5 style='text-align:center;'>Table 1: Top ten residues with highest solvated area</h5>\n" +
  		"</div>\n" +
  		"<div class=\"col-xs-6\">\n" +
  		"<img src='" + tableURI[1] + "' width='270' height='auto' align='middle'>\n" +
  		"<h5 style='text-align:center;'>Table 2: Bottom ten residues with lowest solvated area</h5>\n" +
  		"</div>\n" +
  		"</div>\n" +
  		"<div class=\"row\">\n" +
  		"<div class=\"col-xs-6\">\n" +
  		"<img src='" + tableURI[6] + "' width='270' height='auto' align='middle'>\n" +
  		"<h5 style='text-align:center;'>Table 3: Top ten residues with highest degree values</h5>\n" +
  		"</div>\n" +
  		"<div class=\"col-xs-6\">\n" +
  		"<img src='" + tableURI[7] + "' width='270' height='auto' align='middle'>\n" +
  		"<h5 style='text-align:center;'>Table 4: Bottom ten residues with lowest degree values</h5>\n" +
  		"</div>\n" +
  		"</div>\n" +
  		"<div class=\"row\">\n" +
  		"<div class=\"col-xs-6\">\n" +
  		"<img src='" + tableURI[2] + "' width='270' height='auto' align='middle'>\n" +
  		"<h5 style='text-align:center;'>Table 5: Top ten residues with highest betwenness values</h5>\n" +
  		"</div>\n" +
  		"<div class=\"col-xs-6\">\n" +
  		"<img src='" + tableURI[3] + "' width='270' height='auto' align='middle'>\n" +
  		"<h5 style='text-align:center;'>Table 6: Bottom ten residues with lowest betwenness values</h5>\n" +
  		"</div>\n" +
  		"</div>\n" +
  		"</div>\n" +
			"<div class='container3' style=\"background-color: #F2F2F2\">\n" +
			"<div class=\"row\">\n" +
  		"<div class=\"col-xs-6\">\n" +
  		"<img src='" + tableURI[4] + "' width='270' height='auto' align='middle'>\n" +
  		"<h5 style='text-align:center;'>Table 7: Top ten residues with highest closeness values</h5>\n" +
  		"</div>\n" +
  		"<div class=\"col-xs-6\">\n" +
  		"<img src='" + tableURI[5] + "' width='270' height='auto' align='middle'>\n" +
  		"<h5 style='text-align:center;'>Table 8: Bottom ten residues with lowest closeness values</h5>\n" +
  		"</div>\n" +
  		"</div>\n" +
			"<div class=\"row\">\n";

			if(ligandarray.length>0){

  		html_code += "<div class=\"col-xs-6\" style=\"display:table-cell; vertical-align:middle; text-align:center\">\n";

			if( viewOptions.chains[0] == viewOptions.chains[1] ){

				html_code +=	"<img src='" + tableURI[8] + "' width='200' height='auto' align='middle'>\n" +
	  		"<h5 style='text-align:center;'>Table 9: Top ten residues with highest number of atomic contacts with a ligand</h5>\n" +
	  		"</div>\n";

				}
				else{
					html_code +=	"<img src='" + tableURI[8] + "' width='300' height='auto' align='middle'>\n" +
		  		"<h5 style='text-align:center;'>Table 9: Top ten residues with highest number of atomic contacts with a ligand</h5>\n" +
		  		"</div>\n";
				}

			}

			else{
				html_code += "<div class=\"col-xs-6\">\n" +
				"</div>\n";
			}

			if(number_of_rows > 10){

				if( viewOptions.chains[0] == viewOptions.chains[1] ){
					html_code +=	"<div class=\"col-xs-6\" style=\"display:table-cell; vertical-align:middle; text-align:center\">\n" +
						"<img src='" + tableURI[9] + "' width='200' height='auto' align='middle'>\n" +
			  		"<h5 style='text-align:center;'>Table 10: Bottom ten residues with lowest number of atomic contacts with a ligand</h5>\n" +
			  		"</div>\n";
				}
				else{
					html_code +=	"<div class=\"col-xs-6\" style=\"display:table-cell; vertical-align:middle; text-align:center\">\n" +
						"<img src='" + tableURI[9] + "' width='300' height='auto' align='middle'>\n" +
			  		"<h5 style='text-align:center;'>Table 10: Bottom ten residues with lowest number of atomic contacts with a ligand</h5>\n" +
			  		"</div>\n";
				}

		  		html_code += "</div>\n" +
					"</div>\n" +
		  		"</body>\n" +
		  		"</html>\n";
			}
			else{
				html_code += "<div class=\"col-xs-6\">\n" +
				"</div>\n" +
	  		"</div>\n" +
				"</div>\n" +
	  		"</body>\n" +
	  		"</html>\n";
			}


		//	setTimeout(function() {

		//ADDED THE LAST PART WINDOW OPEN AND HIDE MODAL INTO SUCCESS OF AJAX
		//AND CHANGED THE async: false to async: true.
		//async: true caused the browser to freeze so needed to change to false
		//then, ajax tried to execute before anything else, so added success: to wait until data is sent and
		//ajax is executed on time....
		//now browser does not freeze but generating report takes 30-40 seconds which is fine
			  	$.ajax({
			  		type: "POST",
			  		url: "createHTML.php",
			  		dataType: 'text',
			  		async: true,
			  		data: {
			  			structure: pdbname,
			  			chain: viewOptions.mychain,
			  			code: html_code
			  				//htmlfile : "../index.html"
			  		},
						success:function () {
							var texfile = "../pdftex-files/" + pdbname + "_" + viewOptions.mychain + "/" + pdbname + "_" + viewOptions.mychain + ".html";

					  	window.open(texfile);
							$('#reportprocess').modal('hide');
						}
			  	});
		//}, 10000);

  }, 15000);



}

function checkValid() {

	var myNode = document.getElementById("ssnotice");
	// console.log(myNode.lastChild);
	// myNode.removeChild(myNode.lastChild);

	var divss = document.createElement('div');

	var redefinedgroups = JSON.parse(viewOptions.groups);

	var errors = "";
	var errors2 = "";
	var check = 0;
	var check2 = 0;

	errors += "Overlapping residues! Please re-enter the following values: \n";

	for (var i = 0; i < redefinedgroups.length; i++) {
		for (var y = i + 1; y < redefinedgroups.length; y++) {

			if (redefinedgroups[i].end >= redefinedgroups[y].start) {
				errors += "End residue (" + redefinedgroups[i].end + ") of " + redefinedgroups[i].name + " is larger than start residue (" + redefinedgroups[y].start + ") of " + redefinedgroups[y].name + "!\n";
				check = -1;
			}

		}
	}

	errors2 += "End residue of a secondary structure is smaller than its start residue! Please re-enter the values: \n";
	for (var i = 0; i < redefinedgroups.length; i++) {

		if (redefinedgroups[i].end < redefinedgroups[i].start) {
			errors2 += "End residue (" + redefinedgroups[i].end + ") of " + redefinedgroups[i].name + " is smaller than its start residue (" + redefinedgroups[i].start + ")!\n";
			check2 = -1;
		}
	}

	if (check == -1 && check2 == 0) {
		//console.log(errors);
		divss.innerHTML = errors;

		document.getElementById('ssnotice').appendChild(divss);

		$('#ssnotice').show();
	} else if (check == 0 && check2 == -1) {
		divss.innerHTML = errors2;

		document.getElementById('ssnotice').appendChild(divss);

		$('#ssnotice').show();
	} else if (check == -1 && check2 == -1) {

		var err = errors + errors2;
		divss.innerHTML = err;

		document.getElementById('ssnotice').appendChild(divss);

		$('#ssnotice').show();
	} else {
		$('#ssnotice').hide();

		updateURL(viewOptions);
		switchView("chord");
		drawChordRedefineSS();
	}

}

function drawChordRedefineSS() {

	if (first == second) {

		d3.json(pathname +"/" + pdb_name + "/" + pdb_name + "_" + first + ".json", function(data) {

			json = data;

			checkValidSSonLoad();

			drawChord("null");
			colorChordNames(viewOptions.group1, viewOptions.group2);


		});

	} else if (first != second) {

		d3.json(pathname +"/" + pdb_name + "/" + pdb_name + "_" + first + "-" + second + ".json", function(data) {

			json = data;

			checkValidSSonLoadBetweenChains();

			interchainsChord3(); // a new approach I found here: http://jsfiddle.net/sxZkK/2/ this has two level chord arcs


		});

	}

	// viewOptions["view"] = newView;
	updateURL(viewOptions);
}

function checkValidSSonLoad() {

	var errors = "";
	var check = 0;

	for (var i = 0; i < json.groups.length; i++) {
		for (var y = i + 1; y < json.groups.length; y++) {

			if (json.groups[i].end > json.groups[y].start) {
				//errors += "End residue (" +json.groups[i].end+ ") of " + json.groups[i].name + " is larger than start residue (" +json.groups[y].start+ ") of " + json.groups[y].name + "!\n";
				json.groups[i].end = json.groups[y].start - 1;
			} else if (json.groups[i].end == json.groups[y].start) {
				//errors += "End residue (" +json.groups[i].end+ ") of " + json.groups[i].name + " is larger than start residue (" +json.groups[y].start+ ") of " + json.groups[y].name + "!\n";
				if (json.groups[i].end - json.groups[i].start > 1) {
					json.groups[i].end = json.groups[y].start - 1;
				}

			}
		}
	}

	//console.log(errors);

	// for (var i = 0; i < json.groupsloops.length; i++) {
// 		for (var y = i + 1; y < json.groupsloops.length; y++) {
//
// 			if (json.groupsloops[i].end > json.groupsloops[y].start) {
// 				//errors += "End residue (" +json.groups[i].end+ ") of " + json.groups[i].name + " is larger than start residue (" +json.groups[y].start+ ") of " + json.groups[y].name + "!\n";
// 				json.groupsloops[i].end = json.groupsloops[y].start - 1;
// 			} else if (json.groupsloops[i].end == json.groupsloops[y].start) {
// 				//errors += "End residue (" +json.groups[i].end+ ") of " + json.groups[i].name + " is larger than start residue (" +json.groups[y].start+ ") of " + json.groups[y].name + "!\n";
// 				if (json.groupsloops[i].end - json.groupsloops[i].start > 1) {
// 					json.groupsloops[i].end = json.groupsloops[y].start - 1;
// 				}
//
// 			}
// 		}
// 	}

}

function checkValidSSonLoadBetweenChains() {

	cmp = function(a, b) {
		if (a > b) return +1;
		if (a < b) return -1;
		return 0;
	}

	json.groups.sort(function(a, b) {
		return cmp(a.name[0], b.name[0]) || cmp(a.start, b.start)
	});

	json.groupsloops.sort(function(a, b) {
		return cmp(a.name[0], b.name[0]) || cmp(a.start, b.start)
	});

	var errors = "";
	var check = 0;

	for (var i = 0; i < json.groups.length; i++) {
		for (var y = i + 1; y < json.groups.length; y++) {

			if(json.groups[i].name[0]==json.groups[y].name[0]){

				if (json.groups[i].end > json.groups[y].start) {
					//errors += "End residue (" +json.groups[i].end+ ") of " + json.groups[i].name + " is larger than start residue (" +json.groups[y].start+ ") of " + json.groups[y].name + "!\n";
					json.groups[i].end = json.groups[y].start - 1;
				} else if (json.groups[i].end == json.groups[y].start) {
					//errors += "End residue (" +json.groups[i].end+ ") of " + json.groups[i].name + " is larger than start residue (" +json.groups[y].start+ ") of " + json.groups[y].name + "!\n";
					if (json.groups[i].end - json.groups[i].start > 1) {
						json.groups[i].end = json.groups[y].start - 1;
					}

				}
			}
		}
	}


}

function removeDuplicatesLoops() {

	json.groupsloops = arrUnique();

}

function reassignIndexesAfterHOHchange() {

	var str;

	//if(viewOptions.chains[0]==viewOptions.chains[1]){

		for (var i = 0; i < json.links.length; i++) {

			var strind = json.links[i].name.indexOf("-");
			var strind2 = json.links[i].name.indexOf(",");

			var links_name_source = json.links[i].name.substring(0, strind);
			var links_name_target = json.links[i].name.substring(strind + 2, strind2);
			var int_source = parseInt(links_name_source);
			var int_target = parseInt(links_name_target);

			for (var y = 0; y < json.nodes.length; y++) {

				if (json.nodes[y].residueNum == int_source && json.nodes[y].chain == json.links[i].chains[0]) {
					// console.log("source "+jsonall.nodes[y].residueNum +"\t"+ y +"\t"+ jsonall.nodes[y].chain);
					json.links[i].source = y;

				}
				if (json.nodes[y].residueNum == int_target && json.nodes[y].chain == json.links[i].chains[3]) {
					//console.log("target "+jsonall.nodes[y].residueNum +"\t"+ y +"\t"+ jsonall.nodes[y].chain);
					json.links[i].target = y;

				}
			}

		}
		//}

	// else{
//
//
// 		//WHEN BETWEEN CHAINS IS SELECTED, JSON ITSELF IS READ FROM THE A-B.JSON FILE, THEREFORE THIS WILL BE NEEDED AGAIN
// 		for (var i = 0; i < json.links.length; i++) {
//
// 			var strind = json.links[i].name.indexOf("-");
// 			var strind2 = json.links[i].name.indexOf(",");
//
// 			var links_name_source = json.links[i].name.substring(0, strind);
// 			var links_name_target = json.links[i].name.substring(strind + 2, strind2);
// 			var int_source = parseInt(links_name_source);
// 			var int_target = parseInt(links_name_target);
//
// 			for (var y = 0; y < json.nodes.length; y++) {
//
// 				if (json.nodes[y].residueNum == int_source && json.nodes[y].chain == json.links[i].chains[0]) {
// 					// console.log("source "+jsonall.nodes[y].residueNum +"\t"+ y +"\t"+ jsonall.nodes[y].chain);
// 					json.links[i].source = y;
//
// 				}
// 				if (json.nodes[y].residueNum == int_target && json.nodes[y].chain == json.links[i].chains[3]) {
// 					//console.log("target "+jsonall.nodes[y].residueNum +"\t"+ y +"\t"+ jsonall.nodes[y].chain);
// 					json.links[i].target = y;
//
// 				}
// 			}
//
// 		}
// 	}

}
function reassignIndexesAfterHOHchangeSource() {
	var str;
	//TARG AND SOURCE ARE THE SAME AS WHOLE A AND B JSON FILES SEPERATELY, BUT THEY ARE READ AGAIN WHEN THE BETWEEN CHAINS ARE SELECTED
	for (var i = 0; i < jsonSour.links.length; i++) {

		var strind = jsonSour.links[i].name.indexOf("-");
		var strind2 = jsonSour.links[i].name.indexOf(",");

		var links_name_source = jsonSour.links[i].name.substring(0, strind);
		var links_name_target = jsonSour.links[i].name.substring(strind + 2, strind2);
		var int_source = parseInt(links_name_source);
		var int_target = parseInt(links_name_target);

		for (var y = 0; y < jsonSour.nodes.length; y++) {

			if (jsonSour.nodes[y].residueNum == int_source && jsonSour.nodes[y].chain == jsonSour.links[i].chains[0]) {
				// console.log("source "+jsonall.nodes[y].residueNum +"\t"+ y +"\t"+ jsonall.nodes[y].chain);
				jsonSour.links[i].source = y;

			}
			if (jsonSour.nodes[y].residueNum == int_target && jsonSour.nodes[y].chain == jsonSour.links[i].chains[3]) {
				//console.log("target "+jsonall.nodes[y].residueNum +"\t"+ y +"\t"+ jsonall.nodes[y].chain);
				jsonSour.links[i].target = y;

			}
		}
	}

}
function reassignIndexesAfterHOHchangeTarget() {

	var str;

	for (var i = 0; i < jsonTarg.links.length; i++) {

		var strind = jsonTarg.links[i].name.indexOf("-");
		var strind2 = jsonTarg.links[i].name.indexOf(",");

		var links_name_source = jsonTarg.links[i].name.substring(0, strind);
		var links_name_target = jsonTarg.links[i].name.substring(strind + 2, strind2);
		var int_source = parseInt(links_name_source);
		var int_target = parseInt(links_name_target);

		for (var y = 0; y < jsonTarg.nodes.length; y++) {

			if (jsonTarg.nodes[y].residueNum == int_source && jsonTarg.nodes[y].chain == jsonTarg.links[i].chains[0]) {
				// console.log("source "+jsonall.nodes[y].residueNum +"\t"+ y +"\t"+ jsonall.nodes[y].chain);
				jsonTarg.links[i].source = y;

			}
			if (jsonTarg.nodes[y].residueNum == int_target && jsonTarg.nodes[y].chain == jsonTarg.links[i].chains[3]) {
				//console.log("target "+jsonall.nodes[y].residueNum +"\t"+ y +"\t"+ jsonall.nodes[y].chain);
				jsonTarg.links[i].target = y;

			}
		}

	}
}

function removeHOH() {

	// for(var a=0;a<json.links.length;a++){
// 		console.log(json.links[a].name);
// 	}

		var jsonlinks = new Array();
		var cs=0;

		var checkHOH=0;

		var jsonnodes = new Array();
		var c=0;
		for(var i=0; i<json.nodes.length; i++){

			if(json.nodes[i].name.length>2 && json.nodes[i].name.substring(0,3)=="HOH"){
				checkHOH=-1;
			}
			else{
				jsonnodes[c] = json.nodes[i];
				c++;

				// for(var y=0; y<json.links.length; y++)
// 				{
// 					if((i==json.links[y].target && json.nodes[json.links[y].source].name.substring(0,3)!="HOH") || (i==json.links[y].source && json.nodes[json.links[y].target].name.substring(0,3)!="HOH"))
// 					{
// 						console.log(json.nodes[i].name +"\t"+ i +"\t"+json.links[y].target+"\t"+json.links[y].source+"\t"+json.links[y].name);
//
// 						jsonlinks[cs] = json.links[y];
// 						cs++;
// 					}
// 				}
			}
		}


		if(checkHOH==-1){

			for(var y=0; y<json.links.length; y++)
			{
				for(var i=0; i<json.nodes.length; i++){

					if(json.nodes[json.links[y].source].name.substring(0,3)=="HOH" || json.nodes[json.links[y].target].name.substring(0,3)=="HOH"){}
					else
					{
						//console.log(json.nodes[i].name +"\t"+ i +"\t"+json.links[y].target+"\t"+json.links[y].source+"\t"+json.links[y].name);

						jsonlinks[cs] = json.links[y];
						cs++;
						break;
					}
				}
			}

			json.nodes = jsonnodes;
			json.links = jsonlinks;
			reassignIndexesAfterHOHchange();

		}
}


function removeHOHSource() {

	var jsonlinks = new Array();
	var cs=0;

	var checkHOH=0;

	var jsonnodes = new Array();
	var c=0;
	for(var i=0; i<jsonSour.nodes.length; i++){

		if(jsonSour.nodes[i].name.length>2 && jsonSour.nodes[i].name.substring(0,3)=="HOH"){
			checkHOH=-1;
		}
		else{
			jsonnodes[c] = jsonSour.nodes[i];
			c++;
		}
	}

	if(checkHOH==-1){

		for(var y=0; y<jsonSour.links.length; y++)
		{
			for(var i=0; i<jsonSour.nodes.length; i++){

				if(jsonSour.nodes[jsonSour.links[y].source].name.substring(0,3)=="HOH" || jsonSour.nodes[jsonSour.links[y].target].name.substring(0,3)=="HOH"){}
				else
				{
					jsonlinks[cs] = jsonSour.links[y];
					cs++;
					break;
				}
			}
		}

		jsonSour.nodes = jsonnodes;
		jsonSour.links = jsonlinks;
		reassignIndexesAfterHOHchangeSource();
	}

}

function removeHOHTarget() {

	var jsonlinks = new Array();
	var cs=0;

	var checkHOH=0;

	var jsonnodes = new Array();
	var c=0;
	for(var i=0; i<jsonTarg.nodes.length; i++){

		if(jsonTarg.nodes[i].name.length>2 && jsonTarg.nodes[i].name.substring(0,3)=="HOH"){
			checkHOH=-1;
		}
		else{
			jsonnodes[c] = jsonTarg.nodes[i];
			c++;
		}
	}

	if(checkHOH==-1){
		for(var y=0; y<jsonTarg.links.length; y++)
		{
			for(var i=0; i<jsonTarg.nodes.length; i++){

				if(jsonTarg.nodes[jsonTarg.links[y].source].name.substring(0,3)=="HOH" || jsonTarg.nodes[jsonTarg.links[y].target].name.substring(0,3)=="HOH"){}
				else
				{
					jsonlinks[cs] = jsonTarg.links[y];
					cs++;
					break;
				}
			}
		}

		jsonTarg.nodes = jsonnodes;
		jsonTarg.links = jsonlinks;
		reassignIndexesAfterHOHchangeTarget();
	}

}

function arrUnique() {
	var arr = [], //to collect id values
	    collection = []; //collect unique object

	$.each(json.groupsloops, function (index, value) {
	    if ($.inArray(value.name, arr) == -1) { //check if id value not exits than add it
	        arr.push(value.name);//push id value in arr
	        collection.push(value); //put object in collection to access it's all values
	    }
	});
    return collection;
}

function addLastLoop() {

	var lastloop = [];
	var lastloop1 = [];
	var lastloop2 = [];

	var check=0;
	var check1=0;
	var check2=0;

	var count=1;

	if(viewOptions.chains[0]==viewOptions.chains[1]){

		for (var i = 0; i < json.groupsloops.length; i++) {
			if(json.groupsloops[i].name[2]=="L"){
				count++;
			}
		}

		for (var i = 0; i < json.nodes.length; i++) {
			if (i == json.nodes.length - 1 && json.nodes[i].residueNum > json.groups[json.groups.length - 1].end && json.groups[json.groups.length - 1].end > json.groups[json.groups.length - 1].start) {

				lastloop.start =  json.groups[json.groups.length - 1].end+1;
				lastloop.end = json.nodes[i].residueNum;
				lastloop.name = json.nodes[i].chain+":LOOP"+count;

				check=-1;

			}
		}
		if(check==-1){
			json.groupsloops.push(lastloop);
		}
	}

	else{

		var count1=1;
		var count2=1;

		for (var i = 0; i < json.groupsloops.length; i++) {
			//console.log(json.groupsloops[i].name);
			if(json.groupsloops[i].name[2]=="L" && viewOptions.chains[0]==json.groupsloops[i].name[0]){
				//console.log(json.groupsloops[i].name +" in");
				count1++;
			}
			if(json.groupsloops[i].name[2]=="L" && viewOptions.chains[1]==json.groupsloops[i].name[0]){
				count2++;
			}
		}

		for (var i = 0; i < json.nodes.length; i++) {
			if (viewOptions.chains[0]==json.nodes[i].chain && json.nodes[i].chain != json.nodes[i+1].chain && json.nodes[i].residueNum > json_pymolseq1[json_pymolseq1.length - 1].end && json_pymolseq1[json_pymolseq1.length - 1].end > json_pymolseq1[json_pymolseq1.length - 1].start) {

				lastloop1.start =  json_pymolseq1[json_pymolseq1.length - 1].end+1;
				lastloop1.end = json.nodes[i].residueNum;
				lastloop1.name = json.nodes[i].chain+":LOOP"+count1;

				check1=-1;

			}
		}
		if(check1==-1){
			json.groupsloops.push(lastloop1);
		}

		for (var i = 0; i < json.nodes.length; i++) {
			if (viewOptions.chains[1]==json.nodes[i].chain && i == json.nodes.length - 1 && json.nodes[i].residueNum > json_pymolseq2[json_pymolseq2.length - 1].end && json_pymolseq2[json_pymolseq2.length - 1].end > json_pymolseq2[json_pymolseq2.length - 1].start) {

				lastloop2.start =  json_pymolseq2[json_pymolseq2.length - 1].end+1;
				lastloop2.end = json.nodes[i].residueNum;
				lastloop2.name = json.nodes[i].chain+":LOOP"+count2;

				check2=-1;

			}
		}
		if(check2==-1){
			json.groupsloops.push(lastloop2);
		}
	}
}

//CHANGED: NOT NEEDED AS THE NA IS ADDED TO THE GROUP IN C++ FILE NOW.
function addLoopsNucleicAcids() {

	if(viewOptions.chains[0]==viewOptions.chains[1]){

		json.groupsloops = json.groups;
	}

	else{

        //IF BOTH CHAINS ARE NUCLEICACID
		if(json.groups.length==2){
			json.groupsloops = json.groups;
		}

		else{
			for (var i = 0; i < json.groups.length; i++) {
				if(json.groups[i].name[2]=="N" || json.groups[i].name[2]=="R"){
					json.groupsloops.push(json.groups[i]);
				}
			}
		}
	}
}


function fillgroups() {
	var group = [];
	var group1 = [];
	var group2= [];

	if(viewOptions.chains[0]==viewOptions.chains[1]){

		var rna=0;

		for(var i=0; i<json.nodes.length;i++){
			if(json.nodes[i].name[0]=="U"){
				rna=1;
			}
		}
		group.start=json.nodes[0].residueNum;
		group.end=json.nodes[json.nodes.length-1].residueNum;

		if(rna==1){
			group.name=viewOptions.chains[0]+":RiboNucleicAcid";
		}
		else{
			group.name=viewOptions.chains[0]+":group";
		}


		json.groups.push(group);
	}

	else{

		var rna1=0;
		var rna2=0;

		var index;

		for(var i=0; i<json.nodes.length;i++){
			if(json.nodes[i].name[0]=="U" && viewOptions.chains[0]==json.nodes[i].chain){
				rna1=1;
			}
			else if(json.nodes[i].name[0]=="U" && viewOptions.chains[1]==json.nodes[i].chain){
				rna2=1;
			}

			if(json.nodes[i].chain!=json.nodes[i+1].chain && i!=json.nodes.length-1){
				index=i;
			}
		}

		if(rna1==1){
			group1.start=json.nodes[0].residueNum;

			group1.end=json.nodes[index].residueNum;

			group1.name=viewOptions.chains[0]+":RiboNucleicAcid";

			jsonSour.groups.push(group1);
		}
		if(rna2==1){
			group2.start=json.nodes[index+1].residueNum;
			group2.end=json.nodes[json.nodes.length-1].residueNum;

			group2.name=viewOptions.chains[1]+":RiboNucleicAcid";

			jsonTarg.groups.push(group2);

		}

	}
}

function switchViewLigand(newView) {

  	if (newView === 'colorless') {

		d3.select("#splom").select("svg").remove();

		viewOptions.colorless = 1;

		viewOptions["view"] = 'scatter';

        viewOptions.highlightedsplom=[];
        updateURL(viewOptions);
        drawTable(viewOptions.highlightedsplom);
        reDrawProtein([], []);

		drawSplom();

		if (viewOptions.chains[0] != viewOptions.chains[1]) {
			drawAsteroidGraphBetweenChains();
		} else {
			drawAsteroidGraph();
			drawMatrixLigand();
		}
		asteroidColorProtein();

    }

  	else if (newView === 'colorfull') {

		d3.select("#splom").select("svg").remove();

		viewOptions.colorless = 0;

		viewOptions["view"] = 'scatter';

        viewOptions.highlightedsplom=[];
        updateURL(viewOptions);
        drawTable(viewOptions.highlightedsplom);
        reDrawProtein([], []);

		drawSplom();

		if (viewOptions.chains[0] != viewOptions.chains[1]) {
			drawAsteroidGraphBetweenChains();
		} else {
			drawAsteroidGraph();
			drawMatrixLigand();
		}
		asteroidColorProtein();

    }

    viewOptions["view"] = newView;
    updateURL(viewOptions);
}

function drawMatrixLigand() {

	var highlighted = viewOptions.highlighted;

	var ligand = viewOptions.highlighted[0];
	var ligandname;

	for(var i=0; i<json.nodes.length; i++){
		if(ligand == json.nodes[i].residueNum){
			ligandname = json.nodes[i].name;
			break;
		}
	}

	var contactedresidues = viewOptions.highlighted.slice(1);

	console.log(ligand);
	console.log(contactedresidues);

	var atomcontacts = [];
	var totalatomtypes = [];
	var a=0;

	var totalcontacts=0;

	for(var i=0; i<json.links.length; i++){
		var strind = json.links[i].name.indexOf("-");
		var strind2 = json.links[i].name.indexOf(",");

		var links_name_source = json.links[i].name.substring(0, strind);
		var links_name_target = json.links[i].name.substring(strind + 2, strind2);
		var int_source = parseInt(links_name_source);
		var int_target = parseInt(links_name_target);

		if(ligand==int_source){

			//contactedresidues.forEach(function(x) { atomcontacts[x] = {}; });

			for(var y=0; y<contactedresidues.length; y++){
				if(contactedresidues[y]==int_target){

					totalcontacts += json.links[i].value;

					atoms = json.links[i].atomnames.split(',');
					var c = 0;
					var sourceatoms = [];
					for(var z=0; z<atoms.length-1; z++){
						sourceatoms[c] = atoms[z].split("-")[0];
						c++;
						totalatomtypes[a] = atoms[z].split("-")[0];
						a++;
					}

					sourceatoms.sort();
					//count duplicate atoms
					var counts = {};
					sourceatoms.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });

					console.log(counts);

					atomcontacts.push(counts);

					temp = {};

					// for (x in counts) {
    			// 	console.log(x + " " + counts[x]);
					// 	temp[int_target] = counts[x];
					// 	atomcontacts[x].push({id: "7"});
					// }

					//console.log(json.links[i].atomnames);
					//console.log(sourceatoms);
					// break;
				}
			}
		}
		else if(ligand==int_target){
			for(var y=0; y<contactedresidues.length; y++){
				if(contactedresidues[y]==int_source){

					totalcontacts += json.links[i].value;

					atoms = json.links[i].atomnames.split(',');
					var c = 0;
					var sourceatoms = [];
					for(var z=0; z<atoms.length-1; z++){
						sourceatoms[c] = atoms[z].split("-")[1];
						c++;
						totalatomtypes[a] = atoms[z].split("-")[1];
						a++;
					}

					sourceatoms.sort();
					//count duplicate atoms
					var counts = {};
					sourceatoms.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });

					console.log(counts);
					atomcontacts.push(counts);

				}
			}
		}
	}

	var uniqueAtoms = [];

	$.each(totalatomtypes, function(i, el){
			if($.inArray(el, uniqueAtoms) === -1) uniqueAtoms.push(el);
	});

var contactedresidueNames = [];

	for(var i=0; i<json.nodes.length; i++){
		for(var y=0; y<contactedresidues.length; y++){
			if(json.nodes[i].residueNum == contactedresidues[y]){
				contactedresidueNames[y] = json.nodes[i].name;
			}
		}
	}

	var infotext = "<b>"+ligandname + "</b> has <b>" + totalcontacts + "</b> atomic contacts with its immediate neighbors";

	$('#contactpanelligand').html(infotext);

//
// ///////////////////////////////////////////////////////
// //Create matrix

var group1_length = uniqueAtoms.length;
var group2_length = contactedresidues.length;

	// Pick sizes so that everything fits on the screen
	// and cells are square, with sides < 24px
	if ((window.innerWidth - 120) / 3 > window.innerHeight - 120) {
		// constrained by width
		var square = ((window.innerWidth - 120) / 3) / (group2_length/2.5);
	} else {
		// constrained by height
		var square = (window.innerHeight - 120) / (group1_length/2.5);
	}
	if (square > 24) {
		square = 24;
	}
	var width = square * group2_length;
	var height = square * group1_length;

	console.log(width+"\t"+height)

	var svgStyle = ".background {\
      fill: none;\
    }\
    \
    line {\
      stroke: #BDBDBD;\
    }\
    \
    text.active {\
      fill: red;\
      font-size: 15;\
      font-weight: bold;\
    }";


	//THIS IS FOR WHEN THREE SEPERATE DIVS ARE GENERATED FOR 1 FOR COLUMN, 1 FOR ROW TEXTS AND 1 FOR THE MATRIX ITSELF
	var margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};

	var x = d3.scale.ordinal().rangeBands([0, width]),
		y = d3.scale.ordinal().rangeBands([0, height]),
		z = d3.scale.linear().domain([0, 4]).clamp(true),
		c = d3.scale.category10().domain(d3.range(10));

		x.domain(d3.range(group2_length));
		y.domain(d3.range(group1_length));

	d3.select("#ligandmatrix").select("svg").remove();

	var svg = d3.select("#ligandmatrix").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		//.style("margin-left", -margin.left + "px")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Apply the CSS styling
	d3.select("#ligandmatrix").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var matrix = [];

	for (var i = 0; i <= group1_length-1; i++) {
		matrix[i] = d3.range(group2_length).map(function(j) {
			return {
				x:j,
				y:i,
				z: 0
			};
		}); // DEBUG +1
	}

	for(var zi=0; zi<uniqueAtoms.length; zi++){
		for(var xi=0; xi<atomcontacts.length; xi++){
			matrix[zi][xi].z = 0;
			for(yi in atomcontacts[xi]){
				if(uniqueAtoms[zi]==yi){
					//console.log(uniqueAtoms[z] +"\t"+ atomcontacts[x][y])
					matrix[zi][xi].z = atomcontacts[xi][yi];
				}
			}
		}
	}

	var maxMatrixEntry = 0;

	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {

			// store the largest off-diagonal value, for use in setting up the color scale
			if ((matrix[i][j].z > maxMatrixEntry) && (i != j)) {
				maxMatrixEntry = matrix[i][j].z;
			}
		}
	}

	//CHANGE AS IN SUBMATRIX
	var color = d3.scale.quantize()
		.domain([0, maxMatrixEntry])
		.range(colorbrewer.Greys[9].slice(2)); // remove the white color from the grey color scale

	svg.append("rect")
		.attr("class", "background")
		.attr("width", width)
		.attr("height", height);

	// Transpose the matrix (data to which rows and columns should be bound to transposes of each other)
	var matrixT = new Array();
	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {
			if (!matrixT[j]) {
				matrixT[j] = new Array();
			}
			matrixT[j][i] = matrix[i][j];
		}
	}

	var row = svg.selectAll(".row")
		.data(matrix)
		.enter().append("g")
		.attr("class", "row")
		.attr("transform", function(d, i) {
			return "translate(0," + y(i) + ")";
		})
		.each(row);

	// Add a line below each row
	row.append("line")
		.attr("x2", width);

	// Add an extra line, below the bottom row
	row.filter(function(d, i) {
			return i == row[0].length - 1;
		})
		.append("line")
		.attr("x2", width)
		.attr("y1", y.rangeBand() - 1)
		.attr("y2", y.rangeBand() - 1);


	//THE NEW WAY OF ADDING THE ROW NAMES TO MAKE THEM STATIC WHILE THE MATRIX CAN BE SCROLLED
	d3.select("#ligrow").select("svg").remove();
	var svgtext45 = d3.select("#ligrow").append("svg")
		.attr("width", 100)
		.attr("height", height + 100)
		.append("g");

	// Apply the CSS styling
	d3.select("#ligrow").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var row45 = svgtext45.selectAll(".ligrow")
		.data(matrix)
		.enter().append("g")
		.attr("transform", function(d, i) {
			return "translate(0," + y(i) + ")";
		});

	row45.append("text")
		.attr("x", 40)
		.attr("y", y.rangeBand() / 2)
		.attr("dy", ".32em")
		.attr("text-anchor", "end")
		.attr("class", "row_title")
		.attr("fill", "black")
		.text(function(d, i) {
			return uniqueAtoms[i];
		})
		.style("cursor", "pointer")
		.on("click", function(d, i) {

			d3.select("#ligandmatrix").selectAll(".cell").style("stroke", "");
			d3.select("#ligandmatrix").selectAll(".cell").filter(function(p, index) {
				if (p.y === i) {
					return true;
				}
			}).style("stroke", "red").style("stroke-width", "2px");

			d3.select("#ligrow").selectAll(".row_title").style("fill", "");
			d3.select("#ligcol").selectAll(".col_title").style("fill", "");

			d3.select("#ligrow").selectAll(".row_title").filter(function(p, index) {
				if (i === index) {
					return true;
				}
			}).style("fill", "red").style("font-weight", "bold");


			highlighted = [];
			colors = [];

			highlighted.push(ligand);
			colors.push("#428bca");
			viewOptions.chains = [first, second];

			for(var i=0; i<contactedresidues.length;i++){
				highlighted.push(contactedresidues[i]);
				colors.push("#C1BFBF");
			}

			viewOptions.highlighted = highlighted;
			viewOptions.colors = colors;
			updateURL(viewOptions);
			reDrawProtein(viewOptions.highlighted, viewOptions.colors);

		});


	var column = svg.selectAll(".column")
		.data(matrixT)
		.enter().append("g")
		.attr("class", "column")
		.attr("transform", function(d, i) {
			return "translate(" + x(i) + ")rotate(-90)";
		});


	// Add a line to the left of each column
	column.append("line")
		.attr("x1", -height);

	// Add an extra line, to the right of the rightmost column
	column.filter(function(d, i) {
			return i == column[0].length - 1;
		})
		.append("line")
		.attr("x1", -height)
		.attr("y1", x.rangeBand() - 1)
		.attr("y2", x.rangeBand() - 1)

	//THE NEW WAY OF ADDING THE COLUMN NAMES TO MAKE THEM STATIC WHILE THE MATRIX CAN BE SCROLLED
	d3.select("#ligcol").select("svg").remove();
	var svgtext45c = d3.select("#ligcol").append("svg")
		.attr("width", width + 100)
		.attr("height", 80)
		.append("g");

	// Apply the CSS styling
	d3.select("#ligcol").select("svg").append("style").attr("type", "text/css").text(svgStyle);

	var col45 = svgtext45c.selectAll(".ligcol")
		.data(matrixT)
		.enter().append("g")
		.attr("transform", function(d, i) {
			return "translate(" + x(i) + ")rotate(-90)";
		});

	col45.append("text")
		.attr("x", -40)
		.attr("y", x.rangeBand() / 2)
		.attr("dy", ".32em")
		.attr("text-anchor", "start")
		.attr("class", "col_title")
		//.attr("fill", fill(viewOptions.group2))
		.text(function(d, i) {
			return contactedresidueNames[i];
		})
	.style("cursor", "pointer")
	.on("click", function(d, i) {

		d3.select("#ligandmatrix").selectAll(".cell").style("stroke", "");
		d3.select("#ligandmatrix").selectAll(".cell").filter(function(p, index) {
			if (p.x === i) {
				return true;
			}
		}).style("stroke", "red").style("stroke-width", "2px");

		d3.select("#ligcol").selectAll(".col_title").style("fill", "");
		d3.select("#ligrow").selectAll(".row_title").style("fill", "");

			d3.select("#ligcol").selectAll(".col_title").filter(function(p, index) { /* console.log(index+"\t"+i); */
				if (i === index) {
					return true;
				}
			}).style("fill", "red").style("font-weight", "bold");


			highlighted = [];
			colors = [];

			highlighted.push(ligand);
			colors.push("#428bca");
			viewOptions.chains = [first, second];

			// for(var i=0; i<contactedresidues.length;i++){
				highlighted.push(contactedresidues[i]);
				colors.push("#C1BFBF");
			// }

			viewOptions.highlighted = highlighted;
			viewOptions.colors = colors;
			updateURL(viewOptions);
			reDrawProtein(viewOptions.highlighted, viewOptions.colors);

		});


	function row(row) {

		var cell = d3.select(this).selectAll(".cell")
			.data(row.filter(function(d) {
				return d.z;
			}))
			.enter().append("rect")
			.attr("class", "cell")
			.attr("id", function(d) {
				return "cell" + d.x + "-" + d.y;
			})
			.attr("x", function(d) {
				return x(d.x);
			})
			.attr("width", x.rangeBand())
			.attr("height", y.rangeBand())
			//.style("fill", "gray")//ORIGINAL
			.style("fill", function(d) {
				return color(matrix[d.y][d.x].z)
			}) //DIFFERENT COLORS THEN BLACK AND WHITE
			.style("opacity", 1.0)
			.style("cursor", "pointer")
			.on("click", click);

		// Label each cell with the number of contact it represents
		var thisRow = this;
		d3.select(this).selectAll(".cell").each(function(datum) {
			d3.select(thisRow)
				.append("text")
				.text(datum.z)
				.style("fill", "white")
				.style("cursor", "pointer")
				//.style("position", "absolute")
				//.style("z-index", -1)
				.attr("x", x(datum.x) + x.rangeBand()/2)
				.attr("y", + y.rangeBand()*0.6)
				.attr("text-anchor", "middle")
				.on("click", function(p) {

					// , contactedresidues[datum.x + (group1_length+1)]
						viewOptions.highlighted = [ligand, contactedresidues[datum.y]];
						viewOptions.colors = ["#428bca","#C1BFBF"];
						viewOptions.chains = [first, second];

						updateURL(viewOptions);

						d3.select("#ligandmatrix").selectAll(".cell").style("stroke", "");
						d3.select("#ligandmatrix").selectAll(".cell").filter(function(d, index) {
							if (datum.x === d.x && datum.y === d.y) {
								return true;
							}
						}).style("stroke", "red").style("stroke-width", "2px");

						reDrawProtein(viewOptions.highlighted, viewOptions.colors);
					}
				)
		});

	}


	function click(p) {
		// nodes[p.y].residueNum, nodes[p.x + (group1_length+1)].residueNum
		viewOptions.highlighted = [ligand, contactedresidues[p.y]];
		viewOptions.colors = ["#428bca","#C1BFBF"];
		viewOptions.chains = [first, second];

		updateURL(viewOptions);

		d3.select("#ligandmatrix").selectAll(".cell").style("stroke", "");
		d3.select("#ligandmatrix").selectAll(".cell").filter(function(d, index) {
			if (p.x === d.x && p.y === d.y) {
				return true;
			}
		}).style("stroke", "red").style("stroke-width", "2px");

		reDrawProtein(viewOptions.highlighted, viewOptions.colors);
	}

}
