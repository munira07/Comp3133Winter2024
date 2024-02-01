const fs = require('fs');
const csv = require('csv-parser');

const canadaFilePath = 'canada.txt';
const usaFilePath = 'usa.txt';


function filterAndWriteData(inputFilePath, filterCountry, outputFilePath) {
  const writeStream = fs.createWriteStream(outputFilePath);

  fs.createReadStream(inputFilePath)
    .pipe(csv())
    .on('data', (row) => {
      if (row['Country'] === filterCountry) {
    
        writeStream.write(`${row['Country']},${row['Year']},${row['Population']}\n`);
      }
    })
    .on('end', () => {
      console.log(`Data for ${filterCountry} has been written to ${outputFilePath}`);
      writeStream.end();
    });
}


try {
  fs.unlinkSync(canadaFilePath);
  fs.unlinkSync(usaFilePath);
  console.log('Existing files deleted successfully.');
} catch (err) {
  console.error('Error deleting existing files:', err.message);
}


filterAndWriteData('input_countries.csv', 'Canada', canadaFilePath);

filterAndWriteData('input_countries.csv', 'United States', usaFilePath);
