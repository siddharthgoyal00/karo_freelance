import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col font-sans text-gray-200">
            <Navbar />
            
            {/* Main content area */}
            <main className="flex-grow pt-20"> 
                {/* pt-20 accounts for the fixed navbar height */}
                <Outlet />
            </main>
            
            <Footer />
        </div>
    )
}
