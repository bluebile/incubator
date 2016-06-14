(function() {
    var originalFn = Ext.app.Application.prototype.onDependenciesLoaded;

    // @private
    Ext.define('Mba.ux.incubator.service.OverrideApplication', {
        override: 'Ext.app.Application',

        onDependenciesLoaded: function() {
            var controllers = this.getControllerInstances(),
                controller,
                controllerServices,
                services = [], name,
                me = this, callback;

            for (name in controllers) {
                controller = controllers[name];
                controllerServices = controller.getServices();
                services = services.concat(controllerServices);
            }

            callback = function() {
                var servicesIntances = me.instantiateServices(services);
                originalFn.apply(me);
                for (var i = 0, length = servicesIntances.length; i < length; i++) {
                    servicesIntances[i].init();
                }
            };

            Ext.require(services, callback);
        },

        instantiateServices: function(services) {
            var length  = services.length,
                service, serviceClass, serviceName,
                splits, i, servicesIntances = [];

            for (i = 0; i < length; i++) {
                service = services[i];

                if (Mba.ux.incubator.service && Mba.ux.incubator.service.Service &&
                    !(service instanceof Mba.ux.incubator.service.Service)) {
                    if (Ext.isString(service)) {
                        serviceName = service;
                        serviceClass = Ext.ClassManager.classes[service];

                        service = {
                            xclass: service
                        };

                        if (serviceClass.prototype.defaultConfig.serviceId === undefined) {
                            splits = serviceName.split('.');
                            service.id = splits[splits.length - 1];
                        }
                    }

                    servicesIntances.push(Ext.factory(service, Mba.ux.incubator.service.Service));
                }
            }

            return servicesIntances;
        }
    });
})();
