import React, { useEffect, useState } from 'react'
import { LineMdClose, LineMdInstagram, MageFacebookSquare } from '../svgs/svg'
import axios from 'axios';
import { states } from '../../store';
import RecipeList from '../recipes/subComps/list';
import SidePanel from '../sidePanel/sidePanel';

export default function Account() {
  const [savedRecipes, setSavedRecipes] = useState([])
  const [createdRecipes, setCreatedRecipes] = useState([])


  const fields = [
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];


  const { user, setUser, setSidePanel } = states()



  const handleSubmit = (formData) => async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
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
      setSidePanel(false)
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("An error occurred while submitting the form.");
    }
  };

  useEffect(() => {
    if (user?.token) {
      axios.get(import.meta.env.VITE_API_URL + 'users/profile', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGUxMmUxNGQ2ZThlMDg3NzhhMWE4NCIsImlhdCI6MTczMzE2OTg4OSwiZXhwIjoxNzM1NzYxODg5fQ.C1LAp_yfmkR8n2J683rF-e7ugoeDd6LZsbfTPbys0M0`
        }
      }).then(r => {
        const { user, createdRecipes, savedRecipes } = r.data

        setSavedRecipes(savedRecipes)
        setCreatedRecipes(createdRecipes)
      })
    }

  }, [user])

  return <div style={{ height: '100%', position: 'relative', width: '100%', }}>
    <div style={{ width: '100%', marginTop: '7.5vw', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', gap: '2vw', alignItems: 'center' }}>
          <img src='../src/assets/images/user/user.jpg' style={{ width: '20vw', height: '20vw', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3vw' }}>
            <h1 style={{ fontSize: '4vw' }}>Med D. Bouthouri</h1>
            <div style={{ width: '100%', height: '3vw' }}>
              <LineMdInstagram style={{ height: '3vw', width: '3vw' }} />
              <MageFacebookSquare style={{ height: '3vw', width: '3vw' }} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1vw', justifyContent: 'center' }}>
        <button onClick={() => setSidePanel(true)} style={{ width: '12vw', height: '4vw', background: 'var(--ac-primary)', fontSize: '1.5vw', color: 'var(--t-highlight)', borderTopLeftRadius: '1.5vw', borderBottomRightRadius: '1.5vw', borderTopRightRadius: '.5vw', borderBottomLeftRadius: '.5vw' }}>Edit Profile</button>
        <button onClick={() => {
          setUser(null);
          localStorage.removeItem('user');
        }} style={{ background: 'brown', width: '12vw', height: '4vw', fontSize: '1.5vw', color: 'var(--t-highlight)', borderTopLeftRadius: '1.5vw', borderBottomRightRadius: '1.5vw', borderTopRightRadius: '.5vw', borderBottomLeftRadius: '.5vw' }}>Log out</button>
      </div>
    </div>

    <SidePanel title={'Edit Profile'} handleSubmit={handleSubmit} fields={fields} />


    <div style={{ marginTop: '15vw' }}>
      <RecipeList recipes={createdRecipes} />
    </div>

  </div>
}
