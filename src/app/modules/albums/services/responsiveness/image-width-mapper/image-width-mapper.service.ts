import { Injectable } from '@angular/core';

import { AlbumsResolutionMapper } from '../albums-resolution-mapper/albums-resolution-mapper';

@Injectable()
export class ImageWidthMapperService extends AlbumsResolutionMapper<number> {
    calculate(resolution: number): number {
        return this.findMaxValueForResolution(resolution, this.getMapping());
    }

    protected getMapping(): { [resolution: number]: number } {
        return {
            0: 200,
            1250: 300
        };
    }
}
