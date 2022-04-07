import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/_services/job.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})

export class JobsListComponent implements OnInit {

  jobs?: Job[];
  currentJob: Job = {};
  currentIndex = -1;
  name = '';

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.retrieveJobs();
  }

  retrieveJobs(): void {
    this.jobService.getAll()
      .subscribe(
        data => {
          this.jobs = data;
          console.log(data);
        },
        error => { console.log(error); });
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

}