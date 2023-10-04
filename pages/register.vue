<script setup>
    definePageMeta({layout: 'auth'})

    const form = reactive({ email: '', password: '', confirm: '', name: '' });
    const error = reactive({ email: false, password: false, confirm: false, server: false, name: false })
    const btn = ref('Create Account');

    function submit() {
        for(const key in error) error[key] = false;
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!regex.test(form.email)) error.email = "Invalid email";
        if(form.password.length < 6) error.password = true;
        else if(form.confirm != form.password) error.confirm = true;
        if(form.name.split(' ').length < 2) error.name = true;
        if(Object.values(error).some(Boolean)) return;
        btn.value = 'Please wait...';
        $fetch('/api/register', {
            method: 'POST',
            body: {
                email: form.email,
                password: form.password,
                name: form.name
            }
        })  
        .then(resp => {
            if(resp.error || !resp.success) {
                Object.assign(error, resp.error);
                !resp.success && (error.server = true);
                btn.value = 'Create Account';
                return;
            }
            return navigateTo('/');
        })
        .catch(() => {
            error.server = true;
            btn.value = 'Create Account';
        })
    }
</script>

<template>
    <Title>Register - V3</Title>
    <section class="h-full w-full md:flex items-center justify-center">
        <form @submit.prevent="submit" class="md:w-[70%] mx-8 mt-8 md:mt-0  md:mx-auto flex items-center gap-4 flex-col submit">
            <h1 v-if="error.server" class="text-2xl font-bold text-red-400">Sorry, an error occured</h1>
            <div class="input">
                <div><span>Name</span></div>
                <input type="text" required v-model="form.name" placeholder="Firstname and surname" name="name">
                <i class="error" v-if="error.name">Invalid name</i>
            </div>
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
                <div><span>Confirm Password</span></div>
                <input type="password" required v-model="form.confirm" placeholder="Repeat your password" name="email">
                <i class="error" v-if="error.confirm">Passwords don't match</i>
            </div>
            <div class="input">
                <div class="btn">
                    <button type="submit" class="!bg-[#00DC82] mt-2 !text-white !font-semibold !text-lg w-full">{{btn}}</button>
                </div>
            </div>
        </form>
    </section>
</template>