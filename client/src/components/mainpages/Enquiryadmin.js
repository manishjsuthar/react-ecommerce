import React,{useState, useEffect} from 'react'

function Enquiryadmin() {
    const [contactdetail, setcontactdetail] = useState([])

    useEffect(() => {
        fetch("/api/contactform/")
        .then(res => res.json())
		.then(data => setcontactdetail(data))
        .catch(err => console.error(err))
    }, [])
    return (
        <div style={{"margin":"200px"}}>
            <ul>
                {contactdetail.map(post => (
              <li key={post.id}>Name: {post.name},
              Email: {post.email},
              Phone:{post.phone},
              Message: {post.message}</li>
                ))}
            </ul>
        </div>
    )
}

export default Enquiryadmin
