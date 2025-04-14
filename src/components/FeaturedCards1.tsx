// import { FunctionComponent, useMemo, useState, type CSSProperties } from "react";
// import Badge from "./Badge";
// import styles from "./FeaturedCards1.module.css";
// import { useNavigate } from "react-router-dom";
// import { useTheme } from "../ThemeContext";

// export type FeaturedCards1Type = {
//   className?: string;
//   image?: string;

//   /** Style props */
//   propWidth?: CSSProperties["width"];
//   propFlex?: CSSProperties["flex"];
//   propMinWidth?: CSSProperties["minWidth"];
//   text?: string;
//   name?: string
//   title?: string
// };

// const FeaturedCards1: FunctionComponent<FeaturedCards1Type> = ({
//   className = "",
//   propWidth,
//   propFlex,
//   propMinWidth,
//   title = '',
//   image, text = "Enabling next-gen digital expericence", name = ""
// }) => {
//   const navigate = useNavigate()
//   const featuredCards1Style: CSSProperties = useMemo(() => {
//     return {
//       width: propWidth,
//       flex: propFlex,
//       minWidth: propMinWidth,
//     };
//   }, [propWidth, propFlex, propMinWidth]);

//   const { isDarkTheme } = useTheme();


//   return (
//     <div
//       className={[styles.featuredCards, className].join(" ")}
//       style={featuredCards1Style}
//     >
//       <img className={styles.imageIcon} alt="" src={image} />
//       <div className={styles.featuredCardsInner}>
//         <div className={styles.badgeParent}>
//           <Badge
//             propAlignSelf="stretch"
//             propMixBlendMode="normal"
//             text={title}
//             propBackgroundColor="#f0f9ff"
//             propColor="#026aa2"
//           />
//           <div className={styles.enablingNextGenDigitalExpeParent}>
//             <h2 className={styles.enablingNextGenDigital}>
//               {title}
//             </h2>
//             <div className={styles.frameWrapper}>
//               <div className={styles.frameContainer} onClick={() => navigate(`/${name}`)}>
//                 <img
//                   className={styles.frameIcon}
//                   loading="lazy"
//                   alt=""
//                   src={isDarkTheme ? "/frame-5.svg" : '/frame-5-light.svg'}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedCards1;

import { FunctionComponent, useMemo, useState, type CSSProperties } from "react";
import Badge from "./Badge";
import styles from "./FeaturedCards1.module.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

export type FeaturedCards1Type = {
  className?: string;
  image?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propFlex?: CSSProperties["flex"];
  propMinWidth?: CSSProperties["minWidth"];
  text?: string;
  name?: string
  title?: string
};

const FeaturedCards1: FunctionComponent<FeaturedCards1Type> = ({
  className = "",
  propWidth,
  propFlex,
  propMinWidth,
  title = '',
  image, text = "Enabling next-gen digital expericence", name = ""
}) => {
  const navigate = useNavigate()
  const featuredCards1Style: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      flex: propFlex,
      minWidth: propMinWidth,
      cursor: 'pointer' // Add cursor pointer to indicate clickable element
    };
  }, [propWidth, propFlex, propMinWidth]);

  const { isDarkTheme } = useTheme();

  const handleCardClick = () => {
    navigate(`/${name}`);
  };

  return (
    <div
      className={[styles.featuredCards, className].join(" ")}
      style={featuredCards1Style}
      onClick={handleCardClick} // Add onClick to the entire card
    >
      <img className={styles.imageIcon} alt="" src={image} />
      <div className={styles.featuredCardsInner}>
        <div className={styles.badgeParent}>
          <Badge
            propAlignSelf="stretch"
            propMixBlendMode="normal"
            text={title}
            propBackgroundColor="#f0f9ff"
            propColor="#026aa2"
          />
          <div className={styles.enablingNextGenDigitalExpeParent}>
            <h2 className={styles.enablingNextGenDigital}>
              {title}
            </h2>
            <div className={styles.frameWrapper}>
              <div className={styles.frameContainer}>
                <img
                  className={styles.frameIcon}
                  loading="lazy"
                  alt=""
                  src={isDarkTheme ? "/frame-5.svg" : '/frame-5-light.svg'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCards1;