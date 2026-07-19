import Sidebar from "../components/Common/Sidebar";
import Navbar from "../components/Common/Navbar";

const MainLayout = ({ children }) => {

    return (

        <div className="flex min-h-screen bg-slate-950">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Navbar />

                <main className="p-6">

                    {children}

                </main>

            </div>

        </div>

    );

};

export default MainLayout;