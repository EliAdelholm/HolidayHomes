import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PortalComponent } from './pages/portal/portal.component';
import { HousePreviewComponent } from './pages/house-preview/house-preview.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewHouseFormComponent } from './pages/new-house-form/new-house-form.component';
import { BookingComponent } from './pages/booking/booking.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from './services/login/login.service';
import { DevToolsExtension, NgReduxModule, NgRedux } from '@angular-redux/store';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { IAppState, rootReducer } from './redux/store/store';
import {HouseActions} from './redux/house/house.actions';

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    HousePreviewComponent,
    LoginComponent,
    RegisterComponent,
    NewHouseFormComponent,
    BookingComponent,
    ProfileComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgReduxModule, NgReduxRouterModule.forRoot()
  ],
  providers: [
    LoginService,
    HouseActions
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<IAppState>,
              private devTool: DevToolsExtension,
              private ngReduxRouter: NgReduxRouter) {

    this.ngRedux.configureStore(
      rootReducer, {});

    ngReduxRouter.initialize(/* args */);
  }
}

