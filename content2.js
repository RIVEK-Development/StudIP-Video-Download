var episodes = document.getElementsByClassName("oce_list list")[0].children;

const Unis =["tu-braunschweig.de",
			"uni-bremen.de"];

var UniId = 0;
var url = document.location.href;

for (i=0; i<Unis.length; i++){
	if(url.includes(Unis[i])){
		UniId = i;
		break;
	}
}
console.log("UniId: "+UniId+" as "+Unis[UniId]);


createBtn();

function createBtn(){
	
	for(i = 0; i < episodes.length; i++) {
	
		var button = document.createElement("button");				
		button.title="Download";
		button.id ="LinkBtn_"+i;
		button.setAttribute('type', 'button');
		button.style ='font-size: 20px; cursor: pointer; display: block;';
		button.innerText = ("Download");
		episodes[i].children[1].appendChild(button);		
							
		button.onclick = function click(clicked){
			var id = clicked.target.id.split("_")[1];
			var videoID = episodes[id].id;
			download(videoID);
		}
	}
}

function download(id){
	console.log("download video id: "+id);
	chrome.runtime.sendMessage({UniId: UniId, vidId: id, vidForm: null, download: "true"}, function(response) {
		console.log(response.videoName);
	});
}


var buttonA = document.createElement("button");				
buttonA.title="Download all";
buttonA.id ="LinkBtn_All";
buttonA.setAttribute('type', 'button');
buttonA.style ='font-size: 20px; cursor: pointer; display: block;';
buttonA.innerText = ("Download all videos");
document.getElementsByTagName("form")[0].appendChild(buttonA);		

buttonA.onclick = function clickAll(clicked){
	for (i=0; i<episodes.length; i++){
		var videoID = episodes[i].id;
		download(videoID);
	}
}