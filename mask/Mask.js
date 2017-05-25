/**
 * Load Mask padrao do sistema
 *
 * @class Mba.ux.incubator.mask.Mask
 * @extends Ext.Mask
 */
Ext.define('Mba.ux.incubator.mask.Mask', {
    extend: 'Ext.Mask',
    xtype: 'mbamask',
    alternateClassName: 'Mba.Mask',
    config: {
        blockEvents: true
    },

    onHide: function() {
        this.callParent();
        Ext.Viewport.unBlockEventBack();
    },

    onEvent: function(e) {
        var controller = arguments[arguments.length - 1];

        if (controller.info.eventName === 'tap') {
            this.fireEvent('tap', this, e);
            return false;
        }

        if (e && e.stopEvent && this.getBlockEvents()) {
            e.stopEvent();
        }

        return false;
    }
});
