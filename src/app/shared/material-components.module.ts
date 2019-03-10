import { NgModule } from "@angular/core";
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from "@angular/material";

const materialModules = [
  MatButtonModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatDialogModule,
  MatNativeDateModule,
  MatSelectModule,
  MatBadgeModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatPaginatorModule,
  MatTreeModule,
  MatTableModule
];

/**
 * This module imports all of the material components which will
 * be used in the application. Importing and exporting them explicitly
 * allows us to have a smaller bundle size.
 */
@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialComponentsModule {}
