import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Product';
import { THEME_OPTION } from '../layout.enum';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() isCollapsed = false;
  @Output() buttonClickedIcon: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  collapsed = true;

  products: Product[] = [];

  themePicked: string = '';

  // headerfixed: boolean = false;

  size = window.innerWidth;

  productName!: string;

  visibleValue = {
    APP_RIGHT: false,
  };

  faHome = faHome;
  faMagnifyingGlass = faMagnifyingGlass;
  faList = faList;
  faPlus = faPlus;
  faMinus = faMinus;
  faUpload = faUpload;

  @Input() titleApp = '';

  themeOption = THEME_OPTION;

  smallHeader: boolean = false;

  flag: boolean = false;

  isVisible = false;

  constructor(private service: ProductService) {}

  toggleCollapse(id: number): void {
    this.products[id].isExpanded = !this.products[id].isExpanded;
  }

  // @HostListener('window:scroll', ['$event']) onScroll() {
  //   if (window.scrollY > 100) {
  //     this.headerfixed = true;
  //   } else {
  //     this.headerfixed = false;
  //   }
  // }

  ngOnInit() {
    this.service.getProducts().subscribe({
      next: (res: any) => {
        if (res?.data?.length > 0) {
          this.products = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  deleteProduct(product: number) {
    this.service
      .deleteProduct(product)
      .subscribe(
        () => (this.products = this.products.filter((t) => t.id !== product))
      );
  }

  getAll() {
    this.service.getProducts().subscribe({
      next: (res: any) => {
        if (res?.data?.length > 0) {
          this.products = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  getBySearch(productName: any) {
    this.service.search(productName).subscribe({
      next: (res: any) => {
        this.products = res;
        // if (res?.length > 0) {

        // } else {
        //   alert('Deo thay gi het.');
        // }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  addProduct(product: any) {
    this.service.addProduct(product).subscribe((e) => {
      setTimeout(() => {
        this.getAll();
      }, 2000);
    });
  }

  handleOnClick(type: string, i: number) {
    switch (type) {
      case 'plus':
        this.products[i].productQty += 1;
        break;
      case 'decrease':
        if (this.products[i].productQty !== 0) {
          this.products[i].productQty -= 1;
          break;
        } else {
          break;
        }
      default:
        break;
    }
  }

  adjustQty(id: number, qty: number) {
    this.service.adjustQty(id, qty).subscribe((e) => {
      setTimeout(() => {
        this.getAll();
      }, 2000);
    });
  }

  changeTheme(theme: any, classDOM: any) {
    this.themeOption.map((item: any) => {
      classDOM[0].classList.remove(item.theme);
    });
    classDOM[0].classList.add(theme);
    this.themePicked = theme;
  }

  setDefaultTheme(classDOM: any) {
    // const defaultTheme = this.config.configData?.DEFAULT_THEME
    const defaultTheme = 'loy-primary';
    if (defaultTheme) {
      this.changeTheme(defaultTheme, classDOM);
      localStorage.setItem('theme', defaultTheme);
    }
  }

  onChangeTheme(value: string) {
    localStorage.setItem('theme', value);
    const theme = localStorage.getItem('theme') as string;
    const popoverContainer = document.getElementsByTagName('html');
    if (theme && popoverContainer) {
      this.changeTheme(theme, popoverContainer);
    } else {
      this.setDefaultTheme(popoverContainer);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.size = event.target.innerWidth;

    if (this.size <= 450) {
      this.smallHeader = true;
    } else {
      this.smallHeader = false;
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
