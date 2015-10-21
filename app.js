var sizes = [4900, 12100, 12800, 6800, 143000, 125000, 51100, 49500, 2300];
var dist = [57.9, 108.2, 149.6, 227.9, 778.3, 1427.0, 2871.0, 4497.1, 5913];
var names = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
var imageUrls = [
    "http://www.veryicon.com/icon/ico/System/Qs%20Vista%20Ready%20Icons/QsMercury.ico",
    "http://www.solstation.com/stars/venus.gif",
    "http://a5.mzstatic.com/us/r30/Purple/v4/69/e4/89/69e48941-a9d8-2ffc-6e9a-d66593434765/icon128-2x.png",
    "http://quest.nasa.gov/mars/background/images/mars.gif",
    "https://s.graphiq.com/sites/default/files/600/media/images/Jupiter_4394243.png",
    "http://www.planetsaturn.com/assets/images/planet-saturn.png",
    "http://moonlinks.net/wp-content/uploads/2012/04/uranus.png",
    "http://icons.iconarchive.com/icons/zairaam/bumpy-planets/256/10-neptune-icon.png",
    "http://www.cvadrat.com/imagebank/pngs/planetary/gallery3/Virtual%20Planets%20Pluto%20Planet%2003.png"
];

var planets = names.map(function (planet, index) {
    return {
        size: sizes[index],
        distance: dist[index],
        name: planet,
        imageUrl: imageUrls[index]
    }
});

var margin = {top: 10, right: 30, bottom: 100, left: 40};

var width = 6000 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var sizeMap = d3.scale.linear()
    .domain([0, d3.max(sizes)])
    .range([0, d3.max(sizes)/1250]);

var distMap = d3.scale.linear()
    .domain([0, d3.max(dist)])
    .range([0, d3.max(dist)]);

var planetScale = d3.scale.ordinal()
    .domain(names)
    .range(dist.map(function (dist) {
        return distMap(dist);
    }));

var yScale = d3.scale.linear()
    .range([height, 0]);


var xAxis = d3.svg.axis()
    .scale(planetScale)
    .orient("bottom");

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function update(data) {

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .style("stroke", "black")
        .style("fill", "none")
        .call(xAxis)
        .selectAll("text")
        .style("fill", "black")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

    chart.selectAll(".circ")
        .data(data)
        .enter().append("circle")
        .attr("class", "circ")
        .attr("cy", height / 2)
        .attr("cx", function(d, i) { return distMap(d.distance); })
        .attr("r", function(d) { return sizeMap(d.size); })
        .attr("fill", function (d) { return "url(#" + d.name + ")"; });

    d3.select(".defs").selectAll("pattern")
        .data(data)
        .enter().append("pattern")
        .attr("id", function (d) { return d.name; })
        .attr("patternUnits", "objectBoundingBox")
        .attr("width", "1")
        .attr("height", "1")
        .append("image")
        //.attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        //.attr("xlink:href", function (d) { return d.imageUrl })
        .attr("x", "0")
        .attr("y", "0")
        .attr("width", function (d) { return sizeMap(d.size)*2; })
        .attr("height", function (d) { return sizeMap(d.size)*2; })
        .each(function (planet) {
            this.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            this.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", planet.imageUrl);
        });

}

update(planets);

