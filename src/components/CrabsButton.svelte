<script>
    export let text;
    export let load;
</script>

<main>
    {#if load}
        <button on:click>
            <span class="hig spinner"></span>
            <div class="text">{text}</div>
        </button>
    {:else}
        <button on:click>
            <div class="hig">{text}</div>
        </button>
    {/if}
</main>

<style>

    button {
        padding: 10px 20px 14px 20px;
        margin: 5px 5px 15px 5px;
        border: 0;
        border-radius: 0;
        background: #666666;
        color: #f4f4f4;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    }

    button:hover {
        background: #777777;
    }

    button:active {
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
    }

    .text {
        height: 0;
        color: rgba(0,0,0,0);
    }

    .hig {
        height: 20px;
    }

    .spinner {
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .spinner:after {
        animation: changeContent .8s linear infinite;
        display: block;
        content: "⠋";
    }

    @keyframes changeContent {
        10% { content: "⠙"; }
        20% { content: "⠹"; }
        30% { content: "⠸"; }
        40% { content: "⠼"; }
        50% { content: "⠴"; }
        60% { content: "⠦"; }
        70% { content: "⠧"; }
        80% { content: "⠇"; }
        90% { content: "⠏"; }
    }

</style>
