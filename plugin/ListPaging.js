/**
 * Adds a Load More button at the bottom of the list. When the user presses this button,
 * the next page of data will be loaded into the store and appended to the List.
 *
 * By specifying `{@link #autoPaging}: true`, an 'infinite scroll' effect can be achieved,
 * i.e., the next page of content will load automatically when the user scrolls to the
 * bottom of the list.
 *
 * ## Example
 *
 *     Ext.create('Ext.dataview.List', {
 *
 *         store: Ext.create('TweetStore'),
 *
 *         plugins: [
 *             {
 *                 xclass: 'Mba.ux.incubator.plugin.ListPaging',
 *                 autoPaging: true
 *             }
 *         ],
 *
 *         itemTpl: [
 *             '<img src="{profile_image_url}" />',
 *             '<div class="tweet">{text}</div>'
 *         ]
 *     });
 */
Ext.define('Mba.ux.incubator.plugin.ListPaging', {
    extend: 'Ext.plugin.ListPaging',
    alias: 'plugin.listpagingcustom',

    config: {

        /**
         * @cfg {String} loadMoreText The text used as the label of the Load More button.
         */
        loadMoreText: 'Carregar mais...',

        /**
         * @cfg {String} noMoreRecordsText The text used as the label of the Load More button when the Store's
         * {@link Ext.data.Store#totalCount totalCount} indicates that all of the records available on the server are
         * already loaded
         */
        noMoreRecordsText: ''
    },

    init: function(list) {

        this.callParent([list]);

        var html = '';
        if (Ext.os.is.Android) {
            html = [
                '<div class="mba-loading-mask">',
                '<div class="x-mba-spinner">',
                '<div class="spinner-android">',
                '<svg class="material-spin" width="40px" height="40px" viewBox="0 0 66 66" ',
                'xmlns="http://www.w3.org/2000/svg">',
                '<circle class="path" fill="none" stroke-width="6" ',
                'stroke-linecap="round" cx="33" cy="33" r="30"></circle>',
                '</svg>',
                '</div>',
                '<tpl if="message">',
                '<div class="load-msg">{message}</div>',
                '</tpl>',
                '</div>',
                '</div>'
            ].join('');
        } else {
            html = [
                '<div class="mba-loading-mask">',
                '<div class="x-mba-spinner">',
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
                '<tpl if="message">',
                '<div class="load-msg">{message}</div>',
                '</tpl>',
                '</div>',
                '</div>'
            ].join('');
        }

        this.setLoadTpl(html);
    }
});
