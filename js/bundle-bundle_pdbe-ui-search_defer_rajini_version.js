
var DocumentFormatter = (function() {
    return {
        months: {
            "01": "Jan",
            "02": "Feb",
            "03": "Mar",
            "04": "Apr",
            "05": "May",
            "06": "Jun",
            "07": "Jul",
            "08": "Aug",
            "09": "Sep",
            "10": "Oct",
            "11": "Nov",
            "12": "Dec"
        },
        status: {
            REL: "Released",
            WDRN: "entry is withdrawn",
            OBS: "obsolete entry",
            PROC: "entry being processed",
            HPUB: "entry withheld until publication",
            POLC: "entry awaiting a wwPDB policy decision",
            AUTH: "entry awaiting author approval",
            REFI: "entry is re-refinement",
            HOLD: "entry is currently witheld",
            WAIT: "entry is awaiting first processing",
            REPL: "entry replaces another",
            AUCO: "entry awaiting author correspondence"
        },
        init: function(a) {
            this.doc = a.doc;
            this.mandatory = a.mandatory;
            this._fmt = {};
            this._set_mandatory();
            this._format_records();
            return this
        },
        _set_mandatory: function() {
            for (var a in this.mandatory) {
                this._fmt[this.mandatory[a].key] = this.mandatory[a].default_value
            }
        },
        _format_records: function() {
            for (var b in this.doc) {
                if (this.doc.hasOwnProperty(b)) {
                    var c = this.doc[b];
                    if (this.hasOwnProperty(b + "_formatter")) {
                        this._fmt[b] = this[b + "_formatter"]()
                    } else {
                        this._fmt[b] = c
                    }
                }
            }
            for (var a in this.meta_keys) {
                if (this.hasOwnProperty(a + "_formatter")) {
                    this._fmt[a] = this[a + "_formatter"]()
                }
            }
        },
        _get_status_message: function(a, b) {
            return "Status: " + this.status[this.doc.status]
        },
        organism_scientific_name_formatter: function() {
            var b, a = [],
                c = [];
            for (b = 0; b < this.doc.tax_id.length; b++) {
                if (c.indexOf(this.doc.tax_id[b]) == -1) {
                    a.push('<span style="white-space: nowrap;"><a class="ext-1" href="http://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=' + this.doc.tax_id[b] + '"><i>' + this.doc.organism_scientific_name[b] + "</i></a> [" + this.doc.tax_id[b] + "]</span>");
                    c.push(this.doc.tax_id[b])
                }
            }
            return a.join(", ")
        },
        release_date_formatter: function() {
            var b = "";
            if (this.doc.release_date) {
                var a = this.doc.release_date.substring(0, 10),
                    c = a.split("-");
                b = '<span class="data-label grid_">Released:</span> <span class="released-date grid_">' + ('<time property="date-release" datetime="' + a + '">' + c[2] + " " + this.months[c[1]] + " " + c[0] + "</time>") + "</span>"
            }
            return b
        },
        pdb_id_formatter: function() {
			//CHANGED BY MELIS : THE LINK IS CHANGED TO RAJINI CHAINS PHP
            return ('<h4 style="border-bottom:none;"><a href="chains_process_combined.php?PDB=' + this.doc.pdb_id + '" property="entry_id">' + this.doc.pdb_id + "</a></h4>")
        },
        status_formatter: function() {
            var a = "";
            if (this.doc.status !== "REL") {
                a = ('<h3 property="status" class="warning grid_19" style="clear: none;">' + this._get_status_message() + "</h3>")
            }
            return a
        },
        experimental_method_formatter: function() {
            return (this.doc.experimental_method.join(", "))
        },
        resolution_formatter: function() {
            return (this.doc.resolution + "&Aring; resolution")
        },
        title_formatter: function() {
            return this.doc.title.replace(/'/g, "&#39;")
        },
        pdbe_title_meta_formatter: function() {
            var b = this.doc.status === "REL" ? "20" : "24 alpha omega";
            if (this.doc.title) {
                var a = (this.doc.title).replace(/'/g, "&#39;");
				
				//CHANGED BY MELIS FROM H3 TO H4 FOR THE TITLE TO BE SMALLER
               // return '<h4 class="grid_' + b + ' reset_100" style="clear:none;padding-left: 0;padding-right: 0;">' + a + "</h4>"
				return '<h4 class="grid_' + b + ' reset_100" style="clear:none;padding-left: 0;padding-right: 0;"><a style="color:black;" href="chains_process_combined.php?PDB=' + this.doc.pdb_id + '">' + a + "</a></h4>"
            } else {
                return '<h4 class="grid_' + b + ' reset_100" style="clear:none;padding-left: 0;padding-right: 0;">Title unavailable</h4>'
            }
        },
        compound_url_meta_formatter: function(c) {
            var b = c.split(" : "),
                a = '<span class="grid_ data-tooltip" style="margin: 0 5px;" title="' + b[1] + "&lt;br&gt;&lt;img src=&#34;http://www.ebi.ac.uk/pdbe-srv/pdbechem/image/showNew?code=" + b[0] + '&size=300&#34;&gt;"><a href="http://wwwdev.ebi.ac.uk/pdbe/entry/pdb/' + this.doc.pdb_id + "/bound/" + b[0] + '"target="_blank">' + c + "</a></span>";
            return a
        },
        pfam_url_meta_formatter: function(b) {
            var a = this.doc.pfam_accession[this.doc.pfam_name.indexOf(b)];
            return '<a href="../pdb/' + this.doc.pdb_id + "/biology#" + a + '">' + b + "</a>"
        },
        uniprot_accession_formatter: function() {
            if (this.doc.uniprot_accession) {
                var a = '<span class="grid_24" style=""><strong>UniProt:</strong> ' + this.doc.uniprot_accession.join(", ") + "</span>";
                return a
            } else {
                return ""
            }
        },
        gene_name_formatter: function() {
            if (this.doc.gene_name) {
                var a = '<span class="grid_24" style=""><strong>Gene:</strong> ' + this.doc.gene_name.join(", ") + "</span>";
                return a
            } else {
                return ""
            }
        },
        entry_validation_image_meta_formatter: function() {
            var a = "";
            if (this.doc.status === "REL" && this.doc.experimental_method.indexOf("X-ray diffraction") >= 0) {
                a = '<div class="validation_summary_widget reset_100" style="margin: 4px 0 12px 0;"><div data-validation="{\'pdb_id\':\'' + this.doc.pdb_id + "'}\"></div></div>"
            }
            return a
        },
        // entry_image_meta_formatter: function() {
 //            var a = (this.doc.status !== "REL") ? "" : '<div class="pdbe-intro-image-wrapper reset_66" property="structure-images" style="margin-bottom: 9px;"><div class="image-left"><div class="image-x" property="image" vocab="http://schema.org/" typeof="ImageObject"><meta property="representativeOfPage" content="1"><a property="url" style="border: none;" href="/pdbe/entry/pdb/' + this.doc.pdb_id + '/portfolio/?view=entry_index#ad-image-0" data-jkit="[lightbox:closer=Close;width=60%;height=90%;]"><img class="image-tooltip" property="contentURL" src="http://wwwdev.ebi.ac.uk/pdbe/static/entry/' + this.doc.pdb_id + "_assembly_" + this.doc.prefered_assembly_id + '_chemically_distinct_molecules_front_image-200x200.png" alt="' + this.doc.pdb_id + '"></a></div></div><div class="image-right"><div class="image-y" property="image" vocab="http://schema.org/" typeof="ImageObject"><meta property="representativeOfPage" content="1"><a property="url" style="border: none;" href="/pdbe/entry/pdb/' + this.doc.pdb_id + '/portfolio/?view=entry_index#ad-image-1" data-jkit="[lightbox:closer=Close;width=60%;height=90%;]"><img class="image-tooltip" property="contentURL" src="http://wwwdev.ebi.ac.uk/pdbe/static/entry/' + this.doc.pdb_id + "_assembly_" + this.doc.prefered_assembly_id + '_chemically_distinct_molecules_side_image-200x200.png" alt="' + this.doc.pdb_id + '"></a></div><div class="image-z" property="image" vocab="http://schema.org/" typeof="ImageObject"><meta property="representativeOfPage" content="1"><a property="url" style="border: none;" href="/pdbe/entry/pdb/' + this.doc.pdb_id + '/portfolio/?view=entry_index#ad-image-2" data-jkit="[lightbox:closer=Close;width=60%;height=90%;]"><img class="image-tooltip" property="contentURL" src="http://wwwdev.ebi.ac.uk/pdbe/static/entry/' + this.doc.pdb_id + "_assembly_" + this.doc.prefered_assembly_id + '_chemically_distinct_molecules_top_image-200x200.png" alt="' + this.doc.pdb_id + '"></a></div></div></div>';
 //            return a
 //        },
 //        entity_image_meta_formatter: function(b) {
 //            var e, a, d, c = [];
 //            if (b && this.doc.interacting_molecules) {
 //                d = this.doc.interacting_molecules.indexOf(b);
 //                a = d >= 0 ? this.doc.interacting_entity_id[d] : this.doc.entity_id
 //            } else {
 //                a = this.doc.entity_id
 //            }
 //            e = this.doc.status !== "REL" ? "" : '<div class="pdbe-intro-image-wrapper reset_66" property="structure-images" style="margin-bottom: 9px;"><div class="image-left"><div class="image-x" property="image" vocab="http://schema.org/" typeof="ImageObject"><meta property="representativeOfPage" content="1"><a property="url" style="border: none;" href="/pdbe/entry/pdb/' + this.doc.pdb_id + "/portfolio/" + a + '/?view=protein_index#ad-image-0" data-jkit="[lightbox:closer=Close;width=60%;height=90%;]"><img class="image-tooltip" property="contentURL" src="http://wwwdev.ebi.ac.uk/pdbe/static/entry/' + this.doc.pdb_id + "_entity_" + a + '_front_image-200x200.png" alt="' + this.doc.pdb_id + '"></a></div></div><div class="image-right"><div class="image-y" property="image" vocab="http://schema.org/" typeof="ImageObject"><meta property="representativeOfPage" content="1"><a property="url" style="border: none;" href="/pdbe/entry/pdb/' + this.doc.pdb_id + "/portfolio/" + a + '/?view=protein_index#ad-image-1" data-jkit="[lightbox:closer=Close;width=60%;height=90%;]"><img class="image-tooltip" property="contentURL" src="http://wwwdev.ebi.ac.uk/pdbe/static/entry/' + this.doc.pdb_id + "_entity_" + a + '_side_image-200x200.png" alt="' + this.doc.pdb_id + '"></a></div><div class="image-z" property="image" vocab="http://schema.org/" typeof="ImageObject"><meta property="representativeOfPage" content="1"><a property="url" style="border: none;" href="/pdbe/entry/pdb/' + this.doc.pdb_id + "/portfolio/" + a + '/?view=protein_index#ad-image-2" data-jkit="[lightbox:closer=Close;width=60%;height=90%;]"><img class="image-tooltip" property="contentURL" src="http://wwwdev.ebi.ac.uk/pdbe/static/entry/' + this.doc.pdb_id + "_entity_" + a + '_top_image-200x200.png" alt="' + this.doc.pdb_id + '"></a></div></div></div>';
 //            return e
 //        },
 //        pfam_image_meta_formatter: function(f) {
 //            var e, a = this.doc.entity_id,
 //                d = this.doc.struct_asym_id[0],
 //                b = [],
 //                c = this.doc.pfam_accession[this.doc.pfam_name.indexOf(f)];
 //            e = this.doc.status !== "REL" ? "" : '<div class="pdbe-intro-image-wrapper reset_66" property="structure-images" style="margin-bottom: 9px;"><div class="image-left"><div class="image-x" property="image" vocab="http://schema.org/" typeof="ImageObject"><meta property="representativeOfPage" content="1"><a property="url" style="border: none;" href="/pdbe/entry/pdb/' + this.doc.pdb_id + "/portfolio/" + a + "/?view=protein_index#ad-image-" + (3 + this.doc.pfam_name.indexOf(f)) + '" data-jkit="[lightbox:closer=Close;width=60%;height=90%;]"><img class="image-tooltip" property="contentURL" src="/pdbe/entry/pdb/' + this.doc.pdb_id + "/pfamimage?pfam_id=" + c + "&entity_id=" + a + '&size=200" alt="' + this.doc.pdb_id + '"></a></div></div><div class="image-right"><div class="image-y" property="image" vocab="http://schema.org/" typeof="ImageObject"><meta property="representativeOfPage" content="1"><a property="url" style="border: none;" href="/pdbe/entry/pdb/' + this.doc.pdb_id + "/portfolio/" + a + '/?view=protein_index#ad-image-0" data-jkit="[lightbox:closer=Close;width=60%;height=90%;]"><img class="image-tooltip" property="contentURL" src="http://wwwdev.ebi.ac.uk/pdbe/static/entry/' + this.doc.pdb_id + "_entity_" + a + '_front_image-200x200.png" alt="' + this.doc.pdb_id + '"></a></div><div class="image-z" property="image" vocab="http://schema.org/" typeof="ImageObject"><meta property="representativeOfPage" content="1"><a property="url" style="border: none;" href="/pdbe/entry/pdb/' + this.doc.pdb_id + "/portfolio/" + a + '/?view=protein_index#ad-image-1" data-jkit="[lightbox:closer=Close;width=60%;height=90%;]"><img class="image-tooltip" property="contentURL" src="http://wwwdev.ebi.ac.uk/pdbe/static/entry/' + this.doc.pdb_id + "_entity_" + a + '_side_image-200x200.png" alt="' + this.doc.pdb_id + '"></a></div></div></div>';
 //            return e
 //        },
 //        compound_image_meta_formatter: function(b) {
 //            var e, a, d, c = [],
 //                f = b.split(" : ")[0];
 //            if (b && this.doc.interacting_molecules) {
 //                d = this.doc.interacting_molecules.indexOf(b);
 //                a = d >= 0 ? this.doc.interacting_entity_id[d] : this.doc.entity_id
 //            } else {
 //                a = this.doc.entity_id
 //            }
 //            e = this.doc.status !== "REL" ? "" : '<div class="pdbe-intro-image-wrapper reset_66" property="structure-images" style="margin-bottom: 9px;"><div class="image-left"><div class="image-x" property="image" vocab="http://schema.org/" typeof="ImageObject"><meta property="representativeOfPage" content="1"><a property="url" style="border: none;" href="/pdbe/entry/pdb/' + this.doc.pdb_id + "/portfolio/" + f + '/?view=ligand_index#ad-image-0" data-jkit="[lightbox:closer=Close;width=60%;height=90%;]"><img class="image-tooltip" property="contentURL" src="/pdbe/entry/pdb/' + this.doc.pdb_id + "/compoundimage?het=" + f + '&orient=front&size=200" alt="' + this.doc.pdb_id + '"></a></div></div><div class="image-right"><div class="image-y" property="image" vocab="http://schema.org/" typeof="ImageObject"><meta property="representativeOfPage" content="1"><a property="url" style="border: none;" href="/pdbe/entry/pdb/' + this.doc.pdb_id + "/portfolio/" + f + '/?view=ligand_index#ad-image-1" data-jkit="[lightbox:closer=Close;width=60%;height=90%;]"><img class="image-tooltip" property="contentURL"src="/pdbe/entry/pdb/' + this.doc.pdb_id + "/compoundimage?het=" + f + '&orient=side&size=200" alt="' + this.doc.pdb_id + '"></a></div><div class="image-z" property="image" vocab="http://schema.org/" typeof="ImageObject"><meta property="representativeOfPage" content="1"><a property="url" style="border: none;" href="/pdbe/entry/pdb/' + this.doc.pdb_id + "/portfolio/" + f + '/?view=ligand_index#ad-image-2" data-jkit="[lightbox:closer=Close;width=60%;height=90%;]"><img class="image-tooltip" property="contentURL" src="/pdbe/entry/pdb/' + this.doc.pdb_id + "/compoundimage?het=" + f + '&orient=top&size=200" alt="' + this.doc.pdb_id + '"></a></div></div></div>';
 //            return e
 //        },
        pdbe_author_meta_formatter: function() {
            var b = [],
                f, d, e, a = (this.doc.entry_authors || []);
            if (a.length > 0) {
                for (var c = 0; c < a.length; c++) {
                    f = a[c];
                    if (f.indexOf(", ") > 0) {
                        d = f.split(", ")[0];
                        e = f.split(", ")[1].replace(/\./g, "");
                        b.push('<span class="author" property="author" vocab="http://schema.org/" typeof="Person"><span class="lastname" property="familyName">' + d + '</span> <span class="initial" property="name">' + e + "</span></span>")
                    } else {
                        b.push('<span class="author" property="author" vocab="http://schema.org/" typeof="Person"><span class="initial" property="name">' + f + "</span></span>")
                    }
                }
            }
            return b.join(", ")
        },
        assembly_composition_meta_formatter: function() {
            var a = [],
                c = this.doc.assembly_composition || [];
            if (c.length > 0) {
                for (var b = 0; b < c.length; b++) {
                    if (a.indexOf(c[b]) < 0) {
                        a.push(c[b])
                    }
                }
            } else {
                a = c
            }
            for (var b = 0; b < a.length; b++) {
                if (a[b] == "protein structure") {
                    a[b] = "protein only structure"
                }
            }
            return a.length != 0 ? "<strong>Assembly composition:</strong> " + a.join(", ") : ""
        },
        ligands_meta_formatter: function() {
            var c = "",
                b = "Interacting compound",
                f = this.doc.interacting_ligands,
                e, a = [];
            if (f && f.length > 0) {
                if (f.length > 1) {
                    b += "s"
                }
                c += '<div class="grid_24 pdbe-fact"><strong style="float:left;">' + b + ":</strong>  ";
                for (var d = 0; d < f.length; d++) {
                    e = f[d].split(/\s+:\s+/);
                    if (a.indexOf(e[0]) < 0) {
                        c += '<span class="grid_ data-tooltip" style="margin: 0 5px;float:left;" title="' + e[1] + "&lt;br&gt;&lt;img src=&#34;http://www.ebi.ac.uk/pdbe-srv/pdbechem/image/showNew?code=" + e[0] + '&size=200&#34;&gt;"><a href="http://wwwdev.ebi.ac.uk/pdbe/entry/pdb/' + this.doc.pdb_id + "/bound/" + e[0] + '"target="_blank">' + e[0] + "</a></span>";
                        a.push(e[0])
                    }
                }
                c += "<br></div>"
            }
            return c
        },
        citation_authors_formatter: function() {
            var a = [],
                e, c, d;
            if (this.doc.citation_authors.length > 0) {
                for (var b = 0; b < this.doc.citation_authors.length; b++) {
                    e = this.doc.citation_authors[b];
                    if (e.indexOf(", ") > 0) {
                        c = e.split(", ")[0];
                        d = e.split(", ")[1].replace(/\./g, "");
                        a.push('<span class="author" property="author" vocab="http://schema.org/" typeof="Person"><span class="lastname" property="familyName">' + c + '</span> <span class="initial" property="name">' + d + "</span></span>")
                    } else {
                        a.push('<span class="author" property="author" vocab="http://schema.org/" typeof="Person"><span class="initial" property="name">' + e + "</span></span>")
                    }
                }
            }
            return a.join(", ")
        },
        journal_info_meta_formatter: function(b) {
            var a = (this.doc.journal != undefined ? "<i>" + this.doc.journal + "</i> " : "") + (this.doc.citation_year != undefined ? "(" + this.doc.citation_year + ") " : "") + (this.doc.pubmed_id != undefined ? ' [PMID: <a class="ext-1" property="sameAs" href="http://europepmc.org/abstract/MED/' + this.doc.pubmed_id + '" target="_blank">' + this.doc.pubmed_id + "</a>] " : "");
            return a
        },
        format: function(b, a) {
            if (!this._fmt.hasOwnProperty(b) && this.hasOwnProperty(b + "_formatter")) {
                return this[b + "_formatter"](a)
            } else {
                return this._fmt[b]
            }
        }
    }
})();
(function(a) {
    AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
        start: 0,
        beforeRequest: function() {
            a(this.target).html(a("<img>").attr("src", "../images/ajax-loader.gif"));
            try {
                if (!window.tabs_rendered) {
                    var c = a(".tabs").jKit("tabs", {
                            animation: "none"
                        }).css({
                            display: "block"
                        }),
                        b = History.getState(),
                        d = b.url.match(/[\?\&]?view=([a-zA-Z_]+)&?/);
                    d = d != null ? d[1] : "entry";
                    c.find("ul:first li").each(function(g, h) {
                        h = a(h);
                        h.tooltip({
                            content: h.attr("title"),
                            track: true
                        });
                        var f = h.find("span").data("view");
                        if (d && d === f) {
                            h.addClass("active");
                            h.trigger("click")
                        } else {
                            h.removeClass("active")
                        }
                        h.on("click", function(j) {
                            var i = a(j.target).find("*").data("view") || a(j.target).data("view");
                            selectView(i)
                        })
                    });
                    window.tabs_rendered = true
                } else {}
            } catch (e) {}
        },
        facetLinks: function(f, d) {
            var c = [];
            if (d) {
                for (var e = 0, b = d.length; e < b; e++) {
                    if (d[e] !== undefined) {
                        c.push(a('<a href="#"></a>').text(d[e]).click(this.facetHandler(f, d[e])))
                    } else {
                        c.push("no items found in current selection")
                    }
                }
            }
            return c
        },
        facetHandler: function(d, c) {
            var b = this;
            return function() {
                b.manager.store.remove("fq");
                b.manager.store.addByValue("fq", d + ":" + AjaxSolr.Parameter.escapeValue(c));
                b.doRequest();
                return false
            }
        },
        afterRequest: function() {
            a(this.target).empty();
            a(this.download_target).empty();
            var d = this,
                y, v, u, t, s, q, p, z, w, b = [],
                c, r;
            if (this.manager.pdbe_template_level === 1) {
                a(".entry-content").trigger("beforerendertab", d);
                var x = formatEntryData(this.manager.response.grouped.pdb_id.groups);
                y = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(x));
                a(this.download_target).append('<a href="data:' + y + '" download="data.json">download</a>');
                for (v = 0, s = this.manager.response.grouped.pdb_id.groups.length; v < s; v++) {
                    z = this.manager.response.grouped.pdb_id.groups[v];
                    w = a(this.level1Template(z));
                    a(this.target).append(w)
                }
                a(".entry-content").trigger("afterrendertab", d)
				//$("#results").append("<h3> " + result_string + "</h3>");
				//$("#results").append("<h3> jsjsjsj</h3>");
				
            } else {
                if (this.manager.pdbe_template_level === 2) {
                    window.partialData = {};
                    window.partialParams = "";
                    if (this.manager.response.responseHeader.params.fq.constructor === String) {
                        window.partialParams = this.manager.response.responseHeader.params.fq
                    } else {
                        window.partialParams = (this.manager.response.responseHeader.params.fq).join("&fq=")
                    }
                    var h, e = {},
                        g = this.manager.facet_pivot,
                        o = function(k) {
                            var j = k.field,
                                i = k.value;
                            if (j === g[0] && e[i] === undefined) {
                                h = i;
                                e[h] = []
                            }
                            if (j === g[2]) {
                                if (b.indexOf(i) < 0 && e[h].length === 0) {
                                    b.push(i)
                                }
                                e[h].push(i)
                            }
                            if (k.hasOwnProperty("pivot")) {
                                for (v in k.pivot) {
                                    o(k.pivot[v], v)
                                }
                            }
                        };
                    r = this.manager.response.facet_counts.facet_pivot[g.join(",")];
                    for (v in r) {
                        o(r[v], 0)
                    }
                    getLevel2Data(e, b, this);
                    a(this.download_target).html('<a href="javascript:getDownloadData(partialData, partialParams);">download</a>')
                } else {
                    if (this.manager.pdbe_template_level === 3) {
                        window.partialData = {};
                        window.partialParams = "";
                        if (this.manager.response.responseHeader.params.fq.constructor === String) {
                            window.partialParams = this.manager.response.responseHeader.params.fq
                        } else {
                            window.partialParams = (this.manager.response.responseHeader.params.fq).join("&fq=")
                        }
                        var h, f, e = {},
                            g = this.manager.facet_pivot,
                            o = function(k) {
                                var j = k.field,
                                    i = k.value;
                                if (j === g[0] && e[i] === undefined) {
                                    h = i;
                                    e[h] = {}
                                }
                                if (j === g[1] && e[h][i] === undefined) {
                                    f = i;
                                    e[h][f] = []
                                }
                                if (j === g[3]) {
                                    if (b.indexOf(i) < 0 && e[h][f].length === 0) {
                                        b.push(i)
                                    }
                                    e[h][f].push(i)
                                }
                                if (k.hasOwnProperty("pivot")) {
                                    for (v in k.pivot) {
                                        o(k.pivot[v], v)
                                    }
                                }
                            };
                        r = this.manager.response.facet_counts.facet_pivot[g.join(",")];
                        for (v in r) {
                            o(r[v], 0)
                        }
                        getLevel3Data(e, b, this);
                        a(this.download_target).html('<a href="javascript:getDownloadData(partialData, partialParams);">download</a>')
                    }
                }
            }
        },
        level1Template: function(d) {
            var c = DocumentFormatter.init({
                doc: d.doclist.docs[0],
                mandatory: [{
                    key: "resolution",
                    default_value: "Resolution not applicable"
                }, {
                    key: "organism_scientific_name",
                    default_value: "Not provided"
                }]
            });
			
             var b = '<div class="pdbe-intro-heading"><div class="pdbe-intro-title grid_17 alpha reset_100" property="title"><div class="result_link grid_4 reset_100">' + c.format("pdb_id") + '</div>' + c.format("status") + c.format("pdbe_title_meta") + '</div></div><br><br><button type="submit" id="submitbutton" class="btn btn-success btn-sm popover-right" style="margin-left:auto;margin-right:auto;" data-toggle="popover"  > Show more</button></div><div class="deneme-content hide" ><div class="search_result_wrapper grid_24 reset_100"><div class="pdbe-intro-heading"><div class="pdbe-intro-title grid_17 alpha reset_100" property="title"><div class="result_link grid_4 reset_100">' + c.format("pdb_id") + "</div>" + c.format("status") + c.format("pdbe_title_meta") + '</div></div><div class="pdbe-intro-image grid_7 alpha reset_100"><div class="grid_24 reset_100" style="margin: 9px 0 0 0;"><span class="data-label" property="experimental-method">' + c.format("experimental_method") + '</span><br><span class="data-label" property="resolution">' + c.format("resolution") + "</span><br>" + c.format("release_date") + c.format("entry_validation_image_meta") + "</div>" + c.format("entry_image_meta") + '</div><div class="pdbe-intro-relevant grid_17 reset_100"><div class="grid_24 pdbe-fact"><div class="grid_24">' + c.format("pdbe_author_meta") + '</div><div class="grid_24 alpha omega" style="margin: 0 0 10px;">' + c.format("journal_info_meta") + "</div><strong>Source organism:</strong> " + (c.format("organism_scientific_name") || "Not provided") + "<br>" + c.format("assembly_composition_meta") + "<br></div>" + c.format("ligands_meta") + "<br></div></div></div></div></div>";
		
			// var b = '<div class="search_result_wrapper grid_24 reset_100">
// 				<div class="pdbe-intro-heading">
// 				<div class="pdbe-intro-title grid_17 alpha reset_100" property="title">
// 					<div class="result_link grid_4 reset_100">' + c.format("pdb_id") + "</div>" + c.format("status") + c.format("pdbe_title_meta") + '</div>
// 				</div>
//
// 				<div class="pdbe-intro-image grid_7 alpha reset_100">
// 				<div class="grid_24 reset_100" style="margin: 9px 0 0 0;"><span class="data-label" property="experimental-method">' + c.format("experimental_method") + '</span><br><span class="data-label" property="resolution">' + c.format("resolution") + "</span><br>" + c.format("release_date") + c.format("entry_validation_image_meta") + "</div>" + c.format("entry_image_meta") + '</div>
// 				<div class="pdbe-intro-relevant grid_17 reset_100">
// 					<div class="grid_24 pdbe-fact">
// 						<div class="grid_24">' + c.format("pdbe_author_meta") + '</div>
// 						<div class="grid_24 alpha omega" style="margin: 0 0 10px;">' + c.format("journal_info_meta") + "</div>
// 						<strong>Source organism:</strong> " + (c.format("organism_scientific_name") || "Not provided") + "<br>" + c.format("assembly_composition_meta") + "<br>
// 					</div>" + c.format("ligands_meta") + "<br>
// 				</div>
//
// 				</div></div></div>";
            return b
        },
        level2Template: function(l, k, j) {
            var h = DocumentFormatter.init({
                doc: l,
                mandatory: [{
                    key: "resolution",
                    default_value: "Resolution not applicable"
                }, {
                    key: "organism_scientific_name",
                    default_value: "Not provided"
                }]
            });
            var e = "";
            if (l.resolution == undefined) {
                e = "Unknown"
            } else {
                e = l.resolution + "&Aring;"
            }
            var d = "";
            if (j && j.length > 1) {
                var d = "<div class='slideToggle icon icon-functional' onclick='loadPrintsWidgets(this)' data-icon='u' style='margin-bottom: 10px;font-weight:bold;'>Other entr" + (j.length > 2 ? "ies (" + (j.length - 1) + ")" : "y") + "</div>";
                d += '<div class=\'printsWidgetContainer\' data-prints=\'{"p":false,"v":true,"r":false,"ids":"' + j.join(",") + "\"}'>";
                for (var f = 1; f < j.length; f++) {
                    var m = j[f].split("_")[0],
                        b = j[f].split("_")[1],
                        g = h.format("molecule_type").toLowerCase();
                    d += "<div class='grid_24 pv_" + m + " pdbe-fact'><div class='result_link_ grid_3 reset_20' style='margin: -5px auto;'><a href='../pdb/" + m + "/" + g + "/" + b + "'>" + m + "</a><br><span class='resolution reset_100'></span></div><div class='validation grid_8 reset_66' data-validation='{\"pdb_id\":\"" + m + "\"}'><strong>Validation not available</strong></div><div class='grid_8 pdbprints' pdbid='" + m + "' id='" + j[0] + m + "'></div></div>"
                }
                d += "</div>"
            } else {}
            var c = '<div class="search_result_wrapper grid_24 reset_100"><div class="pdbe-intro-heading"><span class="grid_24" style="font-size: 131%; margin: 9px;' + (h.format("molecule_type").toLowerCase() !== "subject" ? "word-break:break-all;" : "") + '">' + h.format("molecule_type") + ': <a href="../pdb/' + h.doc.pdb_id + "/" + h.format("molecule_type").toLowerCase() + "/" + h.format("entity_id") + '">' + k + '</a></span><span class="grid_24" style="margin: 0 9px;"><strong>' + (j.length > 1 ? "Best" : "Only") + ' example found in:</strong></span></div><div class="grid_23 alpha omega prefix_1"><div class="pdbe-intro-relevant grid_17 responsive_show"><div class="result_link grid_3" style="margin-left: 0;">' + h.format("pdb_id") + '</div></div><div class="pdbe-intro-image grid_7 alpha reset_100"><div class="grid_24 reset_66" style="margin: 9px 0 0 0;"><span class="data-label" property="experimental-method">' + h.format("experimental_method") + '</span><br><span class="data-label" property="resolution">' + h.format("resolution") + "</span><br>" + h.format("release_date") + h.format("entry_validation_image_meta") + "</div>" + h.format("entity_image_meta", k) + '</div><div class="pdbe-intro-relevant grid_17 reset_100"><div class="pdbe-intro-title grid_24" property="title"><div class="result_link grid_3 reset_100 responsive_hide" style="margin-left: 0;">' + h.format("pdb_id") + "</div>" + h.format("pdbe_title_meta") + '</div><div class="grid_24 pdbe-fact"><div class="citation-title grid_24">' + h.format("pdbe_author_meta") + '</div><div class="grid_24 alpha omega" style="margin: 0 0 10px;">' + h.format("journal_info_meta") + "</div><strong>Source organism:</strong> " + (h.format("organism_scientific_name") || "Not provided") + "<br>" + h.format("assembly_composition_meta") + "<br></div>" + h.format("ligands_meta") + '<br><div class="all-entries grid_24 pull_1 reset_100" style="width:102%;">' + d + "</div></div></div></div>";
            return c
        },
        level2TemplateMin: function(m, l, k) {
            var j = DocumentFormatter.init({
                    doc: m,
                    mandatory: [{
                        key: "resolution",
                        default_value: "Resolution not applicable"
                    }, {
                        key: "organism_scientific_name",
                        default_value: "Not provided"
                    }]
                }),
                e = "",
                d = "",
                c;
            if (m.resolution == undefined) {
                e = "Unknown"
            } else {
                e = m.resolution + "&Aring;"
            }
            if (k && k.length > 1) {
                d = "<div class='slideToggle icon icon-functional' onclick='loadPrintsWidgets(this)' data-icon='u' style='margin-bottom: 10px;font-weight:bold;'>Other entr" + (k.length > 2 ? "ies (" + (k.length - 1) + ")" : "y") + "</div>";
                d += '<div class=\'printsWidgetContainer\' data-prints=\'{"p":false,"v":true,"r":false,"ids":"' + k.join(",") + "\"}'>";
                for (var f = 1; f < k.length; f++) {
                    var n = k[f].split("_")[0],
                        b = k[f].split("_")[1],
                        h = j.format("molecule_type").toLowerCase();
                    d += "<div class='grid_24 pv_" + n + " pdbe-fact'><div class='result_link_ grid_3 reset_20' style='margin: -5px auto;'><a href='../pdb/" + n + "/" + h + "/" + b + "'>" + n + "</a><br><span class='resolution reset_100'></span></div><div class='validation grid_8 reset_66' data-validation='{\"pdb_id\":\"" + n + "\"}'><strong>Validation not available</strong></div><div class='grid_8 pdbprints' pdbid='" + n + "' id='" + k[0] + n + "'></div></div>"
                }
                d += "</div>"
            } else {}
            try {
                c = '<div class="search_result_wrapper grid_24 reset_100"><div class="pdbe-intro-heading grid_18 alpha reset_100"><span class="grid_24 omega" style="font-size: 131%; margin: 9px;' + (j.format("molecule_type").toLowerCase() !== "subject" ? "word-break:break-all;" : "") + '">' + j.format("molecule_type") + ': <a href="../pdb/' + j.doc.pdb_id + "/" + j.format("molecule_type").toLowerCase() + "/" + j.format("entity_id") + '">' + l + '</a></span><span class="grid_24" style="margin: 0 9px;"><strong>' + (k.length > 1 ? "Best" : "Only") + ' example found in:</strong></span></div><div class="pdbe-intro-title grid_23 prefix_1 responsive_show" property="title"><div class="result_link grid_6 reset_20" style="margin-top: 2px !important;font-size:167%;">' + j.format("pdb_id") + '</div><div class="grid_18 reset_80 responsive_show" style="margin: 9px 0 0 0;clear:none;"><span class="data-label" property="experimental-method">' + j.format("experimental_method") + '</span><br><span class="data-label" property="resolution">' + j.format("resolution") + '</span><br></div><div class="result_link grid_24 reset_100">' + j.format("entry_validation_image_meta") + "</div>" + j.format("pdbe_title_meta") + '</div><div class="pdbe-intro-image grid_6 alpha reset_100"><div class="grid_24 reset_66 responsive_hide" style="margin: 9px 0 0 0;"><span class="data-label" property="experimental-method">' + j.format("experimental_method") + '</span><br><span class="data-label" property="resolution">' + j.format("resolution") + "</span><br>" + j.format("entry_validation_image_meta") + "</div>" + j.format("entity_image_meta", l) + '</div><div class="grid_17 alpha prefix_1"><div class="pdbe-intro-relevant grid_24 reset_100"><div class="pdbe-intro-title grid_24 responsive_hide" property="title"><div class="result_link grid_3 reset_100" style="margin-left: 0;">' + j.format("pdb_id") + "</div>" + j.format("pdbe_title_meta") + '</div><div class="grid_24 pdbe-fact">' + j.format("assembly_composition_meta") + "<br></div>" + j.format("ligands_meta") + '<br><div class="all-entries grid_24 pull_1 reset_100" style="width:102%;">' + d + "</div></div></div></div>"
            } catch (g) {
                c = '<div class="search_result_wrapper grid_24 reset_100 alert"><h3 class="grid_24 alert"><strong>ERROR FORMATTING ' + m.pdb_id + "</strong></h3></div>"
            }
            return c
        },
        level3Template: function(m, l, h, k) {
            var j = DocumentFormatter.init({
                doc: m,
                mandatory: [{
                    key: "resolution",
                    default_value: "Resolution not applicable"
                }, {
                    key: "organism_scientific_name",
                    default_value: "Not provided"
                }]
            });
            var e = "";
            if (m.resolution == undefined) {
                e = "Unknown"
            } else {
                e = m.resolution + "&Aring;"
            }
            var d = "";
            if (k && k.length > 1) {
                var d = "<div class='slideToggle icon icon-functional' onclick='loadPrintsWidgets(this)' data-icon='u' style='margin-bottom: 10px;font-weight:bold;'>Also occurring in entr" + (k.length > 2 ? "ies (" + (k.length - 1) + ")" : "y") + "</div>";
                d += '<div class=\'printsWidgetContainer\' data-prints=\'{"p":false,"v":true,"r":false,"ids":"' + k.join(",") + "\"}'>";
                for (var f = 1; f < k.length; f++) {
                    var n = k[f].split("_")[0],
                        b = k[f].split("_")[1],
                        g = j.format("molecule_type").toLowerCase();
                    d += "<div class='grid_24 pv_" + n + " pdbe-fact'><div class='result_link_ grid_3 reset_20' style='margin: -5px auto;'><a href='../pdb/" + n + "/" + g + "/" + b + "'>" + n + "</a><br><span class='resolution reset_100'></span></div><div class='validation grid_8 reset_66' data-validation='{\"pdb_id\":\"" + n + "\"}'><strong>Validation not available</strong></div><div class='grid_8 pdbprints' pdbid='" + n + "' id='" + k[0] + n + "'></div></div>"
                }
                d += "</div>"
            } else {}
            var c = '<div class="search_result_wrapper grid_24 reset_100"><div class="pdbe-intro-heading"><span class="grid_24 alpha omega" style="font-size: 131%; margin: 9px 1%;' + (this.manager.pdbe_label_style === "break_all" ? "word-break:break-all;" : "") + '">' + this.manager.pdbe_label + ": " + j.format(this.manager.pdbe_subject_template, l) + '<br></span><span class="grid_" style="margin: 0 9px;"><strong>' + this.manager.pdbe_interaction + ':</strong> </span></div><div class="grid_23 alpha omega prefix_1"><span class="grid_24" style="font-size: 131%; margin: 9px;' + (j.format("molecule_type").toLowerCase() !== "subject" ? "word-break:break-all;" : "") + '">' + j.format("molecule_type") + ': <a href="../pdb/' + j.doc.pdb_id + "/" + j.format("molecule_type").toLowerCase() + "/" + j.format("entity_id") + '">' + h + '</a></span><span class="grid_24" style="margin: 0 9px;"><strong>' + (k.length > 1 ? "Best" : "Only") + ' example found in:</strong></span><div class="grid_23 alpha omega prefix_1"><div class="pdbe-intro-relevant grid_17 responsive_show"><div class="result_link grid_3" style="margin-left: 0;">' + j.format("pdb_id") + '</div></div><div class="pdbe-intro-image grid_7 alpha reset_100"><div class="grid_24 reset_66" style="margin: 9px 0 0 0;"><span class="data-label" property="experimental-method">' + j.format("experimental_method") + '</span><br><span class="data-label" property="resolution">' + j.format("resolution") + "</span><br>" + j.format("release_date") + j.format("entry_validation_image_meta") + "</div>" + j.format(this.manager.pdbe_image_template, l) + '</div><div class="pdbe-intro-relevant grid_17 reset_100"><div class="pdbe-intro-title grid_24" property="title"><div class="result_link grid_3 reset_100 responsive_hide" style="margin-left: 0;">' + j.format("pdb_id") + "</div>" + j.format("pdbe_title_meta") + '</div><div class="grid_24 pdbe-fact"><div class="citation-title grid_24">' + j.format("pdbe_author_meta") + '</div><div class="grid_24 alpha omega" style="margin: 0 0 10px;">' + j.format("journal_info_meta") + "</div><strong>Source organism:</strong> " + (j.format("organism_scientific_name") || "Not provided") + "<br>" + j.format("assembly_composition_meta") + "<br></div>" + j.format("ligands_meta") + '<br><div class="all-entries grid_24 pull_2 reset_100" style="width:102%;">' + d + "</div></div></div></div></div>";
            return c
        },
        level3TemplateMin: function(p, o, k, m) {
            var l = DocumentFormatter.init({
                    doc: p,
                    mandatory: [{
                        key: "resolution",
                        default_value: "Resolution not applicable"
                    }, {
                        key: "organism_scientific_name",
                        default_value: "Not provided"
                    }]
                }),
                f = "",
                e = "",
                c, n = new Date();
            if (p.resolution == undefined) {
                f = "Unknown"
            } else {
                f = p.resolution + "&Aring;"
            }
            if (m && m.length > 1) {
                e = "<div class='slideToggle icon icon-functional' onclick='loadPrintsWidgets(this)' data-icon='u' style='margin-bottom: 10px;font-weight:bold;'>Also occurring in entr" + (m.length > 2 ? "ies (" + (m.length - 1) + ")" : "y") + "</div>";
                e += '<div class=\'printsWidgetContainer\' data-prints=\'{"p":false,"v":true,"r":false,"ids":"' + m.join(",") + "\"}'>";
                for (var g = 1; g < m.length; g++) {
                    var q = m[g].split("_")[0],
                        b = m[g].split("_")[1],
                        j = l.format("molecule_type").toLowerCase(),
                        d = n.getMilliseconds() || Math.floor(Math.random() * 100);
                    e += "<div class='grid_24 pv_" + q + " pdbe-fact'><div class='result_link_ grid_3 reset_20' style='margin: -5px auto;'><a href='../pdb/" + q + "/" + j + "/" + b + "'>" + q + "</a><br><span class='resolution reset_100'></span></div><div class='validation grid_8 reset_66' data-validation='{\"pdb_id\":\"" + q + "\"}'><strong>Validation not available</strong></div><div class='grid_8 pdbprints' pdbid='" + q + "' id='" + m[0] + q + d + "'></div></div>"
                }
                e += "</div>"
            } else {}
            try {
                c = '<div class="search_result_wrapper grid_24 reset_100"><div class="pdbe-intro-heading grid_18 alpha reset_100"><span class="grid_24 alpha omega" style="font-size: 131%; margin: 9px 1%;' + (this.manager.pdbe_label_style === "break_all" ? "word-break:break-all;" : "") + '">' + this.manager.pdbe_label + ": " + l.format(this.manager.pdbe_subject_template, o) + '<br></span><span class="grid_" style="margin: 0 9px;"><strong>' + this.manager.pdbe_interaction + ':</strong> </span><span class="grid_24 responsive_show" style="font-size: 131%; margin: 9px;' + (l.format("molecule_type").toLowerCase() !== "subject" ? "word-break:break-all;" : "") + '">' + l.format("molecule_type") + ': <a href="../pdb/' + l.doc.pdb_id + "/" + l.format("molecule_type").toLowerCase() + "/" + l.format("entity_id") + '">' + k + '</a></span></div><div class="pdbe-intro-image grid_6 alpha reset_100"><div class="pdbe-intro-relevant grid_24 responsive_show"><span class="grid_24" style="margin: 0 9px;"><strong>' + (m.length > 1 ? "Best" : "Only") + ' example found in:</strong></span><div class="pdbe-intro-title grid_23 prefix_1 responsive_show" property="title"><div class="result_link grid_6 reset_20" style="margin-top: 2px !important;font-size:167%;">' + l.format("pdb_id") + '</div><div class="grid_18 reset_80 responsive_show" style="margin: 9px 0 0 0;clear:none;"><span class="data-label" property="experimental-method">' + l.format("experimental_method") + '</span><br><span class="data-label" property="resolution">' + l.format("resolution") + '</span><br></div><div class="result_link grid_24 reset_100">' + l.format("entry_validation_image_meta") + "</div>" + l.format("pdbe_title_meta") + '</div></div><div class="grid_24 reset_66 responsive_hide" style="margin: 9px 0 0 0;"><span class="data-label" property="experimental-method">' + l.format("experimental_method") + '</span><br><span class="data-label" property="resolution">' + l.format("resolution") + "</span><br>" + l.format("entry_validation_image_meta") + "</div>" + l.format(this.manager.pdbe_image_template, o) + '</div><div class="grid_17 alpha omega prefix_1 reset_100"><span class="grid_24 responsive_hide" style="font-size: 131%; margin: 9px;' + (l.format("molecule_type").toLowerCase() !== "subject" ? "word-break:break-all;" : "") + '">' + l.format("molecule_type") + ': <a href="../pdb/' + l.doc.pdb_id + "/" + l.format("molecule_type").toLowerCase() + "/" + l.format("entity_id") + '">' + k + '</a></span><span class="grid_24 responsive_hide" style="margin: 0 9px;"><strong>' + (m.length > 1 ? "Best" : "Only") + ' example found in:</strong></span><div class="grid_23 alpha prefix_1"><div class="pdbe-intro-relevant grid_24 omega reset_100"><div class="pdbe-intro-title grid_24 responsive_hide" property="title"><div class="result_link grid_3 reset_100" style="margin-left: 0;font-size:146.5%;">' + l.format("pdb_id") + "</div>" + l.format("pdbe_title_meta") + "</div>" + l.format("ligands_meta") + '<br><div class="all-entries grid_24 pull_2 reset_100" style="width:102%;">' + e + "</div></div></div></div></div>"
            } catch (h) {
                c = '<div class="search_result_wrapper grid_24 reset_100 alert"><h3 class="grid_24 alert"><strong>ERROR FORMATTING ' + p.pdb_id + "</strong></h3></div>"
            }
            return c
        },
        init: function() {
            a(document).on("click", "a.more", function() {
                var c = a(this),
                    b = c.parent().find("span");
                if (b.is(":visible")) {
                    b.hide();
                    c.text("more")
                } else {
                    b.show();
                    c.text("less")
                }
                return false
            })
        }
    })
})(jQuery);

