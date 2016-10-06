Ext.define('Mba.ux.incubator.util.DateUtil', {
    extend: 'Ext.Evented',
    singleton: true,
    alternateClassName: 'DateUtil',

    mixins: [
        'Mba.ux.BuilderConfig.mixin.BuilderConfig'
    ],

    config: {
        currentTime: '',
        currentSqlTime: ' CAST((julianday(\'now\') - 2440587.5)*86400000 AS INTEGER) '
    },

    getCurrentTime: function() {
        if (Ext.isEmpty(this.config.currentTime)) {
            return new Date().getTime();
        }
        return this.config.currentTime;
    },

    constructor: function() {
        Date.prototype.stdTimezoneOffset = function() {
            var jan = new Date(this.getFullYear(), 0, 1), jul = new Date(this.getFullYear(), 6, 1);
            return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
        };

        Date.prototype.horarioVerao = function() {
            return this.getTimezoneOffset() < this.stdTimezoneOffset();
        };
        this.callParent(arguments);
    },

    getDateByGMT: function(offset, d) {
        if (!offset) {
            offset = ((new Date()).horarioVerao() ? -2 : -3);
        }

        if (!d) {
            d = new Date();
        }

        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

        if (!offset) {
            return d;
        }
        return new Date(utc + (3600000 * offset));
    },

    dataFormatadaPt: function(data) {
        var dia = data.getDate(),
            mes = data.getMonth() + 1,
            ano = data.getFullYear(),
            hora = data.getHours(),
            minutos = data.getMinutes();

        if (dia.toString().length == 1) {
            dia = "0" + dia;
        }
        if (mes.toString().length == 1) {
            mes = "0" + mes;
        }
        if (hora.toString().length == 1) {
            hora = "0" + hora;
        }
        if (minutos.toString().length == 1) {
            minutos = "0" + minutos;
        }
        return dia + "/" + mes + "/" + ano +  ' às ' + hora + 'h' + minutos;
    }

});

