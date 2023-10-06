<script setup>
    const { data: { value: { leaderboards:stats } } } = await useAsyncData('load', load);
    stats.forEach((a) => a.img = svgUrl(a.name));
</script>

<template>
    <Title>Leaderboards - V3</Title>
    <section class="md:mt-2">
        <h1 class="text-3xl font-bold text-[#00DC82]">Leaderboards</h1>
        <div class="mt-8 flex flex-col gap-4">
            <NuxtLink :class="{'opacity-50': !user.projects}" :to="user.projects ? '/stats/' + user.id : ''" v-for="(user, index) in stats" :key="index" class="bg-[#444654] p-2 rounded-lg">
                <div class="flex items-center gap-2 px-0.5">
                    <img :src="user.img" class="rounded-lg h-[3.5rem]">
                    <div class="flex w-full items-start flex-col gap-0">
                        <p class="font-extrabold">{{ user.name }}</p>
                        <span class="text-base">Projects: {{ user.projects }}</span>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </section>
</template>