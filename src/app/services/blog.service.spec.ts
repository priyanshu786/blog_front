import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController  } from '@angular/common/http/testing';

import { BlogService } from './blog.service';

describe('BlogService', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService]
    });

    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure no outstanding HTTP requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all blogs', () => {
    const mockBlogs = [{ id: '1', title: 'Blog 1' }, { id: '2', title: 'Blog 2' }];
    service.getAllBlogs().subscribe((blogs) => {
      expect(blogs).toEqual(mockBlogs);
    });
    const req = httpMock.expectOne('http://localhost:8082/blogs');
    expect(req.request.method).toBe('GET');
    req.flush(mockBlogs);
  });

  it('should filter blogs by category and date range', () => {
    const filterParam = { category: 'science', DateFrom: '2023-01-01', DateTo: '2023-06-30' };
    const mockFilteredBlogs = [{ id: '1', title: 'Blog 1', category: 'science', date: '2023-04-15' }];

    service.filterByCategoryandDate(filterParam).subscribe((filteredBlogs: any) => {
      expect(filteredBlogs).toEqual(mockFilteredBlogs);
    });

    const req = httpMock.expectOne(
      `http://localhost:8082/blogs/get/${filterParam.category}/${filterParam.DateFrom}/${filterParam.DateTo}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockFilteredBlogs);
  });



});
