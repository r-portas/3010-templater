var Templater = require('./templater.js');
var fs = require('fs');
var path = require('path');
var rl = require('readline-sync');

var curDate = new Date();
var userFile = path.join(__dirname, 'user.json');
var userData = {};

function createTemplate() {
  loadConfig(function() {
    getFields();
    console.log("Generating template files");
    var template = new Templater('template', userData);
  });
}

function getFields() {
  userData.date = curDate;
  userData.filename = rl.question("Filename (e.g. lightbar): ");
  userData.description = rl.question("Description: ");
  userData.reference = rl.question("Filename (e.g. LIGHTBAR.pdf): ");
}

function loadConfig(callback) {
  fs.access(userFile, fs.R_OK, function(err) {
    if (err) {
      // File does not exist
      saveConfig(function() {
        loadConfig();
      });
    } else {
      var raw = fs.readFileSync(userFile, 'utf-8');
      userData = JSON.parse(raw);
      callback();
    }
  });

}

function saveConfig(callback) {
  // Ask for user input to fill in the details
  var student_id = rl.question("Student id: ");
  var name = rl.question("Name: ");
  var json = {student_id: student_id, name: name};
  var jsonString = JSON.stringify(json);
  fs.writeFile(userFile, jsonString, function(err) {
    if (err) {
      console.log("An error occured while saving config file");
      console.log(err);
    } else {
      console.log("Saved config file");
      callback();
    }
  });
}

createTemplate();
//var template = new Templater('template', data);
