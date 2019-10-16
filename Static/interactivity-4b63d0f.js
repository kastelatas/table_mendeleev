/* Copyright 2014 Michael Dayah - All Rights Reserved
 * Electronic redistribution in any form is strictly prohibited.
 * Any attempt to repackage, in whole or part, this source or any
 * part of Ptable will be met with DMCA takedown notices to the
 * respective host or app store where it is submitted, as well as
 * public humiliation for the copier and their company.
 */
"use strict";
var googletag = googletag || {};

function load_ad_manager(id) {
	googletag.cmd = googletag.cmd || [];
	googletag.cmd.push(function() {
		googletag.defineSlot('/10123257/AdSense', [[120, 60], [88, 31], [320, 50], [120, 90], [220, 90], [216, 36], [468, 60], [970, 90], [120, 30], [970, 66], [980, 90], [750, 100], [292, 30], [300, 31], [168, 42], [728, 90], [120, 20], [168, 28], [960, 90], [300, 50], [320, 100], [950, 90], [300, 75], [216, 54], [234, 60]], id).addService(googletag.pubads());
		googletag.pubads().enableSingleRequest();
		googletag.pubads().collapseEmptyDivs();
		googletag.enableServices();
	});
	googletag.cmd.push(function() { googletag.display(id); });
}

window.send_error = function(msg) {
	msg = (document.domain || "Nodomain") + ": " + language + ": " + msg.toString();
	(new Image()).src = "//ptable.com/Images/Spacer.GIF?msg=" + encodeURIComponent(msg) + ";";
};

var environment = ("WinJS" in window) ? "WinJS" : "Web";

var _qoptions = { qacct: "p-acpWpszny_8go" },
	google_ad_client, google_ad_slot, google_ad_width, google_ad_height,
	onload_called = false;

