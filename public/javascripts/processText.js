var createTable = function(obj) {
  var maxLength = Math.max(Object.keys(obj.vNegTerms).length, Object.keys(obj.negTerms).length, Object.keys(obj.posTerms).length, Object.keys(obj.vPosTerms).length);
  if(maxLength > 4) maxLength = 10;
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
$(document).ready(function() {

  // toggle between twitter and text input field
  $('.switch-button').click(function() {
    $('.process-text-field').toggle('slow');
  }); // end switch botton

  $(function(){
    var url = window.location.pathname;
    var lang = url.substring(url.lastIndexOf('/') + 1);
    var processText = '';
    var returnString = '';
    $("button[type='submit']").click(function(){
      $(".returnString").fadeIn(500);
      $(".returnString").empty();
      processText = $("#processText").val();
      $.post("/process", {language: lang, text: processText}).done(function(data){
        $(".returnString").html(tableHeader(lang, data));
      });
    });
  });

function tableHeader(language, data) {
  if (language === "fr") {
    var returnText = '<p>Le sentiment de votre text est ' + data.sentiment + '.<br>'
          + 'Voici les valeurs et la fréquence des mots qui ont contribué au résultat:<br></p>'
          + '<table id="sentiment">'
          + createTable(data)
          + '</table>';
          return returnText;
  }
  if (language === "sw") {
    var returnText = '<p>Känslan av din text är ' + data.sentiment + '.<br>'
          + 'Här är de värden och frekvenser av ord som bidrog till betyg:<br></p>'
          + '<table id="sentiment">'
          + createTable(data)
          + '</table>';
          return returnText;

  }
    if (language === "pt") {
          var returnText = '<p>O sentimento de seu texto é ' + data.sentiment + '.<br>'+ 'Aqui estão os valores e à frequência das palavras que contribuíram para a classificação:<br></p>'+'<table id="sentiment">'
          + createTable(data)
          + '</table>';
          return returnText;

}
  else {
         var returnText = '<p>The sentiment of your text is ' + data.sentiment + '.<br>'
          + 'The words that are affecting the rating are and how many times they appear are:<br></p>'
          + '<table id="sentiment">'
          + createTable(data)
          + '</table>';
          return returnText;
  }
};

  $(function(){
    var url = window.location.pathname;
    var lang = url.substring(url.lastIndexOf('/') + 1);
    var processText = '';
    var returnString = '';
    $("button[type='submit']").click(function(){
      $(".returnTweet").fadeIn(500);
      $(".returnTweet").empty();
      if($('#hashTag').is(':checked')) {
        processText = $("#radioSelection").val();
        path = "/api/twitter/hashtag";
      }
      if($("#userHandle").is(":checked")) {
        processText = $("#radioSelection").val();
        path = "/api/twitter/timeline";
      }
      $.post(path, {language: lang, text: processText}).done(function(data){
        $(".returnTweet").html(
          '<p>The sentiment of the tweets is ' + data.sentiment + '.<br>'
          + 'The words that are affecting the rating are and how many times they appear are:<br></p>'
          + '<table id="sentiment">'
          + createTable(data)
          + '</table>');
      });
    });
  });

});
