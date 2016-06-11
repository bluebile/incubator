/**
 * Load Mask padrao do sistema
 *
 * @class Mba.ux.incubator.mask.LoadMask
 * @extends Mba.Mask
 */
Ext.define('Mba.ux.incubator.mask.LoadMask', {
    extend: 'Mba.ux.incubator.mask.Mask',
    xtype: 'mbaloadmask',
    config: {
        message: null,
        cls: 'mba-loading-mask',
        tpls: null
    },

    applyTpls: function(tpls) {

        if (!tpls) {
            return;
        }

        var indexes = [ 'android', 'ios', 'windowsphone' ],
            index;

        for (index in tpls) {
            if (indexes.indexOf(index) == -1) {
                throw 'Platform not supported';
            }
        }

        return tpls;
    },

    constructor: function(config) {
        if (!config.tpls) {

            this.setTpls({
                android: [
                    '<div class="spinner-android">',
                    '<svg class="material-spin" width="40px" height="40px" viewBox="0 0 66 66" ',
                          'xmlns="http://www.w3.org/2000/svg">',
                    '<circle class="path" fill="none" stroke-width="6" ',
                          'stroke-linecap="round" cx="33" cy="33" r="30"></circle>',
                    '</svg>',
                    '</div>'
                ].join('')
            });
        }

        this.callParent(arguments);
    },

    htmlDefault: [
        '<div class="spinner-ios">',
            '<div class="spinner spinner-animating">',
            '<div class="spin-blade"></div>',
            '<div class="spin-blade"></div>',
            '<div class="spin-blade"></div>',
            '<div class="spin-blade"></div>',
            '<div class="spin-blade"></div>',
            '<div class="spin-blade"></div>',
            '<div class="spin-blade"></div>',
            '<div class="spin-blade"></div>',
            '<div class="spin-blade"></div>',
            '<div class="spin-blade"></div>',
            '<div class="spin-blade"></div>',
            '<div class="spin-blade"></div>',
            '</div>',
        '</div>'
    ].join(''),

    /**
     * Updates the message element with the new value of the {@link #message} configuration
     * @private
     */
    updateMessage: function(newMessage) {
        var cls = Ext.baseCSSPrefix + 'has-message', method;

        if (newMessage) {
            method = 'show';
            this.addCls(cls);
        } else {
            method = 'hide';
            this.removeCls(cls);
        }

        this.messageElement.setHtml(newMessage);
        this.messageElement[method].apply(this.messageElement);
    },

    show: function() {
        this.callParent(arguments);
        Ext.Viewport.blockEventBack();
    },

    getTemplate: function() {
        var prefix = Ext.baseCSSPrefix,
            osName = Ext.os.name.toLowerCase(),
            tpls   = this.getTpls();

        return [
            {
                reference: 'innerElement',
                cls: prefix + 'mba-spinner',
                html: osName in tpls ? tpls[osName] : this.htmlDefault
            },
            {
                reference: 'messageElement',
                hidden: true
            }
        ];
    }
});
