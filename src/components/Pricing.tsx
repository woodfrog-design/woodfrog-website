// import { FunctionComponent, useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import styles from "./Pricing.module.css";
// import ContactForm from "./ContactUs";
// import { useTheme } from "../ThemeContext";

// gsap.registerPlugin(ScrollTrigger);

// export type PricingType = {
//   className?: string;
// };

// const Pricing: FunctionComponent<PricingType> = ({ className = "" }) => {
//   const { isDarkTheme } = useTheme();
//   const cardsRef = useRef<HTMLDivElement[]>([]);

//   useEffect(() => {
//     cardsRef.current.forEach((card, index) => {
//       gsap.fromTo(
//         card,
//         { opacity: 0 },
//         {
//           opacity: 1,
//           duration: 1,
//           delay: index * 0.2,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: card,
//             start: "top 80%",
//             toggleActions: "play none none none",
//           },
//         }
//       );
//     });
//   }, []);

//   return (
//     <section className={[styles.pricing, className].join(" ")}>
//       <div className={styles.container}>
//         <h1 className={styles.whyChoseUs}>Why Chose Us</h1>
//       </div>
//       <div className={styles.content}>
//         <div className={styles.features}>
//           {[
//             {
//               title: "Comprehensive End-to-End Solutions",
//               description:
//                 "Our expert team delivers integrated data engineering, analytics, machine learning (ML), and large language model (LLM) services. From data collection to insights and implementation, we cover every aspect of your data journey.",
//               imgSrc: isDarkTheme ? "/vector-2.svg" : "/choose/vector-2.svg",
//             },
//             {
//               title: "Expert Data Product Development",
//               description:
//                 "Transform raw data into actionable insights and measurable business outcomes. Our data product development expertise empowers you to make informed decisions, drive growth, and stay ahead of the competition.",
//               imgSrc: isDarkTheme ? "/frame-9.svg" : "/choose/frame-9.svg",
//             },
//             {
//               title: "Seamless Digital Transformation",
//               description:
//                 "Fully digitalize your data ecosystem with our expert guidance. Enhance efficiency, scalability, and decision-making while minimizing manual processes and reducing operational costs.",
//               imgSrc: isDarkTheme ? "/frame-10.svg" : "/choose/frame-10.svg",
//             },
//             {
//               title: "Unmatched ROI",
//               description:
//                 "Enjoy competitive pricing without sacrificing quality. Our cost-effective solutions maximize your return on investment (ROI), balancing affordability with exceptional results.",
//               imgSrc: isDarkTheme ? "/frame-8.svg" : "/choose/frame-8.svg",
//             },
//             {
//               title: "Timely Delivery and Support",
//               description:
//                 "Experience our commitment to on-time project completion and dedicated support. Our experienced professionals ensure smooth execution, addressing concerns and ensuring seamless integration.",
//               imgSrc: isDarkTheme ? "/frame-11.svg" : "/choose/frame-11.svg",
//             },
//             {
//               title: "Personalized Attention",
//               description:
//                 "Receive tailored solutions that address your unique business needs and challenges. Our collaborative approach aligns with your goals, delivering customized results that drive success.",
//               imgSrc: isDarkTheme ? "/frame-12.svg" : "/choose/frame-12.svg",
//             },
//           ].map((feature, index) => (
//             <div
//               key={index}
//               className={styles.list1}
//               ref={(el) => (cardsRef.current[index] = el!)}
//             >
//               <div className={styles.items}>
//                 <img
//                   className={styles.frameIcon}
//                   loading="lazy"
//                   alt=""
//                   src={feature.imgSrc}
//                 />
//               </div>
//               <div className={styles.unmatchedRoiParent}>
//                 <h3 className={styles.comprehensiveEndToEndSolut}>
//                   {feature.title}
//                 </h3>
//                 <div className={styles.ourExpertTeam}>
//                   {feature.description}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className={styles.buttonContainer}>
//           <div className={styles.buttonWrapper}>
//             <div className={styles.pOCButton}>
//               <div className={styles.getAFree}>Get a Free POC</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Pricing;

import { FunctionComponent, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Pricing.module.css";
import ContactForm from "./ContactUs"; // Import the Contact Form
import { useTheme } from "../ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export type PricingType = {
  className?: string;
};

const Pricing: FunctionComponent<PricingType> = ({ className = "" }) => {
  const { isDarkTheme } = useTheme();
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal state

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);
  const handleformscroll = ()=>{
    // Scroll to the 'bikeDetails' section after navigation
    setTimeout(() => {
      const formscroll = document.getElementById('formdata-anchor');
      if (formscroll) {
        formscroll.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0); 
  }

  return (
    <section className={[styles.pricing, className].join(" ")}>
      <div className={styles.container}>
        <h1 className={styles.whyChoseUs}>Why Choose Us</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.features}>
          {[
            {
              title: "Comprehensive End-to-End Solutions",
              description:
                "Our expert team delivers integrated data engineering, analytics, machine learning (ML), and large language model (LLM) services. From data collection to insights and implementation, we cover every aspect of your data journey.",
              imgSrc: isDarkTheme ? "/vector-2.svg" : "/choose/vector-2.svg",
            },
            {
              title: "Expert Data Product Development",
              description:
                "Transform raw data into actionable insights and measurable business outcomes. Our data product development expertise empowers you to make informed decisions, drive growth, and stay ahead of the competition.",
              imgSrc: isDarkTheme ? "/frame-9.svg" : "/choose/frame-9.svg",
            },
            {
              title: "Seamless Digital Transformation",
              description:
                "Fully digitalize your data ecosystem with our expert guidance. Enhance efficiency, scalability, and decision-making while minimizing manual processes and reducing operational costs.",
              imgSrc: isDarkTheme ? "/frame-10.svg" : "/choose/frame-10.svg",
            },
            {
              title: "Unmatched ROI",
              description:
                "Enjoy competitive pricing without sacrificing quality. Our cost-effective solutions maximize your return on investment (ROI), balancing affordability with exceptional results.",
              imgSrc: isDarkTheme ? "/frame-8.svg" : "/choose/frame-8.svg",
            },
            {
              title: "Timely Delivery and Support",
              description:
                "Experience our commitment to on-time project completion and dedicated support. Our experienced professionals ensure smooth execution, addressing concerns and ensuring seamless integration.",
              imgSrc: isDarkTheme ? "/frame-11.svg" : "/choose/frame-11.svg",
            },
            {
              title: "Personalized Attention",
              description:
                "Receive tailored solutions that address your unique business needs and challenges. Our collaborative approach aligns with your goals, delivering customized results that drive success.",
              imgSrc: isDarkTheme ? "/frame-12.svg" : "/choose/frame-12.svg",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={styles.list1}
              ref={(el) => (cardsRef.current[index] = el!)}
            >
              <div className={styles.items}>
                <img
                  className={styles.frameIcon}
                  loading="lazy"
                  alt=""
                  src={feature.imgSrc}
                />
              </div>
              <div className={styles.unmatchedRoiParent}>
                <h3 className={styles.comprehensiveEndToEndSolut}>
                  {feature.title}
                </h3>
                <div className={styles.ourExpertTeam}>
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonWrapper}>
            <div className={styles.pOCButton} onClick={() => setIsModalVisible(true)}>
              <div onClick={handleformscroll} className={styles.getAFree}>Get a Free POC</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Form Modal */}
      <ContactForm isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </section>
  );
};

export default Pricing;
