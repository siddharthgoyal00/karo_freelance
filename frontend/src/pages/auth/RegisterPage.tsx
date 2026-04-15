import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type Role = 'STUDENT' | 'CLIENT'

const studentSchema = z.object({
  role: z.literal('STUDENT'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.edu\.in$/,
      'Email must be in format: username@universityname.edu.in'
    ),
  password: z
    .string()
    .min(8, 'Min 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  confirmPassword: z.string(),
  collegeName: z.string().min(2, 'College name is required'),
  course: z.string().min(2, 'Course is required'),
  yearOfStudy: z.string().min(1, 'Year of study is required'),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

const clientSchema = z.object({
  role: z.literal('CLIENT'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Enter a valid email address'),
  password: z
    .string()
    .min(8, 'Min 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  confirmPassword: z.string(),
  companyName: z.string().min(2, 'Company name is required'),
  designation: z.string().min(2, 'Designation is required'),
  companyWebsite: z
    .string()
    .optional()
    .refine(v => !v || /^https?:\/\/.+/.test(v), 'Must be a valid URL starting with http:// or https://'),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type StudentForm = z.infer<typeof studentSchema>
type ClientForm  = z.infer<typeof clientSchema>

const COLLEGES = [
  'VJTI Mumbai',
  'COEP Pune',
  'NIT Surathkal',
  'MNIT Jaipur',
  'RTU Kota',
  'Poornima University',
  'JECRC University',
  'Arya College of Engineering',
  'Other',
]

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'MCA / M.Tech']

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState<Role>('STUDENT')
  const [submitted, setSubmitted] = useState(false)

  const studentForm = useForm<StudentForm>({
    resolver: zodResolver(studentSchema),
    defaultValues: { role: 'STUDENT' },
    mode: 'onChange',
  })

  const clientForm = useForm<ClientForm>({
    resolver: zodResolver(clientSchema),
    defaultValues: { role: 'CLIENT' },
    mode: 'onChange',
  })

  const sErrors = studentForm.formState.errors
  const cErrors = clientForm.formState.errors

  const onStudentSubmit = (data: StudentForm) => {
    console.log('Student register payload:', data)
    setSubmitted(true)
  }

  const onClientSubmit = (data: ClientForm) => {
    console.log('Client register payload:', data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-zinc-950 border border-white/5 rounded-2xl p-10 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-white text-xl font-bold mb-2">Account created!</h2>
          <p className="text-gray-400 text-sm mb-6">
            {role === 'STUDENT'
              ? 'Check your college email to verify your account.'
              : 'Your startup account is under review. We&apos;ll notify you within 24 hours.'}
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500 transition-colors shadow-[0_0_20px_rgba(220,38,38,0.3)]"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden my-10"
      style={{
        backgroundImage:
          'radial-gradient(circle at 20% 50%, rgba(220,38,38,.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(220,38,38,.03) 0%, transparent 40%)',
      }}
    >
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative w-full max-w-lg bg-zinc-950/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl">

        {/* Logo */}
        <div 
            className="cursor-pointer inline-block mb-1" 
            onClick={() => navigate('/')}
        >
            <h1 className="font-display text-3xl font-black tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                <span className="text-white">karo</span>
                <span className="text-red-500">freelance.</span>
            </h1>
        </div>
        <p className="text-gray-500 text-sm mb-6">Create your account</p>

        {/* Role toggle */}
        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => setRole('STUDENT')}
            className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all flex flex-col items-center gap-1
              ${role === 'STUDENT'
                ? 'border-red-500 bg-red-500/10 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                : 'border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300'}`}
          >
            <span className="text-lg">🎓</span>
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('CLIENT')}
            className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all flex flex-col items-center gap-1
              ${role === 'CLIENT'
                ? 'border-red-500 bg-red-500/10 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                : 'border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300'}`}
          >
            <span className="text-lg">🚀</span>
            Startup / Client
          </button>
        </div>

        {/* ── STUDENT FORM ── */}
        {role === 'STUDENT' && (
          <form onSubmit={studentForm.handleSubmit(onStudentSubmit)} className="space-y-4">
            <input type="hidden" {...studentForm.register('role')} value="STUDENT" />

            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" error={sErrors.firstName?.message}>
                <Input placeholder="Arjun" {...studentForm.register('firstName')} />
              </Field>
              <Field label="Last name" error={sErrors.lastName?.message}>
                <Input placeholder="Sharma" {...studentForm.register('lastName')} />
              </Field>
            </div>

            <Field
              label="College email"
              error={sErrors.email?.message}
              hint="Format: username@universityname.edu.in"
            >
              <Input
                placeholder="arjun@rtu.edu.in"
                type="email"
                {...studentForm.register('email')}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="College" error={sErrors.collegeName?.message}>
                <select
                  {...studentForm.register('collegeName')}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-gray-200 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all appearance-none font-sans"
                >
                  <option value="">Select college</option>
                  {COLLEGES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Year of study" error={sErrors.yearOfStudy?.message}>
                <select
                  {...studentForm.register('yearOfStudy')}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-gray-200 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all appearance-none font-sans"
                >
                  <option value="">Select year</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Course / Branch" error={sErrors.course?.message}>
              <Input placeholder="B.Tech — Computer Science" {...studentForm.register('course')} />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Password" error={sErrors.password?.message}>
                <Input type="password" placeholder="Min 8 chars" {...studentForm.register('password')} />
              </Field>
              <Field label="Confirm password" error={sErrors.confirmPassword?.message}>
                <Input type="password" placeholder="••••••••" {...studentForm.register('confirmPassword')} />
              </Field>
            </div>

            <PasswordHint />

            <div className="pt-2">
                <SubmitBtn label="Create student account →" />
            </div>
          </form>
        )}

        {/* ── CLIENT FORM ── */}
        {role === 'CLIENT' && (
          <form onSubmit={clientForm.handleSubmit(onClientSubmit)} className="space-y-4">
            <input type="hidden" {...clientForm.register('role')} value="CLIENT" />

            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" error={cErrors.firstName?.message}>
                <Input placeholder="Rahul" {...clientForm.register('firstName')} />
              </Field>
              <Field label="Last name" error={cErrors.lastName?.message}>
                <Input placeholder="Gupta" {...clientForm.register('lastName')} />
              </Field>
            </div>

            <Field label="Work email" error={cErrors.email?.message}>
              <Input placeholder="rahul@nexuslabs.in" type="email" {...clientForm.register('email')} />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Company / Startup name" error={cErrors.companyName?.message}>
                <Input placeholder="Nexus Labs" {...clientForm.register('companyName')} />
              </Field>
              <Field label="Your designation" error={cErrors.designation?.message}>
                <Input placeholder="CTO / Founder" {...clientForm.register('designation')} />
              </Field>
            </div>

            <Field label="Company website (optional)" error={cErrors.companyWebsite?.message}>
              <Input placeholder="https://nexuslabs.in" {...clientForm.register('companyWebsite')} />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Password" error={cErrors.password?.message}>
                <Input type="password" placeholder="Min 8 chars" {...clientForm.register('password')} />
              </Field>
              <Field label="Confirm password" error={cErrors.confirmPassword?.message}>
                <Input type="password" placeholder="••••••••" {...clientForm.register('confirmPassword')} />
              </Field>
            </div>

            <PasswordHint />

            <div className="bg-zinc-900 border border-white/5 rounded-xl p-3 text-gray-400 text-xs">
              Startup accounts are manually verified by the Karo team before activation. Usually within 24 hours.
            </div>

            <div className="pt-2">
                <SubmitBtn label="Create startup account →" />
            </div>
          </form>
        )}

        <p className="text-center text-gray-500 text-sm mt-8">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-red-500 font-semibold cursor-pointer hover:text-red-400 transition-colors"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  )
}

/* ── small reusable helpers ── */

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-gray-600 text-xs mt-1">{hint}</p>}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

const Input = ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`w-full bg-black border border-white/10 rounded-xl px-4 py-3
      text-gray-200 text-sm placeholder:text-gray-600
      focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans ${className}`}
    {...props}
  />
)

const PasswordHint = () => (
  <p className="text-gray-600 text-xs mt-1">
    Password must be at least 8 characters, include an uppercase letter and a number.
  </p>
)

const SubmitBtn = ({ label }: { label: string }) => {
  return (
    <button
      type="submit"
      className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
      style={{ fontFamily: 'Syne, sans-serif' }}
    >
      {label}
    </button>
  )
}