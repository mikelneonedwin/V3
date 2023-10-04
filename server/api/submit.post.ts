import { getUser } from "../utils/getUser";

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

    
})