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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl p-10 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-white text-xl font-bold mb-2">Account created!</h2>
          <p className="text-slate-400 text-sm mb-6">
            {role === 'STUDENT'
              ? 'Check your college email to verify your account.'
              : 'Your startup account is under review. We&apos;ll notify you within 24 hours.'}
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-green-500 text-green-950 font-bold rounded-xl hover:bg-green-400 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-slate-950 flex items-center justify-center p-4"
      style={{
        backgroundImage:
          'radial-gradient(circle at 20% 50%, rgba(34,197,94,.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99,102,241,.05) 0%, transparent 40%)',
      }}
    >
      <div className="w-full max-w-lg bg-gray-900 border border-white/8 rounded-2xl p-8 shadow-2xl">

        {/* Logo */}
        <h1 className="font-bold text-2xl text-green-400 tracking-tight mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
          karo.
        </h1>
        <p className="text-slate-500 text-sm mb-6">Create your account</p>

        {/* Role toggle */}
        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => setRole('STUDENT')}
            className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all flex flex-col items-center gap-1
              ${role === 'STUDENT'
                ? 'border-green-500 bg-green-500/10 text-green-400'
                : 'border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-400'}`}
          >
            <span className="text-lg">🎓</span>
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('CLIENT')}
            className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all flex flex-col items-center gap-1
              ${role === 'CLIENT'
                ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                : 'border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-400'}`}
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
                  className="w-full bg-slate-800 border border-white/8 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-green-500 transition-colors appearance-none"
                >
                  <option value="">Select college</option>
                  {COLLEGES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Year of study" error={sErrors.yearOfStudy?.message}>
                <select
                  {...studentForm.register('yearOfStudy')}
                  className="w-full bg-slate-800 border border-white/8 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-green-500 transition-colors appearance-none"
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

            <SubmitBtn color="green" label="Create student account →" />
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

            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 text-indigo-300 text-xs">
              Startup accounts are manually verified by the Karo team before activation. Usually within 24 hours.
            </div>

            <SubmitBtn color="indigo" label="Create startup account →" />
          </form>
        )}

        <p className="text-center text-slate-500 text-sm mt-5">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-green-400 font-medium cursor-pointer hover:text-green-300"
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
      <label className="block text-slate-400 text-xs font-medium uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-slate-600 text-xs mt-1">{hint}</p>}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

const Input = ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`w-full bg-slate-800 border border-white/8 rounded-xl px-4 py-3
      text-slate-200 text-sm placeholder:text-slate-600
      focus:outline-none focus:border-green-500 transition-colors ${className}`}
    {...props}
  />
)

const PasswordHint = () => (
  <p className="text-slate-600 text-xs -mt-2">
    Password must be at least 8 characters, include an uppercase letter and a number.
  </p>
)

const SubmitBtn = ({ color, label }: { color: 'green' | 'indigo'; label: string }) => {
  const cls =
    color === 'green'
      ? 'bg-green-500 hover:bg-green-400 text-green-950 hover:shadow-green-500/20'
      : 'bg-indigo-500 hover:bg-indigo-400 text-white hover:shadow-indigo-500/20'
  return (
    <button
      type="submit"
      className={`w-full py-3 font-bold rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 ${cls}`}
      style={{ fontFamily: 'Syne, sans-serif' }}
    >
      {label}
    </button>
  )
}