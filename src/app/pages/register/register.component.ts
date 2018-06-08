import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../entities/user';
import {AppActions} from '../../redux/app.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFrm: FormGroup;
  user: User
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appActions: AppActions,
    private cd: ChangeDetectorRef
  ) {
    this.registerFrm = this.fb.group({
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
      userName: ['', Validators.required],
      userImg: ['']
    });
  }

  ngOnInit() {
  }

  onSubmit( registerFrm ) {
    console.log('registerFrm' , this.registerFrm);
    const userDetails: User = registerFrm.value as User;
    this.appActions.createUser( userDetails );
    this.router.navigate(['login']);
    return true;
  }

  uploadImage(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.registerFrm.patchValue({
          userImg: {
            base64: reader.result.split(',')[1],
            extension: file.name.split('.')[1]
          }
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

}
// bla bla bla
