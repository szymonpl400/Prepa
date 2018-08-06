import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './modules/material/material.module';
import { CoreModule } from './modules/core/core.module';
import { AppComponent } from './components/app/app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppContainerComponent } from './components/app-container/app-container.component';
import { NavigationManagerService } from './services/navigation-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule
  ],
  providers: [
      NavigationManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
