var vidLink = "https://moritz-riedel.de";
var url = document.location.href;

if(url.includes("https://opencast-present") && (url.includes("paella/ui/") || url.includes("engage/theodul/ui" )) && !url.includes("mode=desktop")){			//Ist die Seite eine mit Video?
	
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
		console.log("still working");
	}
	
	function createButton(Link, parentObj, appereance){
	var divID="LinkBtn";
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
	button.title="Download";
	button.id =divID;
	if(appereance == 2){
		parentObj.insertBefore(button, parentObj.children[9]);
	}
	else{
		parentObj.appendChild(button);		//Fügt den Container den vorhandenen Elementen hinzu
	}
	var link = document.createElement("img");																	//erstellt Downlaod-Icon
	link.src =chrome.runtime.getURL(LinkImgSrc);
	link.id= "VideoLink"; 
	link.style ="height:"+imgH;	
	button.appendChild(link);					//fügt Icon dem Container hinzu
	button.onclick = click;						//wenn Container geklickt wird, wird im neuen Tab die Videodatei geöffnet
	function click (){							//dort sorgt content2.js dafür, dass die Datei heruntergeladen wird
		download(id);						//Der neue Tab wird benötigt, da das Video nur von der gleichen Domain heruntergeladen werden kann (Browser-Securety)
	}											//Hier https://opencast-present.tu-braunschweig.de != https://opencast-admin.tu-braunschweig.de
}
}


function download(id){
	chrome.runtime.sendMessage({json: id, download: "true"}, function(response) {
		console.log(response.videoName);
	});
}