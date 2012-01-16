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
        if (passed_value !== undefined) {
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
        return '/building/' + b + '/floor/' + l;
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
    function call_api(method, endpoint, callback, request_data) {
        $.ajax({
            url: BASE_URL + endpoint,
            type: method,
            data: request_data,
            dataType: 'json',
            success: callback
        });
        return;
    }

    // Public stuff.
    return {
        // buildings /////////////////////////////////////////////////////////
        // create
        create_building: function(name, address, footprint, callback) {
            data = {
                name: name,
                address: address,
                footprint: footprint
            };
            call_api('PUT', building_endpoint(), callback, data);
            return;
        },
        // read
        read_building: function(b, callback) {
            call_api('GET', building_endpoint(b), callback);
            return;
        },
        // list
        list_buildings: function(callback) {},
        // update
        update_building: function(b, name, address, footprint, callback) {},
        // delete
        delete_building: function(b, callback) {},

        // floors ////////////////////////////////////////////////////////////
        // create
        create_floor: function(b, level, name, callback) {
            data = {
                level: level,
                name: name
            };
            call_api('PUT', floor_endpoint(b), callback, data);
            return;
        },
        // read
        read_floor: function(b, l, callback) {
            call_api('GET', floor_endpoint(b,l), callback);
            return;
        },
        // update
        update_floor: function(b, l, level, name, callback) {},
        // delete
        delete_floor: function(b, l, callback) {},

        // rasterplans ///////////////////////////////////////////////////////
        // create
        create_rasterplan: function(b, l, r, upload_token, gcps, callback) {
            data = {
                upload_token: upload_token,
                gcps: gcps
            };
            call_api('PUT', rfp_endpoint(b,l), callback, data);
        },
        // read
        read_rasterplan: function(b, l, r, callback) {
            call_api('GET', rfp_endpoint(b,l,r), callback);
            return;
        },
        // update
        update_rasterplan: function(b, l, r, upload_token, gcps, callback) {},
        // delete
        delete_rasterplan: function(b, l, r, callback) {},

        // vectorplans ///////////////////////////////////////////////////////
        // create
        create_vectorplan: function(b, l, callback) {
            data = {};
            call_api('PUT', vfp_endpoint(b,l), callback, data);
        },
        // read
        read_vectorplan: function(b, l, callback) {
            call_api('GET', vfp_endpoint(b, l), callback);
            return;
        },
        // update
        update_vectorplan: function(b, l, callback) {},
        // delete
        delete_vectorplan: function(b, l, callback) {},

        // vectorplan geometry ///////////////////////////////////////////////
        // create
        create_geometry: function(b, l, polygon) {},
        // read
        read_geometry: function(b, l, g, callback) {
            call_api('GET', geometry_endpoint(b, l, g), callback);
            return;
        },
        // update
        update_geometry: function(b, l, g, polygon) {},
        // delete
        delete_geometry: function(b, l, g) {},

        // feature-layer /////////////////////////////////////////////////////
        create_feature_layer: function(b, l, sort_value, name) {},
        read_feature_layer: function(b, l, f, callback) {
            call_api('GET', feature_layer_endpoint(b, l, f), callback);
            return;
        },
        update_feature_layer: function(b, l , f, sort_value, name) {},
        delete_feature_layer: function(b, l, f) {},

        // features //////////////////////////////////////////////////////////
        create_feature: function(b, l, f, name, geometry) {},
        read_feature: function(b, l, f, e, callback) {
            call_api('GET', feature_endpoint(b,l,f,e), callback);
            return;
        },
        update_feature: function(b, l, f, e, name, geometry) {},
        delete_feature: function(b, l, f, e) {},

        // tags //////////////////////////////////////////////////////////////
        create_tag: function(tag, object_type, object_id) {},
        read_tag: function(t, callback) {
            call_api('GET', tag_endpoint(t), callback);
            return;
        },
        update_tag: function(t, tag, object_type, object_id) {},
        delete_tag: function(t) {},

        // attributes ////////////////////////////////////////////////////////
        create_attribute: function(t, name, value) {},
        read_attribute: function(t, a, callback) {
            call_api('GET', attribute_endpoint(t,a), callback);
            return;
        },
        update_attribute: function(t, a, name, value) {},
        delete_attribute: function(t, a) {},

        // upload ////////////////////////////////////////////////////////////
        upload_file: function() {},

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
        	var polygonArray = [];
        	for(var arrayIndex in api_poly) {
	            var latlngs = [];
	            for (var index in api_poly[arrayIndex]) {
	                latlngs.push(BL_Leaflet.to_latlng(api_poly[arrayIndex][index]));
	            }
	            polygonArray.push(latlngs);
            }

            return new L.Polygon(latlngs);
        }
    }
}());

