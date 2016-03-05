var Templater = require('./templater');
var stageTemplater = require('./stageTemplater')
var fs = require('fs');
var path = require('path');
var rl = require('readline-sync');
var access = require('fs-access');

var curDate = new Date();
var userFile = path.join(__dirname, 'user.json');
var userData = {};

/**
 * Chooses which template to render depending on program args
 */
function chooseTemplate() {
  var arg = process.argv[2];
  if (process.argv.length < 3) {
    console.log("help:");
    console.log("'mylib-gen stage' - generates a new stage");
    console.log("'mylib-get mylib' - generates a new mylib file");
    process.exit(1);
  }

  if (arg == "stage") {
    getStageFields();
    stageTemplater(userData);
  } else {
    getMyLibFields();
    var template = new Templater('template', userData);
  }
}

function createTemplate() {
  loadConfig(function() {
    chooseTemplate();
  });
}

function getStageFields() {
  userData.date = curDate;
  userData.stage = rl.question("Stage (e.g. stage2): ");
  userData.description = rl.question("Stage description: ");
}

function getMyLibFields() {
  userData.date = curDate;
  userData.filename = rl.question("Filename (e.g. lightbar): ");
  userData.description = rl.question("Description: ");
  userData.reference = rl.question("Filename (e.g. LIGHTBAR.pdf): ");
}

function loadConfig(callback) {
  access(userFile, function(err) {
    if (err) {
      // File does not exist
      saveConfig(function() {
        createTemplate();
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
