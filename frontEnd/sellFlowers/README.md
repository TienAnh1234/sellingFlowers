# SellDeviceTea

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


TypeScript
tsc: dùng để dịch các file TypeScript sang js
tsc ten_fileTS : chạy file đó
node ten_fileJS : chạy file TS mà file JS đó đại diện

Angular CLI
npm install -g @angular/cli
ng new project-name : tạo một project angular mới
ng new project-name --no-standalone


ng serve : chạy trương trình angular
ng generate component component-name : tạo 1 component mới

tcs --init : hiện ra file tsconfig.json     noEmitOnError
ng generate class vitri/class-name : tạo class mới và vị trí của class đó (mặc định đã ở trong src/app )

ng generate service services/product : tạo 1 service tên là product.service.ts trong folder services(mặc định đã ở trong src/app )


npm install bootstrap@5.2.0 // cài bootstrap phiên bản 5.2.0 vào project
npm install @fortawesome/fontawesome-free   // cài fortawesome để có thể dùng icon

khi muốn truy cập vào folder asset, ta chỉ cần asset/folderNameSub/fileName từ bất kì đâu



dùng để làm pagnation trong angular
ng add @angular/localize
npm install @ng-bootstrap/ng-bootstrap@13.0.0



// dùng để tạo dialogConfirm
npm i ng-confirm-box --force



// FormGroup: bao gồm nhiều FormControl 
// FormControl: là 1 trường đơn lẻ trong form
// FormBuilder: dùng để tạo formGroup và formControl
// setValue : thêm đủ các giá trị vào các trường formControl bên trong 1 formGroup
// patchValue : thêm 1 vài gias trị vào các trường formControl bên trong 1 formGroup



khi truy cập vào component lần đầu, nó sẽ khởi tạo toàn bộ component đó
những lần kế tiếp truy cập nó sẽ tái sử dụng component đó

nếu muốn tạo mới component:
-  ta cần truy cập thẳng sang một route khác, sau đó quay về component cũ, nó sẽ phải tạo lại
-  bị hủy khỏi DOM sau đó hiển thị lại, component đó sẽ phải tạo lại


nếu tham số trên route thay đổi, nhưng route vẫn là nó, 
thì sẽ chỉ chạy các hàm lắng nghe sự thay đổi tham số như this.route.paramMap.subscribe(có thể bên trong ngOnInit() ), còn component sẽ ko tạo mới

ngOnInit() sẽ chỉ được gọi lại khi component được tạo lại 


tồn tại trong DOM là vẫn còn hiển thị trên giao diện

giá trị phát ra từ subject hay observable, có thể được subcribe từ component A khác để lấy giá trị nếu component A vẫn còn tồn tại trong DOM

Khi giá trị của 1 biến nguyên thủy thay đổi, Angular sẽ tự động cập nhật lại các thuộc tính hoặc hàm liên quan đến giá trị này trong component.