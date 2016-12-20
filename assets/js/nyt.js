$(document).ready(function() {

  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=eae7407fee8d450589f3b327a198477a&";
  var query;
  var numRecords;
  var beginDate;
  var endDate;
  var articleCount = 0;
  

function clear() {
  query = '';
  beginDate = '';
  articleCount = 0;
  endDate = '';
  url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=eae7407fee8d450589f3b327a198477a&";
}  




$('.submit').on('click',function(event) {
  $('#searchResults').empty();
  event.preventDefault();

  query = $('#searchTerm').val().trim();
  numRecords = $('#numRecords').val();
  beginDate = $('#startDate').val() + '0101';
  endDate = $('#endDate').val() + '1231';
  
  url += 'q=' + query + '&sort=newest';


  if ($('#startDate').val()){
    url += '&begin_date=' + beginDate;
  }
  if ($('#endDate').val()) {
    url += '&end_date=' + endDate;
  }
  console.log(url);

  if (numRecords <= 10){
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {

      console.log(result);

      var article = result.response.docs;

      for (var i = 0; i < numRecords; i++) {
        articleCount++;
        var articleDiv = $('<div>').addClass('col-md-12 well');
        var articleTitle = '<h2><span class="badge">' + articleCount + '</span> ' + article[i].headline.main +'</h2>';
        var articleSection = '<h4>' + article[i].section_name + ' // ' + article[i].byline.original + '</h4>';
        var articleP = '<p>' + article[i].snippet + '</p>';
        var articleLink = '<a class="btn btn-default" href="' + article[i].web_url + '" target="_blank">Read Story</a>';
        
        if (article[i].multimedia != '') {
          var articleImg = '<img src="http://nyt.com/' + article[i].multimedia[0].url + '" class="img-thumbnail img-responsive articleImage"/>';
          articleDiv.append(articleTitle).append(articleSection).append(articleImg).append(articleP).append(articleLink);
        }
        else {
          articleDiv.append(articleTitle).append(articleSection).append(articleP).append(articleLink);
        }
        
        $('#searchResults').append(articleDiv);
      }

      
    }).fail(function(err) {
      throw err;
    });

  }
  else {
    $('#searchResults').html('<h2 class="text-centered">Sorry, I can only print up to 10 results at a time.')
  }
clear();
});
    

});