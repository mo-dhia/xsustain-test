import React, { useEffect, useRef } from 'react'
import logo from '../../../assets/images/header/logo.png'
import { HugeiconsFileAdd, MingcuteSearchLine } from '../../svgs/svg'
import { Link } from 'react-router-dom'
import styles from './header.module.css'
import { useHeaderLogic } from './header.func.js'
import SidePanel from '../../sidePanel/sidePanel.jsx'

export default function Header() {
    const { 
        currentPage, 
        updateSelector, 
        links, 
        fields,
        handleSubmit,
        setSidePanel 
    } = useHeaderLogic()
    
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
                    <Link to="/recipes?search=" className={styles.searchInput}>
                        <MingcuteSearchLine className={styles.searchIcon} />
                        Search
                    </Link>
                </div>
                <button onClick={() => setSidePanel(true)} className={styles.createButton}>
                    <HugeiconsFileAdd /> Create Recipe
                </button>
            </div>

            <SidePanel title={'Create Recipe'} fields={fields} handleSubmit={handleSubmit} />
        </nav>
    )
}