var Ptable = new function() {

var n_atomic = 0, n_name = (language === "zh") ? 2 : 4, n_symbol = 2, n_mass = 6,
	n_big = rtl ? 1 : 0, n_small = rtl ? 0 : 1,
	sheet_ids = ["Borders", "Weight", "Name", "Electrons"],
	checkbox_ids = sheet_ids.concat("wide"),
	symbol = [],
	lastSeries = false, lastDetach = false, lastIsotope = false, lastOrbital = false,
	allclasses, allmodes,
	isotope_intervals = [], aufbau = [], element_ids = [], search_active = false, search_mass = [], tempbox_running, slider_active,
	tab = "WriteupTab", series = "Wikipedia", dataset = "series", isoset = "isomass",
	isotopecache = [], block = [], states = [],
	from = false, to = false,
	highlight, slider_data = [],
	title = document.title, hash = false,
	resizewidth, direction = "landscape",
	block_wikipedia = false, ad_status,
	locked = [], active = false, waiting = false, hovered_state = false, oldYellow = false, lastCompound,
	iMove = 0, throbber, do_sweep = true,
	RARE_ANIMATION = 100, SWEEP_ANIMATION = 35, FADE_ANIMATION = 10, ISOTOPE_ANIMATION = 50, SLIDER_UPDATES = 20, THROB_INTERVAL = 250,
	ENTER = 13, ESC = 27, UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39, HOME = 36, END = 35, PGUP = 33, PGDN = 34, ZERO = 48, NINE = 57,
	temperature, firstDetails = true, key_next = false,
	tempK, tempC, tempF, tempState, widecheck, wholetable, detail, display, selects, slider, searchinput, wikibox, wikititle, resizetype, firstWiki = true, externalWiki, blockClick, properties, matterstate, mode, compoundresults, compoundsearch, lastSearchText = null,
	compound_matches, nondimmed = [], conn,
	property_ids = [], orbital_ids = [], block_ids = [], series_ids = [],
	quickstring = [], default_colors = [],
	datasets = {"PropertyTab":["melt","boil","electroneg","discover","affinity","heat","radius","abundance","ionize","valence","density","hardness","modulus","conductivity"], "IsotopeTab":["isomass","binding","masscontrib","halflife","width","neutrons"]};
var datavals = {"series":[[]],"chemical":[[],[]],"orbital":[{"1":"-1,1","3":1,"4":2,"5":3,"6":"-4,4","7":"-3,3,5","8":-2,"9":-1,"11":1,"12":2,"13":3,"14":"-4,4","15":"-3,3,5","16":"-2,2,4,6","17":"-1,1,3,5,7","19":1,"20":2,"21":3,"22":4,"23":5,"24":"3,6","25":"2,4,7","26":"2,3","27":"2,3","28":2,"29":2,"30":2,"31":3,"32":"-4,2,4","33":"-3,3,5","34":"-2,2,4,6","35":"-1,1,3,5","36":2,"37":1,"38":2,"39":3,"40":4,"41":5,"42":"4,6","43":"4,7","44":"3,4","45":3,"46":"2,4","47":1,"48":2,"49":3,"50":"-4,2,4","51":"-3,3,5","52":"-2,2,4,6","53":"-1,1,3,5,7","54":"2,4,6","55":1,"56":2,"57":3,"58":"3,4","59":3,"60":3,"61":3,"62":3,"63":"2,3","64":3,"65":3,"66":3,"67":3,"68":3,"69":3,"70":3,"71":3,"72":4,"73":5,"74":"4,6","75":4,"76":4,"77":"3,4","78":"2,4","79":3,"80":"1,2","81":"1,3","82":"2,4","83":3,"84":"-2,2,4","85":"-1,1","86":2,"87":1,"88":2,"89":3,"90":4,"91":5,"92":6,"93":5,"94":4,"95":3,"96":3,"97":3,"98":3,"99":3,"100":3,"101":3,"102":2,"103":3,"104":4,"105":5,"106":6,"107":7,"108":8}],"oxidation":{"1":"-1c,1c","3":"1c","4":"1,2c","5":"1,2,3c","6":"-4c,-3,-2,-1,1,2,3,4c","7":"-3c,-2,-1,1,2,3c,4,5c","8":"-2c,-1,1,2","9":"-1c","11":"-1,1c","12":"1,2c","13":"1,2,3c","14":"-4c,-3,-2,-1,1,2,3,4c","15":"-3c,-2,-1,1,2,3c,4,5c","16":"-2c,-1,1,2c,3,4c,5,6c","17":"-1c,1c,2,3c,4,5c,6,7c","19":"-1,1c","20":"1,2c","21":"1,2,3c","22":"-1,2,3,4c","23":"-1,1,2,3,4,5c","24":"-2,-1,1,2,3c,4,5,6c","25":"-3,-2,-1,1,2c,3,4c,5,6,7c","26":"-2,-1,1,2c,3c,4,5,6","27":"-1,1,2c,3c,4,5","28":"-1,1,2c,3,4","29":"1,2c,3,4","30":"1,2c","31":"1,2,3c","32":"-4c,1,2c,3,4c","33":"-3c,2,3c,5c","34":"-2c,1,2c,4c,6c","35":"-1c,1c,3c,4,5c,7","36":"2c","37":"-1,1c","38":"1,2c","39":"1,2,3c","40":"1,2,3,4c","41":"-1,2,3,4,5c","42":"-2,-1,1,2,3,4c,5,6c","43":"-3,-1,1,2,3,4c,5,6,7c","44":"-2,1,2,3c,4c,5,6,7,8","45":"-1,1,2,3c,4,5,6","46":"2c,4c","47":"1c,2,3,4","48":"1,2c","49":"1,2,3c","50":"-4c,2c,4c","51":"-3c,3c,5c","52":"-2c,2c,4c,5,6c","53":"-1c,1c,3c,4,5c,7c","54":"2c,4c,6c,8","55":"-1,1c","56":"2c","57":"2,3c","58":"2,3c,4c","59":"2,3c,4","60":"2,3c","61":"3c","62":"2,3c","63":"2c,3c","64":"1,2,3c","65":"1,3c,4","66":"2,3c","67":"3c","68":"3c","69":"2,3c","70":"2,3c","71":"3c","72":"2,3,4c","73":"-1,2,3,4,5c","74":"-2,-1,1,2,3,4c,5,6c","75":"-3,-1,1,2,3,4c,5,6,7","76":"-2,1,2,3,4c,5,6,7,8","77":"-3,-1,1,2,3c,4c,5,6,7,8","78":"2c,4c,5,6","79":"-1,1,2,3c,5","80":"1c,2c,4","81":"1c,3c","82":"-4,2c,4c","83":"-3,3c,5","84":"-2c,2c,4c,6","85":"-1c,1c,3,5,7","86":"2c","87":"1c","88":"2c","89":"2,3c","90":"2,3,4c","91":"2,3,4,5c","92":"2,3,4,5,6c","93":"3,4,5c,6,7","94":"3,4c,5,6,7,8","95":"2,3c,4,5,6","96":"3c,4","97":"3c,4","98":"2,3c,4","99":"2,3c","100":"2,3c","101":"2,3c","102":"2c,3","103":"3c","104":"4c","105":"5c","106":"6c","107":"7c","108":"8c"},"electronstring":{"1":"1s1","2":"1s2","3":"[He] 2s1","4":"[He] 2s2","5":"[He] 2s2 2p1","6":"[He] 2s2 2p2","7":"[He] 2s2 2p3","8":"[He] 2s2 2p4","9":"[He] 2s2 2p5","10":"[He] 2s2 2p6","11":"[Ne] 3s1","12":"[Ne] 3s2","13":"[Ne] 3s2 3p1","14":"[Ne] 3s2 3p2","15":"[Ne] 3s2 3p3","16":"[Ne] 3s2 3p4","17":"[Ne] 3s2 3p5","18":"[Ne] 3s2 3p6","19":"[Ar] 4s1","20":"[Ar] 4s2","21":"[Ar] 4s2 3d1","22":"[Ar] 4s2 3d2","23":"[Ar] 4s2 3d3","24":"[Ar] 4s1 3d5","25":"[Ar] 4s2 3d5","26":"[Ar] 4s2 3d6","27":"[Ar] 4s2 3d7","28":"[Ar] 4s2 3d8","29":"[Ar] 4s1 3d10","30":"[Ar] 4s2 3d10","31":"[Ar] 4s2 3d10 4p1","32":"[Ar] 4s2 3d10 4p2","33":"[Ar] 4s2 3d10 4p3","34":"[Ar] 4s2 3d10 4p4","35":"[Ar] 4s2 3d10 4p5","36":"[Ar] 4s2 3d10 4p6","37":"[Kr] 5s1","38":"[Kr] 5s2","39":"[Kr] 5s2 4d1","40":"[Kr] 5s2 4d2","41":"[Kr] 5s1 4d4","42":"[Kr] 5s1 4d5","43":"[Kr] 5s2 4d5","44":"[Kr] 5s1 4d7","45":"[Kr] 5s1 4d8","46":"[Kr] 4d10","47":"[Kr] 5s1 4d10","48":"[Kr] 5s2 4d10","49":"[Kr] 5s2 4d10 5p1","50":"[Kr] 5s2 4d10 5p2","51":"[Kr] 5s2 4d10 5p3","52":"[Kr] 5s2 4d10 5p4","53":"[Kr] 5s2 4d10 5p5","54":"[Kr] 5s2 4d10 5p6","55":"[Xe] 6s1","56":"[Xe] 6s2","57":"[Xe] 6s2 5d1","58":"[Xe] 6s2 4f1 5d1","59":"[Xe] 6s2 4f3","60":"[Xe] 6s2 4f4","61":"[Xe] 6s2 4f5","62":"[Xe] 6s2 4f6","63":"[Xe] 6s2 4f7","64":"[Xe] 6s2 4f7 5d1","65":"[Xe] 6s2 4f9","66":"[Xe] 6s2 4f10","67":"[Xe] 6s2 4f11","68":"[Xe] 6s2 4f12","69":"[Xe] 6s2 4f13","70":"[Xe] 6s2 4f14","71":"[Xe] 6s2 4f14 5d1","72":"[Xe] 6s2 4f14 5d2","73":"[Xe] 6s2 4f14 5d3","74":"[Xe] 6s2 4f14 5d4","75":"[Xe] 6s2 4f14 5d5","76":"[Xe] 6s2 4f14 5d6","77":"[Xe] 6s2 4f14 5d7","78":"[Xe] 6s1 4f14 5d9","79":"[Xe] 6s1 4f14 5d10","80":"[Xe] 6s2 4f14 5d10","81":"[Xe] 6s2 4f14 5d10 6p1","82":"[Xe] 6s2 4f14 5d10 6p2","83":"[Xe] 6s2 4f14 5d10 6p3","84":"[Xe] 6s2 4f14 5d10 6p4","85":"[Xe] 6s2 4f14 5d10 6p5","86":"[Xe] 6s2 4f14 5d10 6p6","87":"[Rn] 7s1","88":"[Rn] 7s2","89":"[Rn] 7s2 6d1","90":"[Rn] 7s2 6d2","91":"[Rn] 7s2 5f2 6d1","92":"[Rn] 7s2 5f3 6d1","93":"[Rn] 7s2 5f4 6d1","94":"[Rn] 7s2 5f6","95":"[Rn] 7s2 5f7","96":"[Rn] 7s2 5f7 6d1","97":"[Rn] 7s2 5f9","98":"[Rn] 7s2 5f10","99":"[Rn] 7s2 5f11","100":"[Rn] 7s2 5f12","101":"[Rn] 7s2 5f13","102":"[Rn] 7s2 5f14","103":"[Rn] 7s2 5f14 7p1","104":"[Rn] 7s2 5f14 6d2","105":"[Rn] 7s2 5f14 6d3","106":"[Rn] 7s2 5f14 6d4","107":"[Rn] 7s2 5f14 6d5","108":"[Rn] 7s2 5f14 6d6","109":"[Rn] 7s2 5f14 6d7","110":"[Rn] 7s1 5f14 6d9","111":"[Rn] 7s2 5f14 6d9","112":"[Rn] 7s2 5f14 6d10","113":"[Rn] 7s2 5f14 6d10 7p1","114":"[Rn] 7s2 5f14 6d10 7p2","115":"[Rn] 7s2 5f14 6d10 7p3","116":"[Rn] 7s2 5f14 6d10 7p4","117":"[Rn] 7s2 5f14 6d10 7p5","118":"[Rn] 7s2 5f14 6d10 7p6"},"melt":[[3848,14.01,0,453.69,1560,2348,3823,63.05,54.8,53.5,24.56,370.87,923,933.47,1687,317.3,388.36,171.6,83.8,336.53,1115,1814,1941,2183,2180,1519,1811,1768,1728,1357.77,692.68,302.91,1211.4,1090,494,265.8,115.79,312.46,1050,1799,2128,2750,2896,2430,2607,2237,1828.05,1234.93,594.22,429.75,505.08,903.78,722.66,386.85,161.3,301.59,1000,1193,1071,1204,1294,1373,1345,1095,1586,1629,1685,1747,1770,1818,1092,1936,2506,3290,3695,3459,3306,2739,2041.4,1337.33,234.32,577,600.61,544.4,527,575,202,300,973,1323,2023,1845,1408,917,913,1449,1618,1323,1173,1133,1800,1100,1100,1900]],"boil":[[5894,20.28,4.22,1615,2743,4273,4300,77.36,90.2,85.03,27.07,1156,1363,2792,3173,553.6,717.87,239.11,87.3,1032,1757,3103,3560,3680,2944,2334,3134,3200,3186,3200,1180,2477,3093,887,958,332,119.93,961,1655,3618,4682,5017,4912,4538,4423,3968,3236,2435,1040,2345,2875,1860,1261,457.4,165.1,944,2143,3737,3633,3563,3373,3273,2076,1800,3523,3503,2840,2973,3141,2223,1469,3675,4876,5731,5828,5869,5285,4701,4098,3129,629.88,1746,2022,1837,1235,610,211.3,950,2010,3473,5093,4273,4200,4273,3503,2284,3383]],"isotope":[[0,3,2,2,3,2,3,3,3,2,3,2,3,2,4,3,5,3,7,3,9,5,6,4,5,4,7,5,8,2,7,2,7,3,9,2,9,5,9,5,8,5,9,5,10,5,9,6,11,2,11,3,11,3,13,4,8,3,8,3,7,3,8,4,7,3,8,5,11,5,11,4,8,7,7,2,11,7,9,5,11,3,6,3,3,1,2,3,4,3,6,6,6,3,6,3,8,5,7,4,4,3,3,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1],[1,7,9,10,12,14,15,16,17,18,19,20,22,22,23,23,24,24,24,24,24,25,26,26,26,26,28,29,31,29,30,31,32,33,30,31,32,32,33,33,33,33,33,34,34,34,34,38,38,39,39,37,38,37,38,40,40,39,39,39,38,38,38,38,36,36,36,36,35,35,35,35,36,36,35,35,35,36,37,37,40,37,38,36,33,31,34,34,33,31,30,29,26,20,20,19,20,20,20,19,19,18,17,16,16,16,16,16,15,15,15,12,9,5,5,5,4,2,1]],"compound":[[275,40796,2,169,42,1065,40112,20185,32620,3865,2,803,303,159,1055,2961,5831,6109,2,348,143,28,106,112,166,89,332,182,117,191,291,41,73,140,234,2811,4,25,50,43,102,52,81,4,76,83,87,77,79,36,163,102,89,872,17,45,140,41,55,44,38,5,36,43,44,27,31,25,37,27,29,25,46,34,103,48,27,44,94,44,204,49,106,50,3,1,1,1,2,1,25,2,43,2,11,8,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]};
var cache_objects = function() {
	if (!document.getElementById("Temperature")) {
		window.send_error("dom apparently not ready. readystate:" + document.readyState + " top=self: " + String(window.top == window.self));
		alert("Ptable had a problem loading its interactivity. Please reload for full functionality.");
		return;
	}
	tempK = document.getElementById("Temperature").rows[0].cells[0];
	tempC = document.getElementById("Temperature").rows[1].cells[0];
	tempF = document.getElementById("Temperature").rows[2].cells[0];
	tempState = document.getElementById("l_state").getElementsByTagName("span")[0];
	widecheck = document.getElementById("wide");
	if (!widecheck) widecheck = {checked: false};
	wholetable = document.getElementById("Main");
	detail = document.getElementById("CloseupElement");
	display = document.getElementById("SliderDisplay");
	selects = document.getElementById("SliderSelect");
	slider = document.getElementById("SliderBar");
	searchinput = document.getElementById("SearchInput");
	mode = document.getElementById("SeriesChoice");
	wikibox = document.getElementById("WikiBox");
	wikititle = document.getElementById("WikiTitle");
	properties = document.getElementById("Properties");
	matterstate = document.getElementById("MatterState");
	compoundresults = document.getElementById("CompoundResults");
	matterstate.show = "block";
	var temp_property = properties.getElementsByTagName("td"),
		temp_series = document.getElementById("Series").getElementsByTagName("td"),
		temp_block = document.getElementById("Block").getElementsByTagName("th"),
		tags = document.getElementsByTagName("td");
	for (var i = 0; i < tags.length; i++)
		if (hasclass(tags[i], "Element")) {
			var atomic = tags[i].firstChild.childNodes[n_big].childNodes[n_atomic].getAttribute("an") * 1;
			element_ids[atomic] = tags[i];
			element_ids[atomic].idx = atomic;
		}
	var x;
	for (x = 0; x < temp_property.length; x++)
		if (temp_property[x].id === temp_property[x].id.toUpperCase() && temp_property[x].id.length)
			property_ids[temp_property[x].id.toLowerCase()] = temp_property[x];
	for (x = 0; x < temp_series.length; x++)
		if (temp_series[x].id)
			series_ids[temp_series[x].id] = temp_series[x];
	for (x = 0; x < temp_block.length; x++)
		block_ids[temp_block[x].id] = temp_block[x];
	property_ids["electronstring"] = document.getElementById("ELECTRONSTRING");
	orbital_ids["lmn"] = document.getElementById("lmn");
	orbital_ids["Hund"] = document.getElementById("Hund");
	block_ids["Orbital"] = document.getElementById("Orbital");
	resizewidth = document.documentElement.offsetWidth;
};

// benchmark: var start = (new Date).getTime(); for (var x = 1; x < 200; x++) snap_slider(x, false, true); (new Date).getTime() - start;

var store_html = function() {
	var temp = document.getElementById("Hund").tBodies[0].rows[0].cells;
	for (var x = 0; x < temp.length; x++)
		aufbau.push(temp[x].getElementsByTagName("table")[0].getElementsByTagName("th"));

	for (var atomic in datavals.electronstring)
		if (datavals.electronstring[atomic])
			quickstring[atomic] = electronstring_to_html(datavals.electronstring[atomic]);

	//name = [], electrons = [];
	allspecs.series["legends"] = [document.getElementById("Legend").firstChild.childNodes[n_mass].innerHTML];
	allspecs.series["help"] = document.getElementById("Paren").innerHTML;
	for (var i = 1, l = element_ids.length; i < l; i++) {
		datavals.series[0][i] = element_ids[i].firstChild.childNodes[n_big].childNodes[n_mass].innerHTML;
		var sym_el = element_ids[i].firstChild.childNodes[n_big].childNodes[n_symbol];
		if (sym_el.getAttribute("sym"))
			symbol[i] = sym_el.getAttribute("sym");
		else
			symbol[i] = sym_el.innerHTML;
//		name[i] = element_ids[i].childNodes[n_big].childNodes[n_name].innerHTML;
//		electrons[i] = element_ids[i].childNodes[n_small].innerHTML;
		block[i] = element_ids[i].className.slice(-1);

		var extract_group = /^Element\s(.+)\s[spdf\s]$/;
		var group = extract_group.exec(element_ids[i].className) || ["",""];
		var group_array = group[1].split(" ");
		if (group_array.length === 1)
			datavals.chemical[0][i] = datavals.chemical[1][i] = group_array[0];
		else {
			datavals.chemical[0][i] = group_array[0];
			datavals.chemical[1][i] = group_array[1];
		}
	}

	allclasses = wholetable.className;
	allmodes = document.getElementById("DecayModes").className;
	if (searchinput)
		searchinput.def = searchinput.getAttribute("placeholder");
	wholetable.inverted = false;
};

var bind_events = function() {
	if (document.getElementById("Views")) {
		var view_li = document.getElementById("Views").getElementsByTagName("input");
		for (var x = 0; x < view_li.length; x++)
			view_li[x].onclick = click_checkbox;
	}

	if (wikibox) {
		document.getElementById("Close").onclick = destroy;
		document.getElementById("Tearoff").onclick = tearoff_window;
		document.getElementById("WikiFrame").onreadystatechange = document.getElementById("WikiFrame").onload = iframe_loaded;
		wikibox.onmouseover = determineResizeType;
		wikititle.ondblclick = doubleClickTitle;
	}
	if (mode)
		mode.onclick = change_series;
	if (document.getElementById("Reset"))
		document.getElementById("Reset").onclick = click_logo;
	if (document.getElementById("TabTip"))
		document.getElementById("TabTip").onclick = hide_tabtip;
	document.forms["visualize"].onclick = document.forms["isotopes"].onclick = dataset_changed;

	if (mode)
		mode.onkeydown = no_bubble;
	document.forms["visualize"].onkeydown =
	document.forms["isotopes"].onkeydown =
		no_bubble;
	if (document.getElementById("langswitch"))
		document.getElementById("langswitch").onkeydown = no_bubble;
	if (searchinput)
		searchinput.onkeydown = no_bubble;
	if (wikibox)
		wikibox.getElementsByTagName("button")[0].onmousedown =
		wikibox.getElementsByTagName("button")[1].onmousedown =
			no_bubble;

	if (searchinput) {
		searchinput.onkeyup = function () { search(this.value); };
		if (!("placeholder" in searchinput))
			searchinput.value = searchinput.getAttribute("placeholder");
		searchinput.onfocus = search_focus;
		searchinput.onblur = search_leave;
	}
	document.onkeydown = keyboard_nav;
	document.onkeyup = keyboard_up;
	window.addEventListener("orientationchange", orientation_change);
//	if (environment !== "WinJS")
//		window.onresize = resize_check;

	var ad_close_button = document.getElementById("OarJarsClose");
	if (ad_close_button)
		ad_close_button.onclick = hide_ads;

	if ("onhashchange" in window)
		window.onhashchange = check_hash_change;
	else
		setInterval(check_hash_change, 500);

	var tds = document.getElementsByTagName("td");
	if (widecheck.nodeType > 0) {
		for (var x = 0; x < tds.length; x++) if (hasclass(tds[x], "InnerBorder")) {
			if (!is_iOS()) {
				tds[x].onmouseover = hover_border;
				tds[x].onmouseout = leave_border;
			}
			tds[x].onclick = click_border;
		}
	}
	better_mouseout(wholetable, hide_closeup);
	better_mouseout(compoundresults, compoundresults_leave);
	better_mouseover(compoundresults, dim_nonmatching_compounds);
	compoundresults.onscroll = compound_paginate;
};

var hover_border = function() {
	addclass(document.body, "InnerHover");
	widecheck.parentNode.style.backgroundColor = "yellow";
	widecheck.nextSibling.style.color = "black";
};

var leave_border = function() {
	removeclass(document.body, "InnerHover");
	widecheck.parentNode.style.backgroundColor = "";
	widecheck.nextSibling.style.color = "";
};

var click_border = function() {
	widecheck.checked = true;
	widecheck.onclick({type: "click"});
};

var hide_tabtip = function() {
	document.getElementById("TabTip").style.display = "none";
};

var no_bubble = function(e) {
	e = e || event;
	e.cancelBubble = true;
};

var apply_cookies = function() {
/*	var cookiearray = get_cookies();
	var x;
	for (x in cookiearray) {
		var parts = x.split("_");
		if (parts[0] === "subset" || parts[0] === "default")
			allspecs[parts[1]][parts[0]] = cookiearray[x] == "NaN" ? 0 : Number(cookiearray[x]);
	}

	if (document.cookie.indexOf("Weight") !== -1 || document.cookie.indexOf("wide") !== -1)
		cookie_checkbox(false, false, checkbox_ids);
*/
	if (document.getElementById("Views")) {
		for (var x = 0; x < checkbox_ids.length; x++)
			if (document.getElementById(checkbox_ids[x]).checked)
				document.getElementById(checkbox_ids[x]).onclick(); // see if IE preserves unclicks ondomready or onload, this may need to be moved to a real window.onload
	}
/*
	if (cookiearray["dataset"]) document.getElementById("t_" + cookiearray["dataset"]).checked = true;
	if (cookiearray["isoset"]) document.getElementById("t_" + cookiearray["isoset"]).checked = true;
*/
	check_hash_change();
};

var get_cookies = function() {
	var cookiearray = document.cookie.split("; "),
		resultcookie = [];
	for (var x = 0; x < cookiearray.length; x++) {
		var piece = cookiearray[x].split("=");
		resultcookie[piece[0]] = piece[1];
	}
	return resultcookie;
};

var cookie_colors = function() {
	var theRules = document.styleSheets[0].cssRules || document.styleSheets[0].rules, cookiearray = get_cookies(), allseries = allclasses.split(" ");
	for (var series in allseries) {
		if (cookiearray[allseries[series]])
			for (var x = 0; x < theRules.length; x++)
				if (theRules[x].selectorText.indexOf(allseries[series]) !== -1 && cookiearray[allseries[series]])
					theRules[x].style.backgroundColor = "#" + cookiearray[allseries[series]];
	}
};

var change_series = function(e) {
	e = e || event;
	var val = e.target || e.srcElement;
	if (!val || val.nodeName !== "A") return;

	var url, article;
	if (tab !== "WriteupTab") activeTab({srcElement: document.getElementById("WriteupTab")});
	document.getElementById(series).className = "";
	removeclass(wikibox, series);
	series = val.id;
	addclass(wikibox, series);
	document.getElementById(series).className = "Selected";
	document.getElementById("WriteupTab").href = "#Writeup/" + series;
//	document.getElementById("WriteupTab").innerHTML = document.getElementById(series).innerHTML;
	wholetable.tBodies[0].className = val.id === "Wikipedia" ? "" : val.id;

	for (var i = 1, l = element_ids.length; i < l; i++) {
		switch (val.id) {
			case "Wikipedia":
				var name = element_ids[i].firstChild.childNodes[n_big].childNodes[n_name];
				if (name.getAttribute("wiki"))
					article = name.getAttribute("wiki");
				else
					article = name.innerHTML;
				url = "//" + language + ".wikipedia.org/wiki/" + encodeURIComponent(article);
				break;
			case "Videos":
				url = "http://www.periodicvideos.com/videos/" + String("00" + element_ids[i].idx).slice(-3) + ".htm"; break;
			case "WebElements":
				url = "http://www.webelements.com/" + element_ids[i].firstChild.childNodes[n_big].childNodes[n_name].innerHTML.toLowerCase() + "/"; break;
			case "Photos":
				url = "http://www.periodictable.com/Elements/" + String("00" + element_ids[i].idx).slice(-3) + "/"; break;
			case "Podcasts":
				url = "/syndicate/chemistryworld.php?atomic=" + element_ids[i].idx; break;
		}
		element_ids[i].firstChild.href = url;
	}
};

var click_logo = function() {
	if (window.top != window.self)
		window.top.location = window.self.location;

	clear_cookie_settings();
	unwide_autofit_sweep();

	window.ga("send", "event", language, "Reset");
};

var unwide_autofit_sweep = function() {
	hide_closeup();
	if (widecheck.checked) { widecheck.checked = false; widecheck.onclick(); }
	else {
		resizewidth = 0;
		do_sweep = true;
//		window.onresize();
	}
};

var clear_cookie_settings = function() {
	var cookiearray = get_cookies();
	set_cookie("Borders", "");
	set_cookie("Weight", "");
	set_cookie("Name", "");
	set_cookie("Electrons", "");
	set_cookie("wide", "");
	for (var x in cookiearray) {
		var parts = x.split("_");
		if (parts[0] === "subset" || parts[0] === "default")
			set_cookie(x, "");
	}
	if (temperature !== 273) {
		temperature = 273;
		if (tab === "WriteupTab")
			init_slider("bottom");
	}
};

var resize_check = function() {
	if (resizewidth != document.documentElement.offsetWidth && document.cookie.indexOf("Weight") === -1) {
		clearTimeout(this.timer);
		this.timer = setTimeout(resize_hunt, 200);
	}
	resizewidth = document.documentElement.offsetWidth;
};

var resize_hunt = function() {
	var index = -1;
	var before = [];

	// Remember how things were
	for (var x = 0; x < sheet_ids.length; x++)
		before[x] = document.getElementById(sheet_ids[x]).checked;

	// Turn on sheets until you get scrollbars
	while (document.documentElement.offsetWidth >= document.documentElement.scrollWidth && index < sheet_ids.length - 1) {
		if (!document.getElementById(sheet_ids[++index]).checked) {
			document.getElementById(sheet_ids[index]).checked = true;
			document.getElementById(sheet_ids[index]).onclick();
		}
	}
	index = sheet_ids.length;
	// Turn them off until scrollbars disappear
	while (document.documentElement.offsetWidth < document.documentElement.scrollWidth && index > 0) {
		if (document.getElementById(sheet_ids[--index]).checked) {
			document.getElementById(sheet_ids[index]).checked = false;
			document.getElementById(sheet_ids[index]).onclick();
		}
	}

	// See what changed
	for (var x = 0; x < sheet_ids.length; x++)
		if (before[x] !== document.getElementById(sheet_ids[x]).checked) {
			document.getElementById(sheet_ids[x]).parentNode.className = "Highlight";
			var y = document.getElementById(sheet_ids[x]).parentNode.offsetWidth; // quantum mechanical nonsense
			document.getElementById(sheet_ids[x]).parentNode.className = document.getElementById(sheet_ids[x]).checked ? "Selected" : "Unselected";
		}

	if (do_sweep) {
		do_sweep = false;
		if (tab === "WriteupTab" && series === "Wikipedia")
			setTimeout(sweep, 250);
	}
};

var attach_class_hovers = function() {
	var row = document.getElementById("Series").tBodies[0].rows;
	var x, y;

	var metals = 0, nonmetals = 2;
	var collect_class = [];
	collect_class.push(row[2].cells[0].className); // Actinoids
	for (x = 0; x <= 4; x++)
		collect_class.push(row[1].cells[x].className); // Under metals
	row[0].cells[metals].classes = collect_class.join(" ");

	collect_class.length = 0;
	for (x = 5; x <= 6; x++)
		collect_class.push(row[1].cells[x].className); // Nonmetals
	row[0].cells[nonmetals].classes = collect_class.join(" ");

	row[0].cells[metals].firstChild.onmouseover = row[0].cells[nonmetals].firstChild.onmouseover = row[0].cells[metals].firstChild.onfocus = row[0].cells[nonmetals].firstChild.onfocus = multi_series;
	row[0].cells[metals].firstChild.onblur = row[0].cells[nonmetals].firstChild.onblur = series_leave;

	for (x = 0; x <= 2; x++)
		for (y = 0; y < row[x].cells.length; y++)
			if (row[x].cells[y].className) {
				row[x].cells[y].firstChild.onmouseover = row[x].cells[y].firstChild.onfocus = series_hover;
				row[x].cells[y].firstChild.onblur = series_leave;
			}

	better_mouseout(document.getElementById("Series"), series_leave);
	better_mouseout(document.getElementById("Block"), series_leave);
	better_mouseout(document.getElementById("DecayModes"), series_leave);

	var links = [];
	links.push(document.getElementById("Series").getElementsByTagName("a"));
	links.push(document.getElementById("DecayModes").getElementsByTagName("a"));
	links.push(document.getElementById("Block").getElementsByTagName("a"));
	for (x = 0; x < links.length; x++)
		for (y = 0; y < links[x].length; y++)
			links[x][y].onclick = click_wiki;

	row = document.getElementById("Block").tBodies[0].rows;
	for (x = 0; x < row.length; x++)
		row[x].cells[0].onmouseover = block_hover;

	row = matterstate.tBodies[0].rows;
	for (x = 0; x < row.length; x++)
		row[x].cells[0].onmouseover = hover_state;
	better_mouseout(matterstate, unhover_state);

	row = document.getElementById("DecayModes").getElementsByTagName("th");
	for (x = 0; x < row.length; x++)
		row[x].onmouseover = decaymode_hover;
};

var block_hover = function() {
	clear_series();
	wholetable.className = this.className;
};

var decaymode_hover = function() {
	if (document.getElementById("isotopeholder").childNodes.length)
		document.getElementById("DecayModes").className = document.getElementById("isotopeholder").className = this.className;
};

var hover_state = function() {
	var el = this;
	display.style.backgroundColor = highlight;

	if (hovered_state !== el.className && allspecs[dataset]["units"][0] == " K") {
		if (hovered_state) unhover_state();
		if (el.className !== "SliderBar") hovered_state = el.getAttribute("state");
		series_to_temp();
		if (hovered_state && (tab !== "PropertyTab" || dataset === "chemical")) {
			el.parentNode.className = "InvertState";
			for (var i = 1, l = element_ids.length; i < l; i++) {
				if (states[i] === hovered_state) {
					element_ids[i].style.backgroundColor = statecolors[1][states[i]];
					element_ids[i].firstChild.childNodes[n_big].childNodes[n_symbol].style.color = element_ids[i].firstChild.style.color = "white";
				}
			}
		}
	}
};

var unhover_state = function() {
	var row = matterstate.tBodies[0].rows;
	display.style.backgroundColor = "";
	for (var x = 0; x < row.length; x++) row[x].className = "";
	if (dataset !== "state" && dataset !== "melt" && dataset !== "boil") temp_to_series();
	if (hovered_state && (tab !== "PropertyTab" || dataset === "chemical")) {
		for (var i = 1, l = element_ids.length; i < l; i++) {
			if (states[i] === hovered_state) {
				element_ids[i].firstChild.childNodes[n_big].childNodes[n_symbol].style.color = statecolors[0][states[i]];
				element_ids[i].firstChild.style.color = "";
			}
		}
		restore_colors([]);
	}
	hovered_state = false;
};

var clear_series = function() {
	if (lastSeries) {
		lastSeries.style.backgroundColor = "";
		lastSeries.style.color = "";
	}
	if (active) dim_series(datavals.chemical[0][active], block[active], false);
	lastSeries = false;
};

var multi_series = function() {
	if (tab !== "PropertyTab" || dataset === "chemical") {
		clear_series();
		this.parentNode.style.backgroundColor = "#999";
		this.parentNode.style.color = "white";
		wholetable.className = this.parentNode.classes;
		lastSeries = this.parentNode;
	}
};

var series_hover = function() {
	if (tab !== "PropertyTab" || dataset === "chemical") {
		clear_series();
		wholetable.className = this.parentNode.className;
	}
};

var series_leave = function() {
	if (tab === "IsotopeTab") document.getElementById("DecayModes").className = document.getElementById("isotopeholder").className = allmodes;
	if (tab !== "PropertyTab" || dataset === "chemical") {
		clear_series();
		wholetable.className = allclasses + (tab === "OrbitalTab" ? " s p d f" : "");
		if (active) dim_series(datavals.chemical[0][active], block[active], true);
	}
};

var dataset_changed = function(empty, el) {
	el = el || this || srcElement;
	var callback = el.name === "visualize" ? switch_viz : switch_iso;
	var els = el.getElementsByTagName("input");
	for (var i = 0; i < els.length; i++)
		if (els[i].checked && els[i].value != dataset)
			callback(els[i].value);
};

var subset_changed = function(e) {
	e = e || event;
	var tag = (e.target || e.srcElement).nodeName;
	if (tag !== "INPUT") return;

	var el = document.forms["AltSlider"];
	for (var i = 0; i < el.length; i++)
		if (el[i].checked && el[i].value != allspecs[dataset]["subset"])
			switch_subset(el[i].value);
};

var select_changed = function() {
	var idx = selects.selectedIndex, subset = allspecs[dataset]["subset"];
	bump_slider(idx - subset, idx - subset);
	slider_release(true);
};

var switch_subset = function(newset) {
	var vals = allspecs[dataset]["values"];
	if (vals.length <= 6) {
		yellowize_subset(vals[allspecs[dataset]["subset"]], false);
		yellowize_subset(vals[newset], true);
	}
	allspecs[dataset]["subset"] = newset;
	window.ga("send", "event", language, "Subset", newset);
	if (dataset !== "isotope") {
		set_hash(["Property", allspecs[dataset]["tab"], vals[newset]]);
		document.getElementById("l_" + dataset).getElementsByTagName("span")[0].innerHTML = " " + vals[newset] + " ";
		update_detail(active, dataset);
	} else {
//		set_hash(["Isotope" /*, document.getElementById("l_" + isoset).innerHTML, vals[newset] */]);
		if (locked.length) load_isotope(locked[0]);
	}
	colorize_and_mass(true);
};

var switch_viz = function(newset) {
	if (dataset === "state" && wholetable.inverted)
		leave_state();
	if (dataset === "melt" || dataset === "boil")
		temp_to_series();
	var direction = find_direction(dataset, newset), spec = allspecs[newset];
	if (tab === "PropertyTab") {
		if (typeof datavals.conductivity === "undefined") {
			if (!waiting)
				finish_property_throb();
			// Reset and try again. Second attempt to click Properties.
			json_fetch_properties(datasets[tab]);
			return;
		}
		if (!("values" in spec && spec["values"].length <= 6))
			set_hash(["Property", spec["tab"]]);
		window.ga("send", "event", language, "Dataset", newset);
	}
	dataset = newset;
	if (tab === "PropertyTab" && dataset !== "chemical" && dataset !== "state" && dataset !== "discover")
		wholetable.tBodies[0].className = "NoGradient";
	else
		wholetable.tBodies[0].className = "";

	(widecheck.checked ? wholetable.tBodies[0].rows[4].cells[3] : document.getElementById("Paren")).innerHTML = spec["help"] ? spec["help"].replace(/\[([^\s\]]+)\s([^\]]+)\]/g, "<a href='$1'>$2<\/a>") : "\xa0";

	if (tab === "PropertyTab")
		highlight_data_row(dataset);
	else
		document.getElementById("Weight").nextSibling.innerHTML = spec["tab"];
	init_slider(direction);
};

var find_direction = function(oldset, newset) {
	var order = {"series": 1, "other": 2, "orbital": 3, "isotope": 4, "compound": 5}, oldid, newid;
	if (order[oldset] || order[newset]) {
		if (!order[oldset]) order[oldset] = 2;
		else if (!order[newset]) order[newset] = 2;
		if (order[newset] > order[oldset]) return "left";
		else return "right";
	} else {
		oldid = document.getElementById("t_" + oldset).parentNode.parentNode;
		newid = document.getElementById("t_" + newset).parentNode.parentNode;
		if (oldid.parentNode == newid.parentNode) {
			if (newid.rowIndex > oldid.rowIndex) return "top";
			else return "bottom";
		} else {
			if (oldid.parentNode.parentNode == oldid.parentNode.parentNode.parentNode.getElementsByTagName("table")[0]) return "right";
			else return "left";
		}
	}
};

