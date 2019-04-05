import { AbstractControl } from "@angular/forms";

function calculateChecksum(arr: string[], weights: number[]) {
  return arr
    .reduce((a, x, i) => {
      x = x === "X" ? "10" : x;
      a.push([Number(x), weights[i]]);
      return a;
    }, [])
    .reduce((sum, a) => {
      return sum + a[0] * a[1];
    }, 0);
}

export function isValidISBN(value: string) {
  const ISBN10_WEIGHTS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const ISBN13_WEIGHTS = [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1];

  // ISBN length is either 10 or 13
  if (!value || (value.length !== 10 && value.length !== 13)) {
    return false;
  }

  if (value.length === 10) {
    return calculateChecksum(value.split(""), ISBN10_WEIGHTS) % 11 === 0;
  }

  if (value.length === 13) {
    return calculateChecksum(value.split(""), ISBN13_WEIGHTS) % 10 === 0;
  }

  return false;
}

export function ValidateISBN(control: AbstractControl) {
  const value: string = control.value;

  if (isValidISBN(value)) {
    return null;
  }

  return { isbn: true };
}
