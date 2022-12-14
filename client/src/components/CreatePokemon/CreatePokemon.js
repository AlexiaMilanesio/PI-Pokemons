import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getAllTypes } from "../../redux/actions/actions";
import validation from "./Validation";
import NavBar from "../Header/NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./CreatePokemon.css";

const CreatePokemon = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    hp: "",
    attack: "", 
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  });

  
  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);


  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "text" ? value.toLowerCase()
            : type !== "checkbox" ? value 
            : !formData.types.includes(value) ? formData.types.push(value)
            : formData.types.splice(formData.types.indexOf(value), 1)
    });

    // Form validation
    setFormErrors(
      validation({
        ...formData,
        [name]: value
      }
    ));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Last validation
    const takenName = pokemons.find(pokemon => pokemon.name === formData.name);
    if (takenName) {
      setFormData({ ...formData, name: "" })
      return alert("Name is already taken, try with a different one.")
    }
    
    dispatch(createPokemon(formData));
    alert("Your pokemon was successfully created.");

    setFormData({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      weight: "",
      height: "",
      image: "",
      types: [],
    });

    history.push("/pokemon"); 
  };

  return (
    <div className="form-component-container">
      <NavBar />

      <form onSubmit={(e) => handleSubmit(e)} className="form-container">
        <h3 className="form-title">Create your own Pokemon</h3>

        <div className="form-content">
          <div className="form-column-separator">
            <div className="form-input-label-container">
              <label>Name</label>
              <input
                type="text"
                placeholder="Insert pokemon name"
                name="name"
                value={formData.name}
                required
                onChange={(e) => handleChange(e)}
              />
              <span className="error-message">{formErrors.name}</span>
            </div>

            <div className="form-input-label-container">
              <label>Hp</label>
              <input
                type="number"
                placeholder="Insert pokemon hp"
                name="hp"
                value={formData.hp}
                required
                onChange={(e) => handleChange(e)}
              />
              <span className="error-message">{formErrors.hp}</span>
            </div>

            <div className="form-input-label-container">
              <label>Attack</label>
              <input
                type="number"
                placeholder="Insert pokemon attack"
                name="attack"
                value={formData.attack}
                required
                onChange={(e) => handleChange(e)}
              />
              <span className="error-message">{formErrors.attack}</span>
            </div>

            <div className="form-input-label-container">
              <label>Defense</label>
              <input
                type="number"
                placeholder="Insert pokemon defense"
                name="defense"
                value={formData.defense}
                required
                onChange={(e) => handleChange(e)}
              />
              <span className="error-message">{formErrors.defense}</span>
            </div>

            <div className="form-input-label-container">
              <label>Speed</label>
              <input
                type="number"
                placeholder="Insert pokemon speed"
                name="speed"
                value={formData.speed}
                required
                onChange={(e) => handleChange(e)}
              />
              <span className="error-message">{formErrors.speed}</span>
            </div>

            <div className="form-input-label-container height-input">
              <label>Height</label>
              <input
                type="number"
                placeholder="Insert pokemon height"
                name="height"
                value={formData.height}
                required
                onChange={(e) => handleChange(e)}
              />
              <span className="error-message">{formErrors.height}</span>
            </div>
          </div>

          <div>
            <div className="form-input-label-container">
              <label>Weight</label>
              <input
                type="number"
                placeholder="Insert pokemon weight"
                name="weight"
                value={formData.weight}
                required
                onChange={(e) => handleChange(e)}
              />
              <span className="error-message">{formErrors.weight}</span>
            </div>

            <div className="form-input-label-container image-input">
              <label>Image</label>
              <input
                type="url"
                placeholder="Insert pokemon image"
                name="image"
                value={formData.image}
                required
                onChange={(e) => handleChange(e)}
              />
              <span className="error-message">{formErrors.image}</span>
            </div>

            <div className="form-input-label-container">
              <label>Types</label>
              <div className="types-selector-container">
                {types &&
                  types.map((type, index) => {
                    return (
                      <div className="type-selector" key={type.id}>
                        <input
                          type="checkbox"
                          className="type-input"
                          id={type.id}
                          name={formData.types}
                          value={type.name}
                          onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor={type.name} className="type-label">
                          {type.name}
                        </label>
                      </div>
                    );
                  })}
              </div>
              <span className="error-message">{formErrors.types}</span>
            </div>

            <div className="create-form-btn-container">
              <button 
                type="submit" 
                className="create-form-btn"
                disabled={
                  Object.values(formErrors).length === 0 
                  || !(pokemons.find(pokemon => pokemon.name === formData.name))
                  ? false : true  
                }
              >
                Create Pokemon
              </button>
            </div>
            
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default CreatePokemon;
