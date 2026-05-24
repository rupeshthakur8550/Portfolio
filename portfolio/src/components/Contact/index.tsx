import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { FiMail, FiSend, FiUser, FiPhone, FiCheckCircle, FiAlertCircle, FiGithub, FiLinkedin } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { portfolioContent } from '../../content/portfolio';
import GradientText from '../UI/GradientText';
import ScrollReveal from '../UI/ScrollReveal';

const Contact = () => {
 const contactText = portfolioContent.contactPage;
 const mountedAtRef = useRef(Date.now());
 const [honeypot, setHoneypot] = useState('');
 const [formData, setFormData] = useState({
 fullName: '',
 email: '',
 contactNumber: '',
 message: ''
 });
 const [loading, setLoading] = useState(false);
 const [success, setSuccess] = useState(false);
 const [error, setError] = useState('');
 const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;

 const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
 setFormData({
 ...formData,
 [e.target.name]: e.target.value
 });
 };

 const resetForm = () => {
 setFormData({
 fullName: '',
 email: '',
 contactNumber: '',
 message: ''
 });
 setHoneypot('');
 };

 const sendViaMailClient = () => {
 const subject = encodeURIComponent(`New Message from Portfolio: ${formData.fullName}`);
 const body = encodeURIComponent(
 [
 `Name: ${formData.fullName}`,
 `Email: ${formData.email}`,
 `Contact Number: ${formData.contactNumber}`,
 '',
 formData.message,
 ].join('\n')
 );

 window.location.href = `mailto:${contactText.email}?subject=${subject}&body=${body}`;
 };

 const handleSubmit = async (e: FormEvent) => {
 e.preventDefault();
 setLoading(true);
 setError('');
 setSuccess(false);

 if (honeypot.trim()) {
 setLoading(false);
 return;
 }

 if (Date.now() - mountedAtRef.current < 2500) {
 setError('Please wait a moment before submitting the form.');
 setLoading(false);
 return;
 }

 try {
 if (!endpoint) {
 sendViaMailClient();
 setSuccess(true);
 resetForm();
 return;
 }

 const response = await fetch(endpoint, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 'Accept': 'application/json'
 },
 body: JSON.stringify({
 name: formData.fullName.trim(),
 email: formData.email.trim(),
 contactNumber: formData.contactNumber.trim(),
 message: formData.message.trim(),
 pageUrl: window.location.href,
 })
 });

 if (!response.ok) {
 throw new Error('Submission failed');
 }

 setSuccess(true);
 resetForm();
 } catch {
 if (!endpoint) {
 sendViaMailClient();
 setSuccess(true);
 resetForm();
 } else {
 setError(contactText.form.errorFallback);
 }
 } finally {
 setLoading(false);
 }
 };

 return (
 <motion.div 
   id="contact" 
   initial={{ opacity: 0, scale: 0.95, y: 30 }}
   animate={{ opacity: 1, scale: 1, y: 0 }}
   transition={{ duration: 0.5, ease: "easeOut" }}
   className="min-h-screen flex flex-col justify-center items-center py-20 px-4 relative z-20"
 >
 <div className="text-center mb-10 md:mb-20 px-4">
 <div className="mb-4 md:mb-6">
 <GradientText
 animationSpeed={3}
 showBorder={false}
 className="text-5xl sm:text-7xl font-black tracking-tight"
 >
 {contactText.title}
 </GradientText>
 </div>
 <div className="flex justify-center text-center">
 <ScrollReveal
 baseOpacity={0.2}
 enableBlur
 blurStrength={8}
 textClassName="text-theme-text-sec text-sm md:text-lg max-w-2xl mx-auto"
 >
 {contactText.subtitle}
 </ScrollReveal>
 </div>
 </div>

 <div className="w-full max-w-4xl bg-theme-text/90 backdrop-blur-xl border border-theme-bg/10 rounded-xl md:rounded-2xl p-6 md:p-12 shadow-2xl relative overflow-hidden mx-4">
 {/* Decorative background elements */}
 <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-theme-purple/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
 <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-theme-sky/10 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

 <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
 <div>
 <h3 className="text-xl md:text-2xl font-bold text-theme-bg mb-4 md:mb-6">{contactText.letsTalk}</h3>
 <ScrollReveal
 baseOpacity={0.3}
 enableBlur
 blurStrength={5}
 baseRotation={0}
 textClassName="text-theme-bg/70 font-medium mb-6 md:mb-8 leading-relaxed text-xs md:text-base"
 >
 {contactText.description}
 </ScrollReveal>

 <div className="space-y-4 md:space-y-6">
 <div className="flex items-center space-x-3 md:space-x-4 text-theme-bg/80">
 <div className="w-10 h-10 md:w-12 md:h-12 bg-theme-bg/5 rounded-full flex items-center justify-center text-theme-sky">
 <FiMail size={18} className="md:w-6 md:h-6" />
 </div>
 <div>
 <p className="text-[10px] md:text-xs text-theme-bg/60 font-semibold uppercase tracking-wider">{contactText.emailLabel}</p>
 <p className="font-bold text-theme-bg text-sm md:text-base">{contactText.email}</p>
 </div>
 </div>

 {/* Social Links */}
 <div className="pt-6 border-t border-theme-bg/10 mt-8">
   <p className="text-[10px] md:text-xs text-theme-bg/60 font-semibold uppercase tracking-wider mb-4">Connect on Social</p>
   <div className="flex gap-4">
     <a href="https://github.com/rupeshthakur8550" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-theme-bg/5 hover:bg-theme-bg/10 border border-theme-bg/10 rounded-full flex items-center justify-center text-theme-bg/80 hover:text-theme-sky transition-all duration-300 transform hover:-translate-y-1">
       <FiGithub size={18} />
     </a>
     <a href="https://in.linkedin.com/in/rupesh-thakur-010209207?trk=people-guest_people_search-card" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-theme-bg/5 hover:bg-theme-bg/10 border border-theme-bg/10 rounded-full flex items-center justify-center text-theme-bg/80 hover:text-theme-purple transition-all duration-300 transform hover:-translate-y-1">
       <FiLinkedin size={18} />
     </a>
     <a href="https://leetcode.com/u/rupeshthakur80078/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-theme-bg/5 hover:bg-theme-bg/10 border border-theme-bg/10 rounded-full flex items-center justify-center text-theme-bg/80 hover:text-theme-pink transition-all duration-300 transform hover:-translate-y-1 font-bold font-mono text-[11px]">
       LC
     </a>
   </div>
 </div>
 </div>
 </div>

 <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5" noValidate>
 <div className="hidden" aria-hidden="true">
 <label htmlFor="company">Company</label>
 <input
 id="company"
 name="company"
 value={honeypot}
 onChange={(event) => setHoneypot(event.target.value)}
 autoComplete="off"
 tabIndex={-1}
 />
 </div>
 <div className="space-y-3 md:space-y-4">
 <div>
 <label htmlFor="fullName" className="block text-xs md:text-sm font-bold text-theme-bg/70 mb-1.5 md:mb-2">{contactText.form.fullNameLabel}</label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none text-theme-bg/50">
 <FiUser size={14} className="md:size-4" />
 </div>
 <input
 id="fullName"
 type="text"
 name="fullName"
 required
 value={formData.fullName}
 onChange={handleChange}
 autoComplete="name"
 aria-invalid={Boolean(error)}
 className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3.5 bg-theme-bg/5 border border-theme-bg/20 rounded-lg md:rounded-xl focus:ring-2 focus:ring-theme-purple focus:border-transparent text-theme-bg font-medium placeholder-theme-bg/40 text-sm md:text-base transition-all outline-none"
 placeholder={contactText.form.fullNamePlaceholder}
 />
 </div>
 </div>

 <div>
 <label htmlFor="email" className="block text-xs md:text-sm font-bold text-theme-bg/70 mb-1.5 md:mb-2">{contactText.form.emailLabel}</label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none text-theme-bg/50">
 <FiMail size={14} className="md:size-4" />
 </div>
 <input
 id="email"
 type="email"
 name="email"
 required
 value={formData.email}
 onChange={handleChange}
 autoComplete="email"
 aria-invalid={Boolean(error)}
 className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3.5 bg-theme-bg/5 border border-theme-bg/20 rounded-lg md:rounded-xl focus:ring-2 focus:ring-theme-purple focus:border-transparent text-theme-bg font-medium placeholder-theme-bg/40 text-sm md:text-base transition-all outline-none"
 placeholder={contactText.form.emailPlaceholder}
 />
 </div>
 </div>

 <div>
 <label htmlFor="contactNumber" className="block text-xs md:text-sm font-bold text-theme-bg/70 mb-1.5 md:mb-2">{contactText.form.contactLabel}</label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none text-theme-bg/50">
 <FiPhone size={14} className="md:size-4" />
 </div>
 <input
 id="contactNumber"
 type="tel"
 name="contactNumber"
 required
 value={formData.contactNumber}
 onChange={handleChange}
 autoComplete="tel"
 aria-invalid={Boolean(error)}
 className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3.5 bg-theme-bg/5 border border-theme-bg/20 rounded-lg md:rounded-xl focus:ring-2 focus:ring-theme-purple focus:border-transparent text-theme-bg font-medium placeholder-theme-bg/40 text-sm md:text-base transition-all outline-none"
 placeholder={contactText.form.contactPlaceholder}
 />
 </div>
 </div>
 </div>

 <div>
 <label htmlFor="message" className="block text-xs md:text-sm font-bold text-theme-bg/70 mb-1.5 md:mb-2">{contactText.form.messageLabel}</label>
 <textarea
 id="message"
 name="message"
 required
 rows={3}
 value={formData.message}
 onChange={handleChange}
 autoComplete="off"
 aria-invalid={Boolean(error)}
 className="w-full px-4 md:px-5 py-2.5 md:py-3.5 bg-theme-bg/5 border border-theme-bg/20 rounded-lg md:rounded-xl focus:ring-2 focus:ring-theme-purple focus:border-transparent text-theme-bg font-medium placeholder-theme-bg/40 text-sm md:text-base transition-all outline-none resize-none"
 placeholder={contactText.form.messagePlaceholder}
 ></textarea>
 </div>

 <button
 type="submit"
 disabled={loading}
 className={`w-full py-3.5 md:py-4 rounded-lg md:rounded-xl font-bold text-white flex items-center justify-center space-x-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${loading
 ? 'bg-theme-text-muted cursor-not-allowed'
 : 'bg-gradient-to-r from-theme-sky via-theme-purple to-theme-pink hover:from-theme-sky hover:via-theme-purple hover:to-theme-pink brightness-110 hover:brightness-125 shadow-md shadow-theme-purple/20'
 }`}
 >
 {loading ? (
 <>
 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
 <span className="text-sm md:text-base">{contactText.form.submitting}</span>
 </>
 ) : (
 <>
 <FiSend className="text-sm md:text-base" />
 <span className="text-sm md:text-base uppercase tracking-widest">{contactText.form.submitButton}</span>
 </>
 )}
 </button>

 {!endpoint && (
 <p className="text-xs md:text-sm text-theme-bg/60 text-center">
 No secure form endpoint is configured, so submit will open your default mail client.
 </p>
 )}

 {success && (
 <div role="status" aria-live="polite" className="flex items-center justify-center space-x-2 text-green-400 bg-green-400/10 p-3 md:p-4 rounded-lg border border-green-400/20 animate-fade-in text-xs md:text-sm font-medium">
 <FiCheckCircle />
 <span>{contactText.form.successMessage}</span>
 </div>
 )}

 {error && (
 <div role="alert" aria-live="assertive" className="flex items-center justify-center space-x-2 text-red-400 bg-red-400/10 p-3 md:p-4 rounded-lg border border-red-400/20 animate-fade-in text-xs md:text-sm font-medium">
 <FiAlertCircle />
 <span>{error}</span>
 </div>
 )}
 </form>
 </div>
 </div>
 </motion.div>
 );
};

export default Contact;
