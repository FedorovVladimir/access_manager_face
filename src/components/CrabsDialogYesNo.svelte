<script>
    export let text;
    export let isHidden;
    export let deleteItemCode;
    export let deleteRole;
</script>

<main>
    <div class="myModalBg" hidden="{isHidden}">
        <div class="myModal">
            <p>{text}</p>
            <button class="myModalButton" on:click={() => {isHidden = true}}>Нет</button>
            <button class="myModalButton" on:click={deleteRole(deleteItemCode)}>Да</button>
        </div>
    </div>
</main>

<style>
    .myModalBg {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,0.3);
    }

    .myModal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #ffffff;
        width: 300px;
        height: 150px;
        margin: auto;
        padding: 30px;
    }

    .myModalButton {
        padding: 10px 20px 12px 20px;
        margin: 5px 5px 30px 5px;
        border: 0;
        border-radius: 0;
        background: #666666;
        color: #f4f4f4;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    }
</style>
