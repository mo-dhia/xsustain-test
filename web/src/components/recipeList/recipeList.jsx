import React from 'react';
import { Link } from 'react-router-dom';
import styles from './recipeList.module.css';

export default function RecipeList({ recipes }) {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Recipes</h1>
            <div className={styles.recipeContainer}>
                {!recipes.length ? (
                    <h1>No Recipe Found</h1>
                ) : (
                    recipes.map((element, index) => {
                        const randomNumber = Math.floor(Math.random() * 11);
                        return (
                            <Link
                                to={'/recipe/' + element._id}
                                key={index}
                                className={styles.recipeLink}
                            >
                                <div className={styles.recipeCard}>
                                    <h2 className={styles.recipeTitle}>{element.title}</h2>
                                    <p className={styles.recipeDescription}>{element.description}</p>
                                </div>
                                <img
                                    src={`../src/assets/images/plates/${randomNumber}.png`}
                                    className={styles.recipeImage}
                                />
                            </Link>
                        );
                    })
                )}
            </div>
        </section>
    );
}