import { ref as dbRef, set} from 'firebase/database';
import { db, storage } from "./index";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

function upload(path: string, dataurl: string):Promise<string> {
    return new Promise(async(res, rej) => {
        await uploadString(ref(storage, path), dataurl, 'data_url')
            .then(async snapshot => res(await getDownloadURL(snapshot.ref)))
            .catch(rej)
    })
}

export async function patchFile(dir: string, data: string):Promise<string> {
    const url = await upload(dir, data);
    await set(dbRef(db, dir), url);
    return url;
};