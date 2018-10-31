import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/core.module';

@Injectable()
export abstract class Repository {

    constructor(protected apiService: ApiService) { }
}
