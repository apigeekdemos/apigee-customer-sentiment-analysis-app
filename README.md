Apigee Sentiment Analysis App
=============================

Apigee sentiment Analysis App (ASAP) uses REST APIs built on top of Apigee. The purpose of this app is to show how to leverage a REST API into an App to build the user experience from two different roles: end-user/customer and customer service administrator.

### Getting started
Start by cloning this repo:
```bash
git clone https://github.com/dzuluaga/apigee-customer-sentiment-analysis-app.git
```

Install dependencies and start the app:
```bash
npm install
npm serve
```

### How it works
Describe the app:
* @TODO REST API
* @TODO include OpenAPI Spec and endpoints and how they map to the two pages: submit a comment (POST /comments) and retrieve comments (GET /comments).
* @TODO see [src/app/@core/data/smart-table.service.ts](src/app/@core/data/smart-table.service.ts)
* @ Review getData method
* @TODO Review [/src/app/pages/tables/smart-table/smart-table.component.ts](/src/app/pages/tables/smart-table/smart-table.component.ts) check constructor.

### References and Documentation

ASAP is implemented on [ngx-admin](https://github.com/akveo/ngx-admin), which is based on Angular 6+, Bootstrap 4 and Nebula. Here you can find [documentation](https://akveo.github.io/nebular/docs/guides/install-based-on-starter-kit). 

### License
[Apache 2](./LICENSE).

### How to contribute
* Star this repo.
* Report issues.