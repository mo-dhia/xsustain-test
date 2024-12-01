import React from 'react'
import Header from './header/header'

export default function Layout({ children }) {
    return <main style={{ margin: '0 5vw' }}>
        <Header />
        {children}
    </main>
}
