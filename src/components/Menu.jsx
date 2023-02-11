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
                console.log('a ver', resultado)
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
        const url = "https://swapi.dev/api/" + seleccion + "/" + id;
        console.log('esta es la url', url)
        axios.get(url)
            .then(response => response.data)
            .then(resultado => {
                setError(false);
                setResultado(resultado)
                console.log('esto es resultado de busqueda', JSON.stringify(resultado))
            })
            .catch(error => {
                setError(true);
                console.log(error);
            })
    }

    const [id, setId] = useState("");
    const [opciones, setOpciones] = useState([]);

    // console.log('este es option ', seleccion)
    return (
        <>
            <form onSubmit={handleSearch}>
                <label htmlFor="search">Buscar</label>
                <select seleccion={seleccion} onChange={(e) => setSeleccion(e.target.value)}>
                    {opciones.map((item, idx) =>
                        <option key={item.label + idx} value={item.label}>{item.label}</option>)}
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
                            seleccion === 'people' ?
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
                        {
                            seleccion === 'planets' ?
                                <div className="resultado">
                                    <h2>{resultado.name}</h2>
                                    <p>rotation period: {resultado.rotation_period}</p>
                                    <p>orbital period: {resultado.orbital_period}</p>
                                    <p>climate: {resultado.climate}</p>
                                    <p>gravity: {resultado.gravity}</p>
                                </div>
                                :
                                ''
                        }
                        {
                            seleccion === 'film' ?
                                <div className="resultado">
                                    <h2>{resultado.title}</h2>
                                    {/* <p>episode: {resultado.episode_id}</p>
                                    <p>director: {resultado.director}</p>
                                    <p>producer: {resultado.producer}</p>
                                    <p>release date: {resultado.release_date}</p> */}
                                </div>
                                :
                                ''
                        }
                        {
                            seleccion === 'species' ?
                                <div className="resultado">
                                    <h2>{resultado.name}</h2>
                                    <p>classification: {resultado.classification}</p>
                                    <p>average height: {resultado.average_height}</p>
                                    <p>average lifespan: {resultado.average_lifespan}</p>
                                    <p>language: {resultado.language}</p>
                                </div>
                                :
                                ''
                        }
                        {
                            seleccion === 'vehicles' ?
                                <div className="resultado">
                                    <h2>{resultado.name}</h2>
                                    <p>model: {resultado.model}</p>
                                    <p>manufacturer: {resultado.manufacturer}</p>
                                </div>
                                :
                                ''
                        }
                        {
                            seleccion === 'starships' ?
                                <div className="resultado">
                                    <h2>{resultado.name}</h2>
                                    <p>model: {resultado.model}</p>
                                    <p>manufacturer: {resultado.manufacturer}</p>
                                </div>
                                :
                                ''
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Menu