var switch_iso = function(newset) {
	isoset = newset;
//	if (locked)	set_hash(["Isotope", document.getElementById("l_" + isoset).innerHTML, allspecs[dataset]["values"][allspecs[dataset]["subset"]], active]);
//	else set_hash(["Isotope", document.getElementById("l_" + isoset).innerHTML, allspecs[dataset]["values"][allspecs[dataset]["subset"]]]);
	window.ga("send", "event", language, "Isoset", isoset);
	colorize_and_mass(false);
	highlight_data_row(isoset);

	var len = document.getElementById("isotopeholder").childNodes;
	for (var i = 0; i < len.length; i++) {
		var datum = datavals["CurrentIsotope"][len[i].idx][isoset === "isoname" ? "isomass" : isoset];
		len[i].firstChild.childNodes[5].innerHTML = datum !== null ? datum : "\xa0";
	}
	if (isoset === "isoname") {
		for (var i = 0; i < len.length; i++)
			len[i].style.backgroundColor = "";
	} else
		color_isotope(datavals["CurrentIsotope"].map(function(item) { return item[isoset]; }), allspecs[isoset]);
};

var highlight_data_row = function(set) {
	if (oldYellow) document.getElementById(oldYellow.toUpperCase()).parentNode.className = "";
	document.getElementById(set.toUpperCase()).parentNode.className = "Highlight";
	if (tab === "IsotopeTab")
		document.getElementById("Weight").nextSibling.innerHTML = allspecs[isoset]["tab"];
	else
		document.getElementById("Weight").nextSibling.innerHTML = document.getElementById("l_" + set).innerHTML;
	oldYellow = set;
};

var yellowize_subset = function(set, onoff) {
	document.getElementById("r_" + set).parentNode.className = (onoff ? "Highlight " : "") + "Radio";
};

var color_other = function(originalArr, specArray) {
	var valueArray = {};
	for (var k in originalArr)
		valueArray[k] = originalArr[k];

	var minmax = getminmax(valueArray, specArray["scales"][specArray["subset"]], false);
	for (var i = 1, l = element_ids.length; i < l; i++) {
		if (!isNaN(valueArray[i]))
			element_ids[i].style.backgroundColor = calc_color(valueArray[i] == -Infinity ? minmax[0] : valueArray[i], specArray["startcolor"], specArray["endcolor"], minmax[0], minmax[1]);
		else
			element_ids[i].style.backgroundColor = "#" + specArray["defaultcolor"];
	}
};
// merge above and below into 1 func
var color_isotope = function(originalArr, specArray) {
	var valueArray = {};
	for (var k in originalArr)
		valueArray[k] = originalArr[k];

	var minmax = getminmax(valueArray, specArray["scale"], 0);
	for (var i in valueArray) {
		if (!isNaN(valueArray[i]) && minmax[0] !== minmax[1] && valueArray[i])
			document.getElementById("isotopeholder").childNodes[i - 1].style.backgroundColor = calc_color(valueArray[i] == -Infinity ? minmax[0] : valueArray[i], specArray["startcolor"], specArray["endcolor"], minmax[0], minmax[1]);
		else
			document.getElementById("isotopeholder").childNodes[i - 1].style.backgroundColor = "#" + specArray["defaultcolor"];
	}
};

var getminmax = function(valueArray, specs, nozero) {
	var minmax = [Number.MAX_VALUE, 0];
	for (var x in valueArray) {
		if (valueArray[x] !== "")
			valueArray[x] *= 1;
		if (valueArray[x] !== nozero) switch (specs) {
			case "log":	valueArray[x] = Math.log(valueArray[x]); break;
			case "inv":	valueArray[x] = 1 / valueArray[x]; break;
		}
		if (valueArray[x] < minmax[0] && valueArray[x] != -Infinity && !isNaN(valueArray[x]) && valueArray[x] !== "") minmax[0] = valueArray[x];
		if (valueArray[x] > minmax[1] && valueArray[x] != -Infinity && !isNaN(valueArray[x]) && valueArray[x] !== "") minmax[1] = valueArray[x];
	}
	return minmax;
};

var get_stylesheet_number_by_id = function(id) {
	if ("ownerNode" in document.styleSheets[0]) {
		for (var x = 0; x < document.styleSheets.length; x++)
			if (document.styleSheets[x].ownerNode.id === "Sheet-" + id)
				return x;
	} else
		return {"Electrons": 1, "Name": 2, "Weight": 3, "Borders": 4}[id];
};

var get_checkbox_id_from_stylesheet_index = function(index) {
	if ("ownerNode" in document.styleSheets[index]) {
		var id = document.styleSheets[index].ownerNode.id;
		if (id.indexOf("Sheet-") === -1)
			return false;
		else
			return id.split("-")[1];
	} else
		return [null, "Electrons", "Name", "Weight", "Borders"][index];
};

var click_checkbox = function(obj) {
	var human = (typeof event !== "undefined" && event !== null && event.type === "click") || (typeof obj !== "undefined" && obj.type === "click");
	obj = this || srcElement || obj;
	if (obj.id === "wide") {
		if (iMove !== 0 && iMove !== 15) return false;
		if (tab === "IsotopeTab") document.getElementById("isotopeholder").innerHTML = "";
		insert_rareearths(obj.checked, human);
	} else {
		for (var i = get_stylesheet_number_by_id(obj.id); i > 0 && i < document.styleSheets.length; i += (obj.checked - 0.5) * 2) {
			var id_for_sheet = get_checkbox_id_from_stylesheet_index(i);
			if (id_for_sheet)
				document.styleSheets[i].disabled = document.getElementById(id_for_sheet).checked = obj.checked;
		}

/*		sheets_list = document.getElementsByTagName("link");
		for (x = 2; x < 5; x++) {
			sheets_list[x].disabled = true;
			sheets_list[x].disabled = obj.id != reverse_ids[x - 2 + obj.checked];
		}*/
		display.parentNode.parentNode.parentNode.style.height = element_ids[32].offsetHeight - 6 + "px";
	}
	if (tab === "PropertyTab")
		fix_properties();
	else
		firstDetails = true;

	for (var x = 0; x < checkbox_ids.length; x++)
		document.getElementById(checkbox_ids[x]).parentNode.className = document.getElementById(checkbox_ids[x]).checked ? "Selected" : "";
	if (human)
		cookie_checkbox(true, obj.id, checkbox_ids);
};

var cookie_checkbox = function(save, id, checkbox_ids) {
	if (save) {
		if (id === "wide")
			set_cookie(id, document.getElementById(id).checked);
		else for (var x = 0; x < checkbox_ids.length; x++)
			set_cookie(checkbox_ids[x], document.getElementById(checkbox_ids[x]).checked);
		window.ga("send", "event", language, id, String(document.getElementById(id).checked));
	} else {
		var cookiearray = get_cookies();
		for (var x = 0; x < checkbox_ids.length; x++)
			if (cookiearray[checkbox_ids[x]])
				document.getElementById(checkbox_ids[x]).checked = cookiearray[checkbox_ids[x]] == "true";
	}
};

var save_colors = function(colorsarray) {
	for (var i = 1, l = element_ids.length; i < l; i++)
		colorsarray[i] = getBGcolor(element_ids[i]);
};

var restore_colors = function(colorsarray) {
	for (var i = 1, l = element_ids.length; i < l; i++)
		element_ids[i].style.backgroundColor = (colorsarray.length ? "#" + colorsarray[i] : "");
};

var toggle_display = function(boxes, onoff) {
	for (var x = 0; x < boxes.length; x++) {
		document.getElementById(boxes[x]).style.display = onoff;
		if (boxes[x] === "IsotopeForm") {
			document.getElementById("CloseupHolder").style.width = (onoff === "block" ? "auto" : "");
			document.getElementById("CloseupHolder").style.position = (onoff === "block" ? "relative" : "");
		}
	}
};

var activeTab = function(e) {
	hide_tabtip();
	restore_colors([]);
	isotope_clean();
	e = e || event;
	var name = (e.srcElement || e.target).id;
	if (name.indexOf("Tab") === -1) name = "WriteupTab";
	tab_to_anchor(tab);

	if (tab === "OrbitalTab") move_helium(false);
	if (tab === "CompoundTab") {
		clean_compounds_quickly();
		search_by_counting_minis();
	}
	if (locked.length) unlock_element(locked[0]);
	attach(tab = name);
	if (tab !== "WriteupTab") active = active || locked[0] || 1;
	property_ids["electronstring"].innerHTML = "";
	property_ids["electronstring"].className = "";
	window.ga("send", "event", language, "Tab", tab);

	switch (tab) {
		case "WriteupTab":
			from = ["Properties", "Block", "Hund", "DecayModes", "isotopeholder", "CompoundResults"]; to = ["Series"];
			switch_viz("series");
			change_series({srcElement: document.getElementById(series)});
			break;
		case "PropertyTab":
			from = ["Block", "Hund", "DecayModes", "isotopeholder", "CompoundResults"]; to = ["Properties"];
			if (!widecheck.checked || direction === "portrait") from.push("Series");
			dataset_changed(null, document.forms["visualize"]);
			break;
		case "OrbitalTab":
			property_ids["electronstring"].innerHTML = "<span>-4<\/span> <span>-3<\/span> <span>-2<\/span> <span>-1<\/span><span><\/span><br/><span>1<\/span> <span>2<\/span> <span>3<\/span> <span>4<\/span> <span>5<\/span> <span>6<\/span> <span>7<\/span> <span>8<\/span>";
			property_ids["electronstring"].className = "OxidationStates";
			from = ["Properties", "DecayModes", "isotopeholder", "CompoundResults"]; to = ["Block", "Hund"];
			if (!widecheck.checked || direction === "portrait") from.push("Series");
			switch_viz("orbital");
			break;
		case "IsotopeTab":
			from = ["Properties", "Block", "Hund", "CompoundResults"]; to = ["DecayModes"];
			if (!widecheck.checked || direction === "portrait") from.push("Series");
			toggle_display(["isotopeholder"], "");
			if (document.getElementById("isotopeholder").childNodes.length)
				toggle_display(["Closeup"], "");
			switch_viz("isotope");
			break;
		case "CompoundTab":
			from = ["Properties", "Block", "Hund", "DecayModes"]; to = ["CompoundResults"];
			if (!widecheck.checked || direction === "portrait") from.push("Series");
//			if (!locked.length) assemble_compound_search(null); // This is taken care of by hashchange
			switch_viz("compound");
			break;
	}
	if (active && document.getElementById("IsotopeForm").style.display !== "block")
		on_mouse_over(active);

	tab_to_span(name);
};

var tab_to_anchor = function(tab) {
	var el = document.getElementById(tab);
	removeclass(el, "Selected");
	el.onclick = activeTab;
};

var tab_to_span = function(tab) {
	var el = document.getElementById(tab);
	addclass(el, "Selected");
	el.onclick = function () { return false; };
};

var electronstring_to_html = function(str) {
	return str.replace(/([spdf])(\d+)(\s|$)/g, "$1<sup>$2<\/sup>$3");
};

var attach = function(what) {
	var i;
	switch (what) {
		case "OrbitalTab":
			var hund = orbital_ids["Hund"].tBodies[0].rows[0].cells;
			for (i = 0; i < hund.length; i++) {
				var temp = hund[i].getElementsByTagName("table")[0].getElementsByTagName("td");
				for (var j = 0; j < temp.length; j++) {
					temp[j].l = temp[j].parentNode.cells[0].innerHTML.charAt(1);
					temp[j].m = temp[j].cellIndex - 1;
					temp[j].n = temp[j].parentNode.cells[0].innerHTML.charAt(0);
					temp[j].onmouseover = dom_hover_orbital;
				}
			}
			// deliberate fallthrough
		case "IsotopeTab":
		case "PropertyTab":
		case "CompoundTab":
			for (i = 1, l = element_ids.length; i < l; i++) {
				if (!is_iOS()) attach_elementhover(i);
				element_ids[i].onclick = element_click;
				element_ids[i].firstChild.removeAttribute("href");
				element_ids[i].firstChild.onclick = element_ids[i].firstChild.onmouseup = null;
			}
			break;
		case "WriteupTab":
			var l;
			for (i = 1, l = element_ids.length; i < l; i++) {
				if (!is_iOS()) attach_elementhover(i);
				element_ids[i].onclick = null;
				element_ids[i].firstChild.onmouseup = click_wiki;
				element_ids[i].firstChild.onclick = block_clicks;
			}
			break;
		case "Groups":
			var groups = wholetable.tHead.rows[0].cells;
			for (i = 1; i < groups.length; i++) {
				groups[i].firstChild.onmouseup = click_wiki;
				groups[i].firstChild.onclick = block_clicks;
				groups[i].firstChild.onmouseover = groups[i].firstChild.onfocus = hover_group;
				groups[i].firstChild.onmouseout = groups[i].firstChild.onblur = search_leave;
			}
			for (i = 0; i < 7; i++) {
				wholetable.tBodies[0].rows[i].cells[0].firstChild.onmouseup = click_wiki;
				wholetable.tBodies[0].rows[i].cells[0].firstChild.onclick = block_clicks;
				wholetable.tBodies[0].rows[i].cells[0].onmouseover = wholetable.tBodies[0].rows[i].cells[0].firstChild.onfocus = hover_period;
				wholetable.tBodies[0].rows[i].cells[0].onmouseout = wholetable.tBodies[0].rows[i].cells[0].firstChild.onblur = search_leave;
			}
			break;
	}
};

var block_clicks = function() {
	var isBlocked = !blockClick;
	blockClick = false;
	return isBlocked;
};

var attach_elementhover = function(i) {
	if (typeof element_ids[i].onmouseenter !== "undefined")
		element_ids[i].onmouseenter = function () {
			on_mouse_over(this.idx);
		};
	else
		element_ids[i].onmouseover = function (e) {
			for (var el = e.relatedTarget; el && el != element_ids[this.idx]; el = el.parentNode) {}
			if (!el) on_mouse_over(this.idx);
		};
};

var element_click = function(e) {
	var multiple = (tab === "CompoundTab");
	var atomic = (this || srcElement).idx;
	var isLocked = locked.indexOf(atomic) !== -1;
	if (tab === "CompoundTab" && !isLocked) {
		// If you're unlocking something locked, let it pass through to the normal procedure below
		var isWhite = !datavals[dataset][allspecs[dataset]["subset"]][atomic];
		if (isWhite)
			// If you click a white one that does exist, unclick other stuff first, then pass through
			clean_compounds_quickly();
	}
	if (isLocked) {
		isotope_clean();
		lastIsotope = false;
		unlock_element(atomic);
	} else {
		if (tab === "IsotopeTab")
			load_isotope(atomic);
		if (!multiple && locked.length)
			unlock_element(locked[0]);
		lock_element(atomic);
	}
	if (tab === "CompoundTab")
		assemble_compound_search(atomic);
};

var lock_element = function(atomic) {
	if (document.getElementById("IsotopeForm").style.display !== "block") on_mouse_over(atomic);
	if (tab === "CompoundTab") switch_between_closeup_and_arrows(atomic);
	locked.push(atomic);
	addclass(element_ids[atomic], "Lock");
};

var unlock_element = function(atomic) {
	if (tab === "CompoundTab") switch_between_closeup_and_arrows(atomic);
	locked.splice(locked.indexOf(atomic), 1);
	if (document.getElementById("IsotopeForm").style.display !== "block") on_mouse_over(atomic);
	removeclass(element_ids[atomic], "Lock");
};

var showDetails = function(atomic, full) {
	var elTarget = element_ids[atomic].firstChild;
	detail.replaceChild(elTarget.firstChild.cloneNode(true), detail.firstChild);
	detail.replaceChild(elTarget.childNodes[1].cloneNode(true), detail.childNodes[1]);
	if (wholetable.inverted) detail.childNodes[n_big].childNodes[n_symbol].style.color = "";
	detail.style.backgroundColor = "#" + default_colors[atomic];
	if (tab !== "WriteupTab") detail.childNodes[n_big].childNodes[n_mass].innerHTML = datavals.series[0][atomic];

	if (matterstate.show === "block" && (!widecheck.checked || direction === "portrait")) {
		matterstate.style.display = "none";
		matterstate.show = "none";
	}

	document.getElementById("Closeup").style.display = "block"; // only do this if first with a .show
	if (full) {
		property_ids["electronstring"].innerHTML = quickstring[atomic]; // big speed bottleneck, so only showing in Properties
		property_ids["chemical"].innerHTML = datavals.chemical[allspecs.chemical["subset"]][atomic];
		property_ids["state"].innerHTML = states[atomic];
		for (var attribute = 0; attribute < datasets["PropertyTab"].length; attribute++)
			update_detail(atomic, datasets["PropertyTab"][attribute]);
	}
};

var update_detail = function(atomic, prop) {
	var attr = datavals[prop],
		spec = allspecs[prop],
		subset = spec["subset"];
	if (!attr) send_error("update_detail fail: atomic: " + atomic + " prop: " + prop);
	property_ids[prop].innerHTML = atomic in attr[subset] ? scinot(String(attr[subset][atomic])) + (spec["units"][subset] || "") : unknown;
};

var fix_properties = function() {
	var temp = properties.getElementsByTagName("table");
	if (temp[1].offsetWidth) {
		temp[0].style.position = "absolute";
		temp[0].style.left = temp[1].offsetWidth + 5 + "px";
		firstDetails = false;
	}
};

var hide_state = function() {
	for (var i = 1, l = element_ids.length; i < l; i++)
		element_ids[i].firstChild.childNodes[n_big].childNodes[n_symbol].style.color = statecolors[0][solid];
};

var state_classes = function(updateall, flash_updated) {
	var temp = temperature, do_update;
	for (var i = 1, l = element_ids.length; i < l; i++) {
		do_update = updateall;
		if (!datavals.boil[0][i] && (!datavals.melt[0][i] || temp >= datavals.melt[0][i])) {
			if (states[i] !== unknown) {
				do_update = true;
				states[i] = unknown;
			}
		} else if (datavals.boil[0][i] && temp >= datavals.boil[0][i]) {
			if (states[i] !== gas) {
				do_update = true;
				states[i] = gas;
			}
		} else if (temp >= datavals.melt[0][i]) {
			if (states[i] !== liquid) {
				do_update = true;
				states[i] = liquid;
			}
		} else if (temp < datavals.melt[0][i]) {
			if (states[i] !== solid) {
				do_update = true;
				states[i] = solid;
			}
		}
		if (do_update) {
			if (flash_updated && !wholetable.inverted) {
				element_ids[i].firstChild.childNodes[n_big].childNodes[n_symbol].style.color = element_ids[i].firstChild.style.color = "white";
				setTimeout(getref_uncolor_delay(i), 500);
			}
			if (flash_updated || wholetable.inverted)
				element_ids[i].style.backgroundColor = statecolors[1][states[i]];
			else
				element_ids[i].firstChild.childNodes[n_big].childNodes[n_symbol].style.color = statecolors[0][states[i]];
		}
	}
};

var getref_uncolor_delay = function(atomic) {
	return function () {
		if (!wholetable.inverted) {
			element_ids[atomic].style.backgroundColor = "";
			element_ids[atomic].firstChild.childNodes[n_big].childNodes[n_symbol].style.color = statecolors[0][states[atomic]];
		}
		element_ids[atomic].firstChild.style.color = "";
	};
};

var calc_color = function(value, start, end, min, max) {
	var n = (value - min) / (max - min), result;
	end = parseInt(end, 16);
	start = parseInt(start, 16);

	result = start + ((( Math.round(((((end & 0xFF0000) >> 16) - ((start & 0xFF0000) >> 16)) * n))) << 16) + (( Math.round(((((end & 0x00FF00) >> 8) - ((start & 0x00FF00) >> 8)) * n))) << 8) + (( Math.round((((end & 0x0000FF) - (start & 0x0000FF)) * n)))));

	return "#" + ((result >= 0x100000) ? "" : (result >= 0x010000) ? "0" : (result >= 0x001000) ? "00" : (result >= 0x000100) ? "000" : (result >= 0x000010) ? "0000" : "00000") + result.toString(16);
};

var color_temp = function(temparray, specArray) {
	var value = temperature, startcolor = specArray["startcolor"], endcolor = specArray["endcolor"], max = temparray[0];
	for (var i = 1, l = element_ids.length; i < l; i++) {
		if (!temparray[i])				element_ids[i].style.backgroundColor = "#" + specArray["defaultcolor"];
		else if (temparray[i] < value)	element_ids[i].style.backgroundColor = calc_color(temparray[i], startcolor, schemebase, 0, value);
		else							element_ids[i].style.backgroundColor = calc_color(temparray[i], schemebase, endcolor, value, max);
	}
};

