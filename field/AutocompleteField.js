Ext.define('Mba.ux.incubator.field.AutocompleteField', {
    extend: 'Ext.field.Text',
    xtype: 'autocompletefield',

    config: {
        currentSelectedValue: null,
        currentShownValue: '',
        isSelectedItem: false,
        resultsHeight: 300,
        field: 'term',
        proxy: null,
        resultsStore: null,
        component: {
            xtype: 'input',
            type: 'text'
        },
        record: null
    },

    resultsList: null,

    applyResultsStore: function(resultsStore) {
        return Ext.getStore(resultsStore);
    },

    setValue: function(record) {
        var newShownValue, newSelectedValue;
        if (typeof record === 'object') {
            newShownValue = record.get(this.getField());
            newSelectedValue = record.get('id');
        }
        this.setRecord(record);
        this.setCurrentShownValue(newShownValue);
        this.getComponent().setValue(newShownValue);
        this.setCurrentSelectedValue(newSelectedValue);
    },

    getValue: function(getShownValue) {
        return (getShownValue || !this.getIsSelectedItem() ?
            this.getComponent().getValue() : this.getCurrentSelectedValue());
    },

    createResultStore: function() {
        var me = this;
        if (!this.getResultsStore()) {
            if (!Ext.ModelManager.getModel('AutocompleteResult')) {
                Ext.define('AutocompleteResult', {
                    extend: 'Ext.data.Model',
                    config: {
                        fields: ['id',me.getField()]
                    }
                });
            }
            this.setResultsStore(Ext.create('Ext.data.Store', {
                model: 'AutocompleteResult',
                config: {
                    autoLoad: false
                }
            }));
            this.resultsStore.setProxy(me.getProxy());
        }
    },

    createResultList: function() {
        var me = this;
        this.resultsList = Ext.create('Ext.List', {
            renderTo: this.getComponent().element.dom,
            store: me.getResultsStore(),
            margin: 2,
            itemTpl: '<span class="item-lista">{name}</span>',
            cls: 'ocupacao-list'
        });
    },

    initialize: function() {
        var me = this, blurTimeout = false, searchTimeout = false, doSearchWithTimeout = Ext.Function.EmptyFn;
        this.validateParams();

        this.createResultStore();

        this.createResultList();

        doSearchWithTimeout = function() {
            if (blurTimeout) {
                clearTimeout(blurTimeout);
            }
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }

            if (me.getIsSelectedItem() || me.getComponent().getValue() === '') {
                return;
            }

            searchTimeout = setTimeout(function() {
                me.getResultsStore().clearFilter();
                me.getResultsStore().filter(me.getField(), me.getValue(true));
                me.setIsSelectedItem(false);
                me.getResultsStore().load({
                    callback: function(records) {
                        me.resultsList.setHeight(records.length * 51);
                    }
                });
            }, 300);
        };

        this.resultsList.on('itemtouchend', function() {
            if (blurTimeout) {
                clearTimeout(blurTimeout);
            }
        });

        this.resultsList.onScroll = Ext.Function.EmptyFn;

        this.resultsList.on('itemtap', function(self, index, target, record) {
            me.setValue(record);
            me.setIsSelectedItem(true);

            blurTimeout = setTimeout(function() {
                me.resultsList.setHeight(0);
            }, 500);
        });

        this.getComponent().on('focus', doSearchWithTimeout);
        this.getComponent().on('keyup', function() {
            me.setIsSelectedItem(false);
            doSearchWithTimeout();
        });

        this.getComponent().on('blur', function() {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }

            blurTimeout = setTimeout(function() {
                me.resultsList.setHeight(0);
            }, 500);
        });
    },

    validateParams: function() {
        if (!this.getProxy() && !this.getResultsStore()) {
            throw new Error('Proxy or Store must be set.');
        }
        if (!this.getLabel() || !this.getField()) {
            throw new Error('LabelKey and NeedKey must be defined with autocomplete config.');
        }
    }

});

