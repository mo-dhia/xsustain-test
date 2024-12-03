import React from 'react'
import { Link } from 'react-router-dom';

export default function RecipeList({ recipes }) {

    return <section style={{ margin: '7.5vw 0' }}>
        <h1 style={{ fontSize: '5vw', textAlign: 'center' }}>Recipes</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5vw 2vw', marginTop: '7.5vw' }}>
            {!recipes.length ? <h1>No Recipe Found</h1> : recipes.map((element, index) => {
                const randomNumber = Math.floor(Math.random() * 11);
                return <Link to={'/recipe/' + element._id} key={index} style={{
                    width: 'calc((100% / 4) - (2vw * 0.75))', height: '30vw', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative'

                }}>
                    <div style={{
                        width: '100%', height: '80%', background: 'var(--bg-elevated)', borderTopRightRadius: '1vw', borderTopLeftRadius: '4vw', borderBottomRightRadius: '4vw', borderBottomLeftRadius: '1vw',
                        position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2vw', overflow: 'hidden'
                    }}>
                        <h2 style={{ marginTop: '60%', fontWeight: 'bolder', fontSize: '1.7vw', textAlign: 'center' }}>{element.title}</h2>
                        <p style={{ marginTop: '2vw', fontSize: '1.2vw', color: 'var(--t-secondary)', textAlign: 'center', lineHeight: '1.5', whiteSpace: 'balance' }}>{element.description}</p>
                    </div>
                    <img src={`../src/assets/images/plates/${randomNumber}.png`}
                        style={{ width: '17.5vw', height: '17.5vw', objectFit: 'contain', objectPosition: 'center', position: 'absolute', top: '-2vw' }} />
                </Link>
            })}
        </div>
    </section>
}
