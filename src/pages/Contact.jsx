import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Language content
const content = {
  en: {
    title: "Contact Me",
    subtitle: "Get in Touch",
    name: "Your Name",
    email: "Your Email",
    message: "Your Message",
    send: "Send Message",
    sending: "Sending...",
    success: "Thank you! I will get back to you as soon as possible.",
    error: "Oops! Something went wrong. Please try again.",
    contactInfo: "Contact Information",
    location: "Location",
    locationValue: "Fez, Morocco",
    emailAddress: "Email",
    emailValue: "contact@example.com",
    phone: "Phone",
    phoneValue: "+212 000-000000",
    socialProfiles: "Social Profiles",
    nameRequired: "Please enter your name",
    emailRequired: "Please enter your email",
    emailInvalid: "Please enter a valid email",
    messageRequired: "Please enter your message"
  },
  fr: {
    title: "Contactez-Moi",
    subtitle: "Entrer en Contact",
    name: "Votre Nom",
    email: "Votre Email",
    message: "Votre Message",
    send: "Envoyer le Message",
    sending: "Envoi en cours...",
    success: "Merci ! Je vous répondrai dès que possible.",
    error: "Oups ! Quelque chose s'est mal passé. Veuillez réessayer.",
    contactInfo: "Informations de Contact",
    location: "Emplacement",
    locationValue: "Fez, Maroc",
    emailAddress: "Email",
    emailValue: "harounneduc@gmail.com",
    phone: "Téléphone",
    phoneValue: "+212 667-637908",
    socialProfiles: "Profils Sociaux",
    nameRequired: "Veuillez entrer votre nom",
    emailRequired: "Veuillez entrer votre email",
    emailInvalid: "Veuillez entrer un email valide",
    messageRequired: "Veuillez entrer votre message"
  }
};

const Contact = ({ language }) => {
  // Text content based on selected language
  const t = content[language];

  const formRef = useRef();
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Reset form status after 5 seconds of success or error
  useEffect(() => {
    if (formStatus === 'success' || formStatus === 'error') {
      const timer = setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formValues.name.trim()) {
      errors.name = t.nameRequired;
    }

    if (!formValues.email.trim()) {
      errors.email = t.emailRequired;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)) {
      errors.email = t.emailInvalid;
    }

    if (!formValues.message.trim()) {
      errors.message = t.messageRequired;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus('submitting');

    try {
      const form = formRef.current;
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        setFormValues({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-tertiary dark:bg-slate-800 rounded-2xl p-8 shadow-card"
          >
            <form
              action="https://formspree.io/f/mdkgkwdw"
              method="POST"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              {/* Form status messages */}
              {formStatus === 'success' && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-200">
                  {t.success}
                </div>
              )}

              {formStatus === 'error' && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
                  {t.error}
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="name" className="block text-white mb-2">
                  {t.name}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.name ? 'border border-red-500' : ''
                  }`}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-white mb-2">
                  {t.email}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.email ? 'border border-red-500' : ''
                  }`}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-white mb-2">
                  {t.message}
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  value={formValues.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.message ? 'border border-red-500' : ''
                  }`}
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className={`w-full px-6 py-3 ${
                  formStatus === 'submitting'
                    ? 'bg-blue-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors rounded-lg text-white font-medium`}
              >
                {formStatus === 'submitting' ? t.sending : t.send}
              </button>
            </form>
          </motion.div>

          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-tertiary dark:bg-slate-800 rounded-2xl p-8 shadow-card"
          >
            <h3 className="text-2xl font-bold text-white mb-6">{t.contactInfo}</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-900/50 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-medium">{t.location}</h4>
                  <p className="text-secondary mt-1">{t.locationValue}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-900/50 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-medium">{t.emailAddress}</h4>
                  <p className="text-secondary mt-1">{t.emailValue}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-900/50 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-medium">{t.phone}</h4>
                  <p className="text-secondary mt-1">{t.phoneValue}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-white font-medium mb-4">{t.socialProfiles}</h4>
              <div className="flex space-x-4">
                {/* GitHub */}
                <a
                  href="https://github.com/Haroun-educ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 transition-colors p-3 rounded-full"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/haroun-educ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 transition-colors p-3 rounded-full"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* Linktree */}
                <a
                  href="https://linktr.ee/Harouneduc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 transition-colors p-3 rounded-full"
                  aria-label="Linktree"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.092 2.210a1.5 1.5 0 0 1 2.116 0L12 3.838l1.792-1.628a1.5 1.5 0 0 1 2.116 0c.584.584.584 1.532 0 2.116L13.416 6.5l2.492 2.174a1.5 1.5 0 0 1 0 2.116 1.5 1.5 0 0 1-2.116 0L12 9.162l-1.792 1.628a1.5 1.5 0 0 1-2.116 0 1.5 1.5 0 0 1 0-2.116L10.584 6.5 8.092 4.326a1.5 1.5 0 0 1 0-2.116zM12 12.5a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-3 0v-7a1.5 1.5 0 0 1 1.5-1.5z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
