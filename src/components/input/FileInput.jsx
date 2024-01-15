import { useRef } from "react";

const FileInput = ({ label, ...props }) => {
  return (
    <div>
      <label
        htmlFor="fileInput"
        className="flex items-center justify-center w-40 h-10 mt-1.5 hover:bg-yellow-500 bg-yellow-500/95  text-white text-center rounded-md cursor-pointer "
      >
        {label}
      </label>
      {/* <img src={selectedFile} alt="" /> */}
      <input type="file" id="fileInput" className="hidden" {...props} />
    </div>
  );
};

export default FileInput;
