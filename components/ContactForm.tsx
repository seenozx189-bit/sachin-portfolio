'use client';

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const type = String(data.get('projectType') || 'Project').trim();
    const message = String(data.get('message') || '').trim();
    const status = form.querySelector('.form-status');
    
    if (status) {
      status.className = 'form-status';
      if (!name || !email || !message) {
        status.textContent = 'Please complete your name, email and message.';
        status.classList.add('is-error'); 
        return;
      }
      status.textContent = 'Opening your email app…'; 
      status.classList.add('is-success');
      const subject = encodeURIComponent(`${type} enquiry from ${name}`);
      const bodyText = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject type: ${type}\n\n${message}`);
      window.location.href = `mailto:seenozx189@gmail.com?subject=${subject}&body=${bodyText}`;
    }
  };

  return (
    <form className="contact-form" id="contact-form" noValidate onSubmit={handleSubmit}>
      <label><span>Name</span><input name="name" type="text" placeholder="Your name" autoComplete="name" /></label>
      <label><span>Email</span><input name="email" type="email" placeholder="you@email.com" autoComplete="email" /></label>
      <label>
        <span>Project type</span>
        <select name="projectType" defaultValue="UI/UX Design">
          <option>UI/UX Design</option>
          <option>Graphic Design</option>
          <option>Brand Identity</option>
          <option>Video Editing</option>
          <option>Creative Direction</option>
        </select>
      </label>
      <label><span>Message</span><textarea name="message" rows={4} placeholder="Tell me about your project…"></textarea></label>
      <div className="form-submit-row">
        <button className="pill-button form-button" type="submit">Send message <span aria-hidden="true">↗</span></button>
        <p className="form-status" aria-live="polite"></p>
      </div>
    </form>
  );
}
