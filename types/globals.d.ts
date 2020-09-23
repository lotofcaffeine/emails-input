export {};

declare global {
  interface Window {
    clipboardData: {
      getData(val: string): string;
    };
  }
}
