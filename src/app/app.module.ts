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
import {HouseEpic} from './redux/house/house.epic';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { createLogger } from 'redux-logger';
import {HouseService} from './redux/house/house.service';
import { HttpClientModule } from '@angular/common/http';


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
    HttpClientModule,
    NgReduxModule, NgReduxRouterModule.forRoot()
  ],
  providers: [
    LoginService,
    HouseActions,
    HouseService,
    HouseEpic
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor( private ngRedux: NgRedux<IAppState>,
               private devTool: DevToolsExtension,
               private ngReduxRouter: NgReduxRouter, private houseEpic: HouseEpic ) {
    const rootEpic = combineEpics(
      this.houseEpic.getHouses
    );
    const middleware = [
      createEpicMiddleware(rootEpic), createLogger({ level: 'info', collapsed: true })
    ];
    this.ngRedux.configureStore( rootReducer, {}, middleware,[ devTool.isEnabled() ? devTool.enhancer() : f => f ]);

    ngReduxRouter.initialize(/* args */);
  }
}
