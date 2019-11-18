import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DiagramaComponent } from './diagrama/diagrama.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatAutocompleteModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatTooltipModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material'
import {MatToolbarModule} from '@angular/material';
import { MatDialogCComponent } from './mat-dialog-c/mat-dialog-c.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/apiservice';
import { PaletteInicioComponent } from './palette-inicio/palette-inicio.component';
import { PaletteVariablesComponent } from './palette-variables/palette-variables.component';
import { PaletteFlujoComponent } from './palette-flujo/palette-flujo.component';
import { PaletteBuclesComponent } from './palette-bucles/palette-bucles.component';
import { PaletteFuncionesComponent } from './palette-funciones/palette-funciones.component';
import { PaletteIOComponent } from './palette-io/palette-io.component';
import { PaletteArchivosComponent } from './palette-archivos/palette-archivos.component';

@NgModule({
  declarations: [
    AppComponent,
    DiagramaComponent,
    MatDialogCComponent,
    PaletteInicioComponent,
    PaletteVariablesComponent,
    PaletteFlujoComponent,
    PaletteBuclesComponent,
    PaletteFuncionesComponent,
    PaletteIOComponent,
    PaletteArchivosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  entryComponents: [
    MatDialogCComponent
  ], 
  providers: [
    ApiService,
    {provide : MAT_DIALOG_DEFAULT_OPTIONS, useValue:
    {hasBackdrop : true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
