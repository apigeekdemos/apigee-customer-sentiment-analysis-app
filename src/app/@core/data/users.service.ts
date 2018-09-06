
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';


let counter = 0;

@Injectable()
export class UserService {

  private users = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
    eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
    jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
    lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
    alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
    kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
    diego: { name: 'Diego Zuluaga', picture: 'https://lh3.googleusercontent.com/-hgo17LFcdQo/AAAAAAAAAAI/AAAAAAAAAAA/APUIFaNyXRjYIJ99xHZyZgXCAWaV2Ub9vw/s64-c-mo/photo.jpg' },
    hansel: { name: 'Hansel Miranda', picture: 'https://lh3.googleusercontent.com/-BPSdg6CwNs4/AAAAAAAAAAI/AAAAAAAAA68/M6aNp77EvyY/s600-p/photo.jpg' },
    mike: { name: 'Mike Dunker', picture: 'https://lh6.googleusercontent.com/-tBVE-f1vYTQ/AAAAAAAAAAI/AAAAAAAAABo/93zqBb0f8V0/s600-p/photo.jpg' },
    ricardo: { name: 'Ricardo de Andrade', picture: 'https://lh4.googleusercontent.com/-yrjNbf0O1NQ/AAAAAAAAAAI/AAAAAAAAABM/UdzqH6DY1Fc/s600-p/photo.jpg' },
    paul: { name: 'Paul Williams', picture: 'https://lh3.googleusercontent.com/-A00quso_8hU/AAAAAAAAAAI/AAAAAAAAAI0/Soy5-c2k1cw/s600-p/photo.jpg' },
    maudrit: { name: 'Maudrit Martinez', picture: 'https://lh3.googleusercontent.com/-buwxKGc543U/AAAAAAAAAAI/AAAAAAAAB-g/-26c1ClV7iE/s600-p/photo.jpg' },
    viet: { name: 'Viet Tran', picture: 'https://lh3.googleusercontent.com/YHGsMBbTG_bCX_3gR3Sch6LH_2hvQcHWQJUeLEmBUnjRMI0vwbGH8ABmkN33-R3myDWuX0fb8--ld-XqkwRguzGmHzIpnv5UkZYCZ5HgzbQA2O3-MANTOef_Kdq4vMjqJ7y5lGXtBVWlqzOxDFUVZQEDMDE73SRaR2TvksTYKOomTSCEHnaFjnNsgGbYH1URXcHceOvg1zKTjtmzJVNSvPNSJeY5CQzG_GHoyeaY6c2DcWgu72jBAlogJYtS77sfl69M8XMeA6ua3CoF0VZIh61kHiE7Ae0xDIaJGuVcFo_r0iwB6YyCmPEG-TiJVknV2ToYUVhEZwUu2MzV-RB7KDQZofQZN9cCvHLSGqONHbs29cOfzKu74r1eiihZDAtcQygkFznMszt_p8aEP74cn2kxTiv2Y7kh_SFalTVNqu3cTd2OSqZKXPMC5ki4z2INhLUMFVleSovln6BNgMLApxOt8wAQDFKe7864_grDGmO87UwG_1grwk1oATLsGchcDRt7w9LaP7t8STCW__ulqOt3RM6N1DVoLDVbH9bpTE1oGDBZiimhliL_QuQPFKFBsig=s600-p' }
  };

  private userArray: any[];

  constructor() {
    // this.userArray = Object.values(this.users);
  }

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getUserArray(): Observable<any[]> {
    return observableOf(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return observableOf(this.userArray[counter]);
  }
}
