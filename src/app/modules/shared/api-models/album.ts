import { Image  } from './image';
import { Artist } from './artist';
import { Track } from './track';
import { Paging } from './paging';

export interface Album {
    album_type: string;
    available_markets: string[];
    images: Image[];
    artists: Artist[];
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}


export interface AlbumFull extends Album {
    tracks: Paging<Track>;
}
