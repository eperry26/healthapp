import { Component, OnChanges, OnInit, SimpleChanges, Input } from '@angular/core';
// import { Medication } from '../meds.interface';
import { Medication, MedService } from '../meds.service';

@Component({
  selector: 'app-med-section',
  templateUrl: './med-section.component.html',
  styleUrls: ['./med-section.component.css']
})
export class MedSectionComponent implements OnInit {

  constructor(private medService: MedService) {}


  ngOnInit(): void {
    this.fetchMeds()
    // this.medList = [
    //   {
    //     medName: 'Prozac',
    //     medDeliveryMethod: 'Pill',
    //     dose: '10',
    //     dosageUnits: 'mg',
    //   },
    //   {
    //     medName: 'Metformin',
    //     medDeliveryMethod: 'Pill',
    //     dose: '850',
    //     dosageUnits: 'mg',
    //   },
    //   {
    //     medName: 'Albuterol',
    //     medDeliveryMethod: 'Inhaler',
    //     dose: '110',
    //     dosageUnits: 'mcg'
    //   },
    // ];
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log("OnChanges called");
  // };

fetchMeds() {
  return this.medService.getMeds().subscribe((data: {}) => {
    this.medList = data;
  })
}

  remBtnClicked: boolean = false;

  medList: any = [];


  addMed(medName: string, medDeliveryMethod: string = '', dose: string = '', dosageUnits: string ='') {// method to add a new medication
    // use .push function
    const newMed = {
      id: this.medList.length + 1,
      medName,
      medDeliveryMethod,
      dose,
      dosageUnits,
    };

    this.medService.createMed(newMed).subscribe(res => {
      this.fetchMeds()
    })
    console.log('User entered: ',newMed);


    // this.medList.push(newMed);
    // return this.medList;
  };

  medDone(id: number, medCheck: HTMLInputElement) {
      return this.medList.push(this.medList.splice(id, 1)[0]);

  };

  removeBtnClicked() { //go to different template
    this.remBtnClicked = true;
    return this.remBtnClicked;
  };



  removeMed(id: number) { //removing medication from list
    console.log('delete func called');
    this.medService.deleteMed(id).subscribe(res => {
      this.fetchMeds()
    })
  };

  backBtnClicked() { //goes back to medlist page
    this.remBtnClicked = false;
    return this.remBtnClicked;
  };

}
