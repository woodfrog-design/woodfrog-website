import { FunctionComponent } from "react";
import BarChartItem from "./BarChartItem";
import styles from "./BarChart.module.css";

export type BarChartType = {
  className?: string;
  barChartItemPropHeight?: string;
  barChartItemPropHeight1?: string;
  barChartItemPropHeight2?: string;
  barChartItemPropHeight3?: string;
  barChartItemPropHeight4?: string;
  barChartItemPropHeight5?: string;
  barChartItemPropHeight6?: string;
  barChartItemPropHeight7?: string;
  barChartItemPropHeight8?: string;
  barChartItemPropHeight9?: string;
  barChartItemPropHeight10?: string;
  barChartItemPropHeight11?: string;
  barChartItemPropHeight12?: string;
  barChartItemPropHeight13?: string;
  barChartItemPropHeight14?: string;
  barChartItemPropJustifyContent?: string;
  barChartItemPropJustifyContent1?: string;
  barChartItemPropJustifyContent2?: string;
  barChartItemPropJustifyContent3?: string;
  barChartItemPropJustifyContent4?: string;
  barChartItemPropJustifyContent5?: string;
  barChartItemPropJustifyContent6?: string;
  barChartItemPropJustifyContent7?: string;
  barChartItemPropJustifyContent8?: string;
  barChartItemPropJustifyContent9?: string;
  barChartItemPropJustifyContent10?: string;
  barChartItemPropJustifyContent11?: string;
  barChartItemPropJustifyContent12?: string;
  barChartItemPropJustifyContent13?: string;
  barChartItemPropJustifyContent14?: string;
  barChartItemPropHeight15?: string;
  barChartItemPropHeight16?: string;
  barChartItemPropHeight17?: string;
  barChartItemPropHeight18?: string;
  barChartItemPropHeight19?: string;
  barChartItemPropHeight110?: string;
  barChartItemPropHeight111?: string;
  barChartItemPropHeight112?: string;
  barChartItemPropHeight113?: string;
  barChartItemPropHeight114?: string;
  barChartItemPropHeight115?: string;
  barChartItemPropHeight116?: string;
  barChartItemPropHeight117?: string;
  barChartItemPropHeight118?: string;
  barChartItemPropHeight119?: string;
};

const BarChart: FunctionComponent<BarChartType> = ({
  className = "",
  barChartItemPropHeight,
  barChartItemPropHeight1,
  barChartItemPropHeight2,
  barChartItemPropHeight3,
  barChartItemPropHeight4,
  barChartItemPropHeight5,
  barChartItemPropHeight6,
  barChartItemPropHeight7,
  barChartItemPropHeight8,
  barChartItemPropHeight9,
  barChartItemPropHeight10,
  barChartItemPropHeight11,
  barChartItemPropHeight12,
  barChartItemPropHeight13,
  barChartItemPropHeight14,
  barChartItemPropJustifyContent,
  barChartItemPropJustifyContent1,
  barChartItemPropJustifyContent2,
  barChartItemPropJustifyContent3,
  barChartItemPropJustifyContent4,
  barChartItemPropJustifyContent5,
  barChartItemPropJustifyContent6,
  barChartItemPropJustifyContent7,
  barChartItemPropJustifyContent8,
  barChartItemPropJustifyContent9,
  barChartItemPropJustifyContent10,
  barChartItemPropJustifyContent11,
  barChartItemPropJustifyContent12,
  barChartItemPropJustifyContent13,
  barChartItemPropJustifyContent14,
  barChartItemPropHeight15,
  barChartItemPropHeight16,
  barChartItemPropHeight17,
  barChartItemPropHeight18,
  barChartItemPropHeight19,
  barChartItemPropHeight110,
  barChartItemPropHeight111,
  barChartItemPropHeight112,
  barChartItemPropHeight113,
  barChartItemPropHeight114,
  barChartItemPropHeight115,
  barChartItemPropHeight116,
  barChartItemPropHeight117,
  barChartItemPropHeight118,
  barChartItemPropHeight119,
}) => {
  return (
    <div className={[styles.barChart, className].join(" ")}>
      <BarChartItem
        propHeight={barChartItemPropHeight}
        propJustifyContent={barChartItemPropJustifyContent}
        propHeight1={barChartItemPropHeight15}
      />
      <BarChartItem
        propHeight={barChartItemPropHeight1}
        propJustifyContent={barChartItemPropJustifyContent1}
        propHeight1={barChartItemPropHeight16}
      />
      <BarChartItem
        propHeight={barChartItemPropHeight2}
        propJustifyContent={barChartItemPropJustifyContent2}
        propHeight1={barChartItemPropHeight17}
      />
      <BarChartItem
        propHeight={barChartItemPropHeight3}
        propJustifyContent={barChartItemPropJustifyContent3}
        propHeight1={barChartItemPropHeight18}
      />
      <BarChartItem
        propHeight={barChartItemPropHeight4}
        propJustifyContent={barChartItemPropJustifyContent4}
        propHeight1={barChartItemPropHeight19}
      />
      <BarChartItem
        propHeight={barChartItemPropHeight5}
        propJustifyContent={barChartItemPropJustifyContent5}
        propHeight1={barChartItemPropHeight110}
      />
      <BarChartItem
        propHeight={barChartItemPropHeight6}
        propJustifyContent={barChartItemPropJustifyContent6}
        propHeight1={barChartItemPropHeight111}
      />
      <BarChartItem
        propHeight={barChartItemPropHeight7}
        propJustifyContent={barChartItemPropJustifyContent7}
        propHeight1={barChartItemPropHeight112}
      />
      <BarChartItem
        propHeight={barChartItemPropHeight8}
        propJustifyContent={barChartItemPropJustifyContent8}
        propHeight1={barChartItemPropHeight113}
      />
      <BarChartItem
        propHeight={barChartItemPropHeight9}
        propJustifyContent={barChartItemPropJustifyContent9}
        propHeight1={barChartItemPropHeight114}
      />
      <BarChartItem
        propHeight={barChartItemPropHeight10}
        propJustifyContent={barChartItemPropJustifyContent10}
        propHeight1={barChartItemPropHeight115}
      />
      <BarChartItem
        propHeight={barChartItemPropHeight11}
        propJustifyContent={barChartItemPropJustifyContent11}
        propHeight1={barChartItemPropHeight116}
      />
      <BarChartItem
        propHeight={barChartItemPropHeight12}
        propJustifyContent={barChartItemPropJustifyContent12}
        propHeight1={barChartItemPropHeight117}
      />
      <BarChartItem
        propHeight={barChartItemPropHeight13}
        propJustifyContent={barChartItemPropJustifyContent13}
        propHeight1={barChartItemPropHeight118}
      />
      <BarChartItem
        propHeight={barChartItemPropHeight14}
        propJustifyContent={barChartItemPropJustifyContent14}
        propHeight1={barChartItemPropHeight119}
      />
    </div>
  );
};

export default BarChart;
