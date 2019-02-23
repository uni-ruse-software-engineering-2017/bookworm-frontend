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
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule
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
  MatDatepickerModule
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
