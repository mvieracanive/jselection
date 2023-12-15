import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, NgIf} from '@angular/common';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MunicipalityService } from '../../services/municipality.service';
import { Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { PredictionModel, PredictionService } from '../../services/prediction.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';

interface Municipality {
  nombre:string
  codigo: string
}

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
    MatTableModule,
    NgIf,
  ],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.css'
})
export class PredictionComponent implements OnInit {

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  
  predictions!: Observable<PredictionModel>

  unidades = [{ name: 'F', value: 'G_FAH'}, { name: 'C', value: 'G_CEL'}]
  selectedUnit = 'G_CEL'
  
  municipalityControl = new FormControl();
  municipalities!: Observable<Municipality[]>;
  selectedMunicipality!: Municipality

  displayedColumns: string[] = ['value', 'periodo'];

  constructor(
    private municipalityService: MunicipalityService,
    private predictionService: PredictionService
  ) {  }

  getUnitName(value: string | undefined) {
    if (value === 'G_CEL') {
      return 'C'
    }

    return "F"
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectedMunicipality = event.option.value
    this.setPredictions()
  }

  displayFn(result: Municipality): string {
    return result ? result.nombre : '';
  }

  setPredictions() {
    if (this.selectedMunicipality?.codigo) {
      this.predictions = this.predictionService.getPrediction(this.selectedMunicipality.codigo, this.selectedUnit)
    }
  }

  onTempUnitSelectionChange(event: any): void {
    this.setPredictions();
  }

  ngOnInit() {
    this.municipalities = this.municipalityControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        if (searchTerm.length >= 2) {
          return this.municipalityService.getMunicipalities(searchTerm);
        } else {
          return of([]);
        }
      })
    );
  }

}
