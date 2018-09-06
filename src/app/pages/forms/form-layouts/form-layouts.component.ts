import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import {CommentsService } from '../../../@core/data/comments-service';
import {HttpResponse} from '@angular/common/http';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../@core/utils/message.service';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: './form-layouts.component.html',
  providers: [CommentsService]
})
export class FormLayoutsComponent {

  myform: FormGroup;
  username: FormControl;
  message: FormControl;
  form_post_error;
  types: string[] = ['default', 'info', 'success', 'warning', 'error'];
  animations: string[] = ['fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'];
  positions: string[] = ['toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center',
    'toast-top-right', 'toast-bottom-right', 'toast-bottom-center', 'toast-bottom-left', 'toast-center'];

  config: ToasterConfig;

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  animationType = 'fade';
  toastsLimit = 5;
  timeout = 5000;
  username_param;
  subscription: Subscription;

  constructor(private commentsService: CommentsService, 
    private toasterService: ToasterService,
    private route: ActivatedRoute) {
      
/*       this.route.queryParams.subscribe(params => {
        this.username_param = params['username'];
    });
 */ 
    console.log("sessionStorage.getItem('username')", sessionStorage.getItem('username'));
    this.username_param = sessionStorage.getItem('username');
    console.log(this.username_param);
  }

  /* private subscription: Subscription
  paramName: string;
  paramLastName: string

  this.subscription = this.activatedRoute.queryParams.subscribe(
    params => {
      this.paramName     = params['name'];
      this.paramLastName = params['lastname'];
    }
  )
 */

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.username = new FormControl('');
    this.message = new FormControl('', Validators.required);
  }

  createForm() {
    this.myform = new FormGroup({
      username: this.username,
      message: this.message
    });
  }

  newHero() {
    alert('test');
    //this.model = new Hero(42, '', '');
  }
  onSubmit() {
    console.log(this.myform.valid);
    console.log(this.myform);
    console.log('username.errors', this.username.errors);

    if (this.myform.valid) {
      console.log("Form Submitted!");
      this.onAddTodo();
    }
  }

  onAddTodo() {
    this.commentsService
    .addComment({comment: this.message.value, username: this.username.value})
      .subscribe(
        (resp) => {
          console.log(resp);
          if (resp) {
            this.showToast("Successfully Saved!","Kudos!", "Successfully Saved!");
            this.form_post_error = true;
          }
        }
      );
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: 'toast-center',
      timeout: this.timeout,
      newestOnTop: true,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

}
