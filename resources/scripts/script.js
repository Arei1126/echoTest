`use strict`
const LANG = "ja";

window.addEventListener("load", async ()=>{

	const guide = document.createElement("p");
	guide.innerText = "Tap or Click here to Start"
	document.body.appendChild(guide);

	window.addEventListener("click", ()=>{
		guide.style.display = "none";

		const Synth = window.speechSynthesis;
		let Voices = Synth.getVoices();

		Synth.addEventListener("voiceschanged", ()=>{
			Voices = Synth.getVoices();
			console.info(Voices);
		});

		//const recognition = new SpeechRecognition();
		const recognition = new webkitSpeechRecognition();
		recognition.lang = LANG;
		//recognition.continuous = true;
		recognition.intermResult = true;

		//start, audiostart, speechstart, speechend, audioend, end

		let PrevNode = null;

		const textArea = document.querySelector("#textArea");

		recognition.addEventListener("result", (e)=>{
			recognition.stop();
			let results = e.results;
			console.info(results);

			let node = document.createElement("p");
			const text =results[0][results.length-1].transcript;

			node.innerText =  text;

			textArea.className = "";
			window.requestAnimationFrame(() => {
				window.requestAnimationFrame(() => {
					textArea.classList.add("prevLineAnim");
				});
			});

			textArea.insertBefore(node, PrevNode);
			PrevNode = node;

			if(Voices.length !== 0){
				const utter = new SpeechSynthesisUtterance();
				utter.lang = LANG;
				utter.pitch = 1.0;
				utter.text = text;
				/*
			utter.volume
			utter.voice
			utter.rate
			*/
				recognition.removeEventListener("end",endThenStart);
				recognition.stop();

				utter.addEventListener("end", ()=>{
					recognition.addEventListener("end",  endThenStart);
					recognition.stop();
					recognition.start();
				});

				Synth.speak(utter);


			}



		});
		recognition.start();


		recognition.addEventListener("error", ()=>{
			recognition.stop();

		});
		//intermResult とisFInal
		//

		function endThenStart() {
			recognition.start();
		}

		recognition.addEventListener("end",  endThenStart);

		recognition.addEventListener("audiostart",()=>{
			console.log("audiostart");

		});

		recognition.addEventListener("audioend",()=>{
			console.log("audioend");

		});


		recognition.addEventListener("end",()=>{
			console.log("end");

		});

		recognition.addEventListener("nomatch",()=>{
			console.log("nomatch");

		});

		recognition.addEventListener("soundend",()=>{
			console.log("soundend");

		});

		recognition.addEventListener("speechstart",()=>{
			console.log("speechstart");

		});

		recognition.addEventListener("speechend",()=>{
			console.log("speechend");

		});

		recognition.addEventListener("start",()=>{
			console.log("start");

		});

	});

});
