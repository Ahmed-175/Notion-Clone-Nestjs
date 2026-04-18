import { endpoints } from "@/api/endpoints";
import useAuth from "@/hooks/useAuth";
import useToast from "@/hooks/useToast";
import { uploadPicture } from "@/services/user.service";
import { MdOutlineFileUpload } from "react-icons/md";

const Picture = ({
  endpoint,
  username,
}: {
  endpoint: any;
  username: string;
}) => {
  const { setLoading, setUser } = useAuth();
  const { showMgs } = useToast();
  const handleUploadPicture = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const newForm = new FormData();
    newForm.append("picture", file);

    setLoading(true);

    try {
      const data = await uploadPicture(newForm);

      setUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          picture: data.url,
        };
      });

      showMgs({
        type: "success",
        message: "Upload picture successful",
      });
    } catch (error) {
      showMgs({
        type: "error",
        message: "Upload picture failed",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!endpoint) {
    return (
      <div
        className=" bg-black w-10 text-white text-2xl flex
       justify-center items-center h-10 rounded-full "
      >
        <div className=" font-bold">{username.charAt(0)}</div>
      </div>
    );
  }

  return (
    <div className="w-10 h-10 cursor-pointer object-cover rounded-full relative">
      <input
        onChange={handleUploadPicture}
        type="file"
        name="upload_picture"
        className=" hidden"
        id="upload_picture"
      />
      <label
        htmlFor="upload_picture"
        className="flex justify-center items-center absolute 
       w-full h-full left-0 top-0 opacity-0
       hover:bg-black hover:opacity-60 cursor-pointer duration-150 rounded-full text-white text-2xl "
      >
        <MdOutlineFileUpload />
      </label>
      <img
        width={2000}
        alt="picture"
        height={2000}
        className="w-10 h-10 object-cover rounded-full"
        src={`${endpoints.picture}/${endpoint}`}
      />
    </div>
  );
};

export default Picture;
