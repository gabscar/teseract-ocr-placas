import Jimp from "jimp";
import { FILES_PATH, TMP_PATH } from "../constants/index.js";

export async function processImage(image, fileName) {
    try {
        const outputPath = TMP_PATH + fileName;
        const inputPath = FILES_PATH + fileName;
        await Jimp.read(inputPath)
            .then((image) => {
                return image
                    .greyscale()
                    .contrast(0.5)
                    .normalize()
                    .write(outputPath);
            })
            .then(() => {
                console.log(
                    "Imagem convertida para preto e branco com sucesso!"
                );
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}
