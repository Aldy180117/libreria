'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import { isLogged, logout } from '@/services/registerService';
import { useRouter } from 'next/navigation'

interface Libro{
  id: number;
  nombre: string;
  autor: string;
  fecha: string;
  estado: string;
}

const defaultLibro:Libro = {
  id: 0,
  nombre: '',
  autor: '',
  fecha: '',
  estado: 'Prestado'
}

export default function Home() {

  const router = useRouter() 

  const [libro, setLibro] = useState<Libro>(defaultLibro)
  const [libreria, setLibreria] = useState<Libro[]>([])

  useEffect(()=>{
    if (!isLogged()) {
      router.push('/login')
    }
  }, [])

  const clickLogout = ()=>{
    logout()
    router.push('/login')
  }
  

  const clear = ()=>{
    console.log('click')
    setLibro(defaultLibro)
  }

  function valido(){
    if (libro.nombre === '') {
      alert('Nombre vacio, añada un valor')
      return false;
    }
    if (libro.autor === '') {
      alert('Autor vacio, añada un valor')
      return false;
    }
    if (libro.fecha === '') {
      alert('Fecha vacia, añada un valor')
      return false;
    }
    if (libro.estado === '') {
      alert('Estado vacio, añada un valor')
      return false;
    }
    return true;
  }

  function agregarLibro(){
    if (valido()) {
      const nuevoLibro:Libro = {...libro, id: libreria.length === 0 ? 1 : libreria[libreria.length - 1].id +1} 
      setLibreria([...libreria, nuevoLibro])
      clear()
    }
  }

  function eliminarLibro(id: number){
    setLibreria(libreria.filter(item => item.id !== id))
  }

  return (
    <main className='p-5'>
      <button type="button" className='btn btn-warning m-2' onClick={clickLogout}>
          Logout
      </button>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" placeholder="Nombre" value={libro.nombre} onChange={e => setLibro({...libro, nombre: e.target.value})}/>
      </div>
      <div className="mb-3">
        <label className="form-label">Autor</label>
        <input type="text" className="form-control"  placeholder="Autor" value={libro.autor} onChange={e => setLibro({...libro, autor: e.target.value})}/>
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha de salida</label>
        <input type="date" className="form-control" placeholder="Fecha de salida" value={libro.fecha} onChange={e => setLibro({...libro, fecha: e.target.value})}/>
      </div>
      <div className="mb-3">
        <label className="form-label">Estado</label>
        <select value={libro.estado} onChange={e => setLibro({...libro, estado: e.target.value} )}
        className="form-control"  placeholder="Estado">
          <option value="Prestado">Prestado</option>
          <option value="Dañado">Dañado</option>
          <option value="Perdido">Perdido</option>
          <option value="Disponible">Disponible</option>
        </select>
      </div>
      <div className='d-flex bd-highlight justify-content-center mb-5'>
        <button type="button" className='btn btn-warning m-2' onClick={()=> {clear()}}>
          Limpiar
        </button>
        <button type="button" className='btn btn-success m-2' onClick={()=> {agregarLibro()}}>
          Agregar
        </button>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Autor</th>
            <th scope="col">Fecha de lanzamiento</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {libreria.map((item, index)=>(
            <tr>
            <th>{item.nombre}</th>
            <td>{item.autor}</td>
            <td>{item.fecha}</td>
            <td>{item.estado}</td>
            <td>
              <button type="button" className='btn btn-danger' onClick={()=> eliminarLibro(item.id)}>
              Eliminar
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
