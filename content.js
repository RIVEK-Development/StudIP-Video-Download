var vidLink = "https://moritz-riedel.de";
var url = document.location.href;

if(url.includes("https://opencast-present") && url.includes("paella/ui/") && !url.includes("#iframe")){			//Ist die Seite eine mit Video?
	
	var ids = url.split("id=");
	var id = ids[ids.length -1];
	var VidContainer = "playerContainer_controls_playback_playbackBarPlugins";
	
	createButton(vidLink,"body");
	
	var counterOne = setInterval(functionOne, 150);						//Alle 150ms wird geschaut ob Video abgespielt und Player aktiviert wurde
	function functionOne(){
		
		if (!!document.getElementById(VidContainer)){		
			
			clearInterval(counterOne);
			
			createButton(vidLink, VidContainer);
		}
	}
	
	function createButton(Link, div){
	var divID="LinkBtn";
	if(!!document.getElementById(divID)){
		document.getElementById(divID).remove();
	}
	var button = document.createElement("div");				//erstellt Container
	var imgH = " 22px;";
	if(div.match("body")){
		button.style="position: absolute;"+
			"left: 0.7%;"+
			"bottom: 0.8%;"+
			"z-index: 50;"+
			"height: 6%;";
		imgH = " 100%; cursor: pointer;";
	}
	else{
		button.className="buttonPlugin left showPlaybackRateButton";
	}
	button.title="Download";
	button.id =divID;
	document.getElementById(div).appendChild(button);		//Fügt den Container den vorhandenen Elementen hinzu
	var link = document.createElement("img");																	//erstellt Downlaod-Icon
	link.src =chrome.runtime.getURL("download.svg");
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