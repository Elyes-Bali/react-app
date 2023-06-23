import React, { useRef, useState } from "react";

import emailjs from "@emailjs/browser";



const Email = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
      name: "",
      email: "",
      message: "",
    });
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;
    
        setForm({
          ...form,
          [name]: value,
        });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
  
      emailjs
        .send(
          'service_t1wi5eu',
         'template_5e25dkx',
          {
            from_name: form.name,
            to_name: "Elyes Bali",
            from_email: form.email,
            to_email: "balielyes7@gmail.com",
            message: form.message,
          },
          '8BLa2RtIQ6TvjS--c'
        )
        .then(
          () => {
            setLoading(false);
            alert("Thank you. I will get back to you as soon as possible.");
  
            setForm({
              name: "",
              email: "",
              message: "",
            });
          },
          (error) => {
            setLoading(false);
            console.error(error);
  
            alert("Ahh, something went wrong. Please try again.");
          }
        );
    };
  
    return (
      <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
          <p className="">Get in touch</p>
          <h3 className="">Contact.</h3>
  
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span text-white font-medium mb-4>
                Your Name
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
              />
            </label>
  
            <label className="flex flex-col">
              <span text-white font-medium mb-4>
                Your Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
              />
            </label>
  
            <label className="flex flex-col">
              <span text-white font-medium mb-4>
                Your Message
              </span>
              <textarea
              
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
              />
            </label>
            <button
              type="submit"
              className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
            >
              {loading ? "sending..." : "send"}
            </button>
          </form>
        
    
      </div>
    );
  };

export default Email