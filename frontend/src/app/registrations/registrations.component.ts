import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Registration, RegistrationColumns, ResponseRegistrations } from './registration.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RegistrationsService } from './registrations.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = RegistrationColumns.map(({ key }) => key);
  dataSource = new MatTableDataSource<Registration>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  responseRegistrations!: ResponseRegistrations;
  isModalOpen = false;
  reg_id?: string;
  type?: string = 'create';

  constructor(private registrationService: RegistrationsService) { }

  ngOnInit(): void {
    this.registrationService
      .getRegistrations()
      .subscribe(
        res => {
          this.responseRegistrations = res;
          this.dataSource.data = res.registrations;
        }
      )
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  deleteRegistration(id: string) {
    this.type = 'delete'
    this.reg_id = id
    this.openModal()
  }
}
