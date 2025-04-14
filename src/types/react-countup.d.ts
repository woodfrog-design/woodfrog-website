declare module 'react-countup' {
  import { ComponentType } from 'react';

  interface CountUpProps {
    start?: number;
    end: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
  }

  const CountUp: ComponentType<CountUpProps>;
  export default CountUp;
} 