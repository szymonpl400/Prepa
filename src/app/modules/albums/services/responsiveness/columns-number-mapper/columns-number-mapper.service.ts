import { Injectable } from '@angular/core';

import { AlbumsResolutionMapper } from '../albums-resolution-mapper/albums-resolution-mapper';

@Injectable()
export class ColumnsNumberMapperService extends AlbumsResolutionMapper<number> {
    calculate(resolution: number): number {
        return this.findMaxValueForResolution(resolution, this.getMapping());
    }

    protected getMapping(): { [resolution: number]: number } {
        return {
            0: 1,
            550: 2,
            850: 3,
            1600: 4,
        };
    }
}
