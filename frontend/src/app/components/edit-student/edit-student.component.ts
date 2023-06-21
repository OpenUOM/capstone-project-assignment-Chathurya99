import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  studentData: any;

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentData();
  }

  getStudentData() {
    const navigation = this.router.getCurrentNavigation();
    const studentId = navigation?.extras?.state?.id;

    if (studentId) {
      this.service.getOneStudentData(studentId).subscribe(
        (response) => {
          this.studentData = response[0];
        },
        (error) => {
          console.log('ERROR - ', error);
        }
      );
    } else {
      // Handle the case when studentId is not available
    }
  }

  editStudent(values: any) {
    const student = {
      id: this.studentData.id,
      name: values.name,
      age: values.age,
      hometown: values.hometown
    };

    this.service.editStudent(student).subscribe(
      (response) => {
        this.studentData = response[0];
      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }
}
