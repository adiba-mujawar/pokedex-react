import "./pokemon.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from '../../api/api';
import ReactModal from 'react-modal';

const Pokemon = (props) => {
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState('')
  const { pokemon } = props;
  console.log(pokemon.number)
  const setIsOpen = () => {
    console.log("inside isopen")
    setOpen(true)
  }

  useEffect(() => {
    if (open) {
      let pokeDetailsArray = []
      let descriptionString = ''
      Api.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`).then(res =>{
        console.log(res.flavor_text_entries)
        res.flavor_text_entries.map((item) => {
          if (item.language.name != "en") return false;
          else  {
            item.flavor_text =  item.flavor_text.replace(/\n|\f/g, "")
            pokeDetailsArray.push(item.flavor_text)
          }
        });
        const newArray = pokeDetailsArray.filter(
          (item, index) => pokeDetailsArray.indexOf(item) === index
        );
        newArray.map((item) => {
          descriptionString = (item + descriptionString).padEnd(20)
        })
        setDescription(descriptionString)
      })
    }
  }, [open])

  useEffect (() => {
    if (open) {
      console.log(description)
    }
  },[open])

  const closeModal = () => {
      setOpen(false)
  }
  return (
    <>
      <div className="pokemon--species">
        <div className="pokemon--species--container">
          <div className="pokemon-species-sprite">
            <div onClick={setIsOpen}>
              <img className="image" alt="" src={pokemon.cardImg} />
            </div>
          </div>
          <div className="pokemon-species-name">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </div>
          <div className="pokemon-specied-id">{pokemon.number}</div>
        </div>
      </div>

      <ReactModal
        isOpen={open}
        className={"ReactModal__Content"}
        shouldCloseOnEsc={true}
      >
        <div className="react-modal">
          <p className="pokemon-name">{pokemon.name.toUpperCase()}</p>
          <div className="vertical-line"></div>
          <p className="pokemon-number">{pokemon.number}</p>
          <div onClick={closeModal}>
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.14264 8.14286L18.8569 18.8571M8.14264 18.8571L18.8569 8.14286M13.4998 26C6.59623 26 0.999786 20.4036 0.999786 13.5C0.999786 6.59644 6.59623 1 13.4998 1C20.4033 1 25.9998 6.59644 25.9998 13.5C25.9998 20.4036 20.4033 26 13.4998 26Z"
                stroke="#2E3156"
              />
            </svg>
          </div>
          <div className="pokemon--species-image">
            <img className="details-image" alt="" src={pokemon.cardImg} />
          </div>
          {description && <div>{description}</div>}
          <div onClick={closeModal}>
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.14264 8.14286L18.8569 18.8571M8.14264 18.8571L18.8569 8.14286M13.4998 26C6.59623 26 0.999786 20.4036 0.999786 13.5C0.999786 6.59644 6.59623 1 13.4998 1C20.4033 1 25.9998 6.59644 25.9998 13.5C25.9998 20.4036 20.4033 26 13.4998 26Z"
                stroke="#2E3156"
              />
            </svg>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default Pokemon;
