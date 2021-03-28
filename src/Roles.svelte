<script>
    import {deleteFetch, getFetch, postFetch} from "./main";
    import CrabsButton from "./components/CrabsButton.svelte";
    import CrabsDialogYesNo from "./components/CrabsDialogYesNo.svelte";

    export let login;
    export let password;
    export let selectedPage;
    export let roleCode;

    // table
    let roles = []

    // fields
    let code = ""
    let name = ""

    let deleteItemCode = ""

    let hasError = false
    let errorMessage = ""

    let loadRolesTable = false
    let loadRoleOnServer = false

    async function loadRoles() {
        loadRolesTable = false
        roles = await getFetch("/roles", login, password)
        console.log(roles)
        loadRolesTable = true
    }

    function validRoleForm() {
        if (code === "") {
            errorMessage = "Поле код не может быть пустым"
            hasError = true
            return false
        }
        if (name === "") {
            errorMessage = "Поле название не может быть пустым"
            hasError = true
            return false
        }
        hasError = false
        return true;
    }

    async function addRole() {
        if (!validRoleForm()) {
            return
        }

        loadRoleOnServer = true

        let role = {
            "code": code,
            "name": name
        }
        let r = await postFetch("/roles", login, password, role)
        if (r.message !== undefined) {
            hasError = true
            errorMessage = r.message
        }
        await loadRoles()
        code = ""
        name = ""
        loadRoleOnServer = false
    }

    async function deleteRole(code) {
        await deleteFetch("/roles/" + code, login, password)
        isHiddenDeleteModalWindow = true
        await loadRoles()
    }

    function openDeleteWindow(code) {
        console.log(deleteItemCode)
        deleteItemCode = code
        console.log(deleteItemCode)
        isHiddenDeleteModalWindow = false
    }

    loadRoles()

    let isHiddenDeleteModalWindow = true
</script>

<main>
    <div class="container mt-5">
        <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8">

                <h1>Роли</h1>

                <h3 class="mt-5 mb-3">Таблица ролей</h3>

                {#if loadRolesTable}
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Код</th>
                            <th scope="col">Название</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each roles as r, i}
                            <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{r.code}</td>
                                <td>{r.name}</td>
                                <td style="text-align: center">
                                <span class="text-info icons" on:click={() => {selectedPage = "role"; roleCode = r.code}}>
                                    <svg class="bi bi-info-circle" fill="currentColor" height="20"
                                         viewBox="0 0 20 20"
                                         width="20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                </span>
                                </td>
                                <td style="text-align: center">
                                    <span class="text-danger icons" on:click="{() => openDeleteWindow(r.code)}">
                                        <svg class="bi bi-trash" fill="currentColor" height="20" viewBox="0 0 20 20"
                                             width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                  fill-rule="evenodd"/>
                                        </svg>
                                    </span>
                                </td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                    {#if roles.length === 0}
                        <p>Ролей пока нет</p>
                    {/if}
                {:else}
                    <p>Загрузка...</p>
                {/if}

                <h3 class="mt-5 mb-3">Добавить роль</h3>

                {#if hasError}
                    <div class="alert alert-dark" role="alert">
                        {errorMessage}
                    </div>
                {/if}

                <form>
                    <div class="mb-3">
                        <label class="form-label" for="code">Код <span class="text-danger">*</span></label>
                        <input bind:value={code} class="form-control" id="code" required type="text">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="name">Название <span class="text-danger">*</span></label>
                        <input bind:value={name} class="form-control" id="name" required type="text">
                    </div>
                </form>
                <CrabsButton bind:load={loadRoleOnServer} text="Создать роль" on:click={addRole}/>

            </div>
            <div class="col-2">
            </div>

            <CrabsDialogYesNo text="Вы уверены?" bind:isHidden={isHiddenDeleteModalWindow} deleteItemCode={deleteItemCode} deleteRole={deleteRole}/>

        </div>
    </div>
</main>

<style>
    .icons {
        cursor: pointer;
        opacity: 0.5;
    }
    span:hover {
        opacity: 1;
    }
</style>
