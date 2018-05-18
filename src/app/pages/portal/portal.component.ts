import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/store/store';
import {House} from '../../entities/house';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  subscription: Subscription;
  houses: House [];

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
  }

  ngOnInit() {
    this.subscription = this.ngRedux.select(store => store.houses).subscribe(houses => {
      this.houses = houses && houses;
      console.log(this.houses);
    });
  }

}
