import Card from "../Common/Card";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = ({ profile }) => {
    
    console.log(profile);
    if (!profile) return null;

    return (

        <Card>

            <div className="flex flex-col items-center">

                <FaUserCircle
                    size={120}
                    className="text-blue-500"
                />

                <h2 className="text-2xl font-bold text-white mt-4">

                    {profile.email}

                </h2>

            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">

                <div>

                    <p className="text-slate-400">

                        User ID

                    </p>

                    <h3 className="text-white">

                        {profile.id}

                    </h3>

                </div>

                <div>

                    <p className="text-slate-400">

                        Member Since

                    </p>

                    <h3 className="text-white">

                        {profile.member_since
                             ? new Date(profile.member_since).toLocaleDateString()
                             : "Not Available"}
                    </h3>

                </div>

            </div>

        </Card>

    );

};

export default UserProfile;