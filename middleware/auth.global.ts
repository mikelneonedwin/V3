export default defineNuxtRouteMiddleware(to => {
    if(to.path !== "/login" && to.path !== "/register") {
        const { value:cookie } = useCookie('_v3_id');
        if(!cookie) return navigateTo('/register');
    }
    return;
})