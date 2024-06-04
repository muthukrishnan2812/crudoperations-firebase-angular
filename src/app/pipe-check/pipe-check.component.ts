import { Component } from '@angular/core';
import { InputPipe } from '../shared/input.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../shared/filter.pipe';




@Component({
  selector: 'app-pipe-check',
  standalone: true,
  imports: [InputPipe,FilterPipe, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './pipe-check.component.html',
  styleUrl: './pipe-check.component.scss'
})
export class PipeCheckComponent {
  text: any = 'Muthukrishnan'
  filtervalue:string='24'
  users=[
    {
      name:'Muthukrishnan',
      age:'24',
      Gender:'Male'
    },
    {
      name:'Bala Esakki',
      age:'26',
      Gender:'Male'
    },
    {
      name:'Anuska',
      age:'40',
      Gender:'Female'
    }
  ]
}
