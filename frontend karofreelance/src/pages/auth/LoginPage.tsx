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
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(34,197,94,.07) 0%, transparent 50%)' }}>
            <div className="w-full max-w-md bg-gray-900 border border-white/8 rounded-2xl p-10 shadow-2xl">

                <h1 className="font-display text-3xl font-black text-green-400 tracking-tight mb-1">karo.</h1>
                <p className="text-slate-500 text-sm mb-8">Work local. Build real.</p>

                {/* Role selector */}
                <div className="flex gap-2 mb-6">
                    {(['STUDENT', 'CLIENT', 'ADMIN'] as const).map(r => (
                        <button key={r}
                            onClick={() => setRole(r)}
                            className={`flex-1 py-3 rounded-xl border text-xs font-semibold transition-all
                ${role === r
                                    ? 'border-green-500 bg-green-500/10 text-green-400'
                                    : 'border-white/10 text-slate-500 hover:border-white/20'}`}>
                            {r === 'STUDENT' ? '🎓' : r === 'CLIENT' ? '🚀' : '⚙️'}<br />
                            {r === 'CLIENT' ? 'Startup' : r.charAt(0) + r.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
                            Email
                        </label>
                        <input {...register('email')}
                            className="w-full bg-slate-800 border border-white/8 rounded-xl px-4 py-3
                         text-slate-200 text-sm placeholder:text-slate-600
                         focus:outline-none focus:border-green-500 transition-colors"
                            placeholder="you@college.edu" />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
                            Password
                        </label>
                        <input {...register('password')} type="password"
                            className="w-full bg-slate-800 border border-white/8 rounded-xl px-4 py-3
                         text-slate-200 text-sm placeholder:text-slate-600
                         focus:outline-none focus:border-green-500 transition-colors"
                            placeholder="••••••••" />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3">
                            Invalid credentials. Please try again.
                        </div>
                    )}

                    <button type="submit" disabled={isPending}
                        className="w-full py-3 bg-linear-to-r from-green-500 to-green-600
                       text-green-950 font-display font-bold rounded-xl
                       hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5
                       transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        {isPending ? 'Signing in...' : 'Sign in →'}
                    </button>
                </form>

                <p className="text-center text-slate-500 text-sm mt-6">
                    No account?{' '}
                    <span onClick={() => navigate('/register')}
                        className="text-green-400 font-medium cursor-pointer hover:text-green-300">
                        Create one
                    </span>
                </p>
            </div>
        </div>
    )
}