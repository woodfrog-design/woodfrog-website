import { FunctionComponent, useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";
import styles from "./FrameComponent.module.css";
import ContactForm from "./ContactUs";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { BsList } from "react-icons/bs";
import HeaderComponet from "./HeaderComponent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export type FrameComponentType = {
  className?: string;
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
}) => {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (h1Ref.current) {
      const text = h1Ref.current.textContent || "";
      h1Ref.current.innerHTML = text
        .split(" ")
        .map(word => `<span style="display:inline-block; opacity: 0;">${word}</span>`)
        .join(" ");

      const spans = h1Ref.current.querySelectorAll("span");

      gsap.to(spans, {
        duration: 1,
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: h1Ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          markers: false // Set to true for debugging
        }
      });
    }
  }, []);

  const handleClick = () => {
    setIsModalVisible(true);
  };

  const handleBlog = () => {
    navigate("/blog");
  };

  let [show, setShow] = useState(false);

  const toggleEvent = (prestate: boolean) => {
    show = prestate;
    setShow(!show);
  };

  return (
    <>
      <div className={[styles.frameParent, className].join(" ")}>
        <HeaderComponet />
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.unlockInsightsFasterWithScParent}>
              <h1
                ref={h1Ref}
                className={styles.unlockInsightsFaster}
              >{`Unlock Insights Faster with Scalable Data Engineering & ML Solutions`}</h1>
              <h3 className={styles.transformComplexData}>
                Transform complex data into actionable insights with end-to-end
                analytics and machine learning solutions tailored to your business
                needs.
              </h3>
            </div>
            <div className={styles.heroButton} onClick={handleClick}>
              <div className={styles.heroButtonWrapper}>
                <div className={styles.aboutUs} >Let's Talk!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactForm isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </>
  );
};

export default FrameComponent;
