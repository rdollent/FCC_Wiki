//https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json&origin=*

//"https://en.wikipedia.org/w/api.php?action=query&titles=" + box + "&prop=info&inprop=url&format=json&origin=*"
$(document).ready(function() {
  var x = [],
    y,
    z,
    data,
    search = document.getElementById("search"),
    box = document.getElementById("box");

  box.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      search.click();
    }
  });

  search.addEventListener("click", function() {
    var boxValue = document.getElementById("box").value;
    $.ajax({
      type: "GET",
      url: "https://en.wikipedia.org/w/api.php?" +
        "action=query&" +
        "generator=search&" + //use to get list of entries, use generator instead of list
        "gsrsearch=" + boxValue + "&" + //search for var box
        "prop=extracts|info&" + //use to get full url
        "exintro&" + //extract first section of text
        "exlimit=10&" + //how many extracts
        "exchars=250&" + //how many characters
        "inprop=url&" + //full url inside
        "format=json&" +
        "origin=*", //use for the Access-Denied error
      success: function(e) {
        x = e.query.pages;
        y = Object.keys(x);
        console.log(e);
        deleteList();
        createList();

        //      z = y[0];
        //     console.log(x[z].fullurl);

      }
    });

  });

  function deleteList() {
    var s = document.getElementById("newsec");
    if (typeof(s) != "undefined" && s !== null) {
      document.body.removeChild(document.getElementById("newsec"));
    }
  }

  function createList() {
    var newSec = document.createElement("section");
    newSec.id = "newsec";
    for (var i = 0; i < y.length; i++) {
      var newDiv = document.createElement("div");
      z = y[i];
      newDiv.innerHTML = "<a href=" + x[z].fullurl + " target=\"_blank\"><p>" + x[z].title + "</p><br>" + x[z].extract + "</a>";
      newDiv.id = "newdiv" + i;
      newDiv.className = "results";
      newSec.appendChild(newDiv);
      document.body.appendChild(newSec);
    };
  }

});
