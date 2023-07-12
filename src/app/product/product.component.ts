import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Product';
import { THEME_OPTION } from '../layout.enum';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ]
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

  @Input() titleApp = "";

  themeOption = THEME_OPTION;

  smallHeader: boolean = false;

  constructor(private service:ProductService) {

  }

  flag: boolean = false;

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

  toggle() {
    this.collapsed = !this.collapsed;
  }

  expand(id: number) {
    this.products[id].isExpanded = true;
    this.collapsed = false;
  }

  collapse(id: number) {
    this.products[id].isExpanded = false;
    this.collapsed = true;
  }

  ngOnInit(){
    this.products.forEach((product) => {
      product.isExpanded = false;
    });
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
      this.getAll();
    })
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

  async getBase64ImageFromUrl(imageUrl: string ) {
    const res = await fetch(imageUrl);
    const blob = await res.blob();

    return new Promise((resolve, reject) => {
      const reader  = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }
}
