import { useState } from 'react'
import { useLocation } from "react-router-dom"
import links from './links.json'

export const useHeaderLogic = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(-1)

    const updateSelector = (linksContainer, selector) => {
        if (!linksContainer.current) return;

        const pageIndex = links.findIndex(link => location.pathname === link.route)
        setCurrentPage(pageIndex)

        if (pageIndex !== -1) {
            const { offsetLeft, clientWidth } = linksContainer.current.children[pageIndex]

            if (selector.current) {
                selector.current.style.opacity = 1
                selector.current.style.transform = `translateX(${offsetLeft}px)`
                selector.current.style.width = `${clientWidth}px`
            }
        }
    }

    return {
        currentPage,
        updateSelector,
        links
    }
}