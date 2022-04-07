import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/_services/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})

export class AddJobComponent implements OnInit {

  job: Job = {
    name: '',
    status: false,
    recurrence_type: false,
    recurrence_value: ''
  };

  submitted = false;

  constructor(private jobService: JobService) { }

  ngOnInit(): void {}

  saveJob(): void {
    const data = {
      name: this.job.name,
      status: this.job.status,
      recurrence_type: this.job.recurrence_type,
      recurrence_value: this.job.recurrence_value
    };

    console.log(data);

    this.jobService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => { console.log(error); });
  }

  newJob(): void {
    this.submitted = false;
    
    this.job = {
      name: '',
      status: false,
      recurrence_type: false,
      recurrence_value: ''
    };
  }
}