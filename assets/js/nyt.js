$(document).ready(function() {

  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  var query;
  var numRecords;
  var beginDate;
  var endDate;
  




$('.submit').on('click',function(event) {

  event.preventDefault();

  
  query = $('#searchTerm').val();
  numRecords = $('#numRecords').val();
  beginDate = $('#startDate').val();
  endDate = $('#endDate').val();

  if (beginDate === null && endDate === null){
    url += '?' + $.param({
      'api-key': "eae7407fee8d450589f3b327a198477a",
      'q': query,
      'page': numRecords
    });
  }
  else if (beginDate != null && endDate != null) {
    url += '?' + $.param({
      'api-key': "eae7407fee8d450589f3b327a198477a",
      'q': query,
      'page': numRecords,
      'begin_date': beginDate,
      'end_date': endDate,
    });
  }
  else if (beginDate != null){
    url += '?' + $.param({
      'api-key': "eae7407fee8d450589f3b327a198477a",
      'q': query,
      'begin_date': beginDate,    
      'page': numRecords
    });
  }
  else if (endDate != null){
    url += '?' + $.param({
      'api-key': "eae7407fee8d450589f3b327a198477a",
      'q': query,
      'end_date': endDate,    
      'page': numRecords
    });
  }

  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(result) {
    console.log(result);
  }).fail(function(err) {
    throw err;
  });
});
    

});