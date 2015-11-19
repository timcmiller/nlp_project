$(document).ready(function() {
  $.get("/api/lists", function(data){
    console.log(data);
    $.each(data, function(i, item){
      console.log(data[i].title);
      $("#linklist").append('<li><a href="'+ '/lists/' + data[i]._id + '">' + data[i].title + '</a> <span class="list-description">' + (data[i].description || "") + '</span> <span class="list-number">(' + data[i].articles.length + ' in list).' +  '</span></li>');
    })
  });
});
