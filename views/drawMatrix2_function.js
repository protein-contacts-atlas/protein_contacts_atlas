function drawMatrix2 () {
	
	var json2;
	
	alert("../structures/annen" +  viewOptions.pdb + ".NCI.json");
	
    d3.json("../structures/" +  viewOptions.pdb + ".NCI.json", function(data) {
		
	    json2=data;
		
	    viewOptions.displayMode=document.getElementById('displayMode').value;
	
	    var group1 = parseInt(viewOptions.group1);
	    var group2 = parseInt(viewOptions.group2);
		
		alert(group1 + "\t" + group2);

	    // TEST: Find the smallest rectangle that includes all of the interactions
	    // var groupOneStart = parseInt(json2.groups[group1].end), 
// 	        groupOneEnd = parseInt(json2.groups[group1].start), 
// 	        groupTwoStart = parseInt(json2.groups[group2].end), 
// 	        groupTwoEnd = parseInt(json2.groups[group2].start);
			
			
	    var groupOneStart = parseInt(json2.nodes[0].residueNum), 
	        groupOneEnd = parseInt(json2.nodes[json2.nodes.length-1].residueNum), 
	        groupTwoStart = parseInt(json2.nodes[0].residueNum), 
	        groupTwoEnd = parseInt(json2.nodes[json2.nodes.length-1].residueNum);
			
			
		// extend groups that have bene trimmed too much to draw prettily
	/*    for (var i = 0; i < 3; i++ ) {
	        if ((groupOneEnd - groupOneStart) >= 3) { break; }
	        if (groupOneEnd < json2.groups[group1].end) {groupOneEnd++; }
	        if (groupOneStart > json2.groups[group1].start) {groupOneStart--; }
	   }

	    for (var i = 0; i < 3; i++ ) {
	        if ((groupTwoEnd - groupTwoStart) >= 3) { break; }
	        if (groupTwoEnd < json2.groups[group2].end) {groupTwoEnd++; }
	        if (groupTwoStart > json2.groups[group2].start) {groupTwoStart--; }
	   }


	    if ((groupOneEnd - groupOneStart) < 2) {
	    }

	    if ((groupTwoEnd - groupTwoStart) < 2) {
	    }

	    groupOneStart = groupOneStart;
	    groupOneEnd = groupOneEnd;
	    groupTwoStart = groupTwoStart;
	    groupTwoEnd = groupTwoEnd;
		
	    var group2_length = groupTwoEnd-groupTwoStart;
	    var group1_length = groupOneEnd-groupOneStart;
		
		*/

	  
	    var group2_length = json2.nodes.length;
	    var group1_length = json2.nodes.length;

	    // check if we need to swap groups in order to avoid fucking up indexing in nodes[]
	    // (and hence one set of labels, and the highlighted residues)
	   // update the URL too, to avoid swapping highlighting colors for helicies
	   /* if (group1_length > group2_length) {
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

	        group2_length = groupTwoEnd-groupTwoStart;
	        group1_length = groupOneEnd-groupOneStart;
	    }*/

	 // Pick sizes so that everything fits on the screen
	 // and cells are square, with sides < 24px
	 if ( (window.innerWidth-120)/3 > window.innerHeight - 120 ) {
	        // constrained by width
	        var square = ((window.innerWidth-120) / 3) / group2_length;
	 } else {
	       // constrained by height
	       var square = (window.innerHeight - 120) / group1_length;
	 }
	 if (square > 24) { square = 24; }
	 var width = square * group2_length;
	 var height = square * group1_length;

		
     var svgStyle=".background {\
       fill: none;\
     }\
     \
     line {\
       stroke: #BDBDBD;\
     }\
     \
     text.active {\
       fill: red;\
       font-size: 14;\
       font-weight: bold;\
     }";


     d3.select("#matrix").select("svg").remove();

     var margin = {top: 80, right: 0, bottom: 10, left: 80};
   
 	//ORIGINAL AS JAMES DID IT
     var color = d3.scale.category20();
	

     var x = d3.scale.ordinal().rangeBands([0, width]),
     y = d3.scale.ordinal().rangeBands([0, height]),
     z = d3.scale.linear().domain([0, 4]).clamp(true),
     c = d3.scale.category10().domain(d3.range(10));
	 
	// alert("this is width "+width+"\tthis is height "+height+"\n");

     var svg = d3.select("#matrix").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     //.style("margin-left", -margin.left + "px")
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
     // Apply the CSS styling
     d3.select("#matrix").select("svg").append("style").attr("type", "text/css").text(svgStyle);

     var matrix = [];
     nodes = new Array();
     //n = nodes.length;


     // first, create two arrays of nodes
	 var c=0;
     for (var i =0; i < json2.nodes.length; i++) {
         var residueNum = json2.nodes[i].residueNum;
 
         if  (residueNum <= groupOneEnd && residueNum >= groupOneStart) {
             nodes[ (residueNum - groupOneStart) ] = json2.nodes[i];
 			 //nodes[c] = json2.nodes[i];
 			 //c++;
         } 
        
         // not an else if, as one residue may span two secodnary elements
         // eg. HELIX3 & HELIX4 share resi 9
         if (residueNum <= groupTwoEnd && residueNum >= groupTwoStart) {
             //nodes[ (groupTwoEnd - groupTwoStart) + (residueNum - groupTwoStart)  ] = json2.nodes[i];
			 nodes[ (json2.nodes.length-1) + (residueNum - groupTwoStart)  ] = json2.nodes[i];
 			 }
 
     }
 
 	 alert("group2_length "+group2_length);
 
     nodes.forEach(function(node, i) {
         node.index = i;
         node.count = 0;
     });
     var n =nodes.length;
   
     //for (var i=0; i <=  (groupOneEnd-groupOneStart); i++) {
   	 for (var i=0; i <=  json2.nodes.length-1; i++) {
         //matrix[i] = d3.range(group2_length+1).map(function(j) { return {x: j, y: i, z: 0}; }); // DEBUG +1
   		 matrix[i] = d3.range(json2.nodes.length).map(function(j) { return {x: j, y: i, z: 0}; }); // DEBUG +1
     }
   
   	 //alert("matrix[0] is " + matrix[0].x);
     // then fill in the matrix[index within group1][index within group 2].z = number of edges between this pair of residues
     count=0;
     for (var i=0; i < json2.links.length; i++) {
 		 
 		 for (var y= 0; y < json2.nodes.length; y++) {
 			
 			if(json2.links[i].source == json2.nodes[y].residueNum){
 			
 				 sourceResidue = parseInt(json2.nodes[y].residueNum);
 			
 			}
 			
 			else if(json2.links[i].target == json2.nodes[y].residueNum){
 			
 				 targetResidue = parseInt(json2.nodes[y].residueNum);
 			
 			}
 			
 		  }	
 		
        // targetResidue = parseInt(json2.nodes[json2.links[i].target].residueNum);
        // sourceResidue = parseInt(json2.nodes[json2.links[i].source].residueNum);
 
         // target in group 1, source in group2
         if ( (  (targetResidue <= groupOneEnd && targetResidue >= groupOneStart) 
         && (sourceResidue <= groupTwoEnd && sourceResidue >= groupTwoStart) ) ) {
 
             if (! matrix[targetResidue - groupOneStart]) { matrix[targetResidue - groupOneStart] = new Array(); }
             matrix[targetResidue - groupOneStart][sourceResidue - groupTwoStart].z = json2.links[i].value;
         }
 
         // source in group1, target in group2
         if ( (  (sourceResidue <= groupOneEnd && sourceResidue >= groupOneStart) 
         && (targetResidue <= groupTwoEnd && targetResidue >= groupTwoStart) ) ) {
             if (! matrix[sourceResidue - groupOneStart]) { matrix[sourceResidue - groupOneStart] = new Array(); }
             matrix[sourceResidue - groupOneStart][targetResidue - groupTwoStart].z = json2.links[i].value;
 
         }
    }

	 alert(groupTwoStart + "\t" + groupTwoEnd + "\t" + groupOneStart + "\t" + groupOneEnd + "\n");
	 //16 20 3 6

    // x.domain(d3.range( (groupTwoEnd - groupTwoStart) +1 ));
    // y.domain(d3.range( (groupOneEnd - groupOneStart) +1 ));
	 
     x.domain(d3.range( json2.nodes.length +1 ));
     y.domain(d3.range( json2.nodes.length +1 ));

     // svg.append("rect")
 //     .attr("class", "background")
 //     .attr("width", width)
 //     .attr("height", height);
 // 	 
 // 	 
 //     // Transpose the matrix (data to which rows and columns should be bound to transposes of each other)
 //      var matrixT = new Array();
 //      for (var i = 0; i < matrix.length; i++) {
 //          for (var j = 0; j < matrix[i].length; j++) {
 //              if (!matrixT[j]) { matrixT[j] = new Array(); }
 //              matrixT[j][i] = matrix[i][j];
 //          }
 //      }
 // 
 //    
 //      var row = svg.selectAll(".row")
 //      .data( matrix )
 //      .enter().append("g")
 //      .attr("class", "row")
 //      .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; })
 //  	.each(row);
 // 	
 //      // Add a line below each row
 //      row.append("line")
 //         .attr("x2", width);
 // 
 //      // Add an extra line, below the bottom row 
 //      row.filter(function(d,i) { return i == row[0].length - 1  ; })
 //          .append("line" )
 //          .attr("x2", width)
 //          .attr("y1", y.rangeBand()-1)
 //          .attr("y2", y.rangeBand()-1)
 // 
 //  		//THE NEW WAY OF ADDING THE ROW NAMES TO MAKE THEM STATIC WHILE THE MATRIX CAN BE SCROLLED
 //      d3.select("#rowtext").select("svg").remove();
 //      var svgtext45 = d3.select("#rowtext").append("svg")
 //      .attr("width", 50)
 //      .attr("height", height+100)
 //      .append("g");
 //    
 //      // Apply the CSS styling
 //      d3.select("#rowtext").select("svg").append("style").attr("type", "text/css").text(svgStyle);
 // 	
 //      var row45 = svgtext45.selectAll(".row45")
 //      .data( matrix )
 //      .enter().append("g")
 //  	.attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });
 //    
 //  	row45.append("text")
 //      .attr("x", 40)
 //      .attr("y", 80+y.rangeBand()/2)
 //  	.attr("dy", ".32em")
 //  	.attr("text-anchor", "end")
 //         .attr("fill", fill(viewOptions.group1))
 //         .text(function(d, i) {  return nodes[i].name;   })
 //         .attr("class", "row_title")
 //         .style("cursor", "pointer")
 //         .attr("onclick", function(d, i) {
 //             if (viewOptions.groups) {
 //                  return 'window.location=' + '"' + './asteroid.html?center=' + nodes[i].name + '&pdb=' + viewOptions.pdb + '&groups=' + viewOptions.groups + ' "';
 //             } else {
 //                  return 'window.location=' + '"' + './asteroid.html?center=' + nodes[i].name + '&pdb=' + viewOptions.pdb + ' "';
 //             }
 //         });
 // 	
 //      var column = svg.selectAll(".column")
 //      .data( matrixT )
 //      .enter().append("g")
 //      .attr("class", "column")
 //      .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });
 // 	
 // 
 //      // Add a line to the left of each column
 //      column.append("line")
 //          .attr("x1", -height);
 // 
 //      // Add an extra line, to the right of the rightmost column 
 //      column.filter(function(d,i) { return i == column[0].length - 1  ; })
 //          .append("line" )
 //          .attr("x1", -height)
 //          .attr("y1", x.rangeBand()-1)
 //          .attr("y2", x.rangeBand()-1)
 // 
 // 
 // 
 //      column.append("text")
 //      .attr("x", 6)
 //      .attr("y", x.rangeBand() / 2)
 //      .attr("dy", ".32em")
 //      .attr("text-anchor", "start")
 //      .attr("fill", fill(viewOptions.group2))
 //      .style("cursor", "pointer")
 //      .text(function(d, i) { return nodes[i + (group2_length) ].name; })
 //      .attr("onclick", function(d, i) {
 //          if (viewOptions.groups) {
 //               return 'window.location=' + '"' + './asteroid.html?center=' + nodes[i + (group2_length)].name + '&pdb=' + viewOptions.pdb + '&groups=' + viewOptions.groups + ' "';
 //          } else {
 //               return 'window.location=' + '"' + './asteroid.html?center=' + nodes[i + (group2_length)].name + '&pdb=' + viewOptions.pdb + ' "';
 //          }
 //      });
 // 	 
 //  	//ADD NAMES ON MATRIX CONTENT MIDDLE COLUMN
 // 
 //      d3.select("#contenttext").select("svg").remove();
 //      var svgtext = d3.select("#contenttext").append("svg")
 //      .attr("width", 400)
 //      .attr("height", 30)
 //      .append("g");
 //    
 //      // Apply the CSS styling
 //      d3.select("#contenttext").select("svg").append("style").attr("type", "text/css").text(svgStyle);
 // 
 //  	svgtext.append("text")
 //  	.attr("x", 135)
 //  	.attr("y", 20)
 //  	.attr("dy", ".32em")
 //  	.attr("text-anchor", "end")
 //  	.text(json2.name + ">")
 //  	.style("font-weight", "bold")
 //  	.attr("fill", "black");
 // 
 //  	svgtext.append("text")
 //  	.attr("x", 200)
 //  	.attr("y", 20)
 //  	.attr("dy", ".32em")
 //  	.attr("text-anchor", "end")
 //  	.text(json2.groups[group1].name)
 //  	.style("font-weight", "bold")
 //  	.attr("fill", fill(viewOptions.group1));
 // 	
 //  	svgtext.append("text")
 //  	.attr("x", 275)
 //  	.attr("y", 20)
 //  	.attr("dy", ".32em")
 //  	.attr("text-anchor", "end")
 //  	.text(" - " + json2.groups[group2].name )
 //  	.style("font-weight", "bold")
 //  	.attr("fill", fill(viewOptions.group2));
 // 	
 //  	//////////////////PROTEIN PROTEIN PROTEIN
 // 	
 //  	//ADD NAMES ON PROTEIN VIEW CONTENT LAST COLUMN
 // 
 //      d3.select("#contenttext2").select("svg").remove();
 //      var svgtext2 = d3.select("#contenttext2").append("svg")
 //      .attr("width", 400)
 //      .attr("height", 30)
 //      .append("g");
 //      // Apply the CSS styling
 //      d3.select("#contenttext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);
 // 
 //  	svgtext2.append("text")
 //  	.attr("x", 135)
 //  	.attr("y", 20)
 //  	.attr("dy", ".32em")
 //  	.attr("text-anchor", "end")
 //  	.text(json2.name + ">")
 //  	.style("font-weight", "bold")
 //  	.attr("fill", "black");
 // 
 //  	svgtext2.append("text")
 //  	.attr("x", 200)
 //  	.attr("y", 20)
 //  	.attr("dy", ".32em")
 //  	.attr("text-anchor", "end")
 //  	.text(json2.groups[group1].name)
 //  	.style("font-weight", "bold")
 //  	.attr("fill", fill(viewOptions.group1));
 // 
 //  	svgtext2.append("text")
 //  	.attr("x", 275)
 //  	.attr("y", 20)
 //  	.attr("dy", ".32em")
 //  	.attr("text-anchor", "end")
 //  	.text(" - " + json2.groups[group2].name)
 //  	.style("font-weight", "bold")
 //  	.attr("fill", fill(viewOptions.group2));
 // 	
 //  	//////////////////////////////PROTEIN PROTEIN PROTEIN
 // 	
 // 	
 //  	//FOR PYMOL SCRIPT CREATION 
 // 	
 //      d3.select("#pymoltext").selectAll(".pymol-download").remove();
 // 
 //      var colortry1 = fill(viewOptions.group1);
 //  	var colortry2 = fill(viewOptions.group2);
 //  	var color1;
 //  	var color2;
 // 	
 //  	if(colortry1.indexOf('#') > -1){ color1 = colortry1.replace("#","0x");}
 //  	if(colortry2.indexOf('#') > -1){ color2 = colortry2.replace("#","0x");}
 // 	
 // 
 //  	var contactString = "load http://localhost:8888/RIG/structures/" +  viewOptions.pdb + ".pdb\n";
 //  	contactString += "hide everything\nshow cartoon\ncolor grey\n";
 //  	contactString += "select ss1, resi " + json2.groups[group1].start + "-" + json.groups[group1].end + "\n";
 //  	contactString += "select ss2, resi " + json2.groups[group2].start + "-" + json.groups[group2].end + "\n";
 // 	 
 //  	contactString += "color " +color1+ ", ss1\n";
 //  	contactString += "color " +color2+ ", ss2\n";
 //  	contactString += "set ray_opaque_background, off\n";
 //  	//contactString += "show sticks, resi " + nodes[p.y].residueNum + "+" + nodes[p.x + (group2_length) ].residueNum +"\n";
 //  	//contactString += "show spheres, resi " + nodes[p.y].residueNum + "+" + nodes[p.x + (group2_length) ].residueNum +"\n";
 //  	//contactString += "hide sticks\nhide residues\n";
 //  	//contactString += "zoom resi " + nodes[p.y].residueNum + "+" + nodes[p.x + (group2_length) ].residueNum +"\n";
 //  	//contactString += "ray 500, 500\n";
 // 	
 // 	
 //     var htmlstr='<a download="'+viewOptions.pdb + '_' + json2.groups[group1].name + '_' +  json2.groups[group2].name + '.pml"';
 //     	htmlstr+= 'href="data:application/octet-stream;base64,'+btoa(contactString) + '"><img src="../img/pymol_logo.jpg" width="30" height="30" title="Save as pymol file!"></a>';
 // 	
 //  	d3.select("#pymoltext").html(htmlstr);
 // 	
 //  		/////////////////////////////////////////
 // 	
 //      function row(row) {
 // 
 //          var cell = d3.select(this).selectAll(".cell")
 //          .data(row.filter(function(d) { return d.z; }))
 //          .enter().append("rect")
 //          .attr("class", "cell")
 //          .attr("id", function(d) {return "cell" + d.x + "-" + d.y; })
 //          .attr("x", function(d) { return x(d.x); })
 //          .attr("width", x.rangeBand())
 //          .attr("height", y.rangeBand())
 //          .style("fill", "gray")//ORIGINAL
 //  		//.style("fill", function(d) { return color(matrix[d.y][d.x].z)} )//DIFFERENT COLORS THEN BLACK AND WHITE
 //          .style("opacity", 1.0)
 //          .on("click", click)
 //          .on("mouseover", mouseover)
 //          .on("mouseout", mouseout)
 //          .append("title")
 //          .text(function(d) { 
 //              return matrix[d.y][d.x].z + " atomic contacts between " + nodes[d.y].name + " and " + nodes[d.x + (group2_length)].name;
 //          }); 
 // 
 //          // Label each cell with the number of contact it represents
 //          var thisRow = this;
 //          d3.select(this).selectAll(".cell").each( function(datum) {
 //              d3.select(thisRow)
 //              .append("text")
 //              .text(datum.z)
 //              .style("fill", "white")
 //              .attr("x", x(datum.x) + x.rangeBand()/2)
 //              .attr("y", + y.rangeBand()*0.6)
 //              .attr("text-anchor", "middle")
 //              .attr("onclick", "var event = document.createEvent('HTMLEvents'); event.initEvent('click',true,false);" + "document.getElementById('cell" + datum.x + "-" + datum.y + "').dispatchEvent(event);" ); });
 //      }
 // 
 //      function mouseover(p) {
 //          d3.select("#matrix").selectAll(".row_title").classed("active", function(d, i) { return i == p.y;  });
 //          d3.select("#matrix").selectAll(".column text").classed("active", function(d, i) { return i == p.x; });
 //      }
 // 
 //      function mouseout() {
 //          d3.selectAll("text").classed("active", false);
 //      }
 //      function click(p) {
 //          viewOptions.highlighted = [nodes[p.y].residueNum, nodes[p.x + (group2_length) ].residueNum];
 //          viewOptions.colors=[parseInt( fill(viewOptions.group1).substr(1), 16), parseInt( fill(viewOptions.group2).substr(1), 16)]
 //          updateURL(viewOptions);
 //                
 //                  d3.select("#matrix").selectAll(".cell").style("stroke", "");    
 //                  d3.select("#matrix").selectAll(".cell").filter( function(d, index) {if (p.x===d.x && p.y===d.y) {return true; } }).style("stroke", "red").style("stroke-width", "2px");
 //    
 //          reDrawProtein(viewOptions.highlighted, [parseInt( fill(viewOptions.group1).substr(1), 16), parseInt(fill(viewOptions.group2).substr(1), 16)]);
 // 		
 //  		//ADD NAMES ON PROTEIN VIEW CONTENT LAST COLUMN
 // 
 //  	    d3.select("#contenttext2").select("svg").remove();
 //  	    var svgtext2 = d3.select("#contenttext2").append("svg")
 //  	    .attr("width", 400)
 //  	    .attr("height", 30)
 //  	    .append("g");
 //  	    // Apply the CSS styling
 //  	    d3.select("#contenttext2").select("svg").append("style").attr("type", "text/css").text(svgStyle);
 // 
 //  		svgtext2.append("text")
 //  		.attr("x", 135)
 //  		.attr("y", 20)
 //  		.attr("dy", ".32em")
 //  		.attr("text-anchor", "end")
 //  		.text(json2.name + ">")
 //  		.style("font-weight", "bold")
 //  		.attr("fill", "black");
 // 
 //  		svgtext2.append("text")
 //  		.attr("x", 200)
 //  		.attr("y", 20)
 //  		.attr("dy", ".32em")
 //  		.attr("text-anchor", "end")
 //  		.text(json2.groups[group1].name)
 //  		.style("font-weight", "bold")
 //  		.attr("fill", fill(viewOptions.group1));
 // 	
 //  		svgtext2.append("text")
 //  		.attr("x", 285)
 //  		.attr("y", 20)
 //  		.attr("dy", ".32em")
 //  		.attr("text-anchor", "end")
 //  		.text(" - " + json2.groups[group2].name + ">")
 //  		.style("font-weight", "bold")
 //  		.attr("fill", fill(viewOptions.group2));
 // 		
 //  		svgtext2.append("text")
 //  		.attr("x", 325)
 //  		.attr("y", 20)
 //  		.attr("dy", ".32em")
 //  		.attr("text-anchor", "end")
 //  		.text(nodes[p.y].name)
 //  		.style("font-weight", "bold")
 //  		.attr("fill", fill(viewOptions.group1));
 // 	
 //  		svgtext2.append("text")
 //  		.attr("x", 375)
 //  		.attr("y", 20)
 //  		.attr("dy", ".32em")
 //  		.attr("text-anchor", "end")
 //  		.text(" - " + nodes[p.x + (group2_length) ].name)
 //  		.style("font-weight", "bold")
 //  		.attr("fill", fill(viewOptions.group2));
 // 	
 //  		//////////////////
 //  		//FOR PYMOL SCRIPT CREATION 
 //  		viewOptions.displayMode=document.getElementById('displayMode').value;
 // 	
 //  		// window.alert(viewOptions.displayMode);
 // 		
 //  	    d3.select("#pymoltext").selectAll(".pymol-download").remove();
 // 	 
 //          var colortry1 = fill(viewOptions.group1);
 //  		var colortry2 = fill(viewOptions.group2);
 //  		var color1;
 //  		var color2;
 // 		
 //  		if(colortry1.indexOf('#') > -1){ color1 = colortry1.replace("#","0x");}
 //  		if(colortry2.indexOf('#') > -1){ color2 = colortry2.replace("#","0x");}
 // 		
 // 
 //   		var contactString = "load http://localhost:8888/RIG/structures/" +  viewOptions.pdb + ".pdb\n";
 //  		contactString += "hide everything\nshow cartoon\ncolor grey\n";
 //  		contactString += "select ss1, resi " + json2.groups[group1].start + "-" + json2.groups[group1].end + "\n";
 //  		contactString += "select ss2, resi " + json2.groups[group2].start + "-" + json2.groups[group2].end + "\n";
 // 		 
 //  		contactString += "color " +color1+ ", ss1\n";
 //  		contactString += "color " +color2+ ", ss2\n";
 // 		
 //  		if(viewOptions.displayMode == "pair"){
 //  			contactString += "show sticks, resi " + nodes[p.y].residueNum + "+" + nodes[p.x + (group2_length) ].residueNum +"\n";
 //  			contactString += "show spheres, resi " + nodes[p.y].residueNum + "+" + nodes[p.x + (group2_length) ].residueNum +"\n";
 //  			contactString += "hide sticks\n";
 //  		}
 // 		
 //  		else if(viewOptions.displayMode == "pairSticks"){ 
 //  			contactString += "hide spheres\n";
 //  			contactString += "show sticks, resi " + nodes[p.y].residueNum + "+" + nodes[p.x + (group2_length) ].residueNum +"\n";
 // 		
 //  		}
 // 		
 // 		
 // 		
 //  		contactString += "set ray_opaque_background, off\n";
 // 		
 //  		//contactString += "zoom resi " + nodes[p.y].residueNum + "+" + nodes[p.x + (group2_length) ].residueNum +"\n";
 //  		//contactString += "ray 500, 500\n";
 // 		
 //  	   var htmlstr='<a download="'+viewOptions.pdb + '_' + json2.groups[group1].name + '_' +  json2.groups[group2].name + '_' + nodes[p.y].name + '_' + nodes[p.x + (group2_length) ].name + '.pml"';
 //  	   	htmlstr+= 'href="data:application/octet-stream;base64,'+btoa(contactString) + '"><img src="../img/pymol_logo.jpg" width="30" height="30"></a>';
 // 		
 //  		d3.select("#pymoltext").html(htmlstr);
 // 		
 //      }

	alert(json2.links.length);
	

        
    });

}