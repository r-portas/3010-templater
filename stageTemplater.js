var hbars = require('handlebars');
var path = require('path');
var fs = require('fs');

function generateStageTemplate(jsonData) {
  var rawTemplate = fs.readFileSync(path.join(__dirname,
    'templates', 'main.c'), 'utf-8');
  var template = hbars.compile(rawTemplate);
  var renderedTemplate = template(jsonData);

  // Save the file
  fs.writeFile("main.c", renderedTemplate, function(err) {
    if (err) {
      console.log("An error occured:");
      console.log(err);
    } else {
      console.log("main.c file generated");
    }

  });

  // Now do the make file
  var makeContents = fs.readFileSync(path.join(__dirname,
    'templates', 'Makefile'), 'utf-8');
  fs.writeFile("Makefile", makeContents, function(err) {
    if (err) {
      console.log("An error occured:");
      console.log(err);
    } else {
      console.log("Makefile file generated");
    }
  });
}

module.exports = generateStageTemplate;