function getLevel2Data(c, b, a) {
    b.sort();
    jQuery.ajax("http://wwwdev.ebi.ac.uk/pdbe/search/pdb/select", {
        type: "POST",
        data: {
            q: "entry_entity:" + b.join(" OR entry_entity:"),
            group: true,
            "group.facet": true,
            "group.ngroups": true,
            "group.field": "entry_entity",
            wt: "json",
            rows: b.length
        },
        success: function(d) {},
        error: function(f, d, e) {},
        dataType: "json",
        crossDomain: true,
        async: true
    }).done(function(h, g, j) {
        jQuery(".entry-content").trigger("beforerendertab", a);
        var f, e = {},
            d;
        for (f = 0; f < h.grouped.entry_entity.groups.length; f++) {
            e[h.grouped.entry_entity.groups[f].groupValue] = h.grouped.entry_entity.groups[f].doclist.docs[0]
        }
        for (d in c) {
            if (c.hasOwnProperty(d)) {
                if (c[d].length > 0) {
                    jQuery(a.target).append(a.level2Template(e[c[d][0]], d, c[d]))
                }
            }
        }
    }).fail(function(f, d, e) {}).always(function(f, d, e) {
        jQuery(".entry-content").trigger("afterrendertab", a)
    })
}

function getLevel3Data(c, b, a) {
    b.sort();
    jQuery.ajax("http://wwwdev.ebi.ac.uk/pdbe/search/pdb/select", {
        type: "POST",
        data: {
            q: "entry_entity:" + b.join(" OR entry_entity:"),
            group: true,
            "group.facet": true,
            "group.ngroups": true,
            "group.field": "entry_entity",
            wt: "json",
            rows: b.length
        },
        success: function(d) {},
        error: function(f, d, e) {},
        dataType: "json",
        crossDomain: true,
        async: true
    }).done(function(h) {
        jQuery(".entry-content").trigger("beforerendertab", a);
        var f, e = {},
            d, g;
        for (f = 0; f < h.grouped.entry_entity.groups.length; f++) {
            e[h.grouped.entry_entity.groups[f].groupValue] = h.grouped.entry_entity.groups[f].doclist.docs[0]
        }
        for (d in c) {
            if (c.hasOwnProperty(d)) {
                for (g in c[d]) {
                    if (c[d].hasOwnProperty(g)) {
                        jQuery(a.target).append(a[a.manager.pdbe_template_handler](e[c[d][g][0]], d, g, c[d][g]))
                    }
                }
            }
        }
    }).fail(function(f, d, e) {}).always(function(f, d, e) {
        jQuery(".entry-content").trigger("afterrendertab", a)
    })
}

