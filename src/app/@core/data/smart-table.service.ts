import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class SmartTableService {
  //API_URL  =  'http://apigee-cs-test.apigee.net/sentiment-analysis-api';
  API_URL = 'http://demo39-test.apigee.net/v1/customersentiments';

  constructor(private httpClient: HttpClient) { }


  //   getData() {
  // /*     this.httpClient.get(`${this.API_URL}/comments`).subscribe((data:  Array<object>) => {
  //       //this.contacts  =  data;
  //       console.log(data);
  //     }); */
  //     //return this.data;
  //     //return this.httpClient.get(`${this.API_URL}/comments?pagesize=10`);
  //   }

  getData() {
    return this.httpClient.get(`${this.API_URL}/comments?pagesize=100`, {headers: { apikey: 'XlGDdGSk2G9G1A5Y2tP3VayXAsXPpsAV'}})
      .pipe(map(data => Object.keys(data['comments']).map(k => {
        var name = 'invalid', comment = 'invalid', 
          sentiment_image_url = 'https://storage.googleapis.com/apigee-apijam-images/eye-off.svg', score = 0, 
          date = new Date().getTime();
        try {
          var data_comment = data['comments'];
          name = data_comment[k].username;
          comment = data_comment[k].message;
          date = data_comment[k].timestamp;
          score = data_comment[k].sentiment.entities[0].mentions[0].sentiment.score;
          if (score > 0) sentiment_image_url = "https://storage.googleapis.com/apigee-apijam-images/emoticon-happy.png"
          else if (score < 0) sentiment_image_url = "https://storage.googleapis.com/apigee-apijam-images/emoticon-sad.png";
          else sentiment_image_url = "https://storage.googleapis.com/apigee-apijam-images/emoticon-neutral.png";
        } catch (e) {
          console.log("invalid score.", data['comments'][k]);
        } finally {
          return {
            name: name,
            comment: comment,
            score: score,
            image: sentiment_image_url,
            date: date
          }  
        }
      })))

      /* .pipe(
        map(data => Object.keys(data['comments']).map(k => {
          var sentiment_image_url;
          var score;
          try {
            score = data[k].sentiment.entities[0].mentions[0].sentiment.score;
            if (score > 0) sentiment_image_url = "https://storage.googleapis.com/apigee-apijam-images/emoticon-happy.png"
            else if (score < 0) sentiment_image_url = "https://storage.googleapis.com/apigee-apijam-images/emoticon-sad.png";
            else sentiment_image_url = "https://storage.googleapis.com/apigee-apijam-images/emoticon-neutral.png";
          } catch (e) {
            console.log("invalid score.");
          }
          return {
            name: data[k].username,
            comment: data[k].message,
            score: score,
            image: sentiment_image_url,
            date: data[k].timestamp
          }
        }
        )
        )); */

    /* return this.httpClient.get(`${this.API_URL}/comments?pagesize=10`).subscribe(data => {
      return Object.keys(data).map(key => {
        //console.log(data[key])
        return {
          name: data[key].username,
          comment: data[key].message,
          score: data[key].sentiment.entities[0].mentions[0].score
        }
      });
    }) */
  }
}
