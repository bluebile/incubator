/**
 * Classe responsável por sobreescrever comportamento padrão para o Dataview
 *
 * @class   Mba.ux.incubator.mask.DataView
 * @extends Ext.DataView
 */
Ext.define('Mba.ux.incubator.mask.DataView', {
    extend: 'Ext.DataView',
    xtype: 'mbadataview',

    statics: {
        beforeLoad: function() {
            var loadingText = this.getLoadingText();
            if (loadingText && this.isPainted()) {
                var maskConfig = this.config.maskConfig || Mba.ux.incubator.mask.getDefaultMask();
                this.setMasked(maskConfig);
            }

            this.hideEmptyText();
        },

        getDefaultMask: function() {
            return {xtype: 'mbaloadmask'};
        }
    },

    config: {
        maskConfig: null,
        loadingText: 'Carregando...'
    },

    onBeforeLoad: function() {
        Mba.ux.incubator.mask.beforeLoad.apply(this);
    }

}, function() {

    Ext.override(Ext.DataView, {
        onBeforeLoad: function() {
            Mba.ux.incubator.maskbeforeLoad.apply(this);
        }
    });
});
