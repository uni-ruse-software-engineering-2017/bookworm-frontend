import { FormGroup } from "@angular/forms";

export function toggleFormDisabledState(form: FormGroup, state: boolean) {
  Object.keys(form.controls).forEach(name => {
    if (state) {
      form.get(name).disable();
    } else {
      form.get(name).enable();
    }
  });
}
