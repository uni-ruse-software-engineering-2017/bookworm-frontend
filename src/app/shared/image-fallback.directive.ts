// stolen form https://github.com/VadimDez/ngx-img-fallback

import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2
} from "@angular/core";

@Directive({
  selector: "[bwSrcFallback]"
})
export class ImgFallbackDirective implements OnDestroy {
  @Input() bwSrcFallback: string;
  @Output() loaded = new EventEmitter<boolean>();
  private nativeElement: HTMLElement;
  private isApplied = false;
  private ERROR_EVENT_TYPE = "error";
  private LOAD_EVENT_TYPE = "load";
  private cancelOnError: () => void;
  private cancelOnLoad: () => void;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.nativeElement = el.nativeElement;

    this.onError = this.onError.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.addEvents();
  }

  ngOnDestroy() {
    this.removeErrorEvent();
    this.removeOnLoadEvent();
  }

  private onError() {
    if (this.nativeElement.getAttribute("src") !== this.bwSrcFallback) {
      this.isApplied = true;
      this.renderer.setAttribute(this.nativeElement, "src", this.bwSrcFallback);
    } else {
      this.removeOnLoadEvent();
    }
  }

  private onLoad() {
    this.loaded.emit(this.isApplied);
  }

  private removeErrorEvent() {
    if (this.cancelOnError) {
      this.cancelOnError();
    }
  }

  private removeOnLoadEvent() {
    if (this.cancelOnLoad) {
      this.cancelOnLoad();
    }
  }

  private addEvents() {
    this.cancelOnError = this.renderer.listen(
      this.nativeElement,
      this.ERROR_EVENT_TYPE,
      this.onError
    );
    this.cancelOnLoad = this.renderer.listen(
      this.nativeElement,
      this.LOAD_EVENT_TYPE,
      this.onLoad
    );
  }
}
