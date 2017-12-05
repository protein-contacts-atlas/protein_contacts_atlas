threshold = new Array;

// This file contains a number of helper functions which are used by all (or at least several) of the different views
// These function serve various purposes, including data munging, producing headers/footers, and handling 3D protein views

var filename_svg;
var file_svg;
var filename_svg2;
var file_svg2;
var filename_svg3;
var file_svg3;
var filename_svg4;
var file_svg4;
var filename_text;
var file_text;

var cutoff = viewOptions.cutoff;
var filter_contacttype;
var filter_chain;
var filter_norm_abs;
var ligandcutoff;

if(cutoff=="0.5"){
	pathname = "../structures_database";
}
else{
	pathname = "../structures_database_"+cutoff;
}

if (viewOptions.filter_contacttype) {
	filter_contacttype = viewOptions.filter_contacttype;
	pathname = "../structures_database-filter_by_contact_type/"+filter_contacttype;
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
// check that a variable contains only alphanumerics or underscores
function checkPDBIdentifier(pdb)
{
	var patt = /[^A-Za-z0-9_]/g;

	if (pdb && !patt.test(pdb))
	{
		return pdb;
	}
}

// Draws the table of residue details for an array of residueNums
// if passed an empty array, plots data for everything in json array
// NB. requires the HTML to include a div with id="tables"
function drawTable(highlighted)
{

	//CHANGED: DELETED CLUSTERING COEFFICIENT

	var aaData = new Array;

	var solvatedAreas = new Array;
	var degrees = new Array;
	//var clusterings = new Array;
	var betweenesses = new Array;
	var closenesses = new Array;

	for (var i = 0; i < highlighted.length; i++)
	{
		highlighted[i] = parseInt(highlighted[i]);
	}

	var row = 0;
	for (var i = 0; i < json_splom.nodes.length; i++)
	{

		// Record all data for quantile calculation
		if (json_splom.nodes[i].hasOwnProperty("solvatedArea") && json_splom.nodes[i].solvatedArea)
		{
			solvatedAreas.push(json_splom.nodes[i].solvatedArea)
		};
		degrees.push(json_splom.nodes[i].degree);
		// clusterings.push(json_splom.nodes[i].clustering);
		betweenesses.push(json_splom.nodes[i].betweeness);
		closenesses.push(json_splom.nodes[i].closeness);

		// Add the data for selected nodes to the aaData matrix
		if (!(highlighted.length > 0) || (highlighted.indexOf(json_splom.nodes[i].residueNum) != -1))
		{
			aaData[row] = new Array;
			//aaData[row][0] = json.nodes[i].residueNum;
			aaData[row][0] = json_splom.nodes[i].chain;
			var resLetter = json_splom.nodes[i].name.replace(/[0-9]/g, '');
			aaData[row][1] = resLetter;
			aaData[row][2] = json_splom.nodes[i].residueNum;
			aaData[row][3] = json_splom.nodes[i].solvatedArea;
			aaData[row][4] = json_splom.nodes[i].degree;
			//  aaData[row][3] = json_splom.nodes[i].clustering;
			aaData[row][5] = json_splom.nodes[i].betweeness;
			aaData[row][6] = json_splom.nodes[i].closeness;

			if(viewOptions.encode == 1){
				aaData[row][7] = json_splom.nodes[i].value;
			}
			else{
					aaData[row][7] = "0";
			}

			row++;
		}
	}

	// Calculate the cut-offs for the highest and lowest 5% of each metric
	solvatedAreas.sort(function(a, b)
	{
		return a - b;
	});
	threshold[0] = new Array;
	threshold[0][0] = d3.quantile(solvatedAreas, 0.05);
	threshold[0][1] = d3.quantile(solvatedAreas, 0.95);

	degrees.sort(function(a, b)
	{
		return a - b;
	});
	threshold[1] = new Array;
	threshold[1][0] = d3.quantile(degrees, 0.05);
	threshold[1][1] = d3.quantile(degrees, 0.95);

	// clusterings.sort(function(a,b){return a-b;});
	//    threshold[2] = new Array;
	//    threshold[2][0] = d3.quantile(clusterings, 0.05);
	//    threshold[2][1] = d3.quantile(clusterings, 0.95);

	betweenesses.sort(function(a, b)
	{
		return a - b;
	});
	threshold[2] = new Array;
	threshold[2][0] = d3.quantile(betweenesses, 0.05);
	threshold[2][1] = d3.quantile(betweenesses, 0.95);

	closenesses.sort(function(a, b)
	{
		return a - b;
	});
	threshold[3] = new Array;
	threshold[3][0] = d3.quantile(closenesses, 0.05);
	threshold[3][1] = d3.quantile(closenesses, 0.95);

	// Draw the table
	var tableData = new Object();
	tableData.aaData = aaData;
	tableData.aoColumns = aoColumns;

	//$('#tables').html( '<table cellpadding="0" cellspacing="0" text-align="center" border="0" class="display" id="residueTable"></table>' );

	$('#tables').html('<table id="residueTable" class="display dt-center" cellspacing="0" width="100%"></table>');
	//var table = '<table id="residueTable" class="stripe row-border order-column dt-right" cellspacing="0" width="100%"></table>';
	//document.getElementById('tables').innerHTML = table;

	// $('#residueTable').dataTable( tableData ); // NB. trying to pass a serialised object (ie. JSON.stringif(tableData) ) fails :-P

	var table2 = $('#residueTable').DataTable(
	{
		"data": aaData,
		"columns": aoColumns,
		//"iDisplayLength": 50,
		"columnDefs": [

			//to make the cels in each column align center
			{
				className: "dt-center",
				"targets": [0]
			},
			{
				className: "dt-center",
				"targets": [1]
			},
			{
				className: "dt-center",
				"targets": [2]
			},
			{
				className: "dt-center",
				"targets": [3]
			},
			{
				className: "dt-center",
				"targets": [4]
			},
			{
				className: "dt-center",
				"targets": [5]
			},
			{
				className: "dt-center",
				"targets": [6]
			},
			{
				className: "dt-center",
				"targets": [7]
			},
			{
        "targets": [ 7 ],
        "visible": false
      }
			//{ className: "dt-center", "targets": [ 5 ] }
		],
		scrollY: "200px",//to change height of y axis before scrolling
		scrollX: true,
		scrollCollapse: true,
		//page numbers not showing when fixedColumns is available so for now comment out
		// fixedColumns:   {
    //     leftColumns: 3
    // },
		// "pagingType": "numbers",
		//paging: true,
		//bFilter:         false,
		//"bSort": false
		"dom": 'T<"clear">lfrtip',
		"tableTools":
		{
			"sSwfPath": "../DataTables-1.10.3/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
			"aButtons": [

				// "csv",
				// "xls",
				// "pdf",

				{ "sExtends": "csv",
					"mColumns": "visible"
				 	//"sMessage": "Please enter ESC button to get out of print mode",

		 		},
				{ "sExtends": "xls",
					"mColumns": "visible"
				 	//"sMessage": "Please enter ESC button to get out of print mode",

		 		},
				{ "sExtends": "pdf",
					"mColumns": "visible"
				 	//"sMessage": "Please enter ESC button to get out of print mode",

		 		}
			]
		}

	});

	//added this feature on 22.10.16 Saturday: when external data is uploaded show the last column with those values
	//by default, the column is created in the beginning but with values "0" as default and hidden. if user uploads data, it becomes visible.
	if(viewOptions.encode == 1){
			table2.column( 7 ).visible( true );
	}



	//alert(JSON.stringify(table2.fnGetData()));
//	new $.fn.dataTable.FixedColumns( table2 );

	$('#center').keyup(function()
	{
		table2.fnFilter($(this).val());
	})

	//addResidueStatisticsLink("content2s");
// 	$('#residueTable td').click( function () {
// alert( 'You clicked on row' );
// 	} );
	$('#residueTable tbody').on('click', 'tr', function () {
      var data = table2.row( this ).data();
      //alert( 'You clicked on '+data[2]+'\'s row' );
			var f = data[2];
			var fi;
			viewOptions.highlighted = [f, f];
			viewOptions.highlightedsplom = [f,f];

			viewOptions.mychain = viewOptions.chains[0];

			for (var i = 0; i < json.nodes.length; i++) {
				if(json.nodes[i].residueNum == f && viewOptions.mychain == json.nodes[i].chain){
					fi = i;
					break;
				}
			}

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

			updateAsteroidPymol(f);
			updateSplomPymol(f, group);

			if(document.getElementById("ligandList").length!=0){
				$("#ligandList").val(json.nodes[fi].name);
			}

			updateURL(viewOptions);

			d3.select("#pymolseqs1").selectAll(".mytxt").filter(function(d, index) {
				if (fi === index) {
					return true;
				}
			}).style("fill", "red").style("font-weight", "bold");

			// d3.select("#pymolseqs1").selectAll(".rectcell").style("stroke", "");
			// d3.select("#pymolseqs1").selectAll(".rectcell").filter(function(d, index) {
			// 		if (viewOptions.group1 === index) {
			// 			return true;
			// 		}
			// 	}).transition().style("stroke", "black").attr("stroke-width", 2)
			// 	.each("end", partial(addDownloadLink, 'chordGraph_real'));
			//
			// svgline.selectAll(".rectcell").filter(function(d) {
			// 		return d.index == viewOptions.group1;
			// 	}).transition().style("stroke", "black").attr("stroke-width", 2)
			// 	.each("end", partial(addDownloadLink, 'chordGraph_real'));
			//
			// svgline.selectAll(".rectcell").filter(function(d) {
			// 		return d.index != viewOptions.group1;
			// 	}).transition().style("stroke", function(d) {
			// 		return d3.rgb(fill(d.index));
			// 	})
			// 	.each("end", partial(addDownloadLink, 'chordGraph_real'));

	});

}

// perform general processing on JSON data
//  used to tabulating contacts into matricies before drawing chord diagrams
// also counts total number of contacts between secondary structural elements
function getData(data, format, check_inter, present)
{
	if (format === "residues")
	{
		return data;
	}
	else if (format === "secondary" || format === "secondary_matrix" || format === "secondary_matrix_loops")
	{
		var targetGroup, sourceGroup;
		var matrix = new Array;
		var grouped = new Object();
		grouped.links = new Array;

		if (format === "secondary" || format === "secondary_matrix")
		{

			//alert(check_inter);

			for (var i = 0; i < data.links.length; i++)
			{

				if (present && data.links[i].present != present)
				{
					continue;
				}

				if (check_inter == 1)
				{
					targetGroup = -1;
					sourceGroup = -1;

					// node.source is an ID, not a residue number!
					targetResidue = data.nodes[data.links[i].target].residueNum;
					//console.log(data.nodes[data.links[i].target].residueNum+"\t"+data.links[i].target);

					//console.log(data.links[i].source);
					sourceResidue = data.nodes[data.links[i].source].residueNum;
					//console.log(data.nodes[data.links[i].source].residueNum+"\t"+data.links[i].source);

					for (var j = 0; j < data.groups.length; j++)
					{

						// First, find each group the target of the interaction is in [it may be in more than one!]
						if ((targetResidue >= data.groups[j].start) && (targetResidue <= data.groups[j].end))
						{
							targetGroup = j;

								// Then find each group the destination is in
							for (var k = 0; k < data.groups.length; k++)
							{

								if ((sourceResidue >= data.groups[k].start) && (sourceResidue <= data.groups[k].end))
								{
									sourceGroup = k;

									// Add the weight of this interaction to the matrix
									if (!matrix[targetGroup])
									{
										matrix[targetGroup] = new Array;
									}
									if (!matrix[sourceGroup])
									{
										matrix[sourceGroup] = new Array;
									}

									if (!matrix[targetGroup][sourceGroup])
									{
										matrix[targetGroup][sourceGroup] = 0;
									}
									if (!matrix[sourceGroup][targetGroup])
									{
										matrix[sourceGroup][targetGroup] = 0;
									}

									matrix[targetGroup][sourceGroup] += parseInt(data.links[i].value);
									matrix[sourceGroup][targetGroup] += parseInt(data.links[i].value);

								}
							}

						}
					}
				}
				else
				{
					targetGroup = -1;
					sourceGroup = -1;

					// node.source is an ID, not a residue number!
					targetResidue = data.nodes[data.links[i].target].residueNum;
					sourceResidue = data.nodes[data.links[i].source].residueNum;

					targetChain = data.nodes[data.links[i].target].chain;
					sourceChain = data.nodes[data.links[i].source].chain;

					for (var j = 0; j < data.groups.length; j++)
					{

						groupsTargetChain = data.groups[j].name[0];
						//alert("lala " + groupsTargetChain);

						// First, find each group the target of the interaction is in [it may be in more than one!]
						if ((targetResidue >= data.groups[j].start) && (targetResidue <= data.groups[j].end) && groupsTargetChain == targetChain)
						{
							targetGroup = j;

							//alert("lala " + targetResidue + "\t" + data.groups[j].start + "\t" + data.groups[j].end);

							// Then find each group the destination is in
							for (var k = 0; k < data.groups.length; k++)
							{

								groupsSourceChain = data.groups[k].name[0];

								if ((sourceResidue >= data.groups[k].start) && (sourceResidue <= data.groups[k].end) && groupsSourceChain == sourceChain)
								{
									sourceGroup = k;

									//alert(sourceResidue +"\t"+ data.groups[k].start +"\t"+data.groups[k].end);
									// Add the weight of this interaction to the matrix
									if (!matrix[targetGroup])
									{
										matrix[targetGroup] = new Array;
									}
									if (!matrix[sourceGroup])
									{
										matrix[sourceGroup] = new Array;
									}

									if (!matrix[targetGroup][sourceGroup])
									{
										matrix[targetGroup][sourceGroup] = 0;
									}
									if (!matrix[sourceGroup][targetGroup])
									{
										matrix[sourceGroup][targetGroup] = 0;
									}

									matrix[targetGroup][sourceGroup] += parseInt(data.links[i].value);
									matrix[sourceGroup][targetGroup] += parseInt(data.links[i].value);
								}
							}
						}
					}

				}
			}

		}
		else if (format === "secondary_matrix_loops")
		{

			for (var i = 0; i < data.links.length; i++)
			{

				if (present && data.links[i].present != present)
				{
					continue;
				}

				if (check_inter == 1)
				{

					targetGroup = -1;
					sourceGroup = -1;

					// node.source is an ID, not a residue number!
					targetResidue = data.nodes[data.links[i].target].residueNum;
					sourceResidue = data.nodes[data.links[i].source].residueNum;

					for (var j = 0; j < data.groupsloops.length; j++)
					{

						// First, find each group the target of the interaction is in [it may be in more than one!]
						if ((targetResidue >= data.groupsloops[j].start) && (targetResidue <= data.groupsloops[j].end))
						{
							targetGroup = j;

							// Then find each group the destination is in
							for (var k = 0; k < data.groupsloops.length; k++)
							{
								if ((sourceResidue >= data.groupsloops[k].start) && (sourceResidue <= data.groupsloops[k].end))
								{
									sourceGroup = k;

									// Add the weight of this interaction to the matrix
									if (!matrix[targetGroup])
									{
										matrix[targetGroup] = new Array;
									}
									if (!matrix[sourceGroup])
									{
										matrix[sourceGroup] = new Array;
									}

									if (!matrix[targetGroup][sourceGroup])
									{
										matrix[targetGroup][sourceGroup] = 0;
									}
									if (!matrix[sourceGroup][targetGroup])
									{
										matrix[sourceGroup][targetGroup] = 0;
									}

									matrix[targetGroup][sourceGroup] += parseInt(data.links[i].value);
									matrix[sourceGroup][targetGroup] += parseInt(data.links[i].value);
								}
							}
						}
					}
				}
				else
				{
					targetGroup = -1;
					sourceGroup = -1;

					// node.source is an ID, not a residue number!
					targetResidue = data.nodes[data.links[i].target].residueNum;
					sourceResidue = data.nodes[data.links[i].source].residueNum;

					//console.log("target "+targetResidue+" source "+sourceResidue);

					targetChain = data.nodes[data.links[i].target].chain;
					sourceChain = data.nodes[data.links[i].source].chain;

					for (var j = 0; j < data.groupsloops.length; j++)
					{
						//if(data.groupsloops[j].name=="R:HELIX47"){
							groupsTargetChain = data.groupsloops[j].name[0];
							//alert("lala " + groupsTargetChain);

							// First, find each group the target of the interaction is in [it may be in more than one!]
							if ((targetResidue >= data.groupsloops[j].start) && (targetResidue <= data.groupsloops[j].end) && groupsTargetChain == targetChain)
							{
								// if(data.groupsloops[j].name=="R:HELIX47"){
// 									console.log("helix47 "+targetResidue);
// 								}

								targetGroup = j;

								//alert("lala " + targetResidue + "\t" + data.groups[j].start + "\t" + data.groups[j].end);

								// Then find each group the destination is in
								for (var k = 0; k < data.groupsloops.length; k++)
								{

									groupsSourceChain = data.groupsloops[k].name[0];

									if ((sourceResidue >= data.groupsloops[k].start) && (sourceResidue <= data.groupsloops[k].end) && groupsSourceChain == sourceChain)
									{

										// if(data.groupsloops[j].name=="R:HELIX47"){
// 											console.log("helix47 source "+sourceResidue);
// 										}
										sourceGroup = k;

										//alert(sourceResidue +"\t"+ data.groups[k].start +"\t"+data.groups[k].end);
										// Add the weight of this interaction to the matrix
										if (!matrix[targetGroup])
										{
											matrix[targetGroup] = new Array;
										}
										if (!matrix[sourceGroup])
										{
											matrix[sourceGroup] = new Array;
										}

										if (!matrix[targetGroup][sourceGroup])
										{
											matrix[targetGroup][sourceGroup] = 0;
										}
										if (!matrix[sourceGroup][targetGroup])
										{
											matrix[sourceGroup][targetGroup] = 0;
										}

										matrix[targetGroup][sourceGroup] += parseInt(data.links[i].value);
										matrix[sourceGroup][targetGroup] += parseInt(data.links[i].value);

										//console.log(targetGroup+"\t"+sourceGroup+"\t"+matrix[targetGroup][sourceGroup]+"\t"+matrix[sourceGroup][targetGroup]);

									}
								}
							}
							//}
					}
				}
			}

		}

		if (format === "secondary")
		{
			var count = 0;
			for (var i = 0; i < matrix.length; i++)
			{
				for (var j = i; j < matrix.length; j++)
				{
					if (matrix[i] && matrix[i][j])
					{
						grouped.links[count] = new Object;
						grouped.links[count].source = i;
						grouped.links[count].target = j;
						grouped.links[count].value = matrix[i][j];
						count++;
					}
				}
			}

			grouped.name = data.name;
			grouped.nodes = data.groups;

			return grouped;

		}
		else if (format == "secondary_matrix" || format == "secondary_matrix_loops")
		{

			// fill in zeros due to lack of connections
			for (var i = 0; i < matrix.length; i++)
			{
				for (var j = 0; j < matrix.length; j++)
				{
					if (!matrix[i])
					{
						matrix[i] = new Object;
					}
					if (!matrix[i][j])
					{
						matrix[i][j] = 0;
					}
				}
			}

			//alert("getdata inside " + matrix[1][0]);

			return matrix;
		}

	}
}

function getDataCompare(data, format, check_inter, present, selected)
{
	if (format === "residues")
	{
		return data;
	}
	else if (format === "secondary" || format === "secondary_matrix" || format === "secondary_matrix_loops")
	{
		var targetGroup, sourceGroup;
		var matrix = new Array;
		var grouped = new Object();
		grouped.links = new Array;

		if (format === "secondary" || format === "secondary_matrix")
		{

			//console.log(viewOptions.pdb.length +"\t"+ present[0]);
			var check1 = 0;
			var a;
			for (var i = 0; i < viewOptions.pdb.length; i++)
			{

				if (selected == "none" && present[i] == "1")
				{
					check1 += 1;
					a = i;
					break;
				}
				else if (selected == viewOptions.pdb[i] && present[i] == "1")
				{
					a = i;
					break;
				}
				else if (selected == viewOptions.pdb[i] && present[i] == "0")
				{

					alert("NENENENEN");
					break;

				}

			}

			$('#structureList2').val(viewOptions.pdb[a]);

			$("#structureList2 option").each(function()
			{

				if ($(this).text() == viewOptions.pdb[a])
				{

					$('#structureList2').prop("selected", true);

					//disabled="disabled"

					//$('#pdbid option[name='+viewOptions.pdb[a]+']').prop("selected", true);

				}
				else
				{
					//$('#pdbid').removeAttr("selected");
					$('#structureList2').prop("selected", false);
					//$('#pdbid option[name='+$(this).text()+']').prop("selected", false);
				}
			});

			switchProtein(viewOptions.pdb[a], viewOptions.highlighted, viewOptions.color);

			$('#structureList').val(viewOptions.pdb[a]);

			$("#structureList option").each(function()
			{

				if ($(this).text() == viewOptions.pdb[a])
				{

					$('#structureList').prop("selected", true);

					//$('#pdbid option[name='+viewOptions.pdb[a]+']').prop("selected", true);

				}
				else
				{
					//$('#pdbid').removeAttr("selected");
					$('#structureList').prop("selected", false);
					//$('#pdbid option[name='+$(this).text()+']').prop("selected", false);
				}
			});

			$('#structureList3').val(viewOptions.pdb[a]);

			$("#structureList3 option").each(function()
			{

				if ($(this).text() == viewOptions.pdb[a])
				{

					$('#structureList3').prop("selected", true);

					//$('#pdbid option[name='+viewOptions.pdb[a]+']').prop("selected", true);

				}
				else
				{
					//$('#pdbid').removeAttr("selected");
					$('#structureList3').prop("selected", false);
					//$('#pdbid option[name='+$(this).text()+']').prop("selected", false);
				}
			});

			for (var i = 0; i < data.links.length; i++)
			{

				if (present && data.links[i].present != present)
				{
					continue;
				}

				if (data.nodes[data.links[i].target].name == "Null" || data.nodes[data.links[i].source].name == "Null")
				{
					continue;
				}

				if (check_inter == 1)
				{
					targetGroup = -1;
					sourceGroup = -1;

					var resTAR = data.nodes[data.links[i].target].name.split("_");
					var resSOR = data.nodes[data.links[i].source].name.split("_");

					var value_str = data.links[i].value.split(",");
					var value;

					value = parseInt(value_str[a]);

					targetResidue = parseInt(resTAR[a].substr(1));
					sourceResidue = parseInt(resSOR[a].substr(1));

					//console.log(resSOR[a] + "\t"+ sourceResidue +"\t"+resTAR[a] + "\t"+ targetResidue);

					// node.source is an ID, not a residue number!
					// targetResidue = data.nodes[data.links[i].target].residueNum;
					// sourceResidue = data.nodes[data.links[i].source].residueNum;

					for (var j = 0; j < data.groups.length; j++)
					{

						// First, find each group the target of the interaction is in [it may be in more than one!]
						if ((targetResidue >= data.groups[j].start) && (targetResidue <= data.groups[j].end))
						{
							targetGroup = j;

							//alert("lala " + targetResidue + "\t" + data.groups[j].start + "\t" + data.groups[j].end);

							// Then find each group the destination is in
							for (var k = 0; k < data.groups.length; k++)
							{

								if ((sourceResidue >= data.groups[k].start) && (sourceResidue <= data.groups[k].end))
								{
									sourceGroup = k;

									// Add the weight of this interaction to the matrix
									if (!matrix[targetGroup])
									{
										matrix[targetGroup] = new Array;
									}
									if (!matrix[sourceGroup])
									{
										matrix[sourceGroup] = new Array;
									}

									if (!matrix[targetGroup][sourceGroup])
									{
										matrix[targetGroup][sourceGroup] = 0;
									}
									if (!matrix[sourceGroup][targetGroup])
									{
										matrix[sourceGroup][targetGroup] = 0;
									}

									matrix[targetGroup][sourceGroup] += value;
									matrix[sourceGroup][targetGroup] += value;

								}
							}
						}
					}
				}
				else
				{

					targetGroup = -1;
					sourceGroup = -1;

					// node.source is an ID, not a residue number!
					targetResidue = data.nodes[data.links[i].target].residueNum;
					sourceResidue = data.nodes[data.links[i].source].residueNum;

					targetChain = data.nodes[data.links[i].target].chain;
					sourceChain = data.nodes[data.links[i].source].chain;

					for (var j = 0; j < data.groups.length; j++)
					{

						groupsTargetChain = data.groups[j].name[0];
						//alert("lala " + groupsTargetChain);

						// First, find each group the target of the interaction is in [it may be in more than one!]
						if ((targetResidue >= data.groups[j].start) && (targetResidue <= data.groups[j].end) && groupsTargetChain == targetChain)
						{
							targetGroup = j;

							//alert("lala " + targetResidue + "\t" + data.groups[j].start + "\t" + data.groups[j].end);

							// Then find each group the destination is in
							for (var k = 0; k < data.groups.length; k++)
							{

								groupsSourceChain = data.groups[k].name[0];

								if ((sourceResidue >= data.groups[k].start) && (sourceResidue <= data.groups[k].end) && groupsSourceChain == sourceChain)
								{
									sourceGroup = k;

									//alert(sourceResidue +"\t"+ data.groups[k].start +"\t"+data.groups[k].end);
									// Add the weight of this interaction to the matrix
									if (!matrix[targetGroup])
									{
										matrix[targetGroup] = new Array;
									}
									if (!matrix[sourceGroup])
									{
										matrix[sourceGroup] = new Array;
									}

									if (!matrix[targetGroup][sourceGroup])
									{
										matrix[targetGroup][sourceGroup] = 0;
									}
									if (!matrix[sourceGroup][targetGroup])
									{
										matrix[sourceGroup][targetGroup] = 0;
									}

									matrix[targetGroup][sourceGroup] += parseInt(data.links[i].value);
									matrix[sourceGroup][targetGroup] += parseInt(data.links[i].value);
								}
							}
						}
					}

				}
			}

		}
		else if (format === "secondary_matrix_loops")
		{

			for (var i = 0; i < data.links.length; i++)
			{

				if (present && data.links[i].present != present)
				{
					continue;
				}

				targetGroup = -1;
				sourceGroup = -1;

				// node.source is an ID, not a residue number!
				targetResidue = data.nodes[data.links[i].target].residueNum;
				sourceResidue = data.nodes[data.links[i].source].residueNum;

				for (var j = 0; j < data.groupsloops.length; j++)
				{

					// First, find each group the target of the interaction is in [it may be in more than one!]
					if ((targetResidue >= data.groupsloops[j].start) && (targetResidue <= data.groupsloops[j].end))
					{
						targetGroup = j;

						// Then find each group the destination is in
						for (var k = 0; k < data.groupsloops.length; k++)
						{
							if ((sourceResidue >= data.groupsloops[k].start) && (sourceResidue <= data.groupsloops[k].end))
							{
								sourceGroup = k;

								// Add the weight of this interaction to the matrix
								if (!matrix[targetGroup])
								{
									matrix[targetGroup] = new Array;
								}
								if (!matrix[sourceGroup])
								{
									matrix[sourceGroup] = new Array;
								}

								if (!matrix[targetGroup][sourceGroup])
								{
									matrix[targetGroup][sourceGroup] = 0;
								}
								if (!matrix[sourceGroup][targetGroup])
								{
									matrix[sourceGroup][targetGroup] = 0;
								}

								matrix[targetGroup][sourceGroup] += parseInt(data.links[i].value);
								matrix[sourceGroup][targetGroup] += parseInt(data.links[i].value);
							}
						}
					}
				}
			}

		}

		if (format === "secondary")
		{
			var count = 0;
			for (var i = 0; i < matrix.length; i++)
			{
				for (var j = i; j < matrix.length; j++)
				{
					if (matrix[i] && matrix[i][j])
					{
						grouped.links[count] = new Object;
						grouped.links[count].source = i;
						grouped.links[count].target = j;
						grouped.links[count].value = matrix[i][j];
						count++;
					}
				}
			}

			grouped.name = data.name;
			grouped.nodes = data.groups;

			return grouped;

		}
		else if (format == "secondary_matrix" || format == "secondary_matrix_loops")
		{

			// fill in zeros due to lack of connections
			for (var i = 0; i < matrix.length; i++)
			{
				for (var j = 0; j < matrix.length; j++)
				{
					if (!matrix[i])
					{
						matrix[i] = new Object;
					}
					if (!matrix[i][j])
					{
						matrix[i][j] = 0;
					}
				}
			}

			//alert("getdata inside " + matrix[1][0]);

			return matrix;
		}

	}
}

// NAVIGATIONAL LINKS

// add a Header with links to other views of the same protein
function addHeader(name)
{

	if (viewOptions.groups)
	{
		var suffix = '?pdb=' + viewOptions.pdb + '&groups=' + viewOptions.groups;
	}
	else
	{
		var suffix = '?pdb=' + viewOptions.pdb;
	}
	//

	updateURL(viewOptions);

	//alert(suffix);

	d3.select(".nav2").append('div').attr('class', 'otherViews');

	if (name == "matrix")
	{

		d3.select(".otherViews").html("<ul class='nav nav-tabs' role='tablist'><li class='active'><a href='#'>Structure View</a> </li><li><a href='splom.html" + suffix + "'>Network Statistics</a></li><li><a href='asteroid.html" + suffix + "'>Ligands/Residues</a></li></ul>");

	}
	else if (name == "asteroid")
	{

		d3.select(".otherViews").html("<ul><li><a href='matrix.html" + suffix + "'>Structure View</a></li><li><a href='splom.html" + suffix + "'>Network Statistics</a></li><label>Ligands/Residues</label></ul>");

	}
	else if (name == "splom")
	{

		d3.select(".otherViews").html("<ul><li><a href='matrix.html" + suffix + "'>Structure View</a></li><label>Network Statistics</label><li><a href='asteroid.html" + suffix + "'>Ligands/Residues</a></li></ul>");

	}

	// <ul class="nav nav-tabs" role="tablist">
	// 	  <li class="active"><a href="#">Home</a></li>
	// 	  <li><a href="#">Profile</a></li>
	// 	  <li><a href="#">Messages</a></li>
	// 	</ul>

}

// add a Header with links to other views of the same protein
function addHeader2(name, suffix1, suffix2)
{

	if (viewOptions.groups)
	{

		//var suffix = '?pdb=' + suffix1 + '&groups=' + viewOptions.groups+'&mychain='+viewOptions.chains[0];
		var suffix = '?pdb=' + suffix1 + '&groups=' + viewOptions.groups;

	}
	else
	{

		var suffix = '?pdb=' + suffix1;

	}

	//alert(suffix +" allchains: "+ suffix2);

	updateURL(viewOptions);

	suffix2 = '?pdb=' + suffix2;

	d3.select(".nav2").append('div').attr('class', 'otherViews');

	if (name == "matrix")
	{

		//d3.select(".otherViews").html("<ul><label>Structure View</label><li><a href='splom.html" + suffix +'&mychain='+viewOptions.chains[0] +"'>Network Statistics</a></li><li><a href='asteroid.html" + suffix +'&mychain='+viewOptions.chains[0] +"'>Ligands</a></li><li><a href=\"#\" onclick=\"addReport(); return false;\">Download full report</a></li></ul>");
		d3.select(".otherViews").html("<ul class='nav nav-tabs' role='tablist'><li class='active'><a href='#'>Structure View</a> </li><li><a href='splom.html" + suffix + '&mychain=' + viewOptions.chains[0] + "'>Network Statistics</a></li><li><a href='asteroid.html" + suffix + '&mychain=' + viewOptions.chains[0] + "'>Ligands/Residues</a></li></ul>");

	}
	else if (name == "asteroid")
	{

		d3.select(".otherViews").html("<ul><li><a href='matrix.html" + suffix + "'>Structure View</a></li><li><a href='splom.html" + suffix + '&mychain=' + viewOptions.chains[0] + "'>Network Statistics</a></li><label>Ligands/Residues</label></ul>");

	}
	else if (name == "splom")
	{

		d3.select(".otherViews").html("<ul><li><a href='matrix.html" + suffix + "'>Structure View</a></li><label>Network Statistics</label><li><a href='asteroid.html" + suffix + '&mychain=' + viewOptions.chains[0] + "'>Ligands/Residues</a></li></ul>");

	}

}

///////////////////////////////

function addHeader3(suffix1, first, second)
{

	if (viewOptions.groups)
	{
		var suffix = '?pdb=' + suffix1 + '&groups=' + viewOptions.groups;
	}
	else
	{
		var suffix = '?pdb=' + suffix1;
	}

	d3.select(".navc").append('div').attr('class', 'otherViews');

	if (viewOptions.mychain == first)
	{

		//alert(first +" 1");

		d3.select(".otherViews").html("<ul><label>Chain " + first + "</label><li><a href='splom.html" + suffix + "&mychain=" + viewOptions.chains[1] + "'>Chain " + second + "</a></li></ul>");
	}
	else if (viewOptions.mychain == second)
	{

		d3.select(".otherViews").html("<ul><li><a href='splom.html" + suffix + "&mychain=" + viewOptions.chains[0] + "'>Chain " + first + "</a></li><label>Chain " + second + "</label></ul>");

		//alert(second +" 2");
	}
	else
	{
		d3.select(".otherViews").html("<ul><label>Chain " + first + "</label><li><a href='splom.html" + suffix + "&mychain=" + viewOptions.chains[1] + "'>Chain " + second + "</a></li></ul>");
		//alert("annen");

	}

}

// add a Header with links to other views of the same protein
function addChainName(name1, name2)
{

	d3.select(".chains").append('div').attr('class', 'otherViews');

	if (name1 == name2)
	{

		d3.select(".otherViews").html("<h4>Chain " + name1 + "</h4>");

	}
	else
	{
		d3.select(".otherViews").html("<h4>Chains " + name1 + " and " + name2 + "</h4>");

	}

}

function addTitle(tab)
{

	d3.select(".link-container").selectAll(".tabs").remove();

	d3.select(".link-container").append('div').attr('class', 'tabs');

	if (tab == "one")
	{
		d3.select(".tabs").html("<h3>Residue contacts between secondary structures</h3>");
	}
	else if (tab == "two")
	{
		d3.select(".tabs").html("<h3>Topological position of a residue in 3d molecular organisation of the structure</h3>");
	}
	else
	{
		d3.select(".tabs").html("<h3>Local Structural Environment of a Residue</h3>");
	}

}

// add a footer with links to other comparison views of the same proteins
function addComparisonFooter()
{
	if (viewOptions.groups)
	{
		var suffix = '?pdb=' + viewOptions.pdb + '&groups' + viewOptions.groups;
	}
	else
	{
		var suffix = '?pdb=' + viewOptions.pdb;
	}

	var str1 = "";

	for (var i = 0; i < viewOptions.pdb.length; i++)
	{
		str1 = str1.concat("1");
	}

	var subgraph = str1;

	d3.select(".nav3").append('div').attr('class', 'otherViews');
	d3.select(".otherViews").html("<ul><li><a href='comparison.html" + suffix + "'>Whole Network Comparison</a></li> <li><a href='asteroidcomparison.html" + suffix + '&subgraph=' + subgraph + '&structure=' + viewOptions.pdb[0] + "'>Local Neighbourhood Plasticity</a> </li></ul>");

}

// DOWNLOAD LINKS

//original/ for chord plot images
function addDownloadLink(parentDiv)
{

	// Delete old link
	//d3.select("#" + parentDiv).selectAll(".svg-download").remove();

	// Construct a string containing the SVG in the DIV
	//html = d3.select("#" + parentDiv).select("svg")

	var html = d3.select("#" + parentDiv).select("svg")
		.attr("version", 1.1)
		.attr("xmlns", "http://www.w3.org/2000/svg")
		.node().parentNode.innerHTML;

	// var htmlstr='<a download="'+viewOptions.pdb + '.svg"';
	//    	htmlstr+= 'href="data:image/svg+xml;base64,'+btoa(html) + '"><img src="../img/camera-icon.png" width="30" height="30" title="Save the image as svg!"></a>';
	//
	// 	d3.select("#screenshot").html(htmlstr);

	file_svg = "data:image/svg+xml;base64," + btoa(html);
}

//for scatter plot images
function addDownloadLink2(parentDiv)
{

	var html = d3.select("#" + parentDiv).select("svg")
		.attr("version", 1.1)
		.attr("xmlns", "http://www.w3.org/2000/svg")
		.node().parentNode.innerHTML;

	file_svg2 = "data:image/svg+xml;base64," + btoa(html);
}

//for asteorid plot images
function addDownloadLink3(parentDiv)
{
	var html = d3.select("#" + parentDiv).select("svg")
		.attr("version", 1.1)
		.attr("xmlns", "http://www.w3.org/2000/svg")
		.node().parentNode.innerHTML;

	file_svg3 = "data:image/svg+xml;base64," + btoa(html);
}

//for scatter plot ligand matrix
function addDownloadLink4(parentDiv)
{

	var html = d3.select("#" + parentDiv).select("svg")
		.attr("version", 1.1)
		.attr("xmlns", "http://www.w3.org/2000/svg")
		.node().parentNode.innerHTML;

	file_svg4 = "data:image/svg+xml;base64," + btoa(html);
}


function triggerSaveFile(divid)
{

	var link = document.createElement("a");

	if(divid === "saveexample"){

			var totalstr = "";

			for (var z = 0; z < jsonall.nodes.length; z++) {

				if(jsonall.nodes[z].type == "ATOM"){
						// if tab seperated : %09 is tab
						// totalstr += jsonall.nodes[z].chain +"%09"+jsonall.nodes[z].residueNum +"%090.00%0A";
						//if comma seperated and csv than %2C (hex code for use in URLs: https://www.obkb.com/dcljr/charstxt.html)
						totalstr += jsonall.nodes[z].chain +"%2C"+jsonall.nodes[z].residueNum +"%2C0.00%0A";
				}
			}

			var downloadstr = "data:application/octet-stream,"+totalstr;
			link.download = "template.csv";
			link.href = downloadstr;

	}

	else if (divid === "savecsv")
	{
		link.download = filename_text;
		link.href = file_text;
	}
	else if (divid === "savezip")
	{
		if(viewOptions.filter_contacttype){
			file_text = pathname + "/" + json.name + "/" + json.name + "_txt_" +filter_contacttype+".zip";
		}
		else if(viewOptions.filter_chain){
			file_text = pathname + "/" + json.name + "/" + json.name + "_" +filter_chain + "_txt.zip";
		}
		else if(viewOptions.filter_norm_abs){
			file_text = pathname + "/" + json.name + "/" + json.name + "_" +filter_norm_abs+"_"+viewOptions.filter_weight+"_txt.zip";
		}
		else if(viewOptions.ligandcutoff){
			file_text = pathname + "/" + json.name + "/" + json.name + "__txt.zip";
		}
		else{
			file_text = pathname + "/" + json.name + "/" + json.name + "_txt.zip";
		}

		$.ajax({
	    type: 'HEAD',
	    url: file_text,
	    success: function() {

	        link.href = file_text;
					//console.log(file_text)
					link.style.display = 'none';
					document.body.appendChild(link);
					link.click();
	    },
	    error: function() {
				if(viewOptions.filter_contacttype){
					pathname = "../structures_uploaded-filter_by_contact_type/"+filter_contacttype;
					file_text = pathname + "/" + json.name + "/" + json.name + "_txt_" +filter_contacttype+".zip";
				}
				else if(viewOptions.filter_chain){
					pathname = "../structures_uploaded-filter_by_chain/"+filter_chain;
					file_text = pathname + "/" + json.name + "/" + json.name + "_" +filter_chain + "_txt.zip";
				}
				else if(viewOptions.filter_norm_abs){
					pathname = "../structures_uploaded-filter_by_weight/"+filter_norm_abs+"/"+viewOptions.filter_weight;
					file_text = pathname + "/" + json.name + "/" + json.name + "_" +filter_norm_abs+"_"+viewOptions.filter_weight+"_txt.zip";
				}
				else{
					file_text = "../structures_uploaded/" + json.name + "/" + json.name + "_txt.zip";
				}

				//console.log("no "+ file_text)
				link.href = file_text;
				link.style.display = 'none';
				document.body.appendChild(link);
				link.click();
	    }
		});

	}

	else if (divid === "savesif")
	{
		if(viewOptions.filter_contacttype){
		 file_sif = pathname + "/" + json.name + "/" + json.name + "_sif_" +filter_contacttype+".zip";
		}
		else if(viewOptions.filter_chain){
			file_sif = pathname + "/" + json.name + "/" + json.name + "_" +filter_chain + "_sif.zip";
		}
		else if(viewOptions.filter_norm_abs){
			file_sif = pathname + "/" + json.name + "/" + json.name + "_" +filter_norm_abs+"_"+viewOptions.filter_weight+"_sif.zip";
		}
		else if(viewOptions.ligandcutoff){
			file_sif = pathname + "/" + json.name + "/" + json.name + "__sif.zip";
		}
		else{
			file_sif = pathname+ "/" + json.name + "/" + json.name + "_sif.zip";
		}


		$.ajax({
	    type: 'HEAD',
	    url: file_sif,
	    success: function() {
	        link.href = file_sif;
					link.style.display = 'none';
					document.body.appendChild(link);
					link.click();
	    },
	    error: function() {
				if(viewOptions.filter_contacttype){
					pathname = "../structures_uploaded-filter_by_contact_type/"+filter_contacttype;
					file_sif = pathname + "/" + json.name + "/" + json.name + "_sif_" +filter_contacttype+".zip";
				}
				else if(viewOptions.filter_chain){
					pathname = "../structures_uploaded-filter_by_chain/"+filter_chain;
					file_sif = pathname + "/" + json.name + "/" + json.name + "_" +filter_chain + "_sif.zip";
				}
				else if(viewOptions.filter_norm_abs){
					pathname = "../structures_uploaded-filter_by_weight/"+filter_norm_abs+"/"+viewOptions.filter_weight;
					file_sif = pathname + "/" + json.name + "/" + json.name + "_" +filter_norm_abs+"_"+viewOptions.filter_weight+"_sif.zip";
				}
				else{
					file_sif = "../structures_uploaded/" + json.name + "/" + json.name + "_sif.zip";
				}
				link.href = file_sif;
				link.style.display = 'none';
				document.body.appendChild(link);
				link.click();
	    }
		});
	}

	else if (divid === "savearpeggio")
	{
		pathname = "../structures_database-filter_by_contact_type/"+filter_contacttype;
		file_arpeggio = pathname + "/" + json.name + "/arpeggiofiles.zip";
		$.ajax({
	    type: 'HEAD',
	    url: file_arpeggio,
	    success: function() {

	        link.href = file_arpeggio;
					//console.log(file_text)
					link.style.display = 'none';
					document.body.appendChild(link);
					link.click();
	    },
	    error: function() {

				pathname = "../structures_uploaded-filter_by_contact_type/"+filter_contacttype;
				file_arpeggio = pathname + "/" + json.name + "/arpeggiofiles.zip";

				//console.log("no "+ file_text)
				link.href = file_arpeggio;
				link.style.display = 'none';
				document.body.appendChild(link);
				link.click();
	    }
		});

	}

	else if (divid === "savesvg")
	{
		filename_svg = viewOptions.pdb + '_chord.svg';

		link.download = filename_svg;
		link.href = file_svg;
	}
	else if (divid === "savesvg2")
	{
		filename_svg2 = viewOptions.pdb + '_scatter.svg';

		link.download = filename_svg2;
		link.href = file_svg2;

	}
	else if (divid === "savesvg3")
	{
		filename_svg3 = viewOptions.pdb + '_asteroid.svg';

		link.download = filename_svg3;
		link.href = file_svg3;

	}
	else if (divid === "savesvg4")
	{
		filename_svg4 = viewOptions.pdb + '_ligand_matrix.svg';

		link.download = filename_svg4;
		link.href = file_svg4;

	}

	link.style.display = 'none';
	document.body.appendChild(link);
	link.click();

}

function addAtomicContactLink()
{

	//Chains -> Secondary Structures -> Residues -> Atoms -> distances


	// Delete old link
	// d3.select("#" + parentDiv).selectAll(".groupContacts-download").remove();
	d3.select("#textline3").selectAll(".atomicContacts-download").remove();

	// Construct a CSV string of contacts between secondary structural elements
	matrixData = getData(json, "secondary_matrix", 1);

	var contactString = "";
	var title = 'SS1\tSS2\tResidue1\tResidue2\tNumber of atomic contacts\tAtoms\tChain Types\tDistance\n';
	var residues = "";
	var atomic = "";

	contactString += title;

	var ss1;
	var ss2;

	for (var i = 0; i < json.links.length; i++)
	{
		var check1 = 0;
		var check2 = 0;
		if (viewOptions.type == 0)
		{
			for (var y = 0; y < json.groups.length; y++)
			{
				if (json.groups[y].start <= json.nodes[json.links[i].source].residueNum && json.nodes[json.links[i].source].residueNum <= json.groups[y].end)
				{
					ss1 = json.groups[y].name;
					check1 = -1;
				}
				if (json.groups[y].start <= json.nodes[json.links[i].target].residueNum && json.nodes[json.links[i].target].residueNum <= json.groups[y].end)
				{
					ss2 = json.groups[y].name;
					check2 = -1;
				}
			}

			if (check1 == -1 && check2 == -1)
			{
				// contactString += json.nodes[json.links[i].source].name + ", " + json.nodes[json.links[i].target].name + ", " + json.links[i].value + ", " + ss1 + ", " + ss2 + "\n";

				var atomnames = json.links[i].atomnames.split(",");
				var atomtypes = json.links[i].atomtypes.split(",");
				var distances = json.links[i].distances.split(",");

				for (var a = 0; a < json.links[i].value; a++)
				{
					contactString += ss1 + "\t" + ss2 + "\t" + json.nodes[json.links[i].source].name + "\t" + json.nodes[json.links[i].target].name + "\t" + json.links[i].value +  "\t" + atomnames[a] + "\t" + atomtypes[a] + "\t" + distances[a] + "\n";
				}

				check1 = 0;
				check2 = 0;
			}
		}
		else
		{
			for (var y = 0; y < json.groupsloops.length; y++)
			{
				if (json.groupsloops[y].start <= json.nodes[json.links[i].source].residueNum && json.nodes[json.links[i].source].residueNum <= json.groupsloops[y].end)
				{
					ss1 = json.groupsloops[y].name;

				}
				if (json.groupsloops[y].start <= json.nodes[json.links[i].target].residueNum && json.nodes[json.links[i].target].residueNum <= json.groupsloops[y].end)
				{
					ss2 = json.groupsloops[y].name;

				}
			}
			// contactString += json.nodes[json.links[i].source].name + ", " + json.nodes[json.links[i].target].name + ", " + json.links[i].value + ", " + ss1 + ", " + ss2 + "\n";

			var atomnames = json.links[i].atomnames.split(",");
			var atomtypes = json.links[i].atomtypes.split(",");
			var distances = json.links[i].distances.split(",");

			for (var a = 0; a < json.links[i].value; a++)
			{
				contactString += atomnames[a] + "\t" + atomtypes[a] + "\t" + distances[a] + "\t" + json.nodes[json.links[i].source].name + "\t" + json.nodes[json.links[i].target].name + "\t" + json.links[i].value + "\t" + ss1 + "\t" + ss2 + "\n";
			}

		}

	}

	// Add a link to this data

	// var htmlstr='<a download="'+viewOptions.pdb + '.atomic.csv"';
	//   	htmlstr+= 'href="data:application/octet-stream;base64,'+btoa(contactString) + '" target="_blank"><img src="../img/download_text_logo.png" width="30" height="30" title="List of contacts in atomic level (.csv)"></a>';
	//
	// 	d3.select("#textline3").html(htmlstr);

	filename_text = viewOptions.pdb + ".atomic.txt";
	file_text = "data:application/octet-stream;base64," + btoa(contactString);

}

function addReport_try()
{

	var html = d3.select(".block").select("svg")
		.attr("version", 1.1)
		.attr("xmlns", "http://www.w3.org/2000/svg")
		.node().parentNode.innerHTML;

	//console.log(html);
	var imgsrc = 'data:image/svg+xml;base64,' + btoa(html);

	// console.log(imgsrc);

	var canvas = document.querySelector("canvas"),
		context = canvas.getContext("2d");

	var replacecanvas;
	var image = new Image;
	image.src = imgsrc;

	image.onload = function()
	{
		context.drawImage(image, 0, 0, 450, 450);

		var canvasdata = canvas.toDataURL("image/png");

		//console.log(canvasdata);

		replacecanvas = canvasdata.replace("png", "jpeg");

		console.log(replacecanvas);

	}

}

function addResidueStatisticsLink(parentDiv)
{
	// Delete old link
	d3.select("#" + parentDiv).selectAll(".residueStats-download").remove();

	// Construct a CSV string of contacts between secondary structural elements
	var contactString = 'ResNum,    Name, Solvent accessible area, Degree, Betweeness centrality, Closeness centrality';

	for (var i = 0; i < json_splom.nodes.length; i++)
	{
		contactString = contactString + "\n" + json_splom.nodes[i].residueNum + ", " + json_splom.nodes[i].name + ", " + json_splom.nodes[i].solvatedArea + ", " + json_splom.nodes[i].degree + ", " + json_splom.nodes[i].betweeness + ", " + json_splom.nodes[i].closeness;
	}

	// Add a link to this data
	d3.select("#" + parentDiv).append("p")
		.attr("class", "residueStats-download")
		.append("a")
		.attr("href", "data:text/plain;base64,\n" + btoa(contactString))
		.attr("target", "_blank")
		.text("Click here to download statistics for each residue.");
}

// URL PARAMATER HANDLING

// return an viewOptions object containing the values in the URL
// highlighted is unsual in that it must always be an *array of integers*
// fetches the current URL, so takes no arguments
function getviewOptions()
{

	var viewOptions = decodeURIComponent(window.location.search.slice(1))
		.split('&')
		.reduce(function _reduce( /*Object*/ a, /*String*/ b)
		{

			// split a "paramter=value" string
			b = b.split('=');

			if (b[1].indexOf(',') == -1)
			{

				// the value did not include a comma, so is a scalar
				if (b[0] === "highlighted")
				{
					a[b[0]] = [parseInt(b[1])];
				}
				else
				{
					a[b[0]] = b[1];
				}

			}
			else
			{

				// the value included a comma, so is an array
				a[b[0]] = b[1].split(',');
				for (var i = 0; i < a[b[0]].length; i++)
				{
					if (b[0] === "highlighted")
					{
						a[b[0]][i] = parseInt(a[b[0]][i]);
					}
					else
					{
						a[b[0]][i] = a[b[0]][i];
					}
				}

			}

			return a;
		},
		{});

	return viewOptions;
}

// Update the current URL (without refreshing), to encoded the members of the viewOptions object
function updateURL(viewOptions)
{

	// form a URL to the current page
	var file_name = document.location.href;
	var end = (file_name.indexOf("?") == -1) ? file_name.length : file_name.indexOf("?");
	file_name = file_name.substring(file_name.lastIndexOf("/") + 1, end);

	// construct the string of values
	var str = "";
	for (var key in viewOptions)
	{
		if (key)
		{
			if (str != "")
			{
				str += "&";
			}
			str += key + "=" + viewOptions[key];
		}
	}

	// concatenate and update the URL
	window.history.pushState("object or string", "Title", file_name + "?" + str);
}

// Redirect to the home-page
function redirectHome()
{
	url = document.location.href;
	window.location = url.substring(0, url.lastIndexOf("/views") + 1);
}

function removeURLpart(part)
{

	delete viewOptions[part];

}