var time_machine = function(discarray) {
//	elTarget.className = elTarget.className.replace(/Solid|Liquid|Gas|Unknown/, stateclass);
	var value = display.value * 1;
	for (var i = 1, l = element_ids.length; i < l; i++) {
		if (discarray[i] < value || !discarray[i]) element_ids[i].style.backgroundColor = "";
		else element_ids[i].style.backgroundColor = "#" + schemebase;
	}
};


var series_to_temp = function() {
	if ((to === false && document.getElementById("Series").style.display !== "none") || (to !== false && to[0] === "Series")) {
		document.getElementById("Series").style.display = "none";
		document.getElementById("Temperature").style.display = "block";
	}
	if (!widecheck.checked) toggle_display(["Closeup"], "none");
	matterstate.style.display = ""; matterstate.show = "block";
};

var temp_to_series = function() {
	if (document.getElementById("Temperature").style.display === "block") {
		document.getElementById("Temperature").style.display = "";
		document.getElementById("Series").style.display = "";
	}
};

var leave_state = function() {
	removeclass(wholetable, "InvertState");
	wholetable.inverted = false;
	state_classes(true, false);
	restore_colors([]);
	temp_to_series();
};

var write_stateword = function() {
	for (var i = 1, l = element_ids.length; i < l; i++)
		element_ids[i].firstChild.childNodes[n_big].childNodes[n_mass].innerHTML = states[i];
};

var colorize_and_mass = function(includemass) {
	var attr = datavals[dataset], spec = allspecs[dataset];
	if (includemass) {
		if (dataset === "state") {
			clearTimeout(slider_data["stateTimer"]);
			slider_data["stateTimer"] = setTimeout(write_stateword, 100);
		} else {
			if (!attr) send_error("colorize_and_mass fail: dataset: " + dataset + " dataset val:" + datavals[dataset]);
			for (var i = 1, l = element_ids.length; i < l; i++)
				element_ids[i].firstChild.childNodes[n_big].childNodes[n_mass].innerHTML = (attr[spec["subset"]][i] || "\xa0");
			document.getElementById("Legend").firstChild.childNodes[n_mass].innerHTML = spec["legends"][spec["subset"]] || "";
		}
	}

	if (dataset === "boil" || dataset === "melt") {
		clearTimeout(slider_data["colorTimer"]);
		slider_data["colorTimer"] = setTimeout(function() { return color_temp(attr[0], spec); }, 30);
	}
	else if (dataset === "discover") time_machine(attr[0]);
	else if (dataset === "compound") color_compounds(attr[0]);
	else if (dataset === "chemical") switch_series(spec["subset"]);
	else if (dataset !== "series" && dataset !== "state" && dataset !== "isotope" && dataset !== "orbital" && dataset !== "compound")
		color_other(attr[spec["subset"]], spec);
};

var switch_series = function(set) {
	restore_colors([]);
	switch (Number(set)) {
		case 0:
			document.getElementById("ExternalKey").className = wholetable.className = wholetable.className.replace("Boron Carbon Pnictogen Chalcogen Halogen", "Poor Metalloid Nonmetal");
			break;
		case 1:
			document.getElementById("ExternalKey").className = wholetable.className = wholetable.className.replace("Poor Metalloid Nonmetal", "Boron Carbon Pnictogen Chalcogen Halogen");
	}
};

var on_mouse_over = function(atomic) {
	if (active) dark(active);
	if (tab === "CompoundTab") {
		if (atomic) {
			dim(atomic);
			if (detail.id === "CloseupElement") showDetails(atomic, false);
			active = atomic;
		}
	} else {
		if (atomic && !locked.length) {
			dim(atomic);
			showDetails(atomic, (typeof datavals.conductivity !== "undefined" && tab === "PropertyTab"));
			if (tab === "OrbitalTab") tab_electron(atomic);
			active = atomic;
		}
	}
};

var hide_closeup = function() {
	if (tab === "WriteupTab") {
		on_mouse_over();
		if (active) element_ids[active].firstChild.blur();
		active = false;
		toggle_display(["Closeup"], "none");
		matterstate.style.display = "";
		matterstate.show = "block";
	} else if (tab === "CompoundTab") {
		if (locked.length)
			dark(active);
	}
};

var isotope_clean = function() {
	search_leave();
	for (var x = 0; x < isotope_intervals.length; x++)
		clearInterval(isotope_intervals[x]);
	isotope_intervals = [];
	document.getElementById("isotopeholder").innerHTML = "";
	toggle_display(["IsotopeForm"], "");
	document.getElementById("DecayModes").className = allmodes;
	document.getElementById("DecayModes").tBodies[0].className = "";
//	set_hash(["Isotope", document.getElementById("l_" + isoset).innerHTML, allspecs[dataset]["values"][allspecs[dataset]["subset"]]]);
};

var dim = function(atomic) {
	if (tab === "WriteupTab" && !search_active)
		element_ids[atomic].firstChild.focus();
	else
		addclass(element_ids[atomic], "Hover");
	group_period(element_ids[atomic], highlight);
	dim_series(datavals.chemical[0][atomic], block[atomic], true);
};

var dark = function(atomic) {
	removeclass(element_ids[atomic], "Hover");
	group_period(element_ids[atomic], "");
	dim_series(datavals.chemical[0][atomic], block[atomic], false);
};

var dim_series = function(series, orbital, dim) {
	if (series && series !== " " && series !== "Undiscovered") {
		if (dim)	addclass(series_ids[series], "Highlight");
		else		removeclass(series_ids[series], "Highlight");
	}
	if (orbital && orbital !== " ") {
		if (dim)	addclass(block_ids[orbital], "Highlight");
		else		removeclass(block_ids[orbital], "Highlight");
	}
};

var set_opacity = function(el, value) {
	el.style.opacity = value;
	el.style.filter = (value != 1) ? "alpha(Opacity=" + value * 100 + ")" : "";
};

/*
var set_stateclass = function(elTarget, stateclass) {
	if (elTarget.className.indexOf(stateclass) === -1) elTarget.className = elTarget.className.replace(/Solid|Liquid|Gas|Unknown/, stateclass);
};
*/

var keyboard_up = function(e) {
	e = e || event;
	var topes = document.getElementById("isotopeholder").childNodes;

	if (e.keyCode === ENTER) {
		if ((e.srcElement || e.target).nodeName.toUpperCase() !== "A") {
			if (topes.length && lastIsotope !== false && topes[lastIsotope].style.cursor === "pointer")
				topes[lastIsotope].onclick();
			else if (active && lastIsotope === false) {
				if (tab === "WriteupTab")
					element_ids[active].firstChild.onmouseup();
				else if (tab === "IsotopeTab" || tab === "CompoundTab")
					element_ids[active].onclick();
			}
		}
	}

	else if (e.keyCode === ESC) {
		if (hasclass(wikibox, "Expanded")) destroy();
		else if (topes.length) element_ids[active].onclick();
		else if (tab === "CompoundTab" && locked.length) {
			clean_compounds_quickly();
			search_by_counting_minis();
		}
	}
};

var keyboard_nav = function(e) {
	e = e || event;
	var topes = document.getElementById("isotopeholder").childNodes, newElement;

	if (mode && isDisplayBlock(mode)) {
		var node;
		if (e.keyCode === UP)
			node = document.getElementById(series).parentNode.previousSibling;
		else if (e.keyCode === DOWN)
			node = document.getElementById(series).parentNode.nextSibling;
		if (node)
			change_series({srcElement: node.firstChild});
	} else

	if (e.keyCode >= 35 && e.keyCode <= 40) {
		if (topes.length) {
			lastIsotope = 0 || lastIsotope;
			switch (e.keyCode) {
				case END: case HOME:
					newElement = e.keyCode === END ? topes.length - 1 : 0;
					break;
				case LEFT: case UP: case RIGHT: case DOWN:
					newElement = Math.max(0, Math.min(topes.length - 1, lastIsotope + (e.keyCode >= 39 ? +1 : -1)));
					break;
			}
			topes[newElement].onmouseover();
		} else {
			on_mouse_over(active || 1);
			switch (e.keyCode) {
				case END:
					newElement = element_ids.length - 1;
					break;
				case HOME:
					newElement = 1;
					break;
				case LEFT: case RIGHT:
					newElement = Math.max(1, Math.min(element_ids.length - 1, active - 38 + e.keyCode));
					break;
				case UP: case DOWN:
					var count = 0, pos = active, rowind = element_ids[active].parentNode.rowIndex;
					if (e.keyCode === DOWN) {
						if (widecheck.checked) { if (rowind === 7) return; }
						else {
							if (rowind === 11 || pos === 39 || pos === 87 || pos === 88) return; // At bottom, can't go down
							if ((pos >= 40 && pos <= 56) || (pos >= 72 && pos <= 88)) pos += 15;
							else if (rowind === 10) pos += 17;
							else if (pos >= 104) pos -= 47;
						}
					} else { // UP
						if (pos <= 2 || (pos >= 4 && pos <= 9) || (pos >= 21 && pos <= 30)) return;
						if (widecheck.checked) { if (pos >= 57 && pos <= 70) return; }
						else {
							if ((pos > 71 && pos <= 86) || rowind === 7) pos -= 15;
							else if (rowind === 11) pos -= 17;
							else if (rowind === 10) pos += 62;
						}
					}

					var extra;
					if (element_ids[active].cellIndex < 3 && rowind < 8)
						extra = 1;
					else
						extra = 0;

					var row;
					if (e.keyCode === UP)
						row = wholetable.tBodies[0].rows[rowind - 1 - extra];
					else
						row = wholetable.tBodies[0].rows[rowind - extra];

					for (var i = 0; i < row.cells.length; i++)
						if (hasclass(row.cells[i], "Element"))
							count += e.keyCode - 39;
					newElement = pos + count;
					break;
			}
			on_mouse_over(newElement);
		}
	}
};

var group_period = function(el, color) {
	if (iMove !== 0 && iMove !== 15) return;
	var period = el.parentNode.rowIndex - 1, count;
	wholetable.tBodies[0].rows[period > 7 ? period - 4 : period].cells[0].style.backgroundColor = color;
	if (period > 7) return;

	if (el.cellIndex < 3) count = el.cellIndex;
	else {
		count = 20 - wholetable.tBodies[0].rows[period].cells.length + el.cellIndex + widecheck.checked + (wholetable.tBodies[0].rows[period].cells[3].cellIndex !== 3);
		if (widecheck.checked && count <= 3) return;
	}
	wholetable.tHead.rows[0].cells[count].style.backgroundColor = color;
};

var hover_group = function(e) {
	if (search_active) return;
	if (iMove !== 0 && iMove !== 15) return;
	e = e || event;
	var selected = [];
	var count = this.parentNode.cellIndex, min = 0, max = 7;
	if (count > 1 + (tab === "OrbitalTab") && count < 18 + (tab === "OrbitalTab") + widecheck.checked) min++;
	if (count > 2 && count < 13 + widecheck.checked) min += 2;
	if (!widecheck.checked && count == 3) max -= 2;

	for (var period = min; period < max; period++) {
		var index;
		if (count <= 3)
			index = count;
		else {
			index = wholetable.tBodies[0].rows[period].cells.length - 20 + count - widecheck.checked;
			if (widecheck.checked && index < 3) break;
		}
		var atomic = wholetable.tBodies[0].rows[period].cells[index].idx;
		selected.push(atomic);
	}
	search(selected.join(","));
};

var hover_period = function(e) {
	if (search_active) return;
	if (iMove !== 0 && iMove !== 15) return;
	e = e || event;
	var selected = [];
	var period = (this.nodeName.toUpperCase() === "A" ? this.parentNode.parentNode.rowIndex : this.parentNode.rowIndex),
		start = wholetable.rows[period].cells[1].idx,
		end = (tab === "OrbitalTab" && start === 1 ? 2 : wholetable.rows[period].cells[wholetable.rows[period].cells.length - 2].idx);

	for (var atomic = start; atomic <= end; atomic++)
		selected.push(atomic);

	search(selected.join(","));
};

var JSON_request = function() {
	var xmlhttp, complete = false;
	if (window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else if (window.ActiveXObject)
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP.6.0");
	else
		return null;

	this.connect = function(sURL, fnDone, fnFail, extra) {
		if (!xmlhttp) return false;
		if (!complete) {
			xmlhttp.onreadystatechange = null;
			xmlhttp.abort();
		}
		complete = false;
		try {
			xmlhttp.open("GET", sURL, true)
			xmlhttp.timeout = 10 * 1000;
			xmlhttp.ontimeout = xmlhttp.onerror = function() {
				fnFail(extra);
			};
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState === 4 && (xmlhttp.status == 200 || xmlhttp.status == 304) && !complete) {
					complete = true;
					fnDone(xmlhttp, extra);
				}
			};
			xmlhttp.send("");
		}
		catch (e) { return false; }
		return true;
	};
	return this;
};

var json_fetch_properties = function(arrays) {
	if (!waiting) {
		waiting = true;
		throb_properties(document.getElementById("PropertyTab"));
		var list = [];
		for (var set = 0; set < arrays.length; set++) {
			if (datavals[arrays[set]]) continue;
			if ("dbnames" in allspecs[arrays[set]])
					list.push(arrays[set] + "-" + allspecs[arrays[set]]["dbnames"].join(":"));
			else	list.push(arrays[set]);
		}
		conn = conn || (new JSON_request());
		conn.connect("JSON/property?"+list.join(","), parse_into_arrays, properties_request_fail);
	}
};

var properties_request_fail = function() {
	finish_property_throb();
	Bugsnag.notify("JSON request timed out", "Properties");
};

var parse_into_arrays = function(json) {
	var resultset = parse_json(json.responseText);
	if (resultset) {
		for (var sets in resultset)
			datavals[sets] = resultset[sets];
		if (tab === "PropertyTab") {
			dataset_changed(null, document.forms["visualize"]);
			if (active)
				on_mouse_over(active);
		}
	} else {
		Bugsnag.notify("JSON parsed but invalid", "Properties", {responseText: json.responseText}, "error");
	}
	finish_property_throb();
};

var finish_property_throb = function() {
	waiting = false;
	clearInterval(throbber);
	removeclass(document.getElementById("PropertyTab"), "Throb");
	document.getElementById("PropertyTab").style.backgroundColor = "";
};

var load_isotope = function(atomic) {
	init_throb(atomic);
	conn = conn || (new JSON_request());
	conn.connect("JSON/isotopes/"+atomic, click_isotope, isotope_request_fail, atomic);
//	set_hash(["Isotope", document.getElementById("l_" + isoset).innerHTML, allspecs[dataset]["values"][allspecs[dataset]["subset"]], atomic]);
	window.ga("send", "event", language, "Isotope", atomic);
};

var isotope_request_fail = function(atomic) {
	unlock_element(atomic);
	finish_throb(atomic, throbber);
	Bugsnag.notify("JSON request timed out", "Isotopes");
};

var click_isotope = function(json, atomic) {
	var resultset = parse_json(json.responseText);
	if (resultset) {
		search_focus();
		search(String(atomic));
		document.getElementById("Closeup").style.display = "none";
		toggle_display(["IsotopeForm"], "block");
		document.getElementById("DecayModes").tBodies[0].className = "NoDecayText";

		var count = 0;
		datavals["CurrentIsotope"] = [];
		isotopeDetails(false, true);
		for (var sets = 0; sets < resultset.length; sets++)
			if (resultset[sets].selected <= allspecs.isotope["subset"])
				draw_isotope(atomic, ++count, resultset[sets]);
		document.getElementById("ISONAME").firstChild.innerHTML = element_ids[atomic].firstChild.childNodes[n_big].childNodes[n_name].innerHTML;
		document.getElementById("ISONAME").childNodes[1].innerHTML = "";
		document.forms["isotopes"].onclick();
		fade_isotopes();
	} else {
		unlock_element(atomic);
		Bugsnag.notify("JSON parsed but invalid", "Isotopes", {responseText: json.responseText}, "error");
	}
	finish_throb(atomic, throbber);
};

var fade_isotopes = function() {
	var topes = document.getElementById("isotopeholder").childNodes;
	for (var x = 0; x < topes.length; x++)
		setTimeout(opacity_closure(topes, x), ISOTOPE_ANIMATION * x);
};

var opacity_closure = function(topes, x) {
	return function () { fade_opacity(topes[x], 1); };
};

var draw_isotope = function(atomic, count, specs) {
	datavals["CurrentIsotope"][count] = specs;
	var nuclide = document.createElement("div");
	nuclide.idx = count;
	nuclide.onmouseover = function () {
		var topes = document.getElementById("isotopeholder").childNodes;
		var x;
		if (lastIsotope < this.ordinal)
			for (x = lastIsotope; x < this.ordinal; x++)
				topes[x].style.zIndex = topes[x].ordinal + 1;
		else if (this.ordinal < lastIsotope)
			for (x = this.ordinal; x < lastIsotope; x++)
				topes[x].style.zIndex = 100 - topes[x].ordinal;
		lastIsotope = this.ordinal;
		isotopeDetails(count, false);
		document.getElementById("DecayModes").className = this.decayMode;
	};
	nuclide.decayMode = specs.decaymode ? specs.decaymode : unknown;
	nuclide.className = element_ids[atomic].className + " " + nuclide.decayMode;
	nuclide.appendChild(element_ids[atomic].firstChild.childNodes[n_big].cloneNode(true));
	nuclide.firstChild.childNodes[n_symbol].innerHTML = "<span class='Prefix'><span class='TopBottom' style='margin-top: -1.1em;'>" + specs.neutrons + "<\/span><span class='TopBottom'>" + atomic + "<\/span><\/span>" + element_ids[atomic].firstChild.childNodes[n_big].childNodes[n_symbol].innerHTML;
	nuclide.firstChild.childNodes[4].innerHTML += "-" + specs.neutrons;
	nuclide.firstChild.removeChild(nuclide.firstChild.childNodes[n_atomic]);
	if (specs.wiki === 1) {
		nuclide.style.cursor = "pointer";
		nuclide.onclick = click_wiki;
	}
	nuclide.ordinal = lastIsotope = count - 1;
	document.getElementById("isotopeholder").appendChild(nuclide);
	var position = findPos(element_ids[atomic], [-findPos(nuclide, [0, 0])[0], -findPos(nuclide, [0, 0])[1]]);
	nuclide.style.left = -position[0] + 20 * count + "px";
	nuclide.style.top = -position[1] + 20 * count + "px";
	nuclide.style.zIndex = count + 1;
	fade_opacity(nuclide, 0);
};

var isotopeDetails = function(inc, clear) {
	if (!clear) {
		var nuclide = datavals["CurrentIsotope"][inc];
		document.getElementById("ISONAME").childNodes[1].innerHTML = "-" + nuclide.neutrons;
		document.getElementById("ISOMASS").innerHTML = nuclide.isomass !== null ? nuclide.isomass : unknown;
		document.getElementById("BINDING").innerHTML = nuclide.binding !== null ? nuclide.binding + allspecs.binding["units"][0] : unknown;
		document.getElementById("MASSCONTRIB").innerHTML = nuclide.masscontrib !== null ? nuclide.masscontrib + "%" : unknown;
		document.getElementById("HALFLIFE").innerHTML = timeunits(nuclide.halflife);
		document.getElementById("WIDTH").innerHTML = nuclide.width !== null ? scinot(nuclide.width) + allspecs.width["units"][0] : unknown;
	} else {
		document.getElementById("ISONAME").childNodes[1].innerHTML =
		document.getElementById("ISOMASS").innerHTML =
		document.getElementById("BINDING").innerHTML =
		document.getElementById("MASSCONTRIB").innerHTML =
		document.getElementById("HALFLIFE").innerHTML =
		document.getElementById("WIDTH").innerHTML = "";
	}
};

var load_script = function(file, callback) {
	var s = document.createElement("script");
	s.src = file;
	s.async = 1;
	s.type = "text/javascript";
	s.onload = callback;
	document.getElementsByTagName("head")[0].appendChild(s);
};

var load_stylesheet = function(file) {
	var s = document.createElement("link");
	s.href = file;
	s.rel = "stylesheet";
	s.type = "text/css";
	document.getElementsByTagName("head")[0].appendChild(s);
};

var set_cookie = function(name, value) {
	if (value === "")
		var expires = new Date(1982, 10, 21).toGMTString();
	else
		var expires = new Date((new Date()).getTime() + 1000*60*60*24*30).toGMTString();

	document.cookie = name + "=" + value + "; expires=" + expires + "; path=/; domain=ptable.com";
};

