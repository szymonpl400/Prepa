import { Artist } from '../artists.module';

export class ArtistsMockData {
    static getArtists(): Artist[] {
        return [
            {
                external_urls: {
                    spotify: 'https://open.spotify.com/artist/0oSGxfWSnnOXhD2fKuz2Gy'
                },
                href: 'https://api.spotify.com/v1/artists/0oSGxfWSnnOXhD2fKuz2Gy',
                id: '0oSGxfWSnnOXhD2fKuz2Gy',
                name: 'David Bowie',
                type: 'artist',
                uri: 'spotify:artist:0oSGxfWSnnOXhD2fKuz2Gy'
            },
            {
                external_urls: {
                    spotify: 'https://open.spotify.com/artist/3dBVyJ7JuOMt4GE9607Qin'
                },
                href: 'https://api.spotify.com/v1/artists/3dBVyJ7JuOMt4GE9607Qin',
                id: '3dBVyJ7JuOMt4GE9607Qin',
                name: 'T. Rex',
                type: 'artist',
                uri: 'spotify:artist:3dBVyJ7JuOMt4GE9607Qin'
            },
        ];
    }
}
