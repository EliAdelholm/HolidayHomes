import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {House} from '../../entities/house';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/store/store';
import {LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-house-preview',
  templateUrl: './house-preview.component.html',
  styleUrls: ['./house-preview.component.scss']
})

export class HousePreviewComponent implements OnInit {
  houseId: number = this.route.snapshot.params.id;
  subscription: Subscription;
  house: House;

  constructor(private route: ActivatedRoute, private ngRedux: NgRedux<IAppState>, public loginService: LoginService) {
  }

  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state.house).subscribe(houses => {
      this.house = houses.house.find(x => x.id == this.houseId);
    });
  }

}