var set_cookie_expires = function(name, value, days) {
	var now = new Date();
	now.setTime(now.getTime() + 1000 * 60 * 60 * 24 * days)

	document.cookie = name + "=" + value + "; expires=" + now.toUTCString() + "; path=/; domain=ptable.com";
};

this.external_set_cookie = function(name, value) {
	set_cookie(name, value);
};

var lazy_load = function() {
	// Quantcast
//	load_script("//edge.quantserve.com/quant.js");

	// Add2Home
	if ("standalone" in navigator && !navigator.standalone) {
//		load_stylesheet("../Library/add-to-homescreen/style/addtohomescreen.css");
//		load_script("../Library/add-to-homescreen/src/addtohomescreen.js");
	}
	load_ad_manager("div-gpt-ad-1535525295466-0");
};

var is_iOS = function() {
	return /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
};

this.content_loaded = function(e) {
	if (document.addEventListener) {
		document.removeEventListener("DOMContentLoaded", Ptable.content_loaded, false);
		Ptable.load_complete();
	} else if (document.readyState === "complete") {
		document.detachEvent("onreadystatechange", Ptable.content_loaded);
		Ptable.load_complete();
	}
};

this.load_complete = function() {
	if (onload_called)
		return;
	else
		onload_called = true;

	var domain = document.domain.split(".");
	var site = domain[domain.length - 2];
	if (site && site.toLowerCase() !== "ptable")
		window.send_error("Piracy");

	patreon_check();

	var cookiearray = get_cookies();

	highlight = calc_color(1, schemebase, "FFFF00", 0, 2);

	cache_objects();
	store_html();
	bind_events();

	if (cookiearray["temperature"] && !isNaN(cookiearray["temperature"]))
		temperature = cookiearray["temperature"] * 1;
	else
		temperature = 273;

	attach_class_hovers();
	attach("WriteupTab");
	attach("Groups");
//	cookie_colors();
	save_colors(default_colors);

	if (document.getElementById("WriteupTab")) {
		tab_to_span("WriteupTab");
		tab_to_anchor("PropertyTab");
		tab_to_anchor("OrbitalTab");
		tab_to_anchor("IsotopeTab");
		tab_to_anchor("CompoundTab");
	}

//	document.getElementById("SliderCell").getElementsByTagName("div")[0].style.height = element_ids[32].offsetHeight - 6 + "px"; // triggers a reflow!
	init_slider("bottom");
	apply_cookies();

	if (document.cookie.indexOf("Weight") === -1) {
		resizewidth = 0;
//		window.onresize();
	}
	orientation_change();

/*	setTimeout(function() {
		if (document.cookie.indexOf("Weight") === -1 && document.getElementById("TabTip")) {
			document.getElementById("TabTip").style.display = "block";
			setTimeout(function() { document.getElementById("TabTip").style.marginLeft = "16em"; }, 2 * 1000);
		}
	}, 10 * 1000);
*/

	lazy_load();
};

var patreon_check = function() {
	var is_patron = get_cookie("PatreonSubscription");
	var ads_hidden = get_cookie("HideAds");

	if (is_patron) {
		ad_status = "Donated";
		hide_ad_container();
		customize_integration(is_patron);
	} else if (ads_hidden) {
		ad_status = "Hidden";
		hide_ad_container();
	} else if (document.getElementById("ExtOarJars")) {
		ad_status = "Shown";
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	} else if (document.getElementById("OarJarsText")) {
		ad_status = "Blocked";
		document.getElementById("OarJarsText").style.display = "block";
	} else {
		ad_status = "UnsupportedLanguage";
	}
	ga("send", "event", language, "Ads", ad_status, {"nonInteraction": 1});
};

var hide_ad_container = function() {
	var ad_container = document.getElementById("OarJars");
	if (ad_container)
		ad_container.style.display = "none";
};

var customize_integration = function(reward_id) {
	switch (Number(reward_id)) {
		case 1765799:	// Remove ads
		case 9999999:	// Remove ads + poster discount
			break;
		case 1765792:	// Integration with no ads
			var reload_minutes = 60;
			setTimeout(function() { location.reload(true); }, reload_minutes * 60 * 1000);

			block_wikipedia = true;

			document.getElementById("WriteupTab").textContent = "Series";

			var nav_links = document.querySelectorAll("#Navigation > a");
			for (var i = 0; i < nav_links.length; i++)
				document.getElementById("Navigation").removeChild(nav_links[i]);
			break;
	}
};

var hide_ads = function() {
	set_cookie_expires("HideAds", ad_status, 3);
	ga("send", "event", language, "HideAds", ad_status);
	var ad_container = document.getElementById("OarJars");
	if (ad_container)
		ad_container.style.display = "none";
};

var get_cookie = function(name) {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; ++i) {
		var pair = cookies[i].trim().split("=");
		if (pair[0] === name)
			return pair[1];
	}
	return null;
};
var sweep = function() {
	var rows, diagonals = [[1], [3], [4,11], [12,19], [20,37], [21,38,55], [22,39,56,87], [23,40,88], [24,41,72], [25,42,73,104], [26,43,74,105], [27,44,75,106,57], [28,45,76,107,58,89], [5,29,46,77,108,59,90], [6,13,30,47,78,109,60,91], [7,14,31,48,79,110,61,92], [8,15,32,49,80,111,62,93], [2,9,16,33,50,81,112,63,94], [10,17,34,51,82,113,64,95], [18,35,52,83,114,65,96], [36,53,84,115,66,97], [54,85,116,67,98], [86,117,68,99], [118,69,100], [70,101], [71,102], [103]];
	for (rows = 0; rows < 30; rows++) {
		if (diagonals[rows]) setTimeout(sweep_getref(diagonals[rows], 1), SWEEP_ANIMATION * rows);
		if (diagonals[rows - 1]) setTimeout(sweep_getref(diagonals[rows - 1], 2), SWEEP_ANIMATION * rows);
		if (diagonals[rows - 2]) setTimeout(sweep_getref(diagonals[rows - 2], 1), SWEEP_ANIMATION * rows);
		if (diagonals[rows - 3]) setTimeout(sweep_getref(diagonals[rows - 3], 0), SWEEP_ANIMATION * rows);
	}
};

var sweep_getref = function(elements, color) {
	return function () { dim_diagonal(elements, color); };
};

var dim_diagonal = function(elements, color) {
	for (var x = 0; x < elements.length; x++)
		element_ids[elements[x]].style.backgroundColor = (color !== 0 ? calc_color(color, default_colors[elements[x]], schemebase, 0, 3) : "");
};

var init_throb = function(atomic) {
	clearInterval(throbber);
	addclass(element_ids[atomic], "Throb");
	throbber = setInterval(function() { swap_color(element_ids[atomic], "FirstColor", "#" + default_colors[atomic], "#" + schemebase); }, THROB_INTERVAL);
};

var finish_throb = function(atomic) {
	clearInterval(throbber);
	removeclass(element_ids[atomic], "Throb");
	element_ids[atomic].style.backgroundColor = "";
};

var throb_properties = function(el) {
	addclass(el, "Throb");
	throbber = setInterval(function() { swap_color(el, "FirstColor", "white", "#0276FD"); }, THROB_INTERVAL);
};

var swap_color = function(el, classname, color1, color2) {
	if (hasclass(el, classname)) {
		el.style.backgroundColor = color1;
		removeclass(el, classname);
	} else {
		el.style.backgroundColor = color2;
		addclass(el, classname);
	}
};
var timeunits = function(seconds) {
	var period_name = ["y", "d", "h", "min", "s", "ms", "\u00b5s", "ns", "ps"],
		period_secs = [31556926, 86400, 3600, 60, 1, 1E-3, 1E-6, 1E-9, 1E-12];

	if (seconds === "0")
		return stable;
	else if (seconds === null)
		return unknown;
	else for (var i = 0; i < period_name.length; i++)
		if (seconds >= period_secs[i])
			return scinot((seconds / period_secs[i]).toPrecision(countsigfig(seconds))) + " " + period_name[i];
	return scinot((seconds / period_secs.pop()).toPrecision(countsigfig(seconds))) + " " + period_name.pop();
};

var countsigfig = function(num) {
	return num.replace(/^0\.0*/, "").replace(/\.|e.+$/g, "").length;
};

var scinot = function(num) {
	return num.replace(/e[+]*(-)*(\d*)$/, "\u00d710<sup>$1$2<\/sup>");
};

var findPos = function(obj, lefttop) {
	return (obj ? findPos(obj.offsetParent, [lefttop[0] - obj.offsetLeft, lefttop[1] - obj.offsetTop]) : lefttop);
};

