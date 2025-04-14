import { FunctionComponent } from "react";
import Badge from "./Badge";
import styles from "./HorizontalTabs.module.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

export type HorizontalTabsType = {
    className?: string;
};

const HorizontalTabs: FunctionComponent<HorizontalTabsType> = ({
    className = "",
}) => {
    const navigate = useNavigate(); // Initialize navigate hook
    const { isDarkTheme } = useTheme(); // Get the current theme state and toggle function
    const BackLogo = isDarkTheme ? '/back-arrow.svg' : '/back-arrow-light.svg';
    return (
        <div className={[styles.horizontalTabs, className].join(" ")}>
            <div className={styles.frameParent}>
                <div className={styles.frameGroup}>
                    <img className={styles.frameIcon} alt="" src={BackLogo}
                        onClick={() => navigate(-1)} // Navigate back on click
                        style={{ cursor: "pointer" }} // Add pointer cursor for better UX
                    />
                    <div className={styles.insurance}>Insurance/</div>
                </div>
                <div className={styles.theEvolutionAnd}>
                    The Evolution and Impact of Generative AI: Shaping the Future of
                    Technology
                </div>
            </div>
            <div className={styles.badgeParent}>
                <Badge
                    propAlignSelf="unset"
                    propMixBlendMode="unset"
                    text="Artifical Intelligence"
                    propBackgroundColor="#c1f8d7"
                    propColor="#037a48"
                    textTextDecoration="unset"
                />
                <Badge
                    propAlignSelf="unset"
                    propMixBlendMode="normal"
                    text="Machine Learning"
                    propBackgroundColor="#f0f9ff"
                    propColor="#026aa2"
                    textTextDecoration="unset"
                />
                <Badge
                    propAlignSelf="unset"
                    propMixBlendMode="normal"
                    text="Deep Learning"
                    propBackgroundColor="#fffaeb"
                    propColor="#b64708"
                    textTextDecoration="unset"
                />
                <Badge
                    propAlignSelf="unset"
                    propMixBlendMode="normal"
                    text="Natural Language Processing"
                    propBackgroundColor="#f4f3ff"
                    propColor="#5925dc"
                    textTextDecoration="unset"
                />
                <Badge
                    propAlignSelf="unset"
                    propMixBlendMode="normal"
                    text="Computer Vision"
                    propBackgroundColor="#fdf2fa"
                    propColor="#c11574"
                    textTextDecoration="unset"
                />
                <Badge
                    propAlignSelf="unset"
                    propMixBlendMode="normal"
                    text="Cloud"
                    propBackgroundColor="#fdf2fa"
                    propColor="#c11574"
                    textTextDecoration="unset"
                />
            </div>
            <div className={styles.generativeAiAContainer}>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>
                            {" "}
                            Generative AI: A Game Changer in Artificial Intelligence
                        </span>
                    </span>
                </p>
                <p className={styles.blankLine}>
                    <span>
                        <span>&nbsp;</span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>
                            Generative AI, or Gen AI, refers to systems that can create new
                            content, from text and images to music and even code. Unlike
                            traditional AI, which focuses on pattern recognition and
                            predictions based on existing data, Gen AI models can generate
                            entirely new and original outputs by learning the underlying
                            structures of the data they’re trained on.
                        </span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>&nbsp;</span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span> How Does Generative AI Work?</span>
                    </span>
                </p>
                <p className={styles.blankLine}>
                    <span>
                        <span>&nbsp;</span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>
                            The core technology behind Gen AI is deep learning, especially
                            techniques like Generative Adversarial Networks (GANs) and
                            transformers (like GPT). These models are trained on vast amounts
                            of data and can mimic patterns to produce creative outputs that
                            closely resemble human-generated content.
                        </span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>&nbsp;</span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>
                            For example, GPT models (such as ChatGPT) can generate coherent
                            text, while DALL·E or Midjourney can create realistic images from
                            textual descriptions.
                        </span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>&nbsp;</span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span> Real-World Applications</span>
                    </span>
                </p>
                <p className={styles.blankLine}>
                    <span>
                        <span>&nbsp;</span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>
                            Gen AI is reshaping industries by offering innovative solutions,
                            including:
                        </span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>
                            - Content Creation: Automating blog writing, social media posts,
                            and marketing materials.
                        </span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>- Design: Generating unique images, logos, and videos.</span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>
                            - Healthcare: Assisting in drug discovery by generating potential
                            molecular compounds.
                        </span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>
                            - Customer Service: Powering chatbots that can handle more
                            complex, human-like conversations.
                        </span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>&nbsp;</span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span> Challenges and Ethical Considerations</span>
                    </span>
                </p>
                <p className={styles.blankLine}>
                    <span>
                        <span>&nbsp;</span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>Despite its potential, Gen AI comes with challenges:</span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>
                            - Misinformation: The ease of creating fake but convincing content
                            raises concerns about deepfakes and misleading information.
                        </span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>
                            - Bias: AI models trained on biased data can replicate and amplify
                            those biases.
                        </span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>
                            - Intellectual Property: The line between inspiration and
                            infringement is often blurred when AI generates content based on
                            existing works.
                        </span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>&nbsp;</span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span> The Future of Generative AI</span>
                    </span>
                </p>
                <p className={styles.blankLine}>
                    <span>
                        <span>&nbsp;</span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>
                            As the technology evolves, generative AI is likely to become even
                            more integrated into creative and professional workflows. Its
                            ability to augment human creativity and automate complex tasks
                            makes it a promising tool, but with the power it holds,
                            responsible development and ethical guidelines are crucial.
                        </span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>&nbsp;</span>
                    </span>
                </p>
                <p className={styles.generativeAiAGameChanger}>
                    <span>
                        <span>
                            In conclusion, Gen AI is a transformative technology that holds
                            vast potential for various industries. However, its development
                            must be carefully managed to address ethical and societal
                            concerns.
                        </span>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default HorizontalTabs;
