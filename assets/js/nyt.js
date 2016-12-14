$(document).ready(function() {

  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  var query;
  var numRecords = 5;
  var beginDate;
  var endDate;
  var parameters = [];
  




$('.submit').on('click',function(event) {

  event.preventDefault();

  
  query = '&q=' + $('#searchTerm').val().trim();
  $('#searchTerm').val("");
  console.log(query);
  numRecords = $('#numRecords').val();
  $('#numRecords').val("");
  console.log(numRecords);
  beginDate = $('#startDate').val() + '0101';
  $('#startDate').val("");
  console.log(beginDate);
  endDate = $('#endDate').val() + '1231';
  $('#endDate').val("");
  console.log(endDate);

  parameters.push(query)


  if ($('#startDate').val() == '' && $('#endDate').val() == ''){
    url += '?' + $.param({
      'api-key': "eae7407fee8d450589f3b327a198477a",
      'q': query,
      'sort': 'newest',
    });
    console.log(url);
  }
  else if ($('#startDate').val() != '' && $('#endDate').val() != '') {
    url += '?' + $.param({
      'api-key': "eae7407fee8d450589f3b327a198477a",
      'q': query,
      'begin_date': beginDate,
      'end_date': endDate,
      'sort': 'newest',
    });
  }
  else if ($('#startDate').val() != ''){
    url += '?' + $.param({
      'api-key': "eae7407fee8d450589f3b327a198477a",
      'q': query,
      'begin_date': beginDate, 
      'sort': 'newest',   
    });
  }
  else if ($('#endDate').val() != ''){
    url += '?' + $.param({
      'api-key': "eae7407fee8d450589f3b327a198477a",
      'q': query,
      'end_date': endDate,    
      'sort': 'newest',
    });
  }

  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(result) {

    console.log(result);

    var article = result.response.docs

    for (var i = 0; i < numRecords; i++) {
      var articleDiv = $('<div>').addClass('col-xs-12 col-sm-12 col-md-6 article');
      var articleTitle = '<h2>' + article[i].headline.main +'</h2>';
      
      var articleSection = '<h4>' + article[i].section_name + '</h4>';
      var articleP = '<p>' + article[i].lead_paragraph + '</p>';
      if (article[i].multimedia != '') {
        var articleImg = '<img src="http://nyt.com/' + article[i].multimedia[0].url + '"/>';
        articleDiv.append(articleTitle).append(articleSection).append(articleImg).append(articleP);
      }
      else {
        articleDiv.append(articleTitle).append(articleSection).append(articleP);
      }
      
      
      $('#searchResults').append(articleDiv);
    }

    var a = $('div#searchResults > div');

    for( var j = 0; j < a.length; j+=2 ) {
      a.slice(j, j+2).wrapAll('<div class="row"></div>');
    }

  }).fail(function(err) {
    throw err;
  });
});
    

});