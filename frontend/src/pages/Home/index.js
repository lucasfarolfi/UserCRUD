import { useEffect, useState } from 'react'
import { getAll, deletePerson } from '../../services/user'
import { Table } from 'react-bootstrap'
import {convertDate, convertNumber} from '../../utils/convertData'
import { Link } from 'react-router-dom'
import styles from './style.module.css'

export default function Home() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(false)

  useEffect(() =>{
    async function fetchData(){
      try{
        let data = await getAll()
        setUsers(data)
        setError(false)
      }catch(e){
        console.log(e)
        setError(true)
      }
    }

    fetchData()
  },[])

  const handleDelete = async (id) =>{
      if(window.confirm("Você deseja mesmo deletar esta pessoa ?")){
        try{
          await deletePerson(id)
          setError(null)

          window.location.href = 'http://localhost:3000/'
        }catch(e){
          setError("Não foi possível deletar o usuário. Tente novamente")
        }
      }
    }

  return (
    <div className={styles.container}>
      <h1>Lista de Pessoas</h1>
      <button className={styles.newPersonBtn}><Link to="/novo">Nova pessoa</Link></button>
        <Table striped responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Celular</th>
              <th>Data de nasc.</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map(u =>{
              return (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td><img src={u.photo} className={styles.userImage} alt={`Foto de ${u.name}`} /></td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{convertDate(u.birthdate)}</td>
                  <td>
                    <button className={styles.actionBtn}><Link to={"/editar/"+u.id}>Editar</Link></button> 
                    <button className={styles.actionBtn} onClick={()=>{handleDelete(u.id)}}>Excluir</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        
        {error && <div className={styles.errorMsg}>Erro ao conectar com o servidor. Tente novamente mais tarde</div>}
      </div>
  );
}
