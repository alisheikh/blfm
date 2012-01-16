$(document).ready(function() {
    return;
});

var BLFM = (function () {
    var map;
    function init_map(map_div_id) {
		map = new L.Map(map_div_id);
		
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
		map.setView(18);
		               
		map.on('click', onMapClick);
		
		var popup = new L.Popup();
				
		function onMapClick(e) {
			var latlngStr = '(' + e.latlng.lng + ', ' + e.latlng.lat + ')';
			
			popup.setLatLng(e.latlng);
			popup.setContent("You clicked the map at " + latlngStr);
			map.openPopup(popup);
		}
	}
	
	return {
		init : function(map_div_id) {
	        init_map(map_div_id);
	    },
	    
		getBuilding : function(id,level) {
			BL.read_building(id, function(building) {
				map.setView(BL_Leaflet.to_latlng(building.nominal_location), 18);
				var polygon = BL_Leaflet.to_polygon(building.footprint_polygon);
				polygon.setStyle({fillOpacity: 0, stroke: false});
				polygon.bindPopup(building.name);
				map.addLayer(polygon);			
			});  
			
			BL.read_floor(id, level, function(floor) {
                var rfp_tile_url = 
                    floor.raster_floorplans[0].tile_url_format;
                var tiles = new L.TileLayer(
                    rfp_tile_url, 
                    {maxZoom: 23, scheme: 'tms'}
                );
                map.addLayer(tiles);
            });
            
            BL.read_feature_layer(id, level, 6, function(feature_layer) {
            	var polygon = BL_Leaflet.to_polygon(feature_layer.features[0].geometry.coordinates);
				polygon.setStyle({fillOpacity: 0, stroke: false});
				polygon.bindPopup(feature_layer.features[0].name);
				map.addLayer(polygon);			
			});
	    }
    };
}());