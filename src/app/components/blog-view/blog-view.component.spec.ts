import { ComponentFixture, TestBed,tick,waitForAsync  } from '@angular/core/testing';
import { BlogViewComponent } from './blog-view.component';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { of } from 'rxjs';
describe('BlogViewComponent', () => {
  let component: BlogViewComponent;
  let fixture: ComponentFixture<BlogViewComponent>;
  let activatedRouteMock: any;
  let blogService: jasmine.SpyObj<BlogService>;

  beforeEach(waitForAsync( () => {
    activatedRouteMock = {
      snapshot: {
        paramMap: of( {
          get: (param: string) => 'test-id', 
        }),
      },
    };
    const blogServiceSpy = jasmine.createSpyObj('BlogService', ['getBlogFromId']);

    
    TestBed.configureTestingModule({
      declarations: [BlogViewComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: BlogService, useValue: blogServiceSpy },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BlogViewComponent);
    component = fixture.componentInstance;
    blogService = TestBed.inject(BlogService) as jasmine.SpyObj<BlogService>;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch blog based on ID from route param', () => {
    const mockBlog = { id: 'test-id', title: 'Test Blog', author: 'John Doe' , content: 'Test Content' };
    blogService.getBlogFromId.and.returnValue(of(mockBlog));
    component.ngOnInit();
    expect(blogService.getBlogFromId).toHaveBeenCalledWith('test-id');
    expect(component.blog).toEqual(mockBlog);
  });
});
