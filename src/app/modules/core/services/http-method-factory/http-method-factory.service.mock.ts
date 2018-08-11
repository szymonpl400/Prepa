import { HttpMethod } from '../../interfaces/http-method';
import { HttpMethodType } from '../../enums/http-method-type';
import { HttpGetServiceMock } from '../http-get/http-get.service.mock';
import { HttpPostServiceMock } from '../http-post/http-post.service.mock';
import { HttpPutServiceMock } from '../http-put/http-put.service.mock';
import { HttpDeleteServiceMock } from '../http-delete/http-delete.service.mock';

export class HttpMethodFactoryServiceMock {
    private static readonly httpGet = new HttpGetServiceMock;
    private static readonly httpPost = new HttpPostServiceMock;
    private static readonly httpPut = new HttpPutServiceMock;
    private static readonly httpDelete = new HttpDeleteServiceMock;

    create(method: HttpMethodType): HttpMethod {
        switch (method) {
            case HttpMethodType.Get:
                return HttpMethodFactoryServiceMock.httpGet;
            case HttpMethodType.Post:
                return HttpMethodFactoryServiceMock.httpPost;
            case HttpMethodType.Put:
                return HttpMethodFactoryServiceMock.httpPut;
            case HttpMethodType.Delete:
                return HttpMethodFactoryServiceMock.httpDelete;
        }
    }
}
