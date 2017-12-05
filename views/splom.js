

// Set column names for table
var aoColumns = new Array();
//aoColumns[0] = new Object(); aoColumns[0].sTitle = "ResNum";
aoColumns[0] = new Object(); aoColumns[0].sTitle = "Chain";
aoColumns[1] = new Object(); aoColumns[1].sTitle = "Residue";
aoColumns[2] = new Object(); aoColumns[2].sTitle = "Number";
aoColumns[3] = new Object(); aoColumns[3].sTitle = "Solvated area";
aoColumns[4] = new Object(); aoColumns[4].sTitle = "Degree";
//aoColumns[3] = new Object(); aoColumns[3].sTitle = "Clustering coefficient";
aoColumns[5] = new Object(); aoColumns[5].sTitle = "Betweenness centrality";
aoColumns[6] = new Object(); aoColumns[6].sTitle = "Closeness centrality";

aoColumns[7] = new Object(); aoColumns[7].sTitle = "External Data";

// Sort each column by raw data, not formatting
aoColumns[0].bUseRendered = false;
aoColumns[1].bUseRendered = false;
aoColumns[2].bUseRendered = false;
aoColumns[3].bUseRendered = false;
aoColumns[4].bUseRendered = false;
aoColumns[5].bUseRendered = false;
aoColumns[6].bUseRendered = false;

aoColumns[7].bUseRendered = false;

//var dataset = [];
var dataset_sol_up = [];
var dataset_sol_down = [];
var dataset_between_up = [];
var dataset_between_down = [];
var dataset_close_up = [];
var dataset_close_down = [];
var datasetLigand_up = [];
var datasetLigand_down = [];

var tableURI_ligandlist_up;
var tableURI_ligandlist_down;

var tableURI = [];

var number_of_rows;
// Define a function to format each column:
// for column 1, add link to highlight a specific residue on the SPLOM and molecular view
// for the rest, color text red/blue/black based on value

// aoColumns[1].fnRender = function (obj) {
//     var name = obj.aData[ obj.iDataColumn ];
//     var residueNum = name.match(/\d+/g);
//     var command = "viewOptions.highlightedsplom=[" + residueNum + "];\
//     updateURL(viewOptions); drawTable(viewOptions.highlightedsplom);\
//     reDrawProtein(viewOptions.highlightedsplom, []);\
//     return false;";
//
//     return "<a href='#' onclick='" + command + "'>" + name + "</a>";
// }

aoColumns[2].fnRender = function (obj) {
    var residueNum = obj.aData[ obj.iDataColumn ];
    //var residueNum = name.match(/\d+/g);
    var command = "viewOptions.highlightedsplom=[" + residueNum + "];\
    updateURL(viewOptions); drawTable(viewOptions.highlightedsplom);\
    reDrawProtein(viewOptions.highlightedsplom, []);\
    return false;";

    return "<a href='#' onclick='" + command + "'>" + name + "</a>";
}

aoColumns[3].fnRender = function (obj) {
    var sReturn = parseFloat(obj.aData[ obj.iDataColumn ]);
    if (sReturn <= threshold[0][0]) {
        return "<font color='blue'>" + sReturn + "</font>";
    }else if (sReturn >= threshold[0][1]) {
        return "<font color='red'>" + sReturn + "</font>";
    } else {
        return sReturn;
    }
}

aoColumns[4].fnRender = function (obj) {
    var sReturn = parseFloat(obj.aData[ obj.iDataColumn ]);
    if (sReturn <= threshold[1][0]) {
        return "<font color='blue'>" + sReturn + "</font>";
    }else if (sReturn >= threshold[1][1]) {
        return "<font color='red'>" + sReturn + "</font>";
    } else {
        return sReturn;
    }
}

aoColumns[5].fnRender = function (obj) {
    var sReturn = parseFloat(obj.aData[ obj.iDataColumn ]);
    if (sReturn <= threshold[2][0]) {
        return "<font color='blue'>" + sReturn + "</font>";
    }else if (sReturn >= threshold[2][1]) {
        return "<font color='red'>" + sReturn + "</font>";
    } else {
        return sReturn;
    }
}

aoColumns[6].fnRender = function (obj) {
    var sReturn = parseFloat(obj.aData[ obj.iDataColumn ]);
    if (sReturn <= threshold[3][0]) {
        return "<font color='blue'>" + sReturn + "</font>";
    }else if (sReturn >= threshold[3][1]) {
        return "<font color='red'>" + sReturn + "</font>";
    } else {
        return sReturn;
    }
}

// CSS to style exported SVG. Stored here as it must be inserted *into the SVG*.
var svgStyleSplom = "svg {\
  font-size: 14px;\
}\
\
.axis {\
  shape-rendering: crispEdges;\
}\
\
.axis line {\
  stroke: #ddd;\
  stroke-width: .5px;\
}\
\
.axis path {\
  display: none;\
}\
\
rect.extent {\
  fill: #000;\
  fill-opacity: .125;\
  stroke: #fff;\
}\
\
rect.frame {\
  fill: #fff;\
  fill-opacity: .7;\
  stroke: #aaa;\
}\
\
circle_2 {\
  fill: #ccc;\
  fill-opacity: .5;\
}\
\
.legend circle {\
  fill-opacity: 1;\
}\
\
.legend text {\
  font-size: 18px;\
  font-style: oblique;\
}\
\
.cell text {\
  pointer-events: none;\
}\
\
.setosa {\
  fill: #800;\
}\
\
.versicolor {\
  fill: #080;\
}\
\
.encode {\
  fill: #FC0202;\
}\
\
.notencode {\
  fill: #C1BFBF;\
  fill-opacity: .1;\
}\
\
.highlighted {\
  fill: #FC0202;\
}";
// .highlighted {\
//   fill: #008;\
// }";


// Keep track of which axes are selected
var xAxis;
var yAxis;

// Keep track of all available traits, and those selected to show
var allTraits = ["solvatedArea", "degree", "betweeness", "closeness"];
var traits = allTraits;

var traits2 = ["solvated area", "degree", "betweeness", "closeness"];


var array = new Array();
var maximum;
var minimum;
var cak=0;
var color_conservation;

var svg;

var json_splom;
//var json_splom1;

var json_splom1 = {
    nodes: []
};
var json_splom2 = {
    nodes: []
};
//var json_splom2;
var json_splom1_b;
var json_splom2_b;
var json_splom_multichain;

var pathname;
var cutoff;
var filter_contacttype;
var filter_norm_abs;
var filter_chain;
var ligandcutoff;

var brush;

//for when multiple chains are selected
function initializesplomdata() {
  json_splom = {
     nodes: []
 };
   json_splom1 = {
      nodes: []
  };
   json_splom2 = {
      nodes: []
  };
}

function loadSplom() {

	viewOptions.colorless = 1;
  viewOptions.color1 = "cyan";
  viewOptions.color2 = "magenta";

	updateURL(viewOptions);

	cutoff = viewOptions.cutoff;

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

  if(viewOptions.showHOH == "yes"){
    file = pathname + "/" +pdb_name+"/"+ pdb_name + "_"+chains[0]+"statswithWater.json";
  }
  else{
    file = pathname + "/" +pdb_name+"/"+ pdb_name + "_"+chains[0]+"stats.json";
  }

	 	d3.json(file, function(json_data) {

	      json_splom = json_data;

	      if (!json_splom){}
	      else{

	   		 	 if( viewOptions.encode==1 ){

					 document.getElementById("originalview").style.display="block";
					 document.getElementById("colorscale").style.display="block";
					 //ajax is needed here, otherwise the array is filled but not read outside this scope, because of json being run after array is called etc. async: false was needed to prevent this
						$.ajax({
						  dataType: "json",
						  url: viewOptions.json,
						  async: false,
						  success: function(data){

                for (var y=0; y < json_splom.nodes.length; y++) {
                  var checkres = 0;
                  for(var i=0; i<data.length; i++){
     									if(json_splom.nodes[y].residueNum==data[i].number && json_splom.nodes[y].chain==data[i].chain){

                        if(isNaN(data[i].value) || data[i].value == ""){
                          checkres = 0;
                        }
                        else{
                          json_splom.nodes[y].value=data[i].value;
                          checkres = -1;
                        }

                        break;
     									}
     							}
                  if(checkres == 0){
                    json_splom.nodes[y].value="no";
                  }
                  else{checkres = 0;}
   	   					}

                console.log("in success");
						  }
						});

	   		  	 }

  			   var array = new Array();
  			   var cak = 0;


 		        // Normalise betweeness, then round to 3 d.p.
   		        for (var i=0; i < json_splom.nodes.length; i++) {
   		            json_splom.nodes[i].betweeness *= 2 / ( (json_splom.nodes.length-1)*(json_splom.nodes.length-2) );
                  // console.log(json_splom.nodes.length)
   		            json_splom.nodes[i].betweeness = parseFloat( json_splom.nodes[i].betweeness.toFixed(3) );

                  if(json_splom.nodes[i].value != "no"){
                    array[cak]=json_splom.nodes[i].value;
    				        cak++;
                  }

   		        }

				//console.log(array.length);
				//console.log(array[0]);
				maximum = Math.max.apply(Math, array);
				minimum = Math.min.apply(Math, array);
				//console.log(maximum);
				//console.log(minimum);

			    color_conservation = d3.scale.linear()
				    .domain([minimum, maximum])
				    .range([viewOptions.color1,  viewOptions.color2]);


	      		        if (!viewOptions.highlightedsplom) { viewOptions.highlightedsplom=[]; }

	      		        // If the URL specifies to show a zoomed-in SPLOM, do so
	      		        if (viewOptions.hasOwnProperty("xAxis") && viewOptions["xAxis"] && viewOptions.hasOwnProperty("yAxis") && viewOptions["yAxis"]) {
	      		            xAxis = viewOptions["xAxis"];
	      		            yAxis = viewOptions["yAxis"];
	      		            traits = [xAxis, yAxis];

	      		            d3.select("#splom").append("button").attr("onclick", "traits = allTraits; drawSplom(); addDownloadLink2('splom');").attr("id", "showWholeSPLOM").text("Show whole SPLOM");
	      		        }

	      		        // Draw the SPLOM. If the screen is small, resize the div containing it and add scrollbars
	      		        drawSplom();
                    addDownloadLink2("splom");

	      		        // if (width < 450) {
 // 	      		          d3.select("#splom").style("width", width + "px").style("overflow", "auto");
 // 	      		        }

	      		        drawTable(viewOptions.highlightedsplom);

	      		        var colors = new Array();
	      		        for (var i=0; i < viewOptions.highlightedsplom.length; i++) { colors[i]=1253; }
	      		        initializeProteinView( viewOptions.highlightedsplom, colors);
	    			}
				updateURL(viewOptions);
				sorttable();
	    });
}

function loadUploadSplom() {

  if(viewOptions.showHOH == "yes"){
    file = pathname + "/" +pdb_name+"/"+ pdb_name + "_"+viewOptions.mychain+"statswithWater.json";
  }
  else{
    file = pathname + "/" +pdb_name+"/"+ pdb_name + "_"+viewOptions.mychain+"stats.json";
  }

	 	d3.json(file, function(json_data) {

	    json_splom = json_data;
	    if (!json_splom){}
	    else{

	   		 	 if( viewOptions.encode==1 ){

					 document.getElementById("originalview").style.display="block";
					 document.getElementById("colorscale").style.display="block";
					 //ajax is needed here, otherwise the array is filled but not read outside this scope, because of json being run after array is called etc. async: false was needed to prevent this
						$.ajax({
						  dataType: "json",
						  url: viewOptions.json,
						  async: false,
						  success: function(data){

                for (var y=0; y < json_splom.nodes.length; y++) {
                  var checkres = 0;
                  for(var i=0; i<data.length; i++){
     									if(json_splom.nodes[y].residueNum==data[i].number && json_splom.nodes[y].chain==data[i].chain){

                        if(isNaN(data[i].value) || data[i].value == ""){
                          //console.log(data[i].value+"\tin NAN")
                          checkres = 0;
                        }
                        else{
                          json_splom.nodes[y].value=data[i].value;
                          checkres = -1;
                        }

                        break;
     									}
     							}
                  if(checkres == 0){
                    json_splom.nodes[y].value="no";
                  }
                  else{checkres = 0;}
   	   					}
						  }
						});


	   		  }

  			   var array = new Array();
  			   var cak = 0;
 		        // Normalise betweeness, then round to 3 d.p.
 		        for (var i=0; i < json_splom.nodes.length; i++) {
 		            json_splom.nodes[i].betweeness *= 2 / ( (json_splom.nodes.length-1)*(json_splom.nodes.length-2) );
 		            json_splom.nodes[i].betweeness = parseFloat( json_splom.nodes[i].betweeness.toFixed(3) );

				        //console.log(json_splom.nodes[i].value);
                if(json_splom.nodes[i].value != "no"){
                  array[cak]=json_splom.nodes[i].value;
  				        cak++;
                }

 		        }

				//console.log(array.length);
				//console.log(array[0]);
				maximum = Math.max.apply(Math, array);
				minimum = Math.min.apply(Math, array);
				//console.log(maximum);
				//console.log(minimum);

			    color_conservation = d3.scale.linear()
				    .domain([minimum, maximum])
				    .range([viewOptions.color1,viewOptions.color2]);


	      		        if (!viewOptions.highlightedsplom) { viewOptions.highlightedsplom=[]; }

	      		        // If the URL specifies to show a zoomed-in SPLOM, do so
	      		        if (viewOptions.hasOwnProperty("xAxis") && viewOptions["xAxis"] && viewOptions.hasOwnProperty("yAxis") && viewOptions["yAxis"]) {
	      		            xAxis = viewOptions["xAxis"];
	      		            yAxis = viewOptions["yAxis"];
	      		            traits = [xAxis, yAxis];

	      		            d3.select("#splom").append("button").attr("onclick", "traits = allTraits; drawSplom(); addDownloadLink2('splom');").attr("id", "showWholeSPLOM").text("Show whole SPLOM");
	      		        }

	      		        // Draw the SPLOM. If the screen is small, resize the div containing it and add scrollbars
	      		        drawSplom();

                        addDownloadLink2("splom");
	      		        // if (width < 450) {
 // 	      		          d3.select("#splom").style("width", width + "px").style("overflow", "auto");
 // 	      		        }

	      		        drawTable(viewOptions.highlightedsplom);

	      		        var colors = new Array();
	      		        for (var i=0; i < viewOptions.highlightedsplom.length; i++) { colors[i]=1253; }
	      		        initializeProteinView( viewOptions.highlightedsplom, colors);
	    			}

				updateURL(viewOptions);

				sorttable();

	        });



}

