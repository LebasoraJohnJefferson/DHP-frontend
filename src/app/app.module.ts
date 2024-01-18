import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { AdminModule } from './module/admin/admin.module';
import { PrimengModule } from './primeng/primeng.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    CoreModule,
    PrimengModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
