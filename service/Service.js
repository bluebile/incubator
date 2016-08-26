/**
 * Classe Base para identificação das classes de serviço
 * @class Mba.ux.incubator.service.Service
 */

Ext.define('Mba.ux.incubator.service.Service', {

    config: {
        serviceId: null
    },

    updateServiceId: function() {
        return Mba.ux.incubator.service.Manager.register(this);
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    tratarErro: function(response, deferred) {
        var mensagem, textResponse;
        if (response.responseText === '') {
            deferred.reject('O serviço está indisponível no momento.');
            return;
        }

        textResponse = Ext.decode(response.responseText);
        if (response.status == 405) {
            deferred.reject(textResponse.detail);
        } else if (response.status == 400 || response.status == 401) {
            mensagem = textResponse.detail;
            if (mensagem == 'Dados incorretos') {
                mensagem = 'MSG_ERRO_LOGIN';
            }
            deferred.reject(mensagem);
        } else if (response.status == 200) {
            deferred.reject('MSG_ERRO_AUTENTICAR');
        } else {
            deferred.reject('MSG_ERRO_TIMEOUT');
        }
    },

    init: Ext.emptyFn
});
