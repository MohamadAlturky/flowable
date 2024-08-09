import Landing from '@/components/pages/Landing'
import Invitations from "@/components/pages/Invitations"
export default function page() {
  return (
      <Landing children={<Invitations></Invitations>}></Landing>
  )
}
