var vidLink = "https://moritz-riedel.de";
var url = document.location.href;

if(url.includes("https://opencast-present") && url.includes("paella/ui/") && !url.includes("#iframe")){			//Ist die Seite eine mit Video?
	
	var ids = url.split("id=");
	var id = ids[ids.length -1];
	getLink(id);
	var VidContainer = "playerContainer_controls_playback_playbackBarPlugins";
	
	
	var BtnEx = false;
	var counterOne = setInterval(functionOne, 150);						//Alle 150ms wird geschaut ob Video abgespielt und Player aktiviert wurde
	function functionOne(){
		if(!vidLink.match("https://moritz-riedel.de") && !BtnEx){
			createButton(vidLink,"body");
			BtnEx = true;
		}	
		if (!!document.getElementById(VidContainer)){		
			
			clearInterval(counterOne);
			
			createButton(vidLink, VidContainer);							//erstellt Downloadutton
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
	link.id= "VideLink"; 
	link.style ="height:"+imgH;	
	button.appendChild(link);					//fügt Icon dem Container hinzu
	button.onclick = click;						//wenn Container geklickt wird, wird im neuen Tab die Videodatei geöffnet
	function click (){							//dort sorgt content2.js dafür, dass die Datei heruntergeladen wird
		download(Link);						//Der neue Tab wird benötigt, da das Video nur von der gleichen Domain heruntergeladen werden kann (Browser-Securety)
	}											//Hier https://opencast-present.tu-braunschweig.de != https://opencast-admin.tu-braunschweig.de
}
}



function getLink(id){
	chrome.runtime.sendMessage({json: id}, function(response) {
		vidLink = response.videoInfo;
	});
}

function download(info){
	chrome.runtime.sendMessage({download: info}, function(response) {
		console.log(response.status);	
	});
}
