(function (window) {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  var helloSpeaker = window.helloSpeaker;
  var byeSpeaker   = window.byeSpeaker;

  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var firstLetter = name.charAt(0).toLowerCase();
    if (firstLetter === 'j') {
      byeSpeaker.speak(name);
    } else {
      helloSpeaker.speak(name);
    }
  }

  console.log("\n--- Additional selection by last letter (vowel) ---");
  var vowels = ['a','e','i','o','u'];
  for (var j = 0; j < names.length; j++) {
    var nm = names[j];
    var lastChar = nm.charAt(nm.length - 1).toLowerCase();
    if (vowels.indexOf(lastChar) !== -1) {
      console.log("HELLO " + nm.toUpperCase() + "!!!");
    } else {
      console.log("goodbye " + nm.toLowerCase() + "...");
    }
  }
})(window);
