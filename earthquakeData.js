
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";

d3.json(queryUrl).then(function (data) {
 createDataInfo(data.features);
});
var test;

function createDataInfo(magnitudeData) {
  var earthquakesData = L.geoJSON(magnitudeData, {
  });
  test = (magnitudeData);
  console.log(earthquakesData);
  createDataMap(earthquakesData);
}

function createDataMap(earthquakes) {
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  var standardMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  var overallMaps = {  
  };

 var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  for (let i =0; i<test.length; i++){
    let circ = test[i].geometry.coordinates;
    let mag = test[i].properties.mag;
    let one = circ[0];
    let two = circ[1];
    var hexcol;
    if (circ[2] <= 100){
        hexol = '#ffffcc';
    }
    else if (circ[2] <= 200){
        hexcol = '#d9f0a3';
    }
    else if (circ[2] <= 300){
        hexcol = '#addd8e';
    }
    else if (circ[2] <= 400){
        hexcol = '#78c679';
    }
    else if (circ[2] <= 500){
        hexcol = '#41ab5d';
    }
    else if (circ[2] <= 600){
        hexcol = '#238443';
    }
    else if (circ[2] <= 700){
        hexcol = '#005a32';
    }
    var circl = new L.Circle([two, one], {
        fillOpacity:0.75,
        fillColor: hexcol,
        color: hexcol,
        radius: mag*20000
    }).bindPopup(`<h3>${test[i].properties.place}</h3><hr> <h4><p>Magnitude ${mag}</p></h4> <p>${new Date(test[i].properties.time)}</p>`).addTo(myMap);
  }
  
  myMap.removeLayer(earthquakes);
  L.control.layers(standardMaps, overallMaps, {
    collapsed: false
  }).addTo(myMap);
}