Ext.define('Mba.ux.incubator.util.Toast', {
    extend: 'Ext.Toast',
    singleton: true,
    alternateClassName: 'MbaToast',
    config: {
        cls: 'error-message'
    },

    show: function(message, timeout) {
        if(Ext.isEmpty(timeout)) {
            timeout = 2000
        }
        var config = { timeout: timeout, message: message};
        this.callParent([config]);
    }
});
