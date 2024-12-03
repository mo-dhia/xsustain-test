import { Link } from 'react-router-dom';
import styles from './hero.module.css';
import leftImg from '../../../../assets/images/Home/left.avif';
import centerImg from '../../../../assets/images/Home/main.png';
import rightImg from '../../../../assets/images/Home/right.jpg';
import leaf from '../../../../assets/images/backgrounds/0.png';
import leafTwo from '../../../../assets/images/backgrounds/1.png';
import leafThree from '../../../../assets/images/backgrounds/2.png';
import { BiCursorFill, HugeiconsFileAdd } from '../../../../components/svgs/svg';
import { useHeroLogic } from './hero.func';
import {  useRef } from 'react';

export default function Hero() {
    const slides = [useRef(null), useRef(null), useRef(null)];
    
    useHeroLogic(slides);

    return (
        <section className={styles.section}>
            <div className={styles.contentWrapper}>
                <h1>We provide the best recipes for you</h1>
                <p className={styles.description}>
                    Share Your Favorite Recipes, Tips. Browse through a vast collection of recipes from all over the world.
                    Whether you're looking for quick weeknight dinners,
                    decadent desserts, or healthy meals, you'll find it all here.
                </p>

                <div className={styles.buttonContainer}>
                    <Link to='/recipes' className={`${styles.button} ${styles.secondaryButton}`}>
                        <BiCursorFill className={styles.buttonIcon} /> Discover
                    </Link>
                    <Link to='/recipes' className={`${styles.button} ${styles.primaryButton}`}>
                        <HugeiconsFileAdd className={styles.buttonIcon} /> Create Recipe
                    </Link>
                </div>
            </div>
            <div className={styles.imageContainer}>
                <img src={leaf} className={`${styles.leaf} ${styles.topRight}`} />
                <img src={leafTwo} className={`${styles.leaf} ${styles.topLeft}`} />
                <img src={leafThree} className={`${styles.leaf} ${styles.bottomRight}`} />

                <div ref={slides[0]} className={`${styles.sideImageWrapper} ${styles.centerImageWrapper}`}>
                    <img src={centerImg} className={styles.image} />
                </div>
                <div ref={slides[1]} className={`${styles.sideImageWrapper} ${styles.leftImage}`}>
                    <img src={leftImg} className={styles.image} />
                </div>
                <div ref={slides[2]} className={`${styles.sideImageWrapper} ${styles.rightImage}`}>
                    <img src={rightImg} className={styles.image} />
                </div>
            </div>
        </section>
    );
}