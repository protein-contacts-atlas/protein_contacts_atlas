//////////////////////////////////TUTORIAL FUNCTIONS:

var tour = '';

// Assign the unload function to the browsers unload variable
//window.onbeforeunload = unloadPage;
var tourStarted = false;

function guide() {

  tourStarted = true;

  var view = new TabView($('#tabs_outer'));
  //var view_inner = new TabView($('#tabs_inner'));

  var steps = [{
    content: '<p>You can select interactions within or between chains by clicking here</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#show'),
    my: 'top center',
    at: 'bottom center',
    setup: function(t, opts) {

      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
      endDemoTour();
      $('#help').removeClass("disabled");
      }))
      }, 100);
    }
  }, {
    content: '<p>Enter PDB ID to be directed to the new structure.</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#pdbidiv'),
    my: 'top center',
    at: 'bottom center',
    setup: function(t, opts) {
      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");
        }))
      }, 100);
    }
  }, {
    content: '<p>Scroll right to see all the sequence with secondary structures and residues. You can click on a helix or sheet or a residue which will update the structure and the panels below with the selected residue.</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#pymols'),
    my: 'top center',
    at: 'bottom center',
    setup: function(t, opts) {
      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");
        }))
      }, 100);
    }
  }, {
    content: '<p>Click to create report including some important features of the website. It typically takes 30-40 seconds to generate the report.</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#showpdf'),
    my: 'top center',
    at: 'bottom center',
    setup: function(t, opts) {
      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");
        }))
      }, 100);
    }
  }, {
    // content: '<p>Click to swap panels</p>',
    //  		  highlightTarget: true,
    //  		  nextButton: true,
    //  		  target: $('#left'),
    //  		  my: 'bottom center',
    //  		  at: 'top center',
    //    		  setup: function(t, opts) {
    //    				setTimeout(function() {
    //    					$('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Skip").on("click", function() {
    //    						endDemoTour();
    //    					}))
    //    				}, 100);
    //    			}
    // 		},{
    content: '<p>Secondary structure level interactions</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#firstpanel'),
    my: 'bottom center',
    at: 'top center',
    setup: function(t, opts) {
      changetab();
      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");
        }))
      }, 100);
    }
  }, {
    content: '<p>Arcs show each secondary structure, chords between are the interactions between secondary structures. Clicking on a chord will display a matrix of interactions between residues belonging to the two secondary strcutures selected.</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('.block'),
    my: 'bottom center',
    at: 'top center',
    setup: function(t, opts) {

      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");

        }))
      }, 100);
    }
  }, {
    content: '<p>You can see the residue centric view in asteroid plot.</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#tab3'),
    my: 'bottom center',
    at: 'top center',
    setup: function(t, opts) {

      changetab3();
      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");
        }))
      }, 100);
    }
  }, {
    content: '<p>Inner ring indicates first shell of immediate atomic contacts.Outer ring indicates second shell of extended atomic contacts.Size of the circle is proportional to the total number of contacts the residue is involved in with any of the residues in the ring inward to it.</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#asteroidGraph'),
    my: 'bottom center',
    at: 'top center',
    setup: function(t, opts) {

      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");
        }))
      }, 100);
    }
  }, {
    content: '<p>The ligand/residue of interest can be selected by (i) entering the residue number/name in a search box on top of the plot,(ii) clicking an individual residue in the sequence panel above, or (iii) clicking any of the nodes in the inner/outer circle of the plot. This will update the  asteroid plot with residue of interest in the center.</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#center'),
    my: 'bottom center',
    at: 'top center',
    setup: function(t, opts) {
      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");
        }))
      }, 100);
    }
  }, {
    content: '<p>The user can choose to color residues according to the SSE of which they are a part, revealing the importance of each SSE in contacting a ligand of interest; by default the selected central node is shown in blue and the contacting residues in grey.</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#colorviewligand'),
    my: 'bottom center',
    at: 'top center',
    setup: function(t, opts) {
      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");
        }))
      }, 100);
    }
  }, {
      content: '<p>Scatter Plot matrix can be seen here under the “Per Residue Statistics” panel. This panel consists of two sub-panels: one displaying the scatter plot matrix (default view) and the other presenting an interactive table of per-residue properties.</p>',
      highlightTarget: true,
      nextButton: true,
      target: $('#tab2'),
      my: 'bottom center',
      at: 'top center',
      setup: function(t, opts) {

        changetab2();
        setTimeout(function() {
          $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
            endDemoTour();
            $('#help').removeClass("disabled");
          }))
        }, 100);
      }
    }, {
    content: '<p>By default, every residue in the plots is represented as a circle. If an interface is selected in the protein complex network, only the residues that make contact at the interface are presented in the scatter plot; the residues belonging to the first chain are shown as circles and the ones from the second chain are shown as squares. scatter plot panel can cross talk with Ligands and Residues panel (when the ligand of interest is updated on this panel), the scatter plot is also updated and this individual ligand/residue is highlighted.</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#splom'),
    my: 'bottom center',
    at: 'top center',
    setup: function(t, opts) {

      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");
        }))
      }, 100);
    }
  }, {
    content: '<p>Users can enter the residue number of interest. This will highlight the residue in the plot and the table.</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#center_splom'),
    my: 'bottom center',
    at: 'top center',
    setup: function(t, opts) {
      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");
        }))
      }, 100);
    }
  // }, {
  //   content: '<p>All residues of a chain(s) can be displayed by clicking the “Deselect and reset table to default” icon.</p>',
  //   highlightTarget: true,
  //   nextButton: true,
  //   target: $('#resetall'),
  //   my: 'bottom center',
  //   at: 'top center',
  //   setup: function(t, opts) {
  //     setTimeout(function() {
  //       $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
  //         endDemoTour();
  //         $('#help').removeClass("disabled");
  //       }))
  //     }, 100);
  //   }
  }, {
    content: '<p>The user can choose to color residues according to the SSE of which they are a part.</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#colorview'),
    my: 'bottom center',
    at: 'top center',
    setup: function(t, opts) {
      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");
        }))
      }, 100);
    }
  }, {
    content: '<p>Users can upload their external data via this “Advanced Option” to be included as a color coding map in the scatter plot matrix (default colors from cyan to magenta).</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#tab3s'),
    my: 'bottom center',
    at: 'top center',
    setup: function(t, opts) {
      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");
        }))
      }, 100);
    }
  }, {
    content: '<p>"Statistics Table" tab shows the statistics in a table which can be downloaded as excell or PDF format. If no residues have been selected from the scatter plot matrix panel, all residues from a chain(s) are displayed in the table. However, if a subset of residues has been selected using the scatter plot, then only those residues are shown.</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#tab2s'),
    my: 'bottom center',
    at: 'top center',
    setup: function(t, opts) {
      changetabsplom('fragment-2s');
      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");
        }))
      }, 100);
    }
  }, {
    content: '<p>You can view the structure of the selected chain with secondary structures and residues selected being highlighted.</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#glmol01'),
    my: 'bottom center',
    at: 'top center',
    setup: function(t, opts) {
      setTimeout(function() {
        $('.tour-buttons').append($("<button></button>").addClass("btn").addClass("btn-default").addClass("btn-small").addClass("pull-right").addClass("tour-skip").text("Finish").on("click", function() {
          endDemoTour();
          $('#help').removeClass("disabled");
        }))
      }, 100);
    }

  }, {
    content: '<p>You can change the display mode of the structure. There are 4 options. First one does not show residues selected. Second highlights the residues as spheres, third as sticks. Finally, last option allows the user to display the structure as network of interactions.</p>',
    highlightTarget: true,
    nextButton: true,
    target: $('#displayMode'),
    my: 'bottom center',
    at: 'top center',
    setup: function(t, opts) {
      $('#help').removeClass("disabled");
    }
  }]

  tour = new Tourist.Tour({
    steps: steps,
    tipClass: 'Bootstrap',
    tipOptions: {
      showEffect: 'slidein'
    },
    stepOptions: {
      // pass in the view so the tour steps can use it
      view: view
    }
  });
  tour.start();
}
function TabView(el) {
  var self = this;
  var tabs = el.find('li');

  tabs.click(function(e) {
    if (!el.hasClass('disabled'))
      self.select($(e.target))
  });

  this.disable = function() {
    el.addClass('disabled');
  }
  this.enable = function() {
    el.removeClass('disabled');
  }
  this.reset = function() {
    el.removeClass('has-selection');
    el.find('li').removeClass('selected');
  }
  this.select = function(tab) {
    tabs.removeClass('selected')
    tab.addClass('selected')
    el.addClass('has-selection')
    this.trigger('select', this, tab);
  }
  this.getSelected = function() {
    return el.find('.selected');
  }
}
_.extend(TabView.prototype, Backbone.Events)

function endDemoTour() {
  tour.stop();
  tourStarted = false;

  // var mysteps = [{
  // 			content: "<p>Use this button here to restart the quick tutorial</p>",
  // 			highlightTarget: false,
  // 			nextButton: true,
  // 			target: $('#help'),
  // 			my: 'bottom center',
  // 			at: 'top center',
  // 		}];
  //
  // 		var endTour = new Tourist.Tour({
  // 			steps: mysteps,
  // 			tipClass: 'Bootstrap',
  // 			tipOptions:{ showEffect: 'slidein' },
  // 		});
  // 		endTour.start();
}
