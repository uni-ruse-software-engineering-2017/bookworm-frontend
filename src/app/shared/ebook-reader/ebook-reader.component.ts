import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { MatSidenav } from "@angular/material";
import { Book, Rendition } from "epubjs";
import Navigation, { NavItem } from "epubjs/types/navigation";
import * as screenfull from "screenfull";

@Component({
  selector: "bw-ebook-reader",
  templateUrl: "./ebook-reader.component.html",
  styleUrls: ["./ebook-reader.component.scss"]
})
export class EbookReaderComponent implements OnInit, OnChanges {
  @Input() epubUrl = "";
  @Input() height = 600;
  @ViewChild("sideNav") sideNav: MatSidenav;

  bookTitle: string;
  bookAuthor: string;
  book: Book;
  rendition: Rendition;
  navigation: Navigation;
  screenfull = screenfull;
  isLoaded = false;

  constructor(private host: ElementRef) {}

  async ngOnInit() {
    if (!this.epubUrl) {
      return;
    }

    this.loadBook();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.epubUrl && changes.epubUrl.currentValue) {
      this.loadBook();
    }
  }

  async loadBook() {
    this.book = new Book(this.epubUrl);
    await this.book.ready;
    this.isLoaded = true;

    const metadata = await this.book.loaded.metadata;

    this.bookTitle = metadata.title;
    this.bookAuthor = metadata.creator;

    this.rendition = this.book.renderTo("epub-container", {
      flow: "paginated",
      width: "100%",
      height: this.height
    });

    await this.rendition.display();
    this.book.loaded.navigation.then(toc => {
      this.navigation = toc;
    });
  }

  async goToNextPage() {
    await this.rendition.next();
  }

  async goToPrevPage() {
    await this.rendition.prev();
  }

  toggleTableOfContents() {
    this.sideNav.toggle();
  }

  navigateTo(link: NavItem) {
    this.rendition.display(link.href);
  }

  toggleFullScreen() {
    if (screenfull.enabled) {
      screenfull.toggle(this.host.nativeElement);
    }
  }
}
