import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./products.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CreateProductDTO, Product, UpdateProductDTO } from "../models/product.model";
import { environment } from "src/environments/environment";
import { generateManyProducts, generateOneProduct } from "../models/product.mock";
import { HttpStatusCode } from "@angular/common/http";

fdescribe('ProductsService', () => {
    let productService: ProductsService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductsService]
        });

        productService = TestBed.inject(ProductsService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        //
    });

    it('should be create', () => {
        expect(productService).toBeTruthy();
    });

    describe('test for getAllSimple', () => {
        it('should return a product list', (doneFn) => {
            //Arrange
            const mockData: Product[] = generateManyProducts();
            //Act
            productService.getAllSimple().subscribe((data: any) => {
                //Assert
                expect(data).toEqual(mockData);
                doneFn();
            });

            // http config
            const url = `${environment.API_URL}/api/v1/products`;
            const req = httpController.expectOne(url);
            req.flush(mockData);
            httpController.verify();
        });
    });
    describe('test for getAll', () => {
        it('should return a product list', (doneFn) => {
            //Arrange
            const mockData: Product[] = generateManyProducts(3);
            //Act
            productService.getAll().subscribe((data: string | any[]) => {
                //Assert
                expect(data.length).toEqual(mockData.length);
                doneFn();
            });

            // http config
            const url = `${environment.API_URL}/api/v1/products`;
            const req = httpController.expectOne(url);
            req.flush(mockData);
            httpController.verify();
        });

        it('should return product list with taxes', (doneFn) => {
            //Arrange
            const mockData: Product[] = [
                {
                    ...generateOneProduct(),
                    price: 100, // 100 * .19 = 19
                },
                {
                    ...generateOneProduct(),
                    price: 200, // 200 * .19 = 38
                },
                {
                    ...generateOneProduct(),
                    price: 0, // 200 * .19 = 38
                },
                {
                    ...generateOneProduct(),
                    price: -100, // 200 * .19 = 38
                }
            ];

            //Act
            productService.getAll().subscribe((data: string | any[]) => {
                //Assert
                expect(data.length).toEqual(mockData.length);
                expect(data[0].taxes).toEqual(19);
                expect(data[1].taxes).toEqual(38);
                expect(data[2].taxes).toEqual(0);
                expect(data[3].taxes).toEqual(0);
                doneFn();
            });

            // http config
            const url = `${environment.API_URL}/api/v1/products`;
            const req = httpController.expectOne(url);
            req.flush(mockData);
            httpController.verify();
        });

        it('should send query params with limit 10 and offset 3', (doneFn) => {
            //Arrange
            const mockData: Product[] = generateManyProducts(3);
            const limit = 10;
            const offset = 3;
            //Act
            productService.getAll(limit, offset).subscribe((data: string | any[]) => {
                //Assert
                expect(data.length).toEqual(mockData.length);
                doneFn();
            });

            // http config
            const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
            const req = httpController.expectOne(url);
            req.flush(mockData);
            const params = req.request.params;
            expect(params.get('limit')).toEqual(`${limit}`);
            expect(params.get('offset')).toEqual(`${offset}`);
            httpController.verify();
        });
    });

    describe('tests for create', () => {
        it('should return a new product', (doneFn) => {
            //Arrange
            const mockData = generateOneProduct();
            const dto: CreateProductDTO = {
                title: 'new Product',
                price: 100,
                images: [],
                description: 'lalala',
                categoryId: 12
            }
            //Act
            productService.create(dto).subscribe((data: any) => {
                //Assert
                expect(data).toEqual(mockData);
                doneFn();
            });

            // http config
            const url = `${environment.API_URL}/api/v1/products`;
            const req = httpController.expectOne(url);
            req.flush(mockData);
            expect(req.request.body).toEqual(dto);
            expect(req.request.method).toEqual('POST');
            httpController.verify();
        });
    });

    describe('Test for update product', () => {
        it('#update, should update a product', (doneFn) => {
            // Arrange
            const mockData = generateOneProduct();
            const productId = '1';
            const dto: UpdateProductDTO = {
                title: 'Product edited',
                price: 1000,
                images: ['img'],
                description: 'This is a product edited',
                categoryId: 12,
            };
            // Act
            productService.update(productId, { ...dto }).subscribe((data: any) => {
                // Assert
                expect(data).toEqual(mockData);
                doneFn();
            });
            // Http Config
            const url = `${environment.API_URL}/api/v1/products/${productId}`;
            const req = httpController.expectOne(`${url}`);
            req.flush(mockData);
            expect(req.request.body).toEqual(dto);
            expect(req.request.method).toEqual('PUT');
        });
    });

    describe('Test for delete product', () => {
        it('#Delete, should delete a product', (doneFn) => {
            // Arrange
            const productId = '1';
            // Act
            productService.delete(productId).subscribe((data: any) => {
                // Assert
                expect(data).toBe(true);
                doneFn();
            });
            // Http Config
            const url = `${environment.API_URL}/api/v1/products/${productId}`;
            const req = httpController.expectOne(`${url}`);
            req.flush(true);
            expect(req.request.method).toEqual('DELETE');
        });
    });

    describe('Test for getOne', () => {
        it('should return a product', (doneFn) => {
            // Arrange
            const mockData = generateOneProduct();
            const productId = '1';

            // Act
            productService.getOne(productId).subscribe((data: any) => {
                // Assert
                expect(data).toEqual(mockData);
                doneFn();
            });
            // Http Config
            const url = `${environment.API_URL}/api/v1/products/${productId}`;
            const req = httpController.expectOne(`${url}`);
            req.flush(mockData);
            expect(req.request.method).toEqual('GET');
        });

        it('should return the right msg when the status code is 404', (doneFn) => {
            // Arrange
            const productId = '1';
            const msgError = '404 message';
            const mockError = {
                status: HttpStatusCode.NotFound,
                statusText: msgError
            }

            // Act
            productService.getOne(productId).subscribe({
                next: () => { },
                error: (error: any) => {
                    // Assert
                    expect(error).toEqual('El producto no existe');
                    doneFn();
                }
            });
            // Http Config
            const url = `${environment.API_URL}/api/v1/products/${productId}`;
            const req = httpController.expectOne(`${url}`);
            req.flush(msgError, mockError);
            expect(req.request.method).toEqual('GET');
        });

        it('should return the right msg when the status code is 409', (doneFn) => {
            // Arrange
            const id = '1';
            const msgError = '409 message';
            const mockError = {
                status: HttpStatusCode.Conflict,
                statusText: msgError,
            };
            // Act
            productService.getOne(id).subscribe({
                error: (error: any) => {
                    // assert
                    expect(error).toEqual('Algo esta fallando en el server');
                    doneFn();
                },
            });
            //http config
            const url = `${environment.API_URL}/api/v1/products/${id}`;
            const req = httpController.expectOne(url);
            req.flush(msgError, mockError);
            expect(req.request.method).toEqual('GET');
        });

        it('should return the right msg when the status code is 401', (doneFn) => {
            // Arrange
            const id = '1';
            const msgError = '409 message';
            const mockError = {
                status: HttpStatusCode.Unauthorized,
                statusText: msgError,
            };
            // Act
            productService.getOne(id).subscribe({
                error: (error: any) => {
                    // assert
                    expect(error).toEqual('No estas permitido');
                    doneFn();
                },
            });
            //http config
            const url = `${environment.API_URL}/api/v1/products/${id}`;
            const req = httpController.expectOne(url);
            req.flush(msgError, mockError);
            expect(req.request.method).toEqual('GET');
        });
    });
});
