$(document).ready(function() {

  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=eae7407fee8d450589f3b327a198477a&";
  var query;
  var numRecords;
  var beginDate;
  var endDate;
  var articleCount = 0;
  
  // Creates areas for article content
  var articleSection;
  var articleDiv;
  var articleTitle
  var articleP;
  var articleLink;
  var articleImg;

  // Resets API url so it can be used multiple times
  function clear() {
    query = '';
    beginDate = '';
    articleCount = 0;
    endDate = '';
    url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=eae7407fee8d450589f3b327a198477a&";
  }  


  $('.submit').on('click',function(event) {

    //Empty out previous results
    $('#searchResults').empty();

    event.preventDefault();

    // Sets API parameters and display options based on form inputs
    query = $('#searchTerm').val().trim();
    numRecords = $('#numRecords').val();

    // Needed to add month and days, I picked beginning and end of year
    beginDate = $('#startDate').val() + '0101';
    endDate = $('#endDate').val() + '1231';
    
    // Append query term and picked sort
    url += 'q=' + query + '&sort=newest';

    // Check if user entered a date
    if ($('#startDate').val()){
      url += '&begin_date=' + beginDate;
    }
    if ($('#endDate').val()) {
      url += '&end_date=' + endDate;
    }
    console.log(url);

    // Couldn't figure out how to get more than 10 results without getting an API time limit error, so I set a limit to avoid any site breakage
    if (numRecords <= 10){
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {

        console.log(result);

        var article = result.response.docs;

        for (var i = 0; i < numRecords; i++) {
          articleCount++;
          articleDiv = $('<div>').addClass('col-md-12 well');
          articleTitle = '<h2><span class="badge">' + articleCount + '</span> ' + article[i].headline.main +'</h2>';
          articleP = '<p>' + article[i].snippet + '</p>';
          articleLink = '<a class="btn btn-default" href="' + article[i].web_url + '" target="_blank">Read Story</a>';

          // Ran into some errors with no bylines on some articles (esp older ones), this is a workaround
          if (article[i].byline != null) {
            articleSection = '<h4>In: ' + article[i].section_name + ' // ' + article[i].byline.original + '</h4>';
          }
          else {
            articleSection = '<h4>In: ' + article[i].section_name + '</h4>';
            
          }
          
          // Not all articles had an image
          if (article[i].multimedia != '') {
            articleImg = '<img src="http://nyt.com/' + article[i].multimedia[0].url + '" class="img-thumbnail img-responsive articleImage"/>';
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