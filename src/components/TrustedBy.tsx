import { FunctionComponent, useEffect, useState, useRef } from "react";
import styles from "./TrustedBy.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import { useTheme } from "../ThemeContext";
import gsap from "gsap";
//import { initializeAnimations } from '../Utils/animations';

export type TrustedByType = {
  className?: string;
};

const TrustedBy: FunctionComponent<TrustedByType> = ({ className = "" }) => {
  const trustedByRef = useRef<HTMLHeadingElement>(null);
  
  //useEffect(() => {
  //  initializeAnimations();
  //}, []);
  const defaultImg = ['/vector-1.svg', '/altysysfinallogo11sep24en439x1621@2x.png', '/golgix-logo@2x.png', '/group.svg', '/greenlightcyberhorizontalreversed@2x.png',
    '/DS-LOGO.svg', '5-data.png', '/knowitall-logo.png'
  ];
  const defaultImgLight = ['/company/Vector.svg', '/company/Altysys-Final-Logo-11Sep24-e-n-439x162-1.svg', '/company/Golgix_Logo.svg', '/company/_Group_.svg', '/company/GreenlightCyber-Horizontal-Reversed.svg',
    '/company/DS-logo.svg', '/company/image_18.svg', '/company/knowitall-logo.svg'
  ];
  const [trustedByImages, setTrustedByImages] = useState(defaultImg);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    if (isDarkTheme) {
      setTrustedByImages(defaultImg);
    } else {
      setTrustedByImages(defaultImgLight);
    }
  }, [isDarkTheme])

  useEffect(() => {
    if (trustedByRef.current) {
      gsap.from(trustedByRef.current, {
        scrollTrigger: {
          trigger: trustedByRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <section className={[styles.trustedBy].join(' ')} >
      <h1 ref={trustedByRef} className={styles.trustedByHeading}>Trusted by</h1>
      <div className={['row', 'justify-content-center'].join(' ')}>
        {
          trustedByImages.map((im, index) => (
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 g-0 p-0 mb-1 p-2" key={index}>
              <div className={styles.trustedByBox} >
                <img
                  key={index * Math.random() + 10}
                  loading="lazy"
                  alt=""
                  src={im}
                />
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
  /*  return (
     <section className={[styles.trustedBy, className].join(" ")}>
       <div className={styles.title}>
         <h1 className={styles.trustedBy1}>Trusted by</h1>
       </div>
       <div className={styles.logos}>
         <img
           className={styles.imagesIcon}
           loading="lazy"
           alt=""
           src="/vector-1.svg"
         />
       </div>
       <div className={styles.logos1}>
         <img
           className={styles.altysysFinalLogo11sep24ENIcon}
           loading="lazy"
           alt=""
           src="/altysysfinallogo11sep24en439x1621@2x.png"
         />
       </div>
       <div className={styles.logos2}>
         <img
           className={styles.altysysFinalLogo11sep24ENIcon}
           loading="lazy"
           alt=""
           src="/golgix-logo@2x.png"
         />
       </div>
       <div className={styles.logos3}>
         <img
           className={styles.groupIcon}
           loading="lazy"
           alt=""
           src="/group.svg"
         />
       </div>
       <div className={styles.logos4}>
         <img
           className={styles.greenlightcyberHorizontalRevIcon}
           loading="lazy"
           alt=""
           src="/greenlightcyberhorizontalreversed@2x.png"
         />
       </div>
       <div className={styles.logos5}>
         <img
           className={styles.dsLogoIcon}
           loading="lazy"
           alt=""
           src="/dslogo@2x.png"
         />
       </div>
       <div className={styles.logos6}>
         <img
           className={styles.altysysFinalLogo11sep24ENIcon}
           loading="lazy"
           alt=""
           src="/image-18@2x.png"
         />
       </div>
       <div className={styles.logos7}>
         <img
           className={styles.altysysFinalLogo11sep24ENIcon}
           loading="lazy"
           alt=""
           src="/knowitalllogo@2x.png"
         />
       </div>
     </section>
   ); */
};

export default TrustedBy;
