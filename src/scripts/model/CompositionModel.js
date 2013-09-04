var bigRender = bigRender || {};

(function() {
	'use strict';


	var CompositionModel = function() {
		this.restoreDefaults();
	};

	var p = CompositionModel.prototype;


	p.restoreDefaults = function() {
		this.layers = [];
		this.targetLayer = null;
		this.highlightLayer = null;
		this.nextLayerId = 1;
		this.commands = [];
		this.targetCommandPos = 0;
		this.data = {};
		this.scrollX = 0;
		this.scrollY = 0;
		this.width = 200;
		this.height = 200;
		this.multiImage = false;
	};


	p.setDimensions = function(w, h) {
		this.width = w;
		this.height = h;
		this.dispatchEvent({type: bigRender.event.DIMENSIONS_CHANGED, width:w, height:h});
	};


	p.setData = function(data) {
		this.data = data;
		this.dispatchEvent({type: bigRender.event.DATA_CHANGED, data:data});
	};


	p.setTargetLayer = function(layer) {
		this.targetLayer = layer;
		this.dispatchEvent({type: bigRender.event.TARGET_LAYER_CHANGED, targetLayer: layer});
	};


	p.addLayer = function(layer) {
		this.layers.push(layer);
		this.dispatchEvent({type: bigRender.event.LAYER_ADDED, layer: layer});
	};


	p.removeLayer = function(layer) {
		var index = this.layers.indexOf(layer);
		if(index !== -1) {
			this.layers.splice(index, 1);
			this.dispatchEvent({type: bigRender.event.LAYER_REMOVED, layer: layer});
			this.pickDefaultTargetLayer();
		}
	};


	p.setScroll = function(x, y) {
		this.scrollX = x;
		this.scrollY = y;
		this.dispatchEvent({type: bigRender.event.SCROLL_CHANGED, scrollX: x, scrollY: y});
	};


	p.setTargetCommandPos = function(num) {
		this.targetCommandPos = num;
		this.dispatchEvent({type: bigRender.event.TARGET_CHANGED, targetCommandPos: targetCommandPos});
	};


	p.getLayerById = function(id) {
		for(var layer in this.layers) {
			if(layer.layerId === id) {
				return(layer);
			}
		}
	};


	bigRender.CompositionModel = CompositionModel;

}());