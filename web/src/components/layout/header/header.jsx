import React, { useEffect, useRef } from 'react'
import logo from '../../../assets/images/header/logo.png'
import { HugeiconsFileAdd, MingcuteSearchLine } from '../../svgs/svg'
import { Link } from 'react-router-dom'
import styles from './header.module.css'
import { useHeaderLogic } from './header.func.js'

export default function Header() {
    const { currentPage, updateSelector, links } = useHeaderLogic()
    const linksContainer = useRef(null)
    const selector = useRef(null)

    useEffect(() => {
        updateSelector(linksContainer, selector)
    }, [updateSelector]);

    return (
        <nav className={styles.nav}>
            <div className={styles.greenBox} />
            <div className={styles.logoContainer}>
                <img className={styles.logo} src={logo} />
                <div ref={linksContainer} className={styles.linksContainer}>
                    {links.map((link, i) => (
                        <Link
                            to={link.route}
                            key={i}
                            className={`${styles.link} ${currentPage === i ? styles.activeLink : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div ref={selector} className={styles.selector} />
                </div>
            </div>

            <div className={styles.rightContainer}>
                <div className={styles.searchContainer}>
                    <input type='text' placeholder='Search' className={styles.searchInput} />
                    <MingcuteSearchLine className={styles.searchIcon} />
                </div>
                <button className={styles.createButton}>
                    <HugeiconsFileAdd /> Create Recipe
                </button>
            </div>
        </nav>
    )
}