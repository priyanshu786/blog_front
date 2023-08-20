import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogListComponent } from './blog-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BlogService } from 'src/app/services/blog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { of } from 'rxjs'

describe('BlogListComponent', () => {
  let component: BlogListComponent;
  let fixture: ComponentFixture<BlogListComponent>;
  let blogService: BlogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatSelectModule,
        HttpClientTestingModule,
        MatMomentDateModule
      ],
      declarations: [ BlogListComponent,],
       providers: [BlogService],
    
    }).compileComponents();
  });

  beforeEach(() => {
    blogService = TestBed.inject(BlogService);
    spyOn(blogService, 'getCategories').and.returnValue(of(['science', 'english', 'hindi']));

    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should fetch categories on ngOnInit', () => {
    expect(blogService.getCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(['science', 'english', 'hindi']);
  });

  it('should filter blogs by category and date range', () => {
    const mockBlogs = [{ id: 1, topic: 'Blog1', author: 'Author1', content: 'Content1' }];
    spyOn(blogService, 'filterByCategoryandDate').and.returnValue(of(mockBlogs));

    component.filterParam = {
      category: 'Category1',
      DateFrom: '2023-08-01',
      DateTo: '2023-08-31',
    };
    component.filterBlogs();

    expect(component.blogs).toEqual(mockBlogs);
  });

  it('should filter blogs by category only', () => {
    const mockBlogs = [{ id: 2, topic: 'Blog2', author: 'Author2', content: 'Content2' }];
    spyOn(blogService, 'filterByCategory').and.returnValue(of(mockBlogs));

    component.filterParam = {
      category: 'Category2',
      DateFrom: '',
      DateTo: '',
    };
    component.filterBlogs();

    expect(component.blogs).toEqual(mockBlogs);
  });

  it('should filter blogs by date range only', () => {
    const mockBlogs = [{ id: 3, topic: 'Blog3', author: 'Author3', content: 'Content3' }];
    spyOn(blogService, 'filterByDate').and.returnValue(of(mockBlogs));

    component.filterParam = {
      category: '',
      DateFrom: '2023-08-01',
      DateTo: '2023-08-31',
    };
    component.filterBlogs();

    expect(component.blogs).toEqual(mockBlogs);
  });

  it('should show all blogs when no filters applied', () => {
    const mockBlogs = [{ id: 4, topic: 'Blog4', author: 'Author4', content: 'Content4' }];
    spyOn(blogService, 'getAllBlogs').and.returnValue(of(mockBlogs));

    component.filterParam = {
      category: '',
      DateFrom: '',
      DateTo: '',
    };
    component.filterBlogs();

    expect(component.blogs).toEqual(mockBlogs);
  });

  it('should navigate to blog-view page when a blog tile is clicked', () => {
    component.filterParam.category = '';
    component.filterParam.DateFrom = '';
    component.filterParam.DateTo = '';
    const mockBlogs = [
      { title: 'Blog 1', author: 'Author 1', content: 'Content of Blog 1' },
      { title: 'Blog 2', author: 'Author 2', content: 'Content of Blog 2' },
    ];
    spyOn(blogService, 'getAllBlogs').and.returnValue(of(mockBlogs));
    component.filterBlogs();
    expect(blogService.getAllBlogs).toHaveBeenCalled();
    expect(component.blogs).toEqual(mockBlogs);
  });

});
