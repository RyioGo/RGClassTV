/* eslint-disable @typescript-eslint/no-explicit-any */

interface Window {
  test: any;
}

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "pinyin";
declare module "pdfjs-dist";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "*.js";
