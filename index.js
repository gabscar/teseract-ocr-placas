import fs from "node:fs";
import { useOCR } from "./src/ocr/index.js";
import { FILES_PATH, RESULT_PATH, TMP_PATH } from "./src/constants/index.js";
import { processImage } from "./src/img/index.js";

exec("placa2.jpeg");

async function exec(fileName) {
    const filePaths = await processFile(fileName);
    const result = { fileName, text: "" };

    console.log("OCR started");
    console.log("OCR is reading the file...");

    if (!filePaths || filePaths.length <= 0) {
        console.log("no file to process");
    }

    for (const filePath of filePaths) {
        result.text += await getResult(filePath);
    }

    console.log("OCR finished");

    saveResult(result);
}

async function processFile(fileName) {
    const filePath = `${TMP_PATH}${fileName}`;
    await processImage(filePath, fileName);
    return [filePath];
}

async function getResult(filePath) {
    let text = "";
    const result = await useOCR(filePath);

    result.data.words
        .filter(({ confidence }) => confidence > 75)
        .forEach((word) => {
            text += word.text + "\n";
        });

    return text;
}

function saveResult(result) {
    const txtFileName = result.fileName.replace(/\..{3,4}$/, ".txt");
    const path = RESULT_PATH + txtFileName;

    fs.writeFileSync(path, result.text.replace(/\s/g, "\n"));
}