function loadSplomafterchainsselected() {

  viewOptions.colorbyproperty=0;
  updateURL(viewOptions);

	 viewOptions = getviewOptions();

	if( viewOptions.chains[0] == viewOptions.chains[1] ){

    if(viewOptions.showHOH == "yes"){
      file = pathname + "/" +pdb_name+"/"+ pdb_name + "_"+viewOptions.chains[0]+"statswithWater.json";
    }
    else{
      file = pathname + "/" +pdb_name+"/"+ pdb_name + "_"+viewOptions.chains[0]+"stats.json";
    }

	 	d3.json(file, function(json_data) {

	        json_splom = json_data;
           if (!json_splom){

  		      }

           else{

  	   		 	 if( viewOptions.encode==1 ){

  					 document.getElementById("originalview").style.display="block";
  					 document.getElementById("colorscale").style.display="block";
					 //ajax is needed here, otherwise the array is filled but not read outside this scope, because of json being run after array is called etc. async: false was needed to prevent this
						$.ajax({
						  dataType: "json",
						  url: viewOptions.json,
						  async: false,
						  success: function(data){
                for (var y=0; y < json_splom.nodes.length; y++) {
                  var checkres = 0;
                  for(var i=0; i<data.length; i++){
                      if(json_splom.nodes[y].residueNum==data[i].number && json_splom.nodes[y].chain==data[i].chain){

                        if(isNaN(data[i].value) || data[i].value == ""){
                          checkres = 0;
                        }
                        else{
                          json_splom.nodes[y].value=data[i].value;
                          checkres = -1;
                        }

                        break;
                      }
                  }
                  if(checkres == 0){
                    json_splom.nodes[y].value="no";
                  }
                  else{checkres = 0;}
                }

						  }
						});


	   		  	 }

  			   var array = new Array();
  			   var cak = 0;


 		        // Normalise betweeness, then round to 3 d.p.
   		        for (var i=0; i < json_splom.nodes.length; i++) {
   		            json_splom.nodes[i].betweeness *= 2 / ( (json_splom.nodes.length-1)*(json_splom.nodes.length-2) );
   		            json_splom.nodes[i].betweeness = parseFloat( json_splom.nodes[i].betweeness.toFixed(3) );

      					//console.log(json_splom.nodes[i].value);
                if(json_splom.nodes[i].value != "no"){
                  array[cak]=json_splom.nodes[i].value;
                  cak++;
                }
   		        }

				//console.log(array.length);
				//console.log(array[0]);
				maximum = Math.max.apply(Math, array);
				minimum = Math.min.apply(Math, array);
				//console.log(maximum);
				//console.log(minimum);

			    color_conservation = d3.scale.linear()
				    .domain([minimum, maximum])
				    .range([viewOptions.color1,viewOptions.color2]);

	      		        if (!viewOptions.highlightedsplom) { viewOptions.highlightedsplom=[]; }

	      		        // If the URL specifies to show a zoomed-in SPLOM, do so
	      		        if (viewOptions.hasOwnProperty("xAxis") && viewOptions["xAxis"] && viewOptions.hasOwnProperty("yAxis") && viewOptions["yAxis"]) {
	      		            xAxis = viewOptions["xAxis"];
	      		            yAxis = viewOptions["yAxis"];
	      		            traits = [xAxis, yAxis];

	      		            d3.select("#splom").append("button").attr("onclick", "traits = allTraits; drawSplom(); addDownloadLink2('splom');").attr("id", "showWholeSPLOM").text("Show whole SPLOM");
	      		        }

	      		        // Draw the SPLOM. If the screen is small, resize the div containing it and add scrollbars
	      		        drawSplom();

                        addDownloadLink2("splom");
	      		        // if (width < 450) {
 // 	      		          d3.select("#splom").style("width", width + "px").style("overflow", "auto");
 // 	      		        }

	      		        drawTable(viewOptions.highlightedsplom);

	      		        var colors = new Array();
	      		        for (var i=0; i < viewOptions.highlightedsplom.length; i++) { colors[i]=1253; }
	      		        initializeProteinView( viewOptions.highlightedsplom, colors);
	    			}

				updateURL(viewOptions);

				sorttable();

	        });

		}

		else{
    initializesplomdata();
		combineStats();
		}

}

function combineStats(){

  $.ajax({
    dataType: "json",
    url: pathname + "/" +pdb_name+"/"+ pdb_name + "_"+viewOptions.chains[0]+"-"+viewOptions.chains[1]+".json",
    async: false,
    success: function(data){
      json_splom_multichain = data;
    }
  });

  if(viewOptions.showHOH == "yes"){
    file = pathname + "/" +pdb_name+"/"+ pdb_name + "_"+viewOptions.chains[0]+"statswithWater.json";
  }
  else{
    file = pathname + "/" +pdb_name+"/"+ pdb_name + "_"+viewOptions.chains[0]+"stats.json";
  }

	$.ajax({
	  dataType: "json",
	  url: file,
	  async: false,
	  success: function(data){

		  json_splom1_b = data;

      for (var y=0; y < json_splom1_b.nodes.length; y++) {

        for(var i=0; i<json_splom_multichain.nodes.length; i++){

           if(json_splom1_b.nodes[y].residueNum==json_splom_multichain.nodes[i].residueNum && json_splom1_b.nodes[y].chain==json_splom_multichain.nodes[i].chain){
             json_splom1.nodes.push(json_splom1_b.nodes[y]);

           }
         }
       }

		 	 if( viewOptions.encode==1 ){

			 document.getElementById("originalview").style.display="block";
			 document.getElementById("colorscale").style.display="block";
			 //ajax is needed here, otherwise the array is filled but not read outside this scope, because of json being run after array is called etc. async: false was needed to prevent this
				$.ajax({
				  dataType: "json",
				  url: viewOptions.json,
				  async: false,
				  success: function(data){
            for (var y=0; y < json_splom1.nodes.length; y++) {
              var checkres = 0;
              for(var i=0; i<data.length; i++){
                  if(json_splom1.nodes[y].residueNum==data[i].number && json_splom1.nodes[y].chain==data[i].chain){

                    if(isNaN(data[i].value) || data[i].value == ""){
                      checkres = 0;
                    }
                    else{
                      json_splom1.nodes[y].value=data[i].value;
                      checkres = -1;
                    }

                    break;
                  }
              }
              if(checkres == 0){
                json_splom1.nodes[y].value="no";
              }
              else{checkres = 0;}
            }

				  }
				});
		  	 }
 			   var array = new Array();
 			   var cak = 0;


		        // Normalise betweeness, then round to 3 d.p.
  		        for (var i=0; i < json_splom1.nodes.length; i++) {
  		            json_splom1.nodes[i].betweeness *= 2 / ( (json_splom1.nodes.length-1)*(json_splom1.nodes.length-2) );
  		            json_splom1.nodes[i].betweeness = parseFloat( json_splom1.nodes[i].betweeness.toFixed(3) );

                  if(json_splom1.nodes[i].value != "no"){
                    array[cak]=json_splom1.nodes[i].value;
    				        cak++;
                  }

  		        }

			//console.log(array.length);
			//console.log(array[0]);
			maximum = Math.max.apply(Math, array);
			minimum = Math.min.apply(Math, array);
			//console.log(maximum);
			//console.log(minimum);

		    color_conservation = d3.scale.linear()
			    .domain([minimum, maximum])
			    .range([viewOptions.color1,viewOptions.color2]);


      		        if (!viewOptions.highlightedsplom) { viewOptions.highlightedsplom=[]; }

      		        // If the URL specifies to show a zoomed-in SPLOM, do so
      		        if (viewOptions.hasOwnProperty("xAxis") && viewOptions["xAxis"] && viewOptions.hasOwnProperty("yAxis") && viewOptions["yAxis"]) {
      		            xAxis = viewOptions["xAxis"];
      		            yAxis = viewOptions["yAxis"];
      		            traits = [xAxis, yAxis];

      		            d3.select("#splom").append("button").attr("onclick", "traits = allTraits; drawSplom(); addDownloadLink2('splom');").attr("id", "showWholeSPLOM").text("Show whole SPLOM");
      		        }

      		        var colors = new Array();
      		        for (var i=0; i < viewOptions.highlightedsplom.length; i++) { colors[i]=1253; }
      		        initializeProteinView( viewOptions.highlightedsplom, colors);

	  }
	});

  if(viewOptions.showHOH == "yes"){
    file2 = pathname + "/" +pdb_name+"/"+ pdb_name + "_"+viewOptions.chains[1]+"statswithWater.json";
  }
  else{
    file2 = pathname + "/" +pdb_name+"/"+ pdb_name + "_"+viewOptions.chains[1]+"stats.json";
  }

	$.ajax({
	  dataType: "json",
	  url: file2,
	  async: false,
	  success: function(data){

      json_splom2_b = data;

      for (var y=0; y < json_splom2_b.nodes.length; y++) {

        for(var i=0; i<json_splom_multichain.nodes.length; i++){

           if(json_splom2_b.nodes[y].residueNum==json_splom_multichain.nodes[i].residueNum && json_splom2_b.nodes[y].chain==json_splom_multichain.nodes[i].chain){
             json_splom2.nodes.push(json_splom2_b.nodes[y]);

           }
         }
       }


	 	 if( viewOptions.encode==1 ){

			 document.getElementById("originalview").style.display="block";
		   document.getElementById("colorscale").style.display="block";
			 //ajax is needed here, otherwise the array is filled but not read outside this scope, because of json being run after array is called etc. async: false was needed to prevent this
				$.ajax({
				  dataType: "json",
				  url: viewOptions.json,
				  async: false,
				  success: function(data){
            for (var y=0; y < json_splom2.nodes.length; y++) {
              var checkres = 0;
              for(var i=0; i<data.length; i++){
                  if(json_splom2.nodes[y].residueNum==data[i].number && json_splom2.nodes[y].chain==data[i].chain){

                    if(isNaN(data[i].value) || data[i].value == ""){
                      checkres = 0;
                    }
                    else{
                      json_splom2.nodes[y].value=data[i].value;
                      checkres = -1;
                    }

                    break;
                  }
              }
              if(checkres == 0){
                json_splom2.nodes[y].value="no";
              }
              else{checkres = 0;}
            }

				  }
				});
	  	 }

 			   var array = new Array();
 			   var cak = 0;
		        // Normalise betweeness, then round to 3 d.p.
  		        for (var i=0; i < json_splom2.nodes.length; i++) {
  		            json_splom2.nodes[i].betweeness *= 2 / ( (json_splom2.nodes.length-1)*(json_splom2.nodes.length-2) );
  		            json_splom2.nodes[i].betweeness = parseFloat( json_splom2.nodes[i].betweeness.toFixed(3) );

                  if(json_splom2.nodes[i].value != "no"){
                    array[cak]=json_splom2.nodes[i].value;
    				        cak++;
                  }
  		        }

			//console.log(array.length);
			//console.log(array[0]);
			maximum = Math.max.apply(Math, array);
			minimum = Math.min.apply(Math, array);
			//console.log(maximum);
			//console.log(minimum);

		    color_conservation = d3.scale.linear()
			    .domain([minimum, maximum])
			    .range([viewOptions.color1,viewOptions.color2]);


      		        if (!viewOptions.highlightedsplom) { viewOptions.highlightedsplom=[]; }

      		        // If the URL specifies to show a zoomed-in SPLOM, do so
      		        if (viewOptions.hasOwnProperty("xAxis") && viewOptions["xAxis"] && viewOptions.hasOwnProperty("yAxis") && viewOptions["yAxis"]) {
      		            xAxis = viewOptions["xAxis"];
      		            yAxis = viewOptions["yAxis"];
      		            traits = [xAxis, yAxis];

      		            d3.select("#splom").append("button").attr("onclick", "traits = allTraits; drawSplom(); addDownloadLink2('splom');").attr("id", "showWholeSPLOM").text("Show whole SPLOM");
      		        }

      		        var colors = new Array();
      		        for (var i=0; i < viewOptions.highlightedsplom.length; i++) { colors[i]=1253; }
      		        initializeProteinView( viewOptions.highlightedsplom, colors);

	  }
	});


	var c=0;
	for(var i=0; i<json_splom1.nodes.length; i++){
		json_splom.nodes[c] = json_splom1.nodes[i];
		c++;
	}
	for(var i=0; i<json_splom2.nodes.length; i++){
		json_splom.nodes[c] = json_splom2.nodes[i];
		c++;
	}

 	 drawSplom();
   addDownloadLink2("splom");
   drawTable(viewOptions.highlightedsplom);

   updateURL(viewOptions);
	 sorttable();

}

