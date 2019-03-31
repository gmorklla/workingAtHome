import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DashboardCard } from '../../dashboard/dashboard/dashboard-card';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardCardsService {
  constructor(private snack: SnackBarService) {}

  private _cards: BehaviorSubject<DashboardCard[]> = new BehaviorSubject<
    DashboardCard[]
  >([]);

  addCard(card: DashboardCard | Array<DashboardCard>): void {
    this._cards.next(this._cards.getValue().concat(card));
  }

  resetCards(): void {
    this._cards.next([]);
  }

  saveDash(): void {
    const arr = this._cards.getValue().map(widget => {
      const name = widget.input.name.value;
      const uid = widget.input.uid.value;
      return {
        name: name,
        cols: name === 'Big gauge' || name === 'Bar' ? 4 : 2,
        rows: name === 'Big gauge' ? 4 : 2,
        uid: uid
      };
    });
    const str = JSON.stringify(arr);
    localStorage.setItem('dash', str);
    this.snack.open('Saved!', 'Ok');
  }

  removeCard(uid: string): void {
    const arr = this._cards.getValue();
    const filtered = arr.filter(card => card.input.uid.value !== uid);
    this._cards.next(filtered);
  }

  get cards(): BehaviorSubject<DashboardCard[]> {
    return this._cards;
  }
}
