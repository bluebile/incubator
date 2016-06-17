/**
 * Classe Base para identificação das classes de serviço
 * @class Mba.ux.incubator.service.Service
 */

Ext.define('Mba.ux.incubator.service.Service', {

    config: {
        serviceId: null
    },

    updateServiceId: function() {
        return Mba.ux.incubator.service.Manager.register(this);
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    init: Ext.emptyFn
});
