import { NgModule } from '@angular/core';
import { RelojLibComponent } from './reloj-lib.component';
import { CommonModule } from '@angular/common';  



@NgModule({
  declarations: [RelojLibComponent],
  imports: [CommonModule],
  exports: [RelojLibComponent]
})
export class RelojLibModule { }
