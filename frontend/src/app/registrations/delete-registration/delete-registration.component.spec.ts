import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRegistrationComponent } from './delete-registration.component';

describe('DeleteRegistrationComponent', () => {
  let component: DeleteRegistrationComponent;
  let fixture: ComponentFixture<DeleteRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