var getBGcolor = function(el) {
	if (el.currentStyle) return (el.currentStyle.backgroundColor.replace(/^#/, ""));
	else if (window.getComputedStyle) return (rgb2hex(getComputedStyle(el, null).getPropertyValue("background-color")));
};

var isDisplayBlock = function(el) {
	if (el.currentStyle) return (el.currentStyle.display !== "none");
	else if (window.getComputedStyle) return (getComputedStyle(el, null).getPropertyValue("display") !== "none");
};

var rgb2hex = function(value) {
	var hex = "";
	var h = /(\d+)[, ]+(\d+)[, ]+(\d+)/.exec(value);
	if (!h) window.send_error("no h value: " + value, "interactivity.js", "rgb2hex");
	for (var i = 1; i <= 3; i++)
		hex += (h[i] < 16 ? "0" : "") + parseInt(String(h[i]), 10).toString(16);
	return (hex);
};

var benchmark = function() {
	var view_start, x, y;
	view_start = (new Date()).getTime();
	for (x = 0; x < 5; x++)
		for (y = 0; y <= 118; y++)
			on_mouse_over(y);
	alert((new Date()).getTime() - view_start);
};

var addclass = function(el, name) {
	if (!hasclass(el, name))
		el.className += (el.className ? " " : "") + name;
};

var removeclass = function(el, name) {
	if (hasclass(el, name))
		el.className = el.className.replace(new RegExp("(\\s|^)" + name + "(\\s|$)"), " ").replace(/^\s+|\s+$/g, "");
};

var hasclass = function(el, name) {
	return new RegExp("(\\s|^)" + name + "(\\s|$)").test(el.className);
};

var better_mouseover = function(sink, callback) {
	if (typeof sink.onmouseenter !== "undefined")
		sink.onmouseenter = callback;
	else
		sink.onmouseover = function (e) {
			for (var el = e.relatedTarget; el && (el !== sink); el = el.parentNode) {}
			if (!el) callback(e.toElement);
		};
};

var better_mouseout = function(sink, callback) {
	if (typeof sink.onmouseleave !== "undefined")
		sink.onmouseleave = callback;
	else
		sink.onmouseout = function (e) {
			for (var el = e.relatedTarget; el && (el !== sink); el = el.parentNode) {}
			if (!el) callback(e.fromElement);
		};
};

var count = function(obj) {
	var size = 0, key;
	for (key in obj)
		if (obj.hasOwnProperty(key))
			size++;
	return size;
};

var comma = function(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var parse_json = function(text) {
	var parsed;
	if (typeof JSON !== "undefined") {
		try {
			parsed = JSON.parse(text);
		} catch (e) {
			Bugsnag.notifyException(e, "JSON parse error", {responseText: text});
			window.send_error("JSON.parse fail: " + text.substring(0, 60), "interactivity.js", "JSON");
			parsed = false;
		}
		return parsed;
	} else
		return externalEval(text);
};

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(needle) {
		for (var i = 0; i < this.length; i++)
			if (this[i] === needle) return i;
		return -1;
	};
}

if (!("map" in Array.prototype)) {
	Array.prototype.map = function(mapper, that) {
		var other = new Array(this.length);
		for (var i = 0, n = this.length; i < n; i++)
			if (i in this)
				other[i] = mapper.call(that, this[i], i, this);
		return other;
	};
}

if (typeof String.prototype.trim !== "function") {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	}
}
var init_slider = function(direction) {
	var spec = allspecs[dataset];
	create_slider(direction);
	if (spec["units"][0] !== " K") {
		hide_state();
		slider.parentNode.getElementsByTagName("img")[0].style.display = "none";
	} else {
		state_classes(true, false);
		slider.parentNode.getElementsByTagName("img")[0].style.display = "";
	}
	if ("slidermax" in spec) {
		// continuous slider
		selects.style.display = "none";
		display.style.display = "";
		slider.parentNode.style.display = "";
		slider_data["from"] = spec["slidermin"];
		slider_data["to"] = spec["slidermax"];
		get_slider_dimensions();
		if (dataset === "state" && !wholetable.inverted) {
			document.getElementById("Legend").firstChild.childNodes[n_mass].innerHTML = spec["legends"][0];
			dim_for_states();
		}
		if (dataset === "melt" || dataset === "boil") series_to_temp();
		snap_slider(((spec["units"][0] === " K") ? temperature : spec["default"] - slider_data["from"]) * slider_data["scale"], true, false, true);
	} else if ("values" in spec) {
		if (spec["values"].length > 6) {
			// values slider
			slider.parentNode.style.display = "";
			display.style.display = "none";
			selects.style.display = "inline";
			while (selects.options.length)
				selects.options[selects.options.length - 1] = null;
			for (var x = 0; x < spec["values"].length; x++)
				selects.options[x] = new Option(spec["values"][x], x);
			selects.selectedIndex = spec["subset"];
			selects.onchange = select_changed;
			slider_data["from"] = 0;
			slider_data["to"] = spec["values"].length - 1;
			get_slider_dimensions();
			snap_slider(spec["subset"] * slider_data["scale"], true, false, true);
		} else {
			// radio buttons
			display.style.display = selects.style.display = slider.parentNode.style.display = "none";
			create_radios(spec);
			switch_subset(spec["subset"]);
		}
	} else {
		// clear all
		display.style.display = selects.style.display = slider.parentNode.style.display = "none";
		snap_slider(0, true, false, true);
	}
	if (dataset == "orbital") {
		move_helium(true);
		orbital_ids["OrbitalString"] = display.parentNode.appendChild(document.createElement("span"));
	} else if (dataset === "compound") {
//		compoundsearch = draw_compound_search();
	}
	if (from !== false) {
		fade([from, to], 1, 0.5, direction);
	} else {
		slide_in(display.parentNode.parentNode, direction);
	}
};

var create_slider = function(direction) {
	var newslider = display.parentNode.cloneNode(true), scrub = display.parentNode.getElementsByTagName("*");
	for (var x = 0; x < scrub.length; x++) if (scrub[x].id) scrub[x].id = "";
	newslider.style.top = newslider.style.bottom = newslider.style.left = newslider.style.right = "";
	newslider.style[direction] = (direction === "top" || direction === "bottom" ? display.parentNode.offsetHeight : display.parentNode.offsetWidth) + "px";
	display.parentNode.parentNode.appendChild(newslider);
	display = document.getElementById("SliderDisplay");
	slider = document.getElementById("SliderBar");
	selects = document.getElementById("SliderSelect");
	if (document.getElementById("AltSlider")) document.getElementById("AltSlider").parentNode.removeChild(document.getElementById("AltSlider"));
	if (display.parentNode.getElementsByTagName("span")[0]) display.parentNode.removeChild(display.parentNode.getElementsByTagName("span")[0]);
	if (document.getElementById("CompoundSearch")) document.getElementById("CompoundSearch").parentNode.removeChild(document.getElementById("CompoundSearch"));
};

var slide_in = function(obj, direction) {
	if (obj.getElementsByTagName("div").length / 3 > 2)
		remove_old_slider(obj);
	else
		setTimeout(function() { return remove_old_slider(obj, direction); }, 1000);
	var old_slider = obj.getElementsByTagName("div")[0],
		new_slider = obj.lastChild;
	old_slider.style[direction] = 0;
	var q = old_slider.offsetWidth;

	if (new_slider.style[direction])
		old_slider.style[direction] = "-" + new_slider.style[direction];
	new_slider.style[direction] = 0;
	slider_events();
};

var remove_old_slider = function(obj, direction) {
	while (obj.firstChild && obj.firstChild.nodeType !== 1) obj.removeChild(obj.firstChild);
	if (obj.firstChild) obj.removeChild(obj.firstChild);
	if (direction) obj.lastChild.style[direction] = "";
};

var get_slider_dimensions = function() {
	slider_data["xMax"] = document.getElementById("SliderSlit").offsetWidth;
	slider_data["scale"] = slider_data["xMax"] / (slider_data["to"] - slider_data["from"]);
};

var startSlide = function(e) {
	get_slider_dimensions();
	e = e ? (e.touches ? e.touches[0] : e) : event;
	if (search_active || hovered_state !== false) return;
	if (dataset === "series" || dataset === "chemical") dim_for_states();
	else if (allspecs[dataset]["units"][0] === " K") {
		if (!widecheck.checked) document.getElementById("Closeup").style.display = "none";
		matterstate.style.display = "";
		matterstate.show = "block";
	}
	slider_data["startOffsetX"] = slider.offsetLeft - e.screenX;
	document.onmouseup = slider.ontouchend = slider_release;
	if (document.addEventListener) {
		document.addEventListener("mouseover", blockade, true);
		document.addEventListener("mouseout", blockade, true);
		document.addEventListener("mouseenter", blockade, true);
		document.addEventListener("mouseleave", blockade, true);
		document.onmousemove = slider.ontouchmove = moveSlider;
	} else {
		slider.onmousemove = moveSlider;
		slider.setCapture(true);
	}
	slider.onmousedown = slider.ontouchstart = null;
	slider_active = setInterval(function () { update_slider(slider.position, false, false); }, 1000 / SLIDER_UPDATES);
	tempbox_running = setInterval(update_tempbox, 100);
};

var blockade = function(e) {
	e.stopPropagation();
};

var slider_skip = function(e) {
	get_slider_dimensions();
	e = e || event;
	if (search_active || hovered_state !== false) return;
	var offset = (e.offsetX - slider.offsetLeft || findPos(slider, [e.pageX, 0])[0]) < 0 ? -1 : 1;
	bump_slider(offset, (slider_data["xMax"] / 10) * offset);
};

var wheelscroll = function(e) {
	get_slider_dimensions();
	e = e || event;
	var skip = (e.detail) ? e.detail / Math.abs(e.detail) : e.wheelDelta / Math.abs(e.wheelDelta);
	if (skip) bump_slider(skip, skip * 3);
	if (e.preventDefault) e.preventDefault();
	return false;
};

var moveSlider = function(e) {
	e = e ? (e.touches ? e.touches[0] : e) : event;
	snap_slider(Math.max(0, Math.min(slider_data["startOffsetX"] + e.screenX, slider_data["xMax"])), false, false, false);
	return false;
};

var slider_keypress = function(e) {
	var code = e ? e.which : event.keyCode;
	if (code > 31 && (code < ZERO || code > NINE)) return false;
};

var slider_release = function(e) {
	e = e || event;
	var spec = allspecs[dataset];
	if (dataset !== "state" && wholetable.inverted) leave_state();
	save_default_cookie(spec);
	document.onmouseup = slider.ontouchend = null;
	if (document.removeEventListener) {
		document.removeEventListener("mouseover", blockade, true);
		document.removeEventListener("mouseout", blockade, true);
		document.removeEventListener("mouseenter", blockade, true);
		document.removeEventListener("mouseleave", blockade, true);
		document.onmousemove = slider.ontouchmove = null;
	} else {
		slider.onmousemove = null;
		document.releaseCapture();
	}
	slider.onmousedown = slider.ontouchstart = startSlide;
	clearInterval(slider_active);
	clearInterval(tempbox_running);
};

var slider_type = function(e) {
	var code = e ? e.which : event.keyCode;
	get_slider_dimensions();
	var spec = allspecs[dataset];
	if ((code === RIGHT || code === LEFT) && this.id !== "SliderBar") return false;
	save_default_cookie(spec);
	if (!("values" in spec)) snap_slider(Math.min(slider_data["xMax"], Math.max(0, (display.value * 1 - slider_data["from"]) * slider_data["scale"])), true, false, true);
};

var save_default_cookie = function(spec) {
	if ("default" in spec) {
		spec["default"] = display.value;
		set_cookie("default_" + dataset, spec["default"]);
	}
};

var snap_slider = function(x, force, flash_updated, update) {
	var spec = allspecs[dataset],
		pos = Math.round(x / slider_data["scale"] + slider_data["from"]);

	var pct;
	if ("values" in spec)
		pct = pos / slider_data["to"];
	else
		pct = x / slider_data["xMax"];
	slider.style.left = 0.92 * pct * 100 + "%";

	slider.position = pos;

	if (update) update_slider(pos, force, flash_updated);
};

var update_slider = function(pos, force, flash_updated) {
	var spec = allspecs[dataset];

	if ("values" in spec) {
		if (spec["subset"] != pos || force) {
			selects.selectedIndex = spec["subset"] = pos;
			if (dataset === "ionize") update_detail(active, "ionize");
			set_cookie("subset_" + dataset, spec["subset"]);
			if (dataset !== "isotope") document.getElementById("l_" + dataset).getElementsByTagName("span")[0].innerHTML = " " + spec["values"][pos] + " ";
			colorize_and_mass(true);
		}
	} else {
		display.value = pos;
		if (spec["units"][0] === " K") {
			temperature = pos;
			state_classes(0, flash_updated);
			if (force) update_tempbox();
		}
		if (force || (dataset !== "series" && dataset !== "chemical")) colorize_and_mass((force && dataset !== "isotope") || dataset === "state");
	}
};

var update_tempbox = function() {
	temperature = display.value * 1;
	tempK.innerHTML = temperature;
	tempC.innerHTML = Math.round(temperature - 273.15);
	tempF.innerHTML = Math.round(temperature * 9/5 - 459.67);
	tempState.innerHTML = temperature + " K";
	if (active) property_ids["state"].innerHTML = states[active];
};

var slider_arrow = function(e) {
	get_slider_dimensions();
	e = e || event;
	switch (e.keyCode) {
		case LEFT: case RIGHT:
			if (this.id === "SliderBar") bump_slider(e.keyCode - 38, e.keyCode - 38);
			break;
		case UP: case DOWN:
			bump_slider(39 - e.keyCode, 39 - e.keyCode);
			break;
		case END: case HOME:
			bump_slider(1000 * (e.keyCode - 35.5), 1000 * (e.keyCode - 35.5));
			break;
		case PGUP: case PGDN:
			var offset = (33.5 - e.keyCode) * 2;
			bump_slider(offset, (slider_data["xMax"] / 10) * offset);
			break;
	}
	if (e.keyCode >= 33 && e.keyCode <= 40) {
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		if (!((e.keyCode === RIGHT || e.keyCode === LEFT) && this.id === "SliderDisplay")) return false;
	}
};

var bump_slider = function(valuedist, pixeldist) {
	if ("values" in allspecs[dataset])
		snap_slider(Math.min(slider_data["xMax"], Math.max(0, slider.offsetLeft + slider_data["scale"] * valuedist)), false, false, true);
	else {
		if (isNaN(display.value)) display.value = 0;
		snap_slider(Math.min(slider_data["xMax"], Math.max(0, (display.value*1 - slider_data["from"]) * slider_data["scale"] + pixeldist*1)), true, dataset === "series", true);
	}
};

var create_radios = function(spec) {
	var form = document.createElement("form"), x, temp, label;
	form.id = "AltSlider";
	form.onkeydown = function (e) { e = e || event; e.cancelBubble = true; };
	for (x = 0; x < spec["values"].length; x++) {
		temp = document.createElement("span");
		temp.className = "Radio";
		temp.innerHTML += ' <input type="radio" name="SliderAlt" id="r_' + spec["values"][x] + '" value="' + x + '"/>';
		label = document.createElement("label");
		label.htmlFor = "r_" + spec["values"][x];
		label.innerHTML = spec["values"][x];
		temp.appendChild(label);
		form.appendChild(temp);
	}
	form.onclick = subset_changed;
	display.parentNode.appendChild(form);
	document.getElementById("r_" + spec["values"][spec["subset"]]).checked = true;
};

var fade_opacity = function(el, value) {
	if (el) {
		el.style.opacity = value;
		if (value == 1) { if ("filters" in el) el.style.removeAttribute("filter"); }
		else el.style.filter = "alpha(opacity=" + value * 100 + ")";
	}
};

var fade = function(els, value, dir, direction) {
	var el = els[dir == 2 ? 1 : 0];
	for (var x = 0; x < el.length; x++)
		if (isDisplayBlock(document.getElementById(el[x])))
			fade_opacity(document.getElementById(el[x]), value);
	if (value == 1 && dir == 2) {
		slide_in(display.parentNode.parentNode, direction);
		from = to = false;
		return;
	}
	if (value == 0.125) {
		dir = 1 / dir;
		prepare_fade(els);
	}
	setTimeout(function() { return fade(els, value * dir, dir, direction); }, FADE_ANIMATION);
};

var prepare_fade = function(els) {
	var x;
	for (x = 0; x < els[0].length; x++) {
		document.getElementById(els[0][x]).style.display = "none";
		fade_opacity(document.getElementById(els[0][x]), 1);
	}
	for (x = 0; x < els[1].length; x++) {
		document.getElementById(els[1][x]).style.display = "block";
		if (firstDetails && els[1][x] == "Properties") fix_properties();
		fade_opacity(document.getElementById(els[1][x]), 0);
	}
};

var slider_events = function() {
	if ("onmousewheel" in display)
		display.onmousewheel = document.getElementById("SliderTrack").onmousewheel = wheelscroll;
	else {
		document.getElementById("SliderTrack").addEventListener("DOMMouseScroll", wheelscroll, false);
		display.addEventListener("DOMMouseScroll", wheelscroll, false);
	}
	document.getElementById("SliderTrack").onclick = slider_skip;
	slider.onclick = function (e) { e = e || event; e.cancelBubble = true; };
	slider.onmousedown = slider.ontouchstart = startSlide;
	selects.onkeydown = function (e) { e = e || event; e.cancelBubble = true; };
	display.onkeyup = display.oninput = document.getElementById("SliderBar").onkeyup = slider_type;
	display.onkeydown = document.getElementById("SliderBar").onkeydown = slider_arrow;
	display.onkeypress = slider_keypress;
	display.onfocus = document.getElementById("SliderBar").onfocus = hover_state;
	display.onblur = document.getElementById("SliderBar").onblur = unhover_state;
};

var dim_for_states = function() {
	series_to_temp();
	addclass(wholetable, "InvertState");
	wholetable.inverted = true;
	state_classes(true, false);
	for (var i = 1, l = element_ids.length; i < l; i++)
		element_ids[i].firstChild.childNodes[n_big].childNodes[n_symbol].style.color = "";
};
var search_focus = function() {
	isotope_clean();
	search_active = true;
	addclass(document.getElementById("Navigation"), "Searching");
	wholetable.scrollIntoView();
	if (!("placeholder" in searchinput))
		if (searchinput.value === searchinput.def)
			searchinput.value = "";
	for (var a = 1, l = element_ids.length; a < l; a++)
		search_mass[a] = mass_to_array(a);
	search(searchinput.value);
};

var search_leave = function() {
	search_active = false;
	if (document.getElementById("Navigation"))
		removeclass(document.getElementById("Navigation"), "Searching");
	if (searchinput && !("placeholder" in searchinput))
		if (searchinput !== document.activeElement)
			searchinput.value = searchinput.def;
	for (var i = 1, l = element_ids.length; i < l; i++)
		search_highlight(i, true);
};

var search = function(searchstring) {
	var matches = [], exact
	searchstring = searchstring || "MichaelDayah";
	hide_closeup();

	var xor = false;
	if (searchstring.charAt(0) === "!") {
		searchstring = searchstring.substring(1);
		xor = true;
	}

	var num = isNaN(searchstring.substring(1)) ? searchstring.substring(1) : Number(searchstring.substring(1));
	switch (searchstring.charAt(0)) {
		case "~":
			var dist, closest = Number.MAX_VALUE;
			for (var a = 1; a < search_mass.length; a++)
				for (var i = 0; i < search_mass[a].length; i++) {
					dist = Math.abs(search_mass[a][i] - num);
					if (dist < closest)
						closest = dist;
				}
			for (var a = 1; a < search_mass.length; a++)
				for (var i = 0; i < search_mass[a].length; i++) {
					dist = Math.abs(search_mass[a][i] - num);
					if (dist <= closest) {
						matches.push(a);
						break;
					}
				}
			break;
		case "=":
			for (var a = 1; a < search_mass.length; a++)
				for (var i = 0; i < search_mass[a].length; i++)
					if (search_mass[a][i] == num) {
						matches.push(a);
						break;
					}
			break;
		case "<": // do <= too
			for (var a = 1; a < search_mass.length; a++)
				for (var i = 0; i < search_mass[a].length; i++)
					if (search_mass[a][i] < num) {
						matches.push(a);
						break;
					}
			break;
		case ">":
			for (var a = 1; a < search_mass.length; a++)
				for (var i = 0; i < search_mass[a].length; i++)
					if (search_mass[a][i] > num) {
						matches.push(a);
						break;
					}
			break;
		default:
			var range = searchstring.split(/-|\.\./);
			if (range.length === 2) {
				for (var a = 1; a < search_mass.length; a++)
					for (var i = 0; i < search_mass[a].length; i++)
						if (search_mass[a][i] >= Number(range[0] || Number.MIN_VALUE) && search_mass[a][i] <= Number(range[1] || Number.MAX_VALUE)) {
							matches.push(a);
							break;
						}
			} else {
				var atomics = searchstring.toLowerCase().split(",");
				for (var a = 1, l = element_ids.length; a < l; a++) {
					var nodes = element_ids[a].firstChild.childNodes[n_big].childNodes;
					if (atomics.indexOf(a) !== -1 ||
						atomics.indexOf(nodes[n_atomic].innerHTML) !== -1 || // for foreign number systems
						atomics.indexOf(nodes[n_symbol].innerHTML.toLowerCase()) !== -1) {
							matches.push(a);
							if (atomics.length === 1)
								exact = a;
					} else if (nodes[n_name].innerHTML.toLowerCase().indexOf(atomics[0]) !== -1)
						matches.push(a);
				}
			}
	}

	for (var a = 1, l = element_ids.length; a < l; a++)
		search_highlight(a, xor !== (matches.indexOf(a) !== -1));

	if (exact || matches.length === 1) { // this should work properly if NOT finds only one match
		on_mouse_over(exact || matches[0]);
		element_ids[exact || matches[0]].scrollIntoView();
	}
};

var mass_to_array = function(atomic) {
	var parts = element_ids[atomic].firstChild.childNodes[n_big].childNodes[n_mass].innerHTML.split(",");
	for (var x = 0; x < parts.length; x++) {
		var no_paren = parts[x].replace(/[()]+/g, "");
		if (no_paren == unknown || no_paren == "&nbsp;")
			parts[x] = false;
		else
			parts[x] = isNaN(no_paren) ? no_paren : Number(no_paren);
	}
	return parts;
};

var search_highlight = function(atomic, darken) {
	if (darken)
		removeclass(element_ids[atomic], "DimText");
	else
		addclass(element_ids[atomic], "DimText");
};
var startWikiDrag = function(e) {
	e = e || event;
	removeclass(wikibox, "Expanding");
	document.getElementById("WikiFrameBox").style.display = wikibox.getElementsByTagName("h2")[0].style.display = "none";
	set_opacity(wikibox, 0.80);
	save_wiki_location(e, wikibox);
	e.cancelBubble = true;
	document.onmousemove = moveWiki;
	document.onmouseup = releaseWiki;
	if (e.preventDefault) e.preventDefault();
};

var save_wiki_location = function(e, el) {
	el.startX = el.offsetLeft;
	el.startY = el.offsetTop;
	el.startWidth = el.offsetWidth;
	el.startHeight = el.offsetHeight;
	el.mouseStartX = e.clientX;
	el.mouseStartY = e.clientY;
	el.pageX = e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	el.pageY = e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
};

var moveWiki = function(e) {
	e = e || event;
	var gap = 10, dock_pct;
	if (wikibox.dockSize && wikibox.dockSize.indexOf("px") === -1)
		dock_pct = wikibox.dockSize;
	else
		dock_pct = "50%";

	if (wikibox.saveHeight) {
		undock();
		restoreSize(false);
	} else if (e.clientY <= gap) {
		snap_to(0, 0, 0, 0, "auto", "auto");
		return;
	} else if (e.clientX <= gap) {
		if (tearoff_window(e, false) !== true) snap_to(0, "auto", 0, 0, dock_pct, "auto");
		return;
	} else if (e.clientX >= document.documentElement.clientWidth - gap) {
		if (tearoff_window(e, false) !== true) snap_to(0, 0, 0, "auto", dock_pct, "auto");
		return;
	} else if (e.clientY >= document.documentElement.clientHeight - gap) {
		if (tearoff_window(e, false) !== true) snap_to("auto", 0, 0, 0, "auto", dock_pct);
		return;
	}
	wikibox.style.left = wikibox.startX + e.clientX - wikibox.mouseStartX + "px";
	wikibox.style.top = wikibox.startY + e.clientY - wikibox.mouseStartY + "px";
	return false;
};

var snap_to = function(top, right, bottom, left, width, height) {
	var border = 5;
	if (!wikibox.saveHeight) {
		wikibox.saveHeight = wikibox.offsetHeight;
		wikibox.saveWidth = wikibox.offsetWidth;
		wikibox.saveTop = wikibox.offsetTop;
		wikibox.saveLeft = wikibox.offsetLeft;
	}
	wikibox.style.top = top;
	wikibox.style.right = right;
	wikibox.style.bottom = bottom;
	wikibox.style.left = left;
	wikibox.style.width = width;
	wikibox.style.height = height;
	wikibox.style.borderRadius = wikititle.style.borderRadius = 0;

	if (String(top).charAt(0) === "0") {
		var newWidth = parseInt(width, 10) + border*2 / document.documentElement.clientWidth * 100;
		if (right === "auto") {
			document.documentElement.style.width = "100%";
			document.documentElement.style.marginLeft = newWidth + "%";
			document.body.scrollLeft = document.documentElement.scrollLeft = 0;
		} else if (left === "auto") {
			wikibox.bodyWidth = document.documentElement.scrollWidth / document.documentElement.offsetWidth * 100;
			document.documentElement.style.width = wikibox.bodyWidth + newWidth + "%";
			document.body.style.width = wikibox.bodyWidth / (wikibox.bodyWidth + newWidth) * 100 + "%";
			document.body.scrollLeft = document.documentElement.scrollLeft = document.documentElement.scrollWidth - document.documentElement.clientWidth;
		}
	} else {
		var newHeight = parseInt(height, 10) + border*2 / document.documentElement.clientHeight * 100;
		wikibox.pageHeight = document.body.offsetHeight / document.documentElement.clientHeight * 100;
		document.documentElement.style.height = wikibox.pageHeight + newHeight + "%";
		document.body.scrollTop = document.documentElement.scrollTop = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	}
	releaseWiki();
};

var determineResizeType = function(e) {
	if (wikibox.getElementsByTagName("h2")[0].style.display === "none") {
		e = e || event;
		var frac = 20;
		resizetype = "";
		if (wikibox.offsetTop + wikibox.offsetHeight / frac > e.clientY)
			resizetype += "N";
		else if (wikibox.offsetTop + wikibox.offsetHeight * (frac-1) / frac < e.clientY)
			resizetype += "S";

		if (wikibox.offsetLeft + wikibox.offsetWidth / frac > e.clientX)
			resizetype += "W";
		else if (wikibox.offsetLeft + wikibox.offsetWidth * (frac-1) / frac < e.clientX)
			resizetype += "E";

		if (resizetype !== "")
			wikibox.style.cursor = resizetype + "-resize";
	} else
		wikibox.style.cursor = "";
};

var startResize = function(e) {
	e = e || event;
	document.getElementById("WikiFrameBox").style.display = wikibox.getElementsByTagName("h2")[0].style.display = "none";
	set_opacity(wikibox, 0.80);
	save_wiki_location(e, wikibox);
	determineResizeType(e);
	wikibox.onmouseover = null;
	document.onmousemove = duringResize;
	document.onmouseup = releaseWiki;
	if (e.preventDefault) e.preventDefault();
};

var duringResize = function(e) {
	e = e || event;
	var minsize = {x: 300, y: 100}, gap = 10, border = 5,
		distX = wikibox.mouseStartX - e.clientX,
		distY = wikibox.mouseStartY - e.clientY;

	if (e.clientY <= gap || e.clientY >= document.documentElement.clientHeight - gap) {
		if (wikibox.offsetTop) wikibox.saveTop = wikibox.offsetTop;
		wikibox.style.height = "auto";
		wikibox.style.top = wikibox.style.bottom = 0;
		wikibox.style.borderRadius = wikititle.style.borderRadius = 0;
		return false;
	} else if (document.documentElement.style.height || document.documentElement.style.width) {
		var attach_if_closer = 50;
		if (resizetype.indexOf("N") !== -1 && document.documentElement.style.height) {
			wikibox.style.height = Math.max(minsize.y, wikibox.startHeight + distY - border*2) / document.documentElement.clientHeight * 100 + "%";
			document.documentElement.style.height = wikibox.pageHeight + wikibox.offsetHeight / document.documentElement.clientHeight * 100 + "%";
			if ((document.documentElement.scrollHeight - document.documentElement.clientHeight) - (window.pageYOffset || document.documentElement.scrollTop) < attach_if_closer)
				document.body.scrollTop = document.documentElement.scrollTop = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		} else if (resizetype.indexOf("E") !== -1 && wikibox.style.right === "auto") {
			wikibox.style.width = Math.max(minsize.x, wikibox.startWidth - distX - border*2) / document.documentElement.clientWidth * 100 + "%";
			document.documentElement.style.marginLeft = wikibox.offsetWidth / document.documentElement.clientWidth * 100 + "%";
		} else if (resizetype.indexOf("W") !== -1 && wikibox.style.left === "auto") {
			wikibox.style.width = Math.max(minsize.x, wikibox.startWidth + distX - border*2) / document.documentElement.clientWidth * 100 + "%";
			var newWidth = wikibox.offsetWidth / document.documentElement.clientWidth * 100;
			document.documentElement.style.width = wikibox.bodyWidth + newWidth + "%";
			document.body.style.width = wikibox.bodyWidth / (wikibox.bodyWidth + newWidth) * 100 + "%";
			if ((document.documentElement.scrollWidth - document.documentElement.clientWidth) - (window.pageXOffset || document.documentElement.scrollLeft) < attach_if_closer)
				document.body.scrollLeft = document.documentElement.scrollLeft = document.documentElement.scrollWidth - document.documentElement.clientWidth;
		}
		return false;
	} else if (wikibox.saveTop) {
		wikibox.style.borderRadius = wikititle.style.borderRadius = "";
		wikibox.style.top = wikibox.saveTop + "px";
		wikibox.saveTop = 0;
		wikibox.style.bottom = "";
	}

	if (resizetype.indexOf("N") !== -1) {
		wikibox.style.top = wikibox.startY - distY + "px";
		wikibox.style.height = Math.max(minsize.y, wikibox.startHeight + distY - border*2) + "px";
	} else if (resizetype.indexOf("S") !== -1) {
		wikibox.style.height = Math.max(minsize.y, wikibox.startHeight - distY - border*2) + "px";
	}

	if (resizetype.indexOf("W") !== -1) {
		wikibox.style.left = wikibox.startX - distX + "px";
		wikibox.style.width = Math.max(minsize.x, wikibox.startWidth + distX - border*2) + "px";
	} else if (resizetype.indexOf("E") !== -1) {
		wikibox.style.width = Math.max(minsize.x, wikibox.startWidth - distX - border*2) + "px";
	}
	return false;
};

var tearoff_window = function(e, navigate) {
	removeclass(wikibox, "Expanding");
	e = e || event;
	save_wiki_location(e, wikibox);
	var no_open = navigator.userAgent.indexOf("Chrome") !== -1 || (typeof Kera !== "undefined" && Kera.active());
	var xOffset = window.pageXOffset || document.documentElement.scrollLeft;
	var yOffset = window.pageYOffset || document.documentElement.scrollTop;
	if (!no_open && open_wiki_window([e.screenX - wikibox.pageX + wikibox.startX + xOffset, e.screenY - wikibox.pageY + wikibox.startY + yOffset], [wikibox.offsetWidth, wikibox.offsetHeight]) != null) {
		destroy();
		wikibox.style.left = wikibox.style.top = wikibox.style.height = wikibox.style.width = "";
		firstWiki = true;
		return true;
	} else if (navigate !== false)
		snap_to(0, 0, 0, 0, "auto", "auto");
};

var releaseWiki = function() {
	document.onmousemove = null;
	document.onmouseup = null;
	wikibox.onmouseover = determineResizeType;
	set_opacity(wikibox, 1);
	document.getElementById("WikiFrameBox").style.display = "";
};

var doubleClickTitle = function(e) {
	e = e || event;
	if (wikibox.saveHeight) {
		undock();
		restoreSize(true);
	} else
		snap_to(0, 0, 0, 0, "auto", "auto");
	if (e.stopPropagation) e.stopPropagation();
};

var open_wiki_window = function(pos, size) {
	releaseWiki();
	for (var x = 0; x < pos.length; x++) pos[x] = Math.max(0, pos[x]);
	externalWiki = window.open(wikibox.externalHref, "WikiWindow", "width="+size[0]+",height="+size[1]+",left="+pos[0]+",top="+pos[1]+",resizable=yes,scrollbars=yes,location=yes");
	return externalWiki;
};

var click_wiki = function(e) {
	if (block_wikipedia) {
		e.preventDefault();
		blockClick = true;
		return false;
	}

	e = e || (typeof event !== "undefined" ? event : null);
	if (e === null) return;
	var el = this || srcElement;

	if (screen.width * screen.height < 1024 * 600 ||
		typeof document.body.style.maxHeight === "undefined" ||
		!navigator.onLine || e.ctrlKey || e.shiftKey || e.metaKey ||
		(e.which && (e.which === 2 || e.which === 3)) ||
		(e.button && (e.button === 4 || e.button === 2)))
	return;

	var article;
	if (tab === "IsotopeTab" && el.parentNode.id === "isotopeholder")
		article = el.getElementsByTagName("em")[0].innerHTML;
	else if (hasclass(el.parentNode, "Element"))
		article = el.childNodes[n_big].childNodes[n_name].innerHTML;
	else
		article = decodeURIComponent(el.href.substring(el.href.lastIndexOf("\/") + 1));

//	window.location.hash = "#Writeup/" + series + "/" + article;

	document.getElementById("ElementName").innerHTML = article;
	document.getElementById("ElementName").href = el.href;
	document.getElementById("Source").innerHTML = document.getElementById(series).innerHTML;

	var url;
	if (tab === "IsotopeTab")
		url = "//" + language + ".wikipedia.org/w/index.php?title=" + encodeURIComponent(article) + "&printable=yes"; // inject an <a> into generated isotopes instead of this for isotopes
	else if (el.href.indexOf(".wikipedia.org") !== -1)
		url = "//" + language + ".wikipedia.org/w/index.php?title=" + el.href.substring(el.href.lastIndexOf("\/") + 1) + "&printable=yes";
	else
		url = el.href;

	ga("send", "event", language, series, article);

	if (externalWiki && !externalWiki.closed) {
		externalWiki.location.href = url;
		externalWiki.focus();
	} else {
		document.getElementById("WikiFrameBox").style.display = "none";
		window.frames["WikiFrame"].location.replace(url);
		wikibox.externalHref = url;

		if (firstWiki === true) {
			wikititle.onmousedown = startWikiDrag;
			wikibox.onmousedown = startResize;

			var elementPos = findPos(el, [0, 0]);
			var xOffset = window.pageXOffset || document.documentElement.scrollLeft;
			var yOffset = window.pageYOffset || document.documentElement.scrollTop;
			var sty = find_default_sheet();
			if (sty) {
				if (sty.cssRules && sty.cssRules[0].selectorText === "#WikiBox")
					sty.deleteRule(0);
				if (sty.insertRule)
					sty.insertRule("#WikiBox { left: " + (-elementPos[0] - xOffset) / document.documentElement.clientWidth * 100 + "%; top: " + (-elementPos[1] - yOffset) / document.documentElement.clientHeight * 100 + "%; width: " + el.offsetWidth / document.documentElement.clientWidth * 100 + "%; height: " + el.offsetHeight / document.documentElement.clientHeight * 100 + "%; }", 0);
			}
			addclass(wikibox, "Expanding");

			var q = wikibox.offsetWidth; // quantum mechanical nonsense
			addclass(wikibox, "Expanded");
			firstWiki = false;
		} else {
			if (!hasclass(wikibox, "Expanded") && (wikibox.style.height === "auto" || wikibox.style.width === "auto"))
				snap_to(wikibox.style.top, wikibox.style.right, wikibox.style.bottom, wikibox.style.left, wikibox.style.width, wikibox.style.height);
			addclass(wikibox, "Expanded");
		}
	}

	blockClick = true;
	return false;
};

var find_default_sheet = function() {
	if ("ownerNode" in document.styleSheets[0]) {
		for (var x = 0; x < document.styleSheets.length; x++) {
			if (document.styleSheets[x].ownerNode.id === "MainStyle")
				return document.styleSheets[x];
		}
		return false;
	} else
		return document.styleSheets[0];
};

var undock = function(restorepos) {
	document.documentElement.style.height = document.documentElement.style.width = document.documentElement.style.marginLeft = document.body.style.width = "";
	wikibox.dockSize = wikibox.style.width === "auto" ? wikibox.style.height : wikibox.style.width;
	wikibox.style.borderRadius = wikititle.style.borderRadius = "";
};

var restoreSize = function(andposition) {
	wikibox.style.height = wikibox.saveHeight + "px";
	if (wikibox.saveWidth) wikibox.style.width = wikibox.saveWidth + "px";
	if (andposition) {
		wikibox.style.left = wikibox.saveLeft + "px";
		wikibox.style.top = wikibox.saveTop + "px";
	}
	wikibox.saveHeight = wikibox.saveTop = 0;
};

var destroy = function() {
	window.frames["WikiFrame"].location.replace("about:blank");
	removeclass(wikibox, "Expanded");
	removeclass(wikibox, "Expanding");
	undock();
};

var iframe_loaded = function(e) {
	document.getElementById("WikiFrameBox").style.display = "";
	wikibox.getElementsByTagName("h2")[0].style.display = "none";
};
var highlight_homo_lumo = function(highest_energy_orbital) {
	var MAX_M = {"s": 1, "p": 3, "d": 5, "f": 7};
	var l = highest_energy_orbital.charAt(1);
	var m = get_electrons_in_orbital(highest_energy_orbital) - 1;
	if (m > MAX_M[l] - 1)
		m -= MAX_M[l];
	var n = highest_energy_orbital.charAt(0);
	hover_orbital(l, m, n);
};

var hover_orbital = function(l, m, n) {
	var IMAGE_SIZE = scheme === "night" ? 64 : 108;
	var SPDF_TO_NUMBER = {"s": 0, "p": 1, "d": 2, "f": 3};
	block_ids["Orbital"].style.backgroundImage = 'url("//www.ptable.com/Images/orbitals-' + l + (scheme === "night" ? "-night" : "") + '.png")';
	l = SPDF_TO_NUMBER[l];
	block_ids["Orbital"].style.backgroundPosition = "-" + IMAGE_SIZE * m + "px -" + IMAGE_SIZE * (n - l - 1) + "px";
	var row = orbital_ids["Hund"].tBodies[0].rows[0].cells[l].getElementsByTagName("table")[0].tBodies[0].rows;
	var cell = row[row.length - n + l].cells;
	if (lastOrbital) lastOrbital.className = "";
	lastOrbital = cell[m + 1];
	orbital_ids["lmn"].tBodies[0].rows[0].cells[2].innerHTML = l;
	orbital_ids["lmn"].tBodies[0].rows[1].cells[2].innerHTML = m - l;
	orbital_ids["lmn"].tBodies[0].rows[2].cells[2].innerHTML = n;
	lastOrbital.className = "HoverOrbital";
};

var dom_hover_orbital = function() {
	hover_orbital(this.l, this.m, this.n);
};

var get_electrons_in_orbital = function(str) {
	return str.match(/[spdf](\d+)$/)[1];
};

var tab_electron = function(atomic) {
	var elecstr = datavals.electronstring[atomic];
	while (elecstr.match(/\[.*\]/))
		elecstr = elecstr.replace(/\[(.*)\]/, findSymbol);
	orbital_ids["OrbitalString"].innerHTML = electronstring_to_html(elecstr);
	var atomic_orbitals = elecstr.split(" ");

	highlight_homo_lumo(atomic_orbitals[atomic_orbitals.length - 1]);

	draw_orbital_arrows(atomic_orbitals);

	show_oxidation(atomic);
};

var draw_orbital_arrows = function(all_orbitals) {
	var shells = [];
	var x;

	for (x = 0; x < all_orbitals.length; x++)
		shells[all_orbitals[x].substr(0, 2)] = get_electrons_in_orbital(all_orbitals[x]);

	for (x = 0; x < aufbau.length; x++) {
		for (var y = 0; y < aufbau[x].length; y++) {
			var len = aufbau[x][y].parentNode.cells.length - 1;
			for (var z = 1; z <= len * 2; z++) {
				var arrow_cell;
				if (z <= len)
					arrow_cell = aufbau[x][y].parentNode.cells[z].childNodes[0];
				else
					arrow_cell = aufbau[x][y].parentNode.cells[z - len].childNodes[1];
				var number_letter = aufbau[x][y].innerHTML.substr(0, 2);
				if (z <= shells[number_letter] || 0)
					arrow_cell.style.visibility = "visible";
				else
					arrow_cell.style.visibility = "hidden";
			}
		}
	}
};

var findSymbol = function(m, sym) {
	return datavals.electronstring[symbol.indexOf(sym)];
};

var move_helium = function(convert) {
	if (convert) {
		wholetable.tBodies[0].rows[0].insertBefore(element_ids[2], wholetable.tBodies[0].rows[0].cells[2]);
		wholetable.tBodies[0].rows[0].cells[3].style.display = "none";
		document.getElementById("SliderCell").colSpan++;
		document.getElementById("SliderCell").id = "OrbitalString";
		wholetable.className += " s p d f";
	} else {
		wholetable.tBodies[0].rows[0].cells[3].style.display = "";
		document.getElementById("OrbitalString").colSpan--;
		document.getElementById("OrbitalString").id = "SliderCell";
		wholetable.tBodies[0].rows[0].insertBefore(wholetable.tBodies[0].rows[0].cells[2], wholetable.tBodies[0].rows[0].cells[wholetable.tBodies[0].rows[0].cells.length - 1]);
		wholetable.className = wholetable.className.replace(" s p d f", "");
	}
//	insert_oxidation(convert);
};

var show_oxidation = function(atomic) {
	var oxistates = (datavals.oxidation[atomic] || "").split(",");
	var allstates = property_ids["electronstring"].getElementsByTagName("span");
	var y = 0;

	for (var x = 0; x < 13; x++) {
		if (x - 4 == parseInt(oxistates[y], 10)) {
			allstates[x].style.visibility = "visible";
			if (oxistates[y].slice(-1) === "c")
				allstates[x].className = "Common";
			else
				allstates[x].className = "";
			y++;
		} else {
			allstates[x].style.visibility = "hidden";
			allstates[x].className = "";
		}
	}
};

/*
var insert_oxidation = function(convert) {
	for (var i = 1, l = element_ids.length; i < l; i++) if (orbital[1][i]) {
		if (convert) {
			var oxi = document.createElement("sup");
			oxi.innerHTML = orbital[1][i];
			element_ids[i].firstChild.childNodes[n_big].childNodes[2].appendChild(oxi);
		} else {
			element_ids[i].firstChild.childNodes[n_big].childNodes[2].removeChild(element_ids[i].firstChild.childNodes[n_big].childNodes[2].getElementsByTagName("sup")[0]);
		}
	}
};
*/
var insert_rareearths = function(turnon, human) {
	var table = wholetable.tBodies[0].rows;
	iMove = 0;

	if (turnon) {
		wholetable.tHead.rows[0].insertCell(3);

		table[3].insertCell(3); //eventually deleted
		table[4].insertCell(3);
		table[0].insertCell(document.getElementById("KeyCell").cellIndex + 1);
		key_next = document.getElementById("KeyCell").nextSibling;
		while (key_next.nodeType != 1) key_next = key_next.nextSibling;
		key_next.rowSpan = 3;
		key_next.className = "KeyRegion";

		table[8].cells[1].getElementsByTagName("span")[0].style.display = "none";

		move_rare_inside(!human);
	} else {
		var oldcont = document.getElementById("KeyContainer").tBodies[0].rows[0].cells;
		if (direction !== "portrait") {
			move_keyblocks_to(oldcont);
			key_next.innerHTML = "";

			if (document.getElementById("Properties").style.display == "block" ||
				document.getElementById("Hund").style.display == "block" ||
				document.getElementById("DecayModes").style.display == "block" ||
				document.getElementById("CompoundResults").style.display == "block")
					document.getElementById("Series").style.display = "none";
			document.getElementById("Temperature").style.display = "";

			if (document.getElementById("Closeup").style.display === "block" ||
				document.getElementById("IsotopeForm").style.display === "block") {
					matterstate.style.display = "none";
					matterstate.show = "none";
				}
			document.getElementById("KeyContainer").className = "";
		}

		table[5].cells[3].style.display = table[6].cells[3].style.display = table[8].cells[1].style.display = "";
		for (var i = 10; i >= 7; i--) table[i].style.display = "";
		table[4].cells[3].innerHTML = "";

		move_rare_outside(!human);
	}
};

var move_rare_outside = function(instant) {
	var table = wholetable.tBodies[0].rows;
	table[9].insertBefore(table[5].cells[4], table[9].cells[iMove + 1]);
	table[10].appendChild(table[6].cells[4]);
	if (iMove === 5) {
		document.getElementById("KeyCell").rowSpan = 3;
		table[3].insertCell(3).colSpan = document.getElementById("KeyCell").colSpan;
	}
	if (iMove) table[8].cells[1].colSpan++;
	if (iMove++ < 14) {
		if (iMove - 1) {
			if (iMove < 6) document.getElementById("KeyCell").colSpan--;
			else {
				key_next.colSpan--;
				table[3].cells[3].colSpan--;
			}
			wholetable.tHead.rows[0].cells[3].colSpan--;
			table[4].cells[3].colSpan--;
		}
		if (instant === true) move_rare_outside(instant);
		else setTimeout(move_rare_outside, RARE_ANIMATION);
	} else {
		table[8].cells[1].getElementsByTagName("span")[0].style.display = "";
		wholetable.tHead.rows[0].deleteCell(3);
		table[3].deleteCell(3);
		table[4].deleteCell(3);
		table[0].deleteCell(key_next.cellIndex);
		if (tab === "IsotopeTab" && locked) load_isotope(active);
		resizewidth = 0;
//		window.onresize();
	}
};

var move_rare_inside = function(instant) {
	var table = wholetable.tBodies[0].rows;
	table[5].insertBefore(element_ids[71 - iMove], table[5].cells[4]);
	table[6].insertBefore(element_ids[103 - iMove], table[6].cells[4]);
	if (table[8].cells[1].colSpan > 1) table[8].cells[1].colSpan--;
	if (iMove) {
		table[3].cells[3].colSpan++;
		table[4].cells[3].colSpan++;
		wholetable.tHead.rows[0].cells[3].colSpan++;
		if (iMove > 9)	document.getElementById("KeyCell").colSpan++;
		else			key_next.colSpan++;
	}
	if (iMove++ < 14) {
		if (instant === true) move_rare_inside(instant);
		else setTimeout(move_rare_inside, RARE_ANIMATION);
	} else {
		table[3].deleteCell(3); document.getElementById("KeyCell").rowSpan = 4;

		var moved = key_next.appendChild(document.getElementById("KeyContainer").cloneNode(true));
		moved.id = "NewContainer";
		var newcont = moved.tBodies[0].rows[0].cells;
		newcont[0].innerHTML = "";
		newcont[1].innerHTML = "";

		if (direction !== "portrait") {
			move_keyblocks_to(newcont);

			if (dataset === "state" || dataset === "melt" || dataset === "boil")
					document.getElementById("Temperature").style.display = "block";
			else	document.getElementById("Series").style.display = "";
			matterstate.style.display = ""; matterstate.show = "block";
			document.getElementById("KeyContainer").className = "Upscale";
		}

		table[4].cells[3].innerHTML = table[7].cells[2].innerHTML;
		table[4].cells[3].style.textAlign = "center";
		table[4].cells[3].style.width = "1em";
		table[4].cells[3].style.padding = "0 1.5ex";
		table[4].cells[3].className = "Clean Paren";

		table[5].cells[3].style.display = table[6].cells[3].style.display = "none";
		document.getElementById("KeyCell").colSpan--;
		table[4].cells[3].colSpan--;
		wholetable.tHead.rows[0].cells[3].colSpan--;
		for (var i = 10; i >= 7; i--) table[i].style.display = "none";
		if (tab === "IsotopeTab" && locked) load_isotope(active);
		resizewidth = 0;
//		window.onresize();
	}
};

var move_keyblocks_to = function(container) {
	container[0].appendChild(document.getElementById("Closeup"));
	container[0].appendChild(document.getElementById("IsotopeForm"));
	container[1].appendChild(properties);
	if (tab === "PropertyTab") document.getElementById("t_" + dataset).checked = true;
	else if (tab === "IsotopeTab") document.getElementById("t_" + isoset).checked = true;
	container[1].appendChild(document.getElementById("Hund"));
	container[1].appendChild(document.getElementById("Block"));
	container[1].appendChild(document.getElementById("DecayModes"));
	container[1].appendChild(document.getElementById("CompoundResults"));
};
var orientation_change = function() {
	var new_orientation;
	if ("matchMedia" in window) {
		if (window.matchMedia("(orientation: portrait)").matches) {
			new_orientation = "portrait";
		} else if (window.matchMedia("(orientation: landscape)").matches) {
			new_orientation = "landscape";
		}
		if (direction !== new_orientation)
			change_orientation(new_orientation);
	}
};

var change_orientation = function(rot) {
	var waswide = before_orient_switch(rot);
	direction = rot;
	switch (direction) {
		case "portrait":
			document.getElementById("ExternalKey").className = wholetable.className + " KeyRegion Clean";
			document.getElementById("ExternalKey").appendChild(document.getElementById("KeyContainer"));
			document.getElementById("KeyCell").appendChild(document.getElementById("SliderHolder"));
			break;
		case "landscape":
			(document.getElementById("SliderCell") || document.getElementById("OrbitalString")).appendChild(document.getElementById("SliderHolder"));
			document.getElementById("KeyCell").appendChild(document.getElementById("KeyContainer"));
			break;
	}
	if (waswide) activate_wide();
};

var before_orient_switch = function(rot) {
	if (widecheck.checked) {
		widecheck.checked = false;
		widecheck.onclick();
		return true;
	} else return false;
};

var activate_wide = function() {
	widecheck.checked = true;
	widecheck.onclick();
};
var PAGESIZE = 100;

var assemble_compound_search = function(lastclicked) {
	if (compoundsearch) {
		change_input_value(compoundsearch, "");
		if (compoundsearch.onblur) compoundsearch.onblur();
	}
	if (lastclicked) init_throb(lastclicked);
	draw_mini_for_element(lastclicked);
	search_by_counting_minis(lastclicked);
};

var buffered_compound_search = function(e) {
	var searchstring = compoundsearch.value;
	if (lastSearchText !== searchstring) {
		lastSearchText = searchstring;
		clearTimeout(this.timer);
		this.timer = setTimeout(search_compounds_text, 250);
	}
};

var property_change_filter = function(e) {
	if (event && event.propertyName === "value")
		buffered_compound_search();
};

var json_compound_request = function(querystring, extra, callback) {
	conn = conn || (new JSON_request());
	conn.connect("JSON/compounds/"+struct_to_querystring(querystring), callback, compound_request_fail, extra);
};

var compound_request_fail = function(lastclicked) {
	if (typeof lastclicked === "number")
		finish_throb(lastclicked, throbber);
	search_results_opacity(100);
	compoundresults.innerHTML = "An error occurred receiving your search results. Please try again.";
	Bugsnag.notify("JSON request timed out", "Compounds");
};

var search_compounds_text = function() {
	var searchstring = compoundsearch.value;
	var querystring = {};
	if (searchstring)
		querystring.text = searchstring;
	search_results_opacity(30);
	json_compound_request(querystring, true, parse_compound_results);
	compoundresults.querystring = querystring;
};

var search_compounds_offset = function(querystring, offset) {
	querystring.offset = offset;
	json_compound_request(querystring, null, parse_offset_results);
};

var struct_to_querystring = function(assoc) {
	var pairs = [];
	for (var val in assoc)
		pairs.push(val+"="+ encodeURIComponent(assoc[val]));
	return pairs.join("_");
};

var formula_to_minis = function(minis) {
	var pairs = [], formula = [], atomic;
	for (var x = 0; x < minis.length; x++) {
		pairs = minis[x].split("-");
		atomic = Number(pairs[0]);
		formula.push(symbol[atomic] + pairs[1]);
		if (locked.indexOf(atomic) === -1)
			lock_element(atomic);
		draw_mini_for_element(atomic, Number(pairs[1]));
	}
	set_hash(["Compound", formula.join("+")], true); // replace bad text with clean formula
};

var parse_compound_results = function(json, lastclicked) {
	var resultset = parse_json(json.responseText);
	if (resultset) {
		datavals["compound"][allspecs["compound"]["subset"]] = resultset.counts;
		if (tab === "CompoundTab") {
			property_ids["electronstring"].innerHTML = comma(resultset.totalresults) + " match" + (resultset.totalresults === 1 ? "" : "es");
			compoundresults.totalresults = resultset.totalresults;
		}

		if (resultset.formula || (lastclicked === true && !compoundresults.querystring.text)) {
			// Got back a formula or empty text search
			if (compoundsearch !== document.activeElement)
				change_input_value(compoundsearch, "");
			clean_compounds_quickly();
			if (resultset.formula)
				formula_to_minis(resultset.formula);
			else
				set_hash(["Compound"]);
		} else if (compoundresults.querystring.text) {
			set_hash(["Compound", compoundresults.querystring.text]);
			if (compoundsearch !== document.activeElement)
				change_input_value(compoundsearch, compoundresults.querystring.text);
		}
		if (!resultset.formula && lastclicked === true)
			// Clicked an element or did a nonformula text search?
			clean_compounds_quickly();

		compoundresults.innerHTML = "";
		append_compound_results(compoundresults, resultset.matches, resultset.totalresults, resultset.formula);
		compoundresults.scrollTop = 0;
		colorize_and_mass(true);
		if (resultset.totalresults === 0)
			compoundresults.innerHTML = "Your criteria did not match any compounds.";
	} else {
		compoundresults.innerHTML = "An error occurred receiving your search results. Please try again.";
		Bugsnag.notify("JSON parsed but invalid", "Compounds", {responseText: json.responseText}, "error");
	}
	search_results_opacity(100);
	if (typeof lastclicked === "number")
		finish_throb(lastclicked, throbber);
};

var parse_offset_results = function(json, offset) {
	var resultset = parse_json(json.responseText);
	if (!resultset) return;

	append_compound_results(compoundresults, resultset.matches, resultset.totalresults, resultset.formula);
	compoundresults.pageLoading = false;
};

var append_compound_results = function(el, raw_results, totals, isformula) {
	var matching_formulas = raw_results;
	var frag = document.createDocumentFragment();
	for (var x = 0; x < matching_formulas.length; x++) {
		var result = matching_formulas[x];
		var result_div = document.createElement("div");

		var formula_span = document.createElement("span");
		formula_span.innerHTML = formula_to_html(result["molecularformula"]);
		result_div.appendChild(formula_span);

		var allnames = result["allnames"];
		var articles = result["articles"];
		var y;
		for (y = 0; y < allnames.length; y++) {
			if (y === 0 ||	// first result
				(articles[0] === "" && articles[y] !== "") || // no article for first result but an article for this one
				totals === 1 || // just one result
				(compoundresults.querystring.text && !isformula && allnames[y].toLowerCase().indexOf(compoundresults.querystring.text.toLowerCase()) !== -1) // text search matches this name
				) {
					var name_anchor = document.createElement("a");
					if (articles[y] !== "") {
						name_anchor.href = "//en.wikipedia.org/wiki/"+encodeURIComponent(articles[y]);
						name_anchor.onmouseup = click_wiki;
						name_anchor.onclick = block_clicks;
					}
					name_anchor.innerHTML = allnames[y];
					result_div.appendChild(name_anchor);
				}
		}

		result_div.onmouseover = highlight_formula_in_table;

		var atom_array = result["ordered"].split(",");
		for (y = 0; y < atom_array.length; y++)
			atom_array[y] = parseInt(atom_array[y], 10);
		result_div.ordered = atom_array;

		frag.appendChild(result_div);
	}
	el.appendChild(frag);
	compoundresults.moreMatches = compoundresults.getElementsByTagName("div").length < totals;
};

var formula_to_html = function(formula) {
	var tohtml = formula;
	tohtml = tohtml.replace(/([A-Z][a-z]?)(\d+)/g, "$1<sub>$2</sub>");
	tohtml = tohtml.replace(/\^(\d+)/g, "<sup>$1</sup>");
	tohtml = tohtml.replace(/(\]|\))(n|\d+)/g, "$1<sub>$2</sub>");
	tohtml = tohtml.replace(/x/g, "<i>x</i>");
	return tohtml;
};

