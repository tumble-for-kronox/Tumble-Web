import { Injectable } from '@angular/core';
import StorageKeys from '@constants/storage_keys';
import { SchoolEnum } from 'src/app/models/enums/schools';
import Bookmark from 'src/app/models/web/bookmark';
import { Theme } from 'src/app/models/web/themes';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getRefreshToken(): string | null {
    return localStorage.getItem(StorageKeys.savedUser);
  }

  setRefreshToken(value: string) {
    localStorage.setItem(StorageKeys.savedUser, value);
  }

  clearRefreshToken() {
    localStorage.removeItem(StorageKeys.savedUser);
  }

  getColors(): Map<string, string> {
    let storedColors = localStorage.getItem(StorageKeys.savedColors);

    if (!storedColors) {
      return new Map<string, string>();
    }

    const currentColors = JSON.parse(storedColors, this._mapReviver);
    return currentColors;
  }

  setColors(value: Map<string, string>) {
    localStorage.setItem(StorageKeys.savedColors, JSON.stringify(value, this._mapReplacer));
  }

  getBookmarks(): Bookmark[] {
    const storedBookmarks = localStorage.getItem(StorageKeys.savedBookmarks);

    if (!storedBookmarks) {
      return [];
    }

    const parsedBookmarks = JSON.parse(storedBookmarks);

    return parsedBookmarks.map((value: object) => Bookmark.fromJson(value));
  }

  setBookmarks(value: Bookmark[]) {
    localStorage.setItem(StorageKeys.savedBookmarks, JSON.stringify(value));
  }

  getSchool(): SchoolEnum {
    const storedSchool = localStorage.getItem(StorageKeys.savedSchool);

    if (!storedSchool) {
      return SchoolEnum.NONE;
    }

    return parseInt(storedSchool) as SchoolEnum;
  }

  setSchool(value: SchoolEnum) {
    localStorage.setItem(StorageKeys.savedSchool, value.toString());
  }

  getTheme(): Theme | null {
    let storedTheme = localStorage.getItem(StorageKeys.savedTheme);

    if (!storedTheme) {
      return null;
    }

    return parseInt(storedTheme) as Theme
  }

  setTheme(value: Theme) {
    localStorage.setItem(StorageKeys.savedTheme, value.toString())
  }

  getSearchSchool(): SchoolEnum {
    const storedSchool = localStorage.getItem(StorageKeys.savedSchool);

    if (!storedSchool) {
      return SchoolEnum.NONE;
    }

    return parseInt(storedSchool) as SchoolEnum;
  }

  setSearchSchool(value: SchoolEnum) {
    localStorage.setItem(StorageKeys.savedSchool, value.toString());
  }

  private _mapReplacer(key: string, value: any) {
    if (value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
  }

  private _mapReviver(key: string, value: any) {
    if (typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;

  }
}
