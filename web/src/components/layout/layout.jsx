import React from 'react'
import Header from './header/header'

export default function Layout({ children }) {
    return <main style={{ margin: '0 5vw', minHeight: '100vh' }}>
        <Header />
        {children}
    </main>
}
