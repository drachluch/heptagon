
// utilisé par dessin. svgDoc prend une valeur après l'appel de initSVG.
var rayon = 50, origine = {x: 300, y: 328}, xmlns = "http://www.w3.org/2000/svg";

/*
<svg width="600" height="656" id="mainSVG">
	<title>Heptagon</title>
	<defs></defs>
	<g id="heptagon"></g>
</svg>
*/

function generateHeptagon() {
	var perm = [0,1,2,3,4,5,6];
	for(var i = 6; i > 0; i--){
		 var j = Math.floor(Math.random() * i);
		 var temp = perm[i];
		 perm[i] = perm[j];
		 perm[j] = temp;
	}
	return perm;
}

var svgDoc = document.createElementNS(xmlns, "svg");
svgDoc.setAttributeNS (null, "width", 600);
svgDoc.setAttributeNS (null, "height", 656);
svgDoc.setAttributeNS (null, "id", "mainSVG");
svgDoc.style.display = "block";

var title = document.createElementNS(xmlns, "title");
title.appendChild(document.createTextNode("Heptagon"));
svgDoc.appendChild(title);

var defs = document.createElementNS(xmlns, "defs");
svgDoc.appendChild(defs);

var hept = document.createElementNS(xmlns, "g");
hept.setAttributeNS (null, "id", "heptagon");

var pts = "";
for (var k = 0; k < 7; k++)
	pts += (Math.cos(2*k*Math.PI/7)*rayon) + "," + (Math.sin(2*k*Math.PI/7)*rayon) + " ";

var gr = document.createElementNS(xmlns, "g");
gr.setAttributeNS (null, "transform", "translate("+(origine.x)+", "+(origine.y)+")");

var c = document.createElementNS(xmlns, "polygon");
c.setAttributeNS (null, "id", "7gon");
c.setAttributeNS (null, "class", "");
c.setAttributeNS (null, "points", pts);
gr.appendChild(c);

hept.appendChild(gr);
svgDoc.appendChild(hept);

document.getElementById("dessins").appendChild(svgDoc);

function setHeptagon(h) {
	var pts = "";
	for (var k = 0; k < 7; k++)
		pts += (Math.cos(2*h[k]*Math.PI/7)*rayon) + "," + (Math.sin(2*h[k]*Math.PI/7)*rayon) + " ";

	var c = svgDoc.getElementById("7gon");
	c.setAttributeNS (null, "points", pts);
}

setHeptagon(generateHeptagon());

function addEvent(element, event, func) {
    if (element.addEventListener) {
        element.addEventListener(event, func, false);
    } else {
        element.attachEvent("on" + event, func);
    }
}

addEvent(document, "keydown", function(e) {
	if (e.which == 32)
		setHeptagon(generateHeptagon());
});