var color_compounds = function(valueArray) {
	compound_matches = [];
//	var minmax = getminmax(valueArray, "log");
	for (var i = 1, l = element_ids.length; i < l; i++) {
		if (valueArray[i] !== undefined) {
//			element_ids[i].style.backgroundColor = calc_color(valueArray[i], schemebase, default_colors[i], -0.5 * minmax[1], minmax[1]);
			element_ids[i].style.backgroundColor = "";
			compound_matches.push(i);
		} else
			element_ids[i].style.backgroundColor = "#" + schemebase;
	}
};

var highlight_formula_in_table = function(e) {
	var el = this;
	if (lastCompound === el) return;
	var atom_array = el.ordered;
	if (lastCompound) removeclass(lastCompound, "Highlight");
	addclass(el, "Highlight");
	for (var i = 0; i < compound_matches.length; i++)
		search_highlight(compound_matches[i], atom_array.indexOf(compound_matches[i]) !== -1);
	lastCompound = el;
};

var dim_nonmatching_compounds = function(e) {
	for (var i = 1, l = element_ids.length; i < l; i++)
		search_highlight(i, false);
};

var compoundresults_leave = function(e) {
	if (lastCompound) removeclass(lastCompound, "Highlight");
	lastCompound = false;
	for (var i = 1, l = element_ids.length; i < l; i++)
		search_highlight(i, true);
};

