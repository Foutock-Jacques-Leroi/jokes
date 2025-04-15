import { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { useNavigate } from 'react-router'
import "react-toastify/dist/ReactToastify.css"
import { toast } from 'react-toastify'


function App() {
  const [person, setPerson] = useState([])
  const [deleted, setDeleted] = useState(true)
  const navigate = useNavigate()




  useEffect(() => {
    if (deleted) {
      setDeleted(false)

      axios.get(`${import.meta.env.VITE_BASE_URL}/`)
        .then(data => setPerson(data.data))
        .catch(err => console.log(err))
    }
  }, [deleted])

  //console.log("import.meta.env.VITE_BASE_URL", import.meta.env.VITE_BASE_URL)
  const handleDelete = (D_id) => {


    axios.delete(`${import.meta.env.VITE_BASE_URL}/delete/` + D_id)
      .then(res => {
        if (res.data === 'deleted') {
          setDeleted(true)
          toast.success(" Employee Deleted ✨")
        }
      })
      .catch(err => console.log(err))
  }


  const handleEdit = (E_id) => {

    navigate('/edit/' + E_id)

  }

  const [search, setSearch] = useState('')
  const getData = (data) => {
    console.log("App.jsx says " + data + " From Header.jsx")
    setSearch(data)
  }

  let dataSearch = person.filter(item => {
    return Object.keys(item).some(key =>
      item[key].toString().toLowerCase().includes(search.toString().toLowerCase())
    )
  })
  //console.log("import.meta.env = ", import.meta.env.VITE_KEY)
  return (
    <>
      <Header onSubmit={getData} />
      <div className='table-responsive-sm'>
        <table class="table table-dark table-hover" >
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Email</th>
              <th>Options</th>

            </tr>
          </thead>
          <tbody>
            {

              dataSearch.map((person) => {
                return (
                  <>
                    <tr key={person._id}>
                      <td>{person.name}</td>

                      <td>{person.email}</td>
                      <td>
                        <div className='btn btn-group-vertical'>

                          <button className='btn btn-secondary' onClick={(e) => handleEdit(person._id)}> View </button>
                          <button className='btn btn-danger' onClick={(e) => handleDelete(person._id)}> Delete </button>
                        </div>
                      </td>

                    </tr>
                  </>
                )
              })
            }
          </tbody>
        </table>
      </div >
    </>
  )
}

export default App
