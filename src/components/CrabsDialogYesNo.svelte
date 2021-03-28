<script>
    import CrabsButton from "./CrabsButton.svelte";
    export let text;
    export let isHidden;
    export let itemCode;
    export let functionOnYes;
</script>

<main>
    <div class="myModalBg" hidden="{isHidden}">
        <div class="myModal">
            <p>{text}</p>
            <CrabsButton text="Нет" on:click={() => {isHidden = true}}/>
            <CrabsButton text="Да" on:click={functionOnYes(itemCode)}/>
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
</style>
