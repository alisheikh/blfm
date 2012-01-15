$(document).ready(function() {
    return;
});

var BL = (function () {
    var map;
    function init_map(map_div_id) {
		var map = new L.Map(map_div_id);
		
		var tileUrl =
			'http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg';
		var tileAttrib = 
		    '© OpenStreetMap contributors, CC-BY-SA, ' +
		    'Tiles Courtesy of MapQuest';
		var tiles = new L.TileLayer(
		    tileUrl, 
		    {
		        maxZoom: 23, 
		        attribution: tileAttrib,
		    }
		);
		map.addLayer(tiles);
		                
		map.on('locationfound', onLocationFound);
		map.on('locationerror', onLocationError);
		
		map.locateAndSetView(16);
		
		function onLocationFound(e) {
			var radius = e.accuracy / 2;

			var marker = new L.Marker(e.latlng);
			map.addLayer(marker);
			marker.bindPopup("You are within " + radius + " meters from this point").openPopup();
			
			var circle = new L.Circle(e.latlng, radius);
			map.addLayer(circle);
		}
		
		function onLocationError(e) {
			alert(e.message);
		}
		
		//map.setView(new L.LatLng(0,0), 13).addLayer(tiles);
		/*
		var markerLocation = new L.LatLng(51.5, -0.09),
			marker = new L.Marker(markerLocation);
		
		map.addLayer(marker);
		marker.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
		
		
		var circleLocation = new L.LatLng(51.508, -0.11),
			circleOptions = {color: '#f03', opacity: 0.7},
			circle = new L.Circle(circleLocation, 500, circleOptions);
		
		circle.bindPopup("I am a circle.");
		map.addLayer(circle);
		
		
		var p1 = new L.LatLng(51.509, -0.08),
			p2 = new L.LatLng(51.503, -0.06),
			p3 = new L.LatLng(51.51, -0.047),
			polygonPoints = [p1, p2, p3],
			polygon = new L.Polygon(polygonPoints);
		
		polygon.bindPopup("I am a polygon.");
		map.addLayer(polygon);
		*/
		
		
		map.on('click', onMapClick);
		
		var popup = new L.Popup();
				
		function onMapClick(e) {
			var latlngStr = '(' + e.latlng.lat + ', ' + e.latlng.lng + ')';
			
			popup.setLatLng(e.latlng);
			popup.setContent("You clicked the map at " + latlngStr);
			map.openPopup(popup);
		}
		
	}
	
	return {
		init : function(map_div_id) {
	        map = init_map(map_div_id);
	        return;
	    }
    };
}());