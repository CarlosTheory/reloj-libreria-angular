import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojLibComponent } from './reloj-lib.component';

describe('RelojLibComponent', () => {
  let component: RelojLibComponent;
  let fixture: ComponentFixture<RelojLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelojLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelojLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
