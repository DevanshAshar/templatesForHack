import CountUp from "react-countup";

export default function NumbersAnimation({Component,start,end,suffix,decimal}) {
  return (
    <CountUp
      start={0}
      end={end}
      suffix={suffix}
      decimals={decimal}
      duration={2.5}
      enableScrollSpy={true}
      scrollSpyDelay={500}
      scrollSpyOnce={true}

    >
      {({ countUpRef, start }) => <Component  ref={countUpRef} />}
    </CountUp>
  );
}