function updateSplom() {

  value = document.getElementById("center_splom").value;
  if(value.includes(",")){
    // console.log(value)
    var selectedresnums = value.split(',');
    viewOptions.highlightedsplom = selectedresnums;
    // viewOptions.colors=[0X428bca,0X428bca];
    var colors = [];
    for(var i=0; i<selectedresnums.length;i++){
      colors.push("0X428bca");
    }
    viewOptions.colors=colors; //rajini blue
    updateURL(viewOptions);

    svg.selectAll(".cell circle").filter( function(d) {
      var check=0;
      for(var i=0; i<selectedresnums.length;i++){

        if(d.residueNum == parseInt(selectedresnums[i])){

          check=-1;
          return true;
        }
      }
      if(check==0){
        return false;
      }
    })
  	.style("fill", function(d) {
        return "#FC0202";
  	})
  	.style("fill-opacity", function(d) {
        return 1;
  	});

    svg.selectAll(".cell circle").filter( function(d) {
      var check=0;
      for(var i=0; i<selectedresnums.length;i++){

        if(d.residueNum == parseInt(selectedresnums[i])){

          check=-1;
          return false;
        }
      }
      if(check==0){
        return true;
      }
    })
  	.style("fill", function(d) {
        return "#C1BFBF";
  	})
  	.style("fill-opacity", function(d) {
        return .1;
  	});


  }

  else{
    viewOptions.center = value;
    updateAsteroidPymol(viewOptions.center);
    viewOptions.highlightedsplom = [viewOptions.center,viewOptions.center];
  	//viewOptions.colors=[0xFF0000,0xFF0000];
    viewOptions.colors=[0X428bca,0X428bca]; //rajini blue


    updateURL(viewOptions);

     d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "");
     d3.select("#pymolseqs1").selectAll(".mytxt").filter( function(d,index) { if (parseInt(viewOptions.center)===parseInt(json.nodes[index].residueNum)) {return true; } }).style("fill", "red").style("font-weight", "bold");

        svg.selectAll(".cell circle").filter( function(d) {

    		if(d.residueNum == viewOptions.center){
    			return true;
    		}
    		else false;

        })
    	.style("fill", function(d) {
    		return "#FC0202";
    	})
    	.style("fill-opacity", function(d) {
    		return 1;
    	});

        // Otherwise, set class to 'null'
        svg.selectAll(".cell circle").filter( function(d) {
    		if(d.residueNum != viewOptions.center){
    			return true;
    		}
    		else false;

        })
    	.style("fill", function(d) {

    		var check=0;
    		for(var a=0; a<json.groups.length; a++){

    			if(json.groups[a].start <= viewOptions.center && viewOptions.center <= json.groups[a].end && json.groups[a].start <= d.residueNum && d.residueNum <= json.groups[a].end){

    				check=-1;
    				return fill(a);
    			}
    		}
    		if(check==0){
    			return "#C1BFBF";
    		}

    	})
    	.style("fill-opacity", function(d) {
    		var check=0;
    		for(var a=0; a<json.groups.length; a++){

    			if(json.groups[a].start <= viewOptions.center && viewOptions.center <= json.groups[a].end && json.groups[a].start <= d.residueNum && d.residueNum <= json.groups[a].end){

    				check=-1;
    				return .5;
    			}
    		}
    		if(check==0){
    			return .1;
    		}

    	});

    	if(viewOptions.chains[0]!=viewOptions.chains[1]){
    	    svg.selectAll(".cell rect").filter( function(d) {

    			if(d.residueNum == viewOptions.center){
    				return true;
    			}
    			else false;

    	    })
    		.style("fill", function(d) {
    			return "#FC0202";
    		})
    		.style("fill-opacity", function(d) {
    			return 1;
    		});

    	    // Otherwise, set class to 'null'
    	    svg.selectAll(".cell rect").filter( function(d) {
    			if(d.residueNum != viewOptions.center){
    				return true;
    			}
    			else false;

    	    })
    		.style("fill", function(d) {

    			var check=0;
    			for(var a=0; a<json.groups.length; a++){

    				if(json.groups[a].start <= viewOptions.center && viewOptions.center <= json.groups[a].end && json.groups[a].start <= d.residueNum && d.residueNum <= json.groups[a].end){

    					check=-1;
    					return fill(a);
    				}
    			}
    			if(check==0){
    				return "#C1BFBF";
    			}

    		})
    		.style("fill-opacity", function(d) {
    			var check=0;
    			for(var a=0; a<json.groups.length; a++){

    				if(json.groups[a].start <= viewOptions.center && viewOptions.center <= json.groups[a].end && json.groups[a].start <= d.residueNum && d.residueNum <= json.groups[a].end){

    					check=-1;
    					return .5;
    				}
    			}
    			if(check==0){
    				return .1;
    			}

    		});
    	}
    }

	drawTable(viewOptions.highlightedsplom);
  reDrawProtein(viewOptions.highlightedsplom, viewOptions.colors);
  addDownloadLink2("splom");

}

function updateSplomPymol(f,groupindex) {

  viewOptions.center = f;
	viewOptions.colors= [0X428bca]; //rajini blue

	// if(json.groups[groupindex].start <= f && f <= json.groups[groupindex].end){
// 		viewOptions.colors =[fill(groupindex)];
// 	}
// 	else{
// 		viewOptions.colors = [0x5FDA99];
// 	}

	document.getElementById("center_splom").value = f;

    updateURL(viewOptions);

	if(viewOptions.chains[0]==viewOptions.chains[1]){

	    svg.selectAll(".cell circle").filter( function(d) {

			if(d.residueNum == f){
				return true;
			}
			else false;

	    })
	   // .attr("class", "encode");
		.style("fill", function(d) {
			return "#FC0202";
		})
		.style("fill-opacity", function(d) {
			return 1;
		});


	    // Otherwise, set class to 'null'
	    svg.selectAll(".cell circle").filter( function(d) {
			if(d.residueNum != f){
				return true;
			}
			else false;

	    })
	   // .attr("class", "notencode");
		.style("fill", function(d,i) {

      if( viewOptions.encode!=1 ){
        if(groupindex != -1 && json.groups[groupindex].start <= d.residueNum && d.residueNum <= json.groups[groupindex].end){
  				return fill(groupindex);
  			}
  			else{
  				return "#C1BFBF";
  			}
 			}

		})
		.style("fill-opacity", function(d) {
        if( viewOptions.encode==1 ){
   			    return .1;
   			}

        else{
          if(groupindex != -1 && json.groups[groupindex].start <= d.residueNum && d.residueNum <= json.groups[groupindex].end){
    				return .5;
    			}
    			else{
    				return .1;
    			}
        }


		});

	}

	else if(viewOptions.chains[0]!=viewOptions.chains[1]){

		if(viewOptions.mychain==viewOptions.chains[0]){
		    svg.selectAll(".cell circle").filter( function(d) {

				if(d.residueNum == f){
					return true;
				}
				else false;

		    })
		   // .attr("class", "encode");
			.style("fill", function(d) {
				return "#FC0202";
			})
			.style("fill-opacity", function(d) {
				return 1;
			});


		    // Otherwise, set class to 'null'
		    svg.selectAll(".cell circle").filter( function(d) {
				if(d.residueNum != f){
					return true;
				}
				else false;

		    })
		   // .attr("class", "notencode");
			.style("fill", function(d) {

				if(groupindex != -1 && jsonSour.groups[groupindex].start <= d.residueNum && d.residueNum <= jsonSour.groups[groupindex].end){

					return fill(groupindex);

				}
				else{
					return "#C1BFBF";
				}
			})
			.style("fill-opacity", function(d) {
				if(groupindex != -1 && jsonSour.groups[groupindex].start <= d.residueNum && d.residueNum <= jsonSour.groups[groupindex].end){

					return .5;

				}
				else{
					return .1;
				}
			});

		    // Otherwise, set class to 'null'
		    svg.selectAll(".cell rect").filter( function(d) {
					return true;
		    })
		   // .attr("class", "notencode");
			.style("fill", function(d) {

				return "#C1BFBF";

			})
			.style("fill-opacity", function(d) {

				return .1;

			});
		}

		else{
		    // Otherwise, set class to 'null'
		    svg.selectAll(".cell circle").filter( function(d) {
					return true;
		    })
		   // .attr("class", "notencode");
			.style("fill", function(d) {
				return "#C1BFBF";
			})
			.style("fill-opacity", function(d) {
				return .1;
			});
		  svg.selectAll(".cell rect").filter(function(d) {

				if(d.residueNum == f){
					return true;
				}
				else false;

		    })
		   // .attr("class", "encode");
			.style("fill", function(d) {
				return "#FC0202";
			})
			.style("fill-opacity", function(d) {
				return 1;
			});


		    // Otherwise, set class to 'null'
		    svg.selectAll(".cell rect").filter( function(d) {
				if(d.residueNum != f){
					return true;
				}
				else false;

		    })
		   // .attr("class", "notencode");
			.style("fill", function(d) {

				if(groupindex != -1 && jsonTarg.groups[groupindex].start <= d.residueNum && d.residueNum <= jsonTarg.groups[groupindex].end){

					return fill(groupindex);

				}
				else{
					return "#C1BFBF";
				}
			})
			.style("fill-opacity", function(d) {
				if(groupindex != -1 && jsonTarg.groups[groupindex].start <= d.residueNum && d.residueNum <= jsonTarg.groups[groupindex].end){

					return .5;

				}
				else{
					return .1;
				}
			});
		}


	}

	reDrawProtein(viewOptions.highlightedsplom, viewOptions.colors);
  addDownloadLink2("splom");

}


//ADDED: FOR ONE CHAIN ONLY. FOR CLICKING ON THE SS ON top AND HIGHLIGHT THE SS ON BOTH PANELS
function updateSplomSecondaryStructureLine(groupindex) {

	var atoms = new Array();
	atoms = [];
	var atomcolors = new Array();
	atomcolors = [];

    d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "");

    svg.selectAll(".cell circle").filter( function(d) {

		if(json.groups[groupindex].start <= d.residueNum && d.residueNum <= json.groups[groupindex].end){

		    d3.select("#pymolseqs1").selectAll(".mytxt").filter( function(di,index) { if (d.residueNum===json.nodes[index].residueNum) {

	          atoms.push( d.residueNum );
	         // atomcolors.push("0x5FDA99");

				return true;
			} })
			//.style("fill", "red")
			.style("fill", function(d) { return fill(groupindex); })
			.style("font-weight", "bold");

			return true;
		}

		else{return false;}

    })
    //.attr("class", "encode")
	.style("fill", function(d) {
			return fill(groupindex);
	})
	.style("fill-opacity", function(d) {
			return 1;
	});
	// .attr("stroke-with", function(d) {
