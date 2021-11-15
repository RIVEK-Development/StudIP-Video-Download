
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.json != null){
		getLink(request.json, sendResponse);
		
	}
	else if(request.download != null){
		var url = request.download.split("#")[0];
		var fileName = request.download.split("#")[1]+".mp4";
		chrome.downloads.download({
		 url: url,
		 filename: fileName
		});
		
		sendResponse({status: fileName});
	}
	return true;
  }
);


function parseJson(res, sendResponse){
	var resp = sendResponse;
	
	var videoNum = 0;

	if ( res["search-results"]["result"]["mediapackage"]["media"]["track"][0]["video"]["bitrate"] <= res["search-results"]["result"]["mediapackage"]["media"]["track"][1]["video"]["bitrate"]) {
		videoNum = 1;
	} else {
		videoNum = 0;
	}

	var name = res["search-results"]["result"]["mediapackage"]["title"];
	var url = res["search-results"]["result"]["mediapackage"]["media"]["track"][videoNum]["url"];

	
	var vidLink = url+"#"+name.replaceAll(" - ","-").replaceAll(" ","_").replaceAll("/","-").replaceAll(".","_");
	resp({videoInfo: vidLink});
	
}

async function getLink(VidID, sendResponse){
	jsonUrl = "https://opencast-present.tu-braunschweig.de/search/episode.json?id=" + VidID;
	fetch(jsonUrl).then(res => res.json()).then(data => parseJson(data, sendResponse));
}
