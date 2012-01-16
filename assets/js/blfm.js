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
		               
		/*map.on('click', onMapClick);
		
		var popup = new L.Popup();
				
		function onMapClick(e) {
			var latlngStr = '(' + e.latlng.lng + ', ' + e.latlng.lat + ')';
			
			popup.setLatLng(e.latlng);
			popup.setContent("You clicked the map at " + latlngStr);
			map.openPopup(popup);
		}*/
	}
	
	function makeFeaturePolygon(feature) {
		var polygon = BL_Leaflet.to_polygon(feature.geometry.coordinates);
		polygon.setStyle({fillOpacity: 0});   
		//polygon.bindPopup(feature.name);
		polygon.on('click', function() {
			$('#overlay #title').html(feature.name);
		});
		return polygon;
	}
	
	return {
		init : function(map_div_id) {
	        init_map(map_div_id);
	    },
	    
		getBuilding : function(id,level) {
			BL.read_building(id, function(building) {
				map.setView(BL_Leaflet.to_latlng(building.nominal_location), 23);
				//var polygon = BL_Leaflet.to_polygon(building.footprint_polygon);
				//polygon.setStyle({fillOpacity: 0, stroke: false});
				//polygon.bindPopup(building.name);
				//map.addLayer(polygon);
				
	            BL.read_feature_layer(id, level, 6, function(feature_layer) {        
	            	//for(var index in feature_layer.features) {
	            	for(var index=feature_layer.features.length-1; index >= 0; index--) {
	            		var feature = feature_layer.features[index];
	            		//if(feature.id != 15) {
			            	var polygon = makeFeaturePolygon(feature);
							map.addLayer(polygon);
						//}			
					}
				});			
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
	    }
    };
}());