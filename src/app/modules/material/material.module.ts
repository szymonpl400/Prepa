import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

const MODULES = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class MaterialModule { }
