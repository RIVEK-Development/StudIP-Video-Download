var vidLink = "https://moritz-riedel.de";


var counterOne = setInterval(functionOne, 150);						//Alle 150ms wird geschaut ob Video abgespielt und Player aktiviert wurde
	function functionOne(){
		
		if (document.getElementById("mediaplayer")){		
			
			clearInterval(counterOne);
			
			vidLink = document.getElementById("mediaplayer").src;
			console.log(vidLink);
			var button = document.createElement("button");				
			button.title="Download";
			button.id ="downloadBtn";
			button.setAttribute('type', 'button');
			button.style ='font-size: 20px; cursor: pointer; display: block;';
			button.innerText = ("Download");
			button.onclick = function click(){window.open(vidLink);};
			
		}
		
	}