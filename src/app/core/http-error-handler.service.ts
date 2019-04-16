import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class HttpErrorHandlerService {
  constructor(private snackbar: MatSnackBar) {}

  /**
   * Shows a user-friendly error message when a HTTP request fails.
   *
   * @param error - HTTP error
   */
  handle(error: HttpErrorResponse | Error) {
    if (
      error instanceof HttpErrorResponse &&
      error.error &&
      error.error.message
    ) {
      return this._showSnack(error.error.message);
    }

    if (error instanceof Error) {
      switch (error.message) {
        case "INVALID_CREDENTIALS":
          return this._showSnack("Invalid credentials.");
        default:
          return this._showSnack(`An unknown error occurred`);
      }
    }

    // generic HTTP errors
    switch (error.status) {
      case 400:
        return this._showSnack("Bad request");

      case 401:
        return this._showSnack(
          "You need to be logged in to complete this action"
        );

      case 403:
        return this._showSnack(`You don't have the required permissions`);

      case 404:
        return this._showSnack("Resource not found");

      case 422:
        return this._showSnack("Invalid data provided");

      case 500:
      case 501:
      case 502:
      case 503:
        return this._showSnack("An internal server error occurred");

      case -1:
        return this._showSnack(
          "You appear to be offline. Please check your internet connection and try again."
        );

      case 0:
        return this._showSnack(`Couldn't connect to the server.`);

      default:
        return this._showSnack(`An unknown error occurred`);
    }
  }

  private _showSnack(msg: string) {
    return this.snackbar.open(msg, "Dismiss".toUpperCase(), {
      duration: 3500
    });
  }
}
