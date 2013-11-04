Meteor.Collection.prototype.schema = function(map) {
  this._schema = map;
}

var Message = function(pattern, message) {
  this.pattern = pattern;
  this.message = message;
}

Meteor.Collection.prototype.isValid = function(doc) {
  return _.isEmpty(this.errors(doc));
}

var typeToString = function(type) {
  if (type === String)
    return 'string';
  else if (type === Number)
    return 'number'
  else if (type === Boolean)
    return 'boolean'
  else if (_.isArray(type))
    return 'array of ' + typeToString(type[0]) + 's';
  // XXX: fill out
  else
    return 'something'
}


var typeToErrorMessage = function(type) {
  if (type instanceof Message) 
    return type.message;
  // XXX: are there other things?
  else
    return 'must be a ' + typeToString(type)
}

Meteor.Collection.prototype.errorOn = function(doc, property) {
  var definition = this._schema[property];
  var pattern = definition;
  
  if (definition instanceof Message)
    pattern = definition.pattern;
  
  if (! Match.test(doc[property], pattern))
    return typeToErrorMessage(definition);
}

Meteor.Collection.prototype.errors = function(doc) {
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