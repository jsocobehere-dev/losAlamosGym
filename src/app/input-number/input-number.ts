import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-number',
  standalone: false,
  templateUrl: './input-number.html'
})
export class InputNumberComponent {
  // Recibimos la cantidad actual, el stock máximo y el mínimo
  @Input() quantity!: number;
  @Input() max!: number;

  // El output DEBE llamarse de esta forma exacta para habilitar el [(quantity)] afuera
  @Output() quantityChange: EventEmitter<number> = new EventEmitter<number>();

  upQuantity(): void {
    if (this.quantity < this.max) {
      this.quantity++;
      this.quantityChange.emit(this.quantity); // Emitimos el cambio hacia el padre
    }
  }

  downQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
      this.quantityChange.emit(this.quantity); // Emitimos el cambio hacia el padre[cite: 4]
    }
  }

  onChange(event: any): void {
    let value = parseInt(event.target.value, 10);

    if (isNaN(value) || value < 0) {
      value = 0;
    } else if (value > this.max) {
      value = this.max;
    }

    this.quantity = value;
    this.quantityChange.emit(this.quantity); // Emitimos el cambio manual[cite: 4]
  }
}