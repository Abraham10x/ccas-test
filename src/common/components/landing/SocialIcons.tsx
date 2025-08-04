import Link from "next/link";
import { FC } from "react";
import {
  RiLinkedinBoxFill,
  RiInstagramFill,
  RiYoutubeFill,
  RiFacebookCircleFill,
} from "react-icons/ri";

const SocialIcons: FC = () => {
  return (
    <div className="flex flex-row space-x-4 text-white justify-start mt-8">
      <Link
        href="https://www.facebook.com/profile.php?id=100094119992575"
        rel="noreferer noopener"
        target="_blank"
      >
        <RiFacebookCircleFill
          size={50}
          className="p-2 border-white text-white border rounded-full hover:scale-110 hover:-translate-y-2 transition-all delay-150 duration-300 ease-in-out"
        />
      </Link>
      <Link
        href="https://www.linkedin.com/company/aberdeen-commercial/"
        rel="noreferer noopener"
        target="_blank"
      >
        <RiLinkedinBoxFill
          size={50}
          className="p-2 border-white text-white border rounded-full hover:scale-110 hover:-translate-y-2 transition-all delay-150 duration-300 ease-in-out"
        />
      </Link>
      <Link
        href="https://instagram.com/aberdeenstrategies_ss?igshid=MzNlNGNkZWQ4Mg=="
        rel="noreferer noopener"
        target="_blank"
      >
        <RiInstagramFill
          size={50}
          className="p-2 border-white text-white border rounded-full hover:scale-110 hover:-translate-y-2 transition-all delay-150 duration-300 ease-in-out"
        />
      </Link>
      <Link
        href="https://youtube.com/@AberdeenStrategiesSolutionsSys"
        rel="noreferer noopener"
        target="_blank"
      >
        <RiYoutubeFill
          size={50}
          className="p-2 border-white text-white border rounded-full hover:scale-110 hover:-translate-y-2 transition-all delay-150 duration-300 ease-in-out"
        />
      </Link>
    </div>
  );
};

export default SocialIcons;
