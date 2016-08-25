Ext.define('Mba.ux.incubator.util.Toast', {
    extend: 'Ext.Toast',
    config: {
        cls: 'error-message'
    },

    show: function(message) {
        var config = { timeout: 8000, message: message};
        this.callParent([config]);
    }
});

