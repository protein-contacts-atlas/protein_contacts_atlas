if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(c, d) {
        var b, e = Object(this),
            a = e.length >>> 0,
            f = +d || 0;
        if (this === null) {
            throw new TypeError('"this" is null or not defined');
        }
        if (a === 0) {
            return -1;
        }
        if (Math.abs(f) === Infinity) {
            f = 0;
        }
        if (f >= a) {
            return -1;
        }
        b = Math.max(f >= 0 ? f : a - Math.abs(f), 0);
        while (b < a) {
            if (e.hasOwnProperty(b) && e[b] === c) {
                return b;
            }
            b++;
        }
        return -1;
    };
}
var handleMenuRender = function() {
    try {
        jQuery(".slideToggle").unbind("click");
        jQuery('.slideToggle[data-icon="u"]').next().hide();
        jQuery('.slideToggle[data-icon="9"]').next().hide();
        jQuery('.slideToggle[data-icon="u"][data-slideabove="true"]').prev().hide();
        jQuery('.slideToggle[data-icon="9"][data-slideabove="true"]').prev().hide();
        try {
            jQuery('.tagcloud_heading.slideToggle[data-icon="w"]').each(function() {
                var b = jQuery(this).parent();
                if ($(window).width() > 640) {
                    try {
                        if (b.children(".nano-content").css("height") === b.children(".nano-content").css("maxHeight") && b.children(".nano-panel").size() === 0) {
                            b.nanoScroller();
                        } else {
                            b.nanoScroller();
                        }
                    } catch (c) {}
                }
            });
        } catch (a) {}
        jQuery(".slideToggle").click(function() {
            if (jQuery(this).attr("data-icon") === "u" || jQuery(this).attr("data-icon") === "w") {
                if (jQuery(this).attr("data-icon") === "u") {
                    jQuery(this).attr("data-icon", "w");
                } else {
                    jQuery(this).attr("data-icon", "u");
                }
            }
            if (jQuery(this).attr("data-icon") === "8" || jQuery(this).attr("data-icon") === "9") {
                if (jQuery(this).attr("data-icon") === "8") {
                    jQuery(this).attr("data-icon", "9");
                } else {
                    jQuery(this).attr("data-icon", "8");
                }
            }
            if (jQuery(this).attr("data-slideabove") === "false" || jQuery(this).attr("data-slideabove") === undefined) {
                var b = jQuery(this).parent();
                jQuery(this).next().slideToggle(200, function() {
                    if ($(window).width() > 640) {
                        try {
                            if (b.children(".nano-content").css("height") === b.children(".nano-content").css("maxHeight") && b.children(".nano-panel").size() === 0) {
                                b.nanoScroller();
                            }
                        } catch (c) {}
                    }
                    if (jQuery(this).css("display") === "none") {
                        jQuery(this).siblings(".nano-pane").hide();
                    } else {
                        jQuery(this).siblings(".nano-pane").show();
                    }
                });
            } else {
                jQuery(this).prev().slideToggle(200);
            }
        });
    } catch (a) {}
};
jQuery(document).ready(function() {
    handleMenuRender();
    jQuery(".entry-content").on("pdbe-change", handleMenuRender);
    var c, b, d;
    try {
        jQuery('.field_expansion_toggle[data-view="hidden"] .toggle_image').addClass("open");
        jQuery('.field_expansion_toggle[data-view="hidden"]').next().css({
            top: -9999,
            left: -9999,
            position: "absolute"
        });
        b = (function() {
            return function() {
                var f = jQuery(this);
                if (f.attr("data-view") === "hidden") {
                    f.attr("data-view", "visible").children(".toggle_image").addClass("close").removeClass("open");
                    f.children(".truncate-text").addClass("no-truncate-text").removeClass("truncate-text");
                    f.next().hide().css({
                        top: 0,
                        left: 0,
                        position: "relative"
                    }).slideToggle(300);
                } else {
                    if (f.attr("data-view") === "visible") {
                        f.attr("data-view", "hidden").children(".toggle_image").addClass("open").removeClass("close");
                        f.children(".no-truncate-text").addClass("truncate-text").removeClass("no-truncate-text");
                        f.next().slideToggle(300);
                    }
                }
            };
        })();
        jQuery(".field_expansion_toggle").click(b);
    } catch (e) {}
    try {
        if ($(window).width() < 800) {
            $(".pdbe-intro-image-wrapper a[data-jkit]").each(function(f, g) {
                $(g).attr("data-jkit", $(g).data("jkit").replace(/height=\d+/, "height=100").replace(/width=\d+/, "width=100"));
            });
        } else {
            jQuery("body").jKit();
        }
    } catch (e) {}
    try {
        if ($(window).width() < 800) {
            c = jQuery("#mobile-menu");
            if (c.length > 0) {
                jQuery("#mobile-menu .ebi-menu-icon").attr("data-icon", "");
                var a = function(f) {
                    jQuery(this).toggleClass("menu-open");
                    if (jQuery(this).hasClass("menu-closed")) {
                        jQuery("#slider").show("slide", {
                            easing: "linear",
                            direction: "left",
                            to: {
                                right: "0"
                            }
                        }, 100, function() {
                            return false;
                        });
                    } else {
                        jQuery("#slider").hide("slide", {
                            easing: "linear",
                            direction: "left",
                            to: {
                                left: "0"
                            }
                        }, 100, function() {
                            return false;
                        });
                    }
                    jQuery(this).toggleClass("menu-closed");
                };
                c.addClass("menu-closed").addClass("hide_in_print").click(a);
                c.first().html("<img src='/pdbe/entry/images/graphics/menu-hamburger.png' alt='Quick links'> Menu");
                jQuery("#slider").hide();
                jQuery("#content .pdbe-quick-info").clone().appendTo("#slider div.pdbe_quick_links");
            }
        }
    } catch (e) {}
    d = function() {
        var f = jQuery(this),
            g, h;
        f.on("click", function(i) {
            g = jQuery(this);
            h = g.parent().next();
            h.children(".menu_closer").on("click", function() {
                h.slideUp(100);
                return false;
            });
            jQuery(".menu_closer").each(function(j, k) {
                jQuery(k).parent().hide();
            });
            setTimeout(function() {
                h.slideDown(100);
            }, 100);
            return false;
        });
    };
    jQuery(".menu_opener").each(d);
    jQuery(".image-tooltip").each(function() {
        jQuery(this).tooltip({
            content: jQuery(this).attr("alt"),
            track: true
        });
    });
    jQuery(".data-tooltip").each(function() {
        jQuery(this).tooltip({
            content: jQuery(this).attr("title"),
            track: true
        });
    });
    jQuery(window).scroll(function() {
        var h = jQuery(".sticky"),
            g = h.next(),
            f = jQuery(window).scrollTop();
        if (f >= 152) {
            h.addClass("fixed");
            h.find("h2").css({
                display: "none"
            });
            g.css({
                "margin-top": h.height() + 2
            });
        } else {
            h.removeClass("fixed");
            h.find("h2").css({
                display: "block"
            });
            g.css({
                "margin-top": "0"
            });
        }
    });
});
(function($, undefined) {
    $.jKit = function(element, options, moreoptions) {
        var defaults = {
            prefix: "jkit",
            dataAttribute: "data-jkit",
            activeClass: "active",
            errorClass: "error",
            successClass: "success",
            ignoreFocus: false,
            ignoreViewport: false,
            keyNavigation: true,
            touchNavigation: true,
            plugins: {},
            replacements: {},
            delimiter: ",",
            loadminified: true,
            macros: {
                "hide-if-empty": "binding:selector=this;source=text;mode=css.display",
                "smooth-blink": "loop:speed1=2000;duration1=250;speed2=250;duration2=2000"
            },
            commands: {}
        };
        var plugin = this;
        plugin.version = "1.2.16";
        plugin.inc = [];
        plugin.settings = {};
        plugin.commands = {};
        plugin.executions = {};
        var $element = $(element),
            element = element;
        if (typeof options == "string") {
            var singlecommand = options;
            if (moreoptions == undefined) {
                moreoptions = {};
            }
            options = moreoptions;
        }
        var startX, startY;
        var windowhasfocus = true;
        var uid = 0;
        var commandkeys = {};
        if ($.support.htmlSerialize || $.support.opacity) {
            $(window).focus(function() {
                windowhasfocus = true;
            }).blur(function() {
                windowhasfocus = false;
            });
        }
        plugin.init = function($el) {
            if ($el == undefined) {
                $el = $element;
            }
            plugin.settings = $.extend({}, defaults, options);
            var s = plugin.settings;
            if (singlecommand != undefined) {
                plugin.executeCommand($el, singlecommand, options);
            } else {
                $el.find("*[rel^=jKit], *[" + s.dataAttribute + "]").each(function() {
                    var that = this;
                    var rel = $(this).attr("rel");
                    var data = plugin.getDataCommands($(this));
                    if (data != "") {
                        rel = $.trim(data).substring(1);
                    } else {
                        rel = $.trim(rel).substring(5);
                    }
                    rel = rel.substring(0, rel.length - 1);
                    rel = rel.replace(/\]\s+\[/g, "][");
                    relsplit = rel.split("][");
                    $.each(relsplit, function(index, value) {
                        value = value.replace(/\\=/g, "|jkit-eq|").replace(/\\:/g, "|jkit-dp|").replace(/\\;/g, "|jkit-sc|").replace(/\\\[/g, "|jkit-sbo|").replace(/\\\]/g, "|jkit-sbc|").replace(/\\\*/g, "|jkit-st|").replace(/\\ /g, "|jkit-sp|");
                        value = $.trim(value);
                        if (s.macros[value] != undefined) {
                            value = s.macros[value];
                        }
                        var options = plugin.parseOptions(value);
                        if (s.macros[options.type] != undefined) {
                            var macrooptions = plugin.parseOptions(s.macros[options.type]);
                            options.type = macrooptions.type;
                            options = $.extend({}, macrooptions, options);
                        }
                        if (options.type == "macro" && relsplit[index - 1] != undefined) {
                            plugin.settings.macros[options.name] = relsplit[index - 1];
                        } else {
                            if (options.type == "repeat" && relsplit[index - 1] != undefined) {
                                var prevoptions = plugin.parseOptions(relsplit[index - 1]);
                                $el.on(options.onevent, function() {
                                    if (options.delay == undefined) {
                                        options.delay = 0;
                                    }
                                    setTimeout(function() {
                                        plugin.executeCommand($(that), prevoptions.type, prevoptions);
                                    }, options.delay);
                                });
                            } else {
                                if (options.type == "info") {
                                    var output = "jKit version: " + plugin.version + "\n";
                                    output += "Included commands: " + plugin.inc.join(", ") + "\n";
                                } else {
                                    var targets = [];
                                    if (options.target != undefined) {
                                        var targetsplit = options.target.split(".");
                                        targetsplit = [targetsplit.shift(), targetsplit.join(".")];
                                        if (targetsplit[1] == undefined) {
                                            targetsplit[1] = "*";
                                        }
                                        switch (targetsplit[0]) {
                                            case "children":
                                                $(that).children(targetsplit[1]).each(function() {
                                                    targets.push(this);
                                                });
                                                break;
                                            case "each":
                                                $(that).find(targetsplit[1]).each(function() {
                                                    targets.push(this);
                                                });
                                                break;
                                            default:
                                                targets.push(that);
                                        }
                                    } else {
                                        targets.push(that);
                                    }
                                    $.each(targets, function(i, v) {
                                        var thisoptions = plugin.parseDynamicOptions(options);
                                        if (thisoptions.commandkey == undefined) {
                                            var id = $(that).attr("id");
                                            if (id != undefined) {
                                                thisoptions.commandkey = id;
                                            } else {
                                                thisoptions.commandkey = s.prefix + "-uid-" + (++uid);
                                            }
                                        }
                                        if (thisoptions.commandkey != undefined) {
                                            commandkeys[thisoptions.commandkey] = {
                                                el: v,
                                                options: thisoptions,
                                                execs: 0
                                            };
                                        }
                                        if (thisoptions.onevent !== undefined || thisoptions.andonevent !== undefined) {
                                            var events = [];
                                            if (thisoptions.onevent !== undefined) {
                                                events.push(thisoptions.onevent);
                                            }
                                            if (thisoptions.andonevent !== undefined) {
                                                events.push(thisoptions.andonevent);
                                            }
                                            var e = events.join(" ");
                                            $el.on(e, function() {
                                                if (s.replacements[thisoptions.type] != undefined && typeof(s.replacements[thisoptions.type]) === "function") {
                                                    s.replacements[thisoptions.type].call(plugin, v, thisoptions.type, thisoptions);
                                                } else {
                                                    plugin.executeCommand(v, thisoptions.type, thisoptions);
                                                }
                                            });
                                        }
                                        if (thisoptions.onevent === undefined) {
                                            if (relsplit[index - 1] != undefined) {
                                                var prevcmd = "";
                                                if (relsplit[(index - 1)] != undefined) {
                                                    var prevoptions = plugin.parseOptions(relsplit[index - 1]);
                                                    prevcmd = prevoptions.type + "." + thisoptions.commandkey + ".executed";
                                                }
                                                if (prevcmd != "" && plugin.executions[prevoptions.type + "." + thisoptions.commandkey + ".executed"] === undefined) {
                                                    $el.on(prevcmd, function() {
                                                        if (s.replacements[thisoptions.type] != undefined && typeof(s.replacements[thisoptions.type]) === "function") {
                                                            s.replacements[thisoptions.type].call(plugin, v, thisoptions.type, thisoptions);
                                                        } else {
                                                            plugin.executeCommand(v, thisoptions.type, thisoptions);
                                                        }
                                                    });
                                                } else {
                                                    if (s.replacements[thisoptions.type] != undefined && typeof(s.replacements[thisoptions.type]) === "function") {
                                                        s.replacements[thisoptions.type].call(plugin, v, thisoptions.type, thisoptions);
                                                    } else {
                                                        plugin.executeCommand(v, thisoptions.type, thisoptions);
                                                    }
                                                }
                                            } else {
                                                if (s.replacements[thisoptions.type] != undefined && typeof(s.replacements[thisoptions.type]) === "function") {
                                                    s.replacements[thisoptions.type].call(plugin, v, thisoptions.type, thisoptions);
                                                } else {
                                                    plugin.executeCommand(v, thisoptions.type, thisoptions);
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                });
            }
        };
        plugin.getDataCommands = function($el) {
            var s = plugin.settings;
            var el = $el.get(0);
            var commands = "";
            for (var i = 0, attrs = el.attributes, l = attrs.length; i < l; i++) {
                var attr = attrs.item(i).nodeName;
                var attrsplit = attr.split("-");
                if (attrsplit[0] + "-" + attrsplit[1] == s.dataAttribute) {
                    if (attrsplit.length > 2) {
                        if (attrsplit[4] !== undefined && attrsplit[4] == "height") {
                            var size = $el.height();
                        } else {
                            var size = $el.width();
                        }
                        if (attrsplit[2] !== undefined && attrsplit[3] !== undefined && ((attrsplit[2] == "gt" && size > parseInt(attrsplit[3])) || (attrsplit[2] == "lt" && size < parseInt(attrsplit[3])))) {
                            commands += $el.attr(attr);
                        }
                    } else {
                        commands += $el.attr(attr);
                    }
                }
            }
            return commands;
        };
        plugin.applyMacro = function($el, macro) {
            var s = plugin.settings;
            if (s.macros[macro] != undefined) {
                var value = s.macros[macro];
                var options = plugin.parseOptions(value);
                if (s.replacements[options.type] != undefined && typeof(s.replacements[options.type]) === "function") {
                    s.replacements[options.type].call(plugin, $el, options.type, options);
                } else {
                    plugin.executeCommand($el, options.type, options);
                }
            }
        };
        plugin.parseOptions = function(string) {
            var relsplit = string.split(":");
            var commandsplit = relsplit[0].split(".");
            var options = {
                type: $.trim(commandsplit[0])
            };
            if (commandsplit[1] !== undefined) {
                options.commandkey = commandsplit[1];
            }
            if (options.execute == undefined) {
                options.execute = "always";
            }
            if (relsplit.length > 1) {
                var optionssplit = relsplit[1].split(";");
                $.each(optionssplit, function(key, value) {
                    var optionssplit2 = value.split("=");
                    options[$.trim(optionssplit2[0])] = $.trim(optionssplit2[1]);
                });
            }
            return options;
        };
        plugin.fixSpeed = function(speed) {
            if (speed != "fast" && speed != "slow") {
                speed = parseInt(speed);
            }
            return speed;
        };
        plugin.parseDynamicOptions = function(options) {
            var parsedoptions = {};
            for (index in options) {
                var v = options[index];
                if (v !== undefined && v.indexOf("{") > -1 && v.indexOf("|") > 0 && v.indexOf("}") > 1) {
                    var option = "";
                    var dyn = false;
                    var dynstr = "";
                    var parse = false;
                    for (var i = 0; i <= (v.length - 1); i++) {
                        if (!dyn && v.charAt(i) == "{") {
                            dyn = true;
                        } else {
                            if (dyn && v.charAt(i) == "}") {
                                dyn = false;
                                parse = true;
                            }
                        }
                        if (dyn || parse) {
                            dynstr += v.charAt(i);
                            if (parse) {
                                dynstr = dynstr.slice(1, -1);
                                var dynsplit = dynstr.split("|");
                                if (dynsplit[0] == "rand") {
                                    var valsplit = dynsplit[1].split("-");
                                    option += plugin.getRandom(Number(valsplit[0]), Number(valsplit[1]));
                                }
                                parse = false;
                                dynstr = "";
                            }
                        } else {
                            option += v.charAt(i);
                        }
                    }
                    parsedoptions[index] = option;
                } else {
                    parsedoptions[index] = v;
                }
            }
            return parsedoptions;
        };
        plugin.getRandom = function(min, max) {
            if (min > max) {
                return -1;
            }
            if (min == max) {
                return min;
            }
            var r;
            do {
                r = Math.random();
            } while (r == 1);
            return min + parseInt(r * (max - min + 1));
        };
        plugin.findElementTag = function($container, selector, pos, defaultval) {
            var output = "";
            if (pos !== undefined && !isNaN(pos) && parseInt(pos) == pos) {
                if ($container.find(selector).length > pos) {
                    output = $($container.find(selector).get(pos)).prop("tagName");
                }
            } else {
                var tags = {};
                $container.find(selector).each(function(i) {
                    if (i < 25) {
                        var tag = $(this).prop("tagName");
                        if (tag[0] != "") {
                            if (tags[tag] !== undefined) {
                                tags[tag] ++;
                            } else {
                                tags[tag] = 1;
                            }
                        }
                    } else {
                        return false;
                    }
                });
                var max = 0;
                var maxkey = "";
                for (var key in tags) {
                    if (tags[key] > max) {
                        max = tags[key];
                        maxkey = key;
                    }
                }
                output = maxkey;
            }
            if (output !== undefined && output != "") {
                return output;
            } else {
                return defaultval;
            }
        };
        plugin.addDefaults = function(command, options) {
            if (plugin.settings.commands[command] != undefined) {
                var c = plugin.settings.commands[command];
                $.each(c, function(i, v) {
                    if (options[i] == undefined) {
                        options[i] = v;
                    }
                    if (i.indexOf("speed") > -1) {
                        options[i] = plugin.fixSpeed(options[i]);
                    }
                });
            }
            return options;
        };
        plugin.executeCommand = function(that, type, options) {
            var s = plugin.settings;
            var $that = $(that);
            if (plugin.commands[type] === undefined) {
                plugin.commands[type] = [];
            }
            if ($.isArray(plugin.commands[type])) {
                plugin.commands[type].push({
                    el: that,
                    options: options
                });
                if (s.loadminified) {
                    var commandurl = "jquery.jkit.commands/" + type + ".min.js";
                } else {
                    var commandurl = "jquery.jkit.commands/" + type + ".js";
                }
                if (plugin.commands[type].length == 1) {
                    $.ajax({
                        url: "jquery.jkit.commands/" + type + ".js",
                        success: function(data) {
                            if (data.indexOf("plugin.commands.") !== -1) {
                                var queue = plugin.commands[type];
                                eval(data);
                                $.each(queue, function(i, v) {
                                    plugin.executeCommand(v.el, type, v.options);
                                });
                            }
                        },
                        dataType: "text"
                    });
                }
                return $that;
            }
            $element.trigger("jkit-commandinit", {
                element: $that,
                type: type,
                options: options
            });
            if (options.commandkey !== undefined) {
                commandkeys[options.commandkey]["execs"] ++;
                if ((options.execute == "once" && commandkeys[options.commandkey]["execs"] > 1) || (!isNaN(options.execute) && commandkeys[options.commandkey]["execs"] > options.execute)) {
                    return $that;
                }
            }
            options = plugin.addDefaults(type, options);
            $.each(options, function(i, v) {
                if (typeof v == "string") {
                    options[i] = v = v.replace(/\|jkit\-eq\|/g, "=").replace(/\|jkit\-dp\|/g, ":").replace(/\|jkit\-sc\|/g, ";").replace(/\|jkit\-sbo\|/g, "[").replace(/\|jkit\-sbc\|/g, "]").replace(/\|jkit\-st\|/g, "*").replace(/\|jkit\-sp\|/g, " ");
                }
                if (typeof v == "string" && v.slice(-1) == "*") {
                    options[i] = window[v.slice(0, -1)];
                    if (typeof options[i] == "function") {
                        options[i] = options[i].call(that);
                    }
                }
            });
            plugin.commands[type].execute($that, options);
            if (type != "remove") {
                $element.trigger(type + "." + options.commandkey + ".executed", {});
                plugin.executions[type + "." + options.commandkey + ".executed"] = true;
            }
            return $that;
        };
        plugin.triggerEvent = function(event, $el, options) {
            if (options.commandkey !== undefined) {
                var eventsplit = event.split(" ");
                $.each(eventsplit, function(i, v) {
                    $element.trigger(options.commandkey + "." + v, {
                        element: $el,
                        options: options
                    });
                });
            }
        };
        plugin.cssFromString = function(css) {
            var partsplit = css.split(",");
            var cssdata = {};
            $.each(partsplit, function(i, v) {
                var innersplit = v.split("(");
                if (innersplit.length == 2) {
                    var property = innersplit[0];
                    var value = innersplit[1].slice(0, -1);
                    cssdata[property] = value;
                }
            });
            return cssdata;
        };
        plugin.addCommandDefaults = function(c, d) {
            defaults.commands[c] = d;
            $element.trigger("command." + c + ".loaded", {});
        };
        plugin.addKeypressEvents = function($el, code) {
            if (plugin.settings.keyNavigation) {
                $(document).keydown(function(e) {
                    if (this !== e.target && (/textarea|select/i.test(e.target.nodeName) || e.target.type === "text")) {
                        return;
                    }
                    var keys = {
                        8: "backspace",
                        9: "tab",
                        13: "return",
                        16: "shift",
                        17: "ctrl",
                        18: "alt",
                        19: "pause",
                        20: "capslock",
                        27: "esc",
                        32: "space",
                        33: "pageup",
                        34: "pagedown",
                        35: "end",
                        36: "home",
                        37: "left",
                        38: "up",
                        39: "right",
                        40: "down",
                        45: "insert",
                        46: "del",
                        96: "0",
                        97: "1",
                        98: "2",
                        99: "3",
                        100: "4",
                        101: "5",
                        102: "6",
                        103: "7",
                        104: "8",
                        105: "9",
                        106: "*",
                        107: "+",
                        109: "-",
                        110: ".",
                        111: "/",
                        112: "f1",
                        113: "f2",
                        114: "f3",
                        115: "f4",
                        116: "f5",
                        117: "f6",
                        118: "f7",
                        119: "f8",
                        120: "f9",
                        121: "f10",
                        122: "f11",
                        123: "f12",
                        144: "numlock",
                        145: "scroll",
                        191: "/",
                        224: "meta"
                    };
                    for (var i = 48; i <= 90; i++) {
                        keys[i] = String.fromCharCode(i).toLowerCase();
                    }
                    if ($.inArray(e.which, keys)) {
                        var special = "";
                        if (e.altKey) {
                            special += "alt+";
                        }
                        if (e.ctrlKey) {
                            special += "ctrl+";
                        }
                        if (e.metaKey) {
                            special += "meta+";
                        }
                        if (e.shiftKey) {
                            special += "shift+";
                        }
                        var keycode = special + keys[e.which];
                        if (keycode == code) {
                            $el.trigger(special + keys[e.which]);
                            e.preventDefault();
                        }
                    }
                });
            }
        };
        plugin.commands.init = (function() {
            var command = {};
            plugin.addCommandDefaults("init", {});
            command.execute = function($that, options) {
                plugin.init($that);
                plugin.triggerEvent("complete", $that, options);
            };
            return command;
        }());
        plugin.commands.encode = (function() {
            var command = {};
            plugin.addCommandDefaults("encode", {
                format: "code",
                fix: "yes"
            });
            command.execute = function($that, options) {
                switch (options.format) {
                    case "code":
                        var src = $that.html();
                        if (options.fix == "yes") {
                            src = preFix(src);
                        }
                        $that.html(src.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                        break;
                    case "text":
                        $that.html($that.text());
                        break;
                    case "esc":
                        $that.html(escape($that.html()));
                        break;
                    case "uri":
                        $that.html(encodeURI($that.html()));
                        break;
                }
            };
            var preFix = function(str) {
                var lines = str.split("\n");
                var min = 9999;
                $.each(lines, function(i, v) {
                    if ($.trim(v) != "") {
                        var cnt = -1;
                        while (v.charAt(cnt + 1) == "\t") {
                            cnt++;
                        }
                        cnt++;
                        if (cnt < min) {
                            min = cnt;
                        }
                    }
                });
                $.each(lines, function(i, v) {
                    lines[i] = v.substr(min);
                });
                return lines.join("\n");
            };
            return command;
        }());
        plugin.commands.chart = (function() {
            var command = {};
            plugin.addCommandDefaults("chart", {
                max: 0,
                delaysteps: 100,
                speed: 500,
                easing: "linear"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var label = $that.find("thead > tr > th.label").text();
                var id = $that.attr("id");
                var datalabels = [];
                $that.find("thead > tr > th").each(function() {
                    if (!$(this).hasClass("label")) {
                        datalabels.push($(this).text());
                    }
                });
                var max = 0;
                var plots = [];
                $that.find("tbody tr").each(function() {
                    var plot = {
                        label: $(this).find("th.label").text(),
                        data: []
                    };
                    $(this).find("th").each(function() {
                        if (!$(this).hasClass("label")) {
                            var val = Number($(this).text());
                            max = Math.max(val, max);
                            plot.data.push(val);
                        }
                    });
                    plots.push(plot);
                });
                if (options.max > 0 && max < options.max) {
                    max = options.max;
                }
                var $chart = $("<div/>", {
                    id: id,
                    "class": s.prefix + "-chart"
                });
                var steps = 0;
                var delay = 0;
                $.each(datalabels, function(i, v) {
                    steps++;
                    var $step = $("<div/>", {
                        "class": s.prefix + "-chart-step"
                    }).html("<label>" + v + "</label>").appendTo($chart);
                    $.each(plots, function(i2, v2) {
                        if (plots[i2].data[i] > 0) {
                            var $plot = $("<div/>", {
                                "class": s.prefix + "-chart-plot " + s.prefix + "-chart-plot" + i2
                            }).appendTo($step);
                            $("<div/>").text(plots[i2].label).delay(delay).animate({
                                width: (plots[i2].data[i] / max * 100) + "%"
                            }, options.speed, options.easing).appendTo($plot);
                            $("<span/>", {
                                "class": s.prefix + "-chart-info"
                            }).text(label + " " + plots[i2].label + ": " + plots[i2].data[i] + " " + options.units).appendTo($plot);
                        }
                    });
                    if (steps == datalabels.length) {
                        setTimeout(function() {
                            plugin.triggerEvent("complete", $that, options);
                        }, options.speed + delay);
                    }
                    delay += Number(options.delaysteps);
                });
                $that.replaceWith($chart);
            };
            return command;
        }());
        plugin.commands.animation = (function() {
            var command = {};
            plugin.addCommandDefaults("animation", {
                fps: 25,
                loop: "no",
                from: "",
                to: "",
                speed: "500",
                easing: "linear",
                delay: 0,
                on: ""
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                if (options.to != "") {
                    if (options.from != "") {
                        $that.css(plugin.cssFromString(options.from));
                    }
                    setTimeout(function() {
                        if (options.on != "") {
                            $that.on(options.on, function() {
                                $that.animate(plugin.cssFromString(options.to), options.speed, options.easing, function() {
                                    if (options.macro != undefined) {
                                        plugin.applyMacro($that, options.macro);
                                    }
                                    plugin.triggerEvent("complete", $that, options);
                                });
                            });
                        } else {
                            $that.animate(plugin.cssFromString(options.to), options.speed, options.easing, function() {
                                if (options.macro != undefined) {
                                    plugin.applyMacro($el, options.macro);
                                }
                                plugin.triggerEvent("complete", $that, options);
                            });
                        }
                    }, options.delay);
                } else {
                    options.interval = 1000 / options.fps;
                    var frames = [];
                    var pos = 0;
                    var lastframe = 0;
                    $that.children().each(function() {
                        var rel = $(this).attr("rel");
                        var data = $(this).attr(s.dataAttribute);
                        if (data != undefined) {
                            var start = data.indexOf("[");
                            var end = data.indexOf("]");
                            var optionstring = data.substring(start + 1, end);
                        } else {
                            var start = rel.indexOf("[");
                            var end = rel.indexOf("]");
                            var optionstring = rel.substring(start + 1, end);
                        }
                        var frame = plugin.parseOptions(optionstring);
                        frame.el = $(this);
                        if (frame.easing == undefined) {
                            frame.easing = "linear";
                        }
                        frame.start = pos;
                        pos += parseInt(frame.steps);
                        frame.end = pos;
                        lastframe = pos;
                        pos++;
                        frames.push(frame);
                    });
                    options.lastframe = lastframe;
                    $that.css("overflow", "hidden");
                    $that.html(frames[0].el);
                    window.setTimeout(function() {
                        animation(frames, -1, $that, options);
                    }, 0);
                }
            };
            var animation = function(frames, current, el, options) {
                if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && (el.jKit_inViewport() || !el.jKit_inViewport() && plugin.settings.ignoreViewport)) {
                    plugin.triggerEvent("showframe showframe" + (current + 1), el, options);
                    $.each(frames, function(index, value) {
                        if (value.start == current) {
                            el.html(value.el.clone());
                            var duration = (value.end - value.start) * options.interval;
                            if (value.action == "fadeout") {
                                el.children(":first").show().fadeTo(duration, 0, value.easing);
                            } else {
                                if (value.action == "fadein") {
                                    el.children(":first").hide().fadeTo(duration, 1, value.easing);
                                } else {
                                    if (value.action == "fadeinout") {
                                        el.children(":first").hide().fadeTo(duration / 2, 1, value.easing).fadeTo(duration / 2, 0, value.easing);
                                    } else {
                                        if (value.action == "tween") {
                                            var next = frames[index + 1].el;
                                            el.children(":first").animate({
                                                "font-size": next.css("font-size"),
                                                "letter-spacing": next.css("letter-spacing"),
                                                color: next.css("color"),
                                                opacity: next.css("opacity"),
                                                "background-color": next.css("background-color"),
                                                "padding-top": next.css("padding-top"),
                                                "padding-bottom": next.css("padding-bottom"),
                                                "padding-left": next.css("padding-left"),
                                                "padding-right": next.css("padding-right")
                                            }, duration, value.easing);
                                        }
                                    }
                                }
                            }
                        }
                    });
                    current++;
                    var nextloop = false;
                    if (current > options.lastframe) {
                        current = 0;
                        nextloop = true;
                    }
                    if ((nextloop && options.loop == "yes") || !nextloop) {
                        window.setTimeout(function() {
                            animation(frames, current, el, options);
                        }, options.interval);
                    }
                    if (options.loop == "no") {
                        if (options.macro != undefined) {
                            plugin.applyMacro(el, options.macro);
                        }
                        plugin.triggerEvent("complete", el, options);
                    }
                } else {
                    window.setTimeout(function() {
                        animation(frames, current, el, options);
                    }, options.interval);
                }
            };
            return command;
        }());
        plugin.commands.tooltip = (function() {
            var command = {};
            plugin.addCommandDefaults("tooltip", {
                text: "",
                content: "",
                color: "#fff",
                background: "#000",
                classname: "",
                follow: "no",
                event: "mouse",
                yoffset: 20
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var visible = false;
                if ($("div#" + s.prefix + "-tooltip").length == 0) {
                    $("<div/>", {
                        id: s.prefix + "-tooltip"
                    }).css("position", "absolute").hide().appendTo("body");
                }
                $tip = $("div#" + s.prefix + "-tooltip");
                if (options.content != "") {
                    options.text = $(options.content).html();
                } else {
                    if (options.text == "") {
                        options.text = $.trim($that.attr("title"));
                    }
                    if (options.text == "") {
                        options.text = $.trim($that.attr("alt"));
                    }
                }
                var onevent = "mouseenter";
                var offevent = "mouseleave click";
                if (options.event == "focus") {
                    onevent = "focus";
                    offevent = "blur";
                }
                $that.on(onevent, function(e) {
                    if (options.classname != "") {
                        $tip.html(options.text).removeClass().css({
                            background: "",
                            color: ""
                        }).addClass(options.classname);
                    } else {
                        $tip.html(options.text).removeClass().css({
                            background: options.background,
                            color: options.color
                        });
                    }
                    if (options.event == "focus") {
                        $tip.css({
                            top: $that.offset().top + $that.outerHeight(),
                            left: $that.offset().left
                        });
                    } else {
                        $tip.css("top", (e.pageY + options.yoffset)).css("left", e.pageX);
                        if (parseInt($tip.css("left")) > $(window).width() / 2) {
                            $tip.css("left", "0px").css("left", e.pageX - $tip.width());
                        }
                    }
                    $tip.stop(true, true).fadeIn(200);
                    plugin.triggerEvent("open", $that, options);
                    visible = true;
                }).on(offevent, function(e) {
                    var speed = 200;
                    if ($tip.is(":animated")) {
                        speed = 0;
                    }
                    $tip.stop(true, true).fadeOut(speed, function() {
                        visible = false;
                    });
                    plugin.triggerEvent("closed", $that, options);
                });
                if (options.follow == "yes") {
                    $("body").on("mousemove", function(e) {
                        if (visible) {
                            $tip.css("top", (e.pageY + options.yoffset)).css("left", e.pageX);
                        }
                    });
                }
            };
            return command;
        }());
        plugin.commands.show = (function() {
            var command = {};
            plugin.addCommandDefaults("show", {
                delay: 0,
                speed: 500,
                animation: "fade",
                easing: "linear"
            });
            command.execute = function($that, options) {
                $that.hide().jKit_effect(true, options.animation, options.speed, options.easing, options.delay, function() {
                    plugin.triggerEvent("complete", $that, options);
                });
            };
            return command;
        }());
        plugin.commands.swap = (function() {
            var command = {};
            plugin.addCommandDefaults("swap", {
                versions: "_off,_on",
                attribute: "src"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var versions = options.versions.split(s.delimiter);
                var active = false;
                var original = $that.attr(options.attribute);
                var replacement = $that.attr(options.attribute).replace(versions[0], versions[1]);
                if (options.attribute == "src") {
                    $("<img/>")[0].src = replacement;
                }
                $that.on("mouseenter click", function() {
                    if (!active) {
                        $that.attr(options.attribute, replacement);
                        plugin.triggerEvent("active", $that, options);
                        active = true;
                    }
                }).on("mouseleave click", function() {
                    if (active) {
                        $that.attr(options.attribute, original);
                        plugin.triggerEvent("inactive", $that, options);
                        active = false;
                    }
                });
            };
            return command;
        }());
        plugin.commands.limit = (function() {
            var command = {};
            plugin.addCommandDefaults("limit", {
                elements: "children",
                count: 5,
                animation: "none",
                speed: 250,
                easing: "linear",
                endstring: "..."
            });
            command.execute = function($that, options) {
                if (options.elements == "children") {
                    $that.children(":gt(" + (options.count - 1) + ")").each(function() {
                        $(this).jKit_effect(false, options.animation, options.speed, options.easing);
                    });
                    setTimeout(function() {
                        plugin.triggerEvent("complete", $that, options);
                    }, options.speed);
                } else {
                    var newtext = $that.text().substr(0, options.count);
                    if (newtext != $that.text()) {
                        newtext = newtext.substr(0, newtext.length - options.endstring.length) + options.endstring;
                        $that.text(newtext);
                    }
                }
            };
            return command;
        }());
        plugin.commands.lorem = (function() {
            var command = {};
            plugin.addCommandDefaults("lorem", {
                paragraphs: 0,
                length: "",
                random: "no"
            });
            command.execute = function($that, options) {
                var lorem = ["Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.", "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.", "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.", "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.", "Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."];
                var text = "";
                if (options.random == "yes") {
                    lorem = $.fn.jKit_arrayShuffle(lorem);
                }
                if (options.paragraphs > 0) {
                    for (var i = 1; i <= options.paragraphs; i++) {
                        text += "<p>" + lorem[(i - 1) % 7] + "</p>";
                    }
                } else {
                    if (options.length != undefined && options.length != "") {
                        var i = 1;
                        while (text.length < options.length - 1) {
                            text += lorem[(i - 1) % 7] + " ";
                            text = text.substring(0, options.length - 1);
                            i++;
                        }
                    } else {
                        text = lorem[0];
                    }
                }
                $that.html(text);
            };
            return command;
        }());
        plugin.commands.plugin = (function() {
            var command = {};
            plugin.addCommandDefaults("plugin", {
                script: ""
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                if (s.plugins[options.script] != undefined) {
                    options.functioncall = s.plugins[options.script]["fn"];
                    if (s.plugins[options.script]["option"] != undefined) {
                        options.option = s.plugins[options.script]["option"];
                    }
                    options.script = s.plugins[options.script]["path"];
                }
                $.ajaxSetup({
                    cache: true
                });
                if (options.script != undefined) {
                    $.getScript(options.script, function() {
                        if (options.option != undefined) {
                            $that[options.functioncall](options[options.option]);
                        } else {
                            delete(options.type);
                            delete(options.script);
                            $that[options.functioncall](options);
                        }
                        plugin.triggerEvent("complete", $that, options);
                    });
                }
                $.ajaxSetup({
                    cache: false
                });
            };
            return command;
        }());
        plugin.commands.split = (function() {
            var command = {};
            plugin.addCommandDefaults("split", {
                separator: "",
                container: "span",
                before: "",
                after: ""
            });
            command.execute = function($that, options) {
                var parts = $that.text().split(options.separator);
                $that.html("");
                $.each(parts, function(i, v) {
                    $("<" + options.container + "/>").text(v).appendTo($that);
                });
                $that.html(options.before + $that.html() + options.after);
            };
            return command;
        }());
        plugin.commands.random = (function() {
            var command = {};
            plugin.addCommandDefaults("random", {
                count: 1,
                remove: "yes"
            });
            command.execute = function($that, options) {
                var childs = $that.children().size();
                var shownrs = [];
                while (shownrs.length < options.count) {
                    var shownr = Math.floor(Math.random() * childs);
                    if ($.inArray(shownr, shownrs) == -1) {
                        shownrs.push(shownr);
                    }
                }
                var i = 0;
                $that.children().each(function() {
                    if ($.inArray(i, shownrs) == -1) {
                        if (options.remove == "yes") {
                            $(this).remove();
                        } else {
                            $(this).hide();
                        }
                    } else {
                        $(this).show();
                    }
                    i++;
                });
            };
            return command;
        }());
        plugin.commands.api = (function() {
            var command = {};
            plugin.addCommandDefaults("api", {
                format: "json",
                value: "",
                url: "",
                interval: -1,
                template: ""
            });
            command.execute = function($that, options) {
                if (options.url != "") {
                    readAPI($that, options);
                }
            };
            var readAPI = function($el, options) {
                if (options.format == "json") {
                    $.ajax({
                        type: "GET",
                        url: options.url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "jsonp",
                        error: function() {
                            plugin.triggerEvent("error", $el, options);
                        },
                        success: function(data) {
                            if (options.template != "" && plugin.commands.template !== undefined) {
                                $el.html(plugin.commands.template.templates[options.template].template.clone().show());
                                $el.find("[data-jkit-api]").each(function() {
                                    var value = $(this).attr("data-jkit-api");
                                    try {
                                        $(this).text(eval("data." + value.replace(/[^a-zA-Z0-9\.\[\]\_]+/g, "")));
                                    } catch (err) {}
                                });
                                $el.find("[data-jkit-api-if]").each(function() {
                                    var value = $(this).attr("data-jkit-api-if");
                                    var test = undefined;
                                    try {
                                        eval("test = data." + value.replace(/[^a-zA-Z0-9\.\[\]\_]+/g, ""));
                                    } catch (err) {}
                                    if (test == undefined) {
                                        $(this).remove();
                                    }
                                });
                            } else {
                                if (options.value != "") {
                                    try {
                                        $el.text(eval("data." + options.value.replace(/[^a-zA-Z0-9\.\[\]\_]+/g, "")));
                                    } catch (err) {}
                                } else {
                                    $el.text(data);
                                }
                            }
                            if (options.macro != undefined) {
                                plugin.applyMacro($el, options.macro);
                            }
                            plugin.triggerEvent("complete", $el, options);
                            if (options.interval > -1) {
                                setTimeout(function() {
                                    readAPI($el, options);
                                }, options.interval * 1000);
                            }
                        }
                    });
                }
            };
            return command;
        }());
        plugin.commands.replace = (function() {
            var command = {};
            plugin.addCommandDefaults("replace", {
                modifier: "g",
                search: "",
                replacement: ""
            });
            command.execute = function($that, options) {
                var str = new RegExp(options.search, options.modifier);
                $that.html($that.html().replace(str, options.replacement));
            };
            return command;
        }());
        plugin.commands.sort = (function() {
            var command = {};
            plugin.addCommandDefaults("sort", {
                what: "text",
                by: "",
                start: 0,
                end: 0
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var index = $that.parent().children().index($that);
                $that.on("click", function() {
                    plugin.triggerEvent("clicked", $that, options);
                    var rows = [];
                    $that.parent().parent().parent().find("tbody > tr").each(function() {
                        var $td = $(this).find("td:nth-child(" + (index + 1) + ")");
                        switch (options.what) {
                            case "html":
                                var str = $td.html();
                                break;
                            case "class":
                                var str = $td.attr("class");
                                break;
                            default:
                                var str = $td.text();
                                break;
                        }
                        if (options.start > 0 || options.end > 0) {
                            if (options.end > options.start) {
                                str = str.substring(options.start, options.end);
                            } else {
                                str = str.substring(options.start);
                            }
                        }
                        rows.push({
                            content: $(this).html(),
                            search: str
                        });
                    });
                    if ($that.hasClass(s.prefix + "-sort-down")) {
                        $that.parent().find("th").removeClass(s.prefix + "-sort-down").removeClass(s.prefix + "-sort-up");
                        $that.addClass(s.prefix + "-sort-up");
                        rows.sort(function(a, b) {
                            if (options.by == "num") {
                                a.search = Number(a.search);
                                b.search = Number(b.search);
                            }
                            if (options.by == "date") {
                                var a = new Date(a.search);
                                var b = new Date(b.search);
                                return (a.getTime() - b.getTime());
                            } else {
                                if (a.search > b.search) {
                                    return -1;
                                }
                                if (a.search < b.search) {
                                    return 1;
                                }
                                return 0;
                            }
                        });
                    } else {
                        $that.parent().find("th").removeClass(s.prefix + "-sort-down").removeClass(s.prefix + "-sort-up");
                        $that.addClass(s.prefix + "-sort-down");
                        rows.sort(function(a, b) {
                            if (options.by == "num") {
                                a.search = Number(a.search);
                                b.search = Number(b.search);
                            }
                            if (options.by == "date") {
                                var a = new Date(a.search);
                                var b = new Date(b.search);
                                return (b.getTime() - a.getTime());
                            } else {
                                if (a.search < b.search) {
                                    return -1;
                                }
                                if (a.search > b.search) {
                                    return 1;
                                }
                                return 0;
                            }
                        });
                    }
                    var $body = $that.parent().parent().parent().find("tbody");
                    $body.html("");
                    var tbody = "";
                    $.each(rows, function(i, v) {
                        tbody += "<tr>" + v.content + "</tr>";
                    });
                    $body.html(tbody);
                    plugin.triggerEvent("complete", $that, options);
                });
            };
            return command;
        }());
        plugin.commands.respond = (function() {
            var command = {};
            plugin.addCommandDefaults("respond", {});
            command.execute = function($that, options) {
                if (options.width != undefined) {
                    var widths = options.width.split(",");
                    widths.sort(function(a, b) {
                        return parseInt(a) - parseInt(b);
                    });
                    setClasses($that, widths);
                    $(window).resize(function() {
                        setClasses($that, widths);
                    });
                }
            };
            var setClasses = function($that, widths) {
                var w = $that.width();
                var responseClass = "";
                for (var x in widths) {
                    if (parseInt(widths[x]) < w) {
                        responseClass = plugin.settings.prefix + "-respond-" + widths[x];
                    }
                }
                if ($that.attr("class") == undefined) {
                    var classList = [];
                } else {
                    var classList = $that.attr("class").split(/\s+/);
                }
                $that.removeClass();
                for (var x in classList) {
                    if (classList[x].indexOf(plugin.settings.prefix + "-respond") == -1) {
                        $that.addClass(classList[x]);
                    }
                }
                $that.addClass(responseClass);
            };
            return command;
        }());
        plugin.commands.parallax = (function() {
            var command = {};
            plugin.addCommandDefaults("parallax", {
                strength: 5,
                axis: "x",
                scope: "global",
                detect: "mousemove"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var strength = options.strength / 10;
                if (options.detect == "scroll") {
                    var $capture = $(window);
                } else {
                    if (options.scope == "global") {
                        var $capture = $(document);
                    } else {
                        var $capture = $that;
                    }
                }
                $capture.on(options.detect, function(event) {
                    if ((windowhasfocus || !windowhasfocus && s.ignoreFocus) && ($that.jKit_inViewport() || !$that.jKit_inViewport() && s.ignoreViewport)) {
                        var cnt = 1;
                        if (options.detect == "scroll") {
                            var xaxis = $(window).scrollLeft() + $(window).width() / 2;
                            var yaxis = $(window).scrollTop() + $(window).height() / 2;
                        } else {
                            var xaxis = event.pageX;
                            var yaxis = event.pageY;
                        }
                        $that.children().each(function() {
                            var box = $that.offset();
                            if (options.axis == "x" || options.axis == "both") {
                                var offsetx = (xaxis - box.left - ($that.width() / 2)) * strength * cnt * -1 - $(this).width() / 2 + $that.width() / 2;
                                $(this).css({
                                    left: offsetx + "px"
                                });
                            }
                            if (options.axis == "y" || options.axis == "both") {
                                var offsety = (yaxis - box.top - ($that.height() / 2)) * strength * cnt * -1 - $(this).height() / 2 + $that.height() / 2;
                                $(this).css({
                                    top: offsety + "px"
                                });
                            }
                            cnt++;
                        });
                    }
                });
            };
            return command;
        }());
        plugin.commands.zoom = (function() {
            var command = {};
            plugin.addCommandDefaults("zoom", {
                scale: 2,
                speed: 150,
                lightbox: "no"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var type = "zoom";
                $that.parent().css("position", "relative");
                $that.on("mouseover", function() {
                    var pos = $that.position();
                    var height = $that.height();
                    var width = $that.width();
                    var $zoom = $("<div/>", {
                        "class": s.prefix + "-" + type + "-overlay"
                    }).css({
                        position: "absolute",
                        height: height + "px",
                        width: width + "px",
                        left: pos.left + "px",
                        top: pos.top + "px",
                        overflow: "hidden",
                        "background-image": "url(" + $that.attr("src") + ")",
                        "background-repeat": "no-repeat",
                        "background-color": "#000",
                        opacity: 0
                    }).on("mouseout", function() {
                        $zoom.fadeTo(options.speed, 0, function() {
                            $zoom.remove();
                            plugin.triggerEvent("zoomout", $that, options);
                        });
                    }).mousemove(function(e) {
                        var offset = $(this).offset();
                        var x = (e.pageX - offset.left) * (options.scale - 1);
                        var y = (e.pageY - offset.top) * (options.scale - 1);
                        $zoom.css("background-position", "-" + x + "px -" + y + "px");
                    }).fadeTo(options.speed, 1, function() {
                        plugin.triggerEvent("zoomin", $that, options);
                    }).insertAfter($that);
                    if (options.lightbox == "yes") {
                        plugin.executeCommand($zoom, "lightbox", {});
                    }
                });
            };
            return command;
        }());
        plugin.commands.partially = (function() {
            var command = {};
            plugin.addCommandDefaults("partially", {
                height: 200,
                text: "more ...",
                speed: 250,
                easing: "linear",
                on: "mouseover",
                area: "",
                alphaon: 0.9,
                alphaoff: 0
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var originalHeight = $that.height();
                if (originalHeight > options.height) {
                    $that.css("position", "relative");
                    var $morediv = $("<div/>").addClass(s.prefix + "-morediv").appendTo($that).html(options.text).css({
                        width: $that.outerWidth() + "px",
                        opacity: options.alphaon
                    });
                    plugin.addKeypressEvents($that, "down");
                    plugin.addKeypressEvents($that, "up");
                    if (options.on == "click" || $.fn.jKit_iOS()) {
                        var openEvent = "click";
                        var closeEvent = "click";
                    } else {
                        var openEvent = "mouseenter";
                        var closeEvent = "mouseleave";
                    }
                    if (options.area == "morediv") {
                        $area = $morediv;
                    } else {
                        $area = $that;
                    }
                    $that.css({
                        height: options.height + "px",
                        overflow: "hidden"
                    });
                    $area.on(openEvent + " down", function() {
                        if ($that.height() < originalHeight) {
                            $morediv.fadeTo(options.speed, options.alphaoff);
                            $that.animate({
                                height: originalHeight + "px"
                            }, options.speed, options.easing, function() {
                                plugin.triggerEvent("open", $that, options);
                            });
                        }
                    }).on(closeEvent + " up", function() {
                        if ($that.height() == originalHeight) {
                            $morediv.fadeTo(options.speed, options.alphaon);
                            $that.animate({
                                height: options.height + "px"
                            }, options.speed, options.easing, function() {
                                plugin.triggerEvent("closed", $that, options);
                            });
                        }
                    });
                }
            };
            return command;
        }());
        plugin.commands.showandhide = (function() {
            var command = {};
            plugin.addCommandDefaults("showandhide", {
                delay: 0,
                speed: 500,
                duration: 10000,
                animation: "fade",
                easing: "linear"
            });
            command.execute = function($that, options) {
                $that.hide().jKit_effect(true, options.animation, options.speed, options.easing, options.delay, function() {
                    plugin.triggerEvent("shown", $that, options);
                    $that.jKit_effect(false, options.animation, options.speed, options.easing, options.duration, function() {
                        plugin.triggerEvent("complete", $that, options);
                    });
                });
            };
            return command;
        }());
        plugin.commands.filter = (function() {
            var command = {};
            plugin.addCommandDefaults("filter", {
                by: "class",
                affected: "",
                animation: "slide",
                speed: 250,
                easing: "linear",
                logic: "and",
                global: "no"
            });
            command.execute = function($that, options) {
                $that.find(".jkit-filter").each(function() {
                    $(this).data("oldval", $.trim($(this).val())).on("change click input", function() {
                        if ($.trim($(this).val()) != $(this).data("oldval")) {
                            $(this).data("oldval", $.trim($(this).val()));
                            if (options.loader !== undefined) {
                                $(options.loader).show();
                            }
                            plugin.triggerEvent("clicked", $that, options);
                            filterElements($that, options);
                        }
                    });
                });
                $that.find(".jkit-filter").each(function() {
                    if ($.trim($(this).val()) != "") {
                        if (options.loader !== undefined) {
                            $(options.loader).show();
                        }
                        plugin.triggerEvent("clicked", $that, options);
                        filterElements($that, options);
                        return false;
                    }
                });
            };
            var filterElements = function($el, options) {
                var selections = [];
                $el.find(".jkit-filter").each(function() {
                    var vals = [];
                    var valsplit = $(this).val().split(" ");
                    $.each(valsplit, function(i, v) {
                        v = $.trim(v);
                        if (v != "") {
                            vals.push(v);
                        }
                    });
                    selections = selections.concat(vals);
                });
                if (options.global == "yes") {
                    $container = $("body");
                } else {
                    $container = $el;
                }
                $container.find(options.affected).each(function() {
                    var $current = $(this);
                    if (options.by == "text") {
                        var currentText = $current.text().toLowerCase();
                    }
                    if (selections.length > 0) {
                        var found = [];
                        $.each(selections, function(i, v) {
                            if (options.by == "class") {
                                if ($current.hasClass(v)) {
                                    found.push(v);
                                }
                            } else {
                                if (options.by == "text") {
                                    if (currentText.indexOf(v.toLowerCase()) > -1) {
                                        found.push(v);
                                    }
                                }
                            }
                        });
                        if (found.length == selections.length || (found.length > 0 && options.logic == "or")) {
                            $current.jKit_effect(true, options.animation, options.speed, options.easing, 0);
                        } else {
                            $current.jKit_effect(false, options.animation, options.speed, options.easing, 0);
                        }
                    } else {
                        $current.jKit_effect(true, options.animation, options.speed, options.easing, 0);
                    }
                });
                setTimeout(function() {
                    if (options.loader !== undefined) {
                        $(options.loader).hide();
                    }
                    plugin.triggerEvent("complete", $el, options);
                }, options.speed);
            };
            return command;
        }());
        plugin.commands.slideshow = (function() {
            var command = {};
            plugin.addCommandDefaults("slideshow", {
                shuffle: "no",
                interval: 3000,
                speed: 250,
                animation: "fade",
                easing: "linear",
                on: ""
            });
            command.execute = function($that, options) {
                var slides = $that.children();
                if (options.shuffle == "yes") {
                    var tmp, rand;
                    var slidecount = slides.length;
                    for (var i = 0; i < slidecount; i++) {
                        rand = Math.floor(Math.random() * slidecount);
                        tmp = slides[i];
                        slides[i] = slides[rand];
                        slides[rand] = tmp;
                    }
                }
                $that.css({
                    position: "relative"
                });
                $that.html(slides[0]);
                $.data($that, "anim", false);
                if (options.on != "") {
                    if (options.on == "mouseover") {
                        $that.on("mouseleave", function() {
                            $.data($that, "anim", false);
                        });
                    }
                    $that.on(options.on, function() {
                        if (options.on == "click") {
                            if ($.data($that, "anim")) {
                                $.data($that, "anim", false);
                            } else {
                                $.data($that, "anim", true);
                                window.setTimeout(function() {
                                    slideshow(slides, 0, $that, options);
                                }, 0);
                            }
                        } else {
                            if (options.on == "mouseover") {
                                if (!$.data($that, "anim")) {
                                    $.data($that, "anim", true);
                                    window.setTimeout(function() {
                                        slideshow(slides, 0, $that, options);
                                    }, 0);
                                }
                            }
                        }
                    });
                } else {
                    $.data($that, "anim", true);
                    window.setTimeout(function() {
                        slideshow(slides, 0, $that, options);
                    }, options.interval);
                }
            };
            var slideshow = function(slides, current, el, options) {
                if ($.data(el, "anim")) {
                    if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && (el.jKit_inViewport() || !el.jKit_inViewport() && plugin.settings.ignoreViewport)) {
                        if (current < (slides.length - 1)) {
                            current++;
                        } else {
                            current = 0;
                        }
                        plugin.triggerEvent("hideentry hideentry" + (current + 1), el, options);
                        el.jKit_effect(false, options.animation, options.speed, options.easing, 0, function() {
                            el.html(slides[current]);
                            plugin.triggerEvent("showentry showentry" + (current + 1), el, options);
                            el.jKit_effect(true, options.animation, options.speed, options.easing, 0, function() {
                                window.setTimeout(function() {
                                    slideshow(slides, current, el, options);
                                }, options.interval);
                            });
                        });
                    } else {
                        window.setTimeout(function() {
                            slideshow(slides, current, el, options);
                        }, options.interval);
                    }
                }
            };
            return command;
        }());
        plugin.commands.cycle = (function() {
            var command = {};
            plugin.addCommandDefaults("cycle", {
                what: "class",
                where: "li",
                scope: "children",
                sequence: "odd,even"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var seq = options.sequence.split(s.delimiter);
                var pos = 0;
                var sel = options.where;
                if (options.scope == "children") {
                    sel = "> " + sel;
                }
                $that.find(sel).each(function() {
                    if (seq[pos] != undefined && seq[pos] != "") {
                        switch (options.what) {
                            case "class":
                                $(this).addClass(seq[pos]);
                                break;
                            case "html":
                                $(this).html(seq[pos]);
                                break;
                            default:
                                var what = options.what.split(".");
                                if (what[0] == "attr") {
                                    $(this).attr(what[1], seq[pos]);
                                } else {
                                    if (what[0] == "css") {
                                        $(this).css(what[1], seq[pos]);
                                    }
                                }
                        }
                    }
                    pos++;
                    if (pos > seq.length - 1) {
                        pos = 0;
                    }
                });
            };
            return command;
        }());
        plugin.commands.binding = (function() {
            var command = {};
            plugin.addCommandDefaults("binding", {
                selector: "",
                source: "val",
                variable: "",
                mode: "text",
                interval: 100,
                math: "",
                condition: "",
                "if": "",
                "else": "",
                speed: 0,
                easing: "linear",
                search: "",
                trigger: "no",
                accuracy: "",
                min: "",
                max: "",
                applyto: "",
                delay: 0
            });
            command.execute = function($that, options) {
                window.setTimeout(function() {
                    binding($that, options);
                }, options.delay);
            };
            var binding = function(el, options) {
                if (windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) {
                    if (options.value == undefined) {
                        if (options.selector != "") {
                            var selsplit = options.selector.split("|");
                            var sourcesplit = options.source.split(".");
                            var values = [];
                            $.each(selsplit, function(i, v) {
                                var $v;
                                if (v == "this") {
                                    $v = (el);
                                } else {
                                    if (v == "parent") {
                                        $v = $(el).parent();
                                    } else {
                                        var vsplit = v.split(".");
                                        if (vsplit.length == 1) {
                                            $v = $(vsplit[0]);
                                        } else {
                                            if (vsplit[0] == "each") {
                                                $v = el.find(vsplit[1]);
                                            } else {
                                                if (vsplit[0] == "children") {
                                                    $v = el.children(vsplit[1]);
                                                }
                                            }
                                        }
                                    }
                                }
                                $v.each(function() {
                                    switch (sourcesplit[0]) {
                                        case "event":
                                            $(this).on(sourcesplit[1], function(e) {
                                                options.value = 1;
                                                binding(el, options);
                                                if (options.macro != undefined) {
                                                    plugin.applyMacro($(el), options.macro);
                                                }
                                            });
                                            break;
                                        case "html":
                                            var temp = $(this).html();
                                            break;
                                        case "text":
                                            var temp = $(this).text();
                                            break;
                                        case "attr":
                                            var temp = $(this).attr(sourcesplit[1]);
                                            break;
                                        case "css":
                                            if (sourcesplit[1] == "height") {
                                                var temp = $(this).height();
                                            } else {
                                                if (sourcesplit[1] == "innerHeight") {
                                                    var temp = $(this).innerHeight();
                                                } else {
                                                    if (sourcesplit[1] == "outerHeight") {
                                                        var temp = $(this).outerHeight();
                                                    } else {
                                                        if (sourcesplit[1] == "width") {
                                                            var temp = $(this).width();
                                                        } else {
                                                            if (sourcesplit[1] == "innerWidth") {
                                                                var temp = $(this).innerWidth();
                                                            } else {
                                                                if (sourcesplit[1] == "outerWidth") {
                                                                    var temp = $(this).outerWidth();
                                                                } else {
                                                                    if (sourcesplit[1] == "scrollTop") {
                                                                        var temp = $(this).scrollTop();
                                                                    } else {
                                                                        if (sourcesplit[1] == "scrollLeft") {
                                                                            var temp = $(this).scrollLeft();
                                                                        } else {
                                                                            var temp = $(this).css(sourcesplit[1]);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        case "scroll":
                                            switch (sourcesplit[1]) {
                                                case "top":
                                                    var temp = $(window).scrollTop();
                                                    break;
                                                case "left":
                                                    var temp = $(window).scrollLeft();
                                                    break;
                                            }
                                            break;
                                        case "clearance":
                                            var cTop = el.offset().top - $(window).scrollTop();
                                            var cBottom = $(window).scrollTop() + $(window).height() - (el.offset().top + el.height());
                                            var cRight = ($(window).width() + $(window).scrollLeft()) - (el.offset().left + el.width());
                                            var cLeft = el.offset().left - $(window).scrollLeft();
                                            switch (sourcesplit[1]) {
                                                case "bottom":
                                                    var temp = cBottom;
                                                    break;
                                                case "top":
                                                    var temp = cTop;
                                                    break;
                                                case "right":
                                                    var temp = cRight;
                                                    break;
                                                case "left":
                                                    var temp = cLeft;
                                                    break;
                                                default:
                                                    var temp = Math.min.apply(Math, [cBottom, cTop, cRight, cLeft]);
                                            }
                                            break;
                                        case "has":
                                            switch (sourcesplit[1]) {
                                                case "class":
                                                    var temp = $(this).hasClass(options.search);
                                                    break;
                                                case "text":
                                                    var temp = $.fn.jKit_stringOccurrences($(this).text().toLowerCase(), options.search.toLowerCase());
                                                    break;
                                                case "attribute":
                                                    var temp = ($(this).attr(options.search) !== undefined);
                                                    break;
                                                case "val":
                                                    var temp = $.fn.jKit_stringOccurrences($(this).val().toLowerCase(), options.search.toLowerCase());
                                                    break;
                                                case "element":
                                                    var temp = $(this).find(options.search).length;
                                                    break;
                                                case "children":
                                                    var temp = $(this).children(options.search).length;
                                                    break;
                                                case "hash":
                                                    var temp = (window.location.hash == options.search);
                                                    break;
                                            }
                                            break;
                                        case "location":
                                            var temp = window.location[sourcesplit[1]];
                                            break;
                                        case "val":
                                        default:
                                            var temp = $(this).val();
                                    }
                                    values.push(temp);
                                });
                            });
                            if (sourcesplit[2] != undefined) {
                                var value = "";
                                switch (sourcesplit[2]) {
                                    case "max":
                                        value = Math.max.apply(Math, values);
                                        break;
                                    case "min":
                                        value = Math.min.apply(Math, values);
                                        break;
                                    case "sum":
                                        value = values.reduce(function(a, b) {
                                            return a + b;
                                        });
                                        break;
                                    case "avg":
                                        value = values.reduce(function(a, b) {
                                            return a + b;
                                        }) / values.length;
                                        break;
                                }
                            } else {
                                var value = values[0];
                            }
                        } else {
                            if (options.variable != "") {
                                var value = window[options.variable];
                            }
                        }
                    } else {
                        value = options.value;
                    }
                    if (!isNaN(value) && parseInt(value) == value) {
                        if (options.accuracy != "") {
                            value = Math.round(value / options.accuracy) * options.accuracy;
                        }
                        if (options.min != "" && value < options.min) {
                            value = options.min;
                        }
                        if (options.max != "" && value > options.max) {
                            value = options.max;
                        }
                    }
                    var doit;
                    var rev = false;
                    if (options.condition != "") {
                        doit = false;
                        eval("if (" + options.condition.replace(/[^a-zA-Z 0-9#\<\>\=\.\!\']+/g, "") + ") doit = true;");
                    } else {
                        if (value === false) {
                            doit = false;
                            rev = true;
                        } else {
                            doit = true;
                        }
                    }
                    if (commandkeys[options.commandkey]["condition"] == undefined || commandkeys[options.commandkey]["condition"] != doit) {
                        if (doit) {
                            plugin.triggerEvent("true", $(el), options);
                        } else {
                            plugin.triggerEvent("false", $(el), options);
                        }
                        commandkeys[options.commandkey]["condition"] = doit;
                    }
                    if (rev) {
                        doit = true;
                    }
                    if (!doit && options["else"] != "") {
                        doit = true;
                        value = options["else"];
                    } else {
                        if (doit && options["if"] != "") {
                            doit = true;
                            value = options["if"];
                        }
                    }
                    if (doit) {
                        if (options.math != "") {
                            eval("value = " + options.math.replace(/[^a-zA-Z 0-9\+\-\*\/\.]+/g, "") + ";");
                        }
                        if (options.trigger == "yes") {
                            if (commandkeys[options.commandkey]["triggervalue"] == undefined || commandkeys[options.commandkey]["triggervalue"] != value) {
                                if (commandkeys[options.commandkey]["triggervalue"] !== undefined) {
                                    plugin.triggerEvent("notvalue" + commandkeys[options.commandkey]["triggervalue"], $(el), options);
                                }
                                plugin.triggerEvent("value" + value, $(el), options);
                                commandkeys[options.commandkey]["triggervalue"] = value;
                            }
                        }
                        var $els = el;
                        if (options.applyto != "") {
                            var applysplit = options.applyto.split(".");
                            if (applysplit.length == 1) {
                                $els = $(applysplit[0]);
                            } else {
                                if (applysplit[0] == "each") {
                                    $els = el.find(applysplit[1]);
                                } else {
                                    if (applysplit[0] == "children") {
                                        $els = el.children(applysplit[1]);
                                    }
                                }
                            }
                        }
                        $els.each(function() {
                            var $el = $(this);
                            var modesplit = options.mode.split(".");
                            switch (modesplit[0]) {
                                case "text":
                                    $el.text(value);
                                    break;
                                case "html":
                                    $el.html(value);
                                    break;
                                case "val":
                                    $el.val(value);
                                    break;
                                case "attr":
                                    $el.attr(modesplit[1], value);
                                    break;
                                case "css":
                                    if (modesplit[1] == "display") {
                                        if ($.trim(value) == "" || $.trim(value) == 0 || !value) {
                                            value = "none";
                                        } else {
                                            if (modesplit[2] !== undefined) {
                                                value = modesplit[2];
                                            }
                                        }
                                    }
                                    if (options.speed > 0) {
                                        var style = {};
                                        style[modesplit[1]] = value;
                                        $el.animate(style, options.speed, options.easing);
                                    } else {
                                        $el.css(modesplit[1], value);
                                    }
                                    break;
                                case "none":
                                    break;
                                default:
                                    if (modesplit[0] != undefined) {
                                        var fn = window[modesplit[0]];
                                        if (typeof fn === "function") {
                                            fn(value, $el);
                                        }
                                    }
                            }
                        });
                    }
                }
                if (options.interval != -1) {
                    window.setTimeout(function() {
                        binding(el, options);
                    }, options.interval);
                }
            };
            return command;
        }());
        plugin.commands.accordion = (function() {
            var command = {};
            plugin.addCommandDefaults("accordion", {
                active: 1,
                animation: "slide",
                speed: 250,
                easing: "linear"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var containerTag = plugin.findElementTag($that, ">", "max", "div");
                var titleTag = plugin.findElementTag($that, "> " + containerTag + " >", 0, "h3");
                var contentTag = plugin.findElementTag($that, "> " + containerTag + " >", 1, "div");
                var tabs = [];
                $that.children(containerTag).each(function() {
                    tabs.push({
                        title: $(this).children(titleTag).detach(),
                        content: $(this).children(contentTag).detach()
                    });
                });
                $that.html("");
                var $tabnav = $("<ul/>", {}).appendTo($that);
                var current = 1;
                if (options.active == 0) {
                    current = -1;
                }
                $.each(tabs, function(index, value) {
                    var $litemp = $("<li/>", {}).append(value.title).css("cursor", "pointer").appendTo($tabnav);
                    if (options.active - 1 == index) {
                        $litemp.append(value.content).children(titleTag).addClass(s.activeClass);
                        current = index;
                    } else {
                        $litemp.append(value.content.hide());
                    }
                    $litemp.find("> " + titleTag).on("click", function(e) {
                        if (index != current) {
                            plugin.triggerEvent("showentry showentry" + (index + 1), $that, options);
                            $tabnav.find("> li > " + titleTag).removeClass(s.activeClass);
                            $(this).addClass(s.activeClass);
                            if (options.animation == "slide") {
                                $tabnav.find("> li:nth-child(" + (current + 1) + ") > " + contentTag).slideUp(options.speed, options.easing);
                                $tabnav.find("> li:nth-child(" + (index + 1) + ") > " + contentTag).slideDown(options.speed, options.easing);
                            } else {
                                $tabnav.find("> li:nth-child(" + (current + 1) + ") > " + contentTag).hide();
                                $tabnav.find("> li:nth-child(" + (index + 1) + ") > " + contentTag).show();
                            }
                            current = index;
                        } else {
                            plugin.triggerEvent("hideentry hideentry" + (index + 1), $that, options);
                            $(this).removeClass(s.activeClass).next().slideUp(options.speed, options.easing);
                            current = -1;
                        }
                    });
                });
            };
            return command;
        }());
        plugin.commands.template = (function() {
            var command = {};
            command.templates = {};
            plugin.addCommandDefaults("template", {
                action: "set",
                name: "template",
                dynamic: "no",
                addhtml: "+"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                if (options.action == "apply") {
                    $el = $that;
                    if (options.children != undefined && options.children != "") {
                        $el = $that.children(options.children);
                        var cnt = 0;
                        $el.each(function() {
                            cnt++;
                            applyTemplate($(this), options, cnt, $el.length);
                        });
                    } else {
                        applyTemplate($that, options);
                    }
                    if (options.dynamic == "yes") {
                        var $addDiv = $("<a/>", {
                            "class": s.prefix + "-" + type + "-add"
                        }).html(options.addhtml).on("click", function() {
                            $el = $($that.get(0));
                            var cnt = $el.children(options.children).length + 1;
                            $el.find(".if-entry-last").hide();
                            applyTemplate($("<" + options.children + "/>").appendTo($el), options, cnt, cnt);
                            plugin.triggerEvent("added", $that, options);
                        }).insertAfter($that);
                    }
                } else {
                    if (command.templates[options.name] == undefined) {
                        command.templates[options.name] = [];
                    }
                    if (options.vars == undefined) {
                        var vars = [];
                    } else {
                        var vars = options.vars.split(s.delimiter);
                    }
                    command.templates[options.name] = {
                        template: $that.detach(),
                        vars: vars
                    };
                }
            };
            var applyTemplate = function($el, options, cnt, entries) {
                var content = {};
                $.each(command.templates[options.name].vars, function(i, v) {
                    var $subEls = $el.find("." + v);
                    plugin.init($subEls);
                    if ($subEls.val() != "") {
                        content[v] = $subEls.val();
                    } else {
                        content[v] = $subEls.html();
                    }
                });
                $el.html(command.templates[options.name].template.clone().show());
                $el.find('[class^="if-entry-"]').hide();
                renameDynamicAttributes($el, cnt);
                $.each(command.templates[options.name].vars, function(i, v) {
                    var $subEl = $el.find("." + v);
                    if ($subEl.is("input") || $subEl.is("select") || $subEl.is("textarea")) {
                        $subEl.val(content[v]);
                    } else {
                        $subEl.html(content[v]);
                    }
                    if (content[v] == undefined && $el.find(".if-" + v).length > 0) {
                        $el.find(".if-" + v).remove();
                    }
                    if (cnt == 1) {
                        $el.find(".if-entry-first").show();
                    }
                    if (cnt == entries) {
                        $el.find(".if-entry-last").show();
                    }
                    $el.find(".if-entry-nr-" + cnt).show();
                });
            };
            var renameDynamicAttributes = function($el, cnt) {
                $el.find('[class^="dynamic-"]').each(function() {
                    var $subEl = $(this);
                    var classList = $(this).attr("class").split(/\s+/);
                    $.each(classList, function(i, v) {
                        var attribute = v.substr(8);
                        if (attribute != "" && $subEl.attr(attribute)) {
                            var currentAttr = $subEl.attr(attribute);
                            var pos = currentAttr.lastIndexOf("_");
                            if (pos > -1) {
                                currentAttr = currentAttr.substr(0, pos);
                            }
                            $subEl.attr(attribute, currentAttr + "_" + cnt);
                        }
                    });
                });
            };
            return command;
        }());
        plugin.commands.tabs = (function() {
            var command = {};
            plugin.addCommandDefaults("tabs", {
                active: 1,
                animation: "none",
                speed: 250,
                easing: "linear"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var containerTag = plugin.findElementTag($that, ">", "max", "div");
                var titleTag = plugin.findElementTag($that, "> " + containerTag + " >", 0, "h3");
                var contentTag = plugin.findElementTag($that, "> " + containerTag + " >", 1, "div");
                var tabs = [];
                $that.children(containerTag).each(function() {
                    tabs.push({
                        title: $(this).children(titleTag).html(),
                        content: $(this).children(contentTag).detach()
                    });
                });
                $that.html("");
                var $tabnav = $("<ul/>", {}).appendTo($that);
                var $tabcontent = $;
                $.each(tabs, function(index, value) {
                    var $litemp = $("<li/>", {}).html(value.title).css("cursor", "pointer").appendTo($tabnav);
                    if (options.active - 1 == index) {
                        $litemp.addClass(s.activeClass);
                    }
                    var callback = function() {
                        plugin.triggerEvent("showentry showentry" + (index + 1), $that, options);
                        $tabcontent.jKit_effect(false, options.animation, options.speed, options.easing, 0, function() {
                            $(this).remove();
                            $tabcontent = tabs[index].content.appendTo($that).hide();
                            $tabcontent.jKit_effect(true, options.animation, options.speed, options.easing);
                        });
                        $tabnav.find("li").removeClass(s.activeClass);
                        $tabnav.find("li:nth-child(" + (index + 1) + ")").addClass(s.activeClass);
                    };
                    $litemp.on("click ", function() {
                        callback();
                    });
                });
                if (tabs[options.active - 1] != undefined) {
                    $tabcontent = tabs[options.active - 1].content.appendTo($that);
                }
            };
            return command;
        }());
        plugin.commands.key = (function() {
            var command = {};
            plugin.addCommandDefaults("key", {});
            command.execute = function($that, options) {
                if (options.code != undefined) {
                    plugin.addKeypressEvents($that, options.code);
                    $that.on(options.code, function() {
                        if ($that.attr("onclick") !== undefined) {
                            $that.click();
                        } else {
                            if ($that.attr("target") !== undefined && $that.attr("target") == "_blank") {
                                window.open($that.attr("href"), "_blank", false);
                            } else {
                                window.location.href = $that.attr("href");
                            }
                        }
                        if (options.macro != undefined) {
                            plugin.applyMacro($that, options.macro);
                        }
                        plugin.triggerEvent("pressed", $that, options);
                    });
                }
            };
            return command;
        }());
        plugin.commands.scroll = (function() {
            var command = {};
            plugin.addCommandDefaults("scroll", {
                speed: 500,
                dynamic: "yes",
                easing: "linear",
                offset: 0
            });
            command.execute = function($that, options) {
                $that.click(function() {
                    plugin.triggerEvent("clicked", $that, options);
                    if ($(this).attr("href") == "") {
                        var ypos = 0;
                    } else {
                        var ypos = $($that.attr("href")).offset().top;
                    }
                    ypos = ypos + parseInt(options.offset);
                    if (options.dynamic == "yes") {
                        options.speed = Math.abs($(document).scrollTop() - ypos) / 1000 * options.speed;
                    }
                    $("html, body").animate({
                        scrollTop: ypos + "px"
                    }, options.speed, options.easing, function() {
                        plugin.triggerEvent("complete", $that, options);
                    });
                    return false;
                });
            };
            return command;
        }());
        plugin.commands.form = (function() {
            var command = {};
            plugin.addCommandDefaults("form", {
                validateonly: "no"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                $that.append('<input type="hidden" name="' + s.prefix + '-requireds" id="' + s.prefix + '-requireds">');
                if (options.error != undefined) {
                    options.formerror = options.error;
                }
                var requireds = [];
                $that.on("submit", function() {
                    var errors = [];
                    $(this).find("span." + s.errorClass).remove();
                    $(this).find("*[rel^=jKit], *[" + s.dataAttribute + "]").each(function() {
                        var rel = $(this).attr("rel");
                        var data = $(this).attr(s.dataAttribute);
                        if (data != undefined) {
                            var start = data.indexOf("[");
                            var end = data.indexOf("]");
                            var optionstring = data.substring(start + 1, end);
                        } else {
                            var start = rel.indexOf("[");
                            var end = rel.indexOf("]");
                            var optionstring = rel.substring(start + 1, end);
                        }
                        var options = plugin.parseOptions(optionstring);
                        var type = options.type;
                        var elerror = false;
                        var required = false;
                        if (options.required == undefined) {
                            options.required = false;
                        }
                        if (options.required == "true") {
                            if ($(this).val() == "") {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "required"
                                });
                            }
                            required = true;
                            if ($.inArray($(this).attr("name"), requireds) == -1) {
                                requireds.push($(this).attr("name"));
                            }
                        }
                        if ((required || $(this).val() != "") || options.type == "group") {
                            if (options.type == "email" && !$.fn.jKit_emailCheck($(this).val())) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "email"
                                });
                            }
                            if (options.type == "url" && !$.fn.jKit_urlCheck($(this).val())) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "url"
                                });
                            }
                            if (options.type == "date" && !$.fn.jKit_dateCheck($(this).val())) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "date"
                                });
                            }
                            if (options.type == "date" && (new Date($(this).val()).getTime() <= new Date($(options.older).val()).getTime())) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "older"
                                });
                            }
                            if (options.type == "date" && (new Date($(this).val()).getTime() >= new Date($(options.younger).val()).getTime())) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "younger"
                                });
                            }
                            if (options.type == "time" && !$.fn.jKit_timeCheck($(this).val())) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "time"
                                });
                            }
                            if (options.type == "phone" && !$.fn.jKit_phoneCheck($(this).val())) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "phone"
                                });
                            }
                            if (options.type == "float" && isNaN($(this).val())) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "float"
                                });
                            }
                            if (options.type == "int" && parseInt($(this).val()) != $(this).val()) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "int"
                                });
                            }
                            if ((options.type == "int" || options.type == "float") && options.min != undefined && $(this).val() < options.min && options.type != "group") {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "min"
                                });
                            }
                            if ((options.type == "int" || options.type == "float") && options.max != undefined && $(this).val() > options.max && options.type != "group") {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "max"
                                });
                            }
                            if ((options.type == "int" || options.type == "float") && options.bigger != undefined && $(this).val() > $(options.bigger).val()) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "bigger"
                                });
                            }
                            if ((options.type == "int" || options.type == "float") && options.smaller != undefined && $(this).val() < $(options.smaller).val()) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "smaller"
                                });
                            }
                            if ((options.type != "int" && options.type != "float") && options.min != undefined && $(this).val().length < options.min && options.type != "group") {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "minlength"
                                });
                            }
                            if ((options.type != "int" && options.type != "float") && options.max != undefined && $(this).val().length > options.max && options.type != "group") {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "maxlength"
                                });
                            }
                            if (options.length != undefined && $(this).val().length != options.length) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "length"
                                });
                            }
                            if ((options.type != "int" && options.type != "float") && options.longer != undefined && $(this).val().length > $(options.longer).val().length) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "longer"
                                });
                            }
                            if ((options.type != "int" && options.type != "float") && options.shorter != undefined && $(this).val().length < $(options.shorter).val().length) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "shorter"
                                });
                            }
                            if (options.strength != undefined && $.fn.jKit_passwordStrength($(this).val()) < options.strength) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "strength"
                                });
                            }
                            if (options.same != undefined && $(this).val() != $(options.same).val()) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "same"
                                });
                            }
                            if (options.different != undefined && $(this).val() != $(options.different).val()) {
                                elerror = true;
                                errors.push({
                                    element: $(this),
                                    error: "different"
                                });
                            }
                            if (options.type == "extension") {
                                var opts = options.options.split(s.delimiter);
                                var filesplit = $(this).val().split(".");
                                var ext = filesplit[filesplit.length - 1];
                                if ($.inArray(ext, opts) == -1) {
                                    elerror = true;
                                    errors.push({
                                        element: $(this),
                                        error: "ext"
                                    });
                                }
                            }
                            if (options.type == "group") {
                                if (options.min != undefined || options.max != undefined) {
                                    var checked = 0;
                                    $(this).children("input[type=checkbox][checked]").each(function() {
                                        checked++;
                                    });
                                    if ((options.min != undefined && options.min > checked) || (options.max != undefined && checked > options.max)) {
                                        elerror = true;
                                        errors.push({
                                            element: $(this),
                                            error: "group"
                                        });
                                    }
                                } else {
                                    if ($(this).find("input[name='" + options.name + "']:checked").val() == undefined) {
                                        elerror = true;
                                        errors.push({
                                            element: $(this),
                                            error: "group"
                                        });
                                    }
                                }
                            }
                            if (options.type == "custom" && options.checkfunction != undefined) {
                                var fn = window[options.checkfunction];
                                if (typeof fn === "function") {
                                    if (!fn($(this).val())) {
                                        elerror = true;
                                        errors.push({
                                            element: $(this),
                                            error: "custom"
                                        });
                                    }
                                }
                            }
                        }
                        if (elerror) {
                            if (options.error != undefined) {
                                $(this).after('<span class="' + s.errorClass + '">' + options.error + "</span>");
                            }
                            $(this).addClass(s.errorClass);
                        } else {
                            $(this).removeClass(s.errorClass);
                        }
                    });
                    if (errors.length == 0) {
                        if (options.validateonly == "yes") {
                            plugin.triggerEvent("complete", $that, options);
                            return true;
                        } else {
                            var action = $(this).attr("action");
                            $that.removeClass(s.errorClass);
                            if (options.success == undefined) {
                                options.success = "Your form has been sent.";
                            }
                            $that.find("input#" + s.prefix + "-requireds").val(requireds.join(s.delimiter));
                            $.post(action, $that.serialize(), function(data, textStatus, jqXHR) {
                                $that.find("." + s.errorClass).hide();
                                if (data.sent != undefined && data.sent == true) {
                                    if (options.success.charAt(0) == "#") {
                                        $that.html($(options.success).show());
                                    } else {
                                        $that.html('<p class="' + s.successClass + '">' + options.success + "</p>");
                                    }
                                    plugin.triggerEvent("complete", $that, options);
                                    if (options.macro != undefined) {
                                        plugin.applyMacro($that, options.macro);
                                    }
                                } else {
                                    for (x in data.error) {
                                        var field = data.error[x];
                                        $that.find("*[name=" + field + "]").addClass(s.errorClass).after('<span class="' + s.errorClass + '">' + options.error + "</span>");
                                    }
                                    plugin.triggerEvent("error", $that, options);
                                }
                            }).error(function(xhr, ajaxOptions, thrownError) {
                                alert(thrownError);
                                $that.append('<span class="' + s.errorClass + '">There was an error submitting the form: Error Code ' + xhr.status + "</span>");
                            });
                            return false;
                        }
                    } else {
                        $that.addClass(s.errorClass);
                        if (options.formerror != undefined) {
                            $that.append('<span class="' + s.errorClass + '">' + options.formerror + "</span>");
                        }
                        plugin.triggerEvent("error", $that, options);
                        return false;
                    }
                });
            };
            return command;
        }());
        plugin.commands.ajax = (function() {
            var command = {};
            plugin.addCommandDefaults("ajax", {
                animation: "slide",
                speed: 250,
                easing: "linear",
                when: "click"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                if (options.href != undefined && options.href != "") {
                    var href = options.href;
                } else {
                    var href = $that.attr("href");
                }
                if (options.when == "load" || options.when == "viewport" || options.when == "shown") {
                    if (options.when == "load") {
                        $that.load(href, function() {
                            plugin.triggerEvent("complete", $that, options);
                        });
                    } else {
                        var myInterval = setInterval(function() {
                            if ((options.when == "viewport" && ($that.jKit_inViewport() || !$that.jKit_inViewport() && s.ignoreViewport)) || (options.when == "shown" && $that.css("display") != "none")) {
                                if (options.src != undefined) {
                                    $that.attr("src", options.src);
                                    plugin.triggerEvent("complete", $that, options);
                                } else {
                                    $that.load(href, function() {
                                        plugin.init($that);
                                        plugin.triggerEvent("complete", $that, options);
                                    });
                                }
                                window.clearInterval(myInterval);
                            }
                        }, 100);
                    }
                } else {
                    $that.on("click", function() {
                        loadAndReplace(href, options, $that);
                        return false;
                    });
                }
            };
            var loadAndReplace = function(href, options, $el) {
                var tempid = plugin.settings.prefix + "_ajax_temp_" + $.fn.jKit_getUnixtime();
                $(options.element).jKit_effect(false, options.animation, options.speed, options.easing, 0, function() {
                    $(options.element).html("");
                    jQuery("<div/>", {
                        id: tempid
                    }).appendTo("body");
                    $("#" + tempid).load(href + " " + options.element, function() {
                        $(options.element).html($("#" + tempid + " " + options.element).html());
                        plugin.init($(options.element));
                        plugin.triggerEvent("complete", $el, options);
                        $(options.element).jKit_effect(true, options.animation, options.speed, options.easing);
                        if (options.macro != undefined) {
                            plugin.applyMacro($(options.element), options.macro);
                        }
                        $("#" + tempid).remove();
                    });
                });
            };
            return command;
        }());
        plugin.commands.hide = (function() {
            var command = {};
            plugin.addCommandDefaults("hide", {
                delay: 0,
                speed: 500,
                animation: "fade",
                easing: "linear"
            });
            command.execute = function($that, options) {
                $that.jKit_effect(false, options.animation, options.speed, options.easing, options.delay, function() {
                    plugin.triggerEvent("complete", $that, options);
                });
            };
            return command;
        }());
        plugin.commands.fontsize = (function() {
            var command = {};
            plugin.addCommandDefaults("fontsize", {
                steps: 2,
                min: 6,
                max: 72,
                affected: "p",
                style: "font-size"
            });
            command.execute = function($that, options) {
                $that.on("click", function() {
                    $element.find(options.affected).each(function() {
                        var newsize = parseInt($(this).css(options.style)) + parseInt(options.steps);
                        if (newsize >= parseInt(options.min) && newsize <= parseInt(options.max)) {
                            $(this).css(options.style, newsize);
                        }
                    });
                    plugin.triggerEvent("changed", $that, options);
                    return false;
                });
            };
            return command;
        }());
        plugin.commands.remove = (function() {
            var command = {};
            plugin.addCommandDefaults("remove", {
                delay: 0
            });
            command.execute = function($that, options) {
                $that.delay(options.delay).hide(0, function() {
                    $that.remove();
                    plugin.triggerEvent("complete", $that, options);
                });
            };
            return command;
        }());
        plugin.commands.loop = (function() {
            var command = {};
            plugin.addCommandDefaults("loop", {
                speed1: 500,
                speed2: 500,
                duration1: 2000,
                duration2: 2000,
                easing1: "linear",
                easing2: "linear",
                animation: "fade"
            });
            command.execute = function($that, options) {
                loop($that.hide(), options);
            };
            var loop = function($that, options) {
                if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && ($that.jKit_inViewport() || !$that.jKit_inViewport && plugin.settings.ignoreViewport)) {
                    plugin.triggerEvent("show", $that, options);
                    $that.jKit_effect(true, options.animation, options.speed1, options.easing1, options.duration1, function() {
                        plugin.triggerEvent("hide", $that, options);
                        $that.jKit_effect(false, options.animation, options.speed2, options.easing2, options.duration2, loop($that, options));
                    });
                } else {
                    window.setTimeout(function() {
                        loop($that, options);
                    }, 100);
                }
            };
            return command;
        }());
        plugin.commands.ticker = (function() {
            var command = {};
            plugin.addCommandDefaults("ticker", {
                speed: 100,
                delay: 2000,
                loop: "yes"
            });
            command.execute = function($that, options) {
                var containerTag = plugin.findElementTag($that, ">", "max", "li");
                var messages = [];
                $that.find(containerTag).each(function() {
                    messages.push({
                        href: $(this).find("a").attr("href"),
                        target: $(this).find("a").attr("target"),
                        text: $(this).text()
                    });
                });
                var $newThat = $("<div/>");
                $that.replaceWith($newThat);
                window.setTimeout(function() {
                    ticker($newThat, options, messages, 0, 0);
                }, 0);
            };
            var ticker = function($el, options, messages, currentmessage, currentchar) {
                var stopped = false;
                if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && ($el.jKit_inViewport() || !$el.jKit_inViewport() && plugin.settings.ignoreViewport)) {
                    var timer = options.speed;
                    currentchar++;
                    if (currentchar > messages[currentmessage].text.length) {
                        timer = options.delay;
                        currentmessage++;
                        if (currentmessage >= messages.length) {
                            if (options.loop == "yes" && messages.length > 1) {
                                currentmessage = 0;
                            } else {
                                stopped = true;
                            }
                        }
                        if (!stopped) {
                            setTimeout(function() {
                                plugin.triggerEvent("showentry showentry" + (currentmessage + 1), $el, options);
                            }, timer);
                            currentchar = 0;
                        }
                    } else {
                        if (messages[currentmessage].href != undefined) {
                            $el.html('<a href="' + messages[currentmessage].href + '" target="' + messages[currentmessage].target + '">' + messages[currentmessage].text.substr(0, currentchar) + "</a>");
                        } else {
                            $el.html(messages[currentmessage].text.substr(0, currentchar));
                        }
                    }
                }
                if (!stopped) {
                    window.setTimeout(function() {
                        ticker($el, options, messages, currentmessage, currentchar);
                    }, timer);
                }
            };
            return command;
        }());
        plugin.commands.carousel = (function() {
            var command = {};
            plugin.addCommandDefaults("carousel", {
                autoplay: "yes",
                limit: 5,
                animation: "grow",
                speed: 250,
                easing: "linear",
                interval: 5000,
                prevhtml: "&lt;",
                nexthtml: "&gt;"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var cnt = 0;
                $that.children().each(function() {
                    cnt++;
                    if (cnt > options.limit) {
                        $(this).hide();
                    }
                });
                var $prevdiv = $("<a/>", {
                    "class": s.prefix + "-carousel-prev"
                }).html(options.prevhtml).on("click left", function() {
                    carousel($that, options, "prev");
                }).insertAfter($that);
                var $nextdiv = $("<a/>", {
                    "class": s.prefix + "-carousel-next"
                }).html(options.nexthtml).on("click right", function() {
                    carousel($that, options, "next");
                }).insertAfter($that);
                plugin.addKeypressEvents($prevdiv, "left");
                plugin.addKeypressEvents($nextdiv, "right");
                if (options.autoplay == "yes") {
                    window.setTimeout(function() {
                        carousel($that, options);
                    }, options.interval);
                }
            };
            carousel = function($el, options, dir) {
                if (dir != undefined) {
                    options.autoplay = false;
                }
                if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && ($el.jKit_inViewport() || !$el.jKit_inViewport() && plugin.settings.ignoreViewport)) {
                    var isAnimated = false;
                    $el.children().each(function() {
                        if ($(this).is(":animated")) {
                            isAnimated = true;
                        }
                    });
                    if (!isAnimated) {
                        var pos = Math.min(options.limit, $el.children().length);
                        if (dir == "next" || dir == undefined) {
                            plugin.triggerEvent("shownext", $el, options);
                            $el.children(":first-child").jKit_effect(false, options.animation, options.speed, options.easing, 0, function() {
                                $el.append($el.children(":nth-child(1)"));
                                $el.children(":nth-child(" + pos + ")").jKit_effect(true, options.animation, options.speed, options.easing, 0);
                            });
                        } else {
                            if (dir == "prev") {
                                plugin.triggerEvent("showprev", $el, options);
                                $el.children(":nth-child(" + pos + ")").jKit_effect(false, options.animation, options.speed, options.easing, 0, function() {
                                    $el.prepend($el.children(":last-child"));
                                    $el.children(":first-child").jKit_effect(true, options.animation, options.speed, options.easing, 0);
                                });
                            }
                        }
                    }
                    if (options.autoplay == "yes") {
                        window.setTimeout(function() {
                            carousel($el, options);
                        }, options.interval);
                    }
                } else {
                    window.setTimeout(function() {
                        carousel($el, options);
                    }, options.interval);
                }
            };
            return command;
        }());
        plugin.commands.paginate = (function() {
            var command = {};
            plugin.addCommandDefaults("paginate", {
                limit: "25",
                by: "node",
                container: "",
                animation: "none",
                speed: 250,
                easing: "linear",
                pos: "after"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                if (options.container != "") {
                    var $container = $that.find(options.container);
                } else {
                    var $container = $that;
                }
                if ($that.attr("id") !== undefined) {
                    var paginateid = s.prefix + "-paginate-" + $that.attr("id");
                } else {
                    var paginateid = s.prefix + "-paginate-uid-" + (++uid);
                }
                var pages = [];
                var page = [];
                if (options.by == "node") {
                    var cnt = 1;
                    $container.children().each(function() {
                        cnt++;
                        page.push($(this).detach());
                        if (cnt > Number(options.limit)) {
                            cnt = 1;
                            pages.push(page);
                            page = [];
                        }
                    });
                } else {
                    var height = 0;
                    $container.children().each(function() {
                        height += $(this).outerHeight();
                        if (height > Number(options.limit)) {
                            height = $(this).outerHeight();
                            if (page.length > 0) {
                                pages.push(page);
                            }
                            page = [];
                        }
                        page.push($(this).detach());
                    });
                }
                if (page.length > 0) {
                    pages.push(page);
                }
                if (pages.length > 1) {
                    var $pagination = $("<ul/>", {
                        id: paginateid,
                        "class": s.prefix + "-pagination"
                    });
                    $.each(pages, function(i, v) {
                        var $pnav = $("<li/>").html(i + 1).on("click", function() {
                            plugin.triggerEvent("showpage showpage" + (i + 1), $that, options);
                            $pagination.find("li").removeClass(s.activeClass);
                            $(this).addClass(s.activeClass);
                            $container.jKit_effect(false, options.animation, options.speed, options.easing, 0, function() {
                                $container.html("");
                                $.each(v, function(index, value) {
                                    value.clone().appendTo($container);
                                });
                                $container.jKit_effect(true, options.animation, options.speed, options.easing, 0);
                            });
                        });
                        if (i == 0) {
                            $pnav.addClass(s.activeClass);
                        }
                        $pnav.appendTo($pagination);
                    });
                    if (options.pos == "after") {
                        $pagination.insertAfter($that);
                    } else {
                        $pagination.insertBefore($that);
                    }
                    $container.html("");
                    $.each(pages[0], function(index, value) {
                        value.clone().appendTo($container);
                    });
                }
            };
            return command;
        }());
        plugin.commands.summary = (function() {
            var command = {};
            plugin.addCommandDefaults("summary", {
                what: "",
                linked: "yes",
                from: "",
                scope: "children",
                style: "ul",
                indent: "no"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var output = "";
                var jumpid = "";
                var pre = "";
                if (options.scope == "children") {
                    pre = "> ";
                }
                if (options.what == "headers") {
                    options.what = ":header";
                }
                $(options.from).find(pre + options.what).each(function() {
                    var $current = $(this);
                    var space = "";
                    if (options.what == ":header" && options.indent == "yes") {
                        var tag = $current.prop("tagName");
                        if (tag.length == 2 && tag[1] != "") {
                            var spaces = tag[1] - 1;
                            for (var i = 1; i <= spaces; i++) {
                                space += "&nbsp; &nbsp; ";
                            }
                        }
                    }
                    if (options.linked == "yes") {
                        if ($current.attr("id") !== undefined) {
                            var id = $current.attr("id");
                        } else {
                            var id = s.prefix + "-uid-" + (++uid);
                            $current.attr("id", id);
                        }
                        if (window.location.hash == "#" + id) {
                            jumpid = id;
                        }
                        if (options.style == "select") {
                            output += '<option value="' + id + '">' + space + $(this).text() + "</option>";
                        } else {
                            output += '<li><a href="#' + id + '">' + space + $(this).text() + "</a></li>";
                        }
                    } else {
                        if (options.style == "select") {
                            output += '<option value="">' + space + $(this).text() + "</option>";
                        } else {
                            output += "<li>" + space + $(this).text() + "</li>";
                        }
                    }
                });
                if (output != "") {
                    $that.html("<" + options.style + ">" + output + "</" + options.style + ">");
                    if (options.style == "select" && options.linked == "yes") {
                        $that.find("select").on("change", function() {
                            window.location.hash = "#" + $(this).val();
                            $(this).blur();
                        });
                    }
                    if (options.style == "select" && options.linked == "yes" && jumpid != "") {
                        $that.find("select").val(jumpid);
                        if ($that.find("#" + jumpid).offset() !== undefined) {
                            var ypos = $that.find("#" + jumpid).offset().top;
                            $("html, body").css({
                                scrollTop: ypos + "px"
                            });
                        }
                    }
                }
            };
            return command;
        }());
        plugin.commands.gallery = (function() {
            var command = {};
            plugin.addCommandDefaults("gallery", {
                active: 1,
                event: "click",
                showcaptions: "yes",
                animation: "none",
                speed: 500,
                easing: "linear",
                lightbox: "no"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var type = "gallery";
                var images = $that.children();
                $that.html($that.children(":nth-child(" + options.active + ")").clone());
                if (options.lightbox == "yes") {
                    plugin.executeCommand($that.find("img"), "lightbox", {});
                }
                var $thumbdiv = $("<div/>", {
                    id: s.prefix + "-" + $that.attr("id") + "-" + type + "-thumbs"
                }).addClass(s.prefix + "-" + type + "-thumbs").insertAfter($that);
                if (options.showcaptions == "yes") {
                    var $captiondiv = $("<div/>", {
                        id: s.prefix + "-" + $that.attr("id") + "-" + type + "-captions"
                    }).addClass(s.prefix + "-" + type + "-captions").text($(images[options.active - 1]).attr("title")).insertAfter($that);
                }
                $.each(images, function(index, value) {
                    if (options.event != "click" && options.lightbox == "yes") {
                        plugin.executeCommand($(value), "lightbox", {
                            group: s.prefix + "-" + $that.attr("id") + "-" + type
                        });
                    }
                    if (options.active - 1 == index) {
                        $(value).addClass(s.activeClass);
                    }
                    $(value).on(options.event, function() {
                        plugin.triggerEvent("hideentry", $that, options);
                        $that.jKit_effect(false, options.animation, options.speed, options.easing, 0, function() {
                            $that.find("img").attr("src", $(value).attr("src"));
                            if (options.lightbox == "yes") {
                                plugin.executeCommand($that.find("img").unbind("click"), "lightbox", {});
                            }
                            plugin.triggerEvent("showentry showentry" + (index + 1), $that, options);
                            $that.jKit_effect(true, options.animation, options.speed, options.easing, 0);
                            $thumbdiv.find("img").removeClass(s.activeClass);
                            $(value).addClass(s.activeClass);
                            if (options.showcaptions == "yes") {
                                $captiondiv.text($(value).attr("title"));
                            }
                        });
                    }).css({
                        cursor: "pointer"
                    }).appendTo($thumbdiv);
                });
            };
            return command;
        }());
        plugin.commands.background = (function() {
            var command = {};
            plugin.addCommandDefaults("background", {
                distort: "no"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var $bg = $("<div/>", {
                    id: s.prefix + "-background"
                }).css({
                    position: "fixed",
                    right: "0px",
                    top: "0px",
                    overflow: "hidden",
                    "z-index": "-1",
                    width: $(window).width(),
                    height: $(window).height()
                }).appendTo("body");
                $bg.append($that);
                var ow = $that.attr("width");
                var oh = $that.attr("height");
                scaleFit($bg, $that, ow, oh, options.distort);
                $(window).resize(function() {
                    scaleFit($bg, $that, ow, oh, options.distort);
                    plugin.triggerEvent("resized", $that, options);
                });
            };
            scaleFit = function(bg, element, originalWidth, originalHeight, distort) {
                var w = $(window).width();
                var h = $(window).height();
                bg.css({
                    width: w + "px",
                    height: h + "px"
                });
                var top = 0;
                var left = 0;
                if (distort == "no") {
                    var imgRatio = originalWidth / originalHeight;
                    var screenRatio = w / h;
                    if (imgRatio > screenRatio) {
                        w = h * imgRatio;
                        left = (w - $(window).width()) / 2 * -1;
                    } else {
                        h = w / imgRatio;
                        top = (h - $(window).height()) / 2 * -1;
                    }
                }
                element.css({
                    position: "fixed",
                    top: top + "px",
                    left: left + "px",
                    width: w + "px",
                    height: h + "px"
                });
            };
            return command;
        }());
        plugin.commands.live = (function() {
            var command = {};
            plugin.addCommandDefaults("live", {
                interval: 60
            });
            command.execute = function($that, options) {
                if ($that.attr("src") !== undefined) {
                    window.setInterval(function() {
                        updateSrc($that, options);
                        plugin.triggerEvent("reloaded", $that, options);
                    }, options.interval * 1000);
                }
            };
            var updateSrc = function($el, options) {
                if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && ($el.jKit_inViewport() || !$el.jKit_inViewport() && plugin.settings.ignoreViewport)) {
                    var srcSplit = $el.attr("src").split("?");
                    $el.attr("src", srcSplit[0] + "?t=" + $.fn.jKit_getUnixtime());
                }
            };
            return command;
        }());
        plugin.commands.lightbox = (function() {
            var command = {};
            var lightboxes = {};
            plugin.addCommandDefaults("lightbox", {
                speed: 500,
                opacity: 0.7,
                clearance: 200,
                closer: "x",
                next: ">",
                prev: "<",
                modal: "no",
                width: "",
                height: "",
                titleHeight: 20,
                group: ""
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                var type = "lightbox";
                var src = "";
                if ($that.attr("href") !== undefined) {
                    src = $that.attr("href");
                }
                if (src == "" && $that.attr("src") !== undefined) {
                    src = $that.attr("src");
                }
                if (src == "" && $that.css("background-image") !== undefined) {
                    src = $that.css("background-image").replace('"', "").replace('"', "").replace("url(", "").replace(")", "");
                }
                if (src != "") {
                    if (options.group != "") {
                        if (lightboxes[options.group] == undefined) {
                            lightboxes[options.group] = [];
                        }
                        lightboxes[options.group].push($that);
                    }
                    $that.on("click", function() {
                        plugin.triggerEvent("clicked", $that, options);
                        if (options.modal == "no") {
                            var $overlay = $("<div/>", {
                                id: s.prefix + "-" + type + "-bg",
                                "class": s.prefix + "-" + type + "-closer " + s.prefix + "-" + type + "-el"
                            }).fadeTo(options.speed, options.opacity).appendTo("body");
                        }
                        var $content = $("<div/>", {
                            id: s.prefix + "-" + type + "-content",
                            "class": s.prefix + "-" + type + "-el"
                        }).fadeTo(0, 0.01).appendTo("body");
                        if ($.fn.jKit_iOS()) {
                            $content.css("top", $(window).scrollTop() + "px");
                        }
                        if (options.width != "") {
                            $content.css({
                                width: options.width
                            });
                            $content.css({
                                left: (($(window).width() - $content.outerWidth()) / 2) + "px"
                            });
                        }
                        if (options.height != "") {
                            $content.css({
                                height: options.height
                            });
                            $content.css({
                                top: (($(window).height() - $content.outerHeight()) / 2) + "px"
                            });
                        }
                        var $nav = $("<div/>", {
                            id: s.prefix + "-" + type + "-nav",
                            "class": s.prefix + "-" + type + "-el"
                        }).hide().fadeTo(options.speed, 1).appendTo("body");
                        var $closer = $("<span/>", {
                            "class": s.prefix + "-" + type + "-closer"
                        }).html(options.closer).prependTo($nav);
                        var offset = $content.offset();
                        $nav.css({
                            top: (offset.top - options.titleHeight - $(window).scrollTop()) + "px",
                            left: (offset.left + $content.outerWidth() - $nav.width()) + "px"
                        });
                        if (options.group != "") {
                            var $next = $("<span/>", {
                                id: s.prefix + "-" + type + "-nav-next"
                            }).prependTo($nav);
                            var $prev = $("<span/>", {
                                id: s.prefix + "-" + type + "-nav-prev"
                            }).prependTo($nav);
                            plugin.addKeypressEvents($next, "right");
                            plugin.addKeypressEvents($prev, "left");
                            if (lightboxes[options.group][lightboxes[options.group].length - 1] != $that) {
                                $next.html(options.next).on("click right", function() {
                                    $.each(lightboxes[options.group], function(i, v) {
                                        if (v == $that) {
                                            $("." + plugin.settings.prefix + "-" + type + "-el").fadeTo(options.speed, 0, function() {
                                                $(this).remove();
                                            });
                                            lightboxes[options.group][i + 1].click();
                                        }
                                    });
                                });
                            }
                            if (lightboxes[options.group][0] != $that) {
                                $prev.html(options.prev).on("click left", function() {
                                    $.each(lightboxes[options.group], function(i, v) {
                                        if (v == $that) {
                                            $("." + plugin.settings.prefix + "-" + type + "-el").fadeTo(options.speed, 0, function() {
                                                $(this).remove();
                                            });
                                            lightboxes[options.group][i - 1].click();
                                        }
                                    });
                                });
                            }
                        }
                        $title = $("<div/>", {
                            id: s.prefix + "-" + type + "-title",
                            "class": s.prefix + "-" + type + "-el"
                        }).css({
                            top: (offset.top - options.titleHeight - $(window).scrollTop()) + "px",
                            left: (offset.left) + "px",
                            width: $content.width() + "px"
                        }).hide().text($that.attr("title")).fadeTo(options.speed, 1).appendTo("body");
                        if (!$.support.leadingWhitespace) {
                            src = src + "?" + new Date().getTime();
                        }
                        var img = new Image();
                        $(img).load(function() {
                            var scalex = ($(this).outerWidth() + options.clearance) / $(window).width();
                            var scaley = ($(this).outerHeight() + options.clearance) / $(window).height();
                            var scale = Math.max(scalex, scaley);
                            if (scale > 1) {
                                var oh = $(this).height();
                                $(this).width($(this).width() / scale);
                                $(this).height(oh / scale);
                            }
                            var xmargin = ($(window).width() - $(this).outerWidth()) / 2;
                            var ymargin = ($(window).height() - $(this).outerHeight()) / 2;
                            $content.width($(this).width()).height($(this).height()).css({
                                left: xmargin + "px",
                                top: ymargin + "px"
                            }).fadeTo(options.speed, 1);
                            $(this).hide().fadeTo(options.speed, 1);
                            if ($that.attr("title") != "") {
                                $title.css({
                                    top: (ymargin - options.titleHeight) + "px",
                                    left: xmargin + "px",
                                    width: $(this).width() + "px"
                                });
                            }
                            $nav.css({
                                top: (ymargin - options.titleHeight) + "px",
                                left: (xmargin + $content.outerWidth() - $nav.width()) + "px"
                            });
                        }).attr("src", src).appendTo($content).error(function() {
                            $content.html('<iframe id="' + s.prefix + "-" + type + '-iframe" src="' + src + '" style="border:none;width:100%;height:100%"></iframe>').fadeTo(options.speed, 1);
                        });
                        $("." + s.prefix + "-" + type + "-closer").click(function() {
                            $("." + s.prefix + "-" + type + "-el").fadeTo(options.speed, 0, function() {
                                $(this).remove();
                            });
                        });
                        $(window).keydown(function(e) {
                            if (e.which == 27) {
                                $("." + s.prefix + "-" + type + "-el").fadeTo(options.speed, 0, function() {
                                    $(this).remove();
                                });
                            }
                        });
                        return false;
                    });
                }
            };
            plugin.closeLightbox = function() {
                $("." + plugin.settings.prefix + "-lightbox-el").fadeTo("fast", 0, function() {
                    $(this).remove();
                });
            };
            return command;
        }());
        plugin.commands.menu = (function() {
            var command = {};
            plugin.addCommandDefaults("menu", {
                autoactive: "no"
            });
            command.execute = function($that, options) {
                var s = plugin.settings;
                if (options.autoactive == "yes") {
                    var path = window.location.toString().split("#")[0].split("/");
                    $that.find("a").filter(function() {
                        return $(this).attr("href") == path[path.length - 1];
                    }).addClass(s.activeClass);
                }
                $that.find("li").hover(function() {
                    $(this).addClass("hover");
                    $("ul:first", this).css("visibility", "visible");
                }, function() {
                    $(this).removeClass("hover");
                    $("ul:first", this).css("visibility", "hidden");
                }).on("click", function() {
                    $(this).addClass("hover");
                    $("ul:first", this).css("visibility", "visible");
                });
            };
            return command;
        }());
        for (x in plugin.commands) {
            if (x != "init") {
                plugin.inc.push(x);
            }
        }
        plugin.init();
    };
    $.fn.jKit_effect = function(show, type, speed, easing, delay, fn) {
        return this.each(function() {
            if (fn == undefined) {
                fn = function() {};
            }
            if (delay == undefined) {
                delay = 0;
            }
            if (type == "fade") {
                if (show) {
                    $(this).delay(delay).fadeTo(speed, 1, easing, fn);
                } else {
                    $(this).delay(delay).fadeTo(speed, 0, easing, fn);
                }
            } else {
                if (type == "slide") {
                    if (show) {
                        $(this).delay(delay).slideDown(speed, easing, fn);
                    } else {
                        $(this).delay(delay).slideUp(speed, easing, fn);
                    }
                } else {
                    if (type == "none") {
                        if (show) {
                            $(this).delay(delay).show();
                        } else {
                            $(this).delay(delay).hide();
                        }
                        fn();
                    } else {
                        if (show) {
                            $(this).delay(delay).show(speed, easing, fn);
                        } else {
                            $(this).delay(delay).hide(speed, easing, fn);
                        }
                    }
                }
            }
        });
    };
    $.fn.jKit_getUnixtime = function() {
        var now = new Date;
        var unixtime_ms = now.getTime();
        return parseInt(unixtime_ms / 1000);
    };
    $.fn.jKit_arrayShuffle = function(arr) {
        var tmp, rand;
        for (var i = 0; i < arr.length; i++) {
            rand = Math.floor(Math.random() * arr.length);
            tmp = arr[i];
            arr[i] = arr[rand];
            arr[rand] = tmp;
        }
        return arr;
    };
    $.fn.jKit_stringOccurrences = function(string, substring) {
        var n = 0;
        var pos = 0;
        while (true) {
            pos = string.indexOf(substring, pos);
            if (pos != -1) {
                n++;
                pos += substring.length;
            } else {
                break;
            }
        }
        return (n);
    };
    $.fn.jKit_emailCheck = function(string) {
        var filter = /^[a-z0-9\._-]+@([a-z0-9_-]+\.)+[a-z]{2,6}$/i;
        return filter.test(string);
    };
    $.fn.jKit_urlCheck = function(string) {
        var filter = /^(?:(ftp|http|https):\/\/)?(?:[\w\-]+\.)+[a-z]{2,6}$/i;
        return filter.test(string);
    };
    $.fn.jKit_dateCheck = function(string) {
        return $.fn.jKit_regexTests(string, [/^[0-9]{2}\.[0-9]{2}\.[0-9]{2}$/i, /^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{2}$/i, /^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}$/i, /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/i, /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/i, /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/i]);
    };
    $.fn.jKit_timeCheck = function(string) {
        return $.fn.jKit_regexTests(string, [/^[0-9]{1,2}\:[0-9]{2}$/i, /^[0-9]{1,2}\:[0-9]{2}\:[0-9]{2}$/i]);
    };
    $.fn.jKit_phoneCheck = function(string) {
        return $.fn.jKit_regexTests(string, [/^(\+|0)([\d ])+(0|\(0\))+[\d ]+(-\d*)?\d$/, /^(\+|0)[\d ]+(-\d*)?\d$/, /^((((\(\d{3}\))|(\d{3}-))\d{3}-\d{4})|(\+?\d{2}((-| )\d{1,8}){1,5}))(( x| ext)\d{1,5}){0,1}$/]);
    };
    $.fn.jKit_passwordStrength = function(passwd) {
        var intScore = 0;
        if (passwd.length < 5) {
            intScore = intScore + 5;
        } else {
            if (passwd.length > 4 && passwd.length < 8) {
                intScore = intScore + 15;
            } else {
                if (passwd.length >= 8) {
                    intScore = intScore + 30;
                }
            }
        }
        if (passwd.match(/[a-z]/)) {
            intScore = intScore + 5;
        }
        if (passwd.match(/[A-Z]/)) {
            intScore = intScore + 10;
        }
        if (passwd.match(/\d+/)) {
            intScore = intScore + 10;
        }
        if (passwd.match(/(.*[0-9].*[0-9].*[0-9])/)) {
            intScore = intScore + 10;
        }
        if (passwd.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {
            intScore = intScore + 10;
        }
        if (passwd.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) {
            intScore = intScore + 10;
        }
        if (passwd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
            intScore = intScore + 5;
        }
        if (passwd.match(/([a-zA-Z])/) && passwd.match(/([0-9])/)) {
            intScore = intScore + 5;
        }
        if (passwd.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)) {
            intScore = intScore + 5;
        }
        return intScore;
    };
    $.fn.jKit_regexTests = function(string, tests, checkall) {
        if (checkall === undefined) {
            checkall = false;
        }
        var matches = 0;
        for (var x in tests) {
            if (tests[x].test(string)) {
                matches++;
            }
        }
        return (checkall && matches == tests.length) || (!checkall && matches > 0);
    };
    $.fn.jKit_getAttributes = function() {
        return this.each(function() {
            var map = {};
            var attributes = $(this)[0].attributes;
            var aLength = attributes.length;
            for (var a = 0; a < aLength; a++) {
                map[attributes[a].name.toLowerCase()] = attributes[a].value;
            }
            return map;
        });
    };
    $.fn.jKit_setAttributes = function(attr) {
        return this.each(function() {
            $.each(attr, function(i, v) {
                try {
                    $(this).attr(String(i), String(v));
                } catch (err) {}
            });
        });
    };
    $.fn.jKit_iOS = function() {
        return navigator.userAgent.match(/(iPod|iPhone|iPad)/i);
    };
    $.fn.jKit_belowTheFold = function() {
        var fold = $(window).height() + $(window).scrollTop();
        return fold <= $(this).offset().top;
    };
    $.fn.jKit_aboveTheTop = function() {
        var top = $(window).scrollTop();
        return top >= $(this).offset().top + $(this).height();
    };
    $.fn.jKit_rightOfScreen = function() {
        var fold = $(window).width() + $(window).scrollLeft();
        return fold <= $(this).offset().left;
    };
    $.fn.jKit_leftOfScreen = function() {
        var left = $(window).scrollLeft();
        return left >= $(this).offset().left + $(this).width();
    };
    $.fn.jKit_inViewport = function() {
        return !$(this).jKit_belowTheFold() && !$(this).jKit_aboveTheTop() && !$(this).jKit_rightOfScreen() && !$(this).jKit_leftOfScreen();
    };
    $.fn.jKit = function(options, moreoptions) {
        return this.each(function() {
            var plugin = new $.jKit(this, options, moreoptions);
            $(this).data("jKit", plugin);
        });
    };
})(jQuery);
/*! jQuery UI - v1.10.4 - 2014-08-06
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.menu.js, jquery.ui.spinner.js, jquery.ui.tooltip.js, jquery.ui.effect.js, jquery.ui.effect-blind.js, jquery.ui.effect-fade.js, jquery.ui.effect-highlight.js
 * Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function(b, f) {
    var a = 0,
        e = /^ui-id-\d+$/;
    b.ui = b.ui || {};
    b.extend(b.ui, {
        version: "1.10.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    b.fn.extend({
        focus: (function(g) {
            return function(h, i) {
                return typeof h === "number" ? this.each(function() {
                    var j = this;
                    setTimeout(function() {
                        b(j).focus();
                        if (i) {
                            i.call(j);
                        }
                    }, h);
                }) : g.apply(this, arguments);
            };
        })(b.fn.focus),
        scrollParent: function() {
            var g;
            if ((b.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                g = this.parents().filter(function() {
                    return (/(relative|absolute|fixed)/).test(b.css(this, "position")) && (/(auto|scroll)/).test(b.css(this, "overflow") + b.css(this, "overflow-y") + b.css(this, "overflow-x"));
                }).eq(0);
            } else {
                g = this.parents().filter(function() {
                    return (/(auto|scroll)/).test(b.css(this, "overflow") + b.css(this, "overflow-y") + b.css(this, "overflow-x"));
                }).eq(0);
            }
            return (/fixed/).test(this.css("position")) || !g.length ? b(document) : g;
        },
        zIndex: function(j) {
            if (j !== f) {
                return this.css("zIndex", j);
            }
            if (this.length) {
                var h = b(this[0]),
                    g, i;
                while (h.length && h[0] !== document) {
                    g = h.css("position");
                    if (g === "absolute" || g === "relative" || g === "fixed") {
                        i = parseInt(h.css("zIndex"), 10);
                        if (!isNaN(i) && i !== 0) {
                            return i;
                        }
                    }
                    h = h.parent();
                }
            }
            return 0;
        },
        uniqueId: function() {
            return this.each(function() {
                if (!this.id) {
                    this.id = "ui-id-" + (++a);
                }
            });
        },
        removeUniqueId: function() {
            return this.each(function() {
                if (e.test(this.id)) {
                    b(this).removeAttr("id");
                }
            });
        }
    });

    function d(i, g) {
        var k, j, h, l = i.nodeName.toLowerCase();
        if ("area" === l) {
            k = i.parentNode;
            j = k.name;
            if (!i.href || !j || k.nodeName.toLowerCase() !== "map") {
                return false;
            }
            h = b("img[usemap=#" + j + "]")[0];
            return !!h && c(h);
        }
        return (/input|select|textarea|button|object/.test(l) ? !i.disabled : "a" === l ? i.href || g : g) && c(i);
    }

    function c(g) {
        return b.expr.filters.visible(g) && !b(g).parents().addBack().filter(function() {
            return b.css(this, "visibility") === "hidden";
        }).length;
    }
    b.extend(b.expr[":"], {
        data: b.expr.createPseudo ? b.expr.createPseudo(function(g) {
            return function(h) {
                return !!b.data(h, g);
            };
        }) : function(j, h, g) {
            return !!b.data(j, g[3]);
        },
        focusable: function(g) {
            return d(g, !isNaN(b.attr(g, "tabindex")));
        },
        tabbable: function(i) {
            var g = b.attr(i, "tabindex"),
                h = isNaN(g);
            return (h || g >= 0) && d(i, !h);
        }
    });
    if (!b("<a>").outerWidth(1).jquery) {
        b.each(["Width", "Height"], function(j, g) {
            var h = g === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                k = g.toLowerCase(),
                m = {
                    innerWidth: b.fn.innerWidth,
                    innerHeight: b.fn.innerHeight,
                    outerWidth: b.fn.outerWidth,
                    outerHeight: b.fn.outerHeight
                };

            function l(o, n, i, p) {
                b.each(h, function() {
                    n -= parseFloat(b.css(o, "padding" + this)) || 0;
                    if (i) {
                        n -= parseFloat(b.css(o, "border" + this + "Width")) || 0;
                    }
                    if (p) {
                        n -= parseFloat(b.css(o, "margin" + this)) || 0;
                    }
                });
                return n;
            }
            b.fn["inner" + g] = function(i) {
                if (i === f) {
                    return m["inner" + g].call(this);
                }
                return this.each(function() {
                    b(this).css(k, l(this, i) + "px");
                });
            };
            b.fn["outer" + g] = function(i, n) {
                if (typeof i !== "number") {
                    return m["outer" + g].call(this, i);
                }
                return this.each(function() {
                    b(this).css(k, l(this, i, true, n) + "px");
                });
            };
        });
    }
    if (!b.fn.addBack) {
        b.fn.addBack = function(g) {
            return this.add(g == null ? this.prevObject : this.prevObject.filter(g));
        };
    }
    if (b("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        b.fn.removeData = (function(g) {
            return function(h) {
                if (arguments.length) {
                    return g.call(this, b.camelCase(h));
                } else {
                    return g.call(this);
                }
            };
        })(b.fn.removeData);
    }
    b.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    b.support.selectstart = "onselectstart" in document.createElement("div");
    b.fn.extend({
        disableSelection: function() {
            return this.bind((b.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(g) {
                g.preventDefault();
            });
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection");
        }
    });
    b.extend(b.ui, {
        plugin: {
            add: function(h, j, l) {
                var g, k = b.ui[h].prototype;
                for (g in l) {
                    k.plugins[g] = k.plugins[g] || [];
                    k.plugins[g].push([j, l[g]]);
                }
            },
            call: function(g, j, h) {
                var k, l = g.plugins[j];
                if (!l || !g.element[0].parentNode || g.element[0].parentNode.nodeType === 11) {
                    return;
                }
                for (k = 0; k < l.length; k++) {
                    if (g.options[l[k][0]]) {
                        l[k][1].apply(g.element, h);
                    }
                }
            }
        },
        hasScroll: function(j, h) {
            if (b(j).css("overflow") === "hidden") {
                return false;
            }
            var g = (h && h === "left") ? "scrollLeft" : "scrollTop",
                i = false;
            if (j[g] > 0) {
                return true;
            }
            j[g] = 1;
            i = (j[g] > 0);
            j[g] = 0;
            return i;
        }
    });
})(jQuery);
(function(b, e) {
    var a = 0,
        d = Array.prototype.slice,
        c = b.cleanData;
    b.cleanData = function(f) {
        for (var g = 0, h;
            (h = f[g]) != null; g++) {
            try {
                b(h).triggerHandler("remove");
            } catch (j) {}
        }
        c(f);
    };
    b.widget = function(f, g, n) {
        var k, l, i, m, h = {},
            j = f.split(".")[0];
        f = f.split(".")[1];
        k = j + "-" + f;
        if (!n) {
            n = g;
            g = b.Widget;
        }
        b.expr[":"][k.toLowerCase()] = function(o) {
            return !!b.data(o, k);
        };
        b[j] = b[j] || {};
        l = b[j][f];
        i = b[j][f] = function(o, p) {
            if (!this._createWidget) {
                return new i(o, p);
            }
            if (arguments.length) {
                this._createWidget(o, p);
            }
        };
        b.extend(i, l, {
            version: n.version,
            _proto: b.extend({}, n),
            _childConstructors: []
        });
        m = new g();
        m.options = b.widget.extend({}, m.options);
        b.each(n, function(p, o) {
            if (!b.isFunction(o)) {
                h[p] = o;
                return;
            }
            h[p] = (function() {
                var q = function() {
                        return g.prototype[p].apply(this, arguments);
                    },
                    r = function(s) {
                        return g.prototype[p].apply(this, s);
                    };
                return function() {
                    var u = this._super,
                        s = this._superApply,
                        t;
                    this._super = q;
                    this._superApply = r;
                    t = o.apply(this, arguments);
                    this._super = u;
                    this._superApply = s;
                    return t;
                };
            })();
        });
        i.prototype = b.widget.extend(m, {
            widgetEventPrefix: l ? (m.widgetEventPrefix || f) : f
        }, h, {
            constructor: i,
            namespace: j,
            widgetName: f,
            widgetFullName: k
        });
        if (l) {
            b.each(l._childConstructors, function(p, q) {
                var o = q.prototype;
                b.widget(o.namespace + "." + o.widgetName, i, q._proto);
            });
            delete l._childConstructors;
        } else {
            g._childConstructors.push(i);
        }
        b.widget.bridge(f, i);
    };
    b.widget.extend = function(k) {
        var g = d.call(arguments, 1),
            j = 0,
            f = g.length,
            h, i;
        for (; j < f; j++) {
            for (h in g[j]) {
                i = g[j][h];
                if (g[j].hasOwnProperty(h) && i !== e) {
                    if (b.isPlainObject(i)) {
                        k[h] = b.isPlainObject(k[h]) ? b.widget.extend({}, k[h], i) : b.widget.extend({}, i);
                    } else {
                        k[h] = i;
                    }
                }
            }
        }
        return k;
    };
    b.widget.bridge = function(g, f) {
        var h = f.prototype.widgetFullName || g;
        b.fn[g] = function(k) {
            var i = typeof k === "string",
                j = d.call(arguments, 1),
                l = this;
            k = !i && j.length ? b.widget.extend.apply(null, [k].concat(j)) : k;
            if (i) {
                this.each(function() {
                    var n, m = b.data(this, h);
                    if (!m) {
                        return b.error("cannot call methods on " + g + " prior to initialization; attempted to call method '" + k + "'");
                    }
                    if (!b.isFunction(m[k]) || k.charAt(0) === "_") {
                        return b.error("no such method '" + k + "' for " + g + " widget instance");
                    }
                    n = m[k].apply(m, j);
                    if (n !== m && n !== e) {
                        l = n && n.jquery ? l.pushStack(n.get()) : n;
                        return false;
                    }
                });
            } else {
                this.each(function() {
                    var m = b.data(this, h);
                    if (m) {
                        m.option(k || {})._init();
                    } else {
                        b.data(this, h, new f(k, this));
                    }
                });
            }
            return l;
        };
    };
    b.Widget = function() {};
    b.Widget._childConstructors = [];
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            create: null
        },
        _createWidget: function(f, g) {
            g = b(g || this.defaultElement || this)[0];
            this.element = b(g);
            this.uuid = a++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = b.widget.extend({}, this.options, this._getCreateOptions(), f);
            this.bindings = b();
            this.hoverable = b();
            this.focusable = b();
            if (g !== this) {
                b.data(g, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function(h) {
                        if (h.target === g) {
                            this.destroy();
                        }
                    }
                });
                this.document = b(g.style ? g.ownerDocument : g.document || g);
                this.window = b(this.document[0].defaultView || this.document[0].parentWindow);
            }
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init();
        },
        _getCreateOptions: b.noop,
        _getCreateEventData: b.noop,
        _create: b.noop,
        _init: b.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(b.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy: b.noop,
        widget: function() {
            return this.element;
        },
        option: function(j, k) {
            var f = j,
                l, h, g;
            if (arguments.length === 0) {
                return b.widget.extend({}, this.options);
            }
            if (typeof j === "string") {
                f = {};
                l = j.split(".");
                j = l.shift();
                if (l.length) {
                    h = f[j] = b.widget.extend({}, this.options[j]);
                    for (g = 0; g < l.length - 1; g++) {
                        h[l[g]] = h[l[g]] || {};
                        h = h[l[g]];
                    }
                    j = l.pop();
                    if (arguments.length === 1) {
                        return h[j] === e ? null : h[j];
                    }
                    h[j] = k;
                } else {
                    if (arguments.length === 1) {
                        return this.options[j] === e ? null : this.options[j];
                    }
                    f[j] = k;
                }
            }
            this._setOptions(f);
            return this;
        },
        _setOptions: function(f) {
            var g;
            for (g in f) {
                this._setOption(g, f[g]);
            }
            return this;
        },
        _setOption: function(f, g) {
            this.options[f] = g;
            if (f === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!g).attr("aria-disabled", g);
                this.hoverable.removeClass("ui-state-hover");
                this.focusable.removeClass("ui-state-focus");
            }
            return this;
        },
        enable: function() {
            return this._setOption("disabled", false);
        },
        disable: function() {
            return this._setOption("disabled", true);
        },
        _on: function(i, h, g) {
            var j, f = this;
            if (typeof i !== "boolean") {
                g = h;
                h = i;
                i = false;
            }
            if (!g) {
                g = h;
                h = this.element;
                j = this.widget();
            } else {
                h = j = b(h);
                this.bindings = this.bindings.add(h);
            }
            b.each(g, function(p, o) {
                function m() {
                    if (!i && (f.options.disabled === true || b(this).hasClass("ui-state-disabled"))) {
                        return;
                    }
                    return (typeof o === "string" ? f[o] : o).apply(f, arguments);
                }
                if (typeof o !== "string") {
                    m.guid = o.guid = o.guid || m.guid || b.guid++;
                }
                var n = p.match(/^(\w+)\s*(.*)$/),
                    l = n[1] + f.eventNamespace,
                    k = n[2];
                if (k) {
                    j.delegate(k, l, m);
                } else {
                    h.bind(l, m);
                }
            });
        },
        _off: function(g, f) {
            f = (f || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            g.unbind(f).undelegate(f);
        },
        _delay: function(i, h) {
            function g() {
                return (typeof i === "string" ? f[i] : i).apply(f, arguments);
            }
            var f = this;
            return setTimeout(g, h || 0);
        },
        _hoverable: function(f) {
            this.hoverable = this.hoverable.add(f);
            this._on(f, {
                mouseenter: function(g) {
                    b(g.currentTarget).addClass("ui-state-hover");
                },
                mouseleave: function(g) {
                    b(g.currentTarget).removeClass("ui-state-hover");
                }
            });
        },
        _focusable: function(f) {
            this.focusable = this.focusable.add(f);
            this._on(f, {
                focusin: function(g) {
                    b(g.currentTarget).addClass("ui-state-focus");
                },
                focusout: function(g) {
                    b(g.currentTarget).removeClass("ui-state-focus");
                }
            });
        },
        _trigger: function(f, g, h) {
            var k, j, i = this.options[f];
            h = h || {};
            g = b.Event(g);
            g.type = (f === this.widgetEventPrefix ? f : this.widgetEventPrefix + f).toLowerCase();
            g.target = this.element[0];
            j = g.originalEvent;
            if (j) {
                for (k in j) {
                    if (!(k in g)) {
                        g[k] = j[k];
                    }
                }
            }
            this.element.trigger(g, h);
            return !(b.isFunction(i) && i.apply(this.element[0], [g].concat(h)) === false || g.isDefaultPrevented());
        }
    };
    b.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(g, f) {
        b.Widget.prototype["_" + g] = function(j, i, l) {
            if (typeof i === "string") {
                i = {
                    effect: i
                };
            }
            var k, h = !i ? g : i === true || typeof i === "number" ? f : i.effect || f;
            i = i || {};
            if (typeof i === "number") {
                i = {
                    duration: i
                };
            }
            k = !b.isEmptyObject(i);
            i.complete = l;
            if (i.delay) {
                j.delay(i.delay);
            }
            if (k && b.effects && b.effects.effect[h]) {
                j[g](i);
            } else {
                if (h !== g && j[h]) {
                    j[h](i.duration, i.easing, l);
                } else {
                    j.queue(function(m) {
                        b(this)[g]();
                        if (l) {
                            l.call(j[0]);
                        }
                        m();
                    });
                }
            }
        };
    });
})(jQuery);
(function(b, c) {
    var a = false;
    b(document).mouseup(function() {
        a = false;
    });
    b.widget("ui.mouse", {
        version: "1.10.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var d = this;
            this.element.bind("mousedown." + this.widgetName, function(e) {
                return d._mouseDown(e);
            }).bind("click." + this.widgetName, function(e) {
                if (true === b.data(e.target, d.widgetName + ".preventClickEvent")) {
                    b.removeData(e.target, d.widgetName + ".preventClickEvent");
                    e.stopImmediatePropagation();
                    return false;
                }
            });
            this.started = false;
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            }
        },
        _mouseDown: function(f) {
            if (a) {
                return;
            }(this._mouseStarted && this._mouseUp(f));
            this._mouseDownEvent = f;
            var e = this,
                g = (f.which === 1),
                d = (typeof this.options.cancel === "string" && f.target.nodeName ? b(f.target).closest(this.options.cancel).length : false);
            if (!g || d || !this._mouseCapture(f)) {
                return true;
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    e.mouseDelayMet = true;
                }, this.options.delay);
            }
            if (this._mouseDistanceMet(f) && this._mouseDelayMet(f)) {
                this._mouseStarted = (this._mouseStart(f) !== false);
                if (!this._mouseStarted) {
                    f.preventDefault();
                    return true;
                }
            }
            if (true === b.data(f.target, this.widgetName + ".preventClickEvent")) {
                b.removeData(f.target, this.widgetName + ".preventClickEvent");
            }
            this._mouseMoveDelegate = function(h) {
                return e._mouseMove(h);
            };
            this._mouseUpDelegate = function(h) {
                return e._mouseUp(h);
            };
            b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            f.preventDefault();
            a = true;
            return true;
        },
        _mouseMove: function(d) {
            if (b.ui.ie && (!document.documentMode || document.documentMode < 9) && !d.button) {
                return this._mouseUp(d);
            }
            if (this._mouseStarted) {
                this._mouseDrag(d);
                return d.preventDefault();
            }
            if (this._mouseDistanceMet(d) && this._mouseDelayMet(d)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, d) !== false);
                (this._mouseStarted ? this._mouseDrag(d) : this._mouseUp(d));
            }
            return !this._mouseStarted;
        },
        _mouseUp: function(d) {
            b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (d.target === this._mouseDownEvent.target) {
                    b.data(d.target, this.widgetName + ".preventClickEvent", true);
                }
                this._mouseStop(d);
            }
            return false;
        },
        _mouseDistanceMet: function(d) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - d.pageX), Math.abs(this._mouseDownEvent.pageY - d.pageY)) >= this.options.distance);
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet;
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return true;
        }
    });
})(jQuery);
(function(e, c) {
    e.ui = e.ui || {};
    var j, k = Math.max,
        o = Math.abs,
        m = Math.round,
        d = /left|center|right/,
        h = /top|center|bottom/,
        a = /[\+\-]\d+(\.[\d]+)?%?/,
        l = /^\w+/,
        b = /%$/,
        g = e.fn.position;

    function n(r, q, p) {
        return [parseFloat(r[0]) * (b.test(r[0]) ? q / 100 : 1), parseFloat(r[1]) * (b.test(r[1]) ? p / 100 : 1)];
    }

    function i(p, q) {
        return parseInt(e.css(p, q), 10) || 0;
    }

    function f(q) {
        var p = q[0];
        if (p.nodeType === 9) {
            return {
                width: q.width(),
                height: q.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            };
        }
        if (e.isWindow(p)) {
            return {
                width: q.width(),
                height: q.height(),
                offset: {
                    top: q.scrollTop(),
                    left: q.scrollLeft()
                }
            };
        }
        if (p.preventDefault) {
            return {
                width: 0,
                height: 0,
                offset: {
                    top: p.pageY,
                    left: p.pageX
                }
            };
        }
        return {
            width: q.outerWidth(),
            height: q.outerHeight(),
            offset: q.offset()
        };
    }
    e.position = {
        scrollbarWidth: function() {
            if (j !== c) {
                return j;
            }
            var q, p, s = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                r = s.children()[0];
            e("body").append(s);
            q = r.offsetWidth;
            s.css("overflow", "scroll");
            p = r.offsetWidth;
            if (q === p) {
                p = s[0].clientWidth;
            }
            s.remove();
            return (j = q - p);
        },
        getScrollInfo: function(t) {
            var s = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                r = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                q = s === "scroll" || (s === "auto" && t.width < t.element[0].scrollWidth),
                p = r === "scroll" || (r === "auto" && t.height < t.element[0].scrollHeight);
            return {
                width: p ? e.position.scrollbarWidth() : 0,
                height: q ? e.position.scrollbarWidth() : 0
            };
        },
        getWithinInfo: function(q) {
            var r = e(q || window),
                p = e.isWindow(r[0]),
                s = !!r[0] && r[0].nodeType === 9;
            return {
                element: r,
                isWindow: p,
                isDocument: s,
                offset: r.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: r.scrollLeft(),
                scrollTop: r.scrollTop(),
                width: p ? r.width() : r.outerWidth(),
                height: p ? r.height() : r.outerHeight()
            };
        }
    };
    e.fn.position = function(z) {
        if (!z || !z.of) {
            return g.apply(this, arguments);
        }
        z = e.extend({}, z);
        var A, w, u, y, t, p, v = e(z.of),
            s = e.position.getWithinInfo(z.within),
            q = e.position.getScrollInfo(s),
            x = (z.collision || "flip").split(" "),
            r = {};
        p = f(v);
        if (v[0].preventDefault) {
            z.at = "left top";
        }
        w = p.width;
        u = p.height;
        y = p.offset;
        t = e.extend({}, y);
        e.each(["my", "at"], function() {
            var D = (z[this] || "").split(" "),
                C, B;
            if (D.length === 1) {
                D = d.test(D[0]) ? D.concat(["center"]) : h.test(D[0]) ? ["center"].concat(D) : ["center", "center"];
            }
            D[0] = d.test(D[0]) ? D[0] : "center";
            D[1] = h.test(D[1]) ? D[1] : "center";
            C = a.exec(D[0]);
            B = a.exec(D[1]);
            r[this] = [C ? C[0] : 0, B ? B[0] : 0];
            z[this] = [l.exec(D[0])[0], l.exec(D[1])[0]];
        });
        if (x.length === 1) {
            x[1] = x[0];
        }
        if (z.at[0] === "right") {
            t.left += w;
        } else {
            if (z.at[0] === "center") {
                t.left += w / 2;
            }
        }
        if (z.at[1] === "bottom") {
            t.top += u;
        } else {
            if (z.at[1] === "center") {
                t.top += u / 2;
            }
        }
        A = n(r.at, w, u);
        t.left += A[0];
        t.top += A[1];
        return this.each(function() {
            var C, L, E = e(this),
                G = E.outerWidth(),
                D = E.outerHeight(),
                F = i(this, "marginLeft"),
                B = i(this, "marginTop"),
                K = G + F + i(this, "marginRight") + q.width,
                J = D + B + i(this, "marginBottom") + q.height,
                H = e.extend({}, t),
                I = n(r.my, E.outerWidth(), E.outerHeight());
            if (z.my[0] === "right") {
                H.left -= G;
            } else {
                if (z.my[0] === "center") {
                    H.left -= G / 2;
                }
            }
            if (z.my[1] === "bottom") {
                H.top -= D;
            } else {
                if (z.my[1] === "center") {
                    H.top -= D / 2;
                }
            }
            H.left += I[0];
            H.top += I[1];
            if (!e.support.offsetFractions) {
                H.left = m(H.left);
                H.top = m(H.top);
            }
            C = {
                marginLeft: F,
                marginTop: B
            };
            e.each(["left", "top"], function(N, M) {
                if (e.ui.position[x[N]]) {
                    e.ui.position[x[N]][M](H, {
                        targetWidth: w,
                        targetHeight: u,
                        elemWidth: G,
                        elemHeight: D,
                        collisionPosition: C,
                        collisionWidth: K,
                        collisionHeight: J,
                        offset: [A[0] + I[0], A[1] + I[1]],
                        my: z.my,
                        at: z.at,
                        within: s,
                        elem: E
                    });
                }
            });
            if (z.using) {
                L = function(P) {
                    var R = y.left - H.left,
                        O = R + w - G,
                        Q = y.top - H.top,
                        N = Q + u - D,
                        M = {
                            target: {
                                element: v,
                                left: y.left,
                                top: y.top,
                                width: w,
                                height: u
                            },
                            element: {
                                element: E,
                                left: H.left,
                                top: H.top,
                                width: G,
                                height: D
                            },
                            horizontal: O < 0 ? "left" : R > 0 ? "right" : "center",
                            vertical: N < 0 ? "top" : Q > 0 ? "bottom" : "middle"
                        };
                    if (w < G && o(R + O) < w) {
                        M.horizontal = "center";
                    }
                    if (u < D && o(Q + N) < u) {
                        M.vertical = "middle";
                    }
                    if (k(o(R), o(O)) > k(o(Q), o(N))) {
                        M.important = "horizontal";
                    } else {
                        M.important = "vertical";
                    }
                    z.using.call(this, P, M);
                };
            }
            E.offset(e.extend(H, {
                using: L
            }));
        });
    };
    e.ui.position = {
        fit: {
            left: function(t, s) {
                var r = s.within,
                    v = r.isWindow ? r.scrollLeft : r.offset.left,
                    x = r.width,
                    u = t.left - s.collisionPosition.marginLeft,
                    w = v - u,
                    q = u + s.collisionWidth - x - v,
                    p;
                if (s.collisionWidth > x) {
                    if (w > 0 && q <= 0) {
                        p = t.left + w + s.collisionWidth - x - v;
                        t.left += w - p;
                    } else {
                        if (q > 0 && w <= 0) {
                            t.left = v;
                        } else {
                            if (w > q) {
                                t.left = v + x - s.collisionWidth;
                            } else {
                                t.left = v;
                            }
                        }
                    }
                } else {
                    if (w > 0) {
                        t.left += w;
                    } else {
                        if (q > 0) {
                            t.left -= q;
                        } else {
                            t.left = k(t.left - u, t.left);
                        }
                    }
                }
            },
            top: function(s, r) {
                var q = r.within,
                    w = q.isWindow ? q.scrollTop : q.offset.top,
                    x = r.within.height,
                    u = s.top - r.collisionPosition.marginTop,
                    v = w - u,
                    t = u + r.collisionHeight - x - w,
                    p;
                if (r.collisionHeight > x) {
                    if (v > 0 && t <= 0) {
                        p = s.top + v + r.collisionHeight - x - w;
                        s.top += v - p;
                    } else {
                        if (t > 0 && v <= 0) {
                            s.top = w;
                        } else {
                            if (v > t) {
                                s.top = w + x - r.collisionHeight;
                            } else {
                                s.top = w;
                            }
                        }
                    }
                } else {
                    if (v > 0) {
                        s.top += v;
                    } else {
                        if (t > 0) {
                            s.top -= t;
                        } else {
                            s.top = k(s.top - u, s.top);
                        }
                    }
                }
            }
        },
        flip: {
            left: function(v, u) {
                var t = u.within,
                    z = t.offset.left + t.scrollLeft,
                    C = t.width,
                    r = t.isWindow ? t.scrollLeft : t.offset.left,
                    w = v.left - u.collisionPosition.marginLeft,
                    A = w - r,
                    q = w + u.collisionWidth - C - r,
                    y = u.my[0] === "left" ? -u.elemWidth : u.my[0] === "right" ? u.elemWidth : 0,
                    B = u.at[0] === "left" ? u.targetWidth : u.at[0] === "right" ? -u.targetWidth : 0,
                    s = -2 * u.offset[0],
                    p, x;
                if (A < 0) {
                    p = v.left + y + B + s + u.collisionWidth - C - z;
                    if (p < 0 || p < o(A)) {
                        v.left += y + B + s;
                    }
                } else {
                    if (q > 0) {
                        x = v.left - u.collisionPosition.marginLeft + y + B + s - r;
                        if (x > 0 || o(x) < q) {
                            v.left += y + B + s;
                        }
                    }
                }
            },
            top: function(u, t) {
                var s = t.within,
                    B = s.offset.top + s.scrollTop,
                    C = s.height,
                    p = s.isWindow ? s.scrollTop : s.offset.top,
                    w = u.top - t.collisionPosition.marginTop,
                    y = w - p,
                    v = w + t.collisionHeight - C - p,
                    z = t.my[1] === "top",
                    x = z ? -t.elemHeight : t.my[1] === "bottom" ? t.elemHeight : 0,
                    D = t.at[1] === "top" ? t.targetHeight : t.at[1] === "bottom" ? -t.targetHeight : 0,
                    r = -2 * t.offset[1],
                    A, q;
                if (y < 0) {
                    q = u.top + x + D + r + t.collisionHeight - C - B;
                    if ((u.top + x + D + r) > y && (q < 0 || q < o(y))) {
                        u.top += x + D + r;
                    }
                } else {
                    if (v > 0) {
                        A = u.top - t.collisionPosition.marginTop + x + D + r - p;
                        if ((u.top + x + D + r) > v && (A > 0 || o(A) < v)) {
                            u.top += x + D + r;
                        }
                    }
                }
            }
        },
        flipfit: {
            left: function() {
                e.ui.position.flip.left.apply(this, arguments);
                e.ui.position.fit.left.apply(this, arguments);
            },
            top: function() {
                e.ui.position.flip.top.apply(this, arguments);
                e.ui.position.fit.top.apply(this, arguments);
            }
        }
    };
    (function() {
        var t, v, q, s, r, p = document.getElementsByTagName("body")[0],
            u = document.createElement("div");
        t = document.createElement(p ? "div" : "body");
        q = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        };
        if (p) {
            e.extend(q, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
        }
        for (r in q) {
            t.style[r] = q[r];
        }
        t.appendChild(u);
        v = p || document.documentElement;
        v.insertBefore(t, v.firstChild);
        u.style.cssText = "position: absolute; left: 10.7432222px;";
        s = e(u).offset().left;
        e.support.offsetFractions = s > 10 && s < 11;
        t.innerHTML = "";
        v.removeChild(t);
    })();
}(jQuery));
(function(a, b) {
    a.widget("ui.autocomplete", {
        version: "1.10.4",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: false,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function() {
            var e, c, f, h = this.element[0].nodeName.toLowerCase(),
                g = h === "textarea",
                d = h === "input";
            this.isMultiLine = g ? true : d ? false : this.element.prop("isContentEditable");
            this.valueMethod = this.element[g || d ? "val" : "text"];
            this.isNewMenu = true;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
            this._on(this.element, {
                keydown: function(i) {
                    if (this.element.prop("readOnly")) {
                        e = true;
                        f = true;
                        c = true;
                        return;
                    }
                    e = false;
                    f = false;
                    c = false;
                    var j = a.ui.keyCode;
                    switch (i.keyCode) {
                        case j.PAGE_UP:
                            e = true;
                            this._move("previousPage", i);
                            break;
                        case j.PAGE_DOWN:
                            e = true;
                            this._move("nextPage", i);
                            break;
                        case j.UP:
                            e = true;
                            this._keyEvent("previous", i);
                            break;
                        case j.DOWN:
                            e = true;
                            this._keyEvent("next", i);
                            break;
                        case j.ENTER:
                        case j.NUMPAD_ENTER:
                            if (this.menu.active) {
                                e = true;
                                i.preventDefault();
                                this.menu.select(i);
                            }
                            break;
                        case j.TAB:
                            if (this.menu.active) {
                                this.menu.select(i);
                            }
                            break;
                        case j.ESCAPE:
                            if (this.menu.element.is(":visible")) {
                                this._value(this.term);
                                this.close(i);
                                i.preventDefault();
                            }
                            break;
                        default:
                            c = true;
                            this._searchTimeout(i);
                            break;
                    }
                },
                keypress: function(i) {
                    if (e) {
                        e = false;
                        if (!this.isMultiLine || this.menu.element.is(":visible")) {
                            i.preventDefault();
                        }
                        return;
                    }
                    if (c) {
                        return;
                    }
                    var j = a.ui.keyCode;
                    switch (i.keyCode) {
                        case j.PAGE_UP:
                            this._move("previousPage", i);
                            break;
                        case j.PAGE_DOWN:
                            this._move("nextPage", i);
                            break;
                        case j.UP:
                            this._keyEvent("previous", i);
                            break;
                        case j.DOWN:
                            this._keyEvent("next", i);
                            break;
                    }
                },
                input: function(i) {
                    if (f) {
                        f = false;
                        i.preventDefault();
                        return;
                    }
                    this._searchTimeout(i);
                },
                focus: function() {
                    this.selectedItem = null;
                    this.previous = this._value();
                },
                blur: function(i) {
                    if (this.cancelBlur) {
                        delete this.cancelBlur;
                        return;
                    }
                    clearTimeout(this.searching);
                    this.close(i);
                    this._change(i);
                }
            });
            this._initSource();
            this.menu = a("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().data("ui-menu");
            this._on(this.menu.element, {
                mousedown: function(i) {
                    i.preventDefault();
                    this.cancelBlur = true;
                    this._delay(function() {
                        delete this.cancelBlur;
                    });
                    var j = this.menu.element[0];
                    if (!a(i.target).closest(".ui-menu-item").length) {
                        this._delay(function() {
                            var k = this;
                            this.document.one("mousedown", function(l) {
                                if (l.target !== k.element[0] && l.target !== j && !a.contains(j, l.target)) {
                                    k.close();
                                }
                            });
                        });
                    }
                },
                menufocus: function(j, k) {
                    if (this.isNewMenu) {
                        this.isNewMenu = false;
                        if (j.originalEvent && /^mouse/.test(j.originalEvent.type)) {
                            this.menu.blur();
                            this.document.one("mousemove", function() {
                                a(j.target).trigger(j.originalEvent);
                            });
                            return;
                        }
                    }
                    var i = k.item.data("ui-autocomplete-item");
                    if (false !== this._trigger("focus", j, {
                            item: i
                        })) {
                        if (j.originalEvent && /^key/.test(j.originalEvent.type)) {
                            this._value(i.value);
                        }
                    } else {
                        this.liveRegion.text(i.value);
                    }
                },
                menuselect: function(k, l) {
                    var j = {
                            field: a(l.item[0]).children(":first").data("varname"),
                            value: a(l.item[0]).children(":first").attr("value")
                        },
                        i = this.previous;
                    if (this.element[0] !== this.document[0].activeElement) {
                        this.element.focus();
                        this.previous = i;
                        this._delay(function() {
                            this.previous = i;
                            this.selectedItem = j;
                        });
                    }
                    if (false !== this._trigger("select", k, {
                            item: j
                        })) {
                        this._value(j.value);
                    }
                    this.term = this._value();
                    this.close(k);
                    this.selectedItem = j;
                }
            });
            this.liveRegion = a("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertBefore(this.element);
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        _destroy: function() {
            clearTimeout(this.searching);
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
            this.menu.element.remove();
            this.liveRegion.remove();
        },
        _setOption: function(c, d) {
            this._super(c, d);
            if (c === "source") {
                this._initSource();
            }
            if (c === "appendTo") {
                this.menu.element.appendTo(this._appendTo());
            }
            if (c === "disabled" && d && this.xhr) {
                this.xhr.abort();
            }
        },
        _appendTo: function() {
            var c = this.options.appendTo;
            if (c) {
                c = c.jquery || c.nodeType ? a(c) : this.document.find(c).eq(0);
            }
            if (!c) {
                c = this.element.closest(".ui-front");
            }
            if (!c.length) {
                c = this.document[0].body;
            }
            return c;
        },
        _initSource: function() {
            var e, c, d = this;
            if (a.isArray(this.options.source)) {
                e = this.options.source;
                this.source = function(g, f) {
                    f(a.ui.autocomplete.filter(e, g.term));
                };
            } else {
                if (typeof this.options.source === "string") {
                    c = this.options.source;
                    this.source = function(g, f) {
                        if (d.xhr) {
                            d.xhr.abort();
                        }
                        d.xhr = a.ajax({
                            url: c,
                            data: g,
                            dataType: "json",
                            success: function(h) {
                                f(h);
                            },
                            error: function() {
                                f([]);
                            }
                        });
                    };
                } else {
                    this.source = this.options.source;
                }
            }
        },
        _searchTimeout: function(c) {
            clearTimeout(this.searching);
            this.searching = this._delay(function() {
                if (this.term !== this._value()) {
                    this.selectedItem = null;
                    this.search(null, c);
                }
            }, this.options.delay);
        },
        search: function(d, c) {
            d = d != null ? d : this._value();
            this.term = this._value();
            if (d.length < this.options.minLength) {
                return this.close(c);
            }
            if (this._trigger("search", c) === false) {
                return;
            }
            return this._search(d);
        },
        _search: function(c) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.cancelSearch = false;
            this.source({
                term: c
            }, this._response());
        },
        _response: function() {
            var c = ++this.requestIndex;
            return a.proxy(function(d) {
                if (c === this.requestIndex) {
                    this.__response(d);
                }
                this.pending--;
                if (!this.pending) {
                    this.element.removeClass("ui-autocomplete-loading");
                }
            }, this);
        },
        __response: function(c) {
            if (c) {
                c = this._normalize(c);
            }
            this._trigger("response", null, {
                content: c
            });
            if (!this.options.disabled && c && c.length && !this.cancelSearch) {
                this._suggest(c);
                this._trigger("open");
            } else {
                this._close();
            }
        },
        close: function(c) {
            this.cancelSearch = true;
            this._close(c);
        },
        _close: function(c) {
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.blur();
                this.isNewMenu = true;
                this._trigger("close", c);
            }
        },
        _change: function(c) {
            if (this.previous !== this._value()) {
                this._trigger("change", c, {
                    item: this.selectedItem
                });
            }
        },
        _normalize: function(c) {
            if (c.length && c[0].label && c[0].value) {
                return c;
            }
            return a.map(c, function(d) {
                if (typeof d === "string") {
                    return {
                        label: d,
                        value: d
                    };
                }
                return a.extend({
                    label: d.label || d.value,
                    value: d.value || d.label
                }, d);
            });
        },
        _suggest: function(c) {
            var d = this.menu.element.empty();
            this._renderMenu(d, c);
            this.isNewMenu = true;
            this.menu.refresh();
            d.show();
            this._resizeMenu();
            d.position(a.extend({
                of: this.element
            }, this.options.position));
            if (this.options.autoFocus) {
                this.menu.next();
            }
        },
        _resizeMenu: function() {
            var c = this.menu.element;
            c.outerWidth(Math.max(c.width("").outerWidth() + 1, this.element.outerWidth()));
        },
        _renderMenu: function(d, c) {
            var e = this;
            a.each(c, function(f, g) {
                e._renderItemData(d, g);
            });
        },
        _renderItemData: function(c, d) {
            return this._renderItem(c, d).data("ui-autocomplete-item", d);
        },
        _renderItem: function(c, d) {
            return a("<li>").append(a("<a>").text(d.label)).appendTo(c);
        },
        _move: function(d, c) {
            if (!this.menu.element.is(":visible")) {
                this.search(null, c);
                return;
            }
            if (this.menu.isFirstItem() && /^previous/.test(d) || this.menu.isLastItem() && /^next/.test(d)) {
                this._value(this.term);
                this.menu.blur();
                return;
            }
            this.menu[d](c);
        },
        widget: function() {
            return this.menu.element;
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments);
        },
        _keyEvent: function(d, c) {
            if (!this.isMultiLine || this.menu.element.is(":visible")) {
                this._move(d, c);
                c.preventDefault();
            }
        }
    });
    a.extend(a.ui.autocomplete, {
        escapeRegex: function(c) {
            return c.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        },
        filter: function(e, c) {
            var d = new RegExp(a.ui.autocomplete.escapeRegex(c), "i");
            return a.grep(e, function(f) {
                return d.test(f.label || f.value || f);
            });
        }
    });
    a.widget("ui.autocomplete", a.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(c) {
                    return c + (c > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
                }
            }
        },
        __response: function(d) {
            var c;
            this._superApply(arguments);
            if (this.options.disabled || this.cancelSearch) {
                return;
            }
            if (d && d.length) {
                c = this.options.messages.results(d.length);
            } else {
                c = this.options.messages.noResults;
            }
            this.liveRegion.text(c);
        }
    });
}(jQuery));
(function(e, g) {
    var c, b = "ui-button ui-widget ui-state-default ui-corner-all",
        f = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        d = function() {
            var h = e(this);
            setTimeout(function() {
                h.find(":ui-button").button("refresh");
            }, 1);
        },
        a = function(i) {
            var h = i.name,
                j = i.form,
                k = e([]);
            if (h) {
                h = h.replace(/'/g, "\\'");
                if (j) {
                    k = e(j).find("[name='" + h + "']");
                } else {
                    k = e("[name='" + h + "']", i.ownerDocument).filter(function() {
                        return !this.form;
                    });
                }
            }
            return k;
        };
    e.widget("ui.button", {
        version: "1.10.4",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: true,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, d);
            if (typeof this.options.disabled !== "boolean") {
                this.options.disabled = !!this.element.prop("disabled");
            } else {
                this.element.prop("disabled", this.options.disabled);
            }
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var j = this,
                h = this.options,
                k = this.type === "checkbox" || this.type === "radio",
                i = !k ? "ui-state-active" : "";
            if (h.label === null) {
                h.label = (this.type === "input" ? this.buttonElement.val() : this.buttonElement.html());
            }
            this._hoverable(this.buttonElement);
            this.buttonElement.addClass(b).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                if (h.disabled) {
                    return;
                }
                if (this === c) {
                    e(this).addClass("ui-state-active");
                }
            }).bind("mouseleave" + this.eventNamespace, function() {
                if (h.disabled) {
                    return;
                }
                e(this).removeClass(i);
            }).bind("click" + this.eventNamespace, function(l) {
                if (h.disabled) {
                    l.preventDefault();
                    l.stopImmediatePropagation();
                }
            });
            this._on({
                focus: function() {
                    this.buttonElement.addClass("ui-state-focus");
                },
                blur: function() {
                    this.buttonElement.removeClass("ui-state-focus");
                }
            });
            if (k) {
                this.element.bind("change" + this.eventNamespace, function() {
                    j.refresh();
                });
            }
            if (this.type === "checkbox") {
                this.buttonElement.bind("click" + this.eventNamespace, function() {
                    if (h.disabled) {
                        return false;
                    }
                });
            } else {
                if (this.type === "radio") {
                    this.buttonElement.bind("click" + this.eventNamespace, function() {
                        if (h.disabled) {
                            return false;
                        }
                        e(this).addClass("ui-state-active");
                        j.buttonElement.attr("aria-pressed", "true");
                        var l = j.element[0];
                        a(l).not(l).map(function() {
                            return e(this).button("widget")[0];
                        }).removeClass("ui-state-active").attr("aria-pressed", "false");
                    });
                } else {
                    this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                        if (h.disabled) {
                            return false;
                        }
                        e(this).addClass("ui-state-active");
                        c = this;
                        j.document.one("mouseup", function() {
                            c = null;
                        });
                    }).bind("mouseup" + this.eventNamespace, function() {
                        if (h.disabled) {
                            return false;
                        }
                        e(this).removeClass("ui-state-active");
                    }).bind("keydown" + this.eventNamespace, function(l) {
                        if (h.disabled) {
                            return false;
                        }
                        if (l.keyCode === e.ui.keyCode.SPACE || l.keyCode === e.ui.keyCode.ENTER) {
                            e(this).addClass("ui-state-active");
                        }
                    }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                        e(this).removeClass("ui-state-active");
                    });
                    if (this.buttonElement.is("a")) {
                        this.buttonElement.keyup(function(l) {
                            if (l.keyCode === e.ui.keyCode.SPACE) {
                                e(this).click();
                            }
                        });
                    }
                }
            }
            this._setOption("disabled", h.disabled);
            this._resetButton();
        },
        _determineButtonType: function() {
            var h, j, i;
            if (this.element.is("[type=checkbox]")) {
                this.type = "checkbox";
            } else {
                if (this.element.is("[type=radio]")) {
                    this.type = "radio";
                } else {
                    if (this.element.is("input")) {
                        this.type = "input";
                    } else {
                        this.type = "button";
                    }
                }
            }
            if (this.type === "checkbox" || this.type === "radio") {
                h = this.element.parents().last();
                j = "label[for='" + this.element.attr("id") + "']";
                this.buttonElement = h.find(j);
                if (!this.buttonElement.length) {
                    h = h.length ? h.siblings() : this.element.siblings();
                    this.buttonElement = h.filter(j);
                    if (!this.buttonElement.length) {
                        this.buttonElement = h.find(j);
                    }
                }
                this.element.addClass("ui-helper-hidden-accessible");
                i = this.element.is(":checked");
                if (i) {
                    this.buttonElement.addClass("ui-state-active");
                }
                this.buttonElement.prop("aria-pressed", i);
            } else {
                this.buttonElement = this.element;
            }
        },
        widget: function() {
            return this.buttonElement;
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass(b + " ui-state-active " + f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            if (!this.hasTitle) {
                this.buttonElement.removeAttr("title");
            }
        },
        _setOption: function(h, i) {
            this._super(h, i);
            if (h === "disabled") {
                this.element.prop("disabled", !!i);
                if (i) {
                    this.buttonElement.removeClass("ui-state-focus");
                }
                return;
            }
            this._resetButton();
        },
        refresh: function() {
            var h = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            if (h !== this.options.disabled) {
                this._setOption("disabled", h);
            }
            if (this.type === "radio") {
                a(this.element[0]).each(function() {
                    if (e(this).is(":checked")) {
                        e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true");
                    } else {
                        e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false");
                    }
                });
            } else {
                if (this.type === "checkbox") {
                    if (this.element.is(":checked")) {
                        this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true");
                    } else {
                        this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false");
                    }
                }
            }
        },
        _resetButton: function() {
            if (this.type === "input") {
                if (this.options.label) {
                    this.element.val(this.options.label);
                }
                return;
            }
            var l = this.buttonElement.removeClass(f),
                j = e("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(l.empty()).text(),
                i = this.options.icons,
                h = i.primary && i.secondary,
                k = [];
            if (i.primary || i.secondary) {
                if (this.options.text) {
                    k.push("ui-button-text-icon" + (h ? "s" : (i.primary ? "-primary" : "-secondary")));
                }
                if (i.primary) {
                    l.prepend("<span class='ui-button-icon-primary ui-icon " + i.primary + "'></span>");
                }
                if (i.secondary) {
                    l.append("<span class='ui-button-icon-secondary ui-icon " + i.secondary + "'></span>");
                }
                if (!this.options.text) {
                    k.push(h ? "ui-button-icons-only" : "ui-button-icon-only");
                    if (!this.hasTitle) {
                        l.attr("title", e.trim(j));
                    }
                }
            } else {
                k.push("ui-button-text-only");
            }
            l.addClass(k.join(" "));
        }
    });
    e.widget("ui.buttonset", {
        version: "1.10.4",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset");
        },
        _init: function() {
            this.refresh();
        },
        _setOption: function(h, i) {
            if (h === "disabled") {
                this.buttons.button("option", h, i);
            }
            this._super(h, i);
        },
        refresh: function() {
            var h = this.element.css("direction") === "rtl";
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return e(this).button("widget")[0];
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(h ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(h ? "ui-corner-left" : "ui-corner-right").end().end();
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function() {
                return e(this).button("widget")[0];
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
        }
    });
}(jQuery));
(function(a, b) {
    a.widget("ui.menu", {
        version: "1.10.4",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element;
            this.mouseHandled = false;
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, a.proxy(function(c) {
                if (this.options.disabled) {
                    c.preventDefault();
                }
            }, this));
            if (this.options.disabled) {
                this.element.addClass("ui-state-disabled").attr("aria-disabled", "true");
            }
            this._on({
                "mousedown .ui-menu-item > a": function(c) {
                    c.preventDefault();
                },
                "click .ui-state-disabled > a": function(c) {
                    c.preventDefault();
                },
                "click .ui-menu-item:has(a)": function(c) {
                    var d = a(c.target).closest(".ui-menu-item");
                    if (!this.mouseHandled && d.not(".ui-state-disabled").length) {
                        this.select(c);
                        if (!c.isPropagationStopped()) {
                            this.mouseHandled = true;
                        }
                        if (d.has(".ui-menu").length) {
                            this.expand(c);
                        } else {
                            if (!this.element.is(":focus") && a(this.document[0].activeElement).closest(".ui-menu").length) {
                                this.element.trigger("focus", [true]);
                                if (this.active && this.active.parents(".ui-menu").length === 1) {
                                    clearTimeout(this.timer);
                                }
                            }
                        }
                    }
                },
                "mouseenter .ui-menu-item": function(c) {
                    var d = a(c.currentTarget);
                    d.siblings().children(".ui-state-active").removeClass("ui-state-active");
                    this.focus(c, d);
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(e, c) {
                    var d = this.active || this.element.children(".ui-menu-item").eq(0);
                    if (!c) {
                        this.focus(e, d);
                    }
                },
                blur: function(c) {
                    this._delay(function() {
                        if (!a.contains(this.element[0], this.document[0].activeElement)) {
                            this.collapseAll(c);
                        }
                    });
                },
                keydown: "_keydown"
            });
            this.refresh();
            this._on(this.document, {
                click: function(c) {
                    if (!a(c.target).closest(".ui-menu").length) {
                        this.collapseAll(c);
                    }
                    this.mouseHandled = false;
                }
            });
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var c = a(this);
                if (c.data("ui-menu-submenu-carat")) {
                    c.remove();
                }
            });
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");
        },
        _keydown: function(i) {
            var d, h, j, g, f, c = true;

            function e(k) {
                return k.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            }
            switch (i.keyCode) {
                case a.ui.keyCode.PAGE_UP:
                    this.previousPage(i);
                    break;
                case a.ui.keyCode.PAGE_DOWN:
                    this.nextPage(i);
                    break;
                case a.ui.keyCode.HOME:
                    this._move("first", "first", i);
                    break;
                case a.ui.keyCode.END:
                    this._move("last", "last", i);
                    break;
                case a.ui.keyCode.UP:
                    this.previous(i);
                    break;
                case a.ui.keyCode.DOWN:
                    this.next(i);
                    break;
                case a.ui.keyCode.LEFT:
                    this.collapse(i);
                    break;
                case a.ui.keyCode.RIGHT:
                    if (this.active && !this.active.is(".ui-state-disabled")) {
                        this.expand(i);
                    }
                    break;
                case a.ui.keyCode.ENTER:
                case a.ui.keyCode.SPACE:
                    this._activate(i);
                    break;
                case a.ui.keyCode.ESCAPE:
                    this.collapse(i);
                    break;
                default:
                    c = false;
                    h = this.previousFilter || "";
                    j = String.fromCharCode(i.keyCode);
                    g = false;
                    clearTimeout(this.filterTimer);
                    if (j === h) {
                        g = true;
                    } else {
                        j = h + j;
                    }
                    f = new RegExp("^" + e(j), "i");
                    d = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return f.test(a(this).children("a").text());
                    });
                    d = g && d.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : d;
                    if (!d.length) {
                        j = String.fromCharCode(i.keyCode);
                        f = new RegExp("^" + e(j), "i");
                        d = this.activeMenu.children(".ui-menu-item").filter(function() {
                            return f.test(a(this).children("a").text());
                        });
                    }
                    if (d.length) {
                        this.focus(i, d);
                        if (d.length > 1) {
                            this.previousFilter = j;
                            this.filterTimer = this._delay(function() {
                                delete this.previousFilter;
                            }, 1000);
                        } else {
                            delete this.previousFilter;
                        }
                    } else {
                        delete this.previousFilter;
                    }
            }
            if (c) {
                i.preventDefault();
            }
        },
        _activate: function(c) {
            if (!this.active.is(".ui-state-disabled")) {
                if (this.active.children("a[aria-haspopup='true']").length) {
                    this.expand(c);
                } else {
                    this.select(c);
                }
            }
        },
        refresh: function() {
            var e, d = this.options.icons.submenu,
                c = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length);
            c.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var h = a(this),
                    g = h.prev("a"),
                    f = a("<span>").addClass("ui-menu-icon ui-icon " + d).data("ui-menu-submenu-carat", true);
                g.attr("aria-haspopup", "true").prepend(f);
                h.attr("aria-labelledby", g.attr("id"));
            });
            e = c.add(this.element);
            e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            });
            e.children(":not(.ui-menu-item)").each(function() {
                var f = a(this);
                if (!/[^\-\u2014\u2013\s]/.test(f.text())) {
                    f.addClass("ui-widget-content ui-menu-divider");
                }
            });
            e.children(".ui-state-disabled").attr("aria-disabled", "true");
            if (this.active && !a.contains(this.element[0], this.active[0])) {
                this.blur();
            }
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role];
        },
        _setOption: function(c, d) {
            if (c === "icons") {
                this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(d.submenu);
            }
            this._super(c, d);
        },
        focus: function(d, c) {
            var f, e;
            this.blur(d, d && d.type === "focus");
            this._scrollIntoView(c);
            this.active = c.first();
            e = this.active.children("a").addClass("ui-state-focus");
            if (this.options.role) {
                this.element.attr("aria-activedescendant", e.attr("id"));
            }
            this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active");
            if (d && d.type === "keydown") {
                this._close();
            } else {
                this.timer = this._delay(function() {
                    this._close();
                }, this.delay);
            }
            f = c.children(".ui-menu");
            if (f.length && d && (/^mouse/.test(d.type))) {
                this._startOpening(f);
            }
            this.activeMenu = c.parent();
            this._trigger("focus", d, {
                item: c
            });
        },
        _scrollIntoView: function(f) {
            var i, e, g, c, d, h;
            if (this._hasScroll()) {
                i = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0;
                e = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0;
                g = f.offset().top - this.activeMenu.offset().top - i - e;
                c = this.activeMenu.scrollTop();
                d = this.activeMenu.height();
                h = f.height();
                if (g < 0) {
                    this.activeMenu.scrollTop(c + g);
                } else {
                    if (g + h > d) {
                        this.activeMenu.scrollTop(c + g - d + h);
                    }
                }
            }
        },
        blur: function(d, c) {
            if (!c) {
                clearTimeout(this.timer);
            }
            if (!this.active) {
                return;
            }
            this.active.children("a").removeClass("ui-state-focus");
            this.active = null;
            this._trigger("blur", d, {
                item: this.active
            });
        },
        _startOpening: function(c) {
            clearTimeout(this.timer);
            if (c.attr("aria-hidden") !== "true") {
                return;
            }
            this.timer = this._delay(function() {
                this._close();
                this._open(c);
            }, this.delay);
        },
        _open: function(d) {
            var c = a.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer);
            this.element.find(".ui-menu").not(d.parents(".ui-menu")).hide().attr("aria-hidden", "true");
            d.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(c);
        },
        collapseAll: function(d, c) {
            clearTimeout(this.timer);
            this.timer = this._delay(function() {
                var e = c ? this.element : a(d && d.target).closest(this.element.find(".ui-menu"));
                if (!e.length) {
                    e = this.element;
                }
                this._close(e);
                this.blur(d);
                this.activeMenu = e;
            }, this.delay);
        },
        _close: function(c) {
            if (!c) {
                c = this.active ? this.active.parent() : this.element;
            }
            c.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active");
        },
        collapse: function(d) {
            var c = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            if (c && c.length) {
                this._close();
                this.focus(d, c);
            }
        },
        expand: function(d) {
            var c = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            if (c && c.length) {
                this._open(c.parent());
                this._delay(function() {
                    this.focus(d, c);
                });
            }
        },
        next: function(c) {
            this._move("next", "first", c);
        },
        previous: function(c) {
            this._move("prev", "last", c);
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length;
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length;
        },
        _move: function(f, d, e) {
            var c;
            if (this.active) {
                if (f === "first" || f === "last") {
                    c = this.active[f === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1);
                } else {
                    c = this.active[f + "All"](".ui-menu-item").eq(0);
                }
            }
            if (!c || !c.length || !this.active) {
                c = this.activeMenu.children(".ui-menu-item")[d]();
            }
            this.focus(e, c);
        },
        nextPage: function(e) {
            var d, f, c;
            if (!this.active) {
                this.next(e);
                return;
            }
            if (this.isLastItem()) {
                return;
            }
            if (this._hasScroll()) {
                f = this.active.offset().top;
                c = this.element.height();
                this.active.nextAll(".ui-menu-item").each(function() {
                    d = a(this);
                    return d.offset().top - f - c < 0;
                });
                this.focus(e, d);
            } else {
                this.focus(e, this.activeMenu.children(".ui-menu-item")[!this.active ? "first" : "last"]());
            }
        },
        previousPage: function(e) {
            var d, f, c;
            if (!this.active) {
                this.next(e);
                return;
            }
            if (this.isFirstItem()) {
                return;
            }
            if (this._hasScroll()) {
                f = this.active.offset().top;
                c = this.element.height();
                this.active.prevAll(".ui-menu-item").each(function() {
                    d = a(this);
                    return d.offset().top - f + c > 0;
                });
                this.focus(e, d);
            } else {
                this.focus(e, this.activeMenu.children(".ui-menu-item").first());
            }
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight");
        },
        select: function(c) {
            this.active = this.active || a(c.target).closest(".ui-menu-item");
            var d = {
                item: this.active
            };
            if (!this.active.has(".ui-menu").length) {
                this.collapseAll(c, true);
            }
            this._trigger("select", c, d);
        }
    });
}(jQuery));
(function(b) {
    function a(c) {
        return function() {
            var d = this.element.val();
            c.apply(this, arguments);
            this._refresh();
            if (d !== this.element.val()) {
                this._trigger("change");
            }
        };
    }
    b.widget("ui.spinner", {
        version: "1.10.4",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: true,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._setOption("max", this.options.max);
            this._setOption("min", this.options.min);
            this._setOption("step", this.options.step);
            if (this.value() !== "") {
                this._value(this.element.val(), true);
            }
            this._draw();
            this._on(this._events);
            this._refresh();
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        _getCreateOptions: function() {
            var c = {},
                d = this.element;
            b.each(["min", "max", "step"], function(e, f) {
                var g = d.attr(f);
                if (g !== undefined && g.length) {
                    c[f] = g;
                }
            });
            return c;
        },
        _events: {
            keydown: function(c) {
                if (this._start(c) && this._keydown(c)) {
                    c.preventDefault();
                }
            },
            keyup: "_stop",
            focus: function() {
                this.previous = this.element.val();
            },
            blur: function(c) {
                if (this.cancelBlur) {
                    delete this.cancelBlur;
                    return;
                }
                this._stop();
                this._refresh();
                if (this.previous !== this.element.val()) {
                    this._trigger("change", c);
                }
            },
            mousewheel: function(c, d) {
                if (!d) {
                    return;
                }
                if (!this.spinning && !this._start(c)) {
                    return false;
                }
                this._spin((d > 0 ? 1 : -1) * this.options.step, c);
                clearTimeout(this.mousewheelTimer);
                this.mousewheelTimer = this._delay(function() {
                    if (this.spinning) {
                        this._stop(c);
                    }
                }, 100);
                c.preventDefault();
            },
            "mousedown .ui-spinner-button": function(d) {
                var c;
                c = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val();

                function e() {
                    var f = this.element[0] === this.document[0].activeElement;
                    if (!f) {
                        this.element.focus();
                        this.previous = c;
                        this._delay(function() {
                            this.previous = c;
                        });
                    }
                }
                d.preventDefault();
                e.call(this);
                this.cancelBlur = true;
                this._delay(function() {
                    delete this.cancelBlur;
                    e.call(this);
                });
                if (this._start(d) === false) {
                    return;
                }
                this._repeat(null, b(d.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, d);
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function(c) {
                if (!b(c.currentTarget).hasClass("ui-state-active")) {
                    return;
                }
                if (this._start(c) === false) {
                    return false;
                }
                this._repeat(null, b(c.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, c);
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function() {
            var c = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton");
            this.buttons = c.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all");
            if (this.buttons.height() > Math.ceil(c.height() * 0.5) && c.height() > 0) {
                c.height(c.height());
            }
            if (this.options.disabled) {
                this.disable();
            }
        },
        _keydown: function(d) {
            var c = this.options,
                e = b.ui.keyCode;
            switch (d.keyCode) {
                case e.UP:
                    this._repeat(null, 1, d);
                    return true;
                case e.DOWN:
                    this._repeat(null, -1, d);
                    return true;
                case e.PAGE_UP:
                    this._repeat(null, c.page, d);
                    return true;
                case e.PAGE_DOWN:
                    this._repeat(null, -c.page, d);
                    return true;
            }
            return false;
        },
        _uiSpinnerHtml: function() {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";
        },
        _buttonHtml: function() {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>";
        },
        _start: function(c) {
            if (!this.spinning && this._trigger("start", c) === false) {
                return false;
            }
            if (!this.counter) {
                this.counter = 1;
            }
            this.spinning = true;
            return true;
        },
        _repeat: function(d, c, e) {
            d = d || 500;
            clearTimeout(this.timer);
            this.timer = this._delay(function() {
                this._repeat(40, c, e);
            }, d);
            this._spin(c * this.options.step, e);
        },
        _spin: function(d, c) {
            var e = this.value() || 0;
            if (!this.counter) {
                this.counter = 1;
            }
            e = this._adjustValue(e + d * this._increment(this.counter));
            if (!this.spinning || this._trigger("spin", c, {
                    value: e
                }) !== false) {
                this._value(e);
                this.counter++;
            }
        },
        _increment: function(c) {
            var d = this.options.incremental;
            if (d) {
                return b.isFunction(d) ? d(c) : Math.floor(c * c * c / 50000 - c * c / 500 + 17 * c / 200 + 1);
            }
            return 1;
        },
        _precision: function() {
            var c = this._precisionOf(this.options.step);
            if (this.options.min !== null) {
                c = Math.max(c, this._precisionOf(this.options.min));
            }
            return c;
        },
        _precisionOf: function(d) {
            var e = d.toString(),
                c = e.indexOf(".");
            return c === -1 ? 0 : e.length - c - 1;
        },
        _adjustValue: function(e) {
            var d, f, c = this.options;
            d = c.min !== null ? c.min : 0;
            f = e - d;
            f = Math.round(f / c.step) * c.step;
            e = d + f;
            e = parseFloat(e.toFixed(this._precision()));
            if (c.max !== null && e > c.max) {
                return c.max;
            }
            if (c.min !== null && e < c.min) {
                return c.min;
            }
            return e;
        },
        _stop: function(c) {
            if (!this.spinning) {
                return;
            }
            clearTimeout(this.timer);
            clearTimeout(this.mousewheelTimer);
            this.counter = 0;
            this.spinning = false;
            this._trigger("stop", c);
        },
        _setOption: function(c, d) {
            if (c === "culture" || c === "numberFormat") {
                var e = this._parse(this.element.val());
                this.options[c] = d;
                this.element.val(this._format(e));
                return;
            }
            if (c === "max" || c === "min" || c === "step") {
                if (typeof d === "string") {
                    d = this._parse(d);
                }
            }
            if (c === "icons") {
                this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(d.up);
                this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(d.down);
            }
            this._super(c, d);
            if (c === "disabled") {
                if (d) {
                    this.element.prop("disabled", true);
                    this.buttons.button("disable");
                } else {
                    this.element.prop("disabled", false);
                    this.buttons.button("enable");
                }
            }
        },
        _setOptions: a(function(c) {
            this._super(c);
            this._value(this.element.val());
        }),
        _parse: function(c) {
            if (typeof c === "string" && c !== "") {
                c = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(c, 10, this.options.culture) : +c;
            }
            return c === "" || isNaN(c) ? null : c;
        },
        _format: function(c) {
            if (c === "") {
                return "";
            }
            return window.Globalize && this.options.numberFormat ? Globalize.format(c, this.options.numberFormat, this.options.culture) : c;
        },
        _refresh: function() {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            });
        },
        _value: function(e, c) {
            var d;
            if (e !== "") {
                d = this._parse(e);
                if (d !== null) {
                    if (!c) {
                        d = this._adjustValue(d);
                    }
                    e = this._format(d);
                }
            }
            this.element.val(e);
            this._refresh();
        },
        _destroy: function() {
            this.element.removeClass("ui-spinner-input").prop("disabled", false).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.uiSpinner.replaceWith(this.element);
        },
        stepUp: a(function(c) {
            this._stepUp(c);
        }),
        _stepUp: function(c) {
            if (this._start()) {
                this._spin((c || 1) * this.options.step);
                this._stop();
            }
        },
        stepDown: a(function(c) {
            this._stepDown(c);
        }),
        _stepDown: function(c) {
            if (this._start()) {
                this._spin((c || 1) * -this.options.step);
                this._stop();
            }
        },
        pageUp: a(function(c) {
            this._stepUp((c || 1) * this.options.page);
        }),
        pageDown: a(function(c) {
            this._stepDown((c || 1) * this.options.page);
        }),
        value: function(c) {
            if (!arguments.length) {
                return this._parse(this.element.val());
            }
            a(this._value).call(this, c);
        },
        widget: function() {
            return this.uiSpinner;
        }
    });
}(jQuery));
(function(d) {
    var b = 0;

    function c(f, g) {
        var e = (f.attr("aria-describedby") || "").split(/\s+/);
        e.push(g);
        f.data("ui-tooltip-id", g).attr("aria-describedby", d.trim(e.join(" ")));
    }

    function a(g) {
        var h = g.data("ui-tooltip-id"),
            f = (g.attr("aria-describedby") || "").split(/\s+/),
            e = d.inArray(h, f);
        if (e !== -1) {
            f.splice(e, 1);
        }
        g.removeData("ui-tooltip-id");
        f = d.trim(f.join(" "));
        if (f) {
            g.attr("aria-describedby", f);
        } else {
            g.removeAttr("aria-describedby");
        }
    }
    d.widget("ui.tooltip", {
        version: "1.10.4",
        options: {
            content: function() {
                var e = d(this).attr("title") || "";
                return d("<a>").text(e).html();
            },
            hide: true,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: true,
            tooltipClass: null,
            track: false,
            close: null,
            open: null
        },
        _create: function() {
            this._on({
                mouseover: "open",
                focusin: "open"
            });
            this.tooltips = {};
            this.parents = {};
            if (this.options.disabled) {
                this._disable();
            }
        },
        _setOption: function(e, g) {
            var f = this;
            if (e === "disabled") {
                this[g ? "_disable" : "_enable"]();
                this.options[e] = g;
                return;
            }
            this._super(e, g);
            if (e === "content") {
                d.each(this.tooltips, function(i, h) {
                    f._updateContent(h);
                });
            }
        },
        _disable: function() {
            var e = this;
            d.each(this.tooltips, function(h, f) {
                var g = d.Event("blur");
                g.target = g.currentTarget = f[0];
                e.close(g, true);
            });
            this.element.find(this.options.items).addBack().each(function() {
                var f = d(this);
                if (f.is("[title]")) {
                    f.data("ui-tooltip-title", f.attr("title")).attr("title", "");
                }
            });
        },
        _enable: function() {
            this.element.find(this.options.items).addBack().each(function() {
                var e = d(this);
                if (e.data("ui-tooltip-title")) {
                    e.attr("title", e.data("ui-tooltip-title"));
                }
            });
        },
        open: function(f) {
            var e = this,
                g = d(f ? f.target : this.element).closest(this.options.items);
            if (!g.length || g.data("ui-tooltip-id")) {
                return;
            }
            if (g.attr("title")) {
                g.data("ui-tooltip-title", g.attr("title"));
            }
            g.data("ui-tooltip-open", true);
            if (f && f.type === "mouseover") {
                g.parents().each(function() {
                    var i = d(this),
                        h;
                    if (i.data("ui-tooltip-open")) {
                        h = d.Event("blur");
                        h.target = h.currentTarget = this;
                        e.close(h, true);
                    }
                    if (i.attr("title")) {
                        i.uniqueId();
                        e.parents[this.id] = {
                            element: this,
                            title: i.attr("title")
                        };
                        i.attr("title", "");
                    }
                });
            }
            this._updateContent(g, f);
        },
        _updateContent: function(j, i) {
            var h, e = this.options.content,
                g = this,
                f = i ? i.type : null;
            if (typeof e === "string") {
                return this._open(i, j, e);
            }
            h = e.call(j[0], function(k) {
                if (!j.data("ui-tooltip-open")) {
                    return;
                }
                g._delay(function() {
                    if (i) {
                        i.type = f;
                    }
                    this._open(i, j, k);
                });
            });
            if (h) {
                this._open(i, j, h);
            }
        },
        _open: function(i, k, h) {
            var j, g, f, l = d.extend({}, this.options.position);
            if (!h) {
                return;
            }
            j = this._find(k);
            if (j.length) {
                j.find(".ui-tooltip-content").html(h);
                return;
            }
            if (k.is("[title]")) {
                if (i && i.type === "mouseover") {
                    k.attr("title", "");
                } else {
                    k.removeAttr("title");
                }
            }
            j = this._tooltip(k);
            c(k, j.attr("id"));
            j.find(".ui-tooltip-content").html(h);

            function e(m) {
                l.of = m;
                if (j.is(":hidden")) {
                    return;
                }
                j.position(l);
            }
            if (this.options.track && i && /^mouse/.test(i.type)) {
                this._on(this.document, {
                    mousemove: e
                });
                e(i);
            } else {
                j.position(d.extend({
                    of: k
                }, this.options.position));
            }
            j.hide();
            this._show(j, this.options.show);
            if (this.options.show && this.options.show.delay) {
                f = this.delayedShow = setInterval(function() {
                    if (j.is(":visible")) {
                        e(l.of);
                        clearInterval(f);
                    }
                }, d.fx.interval);
            }
            this._trigger("open", i, {
                tooltip: j
            });
            g = {
                keyup: function(m) {
                    if (m.keyCode === d.ui.keyCode.ESCAPE) {
                        var n = d.Event(m);
                        n.currentTarget = k[0];
                        this.close(n, true);
                    }
                },
                remove: function() {
                    this._removeTooltip(j);
                }
            };
            if (!i || i.type === "mouseover") {
                g.mouseleave = "close";
            }
            if (!i || i.type === "focusin") {
                g.focusout = "close";
            }
            this._on(true, k, g);
        },
        close: function(f) {
            var e = this,
                h = d(f ? f.currentTarget : this.element),
                g = this._find(h);
            if (this.closing) {
                return;
            }
            clearInterval(this.delayedShow);
            if (h.data("ui-tooltip-title")) {
                h.attr("title", h.data("ui-tooltip-title"));
            }
            a(h);
            g.stop(true);
            this._hide(g, this.options.hide, function() {
                e._removeTooltip(d(this));
            });
            h.removeData("ui-tooltip-open");
            this._off(h, "mouseleave focusout keyup");
            if (h[0] !== this.element[0]) {
                this._off(h, "remove");
            }
            this._off(this.document, "mousemove");
            if (f && f.type === "mouseleave") {
                d.each(this.parents, function(j, i) {
                    d(i.element).attr("title", i.title);
                    delete e.parents[j];
                });
            }
            this.closing = true;
            this._trigger("close", f, {
                tooltip: g
            });
            this.closing = false;
        },
        _tooltip: function(e) {
            var g = "ui-tooltip-" + b++,
                f = d("<div>").attr({
                    id: g,
                    role: "tooltip"
                }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
            d("<div>").addClass("ui-tooltip-content").appendTo(f);
            f.appendTo(this.document[0].body);
            this.tooltips[g] = e;
            return f;
        },
        _find: function(e) {
            var f = e.data("ui-tooltip-id");
            return f ? d("#" + f) : d();
        },
        _removeTooltip: function(e) {
            e.remove();
            delete this.tooltips[e.attr("id")];
        },
        _destroy: function() {
            var e = this;
            d.each(this.tooltips, function(h, f) {
                var g = d.Event("blur");
                g.target = g.currentTarget = f[0];
                e.close(g, true);
                d("#" + h).remove();
                if (f.data("ui-tooltip-title")) {
                    f.attr("title", f.data("ui-tooltip-title"));
                    f.removeData("ui-tooltip-title");
                }
            });
        }
    });
}(jQuery));
(function(a, c) {
    var b = "ui-effects-";
    a.effects = {
        effect: {}
    };
    /*!
     * jQuery Color Animations v2.1.2
     * https://github.com/jquery/jquery-color
     *
     * Copyright 2013 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * Date: Wed Jan 16 08:47:09 2013 -0600
     */
    (function(r, g) {
        var n = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
            k = /^([\-+])=\s*(\d+\.?\d*)/,
            j = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(s) {
                    return [s[1], s[2], s[3], s[4]];
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(s) {
                    return [s[1] * 2.55, s[2] * 2.55, s[3] * 2.55, s[4]];
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                parse: function(s) {
                    return [parseInt(s[1], 16), parseInt(s[2], 16), parseInt(s[3], 16)];
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                parse: function(s) {
                    return [parseInt(s[1] + s[1], 16), parseInt(s[2] + s[2], 16), parseInt(s[3] + s[3], 16)];
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function(s) {
                    return [s[1], s[2] / 100, s[3] / 100, s[4]];
                }
            }],
            h = r.Color = function(t, u, s, v) {
                return new r.Color.fn.parse(t, u, s, v);
            },
            m = {
                rgba: {
                    props: {
                        red: {
                            idx: 0,
                            type: "byte"
                        },
                        green: {
                            idx: 1,
                            type: "byte"
                        },
                        blue: {
                            idx: 2,
                            type: "byte"
                        }
                    }
                },
                hsla: {
                    props: {
                        hue: {
                            idx: 0,
                            type: "degrees"
                        },
                        saturation: {
                            idx: 1,
                            type: "percent"
                        },
                        lightness: {
                            idx: 2,
                            type: "percent"
                        }
                    }
                }
            },
            q = {
                "byte": {
                    floor: true,
                    max: 255
                },
                percent: {
                    max: 1
                },
                degrees: {
                    mod: 360,
                    floor: true
                }
            },
            p = h.support = {},
            e = r("<p>")[0],
            d, o = r.each;
        e.style.cssText = "background-color:rgba(1,1,1,.5)";
        p.rgba = e.style.backgroundColor.indexOf("rgba") > -1;
        o(m, function(s, t) {
            t.cache = "_" + s;
            t.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            };
        });

        function l(t, v, u) {
            var s = q[v.type] || {};
            if (t == null) {
                return (u || !v.def) ? null : v.def;
            }
            t = s.floor ? ~~t : parseFloat(t);
            if (isNaN(t)) {
                return v.def;
            }
            if (s.mod) {
                return (t + s.mod) % s.mod;
            }
            return 0 > t ? 0 : s.max < t ? s.max : t;
        }

        function i(s) {
            var u = h(),
                t = u._rgba = [];
            s = s.toLowerCase();
            o(j, function(z, A) {
                var x, y = A.re.exec(s),
                    w = y && A.parse(y),
                    v = A.space || "rgba";
                if (w) {
                    x = u[v](w);
                    u[m[v].cache] = x[m[v].cache];
                    t = u._rgba = x._rgba;
                    return false;
                }
            });
            if (t.length) {
                if (t.join() === "0,0,0,0") {
                    r.extend(t, d.transparent);
                }
                return u;
            }
            return d[s];
        }
        h.fn = r.extend(h.prototype, {
            parse: function(y, w, s, x) {
                if (y === g) {
                    this._rgba = [null, null, null, null];
                    return this;
                }
                if (y.jquery || y.nodeType) {
                    y = r(y).css(w);
                    w = g;
                }
                var v = this,
                    u = r.type(y),
                    t = this._rgba = [];
                if (w !== g) {
                    y = [y, w, s, x];
                    u = "array";
                }
                if (u === "string") {
                    return this.parse(i(y) || d._default);
                }
                if (u === "array") {
                    o(m.rgba.props, function(z, A) {
                        t[A.idx] = l(y[A.idx], A);
                    });
                    return this;
                }
                if (u === "object") {
                    if (y instanceof h) {
                        o(m, function(z, A) {
                            if (y[A.cache]) {
                                v[A.cache] = y[A.cache].slice();
                            }
                        });
                    } else {
                        o(m, function(A, B) {
                            var z = B.cache;
                            o(B.props, function(C, D) {
                                if (!v[z] && B.to) {
                                    if (C === "alpha" || y[C] == null) {
                                        return;
                                    }
                                    v[z] = B.to(v._rgba);
                                }
                                v[z][D.idx] = l(y[C], D, true);
                            });
                            if (v[z] && r.inArray(null, v[z].slice(0, 3)) < 0) {
                                v[z][3] = 1;
                                if (B.from) {
                                    v._rgba = B.from(v[z]);
                                }
                            }
                        });
                    }
                    return this;
                }
            },
            is: function(u) {
                var s = h(u),
                    v = true,
                    t = this;
                o(m, function(w, y) {
                    var z, x = s[y.cache];
                    if (x) {
                        z = t[y.cache] || y.to && y.to(t._rgba) || [];
                        o(y.props, function(A, B) {
                            if (x[B.idx] != null) {
                                v = (x[B.idx] === z[B.idx]);
                                return v;
                            }
                        });
                    }
                    return v;
                });
                return v;
            },
            _space: function() {
                var s = [],
                    t = this;
                o(m, function(u, v) {
                    if (t[v.cache]) {
                        s.push(u);
                    }
                });
                return s.pop();
            },
            transition: function(t, z) {
                var u = h(t),
                    v = u._space(),
                    w = m[v],
                    x = this.alpha() === 0 ? h("transparent") : this,
                    y = x[w.cache] || w.to(x._rgba),
                    s = y.slice();
                u = u[w.cache];
                o(w.props, function(D, F) {
                    var C = F.idx,
                        B = y[C],
                        A = u[C],
                        E = q[F.type] || {};
                    if (A === null) {
                        return;
                    }
                    if (B === null) {
                        s[C] = A;
                    } else {
                        if (E.mod) {
                            if (A - B > E.mod / 2) {
                                B += E.mod;
                            } else {
                                if (B - A > E.mod / 2) {
                                    B -= E.mod;
                                }
                            }
                        }
                        s[C] = l((A - B) * z + B, F);
                    }
                });
                return this[v](s);
            },
            blend: function(v) {
                if (this._rgba[3] === 1) {
                    return this;
                }
                var u = this._rgba.slice(),
                    t = u.pop(),
                    s = h(v)._rgba;
                return h(r.map(u, function(w, x) {
                    return (1 - t) * s[x] + t * w;
                }));
            },
            toRgbaString: function() {
                var t = "rgba(",
                    s = r.map(this._rgba, function(u, w) {
                        return u == null ? (w > 2 ? 1 : 0) : u;
                    });
                if (s[3] === 1) {
                    s.pop();
                    t = "rgb(";
                }
                return t + s.join() + ")";
            },
            toHslaString: function() {
                var t = "hsla(",
                    s = r.map(this.hsla(), function(u, w) {
                        if (u == null) {
                            u = w > 2 ? 1 : 0;
                        }
                        if (w && w < 3) {
                            u = Math.round(u * 100) + "%";
                        }
                        return u;
                    });
                if (s[3] === 1) {
                    s.pop();
                    t = "hsl(";
                }
                return t + s.join() + ")";
            },
            toHexString: function(s) {
                var t = this._rgba.slice(),
                    u = t.pop();
                if (s) {
                    t.push(~~(u * 255));
                }
                return "#" + r.map(t, function(w) {
                    w = (w || 0).toString(16);
                    return w.length === 1 ? "0" + w : w;
                }).join("");
            },
            toString: function() {
                return this._rgba[3] === 0 ? "transparent" : this.toRgbaString();
            }
        });
        h.fn.parse.prototype = h.fn;

        function f(u, t, s) {
            s = (s + 1) % 1;
            if (s * 6 < 1) {
                return u + (t - u) * s * 6;
            }
            if (s * 2 < 1) {
                return t;
            }
            if (s * 3 < 2) {
                return u + (t - u) * ((2 / 3) - s) * 6;
            }
            return u;
        }
        m.hsla.to = function(v) {
            if (v[0] == null || v[1] == null || v[2] == null) {
                return [null, null, null, v[3]];
            }
            var t = v[0] / 255,
                y = v[1] / 255,
                z = v[2] / 255,
                B = v[3],
                A = Math.max(t, y, z),
                w = Math.min(t, y, z),
                C = A - w,
                D = A + w,
                u = D * 0.5,
                x, E;
            if (w === A) {
                x = 0;
            } else {
                if (t === A) {
                    x = (60 * (y - z) / C) + 360;
                } else {
                    if (y === A) {
                        x = (60 * (z - t) / C) + 120;
                    } else {
                        x = (60 * (t - y) / C) + 240;
                    }
                }
            }
            if (C === 0) {
                E = 0;
            } else {
                if (u <= 0.5) {
                    E = C / D;
                } else {
                    E = C / (2 - D);
                }
            }
            return [Math.round(x) % 360, E, u, B == null ? 1 : B];
        };
        m.hsla.from = function(x) {
            if (x[0] == null || x[1] == null || x[2] == null) {
                return [null, null, null, x[3]];
            }
            var w = x[0] / 360,
                v = x[1],
                u = x[2],
                t = x[3],
                y = u <= 0.5 ? u * (1 + v) : u + v - u * v,
                z = 2 * u - y;
            return [Math.round(f(z, y, w + (1 / 3)) * 255), Math.round(f(z, y, w) * 255), Math.round(f(z, y, w - (1 / 3)) * 255), t];
        };
        o(m, function(t, v) {
            var u = v.props,
                s = v.cache,
                x = v.to,
                w = v.from;
            h.fn[t] = function(C) {
                if (x && !this[s]) {
                    this[s] = x(this._rgba);
                }
                if (C === g) {
                    return this[s].slice();
                }
                var z, B = r.type(C),
                    y = (B === "array" || B === "object") ? C : arguments,
                    A = this[s].slice();
                o(u, function(D, F) {
                    var E = y[B === "object" ? D : F.idx];
                    if (E == null) {
                        E = A[F.idx];
                    }
                    A[F.idx] = l(E, F);
                });
                if (w) {
                    z = h(w(A));
                    z[s] = A;
                    return z;
                } else {
                    return h(A);
                }
            };
            o(u, function(y, z) {
                if (h.fn[y]) {
                    return;
                }
                h.fn[y] = function(D) {
                    var F = r.type(D),
                        C = (y === "alpha" ? (this._hsla ? "hsla" : "rgba") : t),
                        B = this[C](),
                        E = B[z.idx],
                        A;
                    if (F === "undefined") {
                        return E;
                    }
                    if (F === "function") {
                        D = D.call(this, E);
                        F = r.type(D);
                    }
                    if (D == null && z.empty) {
                        return this;
                    }
                    if (F === "string") {
                        A = k.exec(D);
                        if (A) {
                            D = E + parseFloat(A[2]) * (A[1] === "+" ? 1 : -1);
                        }
                    }
                    B[z.idx] = D;
                    return this[C](B);
                };
            });
        });
        h.hook = function(t) {
            var s = t.split(" ");
            o(s, function(u, v) {
                r.cssHooks[v] = {
                    set: function(z, A) {
                        var x, y, w = "";
                        if (A !== "transparent" && (r.type(A) !== "string" || (x = i(A)))) {
                            A = h(x || A);
                            if (!p.rgba && A._rgba[3] !== 1) {
                                y = v === "backgroundColor" ? z.parentNode : z;
                                while ((w === "" || w === "transparent") && y && y.style) {
                                    try {
                                        w = r.css(y, "backgroundColor");
                                        y = y.parentNode;
                                    } catch (B) {}
                                }
                                A = A.blend(w && w !== "transparent" ? w : "_default");
                            }
                            A = A.toRgbaString();
                        }
                        try {
                            z.style[v] = A;
                        } catch (B) {}
                    }
                };
                r.fx.step[v] = function(w) {
                    if (!w.colorInit) {
                        w.start = h(w.elem, v);
                        w.end = h(w.end);
                        w.colorInit = true;
                    }
                    r.cssHooks[v].set(w.elem, w.start.transition(w.end, w.pos));
                };
            });
        };
        h.hook(n);
        r.cssHooks.borderColor = {
            expand: function(t) {
                var s = {};
                o(["Top", "Right", "Bottom", "Left"], function(v, u) {
                    s["border" + u + "Color"] = t;
                });
                return s;
            }
        };
        d = r.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        };
    })(jQuery);
    (function() {
        var e = ["add", "remove", "toggle"],
            f = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1
            };
        a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(h, i) {
            a.fx.step[i] = function(j) {
                if (j.end !== "none" && !j.setAttr || j.pos === 1 && !j.setAttr) {
                    jQuery.style(j.elem, i, j.end);
                    j.setAttr = true;
                }
            };
        });

        function g(l) {
            var i, h, j = l.ownerDocument.defaultView ? l.ownerDocument.defaultView.getComputedStyle(l, null) : l.currentStyle,
                k = {};
            if (j && j.length && j[0] && j[j[0]]) {
                h = j.length;
                while (h--) {
                    i = j[h];
                    if (typeof j[i] === "string") {
                        k[a.camelCase(i)] = j[i];
                    }
                }
            } else {
                for (i in j) {
                    if (typeof j[i] === "string") {
                        k[i] = j[i];
                    }
                }
            }
            return k;
        }

        function d(h, j) {
            var l = {},
                i, k;
            for (i in j) {
                k = j[i];
                if (h[i] !== k) {
                    if (!f[i]) {
                        if (a.fx.step[i] || !isNaN(parseFloat(k))) {
                            l[i] = k;
                        }
                    }
                }
            }
            return l;
        }
        if (!a.fn.addBack) {
            a.fn.addBack = function(h) {
                return this.add(h == null ? this.prevObject : this.prevObject.filter(h));
            };
        }
        a.effects.animateClass = function(h, i, l, k) {
            var j = a.speed(i, l, k);
            return this.queue(function() {
                var o = a(this),
                    m = o.attr("class") || "",
                    n, p = j.children ? o.find("*").addBack() : o;
                p = p.map(function() {
                    var q = a(this);
                    return {
                        el: q,
                        start: g(this)
                    };
                });
                n = function() {
                    a.each(e, function(q, r) {
                        if (h[r]) {
                            o[r + "Class"](h[r]);
                        }
                    });
                };
                n();
                p = p.map(function() {
                    this.end = g(this.el[0]);
                    this.diff = d(this.start, this.end);
                    return this;
                });
                o.attr("class", m);
                p = p.map(function() {
                    var s = this,
                        q = a.Deferred(),
                        r = a.extend({}, j, {
                            queue: false,
                            complete: function() {
                                q.resolve(s);
                            }
                        });
                    this.el.animate(this.diff, r);
                    return q.promise();
                });
                a.when.apply(a, p.get()).done(function() {
                    n();
                    a.each(arguments, function() {
                        var q = this.el;
                        a.each(this.diff, function(r) {
                            q.css(r, "");
                        });
                    });
                    j.complete.call(o[0]);
                });
            });
        };
        a.fn.extend({
            addClass: (function(h) {
                return function(j, i, l, k) {
                    return i ? a.effects.animateClass.call(this, {
                        add: j
                    }, i, l, k) : h.apply(this, arguments);
                };
            })(a.fn.addClass),
            removeClass: (function(h) {
                return function(j, i, l, k) {
                    return arguments.length > 1 ? a.effects.animateClass.call(this, {
                        remove: j
                    }, i, l, k) : h.apply(this, arguments);
                };
            })(a.fn.removeClass),
            toggleClass: (function(h) {
                return function(k, j, i, m, l) {
                    if (typeof j === "boolean" || j === c) {
                        if (!i) {
                            return h.apply(this, arguments);
                        } else {
                            return a.effects.animateClass.call(this, (j ? {
                                add: k
                            } : {
                                remove: k
                            }), i, m, l);
                        }
                    } else {
                        return a.effects.animateClass.call(this, {
                            toggle: k
                        }, j, i, m);
                    }
                };
            })(a.fn.toggleClass),
            switchClass: function(h, j, i, l, k) {
                return a.effects.animateClass.call(this, {
                    add: j,
                    remove: h
                }, i, l, k);
            }
        });
    })();
    (function() {
        a.extend(a.effects, {
            version: "1.10.4",
            save: function(g, h) {
                for (var f = 0; f < h.length; f++) {
                    if (h[f] !== null) {
                        g.data(b + h[f], g[0].style[h[f]]);
                    }
                }
            },
            restore: function(g, j) {
                var h, f;
                for (f = 0; f < j.length; f++) {
                    if (j[f] !== null) {
                        h = g.data(b + j[f]);
                        if (h === c) {
                            h = "";
                        }
                        g.css(j[f], h);
                    }
                }
            },
            setMode: function(f, g) {
                if (g === "toggle") {
                    g = f.is(":hidden") ? "show" : "hide";
                }
                return g;
            },
            getBaseline: function(g, h) {
                var i, f;
                switch (g[0]) {
                    case "top":
                        i = 0;
                        break;
                    case "middle":
                        i = 0.5;
                        break;
                    case "bottom":
                        i = 1;
                        break;
                    default:
                        i = g[0] / h.height;
                }
                switch (g[1]) {
                    case "left":
                        f = 0;
                        break;
                    case "center":
                        f = 0.5;
                        break;
                    case "right":
                        f = 1;
                        break;
                    default:
                        f = g[1] / h.width;
                }
                return {
                    x: f,
                    y: i
                };
            },
            createWrapper: function(g) {
                if (g.parent().is(".ui-effects-wrapper")) {
                    return g.parent();
                }
                var h = {
                        width: g.outerWidth(true),
                        height: g.outerHeight(true),
                        "float": g.css("float")
                    },
                    k = a("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }),
                    f = {
                        width: g.width(),
                        height: g.height()
                    },
                    j = document.activeElement;
                try {
                    j.id;
                } catch (i) {
                    j = document.body;
                }
                g.wrap(k);
                if (g[0] === j || a.contains(g[0], j)) {
                    a(j).focus();
                }
                k = g.parent();
                if (g.css("position") === "static") {
                    k.css({
                        position: "relative"
                    });
                    g.css({
                        position: "relative"
                    });
                } else {
                    a.extend(h, {
                        position: g.css("position"),
                        zIndex: g.css("z-index")
                    });
                    a.each(["top", "left", "bottom", "right"], function(l, m) {
                        h[m] = g.css(m);
                        if (isNaN(parseInt(h[m], 10))) {
                            h[m] = "auto";
                        }
                    });
                    g.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    });
                }
                g.css(f);
                return k.css(h).show();
            },
            removeWrapper: function(f) {
                var g = document.activeElement;
                if (f.parent().is(".ui-effects-wrapper")) {
                    f.parent().replaceWith(f);
                    if (f[0] === g || a.contains(f[0], g)) {
                        a(g).focus();
                    }
                }
                return f;
            },
            setTransition: function(g, i, f, h) {
                h = h || {};
                a.each(i, function(k, j) {
                    var l = g.cssUnit(j);
                    if (l[0] > 0) {
                        h[j] = l[0] * f + l[1];
                    }
                });
                return h;
            }
        });

        function d(g, f, h, i) {
            if (a.isPlainObject(g)) {
                f = g;
                g = g.effect;
            }
            g = {
                effect: g
            };
            if (f == null) {
                f = {};
            }
            if (a.isFunction(f)) {
                i = f;
                h = null;
                f = {};
            }
            if (typeof f === "number" || a.fx.speeds[f]) {
                i = h;
                h = f;
                f = {};
            }
            if (a.isFunction(h)) {
                i = h;
                h = null;
            }
            if (f) {
                a.extend(g, f);
            }
            h = h || f.duration;
            g.duration = a.fx.off ? 0 : typeof h === "number" ? h : h in a.fx.speeds ? a.fx.speeds[h] : a.fx.speeds._default;
            g.complete = i || f.complete;
            return g;
        }

        function e(f) {
            if (!f || typeof f === "number" || a.fx.speeds[f]) {
                return true;
            }
            if (typeof f === "string" && !a.effects.effect[f]) {
                return true;
            }
            if (a.isFunction(f)) {
                return true;
            }
            if (typeof f === "object" && !f.effect) {
                return true;
            }
            return false;
        }
        a.fn.extend({
            effect: function() {
                var h = d.apply(this, arguments),
                    j = h.mode,
                    f = h.queue,
                    g = a.effects.effect[h.effect];
                if (a.fx.off || !g) {
                    if (j) {
                        return this[j](h.duration, h.complete);
                    } else {
                        return this.each(function() {
                            if (h.complete) {
                                h.complete.call(this);
                            }
                        });
                    }
                }

                function i(m) {
                    var n = a(this),
                        l = h.complete,
                        o = h.mode;

                    function k() {
                        if (a.isFunction(l)) {
                            l.call(n[0]);
                        }
                        if (a.isFunction(m)) {
                            m();
                        }
                    }
                    if (n.is(":hidden") ? o === "hide" : o === "show") {
                        n[o]();
                        k();
                    } else {
                        g.call(n[0], h, k);
                    }
                }
                return f === false ? this.each(i) : this.queue(f || "fx", i);
            },
            show: (function(f) {
                return function(h) {
                    if (e(h)) {
                        return f.apply(this, arguments);
                    } else {
                        var g = d.apply(this, arguments);
                        g.mode = "show";
                        return this.effect.call(this, g);
                    }
                };
            })(a.fn.show),
            hide: (function(f) {
                return function(h) {
                    if (e(h)) {
                        return f.apply(this, arguments);
                    } else {
                        var g = d.apply(this, arguments);
                        g.mode = "hide";
                        return this.effect.call(this, g);
                    }
                };
            })(a.fn.hide),
            toggle: (function(f) {
                return function(h) {
                    if (e(h) || typeof h === "boolean") {
                        return f.apply(this, arguments);
                    } else {
                        var g = d.apply(this, arguments);
                        g.mode = "toggle";
                        return this.effect.call(this, g);
                    }
                };
            })(a.fn.toggle),
            cssUnit: function(f) {
                var g = this.css(f),
                    h = [];
                a.each(["em", "px", "%", "pt"], function(j, k) {
                    if (g.indexOf(k) > 0) {
                        h = [parseFloat(g), k];
                    }
                });
                return h;
            }
        });
    })();
    (function() {
        var d = {};
        a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(f, e) {
            d[e] = function(g) {
                return Math.pow(g, f + 2);
            };
        });
        a.extend(d, {
            Sine: function(e) {
                return 1 - Math.cos(e * Math.PI / 2);
            },
            Circ: function(e) {
                return 1 - Math.sqrt(1 - e * e);
            },
            Elastic: function(e) {
                return e === 0 || e === 1 ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin(((e - 1) * 80 - 7.5) * Math.PI / 15);
            },
            Back: function(e) {
                return e * e * (3 * e - 2);
            },
            Bounce: function(g) {
                var e, f = 4;
                while (g < ((e = Math.pow(2, --f)) - 1) / 11) {}
                return 1 / Math.pow(4, 3 - f) - 7.5625 * Math.pow((e * 3 - 2) / 22 - g, 2);
            }
        });
        a.each(d, function(f, e) {
            a.easing["easeIn" + f] = e;
            a.easing["easeOut" + f] = function(g) {
                return 1 - e(1 - g);
            };
            a.easing["easeInOut" + f] = function(g) {
                return g < 0.5 ? e(g * 2) / 2 : 1 - e(g * -2 + 2) / 2;
            };
        });
    })();
})(jQuery);
(function(a, b) {
    a.effects.effect.slide = function(e, i) {
        var f = a(this),
            k = ["position", "top", "bottom", "left", "right", "width", "height"],
            j = a.effects.setMode(f, e.mode || "show"),
            m = j === "show",
            l = e.direction || "left",
            g = (l === "up" || l === "down") ? "top" : "left",
            d = (l === "up" || l === "left"),
            c, h = {};
        a.effects.save(f, k);
        f.show();
        c = e.distance || f[g === "top" ? "outerHeight" : "outerWidth"](true);
        a.effects.createWrapper(f).css({
            overflow: "hidden"
        });
        if (m) {
            f.css(g, d ? (isNaN(c) ? "-" + c : -c) : c);
        }
        h[g] = (m ? (d ? "+=" : "-=") : (d ? "-=" : "+=")) + c;
        f.animate(h, {
            queue: false,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                if (j === "hide") {
                    f.hide();
                }
                a.effects.restore(f, k);
                a.effects.removeWrapper(f);
                i();
            }
        });
    };
})(jQuery);
(function(b, d) {
    var a = /up|down|vertical/,
        c = /up|left|vertical|horizontal/;
    b.effects.effect.blind = function(g, m) {
        var h = b(this),
            q = ["position", "top", "bottom", "left", "right", "height", "width"],
            n = b.effects.setMode(h, g.mode || "hide"),
            r = g.direction || "up",
            j = a.test(r),
            i = j ? "height" : "width",
            p = j ? "top" : "left",
            t = c.test(r),
            l = {},
            s = n === "show",
            f, e, k;
        if (h.parent().is(".ui-effects-wrapper")) {
            b.effects.save(h.parent(), q);
        } else {
            b.effects.save(h, q);
        }
        h.show();
        f = b.effects.createWrapper(h).css({
            overflow: "hidden"
        });
        e = f[i]();
        k = parseFloat(f.css(p)) || 0;
        l[i] = s ? e : 0;
        if (!t) {
            h.css(j ? "bottom" : "right", 0).css(j ? "top" : "left", "auto").css({
                position: "absolute"
            });
            l[p] = s ? k : e + k;
        }
        if (s) {
            f.css(i, 0);
            if (!t) {
                f.css(p, k + e);
            }
        }
        f.animate(l, {
            duration: g.duration,
            easing: g.easing,
            queue: false,
            complete: function() {
                if (n === "hide") {
                    h.hide();
                }
                b.effects.restore(h, q);
                b.effects.removeWrapper(h);
                m();
            }
        });
    };
})(jQuery);
(function(a, b) {
    a.effects.effect.fade = function(f, c) {
        var d = a(this),
            e = a.effects.setMode(d, f.mode || "toggle");
        d.animate({
            opacity: e
        }, {
            queue: false,
            duration: f.duration,
            easing: f.easing,
            complete: c
        });
    };
})(jQuery);
(function(a, b) {
    a.effects.effect.highlight = function(h, c) {
        var e = a(this),
            d = ["backgroundImage", "backgroundColor", "opacity"],
            g = a.effects.setMode(e, h.mode || "show"),
            f = {
                backgroundColor: e.css("backgroundColor")
            };
        if (g === "hide") {
            f.opacity = 0;
        }
        a.effects.save(e, d);
        e.show().css({
            backgroundImage: "none",
            backgroundColor: h.color || "#ffff99"
        }).animate(f, {
            queue: false,
            duration: h.duration,
            easing: h.easing,
            complete: function() {
                if (g === "hide") {
                    e.hide();
                }
                a.effects.restore(e, d);
                c();
            }
        });
    };
})(jQuery);
AjaxSolr = function() {};
AjaxSolr.Class = function(a) {
    AjaxSolr.extend(this, a);
};
AjaxSolr.Class.extend = function(a, c) {
    var b = this;
    var e;
    if (a && Object.prototype.hasOwnProperty.call(a, "constructor")) {
        e = a.constructor;
    } else {
        e = function() {
            return b.apply(this, arguments);
        };
    }
    AjaxSolr.extend(e, b, c);
    var d = function() {
        this.constructor = e;
    };
    d.prototype = b.prototype;
    e.prototype = new d;
    if (a) {
        AjaxSolr.extend(e.prototype, a);
    }
    e.__super__ = b.prototype;
    return e;
};
AjaxSolr.extend = function(f) {
    var e = Array.prototype.slice.call(arguments, 1);
    var d = function(g) {
        if (g) {
            for (var h in g) {
                f[h] = g[h];
            }
        }
    };
    if (e == null) {
        return;
    }
    if (Array.prototype.forEach && e.forEach === Array.prototype.forEach) {
        e.forEach(d);
    } else {
        if (e.length === +e.length) {
            for (var c = 0, a = e.length; c < a; c++) {
                d.call(undefined, e[c], c, e);
            }
        } else {
            for (var b in e) {
                if (Object.prototype.hasOwnProperty.call(e, b)) {
                    d.call(undefined, e[b], b, e);
                }
            }
        }
    }
    return f;
};
AjaxSolr.inArray = function(c, d) {
    if (d) {
        for (var b = 0, a = d.length; b < a; b++) {
            if (AjaxSolr.equals(d[b], c)) {
                return b;
            }
        }
    }
    return -1;
};
AjaxSolr.equals = function(d, c) {
    if (AjaxSolr.isArray(d) && AjaxSolr.isArray(c)) {
        if (d.length !== c.length) {
            return false;
        }
        for (var b = 0, a = d.length; b < a; b++) {
            if (d[b] !== c[b]) {
                return false;
            }
        }
        return true;
    } else {
        if (AjaxSolr.isRegExp(d) && AjaxSolr.isString(c)) {
            return c.match(d);
        } else {
            if (AjaxSolr.isRegExp(c) && AjaxSolr.isString(d)) {
                return d.match(c);
            } else {
                return d === c;
            }
        }
    }
};
AjaxSolr.isArray = function(a) {
    return a != null && typeof a == "object" && "splice" in a && "join" in a;
};
AjaxSolr.isRegExp = function(a) {
    return a != null && (typeof a == "object" || typeof a == "function") && "ignoreCase" in a;
};
AjaxSolr.isString = function(a) {
    return a != null && typeof a == "string";
};
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["core/Core"], a);
    } else {
        a();
    }
}(function() {
    AjaxSolr.AbstractManager = AjaxSolr.Class.extend({
        constructor: function(a) {
            AjaxSolr.extend(this, {
                solrUrl: "http://localhost:8983/solr/",
                proxyUrl: null,
                servlet: "select",
                response: {},
                widgets: {},
                store: null,
                initialized: false
            }, a);
        },
        init: function() {
            this.initialized = true;
            if (this.store === null) {
                this.setStore(new AjaxSolr.ParameterStore());
            }
            this.store.load(false);
            for (var a in this.widgets) {
                this.widgets[a].init();
            }
            this.store.init();
        },
        setStore: function(a) {
            a.manager = this;
            this.store = a;
        },
        addWidget: function(a) {
            a.manager = this;
            this.widgets[a.id] = a;
        },
        doRequest: function(c, b) {
            if (this.initialized === false) {
                this.init();
            }
            if (c !== undefined) {
                this.store.get("start").val(c);
            }
            if (b === undefined) {
                b = this.servlet;
            }
            this.store.save();
            for (var a in this.widgets) {
                this.widgets[a].beforeRequest();
            }
            this.executeRequest(b);
        },
        executeRequest: function(b, a) {
            throw "Abstract method executeRequest must be overridden in a subclass.";
        },
        handleResponse: function(b) {
            this.response = b;
            for (var a in this.widgets) {
                this.widgets[a].afterRequest();
            }
        },
        handleError: function(a) {
            window.console && console.log && console.log(a);
        }
    });
}));
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["core/AbstractManager"], a);
    } else {
        a();
    }
}(function() {
    AjaxSolr.Manager = AjaxSolr.AbstractManager.extend({
        executeRequest: function(f, d, e, b) {
            var a = this,
                c = {
                    dataType: "json"
                };
            d = d || this.store.string();
            e = e || function(g) {
                a.handleResponse(g);
            };
            b = b || function(g, i, h) {
                a.handleError(i + ", " + h);
            };
            if (this.proxyUrl) {
                c.url = this.proxyUrl;
                c.data = {
                    query: d
                };
                c.type = "POST";
            } else {
                c.url = this.solrUrl + f + "?" + d + "&wt=json&json.wrf=?";
            }
            jQuery.ajax(c).done(e).fail(b);
        }
    });
}));
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["core/Core"], a);
    } else {
        a();
    }
}(function() {
    AjaxSolr.Parameter = AjaxSolr.Class.extend({
        constructor: function(a) {
            AjaxSolr.extend(this, {
                name: null,
                value: null,
                locals: {}
            }, a);
        },
        val: function(a) {
            if (a === undefined) {
                return this.value;
            } else {
                this.value = a;
            }
        },
        local: function(a, b) {
            if (b === undefined) {
                return this.locals[a];
            } else {
                this.locals[a] = b;
            }
        },
        remove: function(a) {
            delete this.locals[a];
        },
        string: function() {
            var c = [];
            for (var a in this.locals) {
                if (this.locals[a]) {
                    c.push(a + "=" + encodeURIComponent(this.locals[a]));
                }
            }
            var b = c.length ? "{!" + c.join("%20") + "}" : "";
            if (this.value) {
                return this.name + "=" + b + this.valueString(this.value);
            } else {
                if (this.name == "q" && b) {
                    return "q.alt=" + b + encodeURIComponent("*:*");
                } else {
                    return "";
                }
            }
        },
        parseString: function(c) {
            var b = c.match(/^([^=]+)=(?:\{!([^\}]*)\})?(.*)$/);
            if (b) {
                var a;
                while (a = /([^\s=]+)=(\S*)/g.exec(decodeURIComponent(b[2]))) {
                    this.locals[a[1]] = decodeURIComponent(a[2]);
                    b[2] = b[2].replace(a[0], "");
                }
                if (b[1] == "q.alt") {
                    this.name = "q";
                } else {
                    this.name = b[1];
                    this.value = this.parseValueString(b[3]);
                }
            }
        },
        valueString: function(a) {
            a = AjaxSolr.isArray(a) ? a.join(",") : a;
            if (a != null && ("" + a + "").indexOf("+") > 0) {
                return a;
            } else {
                return encodeURIComponent(a);
            }
        },
        parseValueString: function(a) {
            a = decodeURIComponent(a);
            return a.indexOf(",") == -1 ? a : a.split(",");
        }
    });
    AjaxSolr.Parameter.escapeValue = function(a) {
        if (a.match(/[ :\/"]/) && !a.match(/[\[\{]\S+ TO \S+[\]\}]/) && !a.match(/^["\(].*["\)]$/)) {
            return '"' + a.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
        }
        return a;
    };
}));
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["core/Core", "core/Parameter"], a);
    } else {
        a();
    }
}(function() {
    AjaxSolr.ParameterStore = AjaxSolr.Class.extend({
        constructor: function(a) {
            AjaxSolr.extend(this, {
                exposed: [],
                params: {},
                manager: null
            }, a);
        },
        init: function() {},
        isMultiple: function(a) {
            return a.match(/^(?:bf|bq|facet\.date|facet\.date\.other|facet\.date\.include|facet\.field|facet\.pivot|facet\.range|facet\.range\.other|facet\.range\.include|facet\.query|fq|group\.field|group\.func|group\.query|pf|qf)$/);
        },
        get: function(a) {
            if (this.params[a] === undefined) {
                var b = new AjaxSolr.Parameter({
                    name: a
                });
                if (this.isMultiple(a)) {
                    this.params[a] = [b];
                } else {
                    this.params[a] = b;
                }
            }
            return this.params[a];
        },
        values: function(c) {
            if (this.params[c] !== undefined) {
                if (this.isMultiple(c)) {
                    var b = [];
                    for (var d = 0, a = this.params[c].length; d < a; d++) {
                        b.push(this.params[c][d].val());
                    }
                    return b;
                } else {
                    return [this.params[c].val()];
                }
            }
            return [];
        },
        add: function(a, b) {
            if (b === undefined) {
                b = new AjaxSolr.Parameter({
                    name: a
                });
            }
            if (this.isMultiple(a)) {
                if (this.params[a] === undefined) {
                    this.params[a] = [b];
                } else {
                    if (AjaxSolr.inArray(b.val(), this.values(a)) == -1) {
                        this.params[a].push(b);
                    } else {
                        return false;
                    }
                }
            } else {
                this.params[a] = b;
            }
            return b;
        },
        remove: function(b, a) {
            if (a === undefined) {
                delete this.params[b];
            } else {
                this.params[b].splice(a, 1);
                if (this.params[b].length == 0) {
                    delete this.params[b];
                }
            }
        },
        find: function(b, d) {
            if (this.params[b] !== undefined) {
                if (this.isMultiple(b)) {
                    var e = [];
                    for (var c = 0, a = this.params[b].length; c < a; c++) {
                        if (AjaxSolr.equals(this.params[b][c].val(), d)) {
                            e.push(c);
                        }
                    }
                    return e.length ? e : false;
                } else {
                    if (AjaxSolr.equals(this.params[b].val(), d)) {
                        return b;
                    }
                }
            }
            return false;
        },
        addByValue: function(c, e, f) {
            if (f === undefined) {
                f = {};
            }
            if (this.isMultiple(c) && AjaxSolr.isArray(e)) {
                var b = [];
                for (var d = 0, a = e.length; d < a; d++) {
                    b.push(this.add(c, new AjaxSolr.Parameter({
                        name: c,
                        value: e[d],
                        locals: f
                    })));
                }
                return b;
            } else {
                return this.add(c, new AjaxSolr.Parameter({
                    name: c,
                    value: e,
                    locals: f
                }));
            }
        },
        removeByValue: function(a, c) {
            var d = this.find(a, c);
            if (d) {
                if (AjaxSolr.isArray(d)) {
                    for (var b = d.length - 1; b >= 0; b--) {
                        this.remove(a, d[b]);
                    }
                } else {
                    this.remove(d);
                }
            }
            return d;
        },
        string: function() {
            var e = [],
                c;
            for (var b in this.params) {
                if (this.isMultiple(b)) {
                    if (b == "facet.pivot") {
                        for (var d = 0, a = this.params[b].length; d < a; d++) {
                            if (d == 0) {
                                c = this.params[b][d].string();
                            } else {
                                if (c) {
                                    c += "," + (this.params[b][d]).val();
                                }
                            }
                        }
                        e.push(c);
                    } else {
                        for (var d = 0, a = this.params[b].length; d < a; d++) {
                            c = this.params[b][d].string();
                            if (c) {
                                e.push(c);
                            }
                        }
                    }
                } else {
                    c = this.params[b].string();
                    if (c) {
                        e.push(c);
                    }
                }
            }
            return e.join("&");
        },
        parseString: function(e) {
            var c = e.split("&");
            for (var b = 0, a = c.length; b < a; b++) {
                if (c[b]) {
                    var d = new AjaxSolr.Parameter();
                    d.parseString(c[b]);
                    this.add(d.name, d);
                }
            }
        },
        exposedString: function() {
            var f = [],
                d;
            for (var e = 0, b = this.exposed.length; e < b; e++) {
                if (this.params[this.exposed[e]] !== undefined) {
                    if (this.isMultiple(this.exposed[e])) {
                        for (var c = 0, a = this.params[this.exposed[e]].length; c < a; c++) {
                            d = this.params[this.exposed[e]][c].string();
                            if (d) {
                                f.push(d);
                            }
                        }
                    } else {
                        d = this.params[this.exposed[e]].string();
                        if (d) {
                            f.push(d);
                        }
                    }
                }
            }
            return f.join("&");
        },
        exposedReset: function() {
            for (var b = 0, a = this.exposed.length; b < a; b++) {
                this.remove(this.exposed[b]);
            }
        },
        load: function(a) {
            if (a === undefined) {
                a = true;
            }
            if (a) {
                this.exposedReset();
            }
            this.parseString(this.storedString());
        },
        save: function() {},
        storedString: function() {
            return "";
        }
    });
}));
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["core/Core"], a);
    } else {
        a();
    }
}(function() {
    AjaxSolr.AbstractWidget = AjaxSolr.Class.extend({
        constructor: function(a) {
            AjaxSolr.extend(this, {
                id: null,
                target: null,
                start: undefined,
                servlet: undefined,
                manager: null
            }, a);
        },
        init: function() {},
        beforeRequest: function() {},
        afterRequest: function() {},
        doRequest: function(b, a) {
            this.manager.doRequest(b || this.start, a || this.servlet);
        }
    });
}));
jQuery(document).ready(function() {
    (function(c, e) {
        var a = function(g, f) {
                var h = {};
                h._element = g;
                h.opt = c.extend({
                    divisions: 5,
                    lane_height: "10px"
                }, f);
                h.bucket_size = (100 / h.opt.divisions);
                h._template = jQuery('<div class="summary-container">    <div class="val-lane geom_quality">        <div class="val-label" title="Model geometry">Model geometry</div>        <span class="val-gradient">            <span class="val-bucket"></span>        </span>    </div>    <div class="val-lane data_quality">        <div class="val-label" title="Model fit to data">Fit model/data</div>        <span class="val-gradient">            <span  class="val-bucket"></span>        </span>    </div></div>');
                h._clear = function() {
                    this._element.empty();
                    this._element.removeClass("pdbe-validation_summary");
                };
                h._render_widget = function() {
                    var l = this._element.data().geometry_quality == 100 ? 99.999 : this._element.data().geometry_quality,
                        k = this._element.data().experiment_data_available,
                        i = this._element.data().data_quality == 100 ? 99.999 : this._element.data().data_quality,
                        j = this._template.clone();
                    this._element.addClass("pdbe-validation_summary");
                    j.find(".val-lane").height(this.opt.lane_height);
                    j.find(".geom_quality .val-bucket").css({
                        width: (this.bucket_size - 2) + "%",
                        left: (Math.floor((l / this.bucket_size)) * this.bucket_size) - 0.5 + "%"
                    });
                    j.find(".val-label").css({
                        "font-size": "100%"
                    });
                    if (i == null && k) {
                        j.find(".data_quality .val-bucket").hide();
                        j.find(".data_quality .val-gradient").css({
                            background: "#ccc",
                            "font-size": this.opt.lane_height,
                            filter: "none"
                        }).text("Data not deposited");
                    } else {
                        if (i == null && !k) {
                            j.find(".data_quality .val-bucket").hide();
                            j.find(".data_quality .val-gradient").css({
                                background: "#ccc",
                                "font-size": this.opt.lane_height,
                                filter: "none"
                            }).text("Not available");
                        } else {
                            j.find(".data_quality .val-bucket").css({
                                width: (this.bucket_size - 2) + "%",
                                left: (Math.floor((i / this.bucket_size)) * this.bucket_size) - 0.5 + "%"
                            });
                        }
                    }
                    this._element.append(j);
                };
                h.init = function() {
                    this._clear();
                    this._render_widget();
                    return h;
                };
                return h.init();
            },
            d = function(f, g) {
                f.each(function(k, j) {
                    var h = jQuery(j),
                        l = h.data();
                    if (l.pdb_id !== e && (l.geometry_quality !== e || l.experiment_data_available !== e || l.data_quality !== e)) {
                        a(h, g);
                    } else {
                        console.error("Mandatory data missing!");
                        console.error(h);
                    }
                });
            },
            b = function(k, i) {
                var j = [],
                    h = k.each(function() {
                        if (jQuery(this).data("ajax_data") == true) {
                            j.push(jQuery(this).data("pdb_id"));
                        }
                    }),
                    g = "http://wwwdev.ebi.ac.uk/pdbe/api/validation/summary_quality_scores/entry/",
                    f = "json";
                var l = c.ajax({
                    type: "POST",
                    crossDomain: true,
                    url: g,
                    data: j.join(","),
                    success: function(m) {
                        h.each(function(n, o) {
                            if (m[jQuery(o).data("pdb_id")] !== e) {
                                jQuery(o).data(m[jQuery(o).data("pdb_id")]);
                            }
                        });
                        d(h, i);
                    },
                    dataType: f,
                    error: function(n) {
                        var m = n.responseJSON;
                        if (m) {
                            h.each(function(o, p) {
                                if (m[jQuery(p).data("pdb_id")] !== e) {
                                    jQuery(p).data(m[jQuery(p).data("pdb_id")]);
                                } else {
                                    jQuery(p).data({
                                        geometry_quality: null,
                                        experiment_data_available: false,
                                        data_quality: null
                                    });
                                }
                            });
                            d(h, i);
                        }
                    },
                    context: h
                });
            };
        c.fn.pdbe_summarize = function(g) {
            var f = false,
                h = jQuery(this).find("[data-validation]").each(function(k, j) {
                    var l = (typeof jQuery(this).data("validation")) === "object" ? jQuery(this).data("validation") : JSON.parse("" + jQuery(this).data("validation").replace(/'/g, '"'));
                    if (l.geometry_quality !== e || l.experiment_data_available !== e || l.data_quality !== e) {
                        l = {
                            pdb_id: l.pdb_id || e,
                            geometry_quality: l.geometry_quality || null,
                            experiment_data_available: l.experiment_data_available || false,
                            data_quality: l.data_quality || null
                        };
                        jQuery(this).data(l).data("ajax_data", false);
                    } else {
                        jQuery(this).data(l).data("ajax_data", true);
                        f = true;
                    }
                });
            if (f) {
                b(h, g);
            } else {
                d(h, g);
            }
            return h;
        };
    })(jQuery);
});