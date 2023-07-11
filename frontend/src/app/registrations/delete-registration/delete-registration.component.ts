import { Component, Input, OnInit } from '@angular/core';
import { RegistrationsService } from '../registrations.service';
import { Registration } from '../registration.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-registration',
  templateUrl: './delete-registration.component.html',
  styleUrls: ['./delete-registration.component.css']
})
export class DeleteRegistrationComponent implements OnInit {
  @Input() id!: string;
  @Input() type!: string;
  @Input() isModalOpen = false;

  registration!: Registration;

  constructor(
    private registrationService: RegistrationsService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.registrationService
      .getRegistration(this.id)
      .subscribe({
        next: (res) => {
          this.registration = res.registration;
        },
        error: (err) => {
          console.log(err)
          this.openSnackBar(err.error.message.join('\n'), 'close')
          this.route.navigate(['/courses']);
          window.location.reload()
        }
      })
  };

  delete() {
    this.registrationService
      .deleteRegistration(this.id)
      .subscribe({
        next: () => {
          window.alert('Removido com sucesso!')
          this.route.navigate(['/registrations']);
          window.location.reload()
        },
        error: (err) => {
          console.log(err)
          this.openSnackBar(err.error.message.join('\n'), 'close')
          window.location.reload()
        }
      })
  }

  cancel() {
    this.id = '';
    this.isModalOpen = !this.isModalOpen;
    this.route.navigate(['/courses']);
    window.location.reload()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
