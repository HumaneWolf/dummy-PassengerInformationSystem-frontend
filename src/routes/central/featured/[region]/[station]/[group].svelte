<script context="module" lang="ts">
	export const prerender = true;

    export async function load({ page, fetch }) {
		const url = `http://localhost:5000/v1/Departures/${page.params.region}/${page.params.station}/Featured/${page.params.group}`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					destinations: await res.json(),

                    region: page.params.region,
                    station: page.params.station,
                    group: page.params.group,
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
    import DepartureHeader from "$lib/header/DepartureHeader.svelte";
    import { onMount } from "svelte";
    import Departure from "$lib/featured/Departure.svelte";
    import type { FeaturedDestination } from "src/models/departures/featured";


    export let destinations: FeaturedDestination[];

    export let region: string;
    export let station: string;
    export let group: string;

    async function update() {
        const url = `http://localhost:5000/v1/Departures/${region}/${station}/Featured/${group}`;
		const res = await fetch(url);

		if (res.ok) {
			destinations = await res.json();
		}
    }

    onMount(() => {
		const interval = setInterval(() => {
			update();
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<svelte:head>
	<title>Next train to</title>
</svelte:head>

<DepartureHeader text="Next train to" />

<div class="featured-destinations">
    {#each destinations as destination}
        <div class="featured-destination">
            <div class="destination-line">
                <span class="destination">{destination.destinationName}</span>
                <span class="filler"></span>
                <span class="note">{destination.destinationNote}</span>
            </div>

            <div class="departures">
                {#each destination.departures as departure}
                    <div class="departure">
                        <Departure departure={departure} />
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
.featured-destinations {
	display: flex;
	flex-wrap: wrap;
}

.featured-destination {
	flex: 1 0 auto;
	width: 50%;
	padding: 15px;
	box-sizing: border-box;
    margin-bottom: 20px;
}

.featured-destination .destination-line {
	border-bottom: solid 2px var(--strong-white);
    margin-bottom: 10px;
	font-size: 40px;
	display: flex;
}

.featured-destination .destination {
	color: var(--strong-white);
}

.featured-destination .note {
	color: var(--mute-white);
	font-size: 25px;
    line-height: 60px;
    margin-bottom: -20px;
}

.departures {
	width: 100%;
	display: flex;
}

.departure {
	width: 50%;
	flex: 1 0 auto;
}
</style>
