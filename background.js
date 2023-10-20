const UniLink = ["https://opencast-present.tu-braunschweig.de/search/episode.json?id=",
				"https://opencast03.zmml.uni-bremen.de/search/episode.json?id="];
				
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.vidId != null){
		if(request.download != null){
			getLink(request.UniId, request.vidId, request.vidForm, sendResponse, true);
		}
		else{
			getLink(request.UniId, request.vidId, request.vidForm, sendResponse, false);
		}
	}
	return true;
  }
);


function parseJson(res, vidForm, sendResponse, download){
	var resp = sendResponse;
	
	var HQvideo = 0;
	var HQvideoTwo = null;
	var maxResolution = 0;
	var videoList = res["search-results"]["result"]["mediapackage"]["media"]["track"];
	
	for(i =0; i < videoList.length; i++){
	var resolution = parseInt(videoList[i]["video"]["resolution"].split("x")[0]);
		if (resolution  > maxResolution){
			maxResolution = resolution;
			HQvideo = i;
			HQvideoTwo = null;
		}
		else{
			if(resolution == maxResolution){
			HQvideoTwo = i;
			}
		}	
	}
	
	if(HQvideoTwo){
		var bitrate = res["search-results"]["result"]["mediapackage"]["media"]["track"][HQvideo]["video"]["bitrate"];
		var bitrateTwo = res["search-results"]["result"]["mediapackage"]["media"]["track"][HQvideoTwo]["video"]["bitrate"];
		
		if(bitrate > bitrateTwo){
			HQvideo = HQvideoTwo;
			HQvideoTwo = HQvideo;
		}
		
		if(vidForm == "webcam"){
			HQvideo = HQvideoTwo;
		}
	}


	var name = res["search-results"]["result"]["mediapackage"]["title"];
	var url = res["search-results"]["result"]["mediapackage"]["media"]["track"][HQvideo]["url"];
	
	
	if (name.length <=1){
		name = generateFileName();	
	}

	
	var fileName = name.replaceAll(" - ","-").replaceAll("/","-").replaceAll(/[?%*:;,|"]/g, "").replaceAll(/[\\.<> ]/g, "_").replaceAll("__","_")+ ".mp4";
	if(download){
		console.log("started download");
		chrome.downloads.download({
		 url: url,
		 filename: fileName
		});
	}
	resp({videoUrl: url, videoName: fileName});
	
}

async function getLink(UniId, vidId, vidForm, sendResponse, download){
	jsonUrl = UniLink[UniId] + vidId;
	fetch(jsonUrl).then(res => res.json()).then(data => parseJson(data, vidForm, sendResponse, download));
}

function generateFileName(){
	var date = new Date();
	var year = String(date.getFullYear());
	var month = String(date.getMonth()+1);
	if (month.length != 2){month = "0"+month;}
	var day = String(date.getDate());
	var hour = String(date.getHours());
	var min = String(date.getMinutes());
	var sec = String(date.getSeconds());
	return "UniVideo_"+year+"_"+month+"-"+day+"_"+hour+"-"+min+"-"+sec;
	
}