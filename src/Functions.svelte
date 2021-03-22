<script>
    import {getFetch} from "./main";

    let functions = []

    async function loadFunctions() {

        functions = await getFetch("http://localhost:8080/functions")
        console.log(functions)
    }

    loadFunctions()
</script>

<main>
    <p>Функции</p>
    {#each functions as f}
        <p>{f.code} {f.name}</p>
    {/each}
</main>
