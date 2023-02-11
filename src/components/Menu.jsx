import { useEffect, useState } from "react";
import axios from "axios";
import img from './obiwan.png'
import React from 'react'

const Menu = () => {


    const [seleccion, setSeleccion] = useState("");
    const [resultado, setResultado] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get("https://swapi.dev/api/")
            .then(response => response.data)
            .then(resultado => {
                const lista = []
                console.log(resultado)
                for (const [key, valor] of Object.entries(resultado)) {
                    lista.push({ label: key, url: valor })
                }
                setOpciones(lista);
                setSeleccion(lista[0]);
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


    useEffect(() => {
        console.log(seleccion);
    }, [seleccion])

    const handleSearch = (e) => {
        e.preventDefault();
        const url = seleccion.url + id;
        console.log('esta es la url', url)
        axios.get(url)
            .then(response => response.data)
            .then(resultado => {
                setError(false);
                // if (seleccion.includes(seleccion)) {
                    setResultado(resultado)
                    console.log('esto es resultado de busqueda', JSON.stringify(resultado))
                // }
            })
            .catch(error => {
                setError(true);
            })
    }

    const [id, setId] = useState("");
    const [opciones, setOpciones] = useState([]);

    // console.log('este es option ', seleccion)
    return (
        <>
            <form onSubmit={handleSearch}>
                <label htmlFor="search">Buscar</label>
                <select seleccion={seleccion} onChange={setSeleccion}>
                    {opciones.map((item, idx) =>
                        <option key={item.label + idx} value={item}>{item.label}</option>)}
                </select>
                <label htmlFor='numid'>ID:</label>
                <input type="number" id="number" valor={id} onChange={(e) => setId(e.target.value)}></input>
                <button type="submit" id='get'>get</button>
            </form>
            {error ? (
                <div className="error">
                    <h4>estos no son los droides que estas buscando</h4>
                    <img className="img" src={img} alt="obiwan"></img>
                </div>
            )
                :
                <div className="resultados">
                    <div>
                        {
                            seleccion.label === 'people' ?
                                <div className="resultado">
                                    <h2>{resultado.name}</h2>
                                    <p>height: {resultado.height}</p>
                                    <p>mass: {resultado.mass}</p>
                                    <p>hair color: {resultado.hair_color}</p>
                                    <p>gender: {resultado.gender}</p>
                                </div>
                                :
                                ''
                        }
                    </div>
                    <div>
                        {/* {
                            resultado.films ?
                                <div className="resultado">
                                    <h2>{resultado.films}</h2>
                                </div>
                                :
                                ''
                        } */}



                    </div>
                </div>
            }
        </>
    )
}

export default Menu