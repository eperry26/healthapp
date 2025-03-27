import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Medication, MedService } from '../meds.service';


@Component({
  selector: 'app-edit-meds',
  templateUrl: './edit-meds.component.html',
  styleUrls: ['./edit-meds.component.css']
})
export class EditMedsComponent implements OnInit {
  backBtn: boolean = false;

  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>(); // declare event emitter property
  // @Output() newList: EventEmitter<any> = new EventEmitter<any>();

  constructor(private medService: MedService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void{
    this.medService.getMeds().subscribe((data: {}) => {
      this.medList = data;
      console.log(this.medList)
    })

  }

  medList: any = []
  modalHeader: string = ''
  medID: number = 0


  // initialize medForm, then change the values to whatever medication is selected
  medForm = new FormGroup({

    medName: new FormControl('', {nonNullable: true},),
    deliveryMethod: new FormControl('', {nonNullable: true}),
    dose: new FormControl('', {nonNullable: true}),
    dosageUnits: new FormControl('', {nonNullable: true}),

  })

  backBtnClicked() { //goes back to medlist page
    this.backBtn = false;
    return this.goBack.emit(this.backBtn); // emit this boolean for the med-section (parent) component to receive
  };

  fetchMeds() {
    return this.medService.getMeds().subscribe((data: {}) => {
      this.medList = data;
    })
  }

  // input: the med that was selected and it's info.
  openPopup(id: number) {
    const medPopUpDiv = document.getElementById('popUp')
    this.medID = id+1 //will be used when calling updateMed later
    if(medPopUpDiv != null) {
      medPopUpDiv.style.display = 'block';
      // display med selected
      this.modalHeader = this.medList[id].medName
      // populate fields with info of selected medication
      this.medForm.controls.medName.setValue(this.medList[id].medName)
      this.medForm.controls.deliveryMethod.setValue(this.medList[id].medDeliveryMethod)
      this.medForm.controls.dose.setValue(this.medList[id].dose)
      this.medForm.controls.dosageUnits.setValue(this.medList[id].dosageUnits)
    }
    // console.log(this.medForm.value.medName)
  }

  handleSubmit() {
    const updatedMed = {
      id: this.medID!,
      medName: this.medForm.value.medName!,
      medDeliveryMethod: this.medForm.value.deliveryMethod!,
      dose: this.medForm.value.dose!,
      dosageUnits: this.medForm.value.dosageUnits!,
    };
    // console.log(this.medID)
    this.medService.updateMed(this.medID, updatedMed).subscribe(res => {
      this.fetchMeds() //get updated medList
    })
    console.log(this.medList)
    // emit updated list to other components
    // return this.newList.emit(this.medList)
  }

  closePopup() { //function to change display of pop-up and have it go away
    const medPopUpDiv = document.getElementById('popUp')
    if(medPopUpDiv != null) {
      medPopUpDiv.style.display = 'none';
    }
  }

  removeMed(id: number) { //removing medication from list
    console.log('delete func called');
    this.medService.deleteMed(id).subscribe(res => {
      this.fetchMeds()
    })
    // emit updated list to other components
    // return this.newList.emit(this.medList)

  };

}
