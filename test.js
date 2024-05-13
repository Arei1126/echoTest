window.onload = () =>{	
	const Synth = window.speechSynthesis;
	let Voices = Synth.getVoices();
	Synth.addEventListener("voiceschanged", ()=>{
		Voices = Synth.getVoices();
		console.info(Voices);

		if(Voices.length !== 0){
			const utter = new SpeechSynthesisUtterance();
			//utter.voice = Voices[34];
			utter.lang = "ja_JP";
			utter.pitch = 1.0;
			utter.text = "我々は一人の英雄を失った";
			//utter.text = "You are an idiot.";
			/*
			utter.volume
			utter.voice
			utter.rate
			*/
			window.onclick = () => {
			Synth.speak(utter);
			}
		}




	});



}
