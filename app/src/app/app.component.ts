/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  message: any;
  username_param: string;
  
  constructor(private analytics: AnalyticsService,
    private route: ActivatedRoute) {
    //localStorage.setItem("username","diego");
    this.route.queryParams.subscribe(params => {
      console.log(params['username']);
      this.username_param = params['username'];
      if (sessionStorage.getItem('username')) sessionStorage.setItem("username", params['username']);
    });
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