// 		if(json.groups[groupindex].start <= d.residueNum && d.residueNum <= json.groups[groupindex].end){
// 			return 2;
// 		}
// 	});

    // Otherwise, set class to 'null'
    svg.selectAll(".cell circle").filter( function(d) {

		if(json.groups[groupindex].start <= d.residueNum && d.residueNum <= json.groups[groupindex].end){
			return false;
		}

		else{return true;}

    })
   // .attr("class", "notencode");
	.style("fill", function(d) {
			return "#C1BFBF";
	})
	.style("fill-opacity", function(d) {

		return .1;

	});
	// .attr("stroke-with", function(d) {
// 		if(json.groups[groupindex].start <= d.residueNum && d.residueNum <= json.groups[groupindex].end){
//
// 		}
// 		else return 0.5;
// 	});
//
	//reDrawProtein(atoms, atomcolors);

    addDownloadLink2("splom");

	drawTable(atoms);

}

//FOR TWO CHAINS: NOT WORKING YET!!!
function updateSplomSecondaryStructureLineBetweenChains(groupindex,chain) {

	var atoms = new Array();
	atoms = [];
	var atomcolors = new Array();
	atomcolors = [];

    d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "");
	d3.select("#pymolseqs2").selectAll(".mytxt2").style("fill", "");

	if(chain==0){
	    svg.selectAll(".cell circle").filter( function(d) {

			if(json_pymolseq1[groupindex].start <= d.residueNum && d.residueNum <= json_pymolseq1[groupindex].end){

                //console.log("in function "+groupindex+ "\t"+d.residueNum)

			    d3.select("#pymolseqs1").selectAll(".mytxt").filter( function(di,index) { if (d.residueNum===jsonSour.nodes[index].residueNum) {


		          atoms.push( d.residueNum );
		         // atomcolors.push("0x5FDA99");

					return true;
				} })
				//.style("fill", "red")
				.style("fill", function(d) { return fill(groupindex); })
				.style("font-weight", "bold");

				return true;
			}

			else{return false;}

	    })
	    //.attr("class", "encode")
		.style("fill", function(d) {
				return fill(groupindex);
		})
		.style("fill-opacity", function(d) {
				return 1;
		});

	    // Otherwise, set class to 'null'
	    svg.selectAll(".cell circle").filter( function(d) {

			if(json_pymolseq1[groupindex].start <= d.residueNum && d.residueNum <= json_pymolseq1[groupindex].end){
				return false;
			}

			else{return true;}

	    })
		.style("fill", function(d) {
				return "#C1BFBF";
		})
		.style("fill-opacity", function(d) {

			return .1;

		});
	    // Otherwise, set class to 'null' the second chain residues as well
	    svg.selectAll(".cell rect").filter( function(d) {
            return true;

	    })
		.style("fill", function(d) {
				return "#C1BFBF";
		})
		.style("fill-opacity", function(d) {

			return .1;

		});
	}

	else{
	    svg.selectAll(".cell rect").filter( function(d) {

			if(json_pymolseq2[groupindex].start <= d.residueNum && d.residueNum <= json_pymolseq2[groupindex].end){

                //console.log("in function "+json_pymolseq2[groupindex].start+"\t"+json_pymolseq2[groupindex].end+"\t"+groupindex+ "\t"+d.residueNum)

			    d3.select("#pymolseqs2").selectAll(".mytxt2").filter( function(di,index) {

                    if (d.residueNum===jsonTarg.nodes[index].residueNum) {

		                atoms.push( d.residueNum );
		                return true;
				} })
				//.style("fill", "red")
				.style("fill", function(d) { return fill2(groupindex); })
				.style("font-weight", "bold");

				return true;
			}

			else{return false;}

	    })
	    //.attr("class", "encode")
		.style("fill", function(d) {
				return fill2(groupindex);
		})
		.style("fill-opacity", function(d) {
				return 1;
		});

	    // Otherwise, set class to 'null'
	    svg.selectAll(".cell rect").filter( function(d) {

			if(json_pymolseq2[groupindex].start <= d.residueNum && d.residueNum <= json_pymolseq2[groupindex].end){
				return false;
			}

			else{return true;}

	    })
		.style("fill", function(d) {
				return "#C1BFBF";
		})
		.style("fill-opacity", function(d) {

			return .1;

		});
	    // Otherwise, set class to 'null' first chain residues as well
	    svg.selectAll(".cell circle").filter( function(d) {
            return true;

	    })
		.style("fill", function(d) {
				return "#C1BFBF";
		})
		.style("fill-opacity", function(d) {

			return .1;

		});
	}

    addDownloadLink2("splom");

	drawTable(atoms);

}

// Set DIVs to same height:
function equaliseDIVs() {
    if ( $("#proteinview").height() > $("#splomContainer").height() ) {
        d3.select("#splomContainer").style("height", $("#proteinview").height() + "px");
    } else {
        d3.select("#proteinview").style("height", $("#splomContainer").height() + "px");
    }
}

