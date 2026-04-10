import AdminLoginForm from '@/components/admin/AdminLoginForm'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#060608] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-white font-semibold text-xl tracking-tight">Qovre</span>
          <p className="text-neutral-500 text-sm mt-1">Admin toegang</p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  )
}
