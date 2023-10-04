import { patchFile } from "~/firebase/upload";
import { getUser } from "../utils/getUser";
import { ref, set, update } from "firebase/database";
import { db } from "~/firebase";

export default defineEventHandler(async event => {
    function FALSE(msg: string) {
        deleteCookie(event, '_v3_id');
        setResponseStatus(event, 500, msg);
        return { error: { msg } }
    }

    const userId = getCookie(event, '_v3_id');
    if(!userId) return FALSE('USER NOT LOGGED IN!');

    const userResp = await getUser(userId);
    if(!userResp.exists()) return FALSE('INVALID CREDENTIALS');

    const user = userResp.val();
    
    const req = await readMultipartFormData(event);

    const data = req!.reduce((res:Record<string, string>, cur) => {
        res[cur.name!] = Boolean(cur.type || cur.filename) ? `data:${cur.type};base64,${cur.data.toString('base64')}` : (() => { const text = cur.data.toString('utf-8'); try { return JSON.parse(text) } catch { return text }})();
        return res;
    }, {});

    
    const toDB = {
        description: data.description,
        ...( data.languages ? { languages: data.languages } : {}),
        ...( data.tools ? { tools: data.tools } : {}),
        ...( data.frameworks ? { frameworks: data.frameworks } : {}),
        ...( data.link ? { link: data.link } : {} ),
        ...( data.repo ? { repo: data.repo } : {} ),
    } as Record<string, any>

    
    const files = Object.keys(data).filter(a => a.startsWith('file-')).map(a => data[a]);
    for(const file of files) {
        const index = files.indexOf(file) + 1;
        const url = await patchFile(`V3/${user!.key}/${index}`, file);
        if(toDB.files) toDB.files.push(url);
        else toDB.files = [ url ];
    };
    
    await set(ref(db, `V3/${user!.key}/uploads/${data.day}`), toDB);
    return { success: true };
})