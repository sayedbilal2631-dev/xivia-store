declare module 'react-slick' {
  import { Component } from 'react';

  export interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    arrows?: boolean;
    autoplay?: boolean;
    autoplaySpeed?: number;
    // Add other settings you need
    [key: string]: any;
  }

  export default class Slider extends Component<Settings> {
    slickNext(): void;
    slickPrev(): void;
    slickGoTo(slide: number): void;
  }
}