function loadPrintsWidgets(c) {
    c = $(c).next();
    var g, a = c.data("prints"),
        f = a.ids.split(","),
        k = f[0],
        e = [],
        h = [];
    $(c).find(".pdbprints").each(function(l, m) {
        h.push($(m).attr("pdbid"));
        e.push($(m).attr("id"))
    });
    if (!a.r) {
        try {
            jQuery.ajax("http://wwwdev.ebi.ac.uk/pdbe/search/pdb/select", {
                type: "POST",
                data: {
                    q: "entry_entity:" + f.slice(1).join(" OR "),
                    group: true,
                    "group.facet": true,
                    "group.ngroups": true,
                    "group.field": "entry_entity",
                    wt: "json",
                    rows: 100
                },
                success: function(i) {},
                error: function(m, i, l) {},
                dataType: "json",
                crossDomain: true,
                async: true
            }).done(function(s) {
                var q, o, p = {},
                    r, l;
                for (q = 0; q < s.grouped.entry_entity.groups.length; q++) {
                    var m = s.grouped.entry_entity.groups[q].groupValue,
                        n = s.grouped.entry_entity.groups[q].doclist.docs[0].resolution;
                    n = n != undefined ? n + "&Aring;" : "";
                    jQuery(".pv_" + m.split("_")[0] + " .resolution").html(n)
                }
                a.r = true
            }).fail(function(m, i, l) {}).always(function(m, i, l) {})
        } catch (j) {
            console.log("solr resolution error: " + j);
            a.r = false
        }
    }
    if (!a.p) {
        try {
            var d = (new YAHOO.PDBe.PrintsWidget(e.join(","), h.join(","), "jslogos", "horizontal", 36, "transparent", "pdbprints", false, null, ["PrimaryCitation", "Taxonomy", "Experimental", "Protein", "Ligands"], false));
            d.yuibuild = "http://www.ebi.ac.uk/pdbe/widgets/js/yui/build/";
            d.show();
            a.p = true
        } catch (b) {
            console.log("prints error: " + b);
            a.p = false
        }
    }
}

function getDownloadData(a, b) {
    jQuery.ajax({
        url: "http://wwwdev.ebi.ac.uk/pdbe/search/pdb/select?facet=true&q=*%3A*&group=true&group.field=pdb_id&facet.pivot=molecule_name,resolution,pdb_id&group.ngroups=true&group.facet=true&facet.pivot.mincount=1&facet.sort=pivot_resolution%2Basc&facet.field=molecule_name&f.molecule_name.facet.limit=150000&f.molecule_name.facet.offset=0&rows=0&facet.limit=20000&facet.mincount=1&json.nl=map&fq=" + b + "&wt=json&json.wrf=?",
        dataType: "json",
        crossDomain: "true",
        type: "POST",
        async: false
    }).done(function(p) {
        for (var q = 0, f = p.facet_counts.facet_pivot["molecule_name,resolution,pdb_id"].length; q < f; q++) {
            var c = [];
            var h = p.facet_counts.facet_pivot["molecule_name,resolution,pdb_id"][q].value;
            for (var o = 0, e = p.facet_counts.facet_pivot["molecule_name,resolution,pdb_id"][q].pivot.length; o < e; o++) {
                for (var g = 0, d = p.facet_counts.facet_pivot["molecule_name,resolution,pdb_id"][q].pivot[o].pivot.length; g < d; g++) {
                    c.push(p.facet_counts.facet_pivot["molecule_name,resolution,pdb_id"][q].pivot[o].pivot[g].value)
                }
            }
            a[h] = c
        }
        onDownload(a, b)
    })
}

function getSupplementaryDownloadData(c, d, b, a) {
    jQuery.ajax({
        url: "http://wwwdev.ebi.ac.uk/pdbe/search/pdb/select?q=pdb_id:" + d[0] + "&group=true&group.facet=true&group.ngroups=true&group.field=pdb_id&wt=json&json.wrf=?&rows=100",
        dataType: "json",
        crossDomain: "true",
        type: "POST",
        async: false
    }).done(function(f) {
        b.best_entry = f.grouped.pdb_id.groups[0].doclist.docs[0].pdb_id;
        if (f.grouped.pdb_id.groups[0].doclist.docs[0].resolution == undefined) {
            b.resolution = "Unknown"
        } else {
            b.resolution = f.grouped.pdb_id.groups[0].doclist.docs[0].resolution + "&Aring;"
        }
        b.entry_title = f.grouped.pdb_id.groups[0].doclist.docs[0].title;
        b.authors = f.grouped.pdb_id.groups[0].doclist.docs[0].entry_authors;
        b.ligands = f.grouped.pdb_id.groups[0].doclist.docs[0].compound_name;
        b.experimental_method = f.grouped.pdb_id.groups[0].doclist.docs[0].experimental_method;
        b.status = f.grouped.pdb_id.groups[0].doclist.docs[0].status;
        a.push(b);
        var e = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(a));
        jQuery(c.download_target).html('<a href="data:' + e + '" download="data.json">download</a>')
    })
}

function onDownload(a, b) {
    jQuery.ajax({
        url: "http://wwwdev.ebi.ac.uk/pdbe/search/pdb/select?facet=true&q=*%3A*&group=true&group.field=pdb_id&group.ngroups=true&group.facet=true&facet.field=experimental_method&facet.field=entry_authors&facet.field=pfam_name&facet.field=superkingdom&facet.field=genus&facet.field=organism_scientific_name&facet.field=citation_year&facet.field=spacegroup&facet.field=biological_process&facet.field=biological_function&facet.field=biological_cell_component&facet.field=journal&facet.field=assembly_composition&facet.field=assembly_form&facet.field=assembly_type&facet.field=refinement_software&facet.field=detector&facet.field=detector_type&facet.field=diffraction_protocol&facet.field=molecule_name&facet.field=status&facet.field=ec_number&facet.field=cath_class&facet.field=cath_topology&facet.field=gene_name&facet.field=compound_name&facet.field=interpro_name&facet.field=scop_class&facet.field=scop_family&facet.field=scop_fold&facet.field=citation_authors&facet.field=interacting_molecules&facet.field=interacting_ligands&facet.field=molecule_type&facet.field=beam_source_name&facet.field=beam_source_type&facet.limit=100&facet.mincount=1&facet.sort=count&facet.range=deposition_year&facet.range=release_year&facet.range=resolution&f.deposition_year.facet.range.start=1970&f.deposition_year.facet.range.end=2050&f.deposition_year.facet.range.gap=5&f.release_year.facet.range.start=1970&f.release_year.facet.range.end=2050&f.release_year.facet.range.gap=5&f.resolution.facet.range.start=0.0&f.resolution.facet.range.end=100&f.resolution.facet.range.gap=0.5&f.deposition_year.facet.range.other=between&f.deposition_year.facet.range.include=upper&f.release_year.facet.range.other=between&f.release_year.facet.range.include=upper&f.ft_resolution.facet.range.other=between&f.ft_resolution.facet.range.include=upper&rows=150000&json.nl=map&fq=" + b + "&wt=json&json.wrf=?",
        dataType: "json",
        crossDomain: "true",
        type: "POST",
        async: false
    }).done(function(g) {
        var d = {};
        for (var h = 0; h < g.grouped.pdb_id.groups.length; h++) {
            d[g.grouped.pdb_id.groups[h].groupValue] = g.grouped.pdb_id.groups[h].doclist.docs[0]
        }
        var c = [];
        for (var e in a) {
            var m = {};
            m.protein = e;
            m.pdb_ids = a[e];
            var k = {};
            k.pdb_id = a[e][0];
            var j = d[a[e][0]];
            k.title = j.title;
            k.r_factor = j.r_factor;
            k.journal = j.journal;
            k.status = j.status;
            k.revision_date = j.revision_date;
            k.release_date = j.release_date;
            k.resolution = j.resolution;
            m.best_pdb = k;
            c.push(m)
        }
        var l = function(p, i) {
            var o = p.ownerDocument.createEvent("MouseEvents"),
                i = i || {};
            var n = {
                type: i.type || "click",
                canBubble: i.canBubble || true,
                cancelable: i.cancelable || true,
                view: i.view || p.ownerDocument.defaultView,
                detail: i.detail || 1,
                screenX: i.screenX || 0,
                screenY: i.screenY || 0,
                clientX: i.clientX || 0,
                clientY: i.clientY || 0,
                ctrlKey: i.ctrlKey || false,
                altKey: i.altKey || false,
                shiftKey: i.shiftKey || false,
                metaKey: i.metaKey || false,
                button: i.button || 0,
                relatedTarget: i.relatedTarget || null
            };
            o.initMouseEvent(n.type, n.canBubble, n.cancelable, n.view, n.detail, n.screenX, n.screenY, n.clientX, n.clientY, n.ctrlKey, n.altKey, n.shiftKey, n.metaKey, n.button, n.relatedTarget);
            p.dispatchEvent(o)
        };
        var f = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(c));
        jQuery("#dummydownload").html('<a style="display:hidden;" id="downlink" href="data:' + f + '" download="data.json">dummy</a>');
        l(document.getElementById("downlink"))
    })
}

