import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Product';
import { THEME_OPTION } from '../layout.enum';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})

export class ProductComponent  {
  @Input() isCollapsed = false;
  @Output() buttonClickedIcon: EventEmitter<boolean> = new EventEmitter<boolean>()

  collapsed = true;

  products: Product[] = [];

  themePicked: string = '';

  headerfixed: boolean = false;

  size = window.innerWidth;

  productName !: string;

  visibleValue = {
    APP_RIGHT: false,
  };

  faHome = faHome;
  faMagnifyingGlass = faMagnifyingGlass;
  faList = faList;

  @Input() titleApp = "";

  themeOption = THEME_OPTION;

  smallHeader: boolean = false;

  flag: boolean = false;

  isVisible = false;

  constructor(private service:ProductService) {

  }

  toggleCollapse(id: number): void {
    this.products[id].isExpanded = !this.products[id].isExpanded;
  }

  @HostListener('window:scroll',['$event']) onScroll(){
    if(window.scrollY > 100)
    {
      this.headerfixed = true;
    }
    else
    {
      this.headerfixed = false;
    }
  }

  ngOnInit(){
    this.service.getProducts().subscribe({
      next: (res: any) => {
        if (res?.data?.length > 0){
          this.products = res.data;
        }
      },
      error: (err)=>{
        console.log(err)
      },
      complete: () => {

      }
    });
  }

  deleteProduct(product: number){
    this.service.deleteProduct(product).subscribe(() => this.products = this.products.filter((t) => t.id !== product))
  }

  getAll(){
    this.service.getProducts().subscribe({
      next: (res: any) => {
        if (res?.data?.length > 0){
          this.products = res.data;
        }
      },
      error: (err)=>{
        console.log(err)
      },
      complete: () => {

      }
    });
  }

  getBySearch(productName: any){
    this.service.search(productName).subscribe({
      next: (res: any) => {
        if (res?.length > 0){
          this.products = res;
        } else {
          alert('Deo thay gi het.');
        }
      },
      error: (err)=>{
        console.log(err)
      },
      complete: () => {

      }
    });
  }

  addProduct(product: any){
    this.service.addProduct(product).subscribe(e => {
      setTimeout(() => {
        this.getAll();
      }, 2000);
    })
  }

  plus(id: number) {
    this.products[id].productQty = this.products[id]?.productQty ?? 0 + 1;
    console.log('Value of num1 after increment ', this.products[id].productQty);
    console.log('num plus11', this.products[id].productQty);
  }

  minus(id: number) {
    this.products[id].productQty = this.products[id]?.productQty ?? 0 - 1;
    console.log('Value of num1 after decr ', this.products[id].productQty);
    if (this.products[id].productQty === 0) {
      console.log('disable');
    } else {
      console.log('num minus', this.products[id].productQty);
    }
  }

  changeTheme(theme: any, classDOM: any) {
    this.themeOption.map((item: any) => {
      classDOM[0].classList.remove(item.theme)
    })
    classDOM[0].classList.add(theme);
    this.themePicked = theme
  }

  setDefaultTheme(classDOM: any) {
    // const defaultTheme = this.config.configData?.DEFAULT_THEME
    const defaultTheme = 'loy-primary'
    if (defaultTheme) {
      this.changeTheme(defaultTheme, classDOM)
      localStorage.setItem('theme', defaultTheme);
    }
  }

  onChangeTheme(value: string) {
    localStorage.setItem('theme', value);
    const theme = localStorage.getItem('theme') as string
    const popoverContainer = document.getElementsByTagName('html')
    if (theme && popoverContainer) {
      this.changeTheme(theme, popoverContainer)
    } else {
      this.setDefaultTheme(popoverContainer)
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.size = event.target.innerWidth;

    if (this.size <= 450) {
      this.smallHeader = true
    } else {
      this.smallHeader = false
    }

    if (this.size <= 800) {
      this.buttonClickedIcon.emit(true);
      this.isCollapsed = true;
    } else {
      this.buttonClickedIcon.emit(false);
      this.isCollapsed = false;
    }
  }

  handleCancel(i: number): void {
    this.products[i].isExpanded = false;
  }
}
