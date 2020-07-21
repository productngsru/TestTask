import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from './dialogs/confirmation-dialog/confirmation-dialog.component';
import {isUndefined} from 'util';

@Injectable ({providedIn : 'root'})

export  class  DialogService {
  constructor(private dialog: MatDialog) {
  }

  public confirmDialog(msg: string, width: string = '300px', operation: () => any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width,
      data: msg,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        operation();
      }
    });
  }

}
