import { createWorker, PSM } from "tesseract.js";

export async function useOCR(filePath) {
    console.log(filePath);
    const worker = await createWorker();
    await worker.setParameters({
        tessedit_pageseg_mode: PSM.SPARSE_TEXT,
    });
    await worker.loadLanguage("por");
    await worker.initialize("por");

    const result = await worker.recognize(filePath);

    await worker.terminate();

    console.log(result.data.text);

    return result;
    // const worker = await createWorker();
    // await worker.load();
    // await worker.loadLanguage("eng");
    // await worker.initialize("eng");
    // const {
    //     data: { text },
    // } = await worker.recognize(filePath);
    // await worker.terminate();

    // console.log(text, "saida__________________________________________");
}
