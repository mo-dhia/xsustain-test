import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IcRoundStar, MynauiStar, LineMdEditFullFilled, IcRoundDelete, LineMdArrowLeft } from '../../components/svgs/svg';
import SidePanel from '../../components/sidePanel/sidePanel';
import { useNavigate } from 'react-router-dom';
import { states } from '../../utils/store';


export default function RecipePreview() {
    const [recipe, setRecipe] = useState(null)
    const { user, setUser, setSidePanel } = states()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = window.location.href;
                const id = url.split('/').pop();
                console.log(id);

                const { data } = await axios.get('http://localhost:5000/api/recipe/' + id);
                setRecipe(data.data)
            } catch (error) {
                console.error('Error fetching the recipe:', error);
            }
        };

        fetchData();
    }, []);

    const fields = [
        { label: "Title", name: "title", type: "text" },
        { label: "Description", name: "description", type: "textarea" },
    ];

    const randomImageIndex = Math.floor(Math.random() * 4)




    const handleSubmit = (formData) => async (event) => {
        event.preventDefault();



        try {
            const { data } = await axios.put(import.meta.env.VITE_API_URL + 'recipe/' + recipe._id, formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            setRecipe(data.data)
            setSidePanel(false)
        } catch (error) {
            console.error("Error submitting form:", error);
            // alert("An error occurred while submitting the form.");
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(import.meta.env.VITE_API_URL + 'recipe/' + recipe._id, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setSidePanel(false)
            navigate(-1)
        } catch (error) {
            console.error("Error deleting recipe:", error);
            // alert("An error occurred while deleting.");
        }
    }
    const mockNutrition = { protein: '45g', carbs: '50g', fats: '40g', sugar: '2g', fiber: '3g' }


    return <div style={{ margin: '5vw 0', position: 'relative', zIndex: 1,  }}>
        <button onClick={() => navigate(-1)} style={{ marginBottom: '2vw', display: 'flex', height: '2vw', alignItems: 'center', gap: '1vw' }}>
            <LineMdArrowLeft style={{ height: '2vw', width: '2vw', color: 'var(--ac-primary)' }} />
            <strong style={{ fontSize: '2vw', color: 'var(--ac-primary)' }}>Back</strong>
        </button>
        {!recipe ? <h1>Loading</h1> : <div style={{ width: '100%', display: 'flex' }}>
            <SidePanel title={'Edit Recipe'} fields={fields} handleSubmit={handleSubmit} />
            <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '2.5vw' }}>{recipe.title}</h1>
                <div style={{ marginTop: '.5vw', display: 'flex', alignItems: 'center' }}>
                    {Array.from({ length: 5 }, (_, index) => index >= recipe.rating?.average ? <MynauiStar key={index} style={{ width: '1.6vw', height: '1.6vw', color: 'var(--bg-highlight)' }} /> : <IcRoundStar key={index} style={{ width: '2vw', height: '2vw', color: 'var(--bg-highlight)' }} />)}
                    <span style={{ marginLeft: '1vw', fontSize: '1.25vw', color: 'var(--bg-highlight)' }}>( {recipe.rating?.count || 0} )</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '4vw', height: '4vw' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5vw' }}>
                        <strong style={{ fontSize: '2.5vw' }}>{recipe?.ingredients?.length || 0}</strong>
                        <p style={{ fontSize: '1vw', textTransform: 'uppercase' }}>ingredients</p>
                    </div>
                    <div style={{ width: "1px", height: '80%', background: 'var(--t-primary)', margin: '0 3vw' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5vw' }}>
                        <strong style={{ fontSize: '2.5vw' }}>{(recipe?.prepTime + recipe?.cookTime) || 0}</strong>
                        <p style={{ fontSize: '1vw', textTransform: 'uppercase' }}>minutes</p>
                    </div>
                    <div style={{ width: "1px", height: '80%', background: 'var(--t-primary)', margin: '0 3vw' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5vw' }}>
                        <strong style={{ fontSize: '2.5vw' }}>720</strong>
                        <p style={{ fontSize: '1vw', textTransform: 'uppercase' }}>calories</p>
                    </div>
                </div>

                <div style={{ marginTop: '4vw' }}>
                    <div style={{
                        background: 'var(--bg-highlight)', textTransform: 'uppercase', display: 'inline-block', padding: '.5vw 1vw', fontSize: '1.2vw', fontWeight: 'bold',
                        borderRadius: '1vw .5vw 1vw .5vw'
                    }}>
                        nutrition
                    </div>

                    <div style={{ display: 'flex', marginTop: '1vw', gap: '1vw' }}>
                        {Object.entries(mockNutrition).map((element, index) => {
                            const [key, value] = element

                            return <div key={index} style={{ marginTop: '2vw', width: '4vw', height: '4vw', borderRadius: '50%', background: '#D28A56', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <strong style={{ fontSize: '1.1vw' }}>{value}</strong>
                                <p style={{ fontSize: '.8vw' }}>{key}</p>
                            </div>
                        })}
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '-2vw' }}>
                {recipe.author._id === user._id && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', }}>
                    <div style={{ display: 'flex', gap: '.5vw', marginBottom: '1vw' }}>
                        <button onClick={() => setSidePanel(true)} style={{
                            width: '3vw', height: '3vw', background: 'var(--ac-primary)', fontSize: '1.5vw', borderRadius: '1vw .5vw 1vw .5vw'

                        }}>
                            <LineMdEditFullFilled style={{ color: 'var(--bg-base)', width: '50%', height: '50%' }} />
                        </button>
                        <button onClick={handleDelete} style={{
                            width: '3vw', height: '3vw', background: 'brown', fontSize: '1.5vw', borderRadius: '1vw .5vw 1vw .5vw'

                        }}>
                            <IcRoundDelete style={{ color: 'var(--bg-base)', width: '50%', height: '50%' }} />
                        </button>
                    </div>
                </div>}
                <img src={`../src/assets/images/kitchen/${randomImageIndex}.webp`} style={{ width: '40vw', height: 'auto', objectFit: 'contain', borderRadius: '3vw 1vw 3vw 1vw' }} />
            </div>
        </div>}
    </div>;
}
