import { Component, OnChanges, OnInit, SimpleChanges, Input } from '@angular/core';
import { Medication } from '../meds.interface';

@Component({
  selector: 'app-med-section',
  templateUrl: './med-section.component.html',
  styleUrls: ['./med-section.component.css']
})
export class MedSectionComponent implements OnChanges, OnInit {


  ngOnInit(): void {
    this.medList = [
      {
        medName: 'Prozac',
        medDeliveryMethod: 'Pill',
        dose: '10',
        dosageUnits: 'mg',
      },
      {
        medName: 'Metformin',
        medDeliveryMethod: 'Pill',
        dose: '850',
        dosageUnits: 'mg',
      },
      {
        medName: 'Albuterol',
        medDeliveryMethod: 'Inhaler',
        dose: '110',
        dosageUnits: 'mcg'
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("OnChanges called");
  };

  remBtnClicked: boolean = false;

  removalChecks: Medication[] = [];

  @Input() medList: Medication[] = [];


  addMed(medName: string, medDeliveryMethod: string, dose: string, dosageUnits: string) {// method to add a new medication
    // use .push function
    const newMed = {
      medName,
      medDeliveryMethod,
      dose,
      dosageUnits,
    };
    //console.log('User entered: ',newMed);
    this.medList.push(newMed);
    return this.medList;
  };

  removeBtnClicked() { //go to different template
    this.remBtnClicked = true;
    return this.remBtnClicked;
  };



  removeMed(id: string) {
    const index = this.medList.findIndex((obj) => { return obj.medName == id });
    return this.medList.splice(index, 1);
  };

  backBtnClicked() {
    this.remBtnClicked = false;
    return this.remBtnClicked;
  };

}
