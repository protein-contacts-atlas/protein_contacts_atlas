var tableURI = [];
var json;

function load() {


 	d3.json("pfam_mapping/pfam_mappings_deneme.json", function(json_data) {


           json = json_data;
		   createTable();

	       // for (var i=0; i < json.pfam_maps.length; i++) {
// 	   		 console.log(json.pfam_maps[i].PFAM_ACC +"\t"+ json.pfam_maps[i].PFAM_desc);
// 	   		 for (var y=0; y < json.pfam_maps[i].pdbs.length; y++) {
// 	   		 	 console.log(json.pfam_maps[i].pdbs[y].PDB_ID +"\t"+ json.pfam_maps[i].pdbs[y].CHAIN_ID +"\t"+ json.pfam_maps[i].pdbs[y].PdbResNumStart);
// 	   		 }
// 	       }

     });

}

function createTable() {

	var table = '<table id="pfamTable" class="stripe row-border order-column" cellspacing="0" width="100%"><thead><tr>';

	table += '<th class="align_center">PFAM accession</th><th class="align_center">PFAM Name</th><th class="align_center">PFAM description</th><th class="align_center">Download link</th>';
	table +=  '</tr></thead> <tbody>';

    for (var i=0; i < json.pfam_maps.length; i++) {
		table += '<tr>';
		 //console.log(json.pfam_maps[i].PFAM_ACC +"\t"+ json.pfam_maps[i].PFAM_desc);
		 table += "<td class=\"align_center\"><a href=\"#\" onclick=\"createPDBTable('"+json.pfam_maps[i].PFAM_ACC+"');\" data-toggle=\"modal\" data-target=\"#myModalPDBS\">" + json.pfam_maps[i].PFAM_ACC + " </a><a href=\"http://pfam.xfam.org/family/" + json.pfam_maps[i].PFAM_ACC + "\" target=\"_blank\" id=\"link\" class=\"btn btn-default btn-sm\"  rel=\"popover\"><span class=\"glyphicon glyphicon-certificate\"></span></a></td>";
		 table += '<td class="align_center">' + json.pfam_maps[i].PFAM_Name + '</td>';
		 table += '<td class="align_center">' + json.pfam_maps[i].PFAM_desc + '</td>';
		 //table += '<td class="align_center"><a href="#" target="_blank" id="link" class="btn btn-default btn-sm"  rel="popover2"><span class="glyphicon glyphicon-download"></span></a></td>';
		 table += "<td class=\"align_center\"><a href=\"#\" onclick=\"makezip('"+json.pfam_maps[i].PFAM_ACC+"');\" id=\"link\" class=\"btn btn-default btn-sm\" rel=\"popover2\"><span class=\"glyphicon glyphicon-download\"></span></a></td>";

		 table +=  '</tr>';
    }

    table += ' </tbody></table>';

    document.getElementById('tables').innerHTML = table;

    // DataTable
    var table2 = $('#pfamTable').DataTable( {
        //scrollY:        "500px",
        scrollX:        true,
        scrollCollapse: true,
		"columnDefs": [

			//to make the cels in each column align center
			{
				className: "dt-center",
				"targets": [0]
			},

			{
				className: "dt-center",
				"targets": [3]
			}
		]
        //paging:         false,
		//"bSort": false
    } );

    // Apply the filter
	table2.columns().every( function () {
	        var that = this;

	        $( 'input', this.footer() ).on( 'keyup change', function () {
	            that
	                .search( this.value )
	                .draw();
	        } );
	    } );

}
function makezip(pfam) {

	for (var i=0; i < json.pfam_maps.length; i++) {

		if(json.pfam_maps[i].PFAM_ACC == pfam){

			var pdbs = [];
			var uniquePdbs = [];

			for (var y=0; y < json.pfam_maps[i].pdbs.length; y++) {
				pdbs.push(json.pfam_maps[i].pdbs[y].PDB_ID);
			}
			$.each(pdbs, function(i, el){
			    if($.inArray(el, uniquePdbs) === -1) uniquePdbs.push(el);
			});

			break;
		}
	}
	// for (var i=0; i < uniquePdbs.length; i++) {
	// 	console.log(uniquePdbs[i]);
	// }

	$.ajax({
		type: "POST",
		url: "createziptxt.php",
		dataType: 'text',
		async: false,
		data: {
			pfam: pfam,
			pdbs: uniquePdbs
		}
	});

	var texfile = "pfam_mapping/" + pfam + ".zip";

	window.open(texfile);
}

function createPDBTable(pfam) {

	//console.log(json.pfam_maps[0].PFAM_ACC +"\t"+ pfam);

	var title = '<h4 class="modal-title"> Structures with common '+pfam+' domain</h4>';

	document.getElementById('pfamtitle').innerHTML = title;

	var tablePDB = '<table id="pdbtable" class="stripe row-border order-column" cellspacing="0" width="100%"><thead><tr>';

	tablePDB += '<th class="align_center">PDB_ID</th><th class="align_center">Chain</th><th class="align_center">Start</th><th class="align_center">End</th><th class="align_center">Download link</th>';
	tablePDB +=  '</tr></thead> <tbody>';

    for (var i=0; i < json.pfam_maps.length; i++) {

		if(json.pfam_maps[i].PFAM_ACC == pfam){
			for (var y=0; y < json.pfam_maps[i].pdbs.length; y++) {

				tablePDB += '<tr>';
				 //console.log(json.pfam_maps[i].PFAM_ACC +"\t"+ json.pfam_maps[i].PFAM_desc);
				 tablePDB += '<td class="align_center"><a href="chains_process_combined.php?PDB='+json.pfam_maps[i].pdbs[y].PDB_ID+'">' + json.pfam_maps[i].pdbs[y].PDB_ID + '</a></td>';
				 tablePDB += '<td class="align_center">' + json.pfam_maps[i].pdbs[y].CHAIN_ID + '</td>';
				 tablePDB += '<td class="align_center">' + json.pfam_maps[i].pdbs[y].PdbResNumStart + '</td>';
				 tablePDB += '<td class="align_center">' + json.pfam_maps[i].pdbs[y].PdbResNumEnd + '</td>';
				 tablePDB += '<td class="align_center"><a href="structures_database/'+json.pfam_maps[i].pdbs[y].PDB_ID+'/'+json.pfam_maps[i].pdbs[y].PDB_ID+'_txt.zip" target="_blank" id="link" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-download"></span></a></td>';

				 tablePDB +=  '</tr>';
	   		 	 //console.log(json.pfam_maps[i].pdbs[y].PDB_ID +"\t"+ json.pfam_maps[i].pdbs[y].CHAIN_ID +"\t"+ json.pfam_maps[i].pdbs[y].PdbResNumStart);
	   		 }
			 break;
		}

    }

    tablePDB += ' </tbody></table>';

    document.getElementById('pdbs').innerHTML = tablePDB;

    // DataTable
    var table2 = $('#pdbtable').DataTable( {
        //scrollY:        "500px",
		//commented out scrollX because it made the header and body not align properly
        //scrollX:        true,
        scrollCollapse: true,
        paging:         false,
		bFilter:         false,
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
			}
		]
	//	"bSort": false
    } );

  	//   // Apply the filter
	// table2.columns().every( function () {
	//         var that = this;
	//
	//         $( 'input', this.footer() ).on( 'keyup change', function () {
	//             that
	//                 .search( this.value )
	//                 .draw();
	//         } );
	//     } );

}
