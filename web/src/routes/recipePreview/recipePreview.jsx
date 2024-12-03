import React from 'react';
import styles from './recipePreview.module.css';
import { useRecipePreviewLogic } from './recipePreview.func';
import { IcRoundStar, MynauiStar, LineMdEditFullFilled, IcRoundDelete, LineMdArrowLeft } from '../../components/svgs/svg';
import SidePanel from '../../components/sidePanel/sidePanel';

export default function RecipePreview() {
    const {
        recipe,
        user,
        navigate,
        handleSubmit,
        handleDelete,
        setSidePanel,
        randomImageIndex,
        fields,
        stats,
        sections
    } = useRecipePreviewLogic();

    if (!recipe) return <h1>Loading</h1>;

    return (
        <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
                <LineMdArrowLeft className={styles.backIcon} />
                <strong className={styles.backText}>Back</strong>
            </button>

            <div className={styles.content}>
                <SidePanel title={'Edit Recipe'} fields={fields} handleSubmit={handleSubmit} />

                <div className={styles.mainSection}>
                    <div className={styles.titleSection}>
                        <strong>{recipe.title}</strong>
                        <span className={styles.separator}>-</span>
                        <strong className={styles.mealType}>{recipe.mealType}</strong>
                    </div>

                    <div className={styles.ratingSection}>
                        {Array.from({ length: 5 }, (_, index) => (
                            index >= recipe.rating?.average
                                ? <MynauiStar key={index} className={styles.emptyStar} />
                                : <IcRoundStar key={index} className={styles.star} />
                        ))}
                        <span className={styles.ratingCount}>( {recipe.rating?.count || 0} )</span>
                    </div>

                    <div className={styles.statsContainer}>
                        {stats.map((stat, index) => (
                            <React.Fragment key={index}>
                                <div className={styles.statItem}>
                                    <strong className={styles.statValue}>{stat.value}</strong>
                                    <p className={styles.statLabel}>{stat.label}</p>
                                </div>
                                {index < stats.length - 1 && <div className={styles.statDivider} />}
                            </React.Fragment>
                        ))}
                    </div>

                    <p className={styles.description}>{recipe.description}</p>

                    {sections.map((section, index) => (
                        <div key={index} className={styles.section}>
                            <div className={styles.sectionTitle}>{section.title}</div>
                            {section.title === 'nutrition' ? (
                                <div className={styles.nutritionGrid}>
                                    {section.content.map(([key, value], idx) => (
                                        <div key={idx} className={styles.nutritionItem}>
                                            <strong className={styles.nutritionValue}>{value}</strong>
                                            <p className={styles.nutritionLabel}>{key}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <ul className={styles.list}>
                                    {section.content.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.imageSection}>
                    {recipe.author._id === user._id && (
                        <div className={styles.actionButtons}>
                            <button onClick={() => setSidePanel('Create Recipe')} className={`${styles.actionButton} ${styles.editButton}`}>
                                <LineMdEditFullFilled className={styles.actionIcon} />
                            </button>
                            <button onClick={handleDelete} className={`${styles.actionButton} ${styles.deleteButton}`}>
                                <IcRoundDelete className={styles.actionIcon} />
                            </button>
                        </div>
                    )}
                    <img
                        src={`../src/assets/images/kitchen/${randomImageIndex}.webp`}
                        className={styles.recipeImage}
                        alt={recipe.title}
                    />
                </div>
            </div>
        </div>
    );
}