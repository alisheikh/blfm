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
		map.setView(16);
		               
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
	        init_map(map_div_id);
	        return map;
	    },
	    
		getBuilding : function(id,level) {   
			BL.read_building(91,function(response) {
				var center = response.nominal_location;
				map.setView(new L.LatLng(center[0],center[1]),21);
				
				var polygonArray = [];
				for(var aIndex in response.footprint_polygon) {
					var polygonPoints = [];
					for(var index in response.footprint_polygon[aIndex]) {
						if(index != response.footprint_polygon[aIndex].length) {
							var vertex = response.footprint_polygon[aIndex][index];
							polygonPoints.push(new L.LatLng(vertex[0], vertex[1]));
						}
					}
					polygonArray.push(polygonPoints);
				}
				var polygon = new L.Polygon(polygonPoints,{fillOpacity: 0});
			    /*polygon.on('click',function() {
					polygon.setStyle({stroke:true});
				});*/
				//polygon.bindPopup(response.name);
				map.addLayer(polygon);			
			});  
			/*
			$.get('http://107.21.236.253/building/'+id, function(response){
				var center = response.nominal_location;
				map.setView(new L.LatLng(center[0],center[1]),21);
				
				var polygonArray = [];
				for(var aIndex in response.footprint_polygon) {
					var polygonPoints = [];
					for(var index in response.footprint_polygon[aIndex]) {
						if(index != response.footprint_polygon[aIndex].length) {
							var vertex = response.footprint_polygon[aIndex][index];
							polygonPoints.push(new L.LatLng(vertex[0], vertex[1]));
						}
					}
					polygonArray.push(polygonPoints);
				}
				var polygon = new L.Polygon(polygonPoints,{fillOpacity: 0});
				map.addLayer(polygon);
			},'json');*/
			
			$.get('http://107.21.236.253/building/'+id+'/floor/'+level, function(floor) {
                var rfp_tile_url = 
                    floor.raster_floorplans[0].tile_url_format;
                var tiles = new L.TileLayer(
                    rfp_tile_url, 
                    {maxZoom: 23, scheme: 'tms'}
                );
                map.addLayer(tiles);
            },'json');
	    }
    };
}());