import React, { useState } from 'react';
import { FiMail, FiSend, FiUser, FiPhone, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import common from '../../assets/json/common.json';
import GradientText from '../UI/GradientText';
import ScrollReveal from '../UI/ScrollReveal';

const Contact = () => {
    const contactText = common.Portfolio.contactPage;
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
                    name: formData.fullName,
                    email: formData.email,
                    contactNumber: formData.contactNumber,
                    message: formData.message,
                    subject: `New Message from Portfolio: ${formData.fullName}`
                })
            });

            const result = await response.json();

            if (result.success) {
                setSuccess(true);
                setFormData({
                    fullName: '',
                    email: '',
                    contactNumber: '',
                    message: ''
                });
            } else {
                setError(contactText.form.errorMessage);
            }
        } catch (error) {
            setError(contactText.form.errorFallback);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="contact" className="min-h-screen flex flex-col justify-center items-center py-20 pb-40 px-4 relative z-20">
            <div className="text-center mb-10 md:mb-20">
                <div className="mb-6">
                    <GradientText
                        animationSpeed={3}
                        showBorder={false}
                        className="text-4xl sm:text-7xl font-black tracking-tight"
                    >
                        {contactText.title}
                    </GradientText>
                </div>
                <div className="flex justify-center text-center">
                    <ScrollReveal
                        baseOpacity={0.2}
                        enableBlur
                        blurStrength={8}
                        textClassName="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto"
                    >
                        {contactText.subtitle}
                    </ScrollReveal>
                </div>
            </div>

            <div className="w-full max-w-4xl bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

                <div className="grid md:grid-cols-2 md:gap-12 items-start">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-6">{contactText.letsTalk}</h3>
                        <ScrollReveal
                            baseOpacity={0.3}
                            enableBlur
                            blurStrength={5}
                            baseRotation={0}
                            textClassName="text-gray-400 mb-8 leading-relaxed text-sm md:text-base"
                        >
                            {contactText.description}
                        </ScrollReveal>

                        <div className="space-y-6 mb-8 md:mb-0">
                            <div className="flex items-center space-x-4 text-gray-300">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center text-blue-400">
                                    <FiMail size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">{contactText.emailLabel}</p>
                                    <p className="font-medium text-sm md:text-base">{contactText.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-400 mb-2">{contactText.form.fullNameLabel}</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                        <FiUser size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 text-sm md:text-base transition-all outline-none"
                                        placeholder={contactText.form.fullNamePlaceholder}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-400 mb-2">{contactText.form.emailLabel}</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                        <FiMail size={16} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 text-sm md:text-base transition-all outline-none"
                                        placeholder={contactText.form.emailPlaceholder}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-400 mb-2">{contactText.form.contactLabel}</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                        <FiPhone size={16} />
                                    </div>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        required
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 text-sm md:text-base transition-all outline-none"
                                        placeholder={contactText.form.contactPlaceholder}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-400 mb-2">{contactText.form.messageLabel}</label>
                            <textarea
                                name="message"
                                required
                                rows={3}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 text-sm md:text-base transition-all outline-none resize-none"
                                placeholder={contactText.form.messagePlaceholder}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3.5 md:py-4 rounded-lg font-bold text-white flex items-center justify-center space-x-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${loading
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>{contactText.form.submitting}</span>
                                </>
                            ) : (
                                <>
                                    <FiSend />
                                    <span>{contactText.form.submitButton}</span>
                                </>
                            )}
                        </button>

                        {success && (
                            <div className="flex items-center justify-center space-x-2 text-green-400 bg-green-400/10 p-3 md:p-4 rounded-lg border border-green-400/20 animate-fade-in text-sm md:text-base">
                                <FiCheckCircle />
                                <span>{contactText.form.successMessage}</span>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center justify-center space-x-2 text-red-400 bg-red-400/10 p-3 md:p-4 rounded-lg border border-red-400/20 animate-fade-in text-sm md:text-base">
                                <FiAlertCircle />
                                <span>{error}</span>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
