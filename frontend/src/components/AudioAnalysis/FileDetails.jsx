import {
  FaFileAudio,
  FaFileAlt,
  FaWeightHanging,
} from "react-icons/fa";

const FileDetails = ({ file }) => {

  if (!file) return null;

  const size = (file.size / 1024 / 1024).toFixed(2);

  const extension =
    file.name.split(".").pop().toUpperCase();

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-5">

      <h2 className="text-white font-semibold text-lg mb-4">

        Selected File

      </h2>

      <div className="space-y-4">

        <div className="flex items-center gap-3">

          <FaFileAudio className="text-blue-400" />

          <span className="text-white">

            {file.name}

          </span>

        </div>

        <div className="flex items-center gap-3">

          <FaWeightHanging className="text-green-400" />

          <span className="text-slate-300">

            {size} MB

          </span>

        </div>

        <div className="flex items-center gap-3">

          <FaFileAlt className="text-yellow-400" />

          <span className="text-slate-300">

            {extension}

          </span>

        </div>

      </div>

    </div>
  );

};

export default FileDetails;