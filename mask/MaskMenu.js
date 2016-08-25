Ext.define('Mba.ux.incubator.mask.MaskMenu', {
    extend: 'Ext.Mask',
    xtype: 'maskMenu',

    config: {
        cls: 'menu-over'
    },

    initialize: function() {
        this.element.on('tap', function() {
            Ext.Viewport.down('#tabletTab').fireEvent('toggleMenu');
        });
    }

});

