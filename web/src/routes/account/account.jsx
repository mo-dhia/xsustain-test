import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { states } from '../../utils/store';
import SidePanel from '../../components/sidePanel/sidePanel';
import RecipeList from '../../components/recipeList/recipeList';
import { LineMdInstagram, MageFacebookSquare } from '../../components/svgs/svg';
import styles from './account.module.css';

export default function Account() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);

  const fields = [
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];

  const { user, setUser, setSidePanel } = states();

  const handleSubmit = (formData) => async (event) => {
    event.preventDefault();

    if (!formData.password || formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { data } = await axios.put(import.meta.env.VITE_API_URL + 'users/profile', formData, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setSidePanel(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (user?.token) {
      axios.get(import.meta.env.VITE_API_URL + 'users/profile', {
        headers: {
          Authorization: `Bearer ` + user.token
        }
      }).then(r => {
        const { user, createdRecipes, savedRecipes } = r.data;

        setSavedRecipes(savedRecipes);
        setCreatedRecipes(createdRecipes);
      });
    }
  }, [user]);

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
          <button onClick={() => setSidePanel(true)} className={styles.editButton}>Edit Profile</button>
          <button onClick={() => {
            setUser(null);
            localStorage.removeItem('user');
          }} className={styles.logoutButton}>Log out</button>
        </div>
      </div>

      <SidePanel title={'Edit Profile'} handleSubmit={handleSubmit} fields={fields} />

      <div className={styles.recipeListContainer}>
        <RecipeList recipes={createdRecipes} />
      </div>
    </div>
  );
}