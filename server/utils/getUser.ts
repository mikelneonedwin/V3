import { child, get, ref } from "firebase/database";
import { db } from "~/firebase";

export async function getUser(userId:string): Promise<{ exists(): boolean, val(): { name: string, password: string, email: string, uploads?: Record<number, object> } | undefined }> {
    const users = await get(child(ref(db), 'V3'))
    .then(snapshot => {
        if(!snapshot.exists()) return null;
        const keys = Object.keys(snapshot.val());
        const identity = keys.find(string => string.includes(userId));
        if(identity) return snapshot.val()[identity];
        return null;
    })
    return { exists: () => users ? true : false, val: () => users }
}