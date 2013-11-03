Package.describe({
  summary: "Add a schema to collection models"
});

Package.on_use(function (api, where) {
  api.use(['collection-models']);
  
  api.add_files('collection-models-schemas.js', ['client', 'server']);
  
  api.export('Validator')
});

Package.on_test(function (api) {
  api.use('collection-models-schemas');

  api.add_files('collection-models-schemas_tests.js', ['client', 'server']);
});
