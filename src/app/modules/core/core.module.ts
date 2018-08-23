import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth/auth.service';
import { ApiService } from './services/api/api.service';
import { ApiServiceMock } from './services/api/api.service.mock';
import { AuthQueueService } from './services/auth-queue/auth-queue.service';
import { HttpGetService } from './services/http-get/http-get.service';
import { HttpPostService } from './services/http-post/http-post.service';
import { HttpPutService } from './services/http-put/http-put.service';
import { HttpDeleteService } from './services/http-delete/http-delete.service';
import { HttpMethodFactoryService } from './services/http-method-factory/http-method-factory.service';
import { ApiAuthorizationService } from './services/api-authorization/api-authorization.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    ApiService,
    AuthQueueService,
    HttpGetService,
    HttpPostService,
    HttpPutService,
    HttpDeleteService,
    HttpMethodFactoryService,
    ApiAuthorizationService
  ]
})
export class CoreModule { }

export { ApiService } from './services/api/api.service';
export { ApiServiceMock } from './services/api/api.service.mock';
