<script lang="ts">
    import { faClock } from '@fortawesome/free-regular-svg-icons';
    import Icon from 'svelte-awesome';
    import { onMount } from "svelte";

    export let text: string = "Arrivals";

    
    let time = new Date();
	$: hours = pad(time.getHours(), 2);
	$: minutes = pad(time.getMinutes(), 2);
	$: seconds = pad(time.getSeconds(), 2);
	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 250);
		return () => {
			clearInterval(interval);
		};
	});

    function pad(value, length) {
        return (value.toString().length < length) ? pad("0"+value, length):value;
    }
</script>

<div class="header arrival-header">
    <span class="header-title">{text}</span>
    <span class="filler"></span>
    <span class="header-clock"><Icon data={faClock} scale="2" /> {hours}:{minutes}:{seconds}</span>
</div>

<style>
.header.arrival-header {
	background-color: var(--arrival-background-color);
	color: var(--arrival-text-color);
	font-size: 50px;

	margin-top: 0px;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 25px;
	width: 100%;
	padding: 15px;
	box-sizing: border-box;

	display: flex;
}

.header .header-title {
	flex: 0 0 initial;
}

.header .header-clock {
	flex: 0 0 initial;
    font: var(--mono-font);
}
</style>