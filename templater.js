var hbars = require('handlebars');
var path = require('path');
var fs = require('fs');

hbars.registerHelper('caps', function(data) {
  return data.toUpperCase();
});

/**
 * Templater class - Handles compiling templates
 * @param templateName The template name
 * @param jsonData     The user data in JSON format
 */
function Templater(templateName, jsonData) {

  // The name of the template without the extension
  this.templateName = templateName;

  // A json object containing all the required fields
  this.jsonData = jsonData;

  // A string that will contain the loaded template
  this.cTemplate = '';
  this.hTemplate = '';

  // A string containing the compiled text
  this.cRendered = '';
  this.hRendered = '';

  this.init = function() {

    // Load the template
    this.cTemplate = fs.readFileSync(path.join(__dirname,
      'templates', this.templateName + '.c'), 'utf-8');
    this.hTemplate = fs.readFileSync(path.join(__dirname,
      'templates', this.templateName + '.h'), 'utf-8');

    this.fillTemplates();
  };

  this.fillTemplates = function() {
    var cObj = hbars.compile(this.cTemplate);
    var hObj = hbars.compile(this.hTemplate);

    // Fill the context
    this.cRendered = cObj(this.jsonData);
    this.hRendered = hObj(this.jsonData);

    this.saveFiles();
  };

  this.saveFiles = function() {
    var cFileName = this.jsonData.student_id + '_' + this.jsonData.filename + '.c';
    var hFileName = this.jsonData.student_id + '_' + this.jsonData.filename + '.h';

    fs.writeFile(cFileName, this.cRendered, function(err) {
      if (err) {
        console.log("An error occured:");
        console.log(err);
      } else {
        console.log(cFileName + " file generated");
      }

    });

    fs.writeFile(hFileName, this.hRendered, function(err) {
      if (err) {
        console.log("An error occured:");
        console.log(err);
      } else {
        console.log(hFileName + " file generated");
      }
    });
  };

  // Run the init function
  this.init();

}

module.exports = Templater;
