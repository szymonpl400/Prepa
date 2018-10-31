import { Artist } from './artist';

export interface Track {
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    href: string;
    id: string;
    is_playable: boolean;
    name: string;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}
