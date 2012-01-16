// When the page is ready, do any needed setup for the page.
$(document).ready(function() {
    // Eh, don't do anything yet.
    return;
});

/*****************************************************************************
 * BuildingLayer namespace.
 */
var BL = (function () {
    // The base url of the server.
    var BASE_URL = 'http://107.21.236.253';

    // default parameter if it's undefined.
    function default_param(passed_value, default_value) {
        if (pased_value !== undefined) {
            return passed_value;
        } else {
            return default_value;
        }
    }

    // building endpoint url
    function building_endpoint(building_id) {
        b = default_param(building_id, '');
        return '/building/' + b;
    }

    // floor endpoint url
    function floor_endpoint(building_id, level) {
        b = building_id;
        l = default_param(level, '');
        return '/building/' + b + '/level/' + l;
    }

    // rasterplan endpoint url
    function rfp_endpoint(buildling_id, level, rfp_id) {
        b = buildling_id;
        l = level;
        r = default_param(rfp_id, '');
        return '/building/' + b + '/floor/' + l + '/rasterplan/' + r;
    }

    // vectorplan endpoint url
    function vfp_endpoint(building_id, level) {
        b = building_id;
        l = level;
        return '/building/' + b + '/floor/' + l + '/vectorplan';
    }

    // geometry endpoint url
    function geometry_endpoint(building_id, level, geometry_id) {
        b = building_id;
        l = level;
        g = default_param(geometry_id, '');
        return '/building/' + b + '/floor/' + l + '/vectorplan/geom/' + g;
    }

    // feature layer endpoint url
    function feature_layer_endpoint(building_id, level, feature_layer_id) {
        b = building_id;
        l = level;
        f = default_param(feature_layer_id, '');
        return '/building/' + b + '/floor/' + l + '/feature-layer/' + f;
    }

    // feature endpoint url
    function feature_endpoint(
        building_id, level, feature_layer_id, feature_id
    ) {
        b = building_id;
        l = level;
        f = feature_layer_id;
        e = default_param(feature_id, '');
        return 
            '/building/' + b + '/floor/' + l + '/feature-layer/' + f + 
            '/feature/' + e;
    }

    // tag endpoint url
    function tag_endpoint(tag_id) {
        t = default_param(tag_id, '');
        return '/tag/' + t;
    }

    // attribute endpoint url
    function attribute_endpoint(tag_id, attribute_id) {
        t = tag_id;
        a = default_param(attribute_id, '');
        return '/tag/' + t + '/attribute/' + a;
    }

    // upload endpoint url
    function upload_endpoint() {
        return '/upload';
    }

    // make an api call
    function call_api(method, endpoint, callback) {
        $.ajax({
            url: BASE_URL + endpoint,
            type: method,
            dataType: 'json',
            success: callback
        });
        return;
    }

    // Public stuff.
    return {
        // buildings
        create_building: function(name, address, footprint) {},
        read_building: function(b, callback) {
            call_api('GET', building_endpoint(b), callback);
            return;
        },
        list_buildings: function() {},
        update_building: function(b, name, address, footprint) {},
        delete_building: function(b) {},

        // floors
        create_floor: function(b, level, name) {},
        read_floor: function(b, l, callback) {
            call_api('GET', floor_endpoint(b,l), callback);
            return;
        },
        list_floors: function(b) {},
        update_floor: function(b, l, level, name) {},
        delete_floor: function(b, l) {},

        // rasterplans
        create_rasterplan: function(b, l, r, upload_token, gcps) {},
        read_rasterplan: function(b, l, r, callback) {
            call_api('GET', rfp_endpoint(b,l,r), callback);
            return;
        },
        list_rasterplans: function(b, l) {},
        update_rasterplan: function(b, l, r, upload_token, gcps) {},
        delete_rasterplan: function(b, l, r) {},

        // vectorplans
        create_vectorplan: function(b, l) {},
        read_vectorplan: function(b, l, callback) {
            call_api('GET', vfp_endpoint(b, l), callback);
            return;
        },
        update_vectorplan: function(b, l) {},
        delete_vectorplan: function(b, l) {},

        // vectorplan geometry
        create_geometry: function(b, l, polygon) {},
        read_geometry: function(b, l, g, callback) {
            call_api('GET', geometry_endpoint(b, l, g), callback);
            return;
        },
        update_geometry: function(b, l, g, polygon) {},
        delete_geometry: function(b, l, g) {},

        // feature-layer
        create_feature_layer: function(b, l, sort_value, name) {},
        read_feature_layer: function(b, l, f, callback) {
            call_api('GET', feature_layer_endpoint(b, l, f), callback);
            return;
        },
        update_feature_layer: function(b, l , f, sort_value, name) {},
        delete_feature_layer: function(b, l, f) {},

        // features
        create_feature: function(b, l, f, name, geometry) {},
        read_feature: function(b, l, f, e, callback) {
            call_api('GET', feature_endpoint(b,l,f,e), callback);
            return;
        },
        update_feature: function(b, l, f, e, name, geometry) {},
        delete_feature: function(b, l, f, e) {},

        // tags
        create_tag: function(tag, object_type, object_id) {},
        read_tag: function(t, callback) {
            call_api('GET', tag_endpoint(t), callback);
            return;
        },
        update_tag: function(t, tag, object_type, object_id) {},
        delete_tag: function(t) {},

        // attributes
        create_attribute: function(t, name, value) {},
        read_attribute: function(t, a, callback) {
            call_api('GET', attribute_endpoint(t,a), callback);
            return;
        },
        update_attribute: function(t, a, name, value) {},
        delete_attribute: function(t, a) {},

        // upload
        upload_file: function() {},

        /**
         * Initialize the map.
         */
        init: function(map_div_id, building_id, level) {
            // init map
            map = init_map(map_div_id);

            // get the building object
            building_endpoint = generate_building_endpoint(building_id);
            $.get(
                building_endpoint, 
                function(data) {
                    building = data;
                    var building_latlng = 
                        api_latlng(building.nominal_location);
                    var footprint_poly = 
                        api_polygon(building.footprint_polygon);

                    map.setView(building_latlng, 18);
                    map.addLayer(footprint_poly);
                    return;
                },
                'json'
            );

            // get the floor object
            floor_endpoint = generate_floor_endpoint(building_id, level);
            $.get(
                floor_endpoint,
                function(data) {
                    floor = data;
                    var rfp_tile_url = 
                        floor.raster_floorplans[0].tile_url_format;
                    var tiles = new L.TileLayer(
                        rfp_tile_url, 
                        {maxZoom: 19, scheme: 'tms'}
                    );
                    map.addLayer(tiles);

                    return;
                },
                'json'
            );

            
            return;
        }
    };
}());

/******************************************************************************
 * BuildingLayer helper functions for using LeafletJS.
 */
var BL_Leaflet = (function () {
    return {
        /**
         * Returns a leaflet LatLng object representing the location given by
         * the BuildingLayer api.  This is mostly to dry out the act of making
         * a LatLng from our api locations to prevent swapped coords.
         */
        to_latlng: function(api_location) {
            return new L.LatLng(
                api_location[1],
                api_location[0]
            );
        },

        /**
         * Returns a leaflet polygon object represending the polygon given by
         * the BuildingLayer api. (Just does the outer linear ring, ignores 
         * holes.)
         */
        to_polygon: function(api_poly) {
            var perimeter = api_poly[0];
            var latlngs = [];
            for (var i=0; i<perimeter.length-1; i++) {
                latlngs.push(api_latlng(perimeter[i]));
            }

            return new L.Polygon(latlngs);
        }
    }
}());

