import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith
} from "rxjs/operators";

export function searchOperator(obs: Observable<any>) {
  return obs.pipe(
    startWith(""),
    debounceTime(600),
    filter((sn: string) => sn && sn.length >= 2),
    distinctUntilChanged(),
    map((searchString: string) => searchString)
  );
}
