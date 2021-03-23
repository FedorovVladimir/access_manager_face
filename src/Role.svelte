<script>
    import {getFetch, postFetch} from "./main";

    export let roleCode;

    let role = {
        permissions: []
    }

    async function loadRole() {
        role = await getFetch("/roles/" + roleCode)
        console.log(role)
        console.log(role.permissions)
    }

    async function changePermission(uuid) {
        await postFetch("/permissions/" + uuid + "/change")
        await loadRole()
    }

    loadRole()
</script>

<main>
    <div class="container mt-5">
        <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8">

                <h1>{role.name} ({role.code})</h1>

                <h3 class="mt-5 mb-3">Разрешения</h3>

                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Функция</th>
                        <th scope="col" style="text-align: center">Права</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each role.permissions as p, i}
                        <tr>
                            <td>{i + 1}</td>
                            <td>{p.function.name} ({p.function.code})</td>
                            <td style="text-align: center">
                            <span style="cursor: pointer"  on:click={() => {changePermission(p.uuid)}}>
                                {#if p.has}
                                    <span class="text-success">
                                        <svg class="bi bi-check2-circle" fill="currentColor" height="20"
                                             viewBox="0 0 20 20"
                                             width="20" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                                          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                                        </svg>
                                    </span>
                                {:else}
                                    <span>
                                        <svg class="bi bi-dash" fill="currentColor" height="20"
                                             viewBox="0 0 20 20"
                                             width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                        </svg>
                                    </span>
                                {/if}
                            </span>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>

            </div>
            <div class="col-2">
            </div>
        </div>
    </div>
</main>
