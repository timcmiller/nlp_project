    var createTable = function(obj) {
      var maxLength = Math.max(Object.keys(obj.vNegTerms).length, Object.keys(obj.negTerms).length, Object.keys(obj.posTerms).length, Object.keys(obj.vPosTerms).length);
      // if(maxLength > 4) maxLength = 4;
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
        var processText = '';
        var returnString = '';
        $("button[type='submit']").click(function(){
          $(".returnString").fadeIn(500);
          $(".returnString").empty();
          processText = $("#processText").val();
          $.post("/process", {text: processText}).done(function(data){
            $(".returnString").html(
              '<p>The sentiment of your text is ' + data.sentiment + '.<br>'
              + 'The words that are affecting the rating are and how many times they appear are:<br></p>'
              + '<table id="sentiment">'
              + createTable(data)
              + '</table>');
          });
        });
      });
    });
