import Landing from '@/components/pages/Landing'
import Projects from "@/components/pages/Projects"
export default function page() {
  return (
      <Landing children={<Projects></Projects>}></Landing>
  )
}
