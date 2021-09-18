<script lang="ts">
    import DecoratedName from '$lib/DecoratedName.svelte';
import type { FeaturedDeparture } from 'src/models/departures/featured';

    export let departure: FeaturedDeparture;

    $: time = new Date(departure.expectedDeparture);
    $: hours = pad(time.getHours(), 2);
	$: minutes = pad(time.getMinutes(), 2);

    $: diffMs = time.getTime() - Date.now();
    $: diffMinutes = Math.floor(diffMs / 1000 / 60);

    function pad(value, length) {
        return (value.toString().length < length) ? pad("0"+value, length):value;
    }
</script>

<div>
	<div class="time-row">
        {#if departure.expectedDeparture == null}
            <span class="mono">--:--</span>
        {:else if diffMinutes == 0}
            Now
        {:else if diffMinutes < 10}
            {diffMinutes} min
        {:else}
            <span class="mono">{hours}:{minutes}</span>
        {/if}
        <span class="track">Track {departure.track}</span>
    </div>
    <div class="destination-area">
        {departure.destination}
    </div>
    <div class="line-area">
        <span><DecoratedName text={departure.operatorName.text} --dn-background={departure.operatorName.backgroundColor} --dn-color={departure.operatorName.textColor} /></span>
        <span><DecoratedName text={departure.lineName.text} --dn-background={departure.lineName.backgroundColor} --dn-color={departure.lineName.textColor} /></span>
    </div>
</div>

<style>
    .time-row {
        font-size: 70px;
    }

    .time-row .mono {
        font: var(--mono-font);
    }

    .destination-area {
        font-size: 30px;
    }

    .line-area {
        font-size: 30px;
    }

    .track {
        font-size: 30px;
        display: inline-block;
    }
</style>
