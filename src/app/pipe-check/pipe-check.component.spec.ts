import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeCheckComponent } from './pipe-check.component';

describe('PipeCheckComponent', () => {
  let component: PipeCheckComponent;
  let fixture: ComponentFixture<PipeCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipeCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PipeCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
