import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/_services/job.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})

export class JobsListComponent implements OnInit {

  jobs?: Job[] = [];
  currentJob: Job = {};
  currentIndex = -1;
  name = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.retrieveJobs();
  }

  getRequestParams(searchName: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchName) {
      params[`name`] = searchName;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveJobs(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.jobService.getAll(params)
    .subscribe(
      response => {
        const { jobs, totalItems } = response;
        this.jobs = jobs;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }


  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveJobs();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveJobs();
  }

  refreshList(): void {
    this.retrieveJobs();
    this.currentJob = {};
    this.currentIndex = -1;
  }

  setActiveJob(job: any, index: number): void {
    this.currentJob = job;
    this.currentIndex = index;
  }

  removeAllJobs(): void {
    this.jobService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => { console.log(error); });
  }
/*
  searchName(): void {
    this.currentJob = {};
    this.currentIndex = -1;

    this.jobService.findByName(this.name)
      .subscribe(
        data => {
          this.jobs = data;
          console.log(data);
        },
        error => { console.log(error); });
  }

*/
  searchName(): void {
    this.page = 1;
    this.retrieveJobs();
  }

}