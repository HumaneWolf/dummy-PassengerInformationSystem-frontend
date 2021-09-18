import type { DecoratedName } from "../decoratedname";

export class FeaturedDestination {
    public destinationRegion: string;
    public destinationKey: string;

    public destinationName: string;
    public destinationNote: string;

    public departures: FeaturedDeparture[];
}

export class FeaturedDeparture {
    public operatorName: DecoratedName;
    public lineName: DecoratedName;

    public destination: string;
    public track: string;

    public scheduledDeparture: string;
    public expectedDeparture: string;
}
