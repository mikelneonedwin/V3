import { child, get, ref } from "firebase/database";
import { db } from "~/firebase";

export async function getUser(userId:string): Promise<{ exists(): boolean, val(): { name: string, key: string, password: string, email: string, id: string, uploads?: Record<number, object> } | undefined }> {
    const user = await get(child(ref(db), 'V3'))
    .then(snapshot => {
        if(!snapshot.exists()) return null;
        const keys = Object.keys(snapshot.val());
        const identity = keys.find(string => string.includes(userId));
        if(identity) return snapshot.val()[identity];
        return null;
    })
    return { exists: () => user ? true : false, val: () => ({ ...user, key: `${user!.name.replaceAll(" ", "-")}-${user!.id}` }) }
}