function drawSplom() {

  var svgWidth = Math.max(width, 450);

  // clear the SVG, in case we're re-drawing
  d3.select("#splom").select("svg").remove();

  // If we're drawing the whole SPLOM, remove button to do that
  if (allTraits === traits) {
      d3.select("#splom").select("#showWholeSPLOM").remove();
  }

  var aaData = new Array();

  // Size parameters.
  var n = traits.length;
  var padding = 20;

  var size = (svgWidth * 0.9 - (n-1)*padding) / n;  // 10% of image is labels on left
  var fontSize = (0.1*svgWidth) / 6;

  // Position scales.
  var x = {}, y = {}, x_rev = {};
  traits.forEach(function(trait) {

	  //min = 0 idi, closeness hep 4 ten baslio genelde, o yuzden 4 dedim min'e buna tekrar bak , plotta duzgun gorunsun die .
    var min=4, max=0;
    for (var i = 0; i < json_splom.nodes.length; i++ ) {
        if (json_splom.nodes[i][trait] > max) { max = json_splom.nodes[i][trait]; }
        if (json_splom.nodes[i][trait] < min) { min = json_splom.nodes[i][trait]; }
    }

    var domain = [min, max],
         range = [padding / 2, size - padding / 2];
    x[trait] = d3.scale.linear().domain(domain).range(range);

    x_rev[trait] = d3.scale.linear().domain(domain).range( [size - padding / 2, padding / 2] );
    y[trait] = d3.scale.linear().domain(domain).range( [size - padding / 2, padding / 2] );
  });

  // Axes.
  var axis = d3.svg.axis()
  //instead of .ticks(5), i changed to 4 to get rid of x-axis overlapping values of betweenness
      .ticks(4)
      .tickSize(size * n);

  // Brush.
   brush = d3.svg.brush()
      .on("brushstart", brushstart)
      .on("brush", brush)
      .on("brushend", brushend);

  // Root panel.
   svg = d3.select("#splom").append("svg:svg")
 	.attr("viewBox",  function (d,i) {

 		if ($(window).width() >= 1900 && $(window).height() > 1065 ) {
 			return  "0 0 550 550";
 		}

 		else{

 			return  "0 0 450 450";
 		}

 	})
	// .style("display","block")//to place svg centered
// 	.style("margin","auto")//to place svg centered
// 	.style("margin-top","50px")//to place svg centered
 	.attr( "preserveAspectRatio", "xMidYMid meet")
      .append("svg:g")
      .attr("transform", "translate(" + 0.1*svgWidth + "," + 0.1*svgWidth + ")");

	 //ORIGINAL WAY TO DO THE SPLOM GRAPH
   // svg = d3.select("#splom").append("svg:svg")
//       .attr("width", svgWidth)
//       .attr("height", svgWidth)
//       .append("svg:g")
//       .attr("transform", "translate(" + 0.1*svgWidth + "," + 0.1*svgWidth + ")");
//       //.attr("transform", "translate(359.5,69.5)");

  // Apply the CSS styling
  d3.select("#splom").select("svg").append("style").attr("type", "text/css").text(svgStyleSplom);

  // X-axis.
  svg.selectAll("g.x.axis")
      .data(traits)
      .enter().append("svg:g")
      .attr("class", "x axis")
      .attr("style", "font-size: 8pt ")
  	  .attr("transform", function(d, i) { return "translate(" + i * size + ",0)"; })
      .each(function(d) { d3.select(this).call(axis.scale(x[d]).orient("bottom")); })
  //CHANGED BY MELIS: bottom lines of code to rotate the x axis 90 degrees and we needed to change x y coordinates of the text.
	  .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-33.0em")
      .attr("dy", "-32.5em")
      .attr("transform", function(d) {
        return "rotate(-90)"
        });

  // Y-axis.
  svg.selectAll("g.y.axis")
      .data(traits)
      .enter().append("svg:g")
      .attr("class", "y axis")
		.attr("style", "font-size: 8pt ")
    //  .attr("style", "font-size: " + (width > 700 ? "8pt" : "8pt") )
      .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
      .each(function(d) { d3.select(this).call(axis.scale(y[d]).orient("right")); });

  // Cell and plot.
  var cell;
  if(viewOptions.chains[0]==viewOptions.chains[1]){

  cell = svg.selectAll("g.cell")
      .data(cross(traits, traits))
      .enter().append("svg:g")
      .attr("class", "cell")
      .attr("transform", function(d) { return "translate(" + d.i * size + "," + d.j * size + ")"; })
      .on("mouseover", function(d) {
          svg.selectAll(".x-axis-label").filter(function(da,i) { if(da===d.x) {return true; } }).style("fill", "red");
          svg.selectAll(".y-axis-label").filter(function(da,i) { if(da===d.y) {return true; } }).style("fill", "red")
      })
    .on("mouseout", function(d) {
          svg.selectAll(".x-axis-label").filter(function(da,i) { if(da===d.x) {return true; } }).style("fill", "");
          svg.selectAll(".y-axis-label").filter(function(da,i) { if(da===d.y) {return true; } }).style("fill", "")
      })
      .each(plot);

  }
  else{
	  cell = svg.selectAll("g.cell")
	      .data(cross(traits, traits))
	      .enter().append("svg:g")
	      .attr("class", "cell")
	      .attr("transform", function(d) { return "translate(" + d.i * size + "," + d.j * size + ")"; })
	      .on("mouseover", function(d) {
	          svg.selectAll(".x-axis-label").filter(function(da,i) { if(da===d.x) {return true; } }).style("fill", "red");
	          svg.selectAll(".y-axis-label").filter(function(da,i) { if(da===d.y) {return true; } }).style("fill", "red")
	      })
	    .on("mouseout", function(d) {
	          svg.selectAll(".x-axis-label").filter(function(da,i) { if(da===d.x) {return true; } }).style("fill", "");
	          svg.selectAll(".y-axis-label").filter(function(da,i) { if(da===d.y) {return true; } }).style("fill", "")
	      })
	      .each(plotbetweenchains);
  }


 // Titles for all x-axes
  svg.selectAll(".x-axis-label").data(traits2).enter().append("text")
     .text(function(d) {return d; })
     .attr("class", "x-axis-label")
     .attr("style", "font-size: " + 10 + "px" )
     .style("text-anchor", "middle")
     .attr("transform", function(d, i) { return "translate(" + (i * size + size/2) + "," + 0 + ")"; })
   //  .on("click", selectXAxis ) // onclick is to call function to zoom into the scatter plot, for now comment it out
     .style("cursor", "pointer")
     .on("click", function(d) {return colorbyproperty(d); })


 // Titles for all y-axes
  svg.selectAll(".y-axis-label").data(traits2).enter().append("text")
     .text(function(d) { return d; })
     .attr("class", "y-axis-label")
     .attr("style", "font-size: " + 10 + "px;" )
     .attr("text-anchor", "end")
     .attr("transform", function(d, i) { return "translate(" + 0 + "," + (i * size + size/4) + ")rotate(-90)"; })
	 //.attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; })
    // .on("click", selectYAxis ) // onclick is to call function to zoom into the scatter plot, for now comment it out
     .style("cursor", "pointer")
     .on("click", function(d) {return colorbyproperty(d); })

  equaliseDIVs();

  // function rainbow(n) {
  //     return 'hsl(' + n + ',100%,50%)';
  // }
  // for (var i = 0; i <= 240; i+=10) {
//       $('<b>X</b>').css({
//           color: rainbow(i)
//       }).appendTo('#colors');
//   }
//

 function plotbetweenchains(p) {
   var cell = d3.select(this);

   // Plot frame.
   cell.append("svg:rect")
       .attr("class", "frame")
       .attr("x", padding / 2)
       .attr("y", padding / 2)
       .attr("width", size - padding)
       .attr("height", size - padding);

    // Plot dots.
    cell.selectAll("circle")
        .data(json_splom1.nodes)
      .enter().append("svg:circle")
       .attr("class", function(d) {
          if ( !(viewOptions.highlightedsplom) || !(viewOptions.highlightedsplom.length > 0) || (viewOptions.highlightedsplom.indexOf(d.residueNum) != -1)  ) {
            return "highlighted_2";
          } else {
            return null;
          }
        } )
 		.attr("fill", function(d,i) {
 			if( viewOptions.encode==1 || viewOptions.colorbyproperty == 1){
 				//alert("lala");
        if(json_splom1.nodes[i].value == "no"){
          return "#C1BFBF";
        }
        else {
          return color_conservation(json_splom1.nodes[i].value);
        }
 			}

 			else if( viewOptions.colorless==1 ){

 				return "#C1BFBF";
 			}

 			else{

 				var check=0;
 				for(var a=0; a<json.groups.length; a++){
 					if(json.groups[a].start <= d.residueNum && d.residueNum <= json.groups[a].end){

 						check=-1;
 						return fill(a);
 					}
 				}
 				if(check==0){
 					return "#C1BFBF";
 				}
 			}

 			//THIS IS CHANGED, TO MAKE ALL INDIVIDUAL NODES GREY RATHER THAN DARK BLUE.
 			//else return "#008";
 			//else return "#C1BFBF";

 			}
 		)
 		.attr("fill-opacity", "0.5")
        .attr("cx", function(d) { return x[p.x](d[p.x]); })
        .attr("cy", function(d) { return y[p.y](d[p.y]); })
        .attr("r", 3);

   // Plot dots.
   cell.selectAll("square")
       .data(json_splom2.nodes)
     .enter().append("svg:rect")
      .attr("class", function(d) {
         if ( !(viewOptions.highlightedsplom) || !(viewOptions.highlightedsplom.length > 0) || (viewOptions.highlightedsplom.indexOf(d.residueNum) != -1)  ) {
           return "highlighted_2";
         } else {
           return null;
         }
       } )
		.attr("fill", function(d,i) {
			if( viewOptions.encode==1 || viewOptions.colorbyproperty==1){
				//alert("lala");
        if(json_splom2.nodes[i].value == "no"){
          return "#C1BFBF";
        }
        else {
          return color_conservation(json_splom2.nodes[i].value);
        }
			}

			else if( viewOptions.colorless==1 ){

				return "#C1BFBF";
			}

			else{

				var check=0;
				for(var a=0; a<json.groups.length; a++){
					if(json.groups[a].start <= d.residueNum && d.residueNum <= json.groups[a].end){

						check=-1;
						return fill(a);
					}
				}
				if(check==0){
					return "#C1BFBF";
				}
			}

			//THIS IS CHANGED, TO MAKE ALL INDIVIDUAL NODES GREY RATHER THAN DARK BLUE.
			//else return "#008";
			//else return "#C1BFBF";

			}
		)
		.attr("fill-opacity", "0.5")
	    .attr("x", function(d) { return x[p.x](d[p.x]); })
	    .attr("y", function(d) { return y[p.y](d[p.y]); })
	   .attr("width",6)
	    .attr("height",6)


   // Plot brush.
   cell.call(brush.x(x[p.x]).y(y[p.y]));

   // addDownloadLink2("splom");
 }

  function plot(p) {
    var cell = d3.select(this);

    // Plot frame.
    cell.append("svg:rect")
        .attr("class", "frame")
        .attr("x", padding / 2)
        .attr("y", padding / 2)
        .attr("width", size - padding)
        .attr("height", size - padding);

    // Plot dots.
    cell.selectAll("circle")
        .data(json_splom.nodes)
      .enter().append("svg:circle")
       .attr("class", function(d) {
          if ( !(viewOptions.highlightedsplom) || !(viewOptions.highlightedsplom.length > 0) || (viewOptions.highlightedsplom.indexOf(d.residueNum) != -1)  ) {
            return "highlighted_2";
          } else {
            return null;
          }
        } )
 		.attr("fill", function(d,i) {
 			if( viewOptions.encode==1 || viewOptions.colorbyproperty==1){
 				//alert("lala");
        if(json_splom.nodes[i].value == "no"){
          return "#C1BFBF";
        }
        else {
          return color_conservation(json_splom.nodes[i].value);
        }

 			}

 			else if( viewOptions.colorless==1 ){

 				return "#C1BFBF";
 			}

 			else{

 				var check=0;
 				for(var a=0; a<json.groups.length; a++){
 					if(json.groups[a].start <= d.residueNum && d.residueNum <= json.groups[a].end){

 						check=-1;
 						return fill(a);
 					}
 				}
 				if(check==0){
 					return "#C1BFBF";
 				}
 			}

 			//THIS IS CHANGED, TO MAKE ALL INDIVIDUAL NODES GREY RATHER THAN DARK BLUE.
 			//else return "#008";
 			//else return "#C1BFBF";

 			}
 		)
 		.attr("fill-opacity", "0.5")
        .attr("cx", function(d) { return x[p.x](d[p.x]); })
        .attr("cy", function(d) { return y[p.y](d[p.y]); })
        .attr("r", 3);


    // Plot brush.
    cell.call(brush.x(x[p.x]).y(y[p.y]));

    // addDownloadLink2("splom");
  }

  // Clear the previously-active brush, if any.
  function brushstart(p) {
    if (brush.data !== p) {
      cell.call(brush.clear());
      brush.x(x[p.x]).y(y[p.y]).data = p;
    }
  }


  // Highlight the selected circles.
  function brush(p) {
    var e = brush.extent();

	//console.log(e[0][0]+"\t"+e[0][1]+"\t"+e[1][0]+"\t"+e[1][1]);

    var selectedCount=0;
    highlighted=[];

    svg.selectAll(".cell circle").filter( function(d) {

    // if in area, append to data table [if not already present] and set class to 'highlighted'
    if (e[0][0] <= d[p.x] && d[p.x] <= e[1][0] && e[0][1] <= d[p.y] && d[p.y] <= e[1][1]) {
        if (highlighted.indexOf(d.residueNum) === -1) { highlighted.push(d.residueNum); }
        return true;
    } else {
        return false;
    }
    })
    //.attr("class", "highlighted");
	.style("fill", function(d,i) {
		if( viewOptions.encode==1  || viewOptions.colorbyproperty==1){
			//alert("lala");
      if(json_splom.nodes[i].value == "no"){
        return "#C1BFBF";
      }
      else {
        return color_conservation(json_splom.nodes[i].value);
      }
		}

		else if( viewOptions.colorless==1 ){
			//alert("lala");
            //return "#428bca";
			return "#1977C9";
		}

		else{

			var check=0;
			for(var a=0; a<json.groups.length; a++){
				if(json.groups[a].start <= d.residueNum && d.residueNum <= json.groups[a].end){

					check=-1;
					return fill(a);
				}
			}
			if(check==0){
				return "#C1BFBF";
			}
		}
	})
	.style("fill-opacity", function(d) {
		return .5;
	});

    // Otherwise, set class to 'null'
    svg.selectAll(".cell circle").filter( function(d) {
      if (!(e[0][0] <= d[p.x] && d[p.x] <= e[1][0] && e[0][1] <= d[p.y] && d[p.y] <= e[1][1])) {
        return true;
      } else {
        return false;
      }
    })
    //.attr("class", null);
	.style("fill", function(d) {
		return "#C1BFBF";
	})
	.style("fill-opacity", function(d) {
		return .1;
	});


	if(viewOptions.chains[0]!=viewOptions.chains[1]){

	    svg.selectAll(".cell rect").filter( function(d) {

	    // if in area, append to data table [if not already present] and set class to 'highlighted'
	    if (e[0][0] <= d[p.x] && d[p.x] <= e[1][0] && e[0][1] <= d[p.y] && d[p.y] <= e[1][1]) {
	        if (highlighted.indexOf(d.residueNum) === -1) { highlighted.push(d.residueNum); }
	        return true;
	    } else {
	        return false;
	    }
	    })
	    //.attr("class", "highlighted");
		.style("fill", function(d,i) {
			if( viewOptions.encode==1  || viewOptions.colorbyproperty==1){
				//alert("lala");
        if(json_splom.nodes[i].value == "no"){
          return "#C1BFBF";
        }
        else {
          return color_conservation(json_splom.nodes[i].value);
        }
			}

			else if( viewOptions.colorless==1 ){
				//alert("lala");
				return "#1977C9";
			}

			else{

				var check=0;
				for(var a=0; a<json.groups.length; a++){
					if(json.groups[a].start <= d.residueNum && d.residueNum <= json.groups[a].end){

						check=-1;
						return fill(a);
					}
				}
				if(check==0){
					return "#C1BFBF";
				}
			}
		})
		.style("fill-opacity", function(d) {
			return .5;
		});

	    // Otherwise, set class to 'null'
	    svg.selectAll(".cell rect").filter( function(d) {
	      if (!(e[0][0] <= d[p.x] && d[p.x] <= e[1][0] && e[0][1] <= d[p.y] && d[p.y] <= e[1][1])) {
	        return true;
	      } else {
	        return false;
	      }
	    })
	    //.attr("class", null);
		.style("fill", function(d) {
			return "#C1BFBF";
		})
		.style("fill-opacity", function(d) {
			return .1;
		});
	}

    viewOptions.highlightedsplom = highlighted;
	removeURLpart("group1");
	removeURLpart("group2");
    updateURL(viewOptions);
    drawTable(viewOptions.highlightedsplom);


	//var higharray = [];

    var colors = new Array();
    for (var i=0; i < viewOptions.highlightedsplom.length; i++) {
		if( viewOptions.colorless==1 ){
			colors[i]=0X428bca; //rajini blue
		}
		else{
			var res = parseInt(viewOptions.highlightedsplom[i]);
			var check=0;
			for(var a=0; a<json.groups.length; a++){
				if(json.groups[a].start <= res && res <= json.groups[a].end){
					check=-1;
					//return fill(a);
					colors[i]=fill(a);
					colors[i] = colors[i].replace("#", "0X");
				}
			}
			if(check==0){
				colors[i]=0xC1BFBF;
			}
		}
	}

    reDrawProtein(highlighted, colors);

    //do this later, causes error, for two chains, as we haven't added pymolseqs2 yet
    // d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "");
    // d3.select("#pymolseqs2").selectAll(".mytxt").style("fill", "");
    //
    // for(var am=0; am<viewOptions.highlightedsplom.length; am++){
    //     d3.select("#pymolseqs1").selectAll(".mytxt").filter( function(d,index) { if (parseInt(viewOptions.highlightedsplom[am])===parseInt(json_splom.nodes[index].residueNum)) {return true; } }).style("fill", "red").style("font-weight", "bold");
    // }
	   event.preventDefault();

  }

  // If the brush is empty, select all circles.
  function brushend() {
    if (brush.empty()) {

        var selectedCount = 0;
        aaData=[];
      //  svg.selectAll(".cell circle").attr("class", "highlighted");
		//svg.selectAll(".cell circle").attr("class", "notencode");

	    svg.selectAll(".cell circle")
		.style("fill", function(d,i) {

 			if( viewOptions.encode==1  || viewOptions.colorbyproperty==1){
 				//alert("lala");
				for(var a=0; a<json_splom.nodes.length; a++){
					if(json_splom.nodes[a].residueNum == d.residueNum){

            if(json_splom.nodes[a].value == "no"){
              return "#C1BFBF";
            }
            else {
              return color_conservation(json_splom.nodes[a].value);
            }
					}
				}

 			}

 			else if( viewOptions.colorless==1 ){

 				return "#C1BFBF";
 			}

			else{
				//return "#C1BFBF";
				var check=0;
				for(var a=0; a<json.groups.length; a++){
					if(json.groups[a].start <= d.residueNum && d.residueNum <= json.groups[a].end){

						check=-1;
						return fill(a);
					}
				}
				if(check==0){
					return "#C1BFBF";
				}
			}
		})
		.style("fill-opacity", function(d) {

			return 0.5;

		});

		if(viewOptions.chains[0]!=viewOptions.chains[1]){

		    svg.selectAll(".cell rect")
			.style("fill", function(d,i) {

	 			if( viewOptions.encode==1  || viewOptions.colorbyproperty==1){
	 				//alert("lala");
					for(var a=0; a<json_splom.nodes.length; a++){
						if(json_splom.nodes[a].residueNum == d.residueNum){

              if(json_splom.nodes[a].value == "no"){
                return "#C1BFBF";
              }
              else {
                return color_conservation(json_splom.nodes[a].value);
              }
						}
					}

	 			}

	 			else if( viewOptions.colorless==1 ){

	 				return "#C1BFBF";
	 			}

				else{
					//return "#C1BFBF";
					var check=0;
					for(var a=0; a<json.groups.length; a++){
						if(json.groups[a].start <= d.residueNum && d.residueNum <= json.groups[a].end){

							check=-1;
							return fill(a);
						}
					}
					if(check==0){
						return "#C1BFBF";
					}
				}
			})
			.style("fill-opacity", function(d) {
			return 0.5;
			});
		}

		removeURLpart("group1");
		removeURLpart("group2");

    viewOptions.highlightedsplom=[];
    updateURL(viewOptions);
    drawTable(viewOptions.highlightedsplom);
    reDrawProtein([], []);

    }

    addDownloadLink2("splom");

  }

  function cross(a, b) {
    var c = [], n = a.length, m = b.length, i, j;
    for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
    return c;
  }

}

