import React,{useState} from 'react'
import axios from 'axios'

function Contact() {

    const [data, setdata] = useState({
        name:"",
        email:"",
        phone:"",
        message:""
    })

    const submit = (e)  => {
        e.preventDefault();
        axios.post("/api/contactform/new", {
            name:data.name,
            email:data.email,
            phone:data.phone, 
            message:data.message
        })
        .then((res) => {
            console.log(res.data)
            alert("message has been sent successfully")
        })
    }

    const handleOnChange = (e) => {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setdata(newData)
        console.log(newData)
    }


    return (
        <div>
            <div>
                {/* Start Content Page */}
                <div className="container-fluid bg-light py-5">
                    <div className="col-md-6 m-auto text-center">
                        <h1 className="h1">Contact Us</h1>
                        <p>
                            Feel free to contact Us.
                        </p>
                    </div>
                </div>
                {/* Start Contact */}
                <div className="container py-5">
                    <div className="row py-5">
                        <form className="col-md-9 m-auto" onSubmit={(e)=>submit(e)}>
                            <div className="row">
                                <div className="form-group col-md-6 mb-3">
                                    <label htmlFor="inputname">Name</label>
                                    <input type="text" className="form-control mt-1" onChange={(e)=>handleOnChange(e)} id="name" value={data.name} name="name" placeholder="Name" />
                                </div>
                                <div className="form-group col-md-6 mb-3">
                                    <label htmlFor="inputemail">Email</label>
                                    <input type="email" className="form-control mt-1" onChange={(e)=>handleOnChange(e)} id="email" value={data.email} name="email" placeholder="Email" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phonenumber">Phonenumber</label>
                                <input type="text" className="form-control mt-1" onChange={(e)=>handleOnChange(e)} id="phone" value={data.phone} name="phone" placeholder="Phone number" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputmessage">Message</label>
                                <textarea className="form-control mt-1" onChange={(e)=>handleOnChange(e)} id="message" value={data.message} name="message" placeholder="Message" rows={8} defaultValue={""} />
                            </div>
                            <div className="row">
                                <div className="col text-end">
                                    <button type="submit" className="btn btn-success">Let’s Talk</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
