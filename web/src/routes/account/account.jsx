import React from 'react';
import SidePanel from '../../components/sidePanel/sidePanel';
import RecipeList from '../../components/recipeList/recipeList';
import { LineMdInstagram, MageFacebookSquare } from '../../components/svgs/svg';
import styles from './account.module.css';
import { useAccountLogic } from './accout.func';

export default function Account() {
  const { savedRecipes, createdRecipes, handleSubmit, setUser, setSidePanel } = useAccountLogic();

  const fields = [
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <div className={styles.profile}>
            <img src='../src/assets/images/user/user.jpg' className={styles.profileImage} />
            <div className={styles.profileInfo}>
              <h1 className={styles.profileName}>Med D. Bouthouri</h1>
              <div className={styles.socialIcons}>
                <LineMdInstagram className={styles.icon} />
                <MageFacebookSquare className={styles.icon} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={() => setSidePanel('Edit Profile')} className={styles.editButton}>Edit Profile</button>
          <button onClick={() => {
            setUser(null);
            localStorage.removeItem('user');
          }} className={styles.logoutButton}>Log out</button>
        </div>
      </div>

      <SidePanel title={'Edit Profile'} handleSubmit={handleSubmit} fields={fields} />

      <div className={styles.recipeListContainer}>
        {!createdRecipes?.length ? null : <RecipeList recipes={createdRecipes} />}
      </div>
    </div>
  );
}