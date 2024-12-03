import { useEffect } from 'react';
import styles from './hero.module.css'

export const useHeroLogic = (slides) => {
    useEffect(() => {
        let count = 0;
        const totalSlides = slides.length;

        const interval = setInterval(() => {
            slides.forEach((slide, index) => {
                if (index === count) {
                    slide.current.className = `${styles.sideImageWrapper} ${styles.centerImageWrapper}`;
                } else if (index === (count + totalSlides - 1) % totalSlides) {
                    slide.current.className = `${styles.sideImageWrapper} ${styles.rightImage}`;
                } else if (index === (count + 1) % totalSlides) {
                    slide.current.className = `${styles.sideImageWrapper} ${styles.leftImage}`;
                } else {
                    slide.current.className = `${styles.sideImageWrapper}`;
                }
            });

            count = (count - 1 + totalSlides) % totalSlides; 
        }, 2000);

        return () => clearInterval(interval);
    }, [slides]);
}