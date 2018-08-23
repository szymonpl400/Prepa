import { Injectable } from '@angular/core';

import { Album } from '../interfaces/album';
import { Paging } from '../../shared/shared.module';

@Injectable()
export class AlbumsMockData {
    getAlbums(): Album[] {
        return [
            {
                album_type: 'album',
                available_markets: ['AD', 'AR', 'AT', 'AU', 'BE'],
                href: 'https://api.spotify.com/v1/albums/43977e0YlJeMXG77uCCSMX',
                id: '43977e0YlJeMXG77uCCSMX',
                name: 'Shut Up Lets Dance (Vol. II)',
                type: 'album',
                uri: 'spotify:album:43977e0YlJeMXG77uCCSMX'
            },
            {
                album_type: 'compilation',
                available_markets: ['CZ', 'DE', 'DK', 'DO', 'EC', 'EE', 'ES', 'FI'],
                href: 'https://api.spotify.com/v1/albums/189ngoT3WxR5mZSYkAGOLF',
                id: '189ngoT3WxR5mZSYkAGOLF',
                name: 'Classic Club Monsters (25 Floor Killers)',
                type: 'album',
                uri: 'spotify:album:189ngoT3WxR5mZSYkAGOLF'
            },
            {
                album_type: 'single',
                available_markets: ['PY', 'RO', 'SE', 'SG'],
                href: 'https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj',
                id: '0sNOF9WDwhWunNAHPD3Baj',
                name: `She's So Unusual`,
                type: 'album',
                uri: 'spotify:track:3f9zqUnrnIq0LANhmnaF0V'
            }
        ];
    }

    getAlbumsWithPaging(): Paging<Album> {
        return {
            href: 'https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?offset=0&limit=2&include_groups=appears_on&market=ES',
            items: this.getAlbums(),
            limit: 2,
            next: 'https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?offset=2&limit=2&include_groups=appears_on&market=ES',
            offset: 0,
            previous: null,
            total: 308
        };
    }
}
