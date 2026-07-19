import MainLayout from "../layouts/MainLayout";

import LoadingSpinner from "../components/Common/LoadingSpinner";

import UserProfile from "../components/Settings/UserProfile";

import useProfile from "../hooks/useProfile";

const ProfilePage = () => {

    const {

        profile,

        loading

    } = useProfile();

    console.log("Profile:", profile);

    if (loading)

        return <LoadingSpinner />;

    return (

        <MainLayout>

            <h1 className="text-4xl font-bold text-white mb-8">

                My Profile

            </h1>

            <UserProfile

                profile={profile}

            />

        </MainLayout>

    );

};

export default ProfilePage;