import {RgbaColor} from "react-colorful";

export type Pixel = [r: number, g: number, b: number, a: number];

export type Verdict = 'success' | 'warning' | 'error';

export interface Report {
  verdict: Verdict;
}

export interface PartialPixelAnalysis {
  imageData: ImageData;
  totalPixelCount: number;
  partialPixelCount: number;
}

export interface TransparencyAnalysis {
  semiTransparent: {
    imageData: ImageData;
    semiTransparentPixelCount: number;
  }
  colouredTransparency: {
    imageData: ImageData;
    colouredTransparentPixelCount: number;
  };
  totalPixelCount: number;
}

export interface BackgroundSolidFill {
  id: string;
  fill: RgbaColor;
  custom?: boolean;
}

export interface BattlerConfig {
  playerX: number;
  playerY: number;
  enemyX: number;
  enemyY: number;
  shadowX: number;
  shadowSize: number;
  altitude: number;
}
