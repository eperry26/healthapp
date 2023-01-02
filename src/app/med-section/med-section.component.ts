import { Component } from '@angular/core';
import { Medication } from '../meds.interface';

@Component({
  selector: 'app-med-section',
  templateUrl: './med-section.component.html',
  styleUrls: ['./med-section.component.css']
})
export class MedSectionComponent {

  medList: Medication [] = [
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
  addMed(medName: string, medDeliveryMethod: string, dose: string , dosageUnits: string)  {// method to add a new medication
    // use .push function
    const newMed = {
      medName,
      medDeliveryMethod,
      dose,
      dosageUnits,
    };
    console.log('User entered: ',newMed);
    this.medList.push(newMed);
     return this.medList;
  }
}
