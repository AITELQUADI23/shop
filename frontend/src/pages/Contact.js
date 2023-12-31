import React, { useRef } from 'react'

function Contact() {
  const inpEmail = useRef()
  const inpSubject = useRef()
  const inpMessage = useRef()

  const baseUrl = "http://localhost:8080/api"; 

  const sendEmail = async (e) => {
    e.preventDefault()
    
    let dataSend = {
      email: inpEmail.current.value,
      subject: inpSubject.current.value,
      message: inpMessage.current.value,
    };

    const res = await fetch(`${baseUrl}/contact`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    console.log(res);

    if (res.status >= 200 && res.status < 300) {
      alert("Send Successfully !");
    }
  };
  return (
  <>
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl t-4xl text-bold text-center text-gray-900 ">Contact Us</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500  sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
          <form action="#" className="space-y-8">
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 " >Your email</label>
                  <input ref={inpEmail} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-within:outline-blue-300 focus:border-primary-500 block w-full p-2.5 " placeholder="name@Gmail.com" required/>
              </div>
              <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                  <input ref={inpSubject} type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus-within:outline-blue-300 focus:border-primary-500 " placeholder="Let us know how we can help you" required/>
              </div>
              <div className="sm:col-span-2">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 " >Your message</label>
                  <textarea ref={inpMessage} id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus-within:outline-blue-300 focus:border-primary-500 " placeholder="Leave a comment..."></textarea>
              </div>
              <button onClick={sendEmail} className='font-bold bg-blue-800  text-white px-4 py-2 rounded'>Send message</button>

          </form>
        </div>
      </section>
    </div> 
  </>
  )
}

export default Contact;