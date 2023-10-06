<script setup>
    const nav = ref(false);
    const { data } = await useAsyncData('load', load);
    const user = data.value.stats.find(a => a.id == useCookie('_v3_id').value);
    const hasProject = Object.keys(user.work).length;
</script>

<template>
    <section class="md:flex items-start h-screen w-screen overflow-x-hidden box-border">
        <nav @click="nav = false" :class="{'w-0': !nav, 'w-full': nav}" class="md:w-[30%] z-20 grid grid-cols-5 items-start fixed top-0 md:static overflow-x-hidden md:block transition-all duration-300 h-full md:p-2 pt-0 text-white lg:w-[17%] md:bg-[#202123]">
            <div class="bg-[#a6b0c4] md:bg-transparent col-span-3 h-full md:h-auto">
                <div class="flex gap-2 px-3.5 items-center">
                    <img src="/favicon.ico" class="h-10">
                    <span class="text-3xl font-bold">V3</span>
                </div>
                <div class="flex mt-4 flex-col gap-4">
                    <NuxtLink href="/"><i class="material-icons">leaderboard</i>Leaderboards</NuxtLink>
                    <NuxtLink href="/submit"><i class="material-icons">add_circle</i>Submit Project</NuxtLink>
                    <NuxtLink v-if="hasProject" href="/dashboard"><i class="material-icons">dashboard</i>My Dashboard</NuxtLink>
                    <NuxtLink v-if="user.admin" href="/admin"><i class="material-icons">supervisor_account</i>Admin</NuxtLink>
                </div>
            </div>
            <div class="h-full col-span-2 bg-black/70 md:hidden"></div>
        </nav>
        <main class="bg-[#343740] px-4 text-white font-medium text-lg pt-2 overflow-y-auto h-full md:w-[70%] lg:w-[83%]">
            <slot/>
        </main>
    </section>
    <section>
        <div @click="nav = true" class="top-0 material-icons right-0 p-5 rounded-bl-xl z-10 w-4 h-4 bg-[#00DC82] md:hidden fixed text-white justify-center flex items-center">arrow_circle_down</div>
    </section>
</template>