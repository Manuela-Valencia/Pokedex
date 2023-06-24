import { useRef } from "react"
import { setTrainerNameG } from "../slices/trainerName.slice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import '../pages/stylesP/home.css'

const Home = () => {

   const trainerNameRef = useRef()

   const navigate = useNavigate()

   const dispatch = useDispatch()

    const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerNameG(trainerNameRef.current.value.trim()))
    navigate('/pokedex')
}

  return (
    <div className="home_container">
      <section className="home_subcontainer">
        <h1 className="home_title">Pokédex</h1>
        <h2 className="home_saludo">Hi Trainer!</h2>
        <p className="home_parrafo">To start in this application, please, give me your trainer name.</p>
        <form className="home_formulario" onSubmit={handleSubmit} >
            <input className="home_input" ref={trainerNameRef} type="text" />
            <button className="home_btn">Catch them all!</button>
        </form>
    </section>
    </div>
    
  )
}

export default Home