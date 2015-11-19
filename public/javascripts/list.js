$(document).ready(function() {
    var createTable = function(obj) {
      var maxLength = Math.max(Object.keys(obj.vNegTerms).length, Object.keys(obj.negTerms).length, Object.keys(obj.posTerms).length, Object.keys(obj.vPosTerms).length);
      if(maxLength > 4) maxLength = 4;
      returnText = '<tr><th colspan="2">' + 'Very Positve Terms' + '</th>'
      + '<th colspan="2">' + 'Positve Terms' + '</th>'
      + '<th colspan="2">' + 'Negative Terms' + '</th>'
      + '<th colspan="2">' + 'Very Negative Terms' + '</th>'
      + '<tr>';
      for (var i = 0; i < maxLength; i++) {
        returnText += "<tr><td> " + Object.keys(obj.vPosTerms)[i] + "</td>"
        + "<td>" + obj.vPosTerms[Object.keys(obj.vPosTerms)[i]] + '</td>'
        + "<td>" + Object.keys(obj.posTerms)[i] + "</td>"
        + "<td>" + obj.posTerms[Object.keys(obj.posTerms)[i]] + '</td>'
        + "<td>" + Object.keys(obj.negTerms)[i] + "</td>"
        + "<td>" + obj.negTerms[Object.keys(obj.negTerms)[i]] + '</td>'
        + '<td>' + Object.keys(obj.vNegTerms)[i] + "</td>"
        + "<td>" + obj.vNegTerms[Object.keys(obj.vNegTerms)[i]] + '</td>'
        + '</tr>';
      }
      returnText = returnText.replace(/undefined/g, " ");
      return returnText;
    };
      var path = window.location.pathname;
      var params = path.substring(path.lastIndexOf('/') + 1);
      $.get("/api/lists/" + params, function(list){
        console.log(list); ///list-articles/:id
        console.log(list.title);
        document.title = list.title;
        $("h1 small").text(list.title);
        $("#list-description").text(list.description);
      });
     $.get("/api/list-articles/" + params, function(articles){
        console.log(articles);
        for(a in articles){
          var article = articles[a];
          console.log(article);
          $("#returnlist").append("<p>" + article.title +"</p><p>The sentiment of this text is " + article.sentiment + "<span class='rating'> (" + article.sentimentValue + ")</span>.<br>"
          + "Here are the words that affect the rating, and their frequency:<br>"
          + '<table id="sentiment">'
          + createTable(article)
          + '</table>' + "</p>");
        }
      });
    });
