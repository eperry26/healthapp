import { Component, OnChanges, OnInit, SimpleChanges, Input } from '@angular/core';
import { EditMedsComponent } from '../edit-meds/edit-meds.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Medication } from '../meds.interface';
import { Medication, MedService } from '../meds.service';

@Component({
  selector: 'app-med-section',
  templateUrl: './med-section.component.html',
  styleUrls: ['./med-section.component.css']
})
export class MedSectionComponent implements OnInit {

  goBackHandler(backClicked: boolean) {
    this.isEdit = backClicked //boolean to display main page layout
    this.fetchMeds() // display updated list
  }




  isEdit = false



  medForm = new FormGroup({

    medName: new FormControl('', {nonNullable: true},),
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

  medDone(idx: number, medCheck: HTMLInputElement) { //if med has been checked off
      return this.medList.push(this.medList.splice(idx, 1)[0]);
      // change id number so that checked off med is at the end of the list in the backend. Might need to add a variable for 'checked: true of false'
      

  };

  editBtnClicked() { //go to different template
    this.isEdit = true;
    return this.isEdit;
  };


  // **move this to edit-meds.component.ts
  // removeMed(id: number) { //removing medication from list
  //   console.log('delete func called');
  //   this.medService.deleteMed(id).subscribe(res => {
  //     this.fetchMeds()
  //   })
  // };



}
