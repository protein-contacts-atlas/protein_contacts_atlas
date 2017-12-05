(function () {

  'use strict';
  var app = angular.module('pdb.chordPlot',[]);

  //pdb-demo-element Directive
  app.directive('pdbChordPlot', ['pdbChordPlot', function(pdbCordPlot){

    return{
      restrict: 'EAC',
      scope: {
        pdbId : '@',
        demo: '@'
      },
      template : '<div class="pcl-demo-wrapper">'+
                    '<div class="pcl-demo-overlay" ng-show="showLoader">Loading</div>'+
                    '<svg ng-hide="showLoader"></svg>'+
                 '</div>'+
                 '<div ng-show="errorMsg != \'\'">{{errorMsg}}</div>',
      link: function (scope, element, attrs) {

		//Flags to hide/show errors
		scope.showLoader = true;
		scope.errorMsg = '';

		//Validation
		if(typeof scope.pdbId === 'undefined' || scope.pdbId === '' || scope.pdbId.length !== 4){
		  scope.errorMsg = 'Invalid PDB ID!';
		  return;
		}

		//perform general processing on JSON data
		//used to tabulating contacts into matricies before drawing chord diagrams
		//also counts total number of contacts between secondary structural elements
		var getData = function (data, check_inter, present)
		{
				var targetGroup, sourceGroup;
				var matrix = new Array;
				var grouped = new Object();
				grouped.links = new Array;
				var targetResidue, sourceResidue, targetChain, sourceChain, groupsTargetChain, groupsSourceChain;

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

							targetResidue = data.nodes[data.links[i].target].residueNum;
							sourceResidue = data.nodes[data.links[i].source].residueNum;

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

							targetResidue = data.nodes[data.links[i].target].residueNum;
							sourceResidue = data.nodes[data.links[i].source].residueNum;

							targetChain = data.nodes[data.links[i].target].chain;
							sourceChain = data.nodes[data.links[i].source].chain;

							for (var j = 0; j < data.groups.length; j++)
							{
								groupsTargetChain = data.groups[j].name[0];

								// First, find each group the target of the interaction is in [it may be in more than one!]
								if ((targetResidue >= data.groups[j].start) && (targetResidue <= data.groups[j].end) && groupsTargetChain == targetChain)
								{
									targetGroup = j;

									// Then find each group the destination is in
									for (var k = 0; k < data.groups.length; k++)
									{
										groupsSourceChain = data.groups[k].name[0];

										if ((sourceResidue >= data.groups[k].start) && (sourceResidue <= data.groups[k].end) && groupsSourceChain == sourceChain)
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
					return matrix;
		}

		//function to draw a chord plot from d3
		var drawChord = function (json) {

			//colors are defined to fill the arc and chords of the plot.
			var fill = d3.scale.ordinal().domain(d3.range(16)).range(
				["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#e7ba52", "#31a354", "#74c476", "#a1d99b", "#756bb1", "#9467bd", "#9e9ac8", "#bcbddc", "#d62728", "#ff9896"]);
			var chain = json.groups[0].name[0];

			//ORIGINAL SIZE
      // var width = 450;
			// var r1 = width / 2,
			// 	r0 = r1 - 120; //r0=105

			var width = 350;
			var r1 = width / 2,
				r0 = r1 - 70; //r0=105

			var chord = d3.layout.chord()
				.padding(.04)
				.sortSubgroups(d3.descending)
				.sortChords(d3.descending);

			var arc = d3.svg.arc()
				.innerRadius(r0)
				.outerRadius(r0 + 20);



			var svg = d3.select(element[0]).select("svg")
				//.attr("id","mysvgID")
        // .style("margin-top", "-50px")
        // .style("margin-bottom", "-50px")
        //.attr("viewBox", "0 0 450 450") // original (before)
				.attr("viewBox", "0 0 350 350")
				.attr("preserveAspectRatio", "xMidYMid meet")
				.append("g")
				.attr("transform", "translate(" + r1 + "," + r1 + ")");

				//interaction data taken from the json file
				//getData function is defined below
			var matrixData = getData(json);

				//remove connections within domains
				for (var i = 0; i < matrixData.length; i++) {
					//THIS IF CASE ADDED FOR NUCLEIC ACID WITHIN CHAIN DISPLAY, IF ONE CHAIN SELECTED WHICH IS NA, then display by default within structure interaction
					if (json.groupsloops[i].name.indexOf('NucleicAcid') == -1) {
						matrixData[i][i] = 0;
					}
				}

			chord.matrix(matrixData);

			var g = svg.selectAll("g.group")
				.data(chord.groups)
				.enter().append("g")
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

						svg.selectAll("path.chord").style("opacity", 1.0);
						svg.selectAll("path.chord").filter(function(d) {
								return d.source.index != i && d.target.index != i;
							}).transition().style("opacity", 0.1);
				})
				.on("mouseout", function (d,i) {
				  svg.selectAll("path.chord").transition().style("opacity", 1);
				})
				.on("click", function(d, i) {

					svg.selectAll("path.chord").style("opacity", 1.0);
					svg.selectAll("path.chord").filter(function(d) {
							return d.source.index != i && d.target.index != i;
						}).transition().style("opacity", 0.1);
				})
				.append("title").text(function(d) {

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

					var strchain = chain + ":";
					str2 = str2.replace(strchain, "");

					return str2 + "(" + json.groups[d.index].start + "-" + json.groups[d.index].end + ")";
				});

			// add the labels for each arc
			g.append("text")
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

					var strchain = chain + ":";
					str2 = str2.replace(strchain, "");
					return str2;

				});

			// add the chords representing each edge
			svg.selectAll("path.chord")
				.data(chord.chords)
				.enter().append("path")
				.attr("class", "chord")
				.style("stroke", function(d) {
					return d3.rgb(fill(d.source.index)).darker();
				})
				.style("fill", function(d) {
					return fill(d.source.index);
				})
				.style("opacity", function(d) {
						return 1.0;
				})
				.style("cursor", "pointer")
				.attr("d", d3.svg.chord().radius(r0))
				.on("mouseover", function(d, i) {

						svg.selectAll("path.chord").filter(function(data) {
							return data.source.index != d.source.index || data.target.index != d.target.index;
						}).transition().style("opacity", 0.1);
						svg.selectAll("path.chord").filter(function(data) {
							return data.source.index == d.source.index && data.target.index == d.target.index;
						}).transition().style("opacity", 1);

				})
			.on("mouseout", function (d,i) {
				   svg.selectAll("path.chord").transition().style("opacity", 1);
			   })
			.append("title").text(function(d) {
				var source = d.source.index;
				var target = d.target.index;
				return matrixData[source][target] + " atomic contacts."
			});

		}

		//Demo data test to test directive without API data
        if(typeof scope.demo !== 'undefined' && scope.demo === 'true'){
			d3.json("3SN6_A.json", function(data) {
        		var json = data;
            //Emulated ajax call by using setTimeout
            setTimeout(function(){
              //console.log(json.name)
              drawChord(json);
              scope.showLoader = false;
              scope.showWrapper = true;
              scope.$apply();
            },500);
          });
		}else{

			//Call Service to fetch data for a given pdb-id
			  var apiData = pdbCordPlot.getApiData(scope.pdbId).then(function(data) {

				//ADDED BY MELIS
        var json = data;
        //Emulated ajax call by using setTimeout
        setTimeout(function(){
          //console.log(json.name)
          drawChord(json);
          scope.showLoader = false;
          scope.showWrapper = true;
          scope.$apply();
        },500);
			  }, function(error) {
				scope.showWrapper = false;
				// promise rejected, could log the error with: console.log('error', error);
				if(window.console){ console.log('API request failed. Error: '+ error) }
				scope.errorMsg = 'API request failed. Error: '+ error;
			  });

		}

	  }
	}
  }]);

  //Servive to fetch API data
  app.service('pdbChordPlot', ['$http', '$q', function($http, $q){

    this.getApiData = function(pdbId){

      var apiUrl = 'http://www.mrc-lmb.cam.ac.uk/rajini/api/'+pdbId;
  	  var deferred = $q.defer();

      $http.get(apiUrl)
      .then(function(response) {
        //console.log(response.data)
        deferred.resolve(response.data);
      }, function(response) {
          deferred.reject('fail response');
      });

      return deferred.promise;
    };

  }]);

  //Bootstrap the component on page load
  angular.element(document).ready(function () {
      angular.bootstrap(document, ['pdb.chordPlot']);
  });

})()
