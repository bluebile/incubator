/**
 * Classe responsável por gerenciar as instancias dos servicos
 * @class Mba.ux.incubator.service.Manager
 */

Ext.define('Mba.ux.incubator.service.Manager', {
    extend: 'Ext.util.Collection',
    alternateClassName: [ 'Mba.ServiceManager' ],
    requires: [ 'Mba.ux.incubator.service.OverrideApplication' ],
    singleton: true,

    /**
     * @method
     * Registra objeto de serviço para a coleção
     */
    register: function() {
        for (var i = 0, s; (s = arguments[i]); i++) {
            this.add(s);
        }
    },

    /**
     * @method
     * Elimina objeto de serviço da coleção
     */
    unregister: function() {
        for (var i = 0, s; (s = arguments[i]); i++) {
            this.remove(this.lookup(s));
        }
    },

    // getKey implementation for MixedCollection
    getKey: function(o) {
        return o.getServiceId();
    }
}, function() {
    Mba.getService = function(name) {
        return Mba.ux.incubator.service.Manager.get(name);
    };
});
