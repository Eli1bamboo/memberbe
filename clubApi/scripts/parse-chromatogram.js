require('dotenv').config();
const fs = require('fs');
var BASE_CHROMATOGRAM_PATH = process.env.BASE_CHROMATOGRAM_PATH;
var files = fs.readdirSync(BASE_CHROMATOGRAM_PATH);
var path = require('path');
const lineByLine = require('../utils/readlines');
var filesToParse = [];
for (var i in files) {
    if (path.extname(files[i]) === ".txt") {
        filesToParse.push(files[i]);
    }
}
class Chromatogram {
    async parseChromatogramFiles(baseFolder) {
        var percentage = 0;
        var filesQuantity = filesToParse.length;
        var jsonResult = [];
        var valuesHeaders = [];
        var jsonFinished = [];
        var chromatogramBaseName;
        for (let i = 0; i < filesQuantity; i++) {
            jsonResult = {};
            percentage = i * 100 / filesQuantity;
            var chromatogramBaseLine = 0, resultsIndex = 0, lineIndex = 0;
            var liner = new lineByLine(baseFolder + filesToParse[i]);
            let newLine, line;
            let lineNumber = 0;
            var lineResult;
            while (newLine = liner.next()) {
                line = newLine.toString('ascii');
                if (line.indexOf('LC Chromatogram') !== -1) {
                    jsonResult[line] = { file: filesToParse[i] };
                    chromatogramBaseName = line;
                    chromatogramBaseLine = lineIndex;
                    resultsIndex = 0;
                }
                else if (lineIndex > chromatogramBaseLine && chromatogramBaseLine !== 0) {
                    lineResult = line.split("\t");
                    if (resultsIndex !== 0 && parseFloat(lineResult[0]) === NaN && parseFloat(lineResult[1]) === NaN && chromatogramBaseLine !== 0) {
                        /* if we finish the results lines, lets restart the chromatogram base index */
                        chromatogramBaseLine = 0;
                        resultsIndex = 0;
                    }
                    else if (resultsIndex) { /* If we are in the results lines */
                        var newObj = {};
                        newObj[valuesHeaders[0]] = lineResult[0];
                        newObj[valuesHeaders[1]] = lineResult[1];
                        jsonResult[chromatogramBaseName].values.push(newObj);
                    }
                    else if (line.indexOf("R.Time") !== -1) { /* let's set the resultIndex base to get all the results*/
                        resultsIndex = lineIndex;
                        valuesHeaders = lineResult;
                        jsonResult[chromatogramBaseName].values = [];
                    }
                    else { /* let's get the description's chromatogram data */
                        jsonResult[chromatogramBaseName][lineResult[0]] = lineResult[1]
                    }
                }
                lineIndex += 1;
            }
            if (Object.keys(jsonResult).length !== 0) {
                jsonFinished.push(jsonResult)
            }
            process.stdout.write(parseInt(percentage) + '%');
            process.stdout.write("\r\x1b[K")
        }

        /* Save the parsed data */
        fs.writeFile("scripts/chromatogram-files/data.json", JSON.stringify(jsonFinished), function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("\nThe file was successfully generated at chromatogram-files/data.json");
        });
    }
}

chromatogram = new Chromatogram();
chromatogram.parseChromatogramFiles(BASE_CHROMATOGRAM_PATH);