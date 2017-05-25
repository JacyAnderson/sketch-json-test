const fs = require('fs');

// library to read and write to the zip 
const JSZip = require('jszip');

fs.readFile('sketch-hello-world.sketch', function(err, data) {
	if(err) throw err;

	// Zip contains a json file that describes all the directory & files in the zip file
	JSZip.loadAsynce(data).then(function(zip) {

		// reads the top level of page
		const pagePath = Object.keys(zip.files)[1];

		zip.file(pagePath)
			.async('string')
			.then(function(str) {
				const json = JSON.parse(str);

				// grabs the first layer at index 0 (text layer)
				const text =json.layers[0];
				text.name = 'Changing the layer name';

				// write the page's json back to the zip file
				zip.file(pagePath, JSON.stringify(json))

				// override the original file
				zip
				.generateNodeStream({ type:'nodebuffer', streamFiles:true })
				.pipe(fs.createWriteStream('sketch-hello-world.sketch'))
				.on('finish', () => {
					console.log('MARIO SAVED PRINCESS SKETCH');
				});
			});
	});
});