import { Link, useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    {/* Logo */}
                    <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
                        <h1 className="font-display text-2xl font-black tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                            <span className="text-white">karo</span>
                            <span className="text-red-500">freelance.</span>
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Find Work</Link>
                            <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Hire Talent</Link>
                            <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Why Us</Link>
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        <Link 
                            to="/login" 
                            className="hidden md:inline-flex text-gray-300 hover:text-white font-medium text-sm transition-colors py-2 px-4"
                        >
                            Log In
                        </Link>
                        <Link 
                            to="/register" 
                            className="inline-flex items-center justify-center px-6 py-2.5 
                            bg-red-600 hover:bg-red-500 text-white font-semibold text-sm rounded-lg 
                            transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
