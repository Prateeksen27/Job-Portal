import { IconAnchor } from "@tabler/icons-react";
import Login from "../../SignUpLogin/Login";

const SignInPage = () => {
    return (
        <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] flex flex-col md:flex-row">
            {/* LEFT SIDE */}
            <div
                className="
  w-full md:w-1/2
  h-[40vh] md:h-auto
  bg-mine-shaft-900
  flex flex-col justify-center items-center
  gap-4 p-6 sm:p-10
  rounded-b-[200px] sm:rounded-b-[150px] md:rounded-b-none md:rounded-r-[200px]
  text-center md:text-left
"

            >
                <div className="flex items-center justify-center md:justify-start gap-3 text-bright-sun-400">
                    <IconAnchor
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-lg"
                        stroke={2.6}
                    />
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold">
                        TalentHub
                    </h1>
                </div>
                <p className="text-base sm:text-lg md:text-2xl text-mine-shaft-200 font-medium">
                    Find your dream job here
                </p>
            </div>

            {/* RIGHT SIDE */}


           
        </div>

    );
};

export default SignInPage;
