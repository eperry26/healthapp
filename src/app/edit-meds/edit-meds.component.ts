import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Medication, MedService } from '../meds.service';


@Component({
  selector: 'app-edit-meds',
  templateUrl: './edit-meds.component.html',
  styleUrls: ['./edit-meds.component.css']
})
export class EditMedsComponent implements OnInit {
  backBtn: boolean = false;

  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>(); // declare event emitter property

  constructor(private medService: MedService,
  ) {}

  ngOnInit(): void{
    this.medService.getMeds().subscribe((data: {}) => {
      this.medList = data;
    })

  }

medList: any = []

backBtnClicked() { //goes back to medlist page
  this.backBtn = false;
  return this.goBack.emit(this.backBtn); // emit this boolean for the med-section (parent) component to receive
};

}
