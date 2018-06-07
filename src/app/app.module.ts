import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {PortalComponent} from './pages/portal/portal.component';
import {HousePreviewComponent} from './pages/house-preview/house-preview.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {NewHouseFormComponent} from './pages/new-house-form/new-house-form.component';
import {BookingComponent} from './pages/booking/booking.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from './services/login/login.service';
import {DevToolsExtension, NgReduxModule, NgRedux} from '@angular-redux/store';
import {NgReduxRouter, NgReduxRouterModule} from '@angular-redux/router';
import {IAppState, rootReducer} from './redux/store/store';
import {AppActions} from './redux/app.actions';
import {AppEpic} from './redux/app.epic';
import {createEpicMiddleware, combineEpics} from 'redux-observable';
import {createLogger} from 'redux-logger';
import {AppService} from './redux/app.service';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ValueArrayPipe} from './array.pipe';
import {LcDatePickerModule} from '@libusoftcicom/lc-datepicker';
import {BookingService} from './pages/booking/booking.service';
import {AuthGuardService} from './services/login/auth-guard.service';


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
    PageNotFoundComponent,
    ValueArrayPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgReduxModule, NgReduxRouterModule.forRoot(),
    NgbModule.forRoot(),
    LcDatePickerModule
  ],
  providers: [
    LoginService,
    BookingService,
    AppActions,
    AppService,
    AppEpic,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<IAppState>, private devTool: DevToolsExtension, private ngReduxRouter: NgReduxRouter, private appEpic: AppEpic) {

    const rootEpic = combineEpics(
      this.appEpic.getHouses,
      this.appEpic.createHouse,
      this.appEpic.updateHouse,
      this.appEpic.deleteHouse,
      this.appEpic.login,
      this.appEpic.getUser,
      this.appEpic.createUser,
      this.appEpic.updateUser,
      this.appEpic.deleteUser,
      this.appEpic.getUserHouses,
    );

    const middleware = [
      createEpicMiddleware(rootEpic), createLogger({level: 'info', collapsed: true})
    ];

    this.ngRedux.configureStore(rootReducer, {
      houses: [],
      user: {status: null, account: null, houses: []}
    }, middleware, [devTool.isEnabled() ? devTool.enhancer() : f => f]);

    ngReduxRouter.initialize(/* args */);
  }
}
