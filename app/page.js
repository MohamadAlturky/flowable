import Landing from "../components/pages/Landing"
import Home from "../components/pages/Home"
export default function page() {
  return (
      <Landing children={<Home></Home>}></Landing>
  )
}
