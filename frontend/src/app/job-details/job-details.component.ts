import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/_services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  currentJob: Job = {
    name: '',
    status: false,
    recurrence_type: false,
    recurrence_value: ''
  };

  message = '';

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getJob(this.route.snapshot.params.id);
  }

  getJob(id: string): void {
    this.jobService.get(id)
      .subscribe(
        data => {
          this.currentJob = data;
          console.log(data);
        },
        error => { console.log(error); });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentJob.name,
      description: this.currentJob.name,
      status: status
    };

    this.message = '';

    this.jobService.update(this.currentJob.id, data)
      .subscribe(
        response => {
          this.currentJob.status = status;
          console.log(response);
          this.message = response.message ? response.message : 'Status atualizado';
        },
        error => { console.log(error); });
  }

  updateJob(): void {
    this.message = '';

    this.jobService.update(this.currentJob.id, this.currentJob)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'Job atualizado com sucesso';
        },
        error => { console.log(error); });
  }

  deleteJob(): void {
    this.jobService.delete(this.currentJob.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/job']);
        },
        error => { console.log(error); });
  }

}