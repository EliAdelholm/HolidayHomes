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
  thumbNail: String;
  houseImgs: String[];

  constructor(private route: ActivatedRoute, private ngRedux: NgRedux<IAppState>, public loginService: LoginService) {
  }

  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state.houses).subscribe(houses => {
      this.house = houses && houses.find(x => x.id == this.houseId);
      console.log('this.house', this.house);
      if (this.house !== undefined) {
          this.thumbNail = this.house.thumbnail_image;
          console.log('this.thumbNail', this.thumbNail);
          console.log('this.house.images', this.house.images);
          if (this.house.images instanceof String || typeof this.house.images === 'string') {
            this.houseImgs = this.house.images.split(',');
          } else {
            this.houseImgs = this.house.images;
          }
          console.log('this.houseImgs', this.houseImgs);
        }
    });

  }

}
