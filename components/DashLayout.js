import Dashboard from "../pages/dashboard";

const DashLayout = ({children}) => {
    return ( <>
    <Dashboard />
    {children}
    </> );
}
 
export default DashLayout;