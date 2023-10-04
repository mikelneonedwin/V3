<script setup>
    const day = (new Date().getDay()) + 1;
</script>

<template>
    <Title>Submit Project</Title>
    <section class="md:mt-2">
        <h1 class="text-3xl font-bold text-[#00DC82]">Submit Project</h1>
        <div class="mt-8 text-2xl font-bold">
            <h3>It's day {{ day }}</h3>
            <form class="mt-8 flex flex-col gap-8">
                <div class="md:flex items-start gap-8">
                    <fieldset>
                        <span>Uploading for day:</span>
                        <select class="appearance-none">
                            <option class="bg-[#343541]" v-for="i in Array(30).fill(1).map((a,b) => a + b)" :value="i">{{ i }}</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <span>Live Link (Optional)</span>
                        <input type="url" placeholder="http://example.com">
                    </fieldset>
                </div>
                <fieldset>
                    <span>Repo Link (Optional)</span>
                    <input type="url" placeholder="http://github.com/{username}/{link}">
                </fieldset>
                <fieldset>
                    <span>Describe your project (Required)</span>
                    <textarea placeholder="Stack, Languages, About"></textarea>
                </fieldset>
            </form>
        </div>
    </section>
</template>