Ext.define('Mba.ux.incubator.util.Toast', {
    extend: 'Ext.Toast',
    singleton: true,
    alternateClassName: 'MbaToast',
    config: {
        cls: 'error-message'
    },

    show: function(message) {
        var config = { timeout: 2000, message: message};
        this.callParent([config]);
    }
});
