CollectionModel.schema = function(map) {
  this._schema = map;
}

var Message = function(pattern, message) {
  this.pattern = pattern;
  this.message = message;
}

// XXX: should we put this on the prototype too?
CollectionModel.isValid = function(doc) {
  return _.isEmpty(this.errors(doc));
}

var typeToErrorMessage = function(type) {
  if (type instanceof Message) 
    return type.message;
  else if (type === String)
    return 'must be a string!';
  
  return "is wrong!";
}

CollectionModel.errorOn = function(doc, property) {
  var definition = this._schema[property];
  var pattern = definition;
  
  if (definition instanceof Message)
    pattern = definition.pattern;
  
  if (! Match.test(doc[property], pattern))
    return typeToErrorMessage(definition);
}

CollectionModel.errors = function(doc) {
  var self = this, errors = {};
  _.each(this._schema, function(definition, property) {
    var error = self.errorOn(doc, property);
    if (error) errors[property] = error;
  });
  return errors;
}

Validator = {};
Validator.Message = function(pattern, message) {
  return new Message(pattern, message)
}