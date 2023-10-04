<script setup>
    const nav = ref(false);
</script>

<template>
    <section class="md:flex items-start h-screen w-screen box-border">
        <nav @click="nav = false" :class="{'w-0': !nav, 'w-full': nav}" class="md:w-[30%] z-20 grid grid-cols-2 items-start fixed top-0 md:static overflow-x-hidden md:block transition-all duration-300 h-full md:p-2 pt-0 text-white lg:w-[17%] md:bg-[#202123]">
            <div class="bg-[#202123] md:bg-transparent h-full md:h-auto">
                <div class="flex gap-2 px-3.5 items-center">
                    <img src="/favicon.ico" class="h-10">
                    <span class="text-3xl font-bold">V3</span>
                </div>
                <div class="flex mt-4 flex-col gap-4">
                    <NuxtLink href="/"><i class="material-icons">leaderboard</i>Leaderboards</NuxtLink>
                    <NuxtLink href="/submit"><i class="material-icons">add_circle</i>Submit Project</NuxtLink>
                    <NuxtLink href="/dashboard"><i class="material-icons">dashboard</i>My Dashboard</NuxtLink>
                    <NuxtLink href="/info"><i class="material-icons">info</i>Info</NuxtLink>
                </div>
            </div>
            <div class="h-full bg-black/70 md:hidden"></div>
        </nav>
        <main class="bg-[#343740] px-4 text-white font-medium text-lg pt-2 overflow-y-auto h-full md:w-[70%] lg:w-[83%]">
            <slot/>
        </main>
    </section>
    <section>
        <div class="top-0 left-0 z-10 bottom-0 w-4 md:hidden fixed text-white flex items-center">
            <button @click="nav = true" class="material-icons tracking-[-15px] bg-[#00DC82] p-4 pl-0 rounded-r-lg text-left">chevron_right chevron_right</button>
        </div>
    </section>
</template>