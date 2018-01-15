update = function(title, content){
  document.getElementById("title").innerHTML = title
  document.getElementById("content").innerHTML = content  
}

mainNews = function(response){
  update("Stories",getContent(response));
}

getNews = function(respond){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       response = JSON.parse( this.responseText);
       respond(response)
    }
  };
  xhttp.open("GET", "http://content.guardianapis.com/search?section=politics&show-fields=thumbnail&api-key=test", true);
  xhttp.send();
}

getContent = function(response){
  var index = 0
  var content = ''
   response['response']['results'].forEach(function(element){
 	console.log(element);
  	content = content + '<br>' +
  	`<button onclick='viewStory(${index})'>` +
  	`<h1>${element['webTitle']}</h1>` +
  	'</button>';
  	index ++;
  })
   return content

}
 


viewStory= function(elementidex){
  console.log('here')
  getNews(function(data){
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
	    response = JSON.parse( this.responseText);
	    console.log(response)
		update(data['response']['results'][elementidex]['webTitle'],response['response']['content']['fields']['body']);
		};
	  };
	  xhttp.open("GET", data['response']['results'][elementidex]['apiUrl']+'?show-fields=body&api-key=test', true);
	  xhttp.send();
  });
}

getNews(mainNews)