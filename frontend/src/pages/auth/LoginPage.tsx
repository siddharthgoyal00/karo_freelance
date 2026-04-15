import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../../api/auth.api'
import { useAuthStore } from '../../store/auth.store'

const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Min 8 characters'),
    role: z.enum(['STUDENT', 'CLIENT', 'ADMIN']),
})
type LoginForm = z.infer<typeof schema>

const ROLE_REDIRECT: Record<string, string> = {
    ADMIN: '/admin/dashboard',
    STUDENT: '/student/dashboard',
    CLIENT: '/client/dashboard',
}

export const LoginPage = () => {
    const navigate = useNavigate()
    const setAuth = useAuthStore(s => s.setAuth)
    const [role, setRole] = useState<'STUDENT' | 'CLIENT' | 'ADMIN'>('STUDENT')

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(schema),
        defaultValues: { role: 'STUDENT' },
    })

    const { mutate, isPending, error } = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            setAuth({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                role: data.role as any,
                fullName: data.fullName,
                userId: data.userId,
            })
            navigate(ROLE_REDIRECT[data.role] ?? '/')
        },
    })

    const onSubmit = (values: LoginForm) => mutate(values)

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden"
             style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(220,38,38,.07) 0%, transparent 70%)' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative w-full max-w-md bg-zinc-950/80 backdrop-blur-xl border border-white/5 rounded-2xl p-10 shadow-2xl">
                <div 
                    className="cursor-pointer inline-block mb-1" 
                    onClick={() => navigate('/')}
                >
                    <h1 className="font-display text-3xl font-black tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                        <span className="text-white">karo</span>
                        <span className="text-red-500">freelance.</span>
                    </h1>
                </div>
                <p className="text-gray-400 text-sm mb-8">Work local. Build real.</p>

                {/* Role selector */}
                <div className="flex gap-2 mb-6">
                    {(['STUDENT', 'CLIENT', 'ADMIN'] as const).map(r => (
                        <button key={r}
                            type="button"
                            onClick={() => setRole(r)}
                            className={`flex-1 py-3 rounded-xl border text-xs font-semibold transition-all
                            ${role === r
                                ? 'border-red-500 bg-red-500/10 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                                : 'border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300'}`}>
                            {r === 'STUDENT' ? '🎓' : r === 'CLIENT' ? '🚀' : '⚙️'}<br />
                            <span className="mt-1 block">{r === 'CLIENT' ? 'Startup' : r.charAt(0) + r.slice(1).toLowerCase()}</span>
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                            Email
                        </label>
                        <input {...register('email')}
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3
                         text-gray-200 text-sm placeholder:text-gray-600
                         focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans"
                            placeholder="you@college.edu" />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                            Password
                        </label>
                        <input {...register('password')} type="password"
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3
                         text-gray-200 text-sm placeholder:text-gray-600
                         focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans"
                            placeholder="••••••••" />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3">
                            Invalid credentials. Please try again.
                        </div>
                    )}

                    <button type="submit" disabled={isPending}
                        className="w-full py-3.5 bg-red-600 text-white font-bold rounded-xl mt-2
                       hover:bg-red-500 transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]
                       disabled:opacity-50 disabled:cursor-not-allowed">
                        {isPending ? 'Signing in...' : 'Sign in →'}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-8">
                    No account?{' '}
                    <span onClick={() => navigate('/register')}
                        className="text-red-500 font-semibold cursor-pointer hover:text-red-400 transition-colors">
                        Create one
                    </span>
                </p>
            </div>
        </div>
    )
}