<script lang="ts">
    export let text: string;
</script>

<span class="decorated-name">{text}</span>

<style>
    .decorated-name {
        padding: 2px;
        padding-left: 7px;
        padding-right: 7px;
        background-color: var(--dn-background, "#fff");
        color: var(--dn-color, "#000");
    }
</style>