// If the brush is empty, select all circles.
function resetTableandPlot() {

  var selectedCount = 0;
  aaData=[];

    svg.selectAll(".cell circle")
  .style("fill", function(d,i) {

    if( viewOptions.encode==1  || viewOptions.colorbyproperty==1){
      //alert("lala");
      for(var a=0; a<json_splom.nodes.length; a++){
        if(json_splom.nodes[a].residueNum == d.residueNum){

          if(json_splom.nodes[a].value == "no"){
            return "#C1BFBF";
          }
          else {
            return color_conservation(json_splom.nodes[a].value);
          }
        }
      }

    }

    else if( viewOptions.colorless==1 ){

      return "#C1BFBF";
    }

    else{
      //return "#C1BFBF";
      var check=0;
      for(var a=0; a<json.groups.length; a++){
        if(json.groups[a].start <= d.residueNum && d.residueNum <= json.groups[a].end){

          check=-1;
          return fill(a);
        }
      }
      if(check==0){
        return "#C1BFBF";
      }
    }
  })
  .style("fill-opacity", function(d) {

    return 0.5;

  });

  if(viewOptions.chains[0]!=viewOptions.chains[1]){

      svg.selectAll(".cell rect")
    .style("fill", function(d,i) {

      if( viewOptions.encode==1  || viewOptions.colorbyproperty==1){
        //alert("lala");
        for(var a=0; a<json_splom.nodes.length; a++){
          if(json_splom.nodes[a].residueNum == d.residueNum){

            if(json_splom.nodes[a].value == "no"){
              return "#C1BFBF";
            }
            else {
              return color_conservation(json_splom.nodes[a].value);
            }
          }
        }

      }

      else if( viewOptions.colorless==1 ){

        return "#C1BFBF";
      }

      else{
        //return "#C1BFBF";
        var check=0;
        for(var a=0; a<json.groups.length; a++){
          if(json.groups[a].start <= d.residueNum && d.residueNum <= json.groups[a].end){

            check=-1;
            return fill(a);
          }
        }
        if(check==0){
          return "#C1BFBF";
        }
      }
    })
    .style("fill-opacity", function(d) {
    return 0.5;
    });
  }

  removeURLpart("group1");
  removeURLpart("group2");

  viewOptions.highlightedsplom=[];
  updateURL(viewOptions);
  drawTable(viewOptions.highlightedsplom);
  initializeProteinView([], [], 0);

  addDownloadLink2("splom");

}

// Handle clicks on axes: when an x/y axis is clicked on, store its name.
// if a y/x axis was previously clicked on, draw a zoomed-in plot.
// The zoomed-in plot has a button to redraw the full plot.
function selectXAxis(d) {
     xAxis = d;
     if (yAxis) { drawZoomedScatterplot() }
}

function selectYAxis(d) {
     yAxis = d;
     if (xAxis) { drawZoomedScatterplot() }
}



function drawZoomedScatterplot () {
    if (!xAxis || !yAxis) {
        return 0;
    }

    viewOptions["xAxis"]=xAxis;
    viewOptions["yAxis"]=yAxis;
    updateURL(viewOptions);

    traits = [xAxis, yAxis];
    drawSplom();

    addDownloadLink2("splom");

    d3.select("#splom").append("button").attr("onclick", "drawFullScatterplot();").attr("id", "showWholeSPLOM").text("Show whole SPLOM");
}

function drawFullScatterplot() {
    xAxis = '';
    yAxis = '';

    if (viewOptions.hasOwnProperty("xAxis")) { delete viewOptions["xAxis"]; }
    if (viewOptions.hasOwnProperty("yAxis")) { delete viewOptions["yAxis"]; }
    updateURL(viewOptions);

    traits = allTraits;
    drawSplom();

    addDownloadLink2("splom");
}

function switchViewSplom(newView) {
    if (newView === 'scatter') {

		viewOptions.colorless = 0;
		updateURL(viewOptions);
    drawSplom();

    addDownloadLink2("splom");
  }

    else if (newView === 'changecolor') {

     console.log(viewOptions.color1);


   color_conservation = d3.scale.linear()
     .domain([minimum, maximum])
     .range([viewOptions.color1,viewOptions.color2]);


    d3.select("#splom").select("svg").remove();

    updateURL(viewOptions);
    drawTable(viewOptions.highlightedsplom);
    reDrawProtein([], []);

    drawSplom();

    addDownloadLink2("splom");
  }

  	else if (newView === 'stats') {

		d3.select("#splom").select("svg").remove();

    }

  	else if (newView === 'upload') {

		d3.select("#splom").select("svg").remove();

    }

  	else if (newView === 'original') {

		d3.select("#splom").select("svg").remove();

		viewOptions.encode = 0;

		viewOptions["view"] = 'scatter';

        viewOptions.highlightedsplom=[];
        updateURL(viewOptions);
        drawTable(viewOptions.highlightedsplom);
        reDrawProtein([], []);

		    drawSplom();

        addDownloadLink2("splom");
    }

  	else if (newView === 'uploadeddata') {

		d3.select("#splom").select("svg").remove();

		viewOptions.encode = 1;

		viewOptions["view"] = 'scatter';

        viewOptions.highlightedsplom=[];
        updateURL(viewOptions);
        drawTable(viewOptions.highlightedsplom);
        reDrawProtein([], []);

		    drawSplom();

        addDownloadLink2("splom");

    }

  	else if (newView === 'colorless') {

		d3.select("#splom").select("svg").remove();

		viewOptions.colorless = 1;

		viewOptions["view"] = 'scatter';

        viewOptions.highlightedsplom=[];
        updateURL(viewOptions);
        drawTable(viewOptions.highlightedsplom);

        reDrawProtein([], []);
		    drawSplom();

        addDownloadLink2("splom");

		if (viewOptions.chains[0] != viewOptions.chains[1]) {
			drawAsteroidGraphBetweenChains();
		} else {
			drawAsteroidGraph();
		}

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

        addDownloadLink2("splom");

		if (viewOptions.chains[0] != viewOptions.chains[1]) {
			drawAsteroidGraphBetweenChains();
		} else {
			drawAsteroidGraph();
		}

    }

    viewOptions["view"] = newView;
    updateURL(viewOptions);
}

function ligandtable() {

  var aaDataLigand = new Array;
  var aaDataLigand_up = new Array;
	var aaDataLigand_down = new Array;
  datasetLigand_up = [];
	datasetLigand_down = [];
  //var ligand_info = [];
  var ligand_info = {
     names: [],
     residueNums: [],
     chains: []
 };

var c = 0;

if( viewOptions.chains[0] == viewOptions.chains[1] ){

for (var i=0; i < json.nodes.length; i++){
  for (var y=0; y  < ligandarray.length; y++){
        if(json.nodes[i].name == ligandarray[y]){
          ligand_info.names[c]= json.nodes[i].name;
          ligand_info.residueNums[c] = json.nodes[i].residueNum;
          ligand_info.chains[c] = json.nodes[i].chain;
          c++;
        }
  }
}

var row = 0;
for (var y=0; y < json.links.length; y++){
    for (var i=0; i < ligand_info.names.length; i++){

      if(ligand_info.residueNums[i]==json.nodes[json.links[y].source].residueNum){
        aaDataLigand[row] = new Array;
        aaDataLigand[row][0] = ligand_info.names[i];
        aaDataLigand[row][1] = json.nodes[json.links[y].target].name;
        aaDataLigand[row][2] = json.links[y].value;

      //  aaDataLigand[row][3] = json.links[y].atomnames;

        row++;
      }
      else if(ligand_info.residueNums[i]==json.nodes[json.links[y].target].residueNum){
        aaDataLigand[row] = new Array;
        aaDataLigand[row][0] = ligand_info.names[i];
        aaDataLigand[row][1] = json.nodes[json.links[y].source].name;
        aaDataLigand[row][2] = json.links[y].value;

        //aaDataLigand[row][3] = json.links[y].atomnames;

        row++;
      }

    }
  }
    var tmpDataset = [];

    aaDataLigand_up = aaDataLigand.sort(function(a,b) {
         return b[2] - a[2];
       });

  tmpDataset = [];

  //if number of ligand interactions between chains are less than 10, problem with sorting for 10
  //so make it equal to number of ligand interactions
  var top;
  if(row<10){
    top = row;
  }
  else{
    top = 10;
  }

  number_of_rows = row;

  //row (should be first top 10)
  for (i = 0; i < top; i++) {
      for (j = 0, tmpDataset = []; j < 3; j++) {
          tmpDataset.push(aaDataLigand_up[i][j]);
      }
      datasetLigand_up.push(tmpDataset);
  }

    aaDataLigand_down = aaDataLigand.sort(function(a,b) {
         return a[2] - b[2];
       });

  tmpDataset = [];

  //row (should be first top 10)
  for (i = 0; i < top; i++) {
      for (j = 0, tmpDataset = []; j < 3; j++) {
          tmpDataset.push(aaDataLigand_down[i][j]);
      }
      datasetLigand_down.push(tmpDataset);
  }

}

//if between chains
else{
  for (var i=0; i < json.nodes.length; i++){
    for (var y=0; y  < ligandarray.length; y++){

      var index = ligandarray[y].indexOf(":");
      var chain = ligandarray[y].substr(0,index);
      var name = ligandarray[y].substr(index+1);

          if(json.nodes[i].name == name && json.nodes[i].chain == chain){
            ligand_info.names[c]= json.nodes[i].name;
            ligand_info.residueNums[c] = json.nodes[i].residueNum;
            ligand_info.chains[c] = json.nodes[i].chain;
            c++;
          }
    }
  }

  var row = 0;
  for (var y=0; y < json.links.length; y++){

      for (var i=0; i < ligand_info.names.length; i++){

        var index = json.links[y].chains.indexOf("->");
        var chain1 = json.links[y].chains.substr(0,index);
        var chain2 = json.links[y].chains.substr(index+2);

        if(ligand_info.residueNums[i]==json.nodes[json.links[y].source].residueNum && chain1 == ligand_info.chains[i]){

          aaDataLigand[row] = new Array;
          aaDataLigand[row][0] = chain1;
          aaDataLigand[row][1] = ligand_info.names[i];
          aaDataLigand[row][2] = chain2;
          aaDataLigand[row][3] = json.nodes[json.links[y].target].name;
          aaDataLigand[row][4] = json.links[y].value;

        //  aaDataLigand[row][3] = json.links[y].atomnames;

          row++;
        }
        else if(ligand_info.residueNums[i]==json.nodes[json.links[y].target].residueNum && chain2 == ligand_info.chains[i]){

          aaDataLigand[row] = new Array;
          aaDataLigand[row][0] = chain2;
          aaDataLigand[row][1] = ligand_info.names[i];
          aaDataLigand[row][2] = chain1;
          aaDataLigand[row][3] = json.nodes[json.links[y].source].name;
          aaDataLigand[row][4] = json.links[y].value;

          //aaDataLigand[row][3] = json.links[y].atomnames;

          row++;
        }

      }
    }
      var tmpDataset = [];

      aaDataLigand_up = aaDataLigand.sort(function(a,b) {
           return b[4] - a[4];
         });

    tmpDataset = [];

    //if number of ligand interactions between chains are less than 10, problem with sorting for 10
    //so make it equal to number of ligand interactions
    var top;
    if(row<10){
      top = row;
    }
    else{
      top = 10;
    }

    number_of_rows = row;

    //row (should be first top 10)
    for (i = 0; i < top; i++) {
        for (j = 0, tmpDataset = []; j < 5; j++) {
            tmpDataset.push(aaDataLigand_up[i][j]);
        }
        datasetLigand_up.push(tmpDataset);
    }

      aaDataLigand_down = aaDataLigand.sort(function(a,b) {
           return a[4] - b[4];
         });

    tmpDataset = [];

    //row (should be first top 10)
    for (i = 0; i < top; i++) {
        for (j = 0, tmpDataset = []; j < 5; j++) {
            tmpDataset.push(aaDataLigand_down[i][j]);
        }
        datasetLigand_down.push(tmpDataset);
    }

}

var titles = [];

if( viewOptions.chains[0] == viewOptions.chains[1] ){

   titles = ["Ligand",
    "Residue/Ligand",
   //"Atoms",
   "Number of contacts"];

 }
 else{
   titles = [
     "Chain",
     "Ligand",
     "Chain",
     "Residue/Ligand",
     "Number of contacts"
  ];
 }

  d3.select("#table_ligandlist_up").select("table").remove();

  $('#table_ligandlist_up').css('display','block');

  //.style("border", "0")

      var table_ligandlist_up = d3.select("#table_ligandlist_up").append("table").style("table-layout","fixed"),
          thead = table_ligandlist_up.append("thead"),
          tbody = table_ligandlist_up.append("tbody");

      thead.append("tr")
      .selectAll("th")
        .data(titles)
         .enter()
        .append("th")
        .style("border", "0.5px #dddddd solid")
        .style("background-color", "#FFF")
        .style("color", "grey")
        .style("width", "50px")
        .style("word-wrap", "break-word")
        .style("text-align", "center")
        .text(function(column) { return column; });


  var rows = tbody.selectAll("tr")
        .data(datasetLigand_up)
      .enter()
        .append("tr");

      var cells = rows.selectAll("td")
        .data(function(d){return d;})
        .enter()
        .append("td")
        .style("text-align", "center")
        .style("padding", "10px")
        .text(function(d) { return d; })
        .style("font-size", "12px");

  d3.select("#table_ligandlist_down").select("table").remove();

if(row>10){

  $('#table_ligandlist_down').css('display','block');

      var table_ligandlist_down = d3.select("#table_ligandlist_down").append("table").style("table-layout","fixed"),
          thead = table_ligandlist_down.append("thead"),
          tbody = table_ligandlist_down.append("tbody");

      thead.append("tr")
      .selectAll("th")
        .data(titles)
         .enter()
        .append("th")
        .style("border", "0.5px #dddddd solid")
        .style("background-color", "#FFF")
        .style("color", "grey")
        .style("width", "50px")
        .style("word-wrap", "break-word")
        .style("text-align", "center")
        .text(function(column) { return column; });


  var rows = tbody.selectAll("tr")
        .data(datasetLigand_down)
      .enter()
        .append("tr");

      var cells = rows.selectAll("td")
        .data(function(d){return d;})
        .enter()
        .append("td")
        .style("text-align", "center")
        .style("padding", "10px")
        .text(function(d) { return d; })
        .style("font-size", "12px");
}

}

