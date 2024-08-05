import Landing from '@/components/pages/Landing'
import Project from "@/components/pages/Project"
export default function page({params}) {
  return (
      <Landing children={<Project id={params.id}></Project>}></Landing>
  )
}
