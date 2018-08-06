import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

const MODULES = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class MaterialModule { }