function sorttable() {

  var aaData = new Array;
	var aaData_sol_up = new Array;
	var aaData_sol_down = new Array;
	var aaData_between_up = new Array;
	var aaData_between_down = new Array;
	var aaData_close_up = new Array;
	var aaData_close_down = new Array;
  var aaData_degree_up = new Array;
	var aaData_degree_down = new Array;

	dataset_sol_up = [];
	dataset_sol_down = [];
	dataset_between_up = [];
	dataset_between_down = [];
	dataset_close_up = [];
	dataset_close_down = [];
  dataset_degree_up = [];
	dataset_degree_down = [];

	var tmpDataset = [],
	i, j;

  if( viewOptions.chains[0] == viewOptions.chains[1] ){

    var row = 0;
    for (var i=0; i < json_splom.nodes.length; i++){

        aaData[row] = new Array;
        aaData[row][0] = json_splom.nodes[i].name;
        aaData[row][1] = json_splom.nodes[i].solvatedArea;
        aaData[row][2] = json_splom.nodes[i].degree;
        aaData[row][3] = json_splom.nodes[i].betweeness;
        aaData[row][4] = json_splom.nodes[i].closeness;
        row++;

    }

    aaData_sol_up = aaData.sort(function(a,b) {
         return b[1] - a[1];
       });

	//row (should be first top 10)
	for (i = 0; i < 10; i++) {
	    for (j = 0, tmpDataset = []; j < 5; j++) {
	        tmpDataset.push(aaData_sol_up[i][j]);
	    }
	    dataset_sol_up.push(tmpDataset);
	}

    aaData_sol_down = aaData.sort(function(a,b) {
         return a[1] - b[1];
       });

	tmpDataset = [];

	//row (should be first top 10)
 	for (i = 0; i < 10; i++) {
 	    for (j = 0, tmpDataset = []; j < 5; j++) {
 	        tmpDataset.push(aaData_sol_down[i][j]);
 	    }
 	    dataset_sol_down.push(tmpDataset);
 	}

   aaData_between_up = aaData.sort(function(a,b) {
       return b[3] - a[3];
     });

  	 tmpDataset = [];

  	//row (should be first top 10)
  	for (i = 0; i < 10; i++) {
  	    for (j = 0, tmpDataset = []; j < 5; j++) {
  	        tmpDataset.push(aaData_between_up[i][j]);
  	    }
  	    dataset_between_up.push(tmpDataset);
  	}


    aaData_between_down = aaData.sort(function(a,b) {
          return a[3] - b[3];
        });

	tmpDataset = [];

 	//row (should be first top 10)
 	for (i = 0; i < 10; i++) {
 	    for (j = 0, tmpDataset = []; j < 5; j++) {
 	        tmpDataset.push(aaData_between_down[i][j]);
 	    }
 	    dataset_between_down.push(tmpDataset);
 	}

    aaData_close_up = aaData.sort(function(a,b) {
        return b[4] - a[4];
      });

	  tmpDataset = [];

   	//row (should be first top 10)
   	for (i = 0; i < 10; i++) {
   	    for (j = 0, tmpDataset = []; j < 5; j++) {
   	        tmpDataset.push(aaData_close_up[i][j]);
   	    }
   	    dataset_close_up.push(tmpDataset);
   	}

  	aaData_close_down = aaData.sort(function(a,b) {
       return a[4] - b[4];
     });

 	 tmpDataset = [];

 	//row (should be first top 10)
 	for (i = 0; i < 10; i++) {
 	    for (j = 0, tmpDataset = []; j < 5; j++) {
 	        tmpDataset.push(aaData_close_down[i][j]);
 	    }
 	    dataset_close_down.push(tmpDataset);
 	}

//ADDED DEGREE SORTING RECENTLY
      aaData_degree_up = aaData.sort(function(a,b) {
          return b[2] - a[2];
        });

  	  tmpDataset = [];

     	//row (should be first top 10)
     	for (i = 0; i < 10; i++) {
     	    for (j = 0, tmpDataset = []; j < 5; j++) {
     	        tmpDataset.push(aaData_degree_up[i][j]);
     	    }
     	    dataset_degree_up.push(tmpDataset);
     	}

    	aaData_degree_down = aaData.sort(function(a,b) {
         return a[2] - b[2];
       });

   	 tmpDataset = [];

   	//row (should be first top 10)
   	for (i = 0; i < 10; i++) {
   	    for (j = 0, tmpDataset = []; j < 5; j++) {
   	        tmpDataset.push(aaData_degree_down[i][j]);
   	    }
   	    dataset_degree_down.push(tmpDataset);
   	}

  }

  //IF MULTIPLE CHAINS SELECTED
  else {

    var row = 0;
    for (var i=0; i < json_splom.nodes.length; i++){

        aaData[row] = new Array;
        aaData[row][0] = json_splom.nodes[i].chain;
        aaData[row][1] = json_splom.nodes[i].name;
        aaData[row][2] = json_splom.nodes[i].solvatedArea;
        aaData[row][3] = json_splom.nodes[i].degree;
        aaData[row][4] = json_splom.nodes[i].betweeness;
        aaData[row][5] = json_splom.nodes[i].closeness;
        row++;

    }

    var top;
    if(row<10){
      top = row;
    }
    else{
      top = 10;
    }

    aaData_sol_up = aaData.sort(function(a,b) {
         return b[2] - a[2];
       });

	//row (should be first top 10)
	for (i = 0; i < top; i++) {
	    for (j = 0, tmpDataset = []; j < 6; j++) {
	        tmpDataset.push(aaData_sol_up[i][j]);
	    }
	    dataset_sol_up.push(tmpDataset);
	}

    aaData_sol_down = aaData.sort(function(a,b) {
         return a[2] - b[2];
       });

	tmpDataset = [];

	//row (should be first top 10)
 	for (i = 0; i < top; i++) {
 	    for (j = 0, tmpDataset = []; j < 6; j++) {
 	        tmpDataset.push(aaData_sol_down[i][j]);
 	    }
 	    dataset_sol_down.push(tmpDataset);
 	}

   aaData_between_up = aaData.sort(function(a,b) {
       return b[4] - a[4];
     });

  	 tmpDataset = [];

  	//row (should be first top 10)
  	for (i = 0; i < top; i++) {
  	    for (j = 0, tmpDataset = []; j < 6; j++) {
  	        tmpDataset.push(aaData_between_up[i][j]);
  	    }
  	    dataset_between_up.push(tmpDataset);
  	}


    aaData_between_down = aaData.sort(function(a,b) {
          return a[4] - b[4];
        });

	tmpDataset = [];

 	//row (should be first top 10)
 	for (i = 0; i < top; i++) {
 	    for (j = 0, tmpDataset = []; j < 6; j++) {
 	        tmpDataset.push(aaData_between_down[i][j]);
 	    }
 	    dataset_between_down.push(tmpDataset);
 	}

    aaData_close_up = aaData.sort(function(a,b) {
        return b[5] - a[5];
      });

	  tmpDataset = [];

   	//row (should be first top 10)
   	for (i = 0; i < top; i++) {
   	    for (j = 0, tmpDataset = []; j < 6; j++) {
   	        tmpDataset.push(aaData_close_up[i][j]);
   	    }
   	    dataset_close_up.push(tmpDataset);
   	}

  	aaData_close_down = aaData.sort(function(a,b) {
       return a[5] - b[5];
     });

 	 tmpDataset = [];

 	//row (should be first top 10)
 	for (i = 0; i < top; i++) {
 	    for (j = 0, tmpDataset = []; j < 6; j++) {
 	        tmpDataset.push(aaData_close_down[i][j]);
 	    }
 	    dataset_close_down.push(tmpDataset);
 	}

//ADDED DEGREE SORTING RECENTLY
      aaData_degree_up = aaData.sort(function(a,b) {
          return b[3] - a[3];
        });

  	  tmpDataset = [];

     	//row (should be first top 10)
     	for (i = 0; i < top; i++) {
     	    for (j = 0, tmpDataset = []; j < 6; j++) {
     	        tmpDataset.push(aaData_degree_up[i][j]);
     	    }
     	    dataset_degree_up.push(tmpDataset);
     	}

    	aaData_degree_down = aaData.sort(function(a,b) {
         return a[3] - b[3];
       });

   	 tmpDataset = [];

   	//row (should be first top 10)
   	for (i = 0; i < top; i++) {
   	    for (j = 0, tmpDataset = []; j < 6; j++) {
   	        tmpDataset.push(aaData_degree_down[i][j]);
   	    }
   	    dataset_degree_down.push(tmpDataset);
   	}
  }

  var columns = [];

  if( viewOptions.chains[0] == viewOptions.chains[1] ){

   columns = ["Name",
    "Solvated Area",
    "Degree",
    "Betweenness",
    "Closeness"];

  }

  else{
    columns = ["Chain",
      "Name",
     "Solvated Area",
     "Degree",
     "Betweenness",
     "Closeness"];
  }

		d3.select("#table_svg_sol_up").select("table").remove();
		$('#table_svg_sol_up').css('display','block');

	      var table_sol_up = d3.select("#table_svg_sol_up").append("table"),
	          thead = table_sol_up.append("thead"),
	          tbody = table_sol_up.append("tbody");

	      thead.append("tr")
	      .selectAll("th")
	        .data(columns)
	         .enter()
	        .append("th")
          .style("border", "0.5px #dddddd solid")
          .style("background-color", "#FFF")
          .style("color", "grey")
          .style("height", "40px")
          .style("text-align", "center")
	        .text(function(column) { return column; });

	  var rows = tbody.selectAll("tr")
	        .data(dataset_sol_up)
	      .enter()
	        .append("tr");

	      var cells = rows.selectAll("td")
	        .data(function(d){return d;})
	        .enter()
	        .append("td")
          .style("text-align", "center")
    	    .style("padding", "10px")
	        .text(function(d) { return d; })
			    .style("font-size", "12px");

			d3.select("#table_svg_sol_down").select("table").remove();

			$('#table_svg_sol_down').css('display','block');

		      var table_sol_down = d3.select("#table_svg_sol_down").append("table"),
		          thead = table_sol_down.append("thead"),
		          tbody = table_sol_down.append("tbody");

		      thead.append("tr")
		      .selectAll("th")
		        .data(columns)
		      .enter()
		        .append("th")
            .style("border", "0.5px #dddddd solid")
            .style("background-color", "#FFF")
            .style("color", "grey")
            .style("height", "40px")
            .style("text-align", "center")
		        .text(function(column) { return column; });

		  var rows = tbody.selectAll("tr")
		        .data(dataset_sol_down)
		      .enter()
		        .append("tr");

		      var cells = rows.selectAll("td")
		        .data(function(d){return d;})
		        .enter()
		        .append("td")
	    	    .style("text-align", "center")
	    	    .style("padding", "10px")
		        .text(function(d) { return d; })
			      .style("font-size", "12px");

				/////////////////////////SOLVATED AREA SORTED FINISHED
				/////////////////////////BETWEENNESS SORTED STARTS

				d3.select("#table_svg_between_up").select("table").remove();

				$('#table_svg_between_up').css('display','block');

			      var table_between_up = d3.select("#table_svg_between_up").append("table"),
			          thead = table_between_up.append("thead"),
			          tbody = table_between_up.append("tbody");

			      thead.append("tr")
			      .selectAll("th")
			        .data(columns)
			        .enter()
			        .append("th")
              .style("border", "0.5px #dddddd solid")
              .style("background-color", "#FFF")
              .style("color", "grey")
              .style("height", "40px")
              .style("text-align", "center")
			        .text(function(column) { return column; });

			  var rows = tbody.selectAll("tr")
			        .data(dataset_between_up)
			      .enter()
			        .append("tr");

			      var cells = rows.selectAll("td")
			        .data(function(d){return d;})
			        .enter()
			        .append("td")
		    	    .style("text-align", "center")
		    	    .style("padding", "10px")
			        .text(function(d) { return d; })
					    .style("font-size", "12px");

					d3.select("#table_svg_between_down").select("table").remove();

					$('#table_svg_between_down').css('display','block');

				      var table_between_down = d3.select("#table_svg_between_down").append("table"),
				          thead = table_between_down.append("thead"),
				          tbody = table_between_down.append("tbody");

				      thead.append("tr")
				      .selectAll("th")
				        .data(columns)
				        .enter()
				        .append("th")
                .style("border", "0.5px #dddddd solid")
                .style("background-color", "#FFF")
                .style("color", "grey")
                .style("height", "40px")
                .style("text-align", "center")
				        .text(function(column) { return column; });

				  var rows = tbody.selectAll("tr")
				        .data(dataset_between_down)
				      .enter()
				        .append("tr");

				      var cells = rows.selectAll("td")
				        .data(function(d){return d;})
				        .enter()
				        .append("td")
			    	    .style("text-align", "center")
			    	    .style("padding", "10px")
				        .text(function(d) { return d; })
						    .style("font-size", "12px");

				////////////////////////BETWEENNESS SORTED FINISHED
				/////////////////////////CLOSENESS SORTED STARTS

						d3.select("#table_svg_close_up").select("table").remove();

						$('#table_svg_close_up').css('display','block');

					      var table_close_up = d3.select("#table_svg_close_up").append("table"),
					          thead = table_close_up.append("thead"),
					          tbody = table_close_up.append("tbody");

					      thead.append("tr")
					      .selectAll("th")
					        .data(columns)
					        .enter()
					        .append("th")
                  .style("border", "0.5px #dddddd solid")
                  .style("background-color", "#FFF")
                  .style("color", "grey")
                  .style("height", "40px")
                  .style("text-align", "center")
					        .text(function(column) { return column; });

					  var rows = tbody.selectAll("tr")
					        .data(dataset_close_up)
					      .enter()
					        .append("tr");

					      var cells = rows.selectAll("td")
					        .data(function(d){return d;})
					        .enter()
					        .append("td")
				    	    .style("text-align", "center")
				    	    .style("padding", "10px")
					        .text(function(d) { return d; })
							    .style("font-size", "12px");

							d3.select("#table_svg_close_down").select("table").remove();

							$('#table_svg_close_down').css('display','block');

						      var table_close_down = d3.select("#table_svg_close_down").append("table"),
						          thead = table_close_down.append("thead"),
						          tbody = table_close_down.append("tbody");

						      thead.append("tr")
						      .selectAll("th")
						        .data(columns)
						      .enter()
						        .append("th")
                    .style("border", "0.5px #dddddd solid")
                    .style("background-color", "#FFF")
                    .style("color", "grey")
                    .style("height", "40px")
                    .style("text-align", "center")
						        .text(function(column) { return column; });

						  var rows = tbody.selectAll("tr")
						        .data(dataset_close_down)
						      .enter()
						        .append("tr");

						      var cells = rows.selectAll("td")
						        .data(function(d){return d;})
						        .enter()
						        .append("td")
					    	    .style("text-align", "center")
					    	    .style("padding", "10px")
						        .text(function(d) { return d; })
								    .style("font-size", "12px");
                    /////////////////////////CLOSENESS SORTED FINISHES
          /////////////////////////DEGREE SORTED STARTS

					d3.select("#table_svg_degree_up").select("table").remove();

					$('#table_svg_degree_up').css('display','block');

				      var table_degree_up = d3.select("#table_svg_degree_up").append("table"),
				          thead = table_degree_up.append("thead"),
				          tbody = table_degree_up.append("tbody");

  					      thead.append("tr")
  					      .selectAll("th")
  					        .data(columns)
  					        .enter()
  					        .append("th")
                    .style("border", "0.5px #dddddd solid")
                    .style("background-color", "#FFF")
                    .style("color", "grey")
                    .style("height", "40px")
                    .style("text-align", "center")
  					        .text(function(column) { return column; });

  					  var rows = tbody.selectAll("tr")
  					        .data(dataset_degree_up)
  					      .enter()
  					        .append("tr");

  					      var cells = rows.selectAll("td")
  					        .data(function(d){return d;})
  					        .enter()
  					        .append("td")
  				    	    .style("text-align", "center")
  				    	    .style("padding", "10px")
  					        .text(function(d) { return d; })
  							    .style("font-size", "12px");

  							d3.select("#table_svg_degree_down").select("table").remove();

  							$('#table_svg_degree_down').css('display','block');

  						      var table_degree_down = d3.select("#table_svg_degree_down").append("table"),
  						          thead = table_degree_down.append("thead"),
  						          tbody = table_degree_down.append("tbody");

  						      thead.append("tr")
  						      .selectAll("th")
  						        .data(columns)
  						      .enter()
  						        .append("th")
                      .style("border", "0.5px #dddddd solid")
                      .style("background-color", "#FFF")
                      .style("color", "grey")
                      .style("height", "40px")
                      .style("text-align", "center")
  						        .text(function(column) { return column; });

  						  var rows = tbody.selectAll("tr")
  						        .data(dataset_degree_down)
  						      .enter()
  						        .append("tr");

  						      var cells = rows.selectAll("td")
  						        .data(function(d){return d;})
  						        .enter()
  						        .append("td")
  					    	    .style("text-align", "center")
  					    	    .style("padding", "10px")
  						        .text(function(d) { return d; })
  								    .style("font-size", "12px");

			///////////////////////////////////////////////////////

    if( viewOptions.chains[0] == viewOptions.chains[1] ){

      d3.selectAll("#table_svg_sol_up").selectAll('td:nth-child(2)').style("background","#CCC");
      d3.selectAll("#table_svg_sol_down").selectAll('td:nth-child(2)').style("background","#CCC");
      d3.selectAll("#table_svg_between_up").selectAll('td:nth-child(4)').style("background","#CCC");
      d3.selectAll("#table_svg_between_down").selectAll('td:nth-child(4)').style("background","#CCC");
      d3.selectAll("#table_svg_close_up").selectAll('td:nth-child(5)').style("background","#CCC");
      d3.selectAll("#table_svg_close_down").selectAll('td:nth-child(5)').style("background","#CCC");
      d3.selectAll("#table_svg_degree_up").selectAll('td:nth-child(3)').style("background","#CCC");
      d3.selectAll("#table_svg_degree_down").selectAll('td:nth-child(3)').style("background","#CCC");

    }
    else{
      d3.selectAll("#table_svg_sol_up").selectAll('td:nth-child(3)').style("background","#CCC");
      d3.selectAll("#table_svg_sol_down").selectAll('td:nth-child(3)').style("background","#CCC");
      d3.selectAll("#table_svg_between_up").selectAll('td:nth-child(5)').style("background","#CCC");
      d3.selectAll("#table_svg_between_down").selectAll('td:nth-child(5)').style("background","#CCC");
      d3.selectAll("#table_svg_close_up").selectAll('td:nth-child(6)').style("background","#CCC");
      d3.selectAll("#table_svg_close_down").selectAll('td:nth-child(6)').style("background","#CCC");
      d3.selectAll("#table_svg_degree_up").selectAll('td:nth-child(4)').style("background","#CCC");
      d3.selectAll("#table_svg_degree_down").selectAll('td:nth-child(4)').style("background","#CCC");

    }

}

