function ModulesProvider(context, execution, controller) {
  var modules = controller.getModules()
  var services = controller.getServices()
  context.modules = Object.keys(modules).reduce(function (contextModules, key) {
    var modulePath = key.split('.')
    var module = modulePath.reduce(function (contextModules, pathKey) {
      contextModules[pathKey] = contextModules[pathKey] || {}
      return contextModules[pathKey]
    }, contextModules)
    module.meta = modules[key].meta
    module.state = context.state.select(modulePath)
    module.services = modulePath.reduce(function (services, key) {
      return services[key] || {}
    }, services)

    if (
      execution.options.modulePath &&
      execution.options.modulePath.join('.') === key) {
        context.module = module
      }

    return contextModules
  }, {})

  return context
}

module.exports = ModulesProvider
