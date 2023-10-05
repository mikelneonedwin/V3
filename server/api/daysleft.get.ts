export default defineEventHandler(async event => {
    const userId = getCookie(event, '_v3_id');

    function FALSE(msg: string) {
        deleteCookie(event, '_v3_id');
        setResponseStatus(event, 500, msg);
        return { error: { msg } }
    }

    if(!userId) return FALSE('USER NOT LOGGED IN!');

    const userResp = await getUser(userId);
    if(!userResp.exists()) return FALSE('INVALID CREDENTIALS');

    const days = Object.keys(userResp.val()!.uploads || {}).map(Number);
    const thirty = Array(30).fill(1).map((a,b) => a + b);
    return { data: thirty.filter(num => !days.includes(num)) };
})