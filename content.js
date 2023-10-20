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

var vidLink = "https://moritz-riedel.de";

if((url.includes("https://opencast-present") || url.includes("https://opencast03")) && (url.includes("paella/ui/") || url.includes("engage/theodul/ui" )) && !url.includes("mode=desktop")){			//Ist die Seite eine mit Video?
	
	var ids = url.split("id=");
	var id = ids[ids.length -1];
	var VidContainer = "playerContainer_controls_playback_playbackBarPlugins";
	var VidContainer2 = "vjs-control-bar";
	
	createButton(vidLink,document.getElementsByTagName("body")[0],0);
	
	var counterOne = setInterval(functionOne, 150);						//Alle 150ms wird geschaut ob Video abgespielt und Player aktiviert wurde
	function functionOne(){
		
		if (!!document.getElementById(VidContainer)){		
			
			clearInterval(counterOne);
			
			createButton(vidLink, document.getElementById(VidContainer),1);
		}
		if (!!document.getElementsByClassName(VidContainer2)[0]){		
			
			clearInterval(counterOne);
			
			document.getElementsByClassName("videoDisplay")[0].onclick = function(){
				console.log("clicked")
				createButton(vidLink, document.getElementsByClassName(VidContainer2)[0],2);
				document.getElementsByClassName("videoDisplay")[0].onclick = null;
			}
		}
		//console.log("still working");
	}
	
	function createButton(Link, parentObj, appereance){
		
		var vidAnz = 1;
		if (!!document.getElementById("videoPlayerWrapper_1")){
			vidAnz = 2;
		}
		for(i=0; i<vidAnz; i++){
			var divID="LinkBtn_"+ i;
			if(!!document.getElementById(divID)){
				document.getElementById(divID).remove();
			}
			var button = document.createElement("div");				//erstellt Container
			var imgH = " 22px;";
			var LinkImgSrc = "download.svg";
			if(appereance == 0){
				button.style="position: absolute;"+
					"left: 0.7%;"+
					"bottom: 1%;"+
					"z-index: 50;"+
					"height: 9%;";
				imgH = " 100%; cursor: pointer;";
				LinkImgSrc = "download_round.svg";
			}
			else if(appereance == 1){
				button.className="buttonPlugin left showPlaybackRateButton";
			}
			else{
				button.className="vjs-play-control vjs-control vjs-button vjs-paused";
				button.style="padding-top: 5px;";
				imgH = " 65%;";
			}
			var buttonTitle = "Download";
			let vidForm = null;
			if(vidAnz>1 && i==0){
				buttonTitle = "Download slides video"
				vidForm = "slides";
			}
			if(vidAnz>1 && i==1){
				buttonTitle = "Download webcam video"
				vidForm = "webcam";
			}
			button.title= buttonTitle;
			button.id =divID;
			if(appereance == 2){
				parentObj.insertBefore(button, parentObj.children[9]);
			}
			else{
				parentObj.appendChild(button);		//Fügt den Container den vorhandenen Elementen hinzu
			}
			var link = document.createElement("img");																	//erstellt Downlaod-Icon
			link.src =chrome.runtime.getURL(LinkImgSrc);
			link.id= "VideoLink"+i; 
			link.style ="height:"+imgH;	
			button.appendChild(link);					//fügt Icon dem Container hinzu
			if(i == 0){
				button.onclick = click0;
				console.log("download 0: " + vidForm);
				function click0 (){		
					console.log("download 0: " + vidForm);
					download(id, vidForm);						
				}
			}
			else{
				button.onclick = click1;
				function click1 (){	
					console.log("download 1: " + vidForm);
					download(id, vidForm);						
				}
			}				
		}
		
}
}


function download(id,vidForm){
	console.log("download video id: "+id);
	chrome.runtime.sendMessage({UniId: UniId, vidId: id, vidForm: vidForm, download: "true"}, function(response) {
		console.log(response.videoName);
	});
}