/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _mapboxGl = __webpack_require__(1);

	var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_mapboxGl2.default.accessToken = 'pk.eyJ1IjoibWlrZXdpbGxpYW1zb24iLCJhIjoibzRCYUlGSSJ9.QGvlt6Opm5futGhE5i-1kw';
	var map = new _mapboxGl2.default.Map({
	    container: 'map', // container id
	    style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
	    center: [-74.50, 40], // starting position
	    zoom: 9 // starting zoom
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * mapboxgl is a A WebGL JavaScript interactive maps library that can render
	 * [Mapbox vector tiles](https://www.mapbox.com/blog/vector-tiles/).
	 *
	 * @module mapboxgl
	 * @summary WebGL JavaScript map library
	 */

	// jshint -W079
	var mapboxgl = module.exports = {};

	mapboxgl.Map = __webpack_require__(2);
	mapboxgl.Control = __webpack_require__(167);
	mapboxgl.Navigation = __webpack_require__(168);
	mapboxgl.Attribution = __webpack_require__(166);
	mapboxgl.Popup = __webpack_require__(169);

	mapboxgl.GeoJSONSource = __webpack_require__(31);
	mapboxgl.VideoSource = __webpack_require__(33);
	mapboxgl.ImageSource = __webpack_require__(35);

	mapboxgl.Style = __webpack_require__(18);

	mapboxgl.LngLat = __webpack_require__(34);
	mapboxgl.LngLatBounds = __webpack_require__(159);
	mapboxgl.Point = __webpack_require__(17);

	mapboxgl.Evented = __webpack_require__(15);
	mapboxgl.util = __webpack_require__(11);

	mapboxgl.supported = __webpack_require__(14).supported;

	var ajax = __webpack_require__(21);
	mapboxgl.util.getJSON = ajax.getJSON;
	mapboxgl.util.getArrayBuffer = ajax.getArrayBuffer;

	var config = __webpack_require__(28);
	mapboxgl.config = config;

	Object.defineProperty(mapboxgl, 'accessToken', {
	    get: function() { return config.ACCESS_TOKEN; },
	    set: function(token) { config.ACCESS_TOKEN = token; }
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	var Canvas = __webpack_require__(10);
	var util = __webpack_require__(11);
	var browser = __webpack_require__(14);
	var Evented = __webpack_require__(15);
	var DOM = __webpack_require__(16);

	var Style = __webpack_require__(18);
	var AnimationLoop = __webpack_require__(129);
	var Painter = __webpack_require__(130);

	var Transform = __webpack_require__(154);
	var Hash = __webpack_require__(155);

	var Interaction = __webpack_require__(156);

	var Camera = __webpack_require__(165);
	var LngLat = __webpack_require__(34);
	var LngLatBounds = __webpack_require__(159);
	var Point = __webpack_require__(17);
	var Attribution = __webpack_require__(166);

	/**
	 * Options common to Map#addClass, Map#removeClass, and Map#setClasses, controlling
	 * whether or not to smoothly transition property changes triggered by the class change.
	 *
	 * @typedef {Object} StyleOptions
	 * @property {boolean} transition
	 */

	/**
	 * Creates a map instance.
	 * @class Map
	 * @param {Object} options
	 * @param {string|Element} options.container HTML element to initialize the map in (or element id as string)
	 * @param {number} [options.minZoom=0] Minimum zoom of the map
	 * @param {number} [options.maxZoom=20] Maximum zoom of the map
	 * @param {Object|string} [options.style] Map style. This must be an an object conforming to the schema described in the [style reference](https://mapbox.com/mapbox-gl-style-spec/), or a URL to a JSON style. To load a style from the Mapbox API, you can use a URL of the form `mapbox://styles/:owner/:style`, where `:owner` is your Mapbox account name and `:style` is the style ID. Or you can use one of the predefined Mapbox styles:
	 *   * `mapbox://styles/mapbox/basic-v8` - Simple and flexible starting template.
	 *   * `mapbox://styles/mapbox/bright-v8` - Template for complex custom basemaps.
	 *   * `mapbox://styles/mapbox/streets-v8` - A ready-to-use basemap, perfect for minor customization or incorporating your own data.
	 *   * `mapbox://styles/mapbox/light-v8` - Subtle light backdrop for data vizualizations.
	 *   * `mapbox://styles/mapbox/dark-v8` - Subtle dark backdrop for data vizualizations.
	 * @param {boolean} [options.hash=false] If `true`, the map will track and update the page URL according to map position
	 * @param {boolean} [options.interactive=true] If `false`, no mouse, touch, or keyboard listeners are attached to the map, so it will not respond to input
	 * @param {number} [options.bearingSnap=7] Snap to north threshold in degrees.
	 * @param {Array} [options.classes] Style class names with which to initialize the map
	 * @param {boolean} [options.attributionControl=true] If `true`, an attribution control will be added to the map.
	 * @param {boolean} [options.failIfMajorPerformanceCaveat=false] If `true`, map creation will fail if the implementation determines that the performance of the created WebGL context would be dramatically lower than expected.
	 * @param {boolean} [options.preserveDrawingBuffer=false] If `true`, The maps canvas can be exported to a PNG using `map.getCanvas().toDataURL();`. This is false by default as a performance optimization.
	 * @param {LngLatBounds|Array<Array<number>>} [options.maxBounds] If set, the map is constrained to the given bounds.
	 * @param {boolean} [options.scrollZoom=true] If `true`, enable the "scroll to zoom" interaction (see `ScrollZoomHandler`)
	 * @param {boolean} [options.boxZoom=true] If `true`, enable the "box zoom" interaction (see `BoxZoomHandler`)
	 * @param {boolean} [options.dragRotate=true] If `true`, enable the "drag to rotate" interaction (see `DragRotateHandler`).
	 * @param {boolean} [options.dragPan=true] If `true`, enable the "drag to pan" interaction (see `DragPanHandler`).
	 * @param {boolean} [options.keyboard=true] If `true`, enable keyboard shortcuts (see `KeyboardHandler`).
	 * @param {boolean} [options.doubleClickZoom=true] If `true`, enable the "double click to zoom" interaction (see `DoubleClickZoomHandler`).
	 * @param {boolean} [options.touchZoomRotate=true] If `true`, enable the "pinch to rotate and zoom" interaction (see `TouchZoomRotateHandler`).
	 * @example
	 * var map = new mapboxgl.Map({
	 *   container: 'map',
	 *   center: [-122.420679, 37.772537],
	 *   zoom: 13,
	 *   style: style_object,
	 *   hash: true
	 * });
	 */
	var Map = module.exports = function(options) {

	    options = this.options = util.inherit(this.options, options);

	    this.animationLoop = new AnimationLoop();
	    this.transform = new Transform(options.minZoom, options.maxZoom);

	    if (options.maxBounds) {
	        var b = LngLatBounds.convert(options.maxBounds);
	        this.transform.lngRange = [b.getWest(), b.getEast()];
	        this.transform.latRange = [b.getSouth(), b.getNorth()];
	    }

	    util.bindAll([
	        '_forwardStyleEvent',
	        '_forwardSourceEvent',
	        '_forwardLayerEvent',
	        '_forwardTileEvent',
	        '_onStyleLoad',
	        '_onStyleChange',
	        '_onSourceAdd',
	        '_onSourceRemove',
	        '_onSourceUpdate',
	        '_onWindowResize',
	        'onError',
	        '_update',
	        '_render'
	    ], this);

	    this._setupContainer();
	    this._setupPainter();

	    this.on('move', this._update.bind(this, false));
	    this.on('zoom', this._update.bind(this, true));
	    this.on('moveend', function() {
	        this.animationLoop.set(300); // text fading
	        this._rerender();
	    }.bind(this));

	    if (typeof window !== 'undefined') {
	        window.addEventListener('resize', this._onWindowResize, false);
	    }

	    this.interaction = new Interaction(this);

	    if (options.interactive) {
	        this.interaction.enable();
	    }

	    this._hash = options.hash && (new Hash()).addTo(this);
	    // don't set position from options if set through hash
	    if (!this._hash || !this._hash._onHashChange()) {
	        this.jumpTo(options);
	    }

	    this.sources = {};
	    this.stacks = {};
	    this._classes = {};

	    this.resize();

	    if (options.classes) this.setClasses(options.classes);
	    if (options.style) this.setStyle(options.style);
	    if (options.attributionControl) this.addControl(new Attribution(options.attributionControl));

	    this.on('style.error', this.onError);
	    this.on('source.error', this.onError);
	    this.on('tile.error', this.onError);
	    this.on('layer.error', this.onError);
	};

	util.extend(Map.prototype, Evented);
	util.extend(Map.prototype, Camera.prototype);
	util.extend(Map.prototype, /** @lends Map.prototype */{

	    options: {
	        center: [0, 0],
	        zoom: 0,
	        bearing: 0,
	        pitch: 0,

	        minZoom: 0,
	        maxZoom: 20,

	        interactive: true,

	        scrollZoom: true,
	        boxZoom: true,
	        dragRotate: true,
	        dragPan: true,
	        keyboard: true,
	        doubleClickZoom: true,
	        touchZoomRotate: true,

	        bearingSnap: 7,

	        hash: false,

	        attributionControl: true,

	        failIfMajorPerformanceCaveat: false,
	        preserveDrawingBuffer: false
	    },

	    /**
	     * Adds a control to the map, calling `control.addTo(this)`.
	     *
	     * @param {Control} control
	     * @returns {Map} `this`
	     */
	    addControl: function(control) {
	        control.addTo(this);
	        return this;
	    },

	    /**
	     * Adds a style class to a map
	     *
	     * @param {string} klass name of style class
	     * @param {StyleOptions} [options]
	     * @fires change
	     * @returns {Map} `this`
	     */
	    addClass: function(klass, options) {
	        if (this._classes[klass]) return;
	        this._classes[klass] = true;
	        if (this.style) this.style._cascade(this._classes, options);
	    },

	    /**
	     * Removes a style class from a map
	     *
	     * @param {string} klass name of style class
	     * @param {StyleOptions} [options]
	     * @fires change
	     * @returns {Map} `this`
	     */
	    removeClass: function(klass, options) {
	        if (!this._classes[klass]) return;
	        delete this._classes[klass];
	        if (this.style) this.style._cascade(this._classes, options);
	    },

	    /**
	     * Helper method to add more than one class
	     *
	     * @param {Array<string>} klasses An array of class names
	     * @param {StyleOptions} [options]
	     * @fires change
	     * @returns {Map} `this`
	     */
	    setClasses: function(klasses, options) {
	        this._classes = {};
	        for (var i = 0; i < klasses.length; i++) {
	            this._classes[klasses[i]] = true;
	        }
	        if (this.style) this.style._cascade(this._classes, options);
	    },

	    /**
	     * Check whether a style class is active
	     *
	     * @param {string} klass Name of style class
	     * @returns {boolean}
	     */
	    hasClass: function(klass) {
	        return !!this._classes[klass];
	    },

	    /**
	     * Return an array of the current active style classes
	     *
	     * @returns {boolean}
	     */
	    getClasses: function() {
	        return Object.keys(this._classes);
	    },

	    /**
	     * Detect the map's new width and height and resize it.
	     *
	     * @returns {Map} `this`
	     */
	    resize: function() {
	        var width = 0, height = 0;

	        if (this._container) {
	            width = this._container.offsetWidth || 400;
	            height = this._container.offsetHeight || 300;
	        }

	        this._canvas.resize(width, height);
	        this.transform.resize(width, height);
	        this.painter.resize(width, height);

	        return this
	            .fire('movestart')
	            .fire('move')
	            .fire('resize')
	            .fire('moveend');
	    },

	    /**
	     * Get the map's geographical bounds
	     *
	     * @returns {LngLatBounds}
	     */
	    getBounds: function() {
	        var bounds = new LngLatBounds(
	            this.transform.pointLocation(new Point(0, 0)),
	            this.transform.pointLocation(this.transform.size));

	        if (this.transform.angle || this.transform.pitch) {
	            bounds.extend(this.transform.pointLocation(new Point(this.transform.size.x, 0)));
	            bounds.extend(this.transform.pointLocation(new Point(0, this.transform.size.y)));
	        }

	        return bounds;
	    },

	    /**
	     * Get pixel coordinates (relative to map container) given a geographical location
	     *
	     * @param {LngLat} lnglat
	     * @returns {Object} `x` and `y` coordinates
	     */
	    project: function(lnglat) {
	        return this.transform.locationPoint(LngLat.convert(lnglat));
	    },

	    /**
	     * Get geographical coordinates given pixel coordinates
	     *
	     * @param {Array<number>} point [x, y] pixel coordinates
	     * @returns {LngLat}
	     */
	    unproject: function(point) {
	        return this.transform.pointLocation(Point.convert(point));
	    },

	    /**
	     * Query features at a point, or within a certain radius thereof.
	     *
	     * To use this method, you must set the style property `"interactive": true` on layers you wish to query.
	     *
	     * @param {Array<number>} point [x, y] pixel coordinates
	     * @param {Object} params
	     * @param {number} [params.radius=0] Radius in pixels to search in
	     * @param {string|Array<string>} [params.layer] Only return features from a given layer or layers
	     * @param {string} [params.type] Either `raster` or `vector`
	     * @param {boolean} [params.includeGeometry=false] If `true`, geometry of features will be included in the results at the expense of a much slower query time.
	     * @param {featuresCallback} callback function that receives the results
	     *
	     * @returns {Map} `this`
	     *
	     * @example
	     * map.featuresAt([10, 20], { radius: 10 }, function(err, features) {
	     *   console.log(features);
	     * });
	     */
	    featuresAt: function(point, params, callback) {
	        var location = this.unproject(point).wrap();
	        var coord = this.transform.locationCoordinate(location);
	        this.style.featuresAt(coord, params, callback);
	        return this;
	    },

	    /**
	     * Query features within a rectangle.
	     *
	     * To use this method, you must set the style property `"interactive": true` on layers you wish to query.
	     *
	     * @param {Array<Point>|Array<Array<number>>} [bounds] Coordinates of opposite corners of bounding rectangle, in pixel coordinates. Optional: use entire viewport if omitted.
	     * @param {Object} params
	     * @param {string|Array<string>} [params.layer] Only return features from a given layer or layers
	     * @param {string} [params.type] Either `raster` or `vector`
	     * @param {boolean} [params.includeGeometry=false] If `true`, geometry of features will be included in the results at the expense of a much slower query time.
	     * @param {featuresCallback} callback function that receives the results
	     *
	     * @returns {Map} `this`
	     *
	     * @example
	     * map.featuresIn([[10, 20], [30, 50]], { layer: 'my-layer-name' }, function(err, features) {
	     *   console.log(features);
	     * });
	     */
	    featuresIn: function(bounds, params, callback) {
	        if (typeof callback === 'undefined') {
	            callback = params;
	            params = bounds;
	          // bounds was omitted: use full viewport
	            bounds = [
	                Point.convert([0, 0]),
	                Point.convert([this.transform.width, this.transform.height])
	            ];
	        }
	        bounds = bounds.map(Point.convert.bind(Point));
	        bounds = [
	            new Point(
	            Math.min(bounds[0].x, bounds[1].x),
	            Math.min(bounds[0].y, bounds[1].y)
	          ),
	            new Point(
	            Math.max(bounds[0].x, bounds[1].x),
	            Math.max(bounds[0].y, bounds[1].y)
	          )
	        ].map(this.transform.pointCoordinate.bind(this.transform));
	        this.style.featuresIn(bounds, params, callback);
	        return this;
	    },

	    /**
	     * Apply multiple style mutations in a batch
	     *
	     * @param {function} work Function which accepts a `StyleBatch` object,
	     *      a subset of `Map`, with `addLayer`, `removeLayer`,
	     *      `setPaintProperty`, `setLayoutProperty`, `setFilter`,
	     *      `setLayerZoomRange`, `addSource`, and `removeSource`
	     *
	     * @example
	     * map.batch(function (batch) {
	     *     batch.addLayer(layer1);
	     *     batch.addLayer(layer2);
	     *     ...
	     *     batch.addLayer(layerN);
	     * });
	     *
	     */
	    batch: function(work) {
	        this.style.batch(work);

	        this.style._cascade(this._classes);
	        this._update(true);
	    },

	    /**
	     * Replaces the map's style object
	     *
	     * @param {Object} style A style object formatted as JSON
	     * @returns {Map} `this`
	     */
	    setStyle: function(style) {
	        if (this.style) {
	            this.style
	                .off('load', this._onStyleLoad)
	                .off('error', this._forwardStyleEvent)
	                .off('change', this._onStyleChange)
	                .off('source.add', this._onSourceAdd)
	                .off('source.remove', this._onSourceRemove)
	                .off('source.load', this._onSourceUpdate)
	                .off('source.error', this._forwardSourceEvent)
	                .off('source.change', this._onSourceUpdate)
	                .off('layer.add', this._forwardLayerEvent)
	                .off('layer.remove', this._forwardLayerEvent)
	                .off('layer.error', this._forwardLayerEvent)
	                .off('tile.add', this._forwardTileEvent)
	                .off('tile.remove', this._forwardTileEvent)
	                .off('tile.load', this._update)
	                .off('tile.error', this._forwardTileEvent)
	                .off('tile.stats', this._forwardTileEvent)
	                ._remove();

	            this.off('rotate', this.style._redoPlacement);
	            this.off('pitch', this.style._redoPlacement);
	        }

	        if (!style) {
	            this.style = null;
	            return this;
	        } else if (style instanceof Style) {
	            this.style = style;
	        } else {
	            this.style = new Style(style, this.animationLoop);
	        }

	        this.style
	            .on('load', this._onStyleLoad)
	            .on('error', this._forwardStyleEvent)
	            .on('change', this._onStyleChange)
	            .on('source.add', this._onSourceAdd)
	            .on('source.remove', this._onSourceRemove)
	            .on('source.load', this._onSourceUpdate)
	            .on('source.error', this._forwardSourceEvent)
	            .on('source.change', this._onSourceUpdate)
	            .on('layer.add', this._forwardLayerEvent)
	            .on('layer.remove', this._forwardLayerEvent)
	            .on('layer.error', this._forwardLayerEvent)
	            .on('tile.add', this._forwardTileEvent)
	            .on('tile.remove', this._forwardTileEvent)
	            .on('tile.load', this._update)
	            .on('tile.error', this._forwardTileEvent)
	            .on('tile.stats', this._forwardTileEvent);

	        this.on('rotate', this.style._redoPlacement);
	        this.on('pitch', this.style._redoPlacement);

	        return this;
	    },

	    /**
	     * Get a style object that can be used to recreate the map's style
	     *
	     * @returns {Object} style
	     */
	    getStyle: function() {
	        return this.style.serialize();
	    },

	    /**
	     * Add a source to the map style.
	     *
	     * @param {string} id ID of the source. Must not be used by any existing source.
	     * @param {Object} source source specification, following the
	     * [Mapbox GL Style Reference](https://www.mapbox.com/mapbox-gl-style-spec/#sources)
	     * @fires source.add
	     * @returns {Map} `this`
	     */
	    addSource: function(id, source) {
	        this.style.addSource(id, source);
	        return this;
	    },

	    /**
	     * Remove an existing source from the map style.
	     *
	     * @param {string} id ID of the source to remove
	     * @fires source.remove
	     * @returns {Map} `this`
	     */
	    removeSource: function(id) {
	        this.style.removeSource(id);
	        return this;
	    },

	    /**
	     * Return the style source object with the given `id`.
	     *
	     * @param {string} id source ID
	     * @returns {Object}
	     */
	    getSource: function(id) {
	        return this.style.getSource(id);
	    },

	    /**
	     * Add a layer to the map style. The layer will be inserted before the layer with
	     * ID `before`, or appended if `before` is omitted.
	     * @param {StyleLayer|Object} layer
	     * @param {string=} before  ID of an existing layer to insert before
	     * @fires layer.add
	     * @returns {Map} `this`
	     */
	    addLayer: function(layer, before) {
	        this.style.addLayer(layer, before);
	        this.style._cascade(this._classes);
	        return this;
	    },

	    /**
	     * Remove the layer with the given `id` from the map. Any layers which refer to the
	     * specified layer via a `ref` property are also removed.
	     *
	     * @param {string} id layer id
	     * @throws {Error} if no layer with the given `id` exists
	     * @fires layer.remove
	     * @returns {Map} `this`
	     */
	    removeLayer: function(id) {
	        this.style.removeLayer(id);
	        this.style._cascade(this._classes);
	        return this;
	    },

	    /**
	     * Return the style layer object with the given `id`.
	     *
	     * @param {string} id layer id
	     * @returns {?Object} a layer, if one with the given `id` exists
	     */
	    getLayer: function(id) {
	        return this.style.getLayer(id);
	    },

	    /**
	     * Set the filter for a given style layer.
	     *
	     * @param {string} layer ID of a layer
	     * @param {Array} filter filter specification, as defined in the [Style Specification](https://www.mapbox.com/mapbox-gl-style-spec/#types-filter)
	     * @returns {Map} `this`
	     */
	    setFilter: function(layer, filter) {
	        this.style.setFilter(layer, filter);
	        return this;
	    },

	    /**
	     * Set the zoom extent for a given style layer.
	     *
	     * @param {string} layerId ID of a layer
	     * @param {number} minzoom minimum zoom extent
	     * @param {number} maxzoom maximum zoom extent
	     * @returns {Map} `this`
	     */
	    setLayerZoomRange: function(layerId, minzoom, maxzoom) {
	        this.style.setLayerZoomRange(layerId, minzoom, maxzoom);
	        return this;
	    },

	    /**
	     * Get the filter for a given style layer.
	     *
	     * @param {string} layer ID of a layer
	     * @returns {Array} filter specification, as defined in the [Style Specification](https://www.mapbox.com/mapbox-gl-style-spec/#filter)
	     */
	    getFilter: function(layer) {
	        return this.style.getFilter(layer);
	    },

	    /**
	     * Set the value of a paint property in a given style layer.
	     *
	     * @param {string} layer ID of a layer
	     * @param {string} name name of a paint property
	     * @param {*} value value for the paint propery; must have the type appropriate for the property as defined in the [Style Specification](https://www.mapbox.com/mapbox-gl-style-spec/)
	     * @param {string=} klass optional class specifier for the property
	     * @returns {Map} `this`
	     */
	    setPaintProperty: function(layer, name, value, klass) {
	        this.batch(function(batch) {
	            batch.setPaintProperty(layer, name, value, klass);
	        });

	        return this;
	    },

	    /**
	     * Get the value of a paint property in a given style layer.
	     *
	     * @param {string} layer ID of a layer
	     * @param {string} name name of a paint property
	     * @param {string=} klass optional class specifier for the property
	     * @returns {*} value for the paint propery
	     */
	    getPaintProperty: function(layer, name, klass) {
	        return this.style.getPaintProperty(layer, name, klass);
	    },

	    /**
	     * Set the value of a layout property in a given style layer.
	     *
	     * @param {string} layer ID of a layer
	     * @param {string} name name of a layout property
	     * @param {*} value value for the layout propery; must have the type appropriate for the property as defined in the [Style Specification](https://www.mapbox.com/mapbox-gl-style-spec/)
	     * @returns {Map} `this`
	     */
	    setLayoutProperty: function(layer, name, value) {
	        this.batch(function(batch) {
	            batch.setLayoutProperty(layer, name, value);
	        });

	        return this;
	    },

	    /**
	     * Get the value of a layout property in a given style layer.
	     *
	     * @param {string} layer ID of a layer
	     * @param {string} name name of a layout property
	     * @param {string=} klass optional class specifier for the property
	     * @returns {*} value for the layout propery
	     */
	    getLayoutProperty: function(layer, name) {
	        return this.style.getLayoutProperty(layer, name);
	    },

	    /**
	     * Get the Map's container as an HTML element
	     * @returns {HTMLElement} container
	     */
	    getContainer: function() {
	        return this._container;
	    },

	    /**
	     * Get the container for the map `canvas` element.
	     *
	     * If you want to add non-GL overlays to the map, you should append them to this element. This
	     * is the element to which event bindings for map interactivity such as panning and zooming are
	     * attached. It will receive bubbled events for child elements such as the `canvas`, but not for
	     * map controls.
	     *
	     * @returns {HTMLElement} container
	     */
	    getCanvasContainer: function() {
	        return this._canvasContainer;
	    },

	    /**
	     * Get the Map's canvas as an HTML canvas
	     * @returns {HTMLElement} canvas
	     */
	    getCanvas: function() {
	        return this._canvas.getElement();
	    },

	    _setupContainer: function() {
	        var id = this.options.container;

	        var container = this._container = typeof id === 'string' ? document.getElementById(id) : id;
	        container.classList.add('mapboxgl-map');

	        var canvasContainer = this._canvasContainer = DOM.create('div', 'mapboxgl-canvas-container', container);
	        if (this.options.interactive) {
	            canvasContainer.classList.add('mapboxgl-interactive');
	        }
	        this._canvas = new Canvas(this, canvasContainer);

	        var controlContainer = this._controlContainer = DOM.create('div', 'mapboxgl-control-container', container);
	        var corners = this._controlCorners = {};
	        ['top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach(function (pos) {
	            corners[pos] = DOM.create('div', 'mapboxgl-ctrl-' + pos, controlContainer);
	        });
	    },

	    _setupPainter: function() {
	        var gl = this._canvas.getWebGLContext({
	            failIfMajorPerformanceCaveat: this.options.failIfMajorPerformanceCaveat,
	            preserveDrawingBuffer: this.options.preserveDrawingBuffer
	        });

	        if (!gl) {
	            console.error('Failed to initialize WebGL');
	            return;
	        }

	        this.painter = new Painter(gl, this.transform);
	    },

	    /**
	     * WebGL Context Lost event.
	     *
	     * @event webglcontextlost
	     * @memberof Map
	     * @instance
	     * @type {Object}
	     * @property {Event} originalEvent the original DOM event
	     */
	    _contextLost: function(event) {
	        event.preventDefault();
	        if (this._frameId) {
	            browser.cancelFrame(this._frameId);
	        }
	        this.fire("webglcontextlost", {originalEvent: event});
	    },

	    /**
	     * WebGL Context Restored event.
	     *
	     * @event webglcontextrestored
	     * @memberof Map
	     * @instance
	     * @type {Object}
	     */
	    _contextRestored: function(event) {
	        this._setupPainter();
	        this.resize();
	        this._update();
	        this.fire("webglcontextrestored", {originalEvent: event});
	    },

	    /**
	     * Is this map fully loaded? If the style isn't loaded
	     * or it has a change to the sources or style that isn't
	     * propagated to its style, return false.
	     *
	     * @returns {boolean} whether the map is loaded
	     */
	    loaded: function() {
	        if (this._styleDirty || this._sourcesDirty)
	            return false;
	        if (!this.style || !this.style.loaded())
	            return false;
	        return true;
	    },

	    /**
	     * Update this map's style and sources, and re-render the map.
	     *
	     * @param {boolean} updateStyle mark the map's style for reprocessing as
	     * well as its sources
	     * @returns {Map} this
	     * @private
	     */
	    _update: function(updateStyle) {
	        if (!this.style) return this;

	        this._styleDirty = this._styleDirty || updateStyle;
	        this._sourcesDirty = true;

	        this._rerender();

	        return this;
	    },

	    /**
	     * Call when a (re-)render of the map is required, e.g. when the
	     * user panned or zoomed,f or new data is available.
	     * @returns {Map} this
	     * @private
	     */
	    _render: function() {
	        if (this.style && this._styleDirty) {
	            this._styleDirty = false;
	            this.style._recalculate(this.transform.zoom);
	        }

	        if (this.style && this._sourcesDirty) {
	            this._sourcesDirty = false;
	            this.style._updateSources(this.transform);
	        }

	        this.painter.render(this.style, {
	            debug: this.debug,
	            vertices: this.vertices,
	            rotating: this.rotating,
	            zooming: this.zooming
	        });

	        this.fire('render');

	        if (this.loaded() && !this._loaded) {
	            this._loaded = true;
	            this.fire('load');
	        }

	        this._frameId = null;

	        if (!this.animationLoop.stopped()) {
	            this._styleDirty = true;
	        }

	        if (this._sourcesDirty || this._repaint || !this.animationLoop.stopped()) {
	            this._rerender();
	        }

	        return this;
	    },

	    /**
	     * Destroys the map's underlying resources, including web workers and DOM elements. Afterwards,
	     * you must not call any further methods on this Map instance.
	     *
	     * @returns {undefined}
	     */
	    remove: function() {
	        if (this._hash) this._hash.remove();
	        browser.cancelFrame(this._frameId);
	        this.setStyle(null);
	        if (typeof window !== 'undefined') {
	            window.removeEventListener('resize', this._onWindowResize, false);
	        }
	        removeNode(this._canvasContainer);
	        removeNode(this._controlContainer);
	        this._container.classList.remove('mapboxgl-map');
	    },

	    /**
	     * A default error handler for `style.error`, `source.error`, `layer.error`,
	     * and `tile.error` events.
	     * It logs the error via `console.error`.
	     *
	     * @example
	     * // Disable the default error handler
	     * map.off('style.error', map.onError);
	     * map.off('source.error', map.onError);
	     * map.off('tile.error', map.onError);
	     * map.off('layer.error', map.onError);
	     */
	    onError: function(e) {
	        console.error(e.error);
	    },

	    _rerender: function() {
	        if (this.style && !this._frameId) {
	            this._frameId = browser.frame(this._render);
	        }
	    },

	    _forwardStyleEvent: function(e) {
	        this.fire('style.' + e.type, util.extend({style: e.target}, e));
	    },

	    _forwardSourceEvent: function(e) {
	        this.fire(e.type, util.extend({style: e.target}, e));
	    },

	    _forwardLayerEvent: function(e) {
	        this.fire(e.type, util.extend({style: e.target}, e));
	    },

	    _forwardTileEvent: function(e) {
	        this.fire(e.type, util.extend({style: e.target}, e));
	    },

	    _onStyleLoad: function(e) {
	        if (this.transform.unmodified) {
	            this.jumpTo(this.style.stylesheet);
	        }
	        this.style._cascade(this._classes, {transition: false});
	        this._forwardStyleEvent(e);
	    },

	    _onStyleChange: function(e) {
	        this._update(true);
	        this._forwardStyleEvent(e);
	    },

	    _onSourceAdd: function(e) {
	        var source = e.source;
	        if (source.onAdd)
	            source.onAdd(this);
	        this._forwardSourceEvent(e);
	    },

	    _onSourceRemove: function(e) {
	        var source = e.source;
	        if (source.onRemove)
	            source.onRemove(this);
	        this._forwardSourceEvent(e);
	    },

	    _onSourceUpdate: function(e) {
	        this._update();
	        this._forwardSourceEvent(e);
	    },

	    _onWindowResize: function() {
	        this.stop().resize()._update();
	    }
	});


	/**
	 * Callback to receive results from `Map#featuresAt` and `Map#featuresIn`.
	 *
	 * Note: because features come from vector tiles or GeoJSON data that is converted to vector tiles internally, the returned features will be:
	 *
	 * 1. Truncated at tile boundaries.
	 * 2. Duplicated across tile boundaries.
	 *
	 * For example, suppose there is a highway running through your rectangle in a `featuresIn` query. `featuresIn` will only give you the parts of the highway feature that lie within the map tiles covering your rectangle, even if the road actually extends into other tiles. Also, the portion of the highway within each map tile will come back as a separate feature.
	 *
	 * @callback featuresCallback
	 * @param {?Error} err - An error that occurred during query processing, if any. If this parameter is non-null, the `features` parameter will be null.
	 * @param {?Array<Object>} features - An array of [GeoJSON](http://geojson.org/) features matching the query parameters. The GeoJSON properties of each feature are taken from the original source. Each feature object also contains a top-level `layer` property whose value is an object representing the style layer to which the feature belongs. Layout and paint properties in this object contain values which are fully evaluated for the given zoom level and feature.
	 */


	util.extendAll(Map.prototype, /** @lends Map.prototype */{

	    /**
	     * Enable debugging mode
	     *
	     * @name debug
	     * @type {boolean}
	     */
	    _debug: false,
	    get debug() { return this._debug; },
	    set debug(value) {
	        if (this._debug === value) return;
	        this._debug = value;
	        this._update();
	    },

	    /**
	     * Show collision boxes: useful for debugging label placement
	     * in styles.
	     *
	     * @name collisionDebug
	     * @type {boolean}
	     */
	    _collisionDebug: false,
	    get collisionDebug() { return this._collisionDebug; },
	    set collisionDebug(value) {
	        if (this._collisionDebug === value) return;
	        this._collisionDebug = value;
	        this.style._redoPlacement();
	    },

	    /**
	     * Enable continuous repaint to analyze performance
	     *
	     * @name repaint
	     * @type {boolean}
	     */
	    _repaint: false,
	    get repaint() { return this._repaint; },
	    set repaint(value) { this._repaint = value; this._update(); },

	    // show vertices
	    _vertices: false,
	    get vertices() { return this._vertices; },
	    set vertices(value) { this._vertices = value; this._update(); }
	});

	function removeNode(node) {
	    if (node.parentNode) {
	        node.parentNode.removeChild(node);
	    }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global window, global*/
	var util = __webpack_require__(4)
	var assert = __webpack_require__(8)
	var now = __webpack_require__(9)

	var slice = Array.prototype.slice
	var console
	var times = {}

	if (typeof global !== "undefined" && global.console) {
	    console = global.console
	} else if (typeof window !== "undefined" && window.console) {
	    console = window.console
	} else {
	    console = {}
	}

	var functions = [
	    [log, "log"],
	    [info, "info"],
	    [warn, "warn"],
	    [error, "error"],
	    [time, "time"],
	    [timeEnd, "timeEnd"],
	    [trace, "trace"],
	    [dir, "dir"],
	    [consoleAssert, "assert"]
	]

	for (var i = 0; i < functions.length; i++) {
	    var tuple = functions[i]
	    var f = tuple[0]
	    var name = tuple[1]

	    if (!console[name]) {
	        console[name] = f
	    }
	}

	module.exports = console

	function log() {}

	function info() {
	    console.log.apply(console, arguments)
	}

	function warn() {
	    console.log.apply(console, arguments)
	}

	function error() {
	    console.warn.apply(console, arguments)
	}

	function time(label) {
	    times[label] = now()
	}

	function timeEnd(label) {
	    var time = times[label]
	    if (!time) {
	        throw new Error("No such label: " + label)
	    }

	    var duration = now() - time
	    console.log(label + ": " + duration + "ms")
	}

	function trace() {
	    var err = new Error()
	    err.name = "Trace"
	    err.message = util.format.apply(null, arguments)
	    console.error(err.stack)
	}

	function dir(object) {
	    console.log(util.inspect(object) + "\n")
	}

	function consoleAssert(expression) {
	    if (!expression) {
	        var arr = slice.call(arguments, 1)
	        assert.ok(false, util.format.apply(null, arr))
	    }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, console) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(6);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(7);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(5), __webpack_require__(3)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	// when used in node, this will actually load the util module we depend on
	// versus loading the builtin util module as happens otherwise
	// this is a bug in node module loading as far as I am concerned
	var util = __webpack_require__(4);

	var pSlice = Array.prototype.slice;
	var hasOwn = Object.prototype.hasOwnProperty;

	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.

	var assert = module.exports = ok;

	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })

	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;

	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  }
	  else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;

	      // try to strip useless frames
	      var fn_name = stackStartFunction.name;
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }

	      this.stack = out;
	    }
	  }
	};

	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);

	function replacer(key, value) {
	  if (util.isUndefined(value)) {
	    return '' + value;
	  }
	  if (util.isNumber(value) && !isFinite(value)) {
	    return value.toString();
	  }
	  if (util.isFunction(value) || util.isRegExp(value)) {
	    return value.toString();
	  }
	  return value;
	}

	function truncate(s, n) {
	  if (util.isString(s)) {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}

	function getMessage(self) {
	  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(JSON.stringify(self.expected, replacer), 128);
	}

	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.

	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.

	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}

	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;

	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.

	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;

	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);

	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};

	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);

	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};

	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);

	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};

	function _deepEqual(actual, expected) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
	    if (actual.length != expected.length) return false;

	    for (var i = 0; i < actual.length; i++) {
	      if (actual[i] !== expected[i]) return false;
	    }

	    return true;

	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();

	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;

	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!util.isObject(actual) && !util.isObject(expected)) {
	    return actual == expected;

	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected);
	  }
	}

	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}

	function objEquiv(a, b) {
	  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b)) {
	    return a === b;
	  }
	  var aIsArgs = isArguments(a),
	      bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b);
	  }
	  var ka = objectKeys(a),
	      kb = objectKeys(b),
	      key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key])) return false;
	  }
	  return true;
	}

	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);

	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};

	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);

	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};

	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};

	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }

	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  } else if (actual instanceof expected) {
	    return true;
	  } else if (expected.call({}, actual) === true) {
	    return true;
	  }

	  return false;
	}

	function _throws(shouldThrow, block, expected, message) {
	  var actual;

	  if (util.isString(expected)) {
	    message = expected;
	    expected = null;
	  }

	  try {
	    block();
	  } catch (e) {
	    actual = e;
	  }

	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');

	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }

	  if (!shouldThrow && expectedException(actual, expected)) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }

	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}

	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);

	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws.apply(this, [true].concat(pSlice.call(arguments)));
	};

	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/message) {
	  _throws.apply(this, [false].concat(pSlice.call(arguments)));
	};

	assert.ifError = function(err) { if (err) {throw err;}};

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = now

	function now() {
	    return new Date().getTime()
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);

	module.exports = Canvas;

	function Canvas(parent, container) {
	    this.canvas = document.createElement('canvas');

	    if (parent && container) {
	        this.canvas.style.position = 'absolute';
	        this.canvas.classList.add('mapboxgl-canvas');
	        this.canvas.addEventListener('webglcontextlost', parent._contextLost.bind(parent), false);
	        this.canvas.addEventListener('webglcontextrestored', parent._contextRestored.bind(parent), false);
	        this.canvas.setAttribute('tabindex', 0);
	        container.appendChild(this.canvas);
	    }
	}

	Canvas.prototype.resize = function(width, height) {
	    var pixelRatio = window.devicePixelRatio || 1;

	    // Request the required canvas size taking the pixelratio into account.
	    this.canvas.width = pixelRatio * width;
	    this.canvas.height = pixelRatio * height;

	    // Maintain the same canvas size, potentially downscaling it for HiDPI displays
	    this.canvas.style.width = width + 'px';
	    this.canvas.style.height = height + 'px';
	};

	var requiredContextAttributes = {
	    antialias: false,
	    alpha: true,
	    stencil: true,
	    depth: true
	};

	Canvas.prototype.getWebGLContext = function(attributes) {
	    attributes = util.extend({}, attributes, requiredContextAttributes);

	    return this.canvas.getContext('webgl', attributes) ||
	        this.canvas.getContext('experimental-webgl', attributes);
	};

	Canvas.prototype.supportsWebGLContext = function(failIfMajorPerformanceCaveat) {
	    var attributes = util.extend({
	        failIfMajorPerformanceCaveat: failIfMajorPerformanceCaveat
	    }, requiredContextAttributes);

	    if ('probablySupportsContext' in this.canvas) {
	        return this.canvas.probablySupportsContext('webgl', attributes) ||
	            this.canvas.probablySupportsContext('experimental-webgl', attributes);
	    } else if ('supportsContext' in this.canvas) {
	        return this.canvas.supportsContext('webgl', attributes) ||
	            this.canvas.supportsContext('experimental-webgl', attributes);
	    }

	    return !!window.WebGLRenderingContext && !!this.getWebGLContext(failIfMajorPerformanceCaveat);
	};

	Canvas.prototype.getElement = function() {
	    return this.canvas;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var UnitBezier = __webpack_require__(12);
	var Coordinate = __webpack_require__(13);

	/**
	 * Given a value `t` that varies between 0 and 1, return
	 * an interpolation function that eases between 0 and 1 in a pleasing
	 * cubic in-out fashion.
	 *
	 * @param {number} t input
	 * @returns {number} input
	 * @private
	 */
	exports.easeCubicInOut = function (t) {
	    if (t <= 0) return 0;
	    if (t >= 1) return 1;
	    var t2 = t * t,
	        t3 = t2 * t;
	    return 4 * (t < 0.5 ? t3 : 3 * (t - t2) + t3 - 0.75);
	};

	/**
	 * Given given (x, y), (x1, y1) control points for a bezier curve,
	 * return a function that interpolates along that curve.
	 *
	 * @param {number} p1x control point 1 x coordinate
	 * @param {number} p1y control point 1 y coordinate
	 * @param {number} p2x control point 2 x coordinate
	 * @param {number} p2y control point 2 y coordinate
	 * @returns {Function} interpolator: receives number value, returns
	 * number value.
	 * @private
	 */
	exports.bezier = function(p1x, p1y, p2x, p2y) {
	    var bezier = new UnitBezier(p1x, p1y, p2x, p2y);
	    return function(t) {
	        return bezier.solve(t);
	    };
	};

	/**
	 * A default bezier-curve powered easing function with
	 * control points (0.25, 0.1) and (0.25, 1)
	 *
	 * @param {number} t
	 * @returns {number} output
	 * @private
	 */
	exports.ease = exports.bezier(0.25, 0.1, 0.25, 1);

	/**
	 * Given a four-element array of numbers that represents a color in
	 * RGBA, return a version for which the RGB components are multiplied
	 * by the A (alpha) component
	 *
	 * @param {Array<number>} color color array
	 * @param {number} [additionalOpacity] additional opacity to be multiplied into
	 *     the color's alpha component.
	 * @returns {Array<number>} premultiplied color array
	 * @private
	 */
	exports.premultiply = function (color, additionalOpacity) {
	    if (!color) return null;
	    var opacity = color[3] * additionalOpacity;
	    return [
	        color[0] * opacity,
	        color[1] * opacity,
	        color[2] * opacity,
	        opacity
	    ];
	};

	/**
	 * constrain n to the given range via min + max
	 *
	 * @param {number} n value
	 * @param {number} min the minimum value to be returned
	 * @param {number} max the maximum value to be returned
	 * @returns {number} the clamped value
	 * @private
	 */
	exports.clamp = function (n, min, max) {
	    return Math.min(max, Math.max(min, n));
	};

	/*
	 * constrain n to the given range, excluding the minimum, via modular arithmetic
	 * @param {number} n value
	 * @param {number} min the minimum value to be returned, exclusive
	 * @param {number} max the maximum value to be returned, inclusive
	 * @returns {number} constrained number
	 * @private
	 */
	exports.wrap = function (n, min, max) {
	    var d = max - min;
	    var w = ((n - min) % d + d) % d + min;
	    return (w === min) ? max : w;
	};

	/*
	 * return the first non-null and non-undefined argument to this function.
	 * @returns {*} argument
	 * @private
	 */
	exports.coalesce = function() {
	    for (var i = 0; i < arguments.length; i++) {
	        var arg = arguments[i];
	        if (arg !== null && arg !== undefined)
	            return arg;
	    }
	};

	/*
	 * Call an asynchronous function on an array of arguments,
	 * calling `callback` with the completed results of all calls.
	 *
	 * @param {Array<*>} array input to each call of the async function.
	 * @param {Function} fn an async function with signature (data, callback)
	 * @param {Function} callback a callback run after all async work is done.
	 * called with an array, containing the results of each async call.
	 * @returns {undefined}
	 * @private
	 */
	exports.asyncAll = function (array, fn, callback) {
	    if (!array.length) { return callback(null, []); }
	    var remaining = array.length;
	    var results = new Array(array.length);
	    var error = null;
	    array.forEach(function (item, i) {
	        fn(item, function (err, result) {
	            if (err) error = err;
	            results[i] = result;
	            if (--remaining === 0) callback(error, results);
	        });
	    });
	};

	/*
	 * Compute the difference between the keys in one object and the keys
	 * in another object.
	 *
	 * @param {Object} obj
	 * @param {Object} other
	 * @returns {Array<string>} keys difference
	 * @private
	 */
	exports.keysDifference = function (obj, other) {
	    var difference = [];
	    for (var i in obj) {
	        if (!(i in other)) {
	            difference.push(i);
	        }
	    }
	    return difference;
	};

	/**
	 * Given a destination object and optionally many source objects,
	 * copy all properties from the source objects into the destination.
	 * The last source object given overrides properties from previous
	 * source objects.
	 * @param {Object} dest destination object
	 * @param {...Object} sources sources from which properties are pulled
	 * @returns {Object} dest
	 * @private
	 */
	exports.extend = function (dest) {
	    for (var i = 1; i < arguments.length; i++) {
	        var src = arguments[i];
	        for (var k in src) {
	            dest[k] = src[k];
	        }
	    }
	    return dest;
	};

	/**
	 * Extend a destination object with all properties of the src object,
	 * using defineProperty instead of simple assignment.
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 * @private
	 */
	exports.extendAll = function (dest, src) {
	    for (var i in src) {
	        Object.defineProperty(dest, i, Object.getOwnPropertyDescriptor(src, i));
	    }
	    return dest;
	};

	/**
	 * Extend a parent's prototype with all properties in a properties
	 * object.
	 *
	 * @param {Object} parent
	 * @param {Object} props
	 * @returns {Object}
	 * @private
	 */
	exports.inherit = function (parent, props) {
	    var parentProto = typeof parent === 'function' ? parent.prototype : parent,
	        proto = Object.create(parentProto);
	    exports.extendAll(proto, props);
	    return proto;
	};

	/**
	 * Given an object and a number of properties as strings, return version
	 * of that object with only those properties.
	 *
	 * @param {Object} src the object
	 * @param {Array<string>} properties an array of property names chosen
	 * to appear on the resulting object.
	 * @returns {Object} object with limited properties.
	 * @example
	 * var foo = { name: 'Charlie', age: 10 };
	 * var justName = pick(foo, ['name']);
	 * // justName = { name: 'Charlie' }
	 * @private
	 */
	exports.pick = function (src, properties) {
	    var result = {};
	    for (var i = 0; i < properties.length; i++) {
	        var k = properties[i];
	        if (k in src) {
	            result[k] = src[k];
	        }
	    }
	    return result;
	};

	var id = 1;

	/**
	 * Return a unique numeric id, starting at 1 and incrementing with
	 * each call.
	 *
	 * @returns {number} unique numeric id.
	 * @private
	 */
	exports.uniqueId = function () {
	    return id++;
	};

	/**
	 * Create a version of `fn` that only fires once every `time` millseconds.
	 *
	 * @param {Function} fn the function to be throttled
	 * @param {number} time millseconds required between function calls
	 * @param {*} context the value of `this` with which the function is called
	 * @returns {Function} debounced function
	 * @private
	 */
	exports.throttle = function (fn, time, context) {
	    var lock, args, wrapperFn, later;

	    later = function () {
	        // reset lock and call if queued
	        lock = false;
	        if (args) {
	            wrapperFn.apply(context, args);
	            args = false;
	        }
	    };

	    wrapperFn = function () {
	        if (lock) {
	            // called too soon, queue to call later
	            args = arguments;

	        } else {
	            // call and lock until later
	            fn.apply(context, arguments);
	            setTimeout(later, time);
	            lock = true;
	        }
	    };

	    return wrapperFn;
	};

	/**
	 * Create a version of `fn` that is only called `time` milliseconds
	 * after its last invocation
	 *
	 * @param {Function} fn the function to be debounced
	 * @param {number} time millseconds after which the function will be invoked
	 * @returns {Function} debounced function
	 * @private
	 */
	exports.debounce = function(fn, time) {
	    var timer, args;

	    return function() {
	        args = arguments;
	        clearTimeout(timer);

	        timer = setTimeout(function() {
	            fn.apply(null, args);
	        }, time);
	    };
	};

	/**
	 * Given an array of member function names as strings, replace all of them
	 * with bound versions that will always refer to `context` as `this`. This
	 * is useful for classes where otherwise event bindings would reassign
	 * `this` to the evented object or some other value: this lets you ensure
	 * the `this` value always.
	 *
	 * @param {Array<string>} fns list of member function names
	 * @param {*} context the context value
	 * @returns {undefined} changes functions in-place
	 * @example
	 * function MyClass() {
	 *   bindAll(['ontimer'], this);
	 *   this.name = 'Tom';
	 * }
	 * MyClass.prototype.ontimer = function() {
	 *   alert(this.name);
	 * };
	 * var myClass = new MyClass();
	 * setTimeout(myClass.ontimer, 100);
	 * @private
	 */
	exports.bindAll = function(fns, context) {
	    fns.forEach(function(fn) {
	        context[fn] = context[fn].bind(context);
	    });
	};

	/**
	 * Given a class, bind all of the methods that look like handlers: that
	 * begin with _on, and bind them to the class.
	 *
	 * @param {Object} context an object with methods
	 * @private
	 */
	exports.bindHandlers = function(context) {
	    for (var i in context) {
	        if (typeof context[i] === 'function' && i.indexOf('_on') === 0) {
	            context[i] = context[i].bind(context);
	        }
	    }
	};

	/**
	 * Set the 'options' property on `obj` with properties
	 * from the `options` argument. Properties in the `options`
	 * object will override existing properties.
	 *
	 * @param {Object} obj destination object
	 * @param {Object} options object of override options
	 * @returns {Object} derived options object.
	 * @private
	 */
	exports.setOptions = function(obj, options) {
	    if (!obj.hasOwnProperty('options')) {
	        obj.options = obj.options ? Object.create(obj.options) : {};
	    }
	    for (var i in options) {
	        obj.options[i] = options[i];
	    }
	    return obj.options;
	};

	/**
	 * Given a list of coordinates, get their center as a coordinate.
	 * @param {Array<Coordinate>} coords
	 * @returns {Coordinate} centerpoint
	 * @private
	 */
	exports.getCoordinatesCenter = function(coords) {
	    var minX = Infinity;
	    var minY = Infinity;
	    var maxX = -Infinity;
	    var maxY = -Infinity;

	    for (var i = 0; i < coords.length; i++) {
	        minX = Math.min(minX, coords[i].column);
	        minY = Math.min(minY, coords[i].row);
	        maxX = Math.max(maxX, coords[i].column);
	        maxY = Math.max(maxY, coords[i].row);
	    }

	    var dx = maxX - minX;
	    var dy = maxY - minY;
	    var dMax = Math.max(dx, dy);
	    return new Coordinate((minX + maxX) / 2, (minY + maxY) / 2, 0)
	        .zoomTo(Math.floor(-Math.log(dMax) / Math.LN2));
	};

	/**
	 * Determine if a string ends with a particular substring
	 * @param {string} string
	 * @param {string} suffix
	 * @returns {boolean}
	 * @private
	 */
	exports.endsWith = function(string, suffix) {
	    return string.indexOf(suffix, string.length - suffix.length) !== -1;
	};

	/**
	 * Determine if a string starts with a particular substring
	 * @param {string} string
	 * @param {string} prefix
	 * @returns {boolean}
	 * @private
	 */
	exports.startsWith = function(string, prefix) {
	    return string.indexOf(prefix) === 0;
	};

	/**
	 * Create an object by mapping all the values of an existing object while
	 * preserving their keys.
	 * @param {Object} input
	 * @param {Function} iterator
	 * @returns {Object}
	 * @private
	 */
	exports.mapObject = function(input, iterator, context) {
	    var output = {};
	    for (var key in input) {
	        output[key] = iterator.call(context || this, input[key], key, input);
	    }
	    return output;
	};

	/**
	 * Create an object by filtering out values of an existing object
	 * @param {Object} input
	 * @param {Function} iterator
	 * @returns {Object}
	 * @private
	 */
	exports.filterObject = function(input, iterator, context) {
	    var output = {};
	    for (var key in input) {
	        if (iterator.call(context || this, input[key], key, input)) {
	            output[key] = input[key];
	        }
	    }
	    return output;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	/*
	 * Copyright (C) 2008 Apple Inc. All Rights Reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions
	 * are met:
	 * 1. Redistributions of source code must retain the above copyright
	 *    notice, this list of conditions and the following disclaimer.
	 * 2. Redistributions in binary form must reproduce the above copyright
	 *    notice, this list of conditions and the following disclaimer in the
	 *    documentation and/or other materials provided with the distribution.
	 *
	 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
	 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
	 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
	 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
	 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
	 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
	 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 *
	 * Ported from Webkit
	 * http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/platform/graphics/UnitBezier.h
	 */

	module.exports = UnitBezier;

	function UnitBezier(p1x, p1y, p2x, p2y) {
	    // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).
	    this.cx = 3.0 * p1x;
	    this.bx = 3.0 * (p2x - p1x) - this.cx;
	    this.ax = 1.0 - this.cx - this.bx;

	    this.cy = 3.0 * p1y;
	    this.by = 3.0 * (p2y - p1y) - this.cy;
	    this.ay = 1.0 - this.cy - this.by;

	    this.p1x = p1x;
	    this.p1y = p2y;
	    this.p2x = p2x;
	    this.p2y = p2y;
	}

	UnitBezier.prototype.sampleCurveX = function(t) {
	    // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
	    return ((this.ax * t + this.bx) * t + this.cx) * t;
	};

	UnitBezier.prototype.sampleCurveY = function(t) {
	    return ((this.ay * t + this.by) * t + this.cy) * t;
	};

	UnitBezier.prototype.sampleCurveDerivativeX = function(t) {
	    return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
	};

	UnitBezier.prototype.solveCurveX = function(x, epsilon) {
	    if (typeof epsilon === 'undefined') epsilon = 1e-6;

	    var t0, t1, t2, x2, i;

	    // First try a few iterations of Newton's method -- normally very fast.
	    for (t2 = x, i = 0; i < 8; i++) {

	        x2 = this.sampleCurveX(t2) - x;
	        if (Math.abs(x2) < epsilon) return t2;

	        var d2 = this.sampleCurveDerivativeX(t2);
	        if (Math.abs(d2) < 1e-6) break;

	        t2 = t2 - x2 / d2;
	    }

	    // Fall back to the bisection method for reliability.
	    t0 = 0.0;
	    t1 = 1.0;
	    t2 = x;

	    if (t2 < t0) return t0;
	    if (t2 > t1) return t1;

	    while (t0 < t1) {

	        x2 = this.sampleCurveX(t2);
	        if (Math.abs(x2 - x) < epsilon) return t2;

	        if (x > x2) {
	            t0 = t2;
	        } else {
	            t1 = t2;
	        }

	        t2 = (t1 - t0) * 0.5 + t0;
	    }

	    // Failure.
	    return t2;
	};

	UnitBezier.prototype.solve = function(x, epsilon) {
	    return this.sampleCurveY(this.solveCurveX(x, epsilon));
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	module.exports = Coordinate;

	/**
	 * A coordinate is a column, row, zoom combination, often used
	 * as the data component of a tile.
	 *
	 * @param {number} column
	 * @param {number} row
	 * @param {number} zoom
	 * @private
	 */
	function Coordinate(column, row, zoom) {
	    this.column = column;
	    this.row = row;
	    this.zoom = zoom;
	}

	Coordinate.prototype = {

	    /**
	     * Create a clone of this coordinate that can be mutated without
	     * changing the original coordinate
	     *
	     * @returns {Coordinate} clone
	     * @private
	     * var coord = new Coordinate(0, 0, 0);
	     * var c2 = coord.clone();
	     * // since coord is cloned, modifying a property of c2 does
	     * // not modify it.
	     * c2.zoom = 2;
	     */
	    clone: function() {
	        return new Coordinate(this.column, this.row, this.zoom);
	    },

	    /**
	     * Zoom this coordinate to a given zoom level. This returns a new
	     * coordinate object, not mutating the old one.
	     *
	     * @param {number} zoom
	     * @returns {Coordinate} zoomed coordinate
	     * @private
	     * @example
	     * var coord = new Coordinate(0, 0, 0);
	     * var c2 = coord.zoomTo(1);
	     * c2 // equals new Coordinate(0, 0, 1);
	     */
	    zoomTo: function(zoom) { return this.clone()._zoomTo(zoom); },

	    /**
	     * Subtract the column and row values of this coordinate from those
	     * of another coordinate. The other coordinat will be zoomed to the
	     * same level as `this` before the subtraction occurs
	     *
	     * @param {Coordinate} c other coordinate
	     * @returns {Coordinate} result
	     * @private
	     */
	    sub: function(c) { return this.clone()._sub(c); },

	    _zoomTo: function(zoom) {
	        var scale = Math.pow(2, zoom - this.zoom);
	        this.column *= scale;
	        this.row *= scale;
	        this.zoom = zoom;
	        return this;
	    },

	    _sub: function(c) {
	        c = c.zoomTo(this.zoom);
	        this.column -= c.column;
	        this.row -= c.row;
	        return this;
	    }
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Canvas = __webpack_require__(10);

	/*
	 * Unlike js/util/browser.js, this code is written with the expectation
	 * of a browser environment with a global 'window' object
	 */

	/**
	 * Provides a function that outputs milliseconds: either performance.now()
	 * or a fallback to Date.now()
	 * @private
	 */
	module.exports.now = (function() {
	    if (window.performance &&
	        window.performance.now) {
	        return window.performance.now.bind(window.performance);
	    } else {
	        return Date.now.bind(Date);
	    }
	}());

	var frame = window.requestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.msRequestAnimationFrame;

	exports.frame = function(fn) {
	    return frame(fn);
	};

	var cancel = window.cancelAnimationFrame ||
	    window.mozCancelAnimationFrame ||
	    window.webkitCancelAnimationFrame ||
	    window.msCancelAnimationFrame;

	exports.cancelFrame = function(id) {
	    cancel(id);
	};

	exports.timed = function (fn, dur, ctx) {
	    if (!dur) {
	        fn.call(ctx, 1);
	        return null;
	    }

	    var abort = false,
	        start = module.exports.now();

	    function tick(now) {
	        if (abort) return;
	        now = module.exports.now();

	        if (now >= start + dur) {
	            fn.call(ctx, 1);
	        } else {
	            fn.call(ctx, (now - start) / dur);
	            exports.frame(tick);
	        }
	    }

	    exports.frame(tick);

	    return function() { abort = true; };
	};

	exports.supportsWebGL = {};

	/**
	 * Test whether the basic JavaScript and DOM features required for Mapbox GL are present.
	 * @param {Object} options
	 * @param {boolean} [options.failIfMajorPerformanceCaveat=false] If `true`, map creation will fail if the implementation determines that the performance of the created WebGL context would be dramatically lower than expected.
	 * @return {boolean} Returns true if Mapbox GL should be expected to work, and false if not.
	 * @memberof mapboxgl
	 * @static
	 */
	exports.supported = function(options) {

	    var supports = [

	        function() { return typeof window !== 'undefined'; },

	        function() { return typeof document !== 'undefined'; },

	        function () {
	            return !!(Array.prototype &&
	                Array.prototype.every &&
	                Array.prototype.filter &&
	                Array.prototype.forEach &&
	                Array.prototype.indexOf &&
	                Array.prototype.lastIndexOf &&
	                Array.prototype.map &&
	                Array.prototype.some &&
	                Array.prototype.reduce &&
	                Array.prototype.reduceRight &&
	                Array.isArray);
	        },

	        function() {
	            return !!(Function.prototype && Function.prototype.bind) &&
	                !!(Object.keys &&
	                    Object.create &&
	                    Object.getPrototypeOf &&
	                    Object.getOwnPropertyNames &&
	                    Object.isSealed &&
	                    Object.isFrozen &&
	                    Object.isExtensible &&
	                    Object.getOwnPropertyDescriptor &&
	                    Object.defineProperty &&
	                    Object.defineProperties &&
	                    Object.seal &&
	                    Object.freeze &&
	                    Object.preventExtensions);
	        },

	        function() {
	            return 'JSON' in window && 'parse' in JSON && 'stringify' in JSON;
	        },

	        function() {
	            var opt = (options && options.failIfMajorPerformanceCaveat) || false,
	                fimpc = 'fimpc_' + String(opt);
	            if (exports.supportsWebGL[fimpc] === undefined) {
	                var canvas = new Canvas();
	                exports.supportsWebGL[fimpc] = canvas.supportsWebGLContext(opt);
	            }
	            return exports.supportsWebGL[fimpc];
	        },

	        function() { return 'Worker' in window; }
	    ];

	    for (var i = 0; i < supports.length; i++) {
	        if (!supports[i]()) return false;
	    }
	    return true;
	};

	exports.hardwareConcurrency = navigator.hardwareConcurrency || 8;

	Object.defineProperty(exports, 'devicePixelRatio', {
	    get: function() { return window.devicePixelRatio; }
	});

	exports.supportsWebp = false;

	var webpImgTest = document.createElement('img');
	webpImgTest.onload = function() {
	    exports.supportsWebp = true;
	};
	webpImgTest.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA=';


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);

	/**
	 * Methods mixed in to other classes for event capabilities.
	 * @mixin Evented
	 */
	var Evented = {

	    /**
	     * Subscribe to a specified event with a listener function the latter gets the data object that was passed to `fire` and additionally `target` and `type` properties
	     *
	     * @param {string} type Event type
	     * @param {Function} listener Function to be called when the event is fired
	     */
	    on: function(type, fn) {
	        this._events = this._events || {};
	        this._events[type] = this._events[type] || [];
	        this._events[type].push(fn);

	        return this;
	    },

	    /**
	     * Remove a event listener
	     *
	     * @param {string} [type] Event type. If none is specified, remove all listeners
	     * @param {Function} [listener] Function to be called when the event is fired. If none is specified all listeners are removed
	     */
	    off: function(type, fn) {
	        if (!type) {
	            // clear all listeners if no arguments specified
	            delete this._events;
	            return this;
	        }

	        if (!this.listens(type)) return this;

	        if (fn) {
	            var idx = this._events[type].indexOf(fn);
	            if (idx >= 0) {
	                this._events[type].splice(idx, 1);
	            }
	            if (!this._events[type].length) {
	                delete this._events[type];
	            }
	        } else {
	            delete this._events[type];
	        }

	        return this;
	    },

	    /**
	     * Call a function once when an event has fired
	     *
	     * @param {string} type Event type.
	     * @param {Function} listener Function to be called once when the event is fired
	     */
	    once: function(type, fn) {
	        var wrapper = function(data) {
	            this.off(type, wrapper);
	            fn.call(this, data);
	        }.bind(this);
	        this.on(type, wrapper);
	        return this;
	    },

	    /**
	     * Fire event of a given string type with the given data object
	     *
	     * @param {string} type Event type
	     * @param {Object} [data] Optional data passed to the event receiver (e.g. {@link #EventData})
	     * @returns {Object} `this`
	     */
	    fire: function(type, data) {
	        if (!this.listens(type)) return this;

	        data = util.extend({}, data);
	        util.extend(data, {type: type, target: this});

	        // make sure adding/removing listeners inside other listeners won't cause infinite loop
	        var listeners = this._events[type].slice();

	        for (var i = 0; i < listeners.length; i++) {
	            listeners[i].call(this, data);
	        }

	        return this;
	    },

	    /**
	     * Check if an event is registered to a type
	     * @param {string} type Event type
	     * @returns {boolean} `true` if there is at least one registered listener for events of type `type`
	     */
	    listens: function(type) {
	        return !!(this._events && this._events[type]);
	    }
	};

	module.exports = Evented;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Point = __webpack_require__(17);

	exports.create = function (tagName, className, container) {
	    var el = document.createElement(tagName);
	    if (className) el.className = className;
	    if (container) container.appendChild(el);
	    return el;
	};

	var docStyle = document.documentElement.style;

	function testProp(props) {
	    for (var i = 0; i < props.length; i++) {
	        if (props[i] in docStyle) {
	            return props[i];
	        }
	    }
	}

	var selectProp = testProp(['userSelect', 'MozUserSelect', 'WebkitUserSelect', 'msUserSelect']),
	    userSelect;
	exports.disableDrag = function () {
	    if (selectProp) {
	        userSelect = docStyle[selectProp];
	        docStyle[selectProp] = 'none';
	    }
	};
	exports.enableDrag = function () {
	    if (selectProp) {
	        docStyle[selectProp] = userSelect;
	    }
	};

	var transformProp = testProp(['transform', 'WebkitTransform']);
	exports.setTransform = function(el, value) {
	    el.style[transformProp] = value;
	};

	// Suppress the next click, but only if it's immediate.
	function suppressClick(e) {
	    e.preventDefault();
	    e.stopPropagation();
	    window.removeEventListener('click', suppressClick, true);
	}
	exports.suppressClick = function() {
	    window.addEventListener('click', suppressClick, true);
	    window.setTimeout(function() {
	        window.removeEventListener('click', suppressClick, true);
	    }, 0);
	};

	exports.mousePos = function (el, e) {
	    var rect = el.getBoundingClientRect();
	    e = e.touches ? e.touches[0] : e;
	    return new Point(
	        e.clientX - rect.left - el.clientLeft,
	        e.clientY - rect.top - el.clientTop);
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	module.exports = Point;

	function Point(x, y) {
	    this.x = x;
	    this.y = y;
	}

	Point.prototype = {
	    clone: function() { return new Point(this.x, this.y); },

	    add:     function(p) { return this.clone()._add(p);     },
	    sub:     function(p) { return this.clone()._sub(p);     },
	    mult:    function(k) { return this.clone()._mult(k);    },
	    div:     function(k) { return this.clone()._div(k);     },
	    rotate:  function(a) { return this.clone()._rotate(a);  },
	    matMult: function(m) { return this.clone()._matMult(m); },
	    unit:    function() { return this.clone()._unit(); },
	    perp:    function() { return this.clone()._perp(); },
	    round:   function() { return this.clone()._round(); },

	    mag: function() {
	        return Math.sqrt(this.x * this.x + this.y * this.y);
	    },

	    equals: function(p) {
	        return this.x === p.x &&
	               this.y === p.y;
	    },

	    dist: function(p) {
	        return Math.sqrt(this.distSqr(p));
	    },

	    distSqr: function(p) {
	        var dx = p.x - this.x,
	            dy = p.y - this.y;
	        return dx * dx + dy * dy;
	    },

	    angle: function() {
	        return Math.atan2(this.y, this.x);
	    },

	    angleTo: function(b) {
	        return Math.atan2(this.y - b.y, this.x - b.x);
	    },

	    angleWith: function(b) {
	        return this.angleWithSep(b.x, b.y);
	    },

	    // Find the angle of the two vectors, solving the formula for the cross product a x b = |a||b|sin(θ) for θ.
	    angleWithSep: function(x, y) {
	        return Math.atan2(
	            this.x * y - this.y * x,
	            this.x * x + this.y * y);
	    },

	    _matMult: function(m) {
	        var x = m[0] * this.x + m[1] * this.y,
	            y = m[2] * this.x + m[3] * this.y;
	        this.x = x;
	        this.y = y;
	        return this;
	    },

	    _add: function(p) {
	        this.x += p.x;
	        this.y += p.y;
	        return this;
	    },

	    _sub: function(p) {
	        this.x -= p.x;
	        this.y -= p.y;
	        return this;
	    },

	    _mult: function(k) {
	        this.x *= k;
	        this.y *= k;
	        return this;
	    },

	    _div: function(k) {
	        this.x /= k;
	        this.y /= k;
	        return this;
	    },

	    _unit: function() {
	        this._div(this.mag());
	        return this;
	    },

	    _perp: function() {
	        var y = this.y;
	        this.y = this.x;
	        this.x = -y;
	        return this;
	    },

	    _rotate: function(angle) {
	        var cos = Math.cos(angle),
	            sin = Math.sin(angle),
	            x = cos * this.x - sin * this.y,
	            y = sin * this.x + cos * this.y;
	        this.x = x;
	        this.y = y;
	        return this;
	    },

	    _round: function() {
	        this.x = Math.round(this.x);
	        this.y = Math.round(this.y);
	        return this;
	    }
	};

	// constructs Point from an array if necessary
	Point.convert = function (a) {
	    if (a instanceof Point) {
	        return a;
	    }
	    if (Array.isArray(a)) {
	        return new Point(a[0], a[1]);
	    }
	    return a;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	var Evented = __webpack_require__(15);
	var styleBatch = __webpack_require__(19);
	var StyleLayer = __webpack_require__(36);
	var ImageSprite = __webpack_require__(75);
	var GlyphSource = __webpack_require__(76);
	var SpriteAtlas = __webpack_require__(87);
	var LineAtlas = __webpack_require__(88);
	var util = __webpack_require__(11);
	var ajax = __webpack_require__(21);
	var normalizeURL = __webpack_require__(27).normalizeStyleURL;
	var browser = __webpack_require__(14);
	var Dispatcher = __webpack_require__(89);
	var AnimationLoop = __webpack_require__(129);
	var validateStyle = __webpack_require__(46);

	module.exports = Style;

	function Style(stylesheet, animationLoop) {
	    this.animationLoop = animationLoop || new AnimationLoop();
	    this.dispatcher = new Dispatcher(Math.max(browser.hardwareConcurrency - 1, 1), this);
	    this.spriteAtlas = new SpriteAtlas(512, 512);
	    this.lineAtlas = new LineAtlas(256, 512);

	    this._layers = {};
	    this._order  = [];
	    this._groups = [];
	    this.sources = {};

	    this.zoomHistory = {};

	    util.bindAll([
	        '_forwardSourceEvent',
	        '_forwardTileEvent',
	        '_forwardLayerEvent',
	        '_redoPlacement'
	    ], this);

	    var loaded = function(err, stylesheet) {
	        if (err) {
	            this.fire('error', {error: err});
	            return;
	        }

	        if (validateStyle.emitErrors(this, validateStyle(stylesheet))) return;

	        this._loaded = true;
	        this.stylesheet = stylesheet;

	        var sources = stylesheet.sources;
	        for (var id in sources) {
	            this.addSource(id, sources[id]);
	        }

	        if (stylesheet.sprite) {
	            this.sprite = new ImageSprite(stylesheet.sprite);
	            this.sprite.on('load', this.fire.bind(this, 'change'));
	        }

	        this.glyphSource = new GlyphSource(stylesheet.glyphs);
	        this._resolve();
	        this.fire('load');
	    }.bind(this);

	    if (typeof stylesheet === 'string') {
	        ajax.getJSON(normalizeURL(stylesheet), loaded);
	    } else {
	        browser.frame(loaded.bind(this, null, stylesheet));
	    }

	    this.on('source.load', function(event) {
	        var source = event.source;
	        if (source && source.vectorLayerIds) {
	            for (var layerId in this._layers) {
	                var layer = this._layers[layerId];
	                if (layer.source === source.id) {
	                    this._validateLayer(layer);
	                }
	            }
	        }
	    });
	}

	Style.prototype = util.inherit(Evented, {
	    _loaded: false,

	    _validateLayer: function(layer) {
	        var source = this.sources[layer.source];

	        if (!layer.sourceLayer) return;
	        if (!source) return;
	        if (!source.vectorLayerIds) return;

	        if (source.vectorLayerIds.indexOf(layer.sourceLayer) === -1) {
	            this.fire('error', {
	                error: new Error(
	                    'Source layer "' + layer.sourceLayer + '" ' +
	                    'does not exist on source "' + source.id + '" ' +
	                    'as specified by style layer "' + layer.id + '"'
	                )
	            });
	        }
	    },

	    loaded: function() {
	        if (!this._loaded)
	            return false;

	        for (var id in this.sources)
	            if (!this.sources[id].loaded())
	                return false;

	        if (this.sprite && !this.sprite.loaded())
	            return false;

	        return true;
	    },

	    _resolve: function() {
	        var layer, layerJSON;

	        this._layers = {};
	        this._order  = this.stylesheet.layers.map(function(layer) {
	            return layer.id;
	        });

	        // resolve all layers WITHOUT a ref
	        for (var i = 0; i < this.stylesheet.layers.length; i++) {
	            layerJSON = this.stylesheet.layers[i];
	            if (layerJSON.ref) continue;
	            layer = StyleLayer.create(layerJSON);
	            this._layers[layer.id] = layer;
	            layer.on('error', this._forwardLayerEvent);
	        }

	        // resolve all layers WITH a ref
	        for (var j = 0; j < this.stylesheet.layers.length; j++) {
	            layerJSON = this.stylesheet.layers[j];
	            if (!layerJSON.ref) continue;
	            var refLayer = this.getLayer(layerJSON.ref);
	            layer = StyleLayer.create(layerJSON, refLayer);
	            this._layers[layer.id] = layer;
	            layer.on('error', this._forwardLayerEvent);
	        }

	        this._groupLayers();
	        this._broadcastLayers();
	    },

	    _groupLayers: function() {
	        var group;

	        this._groups = [];

	        // Split into groups of consecutive top-level layers with the same source.
	        for (var i = 0; i < this._order.length; ++i) {
	            var layer = this._layers[this._order[i]];

	            if (!group || layer.source !== group.source) {
	                group = [];
	                group.source = layer.source;
	                this._groups.push(group);
	            }

	            group.push(layer);
	        }
	    },

	    _broadcastLayers: function() {
	        this.dispatcher.broadcast('set layers', this._order.map(function(id) {
	            return this._layers[id].serialize({includeRefProperties: true});
	        }, this));
	    },

	    _cascade: function(classes, options) {
	        if (!this._loaded) return;

	        options = options || {
	            transition: true
	        };

	        for (var id in this._layers) {
	            this._layers[id].cascade(classes, options,
	                this.stylesheet.transition || {},
	                this.animationLoop);
	        }

	        this.fire('change');
	    },

	    _recalculate: function(z) {
	        for (var sourceId in this.sources)
	            this.sources[sourceId].used = false;

	        this._updateZoomHistory(z);

	        this.rasterFadeDuration = 300;
	        for (var layerId in this._layers) {
	            var layer = this._layers[layerId];

	            layer.recalculate(z, this.zoomHistory);
	            if (!layer.isHidden(z) && layer.source) {
	                this.sources[layer.source].used = true;
	            }
	        }

	        var maxZoomTransitionDuration = 300;
	        if (Math.floor(this.z) !== Math.floor(z)) {
	            this.animationLoop.set(maxZoomTransitionDuration);
	        }

	        this.z = z;
	        this.fire('zoom');
	    },

	    _updateZoomHistory: function(z) {

	        var zh = this.zoomHistory;

	        if (zh.lastIntegerZoom === undefined) {
	            // first time
	            zh.lastIntegerZoom = Math.floor(z);
	            zh.lastIntegerZoomTime = 0;
	            zh.lastZoom = z;
	        }

	        // check whether an integer zoom level as passed since the last frame
	        // and if yes, record it with the time. Used for transitioning patterns.
	        if (Math.floor(zh.lastZoom) < Math.floor(z)) {
	            zh.lastIntegerZoom = Math.floor(z);
	            zh.lastIntegerZoomTime = Date.now();

	        } else if (Math.floor(zh.lastZoom) > Math.floor(z)) {
	            zh.lastIntegerZoom = Math.floor(z + 1);
	            zh.lastIntegerZoomTime = Date.now();
	        }

	        zh.lastZoom = z;
	    },

	    /**
	     * Apply multiple style mutations in a batch
	     * @param {function} work Function which accepts the StyleBatch interface
	     * @private
	     */
	    batch: function(work) {
	        styleBatch(this, work);
	    },

	    addSource: function(id, source) {
	        this.batch(function(batch) {
	            batch.addSource(id, source);
	        });

	        return this;
	    },

	    /**
	     * Remove a source from this stylesheet, given its id.
	     * @param {string} id id of the source to remove
	     * @returns {Style} this style
	     * @throws {Error} if no source is found with the given ID
	     * @private
	     */
	    removeSource: function(id) {
	        this.batch(function(batch) {
	            batch.removeSource(id);
	        });

	        return this;
	    },

	    /**
	     * Get a source by id.
	     * @param {string} id id of the desired source
	     * @returns {Object} source
	     * @private
	     */
	    getSource: function(id) {
	        return this.sources[id];
	    },

	    /**
	     * Add a layer to the map style. The layer will be inserted before the layer with
	     * ID `before`, or appended if `before` is omitted.
	     * @param {StyleLayer|Object} layer
	     * @param {string=} before  ID of an existing layer to insert before
	     * @fires layer.add
	     * @returns {Style} `this`
	     * @private
	     */
	    addLayer: function(layer, before) {
	        this.batch(function(batch) {
	            batch.addLayer(layer, before);
	        });

	        return this;
	    },

	    /**
	     * Remove a layer from this stylesheet, given its id.
	     * @param {string} id id of the layer to remove
	     * @returns {Style} this style
	     * @throws {Error} if no layer is found with the given ID
	     * @private
	     */
	    removeLayer: function(id) {
	        this.batch(function(batch) {
	            batch.removeLayer(id);
	        });

	        return this;
	    },

	    /**
	     * Return the style layer object with the given `id`.
	     *
	     * @param {string} id - id of the desired layer
	     * @returns {?Object} a layer, if one with the given `id` exists
	     * @private
	     */
	    getLayer: function(id) {
	        return this._layers[id];
	    },

	    /**
	     * If a layer has a `ref` property that makes it derive some values
	     * from another layer, return that referent layer. Otherwise,
	     * returns the layer itself.
	     * @param {string} id the layer's id
	     * @returns {Layer} the referent layer or the layer itself
	     * @private
	     */
	    getReferentLayer: function(id) {
	        var layer = this.getLayer(id);
	        if (layer.ref) {
	            layer = this.getLayer(layer.ref);
	        }
	        return layer;
	    },

	    setFilter: function(layer, filter) {
	        this.batch(function(batch) {
	            batch.setFilter(layer, filter);
	        });

	        return this;
	    },

	    setLayerZoomRange: function(layerId, minzoom, maxzoom) {
	        this.batch(function(batch) {
	            batch.setLayerZoomRange(layerId, minzoom, maxzoom);
	        });

	        return this;
	    },

	    /**
	     * Get a layer's filter object
	     * @param {string} layer the layer to inspect
	     * @returns {*} the layer's filter, if any
	     * @private
	     */
	    getFilter: function(layer) {
	        return this.getReferentLayer(layer).filter;
	    },

	    /**
	     * Get a layout property's value from a given layer
	     * @param {string} layer the layer to inspect
	     * @param {string} name the name of the layout property
	     * @returns {*} the property value
	     * @private
	     */
	    getLayoutProperty: function(layer, name) {
	        return this.getReferentLayer(layer).getLayoutProperty(name);
	    },

	    getPaintProperty: function(layer, name, klass) {
	        return this.getLayer(layer).getPaintProperty(name, klass);
	    },

	    serialize: function() {
	        return util.filterObject({
	            version: this.stylesheet.version,
	            name: this.stylesheet.name,
	            metadata: this.stylesheet.metadata,
	            center: this.stylesheet.center,
	            zoom: this.stylesheet.zoom,
	            bearing: this.stylesheet.bearing,
	            pitch: this.stylesheet.pitch,
	            sprite: this.stylesheet.sprite,
	            glyphs: this.stylesheet.glyphs,
	            transition: this.stylesheet.transition,
	            sources: util.mapObject(this.sources, function(source) {
	                return source.serialize();
	            }),
	            layers: this._order.map(function(id) {
	                return this._layers[id].serialize();
	            }, this)
	        }, function(value) { return value !== undefined; });
	    },

	    featuresAt: function(coord, params, callback) {
	        this._queryFeatures('featuresAt', coord, params, callback);
	    },

	    featuresIn: function(bbox, params, callback) {
	        this._queryFeatures('featuresIn', bbox, params, callback);
	    },

	    _queryFeatures: function(queryType, bboxOrCoords, params, callback) {
	        var features = [];
	        var error = null;

	        if (params.layer) {
	            params.layerIds = Array.isArray(params.layer) ? params.layer : [params.layer];
	        }

	        util.asyncAll(Object.keys(this.sources), function(id, callback) {
	            var source = this.sources[id];
	            source[queryType](bboxOrCoords, params, function(err, result) {
	                if (result) features = features.concat(result);
	                if (err) error = err;
	                callback();
	            });
	        }.bind(this), function() {
	            if (error) return callback(error);

	            callback(null, features
	                .filter(function(feature) {
	                    return this._layers[feature.layer] !== undefined;
	                }.bind(this))
	                .map(function(feature) {
	                    feature.layer = this._layers[feature.layer].serialize({
	                        includeRefProperties: true
	                    });
	                    return feature;
	                }.bind(this)));
	        }.bind(this));
	    },

	    _remove: function() {
	        this.dispatcher.remove();
	    },

	    _reloadSource: function(id) {
	        this.sources[id].reload();
	    },

	    _updateSources: function(transform) {
	        for (var id in this.sources) {
	            this.sources[id].update(transform);
	        }
	    },

	    _redoPlacement: function() {
	        for (var id in this.sources) {
	            if (this.sources[id].redoPlacement) this.sources[id].redoPlacement();
	        }
	    },

	    _forwardSourceEvent: function(e) {
	        this.fire('source.' + e.type, util.extend({source: e.target}, e));
	    },

	    _forwardTileEvent: function(e) {
	        this.fire(e.type, util.extend({source: e.target}, e));
	    },

	    _forwardLayerEvent: function(e) {
	        this.fire('layer.' + e.type, util.extend({layer: {id: e.target.id}}, e));
	    },

	    // Callbacks from web workers

	    'get sprite json': function(params, callback) {
	        var sprite = this.sprite;
	        if (sprite.loaded()) {
	            callback(null, { sprite: sprite.data, retina: sprite.retina });
	        } else {
	            sprite.on('load', function() {
	                callback(null, { sprite: sprite.data, retina: sprite.retina });
	            });
	        }
	    },

	    'get icons': function(params, callback) {
	        var sprite = this.sprite;
	        var spriteAtlas = this.spriteAtlas;
	        if (sprite.loaded()) {
	            spriteAtlas.setSprite(sprite);
	            spriteAtlas.addIcons(params.icons, callback);
	        } else {
	            sprite.on('load', function() {
	                spriteAtlas.setSprite(sprite);
	                spriteAtlas.addIcons(params.icons, callback);
	            });
	        }
	    },

	    'get glyphs': function(params, callback) {
	        var stacks = params.stacks,
	            remaining = Object.keys(stacks).length,
	            allGlyphs = {};

	        for (var fontName in stacks) {
	            this.glyphSource.getSimpleGlyphs(fontName, stacks[fontName], params.uid, done);
	        }

	        function done(err, glyphs, fontName) {
	            if (err) console.error(err);

	            allGlyphs[fontName] = glyphs;
	            remaining--;

	            if (remaining === 0)
	                callback(null, allGlyphs);
	        }
	    }
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Source = __webpack_require__(20);
	var StyleLayer = __webpack_require__(36);
	var validateStyle = __webpack_require__(46);
	var styleSpec = __webpack_require__(43);

	function styleBatch(style, work) {
	    if (!style._loaded) {
	        throw new Error('Style is not done loading');
	    }

	    var batch = Object.create(styleBatch.prototype);

	    batch._style = style;
	    batch._groupLayers = false;
	    batch._broadcastLayers = false;
	    batch._reloadSources = {};
	    batch._events = [];
	    batch._change = false;

	    work(batch);

	    if (batch._groupLayers) {
	        batch._style._groupLayers();
	    }

	    if (batch._broadcastLayers) {
	        batch._style._broadcastLayers();
	    }

	    Object.keys(batch._reloadSources).forEach(function(sourceId) {
	        batch._style._reloadSource(sourceId);
	    });

	    batch._events.forEach(function(args) {
	        batch._style.fire.apply(batch._style, args);
	    });

	    if (batch._change) {
	        batch._style.fire('change');
	    }
	}

	styleBatch.prototype = {

	    addLayer: function(layer, before) {
	        if (!(layer instanceof StyleLayer)) {
	            if (validateStyle.emitErrors(this._style, validateStyle.layer({
	                value: layer,
	                style: this._style.serialize(),
	                styleSpec: styleSpec,
	                // this layer is not in the style.layers array, so we pass an
	                // impossible array index
	                arrayIndex: -1
	            }))) return this;

	            var refLayer = layer.ref && this._style.getLayer(layer.ref);
	            layer = StyleLayer.create(layer, refLayer);
	        }
	        this._style._validateLayer(layer);

	        layer.on('error', this._style._forwardLayerEvent);

	        this._style._layers[layer.id] = layer;
	        this._style._order.splice(before ? this._style._order.indexOf(before) : Infinity, 0, layer.id);

	        this._groupLayers = true;
	        this._broadcastLayers = true;
	        if (layer.source) {
	            this._reloadSources[layer.source] = true;
	        }
	        this._events.push(['layer.add', {layer: layer}]);
	        this._change = true;

	        return this;
	    },

	    removeLayer: function(id) {
	        var layer = this._style._layers[id];
	        if (layer === undefined) {
	            throw new Error('There is no layer with this ID');
	        }
	        for (var i in this._style._layers) {
	            if (this._style._layers[i].ref === id) {
	                this.removeLayer(i);
	            }
	        }

	        layer.off('error', this._style._forwardLayerEvent);

	        delete this._style._layers[id];
	        this._style._order.splice(this._style._order.indexOf(id), 1);

	        this._groupLayers = true;
	        this._broadcastLayers = true;
	        this._events.push(['layer.remove', {layer: layer}]);
	        this._change = true;

	        return this;
	    },

	    setPaintProperty: function(layer, name, value, klass) {
	        this._style.getLayer(layer).setPaintProperty(name, value, klass);
	        this._change = true;

	        return this;
	    },

	    setLayoutProperty: function(layer, name, value) {
	        layer = this._style.getReferentLayer(layer);
	        layer.setLayoutProperty(name, value);

	        this._broadcastLayers = true;
	        if (layer.source) {
	            this._reloadSources[layer.source] = true;
	        }
	        this._change = true;

	        return this;
	    },

	    setFilter: function(layer, filter) {
	        if (validateStyle.emitErrors(this._style, validateStyle.filter({
	            value: filter,
	            style: this._style.serialize(),
	            styleSpec: styleSpec
	        }))) return this;

	        layer = this._style.getReferentLayer(layer);
	        layer.filter = filter;

	        this._broadcastLayers = true;
	        if (layer.source) {
	            this._reloadSources[layer.source] = true;
	        }
	        this._change = true;

	        return this;
	    },

	    setLayerZoomRange: function(layerId, minzoom, maxzoom) {
	        var layer = this._style.getReferentLayer(layerId);
	        if (minzoom != null) {
	            layer.minzoom = minzoom;
	        }
	        if (maxzoom != null) {
	            layer.maxzoom = maxzoom;
	        }

	        this._broadcastLayers = true;
	        if (layer.source) {
	            this._reloadSources[layer.source] = true;
	        }
	        this._change = true;

	        return this;
	    },

	    addSource: function(id, source) {
	        if (!this._style._loaded) {
	            throw new Error('Style is not done loading');
	        }
	        if (this._style.sources[id] !== undefined) {
	            throw new Error('There is already a source with this ID');
	        }

	        if (!Source.is(source)) {
	            if (validateStyle.emitErrors(this._style, validateStyle.source({
	                style: this._style.serialize(),
	                value: source,
	                styleSpec: styleSpec
	            }))) return this;
	        }

	        source = Source.create(source);
	        this._style.sources[id] = source;
	        source.id = id;
	        source.style = this._style;
	        source.dispatcher = this._style.dispatcher;
	        source
	            .on('load', this._style._forwardSourceEvent)
	            .on('error', this._style._forwardSourceEvent)
	            .on('change', this._style._forwardSourceEvent)
	            .on('tile.add', this._style._forwardTileEvent)
	            .on('tile.load', this._style._forwardTileEvent)
	            .on('tile.error', this._style._forwardTileEvent)
	            .on('tile.remove', this._style._forwardTileEvent)
	            .on('tile.stats', this._style._forwardTileEvent);

	        this._events.push(['source.add', {source: source}]);
	        this._change = true;

	        return this;
	    },

	    removeSource: function(id) {
	        if (this._style.sources[id] === undefined) {
	            throw new Error('There is no source with this ID');
	        }
	        var source = this._style.sources[id];
	        delete this._style.sources[id];
	        source
	            .off('load', this._style._forwardSourceEvent)
	            .off('error', this._style._forwardSourceEvent)
	            .off('change', this._style._forwardSourceEvent)
	            .off('tile.add', this._style._forwardTileEvent)
	            .off('tile.load', this._style._forwardTileEvent)
	            .off('tile.error', this._style._forwardTileEvent)
	            .off('tile.remove', this._style._forwardTileEvent)
	            .off('tile.stats', this._style._forwardTileEvent);

	        this._events.push(['source.remove', {source: source}]);
	        this._change = true;

	        return this;
	    }
	};

	module.exports = styleBatch;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var ajax = __webpack_require__(21);
	var browser = __webpack_require__(14);
	var TilePyramid = __webpack_require__(22);
	var normalizeURL = __webpack_require__(27).normalizeSourceURL;
	var TileCoord = __webpack_require__(25);

	exports._loadTileJSON = function(options) {
	    var loaded = function(err, tileJSON) {
	        if (err) {
	            this.fire('error', {error: err});
	            return;
	        }

	        util.extend(this, util.pick(tileJSON,
	            ['tiles', 'minzoom', 'maxzoom', 'attribution']));

	        if (tileJSON.vector_layers) {
	            this.vectorLayers = tileJSON.vector_layers;
	            this.vectorLayerIds = this.vectorLayers.map(function(layer) { return layer.id; });
	        }

	        this._pyramid = new TilePyramid({
	            tileSize: this.tileSize,
	            minzoom: this.minzoom,
	            maxzoom: this.maxzoom,
	            roundZoom: this.roundZoom,
	            reparseOverscaled: this.reparseOverscaled,
	            load: this._loadTile.bind(this),
	            abort: this._abortTile.bind(this),
	            unload: this._unloadTile.bind(this),
	            add: this._addTile.bind(this),
	            remove: this._removeTile.bind(this),
	            redoPlacement: this._redoTilePlacement ? this._redoTilePlacement.bind(this) : undefined
	        });

	        this.fire('load');
	    }.bind(this);

	    if (options.url) {
	        ajax.getJSON(normalizeURL(options.url), loaded);
	    } else {
	        browser.frame(loaded.bind(this, null, options));
	    }
	};

	exports.redoPlacement = function() {
	    if (!this._pyramid) {
	        return;
	    }

	    var ids = this._pyramid.orderedIDs();
	    for (var i = 0; i < ids.length; i++) {
	        var tile = this._pyramid.getTile(ids[i]);
	        this._redoTilePlacement(tile);
	    }
	};

	exports._getTile = function(coord) {
	    return this._pyramid.getTile(coord.id);
	};

	exports._getVisibleCoordinates = function() {
	    if (!this._pyramid) return [];
	    else return this._pyramid.renderedIDs().map(TileCoord.fromID);
	};

	exports._vectorFeaturesAt = function(coord, params, callback) {
	    if (!this._pyramid)
	        return callback(null, []);

	    var result = this._pyramid.tileAt(coord);
	    if (!result)
	        return callback(null, []);

	    this.dispatcher.send('query features', {
	        uid: result.tile.uid,
	        x: result.x,
	        y: result.y,
	        scale: result.scale,
	        tileSize: result.tileSize,
	        source: this.id,
	        params: params
	    }, callback, result.tile.workerID);
	};


	exports._vectorFeaturesIn = function(bounds, params, callback) {
	    if (!this._pyramid)
	        return callback(null, []);

	    var results = this._pyramid.tilesIn(bounds);
	    if (!results)
	        return callback(null, []);

	    util.asyncAll(results, function queryTile(result, cb) {
	        this.dispatcher.send('query features', {
	            uid: result.tile.uid,
	            source: this.id,
	            minX: result.minX,
	            maxX: result.maxX,
	            minY: result.minY,
	            maxY: result.maxY,
	            params: params
	        }, cb, result.tile.workerID);
	    }.bind(this), function done(err, features) {
	        callback(err, Array.prototype.concat.apply([], features));
	    });
	};

	/*
	 * Create a tiled data source instance given an options object
	 *
	 * @param {Object} options
	 * @param {string} options.type Either `raster` or `vector`.
	 * @param {string} options.url A tile source URL. This should either be `mapbox://{mapid}` or a full `http[s]` url that points to a TileJSON endpoint.
	 * @param {Array} options.tiles An array of tile sources. If `url` is not specified, `tiles` can be used instead to specify tile sources, as in the TileJSON spec. Other TileJSON keys such as `minzoom` and `maxzoom` can be specified in a source object if `tiles` is used.
	 * @param {string} options.id An optional `id` to assign to the source
	 * @param {number} [options.tileSize=512] Optional tile size (width and height in pixels, assuming tiles are square). This option is only configurable for raster sources
	 * @example
	 * var sourceObj = new mapboxgl.Source.create({
	 *    type: 'vector',
	 *    url: 'mapbox://mapbox.mapbox-streets-v5'
	 * });
	 * map.addSource('some id', sourceObj); // add
	 * map.removeSource('some id');  // remove
	 */
	exports.create = function(source) {
	    // This is not at file scope in order to avoid a circular require.
	    var sources = {
	        vector: __webpack_require__(29),
	        raster: __webpack_require__(30),
	        geojson: __webpack_require__(31),
	        video: __webpack_require__(33),
	        image: __webpack_require__(35)
	    };

	    return exports.is(source) ? source : new sources[source.type](source);
	};

	exports.is = function(source) {
	    // This is not at file scope in order to avoid a circular require.
	    var sources = {
	        vector: __webpack_require__(29),
	        raster: __webpack_require__(30),
	        geojson: __webpack_require__(31),
	        video: __webpack_require__(33),
	        image: __webpack_require__(35)
	    };

	    for (var type in sources) {
	        if (source instanceof sources[type]) {
	            return true;
	        }
	    }

	    return false;
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	exports.getJSON = function(url, callback) {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', url, true);
	    xhr.setRequestHeader('Accept', 'application/json');
	    xhr.onerror = function(e) {
	        callback(e);
	    };
	    xhr.onload = function() {
	        if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
	            var data;
	            try {
	                data = JSON.parse(xhr.response);
	            } catch (err) {
	                return callback(err);
	            }
	            callback(null, data);
	        } else {
	            callback(new Error(xhr.statusText));
	        }
	    };
	    xhr.send();
	    return xhr;
	};

	exports.getArrayBuffer = function(url, callback) {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', url, true);
	    xhr.responseType = 'arraybuffer';
	    xhr.onerror = function(e) {
	        callback(e);
	    };
	    xhr.onload = function() {
	        if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
	            callback(null, xhr.response);
	        } else {
	            callback(new Error(xhr.statusText));
	        }
	    };
	    xhr.send();
	    return xhr;
	};

	function sameOrigin(url) {
	    var a = document.createElement('a');
	    a.href = url;
	    return a.protocol === document.location.protocol && a.host === document.location.host;
	}

	exports.getImage = function(url, callback) {
	    return exports.getArrayBuffer(url, function(err, imgData) {
	        if (err) return callback(err);
	        var img = new Image();
	        img.onload = function() {
	            callback(null, img);
	            (window.URL || window.webkitURL).revokeObjectURL(img.src);
	        };
	        var blob = new Blob([new Uint8Array(imgData)], { type: 'image/png' });
	        img.src = (window.URL || window.webkitURL).createObjectURL(blob);
	        img.getData = function() {
	            var canvas = document.createElement('canvas');
	            var context = canvas.getContext('2d');
	            canvas.width = img.width;
	            canvas.height = img.height;
	            context.drawImage(img, 0, 0);
	            return context.getImageData(0, 0, img.width, img.height).data;
	        };
	        return img;
	    });
	};

	exports.getVideo = function(urls, callback) {
	    var video = document.createElement('video');
	    video.onloadstart = function() {
	        callback(null, video);
	    };
	    for (var i = 0; i < urls.length; i++) {
	        var s = document.createElement('source');
	        if (!sameOrigin(urls[i])) {
	            video.crossOrigin = 'Anonymous';
	        }
	        s.src = urls[i];
	        video.appendChild(s);
	    }
	    video.getData = function() { return video; };
	    return video;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Tile = __webpack_require__(23);
	var TileCoord = __webpack_require__(25);
	var Point = __webpack_require__(17);
	var Cache = __webpack_require__(26);
	var util = __webpack_require__(11);
	var EXTENT = __webpack_require__(24).EXTENT;

	module.exports = TilePyramid;

	/**
	 * A tile pyramid is a specialized cache and datastructure
	 * that contains tiles. It's used by sources to manage their
	 * data.
	 *
	 * @param {Object} options
	 * @param {number} options.tileSize
	 * @param {number} options.minzoom
	 * @param {number} options.maxzoom
	 * @private
	 */
	function TilePyramid(options) {
	    this.tileSize = options.tileSize;
	    this.minzoom = options.minzoom;
	    this.maxzoom = options.maxzoom;
	    this.roundZoom = options.roundZoom;
	    this.reparseOverscaled = options.reparseOverscaled;

	    this._load = options.load;
	    this._abort = options.abort;
	    this._unload = options.unload;
	    this._add = options.add;
	    this._remove = options.remove;
	    this._redoPlacement = options.redoPlacement;

	    this._tiles = {};
	    this._cache = new Cache(0, function(tile) { return this._unload(tile); }.bind(this));

	    this._filterRendered = this._filterRendered.bind(this);
	}

	TilePyramid.prototype = {
	    /**
	     * Confirm that every tracked tile is loaded.
	     * @returns {boolean} whether all tiles are loaded.
	     * @private
	     */
	    loaded: function() {
	        for (var t in this._tiles) {
	            if (!this._tiles[t].loaded && !this._tiles[t].errored)
	                return false;
	        }
	        return true;
	    },

	    /**
	     * Return all tile ids ordered with z-order, and cast to numbers
	     * @returns {Array<number>} ids
	     * @private
	     */
	    orderedIDs: function() {
	        return Object.keys(this._tiles).map(Number).sort(compareKeyZoom);
	    },

	    renderedIDs: function() {
	        return this.orderedIDs().filter(this._filterRendered);
	    },

	    _filterRendered: function(id) {
	        return this._tiles[id].loaded && !this._coveredTiles[id];
	    },

	    reload: function() {
	        this._cache.reset();
	        for (var i in this._tiles) {
	            this._load(this._tiles[i]);
	        }
	    },

	    /**
	     * Get a specific tile by id
	     * @param {string|number} id tile id
	     * @returns {Object} tile
	     * @private
	     */
	    getTile: function(id) {
	        return this._tiles[id];
	    },

	    /**
	     * get the zoom level adjusted for the difference in map and source tilesizes
	     * @param {Object} transform
	     * @returns {number} zoom level
	     * @private
	     */
	    getZoom: function(transform) {
	        return transform.zoom + Math.log(transform.tileSize / this.tileSize) / Math.LN2;
	    },

	    /**
	     * Return a zoom level that will cover all tiles in a given transform
	     * @param {Object} transform
	     * @returns {number} zoom level
	     * @private
	     */
	    coveringZoomLevel: function(transform) {
	        return (this.roundZoom ? Math.round : Math.floor)(this.getZoom(transform));
	    },

	    /**
	     * Given a transform, return all coordinates that could cover that
	     * transform for a covering zoom level.
	     * @param {Object} transform
	     * @returns {Array<Tile>} tiles
	     * @private
	     */
	    coveringTiles: function(transform) {
	        var z = this.coveringZoomLevel(transform);
	        var actualZ = z;

	        if (z < this.minzoom) return [];
	        if (z > this.maxzoom) z = this.maxzoom;

	        var tr = transform,
	            tileCenter = tr.locationCoordinate(tr.center)._zoomTo(z),
	            centerPoint = new Point(tileCenter.column - 0.5, tileCenter.row - 0.5);

	        return TileCoord.cover(z, [
	            tr.pointCoordinate(new Point(0, 0))._zoomTo(z),
	            tr.pointCoordinate(new Point(tr.width, 0))._zoomTo(z),
	            tr.pointCoordinate(new Point(tr.width, tr.height))._zoomTo(z),
	            tr.pointCoordinate(new Point(0, tr.height))._zoomTo(z)
	        ], this.reparseOverscaled ? actualZ : z).sort(function(a, b) {
	            return centerPoint.dist(a) - centerPoint.dist(b);
	        });
	    },

	    /**
	     * Recursively find children of the given tile (up to maxCoveringZoom) that are already loaded;
	     * adds found tiles to retain object; returns true if any child is found.
	     *
	     * @param {Coordinate} coord
	     * @param {number} maxCoveringZoom
	     * @param {boolean} retain
	     * @returns {boolean} whether the operation was complete
	     * @private
	     */
	    findLoadedChildren: function(coord, maxCoveringZoom, retain) {
	        var found = false;

	        for (var id in this._tiles) {
	            var tile = this._tiles[id];

	            // only consider loaded tiles on higher zoom levels (up to maxCoveringZoom)
	            if (retain[id] || !tile.loaded || tile.coord.z <= coord.z || tile.coord.z > maxCoveringZoom) continue;

	            // disregard tiles that are not descendants of the given tile coordinate
	            var z2 = Math.pow(2, Math.min(tile.coord.z, this.maxzoom) - Math.min(coord.z, this.maxzoom));
	            if (Math.floor(tile.coord.x / z2) !== coord.x ||
	                Math.floor(tile.coord.y / z2) !== coord.y)
	                continue;

	            // found loaded child
	            retain[id] = true;
	            found = true;

	            // loop through parents; retain the topmost loaded one if found
	            while (tile && tile.coord.z - 1 > coord.z) {
	                var parentId = tile.coord.parent(this.maxzoom).id;
	                tile = this._tiles[parentId];

	                if (tile && tile.loaded) {
	                    delete retain[id];
	                    retain[parentId] = true;
	                }
	            }
	        }
	        return found;
	    },

	    /**
	     * Find a loaded parent of the given tile (up to minCoveringZoom);
	     * adds the found tile to retain object and returns the tile if found
	     *
	     * @param {Coordinate} coord
	     * @param {number} minCoveringZoom
	     * @param {boolean} retain
	     * @returns {Tile} tile object
	     * @private
	     */
	    findLoadedParent: function(coord, minCoveringZoom, retain) {
	        for (var z = coord.z - 1; z >= minCoveringZoom; z--) {
	            coord = coord.parent(this.maxzoom);
	            var tile = this._tiles[coord.id];
	            if (tile && tile.loaded) {
	                retain[coord.id] = true;
	                return true;
	            }
	            if (this._cache.has(coord.id)) {
	                this.addTile(coord);
	                retain[coord.id] = true;
	                return true;
	            }
	        }
	    },

	    /**
	     * Resizes the tile cache based on the current viewport's size.
	     *
	     * Larger viewports use more tiles and need larger caches. Larger viewports
	     * are more likely to be found on devices with more memory and on pages where
	     * the map is more important.
	     *
	     * @private
	     */
	    updateCacheSize: function(transform) {
	        var widthInTiles = Math.ceil(transform.width / transform.tileSize) + 1;
	        var heightInTiles = Math.ceil(transform.height / transform.tileSize) + 1;
	        var approxTilesInView = widthInTiles * heightInTiles;
	        var commonZoomRange = 5;
	        this._cache.setMaxSize(Math.floor(approxTilesInView * commonZoomRange));
	    },

	    /**
	     * Removes tiles that are outside the viewport and adds new tiles that
	     * are inside the viewport.
	     * @private
	     */
	    update: function(used, transform, fadeDuration) {
	        var i;
	        var coord;
	        var tile;

	        this.updateCacheSize(transform);

	        // Determine the overzooming/underzooming amounts.
	        var zoom = (this.roundZoom ? Math.round : Math.floor)(this.getZoom(transform));
	        var minCoveringZoom = Math.max(zoom - 10, this.minzoom);
	        var maxCoveringZoom = Math.max(zoom + 3,  this.minzoom);

	        // Retain is a list of tiles that we shouldn't delete, even if they are not
	        // the most ideal tile for the current viewport. This may include tiles like
	        // parent or child tiles that are *already* loaded.
	        var retain = {};
	        var now = new Date().getTime();

	        // Covered is a list of retained tiles who's areas are full covered by other,
	        // better, retained tiles. They are not drawn separately.
	        this._coveredTiles = {};

	        var required = used ? this.coveringTiles(transform) : [];
	        for (i = 0; i < required.length; i++) {
	            coord = required[i];
	            tile = this.addTile(coord);

	            retain[coord.id] = true;

	            if (tile.loaded)
	                continue;

	            // The tile we require is not yet loaded.
	            // Retain child or parent tiles that cover the same area.
	            if (!this.findLoadedChildren(coord, maxCoveringZoom, retain)) {
	                this.findLoadedParent(coord, minCoveringZoom, retain);
	            }
	        }

	        var parentsForFading = {};

	        var ids = Object.keys(retain);
	        for (var k = 0; k < ids.length; k++) {
	            var id = ids[k];
	            coord = TileCoord.fromID(id);
	            tile = this._tiles[id];
	            if (tile && tile.timeAdded > now - (fadeDuration || 0)) {
	                // This tile is still fading in. Find tiles to cross-fade with it.
	                if (this.findLoadedChildren(coord, maxCoveringZoom, retain)) {
	                    retain[id] = true;
	                }
	                this.findLoadedParent(coord, minCoveringZoom, parentsForFading);
	            }
	        }

	        var fadedParent;
	        for (fadedParent in parentsForFading) {
	            if (!retain[fadedParent]) {
	                // If a tile is only needed for fading, mark it as covered so that it isn't rendered on it's own.
	                this._coveredTiles[fadedParent] = true;
	            }
	        }
	        for (fadedParent in parentsForFading) {
	            retain[fadedParent] = true;
	        }

	        // Remove the tiles we don't need anymore.
	        var remove = util.keysDifference(this._tiles, retain);
	        for (i = 0; i < remove.length; i++) {
	            this.removeTile(+remove[i]);
	        }

	        this.transform = transform;
	    },

	    /**
	     * Add a tile, given its coordinate, to the pyramid.
	     * @param {Coordinate} coord
	     * @returns {Coordinate} the coordinate.
	     * @private
	     */
	    addTile: function(coord) {
	        var tile = this._tiles[coord.id];
	        if (tile)
	            return tile;

	        var wrapped = coord.wrapped();
	        tile = this._tiles[wrapped.id];

	        if (!tile) {
	            tile = this._cache.get(wrapped.id);
	            if (tile && this._redoPlacement) {
	                this._redoPlacement(tile);
	            }
	        }

	        if (!tile) {
	            var zoom = coord.z;
	            var overscaling = zoom > this.maxzoom ? Math.pow(2, zoom - this.maxzoom) : 1;
	            tile = new Tile(wrapped, this.tileSize * overscaling, this.maxzoom);
	            this._load(tile);
	        }

	        tile.uses++;
	        this._tiles[coord.id] = tile;
	        this._add(tile, coord);

	        return tile;
	    },

	    /**
	     * Remove a tile, given its id, from the pyramid
	     * @param {string|number} id tile id
	     * @returns {undefined} nothing
	     * @private
	     */
	    removeTile: function(id) {
	        var tile = this._tiles[id];
	        if (!tile)
	            return;

	        tile.uses--;
	        delete this._tiles[id];
	        this._remove(tile);

	        if (tile.uses > 0)
	            return;

	        if (tile.loaded) {
	            this._cache.add(tile.coord.wrapped().id, tile);
	        } else {
	            this._abort(tile);
	            this._unload(tile);
	        }
	    },

	    /**
	     * Remove all tiles from this pyramid
	     * @private
	     */
	    clearTiles: function() {
	        for (var id in this._tiles)
	            this.removeTile(id);
	        this._cache.reset();
	    },

	    /**
	     * For a given coordinate, search through our current tiles and attempt
	     * to find a tile at that point
	     * @param {Coordinate} coord
	     * @returns {Object} tile
	     * @private
	     */
	    tileAt: function(coord) {
	        var ids = this.orderedIDs();
	        for (var i = 0; i < ids.length; i++) {
	            var tile = this._tiles[ids[i]];
	            var pos = tile.positionAt(coord);
	            if (pos && pos.x >= 0 && pos.x < EXTENT && pos.y >= 0 && pos.y < EXTENT) {
	                // The click is within the viewport. There is only ever one tile in
	                // a layer that has this property.
	                return {
	                    tile: tile,
	                    x: pos.x,
	                    y: pos.y,
	                    scale: Math.pow(2, this.transform.zoom - tile.coord.z),
	                    tileSize: tile.tileSize
	                };
	            }
	        }
	    },

	    /**
	     * Search through our current tiles and attempt to find the tiles that
	     * cover the given bounds.
	     * @param {Array<Coordinate>} bounds [minxminy, maxxmaxy] coordinates of the corners of bounding rectangle
	     * @returns {Array<Object>} result items have {tile, minX, maxX, minY, maxY}, where min/max bounding values are the given bounds transformed in into the coordinate space of this tile.
	     * @private
	     */
	    tilesIn: function(bounds) {
	        var result = [];
	        var ids = this.orderedIDs();

	        for (var i = 0; i < ids.length; i++) {
	            var tile = this._tiles[ids[i]];
	            var tileSpaceBounds = [
	                tile.positionAt(bounds[0]),
	                tile.positionAt(bounds[1])
	            ];
	            if (tileSpaceBounds[0].x < EXTENT && tileSpaceBounds[0].y < EXTENT &&
	                tileSpaceBounds[1].x >= 0 && tileSpaceBounds[1].y >= 0) {
	                result.push({
	                    tile: tile,
	                    minX: tileSpaceBounds[0].x,
	                    maxX: tileSpaceBounds[1].x,
	                    minY: tileSpaceBounds[0].y,
	                    maxY: tileSpaceBounds[1].y
	                });
	            }
	        }

	        return result;
	    }
	};

	function compareKeyZoom(a, b) {
	    return (a % 32) - (b % 32);
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var Buffer = __webpack_require__(24);
	var EXTENT = __webpack_require__(24).EXTENT;

	module.exports = Tile;

	/**
	 * A tile object is the combination of a Coordinate, which defines
	 * its place, as well as a unique ID and data tracking for its content
	 *
	 * @param {Coordinate} coord
	 * @param {number} size
	 * @private
	 */
	function Tile(coord, size, sourceMaxZoom) {
	    this.coord = coord;
	    this.uid = util.uniqueId();
	    this.loaded = false;
	    this.uses = 0;
	    this.tileSize = size;
	    this.sourceMaxZoom = sourceMaxZoom;
	}

	Tile.prototype = {

	    /**
	     * Converts a pixel value at a the given zoom level to tile units.
	     *
	     * The shaders mostly calculate everything in tile units so style
	     * properties need to be converted from pixels to tile units using this.
	     *
	     * For example, a translation by 30 pixels at zoom 6.5 will be a
	     * translation by pixelsToTileUnits(30, 6.5) tile units.
	     *
	     * @param {number} pixelValue
	     * @param {number} z
	     * @returns {number} value in tile units
	     * @private
	     */
	    pixelsToTileUnits: function(pixelValue, z) {
	        return pixelValue * (EXTENT / (this.tileSize * Math.pow(2, z - this.coord.z)));
	    },

	    /**
	     * Given a coordinate position, zoom that coordinate to my zoom and
	     * scale and return a position in x, y, scale
	     * @param {Coordinate} coord
	     * @returns {Object} position
	     * @private
	     */
	    positionAt: function(coord) {
	        var zoomedCoord = coord.zoomTo(Math.min(this.coord.z, this.sourceMaxZoom));
	        return {
	            x: (zoomedCoord.column - this.coord.x) * EXTENT,
	            y: (zoomedCoord.row - this.coord.y) * EXTENT
	        };
	    },

	    /**
	     * Given a data object with a 'buffers' property, load it into
	     * this tile's elementGroups and buffers properties and set loaded
	     * to true. If the data is null, like in the case of an empty
	     * GeoJSON tile, no-op but still set loaded to true.
	     * @param {Object} data
	     * @returns {undefined}
	     * @private
	     */
	    loadVectorData: function(data) {
	        this.loaded = true;

	        // empty GeoJSON tile
	        if (!data) return;

	        this.buffers = unserializeBuffers(data.buffers);
	        this.elementGroups = data.elementGroups;
	    },

	    /**
	     * given a data object and a GL painter, destroy and re-create
	     * all of its buffers.
	     * @param {Object} data
	     * @param {Object} painter
	     * @returns {undefined}
	     * @private
	     */
	    reloadSymbolData: function(data, painter) {

	        if (!this.buffers) {
	            // the tile has been destroyed
	            return;
	        }

	        if (this.buffers.glyphVertex) this.buffers.glyphVertex.destroy(painter.gl);
	        if (this.buffers.glyphElement) this.buffers.glyphElement.destroy(painter.gl);
	        if (this.buffers.iconVertex) this.buffers.iconVertex.destroy(painter.gl);
	        if (this.buffers.iconElement) this.buffers.iconElement.destroy(painter.gl);
	        if (this.buffers.collisionBoxVertex) this.buffers.collisionBoxVertex.destroy(painter.gl);

	        var buffers = unserializeBuffers(data.buffers);
	        this.buffers.glyphVertex = buffers.glyphVertex;
	        this.buffers.glyphElement = buffers.glyphElement;
	        this.buffers.iconVertex = buffers.iconVertex;
	        this.buffers.iconElement = buffers.iconElement;
	        this.buffers.collisionBoxVertex = buffers.collisionBoxVertex;

	        for (var id in data.elementGroups) {
	            this.elementGroups[id] = data.elementGroups[id];
	        }
	    },

	    /**
	     * Make sure that this tile doesn't own any data within a given
	     * painter, so that it doesn't consume any memory or maintain
	     * any references to the painter.
	     * @param {Object} painter gl painter object
	     * @returns {undefined}
	     * @private
	     */
	    unloadVectorData: function(painter) {
	        this.loaded = false;

	        for (var b in this.buffers) {
	            if (this.buffers[b]) this.buffers[b].destroy(painter.gl);
	        }

	        this.elementGroups = null;
	        this.buffers = null;
	    },

	    redoPlacement: function(source) {
	        if (!this.loaded || this.redoingPlacement) {
	            this.redoWhenDone = true;
	            return;
	        }

	        this.redoingPlacement = true;

	        source.dispatcher.send('redo placement', {
	            uid: this.uid,
	            source: source.id,
	            angle: source.map.transform.angle,
	            pitch: source.map.transform.pitch,
	            collisionDebug: source.map.collisionDebug
	        }, done.bind(this), this.workerID);

	        function done(_, data) {
	            this.reloadSymbolData(data, source.map.painter);
	            source.fire('tile.load', {tile: this});

	            this.redoingPlacement = false;
	            if (this.redoWhenDone) {
	                this.redoPlacement(source);
	                this.redoWhenDone = false;
	            }
	        }
	    },

	    getElementGroups: function(layer, shaderName) {
	        return this.elementGroups && this.elementGroups[layer.ref || layer.id] && this.elementGroups[layer.ref || layer.id][shaderName];
	    }
	};

	function unserializeBuffers(input) {
	    var output = {};
	    for (var k in input) {
	        output[k] = new Buffer(input[k]);
	    }
	    return output;
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Note: all "sizes" are measured in bytes

	var assert = __webpack_require__(8);

	/**
	 * The `Buffer` class is responsible for managing one instance of `ArrayBuffer`. `ArrayBuffer`s
	 * provide low-level read/write access to a chunk of memory. `ArrayBuffer`s are populated with
	 * per-vertex data, uploaded to the GPU, and used in rendering.
	 *
	 * `Buffer` provides an abstraction over `ArrayBuffer`, making it behave like an array of
	 * statically typed structs. A buffer is comprised of items. An item is comprised of a set of
	 * attributes. Attributes are defined when the class is constructed.
	 *
	 * @class Buffer
	 * @private
	 * @param options
	 * @param {BufferType} options.type
	 * @param {Array.<BufferAttribute>} options.attributes
	 */
	function Buffer(options) {

	    this.type = options.type;

	    // Clone an existing Buffer
	    if (options.arrayBuffer) {

	        this.capacity = options.capacity;
	        this.arrayBuffer = options.arrayBuffer;
	        this.attributes = options.attributes;
	        this.itemSize = options.itemSize;
	        this.length = options.length;

	    // Create a new Buffer
	    } else {

	        this.capacity = align(Buffer.CAPACITY_DEFAULT, Buffer.CAPACITY_ALIGNMENT);
	        this.arrayBuffer = new ArrayBuffer(this.capacity);
	        this.attributes = [];
	        this.itemSize = 0;
	        this.length = 0;

	        // Vertex buffer attributes must be aligned to word boundaries but
	        // element buffer attributes do not need to be aligned.
	        var attributeAlignment = this.type === Buffer.BufferType.VERTEX ? Buffer.VERTEX_ATTRIBUTE_ALIGNMENT : 1;

	        this.attributes = options.attributes.map(function(attributeOptions) {
	            var attribute = {};

	            attribute.name = attributeOptions.name;
	            attribute.components = attributeOptions.components || 1;
	            attribute.type = attributeOptions.type || Buffer.AttributeType.UNSIGNED_BYTE;
	            attribute.size = attribute.type.size * attribute.components;
	            attribute.offset = this.itemSize;

	            this.itemSize = align(attribute.offset + attribute.size, attributeAlignment);

	            assert(!isNaN(this.itemSize));
	            assert(!isNaN(attribute.size));
	            assert(attribute.type.name in Buffer.AttributeType);

	            return attribute;
	        }, this);

	        // These are expensive calls. Because we only push things to buffers in
	        // the worker thread, we can skip in the "clone an existing buffer" case.
	        this._createPushMethod();
	        this._refreshViews();
	    }
	}

	/**
	 * Bind this buffer to a WebGL context.
	 * @private
	 * @param gl The WebGL context
	 */
	Buffer.prototype.bind = function(gl) {
	    var type = gl[this.type];

	    if (!this.buffer) {
	        this.buffer = gl.createBuffer();
	        gl.bindBuffer(type, this.buffer);
	        gl.bufferData(type, this.arrayBuffer.slice(0, this.length * this.itemSize), gl.STATIC_DRAW);

	        // dump array buffer once it's bound to gl
	        this.arrayBuffer = null;
	    } else {
	        gl.bindBuffer(type, this.buffer);
	    }
	};

	/**
	 * Destroy the GL buffer bound to the given WebGL context
	 * @private
	 * @param gl The WebGL context
	 */
	Buffer.prototype.destroy = function(gl) {
	    if (this.buffer) {
	        gl.deleteBuffer(this.buffer);
	    }
	};

	/**
	 * Set the attribute pointers in a WebGL context according to the buffer's attribute layout
	 * @private
	 * @param gl The WebGL context
	 * @param shader The active WebGL shader
	 * @param {number} offset The offset of the attribute data in the currently bound GL buffer.
	 */
	Buffer.prototype.setAttribPointers = function(gl, shader, offset) {
	    for (var i = 0; i < this.attributes.length; i++) {
	        var attrib = this.attributes[i];

	        gl.vertexAttribPointer(
	            shader['a_' + attrib.name], attrib.components, gl[attrib.type.name],
	            false, this.itemSize, offset + attrib.offset);
	    }
	};

	/**
	 * Get an item from the `ArrayBuffer`. Only used for debugging.
	 * @private
	 * @param {number} index The index of the item to get
	 * @returns {Object.<string, Array.<number>>}
	 */
	Buffer.prototype.get = function(index) {
	    this._refreshViews();

	    var item = {};
	    var offset = index * this.itemSize;

	    for (var i = 0; i < this.attributes.length; i++) {
	        var attribute = this.attributes[i];
	        var values = item[attribute.name] = [];

	        for (var j = 0; j < attribute.components; j++) {
	            var componentOffset = ((offset + attribute.offset) / attribute.type.size) + j;
	            values.push(this.views[attribute.type.name][componentOffset]);
	        }
	    }
	    return item;
	};

	/**
	 * Check that a buffer item is well formed and throw an error if not. Only
	 * used for debugging.
	 * @private
	 * @param {number} args The "arguments" object from Buffer::push
	 */
	Buffer.prototype.validate = function(args) {
	    var argIndex = 0;
	    for (var i = 0; i < this.attributes.length; i++) {
	        for (var j = 0; j < this.attributes[i].components; j++) {
	            assert(!isNaN(args[argIndex++]));
	        }
	    }
	    assert(argIndex === args.length);
	};

	Buffer.prototype._resize = function(capacity) {
	    var old = this.views.UNSIGNED_BYTE;
	    this.capacity = align(capacity, Buffer.CAPACITY_ALIGNMENT);
	    this.arrayBuffer = new ArrayBuffer(this.capacity);
	    this._refreshViews();
	    this.views.UNSIGNED_BYTE.set(old);
	};

	Buffer.prototype._refreshViews = function() {
	    this.views = {
	        UNSIGNED_BYTE:  new Uint8Array(this.arrayBuffer),
	        BYTE:           new Int8Array(this.arrayBuffer),
	        UNSIGNED_SHORT: new Uint16Array(this.arrayBuffer),
	        SHORT:          new Int16Array(this.arrayBuffer)
	    };
	};

	var createPushMethodCache = {};
	Buffer.prototype._createPushMethod = function() {
	    var body = '';
	    var argNames = [];

	    body += 'var i = this.length++;\n';
	    body += 'var o = i * ' + this.itemSize + ';\n';
	    body += 'if (o + ' + this.itemSize + ' > this.capacity) { this._resize(this.capacity * 1.5); }\n';

	    for (var i = 0; i < this.attributes.length; i++) {
	        var attribute = this.attributes[i];
	        var offsetId = 'o' + i;

	        body += '\nvar ' + offsetId + ' = (o + ' + attribute.offset + ') / ' + attribute.type.size + ';\n';

	        for (var j = 0; j < attribute.components; j++) {
	            var rvalue = 'v' + argNames.length;
	            var lvalue = 'this.views.' + attribute.type.name + '[' + offsetId + ' + ' + j + ']';
	            body += lvalue + ' = ' + rvalue + ';\n';
	            argNames.push(rvalue);
	        }
	    }

	    body += '\nreturn i;\n';

	    if (!createPushMethodCache[body]) {
	        createPushMethodCache[body] = new Function(argNames, body);
	    }

	    this.push = createPushMethodCache[body];
	};

	/**
	 * @typedef BufferAttribute
	 * @private
	 * @property {string} name
	 * @property {number} components
	 * @property {BufferAttributeType} type
	 * @property {number} size
	 * @property {number} offset
	 */

	/**
	 * @enum {string} BufferType
	 * @private
	 * @readonly
	 */
	Buffer.BufferType = {
	    VERTEX: 'ARRAY_BUFFER',
	    ELEMENT: 'ELEMENT_ARRAY_BUFFER'
	};

	/**
	 * @enum {{size: number, name: string}} BufferAttributeType
	 * @private
	 * @readonly
	 */
	Buffer.AttributeType = {
	    BYTE:           { size: 1, name: 'BYTE' },
	    UNSIGNED_BYTE:  { size: 1, name: 'UNSIGNED_BYTE' },
	    SHORT:          { size: 2, name: 'SHORT' },
	    UNSIGNED_SHORT: { size: 2, name: 'UNSIGNED_SHORT' }
	};

	/**
	 * An `BufferType.ELEMENT` buffer holds indicies of a corresponding `BufferType.VERTEX` buffer.
	 * These indicies are stored in the `BufferType.ELEMENT` buffer as `UNSIGNED_SHORT`s.
	 *
	 * @property {BufferAttributeType}
	 * @private
	 * @readonly
	 */
	Buffer.ELEMENT_ATTRIBUTE_TYPE = Buffer.AttributeType.UNSIGNED_SHORT;

	/**
	 * The maximum extent of a feature that can be safely stored in the buffer.
	 * In practice, all features are converted to this extent before being added.
	 *
	 * Positions are stored as signed 16bit integers.
	 * One bit is lost for signedness to support featuers extending past the left edge of the tile.
	 * One bit is lost because the line vertex buffer packs 1 bit of other data into the int.
	 * One bit is lost to support features extending past the extent on the right edge of the tile.
	 * This leaves us with 2^13 = 8192
	 *
	 * @property {number}
	 * @private
	 * @readonly
	 */
	Buffer.EXTENT = 8192;

	/**
	 * @property {number}
	 * @private
	 * @readonly
	 */
	Buffer.CAPACITY_DEFAULT = 8192;

	/**
	 * WebGL performs best if buffer sizes are aligned to 2 byte boundaries.
	 * @property {number}
	 * @private
	 * @readonly
	 */
	Buffer.CAPACITY_ALIGNMENT = 2;

	/**
	 * WebGL performs best if vertex attribute offsets are aligned to 4 byte boundaries.
	 * @property {number}
	 * @private
	 * @readonly
	 */
	Buffer.VERTEX_ATTRIBUTE_ALIGNMENT = 4;

	function align(value, alignment) {
	    alignment = alignment || 1;
	    var remainder = value % alignment;
	    if (alignment !== 1 && remainder !== 0) {
	        value += (alignment - remainder);
	    }
	    return value;
	}

	module.exports = Buffer;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assert = __webpack_require__(8);
	var Coordinate = __webpack_require__(13);

	module.exports = TileCoord;

	function TileCoord(z, x, y, w) {
	    assert(!isNaN(z) && z >= 0 && z % 1 === 0);
	    assert(!isNaN(x) && x >= 0 && x % 1 === 0);
	    assert(!isNaN(y) && y >= 0 && y % 1 === 0);

	    if (isNaN(w)) w = 0;

	    this.z = +z;
	    this.x = +x;
	    this.y = +y;
	    this.w = +w;

	    // calculate id
	    w *= 2;
	    if (w < 0) w = w * -1 - 1;
	    var dim = 1 << this.z;
	    this.id = ((dim * dim * w + dim * this.y + this.x) * 32) + this.z;
	}

	TileCoord.prototype.toString = function() {
	    return this.z + "/" + this.x + "/" + this.y;
	};

	TileCoord.prototype.toCoordinate = function() {
	    var zoom = this.z;
	    var tileScale = Math.pow(2, zoom);
	    var row = this.y;
	    var column = this.x + tileScale * this.w;
	    return new Coordinate(column, row, zoom);
	};

	// Parse a packed integer id into a TileCoord object
	TileCoord.fromID = function(id) {
	    var z = id % 32, dim = 1 << z;
	    var xy = ((id - z) / 32);
	    var x = xy % dim, y = ((xy - x) / dim) % dim;
	    var w = Math.floor(xy / (dim * dim));
	    if (w % 2 !== 0) w = w * -1 - 1;
	    w /= 2;
	    return new TileCoord(z, x, y, w);
	};

	// given a list of urls, choose a url template and return a tile URL
	TileCoord.prototype.url = function(urls, sourceMaxZoom) {
	    return urls[(this.x + this.y) % urls.length]
	        .replace('{prefix}', (this.x % 16).toString(16) + (this.y % 16).toString(16))
	        .replace('{z}', Math.min(this.z, sourceMaxZoom || this.z))
	        .replace('{x}', this.x)
	        .replace('{y}', this.y);
	};

	// Return the coordinate of the parent tile
	TileCoord.prototype.parent = function(sourceMaxZoom) {
	    if (this.z === 0) return null;

	    // the id represents an overscaled tile, return the same coordinates with a lower z
	    if (this.z > sourceMaxZoom) {
	        return new TileCoord(this.z - 1, this.x, this.y, this.w);
	    }

	    return new TileCoord(this.z - 1, Math.floor(this.x / 2), Math.floor(this.y / 2), this.w);
	};

	TileCoord.prototype.wrapped = function() {
	    return new TileCoord(this.z, this.x, this.y, 0);
	};

	// Return the coordinates of the tile's children
	TileCoord.prototype.children = function(sourceMaxZoom) {

	    if (this.z >= sourceMaxZoom) {
	        // return a single tile coord representing a an overscaled tile
	        return [new TileCoord(this.z + 1, this.x, this.y, this.w)];
	    }

	    var z = this.z + 1;
	    var x = this.x * 2;
	    var y = this.y * 2;
	    return [
	        new TileCoord(z, x, y, this.w),
	        new TileCoord(z, x + 1, y, this.w),
	        new TileCoord(z, x, y + 1, this.w),
	        new TileCoord(z, x + 1, y + 1, this.w)
	    ];
	};

	// Taken from polymaps src/Layer.js
	// https://github.com/simplegeo/polymaps/blob/master/src/Layer.js#L333-L383

	function edge(a, b) {
	    if (a.row > b.row) { var t = a; a = b; b = t; }
	    return {
	        x0: a.column,
	        y0: a.row,
	        x1: b.column,
	        y1: b.row,
	        dx: b.column - a.column,
	        dy: b.row - a.row
	    };
	}

	function scanSpans(e0, e1, ymin, ymax, scanLine) {
	    var y0 = Math.max(ymin, Math.floor(e1.y0));
	    var y1 = Math.min(ymax, Math.ceil(e1.y1));

	    // sort edges by x-coordinate
	    if ((e0.x0 === e1.x0 && e0.y0 === e1.y0) ?
	            (e0.x0 + e1.dy / e0.dy * e0.dx < e1.x1) :
	            (e0.x1 - e1.dy / e0.dy * e0.dx < e1.x0)) {
	        var t = e0; e0 = e1; e1 = t;
	    }

	    // scan lines!
	    var m0 = e0.dx / e0.dy;
	    var m1 = e1.dx / e1.dy;
	    var d0 = e0.dx > 0; // use y + 1 to compute x0
	    var d1 = e1.dx < 0; // use y + 1 to compute x1
	    for (var y = y0; y < y1; y++) {
	        var x0 = m0 * Math.max(0, Math.min(e0.dy, y + d0 - e0.y0)) + e0.x0;
	        var x1 = m1 * Math.max(0, Math.min(e1.dy, y + d1 - e1.y0)) + e1.x0;
	        scanLine(Math.floor(x1), Math.ceil(x0), y);
	    }
	}

	function scanTriangle(a, b, c, ymin, ymax, scanLine) {
	    var ab = edge(a, b),
	        bc = edge(b, c),
	        ca = edge(c, a);

	    var t;

	    // sort edges by y-length
	    if (ab.dy > bc.dy) { t = ab; ab = bc; bc = t; }
	    if (ab.dy > ca.dy) { t = ab; ab = ca; ca = t; }
	    if (bc.dy > ca.dy) { t = bc; bc = ca; ca = t; }

	    // scan span! scan span!
	    if (ab.dy) scanSpans(ca, ab, ymin, ymax, scanLine);
	    if (bc.dy) scanSpans(ca, bc, ymin, ymax, scanLine);
	}

	TileCoord.cover = function(z, bounds, actualZ) {
	    var tiles = 1 << z;
	    var t = {};

	    function scanLine(x0, x1, y) {
	        var x, wx, coord;
	        if (y >= 0 && y <= tiles) {
	            for (x = x0; x < x1; x++) {
	                wx = (x % tiles + tiles) % tiles;
	                coord = new TileCoord(actualZ, wx, y, Math.floor(x / tiles));
	                t[coord.id] = coord;
	            }
	        }
	    }

	    // Divide the screen up in two triangles and scan each of them:
	    // +---/
	    // | / |
	    // /---+
	    scanTriangle(bounds[0], bounds[1], bounds[2], 0, tiles, scanLine);
	    scanTriangle(bounds[2], bounds[3], bounds[0], 0, tiles, scanLine);

	    return Object.keys(t).map(function(id) {
	        return t[id];
	    });
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * A [least-recently-used cache](http://en.wikipedia.org/wiki/Cache_algorithms)
	 * with hash lookup made possible by keeping a list of keys in parallel to
	 * an array of dictionary of values
	 *
	 * @param {number} max number of permitted values
	 * @param {Function} onRemove callback called with items when they expire
	 * @private
	 */
	module.exports = LRUCache;
	function LRUCache(max, onRemove) {
	    this.max = max;
	    this.onRemove = onRemove;
	    this.reset();
	}

	/**
	 * Clear the cache
	 *
	 * @returns {LRUCache} this cache
	 * @private
	 */
	LRUCache.prototype.reset = function() {
	    for (var key in this.data) {
	        this.onRemove(this.data[key]);
	    }

	    this.data = {};
	    this.order = [];

	    return this;
	};

	/**
	 * Add a key, value combination to the cache, trimming its size if this pushes
	 * it over max length.
	 *
	 * @param {string} key lookup key for the item
	 * @param {*} data any value
	 *
	 * @returns {LRUCache} this cache
	 * @private
	 */
	LRUCache.prototype.add = function(key, data) {
	    this.data[key] = data;
	    this.order.push(key);

	    if (this.order.length > this.max) {
	        var removedData = this.get(this.order[0]);
	        if (removedData) this.onRemove(removedData);
	    }

	    return this;
	};

	/**
	 * Determine whether the value attached to `key` is present
	 *
	 * @param {string} key the key to be looked-up
	 * @returns {boolean} whether the cache has this value
	 * @private
	 */
	LRUCache.prototype.has = function(key) {
	    return key in this.data;
	};

	/**
	 * List all keys in the cache
	 *
	 * @returns {Array<string>} an array of keys in this cache.
	 * @private
	 */
	LRUCache.prototype.keys = function() {
	    return this.order;
	};

	/**
	 * Get the value attached to a specific key. If the key is not found,
	 * returns `null`
	 *
	 * @param {string} key the key to look up
	 * @returns {*} the data, or null if it isn't found
	 * @private
	 */
	LRUCache.prototype.get = function(key) {
	    if (!this.has(key)) { return null; }

	    var data = this.data[key];

	    delete this.data[key];
	    this.order.splice(this.order.indexOf(key), 1);

	    return data;
	};

	/**
	 * Change the max size of the cache.
	 *
	 * @param {number} max the max size of the cache
	 * @returns {LRUCache} this cache
	 * @private
	 */
	LRUCache.prototype.setMaxSize = function(max) {
	    this.max = max;

	    while (this.order.length > this.max) {
	        var removedData = this.get(this.order[0]);
	        if (removedData) this.onRemove(removedData);
	    }

	    return this;
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(28);
	var browser = __webpack_require__(14);

	function normalizeURL(url, pathPrefix, accessToken) {
	    accessToken = accessToken || config.ACCESS_TOKEN;

	    if (!accessToken && config.REQUIRE_ACCESS_TOKEN) {
	        throw new Error('An API access token is required to use Mapbox GL. ' +
	            'See https://www.mapbox.com/developers/api/#access-tokens');
	    }

	    url = url.replace(/^mapbox:\/\//, config.API_URL + pathPrefix);
	    url += url.indexOf('?') !== -1 ? '&access_token=' : '?access_token=';

	    if (config.REQUIRE_ACCESS_TOKEN) {
	        if (accessToken[0] === 's') {
	            throw new Error('Use a public access token (pk.*) with Mapbox GL JS, not a secret access token (sk.*). ' +
	                'See https://www.mapbox.com/developers/api/#access-tokens');
	        }

	        url += accessToken;
	    }

	    return url;
	}

	module.exports.normalizeStyleURL = function(url, accessToken) {
	    if (!url.match(/^mapbox:\/\/styles\//))
	        return url;

	    var split = url.split('/');
	    var user = split[3];
	    var style = split[4];
	    var draft = split[5] ? '/draft' : '';
	    return normalizeURL('mapbox://' + user + '/' + style + draft, '/styles/v1/', accessToken);
	};

	module.exports.normalizeSourceURL = function(url, accessToken) {
	    if (!url.match(/^mapbox:\/\//))
	        return url;

	    // TileJSON requests need a secure flag appended to their URLs so
	    // that the server knows to send SSL-ified resource references.
	    return normalizeURL(url + '.json', '/v4/', accessToken) + '&secure';
	};

	module.exports.normalizeGlyphsURL = function(url, accessToken) {
	    if (!url.match(/^mapbox:\/\//))
	        return url;

	    var user = url.split('/')[3];
	    return normalizeURL('mapbox://' + user + '/{fontstack}/{range}.pbf', '/fonts/v1/', accessToken);
	};

	module.exports.normalizeSpriteURL = function(url, format, ext, accessToken) {
	    if (!url.match(/^mapbox:\/\/sprites\//))
	        return url + format + ext;

	    var split = url.split('/');
	    var user = split[3];
	    var style = split[4];
	    var draft = split[5] ? '/draft' : '';
	    return normalizeURL('mapbox://' + user + '/' + style + draft + '/sprite' + format + ext, '/styles/v1/', accessToken);
	};

	module.exports.normalizeTileURL = function(url, sourceUrl, tileSize) {
	    if (!sourceUrl || !sourceUrl.match(/^mapbox:\/\//))
	        return url;

	    // The v4 mapbox tile API supports 512x512 image tiles only when @2x
	    // is appended to the tile URL. If `tileSize: 512` is specified for
	    // a Mapbox raster source force the @2x suffix even if a non hidpi
	    // device.
	    url = url.replace(/([?&]access_token=)tk\.[^&]+/, '$1' + config.ACCESS_TOKEN);
	    var extension = browser.supportsWebp ? 'webp' : '$1';
	    return url.replace(/\.((?:png|jpg)\d*)(?=$|\?)/, browser.devicePixelRatio >= 2 || tileSize === 512 ? '@2x.' + extension : '.' + extension);
	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    API_URL: 'https://api.mapbox.com',
	    REQUIRE_ACCESS_TOKEN: true
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var Evented = __webpack_require__(15);
	var Source = __webpack_require__(20);
	var normalizeURL = __webpack_require__(27).normalizeTileURL;

	module.exports = VectorTileSource;

	function VectorTileSource(options) {
	    util.extend(this, util.pick(options, ['url', 'tileSize']));
	    this._options = util.extend({ type: 'vector' }, options);

	    if (this.tileSize !== 512) {
	        throw new Error('vector tile sources must have a tileSize of 512');
	    }

	    Source._loadTileJSON.call(this, options);
	}

	VectorTileSource.prototype = util.inherit(Evented, {
	    minzoom: 0,
	    maxzoom: 22,
	    tileSize: 512,
	    reparseOverscaled: true,
	    _loaded: false,
	    isTileClipped: true,

	    onAdd: function(map) {
	        this.map = map;
	    },

	    loaded: function() {
	        return this._pyramid && this._pyramid.loaded();
	    },

	    update: function(transform) {
	        if (this._pyramid) {
	            this._pyramid.update(this.used, transform);
	        }
	    },

	    reload: function() {
	        if (this._pyramid) {
	            this._pyramid.reload();
	        }
	    },

	    serialize: function() {
	        return util.extend({}, this._options);
	    },

	    getVisibleCoordinates: Source._getVisibleCoordinates,
	    getTile: Source._getTile,

	    featuresAt: Source._vectorFeaturesAt,
	    featuresIn: Source._vectorFeaturesIn,

	    _loadTile: function(tile) {
	        var overscaling = tile.coord.z > this.maxzoom ? Math.pow(2, tile.coord.z - this.maxzoom) : 1;
	        var params = {
	            url: normalizeURL(tile.coord.url(this.tiles, this.maxzoom), this.url),
	            uid: tile.uid,
	            coord: tile.coord,
	            zoom: tile.coord.z,
	            tileSize: this.tileSize * overscaling,
	            source: this.id,
	            overscaling: overscaling,
	            angle: this.map.transform.angle,
	            pitch: this.map.transform.pitch,
	            collisionDebug: this.map.collisionDebug
	        };

	        if (tile.workerID) {
	            this.dispatcher.send('reload tile', params, this._tileLoaded.bind(this, tile), tile.workerID);
	        } else {
	            tile.workerID = this.dispatcher.send('load tile', params, this._tileLoaded.bind(this, tile));
	        }
	    },

	    _tileLoaded: function(tile, err, data) {
	        if (tile.aborted)
	            return;

	        if (err) {
	            this.fire('tile.error', {tile: tile, error: err});
	            return;
	        }

	        tile.loadVectorData(data);

	        if (tile.redoWhenDone) {
	            tile.redoWhenDone = false;
	            tile.redoPlacement(this);
	        }

	        this.fire('tile.load', {tile: tile});
	        this.fire('tile.stats', data.bucketStats);
	    },

	    _abortTile: function(tile) {
	        tile.aborted = true;
	        this.dispatcher.send('abort tile', { uid: tile.uid, source: this.id }, null, tile.workerID);
	    },

	    _addTile: function(tile) {
	        this.fire('tile.add', {tile: tile});
	    },

	    _removeTile: function(tile) {
	        this.fire('tile.remove', {tile: tile});
	    },

	    _unloadTile: function(tile) {
	        tile.unloadVectorData(this.map.painter);
	        this.dispatcher.send('remove tile', { uid: tile.uid, source: this.id }, null, tile.workerID);
	    },

	    redoPlacement: Source.redoPlacement,

	    _redoTilePlacement: function(tile) {
	        tile.redoPlacement(this);
	    }
	});


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var ajax = __webpack_require__(21);
	var Evented = __webpack_require__(15);
	var Source = __webpack_require__(20);
	var normalizeURL = __webpack_require__(27).normalizeTileURL;

	module.exports = RasterTileSource;

	function RasterTileSource(options) {
	    util.extend(this, util.pick(options, ['url', 'tileSize']));

	    Source._loadTileJSON.call(this, options);
	}

	RasterTileSource.prototype = util.inherit(Evented, {
	    minzoom: 0,
	    maxzoom: 22,
	    roundZoom: true,
	    tileSize: 512,
	    _loaded: false,

	    onAdd: function(map) {
	        this.map = map;
	    },

	    loaded: function() {
	        return this._pyramid && this._pyramid.loaded();
	    },

	    update: function(transform) {
	        if (this._pyramid) {
	            this._pyramid.update(this.used, transform, this.map.style.rasterFadeDuration);
	        }
	    },

	    reload: function() {
	        // noop
	    },

	    serialize: function() {
	        return {
	            type: 'raster',
	            url: this.url,
	            tileSize: this.tileSize
	        };
	    },

	    getVisibleCoordinates: Source._getVisibleCoordinates,
	    getTile: Source._getTile,

	    _loadTile: function(tile) {
	        var url = normalizeURL(tile.coord.url(this.tiles), this.url, this.tileSize);

	        tile.request = ajax.getImage(url, done.bind(this));

	        function done(err, img) {
	            delete tile.request;

	            if (tile.aborted)
	                return;

	            if (err) {
	                tile.errored = true;
	                this.fire('tile.error', {tile: tile, error: err});
	                return;
	            }

	            var gl = this.map.painter.gl;
	            tile.texture = this.map.painter.getTexture(img.width);
	            if (tile.texture) {
	                gl.bindTexture(gl.TEXTURE_2D, tile.texture);
	                gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, img);
	            } else {
	                tile.texture = gl.createTexture();
	                gl.bindTexture(gl.TEXTURE_2D, tile.texture);
	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
	                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
	                tile.texture.size = img.width;
	            }
	            gl.generateMipmap(gl.TEXTURE_2D);

	            tile.timeAdded = new Date().getTime();
	            this.map.animationLoop.set(this.style.rasterFadeDuration);

	            tile.source = this;
	            tile.loaded = true;

	            this.fire('tile.load', {tile: tile});
	        }
	    },

	    _abortTile: function(tile) {
	        tile.aborted = true;

	        if (tile.request) {
	            tile.request.abort();
	            delete tile.request;
	        }
	    },

	    _addTile: function(tile) {
	        this.fire('tile.add', {tile: tile});
	    },

	    _removeTile: function(tile) {
	        this.fire('tile.remove', {tile: tile});
	    },

	    _unloadTile: function(tile) {
	        if (tile.texture) this.map.painter.saveTexture(tile.texture);
	    },

	    featuresAt: function(point, params, callback) {
	        callback(null, []);
	    },

	    featuresIn: function(bbox, params, callback) {
	        callback(null, []);
	    }
	});


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var Evented = __webpack_require__(15);
	var TilePyramid = __webpack_require__(22);
	var Source = __webpack_require__(20);
	var urlResolve = __webpack_require__(32);
	var EXTENT = __webpack_require__(24).EXTENT;

	module.exports = GeoJSONSource;

	/**
	 * Create a GeoJSON data source instance given an options object
	 * @class GeoJSONSource
	 * @param {Object} [options]
	 * @param {Object|string} options.data A GeoJSON data object or URL to it. The latter is preferable in case of large GeoJSON files.
	 * @param {number} [options.maxzoom=14] Maximum zoom to preserve detail at.
	 * @param {number} [options.buffer] Tile buffer on each side in pixels.
	 * @param {number} [options.tolerance] Simplification tolerance (higher means simpler) in pixels.
	 * @param {number} [options.cluster] If the data is a collection of point features, setting this to true clusters the points by radius into groups.
	 * @param {number} [options.clusterRadius=50] Radius of each cluster when clustering points, in pixels.
	 * @param {number} [options.clusterMaxZoom] Max zoom to cluster points on. Defaults to one zoom less than `maxzoom` (so that last zoom features are not clustered).

	 * @example
	 * var sourceObj = new mapboxgl.GeoJSONSource({
	 *    data: {
	 *        "type": "FeatureCollection",
	 *        "features": [{
	 *            "type": "Feature",
	 *            "geometry": {
	 *                "type": "Point",
	 *                "coordinates": [
	 *                    -76.53063297271729,
	 *                    39.18174077994108
	 *                ]
	 *            }
	 *        }]
	 *    }
	 * });
	 * map.addSource('some id', sourceObj); // add
	 * map.removeSource('some id');  // remove
	 */
	function GeoJSONSource(options) {
	    options = options || {};

	    this._data = options.data;

	    if (options.maxzoom !== undefined) this.maxzoom = options.maxzoom;

	    var scale = EXTENT / this.tileSize;

	    this.geojsonVtOptions = {
	        buffer: (options.buffer !== undefined ? options.buffer : 128) * scale,
	        tolerance: (options.tolerance !== undefined ? options.tolerance : 0.375) * scale,
	        extent: EXTENT,
	        maxZoom: this.maxzoom
	    };

	    this.cluster = options.cluster || false;
	    this.superclusterOptions = {
	        maxZoom: Math.max(options.clusterMaxZoom, this.maxzoom - 1) || (this.maxzoom - 1),
	        extent: EXTENT,
	        radius: (options.clusterRadius || 50) * scale,
	        log: false
	    };

	    this._pyramid = new TilePyramid({
	        tileSize: this.tileSize,
	        minzoom: this.minzoom,
	        maxzoom: this.maxzoom,
	        reparseOverscaled: true,
	        load: this._loadTile.bind(this),
	        abort: this._abortTile.bind(this),
	        unload: this._unloadTile.bind(this),
	        add: this._addTile.bind(this),
	        remove: this._removeTile.bind(this),
	        redoPlacement: this._redoTilePlacement.bind(this)
	    });
	}

	GeoJSONSource.prototype = util.inherit(Evented, /** @lends GeoJSONSource.prototype */{
	    minzoom: 0,
	    maxzoom: 14,
	    tileSize: 512,
	    _dirty: true,
	    isTileClipped: true,

	    /**
	     * Update source geojson data and rerender map
	     *
	     * @param {Object|string} data A GeoJSON data object or URL to it. The latter is preferable in case of large GeoJSON files.
	     * @returns {GeoJSONSource} this
	     */
	    setData: function(data) {
	        this._data = data;
	        this._dirty = true;

	        this.fire('change');

	        if (this.map)
	            this.update(this.map.transform);

	        return this;
	    },

	    onAdd: function(map) {
	        this.map = map;
	    },

	    loaded: function() {
	        return this._loaded && this._pyramid.loaded();
	    },

	    update: function(transform) {
	        if (this._dirty) {
	            this._updateData();
	        }

	        if (this._loaded) {
	            this._pyramid.update(this.used, transform);
	        }
	    },

	    reload: function() {
	        if (this._loaded) {
	            this._pyramid.reload();
	        }
	    },

	    serialize: function() {
	        return {
	            type: 'geojson',
	            data: this._data
	        };
	    },

	    getVisibleCoordinates: Source._getVisibleCoordinates,
	    getTile: Source._getTile,

	    featuresAt: Source._vectorFeaturesAt,
	    featuresIn: Source._vectorFeaturesIn,

	    _updateData: function() {
	        this._dirty = false;
	        var data = this._data;
	        if (typeof data === 'string' && typeof window != 'undefined') {
	            data = urlResolve(window.location.href, data);
	        }
	        this.workerID = this.dispatcher.send('parse geojson', {
	            data: data,
	            tileSize: this.tileSize,
	            source: this.id,
	            geojsonVtOptions: this.geojsonVtOptions,
	            cluster: this.cluster,
	            superclusterOptions: this.superclusterOptions
	        }, function(err) {
	            this._loaded = true;
	            if (err) {
	                this.fire('error', {error: err});
	            } else {
	                this._pyramid.reload();
	                this.fire('change');
	            }

	        }.bind(this));
	    },

	    _loadTile: function(tile) {
	        var overscaling = tile.coord.z > this.maxzoom ? Math.pow(2, tile.coord.z - this.maxzoom) : 1;
	        var params = {
	            uid: tile.uid,
	            coord: tile.coord,
	            zoom: tile.coord.z,
	            maxZoom: this.maxzoom,
	            tileSize: this.tileSize,
	            source: this.id,
	            overscaling: overscaling,
	            angle: this.map.transform.angle,
	            pitch: this.map.transform.pitch,
	            collisionDebug: this.map.collisionDebug
	        };

	        tile.workerID = this.dispatcher.send('load geojson tile', params, function(err, data) {

	            tile.unloadVectorData(this.map.painter);

	            if (tile.aborted)
	                return;

	            if (err) {
	                this.fire('tile.error', {tile: tile});
	                return;
	            }

	            tile.loadVectorData(data);

	            if (tile.redoWhenDone) {
	                tile.redoWhenDone = false;
	                tile.redoPlacement(this);
	            }

	            this.fire('tile.load', {tile: tile});

	        }.bind(this), this.workerID);
	    },

	    _abortTile: function(tile) {
	        tile.aborted = true;
	    },

	    _addTile: function(tile) {
	        this.fire('tile.add', {tile: tile});
	    },

	    _removeTile: function(tile) {
	        this.fire('tile.remove', {tile: tile});
	    },

	    _unloadTile: function(tile) {
	        tile.unloadVectorData(this.map.painter);
	        this.dispatcher.send('remove tile', { uid: tile.uid, source: this.id }, null, tile.workerID);
	    },

	    redoPlacement: Source.redoPlacement,

	    _redoTilePlacement: function(tile) {
	        tile.redoPlacement(this);
	    }
	});


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;// Copyright 2014 Simon Lydell
	// X11 (“MIT”) Licensed. (See LICENSE.)

	void (function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  } else if (typeof exports === "object") {
	    module.exports = factory()
	  } else {
	    root.resolveUrl = factory()
	  }
	}(this, function() {

	  function resolveUrl(/* ...urls */) {
	    var numUrls = arguments.length

	    if (numUrls === 0) {
	      throw new Error("resolveUrl requires at least one argument; got none.")
	    }

	    var base = document.createElement("base")
	    base.href = arguments[0]

	    if (numUrls === 1) {
	      return base.href
	    }

	    var head = document.getElementsByTagName("head")[0]
	    head.insertBefore(base, head.firstChild)

	    var a = document.createElement("a")
	    var resolved

	    for (var index = 1; index < numUrls; index++) {
	      a.href = arguments[index]
	      resolved = a.href
	      base.href = resolved
	    }

	    head.removeChild(base)

	    return resolved
	  }

	  return resolveUrl

	}));


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var Tile = __webpack_require__(23);
	var LngLat = __webpack_require__(34);
	var Point = __webpack_require__(17);
	var Evented = __webpack_require__(15);
	var ajax = __webpack_require__(21);
	var EXTENT = __webpack_require__(24).EXTENT;

	module.exports = VideoSource;

	/**
	 * Create a Video data source instance given an options object
	 * @class VideoSource
	 * @param {Object} [options]
	 * @param {Array<string>} options.urls An array of URLs to video files
	 * @param {Array} options.coordinates lng, lat coordinates in order clockwise starting at the top left: tl, tr, br, bl
	 * @example
	 * var sourceObj = new mapboxgl.VideoSource({
	 *    url: [
	 *        'https://www.mapbox.com/videos/baltimore-smoke.mp4',
	 *        'https://www.mapbox.com/videos/baltimore-smoke.webm'
	 *    ],
	 *    coordinates: [
	 *        [-76.54335737228394, 39.18579907229748],
	 *        [-76.52803659439087, 39.1838364847587],
	 *        [-76.5295386314392, 39.17683392507606],
	 *        [-76.54520273208618, 39.17876344106642]
	 *    ]
	 * });
	 * map.addSource('some id', sourceObj); // add
	 * map.removeSource('some id');  // remove
	 */
	function VideoSource(options) {
	    this.urls = options.urls;
	    this.coordinates = options.coordinates;

	    ajax.getVideo(options.urls, function(err, video) {
	        // @TODO handle errors via event.
	        if (err) return;

	        this.video = video;
	        this.video.loop = true;

	        var loopID;

	        // start repainting when video starts playing
	        this.video.addEventListener('playing', function() {
	            loopID = this.map.style.animationLoop.set(Infinity);
	            this.map._rerender();
	        }.bind(this));

	        // stop repainting when video stops
	        this.video.addEventListener('pause', function() {
	            this.map.style.animationLoop.cancel(loopID);
	        }.bind(this));

	        this._loaded = true;

	        if (this.map) {
	            this.video.play();
	            this.createTile(options.coordinates);
	            this.fire('change');
	        }
	    }.bind(this));
	}

	VideoSource.prototype = util.inherit(Evented, /** @lends VideoSource.prototype */{
	    roundZoom: true,

	    /**
	     * Return the HTML video element.
	     *
	     * @returns {Object}
	     */
	    getVideo: function() {
	        return this.video;
	    },

	    onAdd: function(map) {
	        this.map = map;
	        if (this.video) {
	            this.video.play();
	            this.createTile();
	        }
	    },

	    createTile: function(cornerGeoCoords) {
	        /*
	         * Calculate which mercator tile is suitable for rendering the video in
	         * and create a buffer with the corner coordinates. These coordinates
	         * may be outside the tile, because raster tiles aren't clipped when rendering.
	         */
	        var map = this.map;
	        var cornerZ0Coords = cornerGeoCoords.map(function(coord) {
	            return map.transform.locationCoordinate(LngLat.convert(coord)).zoomTo(0);
	        });

	        var centerCoord = this.centerCoord = util.getCoordinatesCenter(cornerZ0Coords);

	        var tileCoords = cornerZ0Coords.map(function(coord) {
	            var zoomedCoord = coord.zoomTo(centerCoord.zoom);
	            return new Point(
	                Math.round((zoomedCoord.column - centerCoord.column) * EXTENT),
	                Math.round((zoomedCoord.row - centerCoord.row) * EXTENT));
	        });

	        var gl = map.painter.gl;
	        var maxInt16 = 32767;
	        var array = new Int16Array([
	            tileCoords[0].x, tileCoords[0].y, 0, 0,
	            tileCoords[1].x, tileCoords[1].y, maxInt16, 0,
	            tileCoords[3].x, tileCoords[3].y, 0, maxInt16,
	            tileCoords[2].x, tileCoords[2].y, maxInt16, maxInt16
	        ]);

	        this.tile = new Tile();
	        this.tile.buckets = {};

	        this.tile.boundsBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this.tile.boundsBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
	    },

	    loaded: function() {
	        return this.video && this.video.readyState >= 2;
	    },

	    update: function() {
	        // noop
	    },

	    reload: function() {
	        // noop
	    },

	    prepare: function() {
	        if (!this._loaded) return;
	        if (this.video.readyState < 2) return; // not enough data for current position

	        var gl = this.map.painter.gl;
	        if (!this.tile.texture) {
	            this.tile.texture = gl.createTexture();
	            gl.bindTexture(gl.TEXTURE_2D, this.tile.texture);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.video);
	        } else {
	            gl.bindTexture(gl.TEXTURE_2D, this.tile.texture);
	            gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.video);
	        }

	        this._currentTime = this.video.currentTime;
	    },

	    getVisibleCoordinates: function() {
	        if (this.centerCoord) return [this.centerCoord];
	        else return [];
	    },

	    getTile: function() {
	        return this.tile;
	    },

	    featuresAt: function(point, params, callback) {
	        return callback(null, []);
	    },

	    featuresIn: function(bbox, params, callback) {
	        return callback(null, []);
	    },

	    serialize: function() {
	        return {
	            type: 'video',
	            urls: this.urls,
	            coordinates: this.coordinates
	        };
	    }
	});


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = LngLat;

	var wrap = __webpack_require__(11).wrap;

	/**
	 * Create a longitude, latitude object from a given longitude and latitude pair in degrees.
	 * Mapbox GL uses Longitude, Latitude coordinate order to match GeoJSON.
	 *
	 * Note that any Mapbox GL method that accepts a `LngLat` object can also accept an
	 * `Array` and will perform an implicit conversion.  The following lines are equivalent:
	 ```
	 map.setCenter([-73.9749, 40.7736]);
	 map.setCenter( new mapboxgl.LngLat(-73.9749, 40.7736) );
	 ```
	 *
	 * @class LngLat
	 * @classdesc A representation of a longitude, latitude point, in degrees.
	 * @param {number} lng longitude
	 * @param {number} lat latitude
	 * @example
	 * var ll = new mapboxgl.LngLat(-73.9749, 40.7736);
	 */
	function LngLat(lng, lat) {
	    if (isNaN(lng) || isNaN(lat)) {
	        throw new Error('Invalid LngLat object: (' + lng + ', ' + lat + ')');
	    }
	    this.lng = +lng;
	    this.lat = +lat;
	    if (this.lat > 90 || this.lat < -90) {
	        throw new Error('Invalid LngLat latitude value: must be between -90 and 90');
	    }
	}

	/**
	 * Return a new `LngLat` object whose longitude is wrapped to the range (-180, 180).
	 *
	 * @returns {LngLat} wrapped LngLat object
	 * @example
	 * var ll = new mapboxgl.LngLat(286.0251, 40.7736);
	 * var wrapped = ll.wrap();
	 * wrapped.lng; // = -73.9749
	 */
	LngLat.prototype.wrap = function () {
	    return new LngLat(wrap(this.lng, -180, 180), this.lat);
	};

	/**
	 * Return a `LngLat` as an array
	 *
	 * @returns {array} [lng, lat]
	 * @example
	 * var ll = new mapboxgl.LngLat(-73.9749, 40.7736);
	 * ll.toArray(); // = [-73.9749, 40.7736]
	 */
	LngLat.prototype.toArray = function () {
	    return [this.lng, this.lat];
	};

	/**
	 * Return a `LngLat` as a string
	 *
	 * @returns {string} "LngLat(lng, lat)"
	 * @example
	 * var ll = new mapboxgl.LngLat(-73.9749, 40.7736);
	 * ll.toString(); // = "LngLat(-73.9749, 40.7736)"
	 */
	LngLat.prototype.toString = function () {
	    return 'LngLat(' + this.lng + ', ' + this.lat + ')';
	};

	/**
	 * Convert an array to a `LngLat` object, or return an existing `LngLat` object
	 * unchanged.
	 *
	 * @param {Array<number>|LngLat} input `input` to convert
	 * @returns {LngLat} LngLat object or original input
	 * @example
	 * var arr = [-73.9749, 40.7736];
	 * var ll = mapboxgl.LngLat.convert(arr);
	 * ll;   // = LngLat {lng: -73.9749, lat: 40.7736}
	 */
	LngLat.convert = function (input) {
	    if (input instanceof LngLat) {
	        return input;
	    }
	    if (Array.isArray(input)) {
	        return new LngLat(input[0], input[1]);
	    }
	    return input;
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var Tile = __webpack_require__(23);
	var LngLat = __webpack_require__(34);
	var Point = __webpack_require__(17);
	var Evented = __webpack_require__(15);
	var ajax = __webpack_require__(21);
	var EXTENT = __webpack_require__(24).EXTENT;

	module.exports = ImageSource;

	/**
	 * Create an Image source instance given an options object
	 * @class ImageSource
	 * @param {Object} [options]
	 * @param {string} options.url A string URL of an image file
	 * @param {Array} options.coordinates lng, lat coordinates in order clockwise
	 * starting at the top left: tl, tr, br, bl
	 * @example
	 * var sourceObj = new mapboxgl.ImageSource({
	 *    url: 'https://www.mapbox.com/images/foo.png',
	 *    coordinates: [
	 *        [-76.54335737228394, 39.18579907229748],
	 *        [-76.52803659439087, 39.1838364847587],
	 *        [-76.5295386314392, 39.17683392507606],
	 *        [-76.54520273208618, 39.17876344106642]
	 *    ]
	 * });
	 * map.addSource('some id', sourceObj); // add
	 * map.removeSource('some id');  // remove
	 */
	function ImageSource(options) {
	    this.urls = options.urls;
	    this.coordinates = options.coordinates;

	    ajax.getImage(options.url, function(err, image) {
	        // @TODO handle errors via event.
	        if (err) return;

	        this.image = image;

	        this.image.addEventListener('load', function() {
	            this.map._rerender();
	        }.bind(this));

	        this._loaded = true;

	        if (this.map) {
	            this.createTile(options.coordinates);
	            this.fire('change');
	        }
	    }.bind(this));
	}

	ImageSource.prototype = util.inherit(Evented, {
	    onAdd: function(map) {
	        this.map = map;
	        if (this.image) {
	            this.createTile();
	        }
	    },

	    /**
	     * Calculate which mercator tile is suitable for rendering the image in
	     * and create a buffer with the corner coordinates. These coordinates
	     * may be outside the tile, because raster tiles aren't clipped when rendering.
	     * @private
	     */
	    createTile: function(cornerGeoCoords) {
	        var map = this.map;
	        var cornerZ0Coords = cornerGeoCoords.map(function(coord) {
	            return map.transform.locationCoordinate(LngLat.convert(coord)).zoomTo(0);
	        });

	        var centerCoord = this.centerCoord = util.getCoordinatesCenter(cornerZ0Coords);

	        var tileCoords = cornerZ0Coords.map(function(coord) {
	            var zoomedCoord = coord.zoomTo(centerCoord.zoom);
	            return new Point(
	                Math.round((zoomedCoord.column - centerCoord.column) * EXTENT),
	                Math.round((zoomedCoord.row - centerCoord.row) * EXTENT));
	        });

	        var gl = map.painter.gl;
	        var maxInt16 = 32767;
	        var array = new Int16Array([
	            tileCoords[0].x, tileCoords[0].y, 0, 0,
	            tileCoords[1].x, tileCoords[1].y, maxInt16, 0,
	            tileCoords[3].x, tileCoords[3].y, 0, maxInt16,
	            tileCoords[2].x, tileCoords[2].y, maxInt16, maxInt16
	        ]);

	        this.tile = new Tile();
	        this.tile.buckets = {};

	        this.tile.boundsBuffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, this.tile.boundsBuffer);
	        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
	    },

	    loaded: function() {
	        return this.image && this.image.complete;
	    },

	    update: function() {
	        // noop
	    },

	    reload: function() {
	        // noop
	    },

	    prepare: function() {
	        if (!this._loaded || !this.loaded()) return;

	        var painter = this.map.painter;
	        var gl = painter.gl;

	        if (!this.tile.texture) {
	            this.tile.texture = gl.createTexture();
	            gl.bindTexture(gl.TEXTURE_2D, this.tile.texture);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
	        } else {
	            gl.bindTexture(gl.TEXTURE_2D, this.tile.texture);
	            gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
	        }
	    },

	    getVisibleCoordinates: function() {
	        if (this.centerCoord) return [this.centerCoord];
	        else return [];
	    },

	    getTile: function() {
	        return this.tile;
	    },

	    /**
	     * An ImageSource doesn't have any vector features that could
	     * be selectable, so always return an empty array.
	     * @private
	     */
	    featuresAt: function(point, params, callback) {
	        return callback(null, []);
	    },

	    featuresIn: function(bbox, params, callback) {
	        return callback(null, []);
	    },

	    serialize: function() {
	        return {
	            type: 'image',
	            urls: this.urls,
	            coordinates: this.coordinates
	        };
	    }
	});


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var StyleTransition = __webpack_require__(37);
	var StyleDeclaration = __webpack_require__(39);
	var styleSpec = __webpack_require__(43);
	var validateStyle = __webpack_require__(46);
	var parseColor = __webpack_require__(41);
	var Evented = __webpack_require__(15);

	module.exports = StyleLayer;

	var TRANSITION_SUFFIX = '-transition';

	StyleLayer.create = function(layer, refLayer) {
	    var Classes = {
	        background: __webpack_require__(69),
	        circle: __webpack_require__(70),
	        fill: __webpack_require__(71),
	        line: __webpack_require__(72),
	        raster: __webpack_require__(73),
	        symbol: __webpack_require__(74)
	    };
	    return new Classes[(refLayer || layer).type](layer, refLayer);
	};

	function StyleLayer(layer, refLayer) {
	    this.id = layer.id;
	    this.ref = layer.ref;
	    this.metadata = layer.metadata;
	    this.type = (refLayer || layer).type;
	    this.source = (refLayer || layer).source;
	    this.sourceLayer = (refLayer || layer)['source-layer'];
	    this.minzoom = (refLayer || layer).minzoom;
	    this.maxzoom = (refLayer || layer).maxzoom;
	    this.filter = (refLayer || layer).filter;
	    this.interactive = (refLayer || layer).interactive;

	    this._paintSpecifications = styleSpec['paint_' + this.type];
	    this._layoutSpecifications = styleSpec['layout_' + this.type];

	    this._paintTransitions = {}; // {[propertyName]: StyleTransition}
	    this._paintTransitionOptions = {}; // {[className]: {[propertyName]: { duration:Number, delay:Number }}}
	    this._paintDeclarations = {}; // {[className]: {[propertyName]: StyleDeclaration}}
	    this._layoutDeclarations = {}; // {[propertyName]: StyleDeclaration}

	    // Resolve paint declarations
	    for (var key in layer) {
	        var match = key.match(/^paint(?:\.(.*))?$/);
	        if (match) {
	            var klass = match[1] || '';
	            for (var paintName in layer[key]) {
	                this.setPaintProperty(paintName, layer[key][paintName], klass);
	            }
	        }
	    }

	    // Resolve layout declarations
	    if (this.ref) {
	        this._layoutDeclarations = refLayer._layoutDeclarations;
	    } else {
	        for (var layoutName in layer.layout) {
	            this.setLayoutProperty(layoutName, layer.layout[layoutName]);
	        }
	    }
	}

	StyleLayer.prototype = util.inherit(Evented, {

	    setLayoutProperty: function(name, value) {

	        if (value == null) {
	            delete this._layoutDeclarations[name];
	        } else {
	            if (validateStyle.emitErrors(this, validateStyle.layoutProperty({
	                layerType: this.type,
	                objectKey: name,
	                value: value,
	                styleSpec: styleSpec
	            }))) return;
	            this._layoutDeclarations[name] = new StyleDeclaration(this._layoutSpecifications[name], value);
	        }
	    },

	    getLayoutProperty: function(name) {
	        return (
	            this._layoutDeclarations[name] &&
	            this._layoutDeclarations[name].value
	        );
	    },

	    getLayoutValue: function(name, zoom, zoomHistory) {
	        var specification = this._layoutSpecifications[name];
	        var declaration = this._layoutDeclarations[name];

	        if (declaration) {
	            return declaration.calculate(zoom, zoomHistory);
	        } else {
	            return specification.default;
	        }
	    },

	    setPaintProperty: function(name, value, klass) {

	        if (util.endsWith(name, TRANSITION_SUFFIX)) {
	            if (!this._paintTransitionOptions[klass || '']) {
	                this._paintTransitionOptions[klass || ''] = {};
	            }
	            if (value === null || value === undefined) {
	                delete this._paintTransitionOptions[klass || ''][name];
	            } else {
	                if (validateStyle.emitErrors(this, validateStyle.paintProperty({
	                    layerType: this.type,
	                    objectKey: name,
	                    value: value,
	                    styleSpec: styleSpec
	                }))) return;
	                this._paintTransitionOptions[klass || ''][name] = value;
	            }
	        } else {
	            if (!this._paintDeclarations[klass || '']) {
	                this._paintDeclarations[klass || ''] = {};
	            }
	            if (value === null || value === undefined) {
	                delete this._paintDeclarations[klass || ''][name];
	            } else {
	                if (validateStyle.emitErrors(this, validateStyle.paintProperty({
	                    layerType: this.type,
	                    objectKey: name,
	                    value: value,
	                    styleSpec: styleSpec
	                }))) return;
	                this._paintDeclarations[klass || ''][name] = new StyleDeclaration(this._paintSpecifications[name], value);
	            }
	        }
	    },

	    getPaintProperty: function(name, klass) {
	        klass = klass || '';
	        if (util.endsWith(name, TRANSITION_SUFFIX)) {
	            return (
	                this._paintTransitionOptions[klass] &&
	                this._paintTransitionOptions[klass][name]
	            );
	        } else {
	            return (
	                this._paintDeclarations[klass] &&
	                this._paintDeclarations[klass][name] &&
	                this._paintDeclarations[klass][name].value
	            );
	        }
	    },

	    getPaintValue: function(name, zoom, zoomHistory) {
	        var specification = this._paintSpecifications[name];
	        var transition = this._paintTransitions[name];

	        if (transition) {
	            return transition.at(zoom, zoomHistory);
	        } else if (specification.type === 'color' && specification.default) {
	            return parseColor(specification.default);
	        } else {
	            return specification.default;
	        }
	    },

	    isHidden: function(zoom) {
	        if (this.minzoom && zoom < this.minzoom) return true;
	        if (this.maxzoom && zoom >= this.maxzoom) return true;

	        if (this.getLayoutValue('visibility') === 'none') return true;

	        var opacityProperty = this.type + '-opacity';
	        if (this._paintSpecifications[opacityProperty] && this.getPaintValue(opacityProperty) === 0) return true;

	        return false;
	    },

	    // update classes
	    cascade: function(classes, options, globalTransitionOptions, animationLoop) {
	        var oldTransitions = this._paintTransitions;
	        var newTransitions = this._paintTransitions = {};
	        var that = this;

	        // Apply new declarations in all active classes
	        for (var klass in this._paintDeclarations) {
	            if (klass !== "" && !classes[klass]) continue;
	            for (var name in this._paintDeclarations[klass]) {
	                applyDeclaration(name, this._paintDeclarations[klass][name]);
	            }
	        }

	        // Apply removed declarations
	        var removedNames = util.keysDifference(oldTransitions, newTransitions);
	        for (var i = 0; i < removedNames.length; i++) {
	            var spec = this._paintSpecifications[removedNames[i]];
	            applyDeclaration(removedNames[i], new StyleDeclaration(spec, spec.default));
	        }

	        function applyDeclaration(name, declaration) {
	            var oldTransition = options.transition ? oldTransitions[name] : undefined;

	            if (oldTransition && oldTransition.declaration.json === declaration.json) {
	                newTransitions[name] = oldTransition;

	            } else {
	                var newTransition = new StyleTransition(declaration, oldTransition, util.extend(
	                    {duration: 300, delay: 0},
	                    globalTransitionOptions,
	                    that.getPaintProperty(name + TRANSITION_SUFFIX)
	                ));

	                if (!newTransition.instant()) {
	                    newTransition.loopID = animationLoop.set(newTransition.endTime - (new Date()).getTime());
	                }

	                if (oldTransition) {
	                    animationLoop.cancel(oldTransition.loopID);
	                }

	                newTransitions[name] = newTransition;
	            }
	        }
	    },

	    // update zoom
	    recalculate: function(zoom, zoomHistory) {
	        this.paint = {};
	        for (var paintName in this._paintSpecifications) {
	            this.paint[paintName] = this.getPaintValue(paintName, zoom, zoomHistory);
	        }

	        this.layout = {};
	        for (var layoutName in this._layoutSpecifications) {
	            this.layout[layoutName] = this.getLayoutValue(layoutName, zoom, zoomHistory);
	        }
	    },

	    serialize: function(options) {
	        var output = {
	            'id': this.id,
	            'ref': this.ref,
	            'metadata': this.metadata,
	            'minzoom': this.minzoom,
	            'maxzoom': this.maxzoom,
	            'interactive': this.interactive
	        };

	        for (var klass in this._paintDeclarations) {
	            var key = klass === '' ? 'paint' : 'paint.' + klass;
	            output[key] = util.mapObject(this._paintDeclarations[klass], getDeclarationValue);
	        }

	        if (!this.ref || (options && options.includeRefProperties)) {
	            util.extend(output, {
	                'type': this.type,
	                'source': this.source,
	                'source-layer': this.sourceLayer,
	                'filter': this.filter,
	                'layout': util.mapObject(this._layoutDeclarations, getDeclarationValue)
	            });
	        }

	        return util.filterObject(output, function(value, key) {
	            return value !== undefined && !(key === 'layout' && !Object.keys(value).length);
	        });
	    }
	});

	function getDeclarationValue(declaration) {
	    return declaration.value;
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var interpolate = __webpack_require__(38);

	module.exports = StyleTransition;

	/*
	 * Represents a transition between two declarations
	 */
	function StyleTransition(declaration, oldTransition, value) {

	    this.declaration = declaration;
	    this.startTime = this.endTime = (new Date()).getTime();

	    var type = declaration.type;
	    if ((type === 'string' || type === 'array') && declaration.transitionable) {
	        this.interp = interpZoomTransitioned;
	    } else {
	        this.interp = interpolate[type];
	    }

	    this.oldTransition = oldTransition;
	    this.duration = value.duration || 0;
	    this.delay = value.delay || 0;

	    if (!this.instant()) {
	        this.endTime = this.startTime + this.duration + this.delay;
	        this.ease = util.easeCubicInOut;
	    }

	    if (oldTransition && oldTransition.endTime <= this.startTime) {
	        // Old transition is done running, so we can
	        // delete its reference to its old transition.

	        delete oldTransition.oldTransition;
	    }
	}

	StyleTransition.prototype.instant = function() {
	    return !this.oldTransition || !this.interp || (this.duration === 0 && this.delay === 0);
	};

	/*
	 * Return the value of the transitioning property at zoom level `z` and optional time `t`
	 */
	StyleTransition.prototype.at = function(z, zoomHistory, t) {

	    var value = this.declaration.calculate(z, zoomHistory, this.duration);

	    if (this.instant()) return value;

	    t = t || Date.now();

	    if (t < this.endTime) {
	        var oldValue = this.oldTransition.at(z, zoomHistory, this.startTime);
	        var eased = this.ease((t - this.startTime - this.delay) / this.duration);
	        value = this.interp(oldValue, value, eased);
	    }

	    return value;

	};

	function interpZoomTransitioned(from, to, t) {
	    return {
	        from: from.to,
	        fromScale: from.toScale,
	        to: to.to,
	        toScale: to.toScale,
	        t: t
	    };
	}


/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	module.exports = interpolate;

	function interpolate(a, b, t) {
	    return (a * (1 - t)) + (b * t);
	}

	interpolate.number = interpolate;

	interpolate.vec2 = function(from, to, t) {
	    return [
	        interpolate(from[0], to[0], t),
	        interpolate(from[1], to[1], t)
	    ];
	};

	/*
	 * Interpolate between two colors given as 4-element arrays.
	 *
	 * @param {Color} from
	 * @param {Color} to
	 * @param {number} t interpolation factor between 0 and 1
	 * @returns {Color} interpolated color
	 */
	interpolate.color = function(from, to, t) {
	    return [
	        interpolate(from[0], to[0], t),
	        interpolate(from[1], to[1], t),
	        interpolate(from[2], to[2], t),
	        interpolate(from[3], to[3], t)
	    ];
	};

	interpolate.array = function(from, to, t) {
	    return from.map(function(d, i) {
	        return interpolate(d, to[i], t);
	    });
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var MapboxGLFunction = __webpack_require__(40);
	var parseColor = __webpack_require__(41);

	module.exports = StyleDeclaration;

	function StyleDeclaration(reference, value) {
	    this.type = reference.type;
	    this.transitionable = reference.transition;
	    this.value = value;

	    // immutable representation of value. used for comparison
	    this.json = JSON.stringify(this.value);

	    var parsedValue = this.type === 'color' ? parseColor(this.value) : value;
	    if (reference.function === 'interpolated') {
	        this.calculate = MapboxGLFunction.interpolated(parsedValue);
	    } else {
	        this.calculate = MapboxGLFunction['piecewise-constant'](parsedValue);
	        if (reference.transition) {
	            this.calculate = transitioned(this.calculate);
	        }
	    }
	}

	function transitioned(calculate) {
	    return function(z, zh, duration) {
	        var fraction = z % 1;
	        var t = Math.min((Date.now() - zh.lastIntegerZoomTime) / duration, 1);
	        var fromScale = 1;
	        var toScale = 1;
	        var mix, from, to;

	        if (z > zh.lastIntegerZoom) {
	            mix = fraction + (1 - fraction) * t;
	            fromScale *= 2;
	            from = calculate(z - 1);
	            to = calculate(z);
	        } else {
	            mix = 1 - (1 - t) * fraction;
	            to = calculate(z);
	            from = calculate(z + 1);
	            fromScale /= 2;
	        }

	        return {
	            from: from,
	            fromScale: fromScale,
	            to: to,
	            toScale: toScale,
	            t: mix
	        };
	    };
	}


/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	function constant(value) {
	    return function() {
	        return value;
	    }
	}

	function interpolateNumber(a, b, t) {
	    return (a * (1 - t)) + (b * t);
	}

	function interpolateArray(a, b, t) {
	    var result = [];
	    for (var i = 0; i < a.length; i++) {
	        result[i] = interpolateNumber(a[i], b[i], t);
	    }
	    return result;
	}

	exports['interpolated'] = function(f) {
	    if (!f.stops) {
	        return constant(f);
	    }

	    var stops = f.stops,
	        base = f.base || 1,
	        interpolate = Array.isArray(stops[0][1]) ? interpolateArray : interpolateNumber;

	    return function(z) {
	        // find the two stops which the current z is between
	        var low, high;

	        for (var i = 0; i < stops.length; i++) {
	            var stop = stops[i];

	            if (stop[0] <= z) {
	                low = stop;
	            }

	            if (stop[0] > z) {
	                high = stop;
	                break;
	            }
	        }

	        if (low && high) {
	            var zoomDiff = high[0] - low[0],
	                zoomProgress = z - low[0],

	                t = base === 1 ?
	                zoomProgress / zoomDiff :
	                (Math.pow(base, zoomProgress) - 1) / (Math.pow(base, zoomDiff) - 1);

	            return interpolate(low[1], high[1], t);

	        } else if (low) {
	            return low[1];

	        } else if (high) {
	            return high[1];
	        }
	    };
	};

	exports['piecewise-constant'] = function(f) {
	    if (!f.stops) {
	        return constant(f);
	    }

	    var stops = f.stops;

	    return function(z) {
	        for (var i = 0; i < stops.length; i++) {
	            if (stops[i][0] > z) {
	                return stops[i === 0 ? 0 : i - 1][1];
	            }
	        }

	        return stops[stops.length - 1][1];
	    }
	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var parseCSSColor = __webpack_require__(42).parseCSSColor;
	var util = __webpack_require__(11);

	var colorCache = {};

	function parseColor(input) {

	    if (colorCache[input]) {
	        return colorCache[input];

	    // RGBA array
	    } else if (Array.isArray(input)) {
	        return input;

	    // GL function
	    } else if (input && input.stops) {
	        return util.extend({}, input, {
	            stops: input.stops.map(parseFunctionStopColor)
	        });

	    // Color string
	    } else if (typeof input === 'string') {
	        var parsedColor = parseCSSColor(input);
	        if (!parsedColor) { throw new Error('Invalid color ' + input); }

	        var output = colorDowngrade(parsedColor);
	        colorCache[input] = output;
	        return output;

	    } else {
	        throw new Error('Invalid color ' + input);
	    }

	}

	function parseFunctionStopColor(stop) {
	    return [stop[0], parseColor(stop[1])];
	}

	function colorDowngrade(color) {
	    return [color[0] / 255, color[1] / 255, color[2] / 255, color[3] / 1];
	}

	module.exports = parseColor;


/***/ },
/* 42 */
/***/ function(module, exports) {

	// (c) Dean McNamee <dean@gmail.com>, 2012.
	//
	// https://github.com/deanm/css-color-parser-js
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
	// IN THE SOFTWARE.

	// http://www.w3.org/TR/css3-color/
	var kCSSColorTable = {
	  "transparent": [0,0,0,0], "aliceblue": [240,248,255,1],
	  "antiquewhite": [250,235,215,1], "aqua": [0,255,255,1],
	  "aquamarine": [127,255,212,1], "azure": [240,255,255,1],
	  "beige": [245,245,220,1], "bisque": [255,228,196,1],
	  "black": [0,0,0,1], "blanchedalmond": [255,235,205,1],
	  "blue": [0,0,255,1], "blueviolet": [138,43,226,1],
	  "brown": [165,42,42,1], "burlywood": [222,184,135,1],
	  "cadetblue": [95,158,160,1], "chartreuse": [127,255,0,1],
	  "chocolate": [210,105,30,1], "coral": [255,127,80,1],
	  "cornflowerblue": [100,149,237,1], "cornsilk": [255,248,220,1],
	  "crimson": [220,20,60,1], "cyan": [0,255,255,1],
	  "darkblue": [0,0,139,1], "darkcyan": [0,139,139,1],
	  "darkgoldenrod": [184,134,11,1], "darkgray": [169,169,169,1],
	  "darkgreen": [0,100,0,1], "darkgrey": [169,169,169,1],
	  "darkkhaki": [189,183,107,1], "darkmagenta": [139,0,139,1],
	  "darkolivegreen": [85,107,47,1], "darkorange": [255,140,0,1],
	  "darkorchid": [153,50,204,1], "darkred": [139,0,0,1],
	  "darksalmon": [233,150,122,1], "darkseagreen": [143,188,143,1],
	  "darkslateblue": [72,61,139,1], "darkslategray": [47,79,79,1],
	  "darkslategrey": [47,79,79,1], "darkturquoise": [0,206,209,1],
	  "darkviolet": [148,0,211,1], "deeppink": [255,20,147,1],
	  "deepskyblue": [0,191,255,1], "dimgray": [105,105,105,1],
	  "dimgrey": [105,105,105,1], "dodgerblue": [30,144,255,1],
	  "firebrick": [178,34,34,1], "floralwhite": [255,250,240,1],
	  "forestgreen": [34,139,34,1], "fuchsia": [255,0,255,1],
	  "gainsboro": [220,220,220,1], "ghostwhite": [248,248,255,1],
	  "gold": [255,215,0,1], "goldenrod": [218,165,32,1],
	  "gray": [128,128,128,1], "green": [0,128,0,1],
	  "greenyellow": [173,255,47,1], "grey": [128,128,128,1],
	  "honeydew": [240,255,240,1], "hotpink": [255,105,180,1],
	  "indianred": [205,92,92,1], "indigo": [75,0,130,1],
	  "ivory": [255,255,240,1], "khaki": [240,230,140,1],
	  "lavender": [230,230,250,1], "lavenderblush": [255,240,245,1],
	  "lawngreen": [124,252,0,1], "lemonchiffon": [255,250,205,1],
	  "lightblue": [173,216,230,1], "lightcoral": [240,128,128,1],
	  "lightcyan": [224,255,255,1], "lightgoldenrodyellow": [250,250,210,1],
	  "lightgray": [211,211,211,1], "lightgreen": [144,238,144,1],
	  "lightgrey": [211,211,211,1], "lightpink": [255,182,193,1],
	  "lightsalmon": [255,160,122,1], "lightseagreen": [32,178,170,1],
	  "lightskyblue": [135,206,250,1], "lightslategray": [119,136,153,1],
	  "lightslategrey": [119,136,153,1], "lightsteelblue": [176,196,222,1],
	  "lightyellow": [255,255,224,1], "lime": [0,255,0,1],
	  "limegreen": [50,205,50,1], "linen": [250,240,230,1],
	  "magenta": [255,0,255,1], "maroon": [128,0,0,1],
	  "mediumaquamarine": [102,205,170,1], "mediumblue": [0,0,205,1],
	  "mediumorchid": [186,85,211,1], "mediumpurple": [147,112,219,1],
	  "mediumseagreen": [60,179,113,1], "mediumslateblue": [123,104,238,1],
	  "mediumspringgreen": [0,250,154,1], "mediumturquoise": [72,209,204,1],
	  "mediumvioletred": [199,21,133,1], "midnightblue": [25,25,112,1],
	  "mintcream": [245,255,250,1], "mistyrose": [255,228,225,1],
	  "moccasin": [255,228,181,1], "navajowhite": [255,222,173,1],
	  "navy": [0,0,128,1], "oldlace": [253,245,230,1],
	  "olive": [128,128,0,1], "olivedrab": [107,142,35,1],
	  "orange": [255,165,0,1], "orangered": [255,69,0,1],
	  "orchid": [218,112,214,1], "palegoldenrod": [238,232,170,1],
	  "palegreen": [152,251,152,1], "paleturquoise": [175,238,238,1],
	  "palevioletred": [219,112,147,1], "papayawhip": [255,239,213,1],
	  "peachpuff": [255,218,185,1], "peru": [205,133,63,1],
	  "pink": [255,192,203,1], "plum": [221,160,221,1],
	  "powderblue": [176,224,230,1], "purple": [128,0,128,1],
	  "red": [255,0,0,1], "rosybrown": [188,143,143,1],
	  "royalblue": [65,105,225,1], "saddlebrown": [139,69,19,1],
	  "salmon": [250,128,114,1], "sandybrown": [244,164,96,1],
	  "seagreen": [46,139,87,1], "seashell": [255,245,238,1],
	  "sienna": [160,82,45,1], "silver": [192,192,192,1],
	  "skyblue": [135,206,235,1], "slateblue": [106,90,205,1],
	  "slategray": [112,128,144,1], "slategrey": [112,128,144,1],
	  "snow": [255,250,250,1], "springgreen": [0,255,127,1],
	  "steelblue": [70,130,180,1], "tan": [210,180,140,1],
	  "teal": [0,128,128,1], "thistle": [216,191,216,1],
	  "tomato": [255,99,71,1], "turquoise": [64,224,208,1],
	  "violet": [238,130,238,1], "wheat": [245,222,179,1],
	  "white": [255,255,255,1], "whitesmoke": [245,245,245,1],
	  "yellow": [255,255,0,1], "yellowgreen": [154,205,50,1]}

	function clamp_css_byte(i) {  // Clamp to integer 0 .. 255.
	  i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
	  return i < 0 ? 0 : i > 255 ? 255 : i;
	}

	function clamp_css_float(f) {  // Clamp to float 0.0 .. 1.0.
	  return f < 0 ? 0 : f > 1 ? 1 : f;
	}

	function parse_css_int(str) {  // int or percentage.
	  if (str[str.length - 1] === '%')
	    return clamp_css_byte(parseFloat(str) / 100 * 255);
	  return clamp_css_byte(parseInt(str));
	}

	function parse_css_float(str) {  // float or percentage.
	  if (str[str.length - 1] === '%')
	    return clamp_css_float(parseFloat(str) / 100);
	  return clamp_css_float(parseFloat(str));
	}

	function css_hue_to_rgb(m1, m2, h) {
	  if (h < 0) h += 1;
	  else if (h > 1) h -= 1;

	  if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
	  if (h * 2 < 1) return m2;
	  if (h * 3 < 2) return m1 + (m2 - m1) * (2/3 - h) * 6;
	  return m1;
	}

	function parseCSSColor(css_str) {
	  // Remove all whitespace, not compliant, but should just be more accepting.
	  var str = css_str.replace(/ /g, '').toLowerCase();

	  // Color keywords (and transparent) lookup.
	  if (str in kCSSColorTable) return kCSSColorTable[str].slice();  // dup.

	  // #abc and #abc123 syntax.
	  if (str[0] === '#') {
	    if (str.length === 4) {
	      var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
	      if (!(iv >= 0 && iv <= 0xfff)) return null;  // Covers NaN.
	      return [((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8),
	              (iv & 0xf0) | ((iv & 0xf0) >> 4),
	              (iv & 0xf) | ((iv & 0xf) << 4),
	              1];
	    } else if (str.length === 7) {
	      var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
	      if (!(iv >= 0 && iv <= 0xffffff)) return null;  // Covers NaN.
	      return [(iv & 0xff0000) >> 16,
	              (iv & 0xff00) >> 8,
	              iv & 0xff,
	              1];
	    }

	    return null;
	  }

	  var op = str.indexOf('('), ep = str.indexOf(')');
	  if (op !== -1 && ep + 1 === str.length) {
	    var fname = str.substr(0, op);
	    var params = str.substr(op+1, ep-(op+1)).split(',');
	    var alpha = 1;  // To allow case fallthrough.
	    switch (fname) {
	      case 'rgba':
	        if (params.length !== 4) return null;
	        alpha = parse_css_float(params.pop());
	        // Fall through.
	      case 'rgb':
	        if (params.length !== 3) return null;
	        return [parse_css_int(params[0]),
	                parse_css_int(params[1]),
	                parse_css_int(params[2]),
	                alpha];
	      case 'hsla':
	        if (params.length !== 4) return null;
	        alpha = parse_css_float(params.pop());
	        // Fall through.
	      case 'hsl':
	        if (params.length !== 3) return null;
	        var h = (((parseFloat(params[0]) % 360) + 360) % 360) / 360;  // 0 .. 1
	        // NOTE(deanm): According to the CSS spec s/l should only be
	        // percentages, but we don't bother and let float or percentage.
	        var s = parse_css_float(params[1]);
	        var l = parse_css_float(params[2]);
	        var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
	        var m1 = l * 2 - m2;
	        return [clamp_css_byte(css_hue_to_rgb(m1, m2, h+1/3) * 255),
	                clamp_css_byte(css_hue_to_rgb(m1, m2, h) * 255),
	                clamp_css_byte(css_hue_to_rgb(m1, m2, h-1/3) * 255),
	                alpha];
	      default:
	        return null;
	    }
	  }

	  return null;
	}

	try { exports.parseCSSColor = parseCSSColor } catch(e) { }


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(44);


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(45);


/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = {
		"$version": 8,
		"$root": {
			"version": {
				"required": true,
				"type": "enum",
				"values": [
					8
				],
				"doc": "Stylesheet version number. Must be 8.",
				"example": 8
			},
			"name": {
				"type": "string",
				"doc": "A human-readable name for the style.",
				"example": "Bright"
			},
			"metadata": {
				"type": "*",
				"doc": "Arbitrary properties useful to track with the stylesheet, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."
			},
			"center": {
				"type": "array",
				"value": "number",
				"doc": "Default map center in longitude and latitude.  The style center will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
				"example": [
					-73.9749,
					40.7736
				]
			},
			"zoom": {
				"type": "number",
				"doc": "Default zoom level.  The style zoom will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
				"example": 12.5
			},
			"bearing": {
				"type": "number",
				"default": 0,
				"period": 360,
				"units": "degrees",
				"doc": "Default bearing, in degrees.  The style bearing will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
				"example": 29
			},
			"pitch": {
				"type": "number",
				"default": 0,
				"units": "degrees",
				"doc": "Default pitch, in degrees. Zero is perpendicular to the surface.  The style pitch will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
				"example": 50
			},
			"sources": {
				"required": true,
				"type": "sources",
				"doc": "Data source specifications.",
				"example": {
					"mapbox-streets": {
						"type": "vector",
						"url": "mapbox://mapbox.mapbox-streets-v6"
					}
				}
			},
			"sprite": {
				"type": "string",
				"doc": "A base URL for retrieving the sprite image and metadata. The extensions `.png`, `.json` and scale factor `@2x.png` will be automatically appended.",
				"example": "mapbox://sprites/mapbox/bright-v8"
			},
			"glyphs": {
				"type": "string",
				"doc": "A URL template for loading signed-distance-field glyph sets in PBF format. Valid tokens are {fontstack} and {range}.",
				"example": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf"
			},
			"transition": {
				"type": "transition",
				"doc": "A global transition definition to use as a default across properties.",
				"example": {
					"duration": 300,
					"delay": 0
				}
			},
			"layers": {
				"required": true,
				"type": "array",
				"value": "layer",
				"doc": "Layers will be drawn in the order of this array.",
				"example": [
					{
						"id": "water",
						"source": "mapbox-streets",
						"source-layer": "water",
						"type": "fill",
						"paint": {
							"fill-color": "#00ffff"
						}
					}
				]
			}
		},
		"sources": {
			"*": {
				"type": "source",
				"doc": "Specification of a data source. For vector and raster sources, either TileJSON or a URL to a TileJSON must be provided. For GeoJSON and video sources, a URL must be provided."
			}
		},
		"source": [
			"source_tile",
			"source_geojson",
			"source_video",
			"source_image"
		],
		"source_tile": {
			"type": {
				"required": true,
				"type": "enum",
				"values": [
					"vector",
					"raster"
				],
				"doc": "The data type of the tile source."
			},
			"url": {
				"type": "string",
				"doc": "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<mapid>`."
			},
			"tiles": {
				"type": "array",
				"value": "string",
				"doc": "An array of one or more tile source URLs, as in the TileJSON spec."
			},
			"minzoom": {
				"type": "number",
				"default": 0,
				"doc": "Minimum zoom level for which tiles are available, as in the TileJSON spec."
			},
			"maxzoom": {
				"type": "number",
				"default": 22,
				"doc": "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
			},
			"tileSize": {
				"type": "number",
				"default": 512,
				"units": "pixels",
				"doc": "The minimum visual size to display tiles for this layer. Only configurable for raster layers."
			},
			"*": {
				"type": "*",
				"doc": "Other keys to configure the data source."
			}
		},
		"source_geojson": {
			"type": {
				"required": true,
				"type": "enum",
				"values": [
					"geojson"
				],
				"doc": "The data type of the GeoJSON source."
			},
			"data": {
				"type": "*",
				"doc": "A URL to a GeoJSON file, or inline GeoJSON."
			},
			"maxzoom": {
				"type": "number",
				"default": 14,
				"doc": "Maximum zoom level at which to create vector tiles (higher means greater detail at high zoom levels)."
			},
			"buffer": {
				"type": "number",
				"default": 64,
				"doc": "Tile buffer size on each side (higher means fewer rendering artifacts near tile edges but slower performance)."
			},
			"tolerance": {
				"type": "number",
				"default": 3,
				"doc": "Douglas-Peucker simplification tolerance (higher means simpler geometries and faster performance)."
			},
			"cluster": {
				"type": "boolean",
				"default": false,
				"doc": "If the data is a collection of point features, setting this to true clusters the points by radius into groups."
			},
			"clusterRadius": {
				"type": "number",
				"default": 400,
				"doc": "Radius of each cluster when clustering points, relative to 4096 tile."
			},
			"clusterMaxZoom": {
				"type": "number",
				"doc": "Max zoom to cluster points on. Defaults to one zoom less than maxzoom (so that last zoom features are not clustered)."
			}
		},
		"source_video": {
			"type": {
				"required": true,
				"type": "enum",
				"values": [
					"video"
				],
				"doc": "The data type of the video source."
			},
			"urls": {
				"required": true,
				"type": "array",
				"value": "string",
				"doc": "URLs to video content in order of preferred format."
			},
			"coordinates": {
				"required": true,
				"doc": "Corners of video specified in longitude, latitude pairs.",
				"type": "array",
				"length": 4,
				"value": {
					"type": "array",
					"length": 2,
					"value": "number",
					"doc": "A single longitude, latitude pair."
				}
			}
		},
		"source_image": {
			"type": {
				"required": true,
				"type": "enum",
				"values": [
					"image"
				],
				"doc": "The data type of the image source."
			},
			"url": {
				"required": true,
				"type": "string",
				"doc": "URL that points to an image"
			},
			"coordinates": {
				"required": true,
				"doc": "Corners of image specified in longitude, latitude pairs.",
				"type": "array",
				"length": 4,
				"value": {
					"type": "array",
					"length": 2,
					"value": "number",
					"doc": "A single longitude, latitude pair."
				}
			}
		},
		"layer": {
			"id": {
				"type": "string",
				"doc": "Unique layer name.",
				"required": true
			},
			"type": {
				"type": "enum",
				"values": [
					"fill",
					"line",
					"symbol",
					"circle",
					"raster",
					"background"
				],
				"doc": "Rendering type of this layer."
			},
			"metadata": {
				"type": "*",
				"doc": "Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."
			},
			"ref": {
				"type": "string",
				"doc": "References another layer to copy `type`, `source`, `source-layer`, `minzoom`, `maxzoom`, `filter`, and `layout` properties from. This allows the layers to share processing and be more efficient."
			},
			"source": {
				"type": "string",
				"doc": "Name of a source description to be used for this layer."
			},
			"source-layer": {
				"type": "string",
				"doc": "Layer to use from a vector tile source. Required if the source supports multiple layers."
			},
			"minzoom": {
				"type": "number",
				"minimum": 0,
				"maximum": 22,
				"doc": "The minimum zoom level on which the layer gets parsed and appears on."
			},
			"maxzoom": {
				"type": "number",
				"minimum": 0,
				"maximum": 22,
				"doc": "The maximum zoom level on which the layer gets parsed and appears on."
			},
			"interactive": {
				"type": "boolean",
				"doc": "Enable querying of feature data from this layer for interactivity.",
				"default": false
			},
			"filter": {
				"type": "filter",
				"doc": "A expression specifying conditions on source features. Only features that match the filter are displayed."
			},
			"layout": {
				"type": "layout",
				"doc": "Layout properties for the layer."
			},
			"paint": {
				"type": "paint",
				"doc": "Default paint properties for this layer."
			},
			"paint.*": {
				"type": "paint",
				"doc": "Class-specific paint properties for this layer. The class name is the part after the first dot."
			}
		},
		"layout": [
			"layout_fill",
			"layout_line",
			"layout_circle",
			"layout_symbol",
			"layout_raster",
			"layout_background"
		],
		"layout_background": {
			"visibility": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"visible",
					"none"
				],
				"default": "visible",
				"doc": "The display of this layer. `none` hides this layer."
			}
		},
		"layout_fill": {
			"visibility": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"visible",
					"none"
				],
				"default": "visible",
				"doc": "The display of this layer. `none` hides this layer."
			}
		},
		"layout_circle": {
			"visibility": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"visible",
					"none"
				],
				"default": "visible",
				"doc": "The display of this layer. `none` hides this layer."
			}
		},
		"layout_line": {
			"line-cap": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"butt",
					"round",
					"square"
				],
				"default": "butt",
				"doc": "The display of line endings."
			},
			"line-join": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"bevel",
					"round",
					"miter"
				],
				"default": "miter",
				"doc": "The display of lines when joining."
			},
			"line-miter-limit": {
				"type": "number",
				"default": 2,
				"function": "interpolated",
				"doc": "Used to automatically convert miter joins to bevel joins for sharp angles.",
				"requires": [
					{
						"line-join": "miter"
					}
				]
			},
			"line-round-limit": {
				"type": "number",
				"default": 1.05,
				"function": "interpolated",
				"doc": "Used to automatically convert round joins to miter joins for shallow angles.",
				"requires": [
					{
						"line-join": "round"
					}
				]
			},
			"visibility": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"visible",
					"none"
				],
				"default": "visible",
				"doc": "The display of this layer. `none` hides this layer."
			}
		},
		"layout_symbol": {
			"symbol-placement": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"point",
					"line"
				],
				"default": "point",
				"doc": "Label placement relative to its geometry. `line` can only be used on LineStrings and Polygons."
			},
			"symbol-spacing": {
				"type": "number",
				"default": 250,
				"minimum": 1,
				"function": "interpolated",
				"units": "pixels",
				"doc": "Distance between two symbol anchors.",
				"requires": [
					{
						"symbol-placement": "line"
					}
				]
			},
			"symbol-avoid-edges": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"doc": "If true, the symbols will not cross tile edges to avoid mutual collisions. Recommended in layers that don't have enough padding in the vector tile to prevent collisions, or if it is a point symbol layer placed after a line symbol layer."
			},
			"icon-allow-overlap": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"doc": "If true, the icon will be visible even if it collides with other previously drawn symbols.",
				"requires": [
					"icon-image"
				]
			},
			"icon-ignore-placement": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"doc": "If true, other symbols can be visible even if they collide with the icon.",
				"requires": [
					"icon-image"
				]
			},
			"icon-optional": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"doc": "If true, text will display without their corresponding icons when the icon collides with other symbols and the text does not.",
				"requires": [
					"icon-image",
					"text-field"
				]
			},
			"icon-rotation-alignment": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"map",
					"viewport"
				],
				"default": "viewport",
				"doc": "Orientation of icon when map is rotated.",
				"requires": [
					"icon-image"
				]
			},
			"icon-size": {
				"type": "number",
				"default": 1,
				"minimum": 0,
				"function": "interpolated",
				"doc": "Scale factor for icon. 1 is original size, 3 triples the size.",
				"requires": [
					"icon-image"
				]
			},
			"icon-image": {
				"type": "string",
				"function": "piecewise-constant",
				"doc": "A string with {tokens} replaced, referencing the data property to pull from.",
				"tokens": true
			},
			"icon-rotate": {
				"type": "number",
				"default": 0,
				"period": 360,
				"function": "interpolated",
				"units": "degrees",
				"doc": "Rotates the icon clockwise.",
				"requires": [
					"icon-image"
				]
			},
			"icon-padding": {
				"type": "number",
				"default": 2,
				"minimum": 0,
				"function": "interpolated",
				"units": "pixels",
				"doc": "Size of the additional area around the icon bounding box used for detecting symbol collisions.",
				"requires": [
					"icon-image"
				]
			},
			"icon-keep-upright": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"doc": "If true, the icon may be flipped to prevent it from being rendered upside-down.",
				"requires": [
					"icon-image",
					{
						"icon-rotation-alignment": "map"
					},
					{
						"symbol-placement": "line"
					}
				]
			},
			"icon-offset": {
				"type": "array",
				"value": "number",
				"length": 2,
				"default": [
					0,
					0
				],
				"function": "interpolated",
				"doc": "Offset distance of icon from its anchor. Positive values indicate right and down, while negative values indicate left and up.",
				"requires": [
					"icon-image"
				]
			},
			"text-rotation-alignment": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"map",
					"viewport"
				],
				"default": "viewport",
				"doc": "Orientation of text when map is rotated.",
				"requires": [
					"text-field"
				]
			},
			"text-field": {
				"type": "string",
				"function": "piecewise-constant",
				"default": "",
				"tokens": true,
				"doc": "Value to use for a text label. Feature properties are specified using tokens like {field_name}."
			},
			"text-font": {
				"type": "array",
				"value": "string",
				"function": "piecewise-constant",
				"default": [
					"Open Sans Regular",
					"Arial Unicode MS Regular"
				],
				"doc": "Font stack to use for displaying text.",
				"requires": [
					"text-field"
				]
			},
			"text-size": {
				"type": "number",
				"default": 16,
				"minimum": 0,
				"units": "pixels",
				"function": "interpolated",
				"doc": "Font size.",
				"requires": [
					"text-field"
				]
			},
			"text-max-width": {
				"type": "number",
				"default": 10,
				"minimum": 0,
				"units": "em",
				"function": "interpolated",
				"doc": "The maximum line width for text wrapping.",
				"requires": [
					"text-field"
				]
			},
			"text-line-height": {
				"type": "number",
				"default": 1.2,
				"units": "em",
				"function": "interpolated",
				"doc": "Text leading value for multi-line text.",
				"requires": [
					"text-field"
				]
			},
			"text-letter-spacing": {
				"type": "number",
				"default": 0,
				"units": "em",
				"function": "interpolated",
				"doc": "Text tracking amount.",
				"requires": [
					"text-field"
				]
			},
			"text-justify": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"left",
					"center",
					"right"
				],
				"default": "center",
				"doc": "Text justification options.",
				"requires": [
					"text-field"
				]
			},
			"text-anchor": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"center",
					"left",
					"right",
					"top",
					"bottom",
					"top-left",
					"top-right",
					"bottom-left",
					"bottom-right"
				],
				"default": "center",
				"doc": "Part of the text placed closest to the anchor.",
				"requires": [
					"text-field"
				]
			},
			"text-max-angle": {
				"type": "number",
				"default": 45,
				"units": "degrees",
				"function": "interpolated",
				"doc": "Maximum angle change between adjacent characters.",
				"requires": [
					"text-field",
					{
						"symbol-placement": "line"
					}
				]
			},
			"text-rotate": {
				"type": "number",
				"default": 0,
				"period": 360,
				"units": "degrees",
				"function": "interpolated",
				"doc": "Rotates the text clockwise.",
				"requires": [
					"text-field"
				]
			},
			"text-padding": {
				"type": "number",
				"default": 2,
				"minimum": 0,
				"units": "pixels",
				"function": "interpolated",
				"doc": "Size of the additional area around the text bounding box used for detecting symbol collisions.",
				"requires": [
					"text-field"
				]
			},
			"text-keep-upright": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": true,
				"doc": "If true, the text may be flipped vertically to prevent it from being rendered upside-down.",
				"requires": [
					"text-field",
					{
						"text-rotation-alignment": "map"
					},
					{
						"symbol-placement": "line"
					}
				]
			},
			"text-transform": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"none",
					"uppercase",
					"lowercase"
				],
				"default": "none",
				"doc": "Specifies how to capitalize text, similar to the CSS `text-transform` property.",
				"requires": [
					"text-field"
				]
			},
			"text-offset": {
				"type": "array",
				"doc": "Offset distance of text from its anchor. Positive values indicate right and down, while negative values indicate left and up.",
				"value": "number",
				"units": "ems",
				"function": "interpolated",
				"length": 2,
				"default": [
					0,
					0
				],
				"requires": [
					"text-field"
				]
			},
			"text-allow-overlap": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"doc": "If true, the text will be visible even if it collides with other previously drawn symbols.",
				"requires": [
					"text-field"
				]
			},
			"text-ignore-placement": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"doc": "If true, other symbols can be visible even if they collide with the text.",
				"requires": [
					"text-field"
				]
			},
			"text-optional": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"doc": "If true, icons will display without their corresponding text when the text collides with other symbols and the icon does not.",
				"requires": [
					"text-field",
					"icon-image"
				]
			},
			"visibility": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"visible",
					"none"
				],
				"default": "visible",
				"doc": "The display of this layer. `none` hides this layer."
			}
		},
		"layout_raster": {
			"visibility": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"visible",
					"none"
				],
				"default": "visible",
				"doc": "The display of this layer. `none` hides this layer."
			}
		},
		"filter": {
			"type": "array",
			"value": "*",
			"doc": "A filter selects specific features from a layer."
		},
		"filter_operator": {
			"type": "enum",
			"values": [
				"==",
				"!=",
				">",
				">=",
				"<",
				"<=",
				"in",
				"!in",
				"all",
				"any",
				"none"
			],
			"doc": "The filter operator."
		},
		"geometry_type": {
			"type": "enum",
			"values": [
				"Point",
				"LineString",
				"Polygon"
			],
			"doc": "The geometry type for the filter to select."
		},
		"color_operation": {
			"type": "enum",
			"values": [
				"lighten",
				"saturate",
				"spin",
				"fade",
				"mix"
			],
			"doc": "A color operation to apply."
		},
		"function": {
			"stops": {
				"type": "array",
				"required": true,
				"doc": "An array of stops.",
				"value": "function_stop"
			},
			"base": {
				"type": "number",
				"default": 1,
				"minimum": 0,
				"doc": "The exponential base of the interpolation curve. It controls the rate at which the result increases. Higher values make the result increase more towards the high end of the range. With `1` the stops are interpolated linearly."
			}
		},
		"function_stop": {
			"type": "array",
			"minimum": 0,
			"maximum": 22,
			"value": [
				"number",
				"color"
			],
			"length": 2,
			"doc": "Zoom level and value pair."
		},
		"paint": [
			"paint_fill",
			"paint_line",
			"paint_circle",
			"paint_symbol",
			"paint_raster",
			"paint_background"
		],
		"paint_fill": {
			"fill-antialias": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": true,
				"doc": "Whether or not the fill should be antialiased."
			},
			"fill-opacity": {
				"type": "number",
				"function": "interpolated",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"doc": "The opacity given to the fill color.",
				"transition": true
			},
			"fill-color": {
				"type": "color",
				"default": "#000000",
				"doc": "The color of the fill.",
				"function": "interpolated",
				"transition": true,
				"requires": [
					{
						"!": "fill-pattern"
					}
				]
			},
			"fill-outline-color": {
				"type": "color",
				"doc": "The outline color of the fill. Matches the value of `fill-color` if unspecified.",
				"function": "interpolated",
				"transition": true,
				"requires": [
					{
						"!": "fill-pattern"
					},
					{
						"fill-antialias": true
					}
				]
			},
			"fill-translate": {
				"type": "array",
				"value": "number",
				"length": 2,
				"default": [
					0,
					0
				],
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"doc": "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively."
			},
			"fill-translate-anchor": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"map",
					"viewport"
				],
				"doc": "Control whether the translation is relative to the map (north) or viewport (screen)",
				"default": "map",
				"requires": [
					"fill-translate"
				]
			},
			"fill-pattern": {
				"type": "string",
				"function": "piecewise-constant",
				"transition": true,
				"doc": "Name of image in sprite to use for drawing image fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512)."
			}
		},
		"paint_line": {
			"line-opacity": {
				"type": "number",
				"doc": "The opacity at which the line will be drawn.",
				"function": "interpolated",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"transition": true
			},
			"line-color": {
				"type": "color",
				"doc": "The color with which the line will be drawn.",
				"default": "#000000",
				"function": "interpolated",
				"transition": true,
				"requires": [
					{
						"!": "line-pattern"
					}
				]
			},
			"line-translate": {
				"type": "array",
				"value": "number",
				"length": 2,
				"default": [
					0,
					0
				],
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"doc": "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively."
			},
			"line-translate-anchor": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"map",
					"viewport"
				],
				"doc": "Control whether the translation is relative to the map (north) or viewport (screen)",
				"default": "map",
				"requires": [
					"line-translate"
				]
			},
			"line-width": {
				"type": "number",
				"default": 1,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"doc": "Stroke thickness."
			},
			"line-gap-width": {
				"type": "number",
				"default": 0,
				"minimum": 0,
				"doc": "Draws a line casing outside of a line's actual path. Value indicates the width of the inner gap.",
				"function": "interpolated",
				"transition": true,
				"units": "pixels"
			},
			"line-offset": {
				"type": "number",
				"default": 0,
				"doc": "The line's offset perpendicular to its direction. Values may be positive or negative, where positive indicates \"rightwards\" (if you were moving in the direction of the line) and negative indicates \"leftwards.\"",
				"function": "interpolated",
				"transition": true,
				"units": "pixels"
			},
			"line-blur": {
				"type": "number",
				"default": 0,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"doc": "Blur applied to the line, in pixels."
			},
			"line-dasharray": {
				"type": "array",
				"value": "number",
				"function": "piecewise-constant",
				"doc": "Specifies the lengths of the alternating dashes and gaps that form the dash pattern. The lengths are later scaled by the line width. To convert a dash length to pixels, multiply the length by the current line width.",
				"minimum": 0,
				"transition": true,
				"units": "line widths",
				"requires": [
					{
						"!": "line-pattern"
					}
				]
			},
			"line-pattern": {
				"type": "string",
				"function": "piecewise-constant",
				"transition": true,
				"doc": "Name of image in sprite to use for drawing image lines. For seamless patterns, image width must be a factor of two (2, 4, 8, ..., 512)."
			}
		},
		"paint_circle": {
			"circle-radius": {
				"type": "number",
				"default": 5,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"doc": "Circle radius."
			},
			"circle-color": {
				"type": "color",
				"default": "#000000",
				"doc": "The color of the circle.",
				"function": "interpolated",
				"transition": true
			},
			"circle-blur": {
				"type": "number",
				"default": 0,
				"doc": "Amount to blur the circle. 1 blurs the circle such that only the centerpoint is full opacity.",
				"function": "interpolated",
				"transition": true
			},
			"circle-opacity": {
				"type": "number",
				"doc": "The opacity at which the circle will be drawn.",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"function": "interpolated",
				"transition": true
			},
			"circle-translate": {
				"type": "array",
				"value": "number",
				"length": 2,
				"default": [
					0,
					0
				],
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"doc": "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively."
			},
			"circle-translate-anchor": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"map",
					"viewport"
				],
				"doc": "Control whether the translation is relative to the map (north) or viewport (screen)",
				"default": "map",
				"requires": [
					"circle-translate"
				]
			}
		},
		"paint_symbol": {
			"icon-opacity": {
				"doc": "The opacity at which the icon will be drawn.",
				"type": "number",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"function": "interpolated",
				"transition": true,
				"requires": [
					"icon-image"
				]
			},
			"icon-color": {
				"type": "color",
				"default": "#000000",
				"function": "interpolated",
				"transition": true,
				"doc": "The color of the icon. This can only be used with sdf icons.",
				"requires": [
					"icon-image"
				]
			},
			"icon-halo-color": {
				"type": "color",
				"default": "rgba(0, 0, 0, 0)",
				"function": "interpolated",
				"transition": true,
				"doc": "The color of the icon's halo. Icon halos can only be used with sdf icons.",
				"requires": [
					"icon-image"
				]
			},
			"icon-halo-width": {
				"type": "number",
				"default": 0,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"doc": "Distance of halo to the icon outline.",
				"requires": [
					"icon-image"
				]
			},
			"icon-halo-blur": {
				"type": "number",
				"default": 0,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"doc": "Fade out the halo towards the outside.",
				"requires": [
					"icon-image"
				]
			},
			"icon-translate": {
				"type": "array",
				"value": "number",
				"length": 2,
				"default": [
					0,
					0
				],
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"doc": "Distance that the icon's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.",
				"requires": [
					"icon-image"
				]
			},
			"icon-translate-anchor": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"map",
					"viewport"
				],
				"doc": "Control whether the translation is relative to the map (north) or viewport (screen).",
				"default": "map",
				"requires": [
					"icon-image",
					"icon-translate"
				]
			},
			"text-opacity": {
				"type": "number",
				"doc": "The opacity at which the text will be drawn.",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"function": "interpolated",
				"transition": true,
				"requires": [
					"text-field"
				]
			},
			"text-color": {
				"type": "color",
				"doc": "The color with which the text will be drawn.",
				"default": "#000000",
				"function": "interpolated",
				"transition": true,
				"requires": [
					"text-field"
				]
			},
			"text-halo-color": {
				"type": "color",
				"default": "rgba(0, 0, 0, 0)",
				"function": "interpolated",
				"transition": true,
				"doc": "The color of the text's halo, which helps it stand out from backgrounds.",
				"requires": [
					"text-field"
				]
			},
			"text-halo-width": {
				"type": "number",
				"default": 0,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"doc": "Distance of halo to the font outline. Max text halo width is 1/4 of the font-size.",
				"requires": [
					"text-field"
				]
			},
			"text-halo-blur": {
				"type": "number",
				"default": 0,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"doc": "The halo's fadeout distance towards the outside.",
				"requires": [
					"text-field"
				]
			},
			"text-translate": {
				"type": "array",
				"value": "number",
				"length": 2,
				"default": [
					0,
					0
				],
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"doc": "Distance that the text's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.",
				"requires": [
					"text-field"
				]
			},
			"text-translate-anchor": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"map",
					"viewport"
				],
				"doc": "Control whether the translation is relative to the map (north) or viewport (screen).",
				"default": "map",
				"requires": [
					"text-field",
					"text-translate"
				]
			}
		},
		"paint_raster": {
			"raster-opacity": {
				"type": "number",
				"doc": "The opacity at which the image will be drawn.",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"function": "interpolated",
				"transition": true
			},
			"raster-hue-rotate": {
				"type": "number",
				"default": 0,
				"period": 360,
				"function": "interpolated",
				"transition": true,
				"units": "degrees",
				"doc": "Rotates hues around the color wheel."
			},
			"raster-brightness-min": {
				"type": "number",
				"function": "interpolated",
				"doc": "Increase or reduce the brightness of the image. The value is the minimum brightness.",
				"default": 0,
				"minimum": 0,
				"maximum": 1,
				"transition": true
			},
			"raster-brightness-max": {
				"type": "number",
				"function": "interpolated",
				"doc": "Increase or reduce the brightness of the image. The value is the maximum brightness.",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"transition": true
			},
			"raster-saturation": {
				"type": "number",
				"doc": "Increase or reduce the saturation of the image.",
				"default": 0,
				"minimum": -1,
				"maximum": 1,
				"function": "interpolated",
				"transition": true
			},
			"raster-contrast": {
				"type": "number",
				"doc": "Increase or reduce the contrast of the image.",
				"default": 0,
				"minimum": -1,
				"maximum": 1,
				"function": "interpolated",
				"transition": true
			},
			"raster-fade-duration": {
				"type": "number",
				"default": 300,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "milliseconds",
				"doc": "Fade duration when a new tile is added."
			}
		},
		"paint_background": {
			"background-color": {
				"type": "color",
				"default": "#000000",
				"doc": "The color with which the background will be drawn.",
				"function": "interpolated",
				"transition": true,
				"requires": [
					{
						"!": "background-pattern"
					}
				]
			},
			"background-pattern": {
				"type": "string",
				"function": "piecewise-constant",
				"transition": true,
				"doc": "Name of image in sprite to use for drawing an image background. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512)."
			},
			"background-opacity": {
				"type": "number",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"doc": "The opacity at which the background will be drawn.",
				"function": "interpolated",
				"transition": true
			}
		},
		"transition": {
			"duration": {
				"type": "number",
				"default": 300,
				"minimum": 0,
				"units": "milliseconds",
				"doc": "Time allotted for transitions to complete."
			},
			"delay": {
				"type": "number",
				"default": 0,
				"minimum": 0,
				"units": "milliseconds",
				"doc": "Length of time before a transition begins."
			}
		}
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(47);

	module.exports.emitErrors = function throwErrors(emitter, errors) {
	    if (errors && errors.length) {
	        for (var i = 0; i < errors.length; i++) {
	            emitter.fire('error', { error: new Error(errors[i].message) });
	        }
	        return true;
	    } else {
	        return false;
	    }
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validateConstants = __webpack_require__(48);
	var validate = __webpack_require__(51);
	var latestStyleSpec = __webpack_require__(67);

	/**
	 * Validate a Mapbox GL style against the style specification. This entrypoint,
	 * `mapbox-gl-style-spec/lib/validate_style.min`, is designed to produce as
	 * small a browserify bundle as possible by omitting unnecessary functionality
	 * and legacy style specifications.
	 *
	 * @param {Object} style The style to be validated.
	 * @param {Object} [styleSpec] The style specification to validate against.
	 *     If omitted, the latest style spec is used.
	 * @returns {Array<ValidationError>}
	 * @example
	 *   var validate = require('mapbox-gl-style-spec/lib/validate_style.min');
	 *   var errors = validate(style);
	 */
	function validateStyleMin(style, styleSpec) {
	    styleSpec = styleSpec || latestStyleSpec;

	    var errors = [];

	    errors = errors.concat(validate({
	        key: '',
	        value: style,
	        valueSpec: styleSpec.$root,
	        styleSpec: styleSpec,
	        style: style
	    }));

	    if (styleSpec.$version > 7 && style.constants) {
	        errors = errors.concat(validateConstants({
	            key: 'constants',
	            value: style.constants,
	            style: style,
	            styleSpec: styleSpec
	        }));
	    }

	    return sortErrors(errors);
	}

	validateStyleMin.source = wrapCleanErrors(__webpack_require__(65));
	validateStyleMin.layer = wrapCleanErrors(__webpack_require__(62));
	validateStyleMin.filter = wrapCleanErrors(__webpack_require__(61));
	validateStyleMin.paintProperty = wrapCleanErrors(__webpack_require__(63));
	validateStyleMin.layoutProperty = wrapCleanErrors(__webpack_require__(64));

	function sortErrors(errors) {
	    return [].concat(errors).sort(function (a, b) {
	        return a.line - b.line;
	    });
	}

	function wrapCleanErrors(inner) {
	    return function() {
	        return sortErrors(inner.apply(this, arguments));
	    };
	}

	module.exports = validateStyleMin;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ValidationError = __webpack_require__(49);
	var getType = __webpack_require__(50);

	module.exports = function validateConstants(options) {
	    var key = options.key;
	    var constants = options.value;
	    var styleSpec = options.styleSpec;

	    if (styleSpec.$version > 7) {
	        if (constants) {
	            return [new ValidationError(key, constants, 'constants have been deprecated as of v8')];
	        } else {
	            return [];
	        }
	    } else {
	        var type = getType(constants);
	        if (type !== 'object') {
	            return [new ValidationError(key, constants, 'object expected, %s found', type)];
	        }

	        var errors = [];
	        for (var constantName in constants) {
	            if (constantName[0] !== '@') {
	                errors.push(new ValidationError(key + '.' + constantName, constants[constantName], 'constants must start with "@"'));
	            }
	        }
	        return errors;
	    }

	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var format = __webpack_require__(4).format;

	function ValidationError(key, value /*, message, ...*/) {
	    this.message = (
	        (key ? key + ': ' : '') +
	        format.apply(format, Array.prototype.slice.call(arguments, 2))
	    );

	    if (value !== null && value !== undefined && value.__line__) {
	        this.line = value.__line__;
	    }
	}

	module.exports = ValidationError;


/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function getType(val) {
	    if (val instanceof Number) {
	        return 'number';
	    } else if (val instanceof String) {
	        return 'string';
	    } else if (val instanceof Boolean) {
	        return 'boolean';
	    } else if (Array.isArray(val)) {
	        return 'array';
	    } else if (val === null) {
	        return 'null';
	    } else {
	        return typeof val;
	    }
	};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ValidationError = __webpack_require__(49);
	var getType = __webpack_require__(50);
	var extend = __webpack_require__(52);

	// Main recursive validation function. Tracks:
	//
	// - key: string representing location of validation in style tree. Used only
	//   for more informative error reporting.
	// - value: current value from style being evaluated. May be anything from a
	//   high level object that needs to be descended into deeper or a simple
	//   scalar value.
	// - valueSpec: current spec being evaluated. Tracks value.

	module.exports = function validate(options) {

	    var validateFunction = __webpack_require__(53);
	    var validateObject = __webpack_require__(54);
	    var VALIDATORS = {
	        '*': function() {
	            return [];
	        },
	        'array': __webpack_require__(55),
	        'boolean': __webpack_require__(56),
	        'number': __webpack_require__(57),
	        'color': __webpack_require__(58),
	        'constants': __webpack_require__(48),
	        'enum': __webpack_require__(59),
	        'filter': __webpack_require__(61),
	        'function': __webpack_require__(53),
	        'layer': __webpack_require__(62),
	        'object': __webpack_require__(54),
	        'source': __webpack_require__(65),
	        'string': __webpack_require__(66)
	    };

	    var value = options.value;
	    var valueSpec = options.valueSpec;
	    var key = options.key;
	    var styleSpec = options.styleSpec;
	    var style = options.style;

	    if (getType(value) === 'string' && value[0] === '@') {
	        if (styleSpec.$version > 7) {
	            return [new ValidationError(key, value, 'constants have been deprecated as of v8')];
	        }
	        if (!(value in style.constants)) {
	            return [new ValidationError(key, value, 'constant "%s" not found', value)];
	        }
	        options = extend({}, options, { value: style.constants[value] });
	    }

	    if (valueSpec.function && getType(value) === 'object') {
	        return validateFunction(options);

	    } else if (valueSpec.type && VALIDATORS[valueSpec.type]) {
	        return VALIDATORS[valueSpec.type](options);

	    } else {
	        return validateObject(extend({}, options, {
	            valueSpec: valueSpec.type ? styleSpec[valueSpec.type] : valueSpec
	        }));
	    }
	};


/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (output) {
	    for (var i = 1; i < arguments.length; i++) {
	        var input = arguments[i];
	        for (var k in input) {
	            output[k] = input[k];
	        }
	    }
	    return output;
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ValidationError = __webpack_require__(49);
	var getType = __webpack_require__(50);
	var validate = __webpack_require__(51);
	var validateObject = __webpack_require__(54);
	var validateArray = __webpack_require__(55);

	module.exports = function validateFunction(options) {
	    var originalValueSpec = options.valueSpec;

	    return validateObject({
	        key: options.key,
	        value: options.value,
	        valueSpec: options.styleSpec.function,
	        style: options.style,
	        styleSpec: options.styleSpec,
	        objectElementValidators: { stops: validateFunctionStops }
	    });

	    function validateFunctionStops(options) {
	        var errors = [];
	        var value = options.value;

	        errors = errors.concat(validateArray({
	            key: options.key,
	            value: value,
	            valueSpec: options.valueSpec,
	            style: options.style,
	            styleSpec: options.styleSpec,
	            arrayElementValidator: validateFunctionStop
	        }));

	        if (getType(value) === 'array' && value.length === 0) {
	            errors.push(new ValidationError(options.key, value, 'array must have at least one stop'));
	        }

	        return errors;
	    }

	    function validateFunctionStop(options) {
	        var errors = [];
	        var value = options.value;
	        var key = options.key;

	        if (getType(value) !== 'array') {
	            return [new ValidationError(key, value, 'array expected, %s found', getType(value))];
	        }

	        if (value.length !== 2) {
	            return [new ValidationError(key, value, 'array length %d expected, length %d found', 2, value.length)];
	        }

	        errors = errors.concat(validate({
	            key: key + '[0]',
	            value: value[0],
	            valueSpec: {type: 'number'},
	            style: options.style,
	            styleSpec: options.styleSpec
	        }));

	        errors = errors.concat(validate({
	            key: key + '[1]',
	            value: value[1],
	            valueSpec: originalValueSpec,
	            style: options.style,
	            styleSpec: options.styleSpec
	        }));

	        if (getType(value[0]) === 'number') {
	            if (originalValueSpec.function === 'piecewise-constant' && value[0] % 1 !== 0) {
	                errors.push(new ValidationError(key + '[0]', value[0], 'zoom level for piecewise-constant functions must be an integer'));
	            }

	            if (options.arrayIndex !== 0) {
	                if (value[0] < options.array[options.arrayIndex - 1][0]) {
	                    errors.push(new ValidationError(key + '[0]', value[0], 'array stops must appear in ascending order'));
	                }
	            }
	        }

	        return errors;
	    }

	};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ValidationError = __webpack_require__(49);
	var getType = __webpack_require__(50);
	var validate = __webpack_require__(51);

	module.exports = function validateObject(options) {
	    var key = options.key;
	    var object = options.value;
	    var valueSpec = options.valueSpec;
	    var objectElementValidators = options.objectElementValidators || {};
	    var style = options.style;
	    var styleSpec = options.styleSpec;
	    var errors = [];

	    var type = getType(object);
	    if (type !== 'object') {
	        return [new ValidationError(key, object, 'object expected, %s found', type)];
	    }

	    for (var objectKey in object) {
	        var valueSpecKey = objectKey.split('.')[0]; // treat 'paint.*' as 'paint'
	        var objectElementSpec = valueSpec && (valueSpec[valueSpecKey] || valueSpec['*']);
	        var objectElementValidator = objectElementValidators[valueSpecKey] || objectElementValidators['*'];

	        if (objectElementSpec || objectElementValidator) {
	            errors = errors.concat((objectElementValidator || validate)({
	                key: (key ? key + '.' : key) + objectKey,
	                value: object[objectKey],
	                valueSpec: objectElementSpec,
	                style: style,
	                styleSpec: styleSpec,
	                object: object,
	                objectKey: objectKey
	            }));

	        // tolerate root-level extra keys & arbitrary layer properties
	        // TODO remove this layer-specific logic
	        } else if (key !== '' && key.split('.').length !== 1) {
	            errors.push(new ValidationError(key, object[objectKey], 'unknown property "%s"', objectKey));
	        }
	    }

	    for (valueSpecKey in valueSpec) {
	        if (valueSpec[valueSpecKey].required && valueSpec[valueSpecKey]['default'] === undefined && object[valueSpecKey] === undefined) {
	            errors.push(new ValidationError(key, object, 'missing required property "%s"', valueSpecKey));
	        }
	    }

	    return errors;
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getType = __webpack_require__(50);
	var validate = __webpack_require__(51);
	var ValidationError = __webpack_require__(49);

	module.exports = function validateArray(options) {
	    var array = options.value;
	    var arraySpec = options.valueSpec;
	    var style = options.style;
	    var styleSpec = options.styleSpec;
	    var key = options.key;
	    var validateArrayElement = options.arrayElementValidator || validate;

	    if (getType(array) !== 'array') {
	        return [new ValidationError(key, array, 'array expected, %s found', getType(array))];
	    }

	    if (arraySpec.length && array.length !== arraySpec.length) {
	        return [new ValidationError(key, array, 'array length %d expected, length %d found', arraySpec.length, array.length)];
	    }

	    if (arraySpec['min-length'] && array.length < arraySpec['min-length']) {
	        return [new ValidationError(key, array, 'array length at least %d expected, length %d found', arraySpec['min-length'], array.length)];
	    }

	    var arrayElementSpec = {
	        "type": arraySpec.value
	    };

	    if (styleSpec.$version < 7) {
	        arrayElementSpec.function = arraySpec.function;
	    }

	    if (getType(arraySpec.value) === 'object') {
	        arrayElementSpec = arraySpec.value;
	    }

	    var errors = [];
	    for (var i = 0; i < array.length; i++) {
	        errors = errors.concat(validateArrayElement({
	            array: array,
	            arrayIndex: i,
	            value: array[i],
	            valueSpec: arrayElementSpec,
	            style: style,
	            styleSpec: styleSpec,
	            key: key + '[' + i + ']'
	        }));
	    }
	    return errors;
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getType = __webpack_require__(50);
	var ValidationError = __webpack_require__(49);

	module.exports = function validateBoolean(options) {
	    var value = options.value;
	    var key = options.key;
	    var type = getType(value);

	    if (type !== 'boolean') {
	        return [new ValidationError(key, value, 'boolean expected, %s found', type)];
	    }

	    return [];
	};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getType = __webpack_require__(50);
	var ValidationError = __webpack_require__(49);

	module.exports = function validateNumber(options) {
	    var key = options.key;
	    var value = options.value;
	    var valueSpec = options.valueSpec;
	    var type = getType(value);

	    if (type !== 'number') {
	        return [new ValidationError(key, value, 'number expected, %s found', type)];
	    }

	    if ('minimum' in valueSpec && value < valueSpec.minimum) {
	        return [new ValidationError(key, value, '%s is less than the minimum value %s', value, valueSpec.minimum)];
	    }

	    if ('maximum' in valueSpec && value > valueSpec.maximum) {
	        return [new ValidationError(key, value, '%s is greater than the maximum value %s', value, valueSpec.maximum)];
	    }

	    return [];
	};


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ValidationError = __webpack_require__(49);
	var getType = __webpack_require__(50);
	var parseCSSColor = __webpack_require__(42).parseCSSColor;

	module.exports = function validateColor(options) {
	    var key = options.key;
	    var value = options.value;
	    var type = getType(value);

	    if (type !== 'string') {
	        return [new ValidationError(key, value, 'color expected, %s found', type)];
	    }

	    if (parseCSSColor(value) === null) {
	        return [new ValidationError(key, value, 'color expected, "%s" found', value)];
	    }

	    return [];
	};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ValidationError = __webpack_require__(49);
	var unbundle = __webpack_require__(60);

	module.exports = function validateEnum(options) {
	    var key = options.key;
	    var value = options.value;
	    var valueSpec = options.valueSpec;
	    var errors = [];

	    if (valueSpec.values.indexOf(unbundle(value)) === -1) {
	        errors.push(new ValidationError(key, value, 'expected one of [%s], %s found', valueSpec.values.join(', '), value));
	    }
	    return errors;
	};


/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Turn jsonlint-lines-primitives objects into primitive objects
	 * @param value a potentially-bundled value
	 * @returns an unbundled value
	 */
	module.exports = function unbundle(value) {
	    if (value instanceof Number || value instanceof String || value instanceof Boolean) {
	        return value.valueOf();
	    } else {
	        return value;
	    }
	};


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ValidationError = __webpack_require__(49);
	var validateEnum = __webpack_require__(59);
	var getType = __webpack_require__(50);
	var unbundle = __webpack_require__(60);

	module.exports = function validateFilter(options) {
	    var value = options.value;
	    var key = options.key;
	    var styleSpec = options.styleSpec;
	    var type;

	    var errors = [];

	    if (getType(value) !== 'array') {
	        return [new ValidationError(key, value, 'array expected, %s found', getType(value))];
	    }

	    if (value.length < 1) {
	        return [new ValidationError(key, value, 'filter array must have at least 1 element')];
	    }

	    errors = errors.concat(validateEnum({
	        key: key + '[0]',
	        value: value[0],
	        valueSpec: styleSpec.filter_operator,
	        style: options.style,
	        styleSpec: options.styleSpec
	    }));

	    switch (unbundle(value[0])) {
	        case '<':
	        case '<=':
	        case '>':
	        case '>=':
	            if (value.length >= 2 && value[1] == '$type') {
	                errors.push(new ValidationError(key, value, '"$type" cannot be use with operator "%s"', value[0]));
	            }
	        /* falls through */
	        case '==':
	        case '!=':
	            if (value.length != 3) {
	                errors.push(new ValidationError(key, value, 'filter array for operator "%s" must have 3 elements', value[0]));
	            }
	        /* falls through */
	        case 'in':
	        case '!in':
	            if (value.length >= 2) {
	                type = getType(value[1]);
	                if (type !== 'string') {
	                    errors.push(new ValidationError(key + '[1]', value[1], 'string expected, %s found', type));
	                } else if (value[1][0] === '@') {
	                    errors.push(new ValidationError(key + '[1]', value[1], 'filter key cannot be a constant'));
	                }
	            }
	            for (var i = 2; i < value.length; i++) {
	                type = getType(value[i]);
	                if (value[1] == '$type') {
	                    errors = errors.concat(validateEnum({
	                        key: key + '[' + i + ']',
	                        value: value[i],
	                        valueSpec: styleSpec.geometry_type,
	                        style: options.style,
	                        styleSpec: options.styleSpec
	                    }));
	                } else if (type === 'string' && value[i][0] === '@') {
	                    errors.push(new ValidationError(key + '[' + i + ']', value[i], 'filter value cannot be a constant'));
	                } else if (type !== 'string' && type !== 'number' && type !== 'boolean') {
	                    errors.push(new ValidationError(key + '[' + i + ']', value[i], 'string, number, or boolean expected, %s found', type));
	                }
	            }
	            break;

	        case 'any':
	        case 'all':
	        case 'none':
	            for (i = 1; i < value.length; i++) {
	                errors = errors.concat(validateFilter({
	                    key: key + '[' + i + ']',
	                    value: value[i],
	                    style: options.style,
	                    styleSpec: options.styleSpec
	                }));
	            }
	            break;
	    }

	    return errors;
	};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ValidationError = __webpack_require__(49);
	var unbundle = __webpack_require__(60);
	var validateObject = __webpack_require__(54);
	var validateFilter = __webpack_require__(61);
	var validatePaintProperty = __webpack_require__(63);
	var validateLayoutProperty = __webpack_require__(64);
	var extend = __webpack_require__(52);

	module.exports = function validateLayer(options) {
	    var errors = [];

	    var layer = options.value;
	    var key = options.key;
	    var style = options.style;
	    var styleSpec = options.styleSpec;

	    if (!layer.type && !layer.ref) {
	        errors.push(new ValidationError(key, layer, 'either "type" or "ref" is required'));
	    }
	    var type = unbundle(layer.type);
	    var ref = unbundle(layer.ref);

	    if (layer.id) {
	        for (var i = 0; i < options.arrayIndex; i++) {
	            var otherLayer = style.layers[i];
	            if (unbundle(otherLayer.id) === unbundle(layer.id)) {
	                errors.push(new ValidationError(key, layer.id, 'duplicate layer id "%s", previously used at line %d', layer.id, otherLayer.id.__line__));
	            }
	        }
	    }

	    if ('ref' in layer) {
	        ['type', 'source', 'source-layer', 'filter', 'layout'].forEach(function (p) {
	            if (p in layer) {
	                errors.push(new ValidationError(key, layer[p], '"%s" is prohibited for ref layers', p));
	            }
	        });

	        var parent;

	        style.layers.forEach(function(layer) {
	            if (layer.id == ref) parent = layer;
	        });

	        if (!parent) {
	            errors.push(new ValidationError(key, layer.ref, 'ref layer "%s" not found', ref));
	        } else if (parent.ref) {
	            errors.push(new ValidationError(key, layer.ref, 'ref cannot reference another ref layer'));
	        } else {
	            type = unbundle(parent.type);
	        }
	    } else if (type !== 'background') {
	        if (!layer.source) {
	            errors.push(new ValidationError(key, layer, 'missing required property "source"'));
	        } else {
	            var source = style.sources[layer.source];
	            if (!source) {
	                errors.push(new ValidationError(key, layer.source, 'source "%s" not found', layer.source));
	            } else if (source.type == 'vector' && type == 'raster') {
	                errors.push(new ValidationError(key, layer.source, 'layer "%s" requires a raster source', layer.id));
	            } else if (source.type == 'raster' && type != 'raster') {
	                errors.push(new ValidationError(key, layer.source, 'layer "%s" requires a vector source', layer.id));
	            } else if (source.type == 'vector' && !layer['source-layer']) {
	                errors.push(new ValidationError(key, layer, 'layer "%s" must specify a "source-layer"', layer.id));
	            }
	        }
	    }

	    errors = errors.concat(validateObject({
	        key: key,
	        value: layer,
	        valueSpec: styleSpec.layer,
	        style: options.style,
	        styleSpec: options.styleSpec,
	        objectElementValidators: {
	            filter: validateFilter,
	            layout: function(options) {
	                return validateObject({
	                    layer: layer,
	                    key: options.key,
	                    value: options.value,
	                    style: options.style,
	                    styleSpec: options.styleSpec,
	                    objectElementValidators: {
	                        '*': function(options) {
	                            return validateLayoutProperty(extend({layerType: type}, options));
	                        }
	                    }
	                });
	            },
	            paint: function(options) {
	                return validateObject({
	                    layer: layer,
	                    key: options.key,
	                    value: options.value,
	                    style: options.style,
	                    styleSpec: options.styleSpec,
	                    objectElementValidators: {
	                        '*': function(options) {
	                            return validatePaintProperty(extend({layerType: type}, options));
	                        }
	                    }
	                });
	            }
	        }
	    }));

	    return errors;
	};


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validate = __webpack_require__(51);
	var ValidationError = __webpack_require__(49);

	/**
	 * @param options
	 * @param {string} [options.key]
	 * @param options.value
	 * @param [options.valueSpec]
	 * @param [options.style]
	 * @param [options.styleSpec]
	 * @param [options.layer]
	 * @param options.objectKey
	 */
	module.exports = function validatePaintProperty(options) {
	    var key = options.key;
	    var style = options.style;
	    var styleSpec = options.styleSpec;
	    var value = options.value;
	    var propertyKey = options.objectKey;
	    var layerSpec = styleSpec['paint_' + options.layerType];

	    var transitionMatch = propertyKey.match(/^(.*)-transition$/);

	    if (transitionMatch && layerSpec[transitionMatch[1]] && layerSpec[transitionMatch[1]].transition) {
	        return validate({
	            key: key,
	            value: value,
	            valueSpec: styleSpec.transition,
	            style: style,
	            styleSpec: styleSpec
	        });

	    } else if (options.valueSpec || layerSpec[propertyKey]) {
	        return validate({
	            key: options.key,
	            value: value,
	            valueSpec: options.valueSpec || layerSpec[propertyKey],
	            style: style,
	            styleSpec: styleSpec
	        });

	    } else {
	        return [new ValidationError(key, value, 'unknown property "%s"', propertyKey)];
	    }

	};


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validate = __webpack_require__(51);
	var ValidationError = __webpack_require__(49);

	/**
	 * @param options
	 * @param {string} [options.key]
	 * @param options.value
	 * @param [options.valueSpec]
	 * @param [options.style]
	 * @param [options.styleSpec]
	 * @param [options.layer]
	 * @param options.objectKey
	 */
	module.exports = function validateLayoutProperty(options) {
	    var key = options.key;
	    var style = options.style;
	    var styleSpec = options.styleSpec;
	    var value = options.value;
	    var propertyKey = options.objectKey;
	    var layerSpec = styleSpec['layout_' + options.layerType];

	    if (options.valueSpec || layerSpec[propertyKey]) {
	        return validate({
	            key: options.key,
	            value: value,
	            valueSpec: options.valueSpec || layerSpec[propertyKey],
	            style: style,
	            styleSpec: styleSpec
	        });

	    } else {
	        return [new ValidationError(key, value, 'unknown property "%s"', propertyKey)];
	    }

	};


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ValidationError = __webpack_require__(49);
	var unbundle = __webpack_require__(60);
	var validateObject = __webpack_require__(54);
	var validateEnum = __webpack_require__(59);

	module.exports = function validateSource(options) {
	    var value = options.value;
	    var key = options.key;
	    var styleSpec = options.styleSpec;
	    var style = options.style;

	    if (!value.type) {
	        return [new ValidationError(key, value, '"type" is required')];
	    }

	    var type = unbundle(value.type);
	    switch (type) {
	        case 'vector':
	        case 'raster':
	            var errors = [];
	            errors = errors.concat(validateObject({
	                key: key,
	                value: value,
	                valueSpec: styleSpec.source_tile,
	                style: options.style,
	                styleSpec: styleSpec
	            }));
	            if ('url' in value) {
	                for (var prop in value) {
	                    if (['type', 'url', 'tileSize'].indexOf(prop) < 0) {
	                        errors.push(new ValidationError(key + '.' + prop, value[prop], 'a source with a "url" property may not include a "%s" property', prop));
	                    }
	                }
	            }
	            return errors;

	        case 'geojson':
	            return validateObject({
	                key: key,
	                value: value,
	                valueSpec: styleSpec.source_geojson,
	                style: style,
	                styleSpec: styleSpec
	            });

	        case 'video':
	            return validateObject({
	                key: key,
	                value: value,
	                valueSpec: styleSpec.source_video,
	                style: style,
	                styleSpec: styleSpec
	            });

	        case 'image':
	            return validateObject({
	                key: key,
	                value: value,
	                valueSpec: styleSpec.source_image,
	                style: style,
	                styleSpec: styleSpec
	            });

	        default:
	            return validateEnum({
	                key: key + '.type',
	                value: value.type,
	                valueSpec: {values: ['vector', 'raster', 'geojson', 'video', 'image']},
	                style: style,
	                styleSpec: styleSpec
	            });
	    }
	};


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getType = __webpack_require__(50);
	var ValidationError = __webpack_require__(49);

	module.exports = function validateString(options) {
	    var value = options.value;
	    var key = options.key;
	    var type = getType(value);

	    if (type !== 'string') {
	        return [new ValidationError(key, value, 'string expected, %s found', type)];
	    }

	    return [];
	};


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(68);


/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = {
		"$version": 8,
		"$root": {
			"version": {
				"required": true,
				"type": "enum",
				"values": [
					8
				]
			},
			"name": {
				"type": "string"
			},
			"metadata": {
				"type": "*"
			},
			"center": {
				"type": "array",
				"value": "number"
			},
			"zoom": {
				"type": "number"
			},
			"bearing": {
				"type": "number",
				"default": 0,
				"period": 360,
				"units": "degrees"
			},
			"pitch": {
				"type": "number",
				"default": 0,
				"units": "degrees"
			},
			"sources": {
				"required": true,
				"type": "sources"
			},
			"sprite": {
				"type": "string"
			},
			"glyphs": {
				"type": "string"
			},
			"transition": {
				"type": "transition"
			},
			"layers": {
				"required": true,
				"type": "array",
				"value": "layer"
			}
		},
		"sources": {
			"*": {
				"type": "source"
			}
		},
		"source": [
			"source_tile",
			"source_geojson",
			"source_video",
			"source_image"
		],
		"source_tile": {
			"type": {
				"required": true,
				"type": "enum",
				"values": [
					"vector",
					"raster"
				]
			},
			"url": {
				"type": "string"
			},
			"tiles": {
				"type": "array",
				"value": "string"
			},
			"minzoom": {
				"type": "number",
				"default": 0
			},
			"maxzoom": {
				"type": "number",
				"default": 22
			},
			"tileSize": {
				"type": "number",
				"default": 512,
				"units": "pixels"
			},
			"*": {
				"type": "*"
			}
		},
		"source_geojson": {
			"type": {
				"required": true,
				"type": "enum",
				"values": [
					"geojson"
				]
			},
			"data": {
				"type": "*"
			},
			"maxzoom": {
				"type": "number",
				"default": 14
			},
			"buffer": {
				"type": "number",
				"default": 64
			},
			"tolerance": {
				"type": "number",
				"default": 3
			},
			"cluster": {
				"type": "boolean",
				"default": false
			},
			"clusterRadius": {
				"type": "number",
				"default": 400
			},
			"clusterMaxZoom": {
				"type": "number"
			}
		},
		"source_video": {
			"type": {
				"required": true,
				"type": "enum",
				"values": [
					"video"
				]
			},
			"urls": {
				"required": true,
				"type": "array",
				"value": "string"
			},
			"coordinates": {
				"required": true,
				"type": "array",
				"length": 4,
				"value": {
					"type": "array",
					"length": 2,
					"value": "number"
				}
			}
		},
		"source_image": {
			"type": {
				"required": true,
				"type": "enum",
				"values": [
					"image"
				]
			},
			"url": {
				"required": true,
				"type": "string"
			},
			"coordinates": {
				"required": true,
				"type": "array",
				"length": 4,
				"value": {
					"type": "array",
					"length": 2,
					"value": "number"
				}
			}
		},
		"layer": {
			"id": {
				"type": "string",
				"required": true
			},
			"type": {
				"type": "enum",
				"values": [
					"fill",
					"line",
					"symbol",
					"circle",
					"raster",
					"background"
				]
			},
			"metadata": {
				"type": "*"
			},
			"ref": {
				"type": "string"
			},
			"source": {
				"type": "string"
			},
			"source-layer": {
				"type": "string"
			},
			"minzoom": {
				"type": "number",
				"minimum": 0,
				"maximum": 22
			},
			"maxzoom": {
				"type": "number",
				"minimum": 0,
				"maximum": 22
			},
			"interactive": {
				"type": "boolean",
				"default": false
			},
			"filter": {
				"type": "filter"
			},
			"layout": {
				"type": "layout"
			},
			"paint": {
				"type": "paint"
			},
			"paint.*": {
				"type": "paint"
			}
		},
		"layout": [
			"layout_fill",
			"layout_line",
			"layout_circle",
			"layout_symbol",
			"layout_raster",
			"layout_background"
		],
		"layout_background": {
			"visibility": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"visible",
					"none"
				],
				"default": "visible"
			}
		},
		"layout_fill": {
			"visibility": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"visible",
					"none"
				],
				"default": "visible"
			}
		},
		"layout_circle": {
			"visibility": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"visible",
					"none"
				],
				"default": "visible"
			}
		},
		"layout_line": {
			"line-cap": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"butt",
					"round",
					"square"
				],
				"default": "butt"
			},
			"line-join": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"bevel",
					"round",
					"miter"
				],
				"default": "miter"
			},
			"line-miter-limit": {
				"type": "number",
				"default": 2,
				"function": "interpolated",
				"requires": [
					{
						"line-join": "miter"
					}
				]
			},
			"line-round-limit": {
				"type": "number",
				"default": 1.05,
				"function": "interpolated",
				"requires": [
					{
						"line-join": "round"
					}
				]
			},
			"visibility": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"visible",
					"none"
				],
				"default": "visible"
			}
		},
		"layout_symbol": {
			"symbol-placement": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"point",
					"line"
				],
				"default": "point"
			},
			"symbol-spacing": {
				"type": "number",
				"default": 250,
				"minimum": 1,
				"function": "interpolated",
				"units": "pixels",
				"requires": [
					{
						"symbol-placement": "line"
					}
				]
			},
			"symbol-avoid-edges": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false
			},
			"icon-allow-overlap": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"requires": [
					"icon-image"
				]
			},
			"icon-ignore-placement": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"requires": [
					"icon-image"
				]
			},
			"icon-optional": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"requires": [
					"icon-image",
					"text-field"
				]
			},
			"icon-rotation-alignment": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"map",
					"viewport"
				],
				"default": "viewport",
				"requires": [
					"icon-image"
				]
			},
			"icon-size": {
				"type": "number",
				"default": 1,
				"minimum": 0,
				"function": "interpolated",
				"requires": [
					"icon-image"
				]
			},
			"icon-image": {
				"type": "string",
				"function": "piecewise-constant",
				"tokens": true
			},
			"icon-rotate": {
				"type": "number",
				"default": 0,
				"period": 360,
				"function": "interpolated",
				"units": "degrees",
				"requires": [
					"icon-image"
				]
			},
			"icon-padding": {
				"type": "number",
				"default": 2,
				"minimum": 0,
				"function": "interpolated",
				"units": "pixels",
				"requires": [
					"icon-image"
				]
			},
			"icon-keep-upright": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"requires": [
					"icon-image",
					{
						"icon-rotation-alignment": "map"
					},
					{
						"symbol-placement": "line"
					}
				]
			},
			"icon-offset": {
				"type": "array",
				"value": "number",
				"length": 2,
				"default": [
					0,
					0
				],
				"function": "interpolated",
				"requires": [
					"icon-image"
				]
			},
			"text-rotation-alignment": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"map",
					"viewport"
				],
				"default": "viewport",
				"requires": [
					"text-field"
				]
			},
			"text-field": {
				"type": "string",
				"function": "piecewise-constant",
				"default": "",
				"tokens": true
			},
			"text-font": {
				"type": "array",
				"value": "string",
				"function": "piecewise-constant",
				"default": [
					"Open Sans Regular",
					"Arial Unicode MS Regular"
				],
				"requires": [
					"text-field"
				]
			},
			"text-size": {
				"type": "number",
				"default": 16,
				"minimum": 0,
				"units": "pixels",
				"function": "interpolated",
				"requires": [
					"text-field"
				]
			},
			"text-max-width": {
				"type": "number",
				"default": 10,
				"minimum": 0,
				"units": "em",
				"function": "interpolated",
				"requires": [
					"text-field"
				]
			},
			"text-line-height": {
				"type": "number",
				"default": 1.2,
				"units": "em",
				"function": "interpolated",
				"requires": [
					"text-field"
				]
			},
			"text-letter-spacing": {
				"type": "number",
				"default": 0,
				"units": "em",
				"function": "interpolated",
				"requires": [
					"text-field"
				]
			},
			"text-justify": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"left",
					"center",
					"right"
				],
				"default": "center",
				"requires": [
					"text-field"
				]
			},
			"text-anchor": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"center",
					"left",
					"right",
					"top",
					"bottom",
					"top-left",
					"top-right",
					"bottom-left",
					"bottom-right"
				],
				"default": "center",
				"requires": [
					"text-field"
				]
			},
			"text-max-angle": {
				"type": "number",
				"default": 45,
				"units": "degrees",
				"function": "interpolated",
				"requires": [
					"text-field",
					{
						"symbol-placement": "line"
					}
				]
			},
			"text-rotate": {
				"type": "number",
				"default": 0,
				"period": 360,
				"units": "degrees",
				"function": "interpolated",
				"requires": [
					"text-field"
				]
			},
			"text-padding": {
				"type": "number",
				"default": 2,
				"minimum": 0,
				"units": "pixels",
				"function": "interpolated",
				"requires": [
					"text-field"
				]
			},
			"text-keep-upright": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": true,
				"requires": [
					"text-field",
					{
						"text-rotation-alignment": "map"
					},
					{
						"symbol-placement": "line"
					}
				]
			},
			"text-transform": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"none",
					"uppercase",
					"lowercase"
				],
				"default": "none",
				"requires": [
					"text-field"
				]
			},
			"text-offset": {
				"type": "array",
				"value": "number",
				"units": "ems",
				"function": "interpolated",
				"length": 2,
				"default": [
					0,
					0
				],
				"requires": [
					"text-field"
				]
			},
			"text-allow-overlap": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"requires": [
					"text-field"
				]
			},
			"text-ignore-placement": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"requires": [
					"text-field"
				]
			},
			"text-optional": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": false,
				"requires": [
					"text-field",
					"icon-image"
				]
			},
			"visibility": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"visible",
					"none"
				],
				"default": "visible"
			}
		},
		"layout_raster": {
			"visibility": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"visible",
					"none"
				],
				"default": "visible"
			}
		},
		"filter": {
			"type": "array",
			"value": "*"
		},
		"filter_operator": {
			"type": "enum",
			"values": [
				"==",
				"!=",
				">",
				">=",
				"<",
				"<=",
				"in",
				"!in",
				"all",
				"any",
				"none"
			]
		},
		"geometry_type": {
			"type": "enum",
			"values": [
				"Point",
				"LineString",
				"Polygon"
			]
		},
		"color_operation": {
			"type": "enum",
			"values": [
				"lighten",
				"saturate",
				"spin",
				"fade",
				"mix"
			]
		},
		"function": {
			"stops": {
				"type": "array",
				"required": true,
				"value": "function_stop"
			},
			"base": {
				"type": "number",
				"default": 1,
				"minimum": 0
			}
		},
		"function_stop": {
			"type": "array",
			"minimum": 0,
			"maximum": 22,
			"value": [
				"number",
				"color"
			],
			"length": 2
		},
		"paint": [
			"paint_fill",
			"paint_line",
			"paint_circle",
			"paint_symbol",
			"paint_raster",
			"paint_background"
		],
		"paint_fill": {
			"fill-antialias": {
				"type": "boolean",
				"function": "piecewise-constant",
				"default": true
			},
			"fill-opacity": {
				"type": "number",
				"function": "interpolated",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"transition": true
			},
			"fill-color": {
				"type": "color",
				"default": "#000000",
				"function": "interpolated",
				"transition": true,
				"requires": [
					{
						"!": "fill-pattern"
					}
				]
			},
			"fill-outline-color": {
				"type": "color",
				"function": "interpolated",
				"transition": true,
				"requires": [
					{
						"!": "fill-pattern"
					},
					{
						"fill-antialias": true
					}
				]
			},
			"fill-translate": {
				"type": "array",
				"value": "number",
				"length": 2,
				"default": [
					0,
					0
				],
				"function": "interpolated",
				"transition": true,
				"units": "pixels"
			},
			"fill-translate-anchor": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"map",
					"viewport"
				],
				"default": "map",
				"requires": [
					"fill-translate"
				]
			},
			"fill-pattern": {
				"type": "string",
				"function": "piecewise-constant",
				"transition": true
			}
		},
		"paint_line": {
			"line-opacity": {
				"type": "number",
				"function": "interpolated",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"transition": true
			},
			"line-color": {
				"type": "color",
				"default": "#000000",
				"function": "interpolated",
				"transition": true,
				"requires": [
					{
						"!": "line-pattern"
					}
				]
			},
			"line-translate": {
				"type": "array",
				"value": "number",
				"length": 2,
				"default": [
					0,
					0
				],
				"function": "interpolated",
				"transition": true,
				"units": "pixels"
			},
			"line-translate-anchor": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"map",
					"viewport"
				],
				"default": "map",
				"requires": [
					"line-translate"
				]
			},
			"line-width": {
				"type": "number",
				"default": 1,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels"
			},
			"line-gap-width": {
				"type": "number",
				"default": 0,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels"
			},
			"line-offset": {
				"type": "number",
				"default": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels"
			},
			"line-blur": {
				"type": "number",
				"default": 0,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels"
			},
			"line-dasharray": {
				"type": "array",
				"value": "number",
				"function": "piecewise-constant",
				"minimum": 0,
				"transition": true,
				"units": "line widths",
				"requires": [
					{
						"!": "line-pattern"
					}
				]
			},
			"line-pattern": {
				"type": "string",
				"function": "piecewise-constant",
				"transition": true
			}
		},
		"paint_circle": {
			"circle-radius": {
				"type": "number",
				"default": 5,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels"
			},
			"circle-color": {
				"type": "color",
				"default": "#000000",
				"function": "interpolated",
				"transition": true
			},
			"circle-blur": {
				"type": "number",
				"default": 0,
				"function": "interpolated",
				"transition": true
			},
			"circle-opacity": {
				"type": "number",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"function": "interpolated",
				"transition": true
			},
			"circle-translate": {
				"type": "array",
				"value": "number",
				"length": 2,
				"default": [
					0,
					0
				],
				"function": "interpolated",
				"transition": true,
				"units": "pixels"
			},
			"circle-translate-anchor": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"map",
					"viewport"
				],
				"default": "map",
				"requires": [
					"circle-translate"
				]
			}
		},
		"paint_symbol": {
			"icon-opacity": {
				"type": "number",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"function": "interpolated",
				"transition": true,
				"requires": [
					"icon-image"
				]
			},
			"icon-color": {
				"type": "color",
				"default": "#000000",
				"function": "interpolated",
				"transition": true,
				"requires": [
					"icon-image"
				]
			},
			"icon-halo-color": {
				"type": "color",
				"default": "rgba(0, 0, 0, 0)",
				"function": "interpolated",
				"transition": true,
				"requires": [
					"icon-image"
				]
			},
			"icon-halo-width": {
				"type": "number",
				"default": 0,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"requires": [
					"icon-image"
				]
			},
			"icon-halo-blur": {
				"type": "number",
				"default": 0,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"requires": [
					"icon-image"
				]
			},
			"icon-translate": {
				"type": "array",
				"value": "number",
				"length": 2,
				"default": [
					0,
					0
				],
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"requires": [
					"icon-image"
				]
			},
			"icon-translate-anchor": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"map",
					"viewport"
				],
				"default": "map",
				"requires": [
					"icon-image",
					"icon-translate"
				]
			},
			"text-opacity": {
				"type": "number",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"function": "interpolated",
				"transition": true,
				"requires": [
					"text-field"
				]
			},
			"text-color": {
				"type": "color",
				"default": "#000000",
				"function": "interpolated",
				"transition": true,
				"requires": [
					"text-field"
				]
			},
			"text-halo-color": {
				"type": "color",
				"default": "rgba(0, 0, 0, 0)",
				"function": "interpolated",
				"transition": true,
				"requires": [
					"text-field"
				]
			},
			"text-halo-width": {
				"type": "number",
				"default": 0,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"requires": [
					"text-field"
				]
			},
			"text-halo-blur": {
				"type": "number",
				"default": 0,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"requires": [
					"text-field"
				]
			},
			"text-translate": {
				"type": "array",
				"value": "number",
				"length": 2,
				"default": [
					0,
					0
				],
				"function": "interpolated",
				"transition": true,
				"units": "pixels",
				"requires": [
					"text-field"
				]
			},
			"text-translate-anchor": {
				"type": "enum",
				"function": "piecewise-constant",
				"values": [
					"map",
					"viewport"
				],
				"default": "map",
				"requires": [
					"text-field",
					"text-translate"
				]
			}
		},
		"paint_raster": {
			"raster-opacity": {
				"type": "number",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"function": "interpolated",
				"transition": true
			},
			"raster-hue-rotate": {
				"type": "number",
				"default": 0,
				"period": 360,
				"function": "interpolated",
				"transition": true,
				"units": "degrees"
			},
			"raster-brightness-min": {
				"type": "number",
				"function": "interpolated",
				"default": 0,
				"minimum": 0,
				"maximum": 1,
				"transition": true
			},
			"raster-brightness-max": {
				"type": "number",
				"function": "interpolated",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"transition": true
			},
			"raster-saturation": {
				"type": "number",
				"default": 0,
				"minimum": -1,
				"maximum": 1,
				"function": "interpolated",
				"transition": true
			},
			"raster-contrast": {
				"type": "number",
				"default": 0,
				"minimum": -1,
				"maximum": 1,
				"function": "interpolated",
				"transition": true
			},
			"raster-fade-duration": {
				"type": "number",
				"default": 300,
				"minimum": 0,
				"function": "interpolated",
				"transition": true,
				"units": "milliseconds"
			}
		},
		"paint_background": {
			"background-color": {
				"type": "color",
				"default": "#000000",
				"function": "interpolated",
				"transition": true,
				"requires": [
					{
						"!": "background-pattern"
					}
				]
			},
			"background-pattern": {
				"type": "string",
				"function": "piecewise-constant",
				"transition": true
			},
			"background-opacity": {
				"type": "number",
				"default": 1,
				"minimum": 0,
				"maximum": 1,
				"function": "interpolated",
				"transition": true
			}
		},
		"transition": {
			"duration": {
				"type": "number",
				"default": 300,
				"minimum": 0,
				"units": "milliseconds"
			},
			"delay": {
				"type": "number",
				"default": 0,
				"minimum": 0,
				"units": "milliseconds"
			}
		}
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var StyleLayer = __webpack_require__(36);

	function BackgroundStyleLayer() {
	    StyleLayer.apply(this, arguments);
	}

	module.exports = BackgroundStyleLayer;

	BackgroundStyleLayer.prototype = util.inherit(StyleLayer, {});


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var StyleLayer = __webpack_require__(36);

	function CircleStyleLayer() {
	    StyleLayer.apply(this, arguments);
	}

	module.exports = CircleStyleLayer;

	CircleStyleLayer.prototype = util.inherit(StyleLayer, {});


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var StyleLayer = __webpack_require__(36);

	function FillStyleLayer() {
	    StyleLayer.apply(this, arguments);
	}

	module.exports = FillStyleLayer;

	FillStyleLayer.prototype = util.inherit(StyleLayer, {});


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var StyleLayer = __webpack_require__(36);

	function LineStyleLayer() {
	    StyleLayer.apply(this, arguments);
	}

	module.exports = LineStyleLayer;

	LineStyleLayer.prototype = util.inherit(StyleLayer, {

	    getPaintValue: function(name, zoom) {
	        var output = StyleLayer.prototype.getPaintValue.apply(this, arguments);

	        // If the line is dashed, scale the dash lengths by the line
	        // width at the previous round zoom level.
	        if (output && name === 'line-dasharray') {
	            var lineWidth = this.getPaintValue('line-width', Math.floor(zoom), Infinity);
	            output.fromScale *= lineWidth;
	            output.toScale *= lineWidth;
	        }

	        return output;
	    }

	});


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var StyleLayer = __webpack_require__(36);

	function RasterStyleLayer() {
	    StyleLayer.apply(this, arguments);
	}

	module.exports = RasterStyleLayer;

	RasterStyleLayer.prototype = util.inherit(StyleLayer, {});


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var StyleLayer = __webpack_require__(36);

	function SymbolStyleLayer() {
	    StyleLayer.apply(this, arguments);
	}

	module.exports = SymbolStyleLayer;

	SymbolStyleLayer.prototype = util.inherit(StyleLayer, {

	    isHidden: function() {
	        if (StyleLayer.prototype.isHidden.apply(this, arguments)) return true;

	        var isTextHidden = this.paint['text-opacity'] === 0 || !this.layout['text-field'];
	        var isIconHidden = this.paint['icon-opacity'] === 0 || !this.layout['icon-image'];
	        if (isTextHidden && isIconHidden) return true;

	        return false;
	    },

	    getLayoutValue: function(name, zoom, zoomHistory) {
	        if (name === 'text-rotation-alignment' &&
	                this.getLayoutValue('symbol-placement', zoom, zoomHistory) === 'line' &&
	                !this.getLayoutProperty('text-rotation-alignment')) {
	            return 'map';
	        } else if (name === 'icon-rotation-alignment' &&
	                this.getLayoutValue('symbol-placement', zoom, zoomHistory) === 'line' &&
	                !this.getLayoutProperty('icon-rotation-alignment')) {
	            return 'map';
	        } else {
	            return StyleLayer.prototype.getLayoutValue.apply(this, arguments);
	        }
	    }

	});


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Evented = __webpack_require__(15);
	var ajax = __webpack_require__(21);
	var browser = __webpack_require__(14);
	var normalizeURL = __webpack_require__(27).normalizeSpriteURL;

	module.exports = ImageSprite;

	function ImageSprite(base) {
	    this.base = base;
	    this.retina = browser.devicePixelRatio > 1;

	    var format = this.retina ? '@2x' : '';

	    ajax.getJSON(normalizeURL(base, format, '.json'), function(err, data) {
	        if (err) {
	            this.fire('error', {error: err});
	            return;
	        }

	        this.data = data;
	        if (this.img) this.fire('load');
	    }.bind(this));

	    ajax.getImage(normalizeURL(base, format, '.png'), function(err, img) {
	        if (err) {
	            this.fire('error', {error: err});
	            return;
	        }

	        // premultiply the sprite
	        var data = img.getData();
	        var newdata = img.data = new Uint8Array(data.length);
	        for (var i = 0; i < data.length; i += 4) {
	            var alpha = data[i + 3] / 255;
	            newdata[i + 0] = data[i + 0] * alpha;
	            newdata[i + 1] = data[i + 1] * alpha;
	            newdata[i + 2] = data[i + 2] * alpha;
	            newdata[i + 3] = data[i + 3];
	        }

	        this.img = img;
	        if (this.data) this.fire('load');
	    }.bind(this));
	}

	ImageSprite.prototype = Object.create(Evented);

	ImageSprite.prototype.toJSON = function() {
	    return this.base;
	};

	ImageSprite.prototype.loaded = function() {
	    return !!(this.data && this.img);
	};

	ImageSprite.prototype.resize = function(/*gl*/) {
	    if (browser.devicePixelRatio > 1 !== this.retina) {
	        var newSprite = new ImageSprite(this.base);
	        newSprite.on('load', function() {
	            this.img = newSprite.img;
	            this.data = newSprite.data;
	            this.retina = newSprite.retina;
	        }.bind(this));
	    }
	};

	function SpritePosition() {}
	SpritePosition.prototype = { x: 0, y: 0, width: 0, height: 0, pixelRatio: 1, sdf: false };

	ImageSprite.prototype.getSpritePosition = function(name) {
	    if (!this.loaded()) return new SpritePosition();

	    var pos = this.data && this.data[name];
	    if (pos && this.img) return pos;

	    return new SpritePosition();
	};


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var normalizeURL = __webpack_require__(27).normalizeGlyphsURL;
	var getArrayBuffer = __webpack_require__(21).getArrayBuffer;
	var Glyphs = __webpack_require__(77);
	var GlyphAtlas = __webpack_require__(78);
	var Protobuf = __webpack_require__(80);

	module.exports = GlyphSource;

	/**
	 * A glyph source has a URL from which to load new glyphs and manages
	 * GlyphAtlases in which to store glyphs used by the requested fontstacks
	 * and ranges.
	 *
	 * @param {string} url glyph template url
	 * @private
	 */
	function GlyphSource(url) {
	    this.url = url && normalizeURL(url);
	    this.atlases = {};
	    this.stacks = {};
	    this.loading = {};
	}

	GlyphSource.prototype.getSimpleGlyphs = function(fontstack, glyphIDs, uid, callback) {
	    if (this.stacks[fontstack] === undefined) {
	        this.stacks[fontstack] = {};
	    }
	    if (this.atlases[fontstack] === undefined) {
	        this.atlases[fontstack] = new GlyphAtlas(128, 128);
	    }

	    var glyphs = {};
	    var stack = this.stacks[fontstack];
	    var atlas = this.atlases[fontstack];

	    // the number of pixels the sdf bitmaps are padded by
	    var buffer = 3;

	    var missing = {};
	    var remaining = 0;
	    var range;

	    for (var i = 0; i < glyphIDs.length; i++) {
	        var glyphID = glyphIDs[i];
	        range = Math.floor(glyphID / 256);

	        if (stack[range]) {
	            var glyph = stack[range].glyphs[glyphID];
	            var rect  = atlas.addGlyph(uid, fontstack, glyph, buffer);
	            if (glyph) glyphs[glyphID] = new SimpleGlyph(glyph, rect, buffer);
	        } else {
	            if (missing[range] === undefined) {
	                missing[range] = [];
	                remaining++;
	            }
	            missing[range].push(glyphID);
	        }
	    }

	    if (!remaining) callback(undefined, glyphs, fontstack);

	    var onRangeLoaded = function(err, range, data) {
	        // TODO not be silent about errors
	        if (!err) {
	            var stack = this.stacks[fontstack][range] = data.stacks[0];
	            for (var i = 0; i < missing[range].length; i++) {
	                var glyphID = missing[range][i];
	                var glyph = stack.glyphs[glyphID];
	                var rect  = atlas.addGlyph(uid, fontstack, glyph, buffer);
	                if (glyph) glyphs[glyphID] = new SimpleGlyph(glyph, rect, buffer);
	            }
	        }
	        remaining--;
	        if (!remaining) callback(undefined, glyphs, fontstack);
	    }.bind(this);

	    for (var r in missing) {
	        this.loadRange(fontstack, r, onRangeLoaded);
	    }
	};

	// A simplified representation of the glyph containing only the properties needed for shaping.
	function SimpleGlyph(glyph, rect, buffer) {
	    var padding = 1;
	    this.advance = glyph.advance;
	    this.left = glyph.left - buffer - padding;
	    this.top = glyph.top + buffer + padding;
	    this.rect = rect;
	}

	GlyphSource.prototype.loadRange = function(fontstack, range, callback) {
	    if (range * 256 > 65535) return callback('glyphs > 65535 not supported');

	    if (this.loading[fontstack] === undefined) {
	        this.loading[fontstack] = {};
	    }
	    var loading = this.loading[fontstack];

	    if (loading[range]) {
	        loading[range].push(callback);
	    } else {
	        loading[range] = [callback];

	        var rangeName = (range * 256) + '-' + (range * 256 + 255);
	        var url = glyphUrl(fontstack, rangeName, this.url);

	        getArrayBuffer(url, function(err, data) {
	            var glyphs = !err && new Glyphs(new Protobuf(new Uint8Array(data)));
	            for (var i = 0; i < loading[range].length; i++) {
	                loading[range][i](err, range, glyphs);
	            }
	            delete loading[range];
	        });
	    }
	};

	GlyphSource.prototype.getGlyphAtlas = function(fontstack) {
	    return this.atlases[fontstack];
	};

	/**
	 * Use CNAME sharding to load a specific glyph range over a randomized
	 * but consistent subdomain.
	 * @param {string} fontstack comma-joined fonts
	 * @param {string} range comma-joined range
	 * @param {url} url templated url
	 * @param {string} [subdomains=abc] subdomains as a string where each letter is one.
	 * @returns {string} a url to load that section of glyphs
	 * @private
	 */
	function glyphUrl(fontstack, range, url, subdomains) {
	    subdomains = subdomains || 'abc';

	    return url
	        .replace('{s}', subdomains[fontstack.length % subdomains.length])
	        .replace('{fontstack}', fontstack)
	        .replace('{range}', range);
	}


/***/ },
/* 77 */
/***/ function(module, exports) {

	'use strict';

	module.exports = Glyphs;

	function Glyphs(pbf, end) {
	    this.stacks = pbf.readFields(readFontstacks, [], end);
	}

	function readFontstacks(tag, stacks, pbf) {
	    if (tag === 1) {
	        var fontstack = pbf.readMessage(readFontstack, {glyphs: {}});
	        stacks.push(fontstack);
	    }
	}

	function readFontstack(tag, fontstack, pbf) {
	    if (tag === 1) fontstack.name = pbf.readString();
	    else if (tag === 2) fontstack.range = pbf.readString();
	    else if (tag === 3) {
	        var glyph = pbf.readMessage(readGlyph, {});
	        fontstack.glyphs[glyph.id] = glyph;
	    }
	}

	function readGlyph(tag, glyph, pbf) {
	    if (tag === 1) glyph.id = pbf.readVarint();
	    else if (tag === 2) glyph.bitmap = pbf.readBytes();
	    else if (tag === 3) glyph.width = pbf.readVarint();
	    else if (tag === 4) glyph.height = pbf.readVarint();
	    else if (tag === 5) glyph.left = pbf.readSVarint();
	    else if (tag === 6) glyph.top = pbf.readSVarint();
	    else if (tag === 7) glyph.advance = pbf.readVarint();
	}


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	var ShelfPack = __webpack_require__(79);

	module.exports = GlyphAtlas;
	function GlyphAtlas(width, height) {
	    this.width = width;
	    this.height = height;

	    this.bin = new ShelfPack(width, height);
	    this.index = {};
	    this.ids = {};
	    this.data = new Uint8Array(width * height);
	}

	GlyphAtlas.prototype = {
	    get debug() {
	        return 'canvas' in this;
	    },
	    set debug(value) {
	        if (value && !this.canvas) {
	            this.canvas = document.createElement('canvas');
	            this.canvas.width = this.width;
	            this.canvas.height = this.height;
	            document.body.appendChild(this.canvas);
	            this.ctx = this.canvas.getContext('2d');
	        } else if (!value && this.canvas) {
	            this.canvas.parentNode.removeChild(this.canvas);
	            delete this.ctx;
	            delete this.canvas;
	        }
	    }
	};

	GlyphAtlas.prototype.getGlyphs = function() {
	    var glyphs = {},
	        split,
	        name,
	        id;

	    for (var key in this.ids) {
	        split = key.split('#');
	        name = split[0];
	        id = split[1];

	        if (!glyphs[name]) glyphs[name] = [];
	        glyphs[name].push(id);
	    }

	    return glyphs;
	};

	GlyphAtlas.prototype.getRects = function() {
	    var rects = {},
	        split,
	        name,
	        id;

	    for (var key in this.ids) {
	        split = key.split('#');
	        name = split[0];
	        id = split[1];

	        if (!rects[name]) rects[name] = {};
	        rects[name][id] = this.index[key];
	    }

	    return rects;
	};


	GlyphAtlas.prototype.addGlyph = function(id, name, glyph, buffer) {
	    if (!glyph) {
	        // console.warn('missing glyph', code, String.fromCharCode(code));
	        return null;
	    }
	    var key = name + "#" + glyph.id;

	    // The glyph is already in this texture.
	    if (this.index[key]) {
	        if (this.ids[key].indexOf(id) < 0) {
	            this.ids[key].push(id);
	        }
	        return this.index[key];
	    }

	    // The glyph bitmap has zero width.
	    if (!glyph.bitmap) {
	        return null;
	    }

	    var bufferedWidth = glyph.width + buffer * 2;
	    var bufferedHeight = glyph.height + buffer * 2;

	    // Add a 1px border around every image.
	    var padding = 1;
	    var packWidth = bufferedWidth + 2 * padding;
	    var packHeight = bufferedHeight + 2 * padding;

	    // Increase to next number divisible by 4, but at least 1.
	    // This is so we can scale down the texture coordinates and pack them
	    // into 2 bytes rather than 4 bytes.
	    packWidth += (4 - packWidth % 4);
	    packHeight += (4 - packHeight % 4);

	    var rect = this.bin.allocate(packWidth, packHeight);
	    if (rect.x < 0) {
	        this.resize();
	        rect = this.bin.allocate(packWidth, packHeight);
	    }
	    if (rect.x < 0) {
	        console.warn('glyph bitmap overflow');
	        return { glyph: glyph, rect: null };
	    }

	    this.index[key] = rect;
	    this.ids[key] = [id];

	    var target = this.data;
	    var source = glyph.bitmap;
	    for (var y = 0; y < bufferedHeight; y++) {
	        var y1 = this.width * (rect.y + y + padding) + rect.x + padding;
	        var y2 = bufferedWidth * y;
	        for (var x = 0; x < bufferedWidth; x++) {
	            target[y1 + x] = source[y2 + x];
	        }
	    }

	    this.dirty = true;

	    return rect;
	};

	GlyphAtlas.prototype.resize = function() {
	    var origw = this.width,
	        origh = this.height;

	    // For now, don't grow the atlas beyond 1024x1024 because of how
	    // texture coords pack into unsigned byte in symbol bucket.
	    if (origw > 512 || origh > 512) return;

	    if (this.texture) {
	        if (this.gl) {
	            this.gl.deleteTexture(this.texture);
	        }
	        this.texture = null;
	    }

	    this.width *= 2;
	    this.height *= 2;
	    this.bin.resize(this.width, this.height);

	    var buf = new ArrayBuffer(this.width * this.height),
	        src, dst;
	    for (var i = 0; i < origh; i++) {
	        src = new Uint8Array(this.data.buffer, origh * i, origw);
	        dst = new Uint8Array(buf, origh * i * 2, origw);
	        dst.set(src);
	    }
	    this.data = new Uint8Array(buf);
	};

	GlyphAtlas.prototype.bind = function(gl) {
	    this.gl = gl;
	    if (!this.texture) {
	        this.texture = gl.createTexture();
	        gl.bindTexture(gl.TEXTURE_2D, this.texture);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, this.width, this.height, 0, gl.ALPHA, gl.UNSIGNED_BYTE, null);

	    } else {
	        gl.bindTexture(gl.TEXTURE_2D, this.texture);
	    }
	};

	GlyphAtlas.prototype.updateTexture = function(gl) {
	    this.bind(gl);
	    if (this.dirty) {

	        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.width, this.height, gl.ALPHA, gl.UNSIGNED_BYTE, this.data);

	        // DEBUG
	        if (this.ctx) {
	            var data = this.ctx.getImageData(0, 0, this.width, this.height);
	            for (var i = 0, j = 0; i < this.data.length; i++, j += 4) {
	                data.data[j] = this.data[i];
	                data.data[j + 1] = this.data[i];
	                data.data[j + 2] = this.data[i];
	                data.data[j + 3] = 255;
	            }
	            this.ctx.putImageData(data, 0, 0);

	            this.ctx.strokeStyle = 'red';
	            for (var k = 0; k < this.bin.free.length; k++) {
	                var free = this.bin.free[k];
	                this.ctx.strokeRect(free.x, free.y, free.w, free.h);
	            }
	        }
	        // END DEBUG

	        this.dirty = false;
	    }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';

	module.exports = ShelfPack;

	/**
	 * Uses the Shelf Best Height Fit algorithm from
	 * http://clb.demon.fi/files/RectangleBinPack.pdf
	 * @private
	 */
	function ShelfPack(width, height) {
	    this.width = width;
	    this.height = height;
	    this.shelves = [];
	    this.stats = {};
	    this.count = function(h) {
	        this.stats[h] = (this.stats[h] | 0) + 1;
	    };
	}

	ShelfPack.prototype.allocate = function(reqWidth, reqHeight) {
	    var y = 0,
	        best = { shelf: -1, waste: Infinity },
	        shelf, waste;

	    // find shelf
	    for (var i = 0; i < this.shelves.length; i++) {
	        shelf = this.shelves[i];
	        y += shelf.height;

	        // exactly the right height with width to spare, pack it..
	        if (reqHeight === shelf.height && reqWidth <= shelf.free) {
	            this.count(reqHeight);
	            return shelf.alloc(reqWidth, reqHeight);
	        }
	        // not enough height or width, skip it..
	        if (reqHeight > shelf.height || reqWidth > shelf.free) {
	            continue;
	        }
	        // maybe enough height or width, minimize waste..
	        if (reqHeight < shelf.height && reqWidth <= shelf.free) {
	            waste = shelf.height - reqHeight;
	            if (waste < best.waste) {
	                best.waste = waste;
	                best.shelf = i;
	            }
	        }
	    }

	    if (best.shelf !== -1) {
	        shelf = this.shelves[best.shelf];
	        this.count(reqHeight);
	        return shelf.alloc(reqWidth, reqHeight);
	    }

	    // add shelf
	    if (reqHeight <= (this.height - y) && reqWidth <= this.width) {
	        shelf = new Shelf(y, this.width, reqHeight);
	        this.shelves.push(shelf);
	        this.count(reqHeight);
	        return shelf.alloc(reqWidth, reqHeight);
	    }

	    // no more space
	    return {x: -1, y: -1};
	};


	ShelfPack.prototype.resize = function(reqWidth, reqHeight) {
	    if (reqWidth < this.width || reqHeight < this.height) { return false; }
	    this.height = reqHeight;
	    this.width = reqWidth;
	    for (var i = 0; i < this.shelves.length; i++) {
	        this.shelves[i].resize(reqWidth);
	    }
	    return true;
	};


	function Shelf(y, width, height) {
	    this.y = y;
	    this.x = 0;
	    this.width = this.free = width;
	    this.height = height;
	}

	Shelf.prototype = {
	    alloc: function(reqWidth, reqHeight) {
	        if (reqWidth > this.free || reqHeight > this.height) {
	            return {x: -1, y: -1};
	        }
	        var x = this.x;
	        this.x += reqWidth;
	        this.free -= reqWidth;
	        return {x: x, y: this.y, w: reqWidth, h: reqHeight};
	    },

	    resize: function(reqWidth) {
	        if (reqWidth < this.width) { return false; }
	        this.free += (reqWidth - this.width);
	        this.width = reqWidth;
	        return true;
	    }
	};



/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	module.exports = Pbf;

	var Buffer = global.Buffer || __webpack_require__(81);

	function Pbf(buf) {
	    this.buf = !Buffer.isBuffer(buf) ? new Buffer(buf || 0) : buf;
	    this.pos = 0;
	    this.length = this.buf.length;
	}

	Pbf.Varint  = 0; // varint: int32, int64, uint32, uint64, sint32, sint64, bool, enum
	Pbf.Fixed64 = 1; // 64-bit: double, fixed64, sfixed64
	Pbf.Bytes   = 2; // length-delimited: string, bytes, embedded messages, packed repeated fields
	Pbf.Fixed32 = 5; // 32-bit: float, fixed32, sfixed32

	var SHIFT_LEFT_32 = (1 << 16) * (1 << 16),
	    SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32,
	    POW_2_63 = Math.pow(2, 63);

	Pbf.prototype = {

	    destroy: function() {
	        this.buf = null;
	    },

	    // === READING =================================================================

	    readFields: function(readField, result, end) {
	        end = end || this.length;

	        while (this.pos < end) {
	            var val = this.readVarint(),
	                tag = val >> 3,
	                startPos = this.pos;

	            readField(tag, result, this);

	            if (this.pos === startPos) this.skip(val);
	        }
	        return result;
	    },

	    readMessage: function(readField, result) {
	        return this.readFields(readField, result, this.readVarint() + this.pos);
	    },

	    readFixed32: function() {
	        var val = this.buf.readUInt32LE(this.pos);
	        this.pos += 4;
	        return val;
	    },

	    readSFixed32: function() {
	        var val = this.buf.readInt32LE(this.pos);
	        this.pos += 4;
	        return val;
	    },

	    // 64-bit int handling is based on github.com/dpw/node-buffer-more-ints (MIT-licensed)

	    readFixed64: function() {
	        var val = this.buf.readUInt32LE(this.pos) + this.buf.readUInt32LE(this.pos + 4) * SHIFT_LEFT_32;
	        this.pos += 8;
	        return val;
	    },

	    readSFixed64: function() {
	        var val = this.buf.readUInt32LE(this.pos) + this.buf.readInt32LE(this.pos + 4) * SHIFT_LEFT_32;
	        this.pos += 8;
	        return val;
	    },

	    readFloat: function() {
	        var val = this.buf.readFloatLE(this.pos);
	        this.pos += 4;
	        return val;
	    },

	    readDouble: function() {
	        var val = this.buf.readDoubleLE(this.pos);
	        this.pos += 8;
	        return val;
	    },

	    readVarint: function() {
	        var buf = this.buf,
	            val, b, b0, b1, b2, b3;

	        b0 = buf[this.pos++]; if (b0 < 0x80) return b0;                 b0 = b0 & 0x7f;
	        b1 = buf[this.pos++]; if (b1 < 0x80) return b0 | b1 << 7;       b1 = (b1 & 0x7f) << 7;
	        b2 = buf[this.pos++]; if (b2 < 0x80) return b0 | b1 | b2 << 14; b2 = (b2 & 0x7f) << 14;
	        b3 = buf[this.pos++]; if (b3 < 0x80) return b0 | b1 | b2 | b3 << 21;

	        val = b0 | b1 | b2 | (b3 & 0x7f) << 21;

	        b = buf[this.pos++]; val += (b & 0x7f) * 0x10000000;         if (b < 0x80) return val;
	        b = buf[this.pos++]; val += (b & 0x7f) * 0x800000000;        if (b < 0x80) return val;
	        b = buf[this.pos++]; val += (b & 0x7f) * 0x40000000000;      if (b < 0x80) return val;
	        b = buf[this.pos++]; val += (b & 0x7f) * 0x2000000000000;    if (b < 0x80) return val;
	        b = buf[this.pos++]; val += (b & 0x7f) * 0x100000000000000;  if (b < 0x80) return val;
	        b = buf[this.pos++]; val += (b & 0x7f) * 0x8000000000000000; if (b < 0x80) return val;

	        throw new Error('Expected varint not more than 10 bytes');
	    },

	    readVarint64: function() {
	        var startPos = this.pos,
	            val = this.readVarint();

	        if (val < POW_2_63) return val;

	        var pos = this.pos - 2;
	        while (this.buf[pos] === 0xff) pos--;
	        if (pos < startPos) pos = startPos;

	        val = 0;
	        for (var i = 0; i < pos - startPos + 1; i++) {
	            var b = ~this.buf[startPos + i] & 0x7f;
	            val += i < 4 ? b << i * 7 : b * Math.pow(2, i * 7);
	        }

	        return -val - 1;
	    },

	    readSVarint: function() {
	        var num = this.readVarint();
	        return num % 2 === 1 ? (num + 1) / -2 : num / 2; // zigzag encoding
	    },

	    readBoolean: function() {
	        return Boolean(this.readVarint());
	    },

	    readString: function() {
	        var end = this.readVarint() + this.pos,
	            str = this.buf.toString('utf8', this.pos, end);
	        this.pos = end;
	        return str;
	    },

	    readBytes: function() {
	        var end = this.readVarint() + this.pos,
	            buffer = this.buf.slice(this.pos, end);
	        this.pos = end;
	        return buffer;
	    },

	    // verbose for performance reasons; doesn't affect gzipped size

	    readPackedVarint: function() {
	        var end = this.readVarint() + this.pos, arr = [];
	        while (this.pos < end) arr.push(this.readVarint());
	        return arr;
	    },
	    readPackedSVarint: function() {
	        var end = this.readVarint() + this.pos, arr = [];
	        while (this.pos < end) arr.push(this.readSVarint());
	        return arr;
	    },
	    readPackedBoolean: function() {
	        var end = this.readVarint() + this.pos, arr = [];
	        while (this.pos < end) arr.push(this.readBoolean());
	        return arr;
	    },
	    readPackedFloat: function() {
	        var end = this.readVarint() + this.pos, arr = [];
	        while (this.pos < end) arr.push(this.readFloat());
	        return arr;
	    },
	    readPackedDouble: function() {
	        var end = this.readVarint() + this.pos, arr = [];
	        while (this.pos < end) arr.push(this.readDouble());
	        return arr;
	    },
	    readPackedFixed32: function() {
	        var end = this.readVarint() + this.pos, arr = [];
	        while (this.pos < end) arr.push(this.readFixed32());
	        return arr;
	    },
	    readPackedSFixed32: function() {
	        var end = this.readVarint() + this.pos, arr = [];
	        while (this.pos < end) arr.push(this.readSFixed32());
	        return arr;
	    },
	    readPackedFixed64: function() {
	        var end = this.readVarint() + this.pos, arr = [];
	        while (this.pos < end) arr.push(this.readFixed64());
	        return arr;
	    },
	    readPackedSFixed64: function() {
	        var end = this.readVarint() + this.pos, arr = [];
	        while (this.pos < end) arr.push(this.readSFixed64());
	        return arr;
	    },

	    skip: function(val) {
	        var type = val & 0x7;
	        if (type === Pbf.Varint) while (this.buf[this.pos++] > 0x7f) {}
	        else if (type === Pbf.Bytes) this.pos = this.readVarint() + this.pos;
	        else if (type === Pbf.Fixed32) this.pos += 4;
	        else if (type === Pbf.Fixed64) this.pos += 8;
	        else throw new Error('Unimplemented type: ' + type);
	    },

	    // === WRITING =================================================================

	    writeTag: function(tag, type) {
	        this.writeVarint((tag << 3) | type);
	    },

	    realloc: function(min) {
	        var length = this.length || 16;

	        while (length < this.pos + min) length *= 2;

	        if (length !== this.length) {
	            var buf = new Buffer(length);
	            this.buf.copy(buf);
	            this.buf = buf;
	            this.length = length;
	        }
	    },

	    finish: function() {
	        this.length = this.pos;
	        this.pos = 0;
	        return this.buf.slice(0, this.length);
	    },

	    writeFixed32: function(val) {
	        this.realloc(4);
	        this.buf.writeUInt32LE(val, this.pos);
	        this.pos += 4;
	    },

	    writeSFixed32: function(val) {
	        this.realloc(4);
	        this.buf.writeInt32LE(val, this.pos);
	        this.pos += 4;
	    },

	    writeFixed64: function(val) {
	        this.realloc(8);
	        this.buf.writeInt32LE(val & -1, this.pos);
	        this.buf.writeUInt32LE(Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
	        this.pos += 8;
	    },

	    writeSFixed64: function(val) {
	        this.realloc(8);
	        this.buf.writeInt32LE(val & -1, this.pos);
	        this.buf.writeInt32LE(Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
	        this.pos += 8;
	    },

	    writeVarint: function(val) {
	        val = +val;

	        if (val <= 0x7f) {
	            this.realloc(1);
	            this.buf[this.pos++] = val;

	        } else if (val <= 0x3fff) {
	            this.realloc(2);
	            this.buf[this.pos++] = ((val >>> 0) & 0x7f) | 0x80;
	            this.buf[this.pos++] = ((val >>> 7) & 0x7f);

	        } else if (val <= 0x1fffff) {
	            this.realloc(3);
	            this.buf[this.pos++] = ((val >>> 0) & 0x7f) | 0x80;
	            this.buf[this.pos++] = ((val >>> 7) & 0x7f) | 0x80;
	            this.buf[this.pos++] = ((val >>> 14) & 0x7f);

	        } else if (val <= 0xfffffff) {
	            this.realloc(4);
	            this.buf[this.pos++] = ((val >>> 0) & 0x7f) | 0x80;
	            this.buf[this.pos++] = ((val >>> 7) & 0x7f) | 0x80;
	            this.buf[this.pos++] = ((val >>> 14) & 0x7f) | 0x80;
	            this.buf[this.pos++] = ((val >>> 21) & 0x7f);

	        } else {
	            var pos = this.pos;
	            while (val >= 0x80) {
	                this.realloc(1);
	                this.buf[this.pos++] = (val & 0xff) | 0x80;
	                val /= 0x80;
	            }
	            this.realloc(1);
	            this.buf[this.pos++] = val | 0;
	            if (this.pos - pos > 10) throw new Error('Given varint doesn\'t fit into 10 bytes');
	        }
	    },

	    writeSVarint: function(val) {
	        this.writeVarint(val < 0 ? -val * 2 - 1 : val * 2);
	    },

	    writeBoolean: function(val) {
	        this.writeVarint(Boolean(val));
	    },

	    writeString: function(str) {
	        str = String(str);
	        var bytes = Buffer.byteLength(str);
	        this.writeVarint(bytes);
	        this.realloc(bytes);
	        this.buf.write(str, this.pos);
	        this.pos += bytes;
	    },

	    writeFloat: function(val) {
	        this.realloc(4);
	        this.buf.writeFloatLE(val, this.pos);
	        this.pos += 4;
	    },

	    writeDouble: function(val) {
	        this.realloc(8);
	        this.buf.writeDoubleLE(val, this.pos);
	        this.pos += 8;
	    },

	    writeBytes: function(buffer) {
	        var len = buffer.length;
	        this.writeVarint(len);
	        this.realloc(len);
	        for (var i = 0; i < len; i++) this.buf[this.pos++] = buffer[i];
	    },

	    writeRawMessage: function(fn, obj) {
	        this.pos++; // reserve 1 byte for short message length

	        // write the message directly to the buffer and see how much was written
	        var startPos = this.pos;
	        fn(obj, this);
	        var len = this.pos - startPos;

	        var varintLen =
	            len <= 0x7f ? 1 :
	            len <= 0x3fff ? 2 :
	            len <= 0x1fffff ? 3 :
	            len <= 0xfffffff ? 4 : Math.ceil(Math.log(len) / (Math.LN2 * 7));

	        // if 1 byte isn't enough for encoding message length, shift the data to the right
	        if (varintLen > 1) {
	            this.realloc(varintLen - 1);
	            for (var i = this.pos - 1; i >= startPos; i--) this.buf[i + varintLen - 1] = this.buf[i];
	        }

	        // finally, write the message length in the reserved place and restore the position
	        this.pos = startPos - 1;
	        this.writeVarint(len);
	        this.pos += len;
	    },

	    writeMessage: function(tag, fn, obj) {
	        this.writeTag(tag, Pbf.Bytes);
	        this.writeRawMessage(fn, obj);
	    },

	    writePackedVarint:   function(tag, arr) { this.writeMessage(tag, writePackedVarint, arr);   },
	    writePackedSVarint:  function(tag, arr) { this.writeMessage(tag, writePackedSVarint, arr);  },
	    writePackedBoolean:  function(tag, arr) { this.writeMessage(tag, writePackedBoolean, arr);  },
	    writePackedFloat:    function(tag, arr) { this.writeMessage(tag, writePackedFloat, arr);    },
	    writePackedDouble:   function(tag, arr) { this.writeMessage(tag, writePackedDouble, arr);   },
	    writePackedFixed32:  function(tag, arr) { this.writeMessage(tag, writePackedFixed32, arr);  },
	    writePackedSFixed32: function(tag, arr) { this.writeMessage(tag, writePackedSFixed32, arr); },
	    writePackedFixed64:  function(tag, arr) { this.writeMessage(tag, writePackedFixed64, arr);  },
	    writePackedSFixed64: function(tag, arr) { this.writeMessage(tag, writePackedSFixed64, arr); },

	    writeBytesField: function(tag, buffer) {
	        this.writeTag(tag, Pbf.Bytes);
	        this.writeBytes(buffer);
	    },
	    writeFixed32Field: function(tag, val) {
	        this.writeTag(tag, Pbf.Fixed32);
	        this.writeFixed32(val);
	    },
	    writeSFixed32Field: function(tag, val) {
	        this.writeTag(tag, Pbf.Fixed32);
	        this.writeSFixed32(val);
	    },
	    writeFixed64Field: function(tag, val) {
	        this.writeTag(tag, Pbf.Fixed64);
	        this.writeFixed64(val);
	    },
	    writeSFixed64Field: function(tag, val) {
	        this.writeTag(tag, Pbf.Fixed64);
	        this.writeSFixed64(val);
	    },
	    writeVarintField: function(tag, val) {
	        this.writeTag(tag, Pbf.Varint);
	        this.writeVarint(val);
	    },
	    writeSVarintField: function(tag, val) {
	        this.writeTag(tag, Pbf.Varint);
	        this.writeSVarint(val);
	    },
	    writeStringField: function(tag, str) {
	        this.writeTag(tag, Pbf.Bytes);
	        this.writeString(str);
	    },
	    writeFloatField: function(tag, val) {
	        this.writeTag(tag, Pbf.Fixed32);
	        this.writeFloat(val);
	    },
	    writeDoubleField: function(tag, val) {
	        this.writeTag(tag, Pbf.Fixed64);
	        this.writeDouble(val);
	    },
	    writeBooleanField: function(tag, val) {
	        this.writeVarintField(tag, Boolean(val));
	    }
	};

	function writePackedVarint(arr, pbf)   { for (var i = 0; i < arr.length; i++) pbf.writeVarint(arr[i]);   }
	function writePackedSVarint(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeSVarint(arr[i]);  }
	function writePackedFloat(arr, pbf)    { for (var i = 0; i < arr.length; i++) pbf.writeFloat(arr[i]);    }
	function writePackedDouble(arr, pbf)   { for (var i = 0; i < arr.length; i++) pbf.writeDouble(arr[i]);   }
	function writePackedBoolean(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeBoolean(arr[i]);  }
	function writePackedFixed32(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeFixed32(arr[i]);  }
	function writePackedSFixed32(arr, pbf) { for (var i = 0; i < arr.length; i++) pbf.writeSFixed32(arr[i]); }
	function writePackedFixed64(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeFixed64(arr[i]);  }
	function writePackedSFixed64(arr, pbf) { for (var i = 0; i < arr.length; i++) pbf.writeSFixed64(arr[i]); }

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	// lightweight Buffer shim for pbf browser build
	// based on code from github.com/feross/buffer (MIT-licensed)

	module.exports = Buffer;

	var ieee754 = __webpack_require__(86);

	var BufferMethods;

	function Buffer(length) {
	    var arr;
	    if (length && length.length) {
	        arr = length;
	        length = arr.length;
	    }
	    var buf = new Uint8Array(length || 0);
	    if (arr) buf.set(arr);

	    buf.readUInt32LE = BufferMethods.readUInt32LE;
	    buf.writeUInt32LE = BufferMethods.writeUInt32LE;
	    buf.readInt32LE = BufferMethods.readInt32LE;
	    buf.writeInt32LE = BufferMethods.writeInt32LE;
	    buf.readFloatLE = BufferMethods.readFloatLE;
	    buf.writeFloatLE = BufferMethods.writeFloatLE;
	    buf.readDoubleLE = BufferMethods.readDoubleLE;
	    buf.writeDoubleLE = BufferMethods.writeDoubleLE;
	    buf.toString = BufferMethods.toString;
	    buf.write = BufferMethods.write;
	    buf.slice = BufferMethods.slice;
	    buf.copy = BufferMethods.copy;

	    buf._isBuffer = true;
	    return buf;
	}

	var lastStr, lastStrEncoded;

	BufferMethods = {
	    readUInt32LE: function(pos) {
	        return ((this[pos]) |
	            (this[pos + 1] << 8) |
	            (this[pos + 2] << 16)) +
	            (this[pos + 3] * 0x1000000);
	    },

	    writeUInt32LE: function(val, pos) {
	        this[pos] = val;
	        this[pos + 1] = (val >>> 8);
	        this[pos + 2] = (val >>> 16);
	        this[pos + 3] = (val >>> 24);
	    },

	    readInt32LE: function(pos) {
	        return ((this[pos]) |
	            (this[pos + 1] << 8) |
	            (this[pos + 2] << 16)) +
	            (this[pos + 3] << 24);
	    },

	    readFloatLE:  function(pos) { return ieee754.read(this, pos, true, 23, 4); },
	    readDoubleLE: function(pos) { return ieee754.read(this, pos, true, 52, 8); },

	    writeFloatLE:  function(val, pos) { return ieee754.write(this, val, pos, true, 23, 4); },
	    writeDoubleLE: function(val, pos) { return ieee754.write(this, val, pos, true, 52, 8); },

	    toString: function(encoding, start, end) {
	        var str = '',
	            tmp = '';

	        start = start || 0;
	        end = Math.min(this.length, end || this.length);

	        for (var i = start; i < end; i++) {
	            var ch = this[i];
	            if (ch <= 0x7F) {
	                str += decodeURIComponent(tmp) + String.fromCharCode(ch);
	                tmp = '';
	            } else {
	                tmp += '%' + ch.toString(16);
	            }
	        }

	        str += decodeURIComponent(tmp);

	        return str;
	    },

	    write: function(str, pos) {
	        var bytes = str === lastStr ? lastStrEncoded : encodeString(str);
	        for (var i = 0; i < bytes.length; i++) {
	            this[pos + i] = bytes[i];
	        }
	    },

	    slice: function(start, end) {
	        return this.subarray(start, end);
	    },

	    copy: function(buf, pos) {
	        pos = pos || 0;
	        for (var i = 0; i < this.length; i++) {
	            buf[pos + i] = this[i];
	        }
	    }
	};

	BufferMethods.writeInt32LE = BufferMethods.writeUInt32LE;

	Buffer.byteLength = function(str) {
	    lastStr = str;
	    lastStrEncoded = encodeString(str);
	    return lastStrEncoded.length;
	};

	Buffer.isBuffer = function(buf) {
	    return !!(buf && buf._isBuffer);
	};

	function encodeString(str) {
	    var length = str.length,
	        bytes = [];

	    for (var i = 0, c, lead; i < length; i++) {
	        c = str.charCodeAt(i); // code point

	        if (c > 0xD7FF && c < 0xE000) {

	            if (lead) {
	                if (c < 0xDC00) {
	                    bytes.push(0xEF, 0xBF, 0xBD);
	                    lead = c;
	                    continue;

	                } else {
	                    c = lead - 0xD800 << 10 | c - 0xDC00 | 0x10000;
	                    lead = null;
	                }

	            } else {
	                if (c > 0xDBFF || (i + 1 === length)) bytes.push(0xEF, 0xBF, 0xBD);
	                else lead = c;

	                continue;
	            }

	        } else if (lead) {
	            bytes.push(0xEF, 0xBF, 0xBD);
	            lead = null;
	        }

	        if (c < 0x80) bytes.push(c);
	        else if (c < 0x800) bytes.push(c >> 0x6 | 0xC0, c & 0x3F | 0x80);
	        else if (c < 0x10000) bytes.push(c >> 0xC | 0xE0, c >> 0x6 & 0x3F | 0x80, c & 0x3F | 0x80);
	        else bytes.push(c >> 0x12 | 0xF0, c >> 0xC & 0x3F | 0x80, c >> 0x6 & 0x3F | 0x80, c & 0x3F | 0x80);
	    }
	    return bytes;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82).Buffer))

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global, console) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(83)
	var ieee754 = __webpack_require__(84)
	var isArray = __webpack_require__(85)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82).Buffer, (function() { return this; }()), __webpack_require__(3)))

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 84 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 85 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 86 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	var ShelfPack = __webpack_require__(79);
	var browser = __webpack_require__(14);

	module.exports = SpriteAtlas;
	function SpriteAtlas(width, height) {
	    this.width = width;
	    this.height = height;

	    this.bin = new ShelfPack(width, height);
	    this.images = {};
	    this.data = false;
	    this.texture = 0; // WebGL ID
	    this.filter = 0; // WebGL ID
	    this.pixelRatio = 1;
	    this.dirty = true;
	}

	SpriteAtlas.prototype = {
	    get debug() {
	        return 'canvas' in this;
	    },
	    set debug(value) {
	        if (value && !this.canvas) {
	            this.canvas = document.createElement('canvas');
	            this.canvas.width = this.width * this.pixelRatio;
	            this.canvas.height = this.height * this.pixelRatio;
	            this.canvas.style.width = this.width + 'px';
	            this.canvas.style.width = this.width + 'px';
	            document.body.appendChild(this.canvas);
	            this.ctx = this.canvas.getContext('2d');
	        } else if (!value && this.canvas) {
	            this.canvas.parentNode.removeChild(this.canvas);
	            delete this.ctx;
	            delete this.canvas;
	        }
	    }
	};

	function copyBitmap(src, srcStride, srcX, srcY, dst, dstStride, dstX, dstY, width, height, wrap) {
	    var srcI = srcY * srcStride + srcX;
	    var dstI = dstY * dstStride + dstX;
	    var x, y;

	    if (wrap) {
	        // add 1 pixel wrapped padding on each side of the image
	        dstI -= dstStride;
	        for (y = -1; y <= height; y++, srcI = ((y + height) % height + srcY) * srcStride + srcX, dstI += dstStride) {
	            for (x = -1; x <= width; x++) {
	                dst[dstI + x] = src[srcI + ((x + width) % width)];
	            }
	        }

	    } else {
	        for (y = 0; y < height; y++, srcI += srcStride, dstI += dstStride) {
	            for (x = 0; x < width; x++) {
	                dst[dstI + x] = src[srcI + x];
	            }
	        }
	    }
	}

	SpriteAtlas.prototype.allocateImage = function(pixelWidth, pixelHeight) {

	    pixelWidth = pixelWidth / this.pixelRatio;
	    pixelHeight = pixelHeight / this.pixelRatio;

	    // Increase to next number divisible by 4, but at least 1.
	    // This is so we can scale down the texture coordinates and pack them
	    // into 2 bytes rather than 4 bytes.
	    // Pad icons to prevent them from polluting neighbours during linear interpolation
	    var padding = 2;
	    var packWidth = pixelWidth + padding + (4 - (pixelWidth + padding) % 4);
	    var packHeight = pixelHeight + padding + (4 - (pixelHeight + padding) % 4);// + 4;

	    // We have to allocate a new area in the bin, and store an empty image in it.
	    // Add a 1px border around every image.
	    var rect = this.bin.allocate(packWidth, packHeight);
	    if (rect.x < 0) {
	        console.warn('SpriteAtlas out of space.');
	        return rect;
	    }

	    return rect;
	};

	SpriteAtlas.prototype.getImage = function(name, wrap) {
	    if (this.images[name]) {
	        return this.images[name];
	    }

	    if (!this.sprite) {
	        return null;
	    }

	    var pos = this.sprite.getSpritePosition(name);
	    if (!pos.width || !pos.height) {
	        return null;
	    }

	    var rect = this.allocateImage(pos.width, pos.height);
	    if (rect.x < 0) {
	        return rect;
	    }

	    var image = new AtlasImage(rect, pos.width / pos.pixelRatio, pos.height / pos.pixelRatio, pos.sdf, pos.pixelRatio / this.pixelRatio);
	    this.images[name] = image;

	    this.copy(rect, pos, wrap);

	    return image;
	};


	// Return position of a repeating fill pattern.
	SpriteAtlas.prototype.getPosition = function(name, repeating) {
	    var image = this.getImage(name, repeating);
	    var rect = image && image.rect;

	    if (!rect) {
	        return null;
	    }

	    var width = image.width * image.pixelRatio;
	    var height = image.height * image.pixelRatio;
	    var padding = 1;

	    return {
	        size: [image.width, image.height],
	        tl: [(rect.x + padding)         / this.width, (rect.y + padding)          / this.height],
	        br: [(rect.x + padding + width) / this.width, (rect.y + padding + height) / this.height]
	    };
	};


	SpriteAtlas.prototype.allocate = function() {
	    if (!this.data) {
	        var w = Math.floor(this.width * this.pixelRatio);
	        var h = Math.floor(this.height * this.pixelRatio);
	        this.data = new Uint32Array(w * h);
	        for (var i = 0; i < this.data.length; i++) {
	            this.data[i] = 0;
	        }
	    }
	};


	SpriteAtlas.prototype.copy = function(dst, src, wrap) {
	    if (!this.sprite.img.data) return;
	    var srcImg = new Uint32Array(this.sprite.img.data.buffer);

	    this.allocate();
	    var dstImg = this.data;

	    var padding = 1;

	    copyBitmap(
	        /* source buffer */  srcImg,
	        /* source stride */  this.sprite.img.width,
	        /* source x */       src.x,
	        /* source y */       src.y,
	        /* dest buffer */    dstImg,
	        /* dest stride */    this.width * this.pixelRatio,
	        /* dest x */         (dst.x + padding) * this.pixelRatio,
	        /* dest y */         (dst.y + padding) * this.pixelRatio,
	        /* icon dimension */ src.width,
	        /* icon dimension */ src.height,
	        /* wrap */ wrap
	    );

	    this.dirty = true;
	};

	SpriteAtlas.prototype.setSprite = function(sprite) {
	    if (sprite) {
	        this.pixelRatio = browser.devicePixelRatio > 1 ? 2 : 1;

	        if (this.canvas) {
	            this.canvas.width = this.width * this.pixelRatio;
	            this.canvas.height = this.height * this.pixelRatio;
	        }
	    }
	    this.sprite = sprite;
	};

	SpriteAtlas.prototype.addIcons = function(icons, callback) {
	    for (var i = 0; i < icons.length; i++) {
	        this.getImage(icons[i]);
	    }

	    callback(null, this.images);
	};

	SpriteAtlas.prototype.bind = function(gl, linear) {
	    var first = false;
	    if (!this.texture) {
	        this.texture = gl.createTexture();
	        gl.bindTexture(gl.TEXTURE_2D, this.texture);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	        first = true;
	    } else {
	        gl.bindTexture(gl.TEXTURE_2D, this.texture);
	    }

	    var filterVal = linear ? gl.LINEAR : gl.NEAREST;
	    if (filterVal !== this.filter) {
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filterVal);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filterVal);
	        this.filter = filterVal;
	    }

	    if (this.dirty) {
	        this.allocate();

	        if (first) {
	            gl.texImage2D(
	                gl.TEXTURE_2D, // enum target
	                0, // ind level
	                gl.RGBA, // ind internalformat
	                this.width * this.pixelRatio, // GLsizei width
	                this.height * this.pixelRatio, // GLsizei height
	                0, // ind border
	                gl.RGBA, // enum format
	                gl.UNSIGNED_BYTE, // enum type
	                new Uint8Array(this.data.buffer) // Object data
	            );
	        } else {
	            gl.texSubImage2D(
	                gl.TEXTURE_2D, // enum target
	                0, // int level
	                0, // int xoffset
	                0, // int yoffset
	                this.width * this.pixelRatio, // long width
	                this.height * this.pixelRatio, // long height
	                gl.RGBA, // enum format
	                gl.UNSIGNED_BYTE, // enum type
	                new Uint8Array(this.data.buffer) // Object pixels
	            );
	        }

	        this.dirty = false;

	        // DEBUG
	        if (this.ctx) {
	            var data = this.ctx.getImageData(0, 0, this.width * this.pixelRatio, this.height * this.pixelRatio);
	            data.data.set(new Uint8ClampedArray(this.data.buffer));
	            this.ctx.putImageData(data, 0, 0);

	            this.ctx.strokeStyle = 'red';
	            for (var k = 0; k < this.bin.free.length; k++) {
	                var free = this.bin.free[k];
	                this.ctx.strokeRect(free.x * this.pixelRatio, free.y * this.pixelRatio, free.w * this.pixelRatio, free.h * this.pixelRatio);
	            }
	        }
	        // END DEBUG
	    }
	};

	function AtlasImage(rect, width, height, sdf, pixelRatio) {
	    this.rect = rect;
	    this.width = width;
	    this.height = height;
	    this.sdf = sdf;
	    this.pixelRatio = pixelRatio;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	module.exports = LineAtlas;

	/**
	 * A LineAtlas lets us reuse rendered dashed lines
	 * by writing many of them to a texture and then fetching their positions
	 * using .getDash.
	 *
	 * @param {number} width
	 * @param {number} height
	 * @private
	 */
	function LineAtlas(width, height) {
	    this.width = width;
	    this.height = height;
	    this.nextRow = 0;

	    this.bytes = 4;
	    this.data = new Uint8Array(this.width * this.height * this.bytes);

	    this.positions = {};
	}

	LineAtlas.prototype.setSprite = function(sprite) {
	    this.sprite = sprite;
	};

	/**
	 * Get or create a dash line pattern.
	 *
	 * @param {Array<number>} dasharray
	 * @param {boolean} round whether to add circle caps in between dash segments
	 * @returns {Object} position of dash texture in { y, height, width }
	 * @private
	 */
	LineAtlas.prototype.getDash = function(dasharray, round) {
	    var key = dasharray.join(",") + round;

	    if (!this.positions[key]) {
	        this.positions[key] = this.addDash(dasharray, round);
	    }
	    return this.positions[key];
	};

	LineAtlas.prototype.addDash = function(dasharray, round) {

	    var n = round ? 7 : 0;
	    var height = 2 * n + 1;
	    var offset = 128;

	    if (this.nextRow + height > this.height) {
	        console.warn('LineAtlas out of space');
	        return null;
	    }

	    var length = 0;
	    for (var i = 0; i < dasharray.length; i++) {
	        length += dasharray[i];
	    }

	    var stretch = this.width / length;
	    var halfWidth = stretch / 2;

	    // If dasharray has an odd length, both the first and last parts
	    // are dashes and should be joined seamlessly.
	    var oddLength = dasharray.length % 2 === 1;

	    for (var y = -n; y <= n; y++) {
	        var row = this.nextRow + n + y;
	        var index = this.width * row;

	        var left = oddLength ? -dasharray[dasharray.length - 1] : 0;
	        var right = dasharray[0];
	        var partIndex = 1;

	        for (var x = 0; x < this.width; x++) {

	            while (right < x / stretch) {
	                left = right;
	                right = right + dasharray[partIndex];

	                if (oddLength && partIndex === dasharray.length - 1) {
	                    right += dasharray[0];
	                }

	                partIndex++;
	            }

	            var distLeft = Math.abs(x - left * stretch);
	            var distRight = Math.abs(x - right * stretch);
	            var dist = Math.min(distLeft, distRight);
	            var inside = (partIndex % 2) === 1;
	            var signedDistance;

	            if (round) {
	                // Add circle caps
	                var distMiddle = n ? y / n * (halfWidth + 1) : 0;
	                if (inside) {
	                    var distEdge = halfWidth - Math.abs(distMiddle);
	                    signedDistance = Math.sqrt(dist * dist + distEdge * distEdge);
	                } else {
	                    signedDistance = halfWidth - Math.sqrt(dist * dist + distMiddle * distMiddle);
	                }
	            } else {
	                signedDistance = (inside ? 1 : -1) * dist;
	            }

	            this.data[3 + (index + x) * 4] = Math.max(0, Math.min(255, signedDistance + offset));
	        }
	    }

	    var pos = {
	        y: (this.nextRow + n + 0.5) / this.height,
	        height: 2 * n / this.height,
	        width: length
	    };

	    this.nextRow += height;
	    this.dirty = true;

	    return pos;
	};

	LineAtlas.prototype.bind = function(gl) {
	    if (!this.texture) {
	        this.texture = gl.createTexture();
	        gl.bindTexture(gl.TEXTURE_2D, this.texture);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.data);

	    } else {
	        gl.bindTexture(gl.TEXTURE_2D, this.texture);

	        if (this.dirty) {
	            this.dirty = false;
	            gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.width, this.height, gl.RGBA, gl.UNSIGNED_BYTE, this.data);
	        }
	    }
	};

	LineAtlas.prototype.debug = function() {

	    var canvas = document.createElement('canvas');

	    document.body.appendChild(canvas);
	    canvas.style.position = 'absolute';
	    canvas.style.top = 0;
	    canvas.style.left = 0;
	    canvas.style.background = '#ff0';

	    canvas.width = this.width;
	    canvas.height = this.height;

	    var ctx = canvas.getContext('2d');
	    var data = ctx.getImageData(0, 0, this.width, this.height);
	    for (var i = 0; i < this.data.length; i++) {
	        if (this.sdf) {
	            var k = i * 4;
	            data.data[k] = data.data[k + 1] = data.data[k + 2] = 0;
	            data.data[k + 3] = this.data[i];
	        } else {
	            data.data[i] = this.data[i];
	        }
	    }
	    ctx.putImageData(data, 0, 0);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Actor = __webpack_require__(90);
	var WebWorkify = __webpack_require__(91);

	module.exports = Dispatcher;

	function Dispatcher(length, parent) {
	    this.actors = [];
	    this.currentActor = 0;
	    for (var i = 0; i < length; i++) {
	        var worker = new WebWorkify(__webpack_require__(92));
	        var actor = new Actor(worker, parent);
	        actor.name = "Worker " + i;
	        this.actors.push(actor);
	    }
	}

	Dispatcher.prototype = {
	    broadcast: function(type, data) {
	        for (var i = 0; i < this.actors.length; i++) {
	            this.actors[i].send(type, data);
	        }
	    },

	    send: function(type, data, callback, targetID, buffers) {
	        if (typeof targetID !== 'number' || isNaN(targetID)) {
	            // Use round robin to send requests to web workers.
	            targetID = this.currentActor = (this.currentActor + 1) % this.actors.length;
	        }

	        this.actors[targetID].send(type, data, callback, buffers);
	        return targetID;
	    },

	    remove: function() {
	        for (var i = 0; i < this.actors.length; i++) {
	            this.actors[i].target.terminate();
	        }
	        this.actors = [];
	    }
	};


/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';

	module.exports = Actor;

	/**
	 * An implementation of the [Actor design pattern](http://en.wikipedia.org/wiki/Actor_model)
	 * that maintains the relationship between asynchronous tasks and the objects
	 * that spin them off - in this case, tasks like parsing parts of styles,
	 * owned by the styles
	 *
	 * @param {WebWorker} target
	 * @param {WebWorker} parent
	 * @private
	 */
	function Actor(target, parent) {
	    this.target = target;
	    this.parent = parent;
	    this.callbacks = {};
	    this.callbackID = 0;
	    this.receive = this.receive.bind(this);
	    this.target.addEventListener('message', this.receive, false);
	}

	Actor.prototype.receive = function(message) {
	    var data = message.data,
	        callback;

	    if (data.type === '<response>') {
	        callback = this.callbacks[data.id];
	        delete this.callbacks[data.id];
	        callback(data.error || null, data.data);
	    } else if (typeof data.id !== 'undefined') {
	        var id = data.id;
	        this.parent[data.type](data.data, function(err, data, buffers) {
	            this.postMessage({
	                type: '<response>',
	                id: String(id),
	                error: err ? String(err) : null,
	                data: data
	            }, buffers);
	        }.bind(this));
	    } else {
	        this.parent[data.type](data.data);
	    }
	};

	Actor.prototype.send = function(type, data, callback, buffers) {
	    var id = null;
	    if (callback) this.callbacks[id = this.callbackID++] = callback;
	    this.postMessage({ type: type, id: String(id), data: data }, buffers);
	};

	/**
	 * Wrapped postMessage API that abstracts around IE's lack of
	 * `transferList` support.
	 *
	 * @param {Object} message
	 * @param {Object} transferList
	 * @private
	 */
	Actor.prototype.postMessage = function(message, transferList) {
	    try {
	        this.target.postMessage(message, transferList);
	    } catch (e) {
	        this.target.postMessage(message); // No support for transferList on IE
	    }
	};


/***/ },
/* 91 */
/***/ function(module, exports) {

	var __webpack_require__ = arguments[2];
	var sources = __webpack_require__.m;

	var webpackBootstrapFunc = function(modules) {
	    var installedModules = {};
	    function __webpack_require__(moduleId) {
	      if(installedModules[moduleId])
	        return installedModules[moduleId].exports;
	      var module = installedModules[moduleId] = {
	        exports: {},
	        id: moduleId,
	        loaded: false
	      };
	      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	      module.loaded = true;
	      return module.exports;
	    }
	    __webpack_require__.m = modules;
	    __webpack_require__.c = installedModules;
	    __webpack_require__.oe = function(err) { throw err; };
	    __webpack_require__.p = "";
	    var f = __webpack_require__(__webpack_require__.s = entryModule);
	    return f.default || f; // try to call default if defined to also support babel esmodule exports
	}

	module.exports = function (fn) {
	    var key;
	    for (var i = 0, l = sources.length; i < l; i++) {
	        if (!sources[i]) {
	            continue;
	        }
	        var wrapperFuncString = sources[i].toString();
	        var fnString = fn.toString();
	        var exp = __webpack_require__(i);
	        // Using babel as a transpiler to use esmodule, the export will always
	        // be an object with the default export as a property of it. To ensure
	        // the existing api and babel esmodule exports are both supported we
	        // check for both
	        if (exp === fn || exp.default === fn) {
	            key = i;
	            break;
	        } else if (wrapperFuncString.indexOf(fnString) > -1) {
	            sources[i] = wrapperFuncString.replace(fnString, '(' + fnString + ')();');
	            key = i;
	            break;
	        }
	    }

	    // window = {}; => https://github.com/borisirota/webworkify-webpack/issues/1
	    var src = 'window = {};\n'
	        + 'var fn = (' + webpackBootstrapFunc.toString().replace('entryModule', key) + ')(['
	        + sources.map(function (func) {
	            return func.toString();
	        }).join(',')
	        + ']);\n'
	        + '(typeof fn === "function") && fn(self);'; // not a function when calling a function from the current scope

	    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

	    return new Worker(URL.createObjectURL(
	        new Blob([src], { type: 'text/javascript' })
	    ));
	};


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Actor = __webpack_require__(90);
	var WorkerTile = __webpack_require__(93);
	var util = __webpack_require__(11);
	var ajax = __webpack_require__(21);
	var vt = __webpack_require__(96);
	var Protobuf = __webpack_require__(80);
	var supercluster = __webpack_require__(120);

	var geojsonvt = __webpack_require__(121);
	var GeoJSONWrapper = __webpack_require__(128);

	module.exports = function(self) {
	    return new Worker(self);
	};

	function Worker(self) {
	    this.self = self;
	    this.actor = new Actor(self, this);
	    this.loading = {};

	    this.loaded = {};
	    this.layers = [];
	    this.geoJSONIndexes = {};
	}

	util.extend(Worker.prototype, {
	    'set layers': function(layers) {
	        this.layers = layers;
	    },

	    'load tile': function(params, callback) {
	        var source = params.source,
	            uid = params.uid;

	        if (!this.loading[source])
	            this.loading[source] = {};


	        var tile = this.loading[source][uid] = new WorkerTile(params);

	        tile.xhr = ajax.getArrayBuffer(params.url, done.bind(this));

	        function done(err, data) {
	            delete this.loading[source][uid];

	            if (err) return callback(err);

	            tile.data = new vt.VectorTile(new Protobuf(new Uint8Array(data)));
	            tile.parse(tile.data, this.layers, this.actor, callback);

	            this.loaded[source] = this.loaded[source] || {};
	            this.loaded[source][uid] = tile;
	        }
	    },

	    'reload tile': function(params, callback) {
	        var loaded = this.loaded[params.source],
	            uid = params.uid;
	        if (loaded && loaded[uid]) {
	            var tile = loaded[uid];
	            tile.parse(tile.data, this.layers, this.actor, callback);
	        }
	    },

	    'abort tile': function(params) {
	        var loading = this.loading[params.source],
	            uid = params.uid;
	        if (loading && loading[uid]) {
	            loading[uid].xhr.abort();
	            delete loading[uid];
	        }
	    },

	    'remove tile': function(params) {
	        var loaded = this.loaded[params.source],
	            uid = params.uid;
	        if (loaded && loaded[uid]) {
	            delete loaded[uid];
	        }
	    },

	    'redo placement': function(params, callback) {
	        var loaded = this.loaded[params.source],
	            loading = this.loading[params.source],
	            uid = params.uid;

	        if (loaded && loaded[uid]) {
	            var tile = loaded[uid];
	            var result = tile.redoPlacement(params.angle, params.pitch, params.collisionDebug);

	            if (result.result) {
	                callback(null, result.result, result.transferables);
	            }

	        } else if (loading && loading[uid]) {
	            loading[uid].angle = params.angle;
	        }
	    },

	    'parse geojson': function(params, callback) {
	        var indexData = function(err, data) {
	            if (err) return callback(err);
	            if (typeof data != 'object') {
	                return callback(new Error("Input data is not a valid GeoJSON object."));
	            }
	            try {
	                this.geoJSONIndexes[params.source] = params.cluster ?
	                    supercluster(params.superclusterOptions).load(data.features) :
	                    geojsonvt(data, params.geojsonVtOptions);
	            } catch (err) {
	                return callback(err);
	            }
	            callback(null);
	        }.bind(this);

	        // TODO accept params.url for urls instead

	        // Not, because of same origin issues, urls must either include an
	        // explicit origin or absolute path.
	        // ie: /foo/bar.json or http://example.com/bar.json
	        // but not ../foo/bar.json
	        if (typeof params.data === 'string') {
	            ajax.getJSON(params.data, indexData);
	        }
	        else indexData(null, params.data);
	    },

	    'load geojson tile': function(params, callback) {
	        var source = params.source,
	            coord = params.coord;

	        if (!this.geoJSONIndexes[source]) return callback(null, null); // we couldn't load the file

	        // console.time('tile ' + coord.z + ' ' + coord.x + ' ' + coord.y);

	        var geoJSONTile = this.geoJSONIndexes[source].getTile(Math.min(coord.z, params.maxZoom), coord.x, coord.y);

	        // console.timeEnd('tile ' + coord.z + ' ' + coord.x + ' ' + coord.y);

	        // if (!geoJSONTile) console.log('not found', this.geoJSONIndexes[source], coord);

	        if (!geoJSONTile) return callback(null, null); // nothing in the given tile

	        var tile = new WorkerTile(params);
	        tile.parse(new GeoJSONWrapper(geoJSONTile.features), this.layers, this.actor, callback);

	        this.loaded[source] = this.loaded[source] || {};
	        this.loaded[source][params.uid] = tile;
	    },

	    'query features': function(params, callback) {
	        var tile = this.loaded[params.source] && this.loaded[params.source][params.uid];
	        if (tile) {
	            tile.featureTree.query(params, callback);
	        } else {
	            callback(null, []);
	        }
	    }
	});


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var FeatureTree = __webpack_require__(94);
	var CollisionTile = __webpack_require__(101);
	var Bucket = __webpack_require__(103);

	module.exports = WorkerTile;

	function WorkerTile(params) {
	    this.coord = params.coord;
	    this.uid = params.uid;
	    this.zoom = params.zoom;
	    this.tileSize = params.tileSize;
	    this.source = params.source;
	    this.overscaling = params.overscaling;
	    this.angle = params.angle;
	    this.pitch = params.pitch;
	    this.collisionDebug = params.collisionDebug;
	}

	WorkerTile.prototype.parse = function(data, layers, actor, callback) {

	    this.status = 'parsing';

	    this.featureTree = new FeatureTree(this.coord, this.overscaling);

	    var stats = { _total: 0 };

	    var tile = this,
	        buffers = {},
	        bucketsById = {},
	        bucketsBySourceLayer = {},
	        i, layer, sourceLayerId, bucket;

	    // Map non-ref layers to buckets.
	    for (i = 0; i < layers.length; i++) {
	        layer = layers[i];

	        if (layer.source !== this.source) continue;
	        if (layer.ref) continue;
	        if (layer.minzoom && this.zoom < layer.minzoom) continue;
	        if (layer.maxzoom && this.zoom >= layer.maxzoom) continue;
	        if (layer.layout && layer.layout.visibility === 'none') continue;

	        bucket = Bucket.create({
	            layer: layer,
	            buffers: buffers,
	            zoom: this.zoom,
	            overscaling: this.overscaling,
	            collisionDebug: this.collisionDebug
	        });

	        bucketsById[layer.id] = bucket;

	        if (data.layers) { // vectortile
	            sourceLayerId = layer['source-layer'];
	            bucketsBySourceLayer[sourceLayerId] = bucketsBySourceLayer[sourceLayerId] || {};
	            bucketsBySourceLayer[sourceLayerId][layer.id] = bucket;
	        }
	    }

	    // Index ref layers.
	    for (i = 0; i < layers.length; i++) {
	        layer = layers[i];
	        if (layer.source === this.source && layer.ref && bucketsById[layer.ref]) {
	            bucketsById[layer.ref].layers.push(layer.id);
	        }
	    }

	    // read each layer, and sort its features into buckets
	    if (data.layers) { // vectortile
	        for (sourceLayerId in bucketsBySourceLayer) {
	            layer = data.layers[sourceLayerId];
	            if (layer) {
	                sortLayerIntoBuckets(layer, bucketsBySourceLayer[sourceLayerId]);
	            }
	        }
	    } else { // geojson
	        sortLayerIntoBuckets(data, bucketsById);
	    }

	    function sortLayerIntoBuckets(layer, buckets) {
	        for (var i = 0; i < layer.length; i++) {
	            var feature = layer.feature(i);
	            for (var id in buckets) {
	                if (buckets[id].filter(feature))
	                    buckets[id].features.push(feature);
	            }
	        }
	    }

	    var buckets = [],
	        symbolBuckets = this.symbolBuckets = [],
	        otherBuckets = [];

	    var collisionTile = new CollisionTile(this.angle, this.pitch);

	    for (var id in bucketsById) {
	        bucket = bucketsById[id];
	        if (bucket.features.length === 0) continue;

	        buckets.push(bucket);

	        if (bucket.type === 'symbol')
	            symbolBuckets.push(bucket);
	        else
	            otherBuckets.push(bucket);
	    }

	    var icons = {};
	    var stacks = {};
	    var deps = 0;


	    if (symbolBuckets.length > 0) {

	        // Get dependencies for symbol buckets
	        for (i = symbolBuckets.length - 1; i >= 0; i--) {
	            symbolBuckets[i].updateIcons(icons);
	            symbolBuckets[i].updateFont(stacks);
	        }

	        for (var fontName in stacks) {
	            stacks[fontName] = Object.keys(stacks[fontName]).map(Number);
	        }
	        icons = Object.keys(icons);

	        actor.send('get glyphs', {uid: this.uid, stacks: stacks}, function(err, newStacks) {
	            stacks = newStacks;
	            gotDependency(err);
	        });

	        if (icons.length) {
	            actor.send('get icons', {icons: icons}, function(err, newIcons) {
	                icons = newIcons;
	                gotDependency(err);
	            });
	        } else {
	            gotDependency();
	        }
	    }

	    // immediately parse non-symbol buckets (they have no dependencies)
	    for (i = otherBuckets.length - 1; i >= 0; i--) {
	        parseBucket(this, otherBuckets[i]);
	    }

	    if (symbolBuckets.length === 0)
	        return done();

	    function gotDependency(err) {
	        if (err) return callback(err);
	        deps++;
	        if (deps === 2) {
	            // all symbol bucket dependencies fetched; parse them in proper order
	            for (var i = symbolBuckets.length - 1; i >= 0; i--) {
	                parseBucket(tile, symbolBuckets[i]);
	            }
	            done();
	        }
	    }

	    function parseBucket(tile, bucket) {
	        var now = Date.now();
	        bucket.addFeatures(collisionTile, stacks, icons);
	        var time = Date.now() - now;

	        if (bucket.interactive) {
	            for (var i = 0; i < bucket.features.length; i++) {
	                var feature = bucket.features[i];
	                tile.featureTree.insert(feature.bbox(), bucket.layers, feature);
	            }
	        }

	        bucket.features = null;

	        stats._total += time;
	        stats[bucket.id] = (stats[bucket.id] || 0) + time;
	    }

	    function done() {
	        tile.status = 'done';

	        if (tile.redoPlacementAfterDone) {
	            var result = tile.redoPlacement(tile.angle, tile.pitch).result;
	            buffers.glyphVertex = result.buffers.glyphVertex;
	            buffers.iconVertex = result.buffers.iconVertex;
	            buffers.collisionBoxVertex = result.buffers.collisionBoxVertex;
	            tile.redoPlacementAfterDone = false;
	        }

	        callback(null, {
	            elementGroups: getElementGroups(buckets),
	            buffers: buffers,
	            bucketStats: stats
	        }, getTransferables(buffers));
	    }
	};

	WorkerTile.prototype.redoPlacement = function(angle, pitch, collisionDebug) {

	    if (this.status !== 'done') {
	        this.redoPlacementAfterDone = true;
	        this.angle = angle;
	        return {};
	    }

	    var buffers = {},
	        collisionTile = new CollisionTile(angle, pitch);

	    for (var i = this.symbolBuckets.length - 1; i >= 0; i--) {
	        this.symbolBuckets[i].placeFeatures(collisionTile, buffers, collisionDebug);
	    }

	    return {
	        result: {
	            elementGroups: getElementGroups(this.symbolBuckets),
	            buffers: buffers
	        },
	        transferables: getTransferables(buffers)
	    };
	};

	function getElementGroups(buckets) {
	    var elementGroups = {};

	    for (var i = 0; i < buckets.length; i++) {
	        elementGroups[buckets[i].id] = buckets[i].elementGroups;
	    }
	    return elementGroups;
	}

	function getTransferables(buffers) {
	    var transferables = [];

	    for (var k in buffers) {
	        transferables.push(buffers[k].arrayBuffer);

	        // The Buffer::push method is generated with "new Function(...)" and not transferrable.
	        buffers[k].push = null;
	    }
	    return transferables;
	}


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var rbush = __webpack_require__(95);
	var Point = __webpack_require__(17);
	var vt = __webpack_require__(96);
	var util = __webpack_require__(11);
	var loadGeometry = __webpack_require__(100);
	var EXTENT = __webpack_require__(24).EXTENT;

	module.exports = FeatureTree;

	function FeatureTree(coord, overscaling) {
	    this.x = coord.x;
	    this.y = coord.y;
	    this.z = coord.z - Math.log(overscaling) / Math.LN2;
	    this.rtree = rbush(9);
	    this.toBeInserted = [];
	}

	FeatureTree.prototype.insert = function(bbox, layers, feature) {
	    var scale = EXTENT / feature.extent;
	    bbox[0] *= scale;
	    bbox[1] *= scale;
	    bbox[2] *= scale;
	    bbox[3] *= scale;
	    bbox.layers = layers;
	    bbox.feature = feature;
	    this.toBeInserted.push(bbox);
	};

	// bulk insert into tree
	FeatureTree.prototype._load = function() {
	    this.rtree.load(this.toBeInserted);
	    this.toBeInserted = [];
	};

	// Finds features in this tile at a particular position.
	FeatureTree.prototype.query = function(args, callback) {
	    if (this.toBeInserted.length) this._load();

	    var params = args.params || {},
	        x = args.x,
	        y = args.y,
	        result = [];

	    var radius, bounds;
	    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
	        // a point (or point+radius) query
	        radius = (params.radius || 0) * EXTENT / args.tileSize / args.scale;
	        bounds = [x - radius, y - radius, x + radius, y + radius];
	    } else {
	        // a rectangle query
	        bounds = [ args.minX, args.minY, args.maxX, args.maxY ];
	    }

	    var matching = this.rtree.search(bounds);
	    for (var i = 0; i < matching.length; i++) {
	        var feature = matching[i].feature,
	            layers = matching[i].layers,
	            type = vt.VectorTileFeature.types[feature.type];

	        if (params.$type && type !== params.$type)
	            continue;
	        if (radius && !geometryContainsPoint(loadGeometry(feature), type, new Point(x, y), radius))
	            continue;
	        else if (!geometryIntersectsBox(loadGeometry(feature), type, bounds))
	            continue;

	        var geoJSON = feature.toGeoJSON(this.x, this.y, this.z);

	        if (!params.includeGeometry) {
	            geoJSON.geometry = null;
	        }

	        for (var l = 0; l < layers.length; l++) {
	            var layer = layers[l];

	            if (params.layerIds && params.layerIds.indexOf(layer) < 0)
	                continue;

	            result.push(util.extend({layer: layer}, geoJSON));
	        }
	    }
	    callback(null, result);
	};

	function geometryIntersectsBox(rings, type, bounds) {
	    return type === 'Point' ? pointIntersectsBox(rings, bounds) :
	           type === 'LineString' ? lineIntersectsBox(rings, bounds) :
	           type === 'Polygon' ? polyIntersectsBox(rings, bounds) || lineIntersectsBox(rings, bounds) : false;
	}

	// Tests whether any of the four corners of the bbox are contained in the
	// interior of the polygon.  Otherwise, defers to lineIntersectsBox.
	function polyIntersectsBox(rings, bounds) {
	    if (polyContainsPoint(rings, new Point(bounds[0], bounds[1])) ||
	        polyContainsPoint(rings, new Point(bounds[0], bounds[3])) ||
	        polyContainsPoint(rings, new Point(bounds[2], bounds[1])) ||
	        polyContainsPoint(rings, new Point(bounds[2], bounds[3])))
	        return true;

	    return lineIntersectsBox(rings, bounds);
	}

	// Only needs to cover the case where the line crosses the bbox boundary.
	// Otherwise, pointIntersectsBox should have us covered.
	function lineIntersectsBox(rings, bounds) {
	    for (var k = 0; k < rings.length; k++) {
	        var ring = rings[k];
	        for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
	            var p0 = ring[i];
	            var p1 = ring[j];

	            // invert the segment so as to reuse segmentCrossesHorizontal for
	            // checking whether it crosses the vertical sides of the bbox.
	            var i0 = new Point(p0.y, p0.x);
	            var i1 = new Point(p1.y, p1.x);

	            if (segmentCrossesHorizontal(p0, p1, bounds[0], bounds[2], bounds[1]) ||
	                segmentCrossesHorizontal(p0, p1, bounds[0], bounds[2], bounds[3]) ||
	                segmentCrossesHorizontal(i0, i1, bounds[1], bounds[3], bounds[0]) ||
	                segmentCrossesHorizontal(i0, i1, bounds[1], bounds[3], bounds[2]))
	                return true;
	        }
	    }

	    return pointIntersectsBox(rings, bounds);
	}

	/*
	 * Answer whether segment p1-p2 intersects with (x1, y)-(x2, y)
	 * Assumes x2 >= x1
	 */
	function segmentCrossesHorizontal(p0, p1, x1, x2, y) {
	    if (p1.y === p0.y)
	        return p1.y === y &&
	            Math.min(p0.x, p1.x) <= x2 &&
	            Math.max(p0.x, p1.x) >= x1;

	    var r = (y - p0.y) / (p1.y - p0.y);
	    var x = p0.x + r * (p1.x - p0.x);
	    return (x >= x1 && x <= x2 && r <= 1 && r >= 0);
	}

	function pointIntersectsBox(rings, bounds) {
	    for (var i = 0; i < rings.length; i++) {
	        var ring = rings[i];
	        for (var j = 0; j < ring.length; j++) {
	            if (ring[j].x >= bounds[0] &&
	                ring[j].y >= bounds[1] &&
	                ring[j].x <= bounds[2] &&
	                ring[j].y <= bounds[3]) return true;
	        }
	    }
	    return false;
	}

	function geometryContainsPoint(rings, type, p, radius) {
	    return type === 'Point' ? pointContainsPoint(rings, p, radius) :
	           type === 'LineString' ? lineContainsPoint(rings, p, radius) :
	           type === 'Polygon' ? polyContainsPoint(rings, p) || lineContainsPoint(rings, p, radius) : false;
	}

	// Code from http://stackoverflow.com/a/1501725/331379.
	function distToSegmentSquared(p, v, w) {
	    var l2 = v.distSqr(w);
	    if (l2 === 0) return p.distSqr(v);
	    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
	    if (t < 0) return p.distSqr(v);
	    if (t > 1) return p.distSqr(w);
	    return p.distSqr(w.sub(v)._mult(t)._add(v));
	}

	function lineContainsPoint(rings, p, radius) {
	    var r = radius * radius;

	    for (var i = 0; i < rings.length; i++) {
	        var ring = rings[i];
	        for (var j = 1; j < ring.length; j++) {
	            // Find line segments that have a distance <= radius^2 to p
	            // In that case, we treat the line as "containing point p".
	            var v = ring[j - 1], w = ring[j];
	            if (distToSegmentSquared(p, v, w) < r) return true;
	        }
	    }
	    return false;
	}

	// point in polygon ray casting algorithm
	function polyContainsPoint(rings, p) {
	    var c = false,
	        ring, p1, p2;

	    for (var k = 0; k < rings.length; k++) {
	        ring = rings[k];
	        for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
	            p1 = ring[i];
	            p2 = ring[j];
	            if (((p1.y > p.y) !== (p2.y > p.y)) && (p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
	                c = !c;
	            }
	        }
	    }
	    return c;
	}

	function pointContainsPoint(rings, p, radius) {
	    var r = radius * radius;

	    for (var i = 0; i < rings.length; i++) {
	        var ring = rings[i];
	        for (var j = 0; j < ring.length; j++) {
	            if (ring[j].distSqr(p) <= r) return true;
	        }
	    }
	    return false;
	}


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
	 (c) 2015, Vladimir Agafonkin
	 RBush, a JavaScript library for high-performance 2D spatial indexing of points and rectangles.
	 https://github.com/mourner/rbush
	*/

	(function () {
	'use strict';

	function rbush(maxEntries, format) {

	    // jshint newcap: false, validthis: true
	    if (!(this instanceof rbush)) return new rbush(maxEntries, format);

	    // max entries in a node is 9 by default; min node fill is 40% for best performance
	    this._maxEntries = Math.max(4, maxEntries || 9);
	    this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));

	    if (format) {
	        this._initFormat(format);
	    }

	    this.clear();
	}

	rbush.prototype = {

	    all: function () {
	        return this._all(this.data, []);
	    },

	    search: function (bbox) {

	        var node = this.data,
	            result = [],
	            toBBox = this.toBBox;

	        if (!intersects(bbox, node.bbox)) return result;

	        var nodesToSearch = [],
	            i, len, child, childBBox;

	        while (node) {
	            for (i = 0, len = node.children.length; i < len; i++) {

	                child = node.children[i];
	                childBBox = node.leaf ? toBBox(child) : child.bbox;

	                if (intersects(bbox, childBBox)) {
	                    if (node.leaf) result.push(child);
	                    else if (contains(bbox, childBBox)) this._all(child, result);
	                    else nodesToSearch.push(child);
	                }
	            }
	            node = nodesToSearch.pop();
	        }

	        return result;
	    },

	    collides: function (bbox) {

	        var node = this.data,
	            toBBox = this.toBBox;

	        if (!intersects(bbox, node.bbox)) return false;

	        var nodesToSearch = [],
	            i, len, child, childBBox;

	        while (node) {
	            for (i = 0, len = node.children.length; i < len; i++) {

	                child = node.children[i];
	                childBBox = node.leaf ? toBBox(child) : child.bbox;

	                if (intersects(bbox, childBBox)) {
	                    if (node.leaf || contains(bbox, childBBox)) return true;
	                    nodesToSearch.push(child);
	                }
	            }
	            node = nodesToSearch.pop();
	        }

	        return false;
	    },

	    load: function (data) {
	        if (!(data && data.length)) return this;

	        if (data.length < this._minEntries) {
	            for (var i = 0, len = data.length; i < len; i++) {
	                this.insert(data[i]);
	            }
	            return this;
	        }

	        // recursively build the tree with the given data from stratch using OMT algorithm
	        var node = this._build(data.slice(), 0, data.length - 1, 0);

	        if (!this.data.children.length) {
	            // save as is if tree is empty
	            this.data = node;

	        } else if (this.data.height === node.height) {
	            // split root if trees have the same height
	            this._splitRoot(this.data, node);

	        } else {
	            if (this.data.height < node.height) {
	                // swap trees if inserted one is bigger
	                var tmpNode = this.data;
	                this.data = node;
	                node = tmpNode;
	            }

	            // insert the small tree into the large tree at appropriate level
	            this._insert(node, this.data.height - node.height - 1, true);
	        }

	        return this;
	    },

	    insert: function (item) {
	        if (item) this._insert(item, this.data.height - 1);
	        return this;
	    },

	    clear: function () {
	        this.data = {
	            children: [],
	            height: 1,
	            bbox: empty(),
	            leaf: true
	        };
	        return this;
	    },

	    remove: function (item) {
	        if (!item) return this;

	        var node = this.data,
	            bbox = this.toBBox(item),
	            path = [],
	            indexes = [],
	            i, parent, index, goingUp;

	        // depth-first iterative tree traversal
	        while (node || path.length) {

	            if (!node) { // go up
	                node = path.pop();
	                parent = path[path.length - 1];
	                i = indexes.pop();
	                goingUp = true;
	            }

	            if (node.leaf) { // check current node
	                index = node.children.indexOf(item);

	                if (index !== -1) {
	                    // item found, remove the item and condense tree upwards
	                    node.children.splice(index, 1);
	                    path.push(node);
	                    this._condense(path);
	                    return this;
	                }
	            }

	            if (!goingUp && !node.leaf && contains(node.bbox, bbox)) { // go down
	                path.push(node);
	                indexes.push(i);
	                i = 0;
	                parent = node;
	                node = node.children[0];

	            } else if (parent) { // go right
	                i++;
	                node = parent.children[i];
	                goingUp = false;

	            } else node = null; // nothing found
	        }

	        return this;
	    },

	    toBBox: function (item) { return item; },

	    compareMinX: function (a, b) { return a[0] - b[0]; },
	    compareMinY: function (a, b) { return a[1] - b[1]; },

	    toJSON: function () { return this.data; },

	    fromJSON: function (data) {
	        this.data = data;
	        return this;
	    },

	    _all: function (node, result) {
	        var nodesToSearch = [];
	        while (node) {
	            if (node.leaf) result.push.apply(result, node.children);
	            else nodesToSearch.push.apply(nodesToSearch, node.children);

	            node = nodesToSearch.pop();
	        }
	        return result;
	    },

	    _build: function (items, left, right, height) {

	        var N = right - left + 1,
	            M = this._maxEntries,
	            node;

	        if (N <= M) {
	            // reached leaf level; return leaf
	            node = {
	                children: items.slice(left, right + 1),
	                height: 1,
	                bbox: null,
	                leaf: true
	            };
	            calcBBox(node, this.toBBox);
	            return node;
	        }

	        if (!height) {
	            // target height of the bulk-loaded tree
	            height = Math.ceil(Math.log(N) / Math.log(M));

	            // target number of root entries to maximize storage utilization
	            M = Math.ceil(N / Math.pow(M, height - 1));
	        }

	        node = {
	            children: [],
	            height: height,
	            bbox: null,
	            leaf: false
	        };

	        // split the items into M mostly square tiles

	        var N2 = Math.ceil(N / M),
	            N1 = N2 * Math.ceil(Math.sqrt(M)),
	            i, j, right2, right3;

	        multiSelect(items, left, right, N1, this.compareMinX);

	        for (i = left; i <= right; i += N1) {

	            right2 = Math.min(i + N1 - 1, right);

	            multiSelect(items, i, right2, N2, this.compareMinY);

	            for (j = i; j <= right2; j += N2) {

	                right3 = Math.min(j + N2 - 1, right2);

	                // pack each entry recursively
	                node.children.push(this._build(items, j, right3, height - 1));
	            }
	        }

	        calcBBox(node, this.toBBox);

	        return node;
	    },

	    _chooseSubtree: function (bbox, node, level, path) {

	        var i, len, child, targetNode, area, enlargement, minArea, minEnlargement;

	        while (true) {
	            path.push(node);

	            if (node.leaf || path.length - 1 === level) break;

	            minArea = minEnlargement = Infinity;

	            for (i = 0, len = node.children.length; i < len; i++) {
	                child = node.children[i];
	                area = bboxArea(child.bbox);
	                enlargement = enlargedArea(bbox, child.bbox) - area;

	                // choose entry with the least area enlargement
	                if (enlargement < minEnlargement) {
	                    minEnlargement = enlargement;
	                    minArea = area < minArea ? area : minArea;
	                    targetNode = child;

	                } else if (enlargement === minEnlargement) {
	                    // otherwise choose one with the smallest area
	                    if (area < minArea) {
	                        minArea = area;
	                        targetNode = child;
	                    }
	                }
	            }

	            node = targetNode;
	        }

	        return node;
	    },

	    _insert: function (item, level, isNode) {

	        var toBBox = this.toBBox,
	            bbox = isNode ? item.bbox : toBBox(item),
	            insertPath = [];

	        // find the best node for accommodating the item, saving all nodes along the path too
	        var node = this._chooseSubtree(bbox, this.data, level, insertPath);

	        // put the item into the node
	        node.children.push(item);
	        extend(node.bbox, bbox);

	        // split on node overflow; propagate upwards if necessary
	        while (level >= 0) {
	            if (insertPath[level].children.length > this._maxEntries) {
	                this._split(insertPath, level);
	                level--;
	            } else break;
	        }

	        // adjust bboxes along the insertion path
	        this._adjustParentBBoxes(bbox, insertPath, level);
	    },

	    // split overflowed node into two
	    _split: function (insertPath, level) {

	        var node = insertPath[level],
	            M = node.children.length,
	            m = this._minEntries;

	        this._chooseSplitAxis(node, m, M);

	        var splitIndex = this._chooseSplitIndex(node, m, M);

	        var newNode = {
	            children: node.children.splice(splitIndex, node.children.length - splitIndex),
	            height: node.height,
	            bbox: null,
	            leaf: false
	        };

	        if (node.leaf) newNode.leaf = true;

	        calcBBox(node, this.toBBox);
	        calcBBox(newNode, this.toBBox);

	        if (level) insertPath[level - 1].children.push(newNode);
	        else this._splitRoot(node, newNode);
	    },

	    _splitRoot: function (node, newNode) {
	        // split root node
	        this.data = {
	            children: [node, newNode],
	            height: node.height + 1,
	            bbox: null,
	            leaf: false
	        };
	        calcBBox(this.data, this.toBBox);
	    },

	    _chooseSplitIndex: function (node, m, M) {

	        var i, bbox1, bbox2, overlap, area, minOverlap, minArea, index;

	        minOverlap = minArea = Infinity;

	        for (i = m; i <= M - m; i++) {
	            bbox1 = distBBox(node, 0, i, this.toBBox);
	            bbox2 = distBBox(node, i, M, this.toBBox);

	            overlap = intersectionArea(bbox1, bbox2);
	            area = bboxArea(bbox1) + bboxArea(bbox2);

	            // choose distribution with minimum overlap
	            if (overlap < minOverlap) {
	                minOverlap = overlap;
	                index = i;

	                minArea = area < minArea ? area : minArea;

	            } else if (overlap === minOverlap) {
	                // otherwise choose distribution with minimum area
	                if (area < minArea) {
	                    minArea = area;
	                    index = i;
	                }
	            }
	        }

	        return index;
	    },

	    // sorts node children by the best axis for split
	    _chooseSplitAxis: function (node, m, M) {

	        var compareMinX = node.leaf ? this.compareMinX : compareNodeMinX,
	            compareMinY = node.leaf ? this.compareMinY : compareNodeMinY,
	            xMargin = this._allDistMargin(node, m, M, compareMinX),
	            yMargin = this._allDistMargin(node, m, M, compareMinY);

	        // if total distributions margin value is minimal for x, sort by minX,
	        // otherwise it's already sorted by minY
	        if (xMargin < yMargin) node.children.sort(compareMinX);
	    },

	    // total margin of all possible split distributions where each node is at least m full
	    _allDistMargin: function (node, m, M, compare) {

	        node.children.sort(compare);

	        var toBBox = this.toBBox,
	            leftBBox = distBBox(node, 0, m, toBBox),
	            rightBBox = distBBox(node, M - m, M, toBBox),
	            margin = bboxMargin(leftBBox) + bboxMargin(rightBBox),
	            i, child;

	        for (i = m; i < M - m; i++) {
	            child = node.children[i];
	            extend(leftBBox, node.leaf ? toBBox(child) : child.bbox);
	            margin += bboxMargin(leftBBox);
	        }

	        for (i = M - m - 1; i >= m; i--) {
	            child = node.children[i];
	            extend(rightBBox, node.leaf ? toBBox(child) : child.bbox);
	            margin += bboxMargin(rightBBox);
	        }

	        return margin;
	    },

	    _adjustParentBBoxes: function (bbox, path, level) {
	        // adjust bboxes along the given tree path
	        for (var i = level; i >= 0; i--) {
	            extend(path[i].bbox, bbox);
	        }
	    },

	    _condense: function (path) {
	        // go through the path, removing empty nodes and updating bboxes
	        for (var i = path.length - 1, siblings; i >= 0; i--) {
	            if (path[i].children.length === 0) {
	                if (i > 0) {
	                    siblings = path[i - 1].children;
	                    siblings.splice(siblings.indexOf(path[i]), 1);

	                } else this.clear();

	            } else calcBBox(path[i], this.toBBox);
	        }
	    },

	    _initFormat: function (format) {
	        // data format (minX, minY, maxX, maxY accessors)

	        // uses eval-type function compilation instead of just accepting a toBBox function
	        // because the algorithms are very sensitive to sorting functions performance,
	        // so they should be dead simple and without inner calls

	        // jshint evil: true

	        var compareArr = ['return a', ' - b', ';'];

	        this.compareMinX = new Function('a', 'b', compareArr.join(format[0]));
	        this.compareMinY = new Function('a', 'b', compareArr.join(format[1]));

	        this.toBBox = new Function('a', 'return [a' + format.join(', a') + '];');
	    }
	};


	// calculate node's bbox from bboxes of its children
	function calcBBox(node, toBBox) {
	    node.bbox = distBBox(node, 0, node.children.length, toBBox);
	}

	// min bounding rectangle of node children from k to p-1
	function distBBox(node, k, p, toBBox) {
	    var bbox = empty();

	    for (var i = k, child; i < p; i++) {
	        child = node.children[i];
	        extend(bbox, node.leaf ? toBBox(child) : child.bbox);
	    }

	    return bbox;
	}

	function empty() { return [Infinity, Infinity, -Infinity, -Infinity]; }

	function extend(a, b) {
	    a[0] = Math.min(a[0], b[0]);
	    a[1] = Math.min(a[1], b[1]);
	    a[2] = Math.max(a[2], b[2]);
	    a[3] = Math.max(a[3], b[3]);
	    return a;
	}

	function compareNodeMinX(a, b) { return a.bbox[0] - b.bbox[0]; }
	function compareNodeMinY(a, b) { return a.bbox[1] - b.bbox[1]; }

	function bboxArea(a)   { return (a[2] - a[0]) * (a[3] - a[1]); }
	function bboxMargin(a) { return (a[2] - a[0]) + (a[3] - a[1]); }

	function enlargedArea(a, b) {
	    return (Math.max(b[2], a[2]) - Math.min(b[0], a[0])) *
	           (Math.max(b[3], a[3]) - Math.min(b[1], a[1]));
	}

	function intersectionArea(a, b) {
	    var minX = Math.max(a[0], b[0]),
	        minY = Math.max(a[1], b[1]),
	        maxX = Math.min(a[2], b[2]),
	        maxY = Math.min(a[3], b[3]);

	    return Math.max(0, maxX - minX) *
	           Math.max(0, maxY - minY);
	}

	function contains(a, b) {
	    return a[0] <= b[0] &&
	           a[1] <= b[1] &&
	           b[2] <= a[2] &&
	           b[3] <= a[3];
	}

	function intersects(a, b) {
	    return b[0] <= a[2] &&
	           b[1] <= a[3] &&
	           b[2] >= a[0] &&
	           b[3] >= a[1];
	}

	// sort an array so that items come in groups of n unsorted items, with groups sorted between each other;
	// combines selection algorithm with binary divide & conquer approach

	function multiSelect(arr, left, right, n, compare) {
	    var stack = [left, right],
	        mid;

	    while (stack.length) {
	        right = stack.pop();
	        left = stack.pop();

	        if (right - left <= n) continue;

	        mid = left + Math.ceil((right - left) / n / 2) * n;
	        select(arr, left, right, mid, compare);

	        stack.push(left, mid, mid, right);
	    }
	}

	// Floyd-Rivest selection algorithm:
	// sort an array between left and right (inclusive) so that the smallest k elements come first (unordered)
	function select(arr, left, right, k, compare) {
	    var n, i, z, s, sd, newLeft, newRight, t, j;

	    while (right > left) {
	        if (right - left > 600) {
	            n = right - left + 1;
	            i = k - left + 1;
	            z = Math.log(n);
	            s = 0.5 * Math.exp(2 * z / 3);
	            sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (i - n / 2 < 0 ? -1 : 1);
	            newLeft = Math.max(left, Math.floor(k - i * s / n + sd));
	            newRight = Math.min(right, Math.floor(k + (n - i) * s / n + sd));
	            select(arr, newLeft, newRight, k, compare);
	        }

	        t = arr[k];
	        i = left;
	        j = right;

	        swap(arr, left, k);
	        if (compare(arr[right], t) > 0) swap(arr, left, right);

	        while (i < j) {
	            swap(arr, i, j);
	            i++;
	            j--;
	            while (compare(arr[i], t) < 0) i++;
	            while (compare(arr[j], t) > 0) j--;
	        }

	        if (compare(arr[left], t) === 0) swap(arr, left, j);
	        else {
	            j++;
	            swap(arr, j, right);
	        }

	        if (j <= k) left = j + 1;
	        if (k <= j) right = j - 1;
	    }
	}

	function swap(arr, i, j) {
	    var tmp = arr[i];
	    arr[i] = arr[j];
	    arr[j] = tmp;
	}


	// export as AMD/CommonJS module or global variable
	if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return rbush; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	else if (typeof module !== 'undefined') module.exports = rbush;
	else if (typeof self !== 'undefined') self.rbush = rbush;
	else window.rbush = rbush;

	})();


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	module.exports.VectorTile = __webpack_require__(97);
	module.exports.VectorTileFeature = __webpack_require__(99);
	module.exports.VectorTileLayer = __webpack_require__(98);


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var VectorTileLayer = __webpack_require__(98);

	module.exports = VectorTile;

	function VectorTile(pbf, end) {
	    this.layers = pbf.readFields(readTile, {}, end);
	}

	function readTile(tag, layers, pbf) {
	    if (tag === 3) {
	        var layer = new VectorTileLayer(pbf, pbf.readVarint() + pbf.pos);
	        if (layer.length) layers[layer.name] = layer;
	    }
	}



/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var VectorTileFeature = __webpack_require__(99);

	module.exports = VectorTileLayer;

	function VectorTileLayer(pbf, end) {
	    // Public
	    this.version = 1;
	    this.name = null;
	    this.extent = 4096;
	    this.length = 0;

	    // Private
	    this._pbf = pbf;
	    this._keys = [];
	    this._values = [];
	    this._features = [];

	    pbf.readFields(readLayer, this, end);

	    this.length = this._features.length;
	}

	function readLayer(tag, layer, pbf) {
	    if (tag === 15) layer.version = pbf.readVarint();
	    else if (tag === 1) layer.name = pbf.readString();
	    else if (tag === 5) layer.extent = pbf.readVarint();
	    else if (tag === 2) layer._features.push(pbf.pos);
	    else if (tag === 3) layer._keys.push(pbf.readString());
	    else if (tag === 4) layer._values.push(readValueMessage(pbf));
	}

	function readValueMessage(pbf) {
	    var value = null,
	        end = pbf.readVarint() + pbf.pos;

	    while (pbf.pos < end) {
	        var tag = pbf.readVarint() >> 3;

	        value = tag === 1 ? pbf.readString() :
	            tag === 2 ? pbf.readFloat() :
	            tag === 3 ? pbf.readDouble() :
	            tag === 4 ? pbf.readVarint64() :
	            tag === 5 ? pbf.readVarint() :
	            tag === 6 ? pbf.readSVarint() :
	            tag === 7 ? pbf.readBoolean() : null;
	    }

	    return value;
	}

	// return feature `i` from this layer as a `VectorTileFeature`
	VectorTileLayer.prototype.feature = function(i) {
	    if (i < 0 || i >= this._features.length) throw new Error('feature index out of bounds');

	    this._pbf.pos = this._features[i];

	    var end = this._pbf.readVarint() + this._pbf.pos;
	    return new VectorTileFeature(this._pbf, end, this.extent, this._keys, this._values);
	};


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Point = __webpack_require__(17);

	module.exports = VectorTileFeature;

	function VectorTileFeature(pbf, end, extent, keys, values) {
	    // Public
	    this.properties = {};
	    this.extent = extent;
	    this.type = 0;

	    // Private
	    this._pbf = pbf;
	    this._geometry = -1;
	    this._keys = keys;
	    this._values = values;

	    pbf.readFields(readFeature, this, end);
	}

	function readFeature(tag, feature, pbf) {
	    if (tag == 1) feature._id = pbf.readVarint();
	    else if (tag == 2) readTag(pbf, feature);
	    else if (tag == 3) feature.type = pbf.readVarint();
	    else if (tag == 4) feature._geometry = pbf.pos;
	}

	function readTag(pbf, feature) {
	    var end = pbf.readVarint() + pbf.pos;

	    while (pbf.pos < end) {
	        var key = feature._keys[pbf.readVarint()],
	            value = feature._values[pbf.readVarint()];
	        feature.properties[key] = value;
	    }
	}

	VectorTileFeature.types = ['Unknown', 'Point', 'LineString', 'Polygon'];

	VectorTileFeature.prototype.loadGeometry = function() {
	    var pbf = this._pbf;
	    pbf.pos = this._geometry;

	    var end = pbf.readVarint() + pbf.pos,
	        cmd = 1,
	        length = 0,
	        x = 0,
	        y = 0,
	        lines = [],
	        line;

	    while (pbf.pos < end) {
	        if (!length) {
	            var cmdLen = pbf.readVarint();
	            cmd = cmdLen & 0x7;
	            length = cmdLen >> 3;
	        }

	        length--;

	        if (cmd === 1 || cmd === 2) {
	            x += pbf.readSVarint();
	            y += pbf.readSVarint();

	            if (cmd === 1) { // moveTo
	                if (line) lines.push(line);
	                line = [];
	            }

	            line.push(new Point(x, y));

	        } else if (cmd === 7) {

	            // Workaround for https://github.com/mapbox/mapnik-vector-tile/issues/90
	            if (line) {
	                line.push(line[0].clone()); // closePolygon
	            }

	        } else {
	            throw new Error('unknown command ' + cmd);
	        }
	    }

	    if (line) lines.push(line);

	    return lines;
	};

	VectorTileFeature.prototype.bbox = function() {
	    var pbf = this._pbf;
	    pbf.pos = this._geometry;

	    var end = pbf.readVarint() + pbf.pos,
	        cmd = 1,
	        length = 0,
	        x = 0,
	        y = 0,
	        x1 = Infinity,
	        x2 = -Infinity,
	        y1 = Infinity,
	        y2 = -Infinity;

	    while (pbf.pos < end) {
	        if (!length) {
	            var cmdLen = pbf.readVarint();
	            cmd = cmdLen & 0x7;
	            length = cmdLen >> 3;
	        }

	        length--;

	        if (cmd === 1 || cmd === 2) {
	            x += pbf.readSVarint();
	            y += pbf.readSVarint();
	            if (x < x1) x1 = x;
	            if (x > x2) x2 = x;
	            if (y < y1) y1 = y;
	            if (y > y2) y2 = y;

	        } else if (cmd !== 7) {
	            throw new Error('unknown command ' + cmd);
	        }
	    }

	    return [x1, y1, x2, y2];
	};

	VectorTileFeature.prototype.toGeoJSON = function(x, y, z) {
	    var size = this.extent * Math.pow(2, z),
	        x0 = this.extent * x,
	        y0 = this.extent * y,
	        coords = this.loadGeometry(),
	        type = VectorTileFeature.types[this.type];

	    for (var i = 0; i < coords.length; i++) {
	        var line = coords[i];
	        for (var j = 0; j < line.length; j++) {
	            var p = line[j], y2 = 180 - (p.y + y0) * 360 / size;
	            line[j] = [
	                (p.x + x0) * 360 / size - 180,
	                360 / Math.PI * Math.atan(Math.exp(y2 * Math.PI / 180)) - 90
	            ];
	        }
	    }

	    if (type === 'Point' && coords.length === 1) {
	        coords = coords[0][0];
	    } else if (type === 'Point') {
	        coords = coords[0];
	        type = 'MultiPoint';
	    } else if (type === 'LineString' && coords.length === 1) {
	        coords = coords[0];
	    } else if (type === 'LineString') {
	        type = 'MultiLineString';
	    }

	    var result = {
	        type: "Feature",
	        geometry: {
	            type: type,
	            coordinates: coords
	        },
	        properties: this.properties
	    };

	    if ('_id' in this) {
	        result.id = this._id;
	    }

	    return result;
	};


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EXTENT = __webpack_require__(24).EXTENT;

	/**
	 * Loads a geometry from a VectorTileFeature and scales it to the common extent
	 * used internally.
	 * @private
	 */
	module.exports = function loadGeometry(feature) {
	    var scale = EXTENT / feature.extent;
	    var geometry = feature.loadGeometry();
	    for (var r = 0; r < geometry.length; r++) {
	        var ring = geometry[r];
	        for (var p = 0; p < ring.length; p++) {
	            var point = ring[p];
	            // round here because mapbox-gl-native uses integers to represent
	            // points and we need to do the same to avoid renering differences.
	            point.x = Math.round(point.x * scale);
	            point.y = Math.round(point.y * scale);
	        }
	    }
	    return geometry;
	};


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var rbush = __webpack_require__(95);
	var CollisionBox = __webpack_require__(102);
	var Point = __webpack_require__(17);
	var EXTENT = __webpack_require__(24).EXTENT;

	module.exports = CollisionTile;

	/**
	 * A collision tile used to prevent symbols from overlapping. It keep tracks of
	 * where previous symbols have been placed and is used to check if a new
	 * symbol overlaps with any previously added symbols.
	 *
	 * @class CollisionTile
	 * @param {number} angle
	 * @param {number} pitch
	 * @private
	 */
	function CollisionTile(angle, pitch) {
	    this.tree = rbush();
	    this.angle = angle;

	    var sin = Math.sin(angle),
	        cos = Math.cos(angle);
	    this.rotationMatrix = [cos, -sin, sin, cos];
	    this.reverseRotationMatrix = [cos, sin, -sin, cos];

	    // Stretch boxes in y direction to account for the map tilt.
	    this.yStretch = 1 / Math.cos(pitch / 180 * Math.PI);

	    // The amount the map is squished depends on the y position.
	    // Sort of account for this by making all boxes a bit bigger.
	    this.yStretch = Math.pow(this.yStretch, 1.3);

	    this.edges = [
	        //left
	        new CollisionBox(new Point(0, 0), 0, -Infinity, 0, Infinity, Infinity),
	        // right
	        new CollisionBox(new Point(EXTENT, 0), 0, -Infinity, 0, Infinity, Infinity),
	        // top
	        new CollisionBox(new Point(0, 0), -Infinity, 0, Infinity, 0, Infinity),
	        // bottom
	        new CollisionBox(new Point(0, EXTENT), -Infinity, 0, Infinity, 0, Infinity)
	    ];
	}

	CollisionTile.prototype.minScale = 0.25;
	CollisionTile.prototype.maxScale = 2;


	/**
	 * Find the scale at which the collisionFeature can be shown without
	 * overlapping with other features.
	 *
	 * @param {CollisionFeature} collisionFeature
	 * @returns {number} placementScale
	 * @private
	 */
	CollisionTile.prototype.placeCollisionFeature = function(collisionFeature, allowOverlap, avoidEdges) {

	    var minPlacementScale = this.minScale;
	    var rotationMatrix = this.rotationMatrix;
	    var yStretch = this.yStretch;

	    for (var b = 0; b < collisionFeature.boxes.length; b++) {

	        var box = collisionFeature.boxes[b];

	        if (!allowOverlap) {
	            var anchorPoint = box.anchorPoint.matMult(rotationMatrix);
	            var x = anchorPoint.x;
	            var y = anchorPoint.y;

	            box[0] = x + box.x1;
	            box[1] = y + box.y1 * yStretch;
	            box[2] = x + box.x2;
	            box[3] = y + box.y2 * yStretch;

	            var blockingBoxes = this.tree.search(box);

	            for (var i = 0; i < blockingBoxes.length; i++) {
	                var blocking = blockingBoxes[i];
	                var blockingAnchorPoint = blocking.anchorPoint.matMult(rotationMatrix);

	                minPlacementScale = this.getPlacementScale(minPlacementScale, anchorPoint, box, blockingAnchorPoint, blocking);
	                if (minPlacementScale >= this.maxScale) {
	                    return minPlacementScale;
	                }
	            }
	        }

	        if (avoidEdges) {
	            var reverseRotationMatrix = this.reverseRotationMatrix;
	            var tl = new Point(box.x1, box.y1).matMult(reverseRotationMatrix);
	            var tr = new Point(box.x2, box.y1).matMult(reverseRotationMatrix);
	            var bl = new Point(box.x1, box.y2).matMult(reverseRotationMatrix);
	            var br = new Point(box.x2, box.y2).matMult(reverseRotationMatrix);
	            var rotatedCollisionBox = new CollisionBox(box.anchorPoint,
	                    Math.min(tl.x, tr.x, bl.x, br.x),
	                    Math.min(tl.y, tr.x, bl.x, br.x),
	                    Math.max(tl.x, tr.x, bl.x, br.x),
	                    Math.max(tl.y, tr.x, bl.x, br.x),
	                    box.maxScale);

	            for (var k = 0; k < this.edges.length; k++) {
	                var edgeBox = this.edges[k];
	                minPlacementScale = this.getPlacementScale(minPlacementScale, box.anchorPoint, rotatedCollisionBox, edgeBox.anchorPoint, edgeBox);
	                if (minPlacementScale >= this.maxScale) {
	                    return minPlacementScale;
	                }
	            }
	        }
	    }

	    return minPlacementScale;
	};


	CollisionTile.prototype.getPlacementScale = function(minPlacementScale, anchorPoint, box, blockingAnchorPoint, blocking) {

	    // Find the lowest scale at which the two boxes can fit side by side without overlapping.
	    // Original algorithm:
	    var s1 = (blocking.x1 - box.x2) / (anchorPoint.x - blockingAnchorPoint.x); // scale at which new box is to the left of old box
	    var s2 = (blocking.x2 - box.x1) / (anchorPoint.x - blockingAnchorPoint.x); // scale at which new box is to the right of old box
	    var s3 = (blocking.y1 - box.y2) * this.yStretch / (anchorPoint.y - blockingAnchorPoint.y); // scale at which new box is to the top of old box
	    var s4 = (blocking.y2 - box.y1) * this.yStretch / (anchorPoint.y - blockingAnchorPoint.y); // scale at which new box is to the bottom of old box

	    if (isNaN(s1) || isNaN(s2)) s1 = s2 = 1;
	    if (isNaN(s3) || isNaN(s4)) s3 = s4 = 1;

	    var collisionFreeScale = Math.min(Math.max(s1, s2), Math.max(s3, s4));

	    if (collisionFreeScale > blocking.maxScale) {
	        // After a box's maxScale the label has shrunk enough that the box is no longer needed to cover it,
	        // so unblock the new box at the scale that the old box disappears.
	        collisionFreeScale = blocking.maxScale;
	    }

	    if (collisionFreeScale > box.maxScale) {
	        // If the box can only be shown after it is visible, then the box can never be shown.
	        // But the label can be shown after this box is not visible.
	        collisionFreeScale = box.maxScale;
	    }

	    if (collisionFreeScale > minPlacementScale &&
	            collisionFreeScale >= blocking.placementScale) {
	        // If this collision occurs at a lower scale than previously found collisions
	        // and the collision occurs while the other label is visible

	        // this this is the lowest scale at which the label won't collide with anything
	        minPlacementScale = collisionFreeScale;
	    }

	    return minPlacementScale;
	};


	/**
	 * Remember this collisionFeature and what scale it was placed at to block
	 * later features from overlapping with it.
	 *
	 * @param {CollisionFeature} collisionFeature
	 * @param {number} minPlacementScale
	 * @private
	 */
	CollisionTile.prototype.insertCollisionFeature = function(collisionFeature, minPlacementScale) {

	    var boxes = collisionFeature.boxes;
	    for (var k = 0; k < boxes.length; k++) {
	        boxes[k].placementScale = minPlacementScale;
	    }

	    if (minPlacementScale < this.maxScale) {
	        this.tree.load(boxes);
	    }
	};


/***/ },
/* 102 */
/***/ function(module, exports) {

	'use strict';

	module.exports = CollisionBox;

	/**
	 * A collision box represents an area of the map that that is covered by a
	 * label. CollisionFeature uses one or more of these collision boxes to
	 * represent all the area covered by a single label. They are used to
	 * prevent collisions between labels.
	 *
	 * A collision box actually represents a 3d volume. The first two dimensions,
	 * x and y, are specified with `anchor` along with `x1`, `y1`, `x2`, `y2`.
	 * The third dimension, zoom, is limited by `maxScale` which determines
	 * how far in the z dimensions the box extends.
	 *
	 * As you zoom in on a map, all points on the map get further and further apart
	 * but labels stay roughly the same size. Labels cover less real world area on
	 * the map at higher zoom levels than they do at lower zoom levels. This is why
	 * areas are are represented with an anchor point and offsets from that point
	 * instead of just using four absolute points.
	 *
	 * Line labels are represented by a set of these boxes spaced out along a line.
	 * When you zoom in, line labels cover less real world distance along the line
	 * than they used to. Collision boxes near the edges that used to cover label
	 * no longer do. If a box doesn't cover the label anymore it should be ignored
	 * when doing collision checks. `maxScale` is how much you can scale the map
	 * before the label isn't within the box anymore.
	 * For example
	 * lower zoom:
	 * https://cloud.githubusercontent.com/assets/1421652/8060094/4d975f76-0e91-11e5-84b1-4edeb30a5875.png
	 * slightly higher zoom:
	 * https://cloud.githubusercontent.com/assets/1421652/8060061/26ae1c38-0e91-11e5-8c5a-9f380bf29f0a.png
	 * In the zoomed in image the two grey boxes on either side don't cover the
	 * label anymore. Their maxScale is smaller than the current scale.
	 *
	 *
	 * @class CollisionBox
	 * @param {Point} anchorPoint The anchor point the box is centered around.
	 * @param {number} x1 The distance from the anchor to the left edge.
	 * @param {number} y1 The distance from the anchor to the top edge.
	 * @param {number} x2 The distance from the anchor to the right edge.
	 * @param {number} y2 The distance from the anchor to the bottom edge.
	 * @param {number} maxScale The maximum scale this box can block other boxes at.
	 * @private
	 */
	function CollisionBox(anchorPoint, x1, y1, x2, y2, maxScale) {
	    // the box is centered around the anchor point
	    this.anchorPoint = anchorPoint;

	    // distances to the edges from the anchor
	    this.x1 = x1;
	    this.y1 = y1;
	    this.x2 = x2;
	    this.y2 = y2;

	    // the box is only valid for scales < maxScale.
	    // The box does not block other boxes at scales >= maxScale;
	    this.maxScale = maxScale;

	    // the scale at which the label can first be shown
	    this.placementScale = 0;

	    // rotated and scaled bbox used for indexing
	    this[0] = this[1] = this[2] = this[3] = 0;
	}


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var featureFilter = __webpack_require__(104);

	var ElementGroups = __webpack_require__(105);
	var Buffer = __webpack_require__(24);
	var StyleLayer = __webpack_require__(36);

	module.exports = Bucket;

	/**
	 * Instantiate the appropriate subclass of `Bucket` for `options`.
	 * @private
	 * @param options See `Bucket` constructor options
	 * @returns {Bucket}
	 */
	Bucket.create = function(options) {
	    var Classes = {
	        fill: __webpack_require__(106),
	        line: __webpack_require__(107),
	        circle: __webpack_require__(108),
	        symbol: __webpack_require__(109)
	    };
	    return new Classes[options.layer.type](options);
	};

	Bucket.AttributeType = Buffer.AttributeType;

	/**
	 * The `Bucket` class builds a set of `Buffer`s for a set of vector tile
	 * features.
	 *
	 * `Bucket` is an abstract class. A subclass exists for each Mapbox GL
	 * style spec layer type. Because `Bucket` is an abstract class,
	 * instances should be created via the `Bucket.create` method.
	 *
	 * For performance reasons, `Bucket` creates its "add"s methods at
	 * runtime using `new Function(...)`.
	 *
	 * @class Bucket
	 * @private
	 * @param options
	 * @param {number} options.zoom Zoom level of the buffers being built. May be
	 *     a fractional zoom level.
	 * @param options.layer A Mapbox GL style layer object
	 * @param {Object.<string, Buffer>} options.buffers The set of `Buffer`s being
	 *     built for this tile. This object facilitates sharing of `Buffer`s be
	       between `Bucket`s.
	 */
	function Bucket(options) {
	    this.zoom = options.zoom;
	    this.overscaling = options.overscaling;

	    this.layer = StyleLayer.create(options.layer);
	    this.layer.recalculate(this.zoom, { lastIntegerZoom: Infinity, lastIntegerZoomTime: 0, lastZoom: 0 });

	    this.layers = [this.layer.id];
	    this.type = this.layer.type;
	    this.features = [];
	    this.id = this.layer.id;
	    this['source-layer'] = this.layer['source-layer'];
	    this.interactive = this.layer.interactive;
	    this.minZoom = this.layer.minzoom;
	    this.maxZoom = this.layer.maxzoom;
	    this.filter = featureFilter(this.layer.filter);

	    this.resetBuffers(options.buffers);

	    for (var shaderName in this.shaders) {
	        var shader = this.shaders[shaderName];
	        this[this.getAddMethodName(shaderName, 'vertex')] = createVertexAddMethod(
	            shaderName,
	            shader,
	            this.getBufferName(shaderName, 'vertex')
	        );
	    }
	}

	/**
	 * Build the buffers! Features are set directly to the `features` property.
	 * @private
	 */
	Bucket.prototype.addFeatures = function() {
	    for (var i = 0; i < this.features.length; i++) {
	        this.addFeature(this.features[i]);
	    }
	};

	/**
	 * Check if there is enough space available in the current element group for
	 * `vertexLength` vertices. If not, append a new elementGroup. Should be called
	 * by `addFeatures` and its callees.
	 * @private
	 * @param {string} shaderName the name of the shader associated with the buffer that will receive the vertices
	 * @param {number} vertexLength The number of vertices that will be inserted to the buffer.
	 */
	Bucket.prototype.makeRoomFor = function(shaderName, vertexLength) {
	    return this.elementGroups[shaderName].makeRoomFor(vertexLength);
	};

	/**
	 * Start using a new shared `buffers` object and recreate instances of `Buffer`
	 * as necessary.
	 * @private
	 * @param {Object.<string, Buffer>} buffers
	 */
	Bucket.prototype.resetBuffers = function(buffers) {
	    this.buffers = buffers;
	    this.elementGroups = {};

	    for (var shaderName in this.shaders) {
	        var shader = this.shaders[shaderName];

	        var vertexBufferName = this.getBufferName(shaderName, 'vertex');
	        if (shader.vertexBuffer && !buffers[vertexBufferName]) {
	            buffers[vertexBufferName] = new Buffer({
	                type: Buffer.BufferType.VERTEX,
	                attributes: shader.attributes
	            });
	        }

	        if (shader.elementBuffer) {
	            var elementBufferName = this.getBufferName(shaderName, 'element');
	            if (!buffers[elementBufferName]) {
	                buffers[elementBufferName] = createElementBuffer(shader.elementBufferComponents);
	            }
	            this[this.getAddMethodName(shaderName, 'element')] = createElementAddMethod(this.buffers[elementBufferName]);
	        }

	        if (shader.secondElementBuffer) {
	            var secondElementBufferName = this.getBufferName(shaderName, 'secondElement');
	            if (!buffers[secondElementBufferName]) {
	                buffers[secondElementBufferName] = createElementBuffer(shader.secondElementBufferComponents);
	            }
	            this[this.getAddMethodName(shaderName, 'secondElement')] = createElementAddMethod(this.buffers[secondElementBufferName]);
	        }

	        this.elementGroups[shaderName] = new ElementGroups(
	            buffers[this.getBufferName(shaderName, 'vertex')],
	            buffers[this.getBufferName(shaderName, 'element')],
	            buffers[this.getBufferName(shaderName, 'secondElement')]
	        );
	    }
	};

	/**
	 * Get the name of the method used to add an item to a buffer.
	 * @param {string} shaderName The name of the shader that will use the buffer
	 * @param {string} type One of "vertex", "element", or "secondElement"
	 * @returns {string}
	 */
	Bucket.prototype.getAddMethodName = function(shaderName, type) {
	    return 'add' + capitalize(shaderName) + capitalize(type);
	};

	/**
	 * Get the name of a buffer.
	 * @param {string} shaderName The name of the shader that will use the buffer
	 * @param {string} type One of "vertex", "element", or "secondElement"
	 * @returns {string}
	 */
	Bucket.prototype.getBufferName = function(shaderName, type) {
	    return shaderName + capitalize(type);
	};

	var createVertexAddMethodCache = {};
	function createVertexAddMethod(shaderName, shader, bufferName) {
	    var pushArgs = [];
	    for (var i = 0; i < shader.attributes.length; i++) {
	        pushArgs = pushArgs.concat(shader.attributes[i].value);
	    }

	    var body = 'return this.buffers.' + bufferName + '.push(' + pushArgs.join(', ') + ');';

	    if (!createVertexAddMethodCache[body]) {
	        createVertexAddMethodCache[body] = new Function(shader.attributeArgs, body);
	    }

	    return createVertexAddMethodCache[body];
	}

	function createElementAddMethod(buffer) {
	    return function(one, two, three) {
	        return buffer.push(one, two, three);
	    };
	}

	function createElementBuffer(components) {
	    return new Buffer({
	        type: Buffer.BufferType.ELEMENT,
	        attributes: [{
	            name: 'vertices',
	            components: components || 3,
	            type: Buffer.ELEMENT_ATTRIBUTE_TYPE
	        }]
	    });
	}

	function capitalize(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}


/***/ },
/* 104 */
/***/ function(module, exports) {

	'use strict';

	module.exports = createFilter;

	var types = ['Unknown', 'Point', 'LineString', 'Polygon'];

	/**
	 * Given a filter expressed as nested arrays, return a new function
	 * that evaluates whether a given feature (with a .properties or .tags property)
	 * passes its test.
	 *
	 * @param {Array} filter mapbox gl filter
	 * @returns {Function} filter-evaluating function
	 */
	function createFilter(filter) {
	    return new Function('f', 'return ' + compile(filter));
	}

	function compile(filter) {
	    if (!filter) return 'true';
	    var op = filter[0];
	    if (filter.length <= 1) return op === 'any' ? 'false' : 'true';
	    var str =
	        op === '==' ? compare(filter[1], filter[2], '===', false) :
	        op === '!=' ? compare(filter[1], filter[2], '!==', false) :
	        op === '<' ||
	        op === '>' ||
	        op === '<=' ||
	        op === '>=' ? compare(filter[1], filter[2], op, true) :
	        op === 'any' ? filter.slice(1).map(compile).join('||') :
	        op === 'all' ? filter.slice(1).map(compile).join('&&') :
	        op === 'none' ? '!(' + filter.slice(1).map(compile).join('||') + ')' :
	        op === 'in' ? compileIn(filter[1], filter.slice(2)) :
	        op === '!in' ? '!(' + compileIn(filter[1], filter.slice(2)) + ')' :
	        'true';
	    return '(' + str + ')';
	}

	function valueExpr(key) {
	    return key === '$type' ? 'f.type' : '(f.properties || {})[' + JSON.stringify(key) + ']';
	}
	function compare(key, val, op, checkType) {
	    var left = valueExpr(key);
	    var right = key === '$type' ? types.indexOf(val) : JSON.stringify(val);
	    return (checkType ? 'typeof ' + left + '=== typeof ' + right + '&&' : '') + left + op + right;
	}
	function compileIn(key, values) {
	    if (key === '$type') values = values.map(function(value) { return types.indexOf(value); });
	    var left = JSON.stringify(values.sort(compareFn));
	    var right = valueExpr(key);

	    if (values.length <= 200) return left + '.indexOf(' + right + ') !== -1';

	    return 'function(v, a, i, j) {' +
	        'while (i <= j) { var m = (i + j) >> 1;' +
	        '    if (a[m] === v) return true; if (a[m] > v) j = m - 1; else i = m + 1;' +
	        '}' +
	    'return false; }(' + right + ', ' + left + ',0,' + (values.length - 1) + ')';
	}

	function compareFn(a, b) {
	    return a < b ? -1 : a > b ? 1 : 0;
	}


/***/ },
/* 105 */
/***/ function(module, exports) {

	'use strict';

	module.exports = ElementGroups;

	function ElementGroups(vertexBuffer, elementBuffer, secondElementBuffer) {

	    this.vertexBuffer = vertexBuffer;
	    this.elementBuffer = elementBuffer;
	    this.secondElementBuffer = secondElementBuffer;
	    this.groups = [];
	}

	ElementGroups.prototype.makeRoomFor = function(numVertices) {
	    if (!this.current || this.current.vertexLength + numVertices > 65535) {
	        this.current = new ElementGroup(this.vertexBuffer.length,
	                this.elementBuffer && this.elementBuffer.length,
	                this.secondElementBuffer && this.secondElementBuffer.length);
	        this.groups.push(this.current);
	    }
	    return this.current;
	};

	function ElementGroup(vertexStartIndex, elementStartIndex, secondElementStartIndex) {
	    // the offset into the vertex buffer of the first vertex in this group
	    this.vertexStartIndex = vertexStartIndex;
	    this.elementStartIndex = elementStartIndex;
	    this.secondElementStartIndex = secondElementStartIndex;
	    this.elementLength = 0;
	    this.vertexLength = 0;
	    this.secondElementLength = 0;
	}


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Bucket = __webpack_require__(103);
	var util = __webpack_require__(11);
	var loadGeometry = __webpack_require__(100);

	module.exports = FillBucket;

	function FillBucket() {
	    Bucket.apply(this, arguments);
	}

	FillBucket.prototype = util.inherit(Bucket, {});

	FillBucket.prototype.shaders = {
	    fill: {
	        vertexBuffer: true,
	        elementBuffer: true,
	        secondElementBuffer: true,
	        secondElementBufferComponents: 2,

	        attributeArgs: ['x', 'y'],

	        attributes: [{
	            name: 'pos',
	            components: 2,
	            type: Bucket.AttributeType.SHORT,
	            value: ['x', 'y']
	        }]
	    }
	};

	FillBucket.prototype.addFeature = function(feature) {
	    var lines = loadGeometry(feature);
	    for (var i = 0; i < lines.length; i++) {
	        this.addFill(lines[i]);
	    }
	};

	FillBucket.prototype.addFill = function(vertices) {
	    if (vertices.length < 3) {
	        //console.warn('a fill must have at least three vertices');
	        return;
	    }

	    // Calculate the total number of vertices we're going to produce so that we
	    // can resize the buffer beforehand, or detect whether the current line
	    // won't fit into the buffer anymore.
	    // In order to be able to use the vertex buffer for drawing the antialiased
	    // outlines, we separate all polygon vertices with a degenerate (out-of-
	    // viewplane) vertex.

	    var len = vertices.length;

	    // Expand this geometry buffer to hold all the required vertices.
	    var group = this.makeRoomFor('fill', len + 1);

	    // We're generating triangle fans, so we always start with the first coordinate in this polygon.
	    var firstIndex, prevIndex;
	    for (var i = 0; i < vertices.length; i++) {
	        var currentVertex = vertices[i];

	        var currentIndex = this.addFillVertex(currentVertex.x, currentVertex.y) - group.vertexStartIndex;
	        group.vertexLength++;
	        if (i === 0) firstIndex = currentIndex;

	        // Only add triangles that have distinct vertices.
	        if (i >= 2 && (currentVertex.x !== vertices[0].x || currentVertex.y !== vertices[0].y)) {
	            this.addFillElement(firstIndex, prevIndex, currentIndex);
	            group.elementLength++;
	        }

	        if (i >= 1) {
	            this.addFillSecondElement(prevIndex, currentIndex);
	            group.secondElementLength++;
	        }

	        prevIndex = currentIndex;
	    }
	};


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Bucket = __webpack_require__(103);
	var util = __webpack_require__(11);
	var loadGeometry = __webpack_require__(100);
	var EXTENT = __webpack_require__(24).EXTENT;

	// NOTE ON EXTRUDE SCALE:
	// scale the extrusion vector so that the normal length is this value.
	// contains the "texture" normals (-1..1). this is distinct from the extrude
	// normals for line joins, because the x-value remains 0 for the texture
	// normal array, while the extrude normal actually moves the vertex to create
	// the acute/bevelled line join.
	var EXTRUDE_SCALE = 63;

	/*
	 * Sharp corners cause dashed lines to tilt because the distance along the line
	 * is the same at both the inner and outer corners. To improve the appearance of
	 * dashed lines we add extra points near sharp corners so that a smaller part
	 * of the line is tilted.
	 *
	 * COS_HALF_SHARP_CORNER controls how sharp a corner has to be for us to add an
	 * extra vertex. The default is 75 degrees.
	 *
	 * The newly created vertices are placed SHARP_CORNER_OFFSET pixels from the corner.
	 */
	var COS_HALF_SHARP_CORNER = Math.cos(75 / 2 * (Math.PI / 180));
	var SHARP_CORNER_OFFSET = 15;

	module.exports = LineBucket;

	function LineBucket() {
	    Bucket.apply(this, arguments);
	}

	LineBucket.prototype = util.inherit(Bucket, {});

	LineBucket.prototype.shaders = {
	    line: {
	        vertexBuffer: true,
	        elementBuffer: true,

	        attributeArgs: ['point', 'extrude', 'tx', 'ty', 'dir', 'linesofar'],

	        attributes: [{
	            name: 'pos',
	            components: 2,
	            type: Bucket.AttributeType.SHORT,
	            value: [
	                '(point.x << 1) | tx',
	                '(point.y << 1) | ty'
	            ]
	        }, {
	            name: 'data',
	            components: 4,
	            type: Bucket.AttributeType.BYTE,
	            value: [
	                'Math.round(' + EXTRUDE_SCALE + ' * extrude.x)',
	                'Math.round(' + EXTRUDE_SCALE + ' * extrude.y)',

	                // Encode the -1/0/1 direction value into .zw coordinates of a_data, which is normally covered
	                // by linesofar, so we need to merge them.
	                // The z component's first bit, as well as the sign bit is reserved for the direction,
	                // so we need to shift the linesofar.
	                '((dir < 0) ? -1 : 1) * ((dir ? 1 : 0) | ((linesofar << 1) & 0x7F))',
	                '(linesofar >> 6) & 0x7F'
	            ]
	        }]
	    }
	};

	LineBucket.prototype.addFeature = function(feature) {
	    var lines = loadGeometry(feature);
	    for (var i = 0; i < lines.length; i++) {
	        this.addLine(
	            lines[i],
	            this.layer.layout['line-join'],
	            this.layer.layout['line-cap'],
	            this.layer.layout['line-miter-limit'],
	            this.layer.layout['line-round-limit']
	        );
	    }
	};

	LineBucket.prototype.addLine = function(vertices, join, cap, miterLimit, roundLimit) {

	    var len = vertices.length;
	    // If the line has duplicate vertices at the end, adjust length to remove them.
	    while (len > 2 && vertices[len - 1].equals(vertices[len - 2])) {
	        len--;
	    }

	    if (vertices.length < 2) {
	        //console.warn('a line must have at least two vertices');
	        return;
	    }

	    if (join === 'bevel') miterLimit = 1.05;

	    var sharpCornerOffset = SHARP_CORNER_OFFSET * (EXTENT / (512 * this.overscaling));

	    var firstVertex = vertices[0],
	        lastVertex = vertices[len - 1],
	        closed = firstVertex.equals(lastVertex);

	    // we could be more precise, but it would only save a negligible amount of space
	    this.makeRoomFor('line', len * 10);

	    if (len === 2 && closed) {
	        // console.warn('a line may not have coincident points');
	        return;
	    }

	    var beginCap = cap,
	        endCap = closed ? 'butt' : cap,
	        flip = 1,
	        distance = 0,
	        startOfLine = true,
	        currentVertex, prevVertex, nextVertex, prevNormal, nextNormal, offsetA, offsetB;

	    // the last three vertices added
	    this.e1 = this.e2 = this.e3 = -1;

	    if (closed) {
	        currentVertex = vertices[len - 2];
	        nextNormal = firstVertex.sub(currentVertex)._unit()._perp();
	    }

	    for (var i = 0; i < len; i++) {

	        nextVertex = closed && i === len - 1 ?
	            vertices[1] : // if the line is closed, we treat the last vertex like the first
	            vertices[i + 1]; // just the next vertex

	        // if two consecutive vertices exist, skip the current one
	        if (nextVertex && vertices[i].equals(nextVertex)) continue;

	        if (nextNormal) prevNormal = nextNormal;
	        if (currentVertex) prevVertex = currentVertex;

	        currentVertex = vertices[i];

	        // Calculate the normal towards the next vertex in this line. In case
	        // there is no next vertex, pretend that the line is continuing straight,
	        // meaning that we are just using the previous normal.
	        nextNormal = nextVertex ? nextVertex.sub(currentVertex)._unit()._perp() : prevNormal;

	        // If we still don't have a previous normal, this is the beginning of a
	        // non-closed line, so we're doing a straight "join".
	        prevNormal = prevNormal || nextNormal;

	        // Determine the normal of the join extrusion. It is the angle bisector
	        // of the segments between the previous line and the next line.
	        var joinNormal = prevNormal.add(nextNormal)._unit();

	        /*  joinNormal     prevNormal
	         *             ↖      ↑
	         *                .________. prevVertex
	         *                |
	         * nextNormal  ←  |  currentVertex
	         *                |
	         *     nextVertex !
	         *
	         */

	        // Calculate the length of the miter (the ratio of the miter to the width).
	        // Find the cosine of the angle between the next and join normals
	        // using dot product. The inverse of that is the miter length.
	        var cosHalfAngle = joinNormal.x * nextNormal.x + joinNormal.y * nextNormal.y;
	        var miterLength = 1 / cosHalfAngle;

	        var isSharpCorner = cosHalfAngle < COS_HALF_SHARP_CORNER && prevVertex && nextVertex;

	        if (isSharpCorner && i > 0) {
	            var prevSegmentLength = currentVertex.dist(prevVertex);
	            if (prevSegmentLength > 2 * sharpCornerOffset) {
	                var newPrevVertex = currentVertex.sub(currentVertex.sub(prevVertex)._mult(sharpCornerOffset / prevSegmentLength)._round());
	                distance += newPrevVertex.dist(prevVertex);
	                this.addCurrentVertex(newPrevVertex, flip, distance, prevNormal.mult(1), 0, 0, false);
	                prevVertex = newPrevVertex;
	            }
	        }

	        // The join if a middle vertex, otherwise the cap.
	        var middleVertex = prevVertex && nextVertex;
	        var currentJoin = middleVertex ? join : nextVertex ? beginCap : endCap;

	        if (middleVertex && currentJoin === 'round') {
	            if (miterLength < roundLimit) {
	                currentJoin = 'miter';
	            } else if (miterLength <= 2) {
	                currentJoin = 'fakeround';
	            }
	        }

	        if (currentJoin === 'miter' && miterLength > miterLimit) {
	            currentJoin = 'bevel';
	        }

	        if (currentJoin === 'bevel') {
	            // The maximum extrude length is 128 / 63 = 2 times the width of the line
	            // so if miterLength >= 2 we need to draw a different type of bevel where.
	            if (miterLength > 2) currentJoin = 'flipbevel';

	            // If the miterLength is really small and the line bevel wouldn't be visible,
	            // just draw a miter join to save a triangle.
	            if (miterLength < miterLimit) currentJoin = 'miter';
	        }

	        // Calculate how far along the line the currentVertex is
	        if (prevVertex) distance += currentVertex.dist(prevVertex);

	        if (currentJoin === 'miter') {

	            joinNormal._mult(miterLength);
	            this.addCurrentVertex(currentVertex, flip, distance, joinNormal, 0, 0, false);

	        } else if (currentJoin === 'flipbevel') {
	            // miter is too big, flip the direction to make a beveled join

	            if (miterLength > 100) {
	                // Almost parallel lines
	                joinNormal = nextNormal.clone();

	            } else {
	                var direction = prevNormal.x * nextNormal.y - prevNormal.y * nextNormal.x > 0 ? -1 : 1;
	                var bevelLength = miterLength * prevNormal.add(nextNormal).mag() / prevNormal.sub(nextNormal).mag();
	                joinNormal._perp()._mult(bevelLength * direction);
	            }
	            this.addCurrentVertex(currentVertex, flip, distance, joinNormal, 0, 0, false);
	            this.addCurrentVertex(currentVertex, -flip, distance, joinNormal, 0, 0, false);

	        } else if (currentJoin === 'bevel' || currentJoin === 'fakeround') {
	            var lineTurnsLeft = flip * (prevNormal.x * nextNormal.y - prevNormal.y * nextNormal.x) > 0;
	            var offset = -Math.sqrt(miterLength * miterLength - 1);
	            if (lineTurnsLeft) {
	                offsetB = 0;
	                offsetA = offset;
	            } else {
	                offsetA = 0;
	                offsetB = offset;
	            }

	            // Close previous segment with a bevel
	            if (!startOfLine) {
	                this.addCurrentVertex(currentVertex, flip, distance, prevNormal, offsetA, offsetB, false);
	            }

	            if (currentJoin === 'fakeround') {
	                // The join angle is sharp enough that a round join would be visible.
	                // Bevel joins fill the gap between segments with a single pie slice triangle.
	                // Create a round join by adding multiple pie slices. The join isn't actually round, but
	                // it looks like it is at the sizes we render lines at.

	                // Add more triangles for sharper angles.
	                // This math is just a good enough approximation. It isn't "correct".
	                var n = Math.floor((0.5 - (cosHalfAngle - 0.5)) * 8);
	                var approxFractionalJoinNormal;

	                for (var m = 0; m < n; m++) {
	                    approxFractionalJoinNormal = nextNormal.mult((m + 1) / (n + 1))._add(prevNormal)._unit();
	                    this.addPieSliceVertex(currentVertex, flip, distance, approxFractionalJoinNormal, lineTurnsLeft);
	                }

	                this.addPieSliceVertex(currentVertex, flip, distance, joinNormal, lineTurnsLeft);

	                for (var k = n - 1; k >= 0; k--) {
	                    approxFractionalJoinNormal = prevNormal.mult((k + 1) / (n + 1))._add(nextNormal)._unit();
	                    this.addPieSliceVertex(currentVertex, flip, distance, approxFractionalJoinNormal, lineTurnsLeft);
	                }
	            }

	            // Start next segment
	            if (nextVertex) {
	                this.addCurrentVertex(currentVertex, flip, distance, nextNormal, -offsetA, -offsetB, false);
	            }

	        } else if (currentJoin === 'butt') {
	            if (!startOfLine) {
	                // Close previous segment with a butt
	                this.addCurrentVertex(currentVertex, flip, distance, prevNormal, 0, 0, false);
	            }

	            // Start next segment with a butt
	            if (nextVertex) {
	                this.addCurrentVertex(currentVertex, flip, distance, nextNormal, 0, 0, false);
	            }

	        } else if (currentJoin === 'square') {

	            if (!startOfLine) {
	                // Close previous segment with a square cap
	                this.addCurrentVertex(currentVertex, flip, distance, prevNormal, 1, 1, false);

	                // The segment is done. Unset vertices to disconnect segments.
	                this.e1 = this.e2 = -1;
	                flip = 1;
	            }

	            // Start next segment
	            if (nextVertex) {
	                this.addCurrentVertex(currentVertex, flip, distance, nextNormal, -1, -1, false);
	            }

	        } else if (currentJoin === 'round') {

	            if (!startOfLine) {
	                // Close previous segment with butt
	                this.addCurrentVertex(currentVertex, flip, distance, prevNormal, 0, 0, false);

	                // Add round cap or linejoin at end of segment
	                this.addCurrentVertex(currentVertex, flip, distance, prevNormal, 1, 1, true);

	                // The segment is done. Unset vertices to disconnect segments.
	                this.e1 = this.e2 = -1;
	                flip = 1;
	            }


	            // Start next segment with a butt
	            if (nextVertex) {
	                // Add round cap before first segment
	                this.addCurrentVertex(currentVertex, flip, distance, nextNormal, -1, -1, true);

	                this.addCurrentVertex(currentVertex, flip, distance, nextNormal, 0, 0, false);
	            }
	        }

	        if (isSharpCorner && i < len - 1) {
	            var nextSegmentLength = currentVertex.dist(nextVertex);
	            if (nextSegmentLength > 2 * sharpCornerOffset) {
	                var newCurrentVertex = currentVertex.add(nextVertex.sub(currentVertex)._mult(sharpCornerOffset / nextSegmentLength)._round());
	                distance += newCurrentVertex.dist(currentVertex);
	                this.addCurrentVertex(newCurrentVertex, flip, distance, nextNormal.mult(1), 0, 0, false);
	                currentVertex = newCurrentVertex;
	            }
	        }

	        startOfLine = false;
	    }

	};

	/**
	 * Add two vertices to the buffers.
	 *
	 * @param {Object} currentVertex the line vertex to add buffer vertices for
	 * @param {number} flip -1 if the vertices should be flipped, 1 otherwise
	 * @param {number} distance the distance from the beginning of the line to the vertex
	 * @param {number} endLeft extrude to shift the left vertex along the line
	 * @param {number} endRight extrude to shift the left vertex along the line
	 * @param {boolean} round whether this is a round cap
	 * @private
	 */
	LineBucket.prototype.addCurrentVertex = function(currentVertex, flip, distance, normal, endLeft, endRight, round) {
	    var tx = round ? 1 : 0;
	    var extrude;
	    var group = this.elementGroups.line.current;
	    group.vertexLength += 2;

	    extrude = normal.mult(flip);
	    if (endLeft) extrude._sub(normal.perp()._mult(endLeft));
	    this.e3 = this.addLineVertex(currentVertex, extrude, tx, 0, endLeft, distance) - group.vertexStartIndex;
	    if (this.e1 >= 0 && this.e2 >= 0) {
	        this.addLineElement(this.e1, this.e2, this.e3);
	        group.elementLength++;
	    }
	    this.e1 = this.e2;
	    this.e2 = this.e3;

	    extrude = normal.mult(-flip);
	    if (endRight) extrude._sub(normal.perp()._mult(endRight));
	    this.e3 = this.addLineVertex(currentVertex, extrude, tx, 1, -endRight, distance) - group.vertexStartIndex;
	    if (this.e1 >= 0 && this.e2 >= 0) {
	        this.addLineElement(this.e1, this.e2, this.e3);
	        group.elementLength++;
	    }
	    this.e1 = this.e2;
	    this.e2 = this.e3;
	};

	/**
	 * Add a single new vertex and a triangle using two previous vertices.
	 * This adds a pie slice triangle near a join to simulate round joins
	 *
	 * @param {Object} currentVertex the line vertex to add buffer vertices for
	 * @param {number} flip -1 if the vertices should be flipped, 1 otherwise
	 * @param {number} distance the distance from the beggining of the line to the vertex
	 * @param {Object} extrude the offset of the new vertex from the currentVertex
	 * @param {boolean} whether the line is turning left or right at this angle
	 * @private
	 */
	LineBucket.prototype.addPieSliceVertex = function(currentVertex, flip, distance, extrude, lineTurnsLeft) {
	    var ty = lineTurnsLeft ? 1 : 0;
	    extrude = extrude.mult(flip * (lineTurnsLeft ? -1 : 1));
	    var group = this.elementGroups.line.current;

	    this.e3 = this.addLineVertex(currentVertex, extrude, 0, ty, 0, distance) - group.vertexStartIndex;
	    group.vertexLength++;

	    if (this.e1 >= 0 && this.e2 >= 0) {
	        this.addLineElement(this.e1, this.e2, this.e3);
	        group.elementLength++;
	    }

	    if (lineTurnsLeft) {
	        this.e2 = this.e3;
	    } else {
	        this.e1 = this.e3;
	    }
	};


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Bucket = __webpack_require__(103);
	var util = __webpack_require__(11);
	var loadGeometry = __webpack_require__(100);
	var EXTENT = __webpack_require__(24).EXTENT;

	module.exports = CircleBucket;

	/**
	 * Circles are represented by two triangles.
	 *
	 * Each corner has a pos that is the center of the circle and an extrusion
	 * vector that is where it points.
	 * @private
	 */
	function CircleBucket() {
	    Bucket.apply(this, arguments);
	}

	CircleBucket.prototype = util.inherit(Bucket, {});

	CircleBucket.prototype.shaders = {
	    circle: {
	        vertexBuffer: true,
	        elementBuffer: true,

	        attributeArgs: ['x', 'y', 'extrudeX', 'extrudeY'],

	        attributes: [{
	            name: 'pos',
	            components: 2,
	            type: Bucket.AttributeType.SHORT,
	            value: [
	                '(x * 2) + ((extrudeX + 1) / 2)',
	                '(y * 2) + ((extrudeY + 1) / 2)'
	            ]
	        }]
	    }
	};

	CircleBucket.prototype.addFeature = function(feature) {

	    var geometries = loadGeometry(feature);
	    for (var j = 0; j < geometries.length; j++) {
	        var geometry = geometries[j];

	        for (var k = 0; k < geometry.length; k++) {
	            var group = this.makeRoomFor('circle', 4);

	            var x = geometry[k].x;
	            var y = geometry[k].y;

	            // Do not include points that are outside the tile boundaries.
	            if (x < 0 || x >= EXTENT || y < 0 || y >= EXTENT) continue;

	            // this geometry will be of the Point type, and we'll derive
	            // two triangles from it.
	            //
	            // ┌─────────┐
	            // │ 3     2 │
	            // │         │
	            // │ 0     1 │
	            // └─────────┘

	            var index = this.addCircleVertex(x, y, -1, -1) - group.vertexStartIndex;
	            this.addCircleVertex(x, y, 1, -1);
	            this.addCircleVertex(x, y, 1, 1);
	            this.addCircleVertex(x, y, -1, 1);
	            group.vertexLength += 4;

	            this.addCircleElement(index, index + 1, index + 2);
	            this.addCircleElement(index, index + 3, index + 2);
	            group.elementLength += 2;
	        }
	    }

	};


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	var Point = __webpack_require__(17);

	var Bucket = __webpack_require__(103);
	var ElementGroups = __webpack_require__(105);
	var Anchor = __webpack_require__(110);
	var getAnchors = __webpack_require__(111);
	var resolveTokens = __webpack_require__(113);
	var Quads = __webpack_require__(114);
	var Shaping = __webpack_require__(115);
	var resolveText = __webpack_require__(116);
	var mergeLines = __webpack_require__(117);
	var shapeText = Shaping.shapeText;
	var shapeIcon = Shaping.shapeIcon;
	var getGlyphQuads = Quads.getGlyphQuads;
	var getIconQuads = Quads.getIconQuads;
	var clipLine = __webpack_require__(118);
	var util = __webpack_require__(11);
	var loadGeometry = __webpack_require__(100);
	var EXTENT = __webpack_require__(24).EXTENT;

	var CollisionFeature = __webpack_require__(119);

	module.exports = SymbolBucket;

	function SymbolBucket(options) {
	    Bucket.apply(this, arguments);
	    this.collisionDebug = options.collisionDebug;
	    this.overscaling = options.overscaling;

	    // To reduce the number of labels that jump around when zooming we need
	    // to use a text-size value that is the same for all zoom levels.
	    // This calculates text-size at a high zoom level so that all tiles can
	    // use the same value when calculating anchor positions.
	    var zoomHistory = { lastIntegerZoom: Infinity, lastIntegerZoomTime: 0, lastZoom: 0 };

	    this.adjustedTextMaxSize = this.layer.getLayoutValue('text-size', 18, zoomHistory);
	    this.adjustedTextSize = this.layer.getLayoutValue('text-size', this.zoom + 1, zoomHistory);

	    this.adjustedIconMaxSize = this.layer.getLayoutValue('icon-size', 18, zoomHistory);
	    this.adjustedIconSize = this.layer.getLayoutValue('icon-size', this.zoom + 1, zoomHistory);
	}

	SymbolBucket.prototype = util.inherit(Bucket, {});

	var shaderAttributeArgs = ['x', 'y', 'ox', 'oy', 'tx', 'ty', 'minzoom', 'maxzoom', 'labelminzoom'];

	var shaderAttributes = [{
	    name: 'pos',
	    components: 2,
	    type: Bucket.AttributeType.SHORT,
	    value: ['x', 'y']
	}, {
	    name: 'offset',
	    components: 2,
	    type: Bucket.AttributeType.SHORT,
	    value: [
	        'Math.round(ox * 64)', // use 1/64 pixels for placement
	        'Math.round(oy * 64)'
	    ]
	}, {
	    name: 'data1',
	    components: 4,
	    type: Bucket.AttributeType.UNSIGNED_BYTE,
	    value: [
	        'tx / 4',                   // tex
	        'ty / 4',                   // tex
	        '(labelminzoom || 0) * 10', // labelminzoom
	        '0'
	    ]
	}, {
	    name: 'data2',
	    components: 2,
	    type: Bucket.AttributeType.UNSIGNED_BYTE,
	    value: [
	        '(minzoom || 0) * 10',             // minzoom
	        'Math.min(maxzoom || 25, 25) * 10' // minzoom
	    ]
	}];

	SymbolBucket.prototype.shaders = {

	    glyph: {
	        vertexBuffer: true,
	        elementBuffer: true,
	        attributeArgs: shaderAttributeArgs,
	        attributes: shaderAttributes
	    },

	    icon: {
	        vertexBuffer: true,
	        elementBuffer: true,
	        attributeArgs: shaderAttributeArgs,
	        attributes: shaderAttributes
	    },

	    collisionBox: {
	        vertexBuffer: true,

	        attributeArgs: ['point', 'extrude', 'maxZoom', 'placementZoom'],

	        attributes: [{
	            name: 'pos',
	            components: 2,
	            type: Bucket.AttributeType.SHORT,
	            value: [ 'point.x', 'point.y' ]
	        }, {
	            name: 'extrude',
	            components: 2,
	            type: Bucket.AttributeType.SHORT,
	            value: [
	                'Math.round(extrude.x)',
	                'Math.round(extrude.y)'
	            ]
	        }, {
	            name: 'data',
	            components: 2,
	            type: Bucket.AttributeType.UNSIGNED_BYTE,
	            value: [
	                'maxZoom * 10',
	                'placementZoom * 10'
	            ]
	        }]
	    }
	};

	SymbolBucket.prototype.addFeatures = function(collisionTile, stacks, icons) {
	    var tileSize = 512 * this.overscaling;
	    this.tilePixelRatio = EXTENT / tileSize;
	    this.compareText = {};
	    this.symbolInstances = [];
	    this.iconsNeedLinear = false;

	    var layout = this.layer.layout;
	    var features = this.features;
	    var textFeatures = this.textFeatures;

	    var horizontalAlign = 0.5,
	        verticalAlign = 0.5;

	    switch (layout['text-anchor']) {
	    case 'right':
	    case 'top-right':
	    case 'bottom-right':
	        horizontalAlign = 1;
	        break;
	    case 'left':
	    case 'top-left':
	    case 'bottom-left':
	        horizontalAlign = 0;
	        break;
	    }

	    switch (layout['text-anchor']) {
	    case 'bottom':
	    case 'bottom-right':
	    case 'bottom-left':
	        verticalAlign = 1;
	        break;
	    case 'top':
	    case 'top-right':
	    case 'top-left':
	        verticalAlign = 0;
	        break;
	    }

	    var justify = layout['text-justify'] === 'right' ? 1 :
	        layout['text-justify'] === 'left' ? 0 :
	        0.5;

	    var oneEm = 24;
	    var lineHeight = layout['text-line-height'] * oneEm;
	    var maxWidth = layout['symbol-placement'] !== 'line' ? layout['text-max-width'] * oneEm : 0;
	    var spacing = layout['text-letter-spacing'] * oneEm;
	    var textOffset = [layout['text-offset'][0] * oneEm, layout['text-offset'][1] * oneEm];
	    var fontstack = layout['text-font'].join(',');

	    var geometries = [];
	    for (var g = 0; g < features.length; g++) {
	        geometries.push(loadGeometry(features[g]));
	    }

	    if (layout['symbol-placement'] === 'line') {
	        // Merge adjacent lines with the same text to improve labelling.
	        // It's better to place labels on one long line than on many short segments.
	        var merged = mergeLines(features, textFeatures, geometries);

	        geometries = merged.geometries;
	        features = merged.features;
	        textFeatures = merged.textFeatures;
	    }

	    var shapedText, shapedIcon;

	    for (var k = 0; k < features.length; k++) {
	        if (!geometries[k]) continue;

	        if (textFeatures[k]) {
	            shapedText = shapeText(textFeatures[k], stacks[fontstack], maxWidth,
	                    lineHeight, horizontalAlign, verticalAlign, justify, spacing, textOffset);
	        } else {
	            shapedText = null;
	        }

	        if (layout['icon-image']) {
	            var iconName = resolveTokens(features[k].properties, layout['icon-image']);
	            var image = icons[iconName];
	            shapedIcon = shapeIcon(image, layout);

	            if (image) {
	                if (this.sdfIcons === undefined) {
	                    this.sdfIcons = image.sdf;
	                } else if (this.sdfIcons !== image.sdf) {
	                    console.warn('Style sheet warning: Cannot mix SDF and non-SDF icons in one buffer');
	                }
	                if (image.pixelRatio !== 1) {
	                    this.iconsNeedLinear = true;
	                }
	            }
	        } else {
	            shapedIcon = null;
	        }

	        if (shapedText || shapedIcon) {
	            this.addFeature(geometries[k], shapedText, shapedIcon);
	        }
	    }

	    this.placeFeatures(collisionTile, this.buffers, this.collisionDebug);
	};

	SymbolBucket.prototype.addFeature = function(lines, shapedText, shapedIcon) {
	    var layout = this.layer.layout;

	    var glyphSize = 24;

	    var fontScale = this.adjustedTextSize / glyphSize,
	        textMaxSize = this.adjustedTextMaxSize !== undefined ? this.adjustedTextMaxSize : this.adjustedTextSize,
	        textBoxScale = this.tilePixelRatio * fontScale,
	        textMaxBoxScale = this.tilePixelRatio * textMaxSize / glyphSize,
	        iconBoxScale = this.tilePixelRatio * this.adjustedIconSize,
	        symbolMinDistance = this.tilePixelRatio * layout['symbol-spacing'],
	        avoidEdges = layout['symbol-avoid-edges'],
	        textPadding = layout['text-padding'] * this.tilePixelRatio,
	        iconPadding = layout['icon-padding'] * this.tilePixelRatio,
	        textMaxAngle = layout['text-max-angle'] / 180 * Math.PI,
	        textAlongLine = layout['text-rotation-alignment'] === 'map' && layout['symbol-placement'] === 'line',
	        iconAlongLine = layout['icon-rotation-alignment'] === 'map' && layout['symbol-placement'] === 'line',
	        mayOverlap = layout['text-allow-overlap'] || layout['icon-allow-overlap'] ||
	            layout['text-ignore-placement'] || layout['icon-ignore-placement'],
	        isLine = layout['symbol-placement'] === 'line',
	        textRepeatDistance = symbolMinDistance / 2;

	    if (isLine) {
	        lines = clipLine(lines, 0, 0, EXTENT, EXTENT);
	    }

	    for (var i = 0; i < lines.length; i++) {
	        var line = lines[i];

	        // Calculate the anchor points around which you want to place labels
	        var anchors;
	        if (isLine) {
	            anchors = getAnchors(
	                line,
	                symbolMinDistance,
	                textMaxAngle,
	                shapedText,
	                shapedIcon,
	                glyphSize,
	                textMaxBoxScale,
	                this.overscaling,
	                EXTENT
	            );
	        } else {
	            anchors = [ new Anchor(line[0].x, line[0].y, 0) ];
	        }

	        // For each potential label, create the placement features used to check for collisions, and the quads use for rendering.
	        for (var j = 0, len = anchors.length; j < len; j++) {
	            var anchor = anchors[j];

	            if (shapedText && isLine) {
	                if (this.anchorIsTooClose(shapedText.text, textRepeatDistance, anchor)) {
	                    continue;
	                }
	            }

	            var inside = !(anchor.x < 0 || anchor.x > EXTENT || anchor.y < 0 || anchor.y > EXTENT);

	            if (avoidEdges && !inside) continue;

	            // Normally symbol layers are drawn across tile boundaries. Only symbols
	            // with their anchors within the tile boundaries are added to the buffers
	            // to prevent symbols from being drawn twice.
	            //
	            // Symbols in layers with overlap are sorted in the y direction so that
	            // symbols lower on the canvas are drawn on top of symbols near the top.
	            // To preserve this order across tile boundaries these symbols can't
	            // be drawn across tile boundaries. Instead they need to be included in
	            // the buffers for both tiles and clipped to tile boundaries at draw time.
	            var addToBuffers = inside || mayOverlap;

	            this.symbolInstances.push(new SymbolInstance(anchor, line, shapedText, shapedIcon, layout, addToBuffers, this.symbolInstances.length,
	                        textBoxScale, textPadding, textAlongLine,
	                        iconBoxScale, iconPadding, iconAlongLine));
	        }
	    }
	};

	SymbolBucket.prototype.anchorIsTooClose = function(text, repeatDistance, anchor) {
	    var compareText = this.compareText;
	    if (!(text in compareText)) {
	        compareText[text] = [];
	    } else {
	        var otherAnchors = compareText[text];
	        for (var k = otherAnchors.length - 1; k >= 0; k--) {
	            if (anchor.dist(otherAnchors[k]) < repeatDistance) {
	                // If it's within repeatDistance of one anchor, stop looking
	                return true;
	            }
	        }
	    }
	    // If anchor is not within repeatDistance of any other anchor, add to array
	    compareText[text].push(anchor);
	    return false;
	};

	SymbolBucket.prototype.placeFeatures = function(collisionTile, buffers, collisionDebug) {
	    // Calculate which labels can be shown and when they can be shown and
	    // create the bufers used for rendering.

	    this.resetBuffers(buffers);

	    var elementGroups = this.elementGroups = {
	        glyph: new ElementGroups(buffers.glyphVertex, buffers.glyphElement),
	        icon: new ElementGroups(buffers.iconVertex, buffers.iconElement),
	        sdfIcons: this.sdfIcons,
	        iconsNeedLinear: this.iconsNeedLinear
	    };

	    var layout = this.layer.layout;
	    var maxScale = collisionTile.maxScale;

	    elementGroups.glyph.adjustedSize = this.adjustedTextSize;
	    elementGroups.icon.adjustedSize = this.adjustedIconSize;

	    // Transfer the name of the fonstack back to the main thread along with the buffers.
	    // The draw function needs to know which fonstack's glyph atlas to bind when rendering.
	    elementGroups.glyph.fontstack = layout['text-font'].join(',');

	    var textAlongLine = layout['text-rotation-alignment'] === 'map' && layout['symbol-placement'] === 'line';
	    var iconAlongLine = layout['icon-rotation-alignment'] === 'map' && layout['symbol-placement'] === 'line';

	    var mayOverlap = layout['text-allow-overlap'] || layout['icon-allow-overlap'] ||
	        layout['text-ignore-placement'] || layout['icon-ignore-placement'];

	    // Sort symbols by their y position on the canvas so that they lower symbols
	    // are drawn on top of higher symbols.
	    // Don't sort symbols that won't overlap because it isn't necessary and
	    // because it causes more labels to pop in and out when rotating.
	    if (mayOverlap) {
	        var angle = collisionTile.angle;
	        var sin = Math.sin(angle),
	            cos = Math.cos(angle);

	        this.symbolInstances.sort(function(a, b) {
	            var aRotated = (sin * a.x + cos * a.y) | 0;
	            var bRotated = (sin * b.x + cos * b.y) | 0;
	            return (aRotated - bRotated) || (b.index - a.index);
	        });
	    }

	    for (var p = 0; p < this.symbolInstances.length; p++) {
	        var symbolInstance = this.symbolInstances[p];
	        var hasText = symbolInstance.hasText;
	        var hasIcon = symbolInstance.hasIcon;

	        var iconWithoutText = layout['text-optional'] || !hasText,
	            textWithoutIcon = layout['icon-optional'] || !hasIcon;


	        // Calculate the scales at which the text and icon can be placed without collision.

	        var glyphScale = hasText ?
	            collisionTile.placeCollisionFeature(symbolInstance.textCollisionFeature,
	                    layout['text-allow-overlap'], layout['symbol-avoid-edges']) :
	            collisionTile.minScale;

	        var iconScale = hasIcon ?
	            collisionTile.placeCollisionFeature(symbolInstance.iconCollisionFeature,
	                    layout['icon-allow-overlap'], layout['symbol-avoid-edges']) :
	            collisionTile.minScale;


	        // Combine the scales for icons and text.

	        if (!iconWithoutText && !textWithoutIcon) {
	            iconScale = glyphScale = Math.max(iconScale, glyphScale);
	        } else if (!textWithoutIcon && glyphScale) {
	            glyphScale = Math.max(iconScale, glyphScale);
	        } else if (!iconWithoutText && iconScale) {
	            iconScale = Math.max(iconScale, glyphScale);
	        }


	        // Insert final placement into collision tree and add glyphs/icons to buffers

	        if (hasText) {
	            if (!layout['text-ignore-placement']) {
	                collisionTile.insertCollisionFeature(symbolInstance.textCollisionFeature, glyphScale);
	            }
	            if (glyphScale <= maxScale) {
	                this.addSymbols('glyph', symbolInstance.glyphQuads, glyphScale, layout['text-keep-upright'], textAlongLine, collisionTile.angle);
	            }
	        }

	        if (hasIcon) {
	            if (!layout['icon-ignore-placement']) {
	                collisionTile.insertCollisionFeature(symbolInstance.iconCollisionFeature, iconScale);
	            }
	            if (iconScale <= maxScale) {
	                this.addSymbols('icon', symbolInstance.iconQuads, iconScale, layout['icon-keep-upright'], iconAlongLine, collisionTile.angle);
	            }
	        }

	    }

	    if (collisionDebug) this.addToDebugBuffers(collisionTile);
	};

	SymbolBucket.prototype.addSymbols = function(shaderName, quads, scale, keepUpright, alongLine, placementAngle) {

	    var group = this.makeRoomFor(shaderName, 4 * quads.length);

	    // TODO manual curry
	    var addElement = this[this.getAddMethodName(shaderName, 'element')].bind(this);
	    var addVertex = this[this.getAddMethodName(shaderName, 'vertex')].bind(this);

	    var zoom = this.zoom;
	    var placementZoom = Math.max(Math.log(scale) / Math.LN2 + zoom, 0);

	    for (var k = 0; k < quads.length; k++) {

	        var symbol = quads[k],
	            angle = symbol.angle;

	        // drop upside down versions of glyphs
	        var a = (angle + placementAngle + Math.PI) % (Math.PI * 2);
	        if (keepUpright && alongLine && (a <= Math.PI / 2 || a > Math.PI * 3 / 2)) continue;

	        var tl = symbol.tl,
	            tr = symbol.tr,
	            bl = symbol.bl,
	            br = symbol.br,
	            tex = symbol.tex,
	            anchorPoint = symbol.anchorPoint,

	            minZoom = Math.max(zoom + Math.log(symbol.minScale) / Math.LN2, placementZoom),
	            maxZoom = Math.min(zoom + Math.log(symbol.maxScale) / Math.LN2, 25);

	        if (maxZoom <= minZoom) continue;

	        // Lower min zoom so that while fading out the label it can be shown outside of collision-free zoom levels
	        if (minZoom === placementZoom) minZoom = 0;

	        var index = addVertex(anchorPoint.x, anchorPoint.y, tl.x, tl.y, tex.x, tex.y, minZoom, maxZoom, placementZoom) - group.vertexStartIndex;
	        addVertex(anchorPoint.x, anchorPoint.y, tr.x, tr.y, tex.x + tex.w, tex.y, minZoom, maxZoom, placementZoom);
	        addVertex(anchorPoint.x, anchorPoint.y, bl.x, bl.y, tex.x, tex.y + tex.h, minZoom, maxZoom, placementZoom);
	        addVertex(anchorPoint.x, anchorPoint.y, br.x, br.y, tex.x + tex.w, tex.y + tex.h, minZoom, maxZoom, placementZoom);
	        group.vertexLength += 4;

	        addElement(index, index + 1, index + 2);
	        addElement(index + 1, index + 2, index + 3);
	        group.elementLength += 2;
	    }

	};

	SymbolBucket.prototype.updateIcons = function(icons) {
	    var iconValue = this.layer.layout['icon-image'];
	    if (!iconValue) return;

	    for (var i = 0; i < this.features.length; i++) {
	        var iconName = resolveTokens(this.features[i].properties, iconValue);
	        if (iconName)
	            icons[iconName] = true;
	    }
	};

	SymbolBucket.prototype.updateFont = function(stacks) {
	    var fontName = this.layer.layout['text-font'],
	        stack = stacks[fontName] = stacks[fontName] || {};

	    this.textFeatures = resolveText(this.features, this.layer.layout, stack);
	};

	SymbolBucket.prototype.addToDebugBuffers = function(collisionTile) {
	    this.elementGroups.collisionBox = new ElementGroups(this.buffers.collisionBoxVertex);
	    var group = this.makeRoomFor('collisionBox', 0);
	    var angle = -collisionTile.angle;
	    var yStretch = collisionTile.yStretch;

	    for (var j = 0; j < this.symbolInstances.length; j++) {
	        for (var i = 0; i < 2; i++) {
	            var feature = this.symbolInstances[j][i === 0 ? 'textCollisionFeature' : 'iconCollisionFeature'];
	            if (!feature) continue;
	            var boxes = feature.boxes;

	            for (var b = 0; b < boxes.length; b++) {
	                var box = boxes[b];
	                var anchorPoint = box.anchorPoint;

	                var tl = new Point(box.x1, box.y1 * yStretch)._rotate(angle);
	                var tr = new Point(box.x2, box.y1 * yStretch)._rotate(angle);
	                var bl = new Point(box.x1, box.y2 * yStretch)._rotate(angle);
	                var br = new Point(box.x2, box.y2 * yStretch)._rotate(angle);

	                var maxZoom = Math.max(0, Math.min(25, this.zoom + Math.log(box.maxScale) / Math.LN2));
	                var placementZoom = Math.max(0, Math.min(25, this.zoom + Math.log(box.placementScale) / Math.LN2));

	                this.addCollisionBoxVertex(anchorPoint, tl, maxZoom, placementZoom);
	                this.addCollisionBoxVertex(anchorPoint, tr, maxZoom, placementZoom);
	                this.addCollisionBoxVertex(anchorPoint, tr, maxZoom, placementZoom);
	                this.addCollisionBoxVertex(anchorPoint, br, maxZoom, placementZoom);
	                this.addCollisionBoxVertex(anchorPoint, br, maxZoom, placementZoom);
	                this.addCollisionBoxVertex(anchorPoint, bl, maxZoom, placementZoom);
	                this.addCollisionBoxVertex(anchorPoint, bl, maxZoom, placementZoom);
	                this.addCollisionBoxVertex(anchorPoint, tl, maxZoom, placementZoom);
	                group.vertexLength += 8;
	            }
	        }
	    }
	};

	function SymbolInstance(anchor, line, shapedText, shapedIcon, layout, addToBuffers, index,
	                        textBoxScale, textPadding, textAlongLine,
	                        iconBoxScale, iconPadding, iconAlongLine) {

	    this.x = anchor.x;
	    this.y = anchor.y;
	    this.index = index;
	    this.hasText = !!shapedText;
	    this.hasIcon = !!shapedIcon;

	    if (this.hasText) {
	        this.glyphQuads = addToBuffers ? getGlyphQuads(anchor, shapedText, textBoxScale, line, layout, textAlongLine) : [];
	        this.textCollisionFeature = new CollisionFeature(line, anchor, shapedText, textBoxScale, textPadding, textAlongLine, false);
	    }

	    if (this.hasIcon) {
	        this.iconQuads = addToBuffers ? getIconQuads(anchor, shapedIcon, iconBoxScale, line, layout, iconAlongLine) : [];
	        this.iconCollisionFeature = new CollisionFeature(line, anchor, shapedIcon, iconBoxScale, iconPadding, iconAlongLine, true);
	    }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Point = __webpack_require__(17);

	module.exports = Anchor;

	function Anchor(x, y, angle, segment) {
	    this.x = x;
	    this.y = y;
	    this.angle = angle;

	    if (segment !== undefined) {
	        this.segment = segment;
	    }
	}

	Anchor.prototype = Object.create(Point.prototype);

	Anchor.prototype.clone = function() {
	    return new Anchor(this.x, this.y, this.angle, this.segment);
	};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var interpolate = __webpack_require__(38);
	var Anchor = __webpack_require__(110);
	var checkMaxAngle = __webpack_require__(112);

	module.exports = getAnchors;

	function getAnchors(line, spacing, maxAngle, shapedText, shapedIcon, glyphSize, boxScale, overscaling, tileExtent) {

	    // Resample a line to get anchor points for labels and check that each
	    // potential label passes text-max-angle check and has enough froom to fit
	    // on the line.

	    var angleWindowSize = shapedText ?
	        3 / 5 * glyphSize * boxScale :
	        0;

	    var labelLength = Math.max(
	        shapedText ? shapedText.right - shapedText.left : 0,
	        shapedIcon ? shapedIcon.right - shapedIcon.left : 0);

	    // Is the line continued from outside the tile boundary?
	    var isLineContinued = line[0].x === 0 || line[0].x === tileExtent || line[0].y === 0 || line[0].y === tileExtent;

	    // Is the label long, relative to the spacing?
	    // If so, adjust the spacing so there is always a minimum space of `spacing / 4` between label edges.
	    if (spacing - labelLength * boxScale  < spacing / 4) {
	        spacing = labelLength * boxScale + spacing / 4;
	    }

	    // Offset the first anchor by:
	    // Either half the label length plus a fixed extra offset if the line is not continued
	    // Or half the spacing if the line is continued.

	    // For non-continued lines, add a bit of fixed extra offset to avoid collisions at T intersections.
	    var fixedExtraOffset = glyphSize * 2;

	    var offset = !isLineContinued ?
	        ((labelLength / 2 + fixedExtraOffset) * boxScale * overscaling) % spacing :
	        (spacing / 2 * overscaling) % spacing;

	    return resample(line, offset, spacing, angleWindowSize, maxAngle, labelLength * boxScale, isLineContinued, false, tileExtent);
	}


	function resample(line, offset, spacing, angleWindowSize, maxAngle, labelLength, isLineContinued, placeAtMiddle, tileExtent) {

	    var halfLabelLength = labelLength / 2;
	    var lineLength = 0;
	    for (var k = 0; k < line.length - 1; k++) {
	        lineLength += line[k].dist(line[k + 1]);
	    }

	    var distance = 0,
	        markedDistance = offset - spacing;

	    var anchors = [];

	    for (var i = 0; i < line.length - 1; i++) {

	        var a = line[i],
	            b = line[i + 1];

	        var segmentDist = a.dist(b),
	            angle = b.angleTo(a);

	        while (markedDistance + spacing < distance + segmentDist) {
	            markedDistance += spacing;

	            var t = (markedDistance - distance) / segmentDist,
	                x = interpolate(a.x, b.x, t),
	                y = interpolate(a.y, b.y, t);

	            // Check that the point is within the tile boundaries and that
	            // the label would fit before the beginning and end of the line
	            // if placed at this point.
	            if (x >= 0 && x < tileExtent && y >= 0 && y < tileExtent &&
	                    markedDistance - halfLabelLength >= 0 &&
	                    markedDistance + halfLabelLength <= lineLength) {
	                var anchor = new Anchor(x, y, angle, i)._round();

	                if (!angleWindowSize || checkMaxAngle(line, anchor, labelLength, angleWindowSize, maxAngle)) {
	                    anchors.push(anchor);
	                }
	            }
	        }

	        distance += segmentDist;
	    }

	    if (!placeAtMiddle && !anchors.length && !isLineContinued) {
	        // The first attempt at finding anchors at which labels can be placed failed.
	        // Try again, but this time just try placing one anchor at the middle of the line.
	        // This has the most effect for short lines in overscaled tiles, since the
	        // initial offset used in overscaled tiles is calculated to align labels with positions in
	        // parent tiles instead of placing the label as close to the beginning as possible.
	        anchors = resample(line, distance / 2, spacing, angleWindowSize, maxAngle, labelLength, isLineContinued, true, tileExtent);
	    }

	    return anchors;
	}


/***/ },
/* 112 */
/***/ function(module, exports) {

	'use strict';

	module.exports = checkMaxAngle;

	/**
	 * Labels placed around really sharp angles aren't readable. Check if any
	 * part of the potential label has a combined angle that is too big.
	 *
	 * @param {Array<Point>} line
	 * @param {Anchor} anchor The point on the line around which the label is anchored.
	 * @param {number} labelLength The length of the label in geometry units.
	 * @param {number} windowSize The check fails if the combined angles within a part of the line that is `windowSize` long is too big.
	 * @param {number} maxAngle The maximum combined angle that any window along the label is allowed to have.
	 *
	 * @returns {boolean} whether the label should be placed
	 * @private
	 */
	function checkMaxAngle(line, anchor, labelLength, windowSize, maxAngle) {

	    // horizontal labels always pass
	    if (anchor.segment === undefined) return true;

	    var p = anchor;
	    var index = anchor.segment + 1;
	    var anchorDistance = 0;

	    // move backwards along the line to the first segment the label appears on
	    while (anchorDistance > -labelLength / 2) {
	        index--;

	        // there isn't enough room for the label after the beginning of the line
	        if (index < 0) return false;

	        anchorDistance -= line[index].dist(p);
	        p = line[index];
	    }

	    anchorDistance += line[index].dist(line[index + 1]);
	    index++;

	    // store recent corners and their total angle difference
	    var recentCorners = [];
	    var recentAngleDelta = 0;

	    // move forwards by the length of the label and check angles along the way
	    while (anchorDistance < labelLength / 2) {
	        var prev = line[index - 1];
	        var current = line[index];
	        var next = line[index + 1];

	        // there isn't enough room for the label before the end of the line
	        if (!next) return false;

	        var angleDelta = prev.angleTo(current) - current.angleTo(next);
	        // restrict angle to -pi..pi range
	        angleDelta = Math.abs(((angleDelta + 3 * Math.PI) % (Math.PI * 2)) - Math.PI);

	        recentCorners.push({
	            distance: anchorDistance,
	            angleDelta: angleDelta
	        });
	        recentAngleDelta += angleDelta;

	        // remove corners that are far enough away from the list of recent anchors
	        while (anchorDistance - recentCorners[0].distance > windowSize) {
	            recentAngleDelta -= recentCorners.shift().angleDelta;
	        }

	        // the sum of angles within the window area exceeds the maximum allowed value. check fails.
	        if (recentAngleDelta > maxAngle) return false;

	        index++;
	        anchorDistance += current.dist(next);
	    }

	    // no part of the line had an angle greater than the maximum allowed. check passes.
	    return true;
	}


/***/ },
/* 113 */
/***/ function(module, exports) {

	'use strict';

	module.exports = resolveTokens;

	/**
	 * Replace tokens in a string template with values in an object
	 *
	 * @param {Object} properties a key/value relationship between tokens and replacements
	 * @param {string} text the template string
	 * @returns {string} the template with tokens replaced
	 * @private
	 */
	function resolveTokens(properties, text) {
	    return text.replace(/{([^{}()\[\]<>$=:;.,^]+)}/g, function(match, key) {
	        return key in properties ? properties[key] : '';
	    });
	}


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Point = __webpack_require__(17);

	module.exports = {
	    getIconQuads: getIconQuads,
	    getGlyphQuads: getGlyphQuads
	};

	var minScale = 0.5; // underscale by 1 zoom level

	/**
	 * A textured quad for rendering a single icon or glyph.
	 *
	 * The zoom range the glyph can be shown is defined by minScale and maxScale.
	 *
	 * @param {Point} anchorPoint the point the symbol is anchored around
	 * @param {Point} tl The offset of the top left corner from the anchor.
	 * @param {Point} tr The offset of the top right corner from the anchor.
	 * @param {Point} bl The offset of the bottom left corner from the anchor.
	 * @param {Point} br The offset of the bottom right corner from the anchor.
	 * @param {Object} tex The texture coordinates.
	 * @param {number} angle The angle of the label at it's center, not the angle of this quad.
	 * @param {number} minScale The minimum scale, relative to the tile's intended scale, that the glyph can be shown at.
	 * @param {number} maxScale The maximum scale, relative to the tile's intended scale, that the glyph can be shown at.
	 *
	 * @class SymbolQuad
	 * @private
	 */
	function SymbolQuad(anchorPoint, tl, tr, bl, br, tex, angle, minScale, maxScale) {
	    this.anchorPoint = anchorPoint;
	    this.tl = tl;
	    this.tr = tr;
	    this.bl = bl;
	    this.br = br;
	    this.tex = tex;
	    this.angle = angle;
	    this.minScale = minScale;
	    this.maxScale = maxScale;
	}

	/**
	 * Create the quads used for rendering an icon.
	 *
	 * @param {Anchor} anchor
	 * @param {PositionedIcon} shapedIcon
	 * @param {number} boxScale A magic number for converting glyph metric units to geometry units.
	 * @param {Array<Array<Point>>} line
	 * @param {LayoutProperties} layout
	 * @param {boolean} alongLine Whether the icon should be placed along the line.
	 * @returns {Array<SymbolQuad>}
	 * @private
	 */
	function getIconQuads(anchor, shapedIcon, boxScale, line, layout, alongLine) {

	    var rect = shapedIcon.image.rect;

	    var border = 1;
	    var left = shapedIcon.left - border;
	    var right = left + rect.w / shapedIcon.image.pixelRatio;
	    var top = shapedIcon.top - border;
	    var bottom = top + rect.h / shapedIcon.image.pixelRatio;
	    var tl = new Point(left, top);
	    var tr = new Point(right, top);
	    var br = new Point(right, bottom);
	    var bl = new Point(left, bottom);

	    var angle = layout['icon-rotate'] * Math.PI / 180;
	    if (alongLine) {
	        var prev = line[anchor.segment];
	        if (anchor.y === prev.y && anchor.x === prev.x && anchor.segment + 1 < line.length) {
	            var next = line[anchor.segment + 1];
	            angle += Math.atan2(anchor.y - next.y, anchor.x - next.x) + Math.PI;
	        } else {
	            angle += Math.atan2(anchor.y - prev.y, anchor.x - prev.x);
	        }
	    }

	    if (angle) {
	        var sin = Math.sin(angle),
	            cos = Math.cos(angle),
	            matrix = [cos, -sin, sin, cos];

	        tl = tl.matMult(matrix);
	        tr = tr.matMult(matrix);
	        bl = bl.matMult(matrix);
	        br = br.matMult(matrix);
	    }

	    return [new SymbolQuad(new Point(anchor.x, anchor.y), tl, tr, bl, br, shapedIcon.image.rect, 0, minScale, Infinity)];
	}

	/**
	 * Create the quads used for rendering a text label.
	 *
	 * @param {Anchor} anchor
	 * @param {Shaping} shaping
	 * @param {number} boxScale A magic number for converting from glyph metric units to geometry units.
	 * @param {Array<Array<Point>>} line
	 * @param {LayoutProperties} layout
	 * @param {boolean} alongLine Whether the label should be placed along the line.
	 * @returns {Array<SymbolQuad>}
	 * @private
	 */
	function getGlyphQuads(anchor, shaping, boxScale, line, layout, alongLine) {

	    var textRotate = layout['text-rotate'] * Math.PI / 180;
	    var keepUpright = layout['text-keep-upright'];

	    var positionedGlyphs = shaping.positionedGlyphs;
	    var quads = [];

	    for (var k = 0; k < positionedGlyphs.length; k++) {
	        var positionedGlyph = positionedGlyphs[k];
	        var glyph = positionedGlyph.glyph;
	        var rect = glyph.rect;

	        if (!rect) continue;

	        var centerX = (positionedGlyph.x + glyph.advance / 2) * boxScale;

	        var glyphInstances;
	        var labelMinScale = minScale;
	        if (alongLine) {
	            glyphInstances = [];
	            labelMinScale = getSegmentGlyphs(glyphInstances, anchor, centerX, line, anchor.segment, true);
	            if (keepUpright) {
	                labelMinScale = Math.min(labelMinScale, getSegmentGlyphs(glyphInstances, anchor, centerX, line, anchor.segment, false));
	            }

	        } else {
	            glyphInstances = [{
	                anchorPoint: new Point(anchor.x, anchor.y),
	                offset: 0,
	                angle: 0,
	                maxScale: Infinity,
	                minScale: minScale
	            }];
	        }

	        var x1 = positionedGlyph.x + glyph.left,
	            y1 = positionedGlyph.y - glyph.top,
	            x2 = x1 + rect.w,
	            y2 = y1 + rect.h,

	            otl = new Point(x1, y1),
	            otr = new Point(x2, y1),
	            obl = new Point(x1, y2),
	            obr = new Point(x2, y2);

	        for (var i = 0; i < glyphInstances.length; i++) {

	            var instance = glyphInstances[i],
	                tl = otl,
	                tr = otr,
	                bl = obl,
	                br = obr,
	                angle = instance.angle + textRotate;

	            if (angle) {
	                var sin = Math.sin(angle),
	                    cos = Math.cos(angle),
	                    matrix = [cos, -sin, sin, cos];

	                tl = tl.matMult(matrix);
	                tr = tr.matMult(matrix);
	                bl = bl.matMult(matrix);
	                br = br.matMult(matrix);
	            }

	            // Prevent label from extending past the end of the line
	            var glyphMinScale = Math.max(instance.minScale, labelMinScale);

	            var glyphAngle = (anchor.angle + textRotate + instance.offset + 2 * Math.PI) % (2 * Math.PI);
	            quads.push(new SymbolQuad(instance.anchorPoint, tl, tr, bl, br, rect, glyphAngle, glyphMinScale, instance.maxScale));

	        }
	    }

	    return quads;
	}

	/**
	 * We can only render glyph quads that slide along a straight line. To draw
	 * curved lines we need an instance of a glyph for each segment it appears on.
	 * This creates all the instances of a glyph that are necessary to render a label.
	 *
	 * We need a
	 * @param {Array<Object>} glyphInstances An empty array that glyphInstances are added to.
	 * @param {Anchor} anchor
	 * @param {number} offset The glyph's offset from the center of the label.
	 * @param {Array<Point>} line
	 * @param {number} segment The index of the segment of the line on which the anchor exists.
	 * @param {boolean} forward If true get the glyphs that come later on the line, otherwise get the glyphs that come earlier.
	 *
	 * @returns {Array<Object>} glyphInstances
	 * @private
	 */
	function getSegmentGlyphs(glyphs, anchor, offset, line, segment, forward) {
	    var upsideDown = !forward;

	    if (offset < 0) forward = !forward;

	    if (forward) segment++;

	    var newAnchorPoint = new Point(anchor.x, anchor.y);
	    var end = line[segment];
	    var prevScale = Infinity;

	    offset = Math.abs(offset);

	    var placementScale = minScale;

	    while (true) {
	        var distance = newAnchorPoint.dist(end);
	        var scale = offset / distance;

	        // Get the angle of the line segment
	        var angle = Math.atan2(end.y - newAnchorPoint.y, end.x - newAnchorPoint.x);
	        if (!forward) angle += Math.PI;
	        if (upsideDown) angle += Math.PI;

	        glyphs.push({
	            anchorPoint: newAnchorPoint,
	            offset: upsideDown ? Math.PI : 0,
	            minScale: scale,
	            maxScale: prevScale,
	            angle: (angle + 2 * Math.PI) % (2 * Math.PI)
	        });

	        if (scale <= placementScale) break;

	        newAnchorPoint = end;

	        // skip duplicate nodes
	        while (newAnchorPoint.equals(end)) {
	            segment += forward ? 1 : -1;
	            end = line[segment];
	            if (!end) {
	                return scale;
	            }
	        }

	        var unit = end.sub(newAnchorPoint)._unit();
	        newAnchorPoint = newAnchorPoint.sub(unit._mult(distance));

	        prevScale = scale;
	    }

	    return placementScale;
	}


/***/ },
/* 115 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    shapeText: shapeText,
	    shapeIcon: shapeIcon
	};


	// The position of a glyph relative to the text's anchor point.
	function PositionedGlyph(codePoint, x, y, glyph) {
	    this.codePoint = codePoint;
	    this.x = x;
	    this.y = y;
	    this.glyph = glyph;
	}

	// A collection of positioned glyphs and some metadata
	function Shaping(positionedGlyphs, text, top, bottom, left, right) {
	    this.positionedGlyphs = positionedGlyphs;
	    this.text = text;
	    this.top = top;
	    this.bottom = bottom;
	    this.left = left;
	    this.right = right;
	}

	function shapeText(text, glyphs, maxWidth, lineHeight, horizontalAlign, verticalAlign, justify, spacing, translate) {

	    var positionedGlyphs = [];
	    var shaping = new Shaping(positionedGlyphs, text, translate[1], translate[1], translate[0], translate[0]);

	    // the y offset *should* be part of the font metadata
	    var yOffset = -17;

	    var x = 0;
	    var y = yOffset;

	    for (var i = 0; i < text.length; i++) {
	        var codePoint = text.charCodeAt(i);
	        var glyph = glyphs[codePoint];

	        if (!glyph) continue;

	        positionedGlyphs.push(new PositionedGlyph(codePoint, x, y, glyph));
	        x += glyph.advance + spacing;
	    }

	    if (!positionedGlyphs.length) return false;

	    linewrap(shaping, glyphs, lineHeight, maxWidth, horizontalAlign, verticalAlign, justify, translate);

	    return shaping;
	}

	var invisible = {
	    0x20:   true, // space
	    0x200b: true  // zero-width space
	};

	var breakable = {
	    0x20:   true, // space
	    0x26:   true, // ampersand
	    0x2b:   true, // plus sign
	    0x2d:   true, // hyphen-minus
	    0x2f:   true, // solidus
	    0xad:   true, // soft hyphen
	    0xb7:   true, // middle dot
	    0x200b: true, // zero-width space
	    0x2010: true, // hyphen
	    0x2013: true  // en dash
	};

	function linewrap(shaping, glyphs, lineHeight, maxWidth, horizontalAlign, verticalAlign, justify, translate) {
	    var lastSafeBreak = null;

	    var lengthBeforeCurrentLine = 0;
	    var lineStartIndex = 0;
	    var line = 0;

	    var maxLineLength = 0;

	    var positionedGlyphs = shaping.positionedGlyphs;

	    if (maxWidth) {
	        for (var i = 0; i < positionedGlyphs.length; i++) {
	            var positionedGlyph = positionedGlyphs[i];

	            positionedGlyph.x -= lengthBeforeCurrentLine;
	            positionedGlyph.y += lineHeight * line;

	            if (positionedGlyph.x > maxWidth && lastSafeBreak !== null) {

	                var lineLength = positionedGlyphs[lastSafeBreak + 1].x;
	                maxLineLength = Math.max(lineLength, maxLineLength);

	                for (var k = lastSafeBreak + 1; k <= i; k++) {
	                    positionedGlyphs[k].y += lineHeight;
	                    positionedGlyphs[k].x -= lineLength;
	                }

	                if (justify) {
	                    // Collapse invisible characters.
	                    var lineEnd = lastSafeBreak;
	                    if (invisible[positionedGlyphs[lastSafeBreak].codePoint]) {
	                        lineEnd--;
	                    }

	                    justifyLine(positionedGlyphs, glyphs, lineStartIndex, lineEnd, justify);
	                }

	                lineStartIndex = lastSafeBreak + 1;
	                lastSafeBreak = null;
	                lengthBeforeCurrentLine += lineLength;
	                line++;
	            }

	            if (breakable[positionedGlyph.codePoint]) {
	                lastSafeBreak = i;
	            }
	        }
	    }

	    var lastPositionedGlyph = positionedGlyphs[positionedGlyphs.length - 1];
	    var lastLineLength = lastPositionedGlyph.x + glyphs[lastPositionedGlyph.codePoint].advance;
	    maxLineLength = Math.max(maxLineLength, lastLineLength);

	    var height = (line + 1) * lineHeight;

	    justifyLine(positionedGlyphs, glyphs, lineStartIndex, positionedGlyphs.length - 1, justify);
	    align(positionedGlyphs, justify, horizontalAlign, verticalAlign, maxLineLength, lineHeight, line, translate);

	    // Calculate the bounding box
	    shaping.top += -verticalAlign * height;
	    shaping.bottom = shaping.top + height;
	    shaping.left += -horizontalAlign * maxLineLength;
	    shaping.right = shaping.left + maxLineLength;
	}

	function justifyLine(positionedGlyphs, glyphs, start, end, justify) {
	    var lastAdvance = glyphs[positionedGlyphs[end].codePoint].advance;
	    var lineIndent = (positionedGlyphs[end].x + lastAdvance) * justify;

	    for (var j = start; j <= end; j++) {
	        positionedGlyphs[j].x -= lineIndent;
	    }

	}

	function align(positionedGlyphs, justify, horizontalAlign, verticalAlign, maxLineLength, lineHeight, line, translate) {
	    var shiftX = (justify - horizontalAlign) * maxLineLength + translate[0];
	    var shiftY = (-verticalAlign * (line + 1) + 0.5) * lineHeight + translate[1];

	    for (var j = 0; j < positionedGlyphs.length; j++) {
	        positionedGlyphs[j].x += shiftX;
	        positionedGlyphs[j].y += shiftY;
	    }
	}


	function shapeIcon(image, layout) {
	    if (!image || !image.rect) return null;

	    var dx = layout['icon-offset'][0];
	    var dy = layout['icon-offset'][1];
	    var x1 = dx - image.width / 2;
	    var x2 = x1 + image.width;
	    var y1 = dy - image.height / 2;
	    var y2 = y1 + image.height;

	    return new PositionedIcon(image, y1, y2, x1, x2);
	}

	function PositionedIcon(image, top, bottom, left, right) {
	    this.image = image;
	    this.top = top;
	    this.bottom = bottom;
	    this.left = left;
	    this.right = right;
	}


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var resolveTokens = __webpack_require__(113);

	module.exports = resolveText;

	/**
	 * For an array of features determine what glyphs need to be loaded
	 * and apply any text preprocessing. The remaining users of text should
	 * use the `textFeatures` key returned by this function rather than accessing
	 * feature text directly.
	 * @private
	 */
	function resolveText(features, layoutProperties, codepoints) {
	    var textFeatures = [];

	    for (var i = 0, fl = features.length; i < fl; i++) {
	        var text = resolveTokens(features[i].properties, layoutProperties['text-field']);
	        if (!text) {
	            textFeatures[i] = null;
	            continue;
	        }
	        text = text.toString();

	        var transform = layoutProperties['text-transform'];
	        if (transform === 'uppercase') {
	            text = text.toLocaleUpperCase();
	        } else if (transform === 'lowercase') {
	            text = text.toLocaleLowerCase();
	        }

	        for (var j = 0; j < text.length; j++) {
	            codepoints[text.charCodeAt(j)] = true;
	        }

	        // Track indexes of features with text.
	        textFeatures[i] = text;
	    }

	    return textFeatures;
	}


/***/ },
/* 117 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (features, textFeatures, geometries) {

	    var leftIndex = {},
	        rightIndex = {},
	        mergedFeatures = [],
	        mergedGeom = [],
	        mergedTexts = [],
	        mergedIndex = 0,
	        k;

	    function add(k) {
	        mergedFeatures.push(features[k]);
	        mergedGeom.push(geometries[k]);
	        mergedTexts.push(textFeatures[k]);
	        mergedIndex++;
	    }

	    function mergeFromRight(leftKey, rightKey, geom) {
	        var i = rightIndex[leftKey];
	        delete rightIndex[leftKey];
	        rightIndex[rightKey] = i;

	        mergedGeom[i][0].pop();
	        mergedGeom[i][0] = mergedGeom[i][0].concat(geom[0]);
	        return i;
	    }

	    function mergeFromLeft(leftKey, rightKey, geom) {
	        var i = leftIndex[rightKey];
	        delete leftIndex[rightKey];
	        leftIndex[leftKey] = i;

	        mergedGeom[i][0].shift();
	        mergedGeom[i][0] = geom[0].concat(mergedGeom[i][0]);
	        return i;
	    }

	    function getKey(text, geom, onRight) {
	        var point = onRight ? geom[0][geom[0].length - 1] : geom[0][0];
	        return text + ':' + point.x + ':' + point.y;
	    }

	    for (k = 0; k < features.length; k++) {
	        var geom = geometries[k],
	            text = textFeatures[k];

	        if (!text) {
	            add(k);
	            continue;
	        }

	        var leftKey = getKey(text, geom),
	            rightKey = getKey(text, geom, true);

	        if ((leftKey in rightIndex) && (rightKey in leftIndex) && (rightIndex[leftKey] !== leftIndex[rightKey])) {
	            // found lines with the same text adjacent to both ends of the current line, merge all three
	            var j = mergeFromLeft(leftKey, rightKey, geom);
	            var i = mergeFromRight(leftKey, rightKey, mergedGeom[j]);

	            delete leftIndex[leftKey];
	            delete rightIndex[rightKey];

	            rightIndex[getKey(text, mergedGeom[i], true)] = i;
	            mergedGeom[j] = null;

	        } else if (leftKey in rightIndex) {
	            // found mergeable line adjacent to the start of the current line, merge
	            mergeFromRight(leftKey, rightKey, geom);

	        } else if (rightKey in leftIndex) {
	            // found mergeable line adjacent to the end of the current line, merge
	            mergeFromLeft(leftKey, rightKey, geom);

	        } else {
	            // no adjacent lines, add as a new item
	            add(k);
	            leftIndex[leftKey] = mergedIndex - 1;
	            rightIndex[rightKey] = mergedIndex - 1;
	        }
	    }

	    return {
	        features: mergedFeatures,
	        textFeatures: mergedTexts,
	        geometries: mergedGeom
	    };
	};


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Point = __webpack_require__(17);

	module.exports = clipLine;

	/**
	 * Returns the part of a multiline that intersects with the provided rectangular box.
	 *
	 * @param {Array<Array<Point>>} lines
	 * @param {number} x1 the left edge of the box
	 * @param {number} y1 the top edge of the box
	 * @param {number} x2 the right edge of the box
	 * @param {number} y2 the bottom edge of the box
	 * @returns {Array<Array<Point>>} lines
	 * @private
	 */
	function clipLine(lines, x1, y1, x2, y2) {
	    var clippedLines = [];

	    for (var l = 0; l < lines.length; l++) {
	        var line = lines[l];
	        var clippedLine;

	        for (var i = 0; i < line.length - 1; i++) {
	            var p0 = line[i];
	            var p1 = line[i + 1];


	            if (p0.x < x1 && p1.x < x1) {
	                continue;
	            } else if (p0.x < x1) {
	                p0 = new Point(x1, p0.y + (p1.y - p0.y) * ((x1 - p0.x) / (p1.x - p0.x)))._round();
	            } else if (p1.x < x1) {
	                p1 = new Point(x1, p0.y + (p1.y - p0.y) * ((x1 - p0.x) / (p1.x - p0.x)))._round();
	            }

	            if (p0.y < y1 && p1.y < y1) {
	                continue;
	            } else if (p0.y < y1) {
	                p0 = new Point(p0.x + (p1.x - p0.x) * ((y1 - p0.y) / (p1.y - p0.y)), y1)._round();
	            } else if (p1.y < y1) {
	                p1 = new Point(p0.x + (p1.x - p0.x) * ((y1 - p0.y) / (p1.y - p0.y)), y1)._round();
	            }

	            if (p0.x >= x2 && p1.x >= x2) {
	                continue;
	            } else if (p0.x >= x2) {
	                p0 = new Point(x2, p0.y + (p1.y - p0.y) * ((x2 - p0.x) / (p1.x - p0.x)))._round();
	            } else if (p1.x >= x2) {
	                p1 = new Point(x2, p0.y + (p1.y - p0.y) * ((x2 - p0.x) / (p1.x - p0.x)))._round();
	            }

	            if (p0.y >= y2 && p1.y >= y2) {
	                continue;
	            } else if (p0.y >= y2) {
	                p0 = new Point(p0.x + (p1.x - p0.x) * ((y2 - p0.y) / (p1.y - p0.y)), y2)._round();
	            } else if (p1.y >= y2) {
	                p1 = new Point(p0.x + (p1.x - p0.x) * ((y2 - p0.y) / (p1.y - p0.y)), y2)._round();
	            }

	            if (!clippedLine || !p0.equals(clippedLine[clippedLine.length - 1])) {
	                clippedLine = [p0];
	                clippedLines.push(clippedLine);
	            }

	            clippedLine.push(p1);
	        }
	    }

	    return clippedLines;
	}


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var CollisionBox = __webpack_require__(102);
	var Point = __webpack_require__(17);

	module.exports = CollisionFeature;

	/**
	 * A CollisionFeature represents the area of the tile covered by a single label.
	 * It is used with CollisionTile to check if the label overlaps with any
	 * previous labels. A CollisionFeature is mostly just a set of CollisionBox
	 * objects.
	 *
	 * @class CollisionFeature
	 * @param {Array<Point>} line The geometry the label is placed on.
	 * @param {Anchor} anchor The point along the line around which the label is anchored.
	 * @param {Object} shaped The text or icon shaping results.
	 * @param {number} boxScale A magic number used to convert from glyph metrics units to geometry units.
	 * @param {number} padding The amount of padding to add around the label edges.
	 * @param {boolean} alignLine Whether the label is aligned with the line or the viewport.
	 *
	 * @private
	 */
	function CollisionFeature(line, anchor, shaped, boxScale, padding, alignLine, straight) {

	    var y1 = shaped.top * boxScale - padding;
	    var y2 = shaped.bottom * boxScale + padding;
	    var x1 = shaped.left * boxScale - padding;
	    var x2 = shaped.right * boxScale + padding;

	    this.boxes = [];

	    if (alignLine) {

	        var height = y2 - y1;
	        var length = x2 - x1;

	        if (height <= 0) return;

	        // set minimum box height to avoid very many small labels
	        height = Math.max(10 * boxScale, height);

	        if (straight) {
	            // used for icon labels that are aligned with the line, but don't curve along it
	            var vector = line[anchor.segment + 1].sub(line[anchor.segment])._unit()._mult(length);
	            var straightLine = [anchor.sub(vector), anchor.add(vector)];
	            this._addLineCollisionBoxes(straightLine, anchor, 0, length, height);
	        } else {
	            // used for text labels that curve along a line
	            this._addLineCollisionBoxes(line, anchor, anchor.segment, length, height);
	        }

	    } else {
	        this.boxes.push(new CollisionBox(new Point(anchor.x, anchor.y), x1, y1, x2, y2, Infinity));
	    }
	}

	/**
	 * Create a set of CollisionBox objects for a line.
	 *
	 * @param {Array<Point>} line
	 * @param {Anchor} anchor
	 * @param {number} labelLength The length of the label in geometry units.
	 * @param {number} boxSize The size of the collision boxes that will be created.
	 *
	 * @private
	 */
	CollisionFeature.prototype._addLineCollisionBoxes = function(line, anchor, segment, labelLength, boxSize) {
	    var step = boxSize / 2;
	    var nBoxes = Math.floor(labelLength / step);

	    // offset the center of the first box by half a box so that the edge of the
	    // box is at the edge of the label.
	    var firstBoxOffset = -boxSize / 2;

	    var bboxes = this.boxes;

	    var p = anchor;
	    var index = segment + 1;
	    var anchorDistance = firstBoxOffset;

	    // move backwards along the line to the first segment the label appears on
	    do {
	        index--;

	        // there isn't enough room for the label after the beginning of the line
	        // checkMaxAngle should have already caught this
	        if (index < 0) return bboxes;

	        anchorDistance -= line[index].dist(p);
	        p = line[index];
	    } while (anchorDistance > -labelLength / 2);

	    var segmentLength = line[index].dist(line[index + 1]);

	    for (var i = 0; i < nBoxes; i++) {
	        // the distance the box will be from the anchor
	        var boxDistanceToAnchor = -labelLength / 2 + i * step;

	        // the box is not on the current segment. Move to the next segment.
	        while (anchorDistance + segmentLength < boxDistanceToAnchor) {
	            anchorDistance += segmentLength;
	            index++;

	            // There isn't enough room before the end of the line.
	            if (index + 1 >= line.length) return bboxes;

	            segmentLength = line[index].dist(line[index + 1]);
	        }

	        // the distance the box will be from the beginning of the segment
	        var segmentBoxDistance = boxDistanceToAnchor - anchorDistance;

	        var p0 = line[index];
	        var p1 = line[index + 1];
	        var boxAnchorPoint = p1.sub(p0)._unit()._mult(segmentBoxDistance)._add(p0);

	        var distanceToInnerEdge = Math.max(Math.abs(boxDistanceToAnchor - firstBoxOffset) - step / 2, 0);
	        var maxScale = labelLength / 2 / distanceToInnerEdge;

	        bboxes.push(new CollisionBox(boxAnchorPoint, -boxSize / 2, -boxSize / 2, boxSize / 2, boxSize / 2, maxScale));
	    }

	    return bboxes;
	};


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	var rbush = __webpack_require__(95);

	module.exports = supercluster;

	function supercluster(options) {
	    return new SuperCluster(options);
	}

	function SuperCluster(options) {
	    this.options = extend(Object.create(this.options), options);
	    this._initTrees();
	}

	SuperCluster.prototype = {
	    options: {
	        minZoom: 0,   // min zoom to generate clusters on
	        maxZoom: 16,  // max zoom level to cluster the points on
	        radius: 40,   // cluster radius in pixels
	        extent: 512,  // tile extent (radius is calculated relative to it)
	        nodeSize: 16, // size of the R-tree leaf node, affects performance
	        log: false    // whether to log timing info
	    },

	    load: function (points) {
	        var log = this.options.log;

	        if (log) console.time('total time');

	        var timerId = 'prepare ' + points.length + ' points';
	        if (log) console.time(timerId);

	        // generate a cluster object for each point
	        var clusters = points.map(createPointCluster);
	        if (log) console.timeEnd(timerId);

	        // cluster points on max zoom, then cluster the results on previous zoom, etc.;
	        // results in a cluster hierarchy across zoom levels
	        for (var z = this.options.maxZoom; z >= this.options.minZoom; z--) {
	            var now = +Date.now();

	            this.trees[z + 1].load(clusters); // index input points into an R-tree
	            clusters = this._cluster(clusters, z); // create a new set of clusters for the zoom

	            if (log) console.log('z%d: %d clusters in %dms', z, clusters.length, +Date.now() - now);
	        }
	        this.trees[this.options.minZoom].load(clusters); // index top-level clusters

	        if (log) console.timeEnd('total time');

	        return this;
	    },

	    getClusters: function (bbox, zoom) {
	        var projBBox = [lngX(bbox[0]), latY(bbox[3]), lngX(bbox[2]), latY(bbox[1])];
	        var z = Math.max(this.options.minZoom, Math.min(zoom, this.options.maxZoom + 1));
	        var clusters = this.trees[z].search(projBBox);
	        return clusters.map(getClusterJSON);
	    },

	    getTile: function (z, x, y) {
	        var z2 = Math.pow(2, z);
	        var extent = this.options.extent;
	        var p = this.options.radius / extent;
	        var clusters = this.trees[z].search([
	            (x - p) / z2,
	            (y - p) / z2,
	            (x + 1 + p) / z2,
	            (y + 1 + p) / z2
	        ]);
	        if (!clusters.length) return null;
	        var tile = {
	            features: []
	        };
	        for (var i = 0; i < clusters.length; i++) {
	            var c = clusters[i];
	            var feature = {
	                type: 1,
	                geometry: [[
	                    Math.round(extent * (c.wx * z2 - x)),
	                    Math.round(extent * (c.wy * z2 - y))
	                ]],
	                tags: c.point ? c.point.properties : getClusterProperties(c)
	            };
	            tile.features.push(feature);
	        }
	        return tile;
	    },

	    _initTrees: function () {
	        this.trees = [];
	        // make an R-Tree index for each zoom level
	        for (var z = 0; z <= this.options.maxZoom + 1; z++) {
	            this.trees[z] = rbush(this.options.nodeSize);
	            this.trees[z].toBBox = toBBox;
	            this.trees[z].compareMinX = compareMinX;
	            this.trees[z].compareMinY = compareMinY;
	        }
	    },

	    _cluster: function (points, zoom) {
	        var clusters = [];
	        var r = this.options.radius / (this.options.extent * Math.pow(2, zoom));
	        var bbox = [0, 0, 0, 0];

	        // loop through each point
	        for (var i = 0; i < points.length; i++) {
	            var p = points[i];
	            // if we've already visited the point at this zoom level, skip it
	            if (p.zoom <= zoom) continue;
	            p.zoom = zoom;

	            // find all nearby points with a bbox search
	            bbox[0] = p.wx - r;
	            bbox[1] = p.wy - r;
	            bbox[2] = p.wx + r;
	            bbox[3] = p.wy + r;
	            var bboxNeighbors = this.trees[zoom + 1].search(bbox);

	            var foundNeighbors = false;
	            var numPoints = p.numPoints;
	            var wx = p.wx * numPoints;
	            var wy = p.wy * numPoints;

	            for (var j = 0; j < bboxNeighbors.length; j++) {
	                var b = bboxNeighbors[j];
	                // filter out neighbors that are too far or already processed
	                if (zoom < b.zoom && distSq(p, b) <= r * r) {
	                    foundNeighbors = true;
	                    b.zoom = zoom; // save the zoom (so it doesn't get processed twice)
	                    wx += b.wx * b.numPoints; // accumulate coordinates for calculating weighted center
	                    wy += b.wy * b.numPoints;
	                    numPoints += b.numPoints;
	                }
	            }

	            if (!foundNeighbors) {
	                clusters.push(p); // no neighbors, add a single point as cluster
	                continue;
	            }

	            // form a cluster with neighbors
	            var cluster = createCluster(p.x, p.y);
	            cluster.numPoints = numPoints;

	            // save weighted cluster center for display
	            cluster.wx = wx / numPoints;
	            cluster.wy = wy / numPoints;

	            clusters.push(cluster);
	        }

	        return clusters;
	    }
	};

	function toBBox(p) {
	    return [p.x, p.y, p.x, p.y];
	}
	function compareMinX(a, b) {
	    return a.x - b.x;
	}
	function compareMinY(a, b) {
	    return a.y - b.y;
	}

	function createCluster(x, y) {
	    return {
	        x: x, // cluster center
	        y: y,
	        wx: x, // weighted cluster center
	        wy: y,
	        zoom: Infinity, // the last zoom the cluster was processed at
	        point: null,
	        numPoints: 1
	    };
	}

	function createPointCluster(p) {
	    var coords = p.geometry.coordinates;
	    var cluster = createCluster(lngX(coords[0]), latY(coords[1]));
	    cluster.point = p;
	    return cluster;
	}

	function getClusterJSON(cluster) {
	    return cluster.point ? cluster.point : {
	        type: 'Feature',
	        properties: getClusterProperties(cluster),
	        geometry: {
	            type: 'Point',
	            coordinates: [xLng(cluster.wx), yLat(cluster.wy)]
	        }
	    };
	}

	function getClusterProperties(cluster) {
	    var count = cluster.numPoints;
	    var abbrev = count >= 10000 ? Math.round(count / 1000) + 'k' :
	                 count >= 1000 ? (Math.round(count / 100) / 10) + 'k' : count;
	    return {
	        cluster: true,
	        point_count: count,
	        point_count_abbreviated: abbrev
	    };
	}

	// longitude/latitude to spherical mercator in [0..1] range
	function lngX(lng) {
	    return lng / 360 + 0.5;
	}
	function latY(lat) {
	    var sin = Math.sin(lat * Math.PI / 180),
	        y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);
	    return y < 0 ? 0 :
	           y > 1 ? 1 : y;
	}

	// spherical mercator to longitude/latitude
	function xLng(x) {
	    return (x - 0.5) * 360;
	}
	function yLat(y) {
	    var y2 = (180 - y * 360) * Math.PI / 180;
	    return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
	}

	// squared distance between two points
	function distSq(a, b) {
	    var dx = a.wx - b.wx;
	    var dy = a.wy - b.wy;
	    return dx * dx + dy * dy;
	}

	function extend(dest, src) {
	    for (var id in src) dest[id] = src[id];
	    return dest;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	module.exports = geojsonvt;

	var convert = __webpack_require__(122),     // GeoJSON conversion and preprocessing
	    transform = __webpack_require__(124), // coordinate transformation
	    clip = __webpack_require__(125),           // stripe clipping algorithm
	    wrap = __webpack_require__(126),           // date line processing
	    createTile = __webpack_require__(127);     // final simplified tile generation


	function geojsonvt(data, options) {
	    return new GeoJSONVT(data, options);
	}

	function GeoJSONVT(data, options) {
	    options = this.options = extend(Object.create(this.options), options);

	    var debug = options.debug;

	    if (debug) console.time('preprocess data');

	    var z2 = 1 << options.maxZoom, // 2^z
	        features = convert(data, options.tolerance / (z2 * options.extent));

	    this.tiles = {};
	    this.tileCoords = [];

	    if (debug) {
	        console.timeEnd('preprocess data');
	        console.log('index: maxZoom: %d, maxPoints: %d', options.indexMaxZoom, options.indexMaxPoints);
	        console.time('generate tiles');
	        this.stats = {};
	        this.total = 0;
	    }

	    features = wrap(features, options.buffer / options.extent, intersectX);

	    // start slicing from the top tile down
	    if (features.length) this.splitTile(features, 0, 0, 0);

	    if (debug) {
	        if (features.length) console.log('features: %d, points: %d', this.tiles[0].numFeatures, this.tiles[0].numPoints);
	        console.timeEnd('generate tiles');
	        console.log('tiles generated:', this.total, JSON.stringify(this.stats));
	    }
	}

	GeoJSONVT.prototype.options = {
	    maxZoom: 14,            // max zoom to preserve detail on
	    indexMaxZoom: 5,        // max zoom in the tile index
	    indexMaxPoints: 100000, // max number of points per tile in the tile index
	    solidChildren: false,   // whether to tile solid square tiles further
	    tolerance: 3,           // simplification tolerance (higher means simpler)
	    extent: 4096,           // tile extent
	    buffer: 64,             // tile buffer on each side
	    debug: 0                // logging level (0, 1 or 2)
	};

	GeoJSONVT.prototype.splitTile = function (features, z, x, y, cz, cx, cy) {

	    var stack = [features, z, x, y],
	        options = this.options,
	        debug = options.debug,
	        solid = null;

	    // avoid recursion by using a processing queue
	    while (stack.length) {
	        y = stack.pop();
	        x = stack.pop();
	        z = stack.pop();
	        features = stack.pop();

	        var z2 = 1 << z,
	            id = toID(z, x, y),
	            tile = this.tiles[id],
	            tileTolerance = z === options.maxZoom ? 0 : options.tolerance / (z2 * options.extent);

	        if (!tile) {
	            if (debug > 1) console.time('creation');

	            tile = this.tiles[id] = createTile(features, z2, x, y, tileTolerance, z === options.maxZoom);
	            this.tileCoords.push({z: z, x: x, y: y});

	            if (debug) {
	                if (debug > 1) {
	                    console.log('tile z%d-%d-%d (features: %d, points: %d, simplified: %d)',
	                        z, x, y, tile.numFeatures, tile.numPoints, tile.numSimplified);
	                    console.timeEnd('creation');
	                }
	                var key = 'z' + z;
	                this.stats[key] = (this.stats[key] || 0) + 1;
	                this.total++;
	            }
	        }

	        // save reference to original geometry in tile so that we can drill down later if we stop now
	        tile.source = features;

	        // if it's the first-pass tiling
	        if (!cz) {
	            // stop tiling if we reached max zoom, or if the tile is too simple
	            if (z === options.indexMaxZoom || tile.numPoints <= options.indexMaxPoints) continue;

	        // if a drilldown to a specific tile
	        } else {
	            // stop tiling if we reached base zoom or our target tile zoom
	            if (z === options.maxZoom || z === cz) continue;

	            // stop tiling if it's not an ancestor of the target tile
	            var m = 1 << (cz - z);
	            if (x !== Math.floor(cx / m) || y !== Math.floor(cy / m)) continue;
	        }

	        // stop tiling if the tile is solid clipped square
	        if (!options.solidChildren && isClippedSquare(tile, options.extent, options.buffer)) {
	            if (cz) solid = z; // and remember the zoom if we're drilling down
	            continue;
	        }

	        // if we slice further down, no need to keep source geometry
	        tile.source = null;

	        if (debug > 1) console.time('clipping');

	        // values we'll use for clipping
	        var k1 = 0.5 * options.buffer / options.extent,
	            k2 = 0.5 - k1,
	            k3 = 0.5 + k1,
	            k4 = 1 + k1,
	            tl, bl, tr, br, left, right;

	        tl = bl = tr = br = null;

	        left  = clip(features, z2, x - k1, x + k3, 0, intersectX, tile.min[0], tile.max[0]);
	        right = clip(features, z2, x + k2, x + k4, 0, intersectX, tile.min[0], tile.max[0]);

	        if (left) {
	            tl = clip(left, z2, y - k1, y + k3, 1, intersectY, tile.min[1], tile.max[1]);
	            bl = clip(left, z2, y + k2, y + k4, 1, intersectY, tile.min[1], tile.max[1]);
	        }

	        if (right) {
	            tr = clip(right, z2, y - k1, y + k3, 1, intersectY, tile.min[1], tile.max[1]);
	            br = clip(right, z2, y + k2, y + k4, 1, intersectY, tile.min[1], tile.max[1]);
	        }

	        if (debug > 1) console.timeEnd('clipping');

	        if (tl) stack.push(tl, z + 1, x * 2,     y * 2);
	        if (bl) stack.push(bl, z + 1, x * 2,     y * 2 + 1);
	        if (tr) stack.push(tr, z + 1, x * 2 + 1, y * 2);
	        if (br) stack.push(br, z + 1, x * 2 + 1, y * 2 + 1);
	    }

	    return solid;
	};

	GeoJSONVT.prototype.getTile = function (z, x, y) {
	    var options = this.options,
	        extent = options.extent,
	        debug = options.debug;

	    var z2 = 1 << z;
	    x = ((x % z2) + z2) % z2; // wrap tile x coordinate

	    var id = toID(z, x, y);
	    if (this.tiles[id]) return transform.tile(this.tiles[id], extent);

	    if (debug > 1) console.log('drilling down to z%d-%d-%d', z, x, y);

	    var z0 = z,
	        x0 = x,
	        y0 = y,
	        parent;

	    while (!parent && z0 > 0) {
	        z0--;
	        x0 = Math.floor(x0 / 2);
	        y0 = Math.floor(y0 / 2);
	        parent = this.tiles[toID(z0, x0, y0)];
	    }

	    if (!parent || !parent.source) return null;

	    // if we found a parent tile containing the original geometry, we can drill down from it
	    if (debug > 1) console.log('found parent tile z%d-%d-%d', z0, x0, y0);

	    // it parent tile is a solid clipped square, return it instead since it's identical
	    if (isClippedSquare(parent, extent, options.buffer)) return transform.tile(parent, extent);

	    if (debug > 1) console.time('drilling down');
	    var solid = this.splitTile(parent.source, z0, x0, y0, z, x, y);
	    if (debug > 1) console.timeEnd('drilling down');

	    // one of the parent tiles was a solid clipped square
	    if (solid !== null) {
	        var m = 1 << (z - solid);
	        id = toID(solid, Math.floor(x / m), Math.floor(y / m));
	    }

	    return this.tiles[id] ? transform.tile(this.tiles[id], extent) : null;
	};

	function toID(z, x, y) {
	    return (((1 << z) * y + x) * 32) + z;
	}

	function intersectX(a, b, x) {
	    return [x, (x - a[0]) * (b[1] - a[1]) / (b[0] - a[0]) + a[1], 1];
	}
	function intersectY(a, b, y) {
	    return [(y - a[1]) * (b[0] - a[0]) / (b[1] - a[1]) + a[0], y, 1];
	}

	function extend(dest, src) {
	    for (var i in src) dest[i] = src[i];
	    return dest;
	}

	// checks whether a tile is a whole-area fill after clipping; if it is, there's no sense slicing it further
	function isClippedSquare(tile, extent, buffer) {

	    var features = tile.source;
	    if (features.length !== 1) return false;

	    var feature = features[0];
	    if (feature.type !== 3 || feature.geometry.length > 1) return false;

	    var len = feature.geometry[0].length;
	    if (len !== 5) return false;

	    for (var i = 0; i < len; i++) {
	        var p = transform.point(feature.geometry[0][i], extent, tile.z2, tile.x, tile.y);
	        if ((p[0] !== -buffer && p[0] !== extent + buffer) ||
	            (p[1] !== -buffer && p[1] !== extent + buffer)) return false;
	    }

	    return true;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = convert;

	var simplify = __webpack_require__(123);

	// converts GeoJSON feature into an intermediate projected JSON vector format with simplification data

	function convert(data, tolerance) {
	    var features = [];

	    if (data.type === 'FeatureCollection') {
	        for (var i = 0; i < data.features.length; i++) {
	            convertFeature(features, data.features[i], tolerance);
	        }
	    } else if (data.type === 'Feature') {
	        convertFeature(features, data, tolerance);

	    } else {
	        // single geometry or a geometry collection
	        convertFeature(features, {geometry: data}, tolerance);
	    }
	    return features;
	}

	function convertFeature(features, feature, tolerance) {
	    var geom = feature.geometry,
	        type = geom.type,
	        coords = geom.coordinates,
	        tags = feature.properties,
	        i, j, rings;

	    if (type === 'Point') {
	        features.push(create(tags, 1, [projectPoint(coords)]));

	    } else if (type === 'MultiPoint') {
	        features.push(create(tags, 1, project(coords)));

	    } else if (type === 'LineString') {
	        features.push(create(tags, 2, [project(coords, tolerance)]));

	    } else if (type === 'MultiLineString' || type === 'Polygon') {
	        rings = [];
	        for (i = 0; i < coords.length; i++) {
	            rings.push(project(coords[i], tolerance));
	        }
	        features.push(create(tags, type === 'Polygon' ? 3 : 2, rings));

	    } else if (type === 'MultiPolygon') {
	        rings = [];
	        for (i = 0; i < coords.length; i++) {
	            for (j = 0; j < coords[i].length; j++) {
	                rings.push(project(coords[i][j], tolerance));
	            }
	        }
	        features.push(create(tags, 3, rings));

	    } else if (type === 'GeometryCollection') {
	        for (i = 0; i < geom.geometries.length; i++) {
	            convertFeature(features, {
	                geometry: geom.geometries[i],
	                properties: tags
	            }, tolerance);
	        }

	    } else {
	        throw new Error('Input data is not a valid GeoJSON object.');
	    }
	}

	function create(tags, type, geometry) {
	    var feature = {
	        geometry: geometry,
	        type: type,
	        tags: tags || null,
	        min: [2, 1], // initial bbox values;
	        max: [-1, 0]  // note that coords are usually in [0..1] range
	    };
	    calcBBox(feature);
	    return feature;
	}

	function project(lonlats, tolerance) {
	    var projected = [];
	    for (var i = 0; i < lonlats.length; i++) {
	        projected.push(projectPoint(lonlats[i]));
	    }
	    if (tolerance) {
	        simplify(projected, tolerance);
	        calcSize(projected);
	    }
	    return projected;
	}

	function projectPoint(p) {
	    var sin = Math.sin(p[1] * Math.PI / 180),
	        x = (p[0] / 360 + 0.5),
	        y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);

	    y = y < -1 ? -1 :
	        y > 1 ? 1 : y;

	    return [x, y, 0];
	}

	// calculate area and length of the poly
	function calcSize(points) {
	    var area = 0,
	        dist = 0;

	    for (var i = 0, a, b; i < points.length - 1; i++) {
	        a = b || points[i];
	        b = points[i + 1];

	        area += a[0] * b[1] - b[0] * a[1];

	        // use Manhattan distance instead of Euclidian one to avoid expensive square root computation
	        dist += Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
	    }
	    points.area = Math.abs(area / 2);
	    points.dist = dist;
	}

	// calculate the feature bounding box for faster clipping later
	function calcBBox(feature) {
	    var geometry = feature.geometry,
	        min = feature.min,
	        max = feature.max;

	    if (feature.type === 1) calcRingBBox(min, max, geometry);
	    else for (var i = 0; i < geometry.length; i++) calcRingBBox(min, max, geometry[i]);

	    return feature;
	}

	function calcRingBBox(min, max, points) {
	    for (var i = 0, p; i < points.length; i++) {
	        p = points[i];
	        min[0] = Math.min(p[0], min[0]);
	        max[0] = Math.max(p[0], max[0]);
	        min[1] = Math.min(p[1], min[1]);
	        max[1] = Math.max(p[1], max[1]);
	    }
	}


/***/ },
/* 123 */
/***/ function(module, exports) {

	'use strict';

	module.exports = simplify;

	// calculate simplification data using optimized Douglas-Peucker algorithm

	function simplify(points, tolerance) {

	    var sqTolerance = tolerance * tolerance,
	        len = points.length,
	        first = 0,
	        last = len - 1,
	        stack = [],
	        i, maxSqDist, sqDist, index;

	    // always retain the endpoints (1 is the max value)
	    points[first][2] = 1;
	    points[last][2] = 1;

	    // avoid recursion by using a stack
	    while (last) {

	        maxSqDist = 0;

	        for (i = first + 1; i < last; i++) {
	            sqDist = getSqSegDist(points[i], points[first], points[last]);

	            if (sqDist > maxSqDist) {
	                index = i;
	                maxSqDist = sqDist;
	            }
	        }

	        if (maxSqDist > sqTolerance) {
	            points[index][2] = maxSqDist; // save the point importance in squared pixels as a z coordinate
	            stack.push(first);
	            stack.push(index);
	            first = index;

	        } else {
	            last = stack.pop();
	            first = stack.pop();
	        }
	    }
	}

	// square distance from a point to a segment
	function getSqSegDist(p, a, b) {

	    var x = a[0], y = a[1],
	        bx = b[0], by = b[1],
	        px = p[0], py = p[1],
	        dx = bx - x,
	        dy = by - y;

	    if (dx !== 0 || dy !== 0) {

	        var t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy);

	        if (t > 1) {
	            x = bx;
	            y = by;

	        } else if (t > 0) {
	            x += dx * t;
	            y += dy * t;
	        }
	    }

	    dx = px - x;
	    dy = py - y;

	    return dx * dx + dy * dy;
	}


/***/ },
/* 124 */
/***/ function(module, exports) {

	'use strict';

	exports.tile = transformTile;
	exports.point = transformPoint;

	// Transforms the coordinates of each feature in the given tile from
	// mercator-projected space into (extent x extent) tile space.
	function transformTile(tile, extent) {
	    if (tile.transformed) return tile;

	    var z2 = tile.z2,
	        tx = tile.x,
	        ty = tile.y,
	        i, j, k;

	    for (i = 0; i < tile.features.length; i++) {
	        var feature = tile.features[i],
	            geom = feature.geometry,
	            type = feature.type;

	        if (type === 1) {
	            for (j = 0; j < geom.length; j++) geom[j] = transformPoint(geom[j], extent, z2, tx, ty);

	        } else {
	            for (j = 0; j < geom.length; j++) {
	                var ring = geom[j];
	                for (k = 0; k < ring.length; k++) ring[k] = transformPoint(ring[k], extent, z2, tx, ty);
	            }
	        }
	    }

	    tile.transformed = true;

	    return tile;
	}

	function transformPoint(p, extent, z2, tx, ty) {
	    var x = Math.round(extent * (p[0] * z2 - tx)),
	        y = Math.round(extent * (p[1] * z2 - ty));
	    return [x, y];
	}


/***/ },
/* 125 */
/***/ function(module, exports) {

	'use strict';

	module.exports = clip;

	/* clip features between two axis-parallel lines:
	 *     |        |
	 *  ___|___     |     /
	 * /   |   \____|____/
	 *     |        |
	 */

	function clip(features, scale, k1, k2, axis, intersect, minAll, maxAll) {

	    k1 /= scale;
	    k2 /= scale;

	    if (minAll >= k1 && maxAll <= k2) return features; // trivial accept
	    else if (minAll > k2 || maxAll < k1) return null; // trivial reject

	    var clipped = [];

	    for (var i = 0; i < features.length; i++) {

	        var feature = features[i],
	            geometry = feature.geometry,
	            type = feature.type,
	            min, max;

	        min = feature.min[axis];
	        max = feature.max[axis];

	        if (min >= k1 && max <= k2) { // trivial accept
	            clipped.push(feature);
	            continue;
	        } else if (min > k2 || max < k1) continue; // trivial reject

	        var slices = type === 1 ?
	                clipPoints(geometry, k1, k2, axis) :
	                clipGeometry(geometry, k1, k2, axis, intersect, type === 3);

	        if (slices.length) {
	            // if a feature got clipped, it will likely get clipped on the next zoom level as well,
	            // so there's no need to recalculate bboxes
	            clipped.push({
	                geometry: slices,
	                type: type,
	                tags: features[i].tags || null,
	                min: feature.min,
	                max: feature.max
	            });
	        }
	    }

	    return clipped.length ? clipped : null;
	}

	function clipPoints(geometry, k1, k2, axis) {
	    var slice = [];

	    for (var i = 0; i < geometry.length; i++) {
	        var a = geometry[i],
	            ak = a[axis];

	        if (ak >= k1 && ak <= k2) slice.push(a);
	    }
	    return slice;
	}

	function clipGeometry(geometry, k1, k2, axis, intersect, closed) {

	    var slices = [];

	    for (var i = 0; i < geometry.length; i++) {

	        var ak = 0,
	            bk = 0,
	            b = null,
	            points = geometry[i],
	            area = points.area,
	            dist = points.dist,
	            len = points.length,
	            a, j, last;

	        var slice = [];

	        for (j = 0; j < len - 1; j++) {
	            a = b || points[j];
	            b = points[j + 1];
	            ak = bk || a[axis];
	            bk = b[axis];

	            if (ak < k1) {

	                if ((bk > k2)) { // ---|-----|-->
	                    slice.push(intersect(a, b, k1), intersect(a, b, k2));
	                    if (!closed) slice = newSlice(slices, slice, area, dist);

	                } else if (bk >= k1) slice.push(intersect(a, b, k1)); // ---|-->  |

	            } else if (ak > k2) {

	                if ((bk < k1)) { // <--|-----|---
	                    slice.push(intersect(a, b, k2), intersect(a, b, k1));
	                    if (!closed) slice = newSlice(slices, slice, area, dist);

	                } else if (bk <= k2) slice.push(intersect(a, b, k2)); // |  <--|---

	            } else {

	                slice.push(a);

	                if (bk < k1) { // <--|---  |
	                    slice.push(intersect(a, b, k1));
	                    if (!closed) slice = newSlice(slices, slice, area, dist);

	                } else if (bk > k2) { // |  ---|-->
	                    slice.push(intersect(a, b, k2));
	                    if (!closed) slice = newSlice(slices, slice, area, dist);
	                }
	                // | --> |
	            }
	        }

	        // add the last point
	        a = points[len - 1];
	        ak = a[axis];
	        if (ak >= k1 && ak <= k2) slice.push(a);

	        // close the polygon if its endpoints are not the same after clipping

	        last = slice[slice.length - 1];
	        if (closed && last && (slice[0][0] !== last[0] || slice[0][1] !== last[1])) slice.push(slice[0]);

	        // add the final slice
	        newSlice(slices, slice, area, dist);
	    }

	    return slices;
	}

	function newSlice(slices, slice, area, dist) {
	    if (slice.length) {
	        // we don't recalculate the area/length of the unclipped geometry because the case where it goes
	        // below the visibility threshold as a result of clipping is rare, so we avoid doing unnecessary work
	        slice.area = area;
	        slice.dist = dist;

	        slices.push(slice);
	    }
	    return [];
	}


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var clip = __webpack_require__(125);

	module.exports = wrap;

	function wrap(features, buffer, intersectX) {
	    var merged = features,
	        left  = clip(features, 1, -1 - buffer, buffer,     0, intersectX, -1, 2), // left world copy
	        right = clip(features, 1,  1 - buffer, 2 + buffer, 0, intersectX, -1, 2); // right world copy

	    if (left || right) {
	        merged = clip(features, 1, -buffer, 1 + buffer, 0, intersectX, -1, 2); // center world copy

	        if (left) merged = shiftFeatureCoords(left, 1).concat(merged); // merge left into center
	        if (right) merged = merged.concat(shiftFeatureCoords(right, -1)); // merge right into center
	    }

	    return merged;
	}

	function shiftFeatureCoords(features, offset) {
	    var newFeatures = [];

	    for (var i = 0; i < features.length; i++) {
	        var feature = features[i],
	            type = feature.type;

	        var newGeometry;

	        if (type === 1) {
	            newGeometry = shiftCoords(feature.geometry, offset);
	        } else {
	            newGeometry = [];
	            for (var j = 0; j < feature.geometry.length; j++) {
	                newGeometry.push(shiftCoords(feature.geometry[j], offset));
	            }
	        }

	        newFeatures.push({
	            geometry: newGeometry,
	            type: type,
	            tags: feature.tags,
	            min: [feature.min[0] + offset, feature.min[1]],
	            max: [feature.max[0] + offset, feature.max[1]]
	        });
	    }

	    return newFeatures;
	}

	function shiftCoords(points, offset) {
	    var newPoints = [];
	    newPoints.area = points.area;
	    newPoints.dist = points.dist;

	    for (var i = 0; i < points.length; i++) {
	        newPoints.push([points[i][0] + offset, points[i][1], points[i][2]]);
	    }
	    return newPoints;
	}


/***/ },
/* 127 */
/***/ function(module, exports) {

	'use strict';

	module.exports = createTile;

	function createTile(features, z2, tx, ty, tolerance, noSimplify) {
	    var tile = {
	        features: [],
	        numPoints: 0,
	        numSimplified: 0,
	        numFeatures: 0,
	        source: null,
	        x: tx,
	        y: ty,
	        z2: z2,
	        transformed: false,
	        min: [2, 1],
	        max: [-1, 0]
	    };
	    for (var i = 0; i < features.length; i++) {
	        tile.numFeatures++;
	        addFeature(tile, features[i], tolerance, noSimplify);

	        var min = features[i].min,
	            max = features[i].max;

	        if (min[0] < tile.min[0]) tile.min[0] = min[0];
	        if (min[1] < tile.min[1]) tile.min[1] = min[1];
	        if (max[0] > tile.max[0]) tile.max[0] = max[0];
	        if (max[1] > tile.max[1]) tile.max[1] = max[1];
	    }
	    return tile;
	}

	function addFeature(tile, feature, tolerance, noSimplify) {

	    var geom = feature.geometry,
	        type = feature.type,
	        simplified = [],
	        sqTolerance = tolerance * tolerance,
	        i, j, ring, p;

	    if (type === 1) {
	        for (i = 0; i < geom.length; i++) {
	            simplified.push(geom[i]);
	            tile.numPoints++;
	            tile.numSimplified++;
	        }

	    } else {

	        // simplify and transform projected coordinates for tile geometry
	        for (i = 0; i < geom.length; i++) {
	            ring = geom[i];

	            // filter out tiny polylines & polygons
	            if (!noSimplify && ((type === 2 && ring.dist < tolerance) ||
	                                (type === 3 && ring.area < sqTolerance))) {
	                tile.numPoints += ring.length;
	                continue;
	            }

	            var simplifiedRing = [];

	            for (j = 0; j < ring.length; j++) {
	                p = ring[j];
	                // keep points with importance > tolerance
	                if (noSimplify || p[2] > sqTolerance) {
	                    simplifiedRing.push(p);
	                    tile.numSimplified++;
	                }
	                tile.numPoints++;
	            }

	            simplified.push(simplifiedRing);
	        }
	    }

	    if (simplified.length) {
	        tile.features.push({
	            geometry: simplified,
	            type: type,
	            tags: feature.tags || null
	        });
	    }
	}


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Point = __webpack_require__(17);
	var VectorTileFeature = __webpack_require__(96).VectorTileFeature;
	var EXTENT = __webpack_require__(24).EXTENT;

	module.exports = GeoJSONWrapper;

	// conform to vectortile api
	function GeoJSONWrapper(features) {
	    this.features = features;
	    this.length = features.length;
	}

	GeoJSONWrapper.prototype.feature = function(i) {
	    return new FeatureWrapper(this.features[i]);
	};

	function FeatureWrapper(feature) {
	    this.type = feature.type;
	    this.rawGeometry = feature.type === 1 ? [feature.geometry] : feature.geometry;
	    this.properties = feature.tags;
	    this.extent = EXTENT;
	}

	FeatureWrapper.prototype.loadGeometry = function() {
	    var rings = this.rawGeometry;
	    this.geometry = [];

	    for (var i = 0; i < rings.length; i++) {
	        var ring = rings[i],
	            newRing = [];
	        for (var j = 0; j < ring.length; j++) {
	            newRing.push(new Point(ring[j][0], ring[j][1]));
	        }
	        this.geometry.push(newRing);
	    }
	    return this.geometry;
	};

	FeatureWrapper.prototype.bbox = function() {
	    if (!this.geometry) this.loadGeometry();

	    var rings = this.geometry,
	        x1 = Infinity,
	        x2 = -Infinity,
	        y1 = Infinity,
	        y2 = -Infinity;

	    for (var i = 0; i < rings.length; i++) {
	        var ring = rings[i];

	        for (var j = 0; j < ring.length; j++) {
	            var coord = ring[j];

	            x1 = Math.min(x1, coord.x);
	            x2 = Math.max(x2, coord.x);
	            y1 = Math.min(y1, coord.y);
	            y2 = Math.max(y2, coord.y);
	        }
	    }

	    return [x1, y1, x2, y2];
	};

	FeatureWrapper.prototype.toGeoJSON = VectorTileFeature.prototype.toGeoJSON;


/***/ },
/* 129 */
/***/ function(module, exports) {

	'use strict';

	module.exports = AnimationLoop;

	function AnimationLoop() {
	    this.n = 0;
	    this.times = [];
	}

	// Are all animations done?
	AnimationLoop.prototype.stopped = function() {
	    this.times = this.times.filter(function(t) {
	        return t.time >= (new Date()).getTime();
	    });
	    return !this.times.length;
	};

	// Add a new animation that will run t milliseconds
	// Returns an id that can be used to cancel it layer
	AnimationLoop.prototype.set = function(t) {
	    this.times.push({ id: this.n, time: t + (new Date()).getTime() });
	    return this.n++;
	};

	// Cancel an animation
	AnimationLoop.prototype.cancel = function(n) {
	    this.times = this.times.filter(function(t) {
	        return t.id !== n;
	    });
	};


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var glutil = __webpack_require__(131);
	var browser = __webpack_require__(14);
	var mat4 = __webpack_require__(134).mat4;
	var FrameHistory = __webpack_require__(144);
	var TileCoord = __webpack_require__(25);
	var EXTENT = __webpack_require__(24).EXTENT;

	/*
	 * Initialize a new painter object.
	 *
	 * @param {Canvas} gl an experimental-webgl drawing context
	 */
	module.exports = Painter;
	function Painter(gl, transform) {
	    this.gl = glutil.extend(gl);
	    this.transform = transform;

	    this.reusableTextures = {};
	    this.preFbos = {};

	    this.frameHistory = new FrameHistory();

	    this.setup();

	    // Within each layer there are 3 distinct z-planes that can be drawn to.
	    // This is implemented using the WebGL depth buffer.
	    this.numSublayers = 3;
	    this.depthEpsilon = 1 / Math.pow(2, 16);
	}

	/*
	 * Update the GL viewport, projection matrix, and transforms to compensate
	 * for a new width and height value.
	 */
	Painter.prototype.resize = function(width, height) {
	    var gl = this.gl;

	    this.width = width * browser.devicePixelRatio;
	    this.height = height * browser.devicePixelRatio;
	    gl.viewport(0, 0, this.width, this.height);

	};


	Painter.prototype.setup = function() {
	    var gl = this.gl;

	    gl.verbose = true;

	    // We are blending the new pixels *behind* the existing pixels. That way we can
	    // draw front-to-back and use then stencil buffer to cull opaque pixels early.
	    gl.enable(gl.BLEND);
	    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

	    gl.enable(gl.STENCIL_TEST);

	    gl.enable(gl.DEPTH_TEST);
	    gl.depthFunc(gl.LEQUAL);

	    this._depthMask = false;
	    gl.depthMask(false);

	    // Initialize shaders
	    this.debugShader = gl.initializeShader('debug',
	        ['a_pos'],
	        ['u_matrix', 'u_color']);

	    this.rasterShader = gl.initializeShader('raster',
	        ['a_pos', 'a_texture_pos'],
	        ['u_matrix', 'u_brightness_low', 'u_brightness_high', 'u_saturation_factor', 'u_spin_weights', 'u_contrast_factor', 'u_opacity0', 'u_opacity1', 'u_image0', 'u_image1', 'u_tl_parent', 'u_scale_parent', 'u_buffer_scale']);

	    this.circleShader = gl.initializeShader('circle',
	        ['a_pos'],
	        ['u_matrix', 'u_exmatrix', 'u_blur', 'u_size', 'u_color']);

	    this.lineShader = gl.initializeShader('line',
	        ['a_pos', 'a_data'],
	        ['u_matrix', 'u_linewidth', 'u_color', 'u_ratio', 'u_blur', 'u_extra', 'u_antialiasingmatrix', 'u_offset', 'u_exmatrix']);

	    this.linepatternShader = gl.initializeShader('linepattern',
	        ['a_pos', 'a_data'],
	        ['u_matrix', 'u_linewidth', 'u_ratio', 'u_pattern_size_a', 'u_pattern_size_b', 'u_pattern_tl_a', 'u_pattern_br_a', 'u_pattern_tl_b', 'u_pattern_br_b', 'u_blur', 'u_fade', 'u_opacity', 'u_extra', 'u_antialiasingmatrix', 'u_offset']);

	    this.linesdfpatternShader = gl.initializeShader('linesdfpattern',
	        ['a_pos', 'a_data'],
	        ['u_matrix', 'u_linewidth', 'u_color', 'u_ratio', 'u_blur', 'u_patternscale_a', 'u_tex_y_a', 'u_patternscale_b', 'u_tex_y_b', 'u_image', 'u_sdfgamma', 'u_mix', 'u_extra', 'u_antialiasingmatrix', 'u_offset']);

	    this.sdfShader = gl.initializeShader('sdf',
	        ['a_pos', 'a_offset', 'a_data1', 'a_data2'],
	        ['u_matrix', 'u_exmatrix', 'u_texture', 'u_texsize', 'u_color', 'u_gamma', 'u_buffer', 'u_zoom', 'u_fadedist', 'u_minfadezoom', 'u_maxfadezoom', 'u_fadezoom', 'u_skewed', 'u_extra']);

	    this.iconShader = gl.initializeShader('icon',
	        ['a_pos', 'a_offset', 'a_data1', 'a_data2'],
	        ['u_matrix', 'u_exmatrix', 'u_texture', 'u_texsize', 'u_zoom', 'u_fadedist', 'u_minfadezoom', 'u_maxfadezoom', 'u_fadezoom', 'u_opacity', 'u_skewed', 'u_extra']);

	    this.outlineShader = gl.initializeShader('outline',
	        ['a_pos'],
	        ['u_matrix', 'u_color', 'u_world']
	    );

	    this.patternShader = gl.initializeShader('pattern',
	        ['a_pos'],
	        ['u_matrix', 'u_pattern_tl_a', 'u_pattern_br_a', 'u_pattern_tl_b', 'u_pattern_br_b', 'u_mix', 'u_patternscale_a', 'u_patternscale_b', 'u_opacity', 'u_image', 'u_offset_a', 'u_offset_b']
	    );

	    this.fillShader = gl.initializeShader('fill',
	        ['a_pos'],
	        ['u_matrix', 'u_color']
	    );

	    this.collisionBoxShader = gl.initializeShader('collisionbox',
	        ['a_pos', 'a_extrude', 'a_data'],
	        ['u_matrix', 'u_scale', 'u_zoom', 'u_maxzoom']
	    );

	    this.identityMatrix = mat4.create();

	    // The backgroundBuffer is used when drawing to the full *canvas*
	    this.backgroundBuffer = gl.createBuffer();
	    this.backgroundBuffer.itemSize = 2;
	    this.backgroundBuffer.itemCount = 4;
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.backgroundBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, new Int16Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

	    // The tileExtentBuffer is used when drawing to a full *tile*
	    this.tileExtentBuffer = gl.createBuffer();
	    this.tileExtentBuffer.itemSize = 4;
	    this.tileExtentBuffer.itemCount = 4;
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.tileExtentBuffer);
	    gl.bufferData(
	        gl.ARRAY_BUFFER,
	        new Int16Array([
	            // tile coord x, tile coord y, texture coord x, texture coord y
	            0, 0, 0, 0,
	            EXTENT, 0, 32767, 0,
	            0, EXTENT, 0, 32767,
	            EXTENT, EXTENT,  32767, 32767
	        ]),
	        gl.STATIC_DRAW);

	    // The debugBuffer is used to draw tile outlines for debugging
	    this.debugBuffer = gl.createBuffer();
	    this.debugBuffer.itemSize = 2;
	    this.debugBuffer.itemCount = 5;
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.debugBuffer);
	    gl.bufferData(
	        gl.ARRAY_BUFFER,
	        new Int16Array([
	            0, 0, EXTENT, 0, EXTENT, EXTENT, 0, EXTENT, 0, 0]),
	        gl.STATIC_DRAW);

	    // The debugTextBuffer is used to draw tile IDs for debugging
	    this.debugTextBuffer = gl.createBuffer();
	    this.debugTextBuffer.itemSize = 2;
	};

	/*
	 * Reset the color buffers of the drawing canvas.
	 */
	Painter.prototype.clearColor = function() {
	    var gl = this.gl;
	    gl.clearColor(0, 0, 0, 0);
	    gl.clear(gl.COLOR_BUFFER_BIT);
	};

	/*
	 * Reset the drawing canvas by clearing the stencil buffer so that we can draw
	 * new tiles at the same location, while retaining previously drawn pixels.
	 */
	Painter.prototype.clearStencil = function() {
	    var gl = this.gl;
	    gl.clearStencil(0x0);
	    gl.stencilMask(0xFF);
	    gl.clear(gl.STENCIL_BUFFER_BIT);
	};

	Painter.prototype.clearDepth = function() {
	    var gl = this.gl;
	    gl.clearDepth(1);
	    this.depthMask(true);
	    gl.clear(gl.DEPTH_BUFFER_BIT);
	};

	Painter.prototype._renderTileClippingMasks = function(coords, sourceMaxZoom) {
	    var gl = this.gl;
	    gl.colorMask(false, false, false, false);
	    this.depthMask(false);
	    gl.disable(gl.DEPTH_TEST);
	    gl.enable(gl.STENCIL_TEST);

	    // Only write clipping IDs to the last 5 bits. The first three are used for drawing fills.
	    gl.stencilMask(0xF8);
	    // Tests will always pass, and ref value will be written to stencil buffer.
	    gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);

	    var idNext = 1;
	    this._tileClippingMaskIDs = {};
	    for (var i = 0; i < coords.length; i++) {
	        var coord = coords[i];
	        var id = this._tileClippingMaskIDs[coord.id] = (idNext++) << 3;

	        gl.stencilFunc(gl.ALWAYS, id, 0xF8);

	        gl.switchShader(this.fillShader, this.calculatePosMatrix(coord, sourceMaxZoom));

	        // Draw the clipping mask
	        gl.bindBuffer(gl.ARRAY_BUFFER, this.tileExtentBuffer);
	        gl.vertexAttribPointer(this.fillShader.a_pos, this.tileExtentBuffer.itemSize, gl.SHORT, false, 8, 0);
	        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.tileExtentBuffer.itemCount);
	    }

	    gl.stencilMask(0x00);
	    gl.colorMask(true, true, true, true);
	    this.depthMask(true);
	    gl.enable(gl.DEPTH_TEST);
	};

	Painter.prototype.enableTileClippingMask = function(coord) {
	    var gl = this.gl;
	    gl.stencilFunc(gl.EQUAL, this._tileClippingMaskIDs[coord.id], 0xF8);
	};

	// Overridden by headless tests.
	Painter.prototype.prepareBuffers = function() {};
	Painter.prototype.bindDefaultFramebuffer = function() {
	    var gl = this.gl;
	    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	};

	var draw = {
	    symbol: __webpack_require__(145),
	    circle: __webpack_require__(147),
	    line: __webpack_require__(148),
	    fill: __webpack_require__(149),
	    raster: __webpack_require__(150),
	    background: __webpack_require__(151),
	    debug: __webpack_require__(152)
	};

	Painter.prototype.render = function(style, options) {
	    this.style = style;
	    this.options = options;

	    this.lineAtlas = style.lineAtlas;

	    this.spriteAtlas = style.spriteAtlas;
	    this.spriteAtlas.setSprite(style.sprite);

	    this.glyphSource = style.glyphSource;

	    this.frameHistory.record(this.transform.zoom);

	    this.prepareBuffers();
	    this.clearColor();
	    this.clearDepth();

	    this.depthRange = (style._order.length + 2) * this.numSublayers * this.depthEpsilon;

	    this.renderPass({isOpaquePass: true});
	    this.renderPass({isOpaquePass: false});
	};

	Painter.prototype.renderPass = function(options) {
	    var groups = this.style._groups;
	    var isOpaquePass = options.isOpaquePass;
	    this.currentLayer = isOpaquePass ? this.style._order.length : -1;

	    for (var i = 0; i < groups.length; i++) {
	        var group = groups[isOpaquePass ? groups.length - 1 - i : i];
	        var source = this.style.sources[group.source];

	        var coords = [];
	        if (source) {
	            coords = source.getVisibleCoordinates();
	            this.clearStencil();
	            if (source.prepare) source.prepare();
	            if (source.isTileClipped) {
	                this._renderTileClippingMasks(coords, source.maxzoom);
	            }
	        }

	        if (isOpaquePass) {
	            this.gl.disable(this.gl.BLEND);
	            this.isOpaquePass = true;
	        } else {
	            this.gl.enable(this.gl.BLEND);
	            this.isOpaquePass = false;
	            coords.reverse();
	        }

	        for (var j = 0; j < group.length; j++) {
	            var layer = group[isOpaquePass ? group.length - 1 - j : j];
	            this.currentLayer += isOpaquePass ? -1 : 1;
	            this.renderLayer(this, source, layer, coords);
	        }

	        if (source) {
	            draw.debug(this, source, coords);
	        }
	    }
	};

	Painter.prototype.depthMask = function(mask) {
	    if (mask !== this._depthMask) {
	        this._depthMask = mask;
	        this.gl.depthMask(mask);
	    }
	};

	Painter.prototype.renderLayer = function(painter, source, layer, coords) {
	    if (layer.isHidden(this.transform.zoom)) return;
	    if (layer.type !== 'background' && !coords.length) return;
	    draw[layer.type](painter, source, layer, coords);
	};

	// Draws non-opaque areas. This is for debugging purposes.
	Painter.prototype.drawStencilBuffer = function() {
	    var gl = this.gl;
	    gl.switchShader(this.fillShader, this.identityMatrix);

	    gl.stencilMask(0x00);
	    gl.stencilFunc(gl.EQUAL, 0x80, 0x80);

	    // Drw the filling quad where the stencil buffer isn't set.
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.backgroundBuffer);
	    gl.vertexAttribPointer(this.fillShader.a_pos, this.backgroundBuffer.itemSize, gl.SHORT, false, 0, 0);

	    gl.uniform4fv(this.fillShader.u_color, [0, 0, 0, 0.5]);
	    gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.tileExtentBuffer.itemCount);
	};

	Painter.prototype.setDepthSublayer = function(n) {
	    var farDepth = 1 - ((1 + this.currentLayer) * this.numSublayers + n) * this.depthEpsilon;
	    var nearDepth = farDepth - 1 + this.depthRange;
	    this.gl.depthRange(nearDepth, farDepth);
	};

	Painter.prototype.translatePosMatrix = function(matrix, tile, translate, anchor) {
	    if (!translate[0] && !translate[1]) return matrix;

	    if (anchor === 'viewport') {
	        var sinA = Math.sin(-this.transform.angle);
	        var cosA = Math.cos(-this.transform.angle);
	        translate = [
	            translate[0] * cosA - translate[1] * sinA,
	            translate[0] * sinA + translate[1] * cosA
	        ];
	    }

	    var translation = [
	        tile.pixelsToTileUnits(translate[0], this.transform.zoom),
	        tile.pixelsToTileUnits(translate[1], this.transform.zoom),
	        0
	    ];

	    var translatedMatrix = new Float32Array(16);
	    mat4.translate(translatedMatrix, matrix, translation);
	    return translatedMatrix;
	};

	/**
	 * Calculate the posMatrix that this tile uses to display itself in a map,
	 * given a coordinate as (z, x, y) and a transform
	 * @param {Object} transform
	 * @private
	 */
	Painter.prototype.calculatePosMatrix = function(coord, maxZoom) {

	    if (coord instanceof TileCoord) {
	        coord = coord.toCoordinate();
	    }
	    var transform = this.transform;

	    if (maxZoom === undefined) maxZoom = Infinity;

	    // Initialize model-view matrix that converts from the tile coordinates
	    // to screen coordinates.

	    // if z > maxzoom then the tile is actually a overscaled maxzoom tile,
	    // so calculate the matrix the maxzoom tile would use.
	    var z = Math.min(coord.zoom, maxZoom);
	    var x = coord.column;
	    var y = coord.row;

	    var scale = transform.worldSize / Math.pow(2, z);

	    // The position matrix
	    var posMatrix = new Float64Array(16);

	    mat4.identity(posMatrix);
	    mat4.translate(posMatrix, posMatrix, [x * scale, y * scale, 0]);
	    mat4.scale(posMatrix, posMatrix, [ scale / EXTENT, scale / EXTENT, 1 ]);
	    mat4.multiply(posMatrix, transform.projMatrix, posMatrix);

	    return new Float32Array(posMatrix);
	};

	Painter.prototype.saveTexture = function(texture) {
	    var textures = this.reusableTextures[texture.size];
	    if (!textures) {
	        this.reusableTextures[texture.size] = [texture];
	    } else {
	        textures.push(texture);
	    }
	};


	Painter.prototype.getTexture = function(size) {
	    var textures = this.reusableTextures[size];
	    return textures && textures.length > 0 ? textures.pop() : null;
	};


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	var shaders = __webpack_require__(132);
	var util = __webpack_require__(11);

	exports.extend = function(context) {
	    var origLineWidth = context.lineWidth,
	        lineWidthRange = context.getParameter(context.ALIASED_LINE_WIDTH_RANGE);

	    context.lineWidth = function(width) {
	        origLineWidth.call(context, util.clamp(width, lineWidthRange[0], lineWidthRange[1]));
	    };

	    context.getShader = function(name, type) {
	        var kind = type === this.FRAGMENT_SHADER ? 'fragment' : 'vertex';
	        if (!shaders[name] || !shaders[name][kind]) {
	            throw new Error("Could not find shader " + name);
	        }

	        var shader = this.createShader(type);
	        var shaderSource = shaders[name][kind];

	        if (typeof orientation === 'undefined') {
	            // only use highp precision on mobile browsers
	            shaderSource = shaderSource.replace(/ highp /g, ' ');
	        }

	        this.shaderSource(shader, shaderSource);
	        this.compileShader(shader);
	        if (!this.getShaderParameter(shader, this.COMPILE_STATUS)) {
	            throw new Error(this.getShaderInfoLog(shader));
	        }
	        return shader;
	    };

	    context.initializeShader = function(name, attributes, uniforms) {
	        var shader = {
	            program: this.createProgram(),
	            fragment: this.getShader(name, this.FRAGMENT_SHADER),
	            vertex: this.getShader(name, this.VERTEX_SHADER),
	            attributes: []
	        };
	        this.attachShader(shader.program, shader.vertex);
	        this.attachShader(shader.program, shader.fragment);
	        this.linkProgram(shader.program);

	        if (!this.getProgramParameter(shader.program, this.LINK_STATUS)) {
	            console.error(this.getProgramInfoLog(shader.program));
	        } else {
	            for (var i = 0; i < attributes.length; i++) {
	                shader[attributes[i]] = this.getAttribLocation(shader.program, attributes[i]);
	                shader.attributes.push(shader[attributes[i]]);
	            }
	            for (var k = 0; k < uniforms.length; k++) {
	                shader[uniforms[k]] = this.getUniformLocation(shader.program, uniforms[k]);
	            }
	        }

	        return shader;
	    };

	    // Switches to a different shader program.
	    context.switchShader = function(shader, posMatrix, exMatrix) {
	        if (this.currentShader !== shader) {
	            this.useProgram(shader.program);

	            // Disable all attributes from the existing shader that aren't used in
	            // the new shader. Note: attribute indices are *not* program specific!
	            var enabled = this.currentShader ? this.currentShader.attributes : [];
	            var required = shader.attributes;

	            for (var i = 0; i < enabled.length; i++) {
	                if (required.indexOf(enabled[i]) < 0) {
	                    this.disableVertexAttribArray(enabled[i]);
	                }
	            }

	            // Enable all attributes for the new shader.
	            for (var j = 0; j < required.length; j++) {
	                if (enabled.indexOf(required[j]) < 0) {
	                    this.enableVertexAttribArray(required[j]);
	                }
	            }

	            this.currentShader = shader;
	        }

	        if (posMatrix !== undefined) context.setPosMatrix(posMatrix);
	        if (exMatrix !== undefined) context.setExMatrix(exMatrix);
	    };

	    // Update the matrices if necessary. Note: This relies on object identity!
	    // This means changing the matrix values without the actual matrix object
	    // will FAIL to update the matrix properly.
	    context.setPosMatrix = function(posMatrix) {
	        var shader = this.currentShader;
	        if (shader.posMatrix !== posMatrix) {
	            this.uniformMatrix4fv(shader.u_matrix, false, posMatrix);
	            shader.posMatrix = posMatrix;
	        }
	    };

	    // Update the matrices if necessary. Note: This relies on object identity!
	    // This means changing the matrix values without the actual matrix object
	    // will FAIL to update the matrix properly.
	    context.setExMatrix = function(exMatrix) {
	        var shader = this.currentShader;
	        if (exMatrix && shader.exMatrix !== exMatrix && shader.u_exmatrix) {
	            this.uniformMatrix4fv(shader.u_exmatrix, false, exMatrix);
	            shader.exMatrix = exMatrix;
	        }
	    };

	    context.vertexAttrib2fv = function(attribute, values) {
	        context.vertexAttrib2f(attribute, values[0], values[1]);
	    };

	    context.vertexAttrib3fv = function(attribute, values) {
	        context.vertexAttrib3f(attribute, values[0], values[1], values[2]);
	    };

	    context.vertexAttrib4fv = function(attribute, values) {
	        context.vertexAttrib4f(attribute, values[0], values[1], values[2], values[3]);
	    };

	    return context;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	var path = __webpack_require__(133);

	// Must be written out long-form for brfs.
	module.exports = {
	    debug: {
	        fragment: "precision mediump float;\n\nuniform vec4 u_color;\n\nvoid main() {\n    gl_FragColor = u_color;\n}\n",
	        vertex: "precision mediump float;\n\nattribute vec2 a_pos;\n\nuniform highp mat4 u_matrix;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(a_pos, step(32767.0, a_pos.x), 1);\n}\n"
	    },
	    fill: {
	        fragment: "precision mediump float;\n\nuniform vec4 u_color;\n\nvoid main() {\n    gl_FragColor = u_color;\n}\n",
	        vertex: "precision mediump float;\n\nattribute vec2 a_pos;\nuniform highp mat4 u_matrix;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n}\n"
	    },
	    circle: {
	        fragment: "precision mediump float;\n\nuniform vec4 u_color;\nuniform float u_blur;\nuniform float u_size;\n\nvarying vec2 v_extrude;\n\nvoid main() {\n    float t = smoothstep(1.0 - u_blur, 1.0, length(v_extrude));\n    gl_FragColor = u_color * (1.0 - t);\n}\n",
	        vertex: "precision mediump float;\n\n// set by gl_util\nuniform float u_size;\n\nattribute vec2 a_pos;\n\nuniform highp mat4 u_matrix;\nuniform mat4 u_exmatrix;\n\nvarying vec2 v_extrude;\n\nvoid main(void) {\n    // unencode the extrusion vector that we snuck into the a_pos vector\n    v_extrude = vec2(mod(a_pos, 2.0) * 2.0 - 1.0);\n\n    vec4 extrude = u_exmatrix * vec4(v_extrude * u_size, 0, 0);\n    // multiply a_pos by 0.5, since we had it * 2 in order to sneak\n    // in extrusion data\n    gl_Position = u_matrix * vec4(floor(a_pos * 0.5), 0, 1);\n\n    // gl_Position is divided by gl_Position.w after this shader runs.\n    // Multiply the extrude by it so that it isn't affected by it.\n    gl_Position += extrude * gl_Position.w;\n}\n"
	    },
	    line: {
	        fragment: "precision mediump float;\n\nuniform vec2 u_linewidth;\nuniform vec4 u_color;\nuniform float u_blur;\n\nvarying vec2 v_normal;\nvarying float v_linesofar;\nvarying float v_gamma_scale;\n\nvoid main() {\n    // Calculate the distance of the pixel from the line in pixels.\n    float dist = length(v_normal) * u_linewidth.s;\n\n    // Calculate the antialiasing fade factor. This is either when fading in\n    // the line in case of an offset line (v_linewidth.t) or when fading out\n    // (v_linewidth.s)\n    float blur = u_blur * v_gamma_scale;\n    float alpha = clamp(min(dist - (u_linewidth.t - blur), u_linewidth.s - dist) / blur, 0.0, 1.0);\n\n    gl_FragColor = u_color * alpha;\n}\n",
	        vertex: "precision mediump float;\n\n// floor(127 / 2) == 63.0\n// the maximum allowed miter limit is 2.0 at the moment. the extrude normal is\n// stored in a byte (-128..127). we scale regular normals up to length 63, but\n// there are also \"special\" normals that have a bigger length (of up to 126 in\n// this case).\n// #define scale 63.0\n#define scale 0.015873016\n\nattribute vec2 a_pos;\nattribute vec4 a_data;\n\nuniform highp mat4 u_matrix;\nuniform float u_ratio;\nuniform vec2 u_linewidth;\nuniform float u_extra;\nuniform mat2 u_antialiasingmatrix;\nuniform float u_offset;\n\nvarying vec2 v_normal;\nvarying float v_linesofar;\nvarying float v_gamma_scale;\n\nvoid main() {\n    vec2 a_extrude = a_data.xy;\n    float a_direction = sign(a_data.z) * mod(a_data.z, 2.0);\n\n    // We store the texture normals in the most insignificant bit\n    // transform y so that 0 => -1 and 1 => 1\n    // In the texture normal, x is 0 if the normal points straight up/down and 1 if it's a round cap\n    // y is 1 if the normal points up, and -1 if it points down\n    vec2 normal = mod(a_pos, 2.0);\n    normal.y = sign(normal.y - 0.5);\n    v_normal = normal;\n\n    // Scale the extrusion vector down to a normal and then up by the line width\n    // of this vertex.\n    vec4 dist = vec4(u_linewidth.s * a_extrude * scale, 0.0, 0.0);\n\n    // Calculate the offset when drawing a line that is to the side of the actual line.\n    // We do this by creating a vector that points towards the extrude, but rotate\n    // it when we're drawing round end points (a_direction = -1 or 1) since their\n    // extrude vector points in another direction.\n    float u = 0.5 * a_direction;\n    float t = 1.0 - abs(u);\n    vec2 offset = u_offset * a_extrude * scale * normal.y * mat2(t, -u, u, t);\n\n    // Remove the texture normal bit of the position before scaling it with the\n    // model/view matrix.\n    gl_Position = u_matrix * vec4(floor(a_pos * 0.5) + (offset + dist.xy) / u_ratio, 0.0, 1.0);\n\n    // position of y on the screen\n    float y = gl_Position.y / gl_Position.w;\n\n    // how much features are squished in the y direction by the tilt\n    float squish_scale = length(a_extrude) / length(u_antialiasingmatrix * a_extrude);\n\n    // how much features are squished in all directions by the perspectiveness\n    float perspective_scale = 1.0 / (1.0 - min(y * u_extra, 0.9));\n\n    v_gamma_scale = perspective_scale * squish_scale;\n}\n"
	    },
	    linepattern: {
	        fragment: "precision mediump float;\n\nuniform vec2 u_linewidth;\nuniform float u_point;\nuniform float u_blur;\n\nuniform vec2 u_pattern_size_a;\nuniform vec2 u_pattern_size_b;\nuniform vec2 u_pattern_tl_a;\nuniform vec2 u_pattern_br_a;\nuniform vec2 u_pattern_tl_b;\nuniform vec2 u_pattern_br_b;\nuniform float u_fade;\nuniform float u_opacity;\n\nuniform sampler2D u_image;\n\nvarying vec2 v_normal;\nvarying float v_linesofar;\nvarying float v_gamma_scale;\n\nvoid main() {\n    // Calculate the distance of the pixel from the line in pixels.\n    float dist = length(v_normal) * u_linewidth.s;\n\n    // Calculate the antialiasing fade factor. This is either when fading in\n    // the line in case of an offset line (v_linewidth.t) or when fading out\n    // (v_linewidth.s)\n    float blur = u_blur * v_gamma_scale;\n    float alpha = clamp(min(dist - (u_linewidth.t - blur), u_linewidth.s - dist) / blur, 0.0, 1.0);\n\n    float x_a = mod(v_linesofar / u_pattern_size_a.x, 1.0);\n    float x_b = mod(v_linesofar / u_pattern_size_b.x, 1.0);\n    float y_a = 0.5 + (v_normal.y * u_linewidth.s / u_pattern_size_a.y);\n    float y_b = 0.5 + (v_normal.y * u_linewidth.s / u_pattern_size_b.y);\n    vec2 pos = mix(u_pattern_tl_a, u_pattern_br_a, vec2(x_a, y_a));\n    vec2 pos2 = mix(u_pattern_tl_b, u_pattern_br_b, vec2(x_b, y_b));\n\n    vec4 color = mix(texture2D(u_image, pos), texture2D(u_image, pos2), u_fade);\n\n    alpha *= u_opacity;\n\n    gl_FragColor = color * alpha;\n}\n",
	        vertex: "precision mediump float;\n\n// floor(127 / 2) == 63.0\n// the maximum allowed miter limit is 2.0 at the moment. the extrude normal is\n// stored in a byte (-128..127). we scale regular normals up to length 63, but\n// there are also \"special\" normals that have a bigger length (of up to 126 in\n// this case).\n// #define scale 63.0\n#define scale 0.015873016\n\nattribute vec2 a_pos;\nattribute vec4 a_data;\n\nuniform highp mat4 u_matrix;\nuniform float u_ratio;\nuniform vec2 u_linewidth;\nuniform vec4 u_color;\nuniform float u_extra;\nuniform mat2 u_antialiasingmatrix;\nuniform float u_offset;\n\nvarying vec2 v_normal;\nvarying float v_linesofar;\nvarying float v_gamma_scale;\n\nvoid main() {\n    vec2 a_extrude = a_data.xy;\n    float a_direction = sign(a_data.z) * mod(a_data.z, 2.0);\n    float a_linesofar = abs(floor(a_data.z / 2.0)) + a_data.w * 64.0;\n\n    // We store the texture normals in the most insignificant bit\n    // transform y so that 0 => -1 and 1 => 1\n    // In the texture normal, x is 0 if the normal points straight up/down and 1 if it's a round cap\n    // y is 1 if the normal points up, and -1 if it points down\n    vec2 normal = mod(a_pos, 2.0);\n    normal.y = sign(normal.y - 0.5);\n    v_normal = normal;\n\n    // Scale the extrusion vector down to a normal and then up by the line width\n    // of this vertex.\n    vec2 extrude = a_extrude * scale;\n    vec2 dist = u_linewidth.s * extrude;\n\n    // Calculate the offset when drawing a line that is to the side of the actual line.\n    // We do this by creating a vector that points towards the extrude, but rotate\n    // it when we're drawing round end points (a_direction = -1 or 1) since their\n    // extrude vector points in another direction.\n    float u = 0.5 * a_direction;\n    float t = 1.0 - abs(u);\n    vec2 offset = u_offset * a_extrude * scale * normal.y * mat2(t, -u, u, t);\n\n    // Remove the texture normal bit of the position before scaling it with the\n    // model/view matrix.\n    gl_Position = u_matrix * vec4(floor(a_pos * 0.5) + (offset + dist.xy) / u_ratio, 0.0, 1.0);\n    v_linesofar = a_linesofar;\n\n    // position of y on the screen\n    float y = gl_Position.y / gl_Position.w;\n\n    // how much features are squished in the y direction by the tilt\n    float squish_scale = length(a_extrude) / length(u_antialiasingmatrix * a_extrude);\n\n    // how much features are squished in all directions by the perspectiveness\n    float perspective_scale = 1.0 / (1.0 - min(y * u_extra, 0.9));\n\n    v_gamma_scale = perspective_scale * squish_scale;\n}\n"
	    },
	    linesdfpattern: {
	        fragment: "precision mediump float;\n\nuniform vec2 u_linewidth;\nuniform vec4 u_color;\nuniform float u_blur;\nuniform sampler2D u_image;\nuniform float u_sdfgamma;\nuniform float u_mix;\n\nvarying vec2 v_normal;\nvarying vec2 v_tex_a;\nvarying vec2 v_tex_b;\nvarying float v_gamma_scale;\n\nvoid main() {\n    // Calculate the distance of the pixel from the line in pixels.\n    float dist = length(v_normal) * u_linewidth.s;\n\n    // Calculate the antialiasing fade factor. This is either when fading in\n    // the line in case of an offset line (v_linewidth.t) or when fading out\n    // (v_linewidth.s)\n    float blur = u_blur * v_gamma_scale;\n    float alpha = clamp(min(dist - (u_linewidth.t - blur), u_linewidth.s - dist) / blur, 0.0, 1.0);\n\n    float sdfdist_a = texture2D(u_image, v_tex_a).a;\n    float sdfdist_b = texture2D(u_image, v_tex_b).a;\n    float sdfdist = mix(sdfdist_a, sdfdist_b, u_mix);\n    alpha *= smoothstep(0.5 - u_sdfgamma, 0.5 + u_sdfgamma, sdfdist);\n\n    gl_FragColor = u_color * alpha;\n}\n",
	        vertex: "precision mediump float;\n\n// floor(127 / 2) == 63.0\n// the maximum allowed miter limit is 2.0 at the moment. the extrude normal is\n// stored in a byte (-128..127). we scale regular normals up to length 63, but\n// there are also \"special\" normals that have a bigger length (of up to 126 in\n// this case).\n// #define scale 63.0\n#define scale 0.015873016\n\nattribute vec2 a_pos;\nattribute vec4 a_data;\n\nuniform highp mat4 u_matrix;\nuniform vec2 u_linewidth;\nuniform float u_ratio;\nuniform vec2 u_patternscale_a;\nuniform float u_tex_y_a;\nuniform vec2 u_patternscale_b;\nuniform float u_tex_y_b;\nuniform float u_extra;\nuniform mat2 u_antialiasingmatrix;\nuniform float u_offset;\n\nvarying vec2 v_normal;\nvarying vec2 v_tex_a;\nvarying vec2 v_tex_b;\nvarying float v_gamma_scale;\n\nvoid main() {\n    vec2 a_extrude = a_data.xy;\n    float a_direction = sign(a_data.z) * mod(a_data.z, 2.0);\n    float a_linesofar = abs(floor(a_data.z / 2.0)) + a_data.w * 64.0;\n\n    // We store the texture normals in the most insignificant bit\n    // transform y so that 0 => -1 and 1 => 1\n    // In the texture normal, x is 0 if the normal points straight up/down and 1 if it's a round cap\n    // y is 1 if the normal points up, and -1 if it points down\n    vec2 normal = mod(a_pos, 2.0);\n    normal.y = sign(normal.y - 0.5);\n    v_normal = normal;\n\n    // Scale the extrusion vector down to a normal and then up by the line width\n    // of this vertex.\n    vec4 dist = vec4(u_linewidth.s * a_extrude * scale, 0.0, 0.0);\n\n    // Calculate the offset when drawing a line that is to the side of the actual line.\n    // We do this by creating a vector that points towards the extrude, but rotate\n    // it when we're drawing round end points (a_direction = -1 or 1) since their\n    // extrude vector points in another direction.\n    float u = 0.5 * a_direction;\n    float t = 1.0 - abs(u);\n    vec2 offset = u_offset * a_extrude * scale * normal.y * mat2(t, -u, u, t);\n\n    // Remove the texture normal bit of the position before scaling it with the\n    // model/view matrix.\n    gl_Position = u_matrix * vec4(floor(a_pos * 0.5) + (offset + dist.xy) / u_ratio, 0.0, 1.0);\n\n    v_tex_a = vec2(a_linesofar * u_patternscale_a.x, normal.y * u_patternscale_a.y + u_tex_y_a);\n    v_tex_b = vec2(a_linesofar * u_patternscale_b.x, normal.y * u_patternscale_b.y + u_tex_y_b);\n\n    // position of y on the screen\n    float y = gl_Position.y / gl_Position.w;\n\n    // how much features are squished in the y direction by the tilt\n    float squish_scale = length(a_extrude) / length(u_antialiasingmatrix * a_extrude);\n\n    // how much features are squished in all directions by the perspectiveness\n    float perspective_scale = 1.0 / (1.0 - min(y * u_extra, 0.9));\n\n    v_gamma_scale = perspective_scale * squish_scale;\n}\n"
	    },
	    outline: {
	        fragment: "precision mediump float;\n\nuniform vec4 u_color;\n\nvarying vec2 v_pos;\n\nvoid main() {\n    float dist = length(v_pos - gl_FragCoord.xy);\n    float alpha = smoothstep(1.0, 0.0, dist);\n    gl_FragColor = u_color * alpha;\n}\n",
	        vertex: "precision mediump float;\n\nattribute vec2 a_pos;\n\nuniform highp mat4 u_matrix;\nuniform vec2 u_world;\n\nvarying vec2 v_pos;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n    v_pos = (gl_Position.xy/gl_Position.w + 1.0) / 2.0 * u_world;\n}\n"
	    },
	    pattern: {
	        fragment: "precision mediump float;\n\nuniform float u_opacity;\nuniform vec2 u_pattern_tl_a;\nuniform vec2 u_pattern_br_a;\nuniform vec2 u_pattern_tl_b;\nuniform vec2 u_pattern_br_b;\nuniform float u_mix;\n\nuniform sampler2D u_image;\n\nvarying vec2 v_pos_a;\nvarying vec2 v_pos_b;\n\nvoid main() {\n\n    vec2 imagecoord = mod(v_pos_a, 1.0);\n    vec2 pos = mix(u_pattern_tl_a, u_pattern_br_a, imagecoord);\n    vec4 color1 = texture2D(u_image, pos);\n\n    vec2 imagecoord_b = mod(v_pos_b, 1.0);\n    vec2 pos2 = mix(u_pattern_tl_b, u_pattern_br_b, imagecoord_b);\n    vec4 color2 = texture2D(u_image, pos2);\n\n    gl_FragColor = mix(color1, color2, u_mix) * u_opacity;\n}\n",
	        vertex: "precision mediump float;\n\nuniform highp mat4 u_matrix;\nuniform vec2 u_patternscale_a;\nuniform vec2 u_patternscale_b;\nuniform vec2 u_offset_a;\nuniform vec2 u_offset_b;\n\nattribute vec2 a_pos;\n\nvarying vec2 v_pos_a;\nvarying vec2 v_pos_b;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n    v_pos_a = u_patternscale_a * a_pos + u_offset_a;\n    v_pos_b = u_patternscale_b * a_pos + u_offset_b;\n}\n"
	    },
	    raster: {
	        fragment: "precision mediump float;\n\nuniform float u_opacity0;\nuniform float u_opacity1;\nuniform sampler2D u_image0;\nuniform sampler2D u_image1;\nvarying vec2 v_pos0;\nvarying vec2 v_pos1;\n\nuniform float u_brightness_low;\nuniform float u_brightness_high;\n\nuniform float u_saturation_factor;\nuniform float u_contrast_factor;\nuniform vec3 u_spin_weights;\n\nvoid main() {\n\n    // read and cross-fade colors from the main and parent tiles\n    vec4 color0 = texture2D(u_image0, v_pos0);\n    vec4 color1 = texture2D(u_image1, v_pos1);\n    vec4 color = color0 * u_opacity0 + color1 * u_opacity1;\n    vec3 rgb = color.rgb;\n\n    // spin\n    rgb = vec3(\n        dot(rgb, u_spin_weights.xyz),\n        dot(rgb, u_spin_weights.zxy),\n        dot(rgb, u_spin_weights.yzx));\n\n    // saturation\n    float average = (color.r + color.g + color.b) / 3.0;\n    rgb += (average - rgb) * u_saturation_factor;\n\n    // contrast\n    rgb = (rgb - 0.5) * u_contrast_factor + 0.5;\n\n    // brightness\n    vec3 u_high_vec = vec3(u_brightness_low, u_brightness_low, u_brightness_low);\n    vec3 u_low_vec = vec3(u_brightness_high, u_brightness_high, u_brightness_high);\n\n    gl_FragColor = vec4(mix(u_high_vec, u_low_vec, rgb), color.a);\n}\n",
	        vertex: "precision mediump float;\n\nuniform highp mat4 u_matrix;\nuniform vec2 u_tl_parent;\nuniform float u_scale_parent;\nuniform float u_buffer_scale;\n\nattribute vec2 a_pos;\nattribute vec2 a_texture_pos;\n\nvarying vec2 v_pos0;\nvarying vec2 v_pos1;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(a_pos, 0, 1);\n    v_pos0 = (((a_texture_pos / 32767.0) - 0.5) / u_buffer_scale ) + 0.5;\n    v_pos1 = (v_pos0 * u_scale_parent) + u_tl_parent;\n}\n"
	    },
	    icon: {
	        fragment: "precision mediump float;\n\nuniform sampler2D u_texture;\n\nvarying vec2 v_tex;\nvarying float v_alpha;\n\nvoid main() {\n    gl_FragColor = texture2D(u_texture, v_tex) * v_alpha;\n}\n",
	        vertex: "precision mediump float;\n\nattribute vec2 a_pos;\nattribute vec2 a_offset;\nattribute vec4 a_data1;\nattribute vec4 a_data2;\n\n\n// matrix is for the vertex position, exmatrix is for rotating and projecting\n// the extrusion vector.\nuniform highp mat4 u_matrix;\nuniform mat4 u_exmatrix;\nuniform float u_zoom;\nuniform float u_fadedist;\nuniform float u_minfadezoom;\nuniform float u_maxfadezoom;\nuniform float u_fadezoom;\nuniform float u_opacity;\nuniform bool u_skewed;\nuniform float u_extra;\n\nuniform vec2 u_texsize;\n\nvarying vec2 v_tex;\nvarying float v_alpha;\n\nvoid main() {\n    vec2 a_tex = a_data1.xy;\n    float a_labelminzoom = a_data1[2];\n    vec2 a_zoom = a_data2.st;\n    float a_minzoom = a_zoom[0];\n    float a_maxzoom = a_zoom[1];\n\n    float a_fadedist = 10.0;\n\n    // u_zoom is the current zoom level adjusted for the change in font size\n    float z = 2.0 - step(a_minzoom, u_zoom) - (1.0 - step(a_maxzoom, u_zoom));\n\n    // fade out labels\n    float alpha = clamp((u_fadezoom - a_labelminzoom) / u_fadedist, 0.0, 1.0);\n\n    if (u_fadedist >= 0.0) {\n        v_alpha = alpha;\n    } else {\n        v_alpha = 1.0 - alpha;\n    }\n    if (u_maxfadezoom < a_labelminzoom) {\n        v_alpha = 0.0;\n    }\n    if (u_minfadezoom >= a_labelminzoom) {\n        v_alpha = 1.0;\n    }\n\n    // if label has been faded out, clip it\n    z += step(v_alpha, 0.0);\n\n    if (u_skewed) {\n        vec4 extrude = u_exmatrix * vec4(a_offset / 64.0, 0, 0);\n        gl_Position = u_matrix * vec4(a_pos + extrude.xy, 0, 1);\n        gl_Position.z += z * gl_Position.w;\n    } else {\n        vec4 extrude = u_exmatrix * vec4(a_offset / 64.0, z, 0);\n        gl_Position = u_matrix * vec4(a_pos, 0, 1) + extrude;\n    }\n\n    v_tex = a_tex / u_texsize;\n\n    v_alpha *= u_opacity;\n}\n"
	    },
	    sdf: {
	        fragment: "precision mediump float;\n\nuniform sampler2D u_texture;\nuniform vec4 u_color;\nuniform float u_buffer;\nuniform float u_gamma;\n\nvarying vec2 v_tex;\nvarying float v_alpha;\nvarying float v_gamma_scale;\n\nvoid main() {\n    float gamma = u_gamma * v_gamma_scale;\n    float dist = texture2D(u_texture, v_tex).a;\n    float alpha = smoothstep(u_buffer - gamma, u_buffer + gamma, dist) * v_alpha;\n    gl_FragColor = u_color * alpha;\n}\n",
	        vertex: "precision mediump float;\n\nattribute vec2 a_pos;\nattribute vec2 a_offset;\nattribute vec4 a_data1;\nattribute vec4 a_data2;\n\n\n// matrix is for the vertex position, exmatrix is for rotating and projecting\n// the extrusion vector.\nuniform highp mat4 u_matrix;\nuniform mat4 u_exmatrix;\n\nuniform float u_zoom;\nuniform float u_fadedist;\nuniform float u_minfadezoom;\nuniform float u_maxfadezoom;\nuniform float u_fadezoom;\nuniform bool u_skewed;\nuniform float u_extra;\n\nuniform vec2 u_texsize;\n\nvarying vec2 v_tex;\nvarying float v_alpha;\nvarying float v_gamma_scale;\n\nvoid main() {\n    vec2 a_tex = a_data1.xy;\n    float a_labelminzoom = a_data1[2];\n    vec2 a_zoom = a_data2.st;\n    float a_minzoom = a_zoom[0];\n    float a_maxzoom = a_zoom[1];\n\n    // u_zoom is the current zoom level adjusted for the change in font size\n    float z = 2.0 - step(a_minzoom, u_zoom) - (1.0 - step(a_maxzoom, u_zoom));\n\n    // fade out labels\n    float alpha = clamp((u_fadezoom - a_labelminzoom) / u_fadedist, 0.0, 1.0);\n\n    if (u_fadedist >= 0.0) {\n        v_alpha = alpha;\n    } else {\n        v_alpha = 1.0 - alpha;\n    }\n    if (u_maxfadezoom < a_labelminzoom) {\n        v_alpha = 0.0;\n    }\n    if (u_minfadezoom >= a_labelminzoom) {\n        v_alpha = 1.0;\n    }\n\n    // if label has been faded out, clip it\n    z += step(v_alpha, 0.0);\n\n    if (u_skewed) {\n        vec4 extrude = u_exmatrix * vec4(a_offset / 64.0, 0, 0);\n        gl_Position = u_matrix * vec4(a_pos + extrude.xy, 0, 1);\n        gl_Position.z += z * gl_Position.w;\n    } else {\n        vec4 extrude = u_exmatrix * vec4(a_offset / 64.0, z, 0);\n        gl_Position = u_matrix * vec4(a_pos, 0, 1) + extrude;\n    }\n\n    // position of y on the screen\n    float y = gl_Position.y / gl_Position.w;\n    // how much features are squished in all directions by the perspectiveness\n    float perspective_scale = 1.0 / (1.0 - y * u_extra);\n    v_gamma_scale = perspective_scale;\n\n    v_tex = a_tex / u_texsize;\n}\n"
	    },
	    collisionbox: {
	        fragment: "precision mediump float;\n\nuniform float u_zoom;\nuniform float u_maxzoom;\n\nvarying float v_max_zoom;\nvarying float v_placement_zoom;\n\nvoid main() {\n\n    float alpha = 0.5;\n\n    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0) * alpha;\n\n    if (v_placement_zoom > u_zoom) {\n        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0) * alpha;\n    }\n\n    if (u_zoom >= v_max_zoom) {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) * alpha * 0.25;\n    }\n\n    if (v_placement_zoom >= u_maxzoom) {\n        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0) * alpha * 0.2;\n    }\n}\n",
	        vertex: "precision mediump float;\n\nattribute vec2 a_pos;\nattribute vec2 a_extrude;\nattribute vec2 a_data;\n\nuniform highp mat4 u_matrix;\nuniform float u_scale;\n\nvarying float v_max_zoom;\nvarying float v_placement_zoom;\n\nvoid main() {\n     gl_Position = u_matrix * vec4(a_pos + a_extrude / u_scale, 0.0, 1.0);\n\n     v_max_zoom = a_data.x;\n     v_placement_zoom = a_data.y;\n}\n"
	    }
	};


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview gl-matrix - High performance matrix and vector operations
	 * @author Brandon Jones
	 * @author Colin MacKenzie IV
	 * @version 2.3.0
	 */

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	// END HEADER

	exports.glMatrix = __webpack_require__(135);
	exports.mat2 = __webpack_require__(136);
	exports.mat2d = __webpack_require__(137);
	exports.mat3 = __webpack_require__(138);
	exports.mat4 = __webpack_require__(139);
	exports.quat = __webpack_require__(140);
	exports.vec2 = __webpack_require__(143);
	exports.vec3 = __webpack_require__(141);
	exports.vec4 = __webpack_require__(142);

/***/ },
/* 135 */
/***/ function(module, exports) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	/**
	 * @class Common utilities
	 * @name glMatrix
	 */
	var glMatrix = {};

	// Constants
	glMatrix.EPSILON = 0.000001;
	glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
	glMatrix.RANDOM = Math.random;

	/**
	 * Sets the type of array used when creating new vectors and matrices
	 *
	 * @param {Type} type Array type, such as Float32Array or Array
	 */
	glMatrix.setMatrixArrayType = function(type) {
	    GLMAT_ARRAY_TYPE = type;
	}

	var degree = Math.PI / 180;

	/**
	* Convert Degree To Radian
	*
	* @param {Number} Angle in Degrees
	*/
	glMatrix.toRadian = function(a){
	     return a * degree;
	}

	module.exports = glMatrix;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(135);

	/**
	 * @class 2x2 Matrix
	 * @name mat2
	 */
	var mat2 = {};

	/**
	 * Creates a new identity mat2
	 *
	 * @returns {mat2} a new 2x2 matrix
	 */
	mat2.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Creates a new mat2 initialized with values from an existing matrix
	 *
	 * @param {mat2} a matrix to clone
	 * @returns {mat2} a new 2x2 matrix
	 */
	mat2.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Copy the values from one mat2 to another
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Set a mat2 to the identity matrix
	 *
	 * @param {mat2} out the receiving matrix
	 * @returns {mat2} out
	 */
	mat2.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Transpose the values of a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a1 = a[1];
	        out[1] = a[2];
	        out[2] = a1;
	    } else {
	        out[0] = a[0];
	        out[1] = a[2];
	        out[2] = a[1];
	        out[3] = a[3];
	    }
	    
	    return out;
	};

	/**
	 * Inverts a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.invert = function(out, a) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

	        // Calculate the determinant
	        det = a0 * a3 - a2 * a1;

	    if (!det) {
	        return null;
	    }
	    det = 1.0 / det;
	    
	    out[0] =  a3 * det;
	    out[1] = -a1 * det;
	    out[2] = -a2 * det;
	    out[3] =  a0 * det;

	    return out;
	};

	/**
	 * Calculates the adjugate of a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.adjoint = function(out, a) {
	    // Caching this value is nessecary if out == a
	    var a0 = a[0];
	    out[0] =  a[3];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] =  a0;

	    return out;
	};

	/**
	 * Calculates the determinant of a mat2
	 *
	 * @param {mat2} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat2.determinant = function (a) {
	    return a[0] * a[3] - a[2] * a[1];
	};

	/**
	 * Multiplies two mat2's
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the first operand
	 * @param {mat2} b the second operand
	 * @returns {mat2} out
	 */
	mat2.multiply = function (out, a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
	    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	    out[0] = a0 * b0 + a2 * b1;
	    out[1] = a1 * b0 + a3 * b1;
	    out[2] = a0 * b2 + a2 * b3;
	    out[3] = a1 * b2 + a3 * b3;
	    return out;
	};

	/**
	 * Alias for {@link mat2.multiply}
	 * @function
	 */
	mat2.mul = mat2.multiply;

	/**
	 * Rotates a mat2 by the given angle
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2} out
	 */
	mat2.rotate = function (out, a, rad) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = a0 *  c + a2 * s;
	    out[1] = a1 *  c + a3 * s;
	    out[2] = a0 * -s + a2 * c;
	    out[3] = a1 * -s + a3 * c;
	    return out;
	};

	/**
	 * Scales the mat2 by the dimensions in the given vec2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the matrix to rotate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat2} out
	 **/
	mat2.scale = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0 * v0;
	    out[1] = a1 * v0;
	    out[2] = a2 * v1;
	    out[3] = a3 * v1;
	    return out;
	};

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2.identity(dest);
	 *     mat2.rotate(dest, dest, rad);
	 *
	 * @param {mat2} out mat2 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2} out
	 */
	mat2.fromRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = c;
	    out[1] = s;
	    out[2] = -s;
	    out[3] = c;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2.identity(dest);
	 *     mat2.scale(dest, dest, vec);
	 *
	 * @param {mat2} out mat2 receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat2} out
	 */
	mat2.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = v[1];
	    return out;
	}

	/**
	 * Returns a string representation of a mat2
	 *
	 * @param {mat2} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat2.str = function (a) {
	    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat2
	 *
	 * @param {mat2} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat2.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
	};

	/**
	 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
	 * @param {mat2} L the lower triangular matrix 
	 * @param {mat2} D the diagonal matrix 
	 * @param {mat2} U the upper triangular matrix 
	 * @param {mat2} a the input matrix to factorize
	 */

	mat2.LDU = function (L, D, U, a) { 
	    L[2] = a[2]/a[0]; 
	    U[0] = a[0]; 
	    U[1] = a[1]; 
	    U[3] = a[3] - L[2] * U[1]; 
	    return [L, D, U];       
	}; 


	module.exports = mat2;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(135);

	/**
	 * @class 2x3 Matrix
	 * @name mat2d
	 * 
	 * @description 
	 * A mat2d contains six elements defined as:
	 * <pre>
	 * [a, c, tx,
	 *  b, d, ty]
	 * </pre>
	 * This is a short form for the 3x3 matrix:
	 * <pre>
	 * [a, c, tx,
	 *  b, d, ty,
	 *  0, 0, 1]
	 * </pre>
	 * The last row is ignored so the array is shorter and operations are faster.
	 */
	var mat2d = {};

	/**
	 * Creates a new identity mat2d
	 *
	 * @returns {mat2d} a new 2x3 matrix
	 */
	mat2d.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(6);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	};

	/**
	 * Creates a new mat2d initialized with values from an existing matrix
	 *
	 * @param {mat2d} a matrix to clone
	 * @returns {mat2d} a new 2x3 matrix
	 */
	mat2d.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(6);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    return out;
	};

	/**
	 * Copy the values from one mat2d to another
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the source matrix
	 * @returns {mat2d} out
	 */
	mat2d.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    return out;
	};

	/**
	 * Set a mat2d to the identity matrix
	 *
	 * @param {mat2d} out the receiving matrix
	 * @returns {mat2d} out
	 */
	mat2d.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	};

	/**
	 * Inverts a mat2d
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the source matrix
	 * @returns {mat2d} out
	 */
	mat2d.invert = function(out, a) {
	    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
	        atx = a[4], aty = a[5];

	    var det = aa * ad - ab * ac;
	    if(!det){
	        return null;
	    }
	    det = 1.0 / det;

	    out[0] = ad * det;
	    out[1] = -ab * det;
	    out[2] = -ac * det;
	    out[3] = aa * det;
	    out[4] = (ac * aty - ad * atx) * det;
	    out[5] = (ab * atx - aa * aty) * det;
	    return out;
	};

	/**
	 * Calculates the determinant of a mat2d
	 *
	 * @param {mat2d} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat2d.determinant = function (a) {
	    return a[0] * a[3] - a[1] * a[2];
	};

	/**
	 * Multiplies two mat2d's
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the first operand
	 * @param {mat2d} b the second operand
	 * @returns {mat2d} out
	 */
	mat2d.multiply = function (out, a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
	    out[0] = a0 * b0 + a2 * b1;
	    out[1] = a1 * b0 + a3 * b1;
	    out[2] = a0 * b2 + a2 * b3;
	    out[3] = a1 * b2 + a3 * b3;
	    out[4] = a0 * b4 + a2 * b5 + a4;
	    out[5] = a1 * b4 + a3 * b5 + a5;
	    return out;
	};

	/**
	 * Alias for {@link mat2d.multiply}
	 * @function
	 */
	mat2d.mul = mat2d.multiply;

	/**
	 * Rotates a mat2d by the given angle
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2d} out
	 */
	mat2d.rotate = function (out, a, rad) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = a0 *  c + a2 * s;
	    out[1] = a1 *  c + a3 * s;
	    out[2] = a0 * -s + a2 * c;
	    out[3] = a1 * -s + a3 * c;
	    out[4] = a4;
	    out[5] = a5;
	    return out;
	};

	/**
	 * Scales the mat2d by the dimensions in the given vec2
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to translate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat2d} out
	 **/
	mat2d.scale = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0 * v0;
	    out[1] = a1 * v0;
	    out[2] = a2 * v1;
	    out[3] = a3 * v1;
	    out[4] = a4;
	    out[5] = a5;
	    return out;
	};

	/**
	 * Translates the mat2d by the dimensions in the given vec2
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to translate
	 * @param {vec2} v the vec2 to translate the matrix by
	 * @returns {mat2d} out
	 **/
	mat2d.translate = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0;
	    out[1] = a1;
	    out[2] = a2;
	    out[3] = a3;
	    out[4] = a0 * v0 + a2 * v1 + a4;
	    out[5] = a1 * v0 + a3 * v1 + a5;
	    return out;
	};

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.rotate(dest, dest, rad);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2d} out
	 */
	mat2d.fromRotation = function(out, rad) {
	    var s = Math.sin(rad), c = Math.cos(rad);
	    out[0] = c;
	    out[1] = s;
	    out[2] = -s;
	    out[3] = c;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.scale(dest, dest, vec);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat2d} out
	 */
	mat2d.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = v[1];
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	}

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.translate(dest, dest, vec);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {vec2} v Translation vector
	 * @returns {mat2d} out
	 */
	mat2d.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = v[0];
	    out[5] = v[1];
	    return out;
	}

	/**
	 * Returns a string representation of a mat2d
	 *
	 * @param {mat2d} a matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat2d.str = function (a) {
	    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
	                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat2d
	 *
	 * @param {mat2d} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat2d.frob = function (a) { 
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
	}; 

	module.exports = mat2d;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(135);

	/**
	 * @class 3x3 Matrix
	 * @name mat3
	 */
	var mat3 = {};

	/**
	 * Creates a new identity mat3
	 *
	 * @returns {mat3} a new 3x3 matrix
	 */
	mat3.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(9);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	};

	/**
	 * Copies the upper-left 3x3 values into the given mat3.
	 *
	 * @param {mat3} out the receiving 3x3 matrix
	 * @param {mat4} a   the source 4x4 matrix
	 * @returns {mat3} out
	 */
	mat3.fromMat4 = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[4];
	    out[4] = a[5];
	    out[5] = a[6];
	    out[6] = a[8];
	    out[7] = a[9];
	    out[8] = a[10];
	    return out;
	};

	/**
	 * Creates a new mat3 initialized with values from an existing matrix
	 *
	 * @param {mat3} a matrix to clone
	 * @returns {mat3} a new 3x3 matrix
	 */
	mat3.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(9);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Copy the values from one mat3 to another
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Set a mat3 to the identity matrix
	 *
	 * @param {mat3} out the receiving matrix
	 * @returns {mat3} out
	 */
	mat3.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	};

	/**
	 * Transpose the values of a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a01 = a[1], a02 = a[2], a12 = a[5];
	        out[1] = a[3];
	        out[2] = a[6];
	        out[3] = a01;
	        out[5] = a[7];
	        out[6] = a02;
	        out[7] = a12;
	    } else {
	        out[0] = a[0];
	        out[1] = a[3];
	        out[2] = a[6];
	        out[3] = a[1];
	        out[4] = a[4];
	        out[5] = a[7];
	        out[6] = a[2];
	        out[7] = a[5];
	        out[8] = a[8];
	    }
	    
	    return out;
	};

	/**
	 * Inverts a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.invert = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        b01 = a22 * a11 - a12 * a21,
	        b11 = -a22 * a10 + a12 * a20,
	        b21 = a21 * a10 - a11 * a20,

	        // Calculate the determinant
	        det = a00 * b01 + a01 * b11 + a02 * b21;

	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;

	    out[0] = b01 * det;
	    out[1] = (-a22 * a01 + a02 * a21) * det;
	    out[2] = (a12 * a01 - a02 * a11) * det;
	    out[3] = b11 * det;
	    out[4] = (a22 * a00 - a02 * a20) * det;
	    out[5] = (-a12 * a00 + a02 * a10) * det;
	    out[6] = b21 * det;
	    out[7] = (-a21 * a00 + a01 * a20) * det;
	    out[8] = (a11 * a00 - a01 * a10) * det;
	    return out;
	};

	/**
	 * Calculates the adjugate of a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.adjoint = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8];

	    out[0] = (a11 * a22 - a12 * a21);
	    out[1] = (a02 * a21 - a01 * a22);
	    out[2] = (a01 * a12 - a02 * a11);
	    out[3] = (a12 * a20 - a10 * a22);
	    out[4] = (a00 * a22 - a02 * a20);
	    out[5] = (a02 * a10 - a00 * a12);
	    out[6] = (a10 * a21 - a11 * a20);
	    out[7] = (a01 * a20 - a00 * a21);
	    out[8] = (a00 * a11 - a01 * a10);
	    return out;
	};

	/**
	 * Calculates the determinant of a mat3
	 *
	 * @param {mat3} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat3.determinant = function (a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8];

	    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
	};

	/**
	 * Multiplies two mat3's
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the first operand
	 * @param {mat3} b the second operand
	 * @returns {mat3} out
	 */
	mat3.multiply = function (out, a, b) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        b00 = b[0], b01 = b[1], b02 = b[2],
	        b10 = b[3], b11 = b[4], b12 = b[5],
	        b20 = b[6], b21 = b[7], b22 = b[8];

	    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
	    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
	    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

	    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
	    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
	    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

	    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
	    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
	    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
	    return out;
	};

	/**
	 * Alias for {@link mat3.multiply}
	 * @function
	 */
	mat3.mul = mat3.multiply;

	/**
	 * Translate a mat3 by the given vector
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to translate
	 * @param {vec2} v vector to translate by
	 * @returns {mat3} out
	 */
	mat3.translate = function(out, a, v) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],
	        x = v[0], y = v[1];

	    out[0] = a00;
	    out[1] = a01;
	    out[2] = a02;

	    out[3] = a10;
	    out[4] = a11;
	    out[5] = a12;

	    out[6] = x * a00 + y * a10 + a20;
	    out[7] = x * a01 + y * a11 + a21;
	    out[8] = x * a02 + y * a12 + a22;
	    return out;
	};

	/**
	 * Rotates a mat3 by the given angle
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat3} out
	 */
	mat3.rotate = function (out, a, rad) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        s = Math.sin(rad),
	        c = Math.cos(rad);

	    out[0] = c * a00 + s * a10;
	    out[1] = c * a01 + s * a11;
	    out[2] = c * a02 + s * a12;

	    out[3] = c * a10 - s * a00;
	    out[4] = c * a11 - s * a01;
	    out[5] = c * a12 - s * a02;

	    out[6] = a20;
	    out[7] = a21;
	    out[8] = a22;
	    return out;
	};

	/**
	 * Scales the mat3 by the dimensions in the given vec2
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to rotate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat3} out
	 **/
	mat3.scale = function(out, a, v) {
	    var x = v[0], y = v[1];

	    out[0] = x * a[0];
	    out[1] = x * a[1];
	    out[2] = x * a[2];

	    out[3] = y * a[3];
	    out[4] = y * a[4];
	    out[5] = y * a[5];

	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.translate(dest, dest, vec);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {vec2} v Translation vector
	 * @returns {mat3} out
	 */
	mat3.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = v[0];
	    out[7] = v[1];
	    out[8] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.rotate(dest, dest, rad);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat3} out
	 */
	mat3.fromRotation = function(out, rad) {
	    var s = Math.sin(rad), c = Math.cos(rad);

	    out[0] = c;
	    out[1] = s;
	    out[2] = 0;

	    out[3] = -s;
	    out[4] = c;
	    out[5] = 0;

	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.scale(dest, dest, vec);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat3} out
	 */
	mat3.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;

	    out[3] = 0;
	    out[4] = v[1];
	    out[5] = 0;

	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	}

	/**
	 * Copies the values from a mat2d into a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat2d} a the matrix to copy
	 * @returns {mat3} out
	 **/
	mat3.fromMat2d = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = 0;

	    out[3] = a[2];
	    out[4] = a[3];
	    out[5] = 0;

	    out[6] = a[4];
	    out[7] = a[5];
	    out[8] = 1;
	    return out;
	};

	/**
	* Calculates a 3x3 matrix from the given quaternion
	*
	* @param {mat3} out mat3 receiving operation result
	* @param {quat} q Quaternion to create matrix from
	*
	* @returns {mat3} out
	*/
	mat3.fromQuat = function (out, q) {
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        yx = y * x2,
	        yy = y * y2,
	        zx = z * x2,
	        zy = z * y2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - yy - zz;
	    out[3] = yx - wz;
	    out[6] = zx + wy;

	    out[1] = yx + wz;
	    out[4] = 1 - xx - zz;
	    out[7] = zy - wx;

	    out[2] = zx - wy;
	    out[5] = zy + wx;
	    out[8] = 1 - xx - yy;

	    return out;
	};

	/**
	* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
	*
	* @param {mat3} out mat3 receiving operation result
	* @param {mat4} a Mat4 to derive the normal matrix from
	*
	* @returns {mat3} out
	*/
	mat3.normalFromMat4 = function (out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32,

	        // Calculate the determinant
	        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;

	    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

	    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

	    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

	    return out;
	};

	/**
	 * Returns a string representation of a mat3
	 *
	 * @param {mat3} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat3.str = function (a) {
	    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
	                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
	                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat3
	 *
	 * @param {mat3} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat3.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
	};


	module.exports = mat3;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(135);

	/**
	 * @class 4x4 Matrix
	 * @name mat4
	 */
	var mat4 = {};

	/**
	 * Creates a new identity mat4
	 *
	 * @returns {mat4} a new 4x4 matrix
	 */
	mat4.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(16);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Creates a new mat4 initialized with values from an existing matrix
	 *
	 * @param {mat4} a matrix to clone
	 * @returns {mat4} a new 4x4 matrix
	 */
	mat4.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(16);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    out[9] = a[9];
	    out[10] = a[10];
	    out[11] = a[11];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Copy the values from one mat4 to another
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    out[9] = a[9];
	    out[10] = a[10];
	    out[11] = a[11];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Set a mat4 to the identity matrix
	 *
	 * @param {mat4} out the receiving matrix
	 * @returns {mat4} out
	 */
	mat4.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Transpose the values of a mat4
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a01 = a[1], a02 = a[2], a03 = a[3],
	            a12 = a[6], a13 = a[7],
	            a23 = a[11];

	        out[1] = a[4];
	        out[2] = a[8];
	        out[3] = a[12];
	        out[4] = a01;
	        out[6] = a[9];
	        out[7] = a[13];
	        out[8] = a02;
	        out[9] = a12;
	        out[11] = a[14];
	        out[12] = a03;
	        out[13] = a13;
	        out[14] = a23;
	    } else {
	        out[0] = a[0];
	        out[1] = a[4];
	        out[2] = a[8];
	        out[3] = a[12];
	        out[4] = a[1];
	        out[5] = a[5];
	        out[6] = a[9];
	        out[7] = a[13];
	        out[8] = a[2];
	        out[9] = a[6];
	        out[10] = a[10];
	        out[11] = a[14];
	        out[12] = a[3];
	        out[13] = a[7];
	        out[14] = a[11];
	        out[15] = a[15];
	    }
	    
	    return out;
	};

	/**
	 * Inverts a mat4
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.invert = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32,

	        // Calculate the determinant
	        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;

	    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

	    return out;
	};

	/**
	 * Calculates the adjugate of a mat4
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.adjoint = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

	    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
	    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
	    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
	    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
	    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
	    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
	    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
	    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
	    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
	    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
	    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
	    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
	    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
	    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
	    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
	    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
	    return out;
	};

	/**
	 * Calculates the determinant of a mat4
	 *
	 * @param {mat4} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat4.determinant = function (a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32;

	    // Calculate the determinant
	    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	};

	/**
	 * Multiplies two mat4's
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the first operand
	 * @param {mat4} b the second operand
	 * @returns {mat4} out
	 */
	mat4.multiply = function (out, a, b) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

	    // Cache only the current line of the second matrix
	    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
	    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
	    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
	    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
	    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
	    return out;
	};

	/**
	 * Alias for {@link mat4.multiply}
	 * @function
	 */
	mat4.mul = mat4.multiply;

	/**
	 * Translate a mat4 by the given vector
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to translate
	 * @param {vec3} v vector to translate by
	 * @returns {mat4} out
	 */
	mat4.translate = function (out, a, v) {
	    var x = v[0], y = v[1], z = v[2],
	        a00, a01, a02, a03,
	        a10, a11, a12, a13,
	        a20, a21, a22, a23;

	    if (a === out) {
	        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
	        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
	        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
	        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
	    } else {
	        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
	        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
	        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

	        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
	        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
	        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

	        out[12] = a00 * x + a10 * y + a20 * z + a[12];
	        out[13] = a01 * x + a11 * y + a21 * z + a[13];
	        out[14] = a02 * x + a12 * y + a22 * z + a[14];
	        out[15] = a03 * x + a13 * y + a23 * z + a[15];
	    }

	    return out;
	};

	/**
	 * Scales the mat4 by the dimensions in the given vec3
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to scale
	 * @param {vec3} v the vec3 to scale the matrix by
	 * @returns {mat4} out
	 **/
	mat4.scale = function(out, a, v) {
	    var x = v[0], y = v[1], z = v[2];

	    out[0] = a[0] * x;
	    out[1] = a[1] * x;
	    out[2] = a[2] * x;
	    out[3] = a[3] * x;
	    out[4] = a[4] * y;
	    out[5] = a[5] * y;
	    out[6] = a[6] * y;
	    out[7] = a[7] * y;
	    out[8] = a[8] * z;
	    out[9] = a[9] * z;
	    out[10] = a[10] * z;
	    out[11] = a[11] * z;
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Rotates a mat4 by the given angle around the given axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {vec3} axis the axis to rotate around
	 * @returns {mat4} out
	 */
	mat4.rotate = function (out, a, rad, axis) {
	    var x = axis[0], y = axis[1], z = axis[2],
	        len = Math.sqrt(x * x + y * y + z * z),
	        s, c, t,
	        a00, a01, a02, a03,
	        a10, a11, a12, a13,
	        a20, a21, a22, a23,
	        b00, b01, b02,
	        b10, b11, b12,
	        b20, b21, b22;

	    if (Math.abs(len) < glMatrix.EPSILON) { return null; }
	    
	    len = 1 / len;
	    x *= len;
	    y *= len;
	    z *= len;

	    s = Math.sin(rad);
	    c = Math.cos(rad);
	    t = 1 - c;

	    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
	    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
	    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

	    // Construct the elements of the rotation matrix
	    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
	    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
	    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

	    // Perform rotation-specific matrix multiplication
	    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
	    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
	    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
	    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
	    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
	    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
	    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
	    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
	    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
	    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
	    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
	    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the X axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.rotateX = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11];

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[0]  = a[0];
	        out[1]  = a[1];
	        out[2]  = a[2];
	        out[3]  = a[3];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[4] = a10 * c + a20 * s;
	    out[5] = a11 * c + a21 * s;
	    out[6] = a12 * c + a22 * s;
	    out[7] = a13 * c + a23 * s;
	    out[8] = a20 * c - a10 * s;
	    out[9] = a21 * c - a11 * s;
	    out[10] = a22 * c - a12 * s;
	    out[11] = a23 * c - a13 * s;
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Y axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.rotateY = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11];

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[4]  = a[4];
	        out[5]  = a[5];
	        out[6]  = a[6];
	        out[7]  = a[7];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[0] = a00 * c - a20 * s;
	    out[1] = a01 * c - a21 * s;
	    out[2] = a02 * c - a22 * s;
	    out[3] = a03 * c - a23 * s;
	    out[8] = a00 * s + a20 * c;
	    out[9] = a01 * s + a21 * c;
	    out[10] = a02 * s + a22 * c;
	    out[11] = a03 * s + a23 * c;
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Z axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.rotateZ = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7];

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[8]  = a[8];
	        out[9]  = a[9];
	        out[10] = a[10];
	        out[11] = a[11];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[0] = a00 * c + a10 * s;
	    out[1] = a01 * c + a11 * s;
	    out[2] = a02 * c + a12 * s;
	    out[3] = a03 * c + a13 * s;
	    out[4] = a10 * c - a00 * s;
	    out[5] = a11 * c - a01 * s;
	    out[6] = a12 * c - a02 * s;
	    out[7] = a13 * c - a03 * s;
	    return out;
	};

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, dest, vec);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {vec3} v Translation vector
	 * @returns {mat4} out
	 */
	mat4.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.scale(dest, dest, vec);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {vec3} v Scaling vector
	 * @returns {mat4} out
	 */
	mat4.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = v[1];
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = v[2];
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a given angle around a given axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotate(dest, dest, rad, axis);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {vec3} axis the axis to rotate around
	 * @returns {mat4} out
	 */
	mat4.fromRotation = function(out, rad, axis) {
	    var x = axis[0], y = axis[1], z = axis[2],
	        len = Math.sqrt(x * x + y * y + z * z),
	        s, c, t;
	    
	    if (Math.abs(len) < glMatrix.EPSILON) { return null; }
	    
	    len = 1 / len;
	    x *= len;
	    y *= len;
	    z *= len;
	    
	    s = Math.sin(rad);
	    c = Math.cos(rad);
	    t = 1 - c;
	    
	    // Perform rotation-specific matrix multiplication
	    out[0] = x * x * t + c;
	    out[1] = y * x * t + z * s;
	    out[2] = z * x * t - y * s;
	    out[3] = 0;
	    out[4] = x * y * t - z * s;
	    out[5] = y * y * t + c;
	    out[6] = z * y * t + x * s;
	    out[7] = 0;
	    out[8] = x * z * t + y * s;
	    out[9] = y * z * t - x * s;
	    out[10] = z * z * t + c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the X axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateX(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromXRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    
	    // Perform axis-specific matrix multiplication
	    out[0]  = 1;
	    out[1]  = 0;
	    out[2]  = 0;
	    out[3]  = 0;
	    out[4] = 0;
	    out[5] = c;
	    out[6] = s;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = -s;
	    out[10] = c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the Y axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateY(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromYRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    
	    // Perform axis-specific matrix multiplication
	    out[0]  = c;
	    out[1]  = 0;
	    out[2]  = -s;
	    out[3]  = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = s;
	    out[9] = 0;
	    out[10] = c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the Z axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateZ(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromZRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    
	    // Perform axis-specific matrix multiplication
	    out[0]  = c;
	    out[1]  = s;
	    out[2]  = 0;
	    out[3]  = 0;
	    out[4] = -s;
	    out[5] = c;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a quaternion rotation and vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslation = function (out, q, v) {
	    // Quaternion math
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        xy = x * y2,
	        xz = x * z2,
	        yy = y * y2,
	        yz = y * z2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - (yy + zz);
	    out[1] = xy + wz;
	    out[2] = xz - wy;
	    out[3] = 0;
	    out[4] = xy - wz;
	    out[5] = 1 - (xx + zz);
	    out[6] = yz + wx;
	    out[7] = 0;
	    out[8] = xz + wy;
	    out[9] = yz - wx;
	    out[10] = 1 - (xx + yy);
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;
	    
	    return out;
	};

	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *     mat4.scale(dest, scale)
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @param {vec3} s Scaling vector
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslationScale = function (out, q, v, s) {
	    // Quaternion math
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        xy = x * y2,
	        xz = x * z2,
	        yy = y * y2,
	        yz = y * z2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2,
	        sx = s[0],
	        sy = s[1],
	        sz = s[2];

	    out[0] = (1 - (yy + zz)) * sx;
	    out[1] = (xy + wz) * sx;
	    out[2] = (xz - wy) * sx;
	    out[3] = 0;
	    out[4] = (xy - wz) * sy;
	    out[5] = (1 - (xx + zz)) * sy;
	    out[6] = (yz + wx) * sy;
	    out[7] = 0;
	    out[8] = (xz + wy) * sz;
	    out[9] = (yz - wx) * sz;
	    out[10] = (1 - (xx + yy)) * sz;
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;
	    
	    return out;
	};

	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     mat4.translate(dest, origin);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *     mat4.scale(dest, scale)
	 *     mat4.translate(dest, negativeOrigin);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @param {vec3} s Scaling vector
	 * @param {vec3} o The origin vector around which to scale and rotate
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
	  // Quaternion math
	  var x = q[0], y = q[1], z = q[2], w = q[3],
	      x2 = x + x,
	      y2 = y + y,
	      z2 = z + z,

	      xx = x * x2,
	      xy = x * y2,
	      xz = x * z2,
	      yy = y * y2,
	      yz = y * z2,
	      zz = z * z2,
	      wx = w * x2,
	      wy = w * y2,
	      wz = w * z2,
	      
	      sx = s[0],
	      sy = s[1],
	      sz = s[2],

	      ox = o[0],
	      oy = o[1],
	      oz = o[2];
	      
	  out[0] = (1 - (yy + zz)) * sx;
	  out[1] = (xy + wz) * sx;
	  out[2] = (xz - wy) * sx;
	  out[3] = 0;
	  out[4] = (xy - wz) * sy;
	  out[5] = (1 - (xx + zz)) * sy;
	  out[6] = (yz + wx) * sy;
	  out[7] = 0;
	  out[8] = (xz + wy) * sz;
	  out[9] = (yz - wx) * sz;
	  out[10] = (1 - (xx + yy)) * sz;
	  out[11] = 0;
	  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
	  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
	  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
	  out[15] = 1;
	        
	  return out;
	};

	mat4.fromQuat = function (out, q) {
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        yx = y * x2,
	        yy = y * y2,
	        zx = z * x2,
	        zy = z * y2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - yy - zz;
	    out[1] = yx + wz;
	    out[2] = zx - wy;
	    out[3] = 0;

	    out[4] = yx - wz;
	    out[5] = 1 - xx - zz;
	    out[6] = zy + wx;
	    out[7] = 0;

	    out[8] = zx + wy;
	    out[9] = zy - wx;
	    out[10] = 1 - xx - yy;
	    out[11] = 0;

	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;

	    return out;
	};

	/**
	 * Generates a frustum matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {Number} left Left bound of the frustum
	 * @param {Number} right Right bound of the frustum
	 * @param {Number} bottom Bottom bound of the frustum
	 * @param {Number} top Top bound of the frustum
	 * @param {Number} near Near bound of the frustum
	 * @param {Number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.frustum = function (out, left, right, bottom, top, near, far) {
	    var rl = 1 / (right - left),
	        tb = 1 / (top - bottom),
	        nf = 1 / (near - far);
	    out[0] = (near * 2) * rl;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = (near * 2) * tb;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = (right + left) * rl;
	    out[9] = (top + bottom) * tb;
	    out[10] = (far + near) * nf;
	    out[11] = -1;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = (far * near * 2) * nf;
	    out[15] = 0;
	    return out;
	};

	/**
	 * Generates a perspective projection matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} fovy Vertical field of view in radians
	 * @param {number} aspect Aspect ratio. typically viewport width/height
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.perspective = function (out, fovy, aspect, near, far) {
	    var f = 1.0 / Math.tan(fovy / 2),
	        nf = 1 / (near - far);
	    out[0] = f / aspect;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = f;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = (far + near) * nf;
	    out[11] = -1;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = (2 * far * near) * nf;
	    out[15] = 0;
	    return out;
	};

	/**
	 * Generates a perspective projection matrix with the given field of view.
	 * This is primarily useful for generating projection matrices to be used
	 * with the still experiemental WebVR API.
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
	    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
	        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
	        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
	        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
	        xScale = 2.0 / (leftTan + rightTan),
	        yScale = 2.0 / (upTan + downTan);

	    out[0] = xScale;
	    out[1] = 0.0;
	    out[2] = 0.0;
	    out[3] = 0.0;
	    out[4] = 0.0;
	    out[5] = yScale;
	    out[6] = 0.0;
	    out[7] = 0.0;
	    out[8] = -((leftTan - rightTan) * xScale * 0.5);
	    out[9] = ((upTan - downTan) * yScale * 0.5);
	    out[10] = far / (near - far);
	    out[11] = -1.0;
	    out[12] = 0.0;
	    out[13] = 0.0;
	    out[14] = (far * near) / (near - far);
	    out[15] = 0.0;
	    return out;
	}

	/**
	 * Generates a orthogonal projection matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} left Left bound of the frustum
	 * @param {number} right Right bound of the frustum
	 * @param {number} bottom Bottom bound of the frustum
	 * @param {number} top Top bound of the frustum
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.ortho = function (out, left, right, bottom, top, near, far) {
	    var lr = 1 / (left - right),
	        bt = 1 / (bottom - top),
	        nf = 1 / (near - far);
	    out[0] = -2 * lr;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = -2 * bt;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 2 * nf;
	    out[11] = 0;
	    out[12] = (left + right) * lr;
	    out[13] = (top + bottom) * bt;
	    out[14] = (far + near) * nf;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Generates a look-at matrix with the given eye position, focal point, and up axis
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {vec3} eye Position of the viewer
	 * @param {vec3} center Point the viewer is looking at
	 * @param {vec3} up vec3 pointing up
	 * @returns {mat4} out
	 */
	mat4.lookAt = function (out, eye, center, up) {
	    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
	        eyex = eye[0],
	        eyey = eye[1],
	        eyez = eye[2],
	        upx = up[0],
	        upy = up[1],
	        upz = up[2],
	        centerx = center[0],
	        centery = center[1],
	        centerz = center[2];

	    if (Math.abs(eyex - centerx) < glMatrix.EPSILON &&
	        Math.abs(eyey - centery) < glMatrix.EPSILON &&
	        Math.abs(eyez - centerz) < glMatrix.EPSILON) {
	        return mat4.identity(out);
	    }

	    z0 = eyex - centerx;
	    z1 = eyey - centery;
	    z2 = eyez - centerz;

	    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
	    z0 *= len;
	    z1 *= len;
	    z2 *= len;

	    x0 = upy * z2 - upz * z1;
	    x1 = upz * z0 - upx * z2;
	    x2 = upx * z1 - upy * z0;
	    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
	    if (!len) {
	        x0 = 0;
	        x1 = 0;
	        x2 = 0;
	    } else {
	        len = 1 / len;
	        x0 *= len;
	        x1 *= len;
	        x2 *= len;
	    }

	    y0 = z1 * x2 - z2 * x1;
	    y1 = z2 * x0 - z0 * x2;
	    y2 = z0 * x1 - z1 * x0;

	    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
	    if (!len) {
	        y0 = 0;
	        y1 = 0;
	        y2 = 0;
	    } else {
	        len = 1 / len;
	        y0 *= len;
	        y1 *= len;
	        y2 *= len;
	    }

	    out[0] = x0;
	    out[1] = y0;
	    out[2] = z0;
	    out[3] = 0;
	    out[4] = x1;
	    out[5] = y1;
	    out[6] = z1;
	    out[7] = 0;
	    out[8] = x2;
	    out[9] = y2;
	    out[10] = z2;
	    out[11] = 0;
	    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
	    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
	    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
	    out[15] = 1;

	    return out;
	};

	/**
	 * Returns a string representation of a mat4
	 *
	 * @param {mat4} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat4.str = function (a) {
	    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
	                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
	                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
	                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat4
	 *
	 * @param {mat4} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat4.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
	};


	module.exports = mat4;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(135);
	var mat3 = __webpack_require__(138);
	var vec3 = __webpack_require__(141);
	var vec4 = __webpack_require__(142);

	/**
	 * @class Quaternion
	 * @name quat
	 */
	var quat = {};

	/**
	 * Creates a new identity quat
	 *
	 * @returns {quat} a new quaternion
	 */
	quat.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Sets a quaternion to represent the shortest rotation from one
	 * vector to another.
	 *
	 * Both vectors are assumed to be unit length.
	 *
	 * @param {quat} out the receiving quaternion.
	 * @param {vec3} a the initial vector
	 * @param {vec3} b the destination vector
	 * @returns {quat} out
	 */
	quat.rotationTo = (function() {
	    var tmpvec3 = vec3.create();
	    var xUnitVec3 = vec3.fromValues(1,0,0);
	    var yUnitVec3 = vec3.fromValues(0,1,0);

	    return function(out, a, b) {
	        var dot = vec3.dot(a, b);
	        if (dot < -0.999999) {
	            vec3.cross(tmpvec3, xUnitVec3, a);
	            if (vec3.length(tmpvec3) < 0.000001)
	                vec3.cross(tmpvec3, yUnitVec3, a);
	            vec3.normalize(tmpvec3, tmpvec3);
	            quat.setAxisAngle(out, tmpvec3, Math.PI);
	            return out;
	        } else if (dot > 0.999999) {
	            out[0] = 0;
	            out[1] = 0;
	            out[2] = 0;
	            out[3] = 1;
	            return out;
	        } else {
	            vec3.cross(tmpvec3, a, b);
	            out[0] = tmpvec3[0];
	            out[1] = tmpvec3[1];
	            out[2] = tmpvec3[2];
	            out[3] = 1 + dot;
	            return quat.normalize(out, out);
	        }
	    };
	})();

	/**
	 * Sets the specified quaternion with values corresponding to the given
	 * axes. Each axis is a vec3 and is expected to be unit length and
	 * perpendicular to all other specified axes.
	 *
	 * @param {vec3} view  the vector representing the viewing direction
	 * @param {vec3} right the vector representing the local "right" direction
	 * @param {vec3} up    the vector representing the local "up" direction
	 * @returns {quat} out
	 */
	quat.setAxes = (function() {
	    var matr = mat3.create();

	    return function(out, view, right, up) {
	        matr[0] = right[0];
	        matr[3] = right[1];
	        matr[6] = right[2];

	        matr[1] = up[0];
	        matr[4] = up[1];
	        matr[7] = up[2];

	        matr[2] = -view[0];
	        matr[5] = -view[1];
	        matr[8] = -view[2];

	        return quat.normalize(out, quat.fromMat3(out, matr));
	    };
	})();

	/**
	 * Creates a new quat initialized with values from an existing quaternion
	 *
	 * @param {quat} a quaternion to clone
	 * @returns {quat} a new quaternion
	 * @function
	 */
	quat.clone = vec4.clone;

	/**
	 * Creates a new quat initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {quat} a new quaternion
	 * @function
	 */
	quat.fromValues = vec4.fromValues;

	/**
	 * Copy the values from one quat to another
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the source quaternion
	 * @returns {quat} out
	 * @function
	 */
	quat.copy = vec4.copy;

	/**
	 * Set the components of a quat to the given values
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {quat} out
	 * @function
	 */
	quat.set = vec4.set;

	/**
	 * Set a quat to the identity quaternion
	 *
	 * @param {quat} out the receiving quaternion
	 * @returns {quat} out
	 */
	quat.identity = function(out) {
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Sets a quat from the given angle and rotation axis,
	 * then returns it.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {vec3} axis the axis around which to rotate
	 * @param {Number} rad the angle in radians
	 * @returns {quat} out
	 **/
	quat.setAxisAngle = function(out, axis, rad) {
	    rad = rad * 0.5;
	    var s = Math.sin(rad);
	    out[0] = s * axis[0];
	    out[1] = s * axis[1];
	    out[2] = s * axis[2];
	    out[3] = Math.cos(rad);
	    return out;
	};

	/**
	 * Adds two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {quat} out
	 * @function
	 */
	quat.add = vec4.add;

	/**
	 * Multiplies two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {quat} out
	 */
	quat.multiply = function(out, a, b) {
	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = b[0], by = b[1], bz = b[2], bw = b[3];

	    out[0] = ax * bw + aw * bx + ay * bz - az * by;
	    out[1] = ay * bw + aw * by + az * bx - ax * bz;
	    out[2] = az * bw + aw * bz + ax * by - ay * bx;
	    out[3] = aw * bw - ax * bx - ay * by - az * bz;
	    return out;
	};

	/**
	 * Alias for {@link quat.multiply}
	 * @function
	 */
	quat.mul = quat.multiply;

	/**
	 * Scales a quat by a scalar number
	 *
	 * @param {quat} out the receiving vector
	 * @param {quat} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {quat} out
	 * @function
	 */
	quat.scale = vec4.scale;

	/**
	 * Rotates a quaternion by the given angle about the X axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateX = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw + aw * bx;
	    out[1] = ay * bw + az * bx;
	    out[2] = az * bw - ay * bx;
	    out[3] = aw * bw - ax * bx;
	    return out;
	};

	/**
	 * Rotates a quaternion by the given angle about the Y axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateY = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        by = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw - az * by;
	    out[1] = ay * bw + aw * by;
	    out[2] = az * bw + ax * by;
	    out[3] = aw * bw - ay * by;
	    return out;
	};

	/**
	 * Rotates a quaternion by the given angle about the Z axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateZ = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bz = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw + ay * bz;
	    out[1] = ay * bw - ax * bz;
	    out[2] = az * bw + aw * bz;
	    out[3] = aw * bw - az * bz;
	    return out;
	};

	/**
	 * Calculates the W component of a quat from the X, Y, and Z components.
	 * Assumes that quaternion is 1 unit in length.
	 * Any existing W component will be ignored.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate W component of
	 * @returns {quat} out
	 */
	quat.calculateW = function (out, a) {
	    var x = a[0], y = a[1], z = a[2];

	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
	    return out;
	};

	/**
	 * Calculates the dot product of two quat's
	 *
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {Number} dot product of a and b
	 * @function
	 */
	quat.dot = vec4.dot;

	/**
	 * Performs a linear interpolation between two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {quat} out
	 * @function
	 */
	quat.lerp = vec4.lerp;

	/**
	 * Performs a spherical linear interpolation between two quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {quat} out
	 */
	quat.slerp = function (out, a, b, t) {
	    // benchmarks:
	    //    http://jsperf.com/quaternion-slerp-implementations

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = b[0], by = b[1], bz = b[2], bw = b[3];

	    var        omega, cosom, sinom, scale0, scale1;

	    // calc cosine
	    cosom = ax * bx + ay * by + az * bz + aw * bw;
	    // adjust signs (if necessary)
	    if ( cosom < 0.0 ) {
	        cosom = -cosom;
	        bx = - bx;
	        by = - by;
	        bz = - bz;
	        bw = - bw;
	    }
	    // calculate coefficients
	    if ( (1.0 - cosom) > 0.000001 ) {
	        // standard case (slerp)
	        omega  = Math.acos(cosom);
	        sinom  = Math.sin(omega);
	        scale0 = Math.sin((1.0 - t) * omega) / sinom;
	        scale1 = Math.sin(t * omega) / sinom;
	    } else {        
	        // "from" and "to" quaternions are very close 
	        //  ... so we can do a linear interpolation
	        scale0 = 1.0 - t;
	        scale1 = t;
	    }
	    // calculate final values
	    out[0] = scale0 * ax + scale1 * bx;
	    out[1] = scale0 * ay + scale1 * by;
	    out[2] = scale0 * az + scale1 * bz;
	    out[3] = scale0 * aw + scale1 * bw;
	    
	    return out;
	};

	/**
	 * Performs a spherical linear interpolation with two control points
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {quat} c the third operand
	 * @param {quat} d the fourth operand
	 * @param {Number} t interpolation amount
	 * @returns {quat} out
	 */
	quat.sqlerp = (function () {
	  var temp1 = quat.create();
	  var temp2 = quat.create();
	  
	  return function (out, a, b, c, d, t) {
	    quat.slerp(temp1, a, d, t);
	    quat.slerp(temp2, b, c, t);
	    quat.slerp(out, temp1, temp2, 2 * t * (1 - t));
	    
	    return out;
	  };
	}());

	/**
	 * Calculates the inverse of a quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate inverse of
	 * @returns {quat} out
	 */
	quat.invert = function(out, a) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
	        invDot = dot ? 1.0/dot : 0;
	    
	    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

	    out[0] = -a0*invDot;
	    out[1] = -a1*invDot;
	    out[2] = -a2*invDot;
	    out[3] = a3*invDot;
	    return out;
	};

	/**
	 * Calculates the conjugate of a quat
	 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate conjugate of
	 * @returns {quat} out
	 */
	quat.conjugate = function (out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Calculates the length of a quat
	 *
	 * @param {quat} a vector to calculate length of
	 * @returns {Number} length of a
	 * @function
	 */
	quat.length = vec4.length;

	/**
	 * Alias for {@link quat.length}
	 * @function
	 */
	quat.len = quat.length;

	/**
	 * Calculates the squared length of a quat
	 *
	 * @param {quat} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 * @function
	 */
	quat.squaredLength = vec4.squaredLength;

	/**
	 * Alias for {@link quat.squaredLength}
	 * @function
	 */
	quat.sqrLen = quat.squaredLength;

	/**
	 * Normalize a quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quaternion to normalize
	 * @returns {quat} out
	 * @function
	 */
	quat.normalize = vec4.normalize;

	/**
	 * Creates a quaternion from the given 3x3 rotation matrix.
	 *
	 * NOTE: The resultant quaternion is not normalized, so you should be sure
	 * to renormalize the quaternion yourself where necessary.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {mat3} m rotation matrix
	 * @returns {quat} out
	 * @function
	 */
	quat.fromMat3 = function(out, m) {
	    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
	    // article "Quaternion Calculus and Fast Animation".
	    var fTrace = m[0] + m[4] + m[8];
	    var fRoot;

	    if ( fTrace > 0.0 ) {
	        // |w| > 1/2, may as well choose w > 1/2
	        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
	        out[3] = 0.5 * fRoot;
	        fRoot = 0.5/fRoot;  // 1/(4w)
	        out[0] = (m[5]-m[7])*fRoot;
	        out[1] = (m[6]-m[2])*fRoot;
	        out[2] = (m[1]-m[3])*fRoot;
	    } else {
	        // |w| <= 1/2
	        var i = 0;
	        if ( m[4] > m[0] )
	          i = 1;
	        if ( m[8] > m[i*3+i] )
	          i = 2;
	        var j = (i+1)%3;
	        var k = (i+2)%3;
	        
	        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
	        out[i] = 0.5 * fRoot;
	        fRoot = 0.5 / fRoot;
	        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
	        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
	        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
	    }
	    
	    return out;
	};

	/**
	 * Returns a string representation of a quatenion
	 *
	 * @param {quat} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	quat.str = function (a) {
	    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	module.exports = quat;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(135);

	/**
	 * @class 3 Dimensional Vector
	 * @name vec3
	 */
	var vec3 = {};

	/**
	 * Creates a new, empty vec3
	 *
	 * @returns {vec3} a new 3D vector
	 */
	vec3.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    return out;
	};

	/**
	 * Creates a new vec3 initialized with values from an existing vector
	 *
	 * @param {vec3} a vector to clone
	 * @returns {vec3} a new 3D vector
	 */
	vec3.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    return out;
	};

	/**
	 * Creates a new vec3 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {vec3} a new 3D vector
	 */
	vec3.fromValues = function(x, y, z) {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};

	/**
	 * Copy the values from one vec3 to another
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the source vector
	 * @returns {vec3} out
	 */
	vec3.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    return out;
	};

	/**
	 * Set the components of a vec3 to the given values
	 *
	 * @param {vec3} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {vec3} out
	 */
	vec3.set = function(out, x, y, z) {
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};

	/**
	 * Adds two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    return out;
	};

	/**
	 * Alias for {@link vec3.subtract}
	 * @function
	 */
	vec3.sub = vec3.subtract;

	/**
	 * Multiplies two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    out[2] = a[2] * b[2];
	    return out;
	};

	/**
	 * Alias for {@link vec3.multiply}
	 * @function
	 */
	vec3.mul = vec3.multiply;

	/**
	 * Divides two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    out[2] = a[2] / b[2];
	    return out;
	};

	/**
	 * Alias for {@link vec3.divide}
	 * @function
	 */
	vec3.div = vec3.divide;

	/**
	 * Returns the minimum of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    out[2] = Math.min(a[2], b[2]);
	    return out;
	};

	/**
	 * Returns the maximum of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    out[2] = Math.max(a[2], b[2]);
	    return out;
	};

	/**
	 * Scales a vec3 by a scalar number
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec3} out
	 */
	vec3.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    return out;
	};

	/**
	 * Adds two vec3's after scaling the second operand by a scalar value
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec3} out
	 */
	vec3.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec3.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2];
	    return Math.sqrt(x*x + y*y + z*z);
	};

	/**
	 * Alias for {@link vec3.distance}
	 * @function
	 */
	vec3.dist = vec3.distance;

	/**
	 * Calculates the squared euclidian distance between two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec3.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2];
	    return x*x + y*y + z*z;
	};

	/**
	 * Alias for {@link vec3.squaredDistance}
	 * @function
	 */
	vec3.sqrDist = vec3.squaredDistance;

	/**
	 * Calculates the length of a vec3
	 *
	 * @param {vec3} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec3.length = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    return Math.sqrt(x*x + y*y + z*z);
	};

	/**
	 * Alias for {@link vec3.length}
	 * @function
	 */
	vec3.len = vec3.length;

	/**
	 * Calculates the squared length of a vec3
	 *
	 * @param {vec3} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec3.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    return x*x + y*y + z*z;
	};

	/**
	 * Alias for {@link vec3.squaredLength}
	 * @function
	 */
	vec3.sqrLen = vec3.squaredLength;

	/**
	 * Negates the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to negate
	 * @returns {vec3} out
	 */
	vec3.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to invert
	 * @returns {vec3} out
	 */
	vec3.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  out[2] = 1.0 / a[2];
	  return out;
	};

	/**
	 * Normalize a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to normalize
	 * @returns {vec3} out
	 */
	vec3.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    var len = x*x + y*y + z*z;
	    if (len > 0) {
	        //TODO: evaluate use of glm_invsqrt here?
	        len = 1 / Math.sqrt(len);
	        out[0] = a[0] * len;
	        out[1] = a[1] * len;
	        out[2] = a[2] * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec3.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	};

	/**
	 * Computes the cross product of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.cross = function(out, a, b) {
	    var ax = a[0], ay = a[1], az = a[2],
	        bx = b[0], by = b[1], bz = b[2];

	    out[0] = ay * bz - az * by;
	    out[1] = az * bx - ax * bz;
	    out[2] = ax * by - ay * bx;
	    return out;
	};

	/**
	 * Performs a linear interpolation between two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1],
	        az = a[2];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    out[2] = az + t * (b[2] - az);
	    return out;
	};

	/**
	 * Performs a hermite interpolation with two control points
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {vec3} c the third operand
	 * @param {vec3} d the fourth operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.hermite = function (out, a, b, c, d, t) {
	  var factorTimes2 = t * t,
	      factor1 = factorTimes2 * (2 * t - 3) + 1,
	      factor2 = factorTimes2 * (t - 2) + t,
	      factor3 = factorTimes2 * (t - 1),
	      factor4 = factorTimes2 * (3 - 2 * t);
	  
	  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	  
	  return out;
	};

	/**
	 * Performs a bezier interpolation with two control points
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {vec3} c the third operand
	 * @param {vec3} d the fourth operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.bezier = function (out, a, b, c, d, t) {
	  var inverseFactor = 1 - t,
	      inverseFactorTimesTwo = inverseFactor * inverseFactor,
	      factorTimes2 = t * t,
	      factor1 = inverseFactorTimesTwo * inverseFactor,
	      factor2 = 3 * t * inverseFactorTimesTwo,
	      factor3 = 3 * factorTimes2 * inverseFactor,
	      factor4 = factorTimes2 * t;
	  
	  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	  
	  return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec3} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec3} out
	 */
	vec3.random = function (out, scale) {
	    scale = scale || 1.0;

	    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
	    var z = (glMatrix.RANDOM() * 2.0) - 1.0;
	    var zScale = Math.sqrt(1.0-z*z) * scale;

	    out[0] = Math.cos(r) * zScale;
	    out[1] = Math.sin(r) * zScale;
	    out[2] = z * scale;
	    return out;
	};

	/**
	 * Transforms the vec3 with a mat4.
	 * 4th vector component is implicitly '1'
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec3} out
	 */
	vec3.transformMat4 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2],
	        w = m[3] * x + m[7] * y + m[11] * z + m[15];
	    w = w || 1.0;
	    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
	    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
	    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
	    return out;
	};

	/**
	 * Transforms the vec3 with a mat3.
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {mat4} m the 3x3 matrix to transform with
	 * @returns {vec3} out
	 */
	vec3.transformMat3 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2];
	    out[0] = x * m[0] + y * m[3] + z * m[6];
	    out[1] = x * m[1] + y * m[4] + z * m[7];
	    out[2] = x * m[2] + y * m[5] + z * m[8];
	    return out;
	};

	/**
	 * Transforms the vec3 with a quat
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {quat} q quaternion to transform with
	 * @returns {vec3} out
	 */
	vec3.transformQuat = function(out, a, q) {
	    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

	    var x = a[0], y = a[1], z = a[2],
	        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

	        // calculate quat * vec
	        ix = qw * x + qy * z - qz * y,
	        iy = qw * y + qz * x - qx * z,
	        iz = qw * z + qx * y - qy * x,
	        iw = -qx * x - qy * y - qz * z;

	    // calculate result * inverse quat
	    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	    return out;
	};

	/**
	 * Rotate a 3D vector around the x-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateX = function(out, a, b, c){
	   var p = [], r=[];
		  //Translate point to the origin
		  p[0] = a[0] - b[0];
		  p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];

		  //perform rotation
		  r[0] = p[0];
		  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
		  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

		  //translate to correct position
		  out[0] = r[0] + b[0];
		  out[1] = r[1] + b[1];
		  out[2] = r[2] + b[2];

	  	return out;
	};

	/**
	 * Rotate a 3D vector around the y-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateY = function(out, a, b, c){
	  	var p = [], r=[];
	  	//Translate point to the origin
	  	p[0] = a[0] - b[0];
	  	p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];
	  
	  	//perform rotation
	  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
	  	r[1] = p[1];
	  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
	  
	  	//translate to correct position
	  	out[0] = r[0] + b[0];
	  	out[1] = r[1] + b[1];
	  	out[2] = r[2] + b[2];
	  
	  	return out;
	};

	/**
	 * Rotate a 3D vector around the z-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateZ = function(out, a, b, c){
	  	var p = [], r=[];
	  	//Translate point to the origin
	  	p[0] = a[0] - b[0];
	  	p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];
	  
	  	//perform rotation
	  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
	  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
	  	r[2] = p[2];
	  
	  	//translate to correct position
	  	out[0] = r[0] + b[0];
	  	out[1] = r[1] + b[1];
	  	out[2] = r[2] + b[2];
	  
	  	return out;
	};

	/**
	 * Perform some operation over an array of vec3s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec3.forEach = (function() {
	    var vec = vec3.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 3;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Get the angle between two 3D vectors
	 * @param {vec3} a The first operand
	 * @param {vec3} b The second operand
	 * @returns {Number} The angle in radians
	 */
	vec3.angle = function(a, b) {
	   
	    var tempA = vec3.fromValues(a[0], a[1], a[2]);
	    var tempB = vec3.fromValues(b[0], b[1], b[2]);
	 
	    vec3.normalize(tempA, tempA);
	    vec3.normalize(tempB, tempB);
	 
	    var cosine = vec3.dot(tempA, tempB);

	    if(cosine > 1.0){
	        return 0;
	    } else {
	        return Math.acos(cosine);
	    }     
	};

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec3} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec3.str = function (a) {
	    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
	};

	module.exports = vec3;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(135);

	/**
	 * @class 4 Dimensional Vector
	 * @name vec4
	 */
	var vec4 = {};

	/**
	 * Creates a new, empty vec4
	 *
	 * @returns {vec4} a new 4D vector
	 */
	vec4.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    return out;
	};

	/**
	 * Creates a new vec4 initialized with values from an existing vector
	 *
	 * @param {vec4} a vector to clone
	 * @returns {vec4} a new 4D vector
	 */
	vec4.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Creates a new vec4 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {vec4} a new 4D vector
	 */
	vec4.fromValues = function(x, y, z, w) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};

	/**
	 * Copy the values from one vec4 to another
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the source vector
	 * @returns {vec4} out
	 */
	vec4.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Set the components of a vec4 to the given values
	 *
	 * @param {vec4} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {vec4} out
	 */
	vec4.set = function(out, x, y, z, w) {
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};

	/**
	 * Adds two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    return out;
	};

	/**
	 * Alias for {@link vec4.subtract}
	 * @function
	 */
	vec4.sub = vec4.subtract;

	/**
	 * Multiplies two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    out[2] = a[2] * b[2];
	    out[3] = a[3] * b[3];
	    return out;
	};

	/**
	 * Alias for {@link vec4.multiply}
	 * @function
	 */
	vec4.mul = vec4.multiply;

	/**
	 * Divides two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    out[2] = a[2] / b[2];
	    out[3] = a[3] / b[3];
	    return out;
	};

	/**
	 * Alias for {@link vec4.divide}
	 * @function
	 */
	vec4.div = vec4.divide;

	/**
	 * Returns the minimum of two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    out[2] = Math.min(a[2], b[2]);
	    out[3] = Math.min(a[3], b[3]);
	    return out;
	};

	/**
	 * Returns the maximum of two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    out[2] = Math.max(a[2], b[2]);
	    out[3] = Math.max(a[3], b[3]);
	    return out;
	};

	/**
	 * Scales a vec4 by a scalar number
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec4} out
	 */
	vec4.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    return out;
	};

	/**
	 * Adds two vec4's after scaling the second operand by a scalar value
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec4} out
	 */
	vec4.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    out[3] = a[3] + (b[3] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec4.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2],
	        w = b[3] - a[3];
	    return Math.sqrt(x*x + y*y + z*z + w*w);
	};

	/**
	 * Alias for {@link vec4.distance}
	 * @function
	 */
	vec4.dist = vec4.distance;

	/**
	 * Calculates the squared euclidian distance between two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec4.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2],
	        w = b[3] - a[3];
	    return x*x + y*y + z*z + w*w;
	};

	/**
	 * Alias for {@link vec4.squaredDistance}
	 * @function
	 */
	vec4.sqrDist = vec4.squaredDistance;

	/**
	 * Calculates the length of a vec4
	 *
	 * @param {vec4} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec4.length = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    return Math.sqrt(x*x + y*y + z*z + w*w);
	};

	/**
	 * Alias for {@link vec4.length}
	 * @function
	 */
	vec4.len = vec4.length;

	/**
	 * Calculates the squared length of a vec4
	 *
	 * @param {vec4} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec4.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    return x*x + y*y + z*z + w*w;
	};

	/**
	 * Alias for {@link vec4.squaredLength}
	 * @function
	 */
	vec4.sqrLen = vec4.squaredLength;

	/**
	 * Negates the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to negate
	 * @returns {vec4} out
	 */
	vec4.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = -a[3];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to invert
	 * @returns {vec4} out
	 */
	vec4.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  out[2] = 1.0 / a[2];
	  out[3] = 1.0 / a[3];
	  return out;
	};

	/**
	 * Normalize a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to normalize
	 * @returns {vec4} out
	 */
	vec4.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    var len = x*x + y*y + z*z + w*w;
	    if (len > 0) {
	        len = 1 / Math.sqrt(len);
	        out[0] = x * len;
	        out[1] = y * len;
	        out[2] = z * len;
	        out[3] = w * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec4.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	};

	/**
	 * Performs a linear interpolation between two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec4} out
	 */
	vec4.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1],
	        az = a[2],
	        aw = a[3];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    out[2] = az + t * (b[2] - az);
	    out[3] = aw + t * (b[3] - aw);
	    return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec4} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec4} out
	 */
	vec4.random = function (out, scale) {
	    scale = scale || 1.0;

	    //TODO: This is a pretty awful way of doing this. Find something better.
	    out[0] = glMatrix.RANDOM();
	    out[1] = glMatrix.RANDOM();
	    out[2] = glMatrix.RANDOM();
	    out[3] = glMatrix.RANDOM();
	    vec4.normalize(out, out);
	    vec4.scale(out, out, scale);
	    return out;
	};

	/**
	 * Transforms the vec4 with a mat4.
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec4} out
	 */
	vec4.transformMat4 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2], w = a[3];
	    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
	    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
	    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
	    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
	    return out;
	};

	/**
	 * Transforms the vec4 with a quat
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to transform
	 * @param {quat} q quaternion to transform with
	 * @returns {vec4} out
	 */
	vec4.transformQuat = function(out, a, q) {
	    var x = a[0], y = a[1], z = a[2],
	        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

	        // calculate quat * vec
	        ix = qw * x + qy * z - qz * y,
	        iy = qw * y + qz * x - qx * z,
	        iz = qw * z + qx * y - qy * x,
	        iw = -qx * x - qy * y - qz * z;

	    // calculate result * inverse quat
	    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Perform some operation over an array of vec4s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec4.forEach = (function() {
	    var vec = vec4.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 4;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec4} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec4.str = function (a) {
	    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	module.exports = vec4;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(135);

	/**
	 * @class 2 Dimensional Vector
	 * @name vec2
	 */
	var vec2 = {};

	/**
	 * Creates a new, empty vec2
	 *
	 * @returns {vec2} a new 2D vector
	 */
	vec2.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = 0;
	    out[1] = 0;
	    return out;
	};

	/**
	 * Creates a new vec2 initialized with values from an existing vector
	 *
	 * @param {vec2} a vector to clone
	 * @returns {vec2} a new 2D vector
	 */
	vec2.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = a[0];
	    out[1] = a[1];
	    return out;
	};

	/**
	 * Creates a new vec2 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} a new 2D vector
	 */
	vec2.fromValues = function(x, y) {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = x;
	    out[1] = y;
	    return out;
	};

	/**
	 * Copy the values from one vec2 to another
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the source vector
	 * @returns {vec2} out
	 */
	vec2.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    return out;
	};

	/**
	 * Set the components of a vec2 to the given values
	 *
	 * @param {vec2} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} out
	 */
	vec2.set = function(out, x, y) {
	    out[0] = x;
	    out[1] = y;
	    return out;
	};

	/**
	 * Adds two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    return out;
	};

	/**
	 * Alias for {@link vec2.subtract}
	 * @function
	 */
	vec2.sub = vec2.subtract;

	/**
	 * Multiplies two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    return out;
	};

	/**
	 * Alias for {@link vec2.multiply}
	 * @function
	 */
	vec2.mul = vec2.multiply;

	/**
	 * Divides two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    return out;
	};

	/**
	 * Alias for {@link vec2.divide}
	 * @function
	 */
	vec2.div = vec2.divide;

	/**
	 * Returns the minimum of two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    return out;
	};

	/**
	 * Returns the maximum of two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    return out;
	};

	/**
	 * Scales a vec2 by a scalar number
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec2} out
	 */
	vec2.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    return out;
	};

	/**
	 * Adds two vec2's after scaling the second operand by a scalar value
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec2} out
	 */
	vec2.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec2.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1];
	    return Math.sqrt(x*x + y*y);
	};

	/**
	 * Alias for {@link vec2.distance}
	 * @function
	 */
	vec2.dist = vec2.distance;

	/**
	 * Calculates the squared euclidian distance between two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec2.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1];
	    return x*x + y*y;
	};

	/**
	 * Alias for {@link vec2.squaredDistance}
	 * @function
	 */
	vec2.sqrDist = vec2.squaredDistance;

	/**
	 * Calculates the length of a vec2
	 *
	 * @param {vec2} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec2.length = function (a) {
	    var x = a[0],
	        y = a[1];
	    return Math.sqrt(x*x + y*y);
	};

	/**
	 * Alias for {@link vec2.length}
	 * @function
	 */
	vec2.len = vec2.length;

	/**
	 * Calculates the squared length of a vec2
	 *
	 * @param {vec2} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec2.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1];
	    return x*x + y*y;
	};

	/**
	 * Alias for {@link vec2.squaredLength}
	 * @function
	 */
	vec2.sqrLen = vec2.squaredLength;

	/**
	 * Negates the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to negate
	 * @returns {vec2} out
	 */
	vec2.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to invert
	 * @returns {vec2} out
	 */
	vec2.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  return out;
	};

	/**
	 * Normalize a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to normalize
	 * @returns {vec2} out
	 */
	vec2.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1];
	    var len = x*x + y*y;
	    if (len > 0) {
	        //TODO: evaluate use of glm_invsqrt here?
	        len = 1 / Math.sqrt(len);
	        out[0] = a[0] * len;
	        out[1] = a[1] * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec2.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1];
	};

	/**
	 * Computes the cross product of two vec2's
	 * Note that the cross product must by definition produce a 3D vector
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec3} out
	 */
	vec2.cross = function(out, a, b) {
	    var z = a[0] * b[1] - a[1] * b[0];
	    out[0] = out[1] = 0;
	    out[2] = z;
	    return out;
	};

	/**
	 * Performs a linear interpolation between two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec2} out
	 */
	vec2.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec2} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec2} out
	 */
	vec2.random = function (out, scale) {
	    scale = scale || 1.0;
	    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
	    out[0] = Math.cos(r) * scale;
	    out[1] = Math.sin(r) * scale;
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat2} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat2 = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[2] * y;
	    out[1] = m[1] * x + m[3] * y;
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat2d
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat2d} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat2d = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[2] * y + m[4];
	    out[1] = m[1] * x + m[3] * y + m[5];
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat3
	 * 3rd vector component is implicitly '1'
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat3} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat3 = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[3] * y + m[6];
	    out[1] = m[1] * x + m[4] * y + m[7];
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat4
	 * 3rd vector component is implicitly '0'
	 * 4th vector component is implicitly '1'
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat4 = function(out, a, m) {
	    var x = a[0], 
	        y = a[1];
	    out[0] = m[0] * x + m[4] * y + m[12];
	    out[1] = m[1] * x + m[5] * y + m[13];
	    return out;
	};

	/**
	 * Perform some operation over an array of vec2s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec2.forEach = (function() {
	    var vec = vec2.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 2;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec2} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec2.str = function (a) {
	    return 'vec2(' + a[0] + ', ' + a[1] + ')';
	};

	module.exports = vec2;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	module.exports = FrameHistory;

	function FrameHistory() {
	    this.frameHistory = [];
	}

	FrameHistory.prototype.getFadeProperties = function(duration) {
	    if (duration === undefined) duration = 300;
	    var currentTime = (new Date()).getTime();

	    // Remove frames until only one is outside the duration, or until there are only three
	    while (this.frameHistory.length > 3 && this.frameHistory[1].time + duration < currentTime) {
	        this.frameHistory.shift();
	    }

	    if (this.frameHistory[1].time + duration < currentTime) {
	        this.frameHistory[0].z = this.frameHistory[1].z;
	    }

	    var frameLen = this.frameHistory.length;
	    if (frameLen < 3) console.warn('there should never be less than three frames in the history');

	    // Find the range of zoom levels we want to fade between
	    var startingZ = this.frameHistory[0].z,
	        lastFrame = this.frameHistory[frameLen - 1],
	        endingZ = lastFrame.z,
	        lowZ = Math.min(startingZ, endingZ),
	        highZ = Math.max(startingZ, endingZ);

	    // Calculate the speed of zooming, and how far it would zoom in terms of zoom levels in one duration
	    var zoomDiff = lastFrame.z - this.frameHistory[1].z,
	        timeDiff = lastFrame.time - this.frameHistory[1].time;
	    var fadedist = zoomDiff / (timeDiff / duration);

	    if (isNaN(fadedist)) console.warn('fadedist should never be NaN');

	    // At end of a zoom when the zoom stops changing continue pretending to zoom at that speed
	    // bump is how much farther it would have been if it had continued zooming at the same rate
	    var bump = (currentTime - lastFrame.time) / duration * fadedist;

	    return {
	        fadedist: fadedist,
	        minfadezoom: lowZ,
	        maxfadezoom: highZ,
	        bump: bump
	    };
	};

	// Record frame history that will be used to calculate fading params
	FrameHistory.prototype.record = function(zoom) {
	    var currentTime = (new Date()).getTime();

	    // first frame ever
	    if (!this.frameHistory.length) {
	        this.frameHistory.push({time: 0, z: zoom }, {time: 0, z: zoom });
	    }

	    if (this.frameHistory.length === 2 || this.frameHistory[this.frameHistory.length - 1].z !== zoom) {
	        this.frameHistory.push({
	            time: currentTime,
	            z: zoom
	        });
	    }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mat4 = __webpack_require__(134).mat4;

	var browser = __webpack_require__(14);
	var drawCollisionDebug = __webpack_require__(146);
	var util = __webpack_require__(11);

	module.exports = drawSymbols;

	function drawSymbols(painter, source, layer, coords) {
	    if (painter.isOpaquePass) return;

	    var drawAcrossEdges = !(layer.layout['text-allow-overlap'] || layer.layout['icon-allow-overlap'] ||
	        layer.layout['text-ignore-placement'] || layer.layout['icon-ignore-placement']);

	    var gl = painter.gl;

	    // Disable the stencil test so that labels aren't clipped to tile boundaries.
	    //
	    // Layers with features that may be drawn overlapping aren't clipped. These
	    // layers are sorted in the y direction, and to draw the correct ordering near
	    // tile edges the icons are included in both tiles and clipped when drawing.
	    if (drawAcrossEdges) {
	        gl.disable(gl.STENCIL_TEST);
	    } else {
	        gl.enable(gl.STENCIL_TEST);
	    }

	    painter.setDepthSublayer(0);
	    painter.depthMask(false);
	    gl.disable(gl.DEPTH_TEST);

	    var tile, elementGroups, posMatrix;

	    for (var i = 0; i < coords.length; i++) {
	        tile = source.getTile(coords[i]);

	        if (!tile.buffers) continue;
	        elementGroups = tile.elementGroups[layer.ref || layer.id];
	        if (!elementGroups) continue;
	        if (!elementGroups.icon.groups.length) continue;

	        posMatrix = painter.calculatePosMatrix(coords[i], source.maxzoom);
	        painter.enableTileClippingMask(coords[i]);
	        drawSymbol(painter, layer, posMatrix, tile, elementGroups.icon, 'icon', elementGroups.sdfIcons, elementGroups.iconsNeedLinear);
	    }

	    for (var j = 0; j < coords.length; j++) {
	        tile = source.getTile(coords[j]);

	        if (!tile.buffers) continue;
	        elementGroups = tile.elementGroups[layer.ref || layer.id];
	        if (!elementGroups) continue;
	        if (!elementGroups.glyph.groups.length) continue;

	        posMatrix = painter.calculatePosMatrix(coords[j], source.maxzoom);
	        painter.enableTileClippingMask(coords[j]);
	        drawSymbol(painter, layer, posMatrix, tile, elementGroups.glyph, 'text', true, false);
	    }

	    gl.enable(gl.DEPTH_TEST);

	    drawCollisionDebug(painter, source, layer, coords);
	}

	var defaultSizes = {
	    icon: 1,
	    text: 24
	};

	function drawSymbol(painter, layer, posMatrix, tile, elementGroups, prefix, sdf, iconsNeedLinear) {
	    var gl = painter.gl;

	    posMatrix = painter.translatePosMatrix(posMatrix, tile, layer.paint[prefix + '-translate'], layer.paint[prefix + '-translate-anchor']);

	    var tr = painter.transform;
	    var alignedWithMap = layer.layout[prefix + '-rotation-alignment'] === 'map';
	    var skewed = alignedWithMap;
	    var exMatrix, s, gammaScale;

	    if (skewed) {
	        exMatrix = mat4.create();
	        s = tile.pixelsToTileUnits(1, painter.transform.zoom);
	        gammaScale = 1 / Math.cos(tr._pitch);
	    } else {
	        exMatrix = mat4.clone(painter.transform.exMatrix);
	        s = painter.transform.altitude;
	        gammaScale = 1;
	    }
	    mat4.scale(exMatrix, exMatrix, [s, s, 1]);

	    var fontSize = layer.layout[prefix + '-size'];
	    var fontScale = fontSize / defaultSizes[prefix];
	    mat4.scale(exMatrix, exMatrix, [ fontScale, fontScale, 1 ]);

	    // calculate how much longer the real world distance is at the top of the screen
	    // than at the middle of the screen.
	    var topedgelength = Math.sqrt(tr.height * tr.height / 4  * (1 + tr.altitude * tr.altitude));
	    var x = tr.height / 2 * Math.tan(tr._pitch);
	    var extra = (topedgelength + x) / topedgelength - 1;

	    var text = prefix === 'text';
	    var shader, vertex, elements, texsize;

	    if (!text && !painter.style.sprite.loaded())
	        return;

	    gl.activeTexture(gl.TEXTURE0);

	    if (sdf) {
	        shader = painter.sdfShader;
	    } else {
	        shader = painter.iconShader;
	    }

	    if (text) {
	        // use the fonstack used when parsing the tile, not the fontstack
	        // at the current zoom level (layout['text-font']).
	        var fontstack = elementGroups.fontstack;
	        var glyphAtlas = fontstack && painter.glyphSource.getGlyphAtlas(fontstack);
	        if (!glyphAtlas) return;

	        glyphAtlas.updateTexture(gl);
	        vertex = tile.buffers.glyphVertex;
	        elements = tile.buffers.glyphElement;
	        texsize = [glyphAtlas.width / 4, glyphAtlas.height / 4];
	    } else {
	        var mapMoving = painter.options.rotating || painter.options.zooming;
	        var iconScaled = fontScale !== 1 || browser.devicePixelRatio !== painter.spriteAtlas.pixelRatio || iconsNeedLinear;
	        var iconTransformed = alignedWithMap || painter.transform.pitch;
	        painter.spriteAtlas.bind(gl, sdf || mapMoving || iconScaled || iconTransformed);
	        vertex = tile.buffers.iconVertex;
	        elements = tile.buffers.iconElement;
	        texsize = [painter.spriteAtlas.width / 4, painter.spriteAtlas.height / 4];
	    }

	    gl.switchShader(shader, posMatrix, exMatrix);
	    gl.uniform1i(shader.u_texture, 0);
	    gl.uniform2fv(shader.u_texsize, texsize);
	    gl.uniform1i(shader.u_skewed, skewed);
	    gl.uniform1f(shader.u_extra, extra);

	    // adjust min/max zooms for variable font sizes
	    var zoomAdjust = Math.log(fontSize / elementGroups.adjustedSize) / Math.LN2 || 0;


	    gl.uniform1f(shader.u_zoom, (painter.transform.zoom - zoomAdjust) * 10); // current zoom level

	    var f = painter.frameHistory.getFadeProperties(300);
	    gl.uniform1f(shader.u_fadedist, f.fadedist * 10);
	    gl.uniform1f(shader.u_minfadezoom, Math.floor(f.minfadezoom * 10));
	    gl.uniform1f(shader.u_maxfadezoom, Math.floor(f.maxfadezoom * 10));
	    gl.uniform1f(shader.u_fadezoom, (painter.transform.zoom + f.bump) * 10);

	    var group, offset, count, elementOffset;

	    elements.bind(gl);

	    if (sdf) {
	        var sdfPx = 8;
	        var blurOffset = 1.19;
	        var haloOffset = 6;
	        var gamma = 0.105 * defaultSizes[prefix] / fontSize / browser.devicePixelRatio;

	        if (layer.paint[prefix + '-halo-width']) {
	            var haloColor = util.premultiply(layer.paint[prefix + '-halo-color'], layer.paint[prefix + '-opacity']);

	            // Draw halo underneath the text.
	            gl.uniform1f(shader.u_gamma, (layer.paint[prefix + '-halo-blur'] * blurOffset / fontScale / sdfPx + gamma) * gammaScale);
	            gl.uniform4fv(shader.u_color, haloColor);
	            gl.uniform1f(shader.u_buffer, (haloOffset - layer.paint[prefix + '-halo-width'] / fontScale) / sdfPx);

	            for (var j = 0; j < elementGroups.groups.length; j++) {
	                group = elementGroups.groups[j];
	                offset = group.vertexStartIndex * vertex.itemSize;
	                vertex.bind(gl);
	                vertex.setAttribPointers(gl, shader, offset);

	                count = group.elementLength * 3;
	                elementOffset = group.elementStartIndex * elements.itemSize;
	                gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, elementOffset);
	            }
	        }

	        var color = util.premultiply(layer.paint[prefix + '-color'], layer.paint[prefix + '-opacity']);
	        gl.uniform1f(shader.u_gamma, gamma * gammaScale);
	        gl.uniform4fv(shader.u_color, color);
	        gl.uniform1f(shader.u_buffer, (256 - 64) / 256);

	        for (var i = 0; i < elementGroups.groups.length; i++) {
	            group = elementGroups.groups[i];
	            offset = group.vertexStartIndex * vertex.itemSize;
	            vertex.bind(gl);
	            vertex.setAttribPointers(gl, shader, offset);

	            count = group.elementLength * 3;
	            elementOffset = group.elementStartIndex * elements.itemSize;
	            gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, elementOffset);
	        }

	    } else {
	        gl.uniform1f(shader.u_opacity, layer.paint['icon-opacity']);
	        for (var k = 0; k < elementGroups.groups.length; k++) {
	            group = elementGroups.groups[k];
	            offset = group.vertexStartIndex * vertex.itemSize;
	            vertex.bind(gl);
	            vertex.setAttribPointers(gl, shader, offset);

	            count = group.elementLength * 3;
	            elementOffset = group.elementStartIndex * elements.itemSize;
	            gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, elementOffset);
	        }
	    }
	}


/***/ },
/* 146 */
/***/ function(module, exports) {

	'use strict';

	module.exports = drawCollisionDebug;

	function drawCollisionDebug(painter, source, layer, coords) {
	    var gl = painter.gl;
	    var shader = painter.collisionBoxShader;
	    gl.enable(gl.STENCIL_TEST);
	    gl.switchShader(shader);

	    for (var i = 0; i < coords.length; i++) {
	        var coord = coords[i];
	        var tile = source.getTile(coord);
	        var elementGroups = tile.getElementGroups(layer, 'collisionBox');

	        if (!elementGroups) continue;
	        if (!tile.buffers) continue;
	        if (elementGroups.groups[0].vertexLength === 0) continue;

	        var buffer = tile.buffers.collisionBoxVertex;
	        buffer.bind(gl);
	        buffer.setAttribPointers(gl, shader, 0);

	        var posMatrix = painter.calculatePosMatrix(coord, source.maxzoom);
	        gl.setPosMatrix(posMatrix);

	        painter.enableTileClippingMask(coord);

	        gl.lineWidth(1);
	        gl.uniform1f(shader.u_scale, Math.pow(2, painter.transform.zoom - tile.coord.z));
	        gl.uniform1f(shader.u_zoom, painter.transform.zoom * 10);
	        gl.uniform1f(shader.u_maxzoom, (tile.coord.z + 1) * 10);

	        gl.drawArrays(
	            gl.LINES,
	            elementGroups.groups[0].vertexStartIndex,
	            elementGroups.groups[0].vertexLength
	        );

	    }
	}


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var browser = __webpack_require__(14);
	var util = __webpack_require__(11);

	module.exports = drawCircles;

	function drawCircles(painter, source, layer, coords) {
	    if (painter.isOpaquePass) return;

	    var gl = painter.gl;

	    var shader = painter.circleShader;
	    painter.gl.switchShader(shader);

	    painter.setDepthSublayer(0);
	    painter.depthMask(false);

	    // Allow circles to be drawn across boundaries, so that
	    // large circles are not clipped to tiles
	    gl.disable(gl.STENCIL_TEST);

	    // antialiasing factor: this is a minimum blur distance that serves as
	    // a faux-antialiasing for the circle. since blur is a ratio of the circle's
	    // size and the intent is to keep the blur at roughly 1px, the two
	    // are inversely related.
	    var antialias = 1 / browser.devicePixelRatio / layer.paint['circle-radius'];

	    var color = util.premultiply(layer.paint['circle-color'], layer.paint['circle-opacity']);
	    gl.uniform4fv(shader.u_color, color);
	    gl.uniform1f(shader.u_blur, Math.max(layer.paint['circle-blur'], antialias));
	    gl.uniform1f(shader.u_size, layer.paint['circle-radius']);

	    for (var i = 0; i < coords.length; i++) {
	        var coord = coords[i];

	        var tile = source.getTile(coord);
	        if (!tile.buffers) continue;
	        var elementGroups = tile.getElementGroups(layer, 'circle');
	        if (!elementGroups) continue;

	        var vertex = tile.buffers.circleVertex;
	        var elements = tile.buffers.circleElement;

	        gl.setPosMatrix(painter.translatePosMatrix(
	            painter.calculatePosMatrix(coord, source.maxzoom),
	            tile,
	            layer.paint['circle-translate'],
	            layer.paint['circle-translate-anchor']
	        ));
	        gl.setExMatrix(painter.transform.exMatrix);

	        for (var k = 0; k < elementGroups.groups.length; k++) {
	            var group = elementGroups.groups[k];
	            var offset = group.vertexStartIndex * vertex.itemSize;

	            vertex.bind(gl);
	            vertex.setAttribPointers(gl, shader, offset);

	            elements.bind(gl);

	            var count = group.elementLength * 3;
	            var elementOffset = group.elementStartIndex * elements.itemSize;
	            gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, elementOffset);
	        }
	    }
	}


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var browser = __webpack_require__(14);
	var mat2 = __webpack_require__(134).mat2;
	var util = __webpack_require__(11);

	/**
	 * Draw a line. Under the hood this will read elements from
	 * a tile, dash textures from a lineAtlas, and style properties from a layer.
	 * @param {Object} painter
	 * @param {Object} layer
	 * @param {Object} posMatrix
	 * @param {Tile} tile
	 * @returns {undefined} draws with the painter
	 * @private
	 */
	module.exports = function drawLine(painter, source, layer, coords) {
	    if (painter.isOpaquePass) return;
	    painter.setDepthSublayer(0);
	    painter.depthMask(false);

	    var hasData = coords.some(function(coord) {
	        return source.getTile(coord).getElementGroups(layer, 'line');
	    });
	    if (!hasData) return;

	    var gl = painter.gl;
	    gl.enable(gl.STENCIL_TEST);

	    // don't draw zero-width lines
	    if (layer.paint['line-width'] <= 0) return;

	    // the distance over which the line edge fades out.
	    // Retina devices need a smaller distance to avoid aliasing.
	    var antialiasing = 1 / browser.devicePixelRatio;

	    var blur = layer.paint['line-blur'] + antialiasing;
	    var edgeWidth = layer.paint['line-width'] / 2;
	    var inset = -1;
	    var offset = 0;
	    var shift = 0;

	    if (layer.paint['line-gap-width'] > 0) {
	        inset = layer.paint['line-gap-width'] / 2 + antialiasing * 0.5;
	        edgeWidth = layer.paint['line-width'];

	        // shift outer lines half a pixel towards the middle to eliminate the crack
	        offset = inset - antialiasing / 2;
	    }

	    var outset = offset + edgeWidth + antialiasing / 2 + shift;
	    var color = util.premultiply(layer.paint['line-color'], layer.paint['line-opacity']);

	    var tr = painter.transform;

	    var antialiasingMatrix = mat2.create();
	    mat2.scale(antialiasingMatrix, antialiasingMatrix, [1, Math.cos(tr._pitch)]);
	    mat2.rotate(antialiasingMatrix, antialiasingMatrix, painter.transform.angle);

	    // calculate how much longer the real world distance is at the top of the screen
	    // than at the middle of the screen.
	    var topedgelength = Math.sqrt(tr.height * tr.height / 4  * (1 + tr.altitude * tr.altitude));
	    var x = tr.height / 2 * Math.tan(tr._pitch);
	    var extra = (topedgelength + x) / topedgelength - 1;

	    var dasharray = layer.paint['line-dasharray'];
	    var image = layer.paint['line-pattern'];
	    var shader, posA, posB, imagePosA, imagePosB;

	    if (dasharray) {
	        shader = painter.linesdfpatternShader;
	        gl.switchShader(shader);

	        gl.uniform2fv(shader.u_linewidth, [ outset, inset ]);
	        gl.uniform1f(shader.u_blur, blur);
	        gl.uniform4fv(shader.u_color, color);

	        posA = painter.lineAtlas.getDash(dasharray.from, layer.layout['line-cap'] === 'round');
	        posB = painter.lineAtlas.getDash(dasharray.to, layer.layout['line-cap'] === 'round');
	        painter.lineAtlas.bind(gl);

	        gl.uniform1f(shader.u_tex_y_a, posA.y);
	        gl.uniform1f(shader.u_tex_y_b, posB.y);
	        gl.uniform1i(shader.u_image, 0);
	        gl.uniform1f(shader.u_mix, dasharray.t);

	        gl.uniform1f(shader.u_extra, extra);
	        gl.uniform1f(shader.u_offset, -layer.paint['line-offset']);
	        gl.uniformMatrix2fv(shader.u_antialiasingmatrix, false, antialiasingMatrix);

	    } else if (image) {
	        imagePosA = painter.spriteAtlas.getPosition(image.from, true);
	        imagePosB = painter.spriteAtlas.getPosition(image.to, true);
	        if (!imagePosA || !imagePosB) return;

	        painter.spriteAtlas.bind(gl, true);

	        shader = painter.linepatternShader;
	        gl.switchShader(shader);

	        gl.uniform2fv(shader.u_linewidth, [ outset, inset ]);
	        gl.uniform1f(shader.u_blur, blur);
	        gl.uniform2fv(shader.u_pattern_tl_a, imagePosA.tl);
	        gl.uniform2fv(shader.u_pattern_br_a, imagePosA.br);
	        gl.uniform2fv(shader.u_pattern_tl_b, imagePosB.tl);
	        gl.uniform2fv(shader.u_pattern_br_b, imagePosB.br);
	        gl.uniform1f(shader.u_fade, image.t);
	        gl.uniform1f(shader.u_opacity, layer.paint['line-opacity']);

	        gl.uniform1f(shader.u_extra, extra);
	        gl.uniform1f(shader.u_offset, -layer.paint['line-offset']);
	        gl.uniformMatrix2fv(shader.u_antialiasingmatrix, false, antialiasingMatrix);

	    } else {
	        shader = painter.lineShader;
	        gl.switchShader(shader);

	        gl.uniform2fv(shader.u_linewidth, [ outset, inset ]);
	        gl.uniform1f(shader.u_blur, blur);
	        gl.uniform1f(shader.u_extra, extra);
	        gl.uniform1f(shader.u_offset, -layer.paint['line-offset']);
	        gl.uniformMatrix2fv(shader.u_antialiasingmatrix, false, antialiasingMatrix);
	        gl.uniform4fv(shader.u_color, color);
	    }

	    for (var k = 0; k < coords.length; k++) {
	        var coord = coords[k];
	        var tile = source.getTile(coord);

	        var elementGroups = tile.getElementGroups(layer, 'line');
	        if (!elementGroups) continue;

	        painter.enableTileClippingMask(coord);

	        // set uniforms that are different for each tile
	        var posMatrix = painter.translatePosMatrix(painter.calculatePosMatrix(coord, source.maxzoom), tile, layer.paint['line-translate'], layer.paint['line-translate-anchor']);

	        gl.setPosMatrix(posMatrix);
	        gl.setExMatrix(painter.transform.exMatrix);
	        var ratio = 1 / tile.pixelsToTileUnits(1, painter.transform.zoom);

	        if (dasharray) {
	            var widthA = posA.width * dasharray.fromScale;
	            var widthB = posB.width * dasharray.toScale;
	            var scaleA = [1 / tile.pixelsToTileUnits(widthA, painter.transform.tileZoom), -posA.height / 2];
	            var scaleB = [1 / tile.pixelsToTileUnits(widthB, painter.transform.tileZoom), -posB.height / 2];
	            var gamma = painter.lineAtlas.width / (Math.min(widthA, widthB) * 256 * browser.devicePixelRatio) / 2;
	            gl.uniform1f(shader.u_ratio, ratio);
	            gl.uniform2fv(shader.u_patternscale_a, scaleA);
	            gl.uniform2fv(shader.u_patternscale_b, scaleB);
	            gl.uniform1f(shader.u_sdfgamma, gamma);

	        } else if (image) {
	            gl.uniform1f(shader.u_ratio, ratio);
	            gl.uniform2fv(shader.u_pattern_size_a, [
	                tile.pixelsToTileUnits(imagePosA.size[0] * image.fromScale, painter.transform.tileZoom),
	                imagePosB.size[1]
	            ]);
	            gl.uniform2fv(shader.u_pattern_size_b, [
	                tile.pixelsToTileUnits(imagePosB.size[0] * image.toScale, painter.transform.tileZoom),
	                imagePosB.size[1]
	            ]);

	        } else {
	            gl.uniform1f(shader.u_ratio, ratio);
	        }

	        var vertex = tile.buffers.lineVertex;
	        vertex.bind(gl);
	        var element = tile.buffers.lineElement;
	        element.bind(gl);

	        for (var i = 0; i < elementGroups.groups.length; i++) {
	            var group = elementGroups.groups[i];
	            var vtxOffset = group.vertexStartIndex * vertex.itemSize;
	            gl.vertexAttribPointer(shader.a_pos, 2, gl.SHORT, false, 8, vtxOffset + 0);
	            gl.vertexAttribPointer(shader.a_data, 4, gl.BYTE, false, 8, vtxOffset + 4);

	            var count = group.elementLength * 3;
	            var elementOffset = group.elementStartIndex * element.itemSize;
	            gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, elementOffset);
	        }
	    }

	};


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var browser = __webpack_require__(14);
	var util = __webpack_require__(11);

	module.exports = draw;

	function draw(painter, source, layer, coords) {
	    var gl = painter.gl;
	    gl.enable(gl.STENCIL_TEST);

	    var color = util.premultiply(layer.paint['fill-color'], layer.paint['fill-opacity']);
	    var image = layer.paint['fill-pattern'];
	    var strokeColor = util.premultiply(layer.paint['fill-outline-color'], layer.paint['fill-opacity']);

	    // Draw fill
	    if (image ? !painter.isOpaquePass : painter.isOpaquePass === (color[3] === 1)) {
	        // Once we switch to earcut drawing we can pull most of the WebGL setup
	        // outside of this coords loop.
	        for (var i = 0; i < coords.length; i++) {
	            drawFill(painter, source, layer, coords[i]);
	        }
	    }

	    // Draw stroke
	    if (!painter.isOpaquePass && layer.paint['fill-antialias'] && !(layer.paint['fill-pattern'] && !strokeColor)) {
	        gl.switchShader(painter.outlineShader);
	        gl.lineWidth(2 * browser.devicePixelRatio * 10);

	        if (strokeColor) {
	            // If we defined a different color for the fill outline, we are
	            // going to ignore the bits in 0x07 and just care about the global
	            // clipping mask.
	            painter.setDepthSublayer(2);

	        } else {
	            // Otherwise, we only want to drawFill the antialiased parts that are
	            // *outside* the current shape. This is important in case the fill
	            // or stroke color is translucent. If we wouldn't clip to outside
	            // the current shape, some pixels from the outline stroke overlapped
	            // the (non-antialiased) fill.
	            painter.setDepthSublayer(0);
	        }

	        gl.uniform2f(painter.outlineShader.u_world, gl.drawingBufferWidth, gl.drawingBufferHeight);
	        gl.uniform4fv(painter.outlineShader.u_color, strokeColor ? strokeColor : color);

	        for (var j = 0; j < coords.length; j++) {
	            drawStroke(painter, source, layer, coords[j]);
	        }
	    }
	}

	function drawFill(painter, source, layer, coord) {
	    var tile = source.getTile(coord);
	    if (!tile.buffers) return;
	    var elementGroups = tile.getElementGroups(layer, 'fill');
	    if (!elementGroups) return;

	    var gl = painter.gl;

	    var color = util.premultiply(layer.paint['fill-color'], layer.paint['fill-opacity']);
	    var image = layer.paint['fill-pattern'];
	    var opacity = layer.paint['fill-opacity'];

	    var posMatrix = painter.calculatePosMatrix(coord, source.maxzoom);
	    var translatedPosMatrix = painter.translatePosMatrix(posMatrix, tile, layer.paint['fill-translate'], layer.paint['fill-translate-anchor']);

	    // Draw the stencil mask.
	    painter.setDepthSublayer(1);

	    // We're only drawFilling to the first seven bits (== support a maximum of
	    // 8 overlapping polygons in one place before we get rendering errors).
	    gl.stencilMask(0x07);
	    gl.clear(gl.STENCIL_BUFFER_BIT);

	    // Draw front facing triangles. Wherever the 0x80 bit is 1, we are
	    // increasing the lower 7 bits by one if the triangle is a front-facing
	    // triangle. This means that all visible polygons should be in CCW
	    // orientation, while all holes (see below) are in CW orientation.
	    painter.enableTileClippingMask(coord);

	    // When we do a nonzero fill, we count the number of times a pixel is
	    // covered by a counterclockwise polygon, and subtract the number of
	    // times it is "uncovered" by a clockwise polygon.
	    gl.stencilOpSeparate(gl.FRONT, gl.KEEP, gl.KEEP, gl.INCR_WRAP);
	    gl.stencilOpSeparate(gl.BACK, gl.KEEP, gl.KEEP, gl.DECR_WRAP);

	    // When drawFilling a shape, we first drawFill all shapes to the stencil buffer
	    // and incrementing all areas where polygons are
	    gl.colorMask(false, false, false, false);
	    painter.depthMask(false);

	    // Draw the actual triangle fan into the stencil buffer.
	    gl.switchShader(painter.fillShader, translatedPosMatrix);

	    // Draw all buffers
	    var vertex = tile.buffers.fillVertex;
	    vertex.bind(gl);

	    var elements = tile.buffers.fillElement;
	    elements.bind(gl);

	    for (var i = 0; i < elementGroups.groups.length; i++) {
	        var group = elementGroups.groups[i];
	        var offset = group.vertexStartIndex * vertex.itemSize;
	        vertex.setAttribPointers(gl, painter.fillShader, offset);

	        var count = group.elementLength * 3;
	        var elementOffset = group.elementStartIndex * elements.itemSize;
	        gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, elementOffset);
	    }

	    // Now that we have the stencil mask in the stencil buffer, we can start
	    // writing to the color buffer.
	    gl.colorMask(true, true, true, true);
	    painter.depthMask(true);

	    // From now on, we don't want to update the stencil buffer anymore.
	    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
	    gl.stencilMask(0x0);
	    var shader;

	    if (image) {
	        // Draw texture fill
	        var imagePosA = painter.spriteAtlas.getPosition(image.from, true);
	        var imagePosB = painter.spriteAtlas.getPosition(image.to, true);
	        if (!imagePosA || !imagePosB) return;

	        shader = painter.patternShader;
	        gl.switchShader(shader, posMatrix);
	        gl.uniform1i(shader.u_image, 0);
	        gl.uniform2fv(shader.u_pattern_tl_a, imagePosA.tl);
	        gl.uniform2fv(shader.u_pattern_br_a, imagePosA.br);
	        gl.uniform2fv(shader.u_pattern_tl_b, imagePosB.tl);
	        gl.uniform2fv(shader.u_pattern_br_b, imagePosB.br);
	        gl.uniform1f(shader.u_opacity, opacity);
	        gl.uniform1f(shader.u_mix, image.t);

	        var imageSizeScaledA = [
	            (imagePosA.size[0] * image.fromScale),
	            (imagePosA.size[1] * image.fromScale)
	        ];
	        var imageSizeScaledB = [
	            (imagePosB.size[0] * image.toScale),
	            (imagePosB.size[1] * image.toScale)
	        ];

	        gl.uniform2fv(shader.u_patternscale_a, [
	            1 / tile.pixelsToTileUnits(imageSizeScaledA[0], painter.transform.tileZoom),
	            1 / tile.pixelsToTileUnits(imageSizeScaledA[1], painter.transform.tileZoom)
	        ]);

	        gl.uniform2fv(shader.u_patternscale_b, [
	            1 / tile.pixelsToTileUnits(imageSizeScaledB[0], painter.transform.tileZoom),
	            1 / tile.pixelsToTileUnits(imageSizeScaledB[1], painter.transform.tileZoom)
	        ]);

	        var tileSizeAtNearestZoom = tile.tileSize * Math.pow(2, painter.transform.tileZoom - tile.coord.z);

	        // shift images to match at tile boundaries
	        var offsetAx = ((tileSizeAtNearestZoom / imageSizeScaledA[0]) % 1) * (tile.coord.x + coord.w * Math.pow(2, tile.coord.z));
	        var offsetAy = ((tileSizeAtNearestZoom / imageSizeScaledA[1]) % 1) * tile.coord.y;

	        var offsetBx = ((tileSizeAtNearestZoom / imageSizeScaledB[0]) % 1) * (tile.coord.x + coord.w * Math.pow(2, tile.coord.z));
	        var offsetBy = ((tileSizeAtNearestZoom / imageSizeScaledB[1]) % 1) * tile.coord.y;

	        gl.uniform2fv(shader.u_offset_a, [offsetAx, offsetAy]);
	        gl.uniform2fv(shader.u_offset_b, [offsetBx, offsetBy]);

	        painter.spriteAtlas.bind(gl, true);

	    } else {
	        // Draw filling rectangle.
	        shader = painter.fillShader;
	        gl.switchShader(shader, posMatrix);
	        gl.uniform4fv(shader.u_color, color);
	    }

	    // Only draw regions that we marked
	    gl.stencilFunc(gl.NOTEQUAL, 0x0, 0x07);
	    gl.bindBuffer(gl.ARRAY_BUFFER, painter.tileExtentBuffer);
	    gl.vertexAttribPointer(shader.a_pos, painter.tileExtentBuffer.itemSize, gl.SHORT, false, 0, 0);
	    gl.drawArrays(gl.TRIANGLE_STRIP, 0, painter.tileExtentBuffer.itemCount);

	    gl.stencilMask(0x00);
	}

	function drawStroke(painter, source, layer, coord) {
	    var tile = source.getTile(coord);
	    if (!tile.buffers) return;
	    if (!tile.elementGroups[layer.ref || layer.id]) return;

	    var gl = painter.gl;
	    var elementGroups = tile.elementGroups[layer.ref || layer.id].fill;

	    gl.setPosMatrix(painter.translatePosMatrix(
	        painter.calculatePosMatrix(coord, source.maxzoom),
	        tile,
	        layer.paint['fill-translate'],
	        layer.paint['fill-translate-anchor']
	    ));

	    // Draw all buffers
	    var vertex = tile.buffers.fillVertex;
	    var elements = tile.buffers.fillSecondElement;
	    vertex.bind(gl);
	    elements.bind(gl);

	    painter.enableTileClippingMask(coord);

	    for (var k = 0; k < elementGroups.groups.length; k++) {
	        var group = elementGroups.groups[k];
	        var offset = group.vertexStartIndex * vertex.itemSize;
	        vertex.setAttribPointers(gl, painter.outlineShader, offset);

	        var count = group.secondElementLength * 2;
	        var elementOffset = group.secondElementStartIndex * elements.itemSize;
	        gl.drawElements(gl.LINES, count, gl.UNSIGNED_SHORT, elementOffset);
	    }
	}


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);

	module.exports = drawRaster;

	function drawRaster(painter, source, layer, coords) {
	    if (painter.isOpaquePass) return;

	    var gl = painter.gl;

	    // Change depth function to prevent double drawing in areas where tiles overlap.
	    gl.depthFunc(gl.LESS);

	    for (var i = coords.length - 1; i >= 0; i--) {
	        drawRasterTile(painter, source, layer, coords[i]);
	    }

	    gl.depthFunc(gl.LEQUAL);
	}

	function drawRasterTile(painter, source, layer, coord) {

	    painter.setDepthSublayer(0);

	    var gl = painter.gl;

	    gl.disable(gl.STENCIL_TEST);

	    var tile = source.getTile(coord);
	    var posMatrix = painter.calculatePosMatrix(coord, source.maxzoom);

	    var shader = painter.rasterShader;
	    gl.switchShader(shader, posMatrix);

	    // color parameters
	    gl.uniform1f(shader.u_brightness_low, layer.paint['raster-brightness-min']);
	    gl.uniform1f(shader.u_brightness_high, layer.paint['raster-brightness-max']);
	    gl.uniform1f(shader.u_saturation_factor, saturationFactor(layer.paint['raster-saturation']));
	    gl.uniform1f(shader.u_contrast_factor, contrastFactor(layer.paint['raster-contrast']));
	    gl.uniform3fv(shader.u_spin_weights, spinWeights(layer.paint['raster-hue-rotate']));

	    var parentTile = tile.source && tile.source._pyramid.findLoadedParent(coord, 0, {}),
	        opacities = getOpacities(tile, parentTile, layer, painter.transform);

	    var parentScaleBy, parentTL;

	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, tile.texture);

	    if (parentTile) {
	        gl.activeTexture(gl.TEXTURE1);
	        gl.bindTexture(gl.TEXTURE_2D, parentTile.texture);

	        parentScaleBy = Math.pow(2, parentTile.coord.z - tile.coord.z);
	        parentTL = [tile.coord.x * parentScaleBy % 1, tile.coord.y * parentScaleBy % 1];
	    } else {
	        opacities[1] = 0;
	    }

	    // cross-fade parameters
	    gl.uniform2fv(shader.u_tl_parent, parentTL || [0, 0]);
	    gl.uniform1f(shader.u_scale_parent, parentScaleBy || 1);
	    gl.uniform1f(shader.u_buffer_scale, 1);
	    gl.uniform1f(shader.u_opacity0, opacities[0]);
	    gl.uniform1f(shader.u_opacity1, opacities[1]);
	    gl.uniform1i(shader.u_image0, 0);
	    gl.uniform1i(shader.u_image1, 1);

	    gl.bindBuffer(gl.ARRAY_BUFFER, tile.boundsBuffer || painter.tileExtentBuffer);

	    gl.vertexAttribPointer(shader.a_pos,         2, gl.SHORT, false, 8, 0);
	    gl.vertexAttribPointer(shader.a_texture_pos, 2, gl.SHORT, false, 8, 4);
	    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}

	function spinWeights(angle) {
	    angle *= Math.PI / 180;
	    var s = Math.sin(angle);
	    var c = Math.cos(angle);
	    return [
	        (2 * c + 1) / 3,
	        (-Math.sqrt(3) * s - c + 1) / 3,
	        (Math.sqrt(3) * s - c + 1) / 3
	    ];
	}

	function contrastFactor(contrast) {
	    return contrast > 0 ?
	        1 / (1 - contrast) :
	        1 + contrast;
	}

	function saturationFactor(saturation) {
	    return saturation > 0 ?
	        1 - 1 / (1.001 - saturation) :
	        -saturation;
	}

	function getOpacities(tile, parentTile, layer, transform) {
	    var opacity = [1, 0];
	    var fadeDuration = layer.paint['raster-fade-duration'];

	    if (tile.source && fadeDuration > 0) {
	        var now = new Date().getTime();

	        var sinceTile = (now - tile.timeAdded) / fadeDuration;
	        var sinceParent = parentTile ? (now - parentTile.timeAdded) / fadeDuration : -1;

	        var idealZ = tile.source._pyramid.coveringZoomLevel(transform);
	        var parentFurther = parentTile ? Math.abs(parentTile.coord.z - idealZ) > Math.abs(tile.coord.z - idealZ) : false;

	        if (!parentTile || parentFurther) {
	            // if no parent or parent is older
	            opacity[0] = util.clamp(sinceTile, 0, 1);
	            opacity[1] = 1 - opacity[0];
	        } else {
	            // parent is younger, zooming out
	            opacity[0] = util.clamp(1 - sinceParent, 0, 1);
	            opacity[1] = 1 - opacity[0];
	        }
	    }

	    var op = layer.paint['raster-opacity'];
	    opacity[0] *= op;
	    opacity[1] *= op;

	    return opacity;
	}


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TilePyramid = __webpack_require__(22);
	var pyramid = new TilePyramid({ tileSize: 512 });
	var util = __webpack_require__(11);
	var EXTENT = __webpack_require__(24).EXTENT;

	module.exports = drawBackground;

	function drawBackground(painter, source, layer) {
	    var gl = painter.gl;
	    var transform = painter.transform;
	    var color = util.premultiply(layer.paint['background-color'], layer.paint['background-opacity']);
	    var image = layer.paint['background-pattern'];
	    var opacity = layer.paint['background-opacity'];
	    var shader;

	    var imagePosA = image ? painter.spriteAtlas.getPosition(image.from, true) : null;
	    var imagePosB = image ? painter.spriteAtlas.getPosition(image.to, true) : null;

	    painter.setDepthSublayer(0);
	    if (imagePosA && imagePosB) {

	        if (painter.isOpaquePass) return;

	        // Draw texture fill
	        shader = painter.patternShader;
	        gl.switchShader(shader);
	        gl.uniform1i(shader.u_image, 0);
	        gl.uniform2fv(shader.u_pattern_tl_a, imagePosA.tl);
	        gl.uniform2fv(shader.u_pattern_br_a, imagePosA.br);
	        gl.uniform2fv(shader.u_pattern_tl_b, imagePosB.tl);
	        gl.uniform2fv(shader.u_pattern_br_b, imagePosB.br);
	        gl.uniform1f(shader.u_opacity, opacity);

	        gl.uniform1f(shader.u_mix, image.t);

	        var factor = (EXTENT / transform.tileSize) / Math.pow(2, 0);

	        gl.uniform2fv(shader.u_patternscale_a, [
	            1 / (imagePosA.size[0] * factor * image.fromScale),
	            1 / (imagePosA.size[1] * factor * image.fromScale)
	        ]);

	        gl.uniform2fv(shader.u_patternscale_b, [
	            1 / (imagePosB.size[0] * factor * image.toScale),
	            1 / (imagePosB.size[1] * factor * image.toScale)
	        ]);

	        painter.spriteAtlas.bind(gl, true);

	    } else {
	        // Draw filling rectangle.
	        if (painter.isOpaquePass !== (color[3] === 1)) return;

	        shader = painter.fillShader;
	        gl.switchShader(shader);
	        gl.uniform4fv(shader.u_color, color);
	    }

	    gl.disable(gl.STENCIL_TEST);

	    gl.bindBuffer(gl.ARRAY_BUFFER, painter.tileExtentBuffer);
	    gl.vertexAttribPointer(shader.a_pos, painter.tileExtentBuffer.itemSize, gl.SHORT, false, 0, 0);

	    // We need to draw the background in tiles in order to use calculatePosMatrix
	    // which applies the projection matrix (transform.projMatrix). Otherwise
	    // the depth and stencil buffers get into a bad state.
	    // This can be refactored into a single draw call once earcut lands and
	    // we don't have so much going on in the stencil buffer.
	    var coords = pyramid.coveringTiles(transform);
	    for (var c = 0; c < coords.length; c++) {
	        gl.setPosMatrix(painter.calculatePosMatrix(coords[c]));
	        gl.drawArrays(gl.TRIANGLE_STRIP, 0, painter.tileExtentBuffer.itemCount);
	    }

	    gl.stencilMask(0x00);
	    gl.stencilFunc(gl.EQUAL, 0x80, 0x80);
	}


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var textVertices = __webpack_require__(153);
	var browser = __webpack_require__(14);
	var mat4 = __webpack_require__(134).mat4;
	var EXTENT = __webpack_require__(24).EXTENT;

	module.exports = drawDebug;

	function drawDebug(painter, source, coords) {
	    if (painter.isOpaquePass) return;
	    if (!painter.options.debug) return;

	    for (var i = 0; i < coords.length; i++) {
	        drawDebugTile(painter, source, coords[i]);
	    }
	}

	function drawDebugTile(painter, source, coord) {
	    var gl = painter.gl;

	    gl.disable(gl.STENCIL_TEST);
	    gl.lineWidth(1 * browser.devicePixelRatio);

	    var posMatrix = painter.calculatePosMatrix(coord, source.maxzoom);
	    var shader = painter.debugShader;
	    gl.switchShader(shader, posMatrix);

	    // draw bounding rectangle
	    gl.bindBuffer(gl.ARRAY_BUFFER, painter.debugBuffer);
	    gl.vertexAttribPointer(shader.a_pos, painter.debugBuffer.itemSize, gl.SHORT, false, 0, 0);
	    gl.uniform4f(shader.u_color, 1, 0, 0, 1);
	    gl.drawArrays(gl.LINE_STRIP, 0, painter.debugBuffer.itemCount);

	    var vertices = textVertices(coord.toString(), 50, 200, 5);
	    gl.bindBuffer(gl.ARRAY_BUFFER, painter.debugTextBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, new Int16Array(vertices), gl.STREAM_DRAW);
	    gl.vertexAttribPointer(shader.a_pos, painter.debugTextBuffer.itemSize, gl.SHORT, false, 0, 0);
	    gl.uniform4f(shader.u_color, 1, 1, 1, 1);

	    // Draw the halo with multiple 1px lines instead of one wider line because
	    // the gl spec doesn't guarantee support for lines with width > 1.
	    var tileSize = source.getTile(coord).tileSize;
	    var onePixel = EXTENT / (Math.pow(2, painter.transform.zoom - coord.z) * tileSize);
	    var translations = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
	    for (var i = 0; i < translations.length; i++) {
	        var translation = translations[i];
	        gl.setPosMatrix(mat4.translate([], posMatrix, [onePixel * translation[0], onePixel * translation[1], 0]));
	        gl.drawArrays(gl.LINES, 0, vertices.length / painter.debugTextBuffer.itemSize);
	    }

	    gl.uniform4f(shader.u_color, 0, 0, 0, 1);
	    gl.setPosMatrix(posMatrix);
	    gl.drawArrays(gl.LINES, 0, vertices.length / painter.debugTextBuffer.itemSize);
	}


/***/ },
/* 153 */
/***/ function(module, exports) {

	'use strict';

	// Font data From Hershey Simplex Font
	// http://paulbourke.net/dataformats/hershey/
	var simplexFont = {
	    " ": [16, []],
	    "!": [10, [5, 21, 5, 7, -1, -1, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2]],
	    "\"": [16, [4, 21, 4, 14, -1, -1, 12, 21, 12, 14]],
	    "#": [21, [11, 25, 4, -7, -1, -1, 17, 25, 10, -7, -1, -1, 4, 12, 18, 12, -1, -1, 3, 6, 17, 6]],
	    "$": [20, [8, 25, 8, -4, -1, -1, 12, 25, 12, -4, -1, -1, 17, 18, 15, 20, 12, 21, 8, 21, 5, 20, 3, 18, 3, 16, 4, 14, 5, 13, 7, 12, 13, 10, 15, 9, 16, 8, 17, 6, 17, 3, 15, 1, 12, 0, 8, 0, 5, 1, 3, 3]],
	    "%": [24, [21, 21, 3, 0, -1, -1, 8, 21, 10, 19, 10, 17, 9, 15, 7, 14, 5, 14, 3, 16, 3, 18, 4, 20, 6, 21, 8, 21, 10, 20, 13, 19, 16, 19, 19, 20, 21, 21, -1, -1, 17, 7, 15, 6, 14, 4, 14, 2, 16, 0, 18, 0, 20, 1, 21, 3, 21, 5, 19, 7, 17, 7]],
	    "&": [26, [23, 12, 23, 13, 22, 14, 21, 14, 20, 13, 19, 11, 17, 6, 15, 3, 13, 1, 11, 0, 7, 0, 5, 1, 4, 2, 3, 4, 3, 6, 4, 8, 5, 9, 12, 13, 13, 14, 14, 16, 14, 18, 13, 20, 11, 21, 9, 20, 8, 18, 8, 16, 9, 13, 11, 10, 16, 3, 18, 1, 20, 0, 22, 0, 23, 1, 23, 2]],
	    "'": [10, [5, 19, 4, 20, 5, 21, 6, 20, 6, 18, 5, 16, 4, 15]],
	    "(": [14, [11, 25, 9, 23, 7, 20, 5, 16, 4, 11, 4, 7, 5, 2, 7, -2, 9, -5, 11, -7]],
	    ")": [14, [3, 25, 5, 23, 7, 20, 9, 16, 10, 11, 10, 7, 9, 2, 7, -2, 5, -5, 3, -7]],
	    "*": [16, [8, 21, 8, 9, -1, -1, 3, 18, 13, 12, -1, -1, 13, 18, 3, 12]],
	    "+": [26, [13, 18, 13, 0, -1, -1, 4, 9, 22, 9]],
	    ",": [10, [6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6, -1, 5, -3, 4, -4]],
	    "-": [26, [4, 9, 22, 9]],
	    ".": [10, [5, 2, 4, 1, 5, 0, 6, 1, 5, 2]],
	    "/": [22, [20, 25, 2, -7]],
	    "0": [20, [9, 21, 6, 20, 4, 17, 3, 12, 3, 9, 4, 4, 6, 1, 9, 0, 11, 0, 14, 1, 16, 4, 17, 9, 17, 12, 16, 17, 14, 20, 11, 21, 9, 21]],
	    "1": [20, [6, 17, 8, 18, 11, 21, 11, 0]],
	    "2": [20, [4, 16, 4, 17, 5, 19, 6, 20, 8, 21, 12, 21, 14, 20, 15, 19, 16, 17, 16, 15, 15, 13, 13, 10, 3, 0, 17, 0]],
	    "3": [20, [5, 21, 16, 21, 10, 13, 13, 13, 15, 12, 16, 11, 17, 8, 17, 6, 16, 3, 14, 1, 11, 0, 8, 0, 5, 1, 4, 2, 3, 4]],
	    "4": [20, [13, 21, 3, 7, 18, 7, -1, -1, 13, 21, 13, 0]],
	    "5": [20, [15, 21, 5, 21, 4, 12, 5, 13, 8, 14, 11, 14, 14, 13, 16, 11, 17, 8, 17, 6, 16, 3, 14, 1, 11, 0, 8, 0, 5, 1, 4, 2, 3, 4]],
	    "6": [20, [16, 18, 15, 20, 12, 21, 10, 21, 7, 20, 5, 17, 4, 12, 4, 7, 5, 3, 7, 1, 10, 0, 11, 0, 14, 1, 16, 3, 17, 6, 17, 7, 16, 10, 14, 12, 11, 13, 10, 13, 7, 12, 5, 10, 4, 7]],
	    "7": [20, [17, 21, 7, 0, -1, -1, 3, 21, 17, 21]],
	    "8": [20, [8, 21, 5, 20, 4, 18, 4, 16, 5, 14, 7, 13, 11, 12, 14, 11, 16, 9, 17, 7, 17, 4, 16, 2, 15, 1, 12, 0, 8, 0, 5, 1, 4, 2, 3, 4, 3, 7, 4, 9, 6, 11, 9, 12, 13, 13, 15, 14, 16, 16, 16, 18, 15, 20, 12, 21, 8, 21]],
	    "9": [20, [16, 14, 15, 11, 13, 9, 10, 8, 9, 8, 6, 9, 4, 11, 3, 14, 3, 15, 4, 18, 6, 20, 9, 21, 10, 21, 13, 20, 15, 18, 16, 14, 16, 9, 15, 4, 13, 1, 10, 0, 8, 0, 5, 1, 4, 3]],
	    ":": [10, [5, 14, 4, 13, 5, 12, 6, 13, 5, 14, -1, -1, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2]],
	    ";": [10, [5, 14, 4, 13, 5, 12, 6, 13, 5, 14, -1, -1, 6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6, -1, 5, -3, 4, -4]],
	    "<": [24, [20, 18, 4, 9, 20, 0]],
	    "=": [26, [4, 12, 22, 12, -1, -1, 4, 6, 22, 6]],
	    ">": [24, [4, 18, 20, 9, 4, 0]],
	    "?": [18, [3, 16, 3, 17, 4, 19, 5, 20, 7, 21, 11, 21, 13, 20, 14, 19, 15, 17, 15, 15, 14, 13, 13, 12, 9, 10, 9, 7, -1, -1, 9, 2, 8, 1, 9, 0, 10, 1, 9, 2]],
	    "@": [27, [18, 13, 17, 15, 15, 16, 12, 16, 10, 15, 9, 14, 8, 11, 8, 8, 9, 6, 11, 5, 14, 5, 16, 6, 17, 8, -1, -1, 12, 16, 10, 14, 9, 11, 9, 8, 10, 6, 11, 5, -1, -1, 18, 16, 17, 8, 17, 6, 19, 5, 21, 5, 23, 7, 24, 10, 24, 12, 23, 15, 22, 17, 20, 19, 18, 20, 15, 21, 12, 21, 9, 20, 7, 19, 5, 17, 4, 15, 3, 12, 3, 9, 4, 6, 5, 4, 7, 2, 9, 1, 12, 0, 15, 0, 18, 1, 20, 2, 21, 3, -1, -1, 19, 16, 18, 8, 18, 6, 19, 5]],
	    "A": [18, [9, 21, 1, 0, -1, -1, 9, 21, 17, 0, -1, -1, 4, 7, 14, 7]],
	    "B": [21, [4, 21, 4, 0, -1, -1, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 15, 17, 13, 16, 12, 13, 11, -1, -1, 4, 11, 13, 11, 16, 10, 17, 9, 18, 7, 18, 4, 17, 2, 16, 1, 13, 0, 4, 0]],
	    "C": [21, [18, 16, 17, 18, 15, 20, 13, 21, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5]],
	    "D": [21, [4, 21, 4, 0, -1, -1, 4, 21, 11, 21, 14, 20, 16, 18, 17, 16, 18, 13, 18, 8, 17, 5, 16, 3, 14, 1, 11, 0, 4, 0]],
	    "E": [19, [4, 21, 4, 0, -1, -1, 4, 21, 17, 21, -1, -1, 4, 11, 12, 11, -1, -1, 4, 0, 17, 0]],
	    "F": [18, [4, 21, 4, 0, -1, -1, 4, 21, 17, 21, -1, -1, 4, 11, 12, 11]],
	    "G": [21, [18, 16, 17, 18, 15, 20, 13, 21, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 18, 8, -1, -1, 13, 8, 18, 8]],
	    "H": [22, [4, 21, 4, 0, -1, -1, 18, 21, 18, 0, -1, -1, 4, 11, 18, 11]],
	    "I": [8, [4, 21, 4, 0]],
	    "J": [16, [12, 21, 12, 5, 11, 2, 10, 1, 8, 0, 6, 0, 4, 1, 3, 2, 2, 5, 2, 7]],
	    "K": [21, [4, 21, 4, 0, -1, -1, 18, 21, 4, 7, -1, -1, 9, 12, 18, 0]],
	    "L": [17, [4, 21, 4, 0, -1, -1, 4, 0, 16, 0]],
	    "M": [24, [4, 21, 4, 0, -1, -1, 4, 21, 12, 0, -1, -1, 20, 21, 12, 0, -1, -1, 20, 21, 20, 0]],
	    "N": [22, [4, 21, 4, 0, -1, -1, 4, 21, 18, 0, -1, -1, 18, 21, 18, 0]],
	    "O": [22, [9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 19, 8, 19, 13, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21]],
	    "P": [21, [4, 21, 4, 0, -1, -1, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 14, 17, 12, 16, 11, 13, 10, 4, 10]],
	    "Q": [22, [9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 19, 8, 19, 13, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21, -1, -1, 12, 4, 18, -2]],
	    "R": [21, [4, 21, 4, 0, -1, -1, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 15, 17, 13, 16, 12, 13, 11, 4, 11, -1, -1, 11, 11, 18, 0]],
	    "S": [20, [17, 18, 15, 20, 12, 21, 8, 21, 5, 20, 3, 18, 3, 16, 4, 14, 5, 13, 7, 12, 13, 10, 15, 9, 16, 8, 17, 6, 17, 3, 15, 1, 12, 0, 8, 0, 5, 1, 3, 3]],
	    "T": [16, [8, 21, 8, 0, -1, -1, 1, 21, 15, 21]],
	    "U": [22, [4, 21, 4, 6, 5, 3, 7, 1, 10, 0, 12, 0, 15, 1, 17, 3, 18, 6, 18, 21]],
	    "V": [18, [1, 21, 9, 0, -1, -1, 17, 21, 9, 0]],
	    "W": [24, [2, 21, 7, 0, -1, -1, 12, 21, 7, 0, -1, -1, 12, 21, 17, 0, -1, -1, 22, 21, 17, 0]],
	    "X": [20, [3, 21, 17, 0, -1, -1, 17, 21, 3, 0]],
	    "Y": [18, [1, 21, 9, 11, 9, 0, -1, -1, 17, 21, 9, 11]],
	    "Z": [20, [17, 21, 3, 0, -1, -1, 3, 21, 17, 21, -1, -1, 3, 0, 17, 0]],
	    "[": [14, [4, 25, 4, -7, -1, -1, 5, 25, 5, -7, -1, -1, 4, 25, 11, 25, -1, -1, 4, -7, 11, -7]],
	    "\\": [14, [0, 21, 14, -3]],
	    "]": [14, [9, 25, 9, -7, -1, -1, 10, 25, 10, -7, -1, -1, 3, 25, 10, 25, -1, -1, 3, -7, 10, -7]],
	    "^": [16, [6, 15, 8, 18, 10, 15, -1, -1, 3, 12, 8, 17, 13, 12, -1, -1, 8, 17, 8, 0]],
	    "_": [16, [0, -2, 16, -2]],
	    "`": [10, [6, 21, 5, 20, 4, 18, 4, 16, 5, 15, 6, 16, 5, 17]],
	    "a": [19, [15, 14, 15, 0, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
	    "b": [19, [4, 21, 4, 0, -1, -1, 4, 11, 6, 13, 8, 14, 11, 14, 13, 13, 15, 11, 16, 8, 16, 6, 15, 3, 13, 1, 11, 0, 8, 0, 6, 1, 4, 3]],
	    "c": [18, [15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
	    "d": [19, [15, 21, 15, 0, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
	    "e": [18, [3, 8, 15, 8, 15, 10, 14, 12, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
	    "f": [12, [10, 21, 8, 21, 6, 20, 5, 17, 5, 0, -1, -1, 2, 14, 9, 14]],
	    "g": [19, [15, 14, 15, -2, 14, -5, 13, -6, 11, -7, 8, -7, 6, -6, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
	    "h": [19, [4, 21, 4, 0, -1, -1, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0]],
	    "i": [8, [3, 21, 4, 20, 5, 21, 4, 22, 3, 21, -1, -1, 4, 14, 4, 0]],
	    "j": [10, [5, 21, 6, 20, 7, 21, 6, 22, 5, 21, -1, -1, 6, 14, 6, -3, 5, -6, 3, -7, 1, -7]],
	    "k": [17, [4, 21, 4, 0, -1, -1, 14, 14, 4, 4, -1, -1, 8, 8, 15, 0]],
	    "l": [8, [4, 21, 4, 0]],
	    "m": [30, [4, 14, 4, 0, -1, -1, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0, -1, -1, 15, 10, 18, 13, 20, 14, 23, 14, 25, 13, 26, 10, 26, 0]],
	    "n": [19, [4, 14, 4, 0, -1, -1, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0]],
	    "o": [19, [8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3, 16, 6, 16, 8, 15, 11, 13, 13, 11, 14, 8, 14]],
	    "p": [19, [4, 14, 4, -7, -1, -1, 4, 11, 6, 13, 8, 14, 11, 14, 13, 13, 15, 11, 16, 8, 16, 6, 15, 3, 13, 1, 11, 0, 8, 0, 6, 1, 4, 3]],
	    "q": [19, [15, 14, 15, -7, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
	    "r": [13, [4, 14, 4, 0, -1, -1, 4, 8, 5, 11, 7, 13, 9, 14, 12, 14]],
	    "s": [17, [14, 11, 13, 13, 10, 14, 7, 14, 4, 13, 3, 11, 4, 9, 6, 8, 11, 7, 13, 6, 14, 4, 14, 3, 13, 1, 10, 0, 7, 0, 4, 1, 3, 3]],
	    "t": [12, [5, 21, 5, 4, 6, 1, 8, 0, 10, 0, -1, -1, 2, 14, 9, 14]],
	    "u": [19, [4, 14, 4, 4, 5, 1, 7, 0, 10, 0, 12, 1, 15, 4, -1, -1, 15, 14, 15, 0]],
	    "v": [16, [2, 14, 8, 0, -1, -1, 14, 14, 8, 0]],
	    "w": [22, [3, 14, 7, 0, -1, -1, 11, 14, 7, 0, -1, -1, 11, 14, 15, 0, -1, -1, 19, 14, 15, 0]],
	    "x": [17, [3, 14, 14, 0, -1, -1, 14, 14, 3, 0]],
	    "y": [16, [2, 14, 8, 0, -1, -1, 14, 14, 8, 0, 6, -4, 4, -6, 2, -7, 1, -7]],
	    "z": [17, [14, 14, 3, 0, -1, -1, 3, 14, 14, 14, -1, -1, 3, 0, 14, 0]],
	    "{": [14, [9, 25, 7, 24, 6, 23, 5, 21, 5, 19, 6, 17, 7, 16, 8, 14, 8, 12, 6, 10, -1, -1, 7, 24, 6, 22, 6, 20, 7, 18, 8, 17, 9, 15, 9, 13, 8, 11, 4, 9, 8, 7, 9, 5, 9, 3, 8, 1, 7, 0, 6, -2, 6, -4, 7, -6, -1, -1, 6, 8, 8, 6, 8, 4, 7, 2, 6, 1, 5, -1, 5, -3, 6, -5, 7, -6, 9, -7]],
	    "|": [8, [4, 25, 4, -7]],
	    "}": [14, [5, 25, 7, 24, 8, 23, 9, 21, 9, 19, 8, 17, 7, 16, 6, 14, 6, 12, 8, 10, -1, -1, 7, 24, 8, 22, 8, 20, 7, 18, 6, 17, 5, 15, 5, 13, 6, 11, 10, 9, 6, 7, 5, 5, 5, 3, 6, 1, 7, 0, 8, -2, 8, -4, 7, -6, -1, -1, 8, 8, 6, 6, 6, 4, 7, 2, 8, 1, 9, -1, 9, -3, 8, -5, 7, -6, 5, -7]],
	    "~": [24, [3, 6, 3, 8, 4, 11, 6, 12, 8, 12, 10, 11, 14, 8, 16, 7, 18, 7, 20, 8, 21, 10, -1, -1, 3, 8, 4, 10, 6, 11, 8, 11, 10, 10, 14, 7, 16, 6, 18, 6, 20, 7, 21, 10, 21, 12]]
	};

	module.exports = function textVertices(text, left, baseline, scale) {
	    scale = scale || 1;

	    var strokes = [],
	        i, len, j, len2, glyph, x, y, prev;

	    for (i = 0, len = text.length; i < len; i++) {
	        glyph = simplexFont[text[i]];
	        if (!glyph) continue;
	        prev = null;

	        for (j = 0, len2 = glyph[1].length; j < len2; j += 2) {
	            if (glyph[1][j] === -1 && glyph[1][j + 1] === -1) {
	                prev = null;

	            } else {
	                x = left + glyph[1][j] * scale;
	                y = baseline - glyph[1][j + 1] * scale;
	                if (prev) {
	                    strokes.push(prev.x, prev.y, x, y);
	                }
	                prev = {x: x, y: y};
	            }
	        }
	        left += glyph[0] * scale;
	    }

	    return strokes;
	};


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LngLat = __webpack_require__(34),
	    Point = __webpack_require__(17),
	    Coordinate = __webpack_require__(13),
	    wrap = __webpack_require__(11).wrap,
	    interp = __webpack_require__(38),
	    glmatrix = __webpack_require__(134);

	var vec4 = glmatrix.vec4,
	    mat4 = glmatrix.mat4,
	    mat2 = glmatrix.mat2;

	module.exports = Transform;

	/*
	 * A single transform, generally used for a single tile to be
	 * scaled, rotated, and zoomed.
	 *
	 * @param {number} minZoom
	 * @param {number} maxZoom
	 * @private
	 */
	function Transform(minZoom, maxZoom) {
	    this.tileSize = 512; // constant

	    this._minZoom = minZoom || 0;
	    this._maxZoom = maxZoom || 22;

	    this.latRange = [-85.05113, 85.05113];

	    this.width = 0;
	    this.height = 0;
	    this._center = new LngLat(0, 0);
	    this.zoom = 0;
	    this.angle = 0;
	    this._altitude = 1.5;
	    this._pitch = 0;
	    this._unmodified = true;
	}

	Transform.prototype = {
	    get minZoom() { return this._minZoom; },
	    set minZoom(zoom) {
	        if (this._minZoom === zoom) return;
	        this._minZoom = zoom;
	        this.zoom = Math.max(this.zoom, zoom);
	    },

	    get maxZoom() { return this._maxZoom; },
	    set maxZoom(zoom) {
	        if (this._maxZoom === zoom) return;
	        this._maxZoom = zoom;
	        this.zoom = Math.min(this.zoom, zoom);
	    },

	    get worldSize() {
	        return this.tileSize * this.scale;
	    },

	    get centerPoint() {
	        return this.size._div(2);
	    },

	    get size() {
	        return new Point(this.width, this.height);
	    },

	    get bearing() {
	        return -this.angle / Math.PI * 180;
	    },
	    set bearing(bearing) {
	        var b = -wrap(bearing, -180, 180) * Math.PI / 180;
	        if (this.angle === b) return;
	        this._unmodified = false;
	        this.angle = b;
	        this._calcProjMatrix();

	        // 2x2 matrix for rotating points
	        this.rotationMatrix = mat2.create();
	        mat2.rotate(this.rotationMatrix, this.rotationMatrix, this.angle);
	    },

	    get pitch() {
	        return this._pitch / Math.PI * 180;
	    },
	    set pitch(pitch) {
	        var p = Math.min(60, pitch) / 180 * Math.PI;
	        if (this._pitch === p) return;
	        this._unmodified = false;
	        this._pitch = p;
	        this._calcProjMatrix();
	    },

	    get altitude() {
	        return this._altitude;
	    },
	    set altitude(altitude) {
	        var a = Math.max(0.75, altitude);
	        if (this._altitude === a) return;
	        this._unmodified = false;
	        this._altitude = a;
	        this._calcProjMatrix();
	    },

	    get zoom() { return this._zoom; },
	    set zoom(zoom) {
	        var z = Math.min(Math.max(zoom, this.minZoom), this.maxZoom);
	        if (this._zoom === z) return;
	        this._unmodified = false;
	        this._zoom = z;
	        this.scale = this.zoomScale(z);
	        this.tileZoom = Math.floor(z);
	        this.zoomFraction = z - this.tileZoom;
	        this._calcProjMatrix();
	        this._constrain();
	    },

	    get center() { return this._center; },
	    set center(center) {
	        if (center.lat === this._center.lat && center.lng === this._center.lng) return;
	        this._unmodified = false;
	        this._center = center;
	        this._calcProjMatrix();
	        this._constrain();
	    },

	    resize: function(width, height) {
	        this.width = width;
	        this.height = height;

	        // The extrusion matrix
	        this.exMatrix = mat4.create();
	        mat4.ortho(this.exMatrix, 0, width, height, 0, 0, -1);

	        this._calcProjMatrix();
	        this._constrain();
	    },

	    get unmodified() { return this._unmodified; },

	    zoomScale: function(zoom) { return Math.pow(2, zoom); },
	    scaleZoom: function(scale) { return Math.log(scale) / Math.LN2; },

	    project: function(lnglat, worldSize) {
	        return new Point(
	            this.lngX(lnglat.lng, worldSize),
	            this.latY(lnglat.lat, worldSize));
	    },

	    unproject: function(point, worldSize) {
	        return new LngLat(
	            this.xLng(point.x, worldSize),
	            this.yLat(point.y, worldSize));
	    },

	    get x() { return this.lngX(this.center.lng); },
	    get y() { return this.latY(this.center.lat); },

	    get point() { return new Point(this.x, this.y); },

	    /**
	     * latitude to absolute x coord
	     * @param {number} lon
	     * @param {number} [worldSize=this.worldSize]
	     * @returns {number} pixel coordinate
	     * @private
	     */
	    lngX: function(lng, worldSize) {
	        return (180 + lng) * (worldSize || this.worldSize) / 360;
	    },
	    /**
	     * latitude to absolute y coord
	     * @param {number} lat
	     * @param {number} [worldSize=this.worldSize]
	     * @returns {number} pixel coordinate
	     * @private
	     */
	    latY: function(lat, worldSize) {
	        var y = 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));
	        return (180 - y) * (worldSize || this.worldSize) / 360;
	    },

	    xLng: function(x, worldSize) {
	        return x * 360 / (worldSize || this.worldSize) - 180;
	    },
	    yLat: function(y, worldSize) {
	        var y2 = 180 - y * 360 / (worldSize || this.worldSize);
	        return 360 / Math.PI * Math.atan(Math.exp(y2 * Math.PI / 180)) - 90;
	    },

	    panBy: function(offset) {
	        var point = this.centerPoint._add(offset);
	        this.center = this.pointLocation(point);
	    },

	    setLocationAtPoint: function(lnglat, point) {
	        var c = this.locationCoordinate(lnglat);
	        var coordAtPoint = this.pointCoordinate(point);
	        var coordCenter = this.pointCoordinate(this.centerPoint);
	        var translate = coordAtPoint._sub(c);
	        this._unmodified = false;
	        this.center = this.coordinateLocation(coordCenter._sub(translate));
	    },

	    /**
	     * Given a location, return the screen point that corresponds to it
	     * @param {LngLat} lnglat location
	     * @returns {Point} screen point
	     * @private
	     */
	    locationPoint: function(lnglat) {
	        return this.coordinatePoint(this.locationCoordinate(lnglat));
	    },

	    /**
	     * Given a point on screen, return its lnglat
	     * @param {Point} p screen point
	     * @returns {LngLat} lnglat location
	     * @private
	     */
	    pointLocation: function(p) {
	        return this.coordinateLocation(this.pointCoordinate(p));
	    },

	    /**
	     * Given a geographical lnglat, return an unrounded
	     * coordinate that represents it at this transform's zoom level and
	     * worldsize.
	     * @param {LngLat} lnglat
	     * @returns {Coordinate}
	     * @private
	     */
	    locationCoordinate: function(lnglat) {
	        var k = this.zoomScale(this.tileZoom) / this.worldSize,
	            ll = LngLat.convert(lnglat);

	        return new Coordinate(
	            this.lngX(ll.lng) * k,
	            this.latY(ll.lat) * k,
	            this.tileZoom);
	    },

	    /**
	     * Given a Coordinate, return its geographical position.
	     * @param {Coordinate} coord
	     * @returns {LngLat} lnglat
	     * @private
	     */
	    coordinateLocation: function(coord) {
	        var worldSize = this.zoomScale(coord.zoom);
	        return new LngLat(
	            this.xLng(coord.column, worldSize),
	            this.yLat(coord.row, worldSize));
	    },

	    pointCoordinate: function(p, targetZ) {

	        if (targetZ === undefined) targetZ = 0;

	        var matrix = this.coordinatePointMatrix(this.tileZoom);
	        mat4.invert(matrix, matrix);

	        if (!matrix) throw new Error("failed to invert matrix");

	        // since we don't know the correct projected z value for the point,
	        // unproject two points to get a line and then find the point on that
	        // line with z=0

	        var coord0 = [p.x, p.y, 0, 1];
	        var coord1 = [p.x, p.y, 1, 1];

	        vec4.transformMat4(coord0, coord0, matrix);
	        vec4.transformMat4(coord1, coord1, matrix);

	        var w0 = coord0[3];
	        var w1 = coord1[3];
	        var x0 = coord0[0] / w0;
	        var x1 = coord1[0] / w1;
	        var y0 = coord0[1] / w0;
	        var y1 = coord1[1] / w1;
	        var z0 = coord0[2] / w0;
	        var z1 = coord1[2] / w1;


	        var t = z0 === z1 ? 0 : (targetZ - z0) / (z1 - z0);

	        return new Coordinate(
	            interp(x0, x1, t),
	            interp(y0, y1, t),
	            this.tileZoom);
	    },

	    /**
	     * Given a coordinate, return the screen point that corresponds to it
	     * @param {Coordinate} coord
	     * @returns {Point} screen point
	     * @private
	     */
	    coordinatePoint: function(coord) {
	        var matrix = this.coordinatePointMatrix(coord.zoom);
	        var p = [coord.column, coord.row, 0, 1];
	        vec4.transformMat4(p, p, matrix);
	        return new Point(p[0] / p[3], p[1] / p[3]);
	    },

	    coordinatePointMatrix: function(z) {
	        var proj = mat4.copy(new Float64Array(16), this.projMatrix);
	        var scale = this.worldSize / this.zoomScale(z);
	        mat4.scale(proj, proj, [scale, scale, 1]);
	        mat4.multiply(proj, this.getPixelMatrix(), proj);
	        return proj;
	    },

	    /**
	     * converts gl coordinates -1..1 to pixels 0..width
	     * @returns {Object} matrix
	     * @private
	     */
	    getPixelMatrix: function() {
	        var m = mat4.create();
	        mat4.scale(m, m, [this.width / 2, -this.height / 2, 1]);
	        mat4.translate(m, m, [1, -1, 0]);
	        return m;
	    },

	    _constrain: function() {
	        if (!this.center || !this.width || !this.height || this._constraining) return;

	        this._constraining = true;

	        var minY, maxY, minX, maxX, sy, sx, x2, y2,
	            size = this.size,
	            unmodified = this._unmodified;

	        if (this.latRange) {
	            minY = this.latY(this.latRange[1]);
	            maxY = this.latY(this.latRange[0]);
	            sy = maxY - minY < size.y ? size.y / (maxY - minY) : 0;
	        }

	        if (this.lngRange) {
	            minX = this.lngX(this.lngRange[0]);
	            maxX = this.lngX(this.lngRange[1]);
	            sx = maxX - minX < size.x ? size.x / (maxX - minX) : 0;
	        }

	        // how much the map should scale to fit the screen into given latitude/longitude ranges
	        var s = Math.max(sx || 0, sy || 0);

	        if (s) {
	            this.center = this.unproject(new Point(
	                sx ? (maxX + minX) / 2 : this.x,
	                sy ? (maxY + minY) / 2 : this.y));
	            this.zoom += this.scaleZoom(s);
	            this._unmodified = unmodified;
	            this._constraining = false;
	            return;
	        }

	        if (this.latRange) {
	            var y = this.y,
	                h2 = size.y / 2;

	            if (y - h2 < minY) y2 = minY + h2;
	            if (y + h2 > maxY) y2 = maxY - h2;
	        }

	        if (this.lngRange) {
	            var x = this.x,
	                w2 = size.x / 2;

	            if (x - w2 < minX) x2 = minX + w2;
	            if (x + w2 > maxX) x2 = maxX - w2;
	        }

	        // pan the map if the screen goes off the range
	        if (x2 !== undefined || y2 !== undefined) {
	            this.center = this.unproject(new Point(
	                x2 !== undefined ? x2 : this.x,
	                y2 !== undefined ? y2 : this.y));
	        }

	        this._unmodified = unmodified;
	        this._constraining = false;
	    },

	    _calcProjMatrix: function() {
	        var m = new Float64Array(16);

	        // Find the distance from the center point to the center top in altitude units using law of sines.
	        var halfFov = Math.atan(0.5 / this.altitude);
	        var topHalfSurfaceDistance = Math.sin(halfFov) * this.altitude / Math.sin(Math.PI / 2 - this._pitch - halfFov);

	        // Calculate z value of the farthest fragment that should be rendered.
	        var farZ = Math.cos(Math.PI / 2 - this._pitch) * topHalfSurfaceDistance + this.altitude;

	        mat4.perspective(m, 2 * Math.atan((this.height / 2) / this.altitude), this.width / this.height, 0.1, farZ);

	        mat4.translate(m, m, [0, 0, -this.altitude]);

	        // After the rotateX, z values are in pixel units. Convert them to
	        // altitude unites. 1 altitude unit = the screen height.
	        mat4.scale(m, m, [1, -1, 1 / this.height]);

	        mat4.rotateX(m, m, this._pitch);
	        mat4.rotateZ(m, m, this.angle);
	        mat4.translate(m, m, [-this.x, -this.y, 0]);

	        this.projMatrix = m;
	    }
	};


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	 * Adds positional coordinates to URL hashes. Passed as an option to the map object
	 *
	 * @class mapboxgl.Hash
	 * @returns {Hash} `this`
	 */
	module.exports = Hash;

	var util = __webpack_require__(11);

	function Hash() {
	    util.bindAll([
	        '_onHashChange',
	        '_updateHash'
	    ], this);
	}

	Hash.prototype = {
	    /* Map element to listen for coordinate changes
	     *
	     * @param {Object} map
	     * @returns {Hash} `this`
	     */
	    addTo: function(map) {
	        this._map = map;
	        window.addEventListener('hashchange', this._onHashChange, false);
	        this._map.on('moveend', this._updateHash);
	        return this;
	    },

	    /* Removes hash
	     *
	     * @returns {Popup} `this`
	     */
	    remove: function() {
	        window.removeEventListener('hashchange', this._onHashChange, false);
	        this._map.off('moveend', this._updateHash);
	        delete this._map;
	        return this;
	    },

	    _onHashChange: function() {
	        var loc = location.hash.replace('#', '').split('/');
	        if (loc.length >= 3) {
	            this._map.jumpTo({
	                center: [+loc[2], +loc[1]],
	                zoom: +loc[0],
	                bearing: +(loc[3] || 0)
	            });
	            return true;
	        }
	        return false;
	    },

	    _updateHash: function() {
	        var center = this._map.getCenter(),
	            zoom = this._map.getZoom(),
	            bearing = this._map.getBearing(),
	            precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2)),

	            hash = '#' + (Math.round(zoom * 100) / 100) +
	                '/' + center.lat.toFixed(precision) +
	                '/' + center.lng.toFixed(precision) +
	                (bearing ? '/' + (Math.round(bearing * 10) / 10) : '');

	        window.history.replaceState('', '', hash);
	    }
	};


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var handlers = {
	    scrollZoom: __webpack_require__(157),
	    boxZoom: __webpack_require__(158),
	    dragRotate: __webpack_require__(160),
	    dragPan: __webpack_require__(161),
	    keyboard: __webpack_require__(162),
	    doubleClickZoom: __webpack_require__(163),
	    touchZoomRotate: __webpack_require__(164)
	};

	var DOM = __webpack_require__(16),
	    util = __webpack_require__(11);

	module.exports = Interaction;

	function Interaction(map) {
	    this._map = map;
	    this._el = map.getCanvasContainer();

	    for (var name in handlers) {
	        map[name] = new handlers[name](map);
	    }

	    util.bindHandlers(this);
	}

	Interaction.prototype = {
	    enable: function () {
	        var options = this._map.options,
	            el = this._el;

	        for (var name in handlers) {
	            if (options[name]) this._map[name].enable();
	        }

	        el.addEventListener('mousedown', this._onMouseDown, false);
	        el.addEventListener('mouseup', this._onMouseUp, false);
	        el.addEventListener('touchstart', this._onTouchStart, false);
	        el.addEventListener('click', this._onClick, false);
	        el.addEventListener('mousemove', this._onMouseMove, false);
	        el.addEventListener('dblclick', this._onDblClick, false);
	        el.addEventListener('contextmenu', this._onContextMenu, false);
	    },

	    disable: function () {
	        var options = this._map.options,
	            el = this._el;

	        for (var name in handlers) {
	            if (options[name]) this._map[name].disable();
	        }

	        el.removeEventListener('mousedown', this._onMouseDown);
	        el.removeEventListener('mouseup', this._onMouseUp);
	        el.removeEventListener('touchstart', this._onTouchStart);
	        el.removeEventListener('click', this._onClick);
	        el.removeEventListener('mousemove', this._onMouseMove);
	        el.removeEventListener('dblclick', this._onDblClick);
	        el.removeEventListener('contextmenu', this._onContextMenu);
	    },

	    _onMouseDown: function (e) {
	        this._map.stop();
	        this._startPos = DOM.mousePos(this._el, e);
	        this._fireEvent('mousedown', e);
	    },

	    _onMouseUp: function (e) {
	        var map = this._map,
	            rotating = map.dragRotate && map.dragRotate.active;

	        if (this._contextMenuEvent && !rotating) {
	            this._fireEvent('contextmenu', this._contextMenuEvent);
	        }

	        this._contextMenuEvent = null;
	        this._fireEvent('mouseup', e);
	    },

	    _onTouchStart: function (e) {
	        if (!e.touches || e.touches.length > 1) return;

	        if (!this._tapped) {
	            this._tapped = setTimeout(this._onTimeout, 300);

	        } else {
	            clearTimeout(this._tapped);
	            this._tapped = null;
	            this._fireEvent('dblclick', e);
	        }
	    },

	    _onTimeout: function () {
	        this._tapped = null;
	    },

	    _onMouseMove: function (e) {
	        var map = this._map,
	            el = this._el;

	        if (map.dragPan && map.dragPan.active) return;
	        if (map.dragRotate && map.dragRotate.active) return;

	        var target = e.toElement || e.target;
	        while (target && target !== el) target = target.parentNode;
	        if (target !== el) return;

	        this._fireEvent('mousemove', e);
	    },

	    _onClick: function (e) {
	        var pos = DOM.mousePos(this._el, e);

	        if (pos.equals(this._startPos)) {
	            this._fireEvent('click', e);
	        }
	    },

	    _onDblClick: function (e) {
	        this._fireEvent('dblclick', e);
	        e.preventDefault();
	    },

	    _onContextMenu: function (e) {
	        this._contextMenuEvent = e;
	        e.preventDefault();
	    },

	    _fireEvent: function (type, e) {
	        var pos = DOM.mousePos(this._el, e);

	        return this._map.fire(type, {
	            lngLat: this._map.unproject(pos),
	            point: pos,
	            originalEvent: e
	        });
	    }
	};


	/**
	 * When an event [fires]{@link #Evented.fire} as a result of a
	 * user interaction, the event will be called with an EventData
	 * object containing the original DOM event along with coordinates of
	 * the event target.
	 *
	 * @typedef {Object} EventData
	 * @property {Event} originalEvent The original DOM event
	 * @property {Point} point The pixel location of the event
	 * @property {LngLat} lngLat The geographic location of the event
	 * @example
	 * map.on('click', function(data) {
	 *   var e = data && data.originalEvent;
	 *   console.log('got click ' + (e ? 'button = ' + e.button : ''));
	 * });
	 */

	/**
	 * Mouse down event.
	 *
	 * @event mousedown
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data
	 */

	/**
	 * Mouse up event.
	 *
	 * @event mouseup
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data
	 */

	/**
	 * Mouse move event.
	 *
	 * @event mousemove
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data
	 */

	/**
	 * Click event.
	 *
	 * @event click
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data
	 */

	/**
	 * Double click event.
	 *
	 * @event dblclick
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data
	 */

	/**
	 * Context menu event.
	 *
	 * @event contextmenu
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data, if available
	 */

	/**
	 * Load event. This event is emitted immediately after all necessary resources have been downloaded
	 * and the first visually complete rendering has occurred.
	 *
	 * @event load
	 * @memberof Map
	 * @instance
	 * @type {Object}
	 */

	/**
	 * Move start event. This event is emitted just before the map begins a transition from one
	 * view to another, either as a result of user interaction or the use of methods such as `Map#jumpTo`.
	 *
	 * @event movestart
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data, if fired interactively
	 */

	/**
	 * Move event. This event is emitted repeatedly during animated transitions from one view to
	 * another, either as a result of user interaction or the use of methods such as `Map#jumpTo`.
	 *
	 * @event move
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data, if fired interactively
	 */

	/**
	 * Move end event. This event is emitted just after the map completes a transition from one
	 * view to another, either as a result of user interaction or the use of methods such as `Map#jumpTo`.
	 *
	 * @event moveend
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data, if fired interactively
	 */


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DOM = __webpack_require__(16),
	    browser = __webpack_require__(14),
	    util = __webpack_require__(11);

	module.exports = ScrollZoomHandler;


	var ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '',
	    firefox = ua.indexOf('firefox') !== -1,
	    safari = ua.indexOf('safari') !== -1 && ua.indexOf('chrom') === -1;


	/**
	 * The `ScrollZoomHandler` allows a user to zoom the map by scrolling.
	 * @class ScrollZoomHandler
	 */
	function ScrollZoomHandler(map) {
	    this._map = map;
	    this._el = map.getCanvasContainer();

	    util.bindHandlers(this);
	}

	ScrollZoomHandler.prototype = {

	    /**
	     * Enable the "scroll to zoom" interaction.
	     * @example
	     *   map.scrollZoom.enable();
	     */
	    enable: function () {
	        this.disable();
	        this._el.addEventListener('wheel', this._onWheel, false);
	        this._el.addEventListener('mousewheel', this._onWheel, false);
	    },

	    /**
	     * Disable the "scroll to zoom" interaction.
	     * @example
	     *   map.scrollZoom.disable();
	     */
	    disable: function () {
	        this._el.removeEventListener('wheel', this._onWheel);
	        this._el.removeEventListener('mousewheel', this._onWheel);
	    },

	    _onWheel: function (e) {
	        var value;

	        if (e.type === 'wheel') {
	            value = e.deltaY;
	            // Firefox doubles the values on retina screens...
	            if (firefox && e.deltaMode === window.WheelEvent.DOM_DELTA_PIXEL) value /= browser.devicePixelRatio;
	            if (e.deltaMode === window.WheelEvent.DOM_DELTA_LINE) value *= 40;

	        } else if (e.type === 'mousewheel') {
	            value = -e.wheelDeltaY;
	            if (safari) value = value / 3;
	        }

	        var now = browser.now(),
	            timeDelta = now - (this._time || 0);

	        this._pos = DOM.mousePos(this._el, e);
	        this._time = now;

	        if (value !== 0 && (value % 4.000244140625) === 0) {
	            // This one is definitely a mouse wheel event.
	            this._type = 'wheel';
	            // Normalize this value to match trackpad.
	            value = Math.floor(value / 4);

	        } else if (value !== 0 && Math.abs(value) < 4) {
	            // This one is definitely a trackpad event because it is so small.
	            this._type = 'trackpad';

	        } else if (timeDelta > 400) {
	            // This is likely a new scroll action.
	            this._type = null;
	            this._lastValue = value;

	            // Start a timeout in case this was a singular event, and dely it by up to 40ms.
	            this._timeout = setTimeout(this._onTimeout, 40);

	        } else if (!this._type) {
	            // This is a repeating event, but we don't know the type of event just yet.
	            // If the delta per time is small, we assume it's a fast trackpad; otherwise we switch into wheel mode.
	            this._type = (Math.abs(timeDelta * value) < 200) ? 'trackpad' : 'wheel';

	            // Make sure our delayed event isn't fired again, because we accumulate
	            // the previous event (which was less than 40ms ago) into this event.
	            if (this._timeout) {
	                clearTimeout(this._timeout);
	                this._timeout = null;
	                value += this._lastValue;
	            }
	        }

	        // Slow down zoom if shift key is held for more precise zooming
	        if (e.shiftKey && value) value = value / 4;

	        // Only fire the callback if we actually know what type of scrolling device the user uses.
	        if (this._type) this._zoom(-value, e);

	        e.preventDefault();
	    },

	    _onTimeout: function () {
	        this._type = 'wheel';
	        this._zoom(-this._lastValue);
	    },

	    _zoom: function (delta, e) {
	        if (delta === 0) return;
	        var map = this._map;

	        // Scale by sigmoid of scroll wheel delta.
	        var scale = 2 / (1 + Math.exp(-Math.abs(delta / 100)));
	        if (delta < 0 && scale !== 0) scale = 1 / scale;

	        var fromScale = map.ease ? map.ease.to : map.transform.scale,
	            targetZoom = map.transform.scaleZoom(fromScale * scale);

	        map.zoomTo(targetZoom, {
	            duration: 0,
	            around: map.unproject(this._pos),
	            delayEndEvents: 200
	        }, { originalEvent: e });
	    }
	};


	/**
	 * Zoom start event. This event is emitted just before the map begins a transition from one
	 * zoom level to another, either as a result of user interaction or the use of methods such as `Map#jumpTo`.
	 *
	 * @event zoomstart
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data, if fired interactively
	 */

	/**
	 * Zoom event. This event is emitted repeatedly during animated transitions from one zoom level to
	 * another, either as a result of user interaction or the use of methods such as `Map#jumpTo`.
	 *
	 * @event zoom
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data, if fired interactively
	 */

	/**
	 * Zoom end event. This event is emitted just after the map completes a transition from one
	 * zoom level to another, either as a result of user interaction or the use of methods such as `Map#jumpTo`.
	 *
	 * @event zoomend
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data, if fired interactively
	 */


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DOM = __webpack_require__(16),
	    LngLatBounds = __webpack_require__(159),
	    util = __webpack_require__(11);

	module.exports = BoxZoomHandler;

	/**
	 * The `BoxZoomHandler` allows a user to zoom the map to fit a bounding box.
	 * The bounding box is defined by holding `shift` while dragging the cursor.
	 * @class BoxZoomHandler
	 */
	function BoxZoomHandler(map) {
	    this._map = map;
	    this._el = map.getCanvasContainer();
	    this._container = map.getContainer();

	    util.bindHandlers(this);
	}

	BoxZoomHandler.prototype = {

	    /**
	     * Enable the "box zoom" interaction.
	     * @example
	     *   map.boxZoom.enable();
	     */
	    enable: function () {
	        this.disable();
	        this._el.addEventListener('mousedown', this._onMouseDown, false);
	    },

	    /**
	     * Disable the "box zoom" interaction.
	     * @example
	     *   map.boxZoom.disable();
	     */
	    disable: function () {
	        this._el.removeEventListener('mousedown', this._onMouseDown);
	    },

	    _onMouseDown: function (e) {
	        if (!(e.shiftKey && e.button === 0)) return;

	        document.addEventListener('mousemove', this._onMouseMove, false);
	        document.addEventListener('keydown', this._onKeyDown, false);
	        document.addEventListener('mouseup', this._onMouseUp, false);

	        DOM.disableDrag();
	        this._startPos = DOM.mousePos(this._el, e);
	        this.active = true;
	    },

	    _onMouseMove: function (e) {
	        var p0 = this._startPos,
	            p1 = DOM.mousePos(this._el, e);

	        if (!this._box) {
	            this._box = DOM.create('div', 'mapboxgl-boxzoom', this._container);
	            this._container.classList.add('mapboxgl-crosshair');
	            this._fireEvent('boxzoomstart', e);
	        }

	        var minX = Math.min(p0.x, p1.x),
	            maxX = Math.max(p0.x, p1.x),
	            minY = Math.min(p0.y, p1.y),
	            maxY = Math.max(p0.y, p1.y);

	        DOM.setTransform(this._box, 'translate(' + minX + 'px,' + minY + 'px)');

	        this._box.style.width = (maxX - minX) + 'px';
	        this._box.style.height = (maxY - minY) + 'px';
	    },

	    _onMouseUp: function (e) {
	        if (e.button !== 0) return;

	        var p0 = this._startPos,
	            p1 = DOM.mousePos(this._el, e),
	            bounds = new LngLatBounds(this._map.unproject(p0), this._map.unproject(p1));

	        this._finish();

	        if (p0.x === p1.x && p0.y === p1.y) {
	            this._fireEvent('boxzoomcancel', e);
	        } else {
	            this._map
	                .fitBounds(bounds, {linear: true})
	                .fire('boxzoomend', { originalEvent: e, boxZoomBounds: bounds });
	        }
	    },

	    _onKeyDown: function (e) {
	        if (e.keyCode === 27) {
	            this._finish();
	            this._fireEvent('boxzoomcancel', e);
	        }
	    },

	    _finish: function () {
	        this.active = false;

	        document.removeEventListener('mousemove', this._onMouseMove, false);
	        document.removeEventListener('keydown', this._onKeyDown, false);
	        document.removeEventListener('mouseup', this._onMouseUp, false);

	        this._container.classList.remove('mapboxgl-crosshair');

	        if (this._box) {
	            this._box.parentNode.removeChild(this._box);
	            this._box = null;
	        }

	        DOM.enableDrag();
	    },

	    _fireEvent: function (type, e) {
	        return this._map.fire(type, { originalEvent: e });
	    }
	};


	/**
	 * Boxzoom start event. This event is emitted at the start of a box zoom interaction.
	 *
	 * @event boxzoomstart
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data
	 */

	/**
	 * Boxzoom end event. This event is emitted at the end of a box zoom interaction
	 *
	 * @event boxzoomend
	 * @memberof Map
	 * @instance
	 * @type {Object}
	 * @property {Event} originalEvent the original DOM event
	 * @property {LngLatBounds} boxZoomBounds the bounds of the box zoom target
	 */

	/**
	 * Boxzoom cancel event.  This event is emitted when the user cancels a box zoom interaction,
	 *   or when the box zoom does not meet the minimum size threshold.
	 *
	 * @event boxzoomcancel
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data
	 */


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = LngLatBounds;

	var LngLat = __webpack_require__(34);

	/**
	 * Creates a bounding box from the given pair of points. If parameteres are omitted, a `null` bounding box is created.
	 *
	 * @class LngLatBounds
	 * @classdesc A representation of rectangular box on the earth, defined by its southwest and northeast points in longitude and latitude.
	 * @param {LngLat} sw southwest
	 * @param {LngLat} ne northeast
	 * @example
	 * var sw = new mapboxgl.LngLat(-73.9876, 40.7661);
	 * var ne = new mapboxgl.LngLat(-73.9397, 40.8002);
	 * var llb = new mapboxgl.LngLatBounds(sw, ne);
	 */
	function LngLatBounds(sw, ne) {
	    if (!sw) {
	        return;
	    } else if (ne) {
	        this.extend(sw).extend(ne);
	    } else if (sw.length === 4) {
	        this.extend([sw[0], sw[1]]).extend([sw[2], sw[3]]);
	    } else {
	        this.extend(sw[0]).extend(sw[1]);
	    }
	}

	LngLatBounds.prototype = {

	    /**
	     * Extend the bounds to include a given LngLat or LngLatBounds.
	     *
	     * @param {LngLat|LngLatBounds} obj object to extend to
	     * @returns {LngLatBounds} `this`
	     */
	    extend: function(obj) {
	        var sw = this._sw,
	            ne = this._ne,
	            sw2, ne2;

	        if (obj instanceof LngLat) {
	            sw2 = obj;
	            ne2 = obj;

	        } else if (obj instanceof LngLatBounds) {
	            sw2 = obj._sw;
	            ne2 = obj._ne;

	            if (!sw2 || !ne2) return this;

	        } else {
	            return obj ? this.extend(LngLat.convert(obj) || LngLatBounds.convert(obj)) : this;
	        }

	        if (!sw && !ne) {
	            this._sw = new LngLat(sw2.lng, sw2.lat);
	            this._ne = new LngLat(ne2.lng, ne2.lat);

	        } else {
	            sw.lng = Math.min(sw2.lng, sw.lng);
	            sw.lat = Math.min(sw2.lat, sw.lat);
	            ne.lng = Math.max(ne2.lng, ne.lng);
	            ne.lat = Math.max(ne2.lat, ne.lat);
	        }

	        return this;
	    },

	    /**
	     * Get the point equidistant from this box's corners
	     * @returns {LngLat} centerpoint
	     * @example
	     * var llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
	     * llb.getCenter(); // = LngLat {lng: -73.96365, lat: 40.78315}
	     */
	    getCenter: function() {
	        return new LngLat((this._sw.lng + this._ne.lng) / 2, (this._sw.lat + this._ne.lat) / 2);
	    },

	    /**
	     * Get southwest corner
	     * @returns {LngLat} southwest
	     */
	    getSouthWest: function() { return this._sw; },

	    /**
	     * Get northeast corner
	     * @returns {LngLat} northeast
	     */
	    getNorthEast: function() { return this._ne; },

	    /**
	     * Get northwest corner
	     * @returns {LngLat} northwest
	     */
	    getNorthWest: function() { return new LngLat(this.getWest(), this.getNorth()); },

	    /**
	     * Get southeast corner
	     * @returns {LngLat} southeast
	     */
	    getSouthEast: function() { return new LngLat(this.getEast(), this.getSouth()); },

	    /**
	     * Get west edge longitude
	     * @returns {number} west
	     */
	    getWest:  function() { return this._sw.lng; },

	    /**
	     * Get south edge latitude
	     * @returns {number} south
	     */
	    getSouth: function() { return this._sw.lat; },

	    /**
	     * Get east edge longitude
	     * @returns {number} east
	     */
	    getEast:  function() { return this._ne.lng; },

	    /**
	     * Get north edge latitude
	     * @returns {number} north
	     */
	    getNorth: function() { return this._ne.lat; },

	    /**
	     * Return a `LngLatBounds` as an array
	     *
	     * @returns {array} [lng, lat]
	     * @example
	     * var llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
	     * llb.toArray(); // = [[-73.9876, 40.7661], [-73.9397, 40.8002]]
	     */
	    toArray: function () {
	        return [this._sw.toArray(), this._ne.toArray()];
	    },

	    /**
	     * Return a `LngLatBounds` as a string
	     *
	     * @returns {string} "LngLatBounds(LngLat(lng, lat), LngLat(lng, lat))"
	     * @example
	     * var llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
	     * llb.toString(); // = "LngLatBounds(LngLat(-73.9876, 40.7661), LngLat(-73.9397, 40.8002))"
	     */
	    toString: function () {
	        return 'LngLatBounds(' + this._sw.toString() + ', ' + this._ne.toString() + ')';
	    }
	};

	/**
	 * Convert an array to a `LngLatBounds` object, or return an existing
	 * `LngLatBounds` object unchanged.
	 *
	 * Calls `LngLat#convert` internally to convert arrays as `LngLat` values.
	 *
	 * @param {LngLatBounds|Array<number>|Array<Array<number>>} input input to convert to a LngLatBounds
	 * @returns {LngLatBounds} LngLatBounds object or original input
	 * @example
	 * var arr = [[-73.9876, 40.7661], [-73.9397, 40.8002]];
	 * var llb = mapboxgl.LngLatBounds.convert(arr);
	 * llb;   // = LngLatBounds {_sw: LngLat {lng: -73.9876, lat: 40.7661}, _ne: LngLat {lng: -73.9397, lat: 40.8002}}
	 */
	LngLatBounds.convert = function (input) {
	    if (!input || input instanceof LngLatBounds) return input;
	    return new LngLatBounds(input);
	};


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DOM = __webpack_require__(16),
	    Point = __webpack_require__(17),
	    util = __webpack_require__(11);

	module.exports = DragRotateHandler;

	var inertiaLinearity = 0.25,
	    inertiaEasing = util.bezier(0, 0, inertiaLinearity, 1),
	    inertiaMaxSpeed = 180, // deg/s
	    inertiaDeceleration = 720; // deg/s^2


	/**
	 * The `DragRotateHandler` allows a user to rotate the map by clicking and
	 * dragging the cursor while holding the right mouse button or the `ctrl` key.
	 * @class DragRotateHandler
	 */
	function DragRotateHandler(map) {
	    this._map = map;
	    this._el = map.getCanvasContainer();

	    util.bindHandlers(this);
	}

	DragRotateHandler.prototype = {

	    /**
	     * Enable the "drag to rotate" interaction.
	     * @example
	     *   map.dragRotate.enable();
	     */
	    enable: function () {
	        this.disable();
	        this._el.addEventListener('mousedown', this._onDown);
	    },

	    /**
	     * Disable the "drag to rotate" interaction.
	     * @example
	     *   map.dragRotate.disable();
	     */
	    disable: function () {
	        this._el.removeEventListener('mousedown', this._onDown);
	    },

	    _onDown: function (e) {
	        if (this._ignoreEvent(e)) return;
	        if (this.active) return;

	        document.addEventListener('mousemove', this._onMove);
	        document.addEventListener('mouseup', this._onUp);

	        this.active = false;
	        this._inertia = [[Date.now(), this._map.getBearing()]];
	        this._startPos = this._pos = DOM.mousePos(this._el, e);
	        this._center = this._map.transform.centerPoint;  // Center of rotation

	        // If the first click was too close to the center, move the center of rotation by 200 pixels
	        // in the direction of the click.
	        var startToCenter = this._startPos.sub(this._center),
	            startToCenterDist = startToCenter.mag();

	        if (startToCenterDist < 200) {
	            this._center = this._startPos.add(new Point(-200, 0)._rotate(startToCenter.angle()));
	        }

	        e.preventDefault();
	    },

	    _onMove: function (e) {
	        if (this._ignoreEvent(e)) return;

	        if (!this.active) {
	            this.active = true;
	            this._fireEvent('rotatestart', e);
	            this._fireEvent('movestart', e);
	        }

	        var map = this._map;
	        map.stop();

	        var p1 = this._pos,
	            p2 = DOM.mousePos(this._el, e),
	            center = this._center,
	            bearingDiff = p1.sub(center).angleWith(p2.sub(center)) / Math.PI * 180,
	            bearing = map.getBearing() - bearingDiff,
	            inertia = this._inertia,
	            last = inertia[inertia.length - 1];

	        this._drainInertiaBuffer();
	        inertia.push([Date.now(), map._normalizeBearing(bearing, last[1])]);

	        map.transform.bearing = bearing;

	        this._fireEvent('rotate', e);
	        this._fireEvent('move', e);

	        this._pos = p2;
	    },

	    _onUp: function (e) {
	        if (this._ignoreEvent(e)) return;
	        document.removeEventListener('mousemove', this._onMove);
	        document.removeEventListener('mouseup', this._onUp);

	        if (!this.active) return;

	        this.active = false;
	        this._fireEvent('rotateend', e);
	        this._drainInertiaBuffer();

	        var map = this._map,
	            mapBearing = map.getBearing(),
	            inertia = this._inertia;

	        var finish = function() {
	            if (Math.abs(mapBearing) < map.options.bearingSnap) {
	                map.resetNorth({noMoveStart: true}, { originalEvent: e });
	            } else {
	                this._fireEvent('moveend', e);
	            }
	        }.bind(this);

	        if (inertia.length < 2) {
	            finish();
	            return;
	        }

	        var first = inertia[0],
	            last = inertia[inertia.length - 1],
	            previous = inertia[inertia.length - 2],
	            bearing = map._normalizeBearing(mapBearing, previous[1]),
	            flingDiff = last[1] - first[1],
	            sign = flingDiff < 0 ? -1 : 1,
	            flingDuration = (last[0] - first[0]) / 1000;

	        if (flingDiff === 0 || flingDuration === 0) {
	            finish();
	            return;
	        }

	        var speed = Math.abs(flingDiff * (inertiaLinearity / flingDuration));  // deg/s
	        if (speed > inertiaMaxSpeed) {
	            speed = inertiaMaxSpeed;
	        }

	        var duration = speed / (inertiaDeceleration * inertiaLinearity),
	            offset = sign * speed * (duration / 2);

	        bearing += offset;

	        if (Math.abs(map._normalizeBearing(bearing, 0)) < map.options.bearingSnap) {
	            bearing = map._normalizeBearing(0, bearing);
	        }

	        map.rotateTo(bearing, {
	            duration: duration * 1000,
	            easing: inertiaEasing,
	            noMoveStart: true
	        }, { originalEvent: e });
	    },

	    _fireEvent: function (type, e) {
	        return this._map.fire(type, { originalEvent: e });
	    },

	    _ignoreEvent: function (e) {
	        var map = this._map;

	        if (map.boxZoom && map.boxZoom.active) return true;
	        if (map.dragPan && map.dragPan.active) return true;
	        if (e.touches) {
	            return (e.touches.length > 1);
	        } else {
	            var buttons = (e.ctrlKey ? 1 : 2),  // ? ctrl+left button : right button
	                button = (e.ctrlKey ? 0 : 2);   // ? ctrl+left button : right button
	            return (e.type === 'mousemove' ? e.buttons & buttons === 0 : e.button !== button);
	        }
	    },

	    _drainInertiaBuffer: function () {
	        var inertia = this._inertia,
	            now = Date.now(),
	            cutoff = 160;   //msec

	        while (inertia.length > 0 && now - inertia[0][0] > cutoff)
	            inertia.shift();
	    }

	};


	/**
	 * Rotate start event. This event is emitted at the start of a user-initiated rotate interaction.
	 *
	 * @event rotatestart
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data
	 */

	/**
	 * Rotate event. This event is emitted repeatedly during a user-initiated rotate interaction.
	 *
	 * @event rotate
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data
	 */

	/**
	 * Rotate end event. This event is emitted at the end of a user-initiated rotate interaction.
	 *
	 * @event rotateend
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data
	 */


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DOM = __webpack_require__(16),
	    util = __webpack_require__(11);

	module.exports = DragPanHandler;

	var inertiaLinearity = 0.3,
	    inertiaEasing = util.bezier(0, 0, inertiaLinearity, 1),
	    inertiaMaxSpeed = 1400, // px/s
	    inertiaDeceleration = 2500; // px/s^2


	/**
	 * The `DragPanHandler` allows a user to pan the map by clicking and dragging
	 * the cursor.
	 * @class DragPanHandler
	 */
	function DragPanHandler(map) {
	    this._map = map;
	    this._el = map.getCanvasContainer();

	    util.bindHandlers(this);
	}

	DragPanHandler.prototype = {

	    /**
	     * Enable the "drag to pan" interaction.
	     * @example
	     *   map.dragPan.enable();
	     */
	    enable: function () {
	        this.disable();
	        this._el.addEventListener('mousedown', this._onDown);
	        this._el.addEventListener('touchstart', this._onDown);
	    },

	    /**
	     * Disable the "drag to pan" interaction.
	     * @example
	     *   map.dragPan.disable();
	     */
	    disable: function () {
	        this._el.removeEventListener('mousedown', this._onDown);
	        this._el.removeEventListener('touchstart', this._onDown);
	    },

	    _onDown: function (e) {
	        if (this._ignoreEvent(e)) return;
	        if (this.active) return;

	        if (e.touches) {
	            document.addEventListener('touchmove', this._onMove);
	            document.addEventListener('touchend', this._onTouchEnd);
	        } else {
	            document.addEventListener('mousemove', this._onMove);
	            document.addEventListener('mouseup', this._onMouseUp);
	        }

	        this.active = false;
	        this._startPos = this._pos = DOM.mousePos(this._el, e);
	        this._inertia = [[Date.now(), this._pos]];
	    },

	    _onMove: function (e) {
	        if (this._ignoreEvent(e)) return;

	        if (!this.active) {
	            this.active = true;
	            this._fireEvent('dragstart', e);
	            this._fireEvent('movestart', e);
	        }

	        var pos = DOM.mousePos(this._el, e),
	            map = this._map;

	        map.stop();
	        this._drainInertiaBuffer();
	        this._inertia.push([Date.now(), pos]);

	        map.transform.setLocationAtPoint(map.transform.pointLocation(this._pos), pos);

	        this._fireEvent('drag', e);
	        this._fireEvent('move', e);

	        this._pos = pos;

	        e.preventDefault();
	    },

	    _onUp: function (e) {
	        if (!this.active) return;

	        this.active = false;
	        this._fireEvent('dragend', e);
	        this._drainInertiaBuffer();

	        var finish = function() {
	            this._fireEvent('moveend', e);
	        }.bind(this);

	        var inertia = this._inertia;
	        if (inertia.length < 2) {
	            finish();
	            return;
	        }

	        var last = inertia[inertia.length - 1],
	            first = inertia[0],
	            flingOffset = last[1].sub(first[1]),
	            flingDuration = (last[0] - first[0]) / 1000;

	        if (flingDuration === 0 || last[1].equals(first[1])) {
	            finish();
	            return;
	        }

	        // calculate px/s velocity & adjust for increased initial animation speed when easing out
	        var velocity = flingOffset.mult(inertiaLinearity / flingDuration),
	            speed = velocity.mag(); // px/s

	        if (speed > inertiaMaxSpeed) {
	            speed = inertiaMaxSpeed;
	            velocity._unit()._mult(speed);
	        }

	        var duration = speed / (inertiaDeceleration * inertiaLinearity),
	            offset = velocity.mult(-duration / 2);

	        this._map.panBy(offset, {
	            duration: duration * 1000,
	            easing: inertiaEasing,
	            noMoveStart: true
	        }, { originalEvent: e });
	    },

	    _onMouseUp: function (e) {
	        if (this._ignoreEvent(e)) return;
	        this._onUp(e);
	        document.removeEventListener('mousemove', this._onMove);
	        document.removeEventListener('mouseup', this._onMouseUp);
	    },

	    _onTouchEnd: function (e) {
	        if (this._ignoreEvent(e)) return;
	        this._onUp(e);
	        document.removeEventListener('touchmove', this._onMove);
	        document.removeEventListener('touchend', this._onTouchEnd);
	    },

	    _fireEvent: function (type, e) {
	        return this._map.fire(type, { originalEvent: e });
	    },

	    _ignoreEvent: function (e) {
	        var map = this._map;

	        if (map.boxZoom && map.boxZoom.active) return true;
	        if (map.dragRotate && map.dragRotate.active) return true;
	        if (e.touches) {
	            return (e.touches.length > 1);
	        } else {
	            if (e.ctrlKey) return true;
	            var buttons = 1,  // left button
	                button = 0;   // left button
	            return (e.type === 'mousemove' ? e.buttons & buttons === 0 : e.button !== button);
	        }
	    },

	    _drainInertiaBuffer: function () {
	        var inertia = this._inertia,
	            now = Date.now(),
	            cutoff = 160;   // msec

	        while (inertia.length > 0 && now - inertia[0][0] > cutoff) inertia.shift();
	    }
	};


	/**
	 * Drag start event. This event is emitted at the start of a user-initiated pan interaction.
	 *
	 * @event dragstart
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data
	 */

	/**
	 * Drag event. This event is emitted repeatedly during a user-initiated pan interaction.
	 *
	 * @event drag
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data
	 */

	/**
	 * Drag end event. This event is emitted at the end of a user-initiated pan interaction.
	 *
	 * @event dragend
	 * @memberof Map
	 * @instance
	 * @property {EventData} data Original event data
	 */


/***/ },
/* 162 */
/***/ function(module, exports) {

	'use strict';

	module.exports = KeyboardHandler;


	var panDelta = 80,
	    rotateDelta = 2,
	    pitchDelta = 5;

	/**
	 * The `KeyboardHandler` allows a user to zoom, rotate, and pan the map using
	 * following keyboard shortcuts:
	 *  * `=` / `+`: increase zoom level by 1
	 *  * `Shift-=` / `Shift-+`: increase zoom level by 2
	 *  * `-`: decrease zoom level by 1
	 *  * `Shift--`: decrease zoom level by 2
	 *  * Arrow keys: pan by 80 pixels
	 *  * `Shift+⇢`: increase rotation by 2 degrees
	 *  * `Shift+⇠`: decrease rotation by 2 degrees
	 *  * `Shift+⇡`: increase pitch by 5 degrees
	 *  * `Shift+⇣`: decrease pitch by 5 degrees
	 * @class KeyboardHandler
	 */
	function KeyboardHandler(map) {
	    this._map = map;
	    this._el = map.getCanvasContainer();

	    this._onKeyDown = this._onKeyDown.bind(this);
	}

	KeyboardHandler.prototype = {

	    /**
	     * Enable the ability to interact with the map using keyboard input.
	     * @example
	     *   map.keyboard.enable();
	     */
	    enable: function () {
	        this.disable();
	        this._el.addEventListener('keydown', this._onKeyDown, false);
	    },

	    /**
	     * Disable the ability to interact with the map using keyboard input.
	     * @example
	     *   map.keyboard.disable();
	     */
	    disable: function () {
	        this._el.removeEventListener('keydown', this._onKeyDown);
	    },

	    _onKeyDown: function (e) {
	        if (e.altKey || e.ctrlKey || e.metaKey) return;

	        var map = this._map,
	            eventData = { originalEvent: e };

	        switch (e.keyCode) {
	        case 61:
	        case 107:
	        case 171:
	        case 187:
	            map.zoomTo(Math.round(map.getZoom()) + (e.shiftKey ? 2 : 1), eventData);
	            break;

	        case 189:
	        case 109:
	        case 173:
	            map.zoomTo(Math.round(map.getZoom()) - (e.shiftKey ? 2 : 1), eventData);
	            break;

	        case 37:
	            if (e.shiftKey) {
	                map.easeTo({ bearing: map.getBearing() - rotateDelta }, eventData);
	            } else {
	                map.panBy([-panDelta, 0], eventData);
	            }
	            break;

	        case 39:
	            if (e.shiftKey) {
	                map.easeTo({ bearing: map.getBearing() + rotateDelta }, eventData);
	            } else {
	                map.panBy([panDelta, 0], eventData);
	            }
	            break;

	        case 38:
	            if (e.shiftKey) {
	                map.easeTo({ pitch: map.getPitch() + pitchDelta }, eventData);
	            } else {
	                map.panBy([0, -panDelta], eventData);
	            }
	            break;

	        case 40:
	            if (e.shiftKey) {
	                map.easeTo({ pitch: Math.max(map.getPitch() - pitchDelta, 0) }, eventData);
	            } else {
	                map.panBy([0, panDelta], eventData);
	            }
	            break;
	        }
	    }
	};


/***/ },
/* 163 */
/***/ function(module, exports) {

	'use strict';

	module.exports = DoubleClickZoomHandler;

	/**
	 * The `DoubleClickZoomHandler` allows a user to zoom the map around point by
	 * double clicking.
	 * @class DoubleClickZoomHandler
	 */
	function DoubleClickZoomHandler(map) {
	    this._map = map;
	    this._onDblClick = this._onDblClick.bind(this);
	}

	DoubleClickZoomHandler.prototype = {

	    /**
	     * Enable the "double click to zoom" interaction.
	     * @example
	     *   map.doubleClickZoom.enable();
	     */
	    enable: function () {
	        this.disable();
	        this._map.on('dblclick', this._onDblClick);
	    },

	    /**
	     * Disable the "double click to zoom" interaction.
	     * @example
	     *   map.doubleClickZoom.disable();
	     */
	    disable: function () {
	        this._map.off('dblclick', this._onDblClick);
	    },

	    _onDblClick: function (e) {
	        this._map.zoomTo(this._map.getZoom() +
	            (e.originalEvent.shiftKey ? -1 : 1), {around: e.lngLat});
	    }
	};


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DOM = __webpack_require__(16),
	    util = __webpack_require__(11);

	module.exports = TouchZoomRotateHandler;

	var inertiaLinearity = 0.15,
	    inertiaEasing = util.bezier(0, 0, inertiaLinearity, 1),
	    inertiaDeceleration = 12, // scale / s^2
	    inertiaMaxSpeed = 2.5, // scale / s
	    significantScaleThreshold = 0.15,
	    significantRotateThreshold = 4;


	/**
	 * The `TouchZoomRotateHandler` allows a user to zoom and rotate the map by
	 * pinching on a touchscreen.
	 * @class TouchZoomRotateHandler
	 */
	function TouchZoomRotateHandler(map) {
	    this._map = map;
	    this._el = map.getCanvasContainer();

	    util.bindHandlers(this);
	}

	TouchZoomRotateHandler.prototype = {

	    /**
	     * Enable the "pinch to rotate and zoom" interaction.
	     * @example
	     *   map.touchZoomRotate.enable();
	     */
	    enable: function () {
	        this.disable();
	        this._el.addEventListener('touchstart', this._onStart, false);
	    },

	    /**
	     * Disable the "pinch to rotate and zoom" interaction.
	     * @example
	     *   map.touchZoomRotate.disable();
	     */
	    disable: function () {
	        this._el.removeEventListener('touchstart', this._onStart);
	    },

	    /**
	     * Disable the "pinch to rotate" interaction, leaving the "pinch to zoom"
	     * interaction enabled.
	     * @example
	     *   map.touchZoomRotate.disableRotation();
	     */
	    disableRotation: function() {
	        this._rotationDisabled = true;
	    },

	    /**
	     * Enable the "pinch to rotate" interaction, undoing a call to
	     * `disableRotation`.
	     * @example
	     *   map.touchZoomRotate.enable();
	     *   map.touchZoomRotate.enableRotation();
	     */
	    enableRotation: function() {
	        this._rotationDisabled = false;
	    },

	    _onStart: function (e) {
	        if (e.touches.length !== 2) return;

	        var p0 = DOM.mousePos(this._el, e.touches[0]),
	            p1 = DOM.mousePos(this._el, e.touches[1]);

	        this._startVec = p0.sub(p1);
	        this._startScale = this._map.transform.scale;
	        this._startBearing = this._map.transform.bearing;
	        this._gestureIntent = undefined;
	        this._inertia = [];

	        document.addEventListener('touchmove', this._onMove, false);
	        document.addEventListener('touchend', this._onEnd, false);
	    },

	    _onMove: function (e) {
	        if (e.touches.length !== 2) return;

	        var p0 = DOM.mousePos(this._el, e.touches[0]),
	            p1 = DOM.mousePos(this._el, e.touches[1]),
	            p = p0.add(p1).div(2),
	            vec = p0.sub(p1),
	            scale = vec.mag() / this._startVec.mag(),
	            bearing = this._rotationDisabled ? 0 : vec.angleWith(this._startVec) * 180 / Math.PI,
	            map = this._map;

	        // Determine 'intent' by whichever threshold is surpassed first,
	        // then keep that state for the duration of this gesture.
	        if (!this._gestureIntent) {
	            var scalingSignificantly = (Math.abs(1 - scale) > significantScaleThreshold),
	                rotatingSignificantly = (Math.abs(bearing) > significantRotateThreshold);

	            if (rotatingSignificantly) {
	                this._gestureIntent = 'rotate';
	            } else if (scalingSignificantly) {
	                this._gestureIntent = 'zoom';
	            }

	            if (this._gestureIntent) {
	                this._startVec = vec;
	                this._startScale = map.transform.scale;
	                this._startBearing = map.transform.bearing;
	            }

	        } else {
	            var param = { duration: 0, around: map.unproject(p) };

	            if (this._gestureIntent === 'rotate') {
	                param.bearing = this._startBearing + bearing;
	            }
	            if (this._gestureIntent === 'zoom' || this._gestureIntent === 'rotate') {
	                param.zoom = map.transform.scaleZoom(this._startScale * scale);
	            }

	            map.stop();
	            this._drainInertiaBuffer();
	            this._inertia.push([Date.now(), scale, p]);

	            map.easeTo(param, { originalEvent: e });
	        }

	        e.preventDefault();
	    },

	    _onEnd: function (e) {
	        document.removeEventListener('touchmove', this._onMove);
	        document.removeEventListener('touchend', this._onEnd);
	        this._drainInertiaBuffer();

	        var inertia = this._inertia,
	            map = this._map;

	        if (inertia.length < 2) {
	            map.snapToNorth({}, { originalEvent: e });
	            return;
	        }

	        var last = inertia[inertia.length - 1],
	            first = inertia[0],
	            lastScale = map.transform.scaleZoom(this._startScale * last[1]),
	            firstScale = map.transform.scaleZoom(this._startScale * first[1]),
	            scaleOffset = lastScale - firstScale,
	            scaleDuration = (last[0] - first[0]) / 1000,
	            p = last[2];

	        if (scaleDuration === 0 || lastScale === firstScale) {
	            map.snapToNorth({}, { originalEvent: e });
	            return;
	        }

	        // calculate scale/s speed and adjust for increased initial animation speed when easing
	        var speed = scaleOffset * inertiaLinearity / scaleDuration; // scale/s

	        if (Math.abs(speed) > inertiaMaxSpeed) {
	            if (speed > 0) {
	                speed = inertiaMaxSpeed;
	            } else {
	                speed = -inertiaMaxSpeed;
	            }
	        }

	        var duration = Math.abs(speed / (inertiaDeceleration * inertiaLinearity)) * 1000,
	            targetScale = lastScale + speed * duration / 2000;

	        if (targetScale < 0) {
	            targetScale = 0;
	        }

	        map.easeTo({
	            zoom: targetScale,
	            duration: duration,
	            easing: inertiaEasing,
	            around: map.unproject(p)
	        }, { originalEvent: e });
	    },

	    _drainInertiaBuffer: function() {
	        var inertia = this._inertia,
	            now = Date.now(),
	            cutoff = 160; // msec

	        while (inertia.length > 2 && now - inertia[0][0] > cutoff) inertia.shift();
	    }
	};


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(11);
	var interpolate = __webpack_require__(38);
	var browser = __webpack_require__(14);
	var LngLat = __webpack_require__(34);
	var LngLatBounds = __webpack_require__(159);
	var Point = __webpack_require__(17);

	/**
	 * Options common to Map#jumpTo, Map#easeTo, and Map#flyTo, controlling the destination
	 * location, zoom level, bearing and pitch. All properties are options; unspecified
	 * options will default to the current value for that property.
	 *
	 * @typedef {Object} CameraOptions
	 * @property {LngLat} center Map center
	 * @property {number} zoom Map zoom level
	 * @property {number} bearing Map rotation bearing in degrees counter-clockwise from north
	 * @property {number} pitch Map angle in degrees at which the camera is looking at the ground
	 * @property {LngLat} around If zooming, the zoom center (defaults to map center)
	 */

	/**
	 * Options common to map movement methods that involve animation, such as Map#panBy and
	 * Map#easeTo, controlling the duration of the animation and easing function. All properties
	 * are optional.
	 *
	 * @typedef {Object} AnimationOptions
	 * @property {number} duration Number in milliseconds
	 * @property {Function} easing
	 * @property {Array} offset point, origin of movement relative to map center
	 * @property {boolean} animate When set to false, no animation happens
	 */

	var Camera = module.exports = function() {};

	util.extend(Camera.prototype, /** @lends Map.prototype */{
	    /**
	     * Get the current view geographical point.
	     * @returns {LngLat}
	     */
	    getCenter: function() { return this.transform.center; },

	    /**
	     * Sets a map location. Equivalent to `jumpTo({center: center})`.
	     *
	     * @param {LngLat} center Map center to jump to
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires moveend
	     * @returns {Map} `this`
	     * @example
	     * map.setCenter([-74, 38]);
	     */
	    setCenter: function(center, eventData) {
	        this.jumpTo({center: center}, eventData);
	        return this;
	    },

	    /**
	     * Pan by a certain number of pixels
	     *
	     * @param {Array<number>} offset [x, y]
	     * @param {AnimationOptions} [options]
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires moveend
	     * @returns {Map} `this`
	     */
	    panBy: function(offset, options, eventData) {
	        this.panTo(this.transform.center,
	            util.extend({offset: Point.convert(offset).mult(-1)}, options), eventData);
	        return this;
	    },

	    /**
	     * Pan to a certain location with easing
	     *
	     * @param {LngLat} lnglat Location to pan to
	     * @param {AnimationOptions} [options]
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires moveend
	     * @returns {Map} `this`
	     */
	    panTo: function(lnglat, options, eventData) {
	        return this.easeTo(util.extend({
	            center: lnglat
	        }, options), eventData);
	    },


	    /**
	     * Get the current zoom
	     * @returns {number}
	     */
	    getZoom: function() { return this.transform.zoom; },

	    /**
	     * Sets a map zoom. Equivalent to `jumpTo({zoom: zoom})`.
	     *
	     * @param {number} zoom Map zoom level
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires zoomstart
	     * @fires move
	     * @fires zoom
	     * @fires moveend
	     * @fires zoomend
	     * @returns {Map} `this`
	     * @example
	     * // zoom the map to 5
	     * map.setZoom(5);
	     */
	    setZoom: function(zoom, eventData) {
	        this.jumpTo({zoom: zoom}, eventData);
	        return this;
	    },

	    /**
	     * Zooms to a certain zoom level with easing.
	     *
	     * @param {number} zoom
	     * @param {AnimationOptions} [options]
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires zoomstart
	     * @fires move
	     * @fires zoom
	     * @fires moveend
	     * @fires zoomend
	     * @returns {Map} `this`
	     */
	    zoomTo: function(zoom, options, eventData) {
	        return this.easeTo(util.extend({
	            zoom: zoom
	        }, options), eventData);
	    },

	    /**
	     * Zoom in by 1 level
	     *
	     * @param {AnimationOptions} [options]
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires zoomstart
	     * @fires move
	     * @fires zoom
	     * @fires moveend
	     * @fires zoomend
	     * @returns {Map} `this`
	     */
	    zoomIn: function(options, eventData) {
	        this.zoomTo(this.getZoom() + 1, options, eventData);
	        return this;
	    },

	    /**
	     * Zoom out by 1 level
	     *
	     * @param {AnimationOptions} [options]
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires zoomstart
	     * @fires move
	     * @fires zoom
	     * @fires moveend
	     * @fires zoomend
	     * @returns {Map} `this`
	     */
	    zoomOut: function(options, eventData) {
	        this.zoomTo(this.getZoom() - 1, options, eventData);
	        return this;
	    },


	    /**
	     * Get the current bearing in degrees
	     * @returns {number}
	     */
	    getBearing: function() { return this.transform.bearing; },

	    /**
	     * Sets a map rotation. Equivalent to `jumpTo({bearing: bearing})`.
	     *
	     * @param {number} bearing Map rotation bearing in degrees counter-clockwise from north
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires moveend
	     * @returns {Map} `this`
	     * @example
	     * // rotate the map to 90 degrees
	     * map.setBearing(90);
	     */
	    setBearing: function(bearing, eventData) {
	        this.jumpTo({bearing: bearing}, eventData);
	        return this;
	    },

	    /**
	     * Rotate bearing by a certain number of degrees with easing
	     *
	     * @param {number} bearing
	     * @param {AnimationOptions} [options]
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires moveend
	     * @returns {Map} `this`
	     */
	    rotateTo: function(bearing, options, eventData) {
	        return this.easeTo(util.extend({
	            bearing: bearing
	        }, options), eventData);
	    },

	    /**
	     * Sets map bearing to 0 (north) with easing
	     *
	     * @param {AnimationOptions} [options]
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires moveend
	     * @returns {Map} `this`
	     */
	    resetNorth: function(options, eventData) {
	        this.rotateTo(0, util.extend({duration: 1000}, options), eventData);
	        return this;
	    },

	    /**
	     * Animates map bearing to 0 (north) if it's already close to it.
	     *
	     * @param {AnimationOptions} [options]
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires moveend
	     * @returns {Map} `this`
	     */
	    snapToNorth: function(options, eventData) {
	        if (Math.abs(this.getBearing()) < this.options.bearingSnap) {
	            return this.resetNorth(options, eventData);
	        }
	        return this;
	    },

	    /**
	     * Get the current angle in degrees
	     * @returns {number}
	     */
	    getPitch: function() { return this.transform.pitch; },

	    /**
	     * Sets a map angle. Equivalent to `jumpTo({pitch: pitch})`.
	     *
	     * @param {number} pitch The angle at which the camera is looking at the ground
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires moveend
	     * @returns {Map} `this`
	     */
	    setPitch: function(pitch, eventData) {
	        this.jumpTo({pitch: pitch}, eventData);
	        return this;
	    },


	    /**
	     * Zoom to contain certain geographical bounds
	     *
	     * @param {LngLatBounds|Array<Array<number>>} bounds [[minLng, minLat], [maxLng, maxLat]]
	     * @param {Object} options
	     * @param {boolean} [options.linear] When true, the map transitions to the new camera using
	     *     {@link #Map.easeTo}. When false, the map transitions using {@link #Map.flyTo}. See
	     *     {@link #Map.flyTo} for information on options specific to that animation transition.
	     * @param {Function} options.easing
	     * @param {number} options.padding how much padding there is around the given bounds on each side in pixels
	     * @param {number} options.maxZoom The resulting zoom level will be at most
	     *     this value.
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires moveend
	     * @returns {Map} `this`
	     */
	    fitBounds: function(bounds, options, eventData) {

	        options = util.extend({
	            padding: 0,
	            offset: [0, 0],
	            maxZoom: Infinity
	        }, options);

	        bounds = LngLatBounds.convert(bounds);

	        var offset = Point.convert(options.offset),
	            tr = this.transform,
	            nw = tr.project(bounds.getNorthWest()),
	            se = tr.project(bounds.getSouthEast()),
	            size = se.sub(nw),
	            scaleX = (tr.width - options.padding * 2 - Math.abs(offset.x) * 2) / size.x,
	            scaleY = (tr.height - options.padding * 2 - Math.abs(offset.y) * 2) / size.y;

	        options.center = tr.unproject(nw.add(se).div(2));
	        options.zoom = Math.min(tr.scaleZoom(tr.scale * Math.min(scaleX, scaleY)), options.maxZoom);
	        options.bearing = 0;

	        return options.linear ?
	            this.easeTo(options, eventData) :
	            this.flyTo(options, eventData);
	    },

	    /**
	     * Change any combination of center, zoom, bearing, and pitch, without
	     * a transition. The map will retain the current values for any options
	     * not included in `options`.
	     *
	     * @param {CameraOptions} options map view options
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires zoomstart
	     * @fires move
	     * @fires zoom
	     * @fires rotate
	     * @fires pitch
	     * @fires zoomend
	     * @fires moveend
	     * @returns {Map} `this`
	     */
	    jumpTo: function(options, eventData) {
	        this.stop();

	        var tr = this.transform,
	            zoomChanged = false,
	            bearingChanged = false,
	            pitchChanged = false;

	        if ('zoom' in options && tr.zoom !== +options.zoom) {
	            zoomChanged = true;
	            tr.zoom = +options.zoom;
	        }

	        if ('center' in options) {
	            tr.center = LngLat.convert(options.center);
	        }

	        if ('bearing' in options && tr.bearing !== +options.bearing) {
	            bearingChanged = true;
	            tr.bearing = +options.bearing;
	        }

	        if ('pitch' in options && tr.pitch !== +options.pitch) {
	            pitchChanged = true;
	            tr.pitch = +options.pitch;
	        }

	        this.fire('movestart', eventData)
	            .fire('move', eventData);

	        if (zoomChanged) {
	            this.fire('zoomstart', eventData)
	                .fire('zoom', eventData)
	                .fire('zoomend', eventData);
	        }

	        if (bearingChanged) {
	            this.fire('rotate', eventData);
	        }

	        if (pitchChanged) {
	            this.fire('pitch', eventData);
	        }

	        return this.fire('moveend', eventData);
	    },

	    /**
	     * Change any combination of center, zoom, bearing, and pitch, with a smooth animation
	     * between old and new values. The map will retain the current values for any options
	     * not included in `options`.
	     *
	     * @param {CameraOptions|AnimationOptions} options map view and animation options
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires zoomstart
	     * @fires move
	     * @fires zoom
	     * @fires rotate
	     * @fires pitch
	     * @fires zoomend
	     * @fires moveend
	     * @returns {Map} `this`
	     */
	    easeTo: function(options, eventData) {
	        this.stop();

	        options = util.extend({
	            offset: [0, 0],
	            duration: 500,
	            easing: util.ease
	        }, options);

	        var tr = this.transform,
	            offset = Point.convert(options.offset),
	            startZoom = this.getZoom(),
	            startBearing = this.getBearing(),
	            startPitch = this.getPitch(),

	            zoom = 'zoom' in options ? +options.zoom : startZoom,
	            bearing = 'bearing' in options ? this._normalizeBearing(options.bearing, startBearing) : startBearing,
	            pitch = 'pitch' in options ? +options.pitch : startPitch,

	            toLngLat,
	            toPoint;

	        if ('center' in options) {
	            toLngLat = LngLat.convert(options.center);
	            toPoint = tr.centerPoint.add(offset);
	        } else if ('around' in options) {
	            toLngLat = LngLat.convert(options.around);
	            toPoint = tr.locationPoint(toLngLat);
	        } else {
	            toPoint = tr.centerPoint.add(offset);
	            toLngLat = tr.pointLocation(toPoint);
	        }

	        var fromPoint = tr.locationPoint(toLngLat);

	        if (options.animate === false) options.duration = 0;

	        this.zooming = (zoom !== startZoom);
	        this.rotating = (startBearing !== bearing);
	        this.pitching = (pitch !== startPitch);

	        if (!options.noMoveStart) {
	            this.fire('movestart', eventData);
	        }
	        if (this.zooming) {
	            this.fire('zoomstart', eventData);
	        }

	        clearTimeout(this._onEaseEnd);

	        this._ease(function (k) {
	            if (this.zooming) {
	                tr.zoom = interpolate(startZoom, zoom, k);
	            }

	            if (this.rotating) {
	                tr.bearing = interpolate(startBearing, bearing, k);
	            }

	            if (this.pitching) {
	                tr.pitch = interpolate(startPitch, pitch, k);
	            }

	            tr.setLocationAtPoint(toLngLat, fromPoint.add(toPoint.sub(fromPoint)._mult(k)));

	            this.fire('move', eventData);
	            if (this.zooming) {
	                this.fire('zoom', eventData);
	            }
	            if (this.rotating) {
	                this.fire('rotate', eventData);
	            }
	            if (this.pitching) {
	                this.fire('pitch', eventData);
	            }
	        }, function() {
	            if (options.delayEndEvents) {
	                this._onEaseEnd = setTimeout(this._easeToEnd.bind(this, eventData), options.delayEndEvents);
	            } else {
	                this._easeToEnd(eventData);
	            }
	        }.bind(this), options);

	        return this;
	    },

	    _easeToEnd: function(eventData) {
	        if (this.zooming) {
	            this.fire('zoomend', eventData);
	        }
	        this.fire('moveend', eventData);

	        this.zooming = false;
	        this.rotating = false;
	        this.pitching = false;
	    },

	    /**
	     * Change any combination of center, zoom, bearing, and pitch, animated along a curve that
	     * evokes flight. The transition animation seamlessly incorporates zooming and panning to help
	     * the user find his or her bearings even after traversing a great distance.
	     *
	     * @param {CameraOptions|AnimationOptions} options map view and animation options
	     * @param {number} [options.curve=1.42] Relative amount of zooming that takes place along the
	     *     flight path. A high value maximizes zooming for an exaggerated animation, while a low
	     *     value minimizes zooming for something closer to {@link #Map.easeTo}. 1.42 is the average
	     *     value selected by participants in the user study in
	     *     [van Wijk (2003)](https://www.win.tue.nl/~vanwijk/zoompan.pdf). A value of
	     *     `Math.pow(6, 0.25)` would be equivalent to the root mean squared average velocity. A
	     *     value of 1 would produce a circular motion.
	     * @param {number} [options.minZoom] Zero-based zoom level at the peak of the flight path. If
	     *     `options.curve` is specified, this option is ignored.
	     * @param {number} [options.speed=1.2] Average speed of the animation. A speed of 1.2 means that
	     *     the map appears to move along the flight path by 1.2 times `options.curve` screenfuls every
	     *     second. A _screenful_ is the visible span in pixels. It does not correspond to a fixed
	     *     physical distance but rather varies by zoom level.
	     * @param {number} [options.screenSpeed] Average speed of the animation, measured in screenfuls
	     *     per second, assuming a linear timing curve. If `options.speed` is specified, this option
	     *     is ignored.
	     * @param {Function} [options.easing] Transition timing curve
	     * @param {EventData} [eventData] Data to propagate to any event receivers
	     * @fires movestart
	     * @fires zoomstart
	     * @fires move
	     * @fires zoom
	     * @fires rotate
	     * @fires pitch
	     * @fires zoomend
	     * @fires moveend
	     * @returns {this}
	     * @example
	     * // fly with default options to null island
	     * map.flyTo({center: [0, 0], zoom: 9});
	     * // using flyTo options
	     * map.flyTo({
	     *   center: [0, 0],
	     *   zoom: 9,
	     *   speed: 0.2,
	     *   curve: 1,
	     *   easing: function(t) {
	     *     return t;
	     *   }
	     * });
	     */
	    flyTo: function(options, eventData) {
	        // This method implements an “optimal path” animation, as detailed in:
	        //
	        // Van Wijk, Jarke J.; Nuij, Wim A. A. “Smooth and efficient zooming and panning.” INFOVIS
	        //   ’03. pp. 15–22. <https://www.win.tue.nl/~vanwijk/zoompan.pdf#page=5>.
	        //
	        // Where applicable, local variable documentation begins with the associated variable or
	        // function in van Wijk (2003).

	        this.stop();

	        options = util.extend({
	            offset: [0, 0],
	            speed: 1.2,
	            curve: 1.42,
	            easing: util.ease
	        }, options);

	        var tr = this.transform,
	            offset = Point.convert(options.offset),
	            startZoom = this.getZoom(),
	            startBearing = this.getBearing(),
	            startPitch = this.getPitch();

	        var center = 'center' in options ? LngLat.convert(options.center) : this.getCenter();
	        var zoom = 'zoom' in options ?  +options.zoom : startZoom;
	        var bearing = 'bearing' in options ? this._normalizeBearing(options.bearing, startBearing) : startBearing;
	        var pitch = 'pitch' in options ? +options.pitch : startPitch;

	        // If a path crossing the antimeridian would be shorter, extend the final coordinate so that
	        // interpolating between the two endpoints will cross it.
	        if (Math.abs(tr.center.lng) + Math.abs(center.lng) > 180) {
	            if (tr.center.lng > 0 && center.lng < 0) {
	                center.lng += 360;
	            } else if (tr.center.lng < 0 && center.lng > 0) {
	                center.lng -= 360;
	            }
	        }

	        var scale = tr.zoomScale(zoom - startZoom),
	            from = tr.point,
	            to = 'center' in options ? tr.project(center).sub(offset.div(scale)) : from;

	        var startWorldSize = tr.worldSize,
	            rho = options.curve,

	            // w₀: Initial visible span, measured in pixels at the initial scale.
	            w0 = Math.max(tr.width, tr.height),
	            // w₁: Final visible span, measured in pixels with respect to the initial scale.
	            w1 = w0 / scale,
	            // Length of the flight path as projected onto the ground plane, measured in pixels from
	            // the world image origin at the initial scale.
	            u1 = to.sub(from).mag();

	        if ('minZoom' in options) {
	            var minZoom = util.clamp(Math.min(options.minZoom, startZoom, zoom), tr.minZoom, tr.maxZoom);
	            // w<sub>m</sub>: Maximum visible span, measured in pixels with respect to the initial
	            // scale.
	            var wMax = w0 / tr.zoomScale(minZoom - startZoom);
	            rho = Math.sqrt(wMax / u1 * 2);
	        }

	        // ρ²
	        var rho2 = rho * rho;

	        /**
	         * rᵢ: Returns the zoom-out factor at one end of the animation.
	         *
	         * @param i 0 for the ascent or 1 for the descent.
	         * @private
	         */
	        function r(i) {
	            var b = (w1 * w1 - w0 * w0 + (i ? -1 : 1) * rho2 * rho2 * u1 * u1) / (2 * (i ? w1 : w0) * rho2 * u1);
	            return Math.log(Math.sqrt(b * b + 1) - b);
	        }

	        function sinh(n) { return (Math.exp(n) - Math.exp(-n)) / 2; }
	        function cosh(n) { return (Math.exp(n) + Math.exp(-n)) / 2; }
	        function tanh(n) { return sinh(n) / cosh(n); }

	        // r₀: Zoom-out factor during ascent.
	        var r0 = r(0),
	            /**
	             * w(s): Returns the visible span on the ground, measured in pixels with respect to the
	             * initial scale.
	             *
	             * Assumes an angular field of view of 2 arctan ½ ≈ 53°.
	             * @private
	             */
	            w = function (s) { return (cosh(r0) / cosh(r0 + rho * s)); },
	            /**
	             * u(s): Returns the distance along the flight path as projected onto the ground plane,
	             * measured in pixels from the world image origin at the initial scale.
	             * @private
	             */
	            u = function (s) { return w0 * ((cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2) / u1; },
	            // S: Total length of the flight path, measured in ρ-screenfuls.
	            S = (r(1) - r0) / rho;

	        // When u₀ = u₁, the optimal path doesn’t require both ascent and descent.
	        if (Math.abs(u1) < 0.000001) {
	            // Perform a more or less instantaneous transition if the path is too short.
	            if (Math.abs(w0 - w1) < 0.000001) return this.easeTo(options);

	            var k = w1 < w0 ? -1 : 1;
	            S = Math.abs(Math.log(w1 / w0)) / rho;

	            u = function() { return 0; };
	            w = function(s) { return Math.exp(k * rho * s); };
	        }

	        if ('duration' in options) {
	            options.duration = +options.duration;
	        } else {
	            var V = 'screenSpeed' in options ? +options.screenSpeed / rho : +options.speed;
	            options.duration = 1000 * S / V;
	        }

	        this.zooming = true;
	        if (startBearing !== bearing) this.rotating = true;
	        if (startPitch !== pitch) this.pitching = true;

	        this.fire('movestart', eventData);
	        this.fire('zoomstart', eventData);

	        this._ease(function (k) {
	            // s: The distance traveled along the flight path, measured in ρ-screenfuls.
	            var s = k * S,
	                us = u(s);

	            tr.zoom = startZoom + tr.scaleZoom(1 / w(s));
	            tr.center = tr.unproject(from.add(to.sub(from).mult(us)), startWorldSize);

	            if (this.rotating) {
	                tr.bearing = interpolate(startBearing, bearing, k);
	            }
	            if (this.pitching) {
	                tr.pitch = interpolate(startPitch, pitch, k);
	            }

	            this.fire('move', eventData);
	            this.fire('zoom', eventData);
	            if (this.rotating) {
	                this.fire('rotate', eventData);
	            }
	            if (this.pitching) {
	                this.fire('pitch', eventData);
	            }
	        }, function() {
	            this.fire('zoomend', eventData);
	            this.fire('moveend', eventData);
	            this.zooming = false;
	            this.rotating = false;
	            this.pitching = false;
	        }, options);

	        return this;
	    },

	    isEasing: function() {
	        return !!this._abortFn;
	    },

	    /**
	     * Stop current animation
	     *
	     * @returns {Map} `this`
	     */
	    stop: function() {
	        if (this._abortFn) {
	            this._abortFn();
	            this._finishEase();
	        }
	        return this;
	    },

	    _ease: function(frame, finish, options) {
	        this._finishFn = finish;
	        this._abortFn = browser.timed(function (t) {
	            frame.call(this, options.easing(t));
	            if (t === 1) {
	                this._finishEase();
	            }
	        }, options.animate === false ? 0 : options.duration, this);
	    },

	    _finishEase: function() {
	        delete this._abortFn;
	        // The finish function might emit events which trigger new eases, which
	        // set a new _finishFn. Ensure we don't delete it unintentionally.
	        var finish = this._finishFn;
	        delete this._finishFn;
	        finish.call(this);
	    },

	    // convert bearing so that it's numerically close to the current one so that it interpolates properly
	    _normalizeBearing: function(bearing, currentBearing) {
	        bearing = util.wrap(bearing, -180, 180);
	        var diff = Math.abs(bearing - currentBearing);
	        if (Math.abs(bearing - 360 - currentBearing) < diff) bearing -= 360;
	        if (Math.abs(bearing + 360 - currentBearing) < diff) bearing += 360;
	        return bearing;
	    },

	    _updateEasing: function(duration, zoom, bezier) {
	        var easing;

	        if (this.ease) {
	            var ease = this.ease,
	                t = (Date.now() - ease.start) / ease.duration,
	                speed = ease.easing(t + 0.01) - ease.easing(t),

	                // Quick hack to make new bezier that is continuous with last
	                x = 0.27 / Math.sqrt(speed * speed + 0.0001) * 0.01,
	                y = Math.sqrt(0.27 * 0.27 - x * x);

	            easing = util.bezier(x, y, 0.25, 1);
	        } else {
	            easing = bezier ? util.bezier.apply(util, bezier) : util.ease;
	        }

	        // store information on current easing
	        this.ease = {
	            start: (new Date()).getTime(),
	            to: Math.pow(2, zoom),
	            duration: duration,
	            easing: easing
	        };

	        return easing;
	    }
	});


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Control = __webpack_require__(167);
	var DOM = __webpack_require__(16);
	var util = __webpack_require__(11);

	module.exports = Attribution;

	/**
	 * Creates an attribution control
	 * @class Attribution
	 * @param {Object} [options]
	 * @param {string} [options.position='bottom-right'] A string indicating the control's position on the map. Options are `top-right`, `top-left`, `bottom-right`, `bottom-left`
	 * @example
	 * var map = new mapboxgl.Map({attributionControl: false})
	 *     .addControl(new mapboxgl.Navigation({position: 'top-left'}));
	 */
	function Attribution(options) {
	    util.setOptions(this, options);
	}

	Attribution.prototype = util.inherit(Control, {
	    options: {
	        position: 'bottom-right'
	    },

	    onAdd: function(map) {
	        var className = 'mapboxgl-ctrl-attrib',
	            container = this._container = DOM.create('div', className, map.getContainer());

	        this._update();
	        map.on('source.load', this._update.bind(this));
	        map.on('source.change', this._update.bind(this));
	        map.on('source.remove', this._update.bind(this));
	        map.on('moveend', this._updateEditLink.bind(this));

	        return container;
	    },

	    _update: function() {
	        var attributions = [];

	        if (this._map.style) {
	            for (var id in this._map.style.sources) {
	                var source = this._map.style.sources[id];
	                if (source.attribution && attributions.indexOf(source.attribution) < 0) {
	                    attributions.push(source.attribution);
	                }
	            }
	        }

	        this._container.innerHTML = attributions.join(' | ');
	        this._editLink = this._container.getElementsByClassName('mapbox-improve-map')[0];
	        this._updateEditLink();
	    },

	    _updateEditLink: function() {
	        if (this._editLink) {
	            var center = this._map.getCenter();
	            this._editLink.href = 'https://www.mapbox.com/map-feedback/#/' +
	                    center.lng + '/' + center.lat + '/' + Math.round(this._map.getZoom() + 1);
	        }
	    }
	});


/***/ },
/* 167 */
/***/ function(module, exports) {

	'use strict';

	module.exports = Control;

	/**
	 * A base class for map-related interface elements.
	 *
	 * @class Control
	 */
	function Control() {}

	Control.prototype = {
	    /**
	     * Add this control to the map, returning the control itself
	     * for chaining. This will insert the control's DOM element into
	     * the map's DOM element if the control has a `position` specified.
	     *
	     * @param {Map} map
	     * @returns {Control} `this`
	     */
	    addTo: function(map) {
	        this._map = map;
	        var container = this._container = this.onAdd(map);
	        if (this.options && this.options.position) {
	            var pos = this.options.position;
	            var corner = map._controlCorners[pos];
	            container.className += ' mapboxgl-ctrl';
	            if (pos.indexOf('bottom') !== -1) {
	                corner.insertBefore(container, corner.firstChild);
	            } else {
	                corner.appendChild(container);
	            }
	        }

	        return this;
	    },

	    /**
	     * Remove this control from the map it has been added to.
	     *
	     * @returns {Control} `this`
	     */
	    remove: function() {
	        this._container.parentNode.removeChild(this._container);
	        if (this.onRemove) this.onRemove(this._map);
	        this._map = null;
	        return this;
	    }
	};


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Control = __webpack_require__(167);
	var DOM = __webpack_require__(16);
	var util = __webpack_require__(11);

	module.exports = Navigation;

	/**
	 * Creates a navigation control with zoom buttons and a compass
	 * @class Navigation
	 * @param {Object} [options]
	 * @param {string} [options.position='top-right'] A string indicating the control's position on the map. Options are `top-right`, `top-left`, `bottom-right`, `bottom-left`
	 * @example
	 * map.addControl(new mapboxgl.Navigation({position: 'top-left'})); // position is optional
	 */
	function Navigation(options) {
	    util.setOptions(this, options);
	}

	Navigation.prototype = util.inherit(Control, {
	    options: {
	        position: 'top-right'
	    },

	    onAdd: function(map) {
	        var className = 'mapboxgl-ctrl';

	        var container = this._container = DOM.create('div', className + '-group', map.getContainer());
	        this._container.addEventListener('contextmenu', this._onContextMenu.bind(this));

	        this._zoomInButton = this._createButton(className + '-icon ' + className + '-zoom-in', map.zoomIn.bind(map));
	        this._zoomOutButton = this._createButton(className + '-icon ' + className + '-zoom-out', map.zoomOut.bind(map));
	        this._compass = this._createButton(className + '-icon ' + className + '-compass', map.resetNorth.bind(map));

	        this._compassArrow = DOM.create('div', 'arrow', this._compass);

	        this._compass.addEventListener('mousedown', this._onCompassDown.bind(this));
	        this._onCompassMove = this._onCompassMove.bind(this);
	        this._onCompassUp = this._onCompassUp.bind(this);

	        map.on('rotate', this._rotateCompassArrow.bind(this));
	        this._rotateCompassArrow();

	        this._el = map.getCanvasContainer();

	        return container;
	    },

	    _onContextMenu: function(e) {
	        e.preventDefault();
	    },

	    _onCompassDown: function(e) {
	        if (e.button !== 0) return;

	        DOM.disableDrag();
	        document.addEventListener('mousemove', this._onCompassMove);
	        document.addEventListener('mouseup', this._onCompassUp);

	        this._el.dispatchEvent(copyMouseEvent(e));
	        e.stopPropagation();
	    },

	    _onCompassMove: function(e) {
	        if (e.button !== 0) return;

	        this._el.dispatchEvent(copyMouseEvent(e));
	        e.stopPropagation();
	    },

	    _onCompassUp: function(e) {
	        if (e.button !== 0) return;

	        document.removeEventListener('mousemove', this._onCompassMove);
	        document.removeEventListener('mouseup', this._onCompassUp);
	        DOM.enableDrag();

	        this._el.dispatchEvent(copyMouseEvent(e));
	        e.stopPropagation();
	    },

	    _createButton: function(className, fn) {
	        var a = DOM.create('button', className, this._container);
	        a.addEventListener('click', function() { fn(); });
	        return a;
	    },

	    _rotateCompassArrow: function() {
	        var rotate = 'rotate(' + (this._map.transform.angle * (180 / Math.PI)) + 'deg)';
	        this._compassArrow.style.transform = rotate;
	    }
	});


	function copyMouseEvent(e) {
	    return new MouseEvent(e.type, {
	        button: 2,    // right click
	        buttons: 2,   // right click
	        bubbles: true,
	        cancelable: true,
	        detail: e.detail,
	        view: e.view,
	        screenX: e.screenX,
	        screenY: e.screenY,
	        clientX: e.clientX,
	        clientY: e.clientY,
	        movementX: e.movementX,
	        movementY: e.movementY,
	        ctrlKey: e.ctrlKey,
	        shiftKey: e.shiftKey,
	        altKey: e.altKey,
	        metaKey: e.metaKey
	    });
	}



/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = Popup;

	var util = __webpack_require__(11);
	var Evented = __webpack_require__(15);
	var DOM = __webpack_require__(16);
	var LngLat = __webpack_require__(34);

	/**
	 * Creates a popup component
	 * @class Popup
	 * @param {Object} options
	 * @param {boolean} options.closeButton
	 * @param {boolean} options.closeOnClick
	 * @param {string} options.anchor - One of "top", "bottom", "left", "right", "top-left",
	 * "top-right", "bottom-left", or "bottom-right", describing where the popup's anchor
	 * relative to the coordinate set via `setLngLat`.
	 * @example
	 * var tooltip = new mapboxgl.Popup()
	 *   .setLngLat(e.lngLat)
	 *   .setHTML("<h1>Hello World!</h1>")
	 *   .addTo(map);
	 */
	function Popup(options) {
	    util.setOptions(this, options);
	    util.bindAll([
	        '_update',
	        '_onClickClose'],
	        this);
	}

	Popup.prototype = util.inherit(Evented, /** @lends Popup.prototype */{
	    options: {
	        closeButton: true,
	        closeOnClick: true
	    },

	    /**
	     * Attaches the popup to a map
	     * @param {Map} map
	     * @returns {Popup} `this`
	     */
	    addTo: function(map) {
	        this._map = map;
	        this._map.on('move', this._update);
	        if (this.options.closeOnClick) {
	            this._map.on('click', this._onClickClose);
	        }
	        this._update();
	        return this;
	    },

	    /**
	     * Removes the popup from the map
	     * @example
	     * var popup = new mapboxgl.Popup().addTo(map);
	     * popup.remove();
	     * @returns {Popup} `this`
	     */
	    remove: function() {
	        if (this._content && this._content.parentNode) {
	            this._content.parentNode.removeChild(this._content);
	        }

	        if (this._container) {
	            this._container.parentNode.removeChild(this._container);
	            delete this._container;
	        }

	        if (this._map) {
	            this._map.off('move', this._update);
	            this._map.off('click', this._onClickClose);
	            delete this._map;
	        }

	        return this;
	    },

	    /**
	     * Get the current coordinates of popup element relative to map
	     * @returns {LngLat}
	     */
	    getLngLat: function() {
	        return this._lngLat;
	    },

	    /**
	     * Set the coordinates of a popup element to a map
	     * @param {LngLat} lnglat
	     * @returns {Popup} `this`
	     */
	    setLngLat: function(lnglat) {
	        this._lngLat = LngLat.convert(lnglat);
	        this._update();
	        return this;
	    },

	    /**
	     * Fill a popup element with text only content
	     * @param {string} text
	     * @returns {Popup} `this`
	     */
	    setText: function(text) {
	        this._createContent();
	        this._content.appendChild(document.createTextNode(text));

	        this._update();
	        return this;
	    },

	    /**
	     * Fill a popup element with HTML content
	     * @param {string} html
	     * @returns {Popup} `this`
	     */
	    setHTML: function(html) {
	        this._createContent();

	        var temp = document.createElement('body'), child;
	        temp.innerHTML = html;
	        while (true) {
	            child = temp.firstChild;
	            if (!child) break;
	            this._content.appendChild(child);
	        }

	        this._update();
	        return this;
	    },

	    _createContent: function() {
	        if (this._content && this._content.parentNode) {
	            this._content.parentNode.removeChild(this._content);
	        }

	        this._content = DOM.create('div', 'mapboxgl-popup-content', this._container);

	        if (this.options.closeButton) {
	            this._closeButton = DOM.create('button', 'mapboxgl-popup-close-button', this._content);
	            this._closeButton.innerHTML = '&#215;';
	            this._closeButton.addEventListener('click', this._onClickClose);
	        }
	    },

	    _update: function() {
	        if (!this._map || !this._lngLat || !this._content) { return; }

	        if (!this._container) {
	            this._container = DOM.create('div', 'mapboxgl-popup', this._map.getContainer());
	            this._tip       = DOM.create('div', 'mapboxgl-popup-tip', this._container);
	            this._container.appendChild(this._content);
	        }

	        var pos = this._map.project(this._lngLat).round(),
	            anchor = this.options.anchor;

	        if (!anchor) {
	            var width = this._container.offsetWidth,
	                height = this._container.offsetHeight;

	            if (pos.y < height) {
	                anchor = ['top'];
	            } else if (pos.y > this._map.transform.height - height) {
	                anchor = ['bottom'];
	            } else {
	                anchor = [];
	            }

	            if (pos.x < width / 2) {
	                anchor.push('left');
	            } else if (pos.x > this._map.transform.width - width / 2) {
	                anchor.push('right');
	            }

	            if (anchor.length === 0) {
	                anchor = 'bottom';
	            } else {
	                anchor = anchor.join('-');
	            }
	        }

	        var anchorTranslate = {
	            'top': 'translate(-50%,0)',
	            'top-left': 'translate(0,0)',
	            'top-right': 'translate(-100%,0)',
	            'bottom': 'translate(-50%,-100%)',
	            'bottom-left': 'translate(0,-100%)',
	            'bottom-right': 'translate(-100%,-100%)',
	            'left': 'translate(0,-50%)',
	            'right': 'translate(-100%,-50%)'
	        };

	        var classList = this._container.classList;
	        for (var key in anchorTranslate) {
	            classList.remove('mapboxgl-popup-anchor-' + key);
	        }
	        classList.add('mapboxgl-popup-anchor-' + anchor);

	        DOM.setTransform(this._container, anchorTranslate[anchor] + ' translate(' + pos.x + 'px,' + pos.y + 'px)');
	    },

	    _onClickClose: function() {
	        this.remove();
	    }
	});


/***/ }
/******/ ]);