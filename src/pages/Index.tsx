import { useState } from "react"
import { RoleSelection } from "@/components/RoleSelection"
import { DoctorDashboard } from "@/components/DoctorDashboard"
import { PatientDashboard } from "@/components/PatientDashboard"

type UserRole = 'doctor' | 'patient' | null

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null)

  if (userRole === 'doctor') {
    return <DoctorDashboard />
  }

  if (userRole === 'patient') {
    return <PatientDashboard />
  }

  return <RoleSelection onRoleSelect={setUserRole} />
};

export default Index;
