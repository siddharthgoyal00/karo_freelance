import { Link } from 'react-router-dom'

export const LandingPage = () => {
    return (
        <div className="bg-black min-h-screen text-gray-200 selection:bg-red-500/30">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Abstract Red Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                        Hire Elite Student <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                            Freelance Talent
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
                        Connect with top university students to accelerate your startup's growth. High-quality work, innovative mindsets, and direct collaboration.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:-translate-y-1">
                            Hire Talent Now
                        </Link>
                        <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all hover:-translate-y-1 backdrop-blur-sm">
                            Find Freelance Work
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works / Features */}
            <section className="py-24 bg-zinc-950 relative border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Why <span className="text-red-500">karofreelance.</span> ?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Skip the traditional agency fees. Work directly with driven, verified students from top tier universities.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-2xl bg-black border border-white/5 hover:border-red-500/30 transition-colors group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Fast Execution</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Students bring fresh perspectives and hustle, ensuring your projects are delivered rapidly without compromising on quality.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-2xl bg-black border border-white/5 hover:border-red-500/30 transition-colors group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Verified Talent</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Every student is verified with their university credentials, ensuring you work with genuine top-tier academic talent.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-2xl bg-black border border-white/5 hover:border-red-500/30 transition-colors group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Cost Effective</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Get agency-quality results at a fraction of the cost. Transparent pricing with zero hidden platform markups for clients.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-black to-red-950/20"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                        Ready to shape the future?
                    </h2>
                    <p className="text-lg text-gray-400 mb-10">Join thousands of students and startups building incredible products together.</p>
                    <Link to="/register" className="inline-flex px-10 py-5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all hover:shadow-[0_0_40px_rgba(220,38,38,0.4)] hover:-translate-y-1 text-lg">
                        Get Started for Free
                    </Link>
                </div>
            </section>
        </div>
    )
}
