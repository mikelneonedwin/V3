<script setup>
    definePageMeta({layout: 'auth'})

    const form = reactive({ email: '', password: '' });
    const error = reactive({ email: false, password: false, server: false })
    const btn = ref('Login Account');

    function submit() {
        for(const key in error) error[key] = false;
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!regex.test(form.email)) error.email = "Invalid email";
        if(form.password.length < 6) error.password = true;
        if(Object.values(error).some(Boolean)) return;
        btn.value = 'Please wait...';
        $fetch('/api/login', {
            method: 'POST',
            body: {
                email: form.email,
                password: form.password,
            }
        })  
        .then(resp => {
            if(resp.error || !resp.success) {
                Object.assign(error, resp.error);
                !resp.success && (error.server = true);
                btn.value = 'Login Account';
                return;
            }
            return navigateTo('/');
        })
        .catch(() => {
            error.server = true;
            btn.value = 'Login Account';
        })
    }
</script>

<template>
    <Title>Login - V3</Title>
    <section class="h-full w-full md:flex items-center justify-center">
        <form @submit.prevent="submit" class="md:w-[70%] mx-8 mt-8 md:mt-0  md:mx-auto flex items-center gap-4 flex-col submit">
            <h1 v-if="error.server" class="text-2xl font-bold text-red-400">Sorry, an error occured</h1>
            <div class="input">
                <div><span>Email</span></div>
                <input type="email" required v-model="form.email" placeholder="youremail@example.com" name="email">
                <i class="error" v-if="error.email">{{ error.email }}</i>
            </div>
            <div class="input">
                <div><span>Password</span></div>
                <input type="password" required v-model="form.password" placeholder="At least six characters long" name="email">
                <i class="error" v-if="error.password">At least six characters</i>
            </div>
            <div class="input">
                <div class="btn grid md:grid-cols-2 grid-rows-2 md:grid-rows-1 md:gap-4">
                    <button type="submit" class="!bg-[#00DC82] mt-2 !text-white !font-semibold !text-lg w-full">{{btn}}</button>
                    <button @click="navigateTo('/register')" type="button" class="!bg-[#00DC82] mt-2 !text-white !font-semibold !text-lg w-full">Don't have an account?</button>
                </div>
            </div>
        </form>
    </section>
</template>