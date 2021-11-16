var episodes = document.getElementsByClassName("oce_list list")[0].children;

createBtn();

function createBtn(){
	
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
			var videoID = episodes[id].id;
			download(videoID);
		}
	}
}

function download(id){
	chrome.runtime.sendMessage({json: id, download: "true"}, function(response) {
		console.log(response.videoName);
	});
}