<script>
    import CrabsButton from "./components/CrabsButton.svelte";
    import {getFetch, postFetch} from "./main";
    import CrabsDialogYesNo from "./components/CrabsDialogYesNo.svelte";

    export let login;
    export let password;

    let message = ""
    let loadGetData = false
    let loadSetData = false
    let isHiddenDataFromBufferWindow = true

    async function getDataInBuffer() {
        loadGetData = true
        let data = await getFetch("/data", login, password)
        await navigator.clipboard.writeText(JSON.stringify(data))
        message = "Данные скопированы в буфер обмена"
        loadGetData = false
    }

    async function setDataFromBuffer(code) {
        loadSetData = true
        let data = await navigator.clipboard.readText()
        data = JSON.parse(data)
        await postFetch("/data", login, password, data)
        message = "Данные загружены из буфера обмена"
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
                <p>1) Нажмите кнопку "Скачать" на исходном сервере с эталонной схемой данных.</p>
                <p>2) Нажмите кнопку "Загрузить" на целевом сервере.</p>
                <p>{message}</p>
                <CrabsButton bind:load={loadGetData} on:click={getDataInBuffer} text="Скачать"/>
                <CrabsButton bind:load={loadSetData} on:click={openSetDataFromBufferWindow} text="Загрузить"/>

                <CrabsDialogYesNo text="Вы уверены?" bind:isHidden={isHiddenDataFromBufferWindow} itemCode={0} functionOnYes={setDataFromBuffer}/>

                <h3 class="mt-5 mb-3">Конец</h3>
            </div>
            <div class="col-2">
            </div>
        </div>
    </div>
</main>
