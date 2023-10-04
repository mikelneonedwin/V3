<script setup>
    import data from '~/utils/data.json';
    const day = (new Date().getDay()) + 1;
    const form = reactive({link: process.client ? location.href : '', repo: process.client ? location.href : '', desc: 'Sample project for a storage bucket, built for a thirty days coding challenge'})
    const { languages, tools, frameworks } = reactive(data);
</script>

<template>
    <Title>Submit Project</Title>
    <section class="md:mt-2 mb-4">
        <h1 class="text-3xl font-bold text-[#00DC82]">Submit Project</h1>
        <div class="mt-8 text-2xl font-bold">
            <h3>It's day {{ day }}</h3>
            <form class="mt-8 submit flex flex-col gap-4">               
                <div class="input">
                    <div>
                    <span>Live Link (Optional)</span>
                    </div>
                    <input
                    type="url"
                    v-model="form.link"
                    placeholder="https://www.example.com"
                    />
                </div>
                <div class="input">
                    <div>
                    <span>Repository Link (Optional)</span>
                    </div>
                    <input
                    type="url"
                    v-model="form.repo"
                    placeholder="https://www.example.com"
                    />
                </div>
                <div class="input">
                    <div>
                    <span>Description (Required)</span>
                    </div>
                    <textarea
                    v-model="form.desc"
                    required
                    placeholder="Describe your work"
                    ></textarea>
                </div>
                <div class="input">
                    <div>
                        <span>Frameworks & Libraries</span>
                    </div>
                    <div class="btn">
                        <button type="button" :class="{'!bg-[#00DC82]': framework.selected}" @click="framework.selected = !framework.selected" v-for="framework in frameworks" :key="framework.text">{{ framework.text }}</button>
                    </div>
                </div>
                <div class="input">
                    <div>
                        <span>Tools (Hosting & Database)</span>
                    </div>
                    <div class="btn">
                        <button type="button" :class="{'!bg-[#00DC82]': framework.selected}" @click="framework.selected = !framework.selected" v-for="framework in tools" :key="framework.text">{{ framework.text }}</button>
                    </div>
                </div>
                <div class="input">
                    <div>
                        <span>Languages</span>
                    </div>
                    <div class="btn">
                        <button type="button" :class="{'!bg-[#00DC82]': framework.selected}" @click="framework.selected = !framework.selected" v-for="framework in languages" :key="framework.text">{{ framework.text }}</button>
                    </div>
                </div>

                <div>
                    <h1>File (1MB MAX)</h1>
                </div>
            </form>
        </div>
    </section>
</template>