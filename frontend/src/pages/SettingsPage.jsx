import MainLayout from "../layouts/MainLayout";
import Card from "../components/Common/Card";
import Button from "../components/Common/Button";
import { useAuth } from "../hooks/useAuth";

const SettingsPage = () => {

    const { logout } = useAuth();

    return (

        <MainLayout>

            <h1 className="text-4xl font-bold text-white mb-8">

                Settings

            </h1>

            <div className="grid gap-6">

                <Card>

                    <h2 className="text-white text-2xl mb-6">

                        Application

                    </h2>

                    <div className="space-y-4">

                        <div className="flex justify-between">

                            <span className="text-slate-400">

                                Version

                            </span>

                            <span className="text-white">

                                2.0

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-slate-400">

                                AI Model

                            </span>

                            <span className="text-white">

                                Support Vector Machine

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-slate-400">

                                Embedding

                            </span>

                            <span className="text-white">

                                Wav2Vec2 (768)

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-slate-400">

                                Backend

                            </span>

                            <span className="text-green-400">

                                ● Connected

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-slate-400">

                                Database

                            </span>

                            <span className="text-white">

                                PostgreSQL

                            </span>

                        </div>

                    </div>

                </Card>

                <Button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700"
                >

                    Logout

                </Button>

            </div>

        </MainLayout>

    );

};

export default SettingsPage;