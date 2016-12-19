$(document).ready(function() {

  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=eae7407fee8d450589f3b327a198477a&";
  var query;
  var numRecords = 5;
  var beginDate;
  var endDate;
  var page = 0;
  var responseList = [];

function clear() {
  query = '';
  numRecords = 5;
  beginDate = '';
  page = 0;
  responseList = [];
  endDate = '';
  url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=eae7407fee8d450589f3b327a198477a&";
}  


function queryAPI() {
  for (var k = 0; k <= page; k++) {
    setTimeout(function(){    
    $.ajax({
        url: url + '&page=' + k,
        method: 'GET',
      }).done(function(result) {
        
        console.log(result);

        responseList.push(result);
        console.log(responseList);
        return responseList;
      }).fail(function(err) {
        throw err;
    });
    }, 6000);
  }; 
};

function printResults() {
  console.log(responseList);
  var article = result.response.docs;

  for (var i = 0; i < numRecords; i++) {
      var articleDiv = $('<div>').addClass('col-xs-12 col-sm-12 col-md-6 article');
      var articleTitle = '<h2>' + article[i].headline.main +'</h2>';
      
      var articleSection = '<h4>' + article[i].section_name + '</h4>';
      var articleP = '<p>' + article[i].lead_paragraph + '</p>';
      if (article[i].multimedia != '') {
        var articleImg = '<img src="http://nyt.com/' + article[i].multimedia[0].url + '" class="img-thumbnail img-responsive"/>';
        articleDiv.append(articleTitle).append(articleSection).append(articleImg).append(articleP);
      }
      else {
        articleDiv.append(articleTitle).append(articleSection).append(articleP);
      }
      
      
      $('#searchResults').append(articleDiv);
    };

    var a = $('div#searchResults > div');

    for( var j = 0; j < a.length; j+=2 ) {
      a.slice(j, j+2).wrapAll('<div class="row"></div>');
    }

    clear();

}


$('.submit').on('click',function(event) {
  $('#searchResults').empty();
  event.preventDefault();

  query = $('#searchTerm').val().trim();
  numRecords = $('#numRecords').val();
  page = Math.floor(numRecords/10);
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

  queryAPI().done(printResults);  
    
});

});