function formatEntryData(g) {
    var c = [];
    for (var e = 0; e < g.length; e++) {
        var f = {};
        f.pdb_id = g[e].doclist.docs[0].pdb_id;
        f.citation_title = g[e].doclist.docs[0].citation_title;
        f.citation_year = g[e].doclist.docs[0].citation_year;
        f.pubmed_id = g[e].doclist.docs[0].pubmed_id;
        if (g[e].doclist.docs[0].entry_authors) {
            var a = [];
            for (var b = 0; b < g[e].doclist.docs[0].entry_authors.length; b++) {
                a.push(g[e].doclist.docs[0].entry_authors[b])
            }
            f.entry_authors = a
        }
        if (g[e].doclist.docs[0].compound_name) {
            var d = [];
            for (var b = 0; b < g[e].doclist.docs[0].compound_name.length; b++) {
                d.push(g[e].doclist.docs[0].compound_name[b])
            }
            f.compound_name = d
        }
        if (g[e].doclist.docs[0].organism_scientific_name) {
            var h = [];
            for (var b = 0; b < g[e].doclist.docs[0].organism_scientific_name.length; b++) {
                h.push(g[e].doclist.docs[0].organism_scientific_name[b])
            }
            f.organism_scientific_name = h
        }
        c.push(f)
    }
    return c
}
jQuery(".entry-content").on("afterrendertab", function(a, b) {
    jQuery(b.target).pdbe_summarize();
    jQuery(b.target).jKit();
    if (b.manager.pdbe_template_level > 1) {
        handleMenuRender()
    }
    jQuery(b.target + " .data-tooltip").each(function() {
        jQuery(this).tooltip({
            content: jQuery(this).attr("title"),
            track: true
        })
    });
	
    jQuery("html body").animate({
        scrollTop: jQuery("#selection").scrollTop()
    }, 300)
});
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["core/AbstractWidget"], a)
    } else {
        a()
    }
}(function() {
    (function(a) {
        AjaxSolr.NewPagerWidget = AjaxSolr.AbstractWidget.extend({
            constructor: function(b) {
                AjaxSolr.extend(this, {
                    innerWindow: 4,
                    outerWindow: 1,
                    prevLabel: "&laquo; Previous",
                    nextLabel: "Next &raquo;",
                    separator: " ",
                    currentPage: null,
                    totalPages: null
                }, b)
            },
            gapMarker: function() {
                return '<span class="pager-gap">&hellip;</span>'
            },
            windowedLinks: function() {
                var c = [];
                var e = null;
                visible = this.visiblePageNumbers();
                for (var d = 0, b = visible.length; d < b; d++) {
                    if (e && visible[d] > e + 1) {
                        c.push(this.gapMarker())
                    }
                    c.push(this.pageLinkOrSpan(visible[d], ["pager-current"]));
                    e = visible[d]
                }
                return c
            },
            visiblePageNumbers: function() {
                var e = this.currentPage - this.innerWindow;
                var b = this.currentPage + this.innerWindow;
                if (b > this.totalPages) {
                    e = Math.max(0, e - (b - this.totalPages));
                    b = this.totalPages
                }
                if (e < 1) {
                    b = Math.min(this.totalPages, b + (1 - e));
                    e = 1
                }
                var d = [];
                d.push(1);
                for (var c = 2; c <= Math.min(1 + this.outerWindow, e - 1); c++) {
                    d.push(c)
                }
                if (1 + this.outerWindow == e - 2) {
                    d.push(e - 1)
                }
                for (var c = Math.max(2, e); c <= Math.min(b, this.totalPages - 1); c++) {
                    d.push(c)
                }
                if (this.totalPages - this.outerWindow == b + 2) {
                    d.push(b + 1)
                }
                for (var c = Math.max(this.totalPages - this.outerWindow, b + 1); c < this.totalPages; c++) {
                    d.push(c)
                }
                if (this.totalPages > 1) {
                    d.push(this.totalPages)
                }
                return d
            },
            pageLinkOrSpan: function(c, b, d) {
                d = d || c;
                if (c && c != this.currentPage) {
                    return a("<span></span>").html(d).attr("rel", this.relValue(c)).addClass(b[1]).click(this.clickHandler(c))
                } else {
                    return a("<span></span>").html(d).addClass(b.join(" "))
                }
            },
            clickHandler: function(c) {
                var b = this;
                return function() {
					
                    if (b.manager.facet_pivot) {
                        if (((c - 1) * b.perPage()) != 0) {
                            b.manager.store.get("f." + b.manager.facet_pivot[0] + ".facet.offset").val((c - 1) * b.perPage())
                        } else {
                            b.manager.store.get("f." + b.manager.facet_pivot[0] + ".facet.offset").val("0")
                        }
                    } else {
                        b.manager.store.get("start").val((c - 1) * b.perPage())
                    }
                    b.doRequest();
					
                    return false
                }
            },
            relValue: function(b) {
                switch (b) {
                    case this.previousPage():
                        return "prev" + (b == 1 ? "start" : "");
                    case this.nextPage():
                        return "next";
                    case 1:
                        return "start";
                    default:
                        return ""
                }
            },
            previousPage: function() {
                return this.currentPage > 1 ? (this.currentPage - 1) : null
            },
            nextPage: function() {
                return this.currentPage < this.totalPages ? (this.currentPage + 1) : null
            },
            renderHeader: function(b, d, c) {},
            renderLinks: function(d, b) {
                if (this.totalPages) {
                    d.unshift(this.pageLinkOrSpan(this.previousPage(), ["pager-disabled", "pager-prev"], this.prevLabel));
                    d.push(this.pageLinkOrSpan(this.nextPage(), ["pager-disabled", "pager-next"], this.nextLabel));
                    b.unshift(this.pageLinkOrSpan(this.previousPage(), ["pager-disabled", "pager-prev"], this.prevLabel));
                    b.push(this.pageLinkOrSpan(this.nextPage(), ["pager-disabled", "pager-next"], this.nextLabel));
                    var j = a(this.target1);
                    var h = a(this.target2);
                    j.empty();
                    h.empty();
                    for (var f = 0, c = d.length; f < c; f++) {
                        var g = a('<li style="cursor:pointer"></li>');
                        var e = a('<li style="cursor:pointer"></li>');
                        if (this.separator && f > 0) {
                            g.append(this.separator);
                            e.append(this.separator)
                        }
                        g.append(d[f]);
                        e.append(b[f]);
                        j.append(g);
                        h.append(e)
                    }
                }
            },
            perPage: function() {
                if (this.manager.facet_pivot) {
                    return parseInt(this.manager.response.responseHeader.params["f." + this.manager.facet_pivot[0] + ".facet.limit"])
                } else {
                    return parseInt(this.manager.response.responseHeader && this.manager.response.responseHeader.params && this.manager.response.responseHeader.params.rows || this.manager.store.get("rows").val() || 10)
                }
            },
            getOffset: function() {
                if (this.manager.facet_pivot) {
                    return parseInt(this.manager.response.responseHeader.params["f." + this.manager.facet_pivot[0] + ".facet.offset"])
                } else {
                    return parseInt(this.manager.response.responseHeader && this.manager.response.responseHeader.params && this.manager.response.responseHeader.params.start || this.manager.store.get("start").val() || 0)
                }
            },
            getTotal: function(b, f, c, e) {
                var d;
				
                a.ajax({
                    url: "http://wwwdev.ebi.ac.uk/pdbe/search/pdb/select?facet=true&q=*%3A*&group=true&group.field=pdb_id&rows=0&group.ngroups=true&group.facet=true&facet.field=" + this.manager.facet_pivot[0] + "&facet.limit=100000&facet.mincount=1&json.nl=map&fq=" + b + "&wt=json",
                    dataType: "json",
                    crossDomain: "true",
                    type: "POST",
                    async: true
                }).done(function(j) {
                    var h = 0,
                        g;
                    for (g in j.facet_counts.facet_fields[e.manager.facet_pivot[0]]) {
                        if (j.facet_counts.facet_fields[e.manager.facet_pivot[0]].hasOwnProperty(g)) {
                            h++
                        }
                    }
                    d = h;
                    helper(d, f, c, e)
					
                })
				
            },
            afterRequest: function() {
                var b = this.perPage();
                var e = this.getOffset();
                var d;
                if (this.manager.facet_pivot) {
                    var c = this;
                    if (this.manager.response.responseHeader.params.fq != undefined) {
                        if (this.manager.response.responseHeader.params.fq.constructor === String) {
                            this.getTotal(this.manager.response.responseHeader.params.fq, e, b, c)
                        } else {
                            this.getTotal(this.manager.response.responseHeader.params.fq.join("&fq="), e, b, c)
                        }
                    } else {
                        this.getTotal("*:*", e, b, c)
                    }
                } else {
                    if (typeof this.manager.response.grouped.molecule_name === "undefined") {
                        d = parseInt(this.manager.response.grouped.pdb_id.ngroups)
                    } else {
                        d = parseInt(this.manager.response.grouped.molecule_name.ngroups)
                    }
                    e = e - e % b;
                    this.currentPage = Math.ceil((e + 1) / b);
                    this.totalPages = Math.ceil(d / b);
                    a(this.target1).empty();
                    a(this.target2).empty();
                    this.renderLinks(this.windowedLinks(), this.windowedLinks());
                    this.renderHeader(b, e, d)
                }
            }
        })
    })(jQuery)
}));

function dummy() {}

