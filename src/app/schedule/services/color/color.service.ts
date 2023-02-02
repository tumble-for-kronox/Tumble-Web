import { Injectable } from '@angular/core';
import StorageKeys from '@constants/storage_keys';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private _currentColorsSubject: BehaviorSubject<Map<string, Map<string, string>>> = new BehaviorSubject<Map<string, Map<string, string>>>(new Map());
  public currentColors: Observable<Map<string, Map<string, string>>>;

  constructor() {
    let storedColors = localStorage.getItem(StorageKeys.savedColors);

    if (storedColors === "undefined" || storedColors === null) {
      this._currentColorsSubject.next(new Map());
    } else {
      this._currentColorsSubject.next(JSON.parse(storedColors));
    }

    this.currentColors = this._currentColorsSubject.asObservable();
  }

  public get currentColorsValue(): Map<string, Map<string, string>> {
    return this._currentColorsSubject.getValue();
  }

  public updateScheduleColors(shceduleId: string, colors: Map<string, string>) {
    let currentColors = this.currentColorsValue;

    currentColors.set(shceduleId, colors);

    this._nextColorsValue(currentColors);
  }

  public updateSingleColor(scheduleId: string, courseId: string, color: string) {
    let colors = this.currentColorsValue;

    if (!colors.has(scheduleId)) {
      colors.set(scheduleId, new Map())
    }

    colors.get(scheduleId)!.set(courseId, color);

    this._nextColorsValue(colors);
  }

  public generateNewColors(courseIds: string[]): Map<string, string> {
    return courseIds.reduce((map, courseId) => {
      map.set(courseId, this.randomColor());
      return map;
    }, new Map<string, string>());
  }

  public removeColors(scheduleId: string) {
    let colors = this.currentColorsValue;

    colors.delete(scheduleId);

    this._nextColorsValue(colors);
  }

  public randomColor(): string {
    return this._colors[Math.floor(Math.random() * this._colors.length)];
  }

  private _nextColorsValue(colors: Map<string, Map<string, string>>) {
    this._currentColorsSubject.next(colors);
    localStorage.setItem(StorageKeys.savedColors, JSON.stringify(colors));
  }

  private _colors: string[] = [
    // Shades of blue
    "00FFFF", // Aqua
    "89CFF0", // Baby Blue
    "0000FF", // Blue
    "7393B3", // Blue Gray
    "088F8F", // Blue Green
    "0096FF", // Bright Blue
    "1434A4", // Egyptian Blue
    "00A36C", // Jade
    "5D3FD3", // Iris
    "191970", // Midnight Blue
    "CCCCFF", // Periwinkle
    "96DED1", // Robin Egg Blue
    "9FE2BF", // Seafoam Blue
    "008080", // Teal

    // Shades of brown
    "E1C16E", // Brass
    "CD7F32", // Bronze
    "DAA06D", // Buff
    "800020", // Burgundy
    "E97451", // Burnt Sienna
    "6E260E", // Burnt Umber
    "7B3F00", // Chocolate
    "6F4E37", // Coffee
    "8B0000", // Dark Red
    "E5AA70", // Fawn
    "F0E68C", // Khaki
    "C04000", // Mahogany
    "800000", // Maroon

    // Shades of green
    "AFE1AF", // Celadon
    "50C878", // Emerald green
    "228B22", // Forest green
    "32CD32", // Lime green
    "478778", // Lincoln green
    "93C572", // Pistachio

    // Shades of orange
    "FFBF00", // Amber
    "FFAC1C", // Bright orange
    "F88379", // Coral pink
    "FF7F50", // Coral
    "E49B0F", // Gamboge
    "F4BB44", // Mango
    "FF5F1F", // Neon orange
    "EC5800", // Persimmon
    "FA8072", // Salmon

    // Shades of pink
    "9F2B68", // Amaranth
    "DE3163", // Cerise
    "AA336A", // Dark pink
    "FF69B4", // Hot pink
    "770737", // Mulberry
    "DA70D6", // Orchid
    "800080", // Purple
    "E30B5C", // Raspberry
    "F33A6A", // Rose
    "D8BFD8", // Thistle

    // Shades of purple
    "CF9FFF", // Light violet
    "51414F", // Quartz
    "7F00FF", // Violet

    // Shades of yellow
    "FFEA00", // Bright yellow
    "FDDA0D", // Cadmium yellow
    "FAD5A5", // Desert
    "FFD700", // Gold
    "FADA5E", // Navel yellow
  ];
}
