import React,{useState} from 'react';

const ContactUs =(props)=> {
  const host="http://localhost:5000/api/contact/cdetails";
    const [cdetails,setCdetails]=useState({name:"",email:"",msg:""});
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response =await fetch(host, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:cdetails.name,email:cdetails.email,msg:cdetails.msg})
          });

          const json = await response.json();
          console.log(json);
            props.showAlert("Details sent Successfully","success");
    }
    const onChange=(e)=>{
        setCdetails({...cdetails,[e.target.name]:e.target.value})
    }
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    return (
      <div className="container my-5">
        <div className="p-4 bg-light text-dark rounded shadow">
          <h4 className="text-center mb-4">Contact Us</h4>
          <p className="text-center lead mb-4">
            We'd love to hear from you! Whether you have any question about our website, feedback on the site, or just want to say hello, feel free to reach out.
          </p>
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control bg-light text-light border-secondary" id="name" placeholder="Your Name" name='name' value={cdetails.name} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control bg-light text-light border-secondary" id="email" placeholder="Your Email" name='email' value={cdetails.email} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="msg" className="form-label">Message</label>
                  <textarea className="form-control bg-light text-dark border-secondary" id="msg" rows="5" placeholder="Your Message" name='msg' value={cdetails.msg} onChange={onChange}></textarea>
                </div>
                <button type="submit" className="btn btn-outline-dark w-100" onClick={scrollToTop}>Send Message</button>
              </form>
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h5>Contact Information</h5>
              <p className="lead">
                <strong>Email:</strong> contact@iNotebook.com<br />
                <strong>Phone:</strong> +123-456-7890
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ContactUs;