var draw_mini_for_element = function(atomic, count) {
	var MAX_BOXES = 6;

	var cont = detail;
	var tables = cont.getElementsByTagName("table");

	if (locked.indexOf(atomic) !== -1) {
		// Click new
		if (tables.length >= MAX_BOXES) {
			if (!cont.Hidden) cont.Hidden = [];
			cont.Hidden.push(tables[0].rows[1].cells[0].atomic);
			cont.removeChild(tables[0]);
		}

		var tbl = document.createElement("table");

		var uparrow = tbl.insertRow(0).insertCell(0);
		uparrow.innerHTML = "▲";
		uparrow.className = "Arrow";
		uparrow.onclick = atoms_increase;

		var symcell = tbl.insertRow(1).insertCell(0);
		symcell.innerHTML = "<span>"+symbol[atomic]+"</span><sub>"+ (count || "") +"</sub>";
		symcell.atomic = atomic;
		symcell.style.backgroundColor = "#" + default_colors[atomic];
		symcell.className = "SymbolCell";

		var downarrow = tbl.insertRow(2).insertCell(0);
		downarrow.className = "Arrow";
		draw_downarrow_or_x(downarrow, count);
		downarrow.onclick = atoms_decrease;

		cont.appendChild(tbl);
	} else {
		// Unclick
		for (var x = tables.length - 1; x >= 0; x--) {
			if (tables[x].rows[1].cells[0].atomic === atomic)
				cont.removeChild(tables[x]);
		}

		if (cont.Hidden && cont.Hidden.length)
			draw_mini_for_element(cont.Hidden.pop());
	}
};

var atoms_increase = function() {
	atoms_change(this, 1);
};
var atoms_decrease = function() {
	atoms_change(this, -1);
};

var draw_downarrow_or_x = function(el, count) {
	if (count)
		el.innerHTML = "▼";
	else
		el.innerHTML = "×";
};

var atoms_change = function(el, diff) {
	var table = el.parentNode.parentNode.parentNode.rows;
	var atomic = table[1].cells[0].atomic;
	var subscript = table[1].cells[0].getElementsByTagName("sub")[0];
	var old_count = Number(subscript.innerHTML);
	var new_count = Math.max(0, old_count + diff) || "";
	subscript.innerHTML = new_count;

	draw_downarrow_or_x(table[2].cells[0], new_count);
	if (!old_count && diff === -1) {
		unlock_element(atomic);
		draw_mini_for_element(atomic);
	}

	search_by_counting_minis();
};

var search_by_counting_minis = function(lastclicked) {
	var cont = detail;

	var tables = cont.getElementsByTagName("table");
	var formula = [];
	for (var x = 0; x < tables.length; x++) {
		var symcell = tables[x].rows[1].cells[0];
		var atomic = symcell.atomic;
		var elsymbol = symcell.getElementsByTagName("span")[0].innerHTML;
		var count = symcell.getElementsByTagName("sub")[0].innerHTML;
		formula.push(symbol[atomic] + count);
	}
	var querystring = {};
	if (formula.length)
		querystring.formula = formula.sort().join("");

	search_results_opacity(30);
	json_compound_request(querystring, lastclicked, parse_compound_results);
	compoundresults.querystring = querystring;

	if (formula.length)
		set_hash(["Compound", formula.sort().join("+")]);
	else if (lastclicked)
		// Only push if an element was unclicked, not if you switch to Compounds tab
		set_hash(["Compound"]);
};

var compound_paginate = function() {
	var PIXELS_FROM_BOTTOM = 200;
	if (!compoundresults.pageLoading &&
		compoundresults.moreMatches === true &&
		compoundresults.scrollTop > compoundresults.scrollHeight - PIXELS_FROM_BOTTOM) {
			var querystring = compoundresults.querystring;
			search_compounds_offset(querystring, compoundresults.getElementsByTagName("div").length);
			compoundresults.pageLoading = true;
		}
};

var search_results_opacity = function(pct) {
	set_opacity(compoundresults, pct / 100);
	set_opacity(property_ids["electronstring"], pct / 100);
};

var draw_compound_search = function() {
	var cs = document.createElement("input");
	var default_text = "Name or Formula";
	cs.default_text = default_text;
	cs.id = "CompoundSearch";
	cs.setAttribute("type", "search");
	cs.setAttribute("incremental", "incremental");
	cs.onkeydown = no_bubble;

	if ("placeholder" in cs)
		cs.setAttribute("placeholder", default_text);
	else {
		cs.onfocus = function() {
			if (this.value === this.default_text) {
				change_input_value(this, "");
//				this.style.color = "";
			}
			if (document.documentMode === 9)
				document.onselectionchange = buffered_compound_search; // oninput misses deletions in IE9
		};
		cs.onblur = function() {
			if (document.documentMode === 9)
				document.onselectionchange = null;
			if (this.value === "") {
				change_input_value(this, this.default_text);
//				this.style.color = "#CCC";
			}
		};
		cs.onblur();
	}

	if ("onsearch" in cs) { // No IE supports this
		cs.onsearch = buffered_compound_search;
	} else if ("oninput" in cs) { // IE 9 and above
		cs.oninput = buffered_compound_search; // works in IE10
	} else if ("onpropertychange" in cs) { // IE 8 and below
		cs.onpropertychange = property_change_filter;
	}
	return display.parentNode.appendChild(cs);
};

var change_input_value = function(el, newtext) {
	if (el.onpropertychange) {
		var binding = el.onpropertychange;
		el.onpropertychange = null;
		el.value = newtext;
		el.onpropertychange = binding;
	} else
		el.value = newtext;
};

var clean_compounds_quickly = function() {
	var current;
	while (locked.length) {
		current = locked[0];
		unlock_element(current);
		draw_mini_for_element(current);
	}
};

var switch_between_closeup_and_arrows = function(atomic) {
	if (locked.length === 1 && locked.indexOf(atomic) !== -1) {
		// Unclicking last locked element
		detail.id = "CloseupElement";
		detail.innerHTML = "<br><br>";
		detail.style.minHeight = "";
		document.getElementById("CloseupHolder").style.verticalAlign = "";
	} else if (!locked.length) {
		// Clicking first element
		detail.id = "CountArrows";
		detail.innerHTML = "";
		detail.style.backgroundColor = "";
		detail.style.minHeight = "9.5em";
		document.getElementById("CloseupHolder").style.verticalAlign = "top";
	}
};

this.cache = function() {
	send_request(null, [], cache_compound_results); // generates 8556 non-offset formula files
};

var send_request = function(xmlplaceholder, atomic_array, callback) {
	console.log("Clicking: " + atomic_array.join(","));
	compoundresults.offset = 0;
	var query = {};
	if (atomic_array.length)
		query.formula = atomic_array_to_formula(atomic_array);
	json_compound_request(query, atomic_array, cache_compound_results);
};

var atomic_array_to_formula = function(atomics) {
	var formula = [];
	for (var x = 0; x < atomics.length; x++)
		formula.push(symbol[atomics[x]]);
	return formula.sort().join("");
};

var cache_compound_results = function(json, last_atomics) {
	if (window.end) return;

	var resultset = parse_json(json.responseText);
	if (count(resultset.counts))
		parse_compound_results(json, last_atomics);

	compoundresults.offset += PAGESIZE;
	if (compoundresults.offset < compoundresults.totalresults) {
		console.log("Clicking: " + last_atomics.join(",") + " offset " + compoundresults.offset);
		var query = {};
		if (last_atomics.length)
			query.formula = atomic_array_to_formula(last_atomics);
		query.offset = compoundresults.offset;
		json_compound_request(query, last_atomics, cache_compound_results);
		return;
	}

	var x = last_atomics.length;

	nondimmed[0] = new Array(element_ids.length - 1).join().split(",").map(function(item, index) { return ++index; });
	nondimmed[x] = compound_matches;

	// Try going deeper first
	var pos = nondimmed[x][nondimmed[x].indexOf(last_atomics[x-1]) + 1];
	if (pos)
		last_atomics[x] = pos;

	// Then try next in same level
	else if (pos = nondimmed[x-1][nondimmed[x-1].indexOf(last_atomics[x-1]) + 1])
		last_atomics[x-1] = pos;

	// Otherwise ascend upward
	else {
		var match;
		for (var up = 2; up <= x; up++) {
			pos = nondimmed[x-up][nondimmed[x-up].indexOf(last_atomics[x-up]) + 1];
			if (pos) {
				for (var pop = up; pop > 1; pop--) last_atomics.pop();
				last_atomics[x-up] = pos;
				match++;
				break;
			}
		}
		if (!match && x === 1) return;
	}
	send_request(null, last_atomics, cache_compound_results);
};
var check_hash_change = function(e) {
//	console.log(hash + " vs " + window.location.hash);
	if (hash !== window.location.hash) {
		hash = window.location.hash;
		hash_changed(window.location.hash);
	}
};

var set_hash = function(fields, replacehash) {
	var url = fields.join("/").replace(/\s/g, ""); // you can't get rid of spaces in urls for compounds!

	if (window.location.hash !== "#" + url) {
//		if (replacehash || sort_formula(window.location.hash) === sort_formula("#" + url))
			window.replaceHash("#" + url);
//		else {
//			window.location.hash = "#" + url;
//			hash = window.location.hash;
//		}
//		console.log("pushing state: " + url + "; replace="+replacehash);
	}
	if (fields[0] === "Property") document.getElementById("PropertyTab").href = "#" + url;
	fields.unshift(title);
	document.title = fields.join(" - ");
};

var sort_formula = function(url) {
	var formula = url.split("/").slice(-1)[0].split("+");
	return formula.sort().join("+");
};

var hash_changed = function(hash) {
//	console.log("change detected, programatically activating: " + window.location.hash);
	var i_tab = 0, i_dataset = 1, i_subset = 2;
	var hashArr = hash.substr(1).split("/");

	// Navigate to /#
	if (hashArr[i_tab] === "") {
		change_series({srcElement: document.getElementById("Wikipedia")});
		document.title = title;
	}

	else if (hashArr[i_dataset]) switch (hashArr[i_tab]) {
		case "Writeup":
			if (document.getElementById(hashArr[i_dataset])) {
				change_series({srcElement: document.getElementById(hashArr[i_dataset])});
				document.title = title + " - " + hashArr[i_dataset];
			}
			break;
		case "Property":
			for (var x in allspecs)
				if (allspecs[x]["tab"] && allspecs[x]["tab"].replace(/\s/g, "") === hashArr[i_dataset]) {
					document.getElementById("t_" + x).checked = true;
					if (tab === "PropertyTab")
						document.forms["visualize"].onclick();

					if (hashArr[i_subset]) {
						var vals = allspecs[x]["values"];
						for (var y = 0; y < vals.length; y++)
							if (vals[y].replace(/\s/g, "") === hashArr[i_subset]) {
								if (tab === "PropertyTab") {
									document.getElementById("r_" + vals[y]).checked = true;
									document.getElementById("AltSlider").onclick({target: document.getElementById("r_" + vals[y])});
								} else {
									allspecs[x]["subset"] = y;
								}
							}
					}
					break;
				}
			break;
		case "Orbital":
//			var atomic = Number(hashArr[i_dataset]);
//			if (atomic in element_ids)
//				element_ids[atomic].onclick();
			break;
		case "Isotope":
//			for (var x in allspecs)
//				if (allspecs[x]["tab"] && allspecs[x]["tab"].replace(/\s/g, "") === hashArr[i_dataset]) {
//					document.getElementById("t_" + x).checked = true;
//					if (locked) document.forms["isotopes"].onclick();
//					if (hashArr[i_subset] && document.getElementById("r_" + hashArr[i_subset])) {
//						document.getElementById("r_" + hashArr[i_subset]).checked = true;
//						document.getElementById("AltSlider").onclick();
//						if (hashArr[3] && element_ids[hashArr[3]])
//							element_ids[hashArr[3]].onclick();
//					}
//				}
			break;
		case "Compound":
			switch_tab_if_different(tab, hashArr[i_tab] + "Tab");
			var matching_formula = get_exact_formula(hashArr[i_dataset], "+");
			if (matching_formula) {
				clean_compounds_quickly();
				for (var x = 0; x < matching_formula.length; x++) {
					var atomic = matching_formula[x][0];
					var count = matching_formula[x][1];
					if (locked.indexOf(atomic) === -1)
						lock_element(atomic);
					draw_mini_for_element(atomic, count);
				}
				search_by_counting_minis();
			} else {
				change_input_value(compoundsearch, hashArr[i_dataset]);
				search_compounds_text();
			}
			break;
		}
	else
		document.title = title + " - " + hashArr[i_tab];

	// Switch to the tab if the above didn't automatically switch to it
	switch_tab_if_different(tab, hashArr[i_tab] + "Tab");

	if (tab === "CompoundTab" && !hashArr[i_dataset]) {
		// When navigating from #Compound/He to #Compound, search for blank
		clean_compounds_quickly();
		search_by_counting_minis();
	}
};

var get_exact_formula = function(formula, delimiter) {
	var atoms = formula.split(delimiter);
	var split_formula = /^([A-Z][a-z]{0,2})(\d*)$/;
	var matched_atoms = [];
	for (var x = 0; x < atoms.length; x++) {
		var mini = split_formula.exec(atoms[x]);
		if (!mini) return false;
		var sym = mini[1];
		var count = mini[2] ? Number(mini[2]) : null;

		var atnum = symbol.indexOf(sym);
		if (atnum !== -1)
			matched_atoms.push([atnum, count]);
		else
			return false;
	}
	return matched_atoms;
};

var switch_tab_if_different = function(oldtab, newtab) {
	if (oldtab !== newtab && document.getElementById(newtab))
		activeTab({srcElement: document.getElementById(newtab)});
};

var anchor_fire_hashchange = function() {
	var url = this.href.substr(this.href.indexOf("#"));
	hash_changed(url);
};

if ("replaceState" in history) {
	window.replaceHash = function(newhash) {
		history.replaceState("", "", newhash);
	}
} else {
	window.replaceHash = function(newhash) {
		history.back();
		window.location.hash = newhash;
	};
}
}; // End Ptable namespace

if (environment === "WinJS") {
	// Load handled by WinJS file
} else if (document.readyState === "complete") {
	Ptable.load_complete();
} else if (window.top !== window.self) {
	window.onload = Ptable.load_complete;
} else if (document.addEventListener) {
	document.addEventListener("DOMContentLoaded", Ptable.content_loaded, false);
	window.addEventListener("load", Ptable.load_complete, false);
} else if (document.attachEvent) {
	document.attachEvent("onreadystatechange", Ptable.content_loaded);
	window.attachEvent("onload", Ptable.load_complete);

	var topWindow = false;
	try {
		topWindow = window.frameElement == null && document.documentElement;
	} catch(e) {}

	if (topWindow && topWindow.doScroll) {
		(function doScrollCheck() {
			if (!onload_called) {
				try {
					topWindow.doScroll("left");
				} catch(e) {
					return setTimeout(doScrollCheck, 50);
				}

				Ptable.load_complete();
			}
		})();
	}
}
