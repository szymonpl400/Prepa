import { Component, Input, HostListener, OnInit} from '@angular/core';

import { Album } from '../../interfaces/album';
import { ColumnsNumberMapperService } from '../../services/responsiveness/columns-number-mapper/columns-number-mapper.service';
import { ImageWidthMapperService } from '../../services/responsiveness/image-width-mapper/image-width-mapper.service';
import { RowHeightMapperService } from '../../services/responsiveness/row-height-mapper/row-height-mapper.service';

@Component({
  selector: 'prp-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {
    numOfColumns = 0;
    imageWidth = 0;
    rowHeight = 0;

    @Input()
    albums: Album[];

    constructor(
        private columnsNumberMapper: ColumnsNumberMapperService,
        private imageWidthMapper: ImageWidthMapperService,
        private rowHeightMapper: RowHeightMapperService) {
    }

    trackByAlbum(index: number, album: Album): string {
        return album.id;
    }

    ngOnInit() {
        this.calculateResponsiveness(window.innerWidth);
    }

    @HostListener('window:orientationchange', ['$event'])
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const width = event.target.innerWidth;
        this.calculateResponsiveness(width);
    }

    calculateResponsiveness(width: number) {
        this.numOfColumns = this.columnsNumberMapper.calculate(width);
        this.imageWidth = this.imageWidthMapper.calculate(width);
        this.rowHeight = this.rowHeightMapper.calculate(width);
    }
}