function helper(c, d, a, b) {
    d = d - d % a;
    b.currentPage = Math.ceil((d + 1) / a);
    b.totalPages = Math.ceil(c / a);
    jQuery(this.target1).empty();
    jQuery(this.target2).empty();
    b.renderLinks(b.windowedLinks(), b.windowedLinks());
    b.renderHeader(a, d, c)
};
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["core/AbstractWidget", "core/Parameter"], a)
    } else {
        a()
    }
}(function() {
    AjaxSolr.AbstractFacetWidget = AjaxSolr.AbstractWidget.extend({
        constructor: function(a) {
            AjaxSolr.extend(this, {
                start: 0,
                field: null,
                multivalue: true
            }, a)
        },
        init: function() {
            this.initStore()
        },
        initStore: function() {
            var c = ["facet.prefix", "facet.sort", "facet.limit", "facet.offset", "facet.mincount", "facet.missing", "facet.method", "facet.enum.cache.minDf"];
            this.manager.store.addByValue("facet", true);
            if (this["facet.field"] !== undefined) {
                this.manager.store.addByValue("facet.field", this.field)
            } else {
                if (this["facet.date"] !== undefined) {
                    this.manager.store.addByValue("facet.date", this.field);
                    c = c.concat(["facet.date.start", "facet.date.end", "facet.date.gap", "facet.date.hardend", "facet.date.other", "facet.date.include"])
                } else {
                    if (this["facet.range"] !== undefined) {
                        this.manager.store.addByValue("facet.range", this.field);
                        c = c.concat(["facet.range.start", "facet.range.end", "facet.range.gap", "facet.range.hardend", "facet.range.other", "facet.range.include"])
                    }
                }
            }
            for (var b = 0, a = c.length; b < a; b++) {
                if (this[c[b]] !== undefined) {
                    this.manager.store.addByValue("f." + this.field + "." + c[b], this[c[b]])
                }
            }
        },
        isEmpty: function() {
            return !this.manager.store.find("fq", new RegExp("^-?" + this.field + ":"))
        },
        set: function(a) {
            return this.changeSelection(function() {
                var d = this.manager.store.removeByValue("fq", new RegExp("^-?" + this.field + ":")),
                    c = this.manager.store.addByValue("fq", this.fq(a));
                return d || c
            })
        },
        add: function(a) {
            return this.changeSelection(function() {
                var b = History.getState();
                if (a.match(/[ \\+\-\!\(\)\:\^\]\{\}\~\*\?]/g) && a.match(/^".*"$/) === null) {
                    a = '"' + a + '"'
                }
                if ((b.url).indexOf(this.fq(a)) >= 0) {} else {
                    var c = "";
                    if ((b.url).indexOf("?") >= 0) {
                        c = (b.url) + "&" + this.fq(a)
                    } else {
                        c = (b.url) + "?" + this.fq(a)
                    }
                    History.pushState(null, document.title, c)
                }
            })
        },
        remove: function(a) {
            return this.changeSelection(function() {
                if (this.manager.name == "entryMan") {
                    MacromoleculesManager.store.removeByValue("fq", this.fq(a));
                    PfamManager.store.removeByValue("fq", this.fq(a))
                }
                if (this.manager.name == "macromoleculesMan") {
                    EntryManager.store.removeByValue("fq", this.fq(a));
                    PfamManager.store.removeByValue("fq", this.fq(a))
                }
                if (this.manager.name == "pfamMan") {
                    EntryManager.store.removeByValue("fq", this.fq(a));
                    MacromoleculesManager.store.removeByValue("fq", this.fq(a))
                }
                return this.manager.store.removeByValue("fq", this.fq(a))
            })
        },
        clear: function() {
            return this.changeSelection(function() {
                if (this.manager.name == "entryMan") {
                    MacromoleculesManager.store.removeByValue("fq", new RegExp("^-?" + this.field + ":"));
                    PfamManager.store.removeByValue("fq", new RegExp("^-?" + this.field + ":"))
                }
                if (this.manager.name == "macromoleculesMan") {
                    EntryManager.store.removeByValue("fq", new RegExp("^-?" + this.field + ":"));
                    PfamManager.store.removeByValue("fq", new RegExp("^-?" + this.field + ":"))
                }
                if (this.manager.name == "pfamMan") {
                    EntryManager.store.removeByValue("fq", new RegExp("^-?" + this.field + ":"));
                    MacromoleculesManager.store.removeByValue("fq", new RegExp("^-?" + this.field + ":"))
                }
                return this.manager.store.removeByValue("fq", new RegExp("^-?" + this.field + ":"))
            })
        },
        changeSelection: function(a) {
            changed = a.apply(this);
            if (changed) {
                this.afterChangeSelection()
            }
            return changed
        },
        afterChangeSelection: function() {},
        getFacetCounts: function() {
            var a;
            if (this["facet.field"] !== undefined) {
                a = "facet_fields"
            } else {
                if (this["facet.date"] !== undefined) {
                    a = "facet_dates"
                } else {
                    if (this["facet.range"] !== undefined) {
                        a = "facet_ranges"
                    }
                }
            }
            if (a !== undefined) {
                switch (this.manager.store.get("json.nl").val()) {
                    case "map":
                        return this.getFacetCountsMap(a);
                    case "arrarr":
                        return this.getFacetCountsArrarr(a);
                    default:
                        return this.getFacetCountsFlat(a)
                }
            }
            throw 'Cannot get facet counts unless one of the following properties is set to "true" on widget "' + this.id + '": "facet.field", "facet.date", or "facet.range".'
        },
        getFacetCountsMap: function(b) {
            var a = [];
            for (var c in this.manager.response.facet_counts[b][this.field]) {
                a.push({
                    facet: c,
                    count: parseInt(this.manager.response.facet_counts[b][this.field][c])
                })
            }
            return a
        },
        getFacetCountsArrarr: function(d) {
            var c = [];
            for (var b = 0, a = this.manager.response.facet_counts[d][this.field].length; b < a; b++) {
                c.push({
                    facet: this.manager.response.facet_counts[d][this.field][b][0],
                    count: parseInt(this.manager.response.facet_counts[d][this.field][b][1])
                })
            }
            return c
        },
        getFacetCountsFlat: function(d) {
            var c = [];
            for (var b = 0, a = this.manager.response.facet_counts[d][this.field].length; b < a; b += 2) {
                c.push({
                    facet: this.manager.response.facet_counts[d][this.field][b],
                    count: parseInt(this.manager.response.facet_counts[d][this.field][b + 1])
                })
            }
            return c
        },
        clickHandler: function(c) {
            var b = this,
                a = this.multivalue ? "add" : "set";
            return function() {
                if (b[a].call(b, c)) {
                    EntryManager.store.get("start").val("0");
                    MacromoleculesManager.store.get("f.molecule_name.facet.offset").val("0");
                    EntryManager.doRequest();
                    MacromoleculesManager.doRequest()
                }
                return false
            }
        },
        unclickHandler: function(b) {
            var a = this;
            return function() {
                if (a.remove(b)) {
                    EntryManager.doRequest();
                    MacromoleculesManager.doRequest();
                    PfamManager.doRequest()
                }
                return false
            }
        },
        fq: function(b, a) {
            return (a ? "-" : "") + this.field + ":" + AjaxSolr.Parameter.escapeValue(b)
        }
    })
}));
(function(a) {
    AjaxSolr.TagcloudWidget = AjaxSolr.AbstractFacetWidget.extend({
        afterRequest: function() {
            if (this.manager.response.facet_counts.facet_fields[this.field] === undefined) {
                a(this.target).html("no items found in current selection");
                return
            }
            var e = 0;
            var f = [];
            for (var g in this.manager.response.facet_counts.facet_fields[this.field]) {
                var d = parseInt(this.manager.response.facet_counts.facet_fields[this.field][g]);
                if (d > e) {
                    e = d
                }
                f.push({
                    facet: g,
                    count: d
                })
            }
            f.sort(function(i, h) {
                return i.facet < h.facet ? -1 : 1
            });
            a(this.target).empty();
            for (var c = 0, b = f.length; c < b; c++) {
                var g = f[c].facet;
                a(this.target).append(a('<a href="#" class="tagcloud_item"></a>').text(g).addClass("tagcloud_size_" + parseInt(f[c].count / e * 10)).click(this.clickHandler(g)))
            }
        }
    })
})(jQuery);
(function(a) {
    AjaxSolr.ListWidget = AjaxSolr.AbstractFacetWidget.extend({
        afterRequest: function() {
            if (this.manager.response.facet_counts.facet_fields[this.field] === undefined) {
                a(this.target).html("no items found in current selection");
                return
            }
            var e = 0;
            var k = [];
            for (var c in this.manager.response.facet_counts.facet_fields[this.field]) {
                var m = parseInt(this.manager.response.facet_counts.facet_fields[this.field][c]);
                k.push({
                    facet: c,
                    count: m
                })
            }
            var o = this;
            a(this.target).empty();
            var n = 0;
            for (var g = 0, f = k.length; g < f; g++) {
                var c = k[g].facet;
                var m = k[g].count;
                var d = ("" + m).length;
                a(this.target).parent().removeClass("cloud_size_0");
                if (this.field === "interacting_ligands") {
                    var j = c.split(" : ");
                    a(this.target).append(a('<span class="facet-count rcol_' + d + '">(' + m + ")</span>")).append(a('<label class="facet-label data-tooltip lcol_' + d + '" title="&lt;span style=&#34;font-weight:bold;font-size:85%&#34;&gt;' + j[1] + "&lt;/span&gt;&lt;br&gt;&lt;img src=&#34;http://www.ebi.ac.uk/pdbe-srv/pdbechem/image/showNew?code=" + j[0] + '&size=200&#34;&gt;">' + c + "</label>").click(o.clickHandler(c)));
                    jQuery(this.target + " .data-tooltip").each(function() {
                        jQuery(this).tooltip({
                            content: jQuery(this).attr("title"),
                            track: true
                        })
                    })
                } else {
                    a(this.target).append(a('<span class="facet-count rcol_' + d + '">(' + m + ")</span>")).append(a('<label class="facet-label data-tooltip lcol_' + d + '" title="' + c + '">' + c + "</label>").click(o.clickHandler(c)))
                }
                n += m
            }
            a("#entry_resolution").parent().removeClass("cloud_size_0");
            a("#entry_deposition_year").parent().removeClass("cloud_size_0");
            a("#entry_release_year").parent().removeClass("cloud_size_0");
            a(this.target).children(".tagcloud_item").after("<br/>");
            var h = a(this.target).prev().text().indexOf("(");
            var b = "";
            if (h > 0) {
                b = a(this.target).prev().text().substring(0, h)
            } else {
                b = a(this.target).prev().text()
            }
            if (k.length > 0) {
                a(this.target).prev().text(b + " (" + (k.length == 100 ? k.length + "+" : k.length) + ")")
            } else {
                a(this.target).parent().addClass("cloud_size_0");
                a(this.target).prev().text(b + " (0)")
            }
        }
    })
})(jQuery);
(function(a) {
    AjaxSolr.RangeGroupWidget = AjaxSolr.AbstractFacetWidget.extend({
        afterRequest: function() {
            if (this.manager.response.facet_counts.facet_ranges[this.field] == undefined) {
                a(this.target).html("no_items_found");
                return
            }
            var c = 0;
            var f = [];
            var b = this.manager.response.facet_counts.facet_ranges[this.field].start;
            var j = this.manager.response.facet_counts.facet_ranges[this.field].gap;
            var k = 0;
            for (var g in this.manager.response.facet_counts.facet_ranges[this.field].counts) {
                rangeStart = parseFloat(g);
                rangeEnd = parseFloat(g) + j;
                h = rangeStart + " TO " + rangeEnd;
                k++;
                facet = this.manager.response.facet_counts.facet_ranges[this.field];
                f.push({
                    label: h,
                    count: this.manager.response.facet_counts.facet_ranges[this.field].counts[g]
                })
            }
            f.sort(function(l, i) {
                return parseFloat(l.label) < parseFloat(i.label) ? -1 : 1
            });
            a(this.target).empty();
            for (var e = 0, d = f.length; e < d; e++) {
                var h = "[" + f[e].label + "]";
                a(this.target).append(a('<a href="#" class="tagcloud_item" style="display: block; clear: both;"></a><br />').text(h + " : " + f[e].count).click(this.clickHandler(h)))
            }
        },
        fq: function(c, b) {
            var d = c;
            return (b ? "-" : "") + this.field + ":" + d
        }
    })
})(jQuery);
var facetNames = {
    status: "Entry status",
    experimental_method: "Experimental method",
    molecule_type: "Molecule type",
    molecule_name: "Molecule",
    compound_name: "Compound name",
    gene_name: "Gene name",
    entry_authors: "Author name",
    all_authors: "Authors",
    superkingdom: "Superkingdom",
    genus: "Genus",
    organism_synonyms: "Organism synonym",
    organism_scientific_name: "Organism scientific name",
    ec_number: "EC number",
    biological_process: "Biological process",
    biological_function: "Biological function",
    biological_cell_component: "Cell component",
    assembly_composition: "Assembly composition",
    assembly_form: "Assembly form",
    assembly_type: "Assembly type",
    interacting_molecules: "Interacting molecule",
    interacting_ligands: "Interacting small molecule",
    citation_year: "Citation year",
    journal: "Journal",
    citation_authors: "Citation author",
    interpro_name: "Interpro name",
    pfam_name: "Pfam families",
    scop_class: "SCOP class",
    scop_family: "SCOP family",
    scop_fold: "SCOP fold",
    spacegroup: "Spacegroup",
    refinement_software: "Refinement software",
    beam_source_name: "Diffraction source",
    detector: "Diffraction detector",
    detector_type: "Detector type",
    diffraction_protocol: "Diffraction protocol",
    cath_class: "CATH class",
    cath_topology: "CATH topology",
    assembly_type: "Assembly type",
    ec_hierarchy_name: "Enzyme",
    pdb_id: "PDB code",
    beam_source_type: "Beam source type"
};
(function(a) {
    AjaxSolr.CurrentSearchWidget = AjaxSolr.AbstractWidget.extend({
        start: 0,
        afterRequest: function() {
            var n = this;
            var m = [];
            var d = this.manager.store.get("q").val();
            if (d != "*:*") {
                m.push(a('<a href="#" class="icon icon-functional" data-icon="x"></a>').text("" + d).click(function() {
                    EntryManager.store.get("q").val("*:*");
                    MacromoleculesManager.store.get("q").val("*:*");
                    PfamManager.store.get("q").val("*:*");
                    EntryManager.doRequest();
                    MacromoleculesManager.doRequest();
                    PfamManager.doRequest();
                    return false
                }))
            }
            var h = this.manager.store.values("fq");
            var o;
            for (var g = 0, f = h.length; g < f; g++) {
                if (h[g].match(/[\[\{]\S+ TO \S+[\]\}]/)) {
                    var j = h[g].match(/^\w+:/)[0];
                    var k = h[g].substr(j.length + 1, 10);
                    o = a('<span class="icon icon-functional" data-icon="x"></span>').text("" + j + k);
                    o = a("<span class='term-hotspot'></span>").click(n.removeFacet(h[g])).add(o);
                    m.push(o)
                } else {
                    var b = h[g];
                    var c = b.match(/(\S+)\:{1}(.+)/);
                    o = a('<span class="dark-icon icon-functional data-tooltip" data-icon="x" title="' + (facetNames[c[1]] !== undefined ? facetNames[c[1]] : "Free text") + '"></span>').text(c[2]);
                    o = a("<span class='term-hotspot'></span>").click(n.removeFacet(h[g])).add(o);
                    m.push(o)
                }
            }
            if (m.length >= 1) {
                o = a('<span class="dark-icon icon-functional" data-icon="R"></span>').text("Reset").add(o);
                m.unshift(o)
            }
            if (m.length) {
                var e = a(this.target);
                e.empty();
                for (var g = 0, f = m.length; g < f; g++) {
                    if (m.length > 1 && g === 0) {
                        e.append(a('<li class="remove_all"></li>').css({
                            cursor: "pointer"
                        }).click(function() {
                            jQuery(".search_refinement_box").css("display", "none");
                            jQuery(".tabs").css("display", "none");
                            jQuery(".facets").css("display", "none");
                            var i = History.getState();
                            i.url = "/pdbe/entry/search/index";
                            History.pushState(null, document.title, i.url);
                            return false
                        }).append(m[g]))
                    } else {
                        e.append(a("<li></li>").append(m[g]))
                    }
                }
            } else {
                a(this.target).html("<li>Viewing all documents!</li>");
                a("local-searchbox").val("")
            }
        },
        removeFacet: function(c) {
            var b = this;
            return function() {
                var d = History.getState();
                if (d.url.indexOf("&") >= 0) {
                    if (decodeURIComponent(d.url).indexOf("&" + c) >= 0) {
                        d.url = decodeURIComponent(d.url).replace("&" + c, "")
                    } else {
                        d.url = decodeURIComponent(d.url).replace(c + "&", "")
                    }
                } else {
                    d.url = decodeURIComponent(d.url).replace("?" + c, "")
                }
                History.pushState(null, document.title, decodeURIComponent(d.url));
                return false
            }
        }
    })
})(jQuery);
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["core/AbstractWidget"], a)
    } else {
        a()
    }
}(function() {
    AjaxSolr.AbstractTextWidget = AjaxSolr.AbstractWidget.extend({
        constructor: function(a) {
            AjaxSolr.AbstractTextWidget.__super__.constructor.apply(this, arguments);
            AjaxSolr.extend(this, {
                start: 0
            }, a)
        },
        set: function(a) {
            return this.changeSelection(function() {
                this.manager.store.get("q").val(a)
            })
        },
        clear: function() {
            return this.changeSelection(function() {
                this.manager.store.remove("q")
            })
        },
        changeSelection: function(a) {
            var b = this.manager.store.get("q").val();
            a.apply(this);
            var c = this.manager.store.get("q").val();
            if (c !== b) {
                this.afterChangeSelection(c)
            }
            return c !== b
        },
        afterChangeSelection: function(a) {},
        unclickHandler: function() {
            var a = this;
            return function() {
                if (a.clear()) {
                    a.doRequest()
                }
                return false
            }
        },
        clickHandler: function(b) {
            var a = this;
            return function() {
                if (a.set(b)) {
                    a.doRequest()
                }
                return false
            }
        }
    })
}));
var categories = {
    status: "Entry status",
    experimental_method: "Experimental method",
    molecule_type: "Molecule type",
    molecule_name: "Molecule",
    compound_name: "Compound name",
    gene_name: "Gene name",
    entry_authors: "Author name",
    all_authors: "Authors",
    superkingdom: "Superkingdom",
    genus: "Genus",
    organism_synonym: "Organism synonym",
    organism_scientific_name: "Organism scientific name",
    ec_number: "EC number",
    biological_process: "Biological process",
    biological_function: "Biological function",
    biological_cell_component: "Cell component",
    assembly_composition: "Assembly composition",
    assembly_form: "Assembly form",
    interacting_molecules: "Interacting molecule",
    interacting_ligands: "Interacting small molecule",
    citation_year: "Citation year",
    journal: "Journal",
    citation_authors: "Citation author",
    interpro_name: "Interpro name",
    pfam_name: "Pfam families",
    scop_class: "SCOP class",
    scop_family: "SCOP family",
    scop_fold: "SCOP fold",
    spacegroup: "Spacegroup",
    refinement_software: "Refinement software",
    beam_source_name: "Diffraction source",
    detector: "Diffraction detector",
    detector_type: "Detector type",
    diffraction_protocol: "Diffraction protocol",
    cath_class: "CATH class",
    cath_topology: "CATH topology",
    assembly_type: "Assembly type",
    ec_hierarchy_name: "Enzyme",
    pdb_id: "PDB code",
    beam_source_type: "Beam source type"
};
(function(a) {
    AjaxSolr.AutocompleteWidget = AjaxSolr.AbstractTextWidget.extend({
        constructor: function(b) {
            AjaxSolr.extend(this, {
                fields: [],
                flFields: [],
                sortFields: [],
                limit: 10,
                minLength: 3
            }, b)
        },
        init: function() {
            var b = this;
            if (!this.fields) {
                throw '"field" must be set on AutocompleteWidget.'
            }
            this.servlet = this.manager.solrUrl || this.manager.servlet;
            a(this.target).find("input").catcomplete({
                minLength: b.minLength,
                position: {
                    my: "right top",
                    at: "right bottom"
                },
                open: function(c, d) {},
                select: function(c, d) {
                    if (d.item) {
                        var e = d.item.field;
                        b.requestSent = true;
                        if (b.manager.store.addByValue("fq", e + ":" + AjaxSolr.Parameter.escapeValue(d.item.value))) {
                            EntryManager.store.addByValue("fq", e + ":" + AjaxSolr.Parameter.escapeValue(d.item.value));
                            EntryManager.doRequest()
                        }
                    }
                    a("#input").catcomplete("close")
                },
                source: function(g, e) {
                    var d = [];
                    if (b.manager.name == "autocompleteMan") {
                        d = ["rows=20000&json.nl=map&group=true&group.field=category&group.limit=15"]
                    } else {
                        for (var c in b.manager.pdbe_param_defaults) {
                            if (a.type(b.manager.pdbe_param_defaults[c]) === a.type([])) {
                                for (var h in b.manager.pdbe_param_defaults[c]) {
                                    d.push(c + "=" + b.manager.pdbe_param_defaults[c][h])
                                }
                            } else {
                                d.push(c + "=" + b.manager.pdbe_param_defaults[c])
                            }
                        }
                    }
                    var l = "";
                    for (var h = 0; h < b.flFields.length; h++) {
                        if (l === "") {
                            l = l + b.flFields[h]
                        } else {
                            l = l + "," + b.flFields[h]
                        }
                    }
                    if (l != "") {
                        d.push("fl=" + l)
                    }
                    var f = "";
                    for (var h = 0; h < b.sortFields.length; h++) {
                        if (f === "") {
                            f = f + b.sortFields[h]
                        } else {
                            f = f + "," + b.sortFields[h]
                        }
                    }
                    if (f != "") {
                        d.push("sort=" + f)
                    }
                    if (b.manager.name == "refineMan") {
                        var k = b.manager.store.get("fq");
                        for (var h = 0; h < k.length; h++) {
                            if (k[h].value != "undefined" && k[h].value != null) {
                                var j = k[h].value.match(/(\S+)\:{1}(.+)/);
                                j[2] = j[2].solrEscapeTerm();
                                d.push("fq=" + j[1] + ":" + j[2])
                            }
                        }
                    }
                    g.term = g.term.solrEscapeTerm();
                    if (b.manager.name == "autocompleteMan") {
                        console.log("request.term: " + g.term);
                        d.push("q=" + b.fields[0] + ":" + g.term);
						
						//CHANGED BY MELIS TRIED TO ADD AN AND TO JUST GET THE XRAY ONES BUT DID NOT WORK
					//	d.push("q=" + b.fields[0] + ":" + g.term + " AND text:X-ray*~10");
						
                    }
                    if (b.manager.name == "refineMan") {
                        d.push("facet.prefix=" + g.term)
                    }
                    if (b.manager.name == "autocompleteMan") {
                        b.manager.executeRequest("select", d.join("&"), function(r) {
                            var m = [];
                            for (var o = 0; o < r.grouped.category.groups.length; o++) {
                                var p = r.grouped.category.groups[o].groupValue;
                                for (var n = 0; n < r.grouped.category.groups[o].doclist.docs.length; n++) {
                                    var q = r.grouped.category.groups[o].doclist.docs[n].value;
                                    var s = r.grouped.category.groups[o].doclist.docs[n].var_name;
                                    var t = r.grouped.category.groups[o].doclist.docs[n].num_pdb_entries;
                                    m.push({
                                        label: "<span class='truncate-text data-tooltip' title='" + q.replace(/'/g, "&#39") + "'>" + q + "</span> <span class='item_count'>(" + t + ")</span>",
                                        value: q,
                                        category: p,
                                        var_name: s
                                    })
                                }
                            }
                            e(a.map(m, function(i) {
                                return i
                            }))
                        })
                    }
                    if (b.manager.name == "refineMan") {
                        b.manager.executeRequest("select", d.join("&"), function(o) {
                            var t = [];
                            for (var p in o.facet_counts.facet_fields) {
                                var m = p;
                                var i = categories[p];
                                var n = o.facet_counts.facet_fields[p];
                                for (var s in n) {
                                    var r = s;
                                    var q = n[s];
                                    t.push({
                                        label: "<span class='truncate-text data-tooltip' title='" + r.replace(/'/g, "&#39") + "'>" + r + "</span> <span class='item_count'>(" + q + ")</span>",
                                        value: r,
                                        category: i,
                                        var_name: m
                                    })
                                }
                            }
                            e(a.map(t, function(u) {
                                return u
                            }))
                        })
                    }
                }
            })
        }
    })
})(jQuery);
if (String.prototype.solrEscapeTerm == undefined) {
    String.prototype.solrEscapeTerm = function() {
        var a = this;
        a = a.replace(/[\\+\-\!\(\)\:\^\]\{\}\~\*\?]/g, "\\$&");
        if (a.match(/ /g) && a.match(/"^.*"$/) === null) {
            a = '"' + a + '*"~10'
        } else {
            a = a + "*~10"
        }
        return a
    }
}(function(b) {
    var a = function(f) {
        var c = {
                solrUrl: "http://wwwdev.ebi.ac.uk/pdbe/search/pdb/",
                pdbe_template_level: 1,
                pager_label: "displaying"
            },
            e;
        f.conf = b.extend(c, f.conf);
        e = new AjaxSolr.Manager(f.conf);
        e.addWidget(new AjaxSolr.ResultWidget({
            id: "result",
            target: "#" + f.dom_id + " .result_container",
            download_target: "#" + f.dom_id + " .download_container"
        }));
        e.addWidget(new AjaxSolr.NewPagerWidget({
            id: "pager",
            target1: "#" + f.dom_id + " .view_navigation:first .view_pager",
            target2: "#" + f.dom_id + " .view_navigation:last .view_pager",
            prevLabel: "&lt;",
            nextLabel: "&gt;",
            innerWindow: 1,
            outerWindow: 0,
            renderHeader: function(g, i, h) {
                b("#" + f.dom_id + " .view_navigation:first .view_header").html(b("<span></span>").text(f.conf.pager_label + " " + Math.min(h, i + 1) + " to " + Math.min(h, i + g) + " of " + h));
                b("#" + f.dom_id + " .view_navigation:last .view_header").html(b("<span></span>").text(f.conf.pager_label + " " + Math.min(h, i + 1) + " to " + Math.min(h, i + g) + " of " + h))
            }
        }));
        e.init();
        e.store.addByValue("q", "*:*");
        if (e.facet_pivot) {
            e.store.addByValue("facet.pivot", e.facet_pivot)
        }
        for (var d in f.params) {
            e.store.addByValue(d, f.params[d])
        }
        return e
    };
    b(function() {
        AutoCompleteManager = new AjaxSolr.Manager({
            solrUrl: "http://wwwdev.ebi.ac.uk/pdbe/search/pdb-autocomplete/",
            name: "autocompleteMan"
        });
        AutoCompleteManager.addWidget(new AjaxSolr.AutocompleteWidget({
            id: "text",
            target: "#search",
            fields: ["value"],
            flFields: ["value", "num_pdb_entries", "var_name"],
            sortFields: ["category+asc", "num_pdb_entries+desc"],
            limit: 30,
            minLength: 1
        }));
        AutoCompleteManager.init();
        AutoCompleteManager.store.addByValue("q", "*:*");
        var c, d = {
            group: true,
            "group.field": ["pdb_id"],
            "group.ngroups": true,
            "group.facet": true,
            facet: true,
            "facet.field": ["experimental_method", "entry_authors", "pfam_name", "superkingdom", "genus", "organism_scientific_name", "citation_year", "spacegroup", "biological_process", "biological_function", "biological_cell_component", "journal", "assembly_composition", "assembly_form", "assembly_type", "refinement_software", "detector", "detector_type", "diffraction_protocol", "molecule_name", "status", "ec_number", "cath_class", "cath_topology", "gene_name", "compound_name", "interpro_name", "scop_class", "scop_family", "scop_fold", "citation_authors", "interacting_molecules", "interacting_ligands", "molecule_type", "beam_source_name", "beam_source_type"],
            "facet.limit": 100,
            "facet.mincount": 1,
            "facet.sort": "count",
            "facet.range": ["deposition_year", "release_year", "resolution"],
            "f.deposition_year.facet.range.start": "1970",
            "f.deposition_year.facet.range.end": "2050",
            "f.deposition_year.facet.range.gap": "5",
            "f.release_year.facet.range.start": "1970",
            "f.release_year.facet.range.end": "2050",
            "f.release_year.facet.range.gap": "5",
            "f.resolution.facet.range.start": "0.0",
            "f.resolution.facet.range.end": "100",
            "f.resolution.facet.range.gap": "0.5",
            "f.deposition_year.facet.range.other": "between",
            "f.deposition_year.facet.range.include": "upper",
            "f.release_year.facet.range.other": "between",
            "f.release_year.facet.range.include": "upper",
            "f.resolution.facet.range.other": "between",
            "f.resolution.facet.range.include": "upper",
 			// "f.experimental_method.facet.field": "X-ray diffraction",
            "json.nl": "map"
        };

        for (c in d) {
            AutoCompleteManager.store.addByValue(c, d[c])
        }
    });
    b(function() {
        RefineManager = new AjaxSolr.Manager({
            solrUrl: "http://wwwdev.ebi.ac.uk/pdbe/search/pdb/",
            name: "refineMan",
            pdbe_param_defaults: {
                q: "*:*",
                group: true,
                "group.field": ["pdb_id"],
                "group.ngroups": true,
                "group.facet": true,
                facet: true,
                rows: 0,
                start: 0,
                "facet.limit": 100,
                "facet.mincount": 1,
                "facet.sort": "count",
                "json.nl": "map",
                "facet.field": ["pfam_name", "superkingdom", "genus", "organism_scientific_name", "biological_process", "biological_function", "biological_cell_component", "journal", "assembly_composition", "molecule_name", "ec_number", "cath_class", "cath_topology", "gene_name", "compound_name", "interpro_name", "scop_class", "scop_family", "scop_fold", "all_authors", "interacting_molecules", "interacting_ligands", "molecule_type"]
            }
        });
        RefineManager.addWidget(new AjaxSolr.AutocompleteWidget({
            id: "refine",
            target: "#refSearch",
            fields: ["text"]
        }));
        RefineManager.init()
    });
    b(function() {
        EntryFacetManager = new AjaxSolr.Manager({
            solrUrl: "http://wwwdev.ebi.ac.uk/pdbe/search/pdb/",
            name: "entryFacetMan"
        });
        var h, g, e, c = ["experimental_method", "entry_authors", "pfam_name", "superkingdom", "genus", "organism_scientific_name", "citation_year", "spacegroup", "biological_process", "biological_function", "biological_cell_component", "journal", "assembly_composition", "assembly_form", "assembly_type", "refinement_software", "beam_source_type", "detector", "detector_type", "diffraction_protocol", "molecule_name", "status", "ec_number", "cath_class", "cath_topology", "gene_name", "compound_name", "interpro_name", "scop_class", "scop_family", "scop_fold", "citation_authors", "interacting_molecules", "interacting_ligands", "molecule_type", "beam_source_name"];
        for (h = 0, e = c.length; h < e; h++) {
            EntryFacetManager.addWidget(new AjaxSolr.ListWidget({
                id: "entry_" + c[h],
                target: "#entry_" + c[h],
                field: c[h]
            }))
        }
        var d = ["deposition_year", "release_year", "resolution"];
        for (g = 0, e = d.length; g < e; g++) {
            EntryFacetManager.addWidget(new AjaxSolr.RangeGroupWidget({
                id: "entry_" + d[g],
                target: "#entry_" + d[g],
                field: d[g]
            }))
        }
        EntryFacetManager.addWidget(new AjaxSolr.CurrentSearchWidget({
            id: "currentsearch",
            target: "#selection"
        }));
        EntryFacetManager.init();
        EntryFacetManager.store.addByValue("q", "*:*");
        var k = {
            group: true,
            "group.field": ["pdb_id"],
            "group.ngroups": true,
            "group.facet": true,
            facet: true,
            rows: 0,
            "facet.field": ["experimental_method", "entry_authors", "pfam_name", "superkingdom", "genus", "organism_scientific_name", "citation_year", "spacegroup", "biological_process", "biological_function", "biological_cell_component", "journal", "assembly_composition", "assembly_form", "assembly_type", "refinement_software", "detector", "detector_type", "diffraction_protocol", "molecule_name", "status", "ec_number", "cath_class", "cath_topology", "gene_name", "compound_name", "interpro_name", "scop_class", "scop_family", "scop_fold", "citation_authors", "interacting_molecules", "interacting_ligands", "molecule_type", "beam_source_name", "beam_source_type"],
            "facet.limit": 100,
            "facet.mincount": 1,
            "facet.sort": "count",
            "facet.range": ["deposition_year", "release_year", "resolution"],
            "f.deposition_year.facet.range.start": "1970",
            "f.deposition_year.facet.range.end": "2050",
            "f.deposition_year.facet.range.gap": "5",
            "f.release_year.facet.range.start": "1970",
            "f.release_year.facet.range.end": "2050",
            "f.release_year.facet.range.gap": "5",
            "f.resolution.facet.range.start": "0.0",
            "f.resolution.facet.range.end": "100",
            "f.resolution.facet.range.gap": "0.5",
            "f.deposition_year.facet.range.other": "between",
            "f.deposition_year.facet.range.include": "upper",
            "f.release_year.facet.range.other": "between",
            "f.release_year.facet.range.include": "upper",
            "f.resolution.facet.range.other": "between",
            "f.resolution.facet.range.include": "upper",
			// "f.experimental_method.facet.field": "X-ray diffraction",
            "json.nl": "map"
        };
        for (var f in k) {
            EntryFacetManager.store.addByValue(f, k[f])
        }
    });
    EntryManager = a({
        dom_id: "entry_result",
        conf: {
            name: "entryMan",
            pager_label: "Entry"
        },
        params: {
            group: true,
            "group.field": ["pdb_id"],
            "group.ngroups": true,
			fq: ["experimental_method"],
            fl: ["pdb_id", "citation_title", "citation_authors", "title", "experimental_method", "entry_authors", "pubmed_id", "citation_year", "journal", "organism_scientific_name", "assembly_composition", "interacting_ligands", "tax_id", "resolution", "status", "release_date", "prefered_assembly_id"],
            //fl: ["pdb_id", "experimental_method", "interacting_ligands", "tax_id", "resolution", "status", "release_date", "prefered_assembly_id"],
		    "json.nl": "map"
        }
    });
    MacromoleculesManager = a({
        dom_id: "macromolecules_result",
        conf: {
            name: "macromoleculesMan",
            pdbe_template_level: 2,
            pdbe_template_handler: "level2TemplateMin",
            facet_pivot: ["molecule_name", "pivot_resolution", "entry_entity"],
            pager_label: "Macromolecule"
        },
        params: {
            group: true,
            "group.field": ["pdb_id"],
            "group.ngroups": true,
            "group.facet": true,
            "facet.pivot.mincount": 1,
            "facet.sort": "pivot_resolution+asc",
            "facet.field": "molecule_name",
            facet: true,
            "f.molecule_name.facet.limit": 10,
            "f.molecule_name.facet.offset": "0",
            rows: "0",
            "facet.limit": 20000,
            "facet.mincount": 1,
            "json.nl": "map"
        }
    });
    CompoundManager = a({
        dom_id: "compound_result",
        conf: {
            name: "compoundMan",
            pdbe_template_level: 3,
            pdbe_template_handler: "level3TemplateMin",
            pdbe_image_template: "compound_image_meta",
            pdbe_interaction: "Interacting with",
            pdbe_label: "Compound",
            pdbe_label_style: "break_all",
            pdbe_subject_template: "compound_url_meta",
            facet_pivot: ["interacting_ligands", "molecule_name", "pivot_resolution", "entry_entity"],
            pager_label: "Interaction"
        },
        params: {
            group: true,
            "group.field": ["pdb_id"],
            "group.ngroups": true,
            "group.facet": true,
            "facet.pivot.mincount": 1,
            "facet.sort": "pivot_resolution+asc",
            "facet.field": "interacting_ligands",
            facet: true,
            "f.interacting_ligands.facet.limit": 10,
            "f.interacting_ligands.facet.offset": "0",
            rows: "0",
            "facet.limit": 10,
            "facet.mincount": 1,
            "json.nl": "map"
        }
    });
    SequenceFamilyManager = a({
        dom_id: "sequencefam_result",
        conf: {
            name: "sequencefamilyMan",
            pdbe_template_level: 3,
            pdbe_template_handler: "level3TemplateMin",
            pdbe_image_template: "pfam_image_meta",
            pdbe_interaction: "Occurring in macromolecule",
            pdbe_label: "Protein family",
            pdbe_label_style: "break_all",
            pdbe_subject_template: "pfam_url_meta",
            facet_pivot: ["pfam_name", "molecule_name", "pivot_resolution", "entry_entity"],
            pager_label: "Protein family"
        },
        params: {
            group: true,
            "group.field": ["pdb_id"],
            "group.ngroups": true,
            "group.facet": true,
            "facet.pivot.mincount": 1,
            "facet.sort": "pivot_resolution+asc",
            "facet.field": "pfam_name",
            facet: true,
            "f.pfam_name.facet.limit": 10,
            "f.pfam_name.facet.offset": "0",
            rows: "0",
            "facet.limit": 10,
            "facet.mincount": 1,
            "json.nl": "map"
        }
    });
    b.fn.showIf = function(c) {
        if (c) {
            return this.show()
        } else {
            return this.hide()
        }
    }
})(jQuery);
var originalTitle = document.title;
var History = window.History;
jQuery(function() {
    History.Adapter.bind(window, "statechange", function() {
        updateDataFromState(History.getState())
    });
    updateDataFromState(History.getState())
});
jQuery.widget("custom.catcomplete", jQuery.ui.autocomplete, {
    numToShow: 10,
    numInColumn: 30,
    columnContentCounter: 0,
    _resizeMenu: function() {
        this.menu.element.css({
            margin: "0 5%",
            padding: "0"
        });
        this.menu.element.addClass("container_pdbe pdbe_search_autocomplete")
    },
    _renderMenu: function(f, g) {
        var e = this,
            i = "";
        var d = [];
        var a = 0;
        var c = "";
        var h = 0;
        var b = g.length;
        f.append("<li name='test'><div class='search_top'>");
        jQuery.each(g, function(j, k) {
            if (k.category != i) {
                if (e.columnContentCounter >= e.numToShow || h > 1) {
                    f.find("div[data-type*='category'][data-category*='" + i + "']").append("<div data-type='more' class='more_controller grid_24 ui-state-disabled' data-category='" + i + "'>More...</div>")
                }
                e.columnContentCounter = 0;
                h = 0;
                f.find(".search_top").append("<div data-type='category' data-category='" + k.category + "' class='grid_6 reset_100'><div id='" + k.category + "'><h3 style='margin-bottom: 0;'> " + k.category + "</h3></div></div>");
                i = k.category
            }
            if (e.columnContentCounter === 0) {
                h++;
                f.find("div[data-type*='category'][data-category*='" + k.category + "']").append("<div data-type='column' data-category='" + k.category + "' data-column='" + h + "' class='grid_24'></div>");
                e._renderItemData(f.find("div[data-category*='" + k.category + "'][data-column*='" + h + "']"), k);
                e.columnContentCounter++
            } else {
                if (e.columnContentCounter < e.numInColumn && e.columnContentCounter != 0) {
                    e._renderItemData(f.find("div[data-category*='" + k.category + "'][data-column*='" + h + "']"), k);
                    e.columnContentCounter++
                }
            }
            if (e.columnContentCounter === e.numInColumn) {
                h++;
                f.find("div[data-type*='category'][data-category*='" + k.category + "']").append("<div data-type='column' data-category='" + k.category + "' data-column='" + h + "' class='grid_24 data-hidden'></div>");
                e._renderItemData(f.find("div[data-category*='" + k.category + "'][data-column*='" + h + "']"), k);
                e.columnContentCounter = 1
            }
            if (j === b) {
                if (e.columnContentCounter >= e.numToShow || h > 0) {
                    f.find("div[data-type*='category'][data-category*='" + i + "']").append("<div data-type='more' class='more_controller grid_24 ui-state-disabled' data-category='" + i + "'>More...</div>")
                }
            }
        });
        f.append("</div></li>");
        f.find("div[data-type='more']").unbind();
        f.off("click");
        f.find("a").on("click", function(l) {
            l.preventDefault();
            jQuery(".data-tooltip").each(function(n, o) {
                jQuery(o).tooltip("destroy")
            });
            if ((window.location.href).indexOf("entry/search") < 0) {
				
				//CHANGED BY MELIS 1- THE LINK FROM PDBE TO OUR HTML 2- ADDED IN THE LINK TH EEXPERIMENTAL METHOD TO FILTER IN ONLY THE XRAY STRUCTURES
				
                window.location.href = "index_pdb_list.html?" + "experimental_method:\"X-ray diffraction\"&" + jQuery(this).attr("data-varname") + ":" + AjaxSolr.Parameter.escapeValue(jQuery(this).attr("value"));
				
				//var result_string =  jQuery(this).attr("data-varname") + ":" + AjaxSolr.Parameter.escapeValue(jQuery(this).attr("value"));
					
                return false
            }
            if (jQuery(this).attr("data-varname") == "pdb_id") {
                window.location.href = "/pdbe/entry/pdb/" + jQuery(this).attr("value");
                return false
            }
            var k = History.getState();
            if ((k.url).indexOf(jQuery(this).attr("data-varname") + ":" + AjaxSolr.Parameter.escapeValue(jQuery(this).attr("value"))) >= 0) {} else {
                var m = "";
                if (e.element[0].id === "local-searchbox") {
                    if ((k.url).indexOf("?") >= 0) {
                        var j = (k.url).split("?");
                        m = j[0] + "?" + jQuery(this).attr("data-varname") + ":" + AjaxSolr.Parameter.escapeValue(jQuery(this).attr("value"))
                    } else {
                        m = (k.url) + "?" + jQuery(this).attr("data-varname") + ":" + AjaxSolr.Parameter.escapeValue(jQuery(this).attr("value"))
                    }
                } else {
                    if ((k.url).indexOf("?") >= 0) {
                        m = (k.url) + "&" + jQuery(this).attr("data-varname") + ":" + AjaxSolr.Parameter.escapeValue(jQuery(this).attr("value"))
                    } else {
                        m = (k.url) + "?" + jQuery(this).attr("data-varname") + ":" + AjaxSolr.Parameter.escapeValue(jQuery(this).attr("value"))
                    }
                }
                History.pushState(null, document.title, m)
            }
            jQuery("#local-searchbox").val("");
            jQuery(".search_refinement_box").css("display", "block");
            jQuery("#refine").val("")
        });
        f.find('div[data-type*="more"]').on("click", function() {
            var j = jQuery(this).parent().attr("data-category");
            if (jQuery(this).text() === "More...") {
                jQuery(this).parent().removeClass("grid_6");
                jQuery(this).parent().addClass("grid_24");
                jQuery(this).parent().children().removeClass("data-hidden");
                jQuery(this).parent().parent().children().each(function() {
                    if (jQuery(this).attr("data-category") != j) {
                        jQuery(this).addClass("data-hidden")
                    }
                });
                jQuery(this).text("Less...")
            } else {
                jQuery(this).parent().removeClass("grid_24");
                jQuery(this).parent().addClass("grid_6 reset_100");
                jQuery(this).parent().children().each(function(k) {
                    if (k === 0) {} else {
                        if (k === 1) {} else {
                            jQuery(this).addClass("data-hidden")
                        }
                    }
                });
                jQuery(this).parent().parent().children().each(function() {
                    jQuery(this).removeClass("data-hidden")
                });
                jQuery(this).text("More...");
                jQuery(this).removeClass("data-hidden")
            }
        });
        jQuery(".data-tooltip").each(function(j, k) {
            jQuery(k).tooltip({
                content: jQuery(k).attr("title"),
                track: true
            })
        })
    },
    _renderItem: function(c, b) {
        var a = this;
        if (a.columnContentCounter < a.numToShow) {
			//console.log(b.category+"\t"+b.var_name +"\t"+ b.label);
            return c.append("<div class='ui-menu-item ' role='menuitem'><a href='' value='" + b.value.replace(/'/g, "&#39") + "' data-category='" + b.category + "' data-varname='" + b.var_name + "'>" + b.label + "</a></div>")
        } else {
			//console.log(b.category+"\t"+b.var_name +"\t"+ b.label);
            return c.append("<div class='ui-menu-item data-hidden' role='menuitem'><a href='' value='" + b.value.replace(/'/g, "&#39") + "' data-category='" + b.category + "' data-varname='" + b.var_name + "'>" + b.label + "</a></div>")
        }
    },
    _renderItemData: function(a, c) {
        var b = this;
        return b._renderItem(a, c).data("ui-autocomplete-item", c)
    }
});
jQuery("#local-searchbox").bind("enterKey", function(c) {
    if (jQuery("#local-searchbox").val() !== "") {
        jQuery(".data-tooltip").each(function(f, g) {
            jQuery(g).tooltip("destroy")
        });
        if ((window.location.href).indexOf("entry/search") < 0) {
            window.location.href = "index_pdb_list.html?text:" + jQuery("#local-searchbox").val();
            return false
        }
        var b = History.getState();
        if ((b.url).indexOf("text:" + jQuery("#local-searchbox").val()) >= 0) {} else {
            var d = "";
            if ((b.url).indexOf("?") >= 0) {
                var a = (b.url).split("?");
                d = a[0] + "?text:" + jQuery("#local-searchbox").val()
            } else {
                d = (b.url) + "?text:" + jQuery("#local-searchbox").val()
            }
            History.pushState(null, document.title, d)
        }
        jQuery(".search_refinement_box").css("display", "block");
        jQuery("#local-searchbox").val("");
        jQuery("input").catcomplete();
        jQuery("input").catcomplete("close")
    }
});
jQuery("#refine").bind("enterKey", function(b) {
    if (jQuery("#refine").val() === "") {} else {
        jQuery(".data-tooltip").each(function(d, f) {
            jQuery(f).tooltip("destroy")
        });
        var a = History.getState();
        if ((a.url).indexOf("text:*" + jQuery("#refine").val() + "*") >= 0) {} else {
            var c = "";
            if ((a.url).indexOf("?") >= 0) {
                c = (a.url) + "&text:*" + jQuery("#refine").val() + "*"
            } else {
                c = (a.url) + "?text:*" + jQuery("#refine").val() + "*"
            }
            History.pushState(null, document.title, c)
        }
        jQuery("#refine").val("");
        jQuery("#local-searchbox").val("");
        jQuery("input").catcomplete();
        jQuery("input").catcomplete("close")
    }
});
jQuery(document).ready(function() {
    jQuery("#local-searchbox").keydown(function(a) {
        if (a.keyCode === 13) {
            a.preventDefault();
            jQuery(this).trigger("enterKey");
            return false
        }
    });
    jQuery("#refine").keydown(function(a) {
        if (a.keyCode === 13) {
            a.preventDefault();
            jQuery(this).trigger("enterKey");
            return false
        }
    })
});

function selectView(a) {
    var c = History.getState();
    var d = "";
    if ((c.url).indexOf("?") >= 0) {
        if ((c.url).indexOf("?view=") >= 0 || (c.url).indexOf("&view=") >= 0) {
            if ((c.url).indexOf("&") >= 0) {
                if ((c.url).indexOf("?view=") >= 0) {
                    d = (c.url).replace(/view=.+?&/, "view=" + a + "&")
                } else {
                    if (/&view=.+?&/.test(c.url)) {
                        d = (c.url).replace(/&view=.+?&/, "&view=" + a + "&")
                    } else {
                        d = (c.url).replace(/&view=.+/, "&view=" + a)
                    }
                }
            } else {
                var b = c.url.split("?")[0];
                d = b + "?view=" + a
            }
        } else {
            d = (c.url) + "&view=" + a
        }
    } else {
        d = (c.url) + "?view=" + a
    }
    History.pushState(null, document.title, d)
}

function updateDataFromState(h) {
    var e = false,
        g = false,
        a = decodeURIComponent(h.url),
        b = "",
        c = h.url.match(/[\?\&]?(view=([a-zA-Z_]+))&?/),
        f = h.url.match(/[\?\&]?[^\.](sort=([a-zA-Z_\+]+))&?/),
        d = function(l) {
            var j, m;
            if (a.indexOf("?") >= 0) {
                b = (a.split("?"))[1];
                m = b.split("&");
                for (var k = 0; k < m.length; k++) {
                    if (m[k].indexOf(":") >= 0) {
                        g = true;
                        j = m[k].match(/(\S+)\:{1}(.+)/);
                        if (j[2].match(/[ \\+\-\!\(\)\:\^\]\{\}\~\*\?]/g) && j[2].match(/^".*"$/) === null) {
                            j[2] = '"' + j[2] + '"'
                        }
                        l.store.addByValue("fq", j[1] + ":" + AjaxSolr.Parameter.escapeValue(j[2]));
                        RefineManager.store.addByValue("fq", j[1] + ":" + AjaxSolr.Parameter.escapeValue(j[2]));
                        EntryFacetManager.store.addByValue("fq", j[1] + ":" + AjaxSolr.Parameter.escapeValue(j[2]))
                    }
                    if (m[k].indexOf("sort=") >= 0 && m[k].indexOf("facet.sort=") == -1) {
                        jQuery("#sort").val((m[k].split("="))[1])
                    }
                }
            }
        },
        i = function(j) {
            if (g) {
                EntryFacetManager.doRequest();
                j.doRequest();
                jQuery(".facets").css("display", "block");
                jQuery(".tabs").css("display", "block");
                jQuery(".search_refinement_box").css("display", "block")
            } else {
                resetSearch();
                jQuery(".tabs").css("display", "none");
                jQuery(".facets").css("display", "none");
                jQuery(".search_refinement_box").css("display", "none")
            }
            jQuery(".tabs").find("ul:first li").each(function(l, m) {
                m = jQuery(m);
                var k = m.find("span").data("view");
                if (!m.hasClass("active") && c === k) {
                    jQuery(".tabs").find("ul:first li.active").removeClass("active");
                    m.addClass("active");
                    m.trigger("click")
                }
            })
        };
    c = c != null ? c[2] : "entry";
    f = f != null ? f[2] : null;
    RefineManager.store.remove("fq");
    AutoCompleteManager.store.remove("fq");
    EntryFacetManager.store.remove("fq");
    switch (c) {
        case "entry":
            EntryManager.store.get("q").val("*:*");
            EntryManager.store.remove("fq");
            d(EntryManager);
            EntryManager.store.get("start").val("0");
            if (f) {
                EntryManager.store.remove("sort");
                EntryManager.store.addByValue("sort", f)
            }
            i(EntryManager);
            break;
        case "macromolecules":
            MacromoleculesManager.store.get("q").val("*:*");
            MacromoleculesManager.store.remove("fq");
            d(MacromoleculesManager);
            MacromoleculesManager.store.get("f.molecule_name.facet.offset").val("0");
            MacromoleculesManager.store.addByValue("fq", "status:REL");
            i(MacromoleculesManager);
            break;
        case "compounds":
            CompoundManager.store.get("q").val("*:*");
            CompoundManager.store.remove("fq");
            d(CompoundManager);
            CompoundManager.store.get("f.interacting_ligands.facet.offset").val("0");
            CompoundManager.store.addByValue("fq", "status:REL");
            i(CompoundManager);
            break;
        case "sequencefam":
            SequenceFamilyManager.store.get("q").val("*:*");
            SequenceFamilyManager.store.remove("fq");
            d(SequenceFamilyManager);
            SequenceFamilyManager.store.get("f.pfam_name.facet.offset").val("0");
            SequenceFamilyManager.store.addByValue("fq", "status:REL");
            i(SequenceFamilyManager);
            break;
        default:
            break
    }
    jQuery("input").catcomplete();
    jQuery("input").catcomplete("close")
}

function resetSearch() {
    jQuery(".facet_section").addClass("cloud_size_0");
    jQuery(".download_container").html("");
    jQuery(".view_pager").html("");
    jQuery(".result_container").html("");
    jQuery("#selection").html("");
    jQuery("#local-searchbox").val("");
    jQuery("#refine").val("")
}

function handleSearchClick() {
    if (jQuery("#local-searchbox").val() === "") {} else {
        jQuery(".data-tooltip").each(function(c, d) {
            jQuery(d).tooltip("destroy")
        });
        if ((window.location.href).indexOf("entry/search") < 0) {
            window.location.href = "index_pdb_list.html?text:" + jQuery("#local-searchbox").val();
            return false
        }
        AutoCompleteManager.store.addByValue("fq", "text:" + jQuery("#local-searchbox").val());
        var a = History.getState();
        if ((a.url).indexOf("text:" + jQuery("#local-searchbox").val()) >= 0) {} else {
            var b = "";
            if ((a.url).indexOf("?") >= 0) {
                b = (a.url) + "&text:" + jQuery("#local-searchbox").val()
            } else {
                b = (a.url) + "?text:" + jQuery("#local-searchbox").val()
            }
            History.pushState(null, document.title, b)
        }
        jQuery("input").catcomplete();
        jQuery("input").catcomplete("close");
        return false
    }
}

function handleSort(g) {
    var b = History.getState();
    if (b.url.indexOf("?") > 0) {
        if (b.url.indexOf("?sort=") > 0 || b.url.indexOf("&sort=") > 0) {
            var f = [];
            var a = b.url.split("?");
            var e = a[1].split("&");
            for (var c = 0; c < e.length; c++) {
                if (e[c].indexOf("sort=") >= 0 && e[c].indexOf("facet.sort=") == -1) {
                    f.push("sort=" + g)
                } else {
                    f.push(e[c])
                }
            }
            var d = a[0] + "?" + f.join("&");
            History.pushState(null, document.title, d)
        } else {
            var d = b.url + "&sort=" + g;
            History.pushState(null, document.title, d)
        }
    } else {}
};
typeof JSON != "object" && (JSON = {}),
    function() {
        function f(e) {
            return e < 10 ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                var t = meta[e];
                return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var n, r, i, s, o = gap,
                u, a = t[e];
            a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
            switch (typeof a) {
                case "string":
                    return quote(a);
                case "number":
                    return isFinite(a) ? String(a) : "null";
                case "boolean":
                case "null":
                    return String(a);
                case "object":
                    if (!a) {
                        return "null"
                    }
                    gap += indent, u = [];
                    if (Object.prototype.toString.apply(a) === "[object Array]") {
                        s = a.length;
                        for (n = 0; n < s; n += 1) {
                            u[n] = str(n, a) || "null"
                        }
                        return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                    }
                    if (rep && typeof rep == "object") {
                        s = rep.length;
                        for (n = 0; n < s; n += 1) {
                            typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                        }
                    } else {
                        for (r in a) {
                            Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                        }
                    }
                    return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
            }
        }
        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function(e) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(e) {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        typeof JSON.stringify != "function" && (JSON.stringify = function(e, t, n) {
            var r;
            gap = "", indent = "";
            if (typeof n == "number") {
                for (r = 0; r < n; r += 1) {
                    indent += " "
                }
            } else {
                typeof n == "string" && (indent = n)
            }
            rep = t;
            if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") {
                return str("", {
                    "": e
                })
            }
            throw new Error("JSON.stringify")
        }), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
            function walk(e, t) {
                var n, r, i = e[t];
                if (i && typeof i == "object") {
                    for (n in i) {
                        Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n])
                    }
                }
                return reviver.call(e, t, i)
            }
            var j;
            text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        })
    }(),
    function(c, a) {
        var d = c.History = c.History || {},
            b = c.jQuery;
        if (typeof d.Adapter != "undefined") {
            throw new Error("History.js Adapter has already been loaded...")
        }
        d.Adapter = {
            bind: function(g, f, h) {
                b(g).bind(f, h)
            },
            trigger: function(g, f, h) {
                b(g).trigger(f, h)
            },
            extractEventData: function(h, j, g) {
                var f = j && j.originalEvent && j.originalEvent[h] || g && g[h] || a;
                return f
            },
            onDomLoad: function(f) {
                b(f)
            }
        }, typeof d.init != "undefined" && d.init()
    }(window),
    function(f, b) {
        var h = f.document,
            d = f.setTimeout || d,
            a = f.clearTimeout || a,
            c = f.setInterval || c,
            g = f.History = f.History || {};
        if (typeof g.initHtml4 != "undefined") {
            throw new Error("History.js HTML4 Support has already been loaded...")
        }
        g.initHtml4 = function() {
            if (typeof g.initHtml4.initialized != "undefined") {
                return !1
            }
            g.initHtml4.initialized = !0, g.enabled = !0, g.savedHashes = [], g.isLastHash = function(j) {
                var i = g.getHashByIndex(),
                    k;
                return k = j === i, k
            }, g.isHashEqual = function(j, i) {
                return j = encodeURIComponent(j).replace(/%25/g, "%"), i = encodeURIComponent(i).replace(/%25/g, "%"), j === i
            }, g.saveHash = function(i) {
                return g.isLastHash(i) ? !1 : (g.savedHashes.push(i), !0)
            }, g.getHashByIndex = function(j) {
                var i = null;
                return typeof j == "undefined" ? i = g.savedHashes[g.savedHashes.length - 1] : j < 0 ? i = g.savedHashes[g.savedHashes.length + j] : i = g.savedHashes[j], i
            }, g.discardedHashes = {}, g.discardedStates = {}, g.discardState = function(m, k, o) {
                var l = g.getHashByState(m),
                    j;
                return j = {
                    discardedState: m,
                    backState: o,
                    forwardState: k
                }, g.discardedStates[l] = j, !0
            }, g.discardHash = function(k, i, l) {
                var j = {
                    discardedHash: k,
                    backState: l,
                    forwardState: i
                };
                return g.discardedHashes[k] = j, !0
            }, g.discardedState = function(j) {
                var i = g.getHashByState(j),
                    k;
                return k = g.discardedStates[i] || !1, k
            }, g.discardedHash = function(j) {
                var i = g.discardedHashes[j] || !1;
                return i
            }, g.recycleState = function(j) {
                var i = g.getHashByState(j);
                return g.discardedState(j) && delete g.discardedStates[i], !0
            }, g.emulated.hashChange && (g.hashChangeInit = function() {
                g.checkerFunction = null;
                var l = "",
                    m, k, j, e, n = Boolean(g.getHash());
                return g.isInternetExplorer() ? (m = "historyjs-iframe", k = h.createElement("iframe"), k.setAttribute("id", m), k.setAttribute("src", "#"), k.style.display = "none", h.body.appendChild(k), k.contentWindow.document.open(), k.contentWindow.document.close(), j = "", e = !1, g.checkerFunction = function() {
                    if (e) {
                        return !1
                    }
                    e = !0;
                    var o = g.getHash(),
                        i = g.getHash(k.contentWindow.document);
                    return o !== l ? (l = o, i !== o && (j = i = o, k.contentWindow.document.open(), k.contentWindow.document.close(), k.contentWindow.document.location.hash = g.escapeHash(o)), g.Adapter.trigger(f, "hashchange")) : i !== j && (j = i, n && i === "" ? g.back() : g.setHash(i, !1)), e = !1, !0
                }) : g.checkerFunction = function() {
                    var i = g.getHash() || "";
                    return i !== l && (l = i, g.Adapter.trigger(f, "hashchange")), !0
                }, g.intervalList.push(c(g.checkerFunction, g.options.hashChangeInterval)), !0
            }, g.Adapter.onDomLoad(g.hashChangeInit)), g.emulated.pushState && (g.onHashChange = function(l) {
                var p = l && l.newURL || g.getLocationHref(),
                    o = g.getHashByUrl(p),
                    k = null,
                    m = null,
                    j = null,
                    e;
                return g.isLastHash(o) ? (g.busy(!1), !1) : (g.doubleCheckComplete(), g.saveHash(o), o && g.isTraditionalAnchor(o) ? (g.Adapter.trigger(f, "anchorchange"), g.busy(!1), !1) : (k = g.extractState(g.getFullUrl(o || g.getLocationHref()), !0), g.isLastSavedState(k) ? (g.busy(!1), !1) : (m = g.getHashByState(k), e = g.discardedState(k), e ? (g.getHashByIndex(-2) === g.getHashByState(e.forwardState) ? g.back(!1) : g.forward(!1), !1) : (g.pushState(k.data, k.title, encodeURI(k.url), !1), !0))))
            }, g.Adapter.bind(f, "hashchange", g.onHashChange), g.pushState = function(w, j, e, m) {
                e = encodeURI(e).replace(/%25/g, "%");
                if (g.getHashByUrl(e)) {
                    throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).")
                }
                if (m !== !1 && g.busy()) {
                    return g.pushQueue({
                        scope: g,
                        callback: g.pushState,
                        args: arguments,
                        queue: m
                    }), !1
                }
                g.busy(!0);
                var x = g.createStateObject(w, j, e),
                    v = g.getHashByState(x),
                    q = g.getState(!1),
                    o = g.getHashByState(q),
                    k = g.getHash(),
                    p = g.expectedStateId == x.id;
                return g.storeState(x), g.expectedStateId = x.id, g.recycleState(x), g.setTitle(x), v === o ? (g.busy(!1), !1) : (g.saveState(x), p || g.Adapter.trigger(f, "statechange"), !g.isHashEqual(v, k) && !g.isHashEqual(v, g.getShortUrl(g.getLocationHref())) && g.setHash(v, !1), g.busy(!1), !0)
            }, g.replaceState = function(v, j, e, m) {
                e = encodeURI(e).replace(/%25/g, "%");
                if (g.getHashByUrl(e)) {
                    throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).")
                }
                if (m !== !1 && g.busy()) {
                    return g.pushQueue({
                        scope: g,
                        callback: g.replaceState,
                        args: arguments,
                        queue: m
                    }), !1
                }
                g.busy(!0);
                var w = g.createStateObject(v, j, e),
                    q = g.getHashByState(w),
                    p = g.getState(!1),
                    o = g.getHashByState(p),
                    k = g.getStateByIndex(-2);
                return g.discardState(p, w, k), q === o ? (g.storeState(w), g.expectedStateId = w.id, g.recycleState(w), g.setTitle(w), g.saveState(w), g.Adapter.trigger(f, "statechange"), g.busy(!1)) : g.pushState(w.data, w.title, w.url, !1), !0
            }), g.emulated.pushState && g.getHash() && !g.emulated.hashChange && g.Adapter.onDomLoad(function() {
                g.Adapter.trigger(f, "hashchange")
            })
        }, typeof g.init != "undefined" && g.init()
    }(window),
    function(x, C) {
        var k = x.console || C,
            b = x.document,
            q = x.navigator,
            D = !1,
            j = x.setTimeout,
            B = x.clearTimeout,
            A = x.setInterval,
            w = x.clearInterval,
            m = x.JSON,
            z = x.alert,
            v = x.History = x.History || {},
            g = x.history;
        try {
            D = x.sessionStorage, D.setItem("TEST", "1"), D.removeItem("TEST")
        } catch (y) {
            D = !1
        }
        m.stringify = m.stringify || m.encode, m.parse = m.parse || m.decode;
        if (typeof v.init != "undefined") {
            throw new Error("History.js Core has already been loaded...")
        }
        v.init = function(a) {
            return typeof v.Adapter == "undefined" ? !1 : (typeof v.initCore != "undefined" && v.initCore(), typeof v.initHtml4 != "undefined" && v.initHtml4(), !0)
        }, v.initCore = function(e) {
            if (typeof v.initCore.initialized != "undefined") {
                return !1
            }
            v.initCore.initialized = !0, v.options = v.options || {}, v.options.hashChangeInterval = v.options.hashChangeInterval || 100, v.options.safariPollInterval = v.options.safariPollInterval || 500, v.options.doubleCheckInterval = v.options.doubleCheckInterval || 500, v.options.disableSuid = v.options.disableSuid || !1, v.options.storeInterval = v.options.storeInterval || 1000, v.options.busyDelay = v.options.busyDelay || 250, v.options.debug = v.options.debug || !1, v.options.initialTitle = v.options.initialTitle || b.title, v.options.html4Mode = v.options.html4Mode || !1, v.options.delayInit = v.options.delayInit || !1, v.intervalList = [], v.clearAllIntervals = function() {
                var f, d = v.intervalList;
                if (typeof d != "undefined" && d !== null) {
                    for (f = 0; f < d.length; f++) {
                        w(d[f])
                    }
                    v.intervalList = null
                }
            }, v.debug = function() {
                (v.options.debug || !1) && v.log.apply(v, arguments)
            }, v.log = function() {
                var E = typeof k != "undefined" && typeof k.log != "undefined" && typeof k.log.apply != "undefined",
                    n = b.getElementById("log"),
                    l, p, F, h, d;
                E ? (h = Array.prototype.slice.call(arguments), l = h.shift(), typeof k.debug != "undefined" ? k.debug.apply(k, [l, h]) : k.log.apply(k, [l, h])) : l = "\n" + arguments[0] + "\n";
                for (p = 1, F = arguments.length; p < F; ++p) {
                    d = arguments[p];
                    if (typeof d == "object" && typeof m != "undefined") {
                        try {
                            d = m.stringify(d)
                        } catch (r) {}
                    }
                    l += "\n" + d + "\n"
                }
                return n ? (n.value += l + "\n-----\n", n.scrollTop = n.scrollHeight - n.clientHeight) : E || z(l), !0
            }, v.getInternetExplorerMajorVersion = function() {
                var d = v.getInternetExplorerMajorVersion.cached = typeof v.getInternetExplorerMajorVersion.cached != "undefined" ? v.getInternetExplorerMajorVersion.cached : function() {
                    var h = 3,
                        f = b.createElement("div"),
                        i = f.getElementsByTagName("i");
                    while ((f.innerHTML = "<!--[if gt IE " + ++h + "]><i></i><![endif]-->") && i[0]) {}
                    return h > 4 ? h : !1
                }();
                return d
            }, v.isInternetExplorer = function() {
                var d = v.isInternetExplorer.cached = typeof v.isInternetExplorer.cached != "undefined" ? v.isInternetExplorer.cached : Boolean(v.getInternetExplorerMajorVersion());
                return d
            }, v.options.html4Mode ? v.emulated = {
                pushState: !0,
                hashChange: !0
            } : v.emulated = {
                pushState: !Boolean(x.history && x.history.pushState && x.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(q.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(q.userAgent)),
                hashChange: Boolean(!("onhashchange" in x || "onhashchange" in b) || v.isInternetExplorer() && v.getInternetExplorerMajorVersion() < 8)
            }, v.enabled = !v.emulated.pushState, v.bugs = {
                setHash: Boolean(!v.emulated.pushState && q.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(q.userAgent)),
                safariPoll: Boolean(!v.emulated.pushState && q.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(q.userAgent)),
                ieDoubleCheck: Boolean(v.isInternetExplorer() && v.getInternetExplorerMajorVersion() < 8),
                hashEscape: Boolean(v.isInternetExplorer() && v.getInternetExplorerMajorVersion() < 7)
            }, v.isEmptyObject = function(f) {
                for (var d in f) {
                    if (f.hasOwnProperty(d)) {
                        return !1
                    }
                }
                return !0
            }, v.cloneObject = function(f) {
                var d, h;
                return f ? (d = m.stringify(f), h = m.parse(d)) : h = {}, h
            }, v.getRootUrl = function() {
                var d = b.location.protocol + "//" + (b.location.hostname || b.location.host);
                if (b.location.port || !1) {
                    d += ":" + b.location.port
                }
                return d += "/", d
            }, v.getBaseHref = function() {
                var f = b.getElementsByTagName("base"),
                    d = null,
                    h = "";
                return f.length === 1 && (d = f[0], h = d.href.replace(/[^\/]+$/, "")), h = h.replace(/\/+$/, ""), h && (h += "/"), h
            }, v.getBaseUrl = function() {
                var d = v.getBaseHref() || v.getBasePageUrl() || v.getRootUrl();
                return d
            }, v.getPageUrl = function() {
                var f = v.getState(!1, !1),
                    d = (f || {}).url || v.getLocationHref(),
                    h;
                return h = d.replace(/\/+$/, "").replace(/[^\/]+$/, function(l, i, o) {
                    return /\./.test(l) ? l : l + "/"
                }), h
            }, v.getBasePageUrl = function() {
                var d = v.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(h, f, i) {
                    return /[^\/]$/.test(h) ? "" : h
                }).replace(/\/+$/, "") + "/";
                return d
            }, v.getFullUrl = function(h, d) {
                var i = h,
                    f = h.substring(0, 1);
                return d = typeof d == "undefined" ? !0 : d, /[a-z]+\:\/\//.test(h) || (f === "/" ? i = v.getRootUrl() + h.replace(/^\/+/, "") : f === "#" ? i = v.getPageUrl().replace(/#.*/, "") + h : f === "?" ? i = v.getPageUrl().replace(/[\?#].*/, "") + h : d ? i = v.getBaseUrl() + h.replace(/^(\.\/)+/, "") : i = v.getBasePageUrl() + h.replace(/^(\.\/)+/, "")), i.replace(/\#$/, "")
            }, v.getShortUrl = function(h) {
                var d = h,
                    i = v.getBaseUrl(),
                    f = v.getRootUrl();
                return v.emulated.pushState && (d = d.replace(i, "")), d = d.replace(f, "/"), v.isTraditionalAnchor(d) && (d = "./" + d), d = d.replace(/^(\.\/)+/g, "./").replace(/\#$/, ""), d
            }, v.getLocationHref = function(d) {
                return d = d || b, d.URL === d.location.href ? d.location.href : d.location.href === decodeURIComponent(d.URL) ? d.URL : d.location.hash && decodeURIComponent(d.location.href.replace(/^[^#]+/, "")) === d.location.hash ? d.location.href : d.URL.indexOf("#") == -1 && d.location.href.indexOf("#") != -1 ? d.location.href : d.URL || d.location.href
            }, v.store = {}, v.idToState = v.idToState || {}, v.stateToId = v.stateToId || {}, v.urlToId = v.urlToId || {}, v.storedStates = v.storedStates || [], v.savedStates = v.savedStates || [], v.normalizeStore = function() {
                v.store.idToState = v.store.idToState || {}, v.store.urlToId = v.store.urlToId || {}, v.store.stateToId = v.store.stateToId || {}
            }, v.getState = function(f, d) {
                typeof f == "undefined" && (f = !0), typeof d == "undefined" && (d = !0);
                var h = v.getLastSavedState();
                return !h && d && (h = v.createStateObject()), f && (h = v.cloneObject(h), h.url = h.cleanUrl || h.url), h
            }, v.getIdByState = function(f) {
                var d = v.extractId(f.url),
                    h;
                if (!d) {
                    h = v.getStateString(f);
                    if (typeof v.stateToId[h] != "undefined") {
                        d = v.stateToId[h]
                    } else {
                        if (typeof v.store.stateToId[h] != "undefined") {
                            d = v.store.stateToId[h]
                        } else {
                            for (;;) {
                                d = (new Date).getTime() + String(Math.random()).replace(/\D/g, "");
                                if (typeof v.idToState[d] == "undefined" && typeof v.store.idToState[d] == "undefined") {
                                    break
                                }
                            }
                            v.stateToId[h] = d, v.idToState[d] = f
                        }
                    }
                }
                return d
            }, v.normalizeState = function(f) {
                var d, h;
                if (!f || typeof f != "object") {
                    f = {}
                }
                if (typeof f.normalized != "undefined") {
                    return f
                }
                if (!f.data || typeof f.data != "object") {
                    f.data = {}
                }
                return d = {}, d.normalized = !0, d.title = f.title || "", d.url = v.getFullUrl(f.url ? f.url : v.getLocationHref()), d.hash = v.getShortUrl(d.url), d.data = v.cloneObject(f.data), d.id = v.getIdByState(d), d.cleanUrl = d.url.replace(/\??\&_suid.*/, ""), d.url = d.cleanUrl, h = !v.isEmptyObject(d.data), (d.title || h) && v.options.disableSuid !== !0 && (d.hash = v.getShortUrl(d.url).replace(/\??\&_suid.*/, ""), /\?/.test(d.hash) || (d.hash += "?"), d.hash += "&_suid=" + d.id), d.hashedUrl = v.getFullUrl(d.hash), (v.emulated.pushState || v.bugs.safariPoll) && v.hasUrlDuplicate(d) && (d.url = d.hashedUrl), d
            }, v.createStateObject = function(h, d, i) {
                var f = {
                    data: h,
                    title: d,
                    url: i
                };
                return f = v.normalizeState(f), f
            }, v.getStateById = function(d) {
                d = String(d);
                var f = v.idToState[d] || v.store.idToState[d] || C;
                return f
            }, v.getStateString = function(h) {
                var d, i, f;
                return d = v.normalizeState(h), i = {
                    data: d.data,
                    title: h.title,
                    url: h.url
                }, f = m.stringify(i), f
            }, v.getStateId = function(f) {
                var d, h;
                return d = v.normalizeState(f), h = d.id, h
            }, v.getHashByState = function(f) {
                var d, h;
                return d = v.normalizeState(f), h = d.hash, h
            }, v.extractId = function(l) {
                var f, o, h, d;
                return l.indexOf("#") != -1 ? d = l.split("#")[0] : d = l, o = /(.*)\&_suid=([0-9]+)$/.exec(d), h = o ? o[1] || l : l, f = o ? String(o[2] || "") : "", f || !1
            }, v.isTraditionalAnchor = function(f) {
                var d = !/[\/\?\.]/.test(f);
                return d
            }, v.extractState = function(l, f) {
                var o = null,
                    h, d;
                return f = f || !1, h = v.extractId(l), h && (o = v.getStateById(h)), o || (d = v.getFullUrl(l), h = v.getIdByUrl(d) || !1, h && (o = v.getStateById(h)), !o && f && !v.isTraditionalAnchor(l) && (o = v.createStateObject(null, null, d))), o
            }, v.getIdByUrl = function(d) {
                var f = v.urlToId[d] || v.store.urlToId[d] || C;
                return f
            }, v.getLastSavedState = function() {
                return v.savedStates[v.savedStates.length - 1] || C
            }, v.getLastStoredState = function() {
                return v.storedStates[v.storedStates.length - 1] || C
            }, v.hasUrlDuplicate = function(f) {
                var d = !1,
                    h;
                return h = v.extractState(f.url), d = h && h.id !== f.id, d
            }, v.storeState = function(d) {
                return v.urlToId[d.url] = d.id, v.storedStates.push(v.cloneObject(d)), d
            }, v.isLastSavedState = function(l) {
                var f = !1,
                    o, h, d;
                return v.savedStates.length && (o = l.id, h = v.getLastSavedState(), d = h.id, f = o === d), f
            }, v.saveState = function(d) {
                return v.isLastSavedState(d) ? !1 : (v.savedStates.push(v.cloneObject(d)), !0)
            }, v.getStateByIndex = function(f) {
                var d = null;
                return typeof f == "undefined" ? d = v.savedStates[v.savedStates.length - 1] : f < 0 ? d = v.savedStates[v.savedStates.length + f] : d = v.savedStates[f], d
            }, v.getCurrentIndex = function() {
                var d = null;
                return v.savedStates.length < 1 ? d = 0 : d = v.savedStates.length - 1, d
            }, v.getHash = function(f) {
                var d = v.getLocationHref(f),
                    h;
                return h = v.getHashByUrl(d), h
            }, v.unescapeHash = function(f) {
                var d = v.normalizeHash(f);
                return d = decodeURIComponent(d), d
            }, v.normalizeHash = function(f) {
                var d = f.replace(/[^#]*#/, "").replace(/#.*/, "");
                return d
            }, v.setHash = function(h, f) {
                var l, d;
                return f !== !1 && v.busy() ? (v.pushQueue({
                    scope: v,
                    callback: v.setHash,
                    args: arguments,
                    queue: f
                }), !1) : (v.busy(!0), l = v.extractState(h, !0), l && !v.emulated.pushState ? v.pushState(l.data, l.title, l.url, !1) : v.getHash() !== h && (v.bugs.setHash ? (d = v.getPageUrl(), v.pushState(null, null, d + "#" + h, !1)) : b.location.hash = h), v)
            }, v.escapeHash = function(d) {
                var f = v.normalizeHash(d);
                return f = x.encodeURIComponent(f), v.bugs.hashEscape || (f = f.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), f
            }, v.getHashByUrl = function(f) {
                var d = String(f).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
                return d = v.unescapeHash(d), d
            }, v.setTitle = function(h) {
                var f = h.title,
                    l;
                f || (l = v.getStateByIndex(0), l && l.url === h.url && (f = l.title || v.options.initialTitle));
                try {
                    b.getElementsByTagName("title")[0].innerHTML = f.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
                } catch (d) {}
                return b.title = f, v
            }, v.queues = [], v.busy = function(f) {
                typeof f != "undefined" ? v.busy.flag = f : typeof v.busy.flag == "undefined" && (v.busy.flag = !1);
                if (!v.busy.flag) {
                    B(v.busy.timeout);
                    var d = function() {
                        var i, l, h;
                        if (v.busy.flag) {
                            return
                        }
                        for (i = v.queues.length - 1; i >= 0; --i) {
                            l = v.queues[i];
                            if (l.length === 0) {
                                continue
                            }
                            h = l.shift(), v.fireQueueItem(h), v.busy.timeout = j(d, v.options.busyDelay)
                        }
                    };
                    v.busy.timeout = j(d, v.options.busyDelay)
                }
                return v.busy.flag
            }, v.busy.flag = !1, v.fireQueueItem = function(d) {
                return d.callback.apply(d.scope || v, d.args || [])
            }, v.pushQueue = function(d) {
                return v.queues[d.queue || 0] = v.queues[d.queue || 0] || [], v.queues[d.queue || 0].push(d), v
            }, v.queue = function(f, d) {
                return typeof f == "function" && (f = {
                    callback: f
                }), typeof d != "undefined" && (f.queue = d), v.busy() ? v.pushQueue(f) : v.fireQueueItem(f), v
            }, v.clearQueue = function() {
                return v.busy.flag = !1, v.queues = [], v
            }, v.stateChanged = !1, v.doubleChecker = !1, v.doubleCheckComplete = function() {
                return v.stateChanged = !0, v.doubleCheckClear(), v
            }, v.doubleCheckClear = function() {
                return v.doubleChecker && (B(v.doubleChecker), v.doubleChecker = !1), v
            }, v.doubleCheck = function(d) {
                return v.stateChanged = !1, v.doubleCheckClear(), v.bugs.ieDoubleCheck && (v.doubleChecker = j(function() {
                    return v.doubleCheckClear(), v.stateChanged || d(), !0
                }, v.options.doubleCheckInterval)), v
            }, v.safariStatePoll = function() {
                var d = v.extractState(v.getLocationHref()),
                    f;
                if (!v.isLastSavedState(d)) {
                    return f = d, f || (f = v.createStateObject()), v.Adapter.trigger(x, "popstate"), v
                }
                return
            }, v.back = function(d) {
                return d !== !1 && v.busy() ? (v.pushQueue({
                    scope: v,
                    callback: v.back,
                    args: arguments,
                    queue: d
                }), !1) : (v.busy(!0), v.doubleCheck(function() {
                    v.back(!1)
                }), g.go(-1), !0)
            }, v.forward = function(d) {
                return d !== !1 && v.busy() ? (v.pushQueue({
                    scope: v,
                    callback: v.forward,
                    args: arguments,
                    queue: d
                }), !1) : (v.busy(!0), v.doubleCheck(function() {
                    v.forward(!1)
                }), g.go(1), !0)
            }, v.go = function(f, d) {
                var h;
                if (f > 0) {
                    for (h = 1; h <= f; ++h) {
                        v.forward(d)
                    }
                } else {
                    if (!(f < 0)) {
                        throw new Error("History.go: History.go requires a positive or negative integer passed.")
                    }
                    for (h = -1; h >= f; --h) {
                        v.back(d)
                    }
                }
                return v
            };
            if (v.emulated.pushState) {
                var c = function() {};
                v.pushState = v.pushState || c, v.replaceState = v.replaceState || c
            } else {
                v.onPopState = function(f, u) {
                    var l = !1,
                        d = !1,
                        h, p;
                    return v.doubleCheckComplete(), h = v.getHash(), h ? (p = v.extractState(h || v.getLocationHref(), !0), p ? v.replaceState(p.data, p.title, p.url, !1) : (v.Adapter.trigger(x, "anchorchange"), v.busy(!1)), v.expectedStateId = !1, !1) : (l = v.Adapter.extractEventData("state", f, u) || !1, l ? d = v.getStateById(l) : v.expectedStateId ? d = v.getStateById(v.expectedStateId) : d = v.extractState(v.getLocationHref()), d || (d = v.createStateObject(null, null, v.getLocationHref())), v.expectedStateId = !1, v.isLastSavedState(d) ? (v.busy(!1), !1) : (v.storeState(d), v.saveState(d), v.setTitle(d), v.Adapter.trigger(x, "statechange"), v.busy(!1), !0))
                }, v.Adapter.bind(x, "popstate", v.onPopState), v.pushState = function(f, o, l, d) {
                    if (v.getHashByUrl(l) && v.emulated.pushState) {
                        throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).")
                    }
                    if (d !== !1 && v.busy()) {
                        return v.pushQueue({
                            scope: v,
                            callback: v.pushState,
                            args: arguments,
                            queue: d
                        }), !1
                    }
                    v.busy(!0);
                    var h = v.createStateObject(f, o, l);
                    return v.isLastSavedState(h) ? v.busy(!1) : (v.storeState(h), v.expectedStateId = h.id, g.pushState(h.id, h.title, h.url), v.Adapter.trigger(x, "popstate")), !0
                }, v.replaceState = function(f, o, l, d) {
                    if (v.getHashByUrl(l) && v.emulated.pushState) {
                        throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).")
                    }
                    if (d !== !1 && v.busy()) {
                        return v.pushQueue({
                            scope: v,
                            callback: v.replaceState,
                            args: arguments,
                            queue: d
                        }), !1
                    }
                    v.busy(!0);
                    var h = v.createStateObject(f, o, l);
                    return v.isLastSavedState(h) ? v.busy(!1) : (v.storeState(h), v.expectedStateId = h.id, g.replaceState(h.id, h.title, h.url), v.Adapter.trigger(x, "popstate")), !0
                }
            }
            if (D) {
                try {
                    v.store = m.parse(D.getItem("History.store")) || {}
                } catch (a) {
                    v.store = {}
                }
                v.normalizeStore()
            } else {
                v.store = {}, v.normalizeStore()
            }
            v.Adapter.bind(x, "unload", v.clearAllIntervals), v.saveState(v.storeState(v.extractState(v.getLocationHref(), !0))), D && (v.onUnload = function() {
                var l, f, o;
                try {
                    l = m.parse(D.getItem("History.store")) || {}
                } catch (h) {
                    l = {}
                }
                l.idToState = l.idToState || {}, l.urlToId = l.urlToId || {}, l.stateToId = l.stateToId || {};
                for (f in v.idToState) {
                    if (!v.idToState.hasOwnProperty(f)) {
                        continue
                    }
                    l.idToState[f] = v.idToState[f]
                }
                for (f in v.urlToId) {
                    if (!v.urlToId.hasOwnProperty(f)) {
                        continue
                    }
                    l.urlToId[f] = v.urlToId[f]
                }
                for (f in v.stateToId) {
                    if (!v.stateToId.hasOwnProperty(f)) {
                        continue
                    }
                    l.stateToId[f] = v.stateToId[f]
                }
                v.store = l, v.normalizeStore(), o = m.stringify(l);
                try {
                    D.setItem("History.store", o)
                } catch (d) {
                    if (d.code !== DOMException.QUOTA_EXCEEDED_ERR) {
                        throw d
                    }
                    D.length && (D.removeItem("History.store"), D.setItem("History.store", o))
                }
            }, v.intervalList.push(A(v.onUnload, v.options.storeInterval)), v.Adapter.bind(x, "beforeunload", v.onUnload), v.Adapter.bind(x, "unload", v.onUnload));
            if (!v.emulated.pushState) {
                v.bugs.safariPoll && v.intervalList.push(A(v.safariStatePoll, v.options.safariPollInterval));
                if (q.vendor === "Apple Computer, Inc." || (q.appCodeName || "") === "Mozilla") {
                    v.Adapter.bind(x, "hashchange", function() {
                        v.Adapter.trigger(x, "popstate")
                    }), v.getHash() && v.Adapter.onDomLoad(function() {
                        v.Adapter.trigger(x, "hashchange")
                    })
                }
            }
        }, (!v.options || !v.options.delayInit) && v.init()
    }(window);
/*! nanoScrollerJS - v0.8.0 - (c) 2014 James Florentino; Licensed MIT */

! function(a, b, c) {
    "use strict";
    var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F;
    x = {
        paneClass: "nano-pane",
        sliderClass: "nano-slider",
        contentClass: "nano-content",
        iOSNativeScrolling: !1,
        preventPageScrolling: !1,
        disableResize: !1,
        alwaysVisible: !1,
        flashDelay: 1500,
        sliderMinHeight: 20,
        sliderMaxHeight: null,
        documentContext: null,
        windowContext: null
    }, s = "scrollbar", r = "scroll", k = "mousedown", l = "mousemove", n = "mousewheel", m = "mouseup", q = "resize", h = "drag", u = "up", p = "panedown", f = "DOMMouseScroll", g = "down", v = "wheel", i = "keydown", j = "keyup", t = "touchmove", d = "Microsoft Internet Explorer" === b.navigator.appName && /msie 7./i.test(b.navigator.appVersion) && b.ActiveXObject, e = null, B = b.requestAnimationFrame, w = b.cancelAnimationFrame, D = c.createElement("div").style, F = function() {
        var a, b, c, d, e, f;
        for (d = ["t", "webkitT", "MozT", "msT", "OT"], a = e = 0, f = d.length; f > e; a = ++e)
            if (c = d[a], b = d[a] + "ransform", b in D) return d[a].substr(0, d[a].length - 1);
        return !1
    }(), E = function(a) {
        return F === !1 ? !1 : "" === F ? a : F + a.charAt(0).toUpperCase() + a.substr(1)
    }, C = E("transform"), z = C !== !1, y = function() {
        var a, b, d;
        return a = c.createElement("div"), b = a.style, b.position = "absolute", b.width = "100px", b.height = "100px", b.overflow = r, b.top = "-9999px", c.body.appendChild(a), d = a.offsetWidth - a.clientWidth, c.body.removeChild(a), d
    }, A = function() {
        var a, c, d;
        return c = b.navigator.userAgent, (a = /(?=.+Mac OS X)(?=.+Firefox)/.test(c)) ? (d = /Firefox\/\d{2}\./.exec(c), d && (d = d[0].replace(/\D+/g, "")), a && +d > 23) : !1
    }, o = function() {
        function i(d, f) {
            this.el = d, this.options = f, e || (e = y()), this.$el = a(this.el), this.doc = a(this.options.documentContext || c), this.win = a(this.options.windowContext || b), this.$content = this.$el.children("." + f.contentClass), this.$content.attr("tabindex", this.options.tabIndex || 0), this.content = this.$content[0], this.previousPosition = 0, this.options.iOSNativeScrolling && null != this.el.style.WebkitOverflowScrolling ? this.nativeScrolling() : this.generate(), this.createEvents(), this.addEvents(), this.reset()
        }
        return i.prototype.preventScrolling = function(a, b) {
            if (this.isActive)
                if (a.type === f)(b === g && a.originalEvent.detail > 0 || b === u && a.originalEvent.detail < 0) && a.preventDefault();
                else if (a.type === n) {
                if (!a.originalEvent || !a.originalEvent.wheelDelta) return;
                (b === g && a.originalEvent.wheelDelta < 0 || b === u && a.originalEvent.wheelDelta > 0) && a.preventDefault()
            }
        }, i.prototype.nativeScrolling = function() {
            this.$content.css({
                WebkitOverflowScrolling: "touch"
            }), this.iOSNativeScrolling = !0, this.isActive = !0
        }, i.prototype.updateScrollValues = function() {
            var a, b;
            a = this.content, this.maxScrollTop = a.scrollHeight - a.clientHeight, this.prevScrollTop = this.contentScrollTop || 0, this.contentScrollTop = a.scrollTop, b = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same", this.previousPosition = this.contentScrollTop, "same" !== b && this.$el.trigger("update", {
                position: this.contentScrollTop,
                maximum: this.maxScrollTop,
                direction: b
            }), this.iOSNativeScrolling || (this.maxSliderTop = this.paneHeight - this.sliderHeight, this.sliderTop = 0 === this.maxScrollTop ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop)
        }, i.prototype.setOnScrollStyles = function() {
            var a;
            z ? (a = {}, a[C] = "translate(0, " + this.sliderTop + "px)") : a = {
                top: this.sliderTop
            }, B ? this.scrollRAF || (this.scrollRAF = B(function(b) {
                return function() {
                    b.scrollRAF = null, b.slider.css(a)
                }
            }(this))) : this.slider.css(a)
        }, i.prototype.createEvents = function() {
            this.events = {
                down: function(a) {
                    return function(b) {
                        return a.isBeingDragged = !0, a.offsetY = b.pageY - a.slider.offset().top, a.pane.addClass("active"), a.doc.bind(l, a.events[h]).bind(m, a.events[u]), !1
                    }
                }(this),
                drag: function(a) {
                    return function(b) {
                        return a.sliderY = b.pageY - a.$el.offset().top - a.offsetY, a.scroll(), a.contentScrollTop >= a.maxScrollTop && a.prevScrollTop !== a.maxScrollTop ? a.$el.trigger("scrollend") : 0 === a.contentScrollTop && 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"), !1
                    }
                }(this),
                up: function(a) {
                    return function() {
                        return a.isBeingDragged = !1, a.pane.removeClass("active"), a.doc.unbind(l, a.events[h]).unbind(m, a.events[u]), !1
                    }
                }(this),
                resize: function(a) {
                    return function() {
                        a.reset()
                    }
                }(this),
                panedown: function(a) {
                    return function(b) {
                        return a.sliderY = (b.offsetY || b.originalEvent.layerY) - .5 * a.sliderHeight, a.scroll(), a.events.down(b), !1
                    }
                }(this),
                scroll: function(a) {
                    return function(b) {
                        a.updateScrollValues(), a.isBeingDragged || (a.iOSNativeScrolling || (a.sliderY = a.sliderTop, a.setOnScrollStyles()), null != b && (a.contentScrollTop >= a.maxScrollTop ? (a.options.preventPageScrolling && a.preventScrolling(b, g), a.prevScrollTop !== a.maxScrollTop && a.$el.trigger("scrollend")) : 0 === a.contentScrollTop && (a.options.preventPageScrolling && a.preventScrolling(b, u), 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"))))
                    }
                }(this),
                wheel: function(a) {
                    return function(b) {
                        var c;
                        if (null != b) return c = b.delta || b.wheelDelta || b.originalEvent && b.originalEvent.wheelDelta || -b.detail || b.originalEvent && -b.originalEvent.detail, c && (a.sliderY += -c / 3), a.scroll(), !1
                    }
                }(this)
            }
        }, i.prototype.addEvents = function() {
            var a;
            this.removeEvents(), a = this.events, this.options.disableResize || this.win.bind(q, a[q]), this.iOSNativeScrolling || (this.slider.bind(k, a[g]), this.pane.bind(k, a[p]).bind("" + n + " " + f, a[v])), this.$content.bind("" + r + " " + n + " " + f + " " + t, a[r])
        }, i.prototype.removeEvents = function() {
            var a;
            a = this.events, this.win.unbind(q, a[q]), this.iOSNativeScrolling || (this.slider.unbind(), this.pane.unbind()), this.$content.unbind("" + r + " " + n + " " + f + " " + t, a[r])
        }, i.prototype.generate = function() {
            var a, c, d, f, g, h, i;
            return f = this.options, h = f.paneClass, i = f.sliderClass, a = f.contentClass, (g = this.$el.children("." + h)).length || g.children("." + i).length || this.$el.append('<div class="' + h + '"><div class="' + i + '" /></div>'), this.pane = this.$el.children("." + h), this.slider = this.pane.find("." + i), 0 === e && A() ? (d = b.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/\D+/g, ""), c = {
                right: -14,
                paddingRight: +d + 14
            }) : e && (c = {
                right: -e
            }, this.$el.addClass("has-scrollbar")), null != c && this.$content.css(c), this
        }, i.prototype.restore = function() {
            this.stopped = !1, this.iOSNativeScrolling || this.pane.show(), this.addEvents()
        }, i.prototype.reset = function() {
            var a, b, c, f, g, h, i, j, k, l, m, n;
            return this.iOSNativeScrolling ? void(this.contentHeight = this.content.scrollHeight) : (this.$el.find("." + this.options.paneClass).length || this.generate().stop(), this.stopped && this.restore(), a = this.content, f = a.style, g = f.overflowY, d && this.$content.css({
                height: this.$content.height()
            }), b = a.scrollHeight + e, l = parseInt(this.$el.css("max-height"), 10), l > 0 && (this.$el.height(""), this.$el.height(a.scrollHeight > l ? l : a.scrollHeight)), i = this.pane.outerHeight(!1), k = parseInt(this.pane.css("top"), 10), h = parseInt(this.pane.css("bottom"), 10), j = i + k + h, n = Math.round(j / b * j), n < this.options.sliderMinHeight ? n = this.options.sliderMinHeight : null != this.options.sliderMaxHeight && n > this.options.sliderMaxHeight && (n = this.options.sliderMaxHeight), g === r && f.overflowX !== r && (n += e), this.maxSliderTop = j - n, this.contentHeight = b, this.paneHeight = i, this.paneOuterHeight = j, this.sliderHeight = n, this.slider.height(n), this.events.scroll(), this.pane.show(), this.isActive = !0, a.scrollHeight === a.clientHeight || this.pane.outerHeight(!0) >= a.scrollHeight && g !== r ? (this.pane.hide(), this.isActive = !1) : this.el.clientHeight === a.scrollHeight && g === r ? this.slider.hide() : this.slider.show(), this.pane.css({
                opacity: this.options.alwaysVisible ? 1 : "",
                visibility: this.options.alwaysVisible ? "visible" : ""
            }), c = this.$content.css("position"), ("static" === c || "relative" === c) && (m = parseInt(this.$content.css("right"), 10), m && this.$content.css({
                right: "",
                marginRight: m
            })), this)
        }, i.prototype.scroll = function() {
            return this.isActive ? (this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), this.$content.scrollTop((this.paneHeight - this.contentHeight + e) * this.sliderY / this.maxSliderTop * -1), this.iOSNativeScrolling || (this.updateScrollValues(), this.setOnScrollStyles()), this) : void 0
        }, i.prototype.scrollBottom = function(a) {
            return this.isActive ? (this.$content.scrollTop(this.contentHeight - this.$content.height() - a).trigger(n), this.stop().restore(), this) : void 0
        }, i.prototype.scrollTop = function(a) {
            return this.isActive ? (this.$content.scrollTop(+a).trigger(n), this.stop().restore(), this) : void 0
        }, i.prototype.scrollTo = function(a) {
            return this.isActive ? (this.scrollTop(this.$el.find(a).get(0).offsetTop), this) : void 0
        }, i.prototype.stop = function() {
            return w && this.scrollRAF && (w(this.scrollRAF), this.scrollRAF = null), this.stopped = !0, this.removeEvents(), this.iOSNativeScrolling || this.pane.hide(), this
        }, i.prototype.destroy = function() {
            return this.stopped || this.stop(), !this.iOSNativeScrolling && this.pane.length && this.pane.remove(), d && this.$content.height(""), this.$content.removeAttr("tabindex"), this.$el.hasClass("has-scrollbar") && (this.$el.removeClass("has-scrollbar"), this.$content.css({
                right: ""
            })), this
        }, i.prototype.flash = function() {
            return !this.iOSNativeScrolling && this.isActive ? (this.reset(), this.pane.addClass("flashed"), setTimeout(function(a) {
                return function() {
                    a.pane.removeClass("flashed")
                }
            }(this), this.options.flashDelay), this) : void 0
        }, i
    }(), a.fn.nanoScroller = function(b) {
        return this.each(function() {
            var c, d;
            if ((d = this.nanoscroller) || (c = a.extend({}, x, b), this.nanoscroller = d = new o(this, c)), b && "object" == typeof b) {
                if (a.extend(d.options, b), null != b.scrollBottom) return d.scrollBottom(b.scrollBottom);
                if (null != b.scrollTop) return d.scrollTop(b.scrollTop);
                if (b.scrollTo) return d.scrollTo(b.scrollTo);
                if ("bottom" === b.scroll) return d.scrollBottom(0);
                if ("top" === b.scroll) return d.scrollTop(0);
                if (b.scroll && b.scroll instanceof a) return d.scrollTo(b.scroll);
                if (b.stop) return d.stop();
                if (b.destroy) return d.destroy();
                if (b.flash) return d.flash()
            }
            return d.reset()
        })
    }, a.fn.nanoScroller.Constructor = o
}(jQuery, window, document);
//# sourceMappingURL=jquery.nanoscroller.min.map