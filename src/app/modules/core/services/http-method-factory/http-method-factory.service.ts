import { Injectable } from '@angular/core';

import { HttpGetService } from '../http-get/http-get.service';
import { HttpPostService } from '../http-post/http-post.service';
import { HttpPutService } from '../http-put/http-put.service';
import { HttpDeleteService } from '../http-delete/http-delete.service';
import { HttpMethod } from '../../interfaces/http-method';
import { HttpMethodType } from '../../enums/http-method-type';

@Injectable()
export class HttpMethodFactoryService {

  constructor(
    private httpGet: HttpGetService,
    private httpPost: HttpPostService,
    private httpPut: HttpPutService,
    private httpDelete: HttpDeleteService) { }

    create(method: HttpMethodType): HttpMethod {
        switch (method) {
            case HttpMethodType.Get:
                return this.httpGet;
            case HttpMethodType.Post:
                return this.httpPost;
            case HttpMethodType.Put:
                return this.httpPut;
            case HttpMethodType.Delete:
                return this.httpDelete;
        }
    }
}
