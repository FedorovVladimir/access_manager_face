<script>
    import {deleteFetch, getFetch, postFetch} from "./main";
    import CrabsButton from "./components/CrabsButton.svelte";
    import CrabsDialogYesNo from "./components/CrabsDialogYesNo.svelte";
    import CrabsIconDelete from "./components/CrabsIconDelete.svelte";
    import CrabsStar from "./components/CrabsStar.svelte";

    export let login;
    export let password;

    // table
    let functions = []

    // fields
    let code = ""
    let name = ""

    let deleteItemCode = ""

    let hasError = false
    let errorMessage = ""

    let loadFunctionsTable = false
    let loadFunctionOnServer = false

    let isHiddenDeleteModalWindow = true

    async function loadFunctions() {
        loadFunctionsTable = false
        functions = await getFetch("/functions", login, password)
        console.log(functions)
        loadFunctionsTable = true
    }

    function validFunctionForm() {
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

    async function addFunction() {
        if (!validFunctionForm()) {
            return
        }

        loadFunctionOnServer = true

        let role = {
            "code": code,
            "name": name
        }
        let r = await postFetch("/functions", login, password, role)
        if (r.message !== undefined) {
            hasError = true
            errorMessage = r.message
        }
        await loadFunctions()
        code = ""
        name = ""
        loadFunctionOnServer = false
    }

    async function deleteFunction(code) {
        await deleteFetch("/functions/" + code, login, password)
        isHiddenDeleteModalWindow = true
        await loadFunctions()
    }

    function openDeleteWindow(code) {
        console.log(deleteItemCode)
        deleteItemCode = code
        console.log(deleteItemCode)
        isHiddenDeleteModalWindow = false
    }

    loadFunctions()
</script>

<main>
    <div class="container mt-5">
        <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8">

                <h1>Функции</h1>

                <h3 class="mt-5 mb-3">Таблица функций</h3>

                {#if loadFunctionsTable}
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Код</th>
                            <th scope="col">Название</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each functions as f, i}
                            <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{f.code}</td>
                                <td>{f.name}</td>
                                <td style="text-align: center">
                                    <CrabsIconDelete on:click="{() => openDeleteWindow(f.code)}"/>
                                </td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                    {#if functions.length === 0}
                        <p>Функций пока нет</p>
                    {/if}
                {:else}
                    <p>Загрузка...</p>
                {/if}

                <h3 class="mt-5 mb-3">Добавить функцию</h3>

                {#if hasError}
                    <div class="alert alert-dark" role="alert">
                        {errorMessage}
                    </div>
                {/if}

                <form>
                    <div class="mb-3">
                        <label class="form-label" for="code">Код <CrabsStar/></label>
                        <input bind:value={code} class="form-control" id="code" required type="text">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="name">Название <CrabsStar/></label>
                        <input bind:value={name} class="form-control" id="name" required type="text">
                    </div>
                </form>
                <CrabsButton bind:load={loadFunctionOnServer} text="Создать функцию" on:click={addFunction}/>

            </div>
            <div class="col-2">
            </div>

            <CrabsDialogYesNo text="Вы уверены?" bind:isHidden={isHiddenDeleteModalWindow} itemCode={deleteItemCode} functionOnYes={deleteFunction}/>

        </div>
    </div>
</main>
