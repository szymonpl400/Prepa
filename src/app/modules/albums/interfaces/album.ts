import { Image } from '../../shared/shared.module';
import { Artist } from '../../artists/artists.module';

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