function callhtml2canvas(callback){
    var i = 0;//variable - increment
    var a = [];
    tableURI = [];

	a[0]=$("#table_svg_sol_up");
  a[1]=$("#table_svg_sol_down");
  a[2]=$("#table_svg_between_up");
  a[3]=$("#table_svg_between_down");
  a[4]=$("#table_svg_close_up");
  a[5]=$("#table_svg_close_down");
  a[6]=$("#table_svg_degree_up");
  a[7]=$("#table_svg_degree_down");

  //console.log("ligand array "+"\t"+ligandarray.length)

  if(ligandarray.length>0){
    a[8]=$("#table_ligandlist_up");
  }
  if(number_of_rows >10){
    a[9]=$("#table_ligandlist_down");
  }

    var loop = function(){//function for loop async

        html2canvas(a[i],{ //variable "a[i]" - #page1 div.content[i]... //eg.: in first loop: #page1 div.content1
            onrendered:function(canvas){

              if(i<10){
                tableURI[i] = canvas.toDataURL("image/png");
                //console.log("i in"+"\t"+i)
                a[i].css('display','none');
                i++; //increment
                setTimeout(loop,200); //timeout - prevent freeze browser
              }

            }
        });
    };
    loop();
}

function colorbyproperty(property){

  var array = new Array();
  var cak = 0;
   // Normalise betweeness, then round to 3 d.p.
     for (var i=0; i < json_splom.nodes.length; i++) {

       if(property == "degree"){
         json_splom.nodes[i].value=json_splom.nodes[i].degree;
       }
       else if(property == "solvated area"){
         json_splom.nodes[i].value=json_splom.nodes[i].solvatedArea;
       }
       else if(property == "closeness"){
         json_splom.nodes[i].value=json_splom.nodes[i].closeness;
       }
       else if(property == "betweeness"){
         json_splom.nodes[i].value=json_splom.nodes[i].betweeness;
       }

       array[cak]=json_splom.nodes[i].value;

        cak++;
     }

maximum = Math.max.apply(Math, array);
minimum = Math.min.apply(Math, array);
//console.log(maximum);
//console.log(minimum);

 color_conservation = d3.scale.linear()
   .domain([minimum, maximum])
   .range([viewOptions.color1,viewOptions.color2]);

   d3.select("#splom").select("svg").remove();

   viewOptions.colorbyproperty = 1;
   //viewOptions.encode = 1;

   viewOptions["view"] = 'scatter';

   viewOptions.highlightedsplom=[];
   updateURL(viewOptions);
   drawTable(viewOptions.highlightedsplom);
   reDrawProtein([], []);

   drawSplom();

  addDownloadLink2("splom");

}


function updateSplomselectedresidues(selected) {

	var atoms = new Array();
	atoms = [];
	var atomcolors = new Array();
	atomcolors = [];

    d3.select("#pymolseqs1").selectAll(".mytxt").style("fill", "");

    console.log(selected)



    svg.selectAll(".cell circle").filter( function(d) {

       for(var i=0; i<selected.length; i++){

        if(parseInt(selected[i]) == d.residueNum ){

          console.log(parseInt(selected[i]))

    		    d3.select("#pymolseqs1").selectAll(".mytxt").filter( function(di,index) { if (d.residueNum===json.nodes[index].residueNum) {

    	          atoms.push( d.residueNum );
    	         // atomcolors.push("0x5FDA99");

    				return true;
    			} })
    			.style("fill", "red")
    			.style("font-weight", "bold");

    			return true;
    		}
    		else{return false;}
      }
    })
    .style("fill", "red")
  	.style("fill-opacity", function(d) {
  			return 1;
  	});

    // Otherwise, set class to 'null'
    svg.selectAll(".cell circle").filter( function(d) {

      for(var i=0; i<selected.length; i++){

    		if(parseInt(selected[i]) == d.residueNum ){
    			return false;
    		}
    		else{return true;}
      }

    })
   // .attr("class", "notencode");
  	.style("fill", function(d) {
  			return "#C1BFBF";
  	})
  	.style("fill-opacity", function(d) {

  		return .1;

  	});

  addDownloadLink2("splom");

	drawTable(atoms);

}
