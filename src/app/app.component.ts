import {Component, OnInit} from '@angular/core';
import {LoginService} from './services/login/login.service';
import {HouseActions} from './redux/house/house.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public loginService: LoginService, private houseActions: HouseActions) {
  }

  ngOnInit() {
    this.houseActions.getHouses();
  }
}
