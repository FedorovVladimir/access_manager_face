<script>
    import CrabsButton from "./components/CrabsButton.svelte";
    import {getFetchUrl, postFetch} from "./main";
    import CrabsDialogYesNo from "./components/CrabsDialogYesNo.svelte";
    import CrabsStar from "./components/CrabsStar.svelte";

    export let login;
    export let password;

    let loadSetData = false
    let isHiddenDataFromBufferWindow = true

    let url = ""
    let l = ""
    let p = ""

    async function setDataFromBuffer(code) {
        loadSetData = true
        let data = await getFetchUrl(url, l, p)
        await postFetch("/data", login, password, data)
        loadSetData = false
        isHiddenDataFromBufferWindow = true
    }

    function openSetDataFromBufferWindow() {
        isHiddenDataFromBufferWindow = false
    }
</script>
<main>
    <div class="container mt-5">
        <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8">

                <h1>Главная</h1>

                <h3 class="mt-5 mb-3">Описание</h3>

                <p><b>access_manager</b> - вспомогательное ПО для контроля <i>разрешений</i> пользователей с
                    различными <i>ролями</i>
                    на доступ к той или иной функциональности основного ПО.</p>

                <h3 class="mt-5 mb-3">Словарь</h3>

                <p><b>Роль (role)</b> - группа людей имеющих доступ к одной и той же функциональность основного ПО.
                </p>

                <p><b>Функция (function)</b> - часть функциональности основного ПО доступ к которой может быть
                    открыт/закрыт
                    для любой из <i>ролей</i>.</p>

                <p><b>Разрешение (permission)</b> - возможность/невозможность пользования <i>функцией</i> для
                    <i>роли</i>.
                </p>

                <h3 class="mt-5 mb-3">Синхронизация</h3>
                <form>
                    <div class="mb-3">
                        <label class="form-label" for="url">Url <CrabsStar/> (http://host:port/data)</label>
                        <input bind:value={url} type="text" class="form-control" id="url" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="login">Login <CrabsStar/></label>
                        <input bind:value={l} type="text" class="form-control" id="login" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="pass">Password <CrabsStar/></label>
                        <input bind:value={p} type="password" class="form-control" id="pass" required>
                    </div>
                </form>
                <CrabsButton bind:load={loadSetData} on:click={openSetDataFromBufferWindow} text="Загрузить"/>

                <CrabsDialogYesNo text="Вы уверены?" bind:isHidden={isHiddenDataFromBufferWindow} itemCode={0}
                                  functionOnYes={setDataFromBuffer}/>

                <h3 class="mt-5 mb-3">Конец</h3>
            </div>
            <div class="col-2">
            </div>
        </div>
    </div>
</main>
