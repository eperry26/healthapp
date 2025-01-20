import { Component, OnChanges, OnInit, SimpleChanges, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { Medication } from '../meds.interface';
import { Medication, MedService } from '../meds.service';

@Component({
  selector: 'app-med-section',
  templateUrl: './med-section.component.html',
  styleUrls: ['./med-section.component.css']
})
export class MedSectionComponent implements OnInit {

  medForm = new FormGroup({

    medName: new FormControl('', {nonNullable: true}),
    deliveryMethod: new FormControl('', {nonNullable: true}),
    dose: new FormControl('', {nonNullable: true}),
    dosageUnits: new FormControl('', {nonNullable: true}),

  })

  constructor(private medService: MedService,
  ) {}



  ngOnInit(): void { //initialize UI with data, if user entered data previously
    this.fetchMeds()

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

  handleSubmit() {
    return this.addMed(this.medForm.value.medName, this.medForm.value.deliveryMethod, this.medForm.value.dose, this.medForm.value.dosageUnits)
  }

  // after this function runs, the form should clear
  // need to add input validation to make sure necessary values are inputted
  addMed(medName: string = '', medDeliveryMethod: string = '', dose: string = '', dosageUnits: string ='') {// method to add a new medication
    // use .push function
    const newMed = {
      id: this.medList.length + 1,
      medName,
      medDeliveryMethod,
      dose,
      dosageUnits,
    };

    this.medService.createMed(newMed).subscribe(res => {
      this.fetchMeds() // get an updated list from backend to be displayed
    })
    console.log('User entered: ',newMed);
    this.medForm.reset(); // clears the input fields of the form, ready for another med to be added.


    // this.medList.push(newMed);
    // return this.medList;
  };

  medDone(id: number, medCheck: HTMLInputElement) { //if med has been checked off
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
