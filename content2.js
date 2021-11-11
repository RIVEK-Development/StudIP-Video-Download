var episodes = document.getElementsByClassName("oce_list list")[0].children;
var videoInfos = [];

console.log(episodes.length);

for(i = 0; i < episodes.length; i++) {
	videoInfos.push(i);
	
}

for(i = 0; i < episodes.length; i++) {
	
	getData(episodes[i].id,i);
	
}

createBtn();


function getData(id,i){
	chrome.runtime.sendMessage({json: id}, function(response) {
		var videoInfo = response.videoInfo;
		videoInfos[i]=videoInfo;
	});
}


function createBtn(){
		
	var counterTwo = setInterval(functionTwo, 50);	
	var trys = 30;
	
	function functionTwo(){
		trys = trys-1;
		
		if (videoInfos[videoInfos.length-1].length > 5 && trys > 0){
			clearInterval(counterTwo);
			
			for(i = 0; i < videoInfos.length; i++) {
				
	
				var button = document.createElement("button");				
				button.title="Download";
				button.id ="LinkBtn_"+i;
				button.setAttribute('type', 'button');
				button.style ='font-size: 20px; cursor: pointer;';
				button.innerText = ("Download");
				episodes[i].appendChild(button);		
									
				button.onclick = function click(clicked){
					var id = clicked.target.id.split("_")[1];
					var videoInfo = videoInfos[id]
					download(videoInfo);
				}
			}
		}
		else if(trys == 20){
			for(i = 0; i < episodes.length; i++) {
				if(episodes[i].length < 5){
					getData(episodes[i].id,i);
				}
			}
		}
	
	}
			

}

function download(info){
	chrome.runtime.sendMessage({download: info}, function(response) {
		console.log(response.status);
	});
}