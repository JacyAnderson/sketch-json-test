const fs = require('fs');

// library to read and write to the zip 
const JSZip = require('jszip');

fs.readFile('sketch-hello-world.sketch', function(err, data) {
	if(err) throw err;

	// Zip contains a json file that describes all the directory & files in the zip file
	JSZip.loadAsync(data).then(function(zip) {

		// reads the top level of page
		const pagePath = Object.keys(zip.files)[1];

		zip.file(pagePath)
			.async('string')
			.then(function(str) {
				const json = JSON.parse(str);

				// grabs the first layer at index 0 (text layer)
				const layerOne =json.layers[0];

					// grabs the second layer at index 1
				const layerTwo = json.layers[1];

				// Layer one name
				const vader = "Vader: Obi Wan never told you what happened to your father";
				
				// Layer two name
				const luke = "He told me you killed him!";


				const isVaderLukesFather = false;
				const likeFatherLikeSon = "Luke: NOOOOOOOOO!";

				// Check for layer names

				// changes name for layers 
				function heToldMeEnough() {
					console.log("Luke: heToldMeEnough,");
					console.log(layerTwo.name);

					if(isVaderLukesFather == true) {
						layerOne.name = "Vader: No -- I am your father";
						console.log(layerOne.name);
						layerTwo.name = likeFatherLikeSon;
						console.log(layerTwo.name);
					}	else if(isVaderLukesFather == false) {
						layerTwo.name = "I HAAATE YOU!!!";
						console.log(layerTwo.name);
						layerOne.name = ("Anakin (feeling nostalgic): What is this? A crossover episode?!");
						console.log(layerOne.name);
					}
				}

				function reset() {
						layerOne.name = vader; 
						layerTwo.name = luke;
					}


				function plotTwist() {
					console.log(vader);
					heToldMeEnough();
					reset();
				}

				plotTwist();
				
		


				// Reassigns layer name
				// layerOne.name = 'Hola senor';
				// console.log(layerOne.name);
				// write the page's json back to the zip file
				zip.file(pagePath, JSON.stringify(json))

				// override the original file
				zip
				.generateNodeStream({ type:'nodebuffer', streamFiles:true })
				.pipe(fs.createWriteStream('sketch-hello-world.sketch'))
				.on('finish', () => {
					console.log('* And that\'s a wrap on this weeks episode of Father and Son Bonding Time *');
				});
			});
	});
});