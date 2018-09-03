import { Image } from '../../shared/shared.module';

export interface Album {
    album_type: string;
    available_markets: string[];
    images: Image[];
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}
