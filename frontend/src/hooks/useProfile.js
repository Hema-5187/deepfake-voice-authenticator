import { useEffect, useState } from "react";
import { getProfile } from "../services/profile";

const useProfile = () => {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadProfile() {

            try {

                const data = await getProfile();

                setProfile(data);

            } finally {

                setLoading(false);

            }

        }

        loadProfile();

    }, []);

    return {

        profile,

        loading

    };

};

export default useProfile;