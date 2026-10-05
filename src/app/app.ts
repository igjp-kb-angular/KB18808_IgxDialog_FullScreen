import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IgxOverlayOutletDirective } from '@infragistics/igniteui-angular/core';
import { IGX_DIALOG_DIRECTIVES } from '@infragistics/igniteui-angular/dialog';
import { IGX_SELECT_DIRECTIVES } from '@infragistics/igniteui-angular/select';
import { IgxButtonDirective } from '@infragistics/igniteui-angular/directives';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    IGX_DIALOG_DIRECTIVES,
    IGX_SELECT_DIRECTIVES,
    IgxButtonDirective,
    IgxOverlayOutletDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:fullscreenchange)': 'onFullscreenChange()',
  },
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly fullscreenTarget = viewChild.required<ElementRef<HTMLElement>>('fullscreenTarget');

  protected readonly isFullscreen = signal(false);
  protected readonly fruits = ['りんご', 'バナナ', 'オレンジ', 'ぶどう'];
  protected readonly fruit = new FormControl<string | null>(null);

  protected async toggleFullscreen(): Promise<void> {
    if (this.document.fullscreenElement) {
      await this.document.exitFullscreen();
    } else {
      await this.fullscreenTarget().nativeElement.requestFullscreen();
    }
  }

  protected onFullscreenChange(): void {
    this.isFullscreen.set(!!this.document.fullscreenElement);
  }
}
