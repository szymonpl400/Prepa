import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth/auth.service';
import { ApiService } from './services/api/api.service';
import { AuthQueueService } from './services/auth-queue/auth-queue.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    ApiService,
    AuthQueueService
  ]
})
export class CoreModule { }
