
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.json != null){
		if(request.download != null){
			getLink(request.json, sendResponse, true);
		}
		else{
			getLink(request.json, sendResponse, false);
		}
	}
	return true;
  }
);


function parseJson(res, sendResponse, download){
	var resp = sendResponse;
	
	var HQvideo = 0;
	var maxBitrate = 0;
	var videoList = res["search-results"]["result"]["mediapackage"]["media"]["track"];
	
	for(i =0; i < videoList.length; i++){
		var bitrate = videoList[i]["video"]["bitrate"];
		if (bitrate > maxBitrate){
			maxBitrate = bitrate;
			HQvideo = i;
		}
	}


	var name = res["search-results"]["result"]["mediapackage"]["title"];
	var url = res["search-results"]["result"]["mediapackage"]["media"]["track"][HQvideo]["url"];

	
	var fileName = name.replaceAll(" - ","-").replaceAll("/","-").replaceAll(/[?%*:;,"]/g, "").replaceAll(/[\\.<> ]/g, "_")+ ".mp4";
	if(download){
		chrome.downloads.download({
		 url: url,
		 filename: fileName
		});
	}
	resp({videoUrl: url, videoName: fileName});
	
}

async function getLink(VidID, sendResponse, download){
	jsonUrl = "https://opencast-present.tu-braunschweig.de/search/episode.json?id=" + VidID;
	fetch(jsonUrl).then(res => res.json()).then(data => parseJson(data, sendResponse, download));
}