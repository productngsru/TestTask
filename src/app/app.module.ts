import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatSliderModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import {authInterceptorProviders} from './shared/auth.interceptor';
import {AuthGuard} from './shared/auth-guard.service';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmationDialogComponent} from './ui/dialogs/confirmation-dialog/confirmation-dialog.component';
import {DataLoaderComponent} from './ui/data-loader/data-loader.component';
import {CustomDialogComponent} from './ui/dialogs/custom-dialog/custom-dialog.component';
import {AgGridModule} from 'ag-grid-angular';
import {OrderModule} from 'ngx-order-pipe';
import { TestListComponent } from './test-list/test-list.component';
import {DataTablesModule} from 'angular-datatables';
import {NotifyListComponent} from './ui/notify-list/notify-list.component';
import {timeInterceptorProviders} from './shared/time.interceptor';
import { ItemEditorComponent } from './test-list/item-editor/item-editor.component';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmationDialogComponent,
    DataLoaderComponent,
    CustomDialogComponent,
    TestListComponent,
    NotifyListComponent,
    ItemEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatSliderModule,
    MatButtonModule,
    FormsModule,

    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    AgGridModule,
    MatToolbarModule,
    MatTreeModule,
    OrderModule,
    DataTablesModule,
    ReactiveFormsModule,
  ],
  providers: [
    timeInterceptorProviders,
    authInterceptorProviders,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent,
  ]

})
export class AppModule { }
